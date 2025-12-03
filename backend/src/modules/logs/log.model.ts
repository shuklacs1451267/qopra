import { Schema, model } from "mongoose";

const LogSchema = new Schema(
  {
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
    recipient: { type: String, required: true },
    channel: { type: String, enum: ["SMS", "WhatsApp", "Email"], required: true },
    attempt: { type: Number, default: 1 },
    success: { type: Boolean, default: false },
    error: { type: String, default: "" },
    providerResponse: { type: Schema.Types.Mixed, default: null },
    cost: { type: Number, default: 0 },
    meta: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LogModel = model("MessageLog", LogSchema);
