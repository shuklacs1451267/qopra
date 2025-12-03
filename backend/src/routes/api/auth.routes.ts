import { Router } from "express";
import { AuthController } from "../../modules/auth/auth.controller";
import { upload } from "../../core/middlewares/upload";

const router = Router();

router.post("/register", upload.single("avatar"), AuthController.register);
router.post("/login", AuthController.login);

export default router;
