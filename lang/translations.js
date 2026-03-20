/**
 * BerkahKarya — Full Page Translations
 * Covers: index, about, services, blog, contact, omniroute, pricing, tools, digital-product
 * Applied via CSS selector targeting — no need to edit individual HTML files
 * 
 * Strategy: each entry = { selector: CSS_SELECTOR, id: "Indonesian text", en: "English text" }
 * For innerHTML (allows <em>, <br> tags), set html: true
 */

var BK_TRANSLATIONS = {
  // ── GLOBAL / NAV ──────────────────────────────────────────────────────────
  global: [
    { sel: '[data-i18n="navServices"]',      id: 'Layanan',          en: 'Services' },
    { sel: '[data-i18n="navProducts"]',      id: 'Produk Digital',   en: 'Digital Products' },
    { sel: '[data-i18n="navBlog"]',          id: 'Postingan',        en: 'Blog' },
    { sel: '[data-i18n="navTools"]',         id: 'Tools',            en: 'Tools' },
    { sel: '[data-i18n="navAbout"]',         id: 'About',            en: 'About' },
    { sel: '[data-i18n="navCta"]',           id: 'Konsultasi →',     en: 'Consult →' },
    { sel: '[data-i18n="blogReadMore"]',     id: 'Baca Selengkapnya →', en: 'Read More →' },
    { sel: '[data-i18n="backToBlog"]',       id: '← Kembali ke Postingan', en: '← Back to Blog' },
    { sel: '[data-i18n="relatedArticles"]',  id: 'Artikel Terkait',  en: 'Related Articles' },
    // Footer
    { sel: '.bk-footer-col h5:first-of-type, .footer-col h5:nth-child(1)', id: 'Layanan', en: 'Services', multi: true },
  ],

  // ── INDEX PAGE ─────────────────────────────────────────────────────────────
  '/index.html,/,': [
    // Hero
    { sel: '.bk-hero-tag',          id: 'AI Ecosystem · BerkahKarya 2025', en: 'AI Ecosystem · BerkahKarya 2025' },
    { sel: '.bk-hero-title',        id: 'AI Ecosystem untuk<br><em class="text-mustard">Bisnis Indonesia</em>', en: 'AI Ecosystem for<br><em class="text-mustard">Indonesian Business</em>', html: true },
    { sel: '.bk-hero-subtitle',     id: 'Dari konten viral, foto produk, hingga otomasi penuh — semua dalam satu ekosistem AI. Agency, Tools, dan SaaS yang dirancang untuk skala UMKM hingga enterprise.', en: 'From viral content, product photos, to full automation — all in one AI ecosystem. Agency, Tools, and SaaS designed to scale from SMEs to enterprise.' },
    { sel: '.bk-hero-buttons .btn-primary', id: 'Mulai Sekarang →', en: 'Get Started →' },
    { sel: '.bk-hero-buttons .btn-secondary', id: 'Lihat Semua Layanan', en: 'View All Services' },
    // Trust bar
    { sel: '.trust-item:nth-child(1) span, .trust-item:nth-child(1)', id: null, en: null, skip: true },
    // Stats
    { sel: '.bk-stat-label:nth-child(1), .stat-item:nth-child(1) .bk-stat-label', id: 'Konten diproduksi/bulan', en: 'Content pieces/month', multi: true, nth: 1 },
    { sel: '.stat-item:nth-child(2) .bk-stat-label', id: 'Lebih cepat dengan AI', en: 'Faster with AI' },
    { sel: '.stat-item:nth-child(3) .bk-stat-label', id: 'Platform terintegrasi', en: 'Integrated platforms' },
    { sel: '.stat-item:nth-child(4) .bk-stat-label', id: 'Waktu delivery rata-rata', en: 'Average delivery time' },
    // 3 Pillars
    { sel: '.bk-section-label',     id: 'Ekosistem BerkahKarya', en: 'BerkahKarya Ecosystem', nth: 1 },
    { sel: '.bk-section-title',     id: 'Tiga pilar yang saling<br>memperkuat bisnis Anda', en: 'Three pillars that<br>reinforce your business', html: true, nth: 1 },
    { sel: '.pillar-item:nth-child(1) .pillar-title', id: 'Jasa Kreatif & Digital', en: 'Creative & Digital Services' },
    { sel: '.pillar-item:nth-child(1) .pillar-desc', id: 'Tim kreatif manusia + AI untuk konten, video, foto produk, sosmed, dan website. Kualitas premium, harga terjangkau, delivery cepat.', en: 'Human + AI creative team for content, video, product photos, social media, and websites. Premium quality, affordable prices, fast delivery.' },
    { sel: '.pillar-item:nth-child(1) .service-link', id: 'Lihat Layanan →', en: 'View Services →' },
    { sel: '.pillar-item:nth-child(2) .pillar-title', id: 'AI Tools & Software', en: 'AI Tools & Software' },
    { sel: '.pillar-item:nth-child(2) .pillar-desc', id: 'Aplikasi AI siap pakai untuk bisnis: AI Agent chatbot, AI Video Studio, Content Planner — plug-and-play, tidak butuh tim IT.', en: 'Ready-to-use AI apps for business: AI Agent chatbot, AI Video Studio, Content Planner — plug-and-play, no IT team needed.' },
    { sel: '.pillar-item:nth-child(2) .service-link', id: 'Lihat Tools →', en: 'View Tools →' },
    { sel: '.pillar-item:nth-child(3) .pillar-title', id: 'Platform & API', en: 'Platform & API' },
    { sel: '.pillar-item:nth-child(3) .pillar-desc', id: 'Omniroute — AI API gateway untuk developer dan bisnis yang butuh integrasi multi-AI dengan satu endpoint. Scalable, reliable, hemat biaya.', en: 'Omniroute — AI API gateway for developers and businesses needing multi-AI integration with one endpoint. Scalable, reliable, cost-efficient.' },
    { sel: '.pillar-item:nth-child(3) .service-link', id: 'Lihat Omniroute →', en: 'View Omniroute →' },
    // Services section
    { sel: '.bk-section-label', id: 'Layanan Agency', en: 'Agency Services', nth: 2 },
    { sel: '.bk-section-title', id: 'Semua yang bisnis Anda<br>butuhkan, dalam satu tempat', en: 'Everything your business<br>needs, in one place', html: true, nth: 2 },
    { sel: '.bk-section-subtitle', id: 'Dari konten harian hingga kampanye besar — kami handle semuanya dengan AI-powered workflow.', en: 'From daily content to major campaigns — we handle everything with AI-powered workflow.' },
    // Service cards
    { sel: '.service-card:nth-child(1) .service-name', id: 'Kelola Sosial Media', en: 'Social Media Management' },
    { sel: '.service-card:nth-child(1) .service-desc', id: 'Konten harian, jadwal posting, copywriting, hashtag strategy untuk TikTok, IG, YouTube.', en: 'Daily content, posting schedule, copywriting, hashtag strategy for TikTok, IG, YouTube.' },
    { sel: '.service-card:nth-child(2) .service-name', id: 'Jasa Video AI', en: 'AI Video Service' },
    { sel: '.service-card:nth-child(2) .service-desc', id: 'Video produk, explainer, dan konten viral dengan teknologi AI generasi terbaru.', en: 'Product videos, explainers, and viral content with the latest AI technology.' },
    { sel: '.service-card:nth-child(3) .service-name', id: 'Jasa Pembuatan Website', en: 'Website Development' },
    { sel: '.service-card:nth-child(3) .service-desc', id: 'Landing page, company profile, toko online. Fast delivery 3-7 hari kerja.', en: 'Landing pages, company profiles, online stores. Fast delivery in 3-7 working days.' },
    { sel: '.service-card:nth-child(4) .service-name', id: 'Content Planner AI', en: 'AI Content Planner' },
    { sel: '.service-card:nth-child(4) .service-desc', id: 'Strategi konten 30 hari lengkap dengan kalender, topik, dan hook yang sudah terbukti viral.', en: '30-day complete content strategy with calendar, topics, and proven viral hooks.' },
    { sel: '.service-card:nth-child(5) .service-name', id: 'Foto Produk AI', en: 'AI Product Photography' },
    { sel: '.service-card:nth-child(5) .service-desc', id: 'Foto produk studio-quality tanpa studio fisik. Background custom, lighting sempurna.', en: 'Studio-quality product photos without a physical studio. Custom backgrounds, perfect lighting.' },
    { sel: '.service-card:nth-child(6) .service-name', id: 'Setup OpenClaw AI', en: 'OpenClaw AI Setup' },
    { sel: '.service-card:nth-child(6) .service-desc', id: 'Pasang AI assistant personal untuk bisnis Anda. Otomasi repetitive tasks, 24/7.', en: 'Set up a personal AI assistant for your business. Automate repetitive tasks, 24/7.' },
    { sel: '.services-grid + .text-center .btn-secondary', id: 'Lihat Semua Layanan', en: 'View All Services' },
    // Omniroute section
    { sel: '.omni-tag', id: 'New · SaaS Platform', en: 'New · SaaS Platform' },
    { sel: '.omni-title', id: 'Satu endpoint<br>untuk semua AI', en: 'One endpoint<br>for all AI models', html: true },
    { sel: '.omni-desc', id: 'Omniroute adalah intelligent API gateway yang me-route request ke model AI terbaik secara otomatis — GPT-4, Claude, Gemini, Mistral — berdasarkan task, biaya, dan speed.', en: 'Omniroute is an intelligent API gateway that automatically routes requests to the best AI model — GPT-4, Claude, Gemini, Mistral — based on task, cost, and speed.' },
    { sel: '.omni-feature:nth-child(1) span:last-child', id: 'Auto-routing ke model AI terbaik berdasarkan konteks', en: 'Auto-routing to the best AI model based on context' },
    { sel: '.omni-feature:nth-child(2) span:last-child', id: 'Hemat hingga 70% biaya API dengan smart fallback', en: 'Save up to 70% on API costs with smart fallback' },
    { sel: '.omni-feature:nth-child(3) span:last-child', id: 'Satu API key untuk semua provider — tanpa konfigurasi rumit', en: 'One API key for all providers — no complex configuration' },
    { sel: '.omni-feature:nth-child(4) span:last-child', id: 'Rate limiting, caching, dan analytics bawaan', en: 'Built-in rate limiting, caching, and analytics' },
    // CTA section
    { sel: '.bk-cta-label', id: 'Mulai Sekarang', en: 'Get Started' },
    { sel: '.bk-cta-title', id: 'Siap scale bisnis Anda<br>dengan AI?', en: 'Ready to scale your<br>business with AI?', html: true },
    { sel: '.bk-cta-subtitle', id: 'Konsultasi gratis 30 menit. Kami analisa kebutuhan dan rekomendasikan solusi terbaik.', en: 'Free 30-minute consultation. We analyze your needs and recommend the best solution.' },
    { sel: '.bk-cta-buttons .btn-primary', id: 'Konsultasi Gratis →', en: 'Free Consultation →' },
  ],

  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  '/about.html': [
    { sel: 'h1', id: 'Bukan Sekadar Agency.<br>Kami Bangun <em>Ekosistem Bisnis</em>.', en: 'More Than an Agency.<br>We Build a <em>Business Ecosystem</em>.', html: true },
    { sel: '.section-label:nth-of-type(1)', id: 'Tentang Kami', en: 'About Us' },
    { sel: '.section-title:nth-of-type(1)', id: 'Kami Hadir untuk Bisnis yang Siap Tumbuh', en: 'We Are Here for Businesses Ready to Grow' },
    { sel: '.stat-desc:nth-of-type(1)', id: 'Klien dilayani', en: 'Clients served' },
    { sel: '.stat-desc:nth-of-type(2)', id: 'Platform proprietary', en: 'Proprietary platforms' },
    { sel: '.stat-desc:nth-of-type(3)', id: 'Sistem AI aktif', en: 'Active AI systems' },
    { sel: 'h2', id: 'Siap Skalakan Bisnis Anda?', en: 'Ready to Scale Your Business?', nth: -1 },
  ],

  // ── BLOG PAGE ──────────────────────────────────────────────────────────────
  '/blog.html': [
    { sel: '.blog-hero h1, h1.blog-title, .bk-hero h1, h1', id: 'Postingan & Insight', en: 'Blog & Insights' },
    { sel: '.blog-hero p, .blog-hero-sub, .bk-hero p', id: 'Artikel terbaru tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.', en: 'Latest articles on AI, digital business, content strategy, and SME growth in Indonesia.' },
    { sel: '[data-i18n="blogTitle"]', id: 'Postingan & Insight', en: 'Blog & Insights' },
    { sel: '[data-i18n="blogSub"]', id: 'Artikel terbaru tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.', en: 'Latest articles on AI, digital business, content strategy, and SME growth in Indonesia.' },
    { sel: '.blog-cta-inner h2', id: 'Mau update insight bisnis & AI terbaru?', en: 'Want the latest business & AI insights?' },
    { sel: '.blog-cta-inner p', id: 'Bergabung dengan ribuan pengusaha yang sudah dapat notifikasi artikel terbaru kami langsung di WhatsApp.', en: 'Join thousands of entrepreneurs who already get our latest articles directly on WhatsApp.' },
    { sel: '.blog-cta-inner .btn-primary', id: '💬 Chat dengan Tim Kami', en: '💬 Chat with Our Team' },
  ],

  // ── CONTACT PAGE ──────────────────────────────────────────────────────────
  '/contact.html': [
    { sel: '.section-title, h2.section-title', id: 'Mulai Transformasi Digital Anda', en: 'Start Your Digital Transformation' },
    { sel: '#name + label, label[for="name"]', id: 'Nama Lengkap', en: 'Full Name' },
    { sel: 'label[for="email"]', id: 'Email', en: 'Email' },
    { sel: 'label[for="subject"]', id: 'Topik', en: 'Topic' },
    { sel: 'label[for="message"]', id: 'Pesan', en: 'Message' },
    { sel: 'button[type="submit"], .btn-submit', id: 'Kirim Pesan →', en: 'Send Message →' },
  ],

  // ── OMNIROUTE PAGE ─────────────────────────────────────────────────────────
  '/omniroute.html': [
    { sel: 'h1', id: 'Satu Gateway<br>untuk Semua<br>API AI Anda', en: 'One Gateway<br>for All<br>Your AI APIs', html: true },
  ],

  // ── TOOLS PAGE ─────────────────────────────────────────────────────────────
  '/tools.html': [
    { sel: 'h1', id: 'AI Tools untuk Bisnis Modern', en: 'AI Tools for Modern Business' },
    { sel: 'h2:first-of-type', id: 'Pilih Tools yang Tepat untuk Bisnis Anda', en: 'Choose the Right Tools for Your Business' },
  ],
};

// Export for use in nav.js / i18n engine
if (typeof window !== 'undefined') window.BK_TRANSLATIONS = BK_TRANSLATIONS;
if (typeof module !== 'undefined') module.exports = BK_TRANSLATIONS;
