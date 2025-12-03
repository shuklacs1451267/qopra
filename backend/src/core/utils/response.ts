import { Response } from "express";

export const sendSuccess = (res: Response, data: any = null, message = "OK", status = 200) =>
  res.status(status).json({ success: true, message, data });

export const sendError = (res: Response, message = "Error", status = 400) =>
  res.status(status).json({ success: false, message });
