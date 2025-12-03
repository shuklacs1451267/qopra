import twilio from "twilio";
import { logger } from "../config/logger";
import { ENV } from "../config/env";


const smsClient = twilio(ENV.TWILIO_SID, ENV.TWILIO_AUTH);


export async function sendSMSProvider(to: string, message: string, senderId?: string) {
  if (!message || message.trim() === "") {
    throw new Error("Message body is empty");
  }

  if (!to.startsWith("+")) {
    throw new Error(`Recipient number ${to} is not in E.164 format. Example: +919876543210`);
  }

  const fromNumber = senderId || ENV.TWILIO_SMS_FROM;
  if (!fromNumber) {
    throw new Error("TWILIO_SMS_FROM is not configured in .env");
  }

  try {
    const msg = await smsClient.messages.create({
      body: message,
      from: fromNumber,
      to,
    });

    logger.info(`[SMS] Sent to ${to} | SID: ${msg.sid}`);
    return { status: "sent", sid: msg.sid };
  } catch (err: any) {
    logger.error(`[SMS] Failed to send to ${to}`, err);
    throw err;
  }
}
