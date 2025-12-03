import { Queue } from "bullmq";
import { redisConnection } from "./connection";
import { CampaignDoc } from "../../modules/campaign/campaign.model";
import { logger } from "../../config/logger";

export const queueName = "campaignQueue";
export const campaignQueue = new Queue(queueName, { connection: redisConnection });

export async function enqueueRecipients(campaign: CampaignDoc, recipients: string[], batchSize = 50) {
  let totalEnqueued = 0;
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    const jobs = batch.map(recipient => ({
      name: "send",
      data: { campaignId: campaign._id, recipient },
      opts: { attempts: 3, removeOnComplete: true, removeOnFail: 100 },
    }));
    await campaignQueue.addBulk(jobs);
    totalEnqueued += batch.length;
    logger.info(`[Queue] Enqueued ${batch.length} recipients for campaign: ${campaign.title}`);
  }
  return totalEnqueued;
}
