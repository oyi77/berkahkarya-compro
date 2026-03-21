# 🔥 BerkahKarya Ads Marketing AI Pro
## Developer User Guide — Revisi & Maintenance

**URL Prod:** https://berkahkarya.org/ads-marketing-ai/pro/  
**Repo:** https://github.com/oyi77/Berkah-karya-mvp-pro  
**Deploy:** Netlify auto-deploy dari branch `main`  
**Last Updated:** 2026-03-21

---

## 📁 FILE YANG PERLU KAMU TAHU

```
berkah-karya-mvp-pro/
├── ads-marketing-ai/
│   └── pro/
│       └── index.html          ← FRONTEND UI (semua tampilan)
└── netlify/
    └── functions/
        └── generate-ads.js     ← BACKEND (semua AI logic)
```

Cuma 2 file yang perlu direvisi untuk semua perubahan fitur.

---

## 🗂️ STRUKTUR BACKEND (`generate-ads.js`)

### Flow Request

```
User input (form) → apiCall() → Netlify Function → AI Claude → Response → Render UI
```

### Mode yang tersedia (di field `mode`):

| Mode | Fungsi | Input Wajib |
|------|--------|-------------|
| `ads` | Generate iklan | produk |
| `landing` | Generate LP HTML | produk |
| `analyze` | Analisa performa | spend, revenue |
| `optimize` | Full optimization pipeline | spend, revenue |
| `budget_guide` | Panduan budget | - (opsional) |
| `competitor` | Analisa kompetitor | iklan_kompetitor |

### Fungsi-fungsi di backend:

```
callClaude(systemPrompt, userPrompt, maxTokens)
  └── Semua fungsi AI pakai ini

generateAds(produk, target, keunggulan, platform, jumlah, tone)
  └── Mode: ads

generateLandingPage(produk, target, keunggulan, tone)
  └── Mode: landing → return HTML string

analyzePerformance(data)
  └── Mode: analyze → return { result }

optimizeAds(data)
  └── Mode: optimize → return { analysis, strategy, new_ads, new_landing_page, relaunch_plan }

generateBudgetGuide(produk, target, keunggulan)
  └── Mode: budget_guide

analyzeCompetitor(iklanKompetitor, produk, target)
  └── Mode: competitor
```

---

## 🖥️ STRUKTUR FRONTEND (`index.html`)

### Tab yang ada:

| Tab ID | Tab Name | JS Function |
|--------|----------|-------------|
| `tab-ads` | ✍️ Generate Iklan | `generateAds()` |
| `tab-landing` | 🚀 Landing Page HTML | `generateLanding()` |
| `tab-analyze` | 📊 Analyze | `analyzePerformance()` |
| `tab-optimize` | 🔥 AUTO OPTIMIZE | `runOptimize()` |
| `tab-budget` | 💰 Budget Guide | `generateBudgetGuide()` |
| `tab-competitor` | 🔍 Kompetitor | `analyzeCompetitor()` |

### Element ID penting (input fields):

**Tab Ads:**
- `#ads-produk` — nama produk
- `#ads-target` — target market
- `#ads-keunggulan` — keunggulan
- `#ads-platform` — platform (TikTok, Meta, dll)
- `#ads-tone` — tone

**Tab Landing:**
- `#lp-produk`, `#lp-target`, `#lp-keunggulan`, `#lp-tone`
- `#lp-wa` — WhatsApp link
- `#lp-checkout` — Checkout link

**Tab Analyze:**
- `#az-spend`, `#az-revenue`, `#az-clicks`, `#az-leads`, `#az-closing`, `#az-impressions`

**Tab Optimize:**
- `#opt-spend`, `#opt-revenue`, `#opt-clicks`, `#opt-leads`, `#opt-closing`
- `#opt-produk`, `#opt-target`
- `#opt-old-ads` — hook ads lama (untuk hindari duplikasi)
- `#opt-old-lp` — headline LP lama

**Result container:**
- `#ads-results` — output ads
- `#lp-results` — output landing page
- `#az-results` — output analyze
- `#opt-results` — output optimize
- `#bg-results` — output budget guide
- `#comp-results` — output competitor

---

## ✏️ CARA REVISI UMUM

### 1. Ganti wording/prompt AI

Edit file: `netlify/functions/generate-ads.js`

Cari fungsi yang mau diubah, misalnya `generateAds`:

```javascript
async function generateAds(produk, target, keunggulan, platform, jumlah, tone) {
  const systemPrompt = `...`;  // ← EDIT DI SINI
  const userPrompt = `...`;    // ← atau di sini
  ...
}
```

**Tips:** `systemPrompt` = instruksi ke AI. `userPrompt` = data dari user.

---

### 2. Tambah tab baru

**Step 1:** Tambah tombol tab di `index.html`:
```html
<div class="app-tabs">
  ...
  <button class="tab-btn" onclick="switchTab('namatab', this)">🆕 Nama Tab</button>
</div>
```

