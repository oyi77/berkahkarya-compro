#!/usr/bin/env python3
"""
Unify all jasa-*.html pages to match design system.
Swaps: navbar, footer, CSS vars, fonts, button classes.
Keeps: all content, copy, section structure.
"""
import re, os

WA_BASE = "https://wa.me/6285732740006?text="

PAGES = {
    "jasa-video-ai.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Jasa%20Video%20AI.%20Bisa%20konsultasi%3F",
        "title": "Jasa Video AI",
    },
    "jasa-sosmed.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Kelola%20Sosial%20Media.%20Bisa%20konsultasi%3F",
        "title": "Kelola Sosial Media",
    },
    "jasa-foto-produk.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Jasa%20Foto%20Produk%20AI.%20Bisa%20konsultasi%3F",
        "title": "Foto Produk AI",
    },
    "jasa-content-planner.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Content%20Planner%20AI.%20Bisa%20konsultasi%3F",
        "title": "Content Planner AI",
    },
    "jasa-openclaw.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Setup%20OpenClaw%20AI.%20Bisa%20konsultasi%3F",
        "title": "Setup OpenClaw AI",
    },
    "jasa-website.html": {
        "wa_text": "Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Jasa%20Website.%20Bisa%20konsultasi%3F",
        "title": "Jasa Website",
    },
}

NAV_TEMPLATE = """<nav class="bk-nav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="omniroute.html">Omniroute</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="{wa_link}" class="bk-nav-cta" target="_blank">WhatsApp →</a>
    <button class="bk-nav-mobile" aria-label="Menu">☰</button>
  </div>
</nav>"""

FOOTER_TEMPLATE = """<footer class="bk-footer">
  <div class="bk-footer-inner">
    <div class="bk-footer-brand">
      <div class="bk-logo">Berkah<span>Karya</span></div>
      <p>AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan SaaS platform dalam satu ekosistem.</p>
    </div>
    <div class="bk-footer-col">
      <h5>Layanan</h5>
      <ul>
        <li><a href="jasa-sosmed.html">Kelola Sosmed</a></li>
        <li><a href="jasa-video-ai.html">Jasa Video AI</a></li>
        <li><a href="jasa-website.html">Jasa Website</a></li>
        <li><a href="jasa-foto-produk.html">Foto Produk AI</a></li>
        <li><a href="jasa-content-planner.html">Content Planner</a></li>
      </ul>
    </div>
    <div class="bk-footer-col">
      <h5>Platform</h5>
      <ul>
        <li><a href="omniroute.html">Omniroute</a></li>
        <li><a href="tools.html">AI Tools</a></li>
        <li><a href="ai-agent-pro.html">AI Agent Pro</a></li>
        <li><a href="ai-video-studio.html">Video Studio</a></li>
        <li><a href="digital-product.html">Produk Digital</a></li>
      </ul>
    </div>
    <div class="bk-footer-col">
      <h5>Perusahaan</h5>
      <ul>
        <li><a href="about.html">Tentang Kami</a></li>
        <li><a href="contact.html">Kontak</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="pricing.html">Harga</a></li>
        <li><a href="legal/privacy-policy.html">Privasi</a></li>
      </ul>
    </div>
  </div>
  <div class="bk-footer-bottom">
    <span>© 2025 BerkahKarya. All rights reserved.</span>
    <span>Made with ❤️ + 🤖 AI in Indonesia</span>
  </div>
</footer>"""

