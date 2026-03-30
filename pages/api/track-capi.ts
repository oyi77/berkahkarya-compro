import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Meta CAPI Configuration
const PIXEL_ID = process.env.META_PIXEL_ID || ''; // Add to .env.local
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || ''; // Add to .env.local
const CAPI_ENDPOINT = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`;

// Hash helper for PII (email, phone, etc.)
const hashSHA256 = (data: string): string => {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      event_name,
      event_time,
      action_source,
      event_source_url,
      user_data,
      custom_data,
    } = req.body;

    // Get IP from headers (handle proxy/CloudFlare)
    const clientIP =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      '';

    // Build CAPI payload
    const payload = {
      data: [
        {
          event_name,
          event_time,
          action_source: action_source || 'website',
          event_source_url,
          user_data: {
            client_ip_address: clientIP,
            client_user_agent: user_data?.client_user_agent || req.headers['user-agent'],
            // Hash PII if provided (optional)
            // em: user_data?.email ? hashSHA256(user_data.email) : undefined,
            // ph: user_data?.phone ? hashSHA256(user_data.phone) : undefined,
            fbc: req.cookies._fbc || undefined, // Facebook Click ID
            fbp: req.cookies._fbp || undefined, // Facebook Browser ID
          },
          custom_data: custom_data || {},
        },
      ],
      access_token: ACCESS_TOKEN,
    };

    // Send to Meta CAPI
    const response = await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[CAPI Error]', result);
      return res.status(response.status).json({ error: 'CAPI request failed', details: result });
    }

    console.log('[CAPI Success]', { event_name, event_time });
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error('[CAPI Exception]', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
