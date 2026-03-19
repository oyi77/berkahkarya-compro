# Berkah Karya Company Profile — Comprehensive Overhaul

## TL;DR

> **Quick Summary**: Complete overhaul of Berkah Karya's static company profile site to maximize lead generation. Migrate from broken SPA to multi-page architecture, fix all dead/broken functionality, add missing sections (About/Team, FAQ, Gallery), implement real Netlify Forms, bilingual toggle (ID/EN), WhatsApp floating CTA, and full SEO infrastructure.
> 
> **Deliverables**:
> - Multi-page site with 6 full HTML pages (Home, Services, Portfolio, Pricing, Contact, About)
> - Working contact forms via Netlify Forms
> - Bilingual language toggle (Indonesian/English) via JSON translations
> - Floating WhatsApp CTA button
> - About/Team section with real team photos
> - Gallery section with 8 existing work samples
> - FAQ section (structural template)
> - Full SEO: sitemap.xml, robots.txt, OG tags, structured data (JSON-LD)
> - Consolidated CSS (2 files → 1, all broken variable references fixed)
> - Legal pages rendered as styled HTML
> - Dead code cleanup (script.js, grapesjs-init.js removed)
> - Bootstrap upgraded from 5.3.0-alpha1 to 5.3.3 stable
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves + final verification
> **Critical Path**: Task 1 → Task 3 → Task 8 → Task 13 → Task 20 → Final Verification

---

## Context

### Original Request
User requested a comprehensive improvement of the Berkah Karya company profile website, a digital growth agency in Indonesia offering TikTok Content Agency, E-commerce Optimization, and FlashRobs Trading Bot services.

### Interview Summary
**Key Discussions**:
- **Primary Goal**: Lead generation (WhatsApp/form inquiries)
- **Service Focus**: All 3 services equally weighted
- **Tech Stack**: Keep vanilla HTML/CSS/JS (no framework migration)
- **Scope**: Comprehensive overhaul
- **Form Handling**: Netlify Forms (free, zero config)
- **Language**: Bilingual with toggle (ID/EN)
- **Assets**: Team photos (3 members + group) and gallery images (8 work samples) are real and ready to use
- **WhatsApp CTA**: Floating button using 6285732740006

**Research Findings**:
- SPA architecture with hash routing is SEO-hostile — Google cannot crawl dynamically loaded sections
- Contact form has ZERO handler (script.js is never loaded in index.html)
- CSS has broken variable references: `--primary-color`, `--heading-color`, `--text-color`, `--primary-rgb` are referenced but never defined in `:root`
- Two different blue colors used: `--primary: #2563eb` in styles.css vs hardcoded `#007bff` in dynamic.css
- `tiktok-agency.html` contains superior features (ROI calculator per-tier, Shopee-specific form) that should be mined before removal
- 13 of 15 images in repo are unused (only logo.png referenced)
- `public/videos/` has poster files that are `.txt` not `.jpg` — poster attributes will 404
- Tawk.to live chat is already embedded — WhatsApp button needs position offset to avoid conflict
- Bootstrap 5.3.0-alpha1 (unstable) should be upgraded to 5.3.3

### Metis Review
**Identified Gaps** (addressed):
- **MPA vs SPA decision**: Resolved → go Multi-Page Architecture (best for SEO + lead gen)
- **Portfolio sub-sites scope**: Resolved → explicitly OUT OF SCOPE (portfolio_sites/ directory frozen)
- **Content for new sections**: Resolved → use structural templates with real images, placeholder text with TODO markers
- **Tawk.to + WhatsApp conflict**: Resolved → offset WhatsApp button to bottom-left, keep Tawk.to bottom-right
- **Service naming inconsistency**: Resolved → standardize names in Wave 1
- **Netlify Forms in SPA**: Resolved → MPA migration eliminates this concern (forms in full HTML pages)
- **Video poster files are .txt**: Resolved → remove poster attributes, rely on browser video preview

---

## Work Objectives

### Core Objective
Transform the Berkah Karya website from a broken SPA with dead functionality into a polished, SEO-optimized multi-page site that drives lead generation through working forms, WhatsApp CTA, and professional presentation of all 3 services.

### Concrete Deliverables
- 6 complete HTML pages: `index.html`, `services.html`, `portfolio.html`, `pricing.html`, `contact.html`, `about.html`
- 1 consolidated CSS file: `styles.css` (≤1600 lines, zero broken variable refs)
- 1 main JS file: `script.js` (nav behavior, bilingual toggle, form enhancement, animations)
- Bilingual translation file: `js/i18n.json`
- SEO files: `sitemap.xml`, `robots.txt`
- Styled legal pages: `legal/privacy-policy.html`, `legal/terms-of-service.html`
- WhatsApp floating button component
- Updated `netlify.toml` with form handling

### Definition of Done
- [ ] All 6 pages load without JavaScript errors (browser console clean)
- [ ] Contact form submits to Netlify Forms (verifiable in dashboard)
- [ ] Language toggle switches all `[data-i18n]` elements between ID/EN
- [ ] WhatsApp button visible and links to `wa.me/6285732740006`
- [ ] Lighthouse SEO score ≥ 90
- [ ] All images display (team photos, gallery, logo)
- [ ] No horizontal scroll on any viewport 320px-1440px
- [ ] Zero references to GitHub raw URLs in any HTML file
- [ ] Legal pages render as styled HTML with navigation

### Must Have
- Working contact form (Netlify Forms)
- WhatsApp floating CTA
- Bilingual toggle (ID/EN)
- Multi-page architecture (no hash routing)
- SEO meta tags on all pages
- About/Team section with real photos
- Gallery section with work samples
- All 3 services presented equally
- Mobile-responsive at all breakpoints
- Clean, consolidated CSS

### Must NOT Have (Guardrails)
- **NO modifications to `portfolio_sites/` directory** — these standalone sites are frozen
- **NO build tools, bundlers, or preprocessors** — all output must be hand-editable vanilla files
- **NO fabricated testimonials** — use structural placeholders with `<!-- TODO: Replace with real testimonial -->` markers
- **NO framework migration** — keep Bootstrap 5 + vanilla JS
- **NO separate HTML files per language** — bilingual via JSON + JS toggle only
- **NO changes to portfolio Netlify redirects** in `netlify.toml` (preserve `/trading`, `/seo`, `/ecommerce` routes)
- **NO over-abstraction** — keep code simple and readable for non-developers
- **NO cookie consent banner** — only add if explicitly requested (GA4 can run without it for Indonesian-only audience)
- **NO build step** — `npm start` must still serve the site directly

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: NO (static HTML/CSS/JS site)
- **Automated tests**: NO (no test framework needed for static site)
- **Framework**: None
- **QA Method**: Agent-Executed QA via Playwright (browser verification) and Bash (curl, grep, lighthouse)

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **SEO/Technical**: Use Bash (curl, grep, lighthouse) — Validate meta tags, form submissions, file structure
- **CSS Validation**: Use Bash (grep) — Verify no hardcoded hex colors, no undefined variables

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — cleanup + architecture prep):
├── Task 1:  Delete dead code + upgrade Bootstrap CDN [quick]
├── Task 2:  CSS consolidation + fix broken variables [unspecified-high]
├── Task 3:  Standardize service names + fix broken copy [quick]
├── Task 4:  Bilingual translation JSON file (i18n.json) [quick]
├── Task 5:  Mine tiktok-agency.html for features, then delete [quick]
└── Task 6:  Convert legal pages (.md → styled .html) [quick]

Wave 2 (Architecture — MPA migration + infrastructure):
├── Task 7:  Create shared HTML partials (nav + footer) [quick]
├── Task 8:  Build MPA pages from sections (index, services, portfolio, pricing, contact) [deep]
├── Task 9:  Build About/Team page with existing photos [visual-engineering]
├── Task 10: Implement bilingual toggle JS [unspecified-high]
├── Task 11: Implement Netlify Forms on contact page [quick]
└── Task 12: Add WhatsApp floating CTA + resolve Tawk.to position [quick]

Wave 3 (Content + Polish):
├── Task 13: Build FAQ section (structural template) [quick]
├── Task 14: Build Gallery section with 8 work images [visual-engineering]
├── Task 15: Enrich case studies + add testimonial placeholders [quick]
├── Task 16: Add ROI calculator to pricing page [unspecified-high]
├── Task 17: New main script.js (nav, scroll, animations, form UX) [unspecified-high]
└── Task 18: Equalize service presentation (pricing for all 3) [quick]

