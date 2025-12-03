// src/modules/campaign/resend.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { CampaignModel } from "./campaign.model";
import { enqueueRecipients } from "../../core/queue/producer";
import { sendSuccess } from "../../core/utils/response";
import { logger } from "../../config/logger";
import { NotFound } from "../../core/errors";

export const ResendController = {
  resendFailed: asyncHandler(async (req: Request, res: Response) => {
    const campaignId = req.params.id;
    const campaign = await CampaignModel.findById(campaignId);
    if (!campaign) throw new NotFound("Campaign not found");

    const failedRecipients = campaign.failedRecipients || [];
    if (!failedRecipients.length) {
      return sendSuccess(res, { requeued: 0 }, "No failed recipients to requeue");
    }

    await CampaignModel.findByIdAndUpdate(campaign._id, { status: "running" });
    const count = await enqueueRecipients(campaign, failedRecipients);

    await CampaignModel.findByIdAndUpdate(campaign._id, {
      failedRecipients: [],
      failedMessages: 0,
    });

    logger.info(`[ResendController] Requeued ${count} failed recipients | Campaign: ${campaign.title}`);
    sendSuccess(res, { requeued: count }, `Requeued ${count} failed recipients`);
  }),
};
