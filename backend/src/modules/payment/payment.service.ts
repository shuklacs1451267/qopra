import Razorpay from "razorpay";
import { PaymentModel } from "./payment.model";
import { UserModel } from "../users/user.model";
import { ENV } from "../../config/env";
import { ApiError } from "../../core/errors";

const razorpay = new Razorpay({
  key_id: ENV.RAZORPAY_KEY,
  key_secret: ENV.RAZORPAY_SECRET,
});

export const PaymentService = {
  async createOrder(userId: string, amount: number, credits: number) {
    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    if (!order) throw new ApiError(500, "Failed to create Razorpay order");

    await PaymentModel.create({
      user: userId,
      orderId: order.id,
      amount,
      credits,
      status: "pending",
    });

    return { order };
  },

  async verifyPayment(body: string, signature: string) {
    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", ENV.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  },

  async markPaymentSuccess(paymentId: string, orderId: string) {
    const payment = await PaymentModel.findOne({ orderId });
    if (!payment) throw new ApiError(404, "Payment record not found");

    payment.paymentId = paymentId;
    payment.status = "success";
    await payment.save();

    await UserModel.findByIdAndUpdate(payment.user, {
      $inc: { credits: payment.credits },
    });
  },

  async markPaymentFailed(orderId: string) {
    const payment = await PaymentModel.findOne({ orderId });
    if (!payment) throw new ApiError(404, "Payment record not found");

    payment.status = "failed";
    await payment.save();
  },
};