Wave 4 (SEO + Final):
├── Task 19: SEO meta tags + OG tags on all pages [quick]
├── Task 20: Structured data (JSON-LD LocalBusiness) [quick]
├── Task 21: Generate sitemap.xml + robots.txt [quick]
├── Task 22: Add Google Analytics 4 snippet [quick]
├── Task 23: Final mobile responsiveness pass [visual-engineering]
└── Task 24: Update netlify.toml for MPA + cleanup [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Task 8 → Task 17 → Task 19 → Final
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Waves 1, 2, 3)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 2, 7, 8 |
| 2 | — | 7, 8, 9, 14 |
| 3 | — | 4, 8, 18 |
| 4 | 3 | 10 |
| 5 | — | 8, 16 |
| 6 | — | 24 |
| 7 | 1, 2 | 8, 9 |
| 8 | 2, 3, 5, 7 | 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 |
| 9 | 2, 7 | 19 |
| 10 | 4, 8 | 19 |
| 11 | 8 | 24 |
| 12 | 8 | 23 |
| 13 | 8 | 19 |
| 14 | 2, 8 | 19 |
| 15 | 8 | 19 |
| 16 | 5, 8 | 19 |
| 17 | 8 | 23 |
| 18 | 3, 8 | 19 |
| 19 | 8-18 | 21 |
| 20 | 8 | 21 |
| 21 | 19, 20 | F1-F4 |
| 22 | 8 | F1-F4 |
| 23 | 8, 12, 17 | F1-F4 |
| 24 | 6, 8, 11 | F1-F4 |
| F1-F4 | ALL | — |

### Agent Dispatch Summary

- **Wave 1**: **6 tasks** — T1→`quick`, T2→`unspecified-high`, T3→`quick`, T4→`quick`, T5→`quick`, T6→`quick`
- **Wave 2**: **6 tasks** — T7→`quick`, T8→`deep`, T9→`visual-engineering`, T10→`unspecified-high`, T11→`quick`, T12→`quick`
- **Wave 3**: **6 tasks** — T13→`quick`, T14→`visual-engineering`, T15→`quick`, T16→`unspecified-high`, T17→`unspecified-high`, T18→`quick`
- **Wave 4**: **6 tasks** — T19→`quick`, T20→`quick`, T21→`quick`, T22→`quick`, T23→`visual-engineering`, T24→`quick`
- **FINAL**: **4 tasks** — F1→`oracle`, F2→`unspecified-high`, F3→`unspecified-high`, F4→`deep`

---

## TODOs

### Wave 1: Foundation (all can start immediately)

- [ ] 1. Delete dead code + upgrade Bootstrap CDN

  **What to do**:
  - Delete `script.js` (never loaded in index.html — confirmed dead code)
  - Delete `grapesjs-init.js` (dev tool artifact, not production code)
  - In `index.html`: upgrade Bootstrap CDN from `5.3.0-alpha1` to `5.3.3` (both CSS and JS bundle links)
  - Verify no other files reference `script.js` or `grapesjs-init.js`

  **Must NOT do**:
  - Do NOT touch `portfolio_sites/` — they have their own Bootstrap versions
  - Do NOT change Bootstrap classes or markup — only the CDN URL version number

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5, 6)
  - **Blocks**: Tasks 2, 7, 8
  - **Blocked By**: None (can start immediately)

  **References**:
  - `index.html:9` — Bootstrap CSS CDN link to upgrade (`5.3.0-alpha1` → `5.3.3`)
  - `index.html:65` — Bootstrap JS bundle CDN link to upgrade
  - `index.html:66-67` — Only `js/transitions.js` and `js/app.js` are loaded (confirms `script.js` is dead)
  - `script.js` — entire file is dead code (187 lines), never executed
  - `grapesjs-init.js` — dev tool, not production code

  **Acceptance Criteria**:
  - [ ] `script.js` deleted from filesystem
  - [ ] `grapesjs-init.js` deleted from filesystem
  - [ ] `index.html` contains `bootstrap@5.3.3` (not `5.3.0-alpha1`)

  **QA Scenarios:**
  ```
  Scenario: Dead code files removed
    Tool: Bash
    Steps:
      1. Run `ls script.js grapesjs-init.js 2>&1`
      2. Assert both files return "No such file or directory"
    Expected Result: Neither file exists
    Evidence: .sisyphus/evidence/task-1-dead-code-removed.txt

  Scenario: Bootstrap version upgraded
    Tool: Bash
    Steps:
      1. Run `grep -c '5.3.3' index.html`
      2. Assert result is 2 (CSS link + JS bundle)
      3. Run `grep -c '5.3.0-alpha1' index.html`
      4. Assert result is 0
    Expected Result: Only stable Bootstrap 5.3.3 referenced
    Evidence: .sisyphus/evidence/task-1-bootstrap-version.txt
  ```

  **Commit**: YES (groups with Tasks 2-6 as Wave 1 commit)
  - Message: `chore: delete dead code and upgrade Bootstrap to 5.3.3`
  - Files: `script.js` (deleted), `grapesjs-init.js` (deleted), `index.html`

---

