export async function syncToSheets(lead) {
  try {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL not configured");
      return { success: false };
    }

    const payload = {
      ...lead,
      timestamp: new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" }),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("Sheets webhook response:", response.status, text);

    return { success: response.ok };
  } catch (err) {
    console.error("Sheets service error:", err.message);
    return { success: false };
  }
}
