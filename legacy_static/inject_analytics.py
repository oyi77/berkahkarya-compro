#!/usr/bin/env python3
"""Inject Google Analytics tag + analytics.js into all HTML files"""
import re
from pathlib import Path

GA_TAG = """  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V9C14XZ9SG"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-V9C14XZ9SG', {
      'send_page_view': true,
      'cookie_flags': 'SameSite=None;Secure'
    });
  </script>"""

ANALYTICS_SCRIPT = '  <script src="/analytics.js" defer></script>'

ROOT = Path(__file__).parent
SKIP_DIRS = {'node_modules', '.git', 'portfolio_sites', 'partials', 'sections', 'legal'}

results = {'injected': [], 'skipped': [], 'already': []}

html_files = []
for f in ROOT.rglob('*.html'):
    # Skip unwanted dirs
    parts = set(f.relative_to(ROOT).parts)
    if parts & SKIP_DIRS:
        continue
    html_files.append(f)

for fpath in sorted(html_files):
    content = fpath.read_text(encoding='utf-8')
    changed = False
    rel = fpath.relative_to(ROOT)

    # Check if GA already injected
    if 'G-V9C14XZ9SG' in content:
        results['already'].append(str(rel))
        # But still check for analytics.js
        if 'analytics.js' not in content:
            # Add before </body>
            content = content.replace('</body>', f'{ANALYTICS_SCRIPT}\n</body>', 1)
            fpath.write_text(content, encoding='utf-8')
            results['injected'].append(str(rel) + ' [analytics.js only]')
        continue

    # Inject GA tag after <head> opening or before first </head>
    if '</head>' in content:
        content = content.replace('</head>', GA_TAG + '\n</head>', 1)
        changed = True
    elif '<head>' in content:
        content = content.replace('<head>', '<head>\n' + GA_TAG, 1)
        changed = True
    else:
        results['skipped'].append(str(rel) + ' [no <head>]')
        continue

    # Inject analytics.js before </body>
    if 'analytics.js' not in content and '</body>' in content:
        content = content.replace('</body>', f'{ANALYTICS_SCRIPT}\n</body>', 1)

    if changed:
        fpath.write_text(content, encoding='utf-8')
        results['injected'].append(str(rel))

print(f"\n✅ Injected GA4 + analytics.js: {len(results['injected'])} files")
for f in results['injected']:
    print(f"  + {f}")
print(f"\nℹ️  Already had GA tag: {len(results['already'])} files")
for f in results['already']:
    print(f"  ~ {f}")
if results['skipped']:
    print(f"\n⚠️  Skipped: {len(results['skipped'])} files")
    for f in results['skipped']:
        print(f"  - {f}")
