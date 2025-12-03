import { Schema, model, HydratedDocument } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  phone?: string;
  companyName?: string;
  website?: string;
  avatar?: string;
  isVerified: boolean;
  status: "active" | "inactive";
  totalCampaigns?: number;
  credits?: number;
  plan?: "free" | "pro" | "enterprise";
  lastLogin?: Date | null;
  twilio?: string;
  twilioOTP?: string;
  twilioVerified?: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "client"], default: "client" },
  phone: { type: String, trim: true },
  companyName: { type: String, trim: true },
  website: { type: String, trim: true },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  totalCampaigns: { type: Number, default: 0 },
  credits: { type: Number, default: 0 },
  plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
  lastLogin: { type: Date, default: null },
  twilio: { type: String, trim: true },
  twilioOTP: { type: String, trim: true },
  twilioVerified: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function (candidate: string) {
  const bcrypt = require("bcryptjs");
  return bcrypt.compare(candidate, this.password);
};

export const UserModel = model<IUser, any>("User", userSchema);
export type UserDoc = HydratedDocument<IUser>;
