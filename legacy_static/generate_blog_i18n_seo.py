#!/usr/bin/env python3
"""
BerkahKarya Website Enhancement:
1. Audit & fix nav across all HTML pages (add Blog menu)
2. Create nav.js with i18n system
3. Create lang/id.js and lang/en.js
4. Create blog.html (index)
5. Create blog/ai-di-bisnis.html (ID article)
6. Create blog/ai-in-business.html (EN article)
7. Add SEO: schema.org, OG tags, hreflang, sitemap.xml, robots.txt
"""

import os, re, json
from pathlib import Path

DIR = Path(__file__).parent
WA = "6285732740006"

# ─── 1. Create lang/ translations ─────────────────────────────────────────────

(DIR / "lang").mkdir(exist_ok=True)

ID_TRANSLATIONS = {
    "navServices": "Layanan",
    "navProducts": "Produk Digital",
    "navBlog": "Postingan",
    "navTools": "Tools",
    "navAbout": "About",
    "navCta": "Konsultasi →",
    "heroTagline": "AI Ecosystem untuk Bisnis Indonesia",
    "footerTagline": "AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital dalam satu ekosistem.",
    "footerServices": "Layanan",
    "footerPlatform": "Platform",
    "footerCompany": "Perusahaan",
    "footerRights": "Semua hak dilindungi.",
    "footerMadeWith": "Dibuat dengan ❤️ + 🤖 AI di Indonesia",
    "blogTitle": "Postingan & Insight",
    "blogSub": "Artikel terbaru tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.",
    "blogReadMore": "Baca Selengkapnya →",
    "blogAllCategories": "Semua",
    "backToBlog": "← Kembali ke Postingan",
    "relatedArticles": "Artikel Terkait",
}

EN_TRANSLATIONS = {
    "navServices": "Services",
    "navProducts": "Digital Products",
    "navBlog": "Blog",
    "navTools": "Tools",
    "navAbout": "About",
    "navCta": "Consult →",
    "heroTagline": "AI Ecosystem for Indonesian Business",
    "footerTagline": "AI Ecosystem for Indonesian businesses — creative agency, AI tools, and digital products in one ecosystem.",
    "footerServices": "Services",
    "footerPlatform": "Platform",
    "footerCompany": "Company",
    "footerRights": "All rights reserved.",
    "footerMadeWith": "Made with ❤️ + 🤖 AI in Indonesia",
    "blogTitle": "Blog & Insights",
    "blogSub": "Latest articles on AI, digital business, content strategy, and SME growth in Indonesia.",
    "blogReadMore": "Read More →",
    "blogAllCategories": "All",
    "backToBlog": "← Back to Blog",
    "relatedArticles": "Related Articles",
}

(DIR / "lang" / "id.js").write_text(
    f"// BerkahKarya — Indonesian translations\n"
    f"const BK_LANG_ID = {json.dumps(ID_TRANSLATIONS, ensure_ascii=False, indent=2)};\n"
    f"if (typeof module !== 'undefined') module.exports = BK_LANG_ID;\n",
    encoding="utf-8"
)

(DIR / "lang" / "en.js").write_text(
    f"// BerkahKarya — English translations\n"
    f"const BK_LANG_EN = {json.dumps(EN_TRANSLATIONS, ensure_ascii=False, indent=2)};\n"
    f"if (typeof module !== 'undefined') module.exports = BK_LANG_EN;\n",
    encoding="utf-8"
)

print("✅ lang/id.js + lang/en.js")

# ─── 2. Create nav.js ─────────────────────────────────────────────────────────

NAV_JS = r"""/**
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
"""

(DIR / "nav.js").write_text(NAV_JS, encoding="utf-8")
print("✅ nav.js")

# ─── 3. Nav CSS additions for style.css (append) ──────────────────────────────

LANG_CSS = """
/* ── Language Toggle ── */
.bk-lang-toggle {
  background: none; border: 1px solid var(--border); color: var(--text-muted);
  border-radius: 999px; padding: 5px 12px; font-size: 0.75rem; font-weight: 600;
  cursor: pointer; transition: all 0.18s; letter-spacing: 0.04em;
  font-family: var(--font);
}
.bk-lang-toggle:hover { border-color: var(--mustard); color: var(--mustard); }
.bk-nav-right { display: flex; align-items: center; gap: 12px; }
@media (max-width: 768px) {
  .bk-lang-toggle { font-size: 0.7rem; padding: 4px 10px; }
}
"""

style_path = DIR / "style.css"
style_content = style_path.read_text(encoding="utf-8")
if "bk-lang-toggle" not in style_content:
    style_path.write_text(style_content + "\n" + LANG_CSS, encoding="utf-8")
    print("✅ style.css — lang toggle CSS appended")
else:
    print("✅ style.css — lang toggle CSS already present")

# ─── 4. Update ALL HTML files: nav + script tag ───────────────────────────────

