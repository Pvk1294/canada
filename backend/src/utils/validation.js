export function validatePhone(phone, countryCode) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  const prefix = String(countryCode ?? "1").replace(/\D/g, "") || "1";

  if (digits.length < 10) {
    return { valid: false, fullPhone: null, error: "Phone must be at least 10 digits" };
  }

  return { valid: true, fullPhone: `${prefix}${digits}`, error: null };
}

export function validateOTPCode(code) {
  const trimmed = String(code ?? "").trim();
  if (!/^\d{4}$/.test(trimmed)) {
    return { valid: false, error: "OTP must be exactly 4 digits" };
  }
  return { valid: true, error: null };
}

export function validateLeadPayload(body) {
  const errors = [];

  if (!body.full_name || !String(body.full_name).trim()) {
    errors.push("full_name is required");
  }
  if (!body.phone || String(body.phone).replace(/\D/g, "").length < 10) {
    errors.push("Valid phone is required (10+ digits)");
  }
  if (!body.email || !String(body.email).trim()) {
    errors.push("email is required");
  }

  return { valid: errors.length === 0, errors };
}

export function sanitize(str) {
  if (typeof str !== "string") return str;
  return str.trim().replace(/<[^>]*>/g, "");
}
