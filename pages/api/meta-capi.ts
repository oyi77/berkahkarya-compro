import type { NextApiRequest, NextApiResponse } from 'next';
import { TRACKING } from '@/lib/tracking';
import crypto from 'crypto';

const GRAPH_API = `https://graph.facebook.com/v19.0/${TRACKING.META_PIXEL_ID}/events`;

function hashSHA256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, event_source_url, user_agent, client_ip, fbc, fbp, custom_data } = req.body;

    const event = {
      data: [
        {
          event_name: event_name || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: event_source_url || '',
          action_source: 'website',
          user_data: {
            client_ip_address: client_ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
            client_user_agent: user_agent || req.headers['user-agent'] || '',
            ...(fbc && { fbc }),
            ...(fbp && { fbp }),
          },
          ...(custom_data && { custom_data }),
        },
      ],
      // test_event_code: 'TEST12345', // Uncomment for testing in Events Manager
    };

    const response = await fetch(`${GRAPH_API}?access_token=${TRACKING.META_CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ success: true, events_received: data.events_received });
  } catch (error) {
    console.error('Meta CAPI error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
