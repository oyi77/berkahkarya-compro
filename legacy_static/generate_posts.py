#!/usr/bin/env python3
"""
BerkahKarya Auto Blog Generator
================================
Generates 5 articles per day targeting cities worldwide.
- Uses OpenAI GPT-4o-mini for content (cheap, fast)
- Uses Pexels CDN for images (no download needed)
- Inserts geo-aware product promos (Indonesia → Digital Products, global → Tools)
- Full SEO: meta, OG, hreflang, Schema.org Article JSON-LD
- Updates blog.html with new cards

Usage:
  python3 generate_posts.py            # generate 5 today
  python3 generate_posts.py --count 3  # generate 3
  python3 generate_posts.py --dry-run  # preview only
  python3 generate_posts.py --city "Jakarta"  # specific city

Environment variables required:
  OPENAI_API_KEY
  PEXELS_API_KEY (optional — falls back to curated pool)
"""

import os, sys, csv, json, random, re, subprocess, argparse
from datetime import datetime, timezone
from pathlib import Path
from textwrap import dedent

# ─── Config ──────────────────────────────────────────────────────────────────
DIR          = Path(__file__).parent
BLOG_DIR     = DIR / "blog"
ASSETS_DIR   = DIR / "assets" / "img" / "blog"
DATA_CSV     = DIR / "data" / "cities.csv"
BLOG_HTML    = DIR / "blog.html"
GENERATED_LOG = DIR / "data" / "generated_posts.json"

OPENAI_KEY   = os.environ.get("OPENAI_API_KEY", "")
LAOZHANG_KEY = os.environ.get("LAOZHANG_API_KEY", "sk-Yme2SkDrhbSbCD2F56871153658d4c0e841cA2B51cD0F4E3")
# Use LaoZhang (OpenAI-compatible proxy) as primary, fallback to OpenAI
AI_KEY       = LAOZHANG_KEY or OPENAI_KEY
AI_BASE_URL  = "https://api.laozhang.ai/v1" if LAOZHANG_KEY else "https://api.openai.com/v1"
AI_MODEL     = "gpt-4o-mini"
PEXELS_KEY   = os.environ.get("PEXELS_API_KEY", "za1BFLjWysSEyJvGlVliyKhZxUtBuQq9fJ4mIW4YqdKPj9hEeClK0hAm")
SITE_URL     = "https://berkahkarya.org"
AUTHOR       = "Tim BerkahKarya"
DATE_ID      = datetime.now().strftime("%d %B %Y").replace(
    "January","Januari").replace("February","Februari").replace(
    "March","Maret").replace("April","April").replace(
    "May","Mei").replace("June","Juni").replace(
    "July","Juli").replace("August","Agustus").replace(
    "September","September").replace("October","Oktober").replace(
    "November","November").replace("December","Desember")
DATE_EN      = datetime.now().strftime("%B %d, %Y")
DATE_ISO     = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

# Curated Pexels image pool (keyword → photo_id) — fallback if API fails
PEXELS_POOL = {
    "ai_business":     "2599244",
    "technology":      "574069",
    "city_business":   "325185",
    "social_media":    "4549411",
    "marketing":       "6892902",
    "ecommerce":       "230544",
    "entrepreneur":    "3184465",
    "meeting":         "3184418",
    "laptop_work":     "461073",
    "product_photo":   "6804871",
}

# Promo blocks
PROMO_TOOLS = """
<section class="art-promo" style="background:var(--bg-muted);border-radius:var(--radius);padding:2rem;margin:2.5rem 0;">
  <h2 style="font-size:1.2rem;font-weight:900;margin:0 0 0.75rem;">🚀 Automate Your Business with AI Tools</h2>
  <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.65;margin:0 0 1.25rem;">
    BerkahKarya offers AI-powered tools designed to help businesses like yours scale smarter:
    <strong>Omniroute</strong> — connect 10+ AI providers with one API key, and <strong>AI Agent WA</strong>
    — automate WhatsApp responses 24/7 so you never miss a customer.
  </p>
  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
    <a href="/omniroute.html" class="btn primary" style="font-size:0.85rem;">Explore Omniroute →</a>
    <a href="/ai-agent-pro.html" class="btn" style="font-size:0.85rem;">AI Agent WA →</a>
  </div>
</section>"""

