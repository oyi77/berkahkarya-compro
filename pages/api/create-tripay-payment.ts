import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY || '';
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || '';
const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE || '';
const TRIPAY_BASE = 'https://tripay.co.id/api';

const PRICING: Record<string, { name: string; price: number }> = {
  'video-course': { name: '📹 Video Course Belajar AI', price: 299000 },
  'online-live': { name: '💻 Online Live Belajar AI', price: 799000 },
  'offline-workshop': { name: '🏫 Offline Workshop Belajar AI', price: 2500000 },
  'monthly-sub': { name: '🔄 Monthly Subscription Belajar AI', price: 199000 },
  'platinum-pass': { name: '👑 Platinum Pass Belajar AI', price: 9000000 },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!TRIPAY_API_KEY || !TRIPAY_PRIVATE_KEY || !TRIPAY_MERCHANT_CODE) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  const { plan, customer_name, customer_email, customer_phone, method } = req.body;

  if (!plan || !PRICING[plan]) {
    return res.status(400).json({ error: `Invalid plan. Available: ${Object.keys(PRICING).join(', ')}` });
  }

  const product = PRICING[plan];
  const merchant_ref = `BLJ-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const amount = product.price;

  // HMAC-SHA256 signature: merchant_code + merchant_ref + amount
  const signature = crypto
    .createHmac('sha256', TRIPAY_PRIVATE_KEY)
    .update(TRIPAY_MERCHANT_CODE + merchant_ref + amount)
    .digest('hex');

  const order_items = [
    {
      sku: plan,
      name: product.name,
      price: amount,
      quantity: 1,
      subtotal: amount,
    },
  ];

  const payload: Record<string, any> = {
    method: method || 'QRIS',
    merchant_ref,
    amount,
    customer_name: customer_name || 'Student',
    customer_email: customer_email || 'student@example.com',
    customer_phone: customer_phone || '',
    order_items,
    return_url: 'https://berkahkarya.org/id/belajarai/success',
    expired_time: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    signature,
  };

  try {
    const response = await fetch(`${TRIPAY_BASE}/transaction/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TRIPAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Tripay error:', data);
      return res.status(400).json({ error: data.message || 'Tripay transaction failed', details: data });
    }

    return res.status(200).json({
      success: true,
      reference: data.data.reference,
      merchant_ref,
      checkout_url: data.data.checkout_url,
      pay_code: data.data.pay_code || null,
      qr_url: data.data.qr_url || null,
      amount,
      plan,
    });
  } catch (error: any) {
    console.error('Tripay request failed:', error);
    return res.status(500).json({ error: 'Payment gateway error', message: error.message });
  }
}
