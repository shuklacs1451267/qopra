import { Schema, model, HydratedDocument, Types } from "mongoose";

export interface IRecipientStatus {
  recipient: string;
  status: "pending" | "sent" | "delivered" | "failed";
  error?: string;
}

export interface ICampaign {
  title: string;
  description?: string;
  channel: "SMS" | "WhatsApp" | "Email";
  type?: "bulk" | "single" | "template";

  message: string;
  subject?: string;
  templateId?: string;

  senderId?: string;

  status: "draft" | "scheduled" | "running" | "completed" | "failed";

  user: Types.ObjectId;

  recipients: string[];
  recipientsStatus?: IRecipientStatus[];
  failedRecipients?: string[];

  attachments?: { url: string; type: string }[];

  scheduledAt?: Date;

  sentMessages?: number;
  deliveredMessages?: number;
  failedMessages?: number;

  cost?: number;
  tags?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    channel: { type: String, enum: ["SMS", "WhatsApp", "Email"], required: true },
    type: { type: String, enum: ["bulk", "single", "template"], default: "bulk" },

    message: { type: String, required: true },
    subject: { type: String, default: "" },
    templateId: { type: String, default: null },

    senderId: { type: String, default: null },

    status: {
      type: String,
      enum: ["draft", "scheduled", "running", "completed", "failed"],
      default: "scheduled",
    },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    recipients: { type: [String], default: [] },
    recipientsStatus: [
      {
        recipient: String,
        status: { type: String, enum: ["pending", "sent", "delivered", "failed"], default: "pending" },
        error: { type: String, default: "" },
      },
    ],
    failedRecipients: { type: [String], default: [] },

    attachments: [
      {
        url: String,
        type: String,
      },
    ],

    scheduledAt: { type: Date, default: null },

    sentMessages: { type: Number, default: 0 },
    deliveredMessages: { type: Number, default: 0 },
    failedMessages: { type: Number, default: 0 },

    cost: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const CampaignModel = model<ICampaign>("Campaign", campaignSchema);
export type CampaignDoc = HydratedDocument<ICampaign>;