**Step 2:** Tambah panel tab:
```html
<div id="tab-namatab" class="tab-panel">
  <div class="app-body">
    <aside class="sidebar">
      <!-- form input di sini -->
    </aside>
    <main class="output-area">
      <div class="output-placeholder" id="nt-placeholder">...</div>
      <div id="nt-results"></div>
    </main>
  </div>
</div>
```

**Step 3:** Tambah JS function:
```javascript
async function myNewFunction() {
  const data = { mode: 'namamode', ... };
  setLoading('btn-id', true, 'Loading...');
  const res = await apiCall(data);
  // render hasil
  setLoading('btn-id', false, 'Teks Asal');
}
```

**Step 4:** Tambah handler di backend `generate-ads.js`:
```javascript
} else if (mode === 'namamode') {
  const result = await myBackendFunction(body);
  return { statusCode: 200, headers, body: JSON.stringify({ result }) };
```

---

### 3. Ubah tampilan/design card

CSS ada di bagian `<style>` di dalam `index.html` (baris ~10–170).

Variable warna utama:
```css
:root {
  --gold: #d4a017;        /* Warna aksen utama */
  --bg: #0f0f0f;          /* Background dark */
  --bg2: #1a1a1a;         /* Background card */
  --bg3: #242424;         /* Background input */
  --green: #10b981;       /* Success/CTA WA */
  --red: #ef4444;          /* Error/danger */
  --blue: #3b82f6;         /* Info/analyze */
  --text: #ede8e0;         /* Text utama */
  --text2: #b8b0a5;        /* Text sekunder */
  --text3: #7a7269;        /* Text placeholder */
}
```

---

### 4. Ubah output render (tampilan hasil)

Cari fungsi `render...` di JavaScript:
- `renderAds(ads, platform)` — render kartu iklan
- `renderLandingHTML(htmlContent, produk)` — render LP preview
- `renderAnalyze(r)` — render hasil analisis
- `renderOptimize(r)` — render hasil optimize

Ubah template HTML di dalam fungsi tersebut.

---

### 5. Ganti model AI

Di `generate-ads.js`, cari:
```javascript
const DEFAULT_MODEL = 'claude-opus-4-5';  // ← ganti di sini
```

Model yang bisa dipakai (via LaoZhang):
- `claude-opus-4-5` (paling powerful, default)
- `claude-sonnet-4-5` (lebih cepat, lebih murah)
- `gpt-4o` (OpenAI)

---

### 6. Ubah password akses

Di `index.html`, cari:
```javascript
const VALID_PASSWORDS = ['berkahkarya2025', 'veris2025'];
```
Ganti value array sesuai kebutuhan.

---

### 7. Ganti API key

Di `generate-ads.js` bagian atas:
```javascript
const LAOZHANG_KEY = 'sk-...';  // ← API key Claude/LaoZhang
const LAOZHANG_BASE = 'https://api.laozhang.ai/v1';
```

---

## 🚀 CARA DEPLOY SETELAH REVISI

**Via GitHub (recommended):**
```bash
git add -A
git commit -m "pesan perubahan kamu"
git push
```
Netlify auto-deploy dalam ~2 menit.

**Cek deploy status:**  
https://app.netlify.com → cari site berkahkarya → Deploys

---

## 🧪 CARA TEST LOKAL (tanpa deploy)

```bash
# Install Netlify CLI (sekali saja)
npm install -g netlify-cli

# Jalankan local
cd /path/to/berkah-karya-mvp-pro
netlify dev

# Akses di: http://localhost:8888/ads-marketing-ai/pro/
```

---

## 🏗️ ARSITEKTUR SISTEM

```
[Browser User]
     │
     │ POST /api/generate-ads
     ▼
[Netlify Function: generate-ads.js]
     │
     │ POST (stream)
     ▼
[LaoZhang API → Claude Opus 4.5]
     │
     │ JSON response
     ▼
[Frontend render]
     │
     ▼
[User lihat hasil: Ads / LP / Analyze / Optimize]
```

---

## ⚡ QUICK CHEAT SHEET

| Mau ngapain | Edit file | Cari kata |
|-------------|-----------|-----------|
| Ubah prompt AI | `generate-ads.js` | `systemPrompt` |
| Ubah tampilan hasil | `index.html` | `function render...` |
| Tambah input field | `index.html` | `id="tab-XXX"` |
| Ubah warna/style | `index.html` | `<style>` atau `:root` |
| Ubah password | `index.html` | `VALID_PASSWORDS` |
| Ubah model AI | `generate-ads.js` | `DEFAULT_MODEL` |
| Ubah API key | `generate-ads.js` | `LAOZHANG_KEY` |
| Tambah tab baru | Kedua file | Lihat "Tambah tab baru" di atas |

---

*BerkahKarya Ads Marketing AI Pro — Dev Guide v1.0*  
*Generated: 2026-03-21*
