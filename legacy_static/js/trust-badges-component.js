/**
 * BerkahKarya — trust-badges-component.js
 * Render trust badges section: security, social proof stats, client logos
 */
(function () {
  'use strict';

  window.BerkahKarya = window.BerkahKarya || {};

  var SECURITY_BADGES = [
    { icon: '🔒', text: { id: 'SSL Secured', en: 'SSL Secured' } },
    { icon: '✅', text: { id: 'PSE Compliant', en: 'PSE Compliant' } },
    { icon: '💳', text: { id: 'Secure Payment', en: 'Secure Payment' } },
    { icon: '🛡️', text: { id: 'Data Protected', en: 'Data Protected' } },
    { icon: '⚡', text: { id: '99.9% Uptime', en: '99.9% Uptime' } },
  ];

  var STATS = [
    { number: '500+', label: { id: 'Proyek Selesai', en: 'Projects Done' } },
    { number: '98%', label: { id: 'Kepuasan Klien', en: 'Client Satisfaction' } },
    { number: '4.9/5', label: { id: 'Rating Rata-rata', en: 'Average Rating' } },
    { number: '3x', label: { id: 'ROI Rata-rata', en: 'Average ROI' } },
  ];

  var CLIENT_LOGOS = [
    { name: 'Brand A', initial: 'BA', color: '#6366f1' },
    { name: 'Brand B', initial: 'BB', color: '#f59e0b' },
    { name: 'Brand C', initial: 'BC', color: '#10b981' },
    { name: 'Brand D', initial: 'BD', color: '#ef4444' },
    { name: 'Brand E', initial: 'BE', color: '#8b5cf6' },
    { name: 'Brand F', initial: 'BF', color: '#06b6d4' },
  ];

  function injectStyles() {
    if (document.getElementById('bk-trust-styles')) return;
    var style = document.createElement('style');
    style.id = 'bk-trust-styles';
    style.textContent = [
      '.bk-trust-section {',
      '  padding: 60px 0; background: #f8fafc;',
      '}',
      '.bk-trust-section .bk-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }',

      /* Security badges */
      '.bk-security-badges {',
      '  display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 48px;',
      '}',
      '.bk-trust-badge {',
      '  display: inline-flex; align-items: center; gap: 8px;',
      '  background: #fff; border: 1px solid #e2e8f0;',
      '  border-radius: 10px; padding: 10px 18px;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.06);',
      '  font-size: 0.85rem; font-weight: 600; color: #374151;',
      '  transition: transform 0.18s, box-shadow 0.18s;',
      '}',
      '.bk-trust-badge:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }',
      '.bk-badge-icon { font-size: 18px; }',

      /* Stats */
      '.bk-trust-stats {',
      '  display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));',
      '  gap: 24px; margin-bottom: 48px;',
      '}',
      '.bk-trust-stat {',
      '  background: #fff; border-radius: 16px; padding: 28px 20px; text-align: center;',
      '  box-shadow: 0 2px 12px rgba(0,0,0,0.07);',
      '  border-top: 3px solid transparent;',
      '  border-image: linear-gradient(135deg,#667eea,#764ba2) 1;',
      '  transition: transform 0.18s, box-shadow 0.18s;',
      '}',
      '.bk-trust-stat:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }',
      '.bk-stat-number {',
      '  font-size: 2.75rem; font-weight: 900; letter-spacing: -0.04em; line-height: 1;',
      '  background: linear-gradient(135deg,#667eea,#764ba2);',
      '  -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
      '  background-clip: text; margin-bottom: 6px;',
      '}',
      '.bk-stat-label { font-size: 0.82rem; color: #64748b; font-weight: 500; }',

      /* Client logos */
      '.bk-client-logos { text-align: center; }',
      '.bk-client-logos h3 {',
      '  font-size: 0.9rem; font-weight: 600; color: #94a3b8;',
      '  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 24px;',
      '}',
      '.bk-logos-grid {',
      '  display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;',
      '}',
      '.bk-client-logo {',
      '  width: 80px; height: 48px; border-radius: 10px;',
      '  display: flex; align-items: center; justify-content: center;',
      '  font-weight: 800; font-size: 0.9rem; letter-spacing: 0.05em;',
      '  filter: grayscale(1) opacity(0.5);',
      '  transition: filter 0.25s, transform 0.18s;',
      '  cursor: default;',
      '}',
      '.bk-client-logo:hover { filter: grayscale(0) opacity(1); transform: scale(1.06); }',

      /* Fade-in animation */
      '@keyframes bk-fadeInUp {',
      '  from { opacity: 0; transform: translateY(16px); }',
      '  to { opacity: 1; transform: translateY(0); }',
      '}',
      '.bk-trust-badge, .bk-trust-stat, .bk-client-logo {',
      '  animation: bk-fadeInUp 0.5s ease both;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  function getLang() {
    var l = localStorage.getItem('preferredLanguage') || localStorage.getItem('bk_lang') || document.documentElement.lang || 'id';
    return l.substring(0, 2);
  }

  function render(container, lang) {
    lang = lang || getLang();
    container.innerHTML = '';
    container.className = 'bk-trust-section';

    var inner = document.createElement('div');
    inner.className = 'bk-container';

    // Security badges
    var badgesWrap = document.createElement('div');
    badgesWrap.className = 'bk-security-badges';
    SECURITY_BADGES.forEach(function (b, i) {
      var el = document.createElement('div');
      el.className = 'bk-trust-badge';
      el.style.animationDelay = (i * 60) + 'ms';
      el.innerHTML = '<span class="bk-badge-icon">' + b.icon + '</span><span class="bk-badge-text">' + (b.text[lang] || b.text.id) + '</span>';
      badgesWrap.appendChild(el);
    });
    inner.appendChild(badgesWrap);

    // Stats
    var statsGrid = document.createElement('div');
    statsGrid.className = 'bk-trust-stats';
    STATS.forEach(function (s, i) {
      var el = document.createElement('div');
      el.className = 'bk-trust-stat';
      el.style.animationDelay = (100 + i * 80) + 'ms';
      el.innerHTML = '<div class="bk-stat-number">' + s.number + '</div><div class="bk-stat-label">' + (s.label[lang] || s.label.id) + '</div>';
      statsGrid.appendChild(el);
    });
    inner.appendChild(statsGrid);

    // Client logos
    var logosWrap = document.createElement('div');
    logosWrap.className = 'bk-client-logos';
    var title = lang === 'en' ? 'Trusted By' : 'Dipercaya Oleh';
    var grid = document.createElement('div');
    grid.className = 'bk-logos-grid';
    CLIENT_LOGOS.forEach(function (logo, i) {
      var el = document.createElement('div');
      el.className = 'bk-client-logo';
      el.style.background = logo.color + '22';
      el.style.color = logo.color;
      el.style.animationDelay = (200 + i * 70) + 'ms';
      el.textContent = logo.initial;
      el.title = logo.name;
      grid.appendChild(el);
    });
    logosWrap.innerHTML = '<h3>' + title + '</h3>';
    logosWrap.appendChild(grid);
    inner.appendChild(logosWrap);

    container.appendChild(inner);
  }

  function mount(selector) {
    var el = document.querySelector(selector || '.bk-trust-section, [data-trust-badges]');
    if (!el) return;
    injectStyles();
    render(el);
    document.addEventListener('languageChanged', function (e) {
      render(el, e.detail && e.detail.lang);
    });
  }

  window.BerkahKarya.TrustBadges = { mount: mount, render: render, injectStyles: injectStyles };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); });
  } else {
    mount();
  }
})();
