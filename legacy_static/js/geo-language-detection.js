/**
 * BerkahKarya — geo-language-detection.js
 * Auto-detect country via IP, map to language, store in localStorage
 */
(function () {
  'use strict';

  window.BerkahKarya = window.BerkahKarya || {};

  var EN_COUNTRIES = ['US','GB','AU','SG','MY','PH','CA','NZ','IE','IN','ZA','NG','KE','GH','JM','TT'];
  var LS_KEY = 'preferredLanguage';
  var BK_COMPAT_KEY = 'bk_lang'; // nav.js uses this key

  function detectCountryByIP() {
    return new Promise(function (resolve, reject) {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 3500) : null;
      var opts = ctrl ? { signal: ctrl.signal } : {};
      fetch('https://ipapi.co/json/', opts)
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (timer) clearTimeout(timer);
          resolve(d.country_code || null);
        })
        .catch(function () { resolve(null); });
    });
  }

  function getFromBrowser() {
    var lang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    return lang.startsWith('id') ? 'id' : 'en';
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'id';
    localStorage.setItem(LS_KEY, lang);
    localStorage.setItem(BK_COMPAT_KEY, lang);

    // Fire event for other modules
    var ev;
    try {
      ev = new CustomEvent('languageChanged', { detail: { lang: lang } });
    } catch (e) {
      ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('languageChanged', true, true, { lang: lang });
    }
    document.dispatchEvent(ev);

    // Trigger nav.js applyLang if available
    if (typeof applyLang === 'function') applyLang(lang);
    // Trigger nav.js via its exposed global (bkSetLanguage wraps applyLang)
    if (typeof window.bkSetLanguage === 'function') window.bkSetLanguage(lang);
  }

  function switchLanguage(newLang) {
    applyLanguage(newLang === 'en' ? 'en' : 'id');
  }

  function detectAndSetLanguage() {
    // 1. Honour explicit user preference
    var saved = localStorage.getItem(LS_KEY) || localStorage.getItem(BK_COMPAT_KEY);
    if (saved === 'en' || saved === 'id') {
      applyLanguage(saved);
      return Promise.resolve(saved);
    }

    // 2. URL param override
    var urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'en' || urlLang === 'id') {
      applyLanguage(urlLang);
      return Promise.resolve(urlLang);
    }

    // 3. IP detection
    return detectCountryByIP().then(function (countryCode) {
      var lang;
      if (countryCode === null) {
        lang = getFromBrowser();
      } else {
        lang = EN_COUNTRIES.indexOf(countryCode) !== -1 ? 'en' : 'id';
      }
      applyLanguage(lang);
      return lang;
    }).catch(function () {
      var lang = getFromBrowser();
      applyLanguage(lang);
      return lang;
    });
  }

  // Export
  window.BerkahKarya.Language = {
    detect: detectAndSetLanguage,
    switch: switchLanguage,
    getCurrent: function () { return document.documentElement.lang || 'id'; },
    apply: applyLanguage
  };

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectAndSetLanguage);
  } else {
    detectAndSetLanguage();
  }
})();