PROMO_DIGITAL = """
<section class="art-promo" style="background:var(--bg-muted);border-radius:var(--radius);padding:2rem;margin:2.5rem 0;">
  <h2 style="font-size:1.2rem;font-weight:900;margin:0 0 0.75rem;">🎁 Produk Digital BerkahKarya</h2>
  <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.65;margin:0 0 1.25rem;">
    Tingkatkan bisnis kamu dengan produk digital BerkahKarya — template, ebook, panduan praktis,
    dan tools AI yang sudah dipakai ribuan pelaku UMKM Indonesia.
    Harga terjangkau, hasil nyata.
  </p>
  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
    <a href="/digital-product.html" class="btn primary" style="font-size:0.85rem;">Lihat Produk Digital →</a>
    <a href="/omniroute.html" class="btn" style="font-size:0.85rem;">Coba Omniroute →</a>
  </div>
</section>"""

# Category map by topic
TOPICS = [
    {"id": "Cara Pakai AI untuk {niche} di {city}", "en": "How to Use AI for {niche} in {city}", "niche_id": "Bisnis UMKM", "niche_en": "Small Business", "cat": "AI & Bisnis", "pexels_q": "artificial intelligence small business"},
    {"id": "Strategi Pemasaran Digital untuk {niche} di {city}", "en": "Digital Marketing Strategies for {niche} in {city}", "niche_id": "Bisnis Online", "niche_en": "Online Business", "cat": "Marketing", "pexels_q": "digital marketing strategy laptop"},
    {"id": "Otomasi WhatsApp untuk Bisnis di {city}", "en": "WhatsApp Automation for Business in {city}", "niche_id": "Pelanggan", "niche_en": "Customers", "cat": "AI Tools", "pexels_q": "messaging app smartphone business"},
    {"id": "Panduan SEO Lokal untuk Bisnis {niche} di {city}", "en": "Local SEO Guide for {niche} Business in {city}", "niche_id": "Kuliner", "niche_en": "Food & Beverage", "cat": "SEO & Digital", "pexels_q": "seo website analytics laptop"},
    {"id": "Cara Jualan Online untuk {niche} di {city}", "en": "How to Sell Online for {niche} in {city}", "niche_id": "UMKM", "niche_en": "SMEs", "cat": "E-Commerce", "pexels_q": "online shopping ecommerce store"},
]

# ─── Helpers ─────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text

