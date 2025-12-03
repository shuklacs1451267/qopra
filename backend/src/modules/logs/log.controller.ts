import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { LogModel } from "./log.model";
import { sendSuccess } from "../../core/utils/response";

export const LogController = {
  listByCampaign: asyncHandler(async (req: Request, res: Response) => {
    const params = (req as any).params
    const campaignId = params.id;
    const logs = await LogModel.find({ campaignId }).sort({ createdAt: -1 }).limit(1000);
    sendSuccess(res, logs, "Campaign logs");
  })
};
