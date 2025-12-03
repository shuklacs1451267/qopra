import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { CampaignService } from "./campaign.service";
import { sendSuccess } from "../../core/utils/response";
import { upload } from "../../core/middlewares/upload";

export const CampaignController = {
  create: [
    upload.none(),
    asyncHandler(async (req: Request, res: Response) => {
      const user = (req as any).user;

      let recipients: string[] = [];
      if (req.body.recipients) {
        if (typeof req.body.recipients === "string") {
          try {
            recipients = JSON.parse(req.body.recipients);
          } catch {
            recipients = req.body.recipients.split(",").map((r: string) => r.trim());
          }
        } else if (Array.isArray(req.body.recipients)) {
          recipients = req.body.recipients;
        }
      }

      req.body.recipients = recipients.filter(Boolean);

      const campaign = await CampaignService.create(user.id, req.body);
      sendSuccess(res, campaign, "Campaign created");
    }),
  ],


  getOne: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new Error("Campaign ID is required");

    const campaign = await CampaignService.getById(id);
    sendSuccess(res, campaign, "Campaign details");
  }),

  listUser: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const campaigns = await CampaignService.listByUser(user.id);
    sendSuccess(res, campaigns, "Your campaigns");
  }),

  listAll: asyncHandler(async (_req, res: Response) => {
    const campaigns = await CampaignService.listAll();
    sendSuccess(res, campaigns, "All campaigns");
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new Error("Campaign ID is required");

    const campaign = await CampaignService.update(id, req.body);
    sendSuccess(res, campaign, "Campaign updated");
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new Error("Campaign ID is required");

    const campaign = await CampaignService.delete(id);
    sendSuccess(res, campaign, "Campaign deleted");
  }),
};
