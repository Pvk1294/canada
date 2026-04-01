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
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) throw new Error('RESEND_API_KEY not configured');

    const notificationEmail = (Deno.env.get('NOTIFICATION_EMAIL') || '').toLowerCase().trim();
    if (!notificationEmail) throw new Error('NOTIFICATION_EMAIL not configured');
    console.log('Sending to:', notificationEmail);

    const lead = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🚗 New Lead Received!</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0;">A new pre-approval application has been submitted.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">👤 Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Full Name</td><td style="padding: 6px 0; font-weight: bold;">${lead.full_name || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td style="padding: 6px 0; font-weight: bold;">${lead.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0; font-weight: bold;">${lead.email || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Date of Birth</td><td style="padding: 6px 0;">${lead.date_of_birth || 'N/A'}</td></tr>
          </table>

          <h2 style="color: #1e3a5f; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">📍 Address</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Address</td><td style="padding: 6px 0;">${lead.address || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Province</td><td style="padding: 6px 0;">${lead.province || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Postal Code</td><td style="padding: 6px 0;">${lead.postal_code || 'N/A'}</td></tr>
          </table>

          <h2 style="color: #1e3a5f; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">🚘 Vehicle & Budget</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Vehicle Type</td><td style="padding: 6px 0; font-weight: bold;">${lead.vehicle_type || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Monthly Budget</td><td style="padding: 6px 0; font-weight: bold;">${lead.monthly_budget || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Down Payment</td><td style="padding: 6px 0;">${lead.down_payment || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Has Trade-In</td><td style="padding: 6px 0;">${lead.has_trade || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Timeline</td><td style="padding: 6px 0;">${lead.timeline || 'N/A'}</td></tr>
          </table>

          <h2 style="color: #1e3a5f; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">💼 Employment & Credit</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Credit Score</td><td style="padding: 6px 0; font-weight: bold;">${lead.credit_score || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Job Type</td><td style="padding: 6px 0;">${lead.job_type || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Income</td><td style="padding: 6px 0;">${lead.income || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Employer</td><td style="padding: 6px 0;">${lead.employer || 'N/A'}</td></tr>
            ${lead.company_name ? `<tr><td style="padding: 6px 0; color: #64748b;">Company</td><td style="padding: 6px 0;">${lead.company_name}</td></tr>` : ''}
            ${lead.profession ? `<tr><td style="padding: 6px 0; color: #64748b;">Profession</td><td style="padding: 6px 0;">${lead.profession}</td></tr>` : ''}
          </table>

          <h2 style="color: #1e3a5f; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">📞 Contact Preference</h2>
          <p style="margin: 0; font-weight: bold;">${lead.preferred_contact || 'N/A'}</p>
        </div>

        <div style="background: #1e3a5f; padding: 16px 24px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">Lead captured at ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lead Notifications <onboarding@resend.dev>',
        to: [notificationEmail],
        subject: `🚗 New Lead: ${lead.full_name} — ${lead.vehicle_type || 'Vehicle'}`,
        html: emailHtml,
      }),
    });

    const data = await res.json();
    console.log('Resend response:', res.status, JSON.stringify(data));

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
