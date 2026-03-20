/**
 * BerkahKarya — nav.js v2
 * Handles: mobile menu, language detection (IP + browser), full-page i18n
 * 
 * How full-page i18n works:
 * 1. Elements with [data-i18n="key"] → translate by key (legacy, nav only)
 * 2. Elements with [data-id="..."] [data-en="..."] → translate by attribute
 * 3. Page-specific rules from lang/translations.js (selector-based)
 * 4. IP geolocation detects country → auto-switch to EN for non-ID visitors
 */
(function () {
  'use strict';

  // ── Legacy key-based translations (nav + data-i18n elements) ──────────────
  var KEY_TRANS = {
    id: {
      navServices: 'Layanan', navProducts: 'Produk Digital', navBlog: 'Postingan',
      navTools: 'Tools', navAbout: 'About', navCta: 'Konsultasi →',
      blogTitle: 'Postingan & Insight',
      blogSub: 'Artikel terbaru tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.',
      blogReadMore: 'Baca Selengkapnya →', blogAllCategories: 'Semua',
      backToBlog: '← Kembali ke Postingan', relatedArticles: 'Artikel Terkait',
      footerTagline: 'AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital dalam satu ekosistem.',
      footerRights: 'Semua hak dilindungi.', footerMadeWith: 'Dibuat dengan ❤️ + 🤖 AI di Indonesia',
    },
    en: {
      navServices: 'Services', navProducts: 'Digital Products', navBlog: 'Blog',
      navTools: 'Tools', navAbout: 'About', navCta: 'Consult →',
      blogTitle: 'Blog & Insights',
      blogSub: 'Latest articles on AI, digital business, content strategy, and SME growth in Indonesia.',
      blogReadMore: 'Read More →', blogAllCategories: 'All',
      backToBlog: '← Back to Blog', relatedArticles: 'Related Articles',
      footerTagline: 'AI Ecosystem for Indonesian businesses — creative agency, AI tools, and digital products in one ecosystem.',
      footerRights: 'All rights reserved.', footerMadeWith: 'Made with ❤️ + 🤖 AI in Indonesia',
    }
  };

  // ── Inline page translations (covers all pages without touching HTML) ─────
  // Format: { sel: CSS selector, id: "text", en: "text", html: bool }
  // nth: index (1-based) if selector matches multiple; -1 = last
  var PAGE_RULES = [
    // ─ index.html ────────────────────────────────────────────────────────────
    { page: '/', sel: '.bk-hero-tag', id: 'AI Ecosystem · BerkahKarya 2025', en: 'AI Ecosystem · BerkahKarya 2025' },
    { page: '/', sel: '.bk-hero-title', id: 'AI Ecosystem untuk<br><em class="text-mustard">Bisnis Indonesia</em>', en: 'AI Ecosystem for<br><em class="text-mustard">Indonesian Business</em>', html: true },
    { page: '/', sel: '.bk-hero-subtitle', id: 'Dari konten viral, foto produk, hingga otomasi penuh — semua dalam satu ekosistem AI. Agency, Tools, dan SaaS yang dirancang untuk skala UMKM hingga enterprise.', en: 'From viral content, product photos, to full automation — all in one AI ecosystem. Agency, Tools, and SaaS designed to scale from SMEs to enterprise.' },
    { page: '/', sel: '.bk-hero-buttons .btn-primary', id: 'Mulai Sekarang →', en: 'Get Started →' },
    { page: '/', sel: '.bk-hero-buttons .btn-secondary', id: 'Lihat Semua Layanan', en: 'View All Services' },
    { page: '/', sel: '.stat-item:nth-child(1) .bk-stat-label', id: 'Konten diproduksi/bulan', en: 'Content pieces/month' },
    { page: '/', sel: '.stat-item:nth-child(2) .bk-stat-label', id: 'Lebih cepat dengan AI', en: 'Faster with AI' },
    { page: '/', sel: '.stat-item:nth-child(3) .bk-stat-label', id: 'Platform terintegrasi', en: 'Integrated platforms' },
    { page: '/', sel: '.stat-item:nth-child(4) .bk-stat-label', id: 'Waktu delivery rata-rata', en: 'Average delivery time' },
    { page: '/', sel: '.bk-section-label', id: 'Ekosistem BerkahKarya', en: 'BerkahKarya Ecosystem', nth: 1 },
    { page: '/', sel: '.bk-section-title', id: 'Tiga pilar yang saling<br>memperkuat bisnis Anda', en: 'Three pillars that<br>strengthen your business', html: true, nth: 1 },
    { page: '/', sel: '.pillar-item:nth-child(1) .pillar-title', id: 'Jasa Kreatif & Digital', en: 'Creative & Digital Services' },
    { page: '/', sel: '.pillar-item:nth-child(1) .pillar-desc', id: null, en: 'Human + AI creative team for content, video, product photos, social media, and websites. Premium quality, affordable prices, fast delivery.' },
    { page: '/', sel: '.pillar-item:nth-child(1) .service-link', id: 'Lihat Layanan →', en: 'View Services →' },
    { page: '/', sel: '.pillar-item:nth-child(2) .pillar-desc', id: null, en: 'Ready-to-use AI apps for business: AI Agent chatbot, AI Video Studio, Content Planner — plug-and-play, no IT team needed.' },
    { page: '/', sel: '.pillar-item:nth-child(2) .service-link', id: 'Lihat Tools →', en: 'View Tools →' },
    { page: '/', sel: '.pillar-item:nth-child(3) .pillar-desc', id: null, en: 'Omniroute — AI API gateway for developers and businesses needing multi-AI integration with one endpoint. Scalable, reliable, cost-efficient.' },
    { page: '/', sel: '.pillar-item:nth-child(3) .service-link', id: 'Lihat Omniroute →', en: 'View Omniroute →' },
    { page: '/', sel: '.bk-section-label', id: 'Layanan Agency', en: 'Agency Services', nth: 2 },
    { page: '/', sel: '.bk-section-title', id: 'Semua yang bisnis Anda<br>butuhkan, dalam satu tempat', en: 'Everything your business<br>needs, in one place', html: true, nth: 2 },
    { page: '/', sel: '.bk-section-subtitle', id: null, en: 'From daily content to major campaigns — we handle everything with AI-powered workflow.' },
    { page: '/', sel: '.service-card:nth-child(1) .service-name', id: 'Kelola Sosial Media', en: 'Social Media Management' },
    { page: '/', sel: '.service-card:nth-child(1) .service-desc', id: null, en: 'Daily content, posting schedule, copywriting, hashtag strategy for TikTok, IG, YouTube.' },
    { page: '/', sel: '.service-card:nth-child(2) .service-name', id: 'Jasa Video AI', en: 'AI Video Service' },
    { page: '/', sel: '.service-card:nth-child(2) .service-desc', id: null, en: 'Product videos, explainers, and viral content with the latest AI technology.' },
    { page: '/', sel: '.service-card:nth-child(3) .service-name', id: 'Jasa Pembuatan Website', en: 'Website Development' },
    { page: '/', sel: '.service-card:nth-child(3) .service-desc', id: null, en: 'Landing pages, company profiles, online stores. Fast delivery in 3-7 working days.' },
    { page: '/', sel: '.service-card:nth-child(4) .service-name', id: 'Content Planner AI', en: 'AI Content Planner' },
    { page: '/', sel: '.service-card:nth-child(4) .service-desc', id: null, en: '30-day complete content strategy with calendar, topics, and proven viral hooks.' },
    { page: '/', sel: '.service-card:nth-child(5) .service-name', id: 'Foto Produk AI', en: 'AI Product Photography' },
    { page: '/', sel: '.service-card:nth-child(5) .service-desc', id: null, en: 'Studio-quality product photos without a physical studio. Custom backgrounds, perfect lighting.' },
    { page: '/', sel: '.service-card:nth-child(6) .service-name', id: 'Setup OpenClaw AI', en: 'OpenClaw AI Setup' },
    { page: '/', sel: '.service-card:nth-child(6) .service-desc', id: null, en: 'Set up a personal AI assistant for your business. Automate repetitive tasks, 24/7.' },
    { page: '/', sel: '.omni-tag', id: 'New · SaaS Platform', en: 'New · SaaS Platform' },
    { page: '/', sel: '.omni-title', id: 'Satu endpoint<br>untuk semua AI', en: 'One endpoint<br>for all AI models', html: true },
    { page: '/', sel: '.omni-desc', id: null, en: 'Omniroute is an intelligent API gateway that automatically routes requests to the best AI model — GPT-4, Claude, Gemini, Mistral — based on task, cost, and speed.' },
    { page: '/', sel: '.omni-features .omni-feature:nth-child(1) span:last-child', id: null, en: 'Auto-routing to the best AI model based on context' },
    { page: '/', sel: '.omni-features .omni-feature:nth-child(2) span:last-child', id: null, en: 'Save up to 70% on API costs with smart fallback' },
    { page: '/', sel: '.omni-features .omni-feature:nth-child(3) span:last-child', id: null, en: 'One API key for all providers — no complex configuration' },
    { page: '/', sel: '.omni-features .omni-feature:nth-child(4) span:last-child', id: null, en: 'Built-in rate limiting, caching, and analytics' },
    { page: '/', sel: '.bk-cta-label', id: 'Mulai Sekarang', en: 'Get Started' },
    { page: '/', sel: '.bk-cta-title', id: 'Siap scale bisnis Anda<br>dengan AI?', en: 'Ready to scale your<br>business with AI?', html: true },
    { page: '/', sel: '.bk-cta-subtitle', id: null, en: 'Free 30-minute consultation. We analyze your needs and recommend the best solution.' },
    { page: '/', sel: '.bk-cta-buttons .btn-primary', id: 'Konsultasi Gratis →', en: 'Free Consultation →' },
    // Trust bar
    { page: '/', sel: '.trust-item:nth-child(1)', id: 'Agency Kreatif', en: 'Creative Agency', textOnly: true },
    { page: '/', sel: '.trust-item:nth-child(2)', id: 'AI Tools & SaaS', en: 'AI Tools & SaaS', textOnly: true },
    { page: '/', sel: '.trust-item:nth-child(3)', id: 'Omnichannel API', en: 'Omnichannel API', textOnly: true },
    { page: '/', sel: '.trust-item:nth-child(4)', id: 'Otomasi Bisnis', en: 'Business Automation', textOnly: true },
    { page: '/', sel: '.trust-item:nth-child(5)', id: 'Konten Viral', en: 'Viral Content', textOnly: true },
    // Hero pills
    { page: '/', sel: '.hero-pill:nth-child(2)', id: '📱 Konten Sosmed', en: '📱 Social Content' },
    { page: '/', sel: '.hero-pill:nth-child(6)', id: '🔀 API Gateway', en: '🔀 API Gateway' },
    // Footer
    { page: '/', sel: '.bk-footer-brand p', id: null, en: 'AI Ecosystem for Indonesian businesses — creative agency, AI tools, and SaaS platform in one integrated ecosystem.' },

    // ─ about.html ────────────────────────────────────────────────────────────
    { page: '/about', sel: 'h1', id: null, en: 'More Than an Agency.<br>We Build a <em>Business Ecosystem</em>.', html: true },
    { page: '/about', sel: '.section-label:first-of-type', id: 'Tentang Kami', en: 'About Us' },
    { page: '/about', sel: '.section-title:first-of-type', id: null, en: 'We Are Here for Businesses Ready to Grow' },
    { page: '/about', sel: '.stat-desc:nth-of-type(1)', id: 'Klien dilayani', en: 'Clients served' },
    { page: '/about', sel: '.stat-desc:nth-of-type(2)', id: 'Platform proprietary', en: 'Proprietary platforms' },
    { page: '/about', sel: '.stat-desc:nth-of-type(3)', id: 'Sistem AI aktif', en: 'Active AI systems' },
    { page: '/about', sel: '.value-item:nth-child(1) .value-title', id: 'Eksekusi Cepat', en: 'Fast Execution' },
    { page: '/about', sel: '.value-item:nth-child(2) .value-title', id: 'Data di Atas Opini', en: 'Data Over Opinion' },
    { page: '/about', sel: '.value-item:nth-child(3) .value-title', id: 'AI-First Mindset', en: 'AI-First Mindset' },
    { page: '/about', sel: '.value-item:nth-child(4) .value-title', id: 'Ekosistem, Bukan Proyek', en: 'Ecosystem, Not Projects' },
    { page: '/about', sel: '.value-item:nth-child(5) .value-title', id: 'Hasil, Bukan Proses', en: 'Results, Not Process' },
    { page: '/about', sel: '.cat-title:nth-child(1)', id: 'Solusi Bisnis', en: 'Business Solutions' },
    { page: '/about', sel: '.cat-title:nth-child(2)', id: 'Tools AI', en: 'AI Tools' },
    { page: '/about', sel: '.cat-title:nth-child(3)', id: 'Omniroute Platform', en: 'Omniroute Platform' },

    // ─ blog.html ─────────────────────────────────────────────────────────────
    { page: '/blog', sel: '.blog-hero h1, h1', id: 'Postingan & Insight', en: 'Blog & Insights' },
    { page: '/blog', sel: '.blog-hero p, .blog-sub', id: null, en: 'Latest articles on AI, digital business, content strategy, and SME growth.' },
    { page: '/blog', sel: '.blog-cta-inner h2', id: null, en: 'Want the latest business & AI insights?' },
    { page: '/blog', sel: '.blog-cta-inner p', id: null, en: 'Join thousands of entrepreneurs who get our latest articles directly on WhatsApp.' },
    { page: '/blog', sel: '.blog-cta-inner .btn-primary', id: '💬 Chat dengan Tim Kami', en: '💬 Chat with Our Team' },
    { page: '/blog', sel: '.blog-filter-btn[data-cat="all"], .blog-filter-btn:first-child', id: 'Semua', en: 'All' },

    // ─ omniroute.html ─────────────────────────────────────────────────────────
    { page: '/omniroute', sel: 'h1', id: null, en: 'One Gateway<br>for All<br>Your AI APIs', html: true },
    { page: '/omniroute', sel: '.omni-hero-sub, .hero-subtitle, h1 + p', id: null, en: 'Auto-route to the best AI model — GPT-4, Claude, Gemini, Mistral — with one API key.' },

    // ─ tools.html ─────────────────────────────────────────────────────────────
    { page: '/tools', sel: 'h1', id: 'AI Tools untuk Bisnis Modern', en: 'AI Tools for Modern Business' },
    { page: '/tools', sel: 'h2:first-of-type', id: 'Pilih Tools yang Tepat untuk Bisnis Anda', en: 'Choose the Right Tools for Your Business' },

    // ─ services.html ──────────────────────────────────────────────────────────
    { page: '/services', sel: 'h1', id: 'Produk & Jasa<br><em>BerkahKarya</em>', en: 'Products & Services<br><em>BerkahKarya</em>', html: true },

    // ─ pricing.html ───────────────────────────────────────────────────────────
    { page: '/pricing', sel: 'h1', id: 'Pricing Kami', en: 'Our Pricing' },
    { page: '/pricing', sel: 'h2:first-of-type', id: 'Pilihan Paket', en: 'Package Options' },

    // ─ contact.html ───────────────────────────────────────────────────────────
    { page: '/contact', sel: '.section-title, h2:first-of-type', id: 'Mulai Transformasi Digital Anda', en: 'Start Your Digital Transformation' },
    { page: '/contact', sel: 'label[for="name"]', id: 'Nama Lengkap', en: 'Full Name' },
    { page: '/contact', sel: 'label[for="email"]', id: 'Email', en: 'Email' },
    { page: '/contact', sel: 'label[for="subject"]', id: 'Topik', en: 'Topic' },
    { page: '/contact', sel: 'label[for="message"]', id: 'Pesan', en: 'Message' },
    { page: '/contact', sel: 'button[type="submit"]', id: 'Kirim Pesan →', en: 'Send Message →' },

    // ─ digital-product.html ───────────────────────────────────────────────────
    { page: '/digital-product', sel: 'h1', id: 'Produk Digital<br>Berkah Karya', en: 'Digital Products<br>Berkah Karya', html: true },
    { page: '/digital-product', sel: 'h2:last-of-type', id: 'Butuh Produk Custom?', en: 'Need a Custom Product?' },

    // ─ All jasa pages ─────────────────────────────────────────────────────────
    { page: '/jasa', sel: '.service-hero-label, .page-label', id: 'Layanan BerkahKarya', en: 'BerkahKarya Services' },
  ];

  // ── Language Detection ─────────────────────────────────────────────────────
  function detectLang() {
    var saved = localStorage.getItem('bk_lang');
    if (saved === 'en' || saved === 'id') return saved;

    var urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam === 'en' || urlParam === 'id') {
      localStorage.setItem('bk_lang', urlParam);
      return urlParam;
    }

    var browserLang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    if (browserLang.startsWith('en')) {
      scheduleIpDetection();
      return 'en';
    }

    scheduleIpDetection();
    return 'id';
  }

  function scheduleIpDetection() {
    if (localStorage.getItem('bk_lang')) return;
    setTimeout(function () {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 3000) : null;
      var opts = ctrl ? { signal: ctrl.signal } : {};
      fetch('https://ipapi.co/json/', opts)
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (timer) clearTimeout(timer);
          var lang = (d.country_code && d.country_code !== 'ID') ? 'en' : 'id';
          if (!localStorage.getItem('bk_lang')) {
            localStorage.setItem('bk_lang', lang);
            applyLang(lang);
          }
        })
        .catch(function () {});
    }, 800);
  }

  // ── Apply full-page translations ──────────────────────────────────────────
  function applyLang(lang) {
    var t = KEY_TRANS[lang] || KEY_TRANS['id'];
    var path = window.location.pathname.replace('.html', '').replace(/\/$/, '') || '/';

    // 1. Legacy data-i18n elements (nav, footer keys)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // 2. Inline data-id / data-en attributes (added directly in HTML)
    document.querySelectorAll('[data-id][data-en]').forEach(function (el) {
      var val = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
      if (val !== null) el.innerHTML = val;
    });

    // 3. Page rules — selector-based
    if (lang === 'en') {
      PAGE_RULES.forEach(function (rule) {
        // Match page: '/' = homepage, '/about' = /about or /about.html
        var pageMatch = false;
        if (rule.page === '/') {
          pageMatch = (path === '/' || path === '/index' || path === '');
        } else {
          pageMatch = path.indexOf(rule.page) === 0 || path === rule.page;
        }
        if (!pageMatch) return;

        var text = rule.en;
        if (text === null || text === undefined) return;

        try {
          var els = document.querySelectorAll(rule.sel);
          if (!els.length) return;

          var el;
          if (rule.nth !== undefined) {
            if (rule.nth === -1) {
              el = els[els.length - 1];
            } else {
              el = els[rule.nth - 1];
            }
          } else {
            el = els[0];
          }

          if (!el) return;

          if (rule.textOnly) {
            // Replace text nodes only (keep child elements like .trust-dot)
            var textNodes = [];
            el.childNodes.forEach(function(n) {
              if (n.nodeType === 3) textNodes.push(n);
            });
            if (textNodes.length) {
              textNodes[textNodes.length - 1].textContent = ' ' + text;
            } else {
              el.insertAdjacentText('beforeend', text);
            }
          } else if (rule.html) {
            el.innerHTML = text;
          } else {
            el.textContent = text;
          }
        } catch(e) {}
      });
    }

    // 4. Update UI
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'id' ? '🌐 EN' : '🌐 ID';
    document.documentElement.lang = lang;
    window._bkLang = lang;
  }

  function setLanguage(lang) {
    localStorage.setItem('bk_lang', lang);
    applyLang(lang);
  }
  window.bkSetLanguage = setLanguage;

  // ── Mobile Menu ────────────────────────────────────────────────────────────
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
        toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
      });
      nav.querySelectorAll('.bk-nav-mobile-menu a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.textContent = '☰';
        });
      });
    }
  }

  // ── Lang Toggle ─────────────────────────────────────────────────────────────
  function initLangToggle() {
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = localStorage.getItem('bk_lang') || window._bkLang || 'id';
        setLanguage(current === 'id' ? 'en' : 'id');
      });
    }
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var lang = detectLang();
    applyLang(lang);
    initMobileMenu();
    initLangToggle();
  });
})();
