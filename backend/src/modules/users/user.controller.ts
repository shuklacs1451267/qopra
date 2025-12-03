import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { UserService, UserTwilioService } from "./user.service";
import { sendSuccess } from "../../core/utils/response";
import { CampaignModel } from "../campaign/campaign.model";

export const UserController = {
  getMe: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const user = await UserService.findById(userId);

    const campaigns = await CampaignModel.find({ user: userId });

    const activeCampaigns = campaigns.filter(c => c.status === "running" || c.status === "scheduled").length;
    const completedCampaigns = campaigns.filter(c => c.status === "completed").length;
    const totalCampaigns = campaigns.length;
    const totalSpent = campaigns.reduce((sum, c) => sum + (c.cost || 0), 0);
    const successRate = totalCampaigns === 0 ? 0 : Math.round((completedCampaigns / totalCampaigns) * 100);

    const files = campaigns.flatMap(c =>
      (c.attachments || []).map(f => ({
        name: f.url.split("/").pop(),
        type: f.type,
        uploadedOn: c.createdAt?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      }))
    );

    const profileResponse = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      companyName: user.companyName,
      website: user.website,
      avatar: user.avatar,
      status: user.status,
      isVerified: user.isVerified,
      totalCampaigns,
      activeCampaigns,
      completedCampaigns,
      totalSpent,
      successRate,
      credits: user.credits || 0,
      plan: user.plan || "free",
      twilioNumber: user.twilio || null,
      twilioVerified: user.twilioVerified || false,
      files,
    };

    sendSuccess(res, profileResponse, "Profile");
  }),

  list: asyncHandler(async (_req, res) => {
    const users = await UserService.listAll();
    sendSuccess(res, users, "Users list");
  }),
};



export const UserTwilioController = {
  sendTwilioOTP: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user
    const { twilioNumber } = req.body;
    const result = await UserTwilioService.setTwilioNumber(user.id, twilioNumber);
    res.json({ success: true, data: result });
  }),

  verifyTwilioOTP: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user
    const { otp } = req.body;
    const result = await UserTwilioService.verifyTwilioNumber(user.id, otp);
    res.json({ success: true, data: result });
  }),
};