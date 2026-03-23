export interface ProductData {
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; buttons: { text: string; href: string; primary?: boolean }[] };
  features: { icon: string; title: string; desc: string }[];
  pricing: { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }[];
  cta: { title: string; description: string; button: { text: string; href: string } };
}

const WA = 'https://wa.me/6285732740006';

export const productsData: Record<string, Record<string, ProductData>> = {
  'ai-video-studio': {
    id: {
      slug: 'ai-video-studio',
      meta: { title: 'AI Video Studio — BerkahKarya', description: 'Buat video profesional dengan AI. Dari script, voice-over, sampai editing — semua otomatis.' },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO',
        title: 'Bikin Video Pro\nTanpa Tim Produksi',
        description: 'AI Video Studio mengubah teks jadi video berkualitas tinggi. Script otomatis, voice clone, visual AI — semua dalam hitungan menit, bukan minggu.',
        buttons: [
          { text: 'Mulai Buat Video →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AI%20Video%20Studio`, primary: true },
          { text: 'Lihat Demo', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '✍️', title: 'Script Generator', desc: 'AI menulis script video berdasarkan topik dan gaya yang Anda inginkan.' },
        { icon: '🎙️', title: 'Voice Clone', desc: 'Kloning suara Anda sendiri atau pilih dari 50+ suara AI profesional.' },
        { icon: '🎨', title: 'Visual AI', desc: 'Generate visual, animasi, dan B-roll otomatis sesuai script.' },
        { icon: '✂️', title: 'Auto Editing', desc: 'AI edit video lengkap — cut, transition, subtitle, musik background.' },
        { icon: '🌍', title: 'Multi-bahasa', desc: 'Buat video dalam bahasa Indonesia, Inggris, atau bahasa lainnya.' },
        { icon: '📱', title: 'Multi-format', desc: 'Output untuk TikTok, YouTube, Instagram, dan platform lainnya.' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 499K', period: '/bulan', features: ['10 video/bulan', 'Script AI', '5 suara AI', 'Resolusi 720p', 'Watermark'], cta: { text: 'Pilih Starter', href: WA } },
        { name: 'Pro', price: 'Rp 1.499K', period: '/bulan', highlight: true, features: ['50 video/bulan', 'Script AI + Voice Clone', '50+ suara AI', 'Resolusi 1080p', 'Tanpa watermark', 'Priority render'], cta: { text: 'Pilih Pro', href: WA } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited video', 'Semua fitur Pro', 'API access', 'Resolusi 4K', 'Dedicated support', 'Custom branding'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      cta: { title: 'Siap Bikin Video dengan AI?', description: 'Mulai free trial sekarang. Tidak perlu kartu kredit.', button: { text: 'Mulai Free Trial →', href: WA } },
    },
    en: {
      slug: 'ai-video-studio',
      meta: { title: 'AI Video Studio — BerkahKarya', description: 'Create professional videos with AI. From script, voice-over, to editing — all automated.' },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO',
        title: 'Create Pro Videos\nWithout a Production Team',
        description: 'AI Video Studio turns text into high-quality videos. Auto scripts, voice clone, AI visuals — all in minutes, not weeks.',
        buttons: [
          { text: 'Start Creating →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AI%20Video%20Studio`, primary: true },
          { text: 'See Demo', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '✍️', title: 'Script Generator', desc: 'AI writes video scripts based on your topic and preferred style.' },
        { icon: '🎙️', title: 'Voice Clone', desc: 'Clone your own voice or choose from 50+ professional AI voices.' },
        { icon: '🎨', title: 'Visual AI', desc: 'Generate visuals, animations, and B-roll automatically matching your script.' },
        { icon: '✂️', title: 'Auto Editing', desc: 'AI edits the complete video — cuts, transitions, subtitles, background music.' },
        { icon: '🌍', title: 'Multi-language', desc: 'Create videos in Indonesian, English, or any other language.' },
        { icon: '📱', title: 'Multi-format', desc: 'Output for TikTok, YouTube, Instagram, and other platforms.' },
      ],
      pricing: [
        { name: 'Starter', price: '$33', period: '/mo', features: ['10 videos/month', 'AI Script', '5 AI voices', '720p resolution', 'Watermark'], cta: { text: 'Choose Starter', href: WA } },
        { name: 'Pro', price: '$99', period: '/mo', highlight: true, features: ['50 videos/month', 'AI Script + Voice Clone', '50+ AI voices', '1080p resolution', 'No watermark', 'Priority render'], cta: { text: 'Choose Pro', href: WA } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited videos', 'All Pro features', 'API access', '4K resolution', 'Dedicated support', 'Custom branding'], cta: { text: 'Contact Us', href: WA } },
      ],
      cta: { title: 'Ready to Create Videos with AI?', description: 'Start your free trial now. No credit card required.', button: { text: 'Start Free Trial →', href: WA } },
    },
  },

  'adforge-ai': {
    id: {
      slug: 'adforge-ai',
      meta: { title: 'AdForge AI — BerkahKarya', description: 'Iklan digital yang convert. AI targeting, creative automation, dan analytics real-time.' },
      hero: {
        eyebrow: '📢 ADFORGE AI',
        title: 'Iklan Digital yang\nBenar-Benar Convert',
        description: 'AdForge AI mengoptimasi iklan Anda dengan AI — dari creative generation, audience targeting, sampai budget allocation. ROI naik, biaya turun.',
        buttons: [
          { text: 'Optimalkan Iklan →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AdForge%20AI`, primary: true },
          { text: 'Lihat Fitur', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '🎯', title: 'AI Targeting', desc: 'Temukan audience ideal dengan AI — lookalike, interest, dan behavioral targeting.' },
        { icon: '🖼️', title: 'Creative AI', desc: 'Generate ratusan variasi creative dalam hitungan menit.' },
        { icon: '💰', title: 'Budget Optimizer', desc: 'AI alokasi budget ke channel dan creative yang paling perform.' },
        { icon: '📊', title: 'Real-time Analytics', desc: 'Dashboard analytics yang menunjukkan ROI per rupiah yang dikeluarkan.' },
        { icon: '🔄', title: 'Auto A/B Test', desc: 'Testing otomatis — AI pilih winner dan scale yang terbaik.' },
        { icon: '🏪', title: 'Multi-platform', desc: 'Google Ads, Meta Ads, TikTok Ads — semua dari satu dashboard.' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 999K', period: '/bulan', features: ['1 platform ads', '50 creative/bulan', 'Basic analytics', 'Email support'], cta: { text: 'Pilih Starter', href: WA } },
        { name: 'Growth', price: 'Rp 2.999K', period: '/bulan', highlight: true, features: ['3 platform ads', '200 creative/bulan', 'Advanced analytics', 'AI budget optimizer', 'Auto A/B testing', 'Priority support'], cta: { text: 'Pilih Growth', href: WA } },
        { name: 'Scale', price: 'Custom', period: '', features: ['Unlimited platforms', 'Unlimited creatives', 'Custom AI models', 'Dedicated account manager', 'API access', 'White-label option'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      cta: { title: 'Siap Naikkan ROI Iklan Anda?', description: 'Konsultasi gratis — kami analisa campaign Anda dan kasih rekomendasi AI.', button: { text: 'Konsultasi Gratis →', href: WA } },
    },
    en: {
      slug: 'adforge-ai',
      meta: { title: 'AdForge AI — BerkahKarya', description: 'Digital ads that convert. AI targeting, creative automation, and real-time analytics.' },
      hero: {
        eyebrow: '📢 ADFORGE AI',
        title: 'Digital Ads That\nActually Convert',
        description: 'AdForge AI optimizes your ads with AI — from creative generation, audience targeting, to budget allocation. Higher ROI, lower costs.',
        buttons: [
          { text: 'Optimize Ads →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AdForge%20AI`, primary: true },
          { text: 'See Features', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '🎯', title: 'AI Targeting', desc: 'Find your ideal audience with AI — lookalike, interest, and behavioral targeting.' },
        { icon: '🖼️', title: 'Creative AI', desc: 'Generate hundreds of creative variations in minutes.' },
        { icon: '💰', title: 'Budget Optimizer', desc: 'AI allocates budget to top-performing channels and creatives.' },
        { icon: '📊', title: 'Real-time Analytics', desc: 'Analytics dashboard showing ROI per dollar spent.' },
        { icon: '🔄', title: 'Auto A/B Test', desc: 'Automatic testing — AI picks winners and scales the best performers.' },
        { icon: '🏪', title: 'Multi-platform', desc: 'Google Ads, Meta Ads, TikTok Ads — all from one dashboard.' },
      ],
      pricing: [
        { name: 'Starter', price: '$66', period: '/mo', features: ['1 ad platform', '50 creatives/month', 'Basic analytics', 'Email support'], cta: { text: 'Choose Starter', href: WA } },
        { name: 'Growth', price: '$199', period: '/mo', highlight: true, features: ['3 ad platforms', '200 creatives/month', 'Advanced analytics', 'AI budget optimizer', 'Auto A/B testing', 'Priority support'], cta: { text: 'Choose Growth', href: WA } },
        { name: 'Scale', price: 'Custom', period: '', features: ['Unlimited platforms', 'Unlimited creatives', 'Custom AI models', 'Dedicated account manager', 'API access', 'White-label option'], cta: { text: 'Contact Us', href: WA } },
      ],
      cta: { title: 'Ready to Boost Your Ad ROI?', description: 'Free consultation — we analyze your campaign and give AI recommendations.', button: { text: 'Free Consultation →', href: WA } },
    },
  },

  'ai-agent-pro': {
    id: {
      slug: 'ai-agent-pro',
      meta: { title: 'AI Agent Pro — BerkahKarya', description: 'Agen AI custom untuk bisnis Anda. Customer service, sales automation, dan operations 24/7.' },
      hero: {
        eyebrow: '🤖 AI AGENT PRO',
        title: 'Karyawan AI yang\nKerja 24/7 Non-Stop',
        description: 'AI Agent Pro adalah agen AI custom yang bisa handle customer service, follow-up sales, data entry, dan workflow bisnis Anda — tanpa cuti, tanpa lembur.',
        buttons: [
          { text: 'Buat Agent AI →', href: `${WA}?text=Halo%2C%20saya%20mau%20buat%20AI%20Agent`, primary: true },
          { text: 'Lihat Demo', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '💬', title: 'Customer Service AI', desc: 'Jawab pertanyaan pelanggan 24/7 dengan akurasi tinggi dan tone yang konsisten.' },
        { icon: '📞', title: 'Sales Follow-up', desc: 'AI follow-up lead otomatis — WhatsApp, email, dan telepon.' },
        { icon: '📋', title: 'Data Processing', desc: 'Otomasi input data, report generation, dan document processing.' },
        { icon: '🔗', title: 'Integration', desc: 'Terhubung dengan WhatsApp, Telegram, website, CRM, dan tools bisnis lainnya.' },
        { icon: '🧠', title: 'Custom Knowledge', desc: 'Train AI dengan data bisnis Anda — produk, SOP, FAQ, dan pricing.' },
        { icon: '📈', title: 'Analytics', desc: 'Track performa agent — response time, satisfaction score, dan conversion rate.' },
      ],
      pricing: [
        { name: 'Basic', price: 'Rp 799K', period: '/bulan', features: ['1 AI Agent', '1.000 conversation/bulan', '1 channel (WA/Web)', 'Basic knowledge base', 'Email support'], cta: { text: 'Pilih Basic', href: WA } },
        { name: 'Business', price: 'Rp 2.499K', period: '/bulan', highlight: true, features: ['3 AI Agent', '10.000 conversation/bulan', 'Multi-channel', 'Custom knowledge base', 'CRM integration', 'Priority support'], cta: { text: 'Pilih Business', href: WA } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Agents', 'Unlimited conversations', 'Custom integrations', 'Dedicated AI engineer', 'SLA 99.9%', 'On-premise option'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      cta: { title: 'Siap Punya Karyawan AI?', description: 'Konsultasi gratis — kami bantu desain AI agent yang tepat untuk bisnis Anda.', button: { text: 'Konsultasi Gratis →', href: WA } },
    },
    en: {
      slug: 'ai-agent-pro',
      meta: { title: 'AI Agent Pro — BerkahKarya', description: 'Custom AI agents for your business. Customer service, sales automation, and 24/7 operations.' },
      hero: {
        eyebrow: '🤖 AI AGENT PRO',
        title: 'AI Employees That\nWork 24/7 Non-Stop',
        description: 'AI Agent Pro is a custom AI agent that handles customer service, sales follow-up, data entry, and business workflows — no leave, no overtime.',
        buttons: [
          { text: 'Build AI Agent →', href: `${WA}?text=Hello%2C%20I%20want%20to%20build%20an%20AI%20Agent`, primary: true },
          { text: 'See Demo', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '💬', title: 'Customer Service AI', desc: 'Answer customer questions 24/7 with high accuracy and consistent tone.' },
        { icon: '📞', title: 'Sales Follow-up', desc: 'AI auto follow-up leads — WhatsApp, email, and phone.' },
        { icon: '📋', title: 'Data Processing', desc: 'Automate data entry, report generation, and document processing.' },
        { icon: '🔗', title: 'Integration', desc: 'Connect with WhatsApp, Telegram, website, CRM, and other business tools.' },
        { icon: '🧠', title: 'Custom Knowledge', desc: 'Train AI with your business data — products, SOPs, FAQs, and pricing.' },
        { icon: '📈', title: 'Analytics', desc: 'Track agent performance — response time, satisfaction score, and conversion rate.' },
      ],
      pricing: [
        { name: 'Basic', price: '$53', period: '/mo', features: ['1 AI Agent', '1,000 conversations/month', '1 channel (WA/Web)', 'Basic knowledge base', 'Email support'], cta: { text: 'Choose Basic', href: WA } },
        { name: 'Business', price: '$166', period: '/mo', highlight: true, features: ['3 AI Agents', '10,000 conversations/month', 'Multi-channel', 'Custom knowledge base', 'CRM integration', 'Priority support'], cta: { text: 'Choose Business', href: WA } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Agents', 'Unlimited conversations', 'Custom integrations', 'Dedicated AI engineer', '99.9% SLA', 'On-premise option'], cta: { text: 'Contact Us', href: WA } },
      ],
      cta: { title: 'Ready for AI Employees?', description: 'Free consultation — we help design the right AI agent for your business.', button: { text: 'Free Consultation →', href: WA } },
    },
  },

  'algorithmic-trading': {
    id: {
      slug: 'algorithmic-trading',
      meta: { title: 'Algorithmic Trading — BerkahKarya', description: 'Trading algoritmik untuk forex dan crypto. Backtested, optimized, dan monitored 24/7.' },
      hero: {
        eyebrow: '📈 ALGO TRADING',
        title: 'Trading Tanpa Emosi.\nPure Algorithm.',
        description: 'Sistem trading algoritmik yang sudah dibacktest dan dioptimasi. Eksekusi otomatis, risk management ketat, monitoring 24/7.',
        buttons: [
          { text: 'Mulai Trading →', href: `${WA}?text=Halo%2C%20saya%20tertarik%20Algo%20Trading`, primary: true },
          { text: 'Lihat Performa', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '🧮', title: 'Backtested Strategy', desc: 'Semua strategi diuji dengan data historis minimal 5 tahun sebelum live.' },
        { icon: '⚡', title: 'Auto Execution', desc: 'Eksekusi order dalam milidetik — lebih cepat dari tangan manusia.' },
        { icon: '🛡️', title: 'Risk Management', desc: 'Stop loss, position sizing, dan drawdown limit otomatis.' },
        { icon: '📊', title: 'Real-time Monitoring', desc: 'Dashboard monitoring 24/7 dengan alert system.' },
        { icon: '🔬', title: 'Strategy Lab', desc: 'Riset dan develop strategi baru dengan AI dan machine learning.' },
        { icon: '📱', title: 'Mobile Dashboard', desc: 'Monitor performa trading dari mana saja lewat mobile.' },
      ],
      pricing: [
        { name: 'Signal', price: 'Rp 499K', period: '/bulan', features: ['Trading signals', 'XAUUSD + Major pairs', 'Telegram delivery', 'Basic analytics'], cta: { text: 'Pilih Signal', href: WA } },
        { name: 'Auto-Trade', price: 'Rp 1.999K', period: '/bulan', highlight: true, features: ['Auto execution', 'Multi-pair strategy', 'Risk management', 'Real-time dashboard', 'Priority support'], cta: { text: 'Pilih Auto-Trade', href: WA } },
        { name: 'Fund', price: 'Custom', period: '', features: ['Managed fund', 'Custom strategy', 'Dedicated quant', 'Monthly reporting', 'Performance fee model'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      cta: { title: 'Siap Trading dengan Algoritma?', description: 'Konsultasi gratis — kami analisa profile risiko dan rekomendasi strategi yang sesuai.', button: { text: 'Konsultasi Gratis →', href: WA } },
    },
    en: {
      slug: 'algorithmic-trading',
      meta: { title: 'Algorithmic Trading — BerkahKarya', description: 'Algorithmic trading for forex and crypto. Backtested, optimized, and monitored 24/7.' },
      hero: {
        eyebrow: '📈 ALGO TRADING',
        title: 'Trading Without Emotion.\nPure Algorithm.',
        description: 'Algorithmic trading systems that are backtested and optimized. Auto execution, strict risk management, 24/7 monitoring.',
        buttons: [
          { text: 'Start Trading →', href: `${WA}?text=Hello%2C%20I%27m%20interested%20in%20Algo%20Trading`, primary: true },
          { text: 'View Performance', href: '#features', primary: false },
        ],
      },
      features: [
        { icon: '🧮', title: 'Backtested Strategy', desc: 'All strategies tested with minimum 5 years of historical data before going live.' },
        { icon: '⚡', title: 'Auto Execution', desc: 'Order execution in milliseconds — faster than human hands.' },
        { icon: '🛡️', title: 'Risk Management', desc: 'Automatic stop loss, position sizing, and drawdown limits.' },
        { icon: '📊', title: 'Real-time Monitoring', desc: '24/7 monitoring dashboard with alert system.' },
        { icon: '🔬', title: 'Strategy Lab', desc: 'Research and develop new strategies with AI and machine learning.' },
        { icon: '📱', title: 'Mobile Dashboard', desc: 'Monitor trading performance from anywhere via mobile.' },
      ],
      pricing: [
        { name: 'Signal', price: '$33', period: '/mo', features: ['Trading signals', 'XAUUSD + Major pairs', 'Telegram delivery', 'Basic analytics'], cta: { text: 'Choose Signal', href: WA } },
        { name: 'Auto-Trade', price: '$133', period: '/mo', highlight: true, features: ['Auto execution', 'Multi-pair strategy', 'Risk management', 'Real-time dashboard', 'Priority support'], cta: { text: 'Choose Auto-Trade', href: WA } },
        { name: 'Fund', price: 'Custom', period: '', features: ['Managed fund', 'Custom strategy', 'Dedicated quant', 'Monthly reporting', 'Performance fee model'], cta: { text: 'Contact Us', href: WA } },
      ],
      cta: { title: 'Ready to Trade with Algorithms?', description: 'Free consultation — we analyze your risk profile and recommend suitable strategies.', button: { text: 'Free Consultation →', href: WA } },
    },
  },

  'digital-products': {
    id: {
      slug: 'digital-products',
      meta: { title: 'Produk Digital — BerkahKarya', description: 'Template, course, dan tools digital siap pakai untuk scale bisnis Anda.' },
      hero: {
        eyebrow: '📦 PRODUK DIGITAL',
        title: 'Tools & Template\nSiap Pakai',
        description: 'Koleksi produk digital berkualitas — dari template bisnis, course AI, sampai tools automation. Langsung pakai, langsung hasil.',
        buttons: [
          { text: 'Lihat Produk →', href: '#features', primary: true },
          { text: 'Bundle Deals', href: '#pricing', primary: false },
        ],
      },
      features: [
        { icon: '📝', title: 'Business Templates', desc: 'Template proposal, invoice, contract, dan dokumen bisnis lainnya.' },
        { icon: '🎓', title: 'AI Courses', desc: 'Course lengkap tentang AI untuk bisnis — dari dasar sampai advanced.' },
        { icon: '🔧', title: 'Automation Tools', desc: 'Tools siap pakai untuk automasi workflow bisnis Anda.' },
        { icon: '📊', title: 'Dashboard Templates', desc: 'Template dashboard analytics untuk monitoring bisnis.' },
        { icon: '🎨', title: 'Design Assets', desc: 'Template desain untuk sosial media, presentasi, dan marketing.' },
        { icon: '📚', title: 'E-books & Guides', desc: 'Panduan lengkap tentang digital marketing, AI, dan entrepreneurship.' },
      ],
      pricing: [
        { name: 'Single', price: 'Rp 49K', period: '', features: ['1 produk pilihan', 'Lifetime access', 'Update gratis', 'Support komunitas'], cta: { text: 'Beli Sekarang', href: 'https://lynk.id/jendralbot' } },
        { name: 'Bundle', price: 'Rp 199K', period: '', highlight: true, features: ['5 produk pilihan', 'Lifetime access', 'Update gratis', 'Priority support', 'Bonus templates'], cta: { text: 'Beli Bundle', href: 'https://lynk.id/jendralbot' } },
        { name: 'All Access', price: 'Rp 499K', period: '/tahun', features: ['Semua produk', 'Lifetime access', 'Produk baru otomatis', 'VIP support', '1-on-1 consultation'], cta: { text: 'All Access', href: WA } },
      ],
      cta: { title: 'Mulai Scale Bisnis Anda', description: 'Produk digital yang sudah terbukti membantu ratusan bisnis Indonesia.', button: { text: 'Lihat Semua Produk →', href: 'https://lynk.id/jendralbot' } },
    },
    en: {
      slug: 'digital-products',
      meta: { title: 'Digital Products — BerkahKarya', description: 'Ready-to-use templates, courses, and digital tools to scale your business.' },
      hero: {
        eyebrow: '📦 DIGITAL PRODUCTS',
        title: 'Ready-to-Use\nTools & Templates',
        description: 'Premium digital products — from business templates, AI courses, to automation tools. Use immediately, get results immediately.',
        buttons: [
          { text: 'View Products →', href: '#features', primary: true },
          { text: 'Bundle Deals', href: '#pricing', primary: false },
        ],
      },
      features: [
        { icon: '📝', title: 'Business Templates', desc: 'Proposal, invoice, contract, and other business document templates.' },
        { icon: '🎓', title: 'AI Courses', desc: 'Complete courses on AI for business — from basics to advanced.' },
        { icon: '🔧', title: 'Automation Tools', desc: 'Ready-to-use tools to automate your business workflows.' },
        { icon: '📊', title: 'Dashboard Templates', desc: 'Analytics dashboard templates for business monitoring.' },
        { icon: '🎨', title: 'Design Assets', desc: 'Design templates for social media, presentations, and marketing.' },
        { icon: '📚', title: 'E-books & Guides', desc: 'Complete guides on digital marketing, AI, and entrepreneurship.' },
      ],
      pricing: [
        { name: 'Single', price: '$3.29', period: '', features: ['1 product of choice', 'Lifetime access', 'Free updates', 'Community support'], cta: { text: 'Buy Now', href: 'https://lynk.id/jendralbot' } },
        { name: 'Bundle', price: '$13.29', period: '', highlight: true, features: ['5 products of choice', 'Lifetime access', 'Free updates', 'Priority support', 'Bonus templates'], cta: { text: 'Buy Bundle', href: 'https://lynk.id/jendralbot' } },
        { name: 'All Access', price: '$33', period: '/year', features: ['All products', 'Lifetime access', 'New products automatically', 'VIP support', '1-on-1 consultation'], cta: { text: 'All Access', href: WA } },
      ],
      cta: { title: 'Start Scaling Your Business', description: 'Digital products proven to help hundreds of Indonesian businesses.', button: { text: 'View All Products →', href: 'https://lynk.id/jendralbot' } },
    },
  },
};

export const productSlugs = Object.keys(productsData);
