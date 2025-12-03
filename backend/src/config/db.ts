import mongoose from "mongoose";
import { ENV } from "./env";
import { logger } from "./logger";

export const connectDB = async () => {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await mongoose.connect(ENV.MONGO_URI, {
        dbName: "qopra",
        autoIndex: true,
      });
      logger.info(`MongoDB connected successfully (${ENV.NODE_ENV})`);
      break;
    } catch (error) {
      attempt++;
      logger.error(`MongoDB connection attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        logger.error("Could not connect to MongoDB after multiple attempts. Exiting...");
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};