# Standard nav HTML for root-level pages
def make_nav_html(wa_greeting="Halo Berkah Karya, saya ingin konsultasi", prefix=""):
    wa_enc = wa_greeting.replace(" ", "%20").replace("?", "%3F").replace(",", "%2C").replace("'", "%27")
    return f"""<nav class="bk-nav" id="mainNav">
  <div class="bk-nav-inner">
    <a href="{prefix}index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="{prefix}services.html" data-i18n="navServices">Layanan</a></li>
      <li><a href="{prefix}digital-product.html" data-i18n="navProducts">Produk Digital</a></li>
      <li><a href="{prefix}blog.html" data-i18n="navBlog">Postingan</a></li>
      <li><a href="{prefix}tools.html" data-i18n="navTools">Tools</a></li>
      <li><a href="{prefix}about.html" data-i18n="navAbout">About</a></li>
    </ul>
    <div class="bk-nav-right">
      <button class="bk-lang-toggle" id="langToggle" title="Switch Language">🌐 EN</button>
      <a href="https://wa.me/{WA}?text={wa_enc}" class="bk-nav-cta" target="_blank" rel="noopener" data-i18n="navCta">Konsultasi →</a>
    </div>
    <button class="bk-nav-mobile" id="mobileToggle" aria-label="Menu">☰</button>
  </div>
  <div class="bk-nav-mobile-menu" id="mobileMenu">
    <a href="{prefix}services.html" data-i18n="navServices">Layanan</a>
    <a href="{prefix}digital-product.html" data-i18n="navProducts">Produk Digital</a>
    <a href="{prefix}blog.html" data-i18n="navBlog">Postingan</a>
    <a href="{prefix}tools.html" data-i18n="navTools">Tools</a>
    <a href="{prefix}about.html" data-i18n="navAbout">About</a>
    <a href="https://wa.me/{WA}?text={wa_enc}" target="_blank" rel="noopener">💬 Konsultasi</a>
    <div style="padding:4px 0;border-top:1px solid var(--border);margin-top:4px">
      <button class="bk-lang-toggle" id="langToggleMobile" onclick="bkSetLanguage(document.documentElement.lang==='id'?'en':'id')" style="width:100%;text-align:left;border:none;padding:8px 0;background:none;font-size:0.85rem;color:var(--text-muted);cursor:pointer;">🌐 Switch Language</button>
    </div>
  </div>
</nav>"""

NAV_MOBILE_CSS = """
  .bk-nav.open .bk-nav-mobile-menu {
    display: flex; flex-direction: column; gap: 0;
    padding: 0.75rem 1.5rem 1rem;
    border-bottom: 1px solid var(--border);
    background: var(--bg-white);
  }
  .bk-nav-mobile-menu { display: none; }
  .bk-nav-mobile-menu a {
    font-size: 0.9rem; font-weight: 500; color: var(--text-muted);
    padding: 0.55rem 0; border-bottom: 1px solid var(--border);
  }
  .bk-nav-mobile-menu a:last-of-type { border-bottom: none; }"""

def inject_nav_and_script(html_content, nav_html, prefix=""):
    """Replace existing bk-nav block with new standardized nav, inject nav.js."""
    # Replace nav block
    html_content = re.sub(
        r'<nav\s+class="bk-nav[^"]*".*?</nav>',
        nav_html,
        html_content,
        count=1,
        flags=re.DOTALL
    )

    # Ensure nav.js is loaded (before </body>)
    nav_script = f'<script src="{prefix}nav.js"></script>'
    if 'nav.js' not in html_content:
        html_content = html_content.replace('</body>', f'{nav_script}\n</body>')

    # Inject mobile menu CSS if not present
    if 'bk-nav-mobile-menu' not in html_content:
        html_content = html_content.replace('</style>', NAV_MOBILE_CSS + '\n</style>', 1)

    return html_content


# Process all root-level HTML files
html_files = sorted(DIR.glob("*.html"))
updated = []

for html_path in html_files:
    content = html_path.read_text(encoding="utf-8")

    # Skip if no bk-nav (shouldn't happen, but safe)
    if 'bk-nav' not in content:
        continue

    # Determine WA greeting based on page type
    name = html_path.stem
    if name.startswith("jasa-"):
        service_map = {
            "jasa-website": "Jasa Pembuatan Website",
            "jasa-sosmed": "Jasa Kelola Social Media",
            "jasa-content-planner": "Jasa Content Planner",
            "jasa-video-ai": "Jasa Video AI",
            "jasa-foto-produk": "Jasa Foto Produk AI",
            "jasa-openclaw": "Jasa Setup OpenClaw AI Agent",
        }
        svc = service_map.get(name, "layanan Berkah Karya")
        wa_greeting = f"Halo Berkah Karya, saya tertarik dengan {svc}. Bisa konsultasi?"
    elif name.startswith("dp-"):
        wa_greeting = "Halo Berkah Karya, saya tertarik dengan produk digital. Bisa konsultasi?"
    elif name == "omniroute":
        wa_greeting = "Halo Berkah Karya, saya tertarik dengan Omniroute. Bisa konsultasi?"
    elif name == "blog":
        wa_greeting = "Halo Berkah Karya, saya ingin konsultasi"
    else:
        wa_greeting = "Halo Berkah Karya, saya ingin konsultasi"

    new_nav = make_nav_html(wa_greeting=wa_greeting, prefix="")
    new_content = inject_nav_and_script(content, new_nav, prefix="")

    if new_content != content:
        html_path.write_text(new_content, encoding="utf-8")
        updated.append(html_path.name)

print(f"✅ Updated nav in {len(updated)} HTML files: {', '.join(updated)}")

# ─── 5. Create blog.html ──────────────────────────────────────────────────────

