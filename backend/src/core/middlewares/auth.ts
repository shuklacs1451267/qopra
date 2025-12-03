import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../errors/Unauthorized";
import Forbidden from "../errors/Forbidden";
import { ENV } from "../../config/env";

export type AuthRequest = Request & { user?: { id: string; role: string } };

export const requireAuth = (roles: string[] = []) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError("Token missing");

    try {
      const payload = jwt.verify(token, ENV.JWT_SECRET) as { id: string; role: string };

      req.user = { id: payload.id, role: payload.role };

      if (roles.length && !roles.includes(payload.role)) {
        throw new Forbidden("Insufficient permissions");
      }

      return next();
    } catch (err: unknown) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new ApiError("Invalid or expired token");
      }
      throw err;
    }
  };
};
