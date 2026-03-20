/**
 * BerkahKarya — whatsapp-integration.js
 * Smart WA greeting per page/category + floating button
 * WA: +6285632740006
 */
(function () {
  'use strict';

  var WA_NUMBER = '6285632740006';

  var GREETINGS = {
    id: {
      home: {
        default: 'Halo! Saya tertarik untuk konsultasi gratis tentang digital marketing untuk bisnis saya.',
        tiktok: 'Halo! Saya mau konsultasi tentang strategi TikTok untuk bisnis saya.',
        ecommerce: 'Halo! Saya ingin konsultasi tentang optimasi e-commerce saya.',
      },
      services: {
        default: 'Halo! Saya tertarik dengan layanan BerkahKarya, bisa ceritakan lebih lanjut?',
        tiktok: 'Halo! Saya mau konsultasi tentang TikTok Content Agency untuk brand saya.',
        ecommerce: 'Halo! Saya ingin optimasi e-commerce saya, bisa dibantu?',
        seo: 'Halo! Saya butuh bantuan SEO untuk website bisnis saya.',
        aiagent: 'Halo! Saya tertarik dengan AI Agent Pro untuk otomasi chat bisnis saya.',
        video: 'Halo! Saya tertarik dengan Jasa Video AI untuk konten bisnis saya.',
        website: 'Halo! Saya ingin membuat website profesional untuk bisnis saya.',
      },
      pricing: {
        default: 'Halo! Saya mau tanya tentang harga layanan BerkahKarya.',
        starter: 'Halo! Saya tertarik dengan paket STARTER AI Agent Pro, bisa bantu setup?',
        growth: 'Halo! Saya mau jadwalkan demo GRATIS untuk paket GROWTH AI Agent Pro.',
        enterprise: 'Halo! Saya butuh paket ENTERPRISE untuk bisnis saya, bisa konsultasi?',
      },
      aiagent: {
        default: 'Halo! Saya mau jadwalkan DEMO GRATIS AI Agent Pro untuk bisnis saya.',
        demo: 'Halo! Saya mau jadwalkan DEMO GRATIS AI Agent Pro untuk bisnis saya.',
        setup: 'Halo! Saya ingin setup AI Agent Pro untuk otomasi chat bisnis saya.',
      },
      portfolio: {
        default: 'Halo! Saya mau lihat portofolio BerkahKarya lebih lengkap.',
        tiktok: 'Halo! Saya mau lihat case study TikTok Campaign yang pernah dikerjakan.',
        ecommerce: 'Halo! Saya ingin lihat case study E-commerce Optimization yang sukses.',
        seo: 'Halo! Saya mau lihat hasil SEO campaign yang pernah dikerjakan.',
      },
      roi: {
        default: 'Halo! Saya baru coba ROI Calculator di website BerkahKarya. Mau konsultasi lebih lanjut!',
      },
      contact: {
        default: 'Halo! Saya ingin menghubungi tim BerkahKarya untuk konsultasi.',
      },
    },
    en: {
      home: {
        default: 'Hi! I\'m interested in a free consultation about digital marketing for my business.',
        tiktok: 'Hi! I\'d like to consult about TikTok strategy for my business.',
        ecommerce: 'Hi! I\'d like to consult about optimizing my e-commerce business.',
      },
      services: {
        default: 'Hi! I\'m interested in BerkahKarya\'s services. Can you tell me more?',
        tiktok: 'Hi! I\'d like to consult about TikTok Content Agency for my brand.',
        ecommerce: 'Hi! I\'d like help optimizing my e-commerce store.',
        seo: 'Hi! I need help with SEO for my business website.',
        aiagent: 'Hi! I\'m interested in AI Agent Pro to automate my business chats.',
        video: 'Hi! I\'m interested in AI Video services for my business content.',
        website: 'Hi! I\'d like to build a professional website for my business.',
      },
      pricing: {
        default: 'Hi! I\'d like to ask about BerkahKarya pricing.',
        starter: 'Hi! I\'m interested in the STARTER AI Agent Pro plan. Can you help with setup?',
        growth: 'Hi! I\'d like to schedule a FREE demo for the GROWTH AI Agent Pro plan.',
        enterprise: 'Hi! I need an ENTERPRISE plan for my business. Can we consult?',
      },
      aiagent: {
        default: 'Hi! I\'d like to schedule a FREE DEMO of AI Agent Pro for my business.',
        demo: 'Hi! I\'d like to schedule a FREE DEMO of AI Agent Pro for my business.',
      },
      portfolio: {
        default: 'Hi! I\'d like to see more of BerkahKarya\'s portfolio.',
        tiktok: 'Hi! I\'d like to see TikTok Campaign case studies.',
        ecommerce: 'Hi! I\'d like to see successful E-commerce Optimization case studies.',
      },
      roi: {
        default: 'Hi! I just tried the ROI Calculator on the BerkahKarya website. I\'d like to consult further!',
      },
      contact: {
        default: 'Hi! I\'d like to contact the BerkahKarya team for a consultation.',
      },
    }
  };

  function getLang() {
    return (localStorage.getItem('preferredLanguage') || localStorage.getItem('bk_lang') || document.documentElement.lang || 'id').substring(0, 2);
  }

  function getPage() {
    var path = window.location.pathname.toLowerCase().replace('.html', '');
    if (path === '/' || path === '/index' || path === '') return 'home';
    if (path.indexOf('/service') !== -1 || path.indexOf('/jasa') !== -1) return 'services';
    if (path.indexOf('/pricing') !== -1) return 'pricing';
    if (path.indexOf('/ai-agent') !== -1) return 'aiagent';
    if (path.indexOf('/portfolio') !== -1) return 'portfolio';
    if (path.indexOf('/roi') !== -1) return 'roi';
    if (path.indexOf('/contact') !== -1) return 'contact';
    return 'home';
  }

  function generateWhatsAppLink(page, category, lang) {
    lang = lang || getLang();
    page = page || getPage();
    category = category || 'default';

    var langData = GREETINGS[lang] || GREETINGS.id;
    var pageData = langData[page] || langData.home;
    var greeting = pageData[category] || pageData['default'];

    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(greeting);
  }

  function updateWhatsAppLinks() {
    var links = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    links.forEach(function (link) {
      var category = link.getAttribute('data-wa-category') || 'default';
      var page = link.getAttribute('data-wa-page') || getPage();
      link.href = generateWhatsAppLink(page, category, getLang());
    });
  }

  function createFloatingWhatsAppButton() {
    if (document.getElementById('bk-wa-float')) return;

    // Styles
    var style = document.createElement('style');
    style.textContent = [
      '#bk-wa-float {',
      '  position: fixed; bottom: 24px; right: 24px;',
      '  width: 64px; height: 64px;',
      '  background: linear-gradient(135deg, #25D366, #128C7E);',
      '  border-radius: 50%; z-index: 9999;',
      '  display: flex; align-items: center; justify-content: center;',
      '  cursor: pointer; text-decoration: none;',
      '  box-shadow: 0 4px 20px rgba(37,211,102,0.45);',
      '  animation: bk-wa-pulse 2.2s infinite;',
      '  transition: transform 0.2s;',
      '}',
      '#bk-wa-float:hover { transform: scale(1.1); }',
      '#bk-wa-float svg { width: 34px; height: 34px; fill: #fff; }',
      '@keyframes bk-wa-pulse {',
      '  0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }',
      '  50% { box-shadow: 0 4px 32px rgba(37,211,102,0.75), 0 0 0 10px rgba(37,211,102,0.12); }',
      '}',
      '#bk-wa-tooltip {',
      '  position: fixed; bottom: 98px; right: 24px;',
      '  background: #fff; color: #111; font-size: 0.82rem;',
      '  padding: 7px 14px; border-radius: 8px;',
      '  box-shadow: 0 4px 16px rgba(0,0,0,0.15);',
      '  white-space: nowrap; z-index: 9998;',
      '  opacity: 0; pointer-events: none;',
      '  transition: opacity 0.2s; font-weight: 600;',
      '}',
      '#bk-wa-float:hover + #bk-wa-tooltip { opacity: 1; }',
    ].join('\n');
    document.head.appendChild(style);

    var btn = document.createElement('a');
    btn.id = 'bk-wa-float';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.95 0C5.345 0 0 5.345 0 11.95c0 2.08.537 4.134 1.559 5.957L.05 23.95l6.267-1.48A11.89 11.89 0 0011.95 23.9C18.554 23.9 24 18.556 24 11.95 24 5.344 18.555 0 11.95 0zm0 21.8a9.797 9.797 0 01-5.034-1.393l-.356-.213-3.72.877.895-3.618-.234-.37A9.804 9.804 0 012.15 11.95C2.15 6.557 6.558 2.15 11.95 2.15c5.394 0 9.8 4.408 9.8 9.8 0 5.393-4.406 9.8-9.8 9.8z"/></svg>';
    btn.href = generateWhatsAppLink();
    btn.setAttribute('aria-label', 'Chat di WhatsApp');

    var tooltip = document.createElement('div');
    tooltip.id = 'bk-wa-tooltip';
    tooltip.textContent = getLang() === 'en' ? 'Chat with us!' : 'Chat dengan kami!';

    document.body.appendChild(btn);
    document.body.appendChild(tooltip);

    // Update on language change
    document.addEventListener('languageChanged', function (e) {
      var lang = (e.detail && e.detail.lang) || 'id';
      btn.href = generateWhatsAppLink(null, null, lang);
      tooltip.textContent = lang === 'en' ? 'Chat with us!' : 'Chat dengan kami!';
    });
  }

  // Export
  window.BerkahKarya = window.BerkahKarya || {};
  window.BerkahKarya.WhatsApp = {
    generateLink: generateWhatsAppLink,
    updateLinks: updateWhatsAppLinks,
    createFloat: createFloatingWhatsAppButton,
    number: WA_NUMBER
  };

  function init() {
    updateWhatsAppLinks();
    createFloatingWhatsAppButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
