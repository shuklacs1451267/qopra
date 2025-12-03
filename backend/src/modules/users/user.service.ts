import bcrypt from "bcryptjs";
import { ENV } from "../../config/env";
import { UserModel } from "./user.model";
import { NotFound } from "../../core/errors";
import twilio from "twilio";

export const UserService = {
  async findById(id: string) {
    const user = await UserModel.findById(id).select("-password");
    if (!user) throw new NotFound("User not found");
    return user;
  },

  async listAll(limit = 50) {
    return UserModel.find()
      .select("-password")
      .limit(limit)
      .lean();
  },

  async createAdminIfNotExists() {
    const admin = await UserModel.findOne({ role: "admin" });
    if (!admin) {
      const saltRounds = Number(ENV.SALT_ROUNDS);
      const defaultPwd = ENV.ADMIN_DEFAULT_PASSWORD;

      const hash = await bcrypt.hash(defaultPwd, saltRounds);

      await UserModel.create({
        name: "Admin",
        email: "admin@qopra.local",
        password: hash,
        role: "admin",
      });
    }
  },
};


export const UserTwilioService = {
  /**
   * @pram Set Twilio number for user and send verification code
   */
  async setTwilioNumber(userId: string, twilioNumber: string) {
    const client = twilio(ENV.TWILIO_SID, ENV.TWILIO_AUTH);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await UserModel.findByIdAndUpdate(userId, {
      twilio: twilioNumber,
      twilioOTP: otp,
      isVerified: false,
    });

    // Send OTP via SMS using Twilio
    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: ENV.TWILIO_SMS_FROM,
      to: twilioNumber,
    });

    return { message: "OTP sent" };
  },

  /**
   * @pram Verify Twilio number using OTP
   */
  async verifyTwilioNumber(userId: string, otp: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new NotFound("User not found");

    if (user.twilioOTP !== otp) throw new Error("Invalid OTP");

    user.isVerified = true;
    user.twilioVerified = true;
    user.twilioOTP = undefined;
    await user.save();

    return { message: "Twilio number verified successfully" };
  },
};