BLOG_ARTICLES = [
    {
        "slug": "blog/ai-di-bisnis.html",
        "slug_en": "blog/ai-in-business.html",
        "title_id": "Cara Pakai AI untuk Tingkatkan Penjualan Bisnis Kecil",
        "title_en": "How to Use AI to Boost Sales for Small Businesses",
        "date": "20 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "AI & Bisnis",
        "category_en": "AI & Business",
        "excerpt_id": "AI bukan lagi hanya untuk perusahaan besar. Pelajari cara konkret menggunakan tools AI untuk otomatisasi konten, layanan pelanggan, dan strategi pemasaran bisnis Anda.",
        "excerpt_en": "AI is no longer just for large corporations. Learn concrete ways to use AI tools for content automation, customer service, and marketing strategy for your business.",
        "thumb_alt": "Ilustrasi penggunaan AI untuk bisnis kecil dan UMKM Indonesia",
        "read_time": "8 min baca",
    },
    {
        "slug": "blog/strategi-konten-tiktok-2026.html",
        "slug_en": "blog/tiktok-content-strategy-2026.html",
        "title_id": "Strategi Konten TikTok 2026: Dari 0 ke 10.000 Followers",
        "title_en": "TikTok Content Strategy 2026: From 0 to 10,000 Followers",
        "date": "18 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "Social Media",
        "category_en": "Social Media",
        "excerpt_id": "Algoritma TikTok berubah lagi di 2026. Temukan framework konten yang terbukti membawa akun baru ke 10K followers dalam 90 hari, tanpa iklan berbayar.",
        "excerpt_en": "TikTok's algorithm changed again in 2026. Discover the content framework proven to bring new accounts to 10K followers in 90 days, without paid ads.",
        "thumb_alt": "Strategi konten TikTok untuk bisnis Indonesia 2026",
        "read_time": "6 min baca",
    },
    {
        "slug": "blog/website-umkm-wajib-ada.html",
        "slug_en": "blog/why-smes-need-website.html",
        "title_id": "5 Alasan Bisnis Kamu Wajib Punya Website di 2026",
        "title_en": "5 Reasons Your Business Must Have a Website in 2026",
        "date": "15 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "Website & Digital",
        "category_en": "Website & Digital",
        "excerpt_id": "Masih pakai Linktree atau bio Instagram sebagai 'website'? Ini 5 alasan konkret kenapa bisnis Anda kehilangan pendapatan tanpa website profesional.",
        "excerpt_en": "Still using Linktree or Instagram bio as your 'website'? Here are 5 concrete reasons why your business is losing revenue without a professional website.",
        "thumb_alt": "Pentingnya website profesional untuk UMKM Indonesia",
        "read_time": "5 min baca",
    },
    {
        "slug": "blog/omniroute-api-management.html",
        "slug_en": "blog/omniroute-api-management-en.html",
        "title_id": "Omniroute: Kelola 10+ AI Provider dengan Satu API Key",
        "title_en": "Omniroute: Manage 10+ AI Providers with One API Key",
        "date": "12 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "Tech & Tools",
        "category_en": "Tech & Tools",
        "excerpt_id": "Capek punya 10 API key berbeda untuk OpenAI, Claude, Gemini, dan DeepSeek? Omniroute menyederhanakan semuanya dengan satu endpoint yang cerdas.",
        "excerpt_en": "Tired of managing 10 different API keys for OpenAI, Claude, Gemini, and DeepSeek? Omniroute simplifies everything with one intelligent endpoint.",
        "thumb_alt": "Omniroute API management dashboard untuk developer Indonesia",
        "read_time": "7 min baca",
    },
    {
        "slug": "blog/foto-produk-ai-marketplace.html",
        "slug_en": "blog/ai-product-photos-marketplace.html",
        "title_id": "Cara Buat Foto Produk Kelas Studio dengan AI — Tanpa Kamera Mahal",
        "title_en": "How to Create Studio-Quality Product Photos with AI — No Expensive Camera",
        "date": "10 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "AI & Bisnis",
        "category_en": "AI & Business",
        "excerpt_id": "Foto produk adalah faktor #1 penjualan di marketplace. Pelajari bagaimana AI bisa menghasilkan foto setara fotografer profesional dengan biaya jauh lebih murah.",
        "excerpt_en": "Product photos are the #1 sales factor in marketplaces. Learn how AI can produce photos equivalent to professional photographers at a much lower cost.",
        "thumb_alt": "Foto produk AI untuk marketplace Shopee dan Tokopedia Indonesia",
        "read_time": "5 min baca",
    },
    {
        "slug": "blog/content-planner-bisnis.html",
        "slug_en": "blog/content-planner-business.html",
        "title_id": "Content Planner 30 Hari: Template Gratis + Cara Eksekusinya",
        "title_en": "30-Day Content Planner: Free Template + How to Execute",
        "date": "8 Maret 2026",
        "author": "Tim BerkahKarya",
        "category": "Strategi Konten",
        "category_en": "Content Strategy",
        "excerpt_id": "Tidak ada lagi alasan kehabisan ide konten. Template content planner 30 hari ini sudah digunakan 500+ bisnis Indonesia untuk maintain konsistensi posting.",
        "excerpt_en": "No more excuses for running out of content ideas. This 30-day content planner template has been used by 500+ Indonesian businesses to maintain posting consistency.",
        "thumb_alt": "Template content planner 30 hari untuk bisnis Indonesia",
        "read_time": "4 min baca",
    },
]

# Generate thumb SVG placeholder (colored box with category label)
def thumb_svg(category, color="#c8920a"):
    return f"""<div class="blog-thumb-placeholder" style="background:linear-gradient(135deg,#fef9ec 0%,#fde68a 100%);display:flex;align-items:center;justify-content:center;height:100%;min-height:180px;border-radius:4px 4px 0 0;">
      <span style="font-size:2.5rem">📝</span>
    </div>"""