- [ ] 2. CSS consolidation + fix broken variable references

  **What to do**:
  - Merge `css/dynamic.css` content into `styles.css`
  - Delete `css/dynamic.css` after merge
  - Remove the `<link rel="stylesheet" href="css/dynamic.css">` from `index.html`
  - Fix ALL broken CSS variable references by adding missing variables to `:root`:
    - `--primary-color: var(--primary)` (alias)
    - `--secondary-color: var(--secondary)` (alias)
    - `--heading-color: var(--dark)` (alias)
    - `--text-color: var(--medium)` (alias)
    - `--primary-rgb: 37, 99, 235` (RGB value for rgba() usage)
  - Replace ALL hardcoded `#007bff` in the merged file with `var(--primary)` or appropriate variable
  - Remove duplicate CSS rules (styles.css lines 514-780 and lines 1866-2203 have duplicated service card styles)
  - Target: single `styles.css` file ≤1600 lines with zero broken variable references

  **Must NOT do**:
  - Do NOT rewrite the design system — only consolidate and fix
  - Do NOT change the visual appearance — just normalize the color references
  - Do NOT touch `portfolio_sites/` CSS files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5, 6)
  - **Blocks**: Tasks 7, 8, 9, 14
  - **Blocked By**: None (can start immediately)

  **References**:
  - `styles.css:6-53` — existing `:root` variables (CORRECT pattern to follow)
  - `styles.css:599-710` — references `var(--primary-color)`, `var(--heading-color)`, `var(--text-color)`, `var(--primary-rgb)` which DON'T EXIST in `:root`
  - `styles.css:1866-2095` — DUPLICATE service card styles (compare with lines 514-780)
  - `css/dynamic.css:1-292` — entire file to merge (uses hardcoded `#007bff` throughout instead of variables)
  - `index.html:15` — link to `css/dynamic.css` to remove

  **Acceptance Criteria**:
  - [ ] `css/dynamic.css` deleted
  - [ ] `index.html` no longer references `css/dynamic.css`
  - [ ] `styles.css` `:root` contains `--primary-color`, `--heading-color`, `--text-color`, `--primary-rgb`
  - [ ] Zero hardcoded `#007bff` in `styles.css`
  - [ ] File is ≤1600 lines

  **QA Scenarios:**
  ```
  Scenario: CSS file consolidated
    Tool: Bash
    Steps:
      1. Run `ls css/dynamic.css 2>&1` — assert file does not exist
      2. Run `grep -c 'dynamic.css' index.html` — assert 0
      3. Run `wc -l styles.css` — assert ≤1600
    Expected Result: Single CSS file under 1600 lines
    Evidence: .sisyphus/evidence/task-2-css-consolidated.txt

  Scenario: No broken CSS variable references
    Tool: Bash
    Steps:
      1. Run `grep -c '#007bff' styles.css` — assert 0
      2. Run `grep -c '\-\-primary-rgb' styles.css` — assert ≥1 (defined in :root)
      3. Run `grep -c '\-\-primary-color' styles.css` — assert ≥1 (defined in :root)
    Expected Result: All variable references resolve
    Evidence: .sisyphus/evidence/task-2-css-variables.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `refactor: consolidate CSS and fix broken variable references`
  - Files: `styles.css`, `css/dynamic.css` (deleted), `index.html`

---

- [ ] 3. Standardize service names + fix broken hero copy

  **What to do**:
  - Fix broken hero copy in `sections/home-section.html:10`: "Kami menggabungkan strategi berbasis data dengan ___ untuk" — add missing word (suggest: "kreativitas" or "teknologi")
  - Standardize service names across ALL section files:
    - Service 1: **TikTok Content Agency** (everywhere)
    - Service 2: **E-commerce Optimization** (everywhere)
    - Service 3: **FlashRobs Trading Bot** (everywhere)
  - Fix inconsistencies: footer says "Shopee & TikTok" → change to "TikTok Content Agency", contact dropdown says "E-commerce SEO" → change to "E-commerce Optimization"
  - Make hero stats labels consistent language (currently mixed: "Projects Completed", "Client Satisfaction", "Years Experience" — all English on Indonesian page)

  **Must NOT do**:
  - Do NOT rewrite the marketing copy — only fix the broken sentence and standardize names
  - Do NOT change pricing amounts or package names

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5, 6)
  - **Blocks**: Tasks 4, 8, 18
  - **Blocked By**: None

  **References**:
  - `sections/home-section.html:10` — broken sentence (missing word after "dengan")
  - `sections/footer-section.html:15` — says "Shopee & TikTok" instead of "TikTok Content Agency"
  - `sections/contact-section.html:26` — dropdown says "E-commerce SEO" instead of "E-commerce Optimization"
  - `sections/services-section.html:17,44,71` — current service names (verify consistency)
  - `sections/home-section.html:21-31` — hero stats labels (mixed EN on ID page)

  **Acceptance Criteria**:
  - [ ] `sections/home-section.html:10` no longer has incomplete sentence
  - [ ] `grep -r 'Shopee & TikTok' sections/` returns 0 matches
  - [ ] `grep -r 'E-commerce SEO' sections/` returns 0 matches
  - [ ] All 3 service names appear consistently

  **QA Scenarios:**
  ```
  Scenario: Hero copy is complete
    Tool: Bash
    Steps:
      1. Run `grep 'dengan untuk' sections/home-section.html`
      2. Assert 0 results (broken phrase no longer exists)
    Expected Result: No incomplete sentences
    Evidence: .sisyphus/evidence/task-3-hero-copy.txt

  Scenario: Service names standardized
    Tool: Bash
    Steps:
      1. Run `grep -r 'Shopee & TikTok' sections/` — assert 0 results
      2. Run `grep -r 'E-commerce SEO' sections/` — assert 0 results
      3. Run `grep -rc 'TikTok Content Agency' sections/` — assert ≥3
    Expected Result: Consistent naming across all sections
    Evidence: .sisyphus/evidence/task-3-service-names.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix: standardize service names and fix broken hero copy`
  - Files: `sections/home-section.html`, `sections/footer-section.html`, `sections/contact-section.html`, `sections/services-section.html`

---

- [ ] 4. Create bilingual translation JSON file

  **What to do**:
  - Create `js/i18n.json` with complete Indonesian and English translations for ALL UI strings
  - Structure: `{ "id": { "key": "value" }, "en": { "key": "value" } }`
  - Include translations for: navbar links, hero content, section headers, button text, form labels, footer text, FAQ questions, error messages
  - Use flat key structure with dot-separated names: `"hero.title"`, `"hero.subtitle"`, `"nav.home"`, `"nav.services"`, etc.
  - Default language: Indonesian (`id`)
  - Ensure ALL user-visible text strings are covered

  **Must NOT do**:
  - Do NOT translate legal page content (stays in English)
  - Do NOT translate portfolio sub-site content
  - Do NOT include dynamic/numeric content in translations (stats numbers, prices)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5, 6)
  - **Blocks**: Task 10
  - **Blocked By**: Task 3 (needs standardized service names first)

  **References**:
  - `sections/home-section.html` — all user-visible strings to translate
  - `sections/services-section.html` — service descriptions, feature lists
  - `sections/portfolio-section.html` — section headers, case study labels
  - `sections/pricing-section.html` — pricing headers, feature lists, button text
  - `sections/contact-section.html` — form labels, button text
  - `sections/footer-section.html` — footer section titles, links

  **Acceptance Criteria**:
  - [ ] `js/i18n.json` exists and is valid JSON
  - [ ] Contains both `"id"` and `"en"` top-level keys
  - [ ] All navbar link text has translations
  - [ ] All section headers have translations
  - [ ] All button text has translations
  - [ ] All form labels have translations

  **QA Scenarios:**
  ```
  Scenario: JSON is valid and complete
    Tool: Bash
    Steps:
      1. Run `node -e "const j=JSON.parse(require('fs').readFileSync('js/i18n.json'));console.log(Object.keys(j.id).length, Object.keys(j.en).length)"` 
      2. Assert both numbers are equal and ≥40 (minimum translation keys)
    Expected Result: Valid JSON with matching ID/EN key counts, ≥40 keys each
    Evidence: .sisyphus/evidence/task-4-i18n-valid.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat: add bilingual translation file (ID/EN)`
  - Files: `js/i18n.json`

---

- [ ] 5. Mine tiktok-agency.html for features, then delete

  **What to do**:
  - BEFORE deleting, extract and document these features from `tiktok-agency.html` for use in later tasks:
    - Per-tier ROI calculator logic (lines 564-598) → save to `.sisyphus/drafts/roi-calculator-logic.md`
    - Shopee-specific form fields (shop name, shop URL, product, monthly sales, package radio) → note for Task 11
    - "Why TikTok" section structure (lines 87-124) → note for potential FAQ content
    - Contact info from footer (email, phone, website) → verify matches main site
  - After extraction: DELETE `tiktok-agency.html`
  - Verify no internal links point to `tiktok-agency.html`

  **Must NOT do**:
  - Do NOT delete without extracting useful patterns first
  - Do NOT modify any other files in this task

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4, 6)
  - **Blocks**: Tasks 8, 16
  - **Blocked By**: None

  **References**:
  - `tiktok-agency.html:564-598` — ROI calculator with per-tier comparison (Starter/Growth/Scale)
  - `tiktok-agency.html:445-514` — Shopee-specific contact form (7 fields vs main site's 4)
  - `tiktok-agency.html:87-124` — "Why TikTok" section with market data
  - `tiktok-agency.html:536-560` — Footer contact info

  **Acceptance Criteria**:
  - [ ] `.sisyphus/drafts/roi-calculator-logic.md` exists with extracted calculator code
  - [ ] `tiktok-agency.html` deleted from filesystem
  - [ ] `grep -r 'tiktok-agency' *.html sections/ --include="*.html"` returns 0 matches

  **QA Scenarios:**
  ```
  Scenario: Feature extraction preserved
    Tool: Bash
    Steps:
      1. Run `test -f .sisyphus/drafts/roi-calculator-logic.md && echo EXISTS`
      2. Assert output is "EXISTS"
      3. Run `grep -c 'calculateROI' .sisyphus/drafts/roi-calculator-logic.md`
      4. Assert ≥1
    Expected Result: ROI calculator logic preserved before deletion
    Evidence: .sisyphus/evidence/task-5-feature-extraction.txt

  Scenario: Duplicate page removed
    Tool: Bash
    Steps:
      1. Run `ls tiktok-agency.html 2>&1`
      2. Assert "No such file or directory"
    Expected Result: File deleted
    Evidence: .sisyphus/evidence/task-5-page-deleted.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `chore: extract features from tiktok landing page and remove duplicate`
  - Files: `tiktok-agency.html` (deleted), `.sisyphus/drafts/roi-calculator-logic.md` (created)

---

