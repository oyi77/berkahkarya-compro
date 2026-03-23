const WA = 'https://wa.me/6285732740006';

export const omnirouteData = {
  id: {
    meta: { title: 'OmniRoute — Satu API untuk Semua AI Model | BerkahKarya', description: 'Akses GPT-4, Claude, Gemini, DeepSeek dalam satu endpoint. Auto-routing, hemat 70% biaya API, failover otomatis.' },
    hero: {
      eyebrow: 'OMNIROUTE API GATEWAY',
      title: 'Bayar 1 API Key.\nAkses Semua AI Model.',
      description: 'Berhenti juggling 5 API key dari 5 provider. OmniRoute kasih Anda satu endpoint yang auto-route ke GPT-4, Claude, Gemini, DeepSeek, dan 50+ model lainnya — dengan harga 70% lebih murah.',
      buttons: [
        { text: 'Coba Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20OmniRoute%20API`, primary: true },
        { text: 'Lihat Dokumentasi', href: '#how-it-works', primary: false },
      ],
    },
    problem: {
      hook: 'Kalau Anda developer atau agency yang pakai AI, ini pasti familiar.',
      pains: [
        { icon: '🔑', text: '5 provider AI = 5 API key, 5 billing dashboard, 5 format response yang beda-beda.' },
        { icon: '💰', text: 'GPT-4 mahal untuk simple tasks. Tapi Anda kirim semua request ke sana karena malas setup routing.' },
        { icon: '🔥', text: 'Provider down jam 2 pagi. App Anda error. Customer complain. Anda panik scramble.' },
        { icon: '📊', text: 'Tidak tahu berapa spending per provider. Tidak ada single dashboard untuk monitor semuanya.' },
      ],
      bridge: 'OmniRoute: satu endpoint, semua provider, zero downtime.',
    },
    features: [
      { icon: '🔀', title: 'Smart Routing', desc: 'Auto-route ke provider terbaik berdasarkan cost, latency, atau priority yang Anda set. Satu request, Omniroute yang pilih.' },
      { icon: '🛡️', title: 'Auto Failover', desc: 'Provider utama down? OmniRoute otomatis redirect ke backup dalam milidetik. Zero downtime untuk app Anda.' },
      { icon: '💸', title: 'Cost Optimizer', desc: 'Simple query ke model murah, complex query ke model premium. Hemat 70% tanpa korbankan kualitas.' },
      { icon: '🔑', title: 'Single API Key', desc: 'Satu key OmniRoute = akses ke semua provider. Manage permission per key, per team, per project.' },
      { icon: '📊', title: 'Usage Dashboard', desc: 'Monitor spending, latency, dan error per provider secara real-time. Satu dashboard untuk semuanya.' },
      { icon: '🔌', title: 'OpenAI Compatible', desc: 'Drop-in replacement. Ganti base URL, selesai. Tidak perlu ubah satu baris kode pun.' },
    ],
    providers: {
      title: 'Semua Provider AI Terbaik, Satu Endpoint',
      items: ['GPT-4o & GPT-4o mini', 'Claude 3.5 Sonnet & Haiku', 'Gemini 2.0 Flash & Pro', 'DeepSeek V3 & R1', 'Mistral Large & Small', 'Groq (Llama 3)', 'Qwen 2.5', 'Dan 40+ model lainnya'],
    },
    howItWorks: {
      title: 'Mulai dalam 2 Menit',
      steps: [
        { num: '1', title: 'Daftar & Dapatkan Key', desc: 'Buat akun, dapatkan API key OmniRoute Anda. Gratis untuk 1000 request pertama.' },
        { num: '2', title: 'Ganti Base URL', desc: 'Ganti OpenAI base URL di kode Anda ke OmniRoute endpoint. Tidak ada perubahan lain.' },
        { num: '3', title: 'Kirim Request', desc: 'Request Anda otomatis di-route ke provider optimal. Monitor hasilnya di dashboard.' },
      ],
    },
    codeExample: {
      title: 'Satu Endpoint. Semua Model.',
      code: `curl https://api.omniroute.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-omni-****" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# ✓ ROUTED → gemini-2.0-flash (98ms, cost: $0.00012)`,
    },
    pricing: [
      { name: 'Free', price: 'Rp 0', period: '', features: ['1,000 requests/bulan', '3 provider', 'Basic routing', 'Community support'], cta: { text: 'Mulai Gratis', href: WA } },
      { name: 'Pro', price: 'Rp 299K', period: '/bulan', highlight: true, features: ['50,000 requests/bulan', 'Semua provider', 'Smart routing + failover', 'Usage dashboard', 'Priority support', 'Multiple API keys'], cta: { text: 'Pilih Pro', href: WA } },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited requests', 'Custom routing rules', 'SLA 99.9%', 'Dedicated infrastructure', 'On-premise option', 'Technical account manager'], cta: { text: 'Hubungi Kami', href: WA } },
    ],
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Apakah compatible dengan kode OpenAI saya yang sudah ada?', a: 'Ya, 100%. OmniRoute menggunakan format OpenAI API. Cukup ganti base URL dan API key — tidak perlu ubah kode lain.' },
        { q: 'Bagaimana routing "auto" bekerja?', a: 'OmniRoute menganalisa complexity request Anda dan route ke model dengan cost/performance ratio terbaik. Simple query ke model murah, complex ke premium.' },
        { q: 'Apakah data saya aman?', a: 'OmniRoute tidak menyimpan request/response data Anda. Semua traffic terenkripsi end-to-end. Kami hanya log metadata (model, latency, cost) untuk dashboard.' },
        { q: 'Berapa latency tambahan dari routing?', a: 'Rata-rata <5ms overhead. Hampir tidak terasa dibanding latency provider itu sendiri (100-2000ms).' },
      ],
    },
    cta: { title: 'Stop Bayar Mahal untuk AI API', description: '1000 request gratis. Tidak perlu kartu kredit. Setup 2 menit.', button: { text: 'Mulai Gratis Sekarang →', href: WA } },
  },
  en: {
    meta: { title: 'OmniRoute — One API for All AI Models | BerkahKarya', description: 'Access GPT-4, Claude, Gemini, DeepSeek from one endpoint. Auto-routing, 70% API cost savings, automatic failover.' },
    hero: {
      eyebrow: 'OMNIROUTE API GATEWAY',
      title: 'Pay for 1 API Key.\nAccess Every AI Model.',
      description: 'Stop juggling 5 API keys from 5 providers. OmniRoute gives you one endpoint that auto-routes to GPT-4, Claude, Gemini, DeepSeek, and 50+ other models — at 70% lower cost.',
      buttons: [
        { text: 'Try Free →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20OmniRoute%20API`, primary: true },
        { text: 'View Documentation', href: '#how-it-works', primary: false },
      ],
    },
    problem: {
      hook: 'If you\'re a developer or agency using AI, this is probably familiar.',
      pains: [
        { icon: '🔑', text: '5 AI providers = 5 API keys, 5 billing dashboards, 5 different response formats.' },
        { icon: '💰', text: 'GPT-4 is expensive for simple tasks. But you send everything there because you\'re too lazy to set up routing.' },
        { icon: '🔥', text: 'Provider goes down at 2 AM. Your app crashes. Customers complain. You panic scramble.' },
        { icon: '📊', text: 'No idea how much you\'re spending per provider. No single dashboard to monitor everything.' },
      ],
      bridge: 'OmniRoute: one endpoint, all providers, zero downtime.',
    },
    features: [
      { icon: '🔀', title: 'Smart Routing', desc: 'Auto-route to the best provider based on cost, latency, or priority you set. One request, OmniRoute decides.' },
      { icon: '🛡️', title: 'Auto Failover', desc: 'Primary provider down? OmniRoute automatically redirects to backup in milliseconds. Zero downtime.' },
      { icon: '💸', title: 'Cost Optimizer', desc: 'Simple queries to cheap models, complex queries to premium. Save 70% without sacrificing quality.' },
      { icon: '🔑', title: 'Single API Key', desc: 'One OmniRoute key = access to all providers. Manage permissions per key, per team, per project.' },
      { icon: '📊', title: 'Usage Dashboard', desc: 'Monitor spending, latency, and errors per provider in real-time. One dashboard for everything.' },
      { icon: '🔌', title: 'OpenAI Compatible', desc: 'Drop-in replacement. Change the base URL, done. No code changes required.' },
    ],
    providers: {
      title: 'Every Top AI Provider, One Endpoint',
      items: ['GPT-4o & GPT-4o mini', 'Claude 3.5 Sonnet & Haiku', 'Gemini 2.0 Flash & Pro', 'DeepSeek V3 & R1', 'Mistral Large & Small', 'Groq (Llama 3)', 'Qwen 2.5', 'And 40+ more models'],
    },
    howItWorks: {
      title: 'Start in 2 Minutes',
      steps: [
        { num: '1', title: 'Sign Up & Get Key', desc: 'Create an account, get your OmniRoute API key. Free for first 1000 requests.' },
        { num: '2', title: 'Change Base URL', desc: 'Replace the OpenAI base URL in your code with the OmniRoute endpoint. No other changes.' },
        { num: '3', title: 'Send Requests', desc: 'Your requests are automatically routed to the optimal provider. Monitor results in the dashboard.' },
      ],
    },
    codeExample: {
      title: 'One Endpoint. All Models.',
      code: `curl https://api.omniroute.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-omni-****" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# ✓ ROUTED → gemini-2.0-flash (98ms, cost: $0.00012)`,
    },
    pricing: [
      { name: 'Free', price: '$0', period: '', features: ['1,000 requests/month', '3 providers', 'Basic routing', 'Community support'], cta: { text: 'Start Free', href: WA } },
      { name: 'Pro', price: '$20', period: '/mo', highlight: true, features: ['50,000 requests/month', 'All providers', 'Smart routing + failover', 'Usage dashboard', 'Priority support', 'Multiple API keys'], cta: { text: 'Choose Pro', href: WA } },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited requests', 'Custom routing rules', '99.9% SLA', 'Dedicated infrastructure', 'On-premise option', 'Technical account manager'], cta: { text: 'Contact Us', href: WA } },
    ],
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Is it compatible with my existing OpenAI code?', a: 'Yes, 100%. OmniRoute uses the OpenAI API format. Just change the base URL and API key — no other code changes needed.' },
        { q: 'How does "auto" routing work?', a: 'OmniRoute analyzes your request complexity and routes to the model with the best cost/performance ratio. Simple queries to cheap models, complex to premium.' },
        { q: 'Is my data safe?', a: 'OmniRoute does not store your request/response data. All traffic is encrypted end-to-end. We only log metadata (model, latency, cost) for the dashboard.' },
        { q: 'What\'s the additional latency from routing?', a: 'Average <5ms overhead. Barely noticeable compared to provider latency itself (100-2000ms).' },
      ],
    },
    cta: { title: 'Stop Overpaying for AI APIs', description: '1000 free requests. No credit card required. 2-minute setup.', button: { text: 'Start Free Now →', href: WA } },
  },
} as const;
