import { validatePhone, validateLeadPayload } from "../utils/validation.js";
import { isVerified, removePhone } from "../store/otpStore.js";
import { sendLeadEmail } from "../services/email.service.js";
import { syncToSheets } from "../services/sheets.service.js";

export async function handleSubmitLead(req, res) {
  try {
    const body = req.body;

    const validation = validateLeadPayload(body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    // Build full phone to check OTP store
    const countryCode = body.country_code || "1";
    const phoneResult = validatePhone(body.phone, countryCode);
    if (!phoneResult.valid) {
      return res.status(400).json({ success: false, error: "Invalid phone number" });
    }

    // CRITICAL: Server-side OTP verification check
    if (!isVerified(phoneResult.fullPhone)) {
      return res.status(403).json({
        success: false,
        error: "Phone not verified. Please verify your phone first.",
      });
    }

    // Fire email + sheets in parallel (non-blocking)
    const [emailResult, sheetsResult] = await Promise.allSettled([
      sendLeadEmail(body),
      syncToSheets(body),
    ]);

    console.log("Email result:", emailResult.status, emailResult.value || emailResult.reason);
    console.log("Sheets result:", sheetsResult.status, sheetsResult.value || sheetsResult.reason);

    // Remove phone from store to prevent reuse
    removePhone(phoneResult.fullPhone);

    return res.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err.message);
    return res.status(500).json({ success: false, error: "Submission failed. Please try again." });
  }
}
