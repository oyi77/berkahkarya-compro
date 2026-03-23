import type { NextApiRequest, NextApiResponse } from 'next';
import { TRACKING } from '@/lib/tracking';
import crypto from 'crypto';

function hash(value: string) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { event_name, event_source_url, user_agent, custom_data } = req.body;
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '';

    const payload = {
      pixel_code: TRACKING.TIKTOK_PIXEL_ID,
      event: event_name || 'ViewContent',
      event_time: Math.floor(Date.now() / 1000),
      event_source: 'web',
      url: event_source_url || '',
      context: {
        user: {
          ip: hash(ip),
          user_agent: user_agent || req.headers['user-agent'] || '',
        },
        page: {
          url: event_source_url || '',
        },
      },
      ...(custom_data && { properties: custom_data }),
    };

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TRACKING.TIKTOK_EVENTS_API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('TikTok CAPI error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('TikTok CAPI error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