- [ ] 6. Convert legal pages from Markdown to styled HTML

  **What to do**:
  - Convert `legal/privacy-policy.md` → `legal/privacy-policy.html` (full HTML page with nav, styling, back link)
  - Convert `legal/terms-of-service.md` → `legal/terms-of-service.html` (same treatment)
  - Each page should: include the site's Bootstrap CSS, include a simple nav with "← Back to Home" link, render markdown content as proper HTML elements, include the footer
  - Delete the original `.md` files after conversion
  - Update footer links in `sections/footer-section.html` to point to `.html` versions

  **Must NOT do**:
  - Do NOT add bilingual support to legal pages (stays in current language)
  - Do NOT change the legal content — only convert format

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4, 5)
  - **Blocks**: Task 24
  - **Blocked By**: None

  **References**:
  - `legal/privacy-policy.md` — source content to convert
  - `legal/terms-of-service.md` — source content to convert
  - `sections/footer-section.html:28-29` — links that need updating from `.md` to `.html`
  - `index.html:9-14` — CDN links and font imports to replicate in legal pages

  **Acceptance Criteria**:
  - [ ] `legal/privacy-policy.html` exists and renders as styled HTML
  - [ ] `legal/terms-of-service.html` exists and renders as styled HTML
  - [ ] Original `.md` files deleted
  - [ ] Footer links point to `.html` versions

  **QA Scenarios:**
  ```
  Scenario: Legal pages render as styled HTML
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/legal/privacy-policy.html`
      2. Assert page loads (no 404)
      3. Assert `h1` element exists with privacy policy title
      4. Assert `a[href]` back link exists pointing to main site
      5. Assert Bootstrap CSS is loaded (check computed style of body font-family contains 'Poppins')
    Expected Result: Styled HTML page with navigation
    Failure Indicators: Raw markdown text visible, no styling, 404 error
    Evidence: .sisyphus/evidence/task-6-legal-page.png

  Scenario: Old markdown files removed
    Tool: Bash
    Steps:
      1. Run `ls legal/privacy-policy.md legal/terms-of-service.md 2>&1`
      2. Assert both return "No such file or directory"
    Expected Result: Markdown originals deleted
    Evidence: .sisyphus/evidence/task-6-md-deleted.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat: convert legal pages from markdown to styled HTML`
  - Files: `legal/privacy-policy.html` (new), `legal/terms-of-service.html` (new), `legal/privacy-policy.md` (deleted), `legal/terms-of-service.md` (deleted), `sections/footer-section.html`

---

### Wave 2: Architecture (MPA migration + infrastructure)

- [ ] 7. Create shared HTML partials for nav and footer

  **What to do**:
  - Create `partials/nav.html` with the navbar HTML (extracted from `index.html` lines 18-47)
  - Create `partials/footer.html` with footer HTML (from `sections/footer-section.html`)
  - The nav should include the language toggle button in the navbar
  - Update `netlify.toml` to configure partials directory if needed (Netlify doesn't natively support partials, but we'll reference them via JS include or just copy-paste for MPA)
  - Since this is MPA, actually: SKIP creating partials — just ensure consistent nav/footer across all pages by copy-pasting the same nav/footer HTML into each full page
  - Create a nav+footer template structure that gets repeated in each HTML page

  **Must NOT do**:
  - Do NOT add server-side includes (no backend)
  - Do NOT modify the portfolio_sites navigation

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 9, 10, 11, 12)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `index.html:18-47` — current navbar HTML to extract
  - `sections/footer-section.html` — footer content to extract
  - `sections/home-section.html` — hero content that becomes index.html hero
  - The nav should include a language toggle button: `<button id="lang-toggle" class="btn btn-sm">EN</button>`

  **Acceptance Criteria**:
  - [ ] Nav template includes language toggle button element
  - [ ] Footer template matches current footer-section.html content
  - [ ] Nav and footer are ready to be copy-pasted into each MPA page

  **QA Scenarios:**
  ```
  Scenario: Nav template ready for reuse
    Tool: Bash
    Steps:
      1. Verify nav HTML contains `<nav class="navbar">` (extracted from index.html)
      2. Verify nav contains language toggle button placeholder
      3. Verify footer HTML contains `<footer class="footer">`
    Expected Result: Templates ready for MPA pages
    Evidence: .sisyphus/evidence/task-7-templates.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: create nav and footer templates for MPA`
  - Files: `partials/nav.html` (new), `partials/footer.html` (new)

---

- [ ] 8. Build Multi-Page Architecture (MPA) pages

  **What to do**:
  - Convert from SPA to full multi-page architecture. This is the core migration task.
  - Create 5 new full HTML pages (each is a complete document with nav + content + footer):
    - `index.html` — home page with hero + problems + stats (from sections/home-section.html)
    - `services.html` — services overview (from sections/services-section.html)
    - `portfolio.html` — portfolio + case studies (from sections/portfolio-section.html)
    - `pricing.html` — pricing + ROI calculator (from sections/pricing-section.html + tiktok-agency features)
    - `contact.html` — contact form (from sections/contact-section.html)
  - For each page:
    - Include full `<!DOCTYPE html>` + `<head>` with meta tags + CSS links
    - Include nav (from Task 7 template)
    - Include page-specific content section
    - Include footer (from Task 7 template)
    - Include `<script src="js/script.js"></script>` at end of body
  - Remove all `<section id="...">` wrappers and convert to full `<body>` pages
  - Update all internal links from `navigateTo('page')` or `#page` to direct `.html` links
  - Remove the SPA loading code from `index.html` (the `#content` div, loading overlay)
  - Delete `js/app.js` and `js/transitions.js` (SPA router code, no longer needed)
  - Keep Bootstrap CDN, Font Awesome, Google Fonts, Tawk.to, main script.js

  **Must NOT do**:
  - Do NOT break any existing functionality while migrating
  - Do NOT touch portfolio_sites/ — they have their own pages
  - Do NOT add SEO meta tags yet (Task 19)
  - Do NOT add bilingual toggle JS yet (Task 10)

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 9, 10, 11, 12)
  - **Blocks**: Tasks 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
  - **Blocked By**: Tasks 2, 3, 5, 7

  **References**:
  - `index.html` current structure — to understand full page template vs section
  - `sections/home-section.html` — becomes index.html content
  - `sections/services-section.html` — becomes services.html content
  - `sections/portfolio-section.html` — becomes portfolio.html content
  - `sections/pricing-section.html` — becomes pricing.html content
  - `sections/contact-section.html` — becomes contact.html content
  - `js/app.js` — to identify and remove SPA router code (entire file will be replaced)
  - `js/transitions.js` — to identify and remove fade transition code
  - Use `ast_grep_search` to find ALL navigateTo() calls across HTML files to update

  **Acceptance Criteria**:
  - [ ] `index.html` is a complete standalone page (not a section loaded via JS)
  - [ ] `services.html` exists and is a complete standalone page
  - [ ] `portfolio.html` exists and is a complete standalone page
  - [ ] `pricing.html` exists and is a complete standalone page
  - [ ] `contact.html` exists and is a complete standalone page
  - [ ] All internal links point to direct `.html` pages (no `navigateTo()` or hash links)
  - [ ] `js/app.js` deleted
  - [ ] `js/transitions.js` deleted
  - [ ] No hash-routing code remains
  - [ ] All 5 pages load without JavaScript errors

  **QA Scenarios:**
  ```
  Scenario: MPA migration successful - pages load
    Tool: Playwright
    Steps:
      1. Start local server: `npx serve . -p 3000`
      2. Navigate to `http://localhost:3000/`
      3. Assert page loads with full nav and footer (not just a section)
      4. Click "Services" nav link → should navigate to `services.html`
      5. Assert URL changed from `/` to `/services.html`
      6. Repeat for all nav links: Services, Portfolio, Pricing, Contact
    Expected Result: Full page navigation, no hash routing
    Failure Indicators: 404 errors, hash still in URL, content not loading
    Evidence: .sisyphus/evidence/task-8-mpa-navigation.png

  Scenario: SPA router files removed
    Tool: Bash
    Steps:
      1. Run `ls js/app.js js/transitions.js 2>&1`
      2. Assert both return "No such file or directory"
    Expected Result: SPA router code deleted
    Evidence: .sisyphus/evidence/task-8-spa-deleted.txt

  Scenario: No navigateTo() calls remain
    Tool: Bash
    Steps:
      1. Run `grep -r 'navigateTo' *.html --include="*.html"`
      2. Assert 0 results
    Expected Result: No SPA routing code in HTML
    Evidence: .sisyphus/evidence/task-8-no-navigate.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: migrate from SPA to multi-page architecture`
  - Files: `index.html`, `services.html`, `portfolio.html`, `pricing.html`, `contact.html` (all rewritten), `js/app.js` (deleted), `js/transitions.js` (deleted)

---

- [ ] 9. Build About/Team page with existing photos

  **What to do**:
  - Create `about.html` as a complete full-page document
  - Include the existing team photos from `images/team/` directory:
    - Use `member1.jpg`, `member2.jpg`, `member3.jpg` for individual team members
    - Use `teams.jpeg` for team section hero
  - If team member names/roles aren't known, use placeholder structure:
    ```html
    <div class="team-member">
      <img src="images/team/member1.jpg" alt="Team Member">
      <h3><!-- TODO: Add name --></h3>
      <p class="team-position"><!-- TODO: Add role --></p>
    </div>
    ```
  - Include team values section: "Our Values" with icons for Innovation, Integrity, Results
  - Include "Our Story" or "Why Choose Us" section with 2-3 paragraphs of company narrative (placeholder if no content provided)
  - Include gallery teaser showing 4 of 8 gallery images

  **Must NOT do**:
  - Do NOT fabricate team member names/roles — use TODO placeholders
  - Do NOT use fake testimonial content

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 10, 11, 12)
  - **Blocks**: Task 19
  - **Blocked By**: Task 2, Task 7

  **References**:
  - `images/team/member1.jpg` — team photo 1
  - `images/team/member2.jpg` — team photo 2
  - `images/team/member3.jpg` — team photo 3
  - `images/team/teams.jpeg` — group team photo
  - `images/gallery/work1.jpeg` through `work8.jpeg` — gallery images (use first 4 for teaser)
  - `styles.css:1636-1805` — existing team card CSS styles to use

  **Acceptance Criteria**:
  - [ ] `about.html` exists as a complete full-page document
  - [ ] Uses existing team photos from `images/team/`
  - [ ] Uses placeholder structure for names/roles with TODO markers
  - [ ] Includes gallery teaser section
  - [ ] Has consistent nav and footer matching other pages

  **QA Scenarios:**
  ```
  Scenario: About page renders with team photos
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/about.html`
      2. Assert page loads
      3. Assert `<img src="images/team/` elements exist on page
      4. Assert images load without 404 (check network tab or alt text)
    Expected Result: Team photos displayed, page renders correctly
    Failure Indicators: Missing images, broken layout
    Evidence: .sisyphus/evidence/task-9-about-team.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: add About/Team page with existing photos`
  - Files: `about.html` (new)

---

- [ ] 10. Implement bilingual toggle JavaScript

  **What to do**:
  - Create `js/i18n.js` with functions to:
    - Load `js/i18n.json` translations on page load
    - Toggle between languages when language button clicked
    - Update ALL elements with `data-i18n="key"` attribute to show translated text
    - Persist language choice in `localStorage` (`localStorage.setItem('lang', 'en')`)
    - On page load, check localStorage and apply saved language automatically
  - Add `[data-i18n]` attributes to ALL user-visible text elements in all HTML pages:
    - Nav links: `data-i18n="nav.home"`, etc.
    - Hero text: `data-i18n="hero.title"`, etc.
    - Section headers: `data-i18n="services.title"`, etc.
    - Buttons: `data-i18n="cta.getStarted"`, etc.
    - Form labels: `data-i18n="form.name"`, etc.
  - Add language toggle button to nav (if not already in Task 7):
    ```html
    <button id="lang-toggle" class="btn btn-sm btn-outline" onclick="toggleLanguage()">
      <span data-i18n="nav.language">EN</span>
    </button>
    ```
  - Add fallback: if translation key missing, show original text

  **Must NOT do**:
  - Do NOT change the default language from Indonesian
  - Do NOT add bilingual support to legal pages

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 11, 12)
  - **Blocks**: Task 19
  - **Blocked By**: Task 4, Task 8

  **References**:
  - `js/i18n.json` — translation file created in Task 4
  - `partials/nav.html` — where language toggle button goes
  - Common pattern: `<span data-i18n="hero.title">Original Text</span>`

  **Acceptance Criteria**:
  - [ ] `js/i18n.js` exists with toggle, update, and persistence functions
  - [ ] All HTML pages have `[data-i18n]` attributes on text elements
  - [ ] Clicking language toggle switches text
  - [ ] Language choice persists across page reloads
  - [ ] Default is Indonesian

  **QA Scenarios:**
  ```
  Scenario: Bilingual toggle works
    Tool: Playwright
    Steps:
      1. Start local server: `npx serve . -p 3000`
      2. Navigate to `http://localhost:3000/`
      3. Note current language (should be Indonesian)
      4. Click language toggle button
      5. Assert text content changes (verify at least 5 elements changed)
      6. Reload page
      7. Assert language persists (English still showing)
    Expected Result: Toggle works and persists across reloads
    Failure Indicators: Text doesn't change, choice doesn't persist
    Evidence: .sisyphus/evidence/task-10-bilingual.gif

  Scenario: All pages support bilingual
    Tool: Bash
    Steps:
      1. Run `grep -l 'data-i18n' *.html | wc -l`
      2. Assert ≥6 (index, services, portfolio, pricing, contact, about)
    Expected Result: All MPA pages have i18n attributes
    Evidence: .sisyphus/evidence/task-10-all-pages-i18n.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: implement bilingual language toggle`
  - Files: `js/i18n.js` (new), `*.html` (modified with data-i18n attributes)

---

- [ ] 11. Implement Netlify Forms on contact page

  **What to do**:
  - Modify `contact.html` form to work with Netlify Forms:
    - Add `data-netlify="true"` attribute to the `<form>` element
    - Add `name="form-name"` hidden field (optional but recommended)
    - Add `method="POST"` (already present)
    - Add proper `name` attributes to ALL input fields:
      - `<input name="name" ...>`
      - `<input name="email" ...>`
      - `<select name="subject" ...>`
      - `<textarea name="message" ...>`
    - Add success/thank you message handling (optional: redirect to `contact-success.html` or show inline message)
  - If staying with generic 4-field form (not Shopee-specific from tiktok-agency): keep it simple
  - Add honeypot field for spam prevention (optional): `<input type="text" name="_gotcha" style="display:none">`
  - Verify form works by testing submission after deployment

  **Must NOT do**:
  - Do NOT add complex validation that requires JS — Netlify Forms works with basic HTML validation

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10, 12)
  - **Blocks**: Task 24
  - **Blocked By**: Task 8

  **References**:
  - Netlify Forms docs: `data-netlify="true"` attribute on form element
  - `sections/contact-section.html:12-40` — current form structure to modify
  - `.sisyphus/drafts/roi-calculator-logic.md` — extracted from Task 5 for potential Shopee-specific fields later

  **Acceptance Criteria**:
  - [ ] `contact.html` form has `data-netlify="true"` attribute
  - [ ] All form inputs have `name` attributes
  - [ ] Form submits successfully to Netlify (testable after deployment)

  **QA Scenarios:**
  ```
  Scenario: Netlify Forms attributes present
    Tool: Bash
    Steps:
      1. Run `grep 'data-netlify="true"' contact.html`
      2. Assert 1 result
      3. Run `grep -c 'name="' contact.html`
      4. Assert ≥4 (name, email, subject, message + optional)
    Expected Result: Form is Netlify-ready
    Evidence: .sisyphus/evidence/task-11-netlify-form.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: add Netlify Forms support to contact page`
  - Files: `contact.html`

---

- [ ] 12. Add WhatsApp floating CTA button

  **What to do**:
  - Add floating WhatsApp button to ALL pages (add to nav/footer template for consistency)
  - Button should: be fixed position at bottom-left (to avoid conflict with Tawk.to at bottom-right)
  - Link to: `https://wa.me/6285732740006` (use the number from your site)
  - Include accessible `aria-label` for screen readers
  - Style: green WhatsApp color (#25D366), rounded button with WhatsApp icon
  - CSS: fixed position, z-index above regular content but below modals
  - Add to all HTML pages: index, services, portfolio, pricing, contact, about
  - Position: bottom-left corner, ~20px from edge, ~80px from bottom (above Tawk.to)

  **Must NOT do**:
  - Do NOT remove or disable Tawk.to — just position WhatsApp to not conflict
  - Do NOT change Tawk.to positioning

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10, 11)
  - **Blocks**: Task 23
  - **Blocked By**: Task 8

  **References**:
  - Contact info from footer: +62 857-3274-0006 (WhatsApp number)
  - Font Awesome has WhatsApp icon: `<i class="fab fa-whatsapp"></i>`
  - Position: bottom-left (Tawk.to is bottom-right)

  **Acceptance Criteria**:
  - [ ] WhatsApp button appears on all 6 pages
  - [ ] Button links to `https://wa.me/6285732740006`
  - [ ] Position is bottom-left (not conflicting with Tawk.to)
  - [ ] Has aria-label for accessibility

  **QA Scenarios:**
  ```
  Scenario: WhatsApp button visible and positioned correctly
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/`
      2. Assert `<a href*="wa.me/6285732740006"` element exists
      3. Get button position using `boundingBox()`
      4. Assert x < 100 (left side) and y > 500 (bottom)
      5. Also verify Tawk.to widget is still visible at bottom-right
    Expected Result: WhatsApp button at bottom-left, Tawk.to at bottom-right
    Failure Indicators: Button missing, wrong position, Tawk.to broken
    Evidence: .sisyphus/evidence/task-12-whatsapp-position.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat: add WhatsApp floating CTA button`
  - Files: All HTML pages + `styles.css`

---

### Wave 3: Content + Polish

- [ ] 13. Build FAQ section (structural template)

  **What to do**:
  - Add FAQ section to the site. Best location: either at bottom of `index.html` or as separate `faq.html` page (add to nav if separate)
  - Create 6-8 FAQ items covering common questions:
    1. "How long does it take to see results?"
    2. "What industries do you work with?"
    3. "Do you offer guarantees?"
    4. "How does the pricing work?"
    5. "Can I cancel anytime?"
    6. "What information do you need to start?"
  - Use accordion style: question as clickable header, answer expands on click
  - Use placeholder answers with `<!-- TODO: Add actual answer -->` markers since exact answers weren't provided
  - Add `[data-i18n]` attributes for bilingual support
  - Keep design consistent with existing section styling

  **Must NOT do**:
  - Do NOT fabricate answers — use placeholder structure
  - Do NOT add more than 8 FAQs (scope creep)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14, 15, 16, 17, 18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 8

  **References**:
  - Bootstrap accordion: `https://getbootstrap.com/docs/5.3/components/accordion/`
  - Section styling: follow `section-header` pattern from existing sections

  **Acceptance Criteria**:
  - [ ] FAQ section exists on site (either index.html or faq.html)
  - [ ] Contains 6-8 questions with accordion behavior
  - [ ] Placeholder answers have TODO markers
  - [ ] Bilingual support via data-i18n

  **QA Scenarios:**
  ```
  Scenario: FAQ section renders and functions
    Tool: Playwright
    Steps:
      1. Navigate to FAQ section
      2. Assert accordion elements exist
      3. Click first question header
      4. Assert answer expands (visible)
    Expected Result: Accordion works correctly
    Evidence: .sisyphus/evidence/task-13-faq.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat: add FAQ section with accordion`
  - Files: `index.html` or `faq.html`, `styles.css`

