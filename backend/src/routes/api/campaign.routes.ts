import { Router } from "express";
import { CampaignController } from "../../modules/campaign/campaign.controller";
import { requireAuth } from "../../core/middlewares/auth";
import { ResendController } from "../../modules/campaign/resend.controller"

const router = Router();

// Client routes
router.post("/", requireAuth(["client"]), CampaignController.create);
router.get("/me", requireAuth(["client"]), CampaignController.listUser);
router.get("/:id", requireAuth(), CampaignController.getOne);

// Admin routes
router.get("/", requireAuth(["admin"]), CampaignController.listAll);
router.put("/:id", requireAuth(), CampaignController.update);
router.delete("/:id", requireAuth(), CampaignController.delete);

router.post("/resend/:id", requireAuth(["client","admin"]), ResendController.resendFailed);


export default router;
