#!/usr/bin/env python3
"""
Inject Pexels thumbnail images into blog.html cards and article hero sections.
Images from Pexels CDN — no download needed, direct embed.
"""
from pathlib import Path
import re, json

DIR = Path(__file__).parent

# Pexels images fetched via API
IMAGES = {
    "ai-bisnis": {
        "url": "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "Alex Knight / Pexels",
        "alt": "Robot AI humanoid — teknologi kecerdasan buatan untuk bisnis"
    },
    "tiktok-konten": {
        "url": "https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "Plann / Pexels",
        "alt": "Content creator dengan smartphone dan laptop — strategi konten TikTok"
    },
    "website-digital": {
        "url": "https://images.pexels.com/photos/461073/pexels-photo-461073.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "Pixabay / Pexels",
        "alt": "Laptop di meja kerja profesional — jasa pembuatan website bisnis"
    },
    "api-developer": {
        "url": "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "Lukas Blazek / Pexels",
        "alt": "Developer coding di laptop — Omniroute API management platform"
    },
    "foto-produk": {
        "url": "https://images.pexels.com/photos/6804871/pexels-photo-6804871.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "cottonbro studio / Pexels",
        "alt": "Studio profesional product photography — foto produk AI tanpa kamera mahal"
    },
    "content-planner": {
        "url": "https://images.pexels.com/photos/6892902/pexels-photo-6892902.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
        "credit": "cottonbro studio / Pexels",
        "alt": "Menulis content planner — template konten 30 hari untuk bisnis Indonesia"
    },
}

# Mapping: article slug → image key
ARTICLE_MAP = {
    "ai-bisnis":                  "ai-bisnis",
    "ai-in-business":             "ai-bisnis",
    "strategi-konten-tiktok-2026":"tiktok-konten",
    "tiktok-content-strategy-2026":"tiktok-konten",
    "website-umkm-wajib-ada":     "website-digital",
    "why-smes-need-website":      "website-digital",
    "omniroute-api-management":   "api-developer",
    "omniroute-api-management-en":"api-developer",
    "foto-produk-ai-marketplace": "foto-produk",
    "ai-product-photos-marketplace":"foto-produk",
    "content-planner-bisnis":     "content-planner",
    "content-planner-business":   "content-planner",
}

# ── Image CSS to add ──────────────────────────────────────────────────────────
THUMB_CSS = """
/* Blog thumbnail images */
.blog-thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 4px 4px 0 0;
}
.blog-card-img { background: var(--bg-muted); overflow: hidden; }
.art-hero-img { width: 100%; max-height: 380px; object-fit: cover; border-radius: var(--radius); margin-top: 1.5rem; }
.art-photo-credit { font-size: 0.7rem; color: var(--text-light); text-align: right; margin-top: 4px; margin-bottom: 1.5rem; }
.art-photo-credit a { color: var(--text-light); }
"""

# ── 1. Update blog.html ───────────────────────────────────────────────────────
blog_path = DIR / "blog.html"
blog_content = blog_path.read_text(encoding="utf-8")

# Add CSS before </style> or in <head>
if "blog-thumb" not in blog_content:
    blog_content = blog_content.replace("</style>", THUMB_CSS + "\n</style>", 1)

# Replace each blog-card-img placeholder with actual <img>
# Pattern: find blog cards by their article link slug
articles_ordered = [
    ("blog/ai-di-bisnis.html",               "ai-bisnis"),
    ("blog/strategi-konten-tiktok-2026.html","tiktok-konten"),
    ("blog/website-umkm-wajib-ada.html",     "website-digital"),
    ("blog/omniroute-api-management.html",   "api-developer"),
    ("blog/foto-produk-ai-marketplace.html", "foto-produk"),
    ("blog/content-planner-bisnis.html",     "content-planner"),
]

for slug, img_key in articles_ordered:
    img = IMAGES[img_key]
    # Replace the div.blog-thumb-placeholder inside the card that links to this slug
    # Pattern: find the block between blog-card-img-link containing this slug
    # Replace the placeholder div with actual img
    old_placeholder = (
        f'<a href="{slug}" class="blog-card-img-link"'
        # followed by anything up to closing </a>
    )
    # More targeted: replace the thumb-placeholder div within the specific card
    # Find: blog-card-img-link href=slug ... blog-thumb-placeholder ... </div>\n      </a>
    pattern = (
        r'(<a href="' + re.escape(slug) + r'"[^>]*>\s*'
        r'<div class="blog-card-img">\s*)'
        r'<div class="blog-thumb-placeholder"[^>]*>.*?</div>\s*'
        r'(</div>\s*</a>)'
    )
    replacement = (
        r'\1'
        f'<img class="blog-thumb" src="{img["url"]}" alt="{img["alt"]}" loading="lazy" width="800" height="450">'
        r'\2'
    )
    new_content = re.sub(pattern, replacement, blog_content, flags=re.DOTALL)
    if new_content != blog_content:
        print(f"✅ blog.html: replaced thumb for {slug}")
        blog_content = new_content
    else:
        # Try alternative: just replace placeholder inside that anchor's vicinity
        print(f"⚠️  blog.html: pattern miss for {slug} — trying fallback")
        # Fallback: find blog-thumb-placeholder in order
        idx = blog_content.find(f'href="{slug}"')
        if idx > 0:
            ph_start = blog_content.find('<div class="blog-thumb-placeholder"', idx)
            ph_end = blog_content.find('</div>', ph_start) + 6
            if ph_start > 0:
                img_tag = f'<img class="blog-thumb" src="{img["url"]}" alt="{img["alt"]}" loading="lazy" width="800" height="450">'
                blog_content = blog_content[:ph_start] + img_tag + blog_content[ph_end:]
                print(f"   ✅ fallback OK for {slug}")

blog_path.write_text(blog_content, encoding="utf-8")
print(f"✅ blog.html saved")

# ── 2. Update each article page with hero image ───────────────────────────────

for article_file in sorted((DIR / "blog").glob("*.html")):
    stem = article_file.stem
    img_key = ARTICLE_MAP.get(stem)
    if not img_key:
        print(f"⏭  {article_file.name}: no image mapping")
        continue

    img = IMAGES[img_key]
    content = article_file.read_text(encoding="utf-8")

    # Add art-hero-img CSS if not present
    if "art-hero-img" not in content:
        content = content.replace("</style>", "    .art-hero-img { width: 100%; max-height: 380px; object-fit: cover; border-radius: var(--radius); margin-top: 1.5rem; }\n    .art-photo-credit { font-size: 0.7rem; color: var(--text-light); text-align: right; margin-top: 4px; margin-bottom: 1.5rem; }\n</style>", 1)

    # Inject image after <p class="art-excerpt">...</p>
    if f'pexels.com' not in content:
        img_block = (
            f'\n    <img class="art-hero-img" src="{img["url"]}" '
            f'alt="{img["alt"]}" loading="lazy" width="800" height="450" />'
            f'\n    <p class="art-photo-credit">Photo: <a href="https://www.pexels.com" target="_blank" rel="noopener">{img["credit"]}</a></p>'
        )
        # Insert after the art-excerpt paragraph
        content = re.sub(
            r'(<p class="art-excerpt"[^>]*>.*?</p>)',
            r'\1' + img_block,
            content,
            count=1,
            flags=re.DOTALL
        )
        article_file.write_text(content, encoding="utf-8")
        print(f"✅ {article_file.name}: hero image injected")
    else:
        print(f"⏭  {article_file.name}: image already present")

print("\n✅ All done!")
