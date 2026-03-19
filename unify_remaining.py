#!/usr/bin/env python3
"""
Unify remaining pages: omniroute.html, about.html, tools.html, digital-product.html
"""
import re, os

BK_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Standard nav & footer ─────────────────────────────────────────────────────

def make_nav(cta_url="contact.html", cta_label="Konsultasi Gratis →", cta_external=False):
    target = ' target="_blank"' if cta_external else ""
    return f"""<nav class="bk-nav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="omniroute.html">Omniroute</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="{cta_url}" class="bk-nav-cta"{target}>{cta_label}</a>
    <button class="bk-nav-mobile" aria-label="Menu">☰</button>
  </div>
</nav>"""

FOOTER = """<footer class="bk-footer">
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

# ── Omniroute CSS override ─────────────────────────────────────────────────────
OMNI_CSS_OVERRIDE = """
/* ===== OMNIROUTE: Light Mode Override ===== */
/* Override dark theme to match design system cream/mustard */

body {
  background: var(--bg) !important;
  color: var(--text) !important;
  font-family: var(--font) !important;
}

/* Remap dark vars → light equivalents */
:root {
  --gold: var(--mustard);
  --gold-light: var(--mustard-light);
  --gold-border: rgba(200, 146, 10, 0.25);
  --bg-2: var(--bg-muted);
  --bg-3: var(--bg-white);
  --bg-4: #f5f3ef;
  --text-1: var(--text);
  --text-2: var(--text);
  --text-3: var(--text-muted);
  --text-4: var(--text-muted);
  --text-5: var(--text-light);
  --line: var(--border);
  --line-2: var(--border);
  --r: var(--radius-sm);
}

/* All section backgrounds */
.section, .omni-hero { background: var(--bg) !important; }
.providers-section, .cta-section { background: var(--bg-muted) !important; border-color: var(--border) !important; }

/* Section headers */
.sec-h2, h1, h2, h3, h4 {
  font-family: var(--font) !important;
  color: var(--text) !important;
}
.sec-h2 em { color: var(--mustard) !important; }

/* How-steps grid */
.how-grid {
  border-color: var(--border) !important;
  background: var(--bg-white) !important;
}
.how-step {
  background: var(--bg-white) !important;
  border-right-color: var(--border) !important;
}
.how-step:hover { background: var(--bg-muted) !important; }
.how-num { color: rgba(200, 146, 10, 0.18) !important; font-family: var(--font) !important; }
.how-title { color: var(--text) !important; }
.how-desc { color: var(--text-muted) !important; }

/* Features list */
.feat-item { border-color: var(--border) !important; }
.feat-icon-box { background: var(--bg-muted) !important; border-color: var(--border) !important; }
.feat-icon-box:hover { background: var(--mustard-pale) !important; border-color: var(--mustard) !important; }
.feat-title { color: var(--text) !important; }
.feat-desc { color: var(--text-muted) !important; }

