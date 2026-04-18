import { sendContactEmail } from "../services/email.service.js";

export async function handleContactForm(req, res) {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  if (!firstName?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const result = await sendContactEmail({ firstName, lastName, email, phone, subject, message });

  if (!result.success) {
    return res.status(500).json({ success: false, error: "Failed to send message. Please try again." });
  }

  return res.json({ success: true });
}