def load_cities() -> list[dict]:
    with open(DATA_CSV, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def load_generated_log() -> dict:
    if GENERATED_LOG.exists():
        return json.loads(GENERATED_LOG.read_text())
    return {}

def save_generated_log(log: dict):
    GENERATED_LOG.parent.mkdir(exist_ok=True)
    GENERATED_LOG.write_text(json.dumps(log, indent=2, ensure_ascii=False))

def get_pexels_image(query: str) -> dict:
    """Returns dict with url, alt, credit"""
    if not PEXELS_KEY:
        key = random.choice(list(PEXELS_POOL.values()))
        return {
            "url": f"https://images.pexels.com/photos/{key}/pexels-photo-{key}.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
            "alt": query,
            "credit": "Pexels"
        }
    result = subprocess.run(
        ["curl", "-s", "-H", f"Authorization: {PEXELS_KEY}",
         f"https://api.pexels.com/v1/search?query={query.replace(' ','+')}&per_page=5&orientation=landscape"],
        capture_output=True, text=True
    )
    try:
        data = json.loads(result.stdout)
        photos = data.get("photos", [])
        if photos:
            p = random.choice(photos[:3])
            return {
                "url": p["src"]["large2x"],
                "alt": p.get("alt", query),
                "credit": p.get("photographer", "Pexels")
            }
    except Exception:
        pass
    # fallback
    key = random.choice(list(PEXELS_POOL.values()))
    return {
        "url": f"https://images.pexels.com/photos/{key}/pexels-photo-{key}.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "alt": query,
        "credit": "Pexels"
    }

def generate_article_content(city: str, country: str, lang_code: str, topic: dict, promo_type: str) -> dict:
    """Generate article content using OpenAI GPT-4o-mini"""
    is_indonesia = (country == "Indonesia")
    
    if lang_code == "id":
        title = topic["id"].format(city=city, niche=topic["niche_id"])
        lang_name = "Bahasa Indonesia"
        word_count = "minimal 650 kata"
        system = f"""Kamu adalah penulis konten SEO profesional untuk BerkahKarya, sebuah agensi AI Indonesia.
Tulis artikel blog {word_count} dalam Bahasa Indonesia tentang: {title}
Artikel ini untuk pengusaha/UMKM di {city}, {country}.

STRUKTUR WAJIB:
1. Paragraf pembuka (2-3 kalimat engaging, sebut nama kota)
2. H2: Mengapa {topic['niche_id']} di {city} Butuh AI Sekarang
3. H2: 5 Cara Praktis Menggunakan AI untuk {topic['niche_id']} di {city} (dengan sub-poin)
4. H2: Studi Kasus: Bisnis {topic['niche_id']} di {city} yang Berhasil dengan AI
5. H2: Langkah Memulai Hari Ini
6. Paragraf penutup + CTA lembut

FORMAT: Kembalikan HANYA body konten HTML (hanya tag h2, p, ul, li, strong — TANPA html/head/body).
Kata kunci: AI, {city}, {topic['niche_id']}, otomasi, bisnis digital."""
    else:
        title = topic["en"].format(city=city, niche=topic["niche_en"])
        lang_name = "English"
        system = f"""You are a professional SEO content writer for BerkahKarya, an Indonesian AI agency.
Write a 650+ word blog article in {lang_name} about: {title}
This article targets business owners in {city}, {country}.

REQUIRED STRUCTURE:
1. Engaging intro (2-3 sentences, mention the city name)
2. H2: Why {topic['niche_en']} Businesses in {city} Need AI Now
3. H2: 5 Practical Ways to Use AI for {topic['niche_en']} in {city} (with sub-points)
4. H2: How AI Tools Are Changing the {city} Business Landscape
5. H2: Getting Started Today
6. Closing paragraph + soft CTA

FORMAT: Return ONLY the body content as HTML (only h2, p, ul, li, strong tags — NO html/head/body).
Keywords: AI, {city}, {topic['niche_en']}, automation, business."""

    if not AI_KEY:
        # Template fallback (no API)
        body = f"""<p>Bisnis di {city} kini semakin kompetitif. Dengan kemajuan teknologi AI yang pesat, pelaku usaha yang memanfaatkan kecerdasan buatan memiliki keunggulan signifikan dibandingkan kompetitor yang masih manual.</p>
<h2>Mengapa Bisnis di {city} Butuh AI Sekarang</h2>
<p>Adopsi AI di {city} meningkat pesat dalam 2 tahun terakhir. Mulai dari otomasi layanan pelanggan hingga analitik bisnis real-time, AI membuka peluang yang sebelumnya hanya ada di perusahaan besar.</p>
<ul><li><strong>Efisiensi operasional</strong> — Kurangi biaya 30-50% dengan otomasi tugas berulang</li>
<li><strong>Layanan 24/7</strong> — AI tidak tidur, tidak libur, tidak lelah</li>
<li><strong>Data-driven decisions</strong> — Ambil keputusan berdasarkan data, bukan perasaan</li></ul>
<h2>5 Cara Praktis Menggunakan AI di {city}</h2>
<p>Berikut 5 area di mana bisnis {city} bisa langsung implementasi AI hari ini:</p>
<ul><li><strong>Otomasi WhatsApp</strong> — Balas pertanyaan pelanggan otomatis 24/7</li>
<li><strong>Konten marketing</strong> — Generate copywriting, caption, dan artikel dengan AI</li>
<li><strong>Analitik penjualan</strong> — Prediksi tren dan perilaku pelanggan</li>
<li><strong>Foto produk virtual</strong> — Buat foto produk studio-quality tanpa studio mahal</li>
<li><strong>Manajemen ulasan</strong> — Monitor dan balas review secara otomatis</li></ul>
<h2>Langkah Memulai Hari Ini</h2>
<p>Mulai dari yang simpel: pilih satu proses bisnis yang paling repetitif, dan otomasi dengan AI. Hasilnya akan langsung terasa dalam waktu 2-4 minggu pertama.</p>"""
        return {"title": title, "body": body, "lang_name": lang_name}

    # Call AI API (LaoZhang/OpenAI compatible)
    payload = json.dumps({
        "model": AI_MODEL,
        "max_tokens": 1500,
        "messages": [{"role": "system", "content": system}, 
                     {"role": "user", "content": f"Tulis artikel sekarang untuk: {title}"}]
    })
    
    result = subprocess.run(
        ["curl", "-s", "-X", "POST",
         f"{AI_BASE_URL}/chat/completions",
         "-H", f"Authorization: Bearer {AI_KEY}",
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True
    )
    
    try:
        data = json.loads(result.stdout)
        body = data["choices"][0]["message"]["content"].strip()
        # Remove any markdown code blocks if present
        body = re.sub(r'^```html?\n?', '', body)
        body = re.sub(r'\n?```$', '', body)
        return {"title": title, "body": body, "lang_name": lang_name}
    except Exception as e:
        print(f"⚠️  OpenAI error: {e}, using template fallback")
        return {"title": title, "body": f"<p>Article about AI for {topic['niche_en']} in {city}.</p>", "lang_name": lang_name}

def build_article_html(city: dict, topic: dict, content: dict, img: dict, slug: str, paired_slug: str | None = None) -> str:
    """Build full HTML article page"""
    is_id = city["lang_code"] == "id"
    is_indonesia = city["country_code"] == "ID"
    promo_block = PROMO_DIGITAL if is_indonesia else PROMO_TOOLS
    lang_code = city["lang_code"]
    cat = topic["cat"]
    read_more_label = "Baca Selengkapnya →" if is_id else "Read More →"
    share_label = "Bagikan:" if is_id else "Share:"
    related_label = "Artikel Terkait" if is_id else "Related Articles"
    
    # hreflang — always point to both ID and EN versions
    hreflang_id = f'<link rel="alternate" hreflang="id" href="{SITE_URL}/blog/{slug}.html" />' if is_id else \
                  (f'<link rel="alternate" hreflang="id" href="{SITE_URL}/blog/{paired_slug}.html" />' if paired_slug else "")
    hreflang_en = f'<link rel="alternate" hreflang="en" href="{SITE_URL}/blog/{slug}.html" />' if not is_id else \
                  (f'<link rel="alternate" hreflang="en" href="{SITE_URL}/blog/{paired_slug}.html" />' if paired_slug else "")
    canonical = f'<link rel="canonical" href="{SITE_URL}/blog/{slug}.html" />'
    xdefault = f'<link rel="alternate" hreflang="x-default" href="{SITE_URL}/blog/{slug}.html" />'
    
    desc_id = f"Panduan lengkap cara memanfaatkan teknologi AI untuk bisnis di {city['city']}. Tips praktis, studi kasus, dan rekomendasi tools terbaik untuk pengusaha {city['city']}."
    desc_en = f"Complete guide to leveraging AI technology for business in {city['city']}. Practical tips, case studies, and the best AI tools for entrepreneurs in {city['city']}."
    description = desc_id if is_id else desc_en
    
    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content["title"],
        "image": img["url"],
        "datePublished": DATE_ISO,
        "author": {"@type": "Organization", "name": AUTHOR},
        "publisher": {"@type": "Organization", "name": "BerkahKarya", "url": SITE_URL},
        "inLanguage": lang_code,
        "description": description,
        "mainEntityOfPage": f"{SITE_URL}/blog/{slug}.html"
    }, ensure_ascii=False, indent=2)
    
    date_display = DATE_ID if is_id else DATE_EN
    back_label = "← Kembali ke Blog" if is_id else "← Back to Blog"
    
    return f"""<!DOCTYPE html>
<html lang="{lang_code}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{content['title']} | BerkahKarya</title>
  <meta name="description" content="{description}" />
  <meta property="og:title" content="{content['title']}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{img['url']}" />
  <meta property="og:url" content="{SITE_URL}/blog/{slug}.html" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{content['title']}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{img['url']}" />
  {canonical}
  {hreflang_id}
  {hreflang_en}
  {xdefault}
  <link rel="stylesheet" href="/style.css" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V9C14XZ9SG"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-V9C14XZ9SG', {{'send_page_view': true}});
  </script>
  <script type="application/ld+json">{schema}</script>
  <style>
    .art-container {{ max-width: 800px; margin: 0 auto; padding: 0 1.5rem 4rem; }}
    .art-back {{ display: inline-flex; align-items: center; gap: 6px; color: var(--mustard); font-size: 0.85rem; font-weight: 700; text-decoration: none; margin-bottom: 1.5rem; }}
    .art-back:hover {{ color: var(--mustard-dark); }}
    .art-cat {{ display: inline-block; background: var(--mustard-pale); color: var(--mustard-dark); border-radius: 999px; padding: 4px 14px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 1rem; }}
    .art-title {{ font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.2; margin: 0 0 0.75rem; }}
    .art-excerpt {{ font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin: 0 0 1rem; }}
    .art-meta {{ display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-light); margin-bottom: 1.5rem; }}
    .art-hero-img {{ width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius); margin-bottom: 0.5rem; }}
    .art-photo-credit {{ font-size: 0.7rem; color: var(--text-light); text-align: right; margin-bottom: 2rem; }}
    .art-body h2 {{ font-size: 1.3rem; font-weight: 800; letter-spacing: -0.02em; margin: 2rem 0 0.75rem; color: var(--mustard-dark); }}
    .art-body p {{ line-height: 1.75; margin: 0 0 1rem; }}
    .art-body ul, .art-body ol {{ padding-left: 1.5rem; margin: 0 0 1rem; }}
    .art-body li {{ line-height: 1.7; margin-bottom: 0.4rem; }}
    .art-share {{ border-top: 1px solid var(--border); padding-top: 1.5rem; margin-top: 2rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }}
    .art-share-label {{ font-weight: 700; font-size: 0.85rem; }}
    .art-share a {{ font-size: 0.82rem; color: var(--mustard); font-weight: 600; text-decoration: none; }}
    .art-promo {{ background: var(--bg-muted); border-radius: var(--radius); padding: 2rem; margin: 2.5rem 0; }}
  </style>
</head>
<body>
<nav id="mainNav"></nav>
<script src="/nav.js"></script>
<main style="padding-top: 80px;">
  <div class="art-container">
    <a href="/blog.html" class="art-back">{back_label}</a>
    <span class="art-cat">{cat}</span>
    <h1 class="art-title">{content['title']}</h1>
    <p class="art-excerpt">{description}</p>
    <div class="art-meta">
      <span>🗓 {date_display}</span>
      <span>✍️ {AUTHOR}</span>
      <span>🌍 {city['city']}, {city['country']}</span>
    </div>
    <img class="art-hero-img" src="{img['url']}" alt="{img['alt']}" loading="lazy" width="800" height="450" />
    <p class="art-photo-credit">Photo: {img['credit']} / <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a></p>

    <div class="art-body">
      {content['body']}
    </div>

    {promo_block}

    <div class="art-share">
      <span class="art-share-label">{share_label}</span>
      <a href="https://wa.me/?text={content['title'].replace(' ', '%20')}%20{SITE_URL}/blog/{slug}.html" target="_blank" rel="noopener">WhatsApp</a>
      <a href="https://twitter.com/intent/tweet?text={content['title'].replace(' ', '%20')}&url={SITE_URL}/blog/{slug}.html" target="_blank" rel="noopener">Twitter/X</a>
    </div>
  </div>
</main>

<footer style="background:var(--bg-muted);border-top:1px solid var(--border);padding:2rem 1.5rem;text-align:center;">
  <p style="color:var(--text-light);font-size:0.82rem;margin:0;">© 2026 BerkahKarya — AI Ecosystem untuk Bisnis Indonesia · <a href="/blog.html" style="color:var(--mustard);">Blog</a></p>
</footer>
<script src="/analytics.js" defer></script>
</body>
</html>"""