/* Feature visual/screen mock */
.feat-screen { 
  background: #111 !important; 
  border-color: #333 !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15) !important;
}
.feat-screen-bar { background: #1a1a1a !important; border-color: #333 !important; }
.screen-section-title { color: var(--mustard) !important; }
.mock-provider-row, .mock-combo, .mock-key-row { background: #1d1d1d !important; border-color: #333 !important; }
.mock-provider-name { color: #ccc !important; }
.mock-provider-model, .mock-provider-lat, .mock-key-val, .mock-combo-models { color: #999 !important; }
.mock-combo-name { color: #eee !important; }
.mock-model-chip { background: #2a2a2a !important; border-color: #444 !important; color: #999 !important; }

/* Provider cards */
.providers-grid { background: transparent !important; border-color: var(--border) !important; }
.provider-card { 
  background: var(--bg-white) !important; 
  border-color: var(--border) !important; 
}
.provider-card:hover { background: var(--bg-muted) !important; }
.provider-name { color: var(--text) !important; }
.provider-models, .status-text { color: var(--text-muted) !important; }

/* Use case cards */
.cases-grid { background: var(--border) !important; }
.case-card { background: var(--bg-white) !important; }
.case-card:hover { background: var(--bg-muted) !important; }
.case-num { font-family: var(--font) !important; color: rgba(200,146,10,0.18) !important; }
.case-title { color: var(--text) !important; }
.case-desc { color: var(--text-muted) !important; }

/* Terminal hero — keep dark (intentional code aesthetic) */
.hero-terminal, .terminal-bar, .terminal-body { /* stays dark via inline styles */ }

/* Hero section */
.omni-hero { padding: calc(64px + 4rem) 0 4rem; background: var(--bg) !important; }
.hero-eyebrow { color: var(--text-muted) !important; background: var(--bg-muted) !important; border-color: var(--border) !important; }
.hero-eyebrow-dot { background: var(--mustard) !important; }
.hero-h1 { color: var(--text) !important; }
.hero-h1 em { color: var(--mustard) !important; }
.hero-p { color: var(--text-muted) !important; }

/* Stats */
.hero-stat-num { color: var(--text) !important; }
.hero-stat-lbl { color: var(--text-muted) !important; }
.hero-stats { border-top-color: var(--border) !important; padding-top: 2rem; margin-top: 2rem; }

/* Buttons */
.btn-gold { background: var(--mustard) !important; color: #fff !important; border-color: var(--mustard) !important; }
.btn-gold:hover { background: var(--mustard-dark) !important; }
.btn-ghost { background: transparent !important; color: var(--text-muted) !important; border-color: var(--border) !important; }
.btn-ghost:hover { color: var(--text) !important; border-color: var(--text) !important; }
.btn-outline { background: transparent !important; color: var(--mustard) !important; border-color: var(--mustard) !important; }

/* CTA section */
.cta-section::before { background: radial-gradient(ellipse, rgba(200,146,10,0.06) 0%, transparent 70%) !important; }
.cta-h2 { color: var(--text) !important; font-family: var(--font) !important; }
.cta-h2 em { color: var(--mustard) !important; }
.cta-p { color: var(--text-muted) !important; }
.cta-eyebrow { color: var(--mustard) !important; }
.cta-note { color: var(--text-light) !important; }

/* Divider */
.divider { border-color: var(--border) !important; background: var(--border) !important; }

/* Mobile menu — override old dark mobile */
.mobile-menu { 
  background: rgba(250,248,244,0.98) !important; 
  border-bottom-color: var(--border) !important;
}
.mobile-link { color: var(--text-muted) !important; border-bottom-color: var(--border) !important; }
.mobile-link:hover { color: var(--mustard) !important; }
.mobile-cta { border-top-color: var(--border) !important; }

/* Hide old hamburger — bk-nav handles mobile */
#hamburger { display: none !important; }
.nav-links-old { display: none !important; }

/* Container align */
.container { max-width: var(--max-width) !important; }
section.section { padding: 5rem 0 !important; }
"""

# ── About CSS override ─────────────────────────────────────────────────────────
ABOUT_CSS_OVERRIDE = """
/* ===== ABOUT: Align to design system ===== */
body { font-family: var(--font) !important; background: var(--bg) !important; color: var(--text) !important; }

:root {
  --cream: var(--bg);
  --warm-white: var(--bg-white);
  --mustard: var(--mustard);
  --mustard-light: var(--mustard-light);
  --mustard-dark: var(--mustard-dark);
  --charcoal: var(--text);
  --gray-warm: var(--text-muted);
  --gray-light: var(--bg-muted);
  --border: var(--border);
}

/* Align hero */
.hero { background: var(--bg-white) !important; border-color: var(--border) !important; padding: calc(64px + 4rem) 1.5rem 4rem !important; }
.hero-tag { font-family: var(--font) !important; font-weight: 700 !important; }
.hero h1 { font-family: var(--font) !important; font-weight: 900 !important; letter-spacing: -0.04em !important; }
.hero p { font-family: var(--font) !important; }

/* Section base */
.section { max-width: var(--max-width) !important; padding: 5rem 1.5rem !important; }
.section-label { color: var(--mustard) !important; font-family: var(--font) !important; }
.section-title { font-family: var(--font) !important; font-weight: 900 !important; letter-spacing: -0.03em !important; }
.section-subtitle { color: var(--text-muted) !important; }

/* Values dark section — keep dark, just align spacing */
.values-bg { background: #1a1a18 !important; }
.values-inner { max-width: var(--max-width) !important; padding: 5rem 1.5rem !important; }
.value-card { border-radius: var(--radius) !important; }
.value-title { font-family: var(--font) !important; font-weight: 800 !important; }
.value-desc { font-family: var(--font) !important; }

/* Edge items */
.edge-item { border-radius: var(--radius) !important; background: var(--bg-white) !important; border-color: var(--border) !important; }
.edge-item:hover { border-color: var(--mustard) !important; box-shadow: 0 4px 20px var(--shadow-md) !important; }
.edge-icon { background: var(--bg-muted) !important; border-radius: var(--radius-sm) !important; }
.edge-content h4 { font-family: var(--font) !important; font-weight: 800 !important; }

/* Category section */
.cat-bg { background: var(--bg-muted) !important; }
.cat-inner { max-width: var(--max-width) !important; padding: 5rem 1.5rem !important; }
.cat-card { background: var(--bg-white) !important; border-radius: var(--radius) !important; border-color: var(--border) !important; }
.cat-title { font-family: var(--font) !important; font-weight: 800 !important; }
.cat-tag { background: var(--mustard) !important; border-radius: var(--radius-full) !important; }

/* CTA */
.cta-section { background: var(--bg-white) !important; border-top-color: var(--border) !important; padding: 5rem 1.5rem !important; }
.cta-section h2 { font-family: var(--font) !important; font-weight: 900 !important; letter-spacing: -0.03em !important; }
.cta-section p { color: var(--text-muted) !important; }
.btn-primary { background: var(--mustard) !important; border-radius: var(--radius) !important; font-family: var(--font) !important; font-weight: 800 !important; }
.btn-primary:hover { background: var(--mustard-dark) !important; }
.btn-secondary { border-radius: var(--radius) !important; font-family: var(--font) !important; color: var(--text) !important; border-color: var(--border) !important; }
.btn-secondary:hover { border-color: var(--mustard) !important; color: var(--mustard) !important; }

/* Stats */
.stat-num { color: var(--mustard) !important; font-family: var(--font) !important; font-weight: 900 !important; }
.stat-desc { color: var(--text-muted) !important; font-family: var(--font) !important; }

/* Hide old nav mobile btn & FontAwesome dependency */
.nav-mobile-btn { display: none; }
"""

# ── Tools & Digital Product minor CSS ─────────────────────────────────────────
TOOLS_CSS_MINOR = """
/* ===== TOOLS PAGE: Minor polish ===== */
body { font-family: var(--font) !important; }
h1, h2, h3, h4 { font-family: var(--font) !important; letter-spacing: -0.02em; }
.bk-card { border-radius: var(--radius) !important; }
"""

DP_CSS_MINOR = """
/* ===== DIGITAL PRODUCT: Minor polish ===== */
body { font-family: var(--font) !important; }
h1, h2, h3, h4 { font-family: var(--font) !important; letter-spacing: -0.02em; }
.bk-card { border-radius: var(--radius) !important; }
.bk-card-price-amount { color: var(--mustard) !important; font-weight: 900 !important; }
"""

def inject_css(html, css):
    """Inject CSS before closing </style>"""
    return html.replace('</style>', css + '\n</style>', 1)

def swap_nav(html, nav_html):
    return re.sub(r'<nav[\s\S]*?</nav>', nav_html, html, count=1)

def swap_footer(html, footer_html):
    return re.sub(r'<footer[\s\S]*?</footer>', footer_html, html, count=1)

def remove_font_links(html):
    html = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*Cormorant[^"]*"[^>]*>', '', html)
    html = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*Outfit[^"]*"[^>]*>', '', html)
    html = re.sub(r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax_libs/font-awesome[^"]*"[^>]*>', '', html)
    return html

def process_file(fname, css_override, nav_html, footer_html, font_cleanup=True):
    path = os.path.join(BK_DIR, fname)
    if not os.path.exists(path):
        print(f"❌ Not found: {fname}")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    if font_cleanup:
        html = remove_font_links(html)

    if css_override:
        html = inject_css(html, css_override)

    if nav_html:
        html = swap_nav(html, nav_html)

    if footer_html:
        html = swap_footer(html, footer_html)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"✅ Updated: {fname}")
    return True

if __name__ == "__main__":
    os.chdir(BK_DIR)

    # omniroute.html — dark → cream + new nav/footer
    process_file(
        "omniroute.html",
        css_override=OMNI_CSS_OVERRIDE,
        nav_html=make_nav(
            cta_url="https://wa.me/6285732740006?text=Halo%20Berkah%20Karya%2C%20saya%20tertarik%20dengan%20Omniroute.%20Bisa%20konsultasi%3F",
            cta_label="Coba Omniroute →",
            cta_external=True
        ),
        footer_html=FOOTER,
    )

    # about.html — cream but old nav/footer + align vars
    process_file(
        "about.html",
        css_override=ABOUT_CSS_OVERRIDE,
        nav_html=make_nav(
            cta_url="https://wa.me/6285732740006?text=Halo%20Berkah%20Karya%2C%20saya%20ingin%20konsultasi%20layanan",
            cta_label="Konsultasi Gratis →",
            cta_external=True
        ),
        footer_html=FOOTER,
    )

    # tools.html — already bk-nav, just polish CSS
    process_file(
        "tools.html",
        css_override=TOOLS_CSS_MINOR,
        nav_html=None,   # already bk-nav
        footer_html=None, # already bk-footer
        font_cleanup=True,
    )

    # digital-product.html — already bk-nav, just polish CSS
    process_file(
        "digital-product.html",
        css_override=DP_CSS_MINOR,
        nav_html=None,
        footer_html=None,
        font_cleanup=True,
    )

    print("\n✅ All done.")
