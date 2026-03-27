const WA = 'https://wa.me/6285732740006';
const APP_URL = 'https://1ai.aitradepulse.com/';

export const omnirouteData = {
  id: {
    meta: { title: '1AI — 398 Model AI, Rp 75K/bulan Flat. Alternatif OpenRouter | BerkahKarya', description: '398 model AI cuma Rp 75K/bulan. GPT-4, Claude, Gemini, DeepSeek, Llama, Qwen. Auto-failover. Bayar GoPay/OVO/DANA. Support Telegram 24/7.' },
    hero: {
      eyebrow: '🔥 398 MODEL AI · RP 75K/BULAN FLAT · ZERO DOWNTIME',
      title: '398 Model AI.\nRp 75K/bulan Flat.\nAlternatif OpenRouter.',
      description: 'OpenRouter charge Rp 300K/bulan untuk 200 model. 1AI kasih 398 model — Rp 75K flat. Semua model. Tanpa batas. Auto-failover built-in.',
      buttons: [
        { text: 'Coba Gratis — 1000 Request →', href: APP_URL, primary: true },
        { text: 'Lihat Semua Model', href: '#providers', primary: false },
      ],
    },
    problem: {
      hook: 'Kalau Anda developer atau agency yang pakai AI, ini pasti familiar.',
      pains: [
        { icon: '💸', title: 'OpenRouter mahal', text: 'Rp 300K/bulan cuma 200 model. Anda butuh lebih banyak model tapi gak mau bayar premium.' },
        { icon: '🔥', title: 'Provider down jam 2 pagi', text: 'App Anda crash. Customer complain. Anda panik scramble. Gak ada auto-failover = downtime.' },
        { icon: '🌍', title: 'Payment internasional ribet', text: 'Harus kartu kredit. USD naik-turun. Gak ada opsi bayar lokal kayak GoPay/OVO/DANA.' },
        { icon: '📊', title: 'Gak ada dashboard terpusat', text: '5 provider = 5 billing dashboard, 5 format response beda-beda. Monitoring jadi nightmare.' },
      ],
      bridge: '1AI: 398 model, Rp 75K flat, auto-failover, bayar lokal.',
    },
    features: [
      { icon: '🎯', title: '398 Model AI', desc: 'GPT-4, Claude, Gemini, DeepSeek, Llama, Qwen, Mistral, dan 391+ lainnya. OpenRouter punya 200. Kami punya 398.' },
      { icon: '🛡️', title: 'Auto-Failover', desc: 'Provider utama down? 1AI otomatis switch ke backup dalam 50ms. Zero downtime. Zero panik.' },
      { icon: '💸', title: 'Cost Optimizer', desc: 'Task simple → model murah. Task complex → model premium. Hemat 70% tanpa korbankan kualitas.' },
      { icon: '🆓', title: '7 Tier Gratis', desc: 'auto/free-chat, auto/free-coding, auto/free-vision, auto/free-reasoning. Model gratis untuk testing dan light usage.' },
      { icon: '💳', title: 'Bayar Lokal', desc: 'GoPay, OVO, DANA, QRIS, Transfer BCA. Gak perlu kartu kredit. Gak ada fluktuasi USD.' },
      { icon: '💬', title: 'Support Telegram', desc: 'Respon <5 menit. Bukan email support yang lama. Real human, real-time help.' },
      { icon: '🔑', title: 'Single API Key', desc: 'Satu key 1AI = akses ke semua 398 model. Manage permission per key, per team, per project.' },
      { icon: '📊', title: 'Usage Dashboard', desc: 'Monitor spending, latency, dan error per provider secara real-time. Satu dashboard untuk semuanya.' },
      { icon: '🔌', title: 'OpenAI Compatible', desc: 'Drop-in replacement. Ganti base URL, selesai. Gak perlu ubah kode.' },
    ],
    providers: {
      title: '398 Model dari 18 Provider',
      items: ['GPT-4o, GPT-4o mini, GPT-4 Turbo', 'Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku', 'Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Pro', 'DeepSeek V3, DeepSeek R1, DeepSeek Coder', 'Llama 3.3 70B, Llama 3.1 405B, Llama 3.1 8B', 'Qwen 2.5 72B, Qwen 2.5 Coder, QwQ 32B', 'Mistral Large, Mistral Small, Mixtral 8x7B', 'Dan 370+ model lainnya dari BytePlus, SiliconFlow, Replicate, Fal.ai, G4F, dan lainnya'],
    },
    howItWorks: {
      title: 'Mulai dalam 2 Menit',
      steps: [
        { num: '1', title: 'Daftar & Dapatkan Key', desc: 'Buat akun, dapatkan API key 1AI Anda. Gratis untuk 1000 request pertama.' },
        { num: '2', title: 'Ganti Base URL', desc: 'Ganti OpenAI base URL di kode Anda ke 1AI endpoint. Tidak ada perubahan lain.' },
        { num: '3', title: 'Kirim Request', desc: 'Request Anda otomatis di-route ke provider optimal. Monitor hasilnya di dashboard.' },
      ],
    },
    codeExample: {
      title: 'Satu Endpoint. Semua Model.',
      code: `curl https://api.1ai.aitradepulse.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-1ai-****" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# ✓ ROUTED → gemini-2.0-flash (98ms, cost: $0.00012)`,
    },
    pricing: [
      { name: 'Starter', price: 'Rp 75K', period: '/bulan', features: ['10,000 requests/bulan', '398 model — akses semua', 'Auto-failover + smart routing', 'Usage dashboard', 'Email support', 'Single API key'], cta: { text: 'Mulai Sekarang', href: APP_URL } },
      { name: 'Pro', price: 'Rp 285K', period: '/bulan', highlight: true, features: ['100,000 requests/bulan', '398 model — akses semua', 'Auto-failover + smart routing', 'Usage dashboard', 'Support Telegram <5 menit', 'Multiple API keys (5 keys)', 'Priority routing', 'Bayar lokal (GoPay/OVO/DANA)'], cta: { text: 'Mulai Sekarang', href: APP_URL } },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited requests', 'Custom routing rules', 'SLA 99.9%', 'Dedicated infrastructure', 'On-premise option', 'Technical account manager', 'Priority failover', 'Custom contract'], cta: { text: 'Hubungi Kami', href: `${WA}?text=Halo%2C%20saya%20tertarik%201AI%20Enterprise` } },
    ],
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Apa bedanya 1AI dengan OpenRouter?', a: 'OpenRouter: 200 model, Rp 300K/bulan. 1AI: 398 model, Rp 75K/bulan. Kami punya auto-failover built-in, opsi bayar lokal (GoPay/OVO/DANA), dan support Telegram <5 menit. OpenRouter harus kartu kredit dan email support.' },
        { q: 'Apakah compatible dengan kode OpenAI saya yang sudah ada?', a: 'Ya, 100%. 1AI pakai format OpenAI API. Cukup ganti base URL dan API key — gak perlu ubah kode lain.' },
        { q: 'Apa itu 7 model gratis?', a: 'auto/free-chat, auto/free-coding, auto/free-vision, auto/free-reasoning, auto/free-llama, auto/free-fast, auto/free-all. Ini route ke provider gratis kayak G4F, Pollinations, dan model open-source.' },
        { q: 'Bagaimana auto-failover bekerja?', a: 'Kalau provider utama return error atau timeout, 1AI otomatis retry dengan backup provider dalam 50ms. Anda gak akan lihat error — app Anda tetap online.' },
        { q: 'Bisa bayar pakai payment lokal (bukan kartu kredit)?', a: 'Bisa. Kami terima GoPay, OVO, DANA, QRIS, dan Transfer BCA. Gak perlu kartu kredit. Gak ada fluktuasi USD.' },
        { q: 'Berapa latency tambahan dari routing?', a: 'Rata-rata <5ms overhead. Hampir gak kerasa dibanding latency provider sendiri (100-2000ms).' },
      ],
    },
    cta: { title: '398 Model. Rp 75K/bulan. Mulai Sekarang.', description: '1000 request gratis. Gak perlu kartu kredit. Setup 2 menit.', button: { text: 'Mulai Gratis Sekarang →', href: APP_URL } },
  },
  en: {
    meta: { title: '1AI — 398 AI Models, $5/mo Flat. OpenRouter Alternative | BerkahKarya', description: '398 AI models for $5/mo. GPT-4, Claude, Gemini, DeepSeek, Llama, Qwen. Auto-failover. Pay with local payment. Telegram support 24/7.' },
    hero: {
      eyebrow: '🔥 398 AI MODELS · $5/MO FLAT · ZERO DOWNTIME',
      title: '398 AI Models.\n$5/mo Flat.\nOpenRouter Alternative.',
      description: 'OpenRouter charges $20/mo for 200 models. 1AI gives you 398 models — $5 flat. All models. No limits. Auto-failover built-in.',
      buttons: [
        { text: 'Try Free — 1000 Requests →', href: APP_URL, primary: true },
        { text: 'View All Models', href: '#providers', primary: false },
      ],
    },
    problem: {
      hook: 'If you\'re a developer or agency using AI, this is probably familiar.',
      pains: [
        { icon: '💸', title: 'OpenRouter is expensive', text: '$20/mo for only 200 models. You need more models but don\'t want to pay premium.' },
        { icon: '🔥', title: 'Provider down at 2 AM', text: 'Your app crashes. Customers complain. You panic scramble. No auto-failover = downtime.' },
        { icon: '🌍', title: 'International payment hassle', text: 'Credit card required. USD fluctuation. No local payment options like GoPay/OVO/DANA.' },
        { icon: '📊', title: 'No unified dashboard', text: '5 providers = 5 billing dashboards, 5 different response formats. Monitoring nightmare.' },
      ],
      bridge: '1AI: 398 models, $5 flat, auto-failover, local payment.',
    },
    features: [
      { icon: '🎯', title: '398 AI Models', desc: 'GPT-4, Claude, Gemini, DeepSeek, Llama, Qwen, Mistral, and 391+ more. OpenRouter has 200. We have 398.' },
      { icon: '🛡️', title: 'Auto-Failover', desc: 'Primary provider down? 1AI auto-switches to backup in 50ms. Zero downtime. Zero panic.' },
      { icon: '💸', title: 'Cost Optimizer', desc: 'Simple task → cheap model. Complex task → premium model. Save 70% without sacrificing quality.' },
      { icon: '🆓', title: '7 Free Tiers', desc: 'auto/free-chat, auto/free-coding, auto/free-vision, auto/free-reasoning. Free models for testing and light usage.' },
      { icon: '💳', title: 'Local Payment', desc: 'GoPay, OVO, DANA, QRIS, BCA Transfer. No credit card required. No USD fluctuation.' },
      { icon: '💬', title: 'Telegram Support', desc: 'Response <5 minutes. Not email support that takes days. Real human, real-time help.' },
      { icon: '🔑', title: 'Single API Key', desc: 'One 1AI key = access to all 398 models. Manage permissions per key, per team, per project.' },
      { icon: '📊', title: 'Usage Dashboard', desc: 'Monitor spending, latency, and errors per provider in real-time. One dashboard for everything.' },
      { icon: '🔌', title: 'OpenAI Compatible', desc: 'Drop-in replacement. Change the base URL, done. No code changes required.' },
    ],
    providers: {
      title: '398 Models from 18 Providers',
      items: ['GPT-4o, GPT-4o mini, GPT-4 Turbo', 'Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku', 'Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Pro', 'DeepSeek V3, DeepSeek R1, DeepSeek Coder', 'Llama 3.3 70B, Llama 3.1 405B, Llama 3.1 8B', 'Qwen 2.5 72B, Qwen 2.5 Coder, QwQ 32B', 'Mistral Large, Mistral Small, Mixtral 8x7B', 'And 370+ more models from BytePlus, SiliconFlow, Replicate, Fal.ai, G4F, and more'],
    },
    howItWorks: {
      title: 'Start in 2 Minutes',
      steps: [
        { num: '1', title: 'Sign Up & Get Key', desc: 'Create an account, get your 1AI API key. Free for first 1000 requests.' },
        { num: '2', title: 'Change Base URL', desc: 'Replace the OpenAI base URL in your code with the 1AI endpoint. No other changes.' },
        { num: '3', title: 'Send Requests', desc: 'Your requests are automatically routed to the optimal provider. Monitor results in the dashboard.' },
      ],
    },
    codeExample: {
      title: 'One Endpoint. All Models.',
      code: `curl https://api.1ai.aitradepulse.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-1ai-****" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# ✓ ROUTED → gemini-2.0-flash (98ms, cost: $0.00012)`,
    },
    pricing: [
      { name: 'Starter', price: '$5', period: '/mo', features: ['10,000 requests/month', '398 models — all access', 'Auto-failover + smart routing', 'Usage dashboard', 'Email support', 'Single API key'], cta: { text: 'Start Now', href: APP_URL } },
      { name: 'Pro', price: '$19', period: '/mo', highlight: true, features: ['100,000 requests/month', '398 models — all access', 'Auto-failover + smart routing', 'Usage dashboard', 'Telegram support <5min', 'Multiple API keys (5 keys)', 'Priority routing', 'Local payment (GoPay/OVO/DANA)'], cta: { text: 'Start Now', href: APP_URL } },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited requests', 'Custom routing rules', '99.9% SLA', 'Dedicated infrastructure', 'On-premise option', 'Technical account manager', 'Priority failover', 'Custom contract'], cta: { text: 'Contact Us', href: `${WA}?text=Hello%2C%20I%27m%20interested%20in%201AI%20Enterprise` } },
    ],
    faq: {
      title: 'FAQ',
      items: [
        { q: 'How is 1AI different from OpenRouter?', a: 'OpenRouter: 200 models, $20/mo. 1AI: 398 models, $5/mo. We have auto-failover built-in, local payment options (GoPay/OVO/DANA), and Telegram support <5min. OpenRouter requires credit card and email support.' },
        { q: 'Is it compatible with my existing OpenAI code?', a: 'Yes, 100%. 1AI uses the OpenAI API format. Just change the base URL and API key — no other code changes needed.' },
        { q: 'What are the 7 free models?', a: 'auto/free-chat, auto/free-coding, auto/free-vision, auto/free-reasoning, auto/free-llama, auto/free-fast, auto/free-all. These route to free providers like G4F, Pollinations, and open-source models.' },
        { q: 'How does auto-failover work?', a: 'If primary provider returns error or timeout, 1AI automatically retries with backup provider in 50ms. You never see the error — your app stays online.' },
        { q: 'Can I pay with local payment (not credit card)?', a: 'Yes. We accept GoPay, OVO, DANA, QRIS, and BCA Transfer. No credit card required. No USD fluctuation.' },
        { q: 'What\'s the additional latency from routing?', a: 'Average <5ms overhead. Barely noticeable compared to provider latency itself (100-2000ms).' },
      ],
    },
    cta: { title: '398 Models. $5/mo. Start Now.', description: '1000 free requests. No credit card required. 2-minute setup.', button: { text: 'Start Free Now →', href: APP_URL } },
  },
} as const;
