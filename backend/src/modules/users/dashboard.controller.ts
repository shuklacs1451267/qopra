import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { DashboardService } from "./dashboard.service";
import { sendSuccess } from "../../core/utils/response";

export const DashboardController = {
  clientDashboard: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const userId = user.id;
    const data = await DashboardService.getClientDashboard(userId);
    sendSuccess(res, data, "Client dashboard");
  }),
};