# Blog index HTML
def make_blog_html():
    cards = ""
    for i, art in enumerate(BLOG_ARTICLES):
        cards += f"""    <article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">
      <a href="{art['slug']}" class="blog-card-img-link" aria-label="{art['title_id']}">
        <div class="blog-card-img">
          {thumb_svg(art['category'])}
        </div>
      </a>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span class="blog-cat">{art['category']}</span>
          <span class="blog-date" itemprop="datePublished" content="{art['date']}">{art['date']}</span>
          <span class="blog-read">{art['read_time']}</span>
        </div>
        <h2 class="blog-card-title" itemprop="headline">
          <a href="{art['slug']}">{art['title_id']}</a>
        </h2>
        <p class="blog-card-excerpt" itemprop="description">{art['excerpt_id']}</p>
        <a href="{art['slug']}" class="blog-read-more" data-i18n="blogReadMore">Baca Selengkapnya →</a>
      </div>
    </article>\n"""

    # Schema.org Organization
    schema_org = json.dumps({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BerkahKarya",
        "url": "https://berkahkarya.org",
        "logo": "https://berkahkarya.org/images/logo.png",
        "description": "AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital.",
        "contactPoint": {"@type": "ContactPoint", "contactType": "customer service",
                         "availableLanguage": ["Indonesian", "English"]},
        "sameAs": ["https://www.instagram.com/berkahkarya", "https://www.tiktok.com/@berkahkarya"]
    }, ensure_ascii=False, indent=2)

    schema_blog = json.dumps({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "BerkahKarya Blog",
        "url": "https://berkahkarya.org/blog.html",
        "description": "Artikel tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.",
        "publisher": {"@type": "Organization", "name": "BerkahKarya", "url": "https://berkahkarya.org"}
    }, ensure_ascii=False, indent=2)

    nav_html_blog = make_nav_html(wa_greeting="Halo Berkah Karya, saya ingin konsultasi", prefix="")

    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Postingan & Insight AI Bisnis — BerkahKarya</title>
  <meta name="description" content="Artikel terbaru tentang AI untuk bisnis, strategi konten TikTok dan Instagram, foto produk AI, dan tips pertumbuhan UMKM Indonesia dari BerkahKarya." />
  <meta property="og:title" content="Postingan & Insight AI Bisnis — BerkahKarya" />
  <meta property="og:description" content="Artikel terbaru tentang AI untuk bisnis, strategi konten, dan tips UMKM Indonesia." />
  <meta property="og:image" content="https://berkahkarya.org/images/og-blog.jpg" />
  <meta property="og:url" content="https://berkahkarya.org/blog.html" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Postingan & Insight AI Bisnis — BerkahKarya" />
  <meta name="twitter:description" content="Artikel terbaru tentang AI, bisnis digital, dan strategi konten UMKM Indonesia." />
  <link rel="canonical" href="https://berkahkarya.org/blog.html" />
  <link rel="alternate" hreflang="id" href="https://berkahkarya.org/blog.html" />
  <link rel="alternate" hreflang="en" href="https://berkahkarya.org/blog.html?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://berkahkarya.org/blog.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
    /* Blog index styles */
    .blog-hero {{ background: var(--bg-white); border-bottom: 1px solid var(--border); padding: calc(64px + 4rem) 1.5rem 4rem; text-align: center; }}
    .blog-hero-inner {{ max-width: 680px; margin: 0 auto; }}
    .blog-hero-tag {{ display: inline-flex; align-items: center; gap: 6px; background: var(--bg-muted); border: 1px solid var(--border); border-radius: 999px; padding: 5px 14px; margin-bottom: 1.25rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mustard); }}
    .blog-hero h1 {{ font-size: clamp(1.9rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; margin: 0 0 1rem; }}
    .blog-hero h1 em {{ font-style: normal; color: var(--mustard); }}
    .blog-hero-sub {{ font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin: 0; }}

    .blog-filters {{ padding: 1.5rem 1.5rem 0; max-width: var(--max-width); margin: 0 auto; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }}
    .filter-btn {{ background: var(--bg-muted); border: 1px solid var(--border); border-radius: 999px; padding: 6px 16px; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.18s; font-family: var(--font); }}
    .filter-btn.active, .filter-btn:hover {{ background: var(--mustard); color: #fff; border-color: var(--mustard); }}
    .filter-label {{ font-size: 0.78rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; margin-right: 4px; }}

    .blog-grid-section {{ padding: 2.5rem 1.5rem 5rem; max-width: var(--max-width); margin: 0 auto; }}
    .blog-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }}
    .blog-card {{ background: var(--bg-white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; transition: border-color 0.2s, box-shadow 0.2s; }}
    .blog-card:hover {{ border-color: var(--mustard); box-shadow: 0 6px 24px rgba(200,146,10,0.10); }}
    .blog-card-img-link {{ display: block; }}
    .blog-card-img {{ overflow: hidden; }}
    .blog-card-body {{ padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }}
    .blog-card-meta {{ display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 0.75rem; }}
    .blog-cat {{ background: var(--mustard-pale); color: var(--mustard-dark); border-radius: 999px; padding: 3px 10px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; }}
    .blog-date, .blog-read {{ font-size: 0.75rem; color: var(--text-light); }}
    .blog-card-title {{ font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.3; margin: 0 0 0.6rem; flex: 1; }}
    .blog-card-title a {{ color: var(--text); text-decoration: none; }}
    .blog-card-title a:hover {{ color: var(--mustard); }}
    .blog-card-excerpt {{ font-size: 0.83rem; color: var(--text-muted); line-height: 1.65; margin: 0 0 1rem; }}
    .blog-read-more {{ font-size: 0.82rem; font-weight: 700; color: var(--mustard); text-decoration: none; margin-top: auto; }}
    .blog-read-more:hover {{ color: var(--mustard-dark); }}

    .blog-cta {{ background: var(--bg-muted); border-top: 1px solid var(--border); padding: 4rem 1.5rem; text-align: center; }}
    .blog-cta-inner {{ max-width: 560px; margin: 0 auto; }}
    .blog-cta-inner h2 {{ font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900; letter-spacing: -0.03em; margin: 0 0 0.75rem; }}
    .blog-cta-inner p {{ color: var(--text-muted); margin: 0 0 1.5rem; font-size: 0.92rem; line-height: 1.65; }}

    @media (max-width: 900px) {{ .blog-grid {{ grid-template-columns: repeat(2, 1fr); }} }}
    @media (max-width: 580px) {{ .blog-grid {{ grid-template-columns: 1fr; }} .blog-hero {{ padding: calc(64px + 2.5rem) 1.25rem 2.5rem; }} }}
  </style>
  <script type="application/ld+json">{schema_org}</script>
  <script type="application/ld+json">{schema_blog}</script>
</head>
<body>

{nav_html_blog}

<!-- HERO -->
<section class="blog-hero">
  <div class="blog-hero-inner">
    <div class="blog-hero-tag">✍️ Blog BerkahKarya</div>
    <h1 data-i18n="blogTitle">Postingan & <em>Insight</em></h1>
    <p class="blog-hero-sub" data-i18n="blogSub">Artikel terbaru tentang AI, bisnis digital, strategi konten, dan pertumbuhan UMKM Indonesia.</p>
  </div>
</section>

<!-- FILTER -->
<div class="blog-filters">
  <span class="filter-label">Filter:</span>
  <button class="filter-btn active" data-cat="all" data-i18n="blogAllCategories">Semua</button>
  <button class="filter-btn" data-cat="AI & Bisnis">AI & Bisnis</button>
  <button class="filter-btn" data-cat="Social Media">Social Media</button>
  <button class="filter-btn" data-cat="Website & Digital">Website & Digital</button>
  <button class="filter-btn" data-cat="Tech & Tools">Tech & Tools</button>
  <button class="filter-btn" data-cat="Strategi Konten">Strategi Konten</button>
</div>

<!-- ARTICLE GRID -->
<div class="blog-grid-section">
  <div class="blog-grid" id="blogGrid" role="list">
{cards}  </div>
</div>

<!-- NEWSLETTER CTA -->
<section class="blog-cta">
  <div class="blog-cta-inner">
    <span style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--mustard);display:block;margin-bottom:0.5rem;">Tetap Update</span>
    <h2>Tidak Ingin Ketinggalan<br>Insight Terbaru?</h2>
    <p>Konsultasi langsung dengan tim kami untuk mendapatkan strategi AI dan digital yang dipersonalisasi untuk bisnis kamu.</p>
    <a href="https://wa.me/{WA}?text=Halo%20Berkah%20Karya%2C%20saya%20ingin%20update%20insight%20AI%20bisnis%20terbaru" class="btn-primary" target="_blank" rel="noopener">💬 Chat dengan Tim Kami</a>
  </div>
</section>

<footer class="bk-footer">
  <div class="bk-footer-inner">
    <div class="bk-footer-brand">
      <div class="bk-logo">Berkah<span>Karya</span></div>
      <p data-i18n="footerTagline">AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital dalam satu ekosistem.</p>
    </div>
    <div class="bk-footer-col"><h5 data-i18n="footerServices">Layanan</h5><ul>
      <li><a href="jasa-sosmed.html">Kelola Social Media</a></li>
      <li><a href="jasa-video-ai.html">Jasa Video AI</a></li>
      <li><a href="jasa-website.html">Jasa Website</a></li>
      <li><a href="jasa-foto-produk.html">Foto Produk AI</a></li>
      <li><a href="jasa-content-planner.html">Content Planner</a></li>
    </ul></div>
    <div class="bk-footer-col"><h5 data-i18n="footerPlatform">Platform</h5><ul>
      <li><a href="omniroute.html">Omniroute</a></li>
      <li><a href="tools.html">AI Tools</a></li>
      <li><a href="ai-agent-pro.html">AI Agent Pro</a></li>
      <li><a href="digital-product.html">Produk Digital</a></li>
    </ul></div>
    <div class="bk-footer-col"><h5 data-i18n="footerCompany">Perusahaan</h5><ul>
      <li><a href="about.html">Tentang Kami</a></li>
      <li><a href="contact.html">Kontak</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="legal/privacy-policy.html">Privasi</a></li>
    </ul></div>
  </div>
  <div class="bk-footer-bottom">
    <span>© 2025 BerkahKarya. <span data-i18n="footerRights">Semua hak dilindungi.</span></span>
    <span data-i18n="footerMadeWith">Dibuat dengan ❤️ + 🤖 AI di Indonesia</span>
  </div>
</footer>

<script>
// Blog category filter
document.querySelectorAll('.filter-btn').forEach(function(btn) {{
  btn.addEventListener('click', function() {{
    document.querySelectorAll('.filter-btn').forEach(function(b) {{ b.classList.remove('active'); }});
    btn.classList.add('active');
    var cat = btn.dataset.cat;
    document.querySelectorAll('.blog-card').forEach(function(card) {{
      var cardCat = card.querySelector('.blog-cat');
      if (!cardCat) return;
      if (cat === 'all' || cardCat.textContent.trim() === cat) {{
        card.style.display = '';
      }} else {{
        card.style.display = 'none';
      }}
    }});
  }});
}});
</script>
<script src="nav.js"></script>
</body>
</html>"""

(DIR / "blog.html").write_text(make_blog_html(), encoding="utf-8")
print("✅ blog.html")

# ─── 6. Create blog/ directory and articles ───────────────────────────────────

(DIR / "blog").mkdir(exist_ok=True)

def make_article_html(art, lang="id"):
    is_en = lang == "en"
    title = art["title_en"] if is_en else art["title_id"]
    excerpt = art["excerpt_en"] if is_en else art["excerpt_id"]
    slug_self = art["slug_en"] if is_en else art["slug"]
    slug_alt = art["slug"] if is_en else art["slug_en"]
    lang_code = "en" if is_en else "id"
    lang_alt = "id" if is_en else "en"
    cat = art["category_en"] if is_en else art["category"]
    back_text = "← Back to Blog" if is_en else "← Kembali ke Postingan"
    related_text = "Related Articles" if is_en else "Artikel Terkait"

    # Full article content (only for main article ai-di-bisnis)
    if "ai-di-bisnis" in art["slug"] or "ai-in-business" in art["slug"]:
        if is_en:
            article_body = """
        <p>Artificial Intelligence (AI) is no longer a technology reserved for large corporations with multi-million dollar IT budgets. Today, an UMKM in Surabaya can use the same AI tools used by Fortune 500 companies — at a fraction of the cost.</p>

        <h2>Why AI is Critical for Small Business in 2026</h2>
        <p>The data speaks clearly: businesses using AI in their operations report a <strong>40-60% increase in operational efficiency</strong> and up to <strong>3x growth in sales conversions</strong> within the first 6 months. The question is no longer "should I use AI?" but "which AI should I start with?"</p>

        <h3>1. Automate Social Media Content</h3>
        <p>The biggest pain point for most small business owners is consistency. Creating content every day is exhausting. Here's where AI steps in:</p>
        <ul>
          <li><strong>Text generation</strong>: Tools like ChatGPT or Claude can write 30 days of captions in 30 minutes</li>
          <li><strong>Visual creation</strong>: AI tools generate product photos, graphics, and thumbnails without a photographer</li>
          <li><strong>Video production</strong>: AI can create short-form videos (TikTok/Reels) with voiceover and subtitles automatically</li>
        </ul>

        <h3>2. AI Customer Service (24/7 Without Salary)</h3>
        <p>An AI chatbot can handle 80% of your most common customer questions automatically. This means:</p>
        <ul>
          <li>No more waiting for your team to come online to answer "what are your prices?"</li>
          <li>Response time under 2 seconds (humans average 4 hours)</li>
          <li>Handle hundreds of conversations simultaneously</li>
        </ul>

        <h3>3. AI for Smarter Marketing</h3>
        <p>AI can analyze which content converts best, when your audience is most active, and what messaging drives clicks. Instead of guessing, you're making data-driven decisions.</p>

        <h2>Where to Start: 3 Practical AI Tools</h2>
        <p>Don't get overwhelmed. Start with these three proven tools:</p>
        <ol>
          <li><strong>ChatGPT/Claude</strong> — For content writing, customer email templates, product descriptions</li>
          <li><strong>Canva AI</strong> — For visual content, social media graphics, presentation slides</li>
          <li><strong>BerkahKarya AI Tools</strong> — Integrated suite specifically designed for Indonesian SME needs</li>
        </ol>

        <h2>Implementation Timeline</h2>
        <p>Week 1: Set up AI content tools, generate first 30 days of content. Week 2: Deploy AI customer service. Week 3-4: Analyze results, optimize. Month 2 onward: Scale what works, eliminate what doesn't.</p>

        <h2>The Bottom Line</h2>
        <p>AI doesn't replace your business — it amplifies it. The businesses that will win in 2026 are those that leverage AI to do more with less, faster than their competitors.</p>
        <p>Ready to implement AI in your business? <a href="../contact.html" style="color:var(--mustard);font-weight:700;">Talk to our team</a> — we'll help you build the right AI stack for your specific needs.</p>
"""
        else:
            article_body = """
        <p>Kecerdasan Buatan (AI) bukan lagi teknologi yang hanya bisa diakses oleh perusahaan besar dengan anggaran IT miliaran rupiah. Hari ini, sebuah UMKM di Surabaya bisa menggunakan tools AI yang sama dengan yang dipakai perusahaan Fortune 500 — dengan biaya yang jauh lebih terjangkau.</p>

        <h2>Mengapa AI Sangat Penting untuk Bisnis Kecil di 2026</h2>
        <p>Data berbicara jelas: bisnis yang menggunakan AI dalam operasinya melaporkan <strong>peningkatan efisiensi operasional 40–60%</strong> dan hingga <strong>3x pertumbuhan konversi penjualan</strong> dalam 6 bulan pertama. Pertanyaannya bukan lagi "apakah saya perlu pakai AI?" tapi "AI mana yang harus saya mulai?"</p>

        <h3>1. Otomatisasi Konten Social Media</h3>
        <p>Pain point terbesar sebagian besar pemilik bisnis kecil adalah konsistensi. Membuat konten setiap hari itu melelahkan. Di sinilah AI berperan:</p>
        <ul>
          <li><strong>Pembuatan teks</strong>: Tools seperti ChatGPT atau Claude bisa menulis 30 hari caption dalam 30 menit</li>
          <li><strong>Pembuatan visual</strong>: Tools AI menghasilkan foto produk, grafis, dan thumbnail tanpa fotografer</li>
          <li><strong>Produksi video</strong>: AI bisa membuat video short-form (TikTok/Reels) dengan voiceover dan subtitle otomatis</li>
        </ul>

        <h3>2. Customer Service AI (24/7 Tanpa Gaji)</h3>
        <p>Sebuah chatbot AI bisa menangani 80% pertanyaan paling umum pelanggan Anda secara otomatis. Artinya:</p>
        <ul>
          <li>Tidak ada lagi menunggu tim Anda online untuk menjawab "berapa harganya?"</li>
          <li>Waktu respons di bawah 2 detik (manusia rata-rata 4 jam)</li>
          <li>Tangani ratusan percakapan secara bersamaan</li>
        </ul>

        <h3>3. AI untuk Pemasaran yang Lebih Cerdas</h3>
        <p>AI bisa menganalisis konten mana yang paling banyak convert, kapan audiens Anda paling aktif, dan pesan apa yang mendorong klik. Alih-alih menebak, Anda membuat keputusan berbasis data.</p>

        <h2>Mulai dari Mana: 3 Tools AI yang Terbukti</h2>
        <p>Jangan kewalahan. Mulai dengan tiga tools terbukti ini:</p>
        <ol>
          <li><strong>ChatGPT/Claude</strong> — Untuk penulisan konten, template email pelanggan, deskripsi produk</li>
          <li><strong>Canva AI</strong> — Untuk konten visual, grafis media sosial, slide presentasi</li>
          <li><strong>BerkahKarya AI Tools</strong> — Suite terintegrasi yang dirancang khusus untuk kebutuhan UMKM Indonesia</li>
        </ol>

        <h2>Timeline Implementasi</h2>
        <p>Minggu 1: Setup tools AI konten, generate 30 hari konten pertama. Minggu 2: Deploy customer service AI. Minggu 3–4: Analisis hasil, optimasi. Bulan 2 ke depan: Scale yang berhasil, hilangkan yang tidak.</p>

        <h2>Kesimpulan</h2>
        <p>AI tidak menggantikan bisnis Anda — AI memperkuatnya. Bisnis yang akan menang di 2026 adalah yang memanfaatkan AI untuk melakukan lebih banyak dengan lebih sedikit, lebih cepat dari kompetitor mereka.</p>
        <p>Siap mengimplementasikan AI di bisnis Anda? <a href="../contact.html" style="color:var(--mustard);font-weight:700;">Konsultasi dengan tim kami</a> — kami akan bantu Anda membangun AI stack yang tepat untuk kebutuhan spesifik Anda.</p>
"""
    else:
        # Generic article body for other articles
        article_body = f"""
        <p>{excerpt}</p>
        <h2>{'Coming Soon' if is_en else 'Segera Hadir'}</h2>
        <p>{'This article is being written. Check back soon for the full content.' if is_en else 'Artikel ini sedang dalam proses penulisan. Kunjungi kembali segera untuk konten lengkapnya.'}</p>
        <p><a href="{'../blog.html' if is_en else '../blog.html'}" style="color:var(--mustard);font-weight:700;">{back_text}</a></p>
"""

    # Schema.org Article
    schema_article = json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": excerpt,
        "datePublished": art["date"],
        "author": {"@type": "Organization", "name": art["author"], "url": "https://berkahkarya.org"},
        "publisher": {"@type": "Organization", "name": "BerkahKarya", "url": "https://berkahkarya.org",
                      "logo": {"@type": "ImageObject", "url": "https://berkahkarya.org/images/logo.png"}},
        "inLanguage": lang_code,
        "url": f"https://berkahkarya.org/{slug_self}",
        "image": f"https://berkahkarya.org/images/blog/{art['slug'].split('/')[-1].replace('.html', '.jpg')}"
    }, ensure_ascii=False, indent=2)

    nav_html_article = make_nav_html(
        wa_greeting="Halo Berkah Karya, saya ingin konsultasi",
        prefix="../"
    )

    return f"""<!DOCTYPE html>
<html lang="{lang_code}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — BerkahKarya</title>
  <meta name="description" content="{excerpt[:160]}" />
  <meta property="og:title" content="{title} — BerkahKarya" />
  <meta property="og:description" content="{excerpt[:160]}" />
  <meta property="og:image" content="https://berkahkarya.org/images/blog/ai-bisnis-og.jpg" />
  <meta property="og:url" content="https://berkahkarya.org/{slug_self}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="{'en_US' if is_en else 'id_ID'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{excerpt[:160]}" />
  <link rel="canonical" href="https://berkahkarya.org/{slug_self}" />
  <link rel="alternate" hreflang="{lang_code}" href="https://berkahkarya.org/{slug_self}" />
  <link rel="alternate" hreflang="{lang_alt}" href="https://berkahkarya.org/{slug_alt}" />
  <link rel="alternate" hreflang="x-default" href="https://berkahkarya.org/{art['slug']}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <style>
    .art-container {{ max-width: 760px; margin: 0 auto; padding: 0 1.5rem; }}
    .art-hero {{ background: var(--bg-muted); border-bottom: 1px solid var(--border); padding: calc(64px + 3.5rem) 1.5rem 3.5rem; }}
    .art-hero-inner {{ max-width: 760px; margin: 0 auto; }}
    .art-back {{ display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); text-decoration: none; margin-bottom: 1.5rem; }}
    .art-back:hover {{ color: var(--mustard); }}
    .art-meta {{ display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 1.25rem; }}
    .art-cat {{ background: var(--mustard-pale); color: var(--mustard-dark); border-radius: 999px; padding: 4px 12px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; }}
    .art-date, .art-author, .art-read {{ font-size: 0.78rem; color: var(--text-light); }}
    .art-hero h1 {{ font-size: clamp(1.7rem, 4vw, 2.6rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.15; margin: 0 0 1rem; }}
    .art-excerpt {{ font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin: 0; }}
    .art-hreflang {{ margin-top: 1.25rem; font-size: 0.8rem; color: var(--text-light); }}
    .art-hreflang a {{ color: var(--mustard); font-weight: 600; text-decoration: none; }}
    .art-hreflang a:hover {{ color: var(--mustard-dark); }}
    .art-body {{ padding: 3.5rem 1.5rem 5rem; }}
    .art-body-inner {{ max-width: 760px; margin: 0 auto; font-size: 1rem; line-height: 1.8; color: var(--text-muted); }}
    .art-body-inner h2 {{ font-size: 1.5rem; font-weight: 900; letter-spacing: -0.03em; color: var(--text); margin: 2.5rem 0 0.75rem; }}
    .art-body-inner h3 {{ font-size: 1.15rem; font-weight: 800; color: var(--text); margin: 2rem 0 0.5rem; }}
    .art-body-inner p {{ margin: 0 0 1.2rem; }}
    .art-body-inner ul, .art-body-inner ol {{ margin: 0 0 1.2rem 1.5rem; }}
    .art-body-inner li {{ margin-bottom: 0.4rem; }}
    .art-body-inner strong {{ color: var(--text); font-weight: 800; }}
    .art-share {{ background: var(--bg-muted); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; max-width: 760px; margin: 0 auto 3rem; }}
    .art-share h4 {{ font-size: 0.85rem; font-weight: 800; color: var(--text); margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; }}
    .art-share-btns {{ display: flex; flex-wrap: wrap; gap: 10px; }}
    .art-share-btn {{ display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; text-decoration: none; transition: opacity 0.18s; }}
    .art-share-btn:hover {{ opacity: 0.85; }}
    .share-wa {{ background: #25d366; color: #fff; }}
    .share-twitter {{ background: #1da1f2; color: #fff; }}
    .art-related {{ padding: 0 1.5rem 5rem; max-width: 760px; margin: 0 auto; }}
    .art-related h3 {{ font-size: 1rem; font-weight: 900; letter-spacing: -0.02em; color: var(--text); margin: 0 0 1.25rem; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--mustard); }}
    .art-related-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }}
    .art-related-card {{ background: var(--bg-white); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; text-decoration: none; transition: border-color 0.18s; }}
    .art-related-card:hover {{ border-color: var(--mustard); }}
    .art-related-card-cat {{ font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mustard); display: block; margin-bottom: 0.35rem; }}
    .art-related-card-title {{ font-size: 0.88rem; font-weight: 700; color: var(--text); line-height: 1.4; }}
    @media (max-width: 580px) {{ .art-related-grid {{ grid-template-columns: 1fr; }} }}
  </style>
  <script type="application/ld+json">{schema_article}</script>
</head>
<body>

{nav_html_article}

<!-- ARTICLE HERO -->
<section class="art-hero">
  <div class="art-hero-inner">
    <a href="../blog.html" class="art-back" data-i18n="backToBlog">{back_text}</a>
    <div class="art-meta">
      <span class="art-cat">{cat}</span>
      <span class="art-date">{art['date']}</span>
      <span class="art-author">· {art['author']}</span>
      <span class="art-read">· {art['read_time']}</span>
    </div>
    <h1>{title}</h1>
    <p class="art-excerpt">{excerpt}</p>
    <p class="art-hreflang">
      {'🌐 Baca dalam:' if not is_en else '🌐 Read in:'}
      <a href="../{slug_alt}">{'English' if not is_en else 'Bahasa Indonesia'}</a>
    </p>
  </div>
</section>

<!-- ARTICLE BODY -->
<article class="art-body" itemscope itemtype="https://schema.org/Article">
  <meta itemprop="headline" content="{title}" />
  <meta itemprop="datePublished" content="{art['date']}" />
  <meta itemprop="author" content="{art['author']}" />
  <div class="art-body-inner">
{article_body}
  </div>
</article>

<!-- SHARE -->
<div class="art-share art-container">
  <h4>{'Share this article' if is_en else 'Bagikan artikel ini'}</h4>
  <div class="art-share-btns">
    <a href="https://wa.me/?text={title.replace(' ', '%20')}%20https%3A%2F%2Fberkahkarya.org%2F{slug_self.replace('/', '%2F')}" class="art-share-btn share-wa" target="_blank" rel="noopener">
      📲 WhatsApp
    </a>
    <a href="https://twitter.com/intent/tweet?text={title.replace(' ', '%20')}&url=https%3A%2F%2Fberkahkarya.org%2F{slug_self.replace('/', '%2F')}" class="art-share-btn share-twitter" target="_blank" rel="noopener">
      🐦 Twitter/X
    </a>
  </div>
</div>

<!-- RELATED -->
<div class="art-related">
  <h3 data-i18n="relatedArticles">{related_text}</h3>
  <div class="art-related-grid">
    <a href="../blog.html" class="art-related-card">
      <span class="art-related-card-cat">Blog</span>
      <span class="art-related-card-title">{'Browse all articles on BerkahKarya Blog →' if is_en else 'Lihat semua artikel di Blog BerkahKarya →'}</span>
    </a>
    <a href="../contact.html" class="art-related-card">
      <span class="art-related-card-cat">{'Consultation' if is_en else 'Konsultasi'}</span>
      <span class="art-related-card-title">{'Need help implementing AI? Talk to our team →' if is_en else 'Butuh bantuan implementasi AI? Konsultasi gratis dengan tim kami →'}</span>
    </a>
  </div>
</div>

<footer class="bk-footer">
  <div class="bk-footer-inner">
    <div class="bk-footer-brand">
      <div class="bk-logo">Berkah<span>Karya</span></div>
      <p data-i18n="footerTagline">AI Ecosystem untuk bisnis Indonesia.</p>
    </div>
    <div class="bk-footer-col"><h5 data-i18n="footerServices">Layanan</h5><ul>
      <li><a href="../jasa-sosmed.html">Kelola Social Media</a></li>
      <li><a href="../jasa-video-ai.html">Jasa Video AI</a></li>
      <li><a href="../jasa-website.html">Jasa Website</a></li>
    </ul></div>
    <div class="bk-footer-col"><h5 data-i18n="footerCompany">Perusahaan</h5><ul>
      <li><a href="../about.html">Tentang Kami</a></li>
      <li><a href="../contact.html">Kontak</a></li>
      <li><a href="../blog.html">Blog</a></li>
    </ul></div>
  </div>
  <div class="bk-footer-bottom">
    <span>© 2025 BerkahKarya.</span>
    <span data-i18n="footerMadeWith">Dibuat dengan ❤️ + 🤖 AI di Indonesia</span>
  </div>
</footer>

<script src="../nav.js"></script>
</body>
</html>"""


# Generate articles
for art in BLOG_ARTICLES:
    # ID version
    slug_path = DIR / art["slug"]
    slug_path.parent.mkdir(exist_ok=True)
    slug_path.write_text(make_article_html(art, lang="id"), encoding="utf-8")

    # EN version
    slug_en_path = DIR / art["slug_en"]
    slug_en_path.write_text(make_article_html(art, lang="en"), encoding="utf-8")

print(f"✅ blog/ — {len(BLOG_ARTICLES)*2} article pages (ID + EN each)")

# ─── 7. sitemap.xml ───────────────────────────────────────────────────────────

all_html = sorted(DIR.glob("*.html"))
blog_html = sorted((DIR / "blog").glob("*.html"))
base = "https://berkahkarya.org"

sitemap_urls = []
for f in all_html:
    sitemap_urls.append(f"  <url><loc>{base}/{f.name}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>")
for f in blog_html:
    sitemap_urls.append(f"  <url><loc>{base}/blog/{f.name}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>")

sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
sitemap_content += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
sitemap_content += "\n".join(sitemap_urls)
sitemap_content += "\n</urlset>\n"

(DIR / "sitemap.xml").write_text(sitemap_content, encoding="utf-8")
print(f"✅ sitemap.xml — {len(sitemap_urls)} URLs")

# ─── 8. robots.txt ────────────────────────────────────────────────────────────

robots = f"""User-agent: *
Allow: /
Disallow: /legal/
Disallow: /generate_*.py

Sitemap: {base}/sitemap.xml
"""
(DIR / "robots.txt").write_text(robots, encoding="utf-8")
print("✅ robots.txt")

# ─── 9. SEO audit: check meta descriptions on all pages ──────────────────────

print("\n=== SEO Audit: meta description check ===")
missing_meta = []
for f in all_html:
    content = f.read_text(encoding="utf-8")
    if '<meta name="description"' not in content:
        missing_meta.append(f.name)
        print(f"  ⚠️ No meta description: {f.name}")

if not missing_meta:
    print("  ✅ All pages have meta descriptions")

print("\n=== Done ===")
print(f"Summary:")
print(f"  nav.js created")
print(f"  lang/id.js + lang/en.js created")
print(f"  blog.html created (6 articles in grid)")
print(f"  blog/ directory: {len(BLOG_ARTICLES)*2} article pages")
print(f"  sitemap.xml: {len(sitemap_urls)} URLs")
print(f"  robots.txt updated")
print(f"  {len(updated)} HTML pages: nav updated with Blog menu + data-i18n + nav.js injection")