---

- [ ] 14. Build Gallery section with 8 work images

  **What to do**:
  - Add gallery section to `portfolio.html` or create gallery as a feature on index
  - Display all 8 gallery images from `images/gallery/work1.jpeg` through `work8.jpeg`
  - Use responsive grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile
  - Add hover effect: show overlay with image title/caption on hover
  - Add lightbox/modal functionality: clicking image opens larger version
  - Add `[data-i18n]` attributes for bilingual support
  - If captions/titles not provided, use placeholder: `<!-- TODO: Add caption for work1 -->`

  **Must NOT do**:
  - Do NOT crop or resize images (use as-is)
  - Do NOT add more images than the 8 available

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 15, 16, 17, 18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 8

  **References**:
  - `images/gallery/work1.jpeg` through `work8.jpeg` — 8 existing gallery images
  - Use CSS Grid: `grid-template-columns: repeat(4, 1fr)` for desktop
  - Bootstrap grid or custom CSS for responsive layout

  **Acceptance Criteria**:
  - [ ] All 8 gallery images displayed
  - [ ] Responsive: 4 cols desktop, 2 tablet, 1 mobile
  - [ ] Hover effect working
  - [ ] Lightbox opens on click

  **QA Scenarios:**
  ```
  Scenario: Gallery displays all images correctly
    Tool: Playwright
    Steps:
      1. Navigate to gallery section
      2. Count `<img>` elements with `src="images/gallery/`
      3. Assert 8 images present
      4. Resize to 375px width
      5. Assert 1 column layout
      6. Resize to 768px width
      7. Assert 2 column layout
    Expected Result: Responsive gallery working
    Failure Indicators: Missing images, broken layout at breakpoints
    Evidence: .sisyphus/evidence/task-14-gallery.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat: add gallery section with 8 work images`
  - Files: `portfolio.html` or `index.html`, `styles.css`

---

- [ ] 15. Enrich case studies + add testimonial placeholders

  **What to do**:
  - Expand existing case studies in `portfolio.html`: add more metrics, challenge/solution paragraphs
  - Current case studies are thin (1 metric each). Add: client context, timeline, approach details
  - Add testimonial section with placeholder structure:
    ```html
    <div class="testimonial">
      <blockquote><!-- TODO: Real testimonial text --></blockquote>
      <cite><!-- TODO: Client name, company --></cite>
    </div>
    ```
  - Add 3 testimonial placeholders (matching existing testimonial-card CSS)
  - Add `[data-i18n]` for all new text content

  **Must NOT do**:
  - Do NOT fabricate fake testimonials — use placeholder structure
  - Do NOT use real client names without permission

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14, 16, 17, 18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 8

  **References**:
  - `sections/portfolio-section.html:100-165` — existing case studies to expand
  - `styles.css:1056-1162` — testimonial-card CSS styling to follow

  **Acceptance Criteria**:
  - [ ] Each case study has ≥3 metrics (not just 1)
  - [ ] Each case study has client context and approach description
  - [ ] Testimonial section has 3 placeholder testimonials with TODO markers

  **QA Scenarios:**
  ```
  Scenario: Case studies expanded with more content
    Tool: Bash
    Steps:
      1. Run `grep -c 'result-metric' portfolio.html`
      2. Assert ≥9 (3 case studies × 3 metrics each)
    Expected Result: Expanded case studies
    Evidence: .sisyphus/evidence/task-15-case-studies.txt

  Scenario: Testimonial placeholders exist
    Tool: Bash
    Steps:
      1. Run `grep -c 'TODO.*testimonial' portfolio.html`
      2. Assert ≥3
    Expected Result: Placeholder testimonials present
    Evidence: .sisyphus/evidence/task-15-testimonials.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat: enrich case studies and add testimonial placeholders`
  - Files: `portfolio.html`

---

- [ ] 16. Add ROI calculator to pricing page

  **What to do**:
  - Implement ROI calculator on `pricing.html` based on logic extracted in Task 5
  - Use the per-tier calculator logic from `.sisyphus/drafts/roi-calculator-logic.md`:
    - Input: product price (IDR), target sales increase per day
    - Calculate: monthly revenue = price × sales × 30
    - Calculate ROI per package: ((revenue - packagePrice) / packagePrice) × 100%
    - Show Starter (3M), Growth (5M), Scale (8M) tier comparisons
  - Add input fields for product price and target daily sales
  - Add "Calculate" button that runs the calculation
  - Display results: potential revenue and ROI % for each tier
  - Color-code results: green for positive ROI, red for negative
  - Add bilingual support via data-i18n

  **Must NOT do**:
  - Do NOT use the Shopee-specific form fields (keep generic for all services)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14, 15, 17, 18)
  - **Blocks**: Task 19
  - **Blocked By**: Task 8, Task 5

  **References**:
  - `.sisyphus/drafts/roi-calculator-logic.md` — extracted calculator code from Task 5
  - `sections/pricing-section.html:98-137` — simple calculator to replace
  - `tiktok-agency.html:564-598` — per-tier calculator logic

  **Acceptance Criteria**:
  - [ ] Calculator input fields present
  - [ ] Calculate button works
  - [ ] Shows ROI for all 3 tiers (Starter, Growth, Scale)
  - [ ] Color-codes positive (green) vs negative (red) ROI

  **QA Scenarios:**
  ```
  Scenario: ROI calculator functions correctly
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/pricing.html`
      2. Fill product price input with `125000`
      3. Fill target sales input with `10`
      4. Click Calculate button
      5. Assert ROI percentages are displayed
      6. Assert positive numbers are green, negative are red
    Expected Result: Calculator shows correct ROI calculations
    Failure Indicators: NaN results, wrong calculations, no color coding
    Evidence: .sisyphus/evidence/task-16-roi-calculator.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat: add per-tier ROI calculator to pricing page`
  - Files: `pricing.html`, `styles.css`

