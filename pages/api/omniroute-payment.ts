import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, email, name } = req.body;

  // Pricing mapping
  const prices: Record<string, { idr: number; usd: number }> = {
    starter: { idr: 75000, usd: 5 },
    pro: { idr: 285000, usd: 19 },
  };

  if (!prices[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  const { idr, usd } = prices[plan];
  
  // Generate payment link (placeholder - integrate with actual payment gateway)
  const paymentUrl = `https://wa.me/6285732740006?text=Halo%2C%20saya%20mau%20bayar%20OmniRoute%20${plan.toUpperCase()}%20-%20Rp%20${idr.toLocaleString('id-ID')}%20%2F%20%24${usd}%0A%0ANama%3A%20${encodeURIComponent(name)}%0AEmail%3A%20${encodeURIComponent(email)}`;

  return res.status(200).json({
    success: true,
    paymentUrl,
    plan,
    amount: { idr, usd },
  });
}
