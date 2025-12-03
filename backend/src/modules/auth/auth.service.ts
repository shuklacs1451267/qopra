import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ApiError from "../../core/errors/Unauthorized";
import BadRequest from "../../core/errors/BadRequest";
import { UserModel, UserDoc } from "../users/user.model";
import { ENV } from "../../config/env";


export const AuthService = {
  async register(dto: {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "client";
    phone?: string;
    companyName?: string;
    website?: string;
    avatar?: string;
  }) {
    const existing = await UserModel.findOne({ email: dto.email });
    if (existing) throw new BadRequest("Email already registered");

    const salt = await bcrypt.genSalt(ENV.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user: UserDoc = await UserModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role || "client",
      phone: dto.phone || "",
      companyName: dto.companyName || "",
      website: dto.website || "",
      avatar: dto.avatar || "",
      isVerified: false,
      status: "active",
      totalCampaigns: 0,
      credits: 0,
      plan: "free",
      lastLogin: null,
    });

    const userObj = user.toObject();
    delete (userObj as any).password;

    return userObj;
  },

  async login(email: string, password: string) {
    const user: UserDoc | null = await UserModel.findOne({ email });
    if (!user) throw new ApiError("cdcscfscInvalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ApiError("wrong Invalid credentials");

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: Number(ENV.JWT_EXPIRES_IN) }
    );

    const u = user.toObject();
    delete (u as any).password;

    return { token, user: u };
  },
};
