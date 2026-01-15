import { Router } from "express";
import { UserController, UserTwilioController   } from "../../modules/users/user.controller";
import { requireAuth } from "../../core/middlewares/auth";
import { PaymentController } from "../../modules/payment/payment.controller";

const router = Router();

router.post("/create-order", requireAuth(["client"]), PaymentController.createOrder);
router.post("/webhook", requireAuth(), PaymentController.webhook);

export default router;