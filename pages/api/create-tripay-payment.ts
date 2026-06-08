import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { TRIPAY, PRICING } from '@/lib/payment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, customer_name, customer_email, customer_phone, method } = req.body;

  if (!plan || !PRICING[plan]) {
    return res.status(400).json({
      error: `Invalid plan. Available: ${Object.keys(PRICING).join(', ')}`,
    });
  }

  const product = PRICING[plan];
  const merchant_ref = `BLJ-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const amount = product.price;

  // HMAC-SHA256 signature: merchant_code + merchant_ref + amount
  const raw = `${TRIPAY.MERCHANT_CODE}${merchant_ref}${amount}`;
  const signature = crypto.createHmac('sha256', TRIPAY.PRIVATE_KEY)
    .update(raw)
    .digest('hex');

  const payload: Record<string, any> = {
    method: method || 'QRIS',
    merchant_ref,
    amount,
    customer_name: customer_name || 'Student',
    customer_email: customer_email || 'student@example.com',
    customer_phone: customer_phone || '',
    order_items: [{ name: product.name, price: amount, quantity: 1 }],
    callback_url: TRIPAY.CALLBACK_URL,
    return_url: TRIPAY.RETURN_URL,
    expired_time: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    signature,
  };

  try {
    const response = await fetch(`${TRIPAY.BASE_URL}/transaction/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TRIPAY.API_KEY}`,
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
      qr_string: data.data.qr_string || null,
      amount: data.data.amount,
      amount_received: data.data.amount_received,
      plan,
    });
  } catch (error: any) {
    console.error('Tripay request failed:', error);
    return res.status(500).json({ error: 'Payment gateway error', message: error.message });
  }
}
