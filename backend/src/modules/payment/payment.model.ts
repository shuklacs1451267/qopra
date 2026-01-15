import { Schema, model, HydratedDocument, Types } from "mongoose";
import { IUser } from "../users/user.model";

export interface IPayment {
  user: Types.ObjectId | IUser;
  orderId: string;
  paymentId?: string;
  amount: number;
  credits: number;
  status: "created" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  },
  { timestamps: true }
);

export const PaymentModel = model<IPayment, any>("Payment", paymentSchema);
export type PaymentDoc = HydratedDocument<IPayment>;
