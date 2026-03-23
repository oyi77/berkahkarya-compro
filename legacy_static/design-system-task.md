# Design System Task

## Goal
Create `style.css` global design system and unify all HTML pages.

## STEP 1: Create style.css

Create `/home/openclaw/.openclaw/workspace/berkahkarya-compro/style.css` with:

```css
/* BERKAH KARYA — Global Design System */
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap");

:root {
  --bg: #F8F7F2;
  --bg-white: #FFFFFF;
  --bg-muted: #F0EDE4;
  --mustard: #D4A017;
  --mustard-dark: #B8880F;
  --mustard-light: #E8B82B;
  --mustard-pale: rgba(212,160,23,0.08);
  --text: #111111;
  --text-muted: #555555;
  --text-light: #888888;
  --border: #E5E5E5;
  --border-dark: #D0D0D0;
  --shadow: rgba(0,0,0,0.06);
  --shadow-md: rgba(0,0,0,0.1);
  --font: "Plus Jakarta Sans", -apple-system, sans-serif;
  --max-width: 1160px;
  --radius-sm: 6px;
  --radius: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.65; overflow-x: hidden; }
img { max-width: 100%; height: auto; display: block; }
a { text-decoration: none; color: inherit; }
button { font-family: inherit; cursor: pointer; border: none; }

/* NAVBAR */
.bk-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  background: rgba(248,247,242,0.95); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border); height: 64px;
}
.bk-nav-inner {
  max-width: var(--max-width); margin: 0 auto; padding: 0 1.5rem;
  height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
}
.bk-logo { font-size: 1.1rem; font-weight: 900; letter-spacing: -0.02em; color: var(--text); display: flex; align-items: center; gap: 0.3rem; }
.bk-logo span { color: var(--mustard); }
.bk-nav-links { display: flex; align-items: center; gap: 1.5rem; list-style: none; }
.bk-nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--text-muted); transition: color 0.15s; }
.bk-nav-links a:hover { color: var(--mustard); }
.bk-nav-cta {
  background: var(--mustard); color: #fff; padding: 0.55rem 1.25rem;
  border-radius: var(--radius-sm); font-size: 0.875rem; font-weight: 700;
  transition: background 0.15s; white-space: nowrap;
}
.bk-nav-cta:hover { background: var(--mustard-dark); }
.bk-nav-mobile { display: none; background: none; padding: 0.5rem; font-size: 1.2rem; color: var(--text); }
@media (max-width: 768px) { .bk-nav-links, .bk-nav-cta { display: none; } .bk-nav-mobile { display: block; } }

/* FOOTER */
.bk-footer { background: var(--text); color: rgba(255,255,255,0.5); padding: 4rem 1.5rem 2rem; font-size: 0.875rem; }
.bk-footer-inner { max-width: var(--max-width); margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
.bk-footer-brand .bk-logo { color: #fff; margin-bottom: 1rem; font-size: 1.2rem; }
.bk-footer-brand p { line-height: 1.7; max-width: 300px; }
.bk-footer-col h5 { color: #fff; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: 0.08em; text-transform: uppercase; }
.bk-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
.bk-footer-col a { color: rgba(255,255,255,0.5); transition: color 0.15s; }
.bk-footer-col a:hover { color: var(--mustard); }
.bk-footer-bottom { max-width: var(--max-width); margin: 3rem auto 0; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
@media (max-width: 768px) { .bk-footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; } .bk-footer-bottom { flex-direction: column; text-align: center; } }
@media (max-width: 480px) { .bk-footer-inner { grid-template-columns: 1fr; } }

/* BUTTONS */
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  background: var(--mustard); color: #fff; padding: 0.875rem 2rem;
  border-radius: var(--radius-sm); font-weight: 700; font-size: 1rem;
  border: 1.5px solid var(--mustard); transition: background 0.15s, transform 0.12s;
  cursor: pointer; white-space: nowrap; min-height: 48px; touch-action: manipulation;
}
.btn-primary:hover { background: var(--mustard-dark); border-color: var(--mustard-dark); transform: translateY(-1px); }
.btn-secondary {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  background: transparent; color: var(--text); padding: 0.875rem 2rem;
  border-radius: var(--radius-sm); font-weight: 600; font-size: 1rem;
  border: 1.5px solid var(--border-dark); transition: border-color 0.15s, color 0.15s;
  cursor: pointer; white-space: nowrap; min-height: 48px;
}
.btn-secondary:hover { border-color: var(--mustard); color: var(--mustard); }

/* SECTIONS */
.bk-section { padding: 6rem 1.5rem; }
.bk-section-sm { padding: 4rem 1.5rem; }
.bk-container { max-width: var(--max-width); margin: 0 auto; }
.bk-section-label { display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--mustard); margin-bottom: 1rem; }
.bk-section-title { font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1rem; }
.bk-section-subtitle { color: var(--text-muted); font-size: 1.05rem; max-width: 560px; line-height: 1.7; }
.bk-section-title em { font-style: normal; color: var(--mustard); }

/* CARDS */
.bk-card { background: var(--bg-white); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; transition: border-color 0.2s, box-shadow 0.2s; }
.bk-card:hover { border-color: var(--mustard); box-shadow: 0 4px 20px var(--shadow-md); }
.bk-card-icon { font-size: 2rem; margin-bottom: 1rem; }
.bk-card-title { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.bk-card-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.65; }

/* GRIDS */
.bk-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.bk-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.bk-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
@media (max-width: 900px) { .bk-grid-3, .bk-grid-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .bk-grid-2, .bk-grid-3, .bk-grid-4 { grid-template-columns: 1fr; } }

/* CTA BLOCK */
.bk-cta { background: var(--text); color: #fff; border-radius: var(--radius-lg); padding: 5rem 3rem; text-align: center; }
.bk-cta-label { color: var(--mustard-light); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 1rem; }
.bk-cta-title { font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 1rem; }
.bk-cta-subtitle { color: rgba(255,255,255,0.6); font-size: 1.05rem; max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.7; }
.bk-cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* HERO */
.bk-hero { padding: calc(64px + 5rem) 1.5rem 5rem; background: var(--bg); }
.bk-hero-tag { display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mustard); border: 1px solid var(--mustard); border-radius: var(--radius-full); padding: 0.35rem 1rem; margin-bottom: 1.5rem; }
.bk-hero-title { font-size: clamp(2.2rem, 5vw, 4.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.5rem; }
.bk-hero-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--text-muted); max-width: 640px; line-height: 1.7; margin-bottom: 2.5rem; }

/* BADGE */
.bk-badge { display: inline-block; background: var(--mustard-pale); color: var(--mustard-dark); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.3rem 0.9rem; border-radius: var(--radius-full); text-transform: uppercase; }

/* UTILS */
.text-center { text-align: center; }
.text-mustard { color: var(--mustard); }
.bg-muted { background: var(--bg-muted); }
.bk-divider-accent { height: 3px; width: 48px; background: var(--mustard); border-radius: 2px; }

@media (max-width: 768px) {
  .bk-section { padding: 4rem 1.25rem; }
  .bk-section-sm { padding: 3rem 1.25rem; }
  .bk-cta { padding: 3rem 1.5rem; }
}
```

