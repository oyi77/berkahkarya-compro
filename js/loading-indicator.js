/**
 * BerkahKarya — loading-indicator.js
 * Full-page loading overlay with smooth fade-out
 */
(function () {
  'use strict';

  window.BerkahKarya = window.BerkahKarya || {};

  var overlay = null;

  function inject() {
    if (document.getElementById('bk-page-loading')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#bk-page-loading {',
      '  position: fixed; inset: 0; z-index: 99999;',
      '  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      '  display: flex; align-items: center; justify-content: center;',
      '  transition: opacity 0.35s ease, visibility 0.35s ease;',
      '}',
      '#bk-page-loading.bk-loading-hidden { opacity: 0; visibility: hidden; }',
      '.bk-loading-content { text-align: center; }',
      '.bk-loading-logo { margin-bottom: 24px; animation: bk-bounce 1.5s ease-in-out infinite; }',
      '.bk-loading-logo img { width: 72px; height: 72px; object-fit: contain; }',
      '.bk-loading-logo-text {',
      '  font-size: 1.6rem; font-weight: 900; color: #fff; letter-spacing: -0.04em;',
      '}',
      '.bk-loading-logo-text span { color: #fbbf24; }',
      '.bk-spinner {',
      '  width: 44px; height: 44px; margin: 0 auto 20px;',
      '  border: 4px solid rgba(255,255,255,0.25);',
      '  border-top-color: #fff;',
      '  border-radius: 50%;',
      '  animation: bk-spin 0.9s linear infinite;',
      '}',
      '.bk-loading-message {',
      '  color: rgba(255,255,255,0.85); font-size: 0.9rem; font-weight: 500;',
      '  animation: bk-pulse-text 2s ease-in-out infinite;',
      '}',
      '@keyframes bk-bounce {',
      '  0%,100% { transform: translateY(0); }',
      '  50% { transform: translateY(-10px); }',
      '}',
      '@keyframes bk-spin {',
      '  to { transform: rotate(360deg); }',
      '}',
      '@keyframes bk-pulse-text {',
      '  0%,100% { opacity: 1; }',
      '  50% { opacity: 0.55; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.id = 'bk-page-loading';
    overlay.innerHTML = [
      '<div class="bk-loading-content">',
      '  <div class="bk-loading-logo">',
      '    <img src="/images/logo.png" alt="BerkahKarya" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">',
      '    <div class="bk-loading-logo-text" style="display:none">Berkah<span>Karya</span></div>',
      '  </div>',
      '  <div class="bk-spinner"></div>',
      '  <div class="bk-loading-message">Memuat...</div>',
      '</div>',
    ].join('\n');

    // Insert as first child of body
    document.body.insertBefore(overlay, document.body.firstChild);
  }

  function show(message) {
    if (!overlay) inject();
    var msg = overlay.querySelector('.bk-loading-message');
    if (msg && message) msg.textContent = message;
    overlay.classList.remove('bk-loading-hidden');
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.add('bk-loading-hidden');
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
    }, 400);
  }

  window.BerkahKarya.Loading = { show: show, hide: hide };

  // Auto behaviour: show immediately, hide on load
  function autoInit() {
    inject();
    if (document.readyState === 'complete') {
      setTimeout(hide, 300);
    } else {
      window.addEventListener('load', function () {
        setTimeout(hide, 500);
      });
    }
  }

  autoInit();
})();
