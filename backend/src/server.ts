require("express-async-errors");

import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import { logger } from "./config/logger";
import { UserService } from "./modules/users/user.service";
import { startWorker } from "./core/workers/worker";

const start = async () => {
  try {
    await connectDB();
    await UserService.createAdminIfNotExists();

    // @worker: Start the BullMQ worker
    startWorker();

    app.listen(ENV.PORT, () => {
      logger.info(`[SERVER STARTUP] Backend listening on port ${ENV.PORT} — env:${ENV.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("[SERVER STARTUP] Failed to start server:", error);
    process.exit(1);
  }
};

start();
