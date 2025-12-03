import { Request, Response } from "express";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../core/utils/response";
import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier";

export const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    let avatarUrl = "";

    if (req.file) {
      avatarUrl = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) return reject(error as unknown as Error);
            resolve(result?.secure_url || "");
          }
        );

        if (!req.file) {
          throw new Error("Avatar file is required");
        }

        // Pipe the buffer to Cloudinary upload stream
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    const user = await AuthService.register({
      ...req.body,
      avatar: avatarUrl,
    });

    sendSuccess(res, user, "User registered", 201);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await AuthService.login(email, password);
    sendSuccess(res, data, "Login successful", 200);
  }),
};
