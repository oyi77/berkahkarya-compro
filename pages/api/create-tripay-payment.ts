import type { NextApiRequest, NextApiResponse } from 'next';

const BRIDGE_URL = 'https://phantomfx.aitradepulse.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, customer_name, customer_email, customer_phone, method } = req.body;

  if (!plan) {
    return res.status(400).json({ error: 'Plan is required' });
  }

  try {
    const response = await fetch(`${BRIDGE_URL}/api/create-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan,
        customer_name: customer_name || 'Student',
        customer_email: customer_email || 'student@example.com',
        customer_phone: customer_phone || '',
        method: method || 'QRIS',
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ error: data.error || 'Payment failed', details: data });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Bridge proxy error:', error);
    return res.status(500).json({ error: 'Payment gateway error', message: error.message });
  }
}
