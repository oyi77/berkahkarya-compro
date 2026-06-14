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
 * On PAID: sends Telegram notification to admin.
 */

const TELEGRAM_TOKEN = process.env.VILONA_TRADEFX_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN_1AI || '';
const TELEGRAM_CHAT_ID = process.env.GROUP_CHAT_ID || process.env.ADMIN_CHAT_ID || '';

async function sendTelegram(text: string) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[TRIPAY-WEBHOOK] Telegram not configured — skipping alert');
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (!data.ok) console.error('[TRIPAY-WEBHOOK] Telegram error:', data.description);
  } catch (err: any) {
    console.error('[TRIPAY-WEBHOOK] Telegram send failed:', err.message);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // --- Signature verification ---
    const rawBody = JSON.stringify(req.body);
    const callbackSig = (req.headers['x-callback-signature'] as string) || '';
    const callbackEvent = (req.headers['x-callback-event'] as string) || '';

    const PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || '';
    if (!PRIVATE_KEY) {
      console.error('[TRIPAY-WEBHOOK] TRIPAY_PRIVATE_KEY not configured');
      return res.status(500).json({ error: 'Signature verification not configured' });
    }

    const expectedSig = crypto
      .createHmac('sha256', PRIVATE_KEY)
      .update(rawBody)
      .digest('hex');

    if (!callbackSig || callbackSig.length !== expectedSig.length ||
        !crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(callbackSig))) {
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
      payment_method_code,
      payment_method,
      is_closed_payment,
      paid_at,
    } = req.body;

    console.log('[TRIPAY-WEBHOOK]', JSON.stringify({
      event: callbackEvent, reference, merchant_ref, status, total_amount,
    }));

    // --- Process payment ---
    if (status === 'PAID') {
      console.log(`[TRIPAY-WEBHOOK] ✅ PAID ${reference} | merchant=${merchant_ref} | Rp ${total_amount}`);

      const method = payment_method || payment_method_code || 'unknown';
      const msg =
        `💰 <b>TRIPAY ✅ PAID</b>\n\n` +
        `📋 Ref: <code>${reference}</code>\n` +
        `🔑 Merchant: <code>${merchant_ref}</code>\n` +
        `💵 Rp ${Number(total_amount).toLocaleString('id-ID')}\n` +
        `💳 ${method}\n` +
        (is_closed_payment ? `🏦 Closed\n` : '');

      await sendTelegram(msg);
    } else if (status === 'EXPIRED' || status === 'FAILED') {
      console.log(`[TRIPAY-WEBHOOK] ❌ ${status} ${reference}`);
      await sendTelegram(`❌ TRIPAY ${status}\nRef: ${reference}\nMerchant: ${merchant_ref}`);
    } else {
      console.log(`[TRIPAY-WEBHOOK] ℹ️ Status: ${status} | ${reference}`);
    }

    // MUST return {"success": true}
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[TRIPAY-WEBHOOK] Handler error:', err.message);
    return res.status(200).json({ success: true });
  }
}
