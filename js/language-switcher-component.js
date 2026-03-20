/**
 * BerkahKarya — language-switcher-component.js
 * Upgrades #langToggle into a flag-icon button
 */
(function () {
  'use strict';

  var FLAGS = { id: '🇮🇩', en: '🇬🇧' };
  var LABELS = { id: 'ID', en: 'EN' };

  function injectStyles() {
    if (document.getElementById('bk-lang-switcher-styles')) return;
    var style = document.createElement('style');
    style.id = 'bk-lang-switcher-styles';
    style.textContent = [
      '#langToggle, #language-switcher {',
      '  display: inline-flex; align-items: center; gap: 6px;',
      '  padding: 7px 13px; background: rgba(255,255,255,0.10);',
      '  border: 1px solid rgba(255,255,255,0.22); border-radius: 8px;',
      '  cursor: pointer; font-size: 0.875rem; color: inherit;',
      '  transition: transform 0.18s, background 0.18s; white-space: nowrap;',
      '}',
      '#langToggle:hover, #language-switcher:hover {',
      '  transform: translateY(-1px); background: rgba(255,255,255,0.18);',
      '}',
      '#langToggle .bk-flag, #language-switcher .bk-flag { font-size: 18px; line-height: 1; }',
      '#langToggle .bk-code, #language-switcher .bk-code { font-weight: 700; letter-spacing: 0.03em; }',
    ].join('\n');
    document.head.appendChild(style);
  }

  function updateButton(btn, lang) {
    btn.innerHTML =
      '<span class="bk-flag">' + (FLAGS[lang] || FLAGS.id) + '</span>' +
      '<span class="bk-code">' + (LABELS[lang === 'id' ? 'en' : 'en'] || 'EN') + '</span>';
    // Show opposite lang on button (toggle target)
    var target = lang === 'id' ? 'en' : 'id';
    btn.innerHTML =
      '<span class="bk-flag">' + FLAGS[target] + '</span>' +
      '<span class="bk-code">' + LABELS[target] + '</span>';
    btn.setAttribute('aria-label', 'Switch to ' + (target === 'en' ? 'English' : 'Bahasa Indonesia'));
    btn.setAttribute('data-target-lang', target);
  }

  function upgradeButton(btn) {
    var currentLang = localStorage.getItem('preferredLanguage')
      || localStorage.getItem('bk_lang')
      || document.documentElement.lang
      || 'id';
    updateButton(btn, currentLang);

    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-target-lang') || 'en';
      // Prefer nav.js's bkSetLanguage (applies full PAGE_RULES + data-i18n)
      if (typeof window.bkSetLanguage === 'function') {
        localStorage.setItem('preferredLanguage', target);
        window.bkSetLanguage(target);
      } else if (window.BerkahKarya && window.BerkahKarya.Language) {
        window.BerkahKarya.Language.switch(target);
      } else {
        localStorage.setItem('bk_lang', target);
        localStorage.setItem('preferredLanguage', target);
        window.location.reload();
      }
    });
  }

  function init() {
    injectStyles();

    // Upgrade existing #langToggle
    var existing = document.getElementById('langToggle');
    if (existing) upgradeButton(existing);

    // Also handle #language-switcher if present
    var switcher = document.getElementById('language-switcher');
    if (switcher && switcher !== existing) upgradeButton(switcher);

    // Listen for language change events
    document.addEventListener('languageChanged', function (e) {
      var lang = (e.detail && e.detail.lang) || 'id';
      var btns = [
        document.getElementById('langToggle'),
        document.getElementById('language-switcher')
      ];
      btns.forEach(function (btn) { if (btn) updateButton(btn, lang); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
