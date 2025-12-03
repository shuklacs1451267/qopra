import { Worker, Job } from "bullmq";
import { redisConnection } from "../queue/connection";
import { queueName } from "../queue/producer";
import { CampaignModel, CampaignDoc } from "../../modules/campaign/campaign.model";
import { LogModel } from "../../modules/logs/log.model";
import { sendSMSProvider } from "../../services/sms.provider";
import { logger } from "../../config/logger";

export const startWorker = () => {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      const { campaignId, recipient } = job.data;
      const campaign: CampaignDoc | null = await CampaignModel.findById(campaignId);
      if (!campaign) return;

      if (!campaign.message || campaign.message.trim() === "") {
        logger.error(`[Worker] Campaign ${campaign.title} has empty message. Skipping ${recipient}`);
        return;
      }

      if (!recipient.startsWith("+")) {
        logger.error(`[Worker] Recipient ${recipient} is not valid E.164 format. Skipping`);
        return;
      }

      try {
        const res = await sendSMSProvider(recipient, campaign.message);
        await LogModel.create({
          campaignId,
          recipient,
          channel: "SMS",
          attempt: job.attemptsMade + 1,
          success: true,
          providerResponse: res,
        });

        await CampaignModel.findByIdAndUpdate(campaignId, {
          $inc: { sentMessages: 1 },
          $pull: { failedRecipients: recipient },
        });

        await updateCampaignStatus(campaignId);

      } catch (err: any) {
        await LogModel.create({
          campaignId,
          recipient,
          channel: "SMS",
          attempt: job.attemptsMade + 1,
          success: false,
          error: err.message,
        });

        await CampaignModel.findByIdAndUpdate(campaignId, {
          $addToSet: { failedRecipients: recipient },
          $inc: { failedMessages: 1 },
        });
      }
    },
    { connection: redisConnection, concurrency: 5 }
  );

  worker.on("completed", job => logger.info(`[Worker] Job completed ${job.id}`));
  worker.on("failed", (job, err) => logger.error(`[Worker] Job failed ${job?.id}: ${err?.message}`));

  logger.info(`[Worker] Worker started for queue: ${queueName}`);
};

async function updateCampaignStatus(campaignId: string) {
  const campaign = await CampaignModel.findById(campaignId);
  if (!campaign) return;

  const totalRecipients = campaign.recipients.length;
  const processedRecipients = (campaign.sentMessages || 0) + (campaign.failedMessages || 0);

  if (processedRecipients >= totalRecipients) {
    await CampaignModel.findByIdAndUpdate(campaignId, { status: "completed" });
  }
}
