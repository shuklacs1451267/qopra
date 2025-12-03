// src/cron/index.ts
import cron from "node-cron";
import { CampaignModel } from "../modules/campaign/campaign.model";
import { enqueueRecipients } from "../core/queue/producer";
import { logger } from "../config/logger";

export function startCronJobs() {
  logger.info("Cron initialized...");

  cron.schedule("*/10 * * * * *", async () => {
    logger.info("Checking scheduled campaigns...");

    const campaigns = await CampaignModel.find({
      status: "scheduled",
      scheduledAt: { $lte: new Date() },
    });

    if (!campaigns.length) return logger.info("No campaigns found.");

    for (const campaign of campaigns) {
      if (!campaign.message || campaign.message.trim() === "") {
        logger.error(`[Cron] Campaign ${campaign.title} has empty message. Skipping.`);
        continue;
      }

      await CampaignModel.findByIdAndUpdate(campaign._id, { status: "running" });

      const count = await enqueueRecipients(campaign, campaign.recipients);
      logger.info(`[Cron] Enqueued ${count} recipients for campaign ${campaign.title}`);
    }
  });
}
