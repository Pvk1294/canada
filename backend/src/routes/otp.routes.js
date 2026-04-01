import { Router } from "express";
import { handleSendOTP, handleVerifyOTP } from "../controllers/otp.controller.js";
import { otpRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/send", otpRateLimiter, handleSendOTP);
router.post("/verify", otpRateLimiter, handleVerifyOTP);

export default router;
