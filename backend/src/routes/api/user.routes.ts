import { Router } from "express";
import { UserController, UserTwilioController   } from "../../modules/users/user.controller";
import { requireAuth } from "../../core/middlewares/auth";
import { DashboardController } from "../../modules/users/dashboard.controller";

const router = Router();

router.get("/me", requireAuth(), UserController.getMe);
router.get("/", requireAuth(["admin"]), UserController.list);
router.get("/dashboard", requireAuth(["client"]), DashboardController.clientDashboard);

// Twilio number verification
router.post("/twilio/send-code", requireAuth(), UserTwilioController.sendTwilioOTP);
router.post("/twilio/verify-code", requireAuth(), UserTwilioController.verifyTwilioOTP);

export default router;