import dotenv from "dotenv";
dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function requiredNumber(name: string): number {
  const value = required(name);
  const num = Number(value);
  if (Number.isNaN(num)) throw new Error(`Environment variable ${name} must be a number`);
  return num;
}

export const ENV = Object.freeze({
  PORT: requiredNumber("PORT"),
  MONGO_URI: required("MONGO_URI"),

  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: requiredNumber("JWT_EXPIRES_IN"),
  SALT_ROUNDS: requiredNumber("SALT_ROUNDS"),
  NODE_ENV: process.env.NODE_ENV || "development",
  ADMIN_DEFAULT_PASSWORD: required("ADMIN_DEFAULT_PASSWORD"),

  CLOUD_NAME: required("CLOUD_NAME"),
  CLOUD_API_KEY: required("CLOUD_API_KEY"),
  CLOUD_API_SECRET: required("CLOUD_API_SECRET"),

  REDIS_HOST: required("REDIS_HOST"),
  REDIS_PORT: requiredNumber("REDIS_PORT"),
  REDIS_PASSWORD: required("REDIS_PASSWORD"),

  TWILIO_SID: required("TWILIO_SID"),
  TWILIO_AUTH: required("TWILIO_AUTH"),
  TWILIO_SMS_FROM: required("TWILIO_SMS_FROM"),
  TWILIO_WHATSAPP_FROM: required("TWILIO_WHATSAPP_FROM"),

  EMAIL_HOST: required("EMAIL_HOST"),
  EMAIL_PORT: requiredNumber("EMAIL_PORT"),
  EMAIL_USER: required("EMAIL_USER"),
  EMAIL_PASS: required("EMAIL_PASS"),
  EMAIL_FROM: required("EMAIL_FROM"),

  RAZORPAY_KEY: required("RAZORPAY_KEY"),
  RAZORPAY_SECRET: required("RAZORPAY_SECRET"),
});
