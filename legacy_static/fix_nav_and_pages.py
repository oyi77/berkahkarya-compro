#!/usr/bin/env python3
"""
Fix 1: Inject bk-nav into pages that still have old nav
Fix 2: Inject bk-footer into pages that still have old footer
Fix 3: Inject CSS override for portfolio/services (dark → cream)
"""
import re, os

DIR = os.path.dirname(os.path.abspath(__file__))

BK_NAV = """<nav class="bk-nav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="omniroute.html">Omniroute</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="contact.html" class="bk-nav-cta">Konsultasi Gratis →</a>
    <button class="bk-nav-mobile" aria-label="Menu">☰</button>
  </div>
</nav>"""

BK_NAV_WA = """<nav class="bk-nav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="omniroute.html">Omniroute</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="https://wa.me/6285732740006?text=Halo%20Berkah%20Karya%2C%20saya%20ingin%20konsultasi%20layanan" class="bk-nav-cta" target="_blank" rel="noopener">Konsultasi Gratis →</a>
    <button class="bk-nav-mobile" aria-label="Menu">☰</button>
  </div>
</nav>"""

BK_FOOTER = """<footer class="bk-footer">
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

# ── CSS overrides ───────────────────────────────────────────────────────────

PORTFOLIO_CSS = """
/* === PORTFOLIO: Dark → Cream override === */
body { background: var(--bg) !important; color: var(--text) !important; font-family: var(--font) !important; }
:root {
  --gold: var(--mustard) !important;
  --bg-2: var(--bg-muted) !important;
  --bg-3: var(--bg-white) !important;
  --text-1: var(--text) !important;
  --text-2: var(--text-muted) !important;
  --text-3: var(--text-muted) !important;
  --line: var(--border) !important;
}
.section { background: var(--bg) !important; }
.section.page-hero { background: var(--bg-white) !important; border-bottom: 1px solid var(--border) !important; padding: calc(64px + 4rem) 1.5rem 4rem !important; }
.section.page-hero h1 { font-family: var(--font) !important; font-weight: 900 !important; letter-spacing: -0.04em !important; color: var(--text) !important; }
.section.page-hero h1 em { color: var(--mustard) !important; }
.section.page-hero p { color: var(--text-muted) !important; }
h1, h2, h3, h4 { font-family: var(--font) !important; color: var(--text) !important; }
h2 em { color: var(--mustard) !important; font-style: normal !important; }
.proj-card, .case-card, .card { background: var(--bg-white) !important; border-color: var(--border) !important; }
.proj-card:hover, .case-card:hover { border-color: var(--mustard) !important; box-shadow: 0 4px 24px rgba(200,146,10,0.10) !important; }
.proj-tag, .tag { background: var(--bg-muted) !important; color: var(--text-muted) !important; border-color: var(--border) !important; }
.proj-result, .result-num { color: var(--mustard) !important; }
.sec-label, .label { color: var(--mustard) !important; }
p { color: var(--text-muted) !important; }
p strong { color: var(--text) !important; }
.btn { border-radius: var(--radius) !important; font-family: var(--font) !important; }
.btn-gold, .btn-primary { background: var(--mustard) !important; color: #fff !important; border-color: var(--mustard) !important; }
.btn-ghost, .btn-outline, .btn-secondary { background: transparent !important; border-color: var(--border) !important; color: var(--text-muted) !important; }
.btn-ghost:hover, .btn-secondary:hover { border-color: var(--mustard) !important; color: var(--mustard) !important; }
[style*="background:var(--bg-2)"], [style*="background: var(--bg-2)"] { background: var(--bg-muted) !important; }
#nav, nav#nav { display: none !important; }
footer:not(.bk-footer) { display: none !important; }
"""

SERVICES_CSS = """
/* === SERVICES: Dark → Cream override === */
body { background: var(--bg) !important; color: var(--text) !important; font-family: var(--font) !important; }
:root {
  --bg: #faf8f4 !important;
  --bg-2: #f5f3ef !important;
  --bg-3: #ffffff !important;
  --gold: var(--mustard) !important;
  --text-1: #1a1a18 !important;
  --text-2: #444441 !important;
  --text-3: #7a7870 !important;
  --line: #e8e4da !important;
}
.section, .prod-section { background: var(--bg) !important; border-color: var(--border) !important; }
.section.page-hero { background: var(--bg-white) !important; border-bottom: 1px solid var(--border) !important; padding: calc(64px + 4rem) 1.5rem 4rem !important; }
.section.page-hero h1 { font-family: var(--font) !important; font-weight: 900 !important; letter-spacing: -0.04em !important; color: var(--text) !important; }
.section.page-hero h1 em { color: var(--mustard) !important; }
.section.page-hero p { color: var(--text-muted) !important; }
h1, h2, h3, h4 { font-family: var(--font) !important; color: var(--text) !important; letter-spacing: -0.02em; }
h2 em { color: var(--mustard) !important; font-style: normal !important; }
p, li { color: var(--text-muted) !important; }
p strong, li strong { color: var(--text) !important; }
.feat-item { background: var(--bg-white) !important; border-color: var(--border) !important; border-radius: var(--radius) !important; }
.feat-item:hover { border-color: var(--mustard) !important; box-shadow: 0 4px 20px rgba(200,146,10,0.08) !important; }
.price-card { background: var(--bg-white) !important; border-color: var(--border) !important; border-radius: var(--radius) !important; }
.price-card.featured { border-color: var(--mustard) !important; background: var(--bg-white) !important; }
.price-amt { color: var(--mustard) !important; }
.price-name { color: var(--text) !important; }
.tag, .badge { background: var(--bg-muted) !important; color: var(--text-muted) !important; border-radius: 999px !important; }
.result-num, .metric { color: var(--mustard) !important; }
.sec-label, .eyebrow { color: var(--mustard) !important; }
.btn, .cta-btn { border-radius: var(--radius) !important; font-family: var(--font) !important; font-weight: 700 !important; }
.btn-gold, .btn-primary, .cta-btn { background: var(--mustard) !important; color: #fff !important; border-color: var(--mustard) !important; }
.btn-ghost, .btn-outline { background: transparent !important; border-color: var(--border) !important; color: var(--text-muted) !important; }
nav#nav, nav.nav { display: none !important; }
footer:not(.bk-footer) { display: none !important; }
/* Alt section bg */
.prod-section:nth-child(even) { background: var(--bg-muted) !important; }
"""

AI_VIDEO_CSS = """
/* === AI VIDEO STUDIO: Dark → Cream override === */
body { background: var(--bg) !important; color: var(--text) !important; font-family: var(--font) !important; }
:root {
  --gold: var(--mustard) !important;
  --bg-2: var(--bg-muted) !important;
  --bg-3: var(--bg-white) !important;
  --text-1: var(--text) !important;
  --text-2: var(--text-muted) !important;
  --text-3: var(--text-muted) !important;
  --line: var(--border) !important;
}
h1, h2, h3, h4 { font-family: var(--font) !important; color: var(--text) !important; }
h2 em { color: var(--mustard) !important; font-style: normal !important; }
p { color: var(--text-muted) !important; }
.card, .feat-card, .feature-card { background: var(--bg-white) !important; border-color: var(--border) !important; }
.card:hover { border-color: var(--mustard) !important; }
.btn-gold, .btn-primary { background: var(--mustard) !important; color: #fff !important; }
.btn-ghost, .btn-outline { border-color: var(--border) !important; color: var(--text-muted) !important; background: transparent !important; }
nav:not(.bk-nav) { display: none !important; }
footer:not(.bk-footer) { display: none !important; }
"""

CONTACT_CSS = """
/* === CONTACT: align nav === */
nav:not(.bk-nav) { display: none !important; }
footer:not(.bk-footer) { display: none !important; }
body { font-family: var(--font) !important; }
"""


def read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def inject_css(html, css, before_tag='</style>'):
    if before_tag in html:
        return html.replace(before_tag, css + '\n' + before_tag, 1)
    # fallback: inject before </head>
    return html.replace('</head>', f'<style>{css}</style>\n</head>', 1)

def ensure_bk_nav(html, nav_html):
    """Add bk-nav before body content if not present"""
    if 'class="bk-nav"' in html:
        return html  # already has it
    # inject after <body>
    return re.sub(r'(<body[^>]*>)', r'\1\n' + nav_html, html, count=1)

def ensure_bk_footer(html, footer_html):
    """Add bk-footer before </body> if not present"""
    if 'class="bk-footer"' in html:
        return html
    return html.replace('</body>', footer_html + '\n</body>', 1)

def ensure_style_css(html):
    """Ensure style.css is imported"""
    if 'style.css' in html:
        return html
    return html.replace('</head>', '<link rel="stylesheet" href="style.css" />\n</head>', 1)

def ensure_pjs_font(html):
    """Ensure Plus Jakarta Sans is loaded"""
    if 'Plus+Jakarta+Sans' in html or 'Plus Jakarta Sans' in html:
        return html
    font_link = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />\n'
    return html.replace('</head>', font_link + '</head>', 1)

def add_mobile_nav_script(html):
    """Add mobile nav toggle if not present"""
    if 'bk-nav-mobile' in html and 'addEventListener' not in html:
        script = """<script>
  const _btn = document.querySelector('.bk-nav-mobile');
  const _nav = document.querySelector('.bk-nav');
  if (_btn && _nav) _btn.addEventListener('click', () => _nav.classList.toggle('open'));
</script>"""
        html = html.replace('</body>', script + '\n</body>', 1)
    return html


# ── Process each file ────────────────────────────────────────────────────────

tasks = [
    # (filename, css_override, use_wa_nav)
    ('portfolio.html', PORTFOLIO_CSS, True),
    ('services.html', SERVICES_CSS, True),
    ('ai-video-studio.html', AI_VIDEO_CSS, True),
    ('contact.html', CONTACT_CSS, True),
    ('pricing.html', CONTACT_CSS, False),   # pricing: keep contact.html nav
]

os.chdir(DIR)

for fname, css, use_wa in tasks:
    path = os.path.join(DIR, fname)
    if not os.path.exists(path):
        print(f"❌ Not found: {fname}")
        continue

    html = read(path)

    # 1. ensure style.css
    html = ensure_style_css(html)

    # 2. ensure PJS font
    html = ensure_pjs_font(html)

    # 3. inject CSS override
    if css:
        html = inject_css(html, css)

    # 4. inject bk-nav
    nav = BK_NAV_WA if use_wa else BK_NAV
    html = ensure_bk_nav(html, nav)

    # 5. inject bk-footer
    html = ensure_bk_footer(html, BK_FOOTER)

    # 6. add mobile nav script
    html = add_mobile_nav_script(html)

    write(path, html)
    print(f"✅ Fixed: {fname}")

print("\n✅ All done.")
