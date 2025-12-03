import { Router } from "express";
import { LogController } from "./log.controller";
import { requireAuth } from "../../core/middlewares/auth";

const router = Router();
router.get("/campaign/:id", requireAuth(), LogController.listByCampaign);
export default router;
