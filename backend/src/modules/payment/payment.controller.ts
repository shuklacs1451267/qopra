import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { PaymentService } from "./payment.service";
import { sendSuccess } from "../../core/utils/response";
import { ApiError } from "../../core/errors";

export const PaymentController = {
  createOrder: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { amount, credits } = req.body;

    if (!amount || !credits) throw new ApiError(400, "Amount and credits are required");

    const { order } = await PaymentService.createOrder(user.id, amount, credits);
    sendSuccess(res, { order }, "Razorpay order created");
  }),

  webhook: asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers["x-razorpay-signature"] as string;
    if (!signature) throw new ApiError(400, "Webhook signature missing");

    const body = JSON.stringify(req.body);
    const isValid = await PaymentService.verifyPayment(body, signature);
    if (!isValid) return res.status(400).send("Invalid signature");

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      await PaymentService.markPaymentSuccess(payload.id, payload.order_id);
    } else if (event === "payment.failed") {
      await PaymentService.markPaymentFailed(payload.order_id);
    }

    res.status(200).send("ok");
  }),
};
