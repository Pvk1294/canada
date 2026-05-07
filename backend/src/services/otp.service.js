function twilioAuthHeader() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid) throw new Error("TWILIO_ACCOUNT_SID is not configured");
  if (!authToken) throw new Error("TWILIO_AUTH_TOKEN is not configured");
  return "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64");
}

function verifyServiceUrl(path = "") {
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!serviceSid) throw new Error("TWILIO_VERIFY_SERVICE_SID is not configured");
  return `https://verify.twilio.com/v2/Services/${serviceSid}${path}`;
}

export async function sendOTP(fullPhone) {
  const res = await fetch(verifyServiceUrl("/Verifications"), {
    method: "POST",
    headers: {
      Authorization: twilioAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: fullPhone, Channel: "sms" }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Twilio send error:", JSON.stringify(data));
    throw new Error(`Twilio Verify API error [${res.status}]`);
  }

  return data;
}

export async function verifyOTP(fullPhone, code) {
  const res = await fetch(verifyServiceUrl("/VerificationCheck"), {
    method: "POST",
    headers: {
      Authorization: twilioAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: fullPhone, Code: code }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Twilio verify error:", JSON.stringify(data));
    return { verified: false };
  }

  return { verified: data.status === "approved" };
}
