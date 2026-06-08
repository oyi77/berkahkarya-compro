// TriPay Payment Gateway Configuration
// Production credentials
export const TRIPAY = {
  API_KEY: 'kaBCRmNfkqKXHdDgIfsYJhusaTPxBlAdyWCYO3Yc',
  PRIVATE_KEY: 'o74UP-6zUg1-4nOA7-8DJ32-4y0Rv',
  MERCHANT_CODE: 'T23409',
  BASE_URL: 'https://tripay.co.id/api',
  RETURN_URL: 'https://berkahkarya.org/id/belajarai',
  CALLBACK_URL: 'https://phantomfx.aitradepulse.com/webhook/tripay',
  ALLOWED_METHODS: ['QRIS', 'QRIS2', 'BRIVA', 'BNIVA', 'BCAVA', 'MANDIRIVA',
    'PERMATAVA', 'MUAMALATVA', 'CIMBVA', 'BSIVA', 'OCBCVA', 'DANAMONVA',
    'OTHERBANKVA', 'ALFAMART', 'INDOMARET', 'ALFAMIDI', 'OVO', 'DANA', 'SHOPEEPAY'],
};

export const PRICING: Record<string, { name: string; price: number }> = {
  'video-course': { name: 'Video Course Belajar AI', price: 299000 },
  'online-live': { name: 'Online Live Belajar AI', price: 799000 },
  'offline-workshop': { name: 'Offline Workshop Belajar AI', price: 2500000 },
  'monthly-sub': { name: 'Monthly Subscription Belajar AI', price: 199000 },
  'platinum-pass': { name: 'Platinum Pass Belajar AI', price: 9000000 },
};

export const TRIPAY_CHANNELS: { code: string; name: string; group: string; type: string }[] = [
  { code: 'QRIS', name: 'QRIS by ShopeePay', group: 'E-Wallet', type: 'direct' },
  { code: 'QRIS2', name: 'QRIS', group: 'E-Wallet', type: 'direct' },
  { code: 'OVO', name: 'OVO', group: 'E-Wallet', type: 'redirect' },
  { code: 'DANA', name: 'DANA', group: 'E-Wallet', type: 'redirect' },
  { code: 'SHOPEEPAY', name: 'ShopeePay', group: 'E-Wallet', type: 'redirect' },
  { code: 'BCAVA', name: 'BCA Virtual Account', group: 'Virtual Account', type: 'direct' },
  { code: 'MANDIRIVA', name: 'Mandiri Virtual Account', group: 'Virtual Account', type: 'direct' },
  { code: 'BRIVA', name: 'BRI Virtual Account', group: 'Virtual Account', type: 'direct' },
  { code: 'BNIVA', name: 'BNI Virtual Account', group: 'Virtual Account', type: 'direct' },
  { code: 'ALFAMART', name: 'Alfamart', group: 'Convenience Store', type: 'direct' },
  { code: 'INDOMARET', name: 'Indomaret', group: 'Convenience Store', type: 'direct' },
];
