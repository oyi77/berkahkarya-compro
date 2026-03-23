/**
 * BerkahKarya — analytics.js
 * Full GA4 event tracking: semua interaksi → WA contact → purchase
 * GA4 Property: G-V9C14XZ9SG
 *
 * Events tracked:
 * - page_view (auto by GA4)
 * - wa_contact_click      — semua klik WA (konsultasi umum)
 * - wa_purchase_click     — klik WA yang ada kata "beli/membeli/harga" di querynya
 * - cta_click             — semua tombol CTA utama
 * - product_view          — halaman dp-*.html, omniroute, ai-agent
 * - blog_read             — baca artikel blog (>30s + scroll 50%)
 * - scroll_depth          — 25%, 50%, 75%, 90%
 * - contact_form_submit   — submit form contact.html
 * - pricing_view          — kunjungan pricing.html
 * - outbound_click        — klik link keluar selain WA
 */

(function () {
  'use strict';

  var GA_ID = 'G-V9C14XZ9SG';

  // ── Helpers ──────────────────────────────────────────────────────────────
  function safeGtag() {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(window, arguments);
    }
  }

  function getPageMeta() {
    return {
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    };
  }

  function getProductFromUrl() {
    var path = window.location.pathname;
    var map = {
      'dp-ai-ad-engine':       'AI Ad Engine',
      'dp-ai-creative-tools':  'AI Creative Tools',
      'dp-food-menu':          'Food Menu AI',
      'dp-guru-ai':            'Guru AI',
      'dp-job-magnet':         'Job Magnet AI',
      'dp-parenting':          'Parenting AI',
      'dp-studio-pro':         'Studio Pro AI',
      'omniroute':             'Omniroute',
      'ai-agent-pro':          'AI Agent WA',
      'ai-video-studio':       'AI Video Studio',
      'jasa-website':          'Jasa Website',
      'jasa-foto-produk':      'Jasa Foto Produk',
      'jasa-content-planner':  'Jasa Content Planner',
      'jasa-sosmed':           'Jasa Sosmed',
      'jasa-video-ai':         'Jasa Video AI',
      'jasa-openclaw':         'Jasa OpenClaw'
    };
    for (var key in map) {
      if (path.indexOf(key) !== -1) return map[key];
    }
    return null;
  }

  function getPriceFromWaText(href) {
    // Extract price hint from WA message text
    var match = decodeURIComponent(href).match(/Rp\s?([\d.,]+)/i);
    return match ? match[1].replace(/[.,]/g, '') : null;
  }

  function isPurchaseIntent(href) {
    var decoded = decodeURIComponent(href).toLowerCase();
    return /membeli|beli|purchase|buy|pesan|order|harga/.test(decoded);
  }

  function getWaCategory(href) {
    var decoded = decodeURIComponent(href).toLowerCase();
    if (/membeli|beli/.test(decoded)) return 'purchase';
    if (/konsultasi|konsul/.test(decoded)) return 'consultation';
    if (/demo|coba|trial/.test(decoded)) return 'demo_request';
    return 'general_contact';
  }

  // ── 1. WA Click Tracking ─────────────────────────────────────────────────
  function trackWaClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('a[href*="wa.me"]');
      if (!el) return;

      var href = el.getAttribute('href') || '';
      var category = getWaCategory(href);
      var product = getProductFromUrl();
      var price = getPriceFromWaText(href);
      var linkText = (el.textContent || '').trim().replace(/\s+/g, ' ').substring(0, 80);

      // Base event
      var eventName = category === 'purchase' ? 'wa_purchase_click' : 'wa_contact_click';
      var params = Object.assign({}, getPageMeta(), {
        event_category: 'WhatsApp',
        event_label: linkText,
        wa_category: category,
        product_name: product || 'unknown'
      });
      if (price) params.value = parseFloat(price);
      if (price) params.currency = 'IDR';

      safeGtag('event', eventName, params);

      // Also fire GA4 purchase conversion if purchase intent
      if (category === 'purchase') {
        safeGtag('event', 'begin_checkout', Object.assign({}, params, {
          items: [{
            item_name: product || 'Unknown Product',
            item_category: 'Digital Product',
            price: price ? parseFloat(price) / 1000 : 0,
            currency: 'IDR',
            quantity: 1
          }]
        }));
      }
    }, true);
  }

  // ── 2. CTA Button Clicks ─────────────────────────────────────────────────
  function trackCtaClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('.btn-primary, .btn.primary, [data-track-cta]');
      if (!el) return;
      if (el.href && el.href.indexOf('wa.me') !== -1) return; // already tracked above

      var label = (el.textContent || el.getAttribute('data-track-cta') || '').trim().replace(/\s+/g, ' ').substring(0, 80);
      var dest = el.getAttribute('href') || '';

      safeGtag('event', 'cta_click', Object.assign({}, getPageMeta(), {
        event_category: 'CTA',
        event_label: label,
        cta_destination: dest,
        product_name: getProductFromUrl() || 'unknown'
      }));
    }, true);
  }

  // ── 3. Product Page View ─────────────────────────────────────────────────
  function trackProductView() {
    var product = getProductFromUrl();
    if (!product) return;

    safeGtag('event', 'view_item', Object.assign({}, getPageMeta(), {
      event_category: 'Product',
      items: [{
        item_name: product,
        item_category: window.location.pathname.indexOf('dp-') !== -1 ? 'Digital Product' : 'Service',
        quantity: 1
      }]
    }));
  }

  // ── 4. Blog Article Read (30s + 50% scroll) ──────────────────────────────
  function trackBlogRead() {
    if (window.location.pathname.indexOf('/blog/') === -1) return;
    var scrolled = false;
    var timeReached = false;

    function fireReadEvent() {
      if (scrolled && timeReached) {
        safeGtag('event', 'blog_article_read', Object.assign({}, getPageMeta(), {
          event_category: 'Blog',
          event_label: document.title,
          read_depth: '50pct_30s'
        }));
      }
    }

    setTimeout(function () { timeReached = true; fireReadEvent(); }, 30000);

    window.addEventListener('scroll', function () {
      if (scrolled) return;
      var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPct >= 0.5) {
        scrolled = true;
        fireReadEvent();
      }
    }, { passive: true });
  }

  // ── 5. Scroll Depth ──────────────────────────────────────────────────────
  function trackScrollDepth() {
    var milestones = [25, 50, 75, 90];
    var fired = {};

    window.addEventListener('scroll', function () {
      var pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      milestones.forEach(function (m) {
        if (pct >= m && !fired[m]) {
          fired[m] = true;
          safeGtag('event', 'scroll_depth', Object.assign({}, getPageMeta(), {
            event_category: 'Engagement',
            event_label: m + '%',
            scroll_milestone: m
          }));
        }
      });
    }, { passive: true });
  }

  // ── 6. Contact Form Submit ───────────────────────────────────────────────
  function trackContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function () {
      var subject = document.getElementById('subject');
      safeGtag('event', 'contact_form_submit', Object.assign({}, getPageMeta(), {
        event_category: 'Lead',
        event_label: subject ? subject.value : 'unknown',
        form_id: 'contactForm'
      }));
      // Also fire GA4 generate_lead
      safeGtag('event', 'generate_lead', {
        event_category: 'Lead',
        form_type: subject ? subject.value : 'general'
      });
    });
  }

  // ── 7. Pricing Page View ─────────────────────────────────────────────────
  function trackPricingView() {
    if (window.location.pathname.indexOf('pricing') === -1) return;
    safeGtag('event', 'view_item_list', Object.assign({}, getPageMeta(), {
      event_category: 'Pricing',
      item_list_name: 'Pricing Page'
    }));
  }

  // ── 8. Outbound Link Clicks ──────────────────────────────────────────────
  function trackOutboundClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('a[href^="http"]');
      if (!el) return;
      var href = el.getAttribute('href') || '';
      if (href.indexOf('berkahkarya.org') !== -1) return;
      if (href.indexOf('wa.me') !== -1) return; // tracked above

      safeGtag('event', 'click', Object.assign({}, getPageMeta(), {
        event_category: 'Outbound',
        event_label: href.substring(0, 100),
        link_url: href,
        link_text: (el.textContent || '').trim().substring(0, 60),
        outbound: true
      }));
    }, true);
  }

  // ── 9. Time on Page (milestone) ──────────────────────────────────────────
  function trackTimeOnPage() {
    [30, 60, 120, 300].forEach(function (sec) {
      setTimeout(function () {
        safeGtag('event', 'time_on_page', Object.assign({}, getPageMeta(), {
          event_category: 'Engagement',
          event_label: sec + 's',
          seconds: sec
        }));
      }, sec * 1000);
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    trackWaClicks();
    trackCtaClicks();
    trackProductView();
    trackBlogRead();
    trackScrollDepth();
    trackContactForm();
    trackPricingView();
    trackOutboundClicks();
    trackTimeOnPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