# CSS to inject in <style> block — replaces old vars, sets up override for page-specific styles
CSS_OVERRIDES = """
/* ===== DESIGN SYSTEM OVERRIDES ===== */
/* Font override — use Plus Jakarta Sans from style.css */
body { font-family: var(--font) !important; background: var(--bg) !important; color: var(--text) !important; }

/* Remap old vars to new design system */
:root {
  --bg-2: var(--bg-muted);
  --bg-3: var(--bg-muted);
  --text-1: var(--text);
  --text-2: var(--text);
  --text-3: var(--text-muted);
  --text-4: var(--text-light);
  --mustard-bg: var(--mustard-pale);
  --r: var(--radius-sm);
}

/* Section title — replace Cormorant with system font */
.section-title, .section-title *, h1, h2, h3, h4 {
  font-family: var(--font) !important;
}
h1 { font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.05; }
h2.section-title { font-weight: 900; letter-spacing: -0.03em; }

/* Section padding */
section { padding: 5rem 0; }
.hero { padding: calc(64px + 4rem) 0 4rem; }
.container { max-width: var(--max-width); }

/* Section label */
.section-label {
  color: var(--mustard); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
}

/* Cards update */
.card {
  background: var(--bg-white); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.75rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card:hover { border-color: var(--mustard); box-shadow: 0 4px 20px var(--shadow-md); }
.card h4 { font-family: var(--font) !important; font-weight: 800; letter-spacing: -0.02em; }

/* Benefit cards */
.benefit-card {
  background: var(--bg-muted); border-radius: var(--radius); padding: 1.75rem;
  border: 1px solid var(--border);
}
.benefit-card h4 { font-family: var(--font) !important; font-weight: 800; }

/* Use case items */
.usecase-item {
  background: var(--bg-white); border-left: 3px solid var(--mustard);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  border-top: 1px solid var(--border); border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem;
}
.usecase-item h4 { font-family: var(--font) !important; font-weight: 700; }

/* Overview boxes */
.overview-box h3 { font-family: var(--font) !important; font-weight: 800; letter-spacing: -0.02em; }

/* Step numbers */
.step-num {
  background: var(--bg-muted) !important;
  border-color: var(--mustard) !important;
  font-family: var(--font) !important;
  font-weight: 900 !important;
  color: var(--mustard) !important;
}
.step h4 { font-family: var(--font) !important; font-weight: 700; }

/* Hero tag */
.hero-tag {
  background: var(--mustard-pale) !important;
  color: var(--mustard-dark) !important;
  border-radius: var(--radius-full);
  font-weight: 700; letter-spacing: 0.1em;
}

/* CTA closing section */
.cta-closing h2 { font-family: var(--font) !important; font-weight: 900; letter-spacing: -0.03em; }

/* Mobile nav override — hide old nav elements */
#hamburger, .mobile-menu { display: none !important; }
"""

def transform_file(fname, wa_text, title):
    path = fname
    if not os.path.exists(path):
        print(f"❌ Not found: {path}")
        return

    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    wa_link = WA_BASE + wa_text

    # 1. Replace Google Font link (Cormorant/Outfit) — remove, style.css already has PJS
    html = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Cormorant[^"]*"[^>]*>',
        '',
        html
    )
    html = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Outfit[^"]*"[^>]*>',
        '',
        html
    )
    # Also remove combined font links with Cormorant in them
    html = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*Cormorant[^"]*"[^>]*>',
        '',
        html
    )

    # 2. Inject CSS overrides at end of <style> block (before </style>)
    html = html.replace('</style>', CSS_OVERRIDES + '\n</style>', 1)

    # 3. Replace old <nav>...</nav> block with standard bk-nav
    nav_html = NAV_TEMPLATE.format(wa_link=wa_link)
    # Match nav from <nav> to </nav> (first occurrence only)
    html = re.sub(r'<nav[\s\S]*?</nav>', nav_html, html, count=1)

    # 4. Replace old <footer>...</footer> with standard bk-footer
    html = re.sub(r'<footer[\s\S]*?</footer>', FOOTER_TEMPLATE, html, count=1)

    # 5. Button class replacements
    # btn btn-mustard btn-lg → btn-primary btn-lg
    html = re.sub(r'class="btn btn-mustard btn-lg"', 'class="btn-primary btn-lg"', html)
    html = re.sub(r'class="btn btn-mustard btn-sm[^"]*"', 'class="btn-primary btn-sm"', html)
    html = re.sub(r'class="btn btn-mustard"', 'class="btn-primary"', html)
    # btn btn-outline btn-lg → btn-secondary btn-lg
    html = re.sub(r'class="btn btn-outline btn-lg"', 'class="btn-secondary btn-lg"', html)
    html = re.sub(r'class="btn btn-outline btn-sm"', 'class="btn-secondary btn-sm"', html)
    html = re.sub(r'class="btn btn-outline"', 'class="btn-secondary"', html)

    # 6. Add body class page-jasa if missing
    if 'class="page-jasa"' not in html:
        html = html.replace('<body>', '<body class="page-jasa">')
        html = html.replace('<body class="">', '<body class="page-jasa">')

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"✅ Updated: {fname}")


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    for fname, meta in PAGES.items():
        transform_file(fname, meta["wa_text"], meta["title"])
    print("\nDone! All jasa pages updated.")
