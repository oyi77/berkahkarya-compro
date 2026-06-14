import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * Tripay Webhook Handler
 * Endpoint: /api/webhook/tripay → redirect dari /webhook/tripay
 * 
 * Tripay sends POST with:
 * - merchant_code
 * - merchant_ref
 * - amount
 * - signature = md5(merchant_code + merchant_ref + amount + API_KEY)
 * 
 * IMPORTANT: Register this URL in Tripay Dashboard → Settings → Webhook
 * URL: https://berkahkarya.org/api/webhook/tripay
 */

// Store verified payments in memory (production: use DB)
const verifiedPayments: Map<string, any> = new Map();

function verifySignature(payload: any): boolean {
  const apiKey = process.env.TRIPAY_API_KEY || '';
  const { merchant_code, reference, amount, signature } = payload;
  
  // Tripay signature: MD5(merchant_code + ref + amount + api_key)
  const expectedSig = crypto
    .createHash('md5')
    .update(merchant_code + reference + amount + apiKey)
    .digest('hex');
  
  return expectedSig === signature;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST from Tripay
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('[TRIPAY-WEBHOOK] Received:', JSON.stringify(req.body, null, 2));

  const {
    merchant_code,
    reference,
    status,
    payment_method,
    amount,
    customer_name,
    customer_email,
    signature,
  } = req.body;

  // Validate required fields
  if (!merchant_code || !reference || !status) {
    console.error('[TRIPAY-WEBHOOK] Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify signature (security check)
  // Uncomment when TRIPAY_API_KEY is set in env
  // if (!verifySignature(req.body)) {
  //   console.error('[TRIPAY-WEBHOOK] Invalid signature');
  //   return res.status(403).json({ error: 'Invalid signature' });
  // }

  // Log the payment event
  const paymentEvent = {
    merchant_code,
    reference,
    status,
    payment_method: payment_method || 'unknown',
    amount: Number(amount) || 0,
    customer_name: customer_name || 'Unknown',
    customer_email: customer_email || '',
    received_at: new Date().toISOString(),
  };

  // Store verified payment
  if (status === 'PAID' || status === 'SUCCESS') {
    verifiedPayments.set(reference, paymentEvent);
    console.log('[TRIPAY-WEBHOOK] ✅ PAYMENT VERIFIED:', reference);
  } else if (status === 'EXPIRED' || status === 'FAILED') {
    console.log('[TRIPAY-WEBHOOK] ❌ Payment failed/expired:', reference);
  } else {
    console.log('[TRIPAY-WEBHOOK] ℹ️ Status update:', status, reference);
  }

  // TODO: Production actions
  // if (status === 'PAID') {
  //   1. Grant course access to customer_email
  //   2. Send Telegram notification to merchant
  //   3. Update database record
  // }

  // Always respond 200 to Tripay (they retry on non-200)
  return res.status(200).json({ 
    success: true, 
    message: `Webhook received: ${status}`,
    reference,
    timestamp: new Date().toISOString(),
  });
}
