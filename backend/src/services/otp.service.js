const OTP_DEV_BASE = "https://api.otp.dev/v1/verifications";
const TEMPLATE_ID = "289f9817-dcd7-4f94-8080-b7f43871a623";

export async function sendOTP(fullPhone) {
  const apiKey = process.env.OTP_API_KEY;
  if (!apiKey) throw new Error("OTP_API_KEY is not configured");

  const res = await fetch(OTP_DEV_BASE, {
    method: "POST",
    headers: {
      "X-OTP-Key": apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        channel: "sms",
        phone: fullPhone,
        sender: "OTP Dev",
        template: TEMPLATE_ID,
        code_length: 4,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("OTP.dev send error:", JSON.stringify(data));
    throw new Error(`OTP.dev API error [${res.status}]`);
  }

  return data;
}

export async function verifyOTP(fullPhone, code) {
  const apiKey = process.env.OTP_API_KEY;
  if (!apiKey) throw new Error("OTP_API_KEY is not configured");

  const url = `${OTP_DEV_BASE}?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(fullPhone)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-OTP-Key": apiKey,
      "Accept": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("OTP.dev verify error:", JSON.stringify(data));
    return { verified: false };
  }

  const matches = Array.isArray(data?.data) ? data.data : [];
  return { verified: matches.length > 0 };
}
