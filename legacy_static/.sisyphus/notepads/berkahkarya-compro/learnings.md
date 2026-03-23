# Learnings

## Task 10: Bilingual Toggle JavaScript

### i18n Architecture
- i18n.json has 161 keys per language (id/en), organized by page section: nav.*, hero.*, problems.*, services.*, portfolio.*, pricing.*, contact.*, footer.*
- No translation keys exist for: about page content, FAQ section, gallery/testimonials sections
- `about.html` only gets nav + footer data-i18n (no about-specific keys in JSON)

### Implementation Patterns
- Elements with icons + text require wrapping text in `<span data-i18n="key">` to preserve icon `<i>` elements
- Copyright `&copy;` entity requires `data-i18n-html` (innerHTML) instead of `data-i18n` (textContent)
- Form placeholders need `data-i18n-placeholder` attribute (separate from textContent)
- IIFE pattern used in i18n.js with `window.toggleLanguage` exposed for onclick handlers
- `document.readyState` check handles both sync and async script loading

### Attribute Counts
- index.html: 41 data-i18n attributes
- services.html: 48 data-i18n attributes
- portfolio.html: 62 data-i18n attributes
- pricing.html: 60 data-i18n attributes
- contact.html: 34 data-i18n attributes
- about.html: 21 data-i18n attributes (nav + footer only)

### JSON Mismatches (Not Fixed - Task says don't modify JSON)
- `footer.services.seo` has value "SEO Optimization" but HTML shows "E-commerce Optimization" — translation overrides HTML text
- Stat labels in JSON are English for both id/en ("Projects Completed") but HTML has Indonesian ("Proyek Selesai") — translation will override