---

- [ ] 17. Create new consolidated script.js

  **What to do**:
  - Replace the deleted `js/app.js` + `js/transitions.js` with a new unified `js/script.js`
  - Include all needed functionality:
    - Navbar scroll behavior (add scrolled class on scroll)
    - Mobile menu toggle functionality
    - Smooth scroll for anchor links
    - Back to top button behavior
    - Form validation feedback (optional enhancements beyond HTML5)
    - Animation on scroll (elements fade in)
    - Counter animation for stats (if present)
    - FAQ accordion behavior (if not using Bootstrap JS)
    - Gallery lightbox (if custom, not using Bootstrap modal)
  - Remove ALL SPA routing code (navigateTo, APP, TRANSITIONS objects)
  - Keep code simple and readable for non-developers
  - Add comments explaining each section

  **Must NOT do**:
  - Do NOT add any SPA routing back
  - Do NOT add complex frameworks or libraries

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14, 15, 16, 18)
  - **Blocks**: Task 23
  - **Blocked By**: Task 8

  **References**:
  - `js/app.js` (deleted) — understand what to NOT include (SPA routing)
  - `js/transitions.js` (deleted) — understand what to NOT include (fade transitions)
  - `script.js` (deleted from Task 1) — some code may be reusable (form handling, scroll effects)
  - Bootstrap JS is already included via CDN for components

  **Acceptance Criteria**:
  - [ ] `js/script.js` exists and is loaded in all HTML pages
  - [ ] No `navigateTo()` function exists
  - [ ] No `APP` or `TRANSITIONS` objects
  - [ ] All functionality (scroll, animations, forms) works on MPA pages

  **QA Scenarios:**
  ```
  Scenario: script.js loads and functions work
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/`
      2. Open browser console
      3. Assert no JavaScript errors
      4. Scroll down page
      5. Assert navbar gets 'scrolled' class after 50px scroll
    Expected Result: script.js loads without errors, functions work
    Failure Indicators: JavaScript errors in console, broken functionality
    Evidence: .sisyphus/evidence/task-17-script-js.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `refactor: consolidate JS into unified script.js`
  - Files: `js/script.js` (new), all HTML pages (updated to include)

