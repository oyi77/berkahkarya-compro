import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * Tripay Callback Webhook — berkahkarya.org/webhook/tripay
 *
 * Signature verification: HMAC-SHA256(raw JSON body, TRIPAY_PRIVATE_KEY)
 * compared against X-Callback-Signature header.
 *
 * Response MUST be {"success": true} — otherwise Tripay retries 3× at 2-min intervals.
 *
 * On PAID: forwards to bridge (bridge.aitradepulse.com:8765) to activate license.
 */

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://127.0.0.1:8765';
const PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // --- Signature verification ---
    // Tripay sends raw JSON body + X-Callback-Signature header.
    // We must verify: HMAC-SHA256(body, private_key) === X-Callback-Signature
    const rawBody = JSON.stringify(req.body);
    const callbackSig = (req.headers['x-callback-signature'] as string) || '';
    const callbackEvent = (req.headers['x-callback-event'] as string) || '';

    if (!PRIVATE_KEY) {
      console.error('[TRIPAY-WEBHOOK] TRIPAY_PRIVATE_KEY not configured');
      return res.status(500).json({ error: 'Signature verification not configured' });
    }

    const expectedSig = crypto
      .createHmac('sha256', PRIVATE_KEY)
      .update(rawBody)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(callbackSig))) {
      console.warn('[TRIPAY-WEBHOOK] Invalid signature', {
        expected: expectedSig.slice(0, 16) + '...',
        got: callbackSig.slice(0, 16) + '...',
      });
      return res.status(403).json({ error: 'Invalid signature' });
    }

    // --- Parse callback data ---
    const {
      reference,
      merchant_ref,
      status,
      total_amount,
      amount_received,
      fee_merchant,
      fee_customer,
      total_fee,
      payment_method_code,
      payment_method,
      is_closed_payment,
      paid_at,
      note,
    } = req.body;

    console.log('[TRIPAY-WEBHOOK]', {
      event: callbackEvent,
      reference,
      merchant_ref,
      status,
      total_amount,
    });

    // --- Process payment ---
    if (status === 'PAID') {
      console.log(`[TRIPAY-WEBHOOK] ✅ PAID ${reference} | merchant=${merchant_ref} | Rp ${total_amount}`);

      // Forward to bridge to activate license + send Telegram alert
      try {
        const fwdRes = await fetch(`${BRIDGE_URL}/webhook/tripay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Callback-Signature': callbackSig,
            'X-Callback-Event': callbackEvent,
          },
          body: rawBody,
          signal: AbortSignal.timeout(10000),
        });
        const fwdData = await fwdRes.json();
        console.log('[TRIPAY-WEBHOOK] Bridge response:', fwdData);
      } catch (fwdErr: any) {
        // Bridge might be unreachable — log but don't fail the webhook
        console.error('[TRIPAY-WEBHOOK] Bridge forward failed:', fwdErr.message);
      }
    } else if (status === 'EXPIRED' || status === 'FAILED') {
      console.log(`[TRIPAY-WEBHOOK] ❌ ${status} ${reference}`);
    } else {
      console.log(`[TRIPAY-WEBHOOK] ℹ️ Status: ${status} | ${reference}`);
    }

    // MUST return {"success": true} — Tripay retries on anything else
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[TRIPAY-WEBHOOK] Handler error:', err.message);
    // Still return 200 + success to prevent Tripay retries for internal errors
    return res.status(200).json({ success: true });
  }
}
