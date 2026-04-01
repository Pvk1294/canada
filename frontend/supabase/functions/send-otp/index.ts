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

    const { phone, countryCode } = await req.json();
    if (!phone) {
      return new Response(JSON.stringify({ success: false, error: 'Phone number is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawPhone = String(phone ?? '');
    const digitsOnlyPhone = rawPhone.replace(/\D/g, '');
    const prefix = String(countryCode ?? '1').replace(/\D/g, '') || '1';
    const fullPhone = rawPhone.trim().startsWith('+')
      ? rawPhone.replace(/\D/g, '')
      : `${prefix}${digitsOnlyPhone}`;

    const response = await fetch('https://api.otp.dev/v1/verifications', {
      method: 'POST',
      headers: {
        'X-OTP-Key': OTP_DEV_API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          channel: 'sms',
          phone: fullPhone,
          sender: 'OTP Dev',
          template: '289f9817-dcd7-4f94-8080-b7f43871a623',
          code_length: 4,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OTP.dev send error:', JSON.stringify(data));
      throw new Error(`OTP.dev API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending OTP:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
