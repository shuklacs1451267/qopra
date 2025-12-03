import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import { logger } from "../../config/logger";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: "Internal Server Error" });
};