---

- [ ] 18. Equalize service presentation (pricing for all 3 services)

  **What to do**:
  - Currently only TikTok Content has pricing (Starter/Growth/Scale)
  - E-commerce Optimization and FlashRobs Trading Bot need pricing visibility too
  - Options:
    A) Add "Contact for Quote" buttons for those services
    B) Add placeholder pricing sections with TODO markers
    C) Add "Coming Soon" or "Custom Pricing" badges
  - Choose option A (most professional): keep pricing visible for TikTok, add "Contact for Quote" CTAs for E-commerce and FlashRobs
  - Ensure all 3 services have equal prominence in services section
  - Add bilingual support for new CTAs

  **Must NOT do**:
  - Do NOT fabricate pricing for services without actual pricing

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14, 15, 16, 17)
  - **Blocks**: Task 19
  - **Blocked By**: Task 8

  **References**:
  - `sections/services-section.html` — services to equalize
  - `sections/pricing-section.html` — current TikTok pricing structure
  - Standard contact CTA: `<a href="contact.html" class="btn btn-primary">Konsultasi Gratis</a>`

  **Acceptance Criteria**:
  - [ ] All 3 services have equal visual weight on services.html
  - [ ] E-commerce has visible CTA (Contact for Quote or similar)
  - [ ] FlashRobs has visible CTA
  - [ ] Bilingual support added for new CTAs

  **QA Scenarios:**
  ```
  Scenario: All services have equal presentation
    Tool: Playwright
    Steps:
      1. Navigate to `http://localhost:3000/services.html`
      2. Count service cards (should be 3)
      3. Measure card heights — assert equal
      4. Check each has CTA button
    Expected Result: Equal weight for all 3 services
    Evidence: .sisyphus/evidence/task-18-services-equal.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat: equalize presentation across all 3 services`
  - Files: `services.html`, `pricing.html`

---

### Wave 4: SEO + Final

- [ ] 19. Add SEO meta tags + OG tags on all pages

  **What to do**:
  - Add to each HTML page `<head>`:
    - `<title>` — unique per page
    - `<meta name="description">` — unique per page, 150-160 chars
    - `<meta name="keywords">` — relevant keywords per page
    - Open Graph tags:
      - `<meta property="og:title" content="...">`
      - `<meta property="og:description" content="...">`
      - `<meta property="og:image" content="...">`
      - `<meta property="og:url" content="...">`
      - `<meta property="og:type" content="website">`
    - Twitter Card tags:
      - `<meta name="twitter:card" content="summary_large_image">`
      - `<meta name="twitter:title" content="...">`
      - `<meta name="twitter:description" content="...">`
  - Each page needs unique, relevant meta content

  **Must NOT do**:
  - Do NOT duplicate meta descriptions across pages
  - Do NOT use generic descriptions

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 20, 21, 22, 23, 24)
  - **Blocks**: Task 21
  - **Blocked By**: Tasks 8-18

  **References**:
  - Open Graph protocol: `https://ogp.me/`
  - Twitter Cards: `https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary`

  **Acceptance Criteria**:
  - [ ] All 6 pages have unique `<title>`
  - [ ] All 6 pages have unique `<meta name="description">`
  - [ ] All 6 pages have OG tags
  - [ ] All 6 pages have Twitter Card tags

  **QA Scenarios:**
  ```
  Scenario: SEO meta tags present on all pages
    Tool: Bash
    Steps:
      1. Run `grep -l '<meta name="description"' *.html | wc -l`
      2. Assert ≥6
      3. Run `grep -l 'og:title' *.html | wc -l`
      4. Assert ≥6
    Expected Result: All pages have SEO meta
    Evidence: .sisyphus/evidence/task-19-seo-meta.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat: add SEO meta and OG tags`
  - Files: All HTML pages

---

- [ ] 20. Add structured data (JSON-LD LocalBusiness)

  **What to do**:
  - Add JSON-LD structured data to all pages for LocalBusiness schema
  - Include in `<head>` of all pages:
    ```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Berkah Karya",
      "description": "Digital Growth Agency specializing in TikTok Content, E-commerce Optimization, and Trading Bot",
      "telephone": "+62-857-3274-0006",
      "email": "veris@berkahkarya.org",
      "url": "https://berkahkarya.org",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ID",
        "addressRegion": "Indonesia"
      }
    }
    </script>
    ```
  - Add to index.html primarily, but can include on all pages

  **Must NOT do**:
  - Do NOT include fake addresses

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 19, 21, 22, 23, 24)
  - **Blocks**: Task 21
  - **Blocked By**: Tasks 8-18

  **References**:
  - Schema.org LocalBusiness: `https://schema.org/LocalBusiness`
  - Google Structured Data Markup: `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`

  **Acceptance Criteria**:
  - [ ] JSON-LD script tag present in index.html
  - [ ] Valid JSON syntax
  - [ ] Contains required fields: name, description, telephone, email, url

  **QA Scenarios:**
  ```
  Scenario: JSON-LD structured data present
    Tool: Bash
    Steps:
      1. Run `grep -c 'application/ld+json' index.html`
      2. Assert ≥1
      3. Run `node -e "const s = require('fs').readFileSync('index.html','utf8').match(/<script type=\"application\/ld\+json\">[\s\S]*?<\/script>/g); console.log(s ? 'VALID' : 'INVALID')"`
      4. Assert VALID
    Expected Result: Valid JSON-LD present
    Evidence: .sisyphus/evidence/task-20-jsonld.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat: add JSON-LD structured data`
  - Files: `index.html`

---

- [ ] 21. Generate sitemap.xml and robots.txt

  **What to do**:
  - Create `sitemap.xml` with all discoverable pages:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://berkahkarya.org/</loc><priority>1.0</priority></url>
      <url><loc>https://berkahkarya.org/services.html</loc><priority>0.9</priority></url>
      <url><loc>https://berkahkarya.org/portfolio.html</loc><priority>0.8</priority></url>
      <url><loc>https://berkahkarya.org/pricing.html</loc><priority>0.8</priority></url>
      <url><loc>https://berkahkarya.org/contact.html</loc><priority>0.7</priority></url>
      <url><loc>https://berkahkarya.org/about.html</loc><priority>0.7</priority></url>
    </urlset>
    ```
  - Create `robots.txt`:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://berkahkarya.org/sitemap.xml
    ```
  - Replace placeholder domain with actual domain in production

  **Must NOT do**:
  - Do NOT include pages that shouldn't be indexed

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 19, 20, 22, 23, 24)
  - **Blocks**: None
  - **Blocked By**: Tasks 19, 20

  **References**:
  - Sitemap protocol: `https://www.sitemaps.org/protocol.html`

  **Acceptance Criteria**:
  - [ ] `sitemap.xml` exists and is valid XML
  - [ ] `robots.txt` exists and allows crawling
  - [ ] Both files are accessible via HTTP

  **QA Scenarios:**
  ```
  Scenario: SEO files exist and are valid
    Tool: Bash
    Steps:
      1. Run `xmllint --noout sitemap.xml 2>&1 && echo VALID || echo INVALID`
      2. Assert VALID
      3. Run `test -f robots.txt && echo EXISTS || echo MISSING`
      4. Assert EXISTS
    Expected Result: Both files valid
    Evidence: .sisyphus/evidence/task-21-seo-files.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat: add sitemap.xml and robots.txt`
  - Files: `sitemap.xml` (new), `robots.txt` (new)

---