def inject_into_blog_index(slug: str, title: str, img: dict, cat: str, is_id: bool, desc: str):
    """Prepend new article card to blog.html"""
    content = BLOG_HTML.read_text(encoding="utf-8")
    date_display = DATE_ID if is_id else DATE_EN
    aria_label = title.replace('"', "'")
    
    new_card = f"""
      <article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="blog/{slug}.html" class="blog-card-img-link" aria-label="{aria_label}">
          <div class="blog-card-img">
            <img class="blog-thumb" src="{img['url']}" alt="{img['alt']}" loading="lazy" width="800" height="450">
          </div>
        </a>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-cat">{cat}</span>
            <span class="blog-date" itemprop="datePublished" content="{date_display}">{date_display}</span>
            <span class="blog-read">5 min read</span>
          </div>
          <h2 class="blog-card-title" itemprop="headline"><a href="blog/{slug}.html">{title}</a></h2>
          <p class="blog-card-excerpt">{desc[:150]}...</p>
          <a href="blog/{slug}.html" class="blog-read-more">Baca Selengkapnya →</a>
        </div>
      </article>
"""
    # Insert after opening blog-grid div
    marker = '<div class="blog-grid" id="blogGrid">'
    if marker in content:
        content = content.replace(marker, marker + new_card, 1)
        BLOG_HTML.write_text(content, encoding="utf-8")
        return True
    # Fallback: insert before first <article
    marker2 = '<article class="blog-card"'
    if marker2 in content:
        content = content.replace(marker2, new_card + "      " + marker2, 1)
        BLOG_HTML.write_text(content, encoding="utf-8")
        return True
    print("⚠️  Could not find blog grid insertion point")
    return False

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="BerkahKarya Auto Blog Generator")
    parser.add_argument("--count", type=int, default=5, help="Number of articles (default: 5)")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing files")
    parser.add_argument("--city", type=str, help="Force specific city name")
    args = parser.parse_args()

    # Load data
    all_cities = load_cities()
    log = load_generated_log()
    today = datetime.now().strftime("%Y-%m-%d")
    today_generated = log.get(today, [])
    
    # Filter out already generated today
    available_cities = [c for c in all_cities if c["city"] not in today_generated]
    
    if args.city:
        selected = [c for c in all_cities if c["city"].lower() == args.city.lower()]
        if not selected:
            print(f"❌ City '{args.city}' not found in cities.csv")
            sys.exit(1)
        targets = selected[:1]
    else:
        # Mix: prioritize Indonesia cities, then global
        id_cities = [c for c in available_cities if c["country_code"] == "ID"]
        global_cities = [c for c in available_cities if c["country_code"] != "ID"]
        
        # 2 Indonesia + 3 global per batch
        id_pick = random.sample(id_cities, min(2, len(id_cities)))
        global_pick = random.sample(global_cities, min(args.count - len(id_pick), len(global_cities)))
        targets = id_pick + global_pick
    
    if not targets:
        print("ℹ️  All cities already generated today. Reset log or use --city.")
        return

    BLOG_DIR.mkdir(exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    
    generated = []
    for i, city in enumerate(targets):
        topic = random.choice(TOPICS)
        print(f"\n[{i+1}/{len(targets)}] 🏙️  {city['city']}, {city['country']} | {topic['cat']} | {city['lang_code']}")
        
        # Get image
        img_q = f"{topic['pexels_q']} {city['city']}"
        img = get_pexels_image(img_q)
        print(f"  📷 Image: ...{img['url'][-40:]}")
        
        # Generate content
        content = generate_article_content(
            city["city"], city["country"], city["lang_code"], topic, city["promo_type"]
        )
        print(f"  ✍️  Title: {content['title']}")
        
        # Build slug: ai-{topic_slug}-{city_slug}
        city_slug = slugify(city["city"])
        topic_slug = slugify(topic["en"].format(city="", niche="").strip())[:30].strip("-")
        slug = f"ai-{city_slug}-{city['lang_code']}"
        
        desc = f"Panduan AI untuk bisnis di {city['city']} — cara praktis memanfaatkan teknologi kecerdasan buatan untuk tumbuh lebih cepat." if city['lang_code'] == 'id' else \
               f"AI guide for businesses in {city['city']} — practical ways to leverage artificial intelligence to grow faster."
        
        if args.dry_run:
            print(f"  🔍 DRY RUN — slug: {slug}.html")
            print(f"  📝 Body preview: {content['body'][:200]}...")
            continue
        
        # Write article HTML
        html = build_article_html(city, topic, content, img, slug)
        out_path = BLOG_DIR / f"{slug}.html"
        out_path.write_text(html, encoding="utf-8")
        print(f"  ✅ Written: blog/{slug}.html")
        
        # Update blog index
        inject_into_blog_index(slug, content["title"], img, topic["cat"],
                               city["lang_code"] == "id", desc)
        print(f"  ✅ blog.html updated")
        
        generated.append(city["city"])
        today_generated.append(city["city"])
    
    # Save log
    if not args.dry_run:
        log[today] = today_generated
        save_generated_log(log)
        print(f"\n✅ Generated {len(generated)} articles: {generated}")
        print(f"📁 Commit with: git add -A && git commit -m 'content: auto-blog {today} ({len(generated)} articles)' && git push origin main && git push netlify main")
    else:
        print(f"\n🔍 Dry run complete — {len(targets)} articles would be generated")

if __name__ == "__main__":
    main()
