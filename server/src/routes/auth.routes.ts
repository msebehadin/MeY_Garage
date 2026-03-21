import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMIddleware } from "../middlewares/requireAuth";

const router = Router();

router.post("/login", authController.login);
router.get("/me", authMIddleware, authController.me);
router.post("/logout", authController.logout);

export default router;