- [ ] 22. Add Google Analytics 4 snippet

  **What to do**:
  - Add GA4 tracking code to all HTML pages (in `<head>`):
    ```html
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
    ```
  - Use placeholder `G-XXXXXXXXXX` — user needs to provide actual GA4 measurement ID
  - Add GA4 to all 6 pages (or add to a shared partial)

  **Must NOT do**:
  - Do NOT create actual GA4 property — user provides their own ID

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 19, 20, 21, 23, 24)
  - **Blocks**: None
  - **Blocked By**: Tasks 8-18

  **References**:
  - GA4 setup: `https://support.google.com/analytics/answer/1008080`

  **Acceptance Criteria**:
  - [ ] GA4 snippet present in all 6 pages
  - [ ] Placeholder ID is clearly marked for replacement

  **QA Scenarios:**
  ```
  Scenario: GA4 snippet present
    Tool: Bash
    Steps:
      1. Run `grep -l 'googletagmanager.com/gtag/js' *.html | wc -l`
      2. Assert ≥6
    Expected Result: GA4 on all pages
    Evidence: .sisyphus/evidence/task-22-ga4.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat: add Google Analytics 4 tracking`
  - Files: All HTML pages

---

- [ ] 23. Final mobile responsiveness pass

  **What to do**:
  - Test all 6 pages at multiple breakpoints: 320px, 375px, 768px, 1024px, 1440px
  - Check for: horizontal scroll, text overflow, broken layouts, nav collapse on mobile, button sizes touch-friendly
  - Fix any responsive issues found:
  - Ensure navbar collapses properly on mobile
  - Ensure WhatsApp button doesn't cause horizontal scroll
  - Ensure gallery grid collapses correctly
  - Ensure forms are usable on mobile

  **Must NOT do**:
  - Do NOT introduce new responsive bugs

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 19, 20, 21, 22, 24)
  - **Blocks**: None
  - **Blocked By**: Tasks 8, 12, 17

  **References**:
  - Use Playwright to screenshot at different widths

  **Acceptance Criteria**:
  - [ ] No horizontal scroll at any breakpoint (320-1440px)
  - [ ] Navbar collapses correctly on mobile
  - [ ] All buttons are touch-friendly (≥44px)
  - [ ] Forms are usable on mobile

  **QA Scenarios:**
  ```
  Scenario: Mobile responsive at all breakpoints
    Tool: Playwright
    Steps:
      1. Start server
      2. Set viewport to 320px, capture screenshot
      3. Assert no horizontal scroll (document.body.scrollWidth === viewport.width)
      4. Repeat for 375px, 768px, 1024px, 1440px
    Expected Result: No horizontal scroll at any width
    Failure Indicators: Horizontal scroll bar appears, content cut off
    Evidence: .sisyphus/evidence/task-23-mobile/*.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `fix: final mobile responsiveness pass`
  - Files: All HTML pages, styles.css

---

- [ ] 24. Update netlify.toml for MPA and finalize

  **What to do**:
  - Update `netlify.toml`:
  - Ensure publish directory is `.` (root)
  - Keep redirect rules for portfolio_sites (UNCHANGED — preserve existing)
  - Add headers for security
  - Optional: add redirect for trailing slashes if needed
  - Verify form handling is enabled (Netlify Forms scans HTML at deploy time)
  - Test that forms work in production (deploy preview if available)

  **Must NOT do**:
  - Do NOT change portfolio_sites redirect rules
  - Do NOT break existing functionality

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 19, 20, 21, 22, 23)
  - **Blocks**: None
  - **Blocked By**: Tasks 6, 8, 11

  **References**:
  - `netlify.toml` — existing config to verify
  - Netlify Forms: `https://docs.netlify.com/forms/setup/`

  **Acceptance Criteria**:
  - [ ] netlify.toml preserved with portfolio_sites redirects
  - [ ] No syntax errors in netlify.toml
  - [ ] Publish directory correct

  **QA Scenarios:**
  ```
  Scenario: netlify.toml is valid
    Tool: Bash
    Steps:
      1. Run `grep 'publish =' netlify.toml`
      2. Assert contains correct path
      3. Run `grep -c 'portfolio_sites' netlify.toml`
      4. Assert ≥4 (portfolio redirect rules preserved)
    Expected Result: Config valid, portfolio rules preserved
    Evidence: .sisyphus/evidence/task-24-netlify.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `chore: update netlify.toml for MPA deployment`
  - Files: `netlify.toml`

---

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run linter (if available) or manual review of all changed files for: hardcoded hex colors outside `:root`, `navigateTo()` calls that should have been removed, empty catches, console.log in prod, commented-out code, unused imports/files. Check CSS for undefined variable references. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Files [N clean/N issues] | CSS vars [all resolved/N broken] | Dead code [CLEAN/N files] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Test EVERY page at 375px, 768px, 1024px, 1440px widths. Test contact form submission. Test bilingual toggle persistence across page navigation. Test WhatsApp button click. Test all internal links between pages. Test legal page rendering. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Pages [N/N pass] | Forms [N/N] | Bilingual [PASS/FAIL] | Links [N/N] | Mobile [N breakpoints pass] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance — specifically verify: portfolio_sites/ is untouched, no build tools added, no fabricated testimonials, no framework code. Detect cross-task contamination.
  Output: `Tasks [N/N compliant] | Guardrails [N/N respected] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

| Wave | Commit Message | Files | Pre-commit Check |
|------|---------------|-------|-----------------|
| 1 | `chore: delete dead code, upgrade Bootstrap, consolidate CSS` | script.js (deleted), grapesjs-init.js (deleted), styles.css, css/dynamic.css (deleted) | grep for broken var refs |
| 1 | `fix: standardize service names and fix broken hero copy` | sections/*.html | visual review |
| 1 | `feat: add bilingual translation file` | js/i18n.json | JSON validity |
| 1 | `chore: mine tiktok features and remove duplicate page` | tiktok-agency.html (deleted) | — |
| 1 | `feat: convert legal pages to styled HTML` | legal/*.html | pages render |
| 2 | `feat: migrate to multi-page architecture` | index.html, services.html, portfolio.html, pricing.html, contact.html, about.html | all pages load |
| 2 | `feat: implement bilingual toggle` | js/script.js, all HTML pages | toggle works |
| 2 | `feat: implement Netlify Forms and WhatsApp CTA` | contact.html, netlify.toml | form submits |
| 3 | `feat: add FAQ, gallery, enriched case studies` | about.html, portfolio.html | content renders |
| 3 | `feat: add ROI calculator and equalize service pricing` | pricing.html | calculator works |
| 4 | `feat: add SEO infrastructure (meta, OG, JSON-LD, sitemap)` | all HTML, sitemap.xml, robots.txt | lighthouse SEO ≥ 90 |
| 4 | `feat: add analytics and finalize netlify config` | all HTML, netlify.toml | GA4 loads |

---

## Success Criteria

### Verification Commands
```bash
# All HTML pages load (no 404s)
for page in index services portfolio pricing contact about; do curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/${page}.html; done
# Expected: 200 for each

# No GitHub raw URLs remain
grep -r "github.com" sections/ *.html --include="*.html" | wc -l
# Expected: 0

# No broken CSS variable references
grep -P 'var\(--(?!primary|primary-dark|primary-light|secondary|secondary-dark|secondary-light|shopee-color|seo-color|trading-color|dark|medium|light|white|h[1-4]-size|body-size|small-size|space-|radius-|transition-)' styles.css | wc -l
# Expected: 0

# Contact form has Netlify attributes
grep -c 'data-netlify="true"' contact.html
# Expected: 1

# Bilingual JSON is valid
node -e "JSON.parse(require('fs').readFileSync('js/i18n.json'))"
# Expected: no error

# Sitemap exists and is valid XML
xmllint --noout sitemap.xml 2>&1
# Expected: no errors

# No navigateTo() calls remain (SPA removed)
grep -r "navigateTo" *.html sections/ --include="*.html" | wc -l
# Expected: 0

# Dead code files removed
ls script.js grapesjs-init.js css/dynamic.css js/app.js js/transitions.js 2>&1 | grep -c "No such file"
# Expected: 5
```

### Final Checklist
- [ ] All "Must Have" items present and functional
- [ ] All "Must NOT Have" guardrails respected
- [ ] All pages render correctly at 375px, 768px, 1024px, 1440px
- [ ] Contact form submits successfully to Netlify
- [ ] Bilingual toggle works and persists across navigation
- [ ] WhatsApp button visible and functional
- [ ] Lighthouse SEO ≥ 90
- [ ] Zero JavaScript console errors
- [ ] All links functional (no broken links)
- [ ] Legal pages render as styled HTML
