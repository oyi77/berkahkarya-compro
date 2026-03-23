/**
 * API Route: /api/admin-panel/prompts
 * Proxy ke bot API untuk CRUD prompt management
 * Auth: ADMIN_PANEL_KEY env var
 */
import type { NextApiRequest, NextApiResponse } from 'next';

const BOT_API_URL = process.env.BOT_API_URL || 'https://api-saas.aitradepulse.com';
const BOT_ADMIN_PASSWORD = process.env.BOT_ADMIN_PASSWORD || 'BerkahKarya2026!';
const PANEL_KEY = process.env.ADMIN_PANEL_KEY || 'BerkahKarya2026!';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(':' + BOT_ADMIN_PASSWORD).toString('base64'),
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Auth check
  const key = req.headers['x-admin-key'] || req.query.key;
  if (key !== PANEL_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const baseUrl = `${BOT_API_URL}/api/admin-prompts`;

  try {
    if (req.method === 'GET') {
      const niche = req.query.niche ? `?niche=${req.query.niche}` : '';
      const r = await fetch(`${baseUrl}${niche}`, { headers: authHeaders() });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const r = await fetch(baseUrl, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(r.ok ? 200 : 400).json(data);
    }

    if (req.method === 'PUT' && id) {
      const r = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(r.ok ? 200 : 400).json(data);
    }

    if (req.method === 'DELETE' && id) {
      const r = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const data = await r.json();
      return res.status(r.ok ? 200 : 400).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin panel proxy error:', err);
    return res.status(500).json({ error: 'Bot API unreachable' });
  }
}