## STEP 2: Add `<link rel="stylesheet" href="style.css">` to ALL .html files

For each file below, add the stylesheet link in `<head>` BEFORE any existing `<style>` tags:
- index.html
- about.html
- omniroute.html
- jasa-video-ai.html
- jasa-sosmed.html
- jasa-foto-produk.html
- jasa-content-planner.html
- jasa-openclaw.html
- jasa-website.html
- ai-agent-pro.html
- contact.html
- ai-video-studio.html

Also add appropriate body class:
- index.html → `<body class="page-home">`
- about.html → `<body class="page-about">`
- omniroute.html → `<body class="page-omniroute">`
- jasa-*.html → `<body class="page-jasa">`
- ai-agent-pro.html → `<body class="page-jasa">`

## STEP 3: Rewrite index.html

Replace index.html entirely with a new homepage using the design system.
The page should have:
- bk-nav navbar (links: Layanan, Omniroute, Tools, About)
- Hero section: "AI Ecosystem untuk Bisnis Indonesia" — text hitam on cream
- 3 pilar section: Agency | Tools | SaaS
- Services preview (jasa-sosmed, jasa-video-ai, jasa-website, jasa-content-planner, jasa-foto-produk, jasa-openclaw)
- Omniroute feature section
- CTA block
- bk-footer

Use class="page-home" on body. NO dark theme.

## STEP 4: Create tools.html

Create `tools.html` — AI Tools catalog. List:
1. AI Agent Pro — chatbot otomasi WA/IG
2. AI Video Studio — video generator AI
3. Content Planner AI
4. Omniroute — AI API gateway

Use design system. class="page-tools".

## STEP 5: Create digital-product.html  

Create `digital-product.html` — digital products for sale:
- Template konten TikTok/IG
- Script viral
- Panduan AI untuk bisnis
- Etc

Use design system. class="page-tools".

## STEP 6: Git commit and push both remotes

```bash
cd /home/openclaw/.openclaw/workspace/berkahkarya-compro
git add -A
git commit -m "feat: global design system (style.css) + unify all pages"
git push origin main
git push netlify main
```

When done, run: openclaw system event --text "Done: Design system complete, all pages unified" --mode now
