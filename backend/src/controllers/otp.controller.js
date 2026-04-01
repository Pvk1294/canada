import { validatePhone, validateOTPCode } from "../utils/validation.js";
import { setPhone, markVerified } from "../store/otpStore.js";
import { sendOTP, verifyOTP } from "../services/otp.service.js";

export async function handleSendOTP(req, res) {
  try {
    const { phone, countryCode } = req.body;

    const phoneResult = validatePhone(phone, countryCode);
    if (!phoneResult.valid) {
      return res.status(400).json({ success: false, error: phoneResult.error });
    }

    setPhone(phoneResult.fullPhone);
    await sendOTP(phoneResult.fullPhone);

    return res.json({ success: true });
  } catch (err) {
    console.error("Send OTP error:", err.message);
    return res.status(500).json({ success: false, error: "Failed to send verification code" });
  }
}

export async function handleVerifyOTP(req, res) {
  try {
    const { phone, code, countryCode } = req.body;

    const phoneResult = validatePhone(phone, countryCode);
    if (!phoneResult.valid) {
      return res.status(400).json({ success: false, error: phoneResult.error });
    }

    const codeResult = validateOTPCode(code);
    if (!codeResult.valid) {
      return res.status(400).json({ success: false, error: codeResult.error });
    }

    const result = await verifyOTP(phoneResult.fullPhone, String(code).trim());

    if (result.verified) {
      markVerified(phoneResult.fullPhone);
      return res.json({ success: true });
    }

    return res.json({ success: false, error: "Invalid or expired code" });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    return res.status(500).json({ success: false, error: "Verification failed" });
  }
}
