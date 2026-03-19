# Learnings — compro-improvement

## [2026-03-02] Session Start

### Architecture
- Site is SPA with hash routing: `js/app.js` fetches `sections/{page}-section.html` via Fetch API
- `script.js` is NEVER loaded in `index.html` — confirmed dead code
- `grapesjs-init.js` is a dev tool artifact — not production code
- Bootstrap 5.3.0-alpha1 in use — needs upgrade to 5.3.3 stable

### CSS
- `styles.css` defines `--primary: #2563eb` in `:root`
- `css/dynamic.css` uses hardcoded `#007bff` throughout (different blue!)
- Broken variable refs in styles.css: `--primary-color`, `--heading-color`, `--text-color`, `--primary-rgb` referenced but NOT defined in `:root`
- Duplicate service card styles at lines 514-780 AND 1866-2095

### Content
- `tiktok-agency.html` has superior ROI calculator (per-tier) and Shopee-specific form — mine before deleting
- 13 of 15 images unused — only `logo.png` referenced in main site
- `public/videos/` poster files are `.txt` not `.jpg` — remove poster attributes
- Legal pages are `.md` files — need conversion to styled HTML

### Key Files
- `index.html` — main SPA shell
- `sections/` — 6 section HTML files loaded dynamically
- `js/app.js` — SPA router (to be deleted in MPA migration)
- `js/transitions.js` — fade animations (to be deleted)
- `portfolio_sites/` — FROZEN, do not touch

### Guardrails
- portfolio_sites/ is FROZEN — no changes
- No build tools, no framework migration
- No fabricated testimonials — use TODO placeholders
- Bilingual via JSON + JS toggle only (no separate HTML files per language)
- WhatsApp at bottom-LEFT (Tawk.to is at bottom-right)
- Bootstrap stays (just upgrade version)

## [2026-03-02] Task 1 Complete
- script.js deleted (confirmed dead code — never loaded in index.html)
- grapesjs-init.js deleted (dev tool artifact)
- Bootstrap upgraded from 5.3.0-alpha1 to 5.3.3 in both CSS and JS CDN links
- Evidence saved to .sisyphus/evidence/task-1-dead-code-removed.txt and task-1-bootstrap-version.txt

## [2026-03-02] Task 3 Complete
- Hero copy fixed: added "kreativitas" to complete sentence "Kami menggabungkan strategi berbasis data dengan kreativitas untuk memberikan hasil yang terukur"
- Service names standardized across all sections:
  - "Shopee & TikTok" → "TikTok Content Agency" (footer-section.html)
  - "E-commerce SEO" → "E-commerce Optimization" (contact-section.html)
  - "FlashRobs Trading Bot" verified consistent
- Hero stats labels translated to Indonesian:
  - "Projects Completed" → "Proyek Selesai"
  - "Client Satisfaction" → "Kepuasan Klien"
  - "Years Experience" → "Tahun Pengalaman"
- Evidence saved to .sisyphus/evidence/task-3-hero-copy.txt and task-3-service-names.txt

## [2026-03-02] Task 4 Complete
- js/i18n.json created with 161 translation keys per language
- Covers: nav (6), hero (13), problems (9), services (27), portfolio (27), pricing (35), contact (13), footer (31)
- Structure: flat dot-separated keys (e.g., "hero.title", "services.tiktok.feature1")
- Indonesian (id) is default language — matches current site text
- English (en) translations are professional and accurate
- JSON validated: both languages have equal key counts
- Evidence saved to .sisyphus/evidence/task-4-i18n-valid.txt

