/**
 * BerkahKarya — nav.js
 * Handles: mobile menu toggle, language detection, i18n, lang toggle
 */
(function () {
  'use strict';

  // ── Translations embedded ──────────────────────────────────────────────────
  var TRANSLATIONS = {
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

  // ── Language Detection ──────────────────────────────────────────────────────
  function detectLang() {
    // 1. localStorage override (user preference)
    var saved = localStorage.getItem('bk_lang');
    if (saved === 'en' || saved === 'id') return saved;

    // 2. URL param ?lang=en
    var urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam === 'en' || urlParam === 'id') {
      localStorage.setItem('bk_lang', urlParam);
      return urlParam;
    }

    // 3. Browser language
    var browserLang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    if (browserLang.startsWith('en')) return 'en';

    // 4. IP geolocation (async — applies after initial load)
    scheduleIpDetection();

    return 'id'; // default
  }

  function scheduleIpDetection() {
    if (localStorage.getItem('bk_lang')) return; // already set
    setTimeout(function () {
      fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var lang = (d.country_code !== 'ID') ? 'en' : 'id';
          if (!localStorage.getItem('bk_lang')) {
            localStorage.setItem('bk_lang', lang);
            applyLang(lang);
          }
        })
        .catch(function () {}); // silent fail
    }, 1500);
  }

  // ── Apply Translations ──────────────────────────────────────────────────────
  function applyLang(lang) {
    var t = TRANSLATIONS[lang] || TRANSLATIONS['id'];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update lang toggle button text
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'id' ? '🌐 EN' : '🌐 ID';

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Store for this session
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
      // Close on link click
      var links = nav.querySelectorAll('.bk-nav-mobile-menu a');
      links.forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.textContent = '☰';
        });
      });
    }
  }

  // ── Lang Toggle Button ─────────────────────────────────────────────────────
  function initLangToggle() {
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = localStorage.getItem('bk_lang') || 'id';
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
