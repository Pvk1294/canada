import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OTP_DEV_API_KEY = Deno.env.get('OTP_DEV_API_KEY');
    if (!OTP_DEV_API_KEY) {
      throw new Error('OTP_DEV_API_KEY is not configured');
    }

    const { phone, code, countryCode } = await req.json();
    if (!phone || !code) {
      return new Response(JSON.stringify({ success: false, error: 'Phone and code are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawPhone = String(phone ?? '');
    const normalizedCode = String(code ?? '').trim();
    const digitsOnlyPhone = rawPhone.replace(/\D/g, '');
    const prefix = String(countryCode ?? '1').replace(/\D/g, '') || '1';
    const phoneWithoutPlus = rawPhone.trim().startsWith('+')
      ? rawPhone.replace(/\D/g, '')
      : `${prefix}${digitsOnlyPhone}`;

    const response = await fetch(
      `https://api.otp.dev/v1/verifications?code=${encodeURIComponent(normalizedCode)}&phone=${encodeURIComponent(phoneWithoutPlus)}`,
      {
        method: 'GET',
        headers: {
          'X-OTP-Key': OTP_DEV_API_KEY,
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('OTP.dev verify error:', JSON.stringify(data));
      return new Response(JSON.stringify({ success: false, error: 'Invalid or expired code' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const matches = Array.isArray(data?.data) ? data.data : [];
    const isVerified = matches.length > 0;

    return new Response(JSON.stringify({
      success: isVerified,
      error: isVerified ? null : 'Invalid or expired code',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error verifying OTP:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