## [2026-03-02] Task 5 Complete
- ROI calculator logic extracted to .sisyphus/drafts/roi-calculator-logic.md (338 lines)
  - Complete calculateROI() function with per-tier comparison (Starter 3M, Growth 5M, Scale 8M)
  - HTML structure for inputs (productPrice, targetSales) and outputs (starterROI, growthROI, scaleROI)
  - Color coding logic: Green (#28a745) for positive ROI, Red (#dc3545) for negative
- Shopee-specific contact form fields documented (7 fields: shop_name, email, shop_url, main_product, monthly_sales, message, package)
  - Package options: Starter, Growth (default), Scale, Unsure
  - Form validation: shop_name, email, main_product are required
- "Why TikTok" section market data extracted:
  - Flooring posts: 577.8K | Renovation posts: 882K+
  - Buyer video search: 80% | LVT Market 2025: USD 540M → 2032: USD 1.14B (CAGR 11.3%)
- Contact info verified: veris@berkahkarya.org | +62 857-3274-0006 | berkahkarya.org
- tiktok-agency.html deleted from filesystem (611-line duplicate page)
- Link verification: grep -r 'tiktok-agency' *.html → 0 matches (no broken links)
- Evidence saved to .sisyphus/evidence/task-5-feature-extraction.txt and task-5-page-deleted.txt

## [2026-03-02] Task 6 Complete
- legal/privacy-policy.html created with full HTML structure
- legal/terms-of-service.html created with full HTML structure
- Original .md files deleted
- Footer links updated from .md to .html extensions
- Both pages include:
  - Bootstrap 5.3.3 CSS + Font Awesome 6.0.0 + Google Fonts (Poppins)
  - Simple navbar with back link to home (../index.html)
  - Proper semantic HTML (h1, h2, p, ul, li)
  - Consistent styling with main site
  - Mobile-responsive design
  - Simple footer with copyright
- Content preserved exactly as-is, no modifications
- Back links use relative path ../index.html (correct for legal/ subdirectory)

## [2026-03-02] Task 2 Complete
- css/dynamic.css merged into styles.css and deleted
- Missing CSS vars added to :root: --primary-color, --heading-color, --text-color, --primary-rgb, --secondary-color
- All #007bff replaced with var(--primary)
- Duplicate service card styles removed (first copy at ~514-780 removed, second copy at ~1866-2095 kept)
- First section-badge duplicate removed (kept the one with --primary-color vars)
- Data-service-specific styles preserved (shopee-tiktok, seo, flashrobs ::before and .service-icon gradients)
- Dynamic.css unique content merged: transitions, loading overlay, fade animations, nav active, portfolio cards, pricing cards
- Dynamic.css duplicate content skipped: .section-badge, .service-card, .service-icon, .service-features, .btn-service
- CSS compacted: single-prop rules made one-liners, blank lines reduced to section-comment separators only
- Final line count: 1494 lines (target was ≤1600)
- CSS brace balance verified: 356 open = 356 close

## [2026-03-02] Task 7 Complete
- partials/nav.html created with direct .html links (no navigateTo calls)
  - Links: index.html, services.html, portfolio.html, pricing.html, about.html, contact.html
  - Language toggle button added: <button id="lang-toggle" class="btn btn-sm btn-outline-primary" onclick="toggleLanguage()">EN</button>
  - Navbar structure matches Bootstrap 5.3.3 conventions
- partials/footer.html created with direct .html links (no navigateTo calls)
  - Services column: TikTok Content Agency, E-commerce Optimization, FlashRobs Trading Bot (all link to services.html)
  - Company column: About Us (about.html), Case Studies (portfolio.html), Contact (contact.html), Terms of Service (legal/terms-of-service.html), Privacy Policy (legal/privacy-policy.html)
  - Newsletter form preserved as-is
  - Copyright year: 2026
  - Berkah Karya branding maintained
- Verification: grep -r 'navigateTo' partials/ → 0 results (clean)
- Both files are HTML snippets only (no <!DOCTYPE>, <html>, <head>, <body> tags)
- Ready for copy-paste into MPA pages in Task 8

## [2026-03-02] Task 8 Complete
- MPA migration complete: 5 standalone HTML pages created
  - index.html (219 lines): hero + problems sections, Home nav active
  - services.html (213 lines): 3 service cards, Services nav active
  - portfolio.html (285 lines): TikTok videos + case studies, Portfolio nav active
  - pricing.html (259 lines): 3 pricing tiers + ROI calculator (inline script preserved), Pricing nav active
  - contact.html (167 lines): contact form, "Get 3 Free Videos" nav active
- SPA artifacts removed:
  - js/app.js and js/transitions.js were already deleted in prior tasks
  - No references to either file in any root-level HTML page
  - Loading overlay (#loading), #content div, #footer-container div all removed
- Content adaptation applied:
  - All navigateTo() onclick handlers removed from links
  - All href="#page" converted to href="page.html"
  - poster attributes removed from 3 video elements in portfolio.html (GitHub URLs don't work)
  - pt-5 mt-5 added to first section of each page (fixed navbar offset)
  - aria-current="page" + class="active" set on each page's nav link
- Template structure verified on all 5 pages:
  - DOCTYPE, lang="id", charset, viewport, page-specific title/description
  - Bootstrap 5.3.3 CSS + JS CDN, Font Awesome 6.0.0, Google Fonts Poppins
  - Nav from partials (verbatim with active state adjusted)
  - Footer from partials (verbatim)
  - Tawk.to script with correct ID
- content-section class preserved on all sections (CSS depends on it)
- sections/ directory still has original files (source of truth for content)
- toggleLanguage() button in nav won't function until Task 10 loads js/i18n.js
