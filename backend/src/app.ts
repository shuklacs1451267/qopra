import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import routes from "./routes";
import { errorHandler } from "./core/middlewares/errorHandler";
import { startCronJobs } from "./cron/index";
import { logger } from "./config/logger";

const app = express();

startCronJobs();

// @security: Set HTTP headers to protect against well known web vulnerabilities (e.g., XSS, clickjacking)
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));

// @security: Prevent NoSQL injection attacks by removing $ and . from request data
app.use(mongoSanitize());

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV !== "production") {
  app.use(
    morgan("dev", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use("/api", routes);

app.use(errorHandler);

export default app;
