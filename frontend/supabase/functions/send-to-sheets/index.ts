import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL');
    if (!webhookUrl) {
      throw new Error('GOOGLE_SHEETS_WEBHOOK_URL not configured');
    }

    const lead = await req.json();
    const payload = JSON.stringify(lead);

    // Google Apps Script redirects POST to GET (302), so we must follow manually
    let response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      redirect: 'follow',
    });

    // If redirected, re-POST to the new URL
    if (response.redirected) {
      response = await fetch(response.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });
    }

    const text = await response.text();
    console.log('Sheets response:', response.status, text);

    return new Response(JSON.stringify({ success: true, status: response.status, response: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sheets error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
