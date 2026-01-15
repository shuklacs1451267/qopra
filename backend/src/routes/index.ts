import { Router } from "express";
import authRoutes from "./api/auth.routes";
import userRoutes from "./api/user.routes";
import campaignsRoutes from "./api/campaign.routes"
import logRoutes from "../modules/logs/log.routes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/campaigns", campaignsRoutes);
router.use("/logs", logRoutes);
router.use("/order", logRoutes);

// health
router.get("/health", (_req, res) => res.json({ ok: true, service: "backend" }));

export default router;
