/**
 * BerkahKarya Ads Marketing AI Pro — Netlify Function
 * Engine: Claude Opus 4 via LaoZhang API
 *
 * POST /api/generate-ads
 * Body: { produk, target, keunggulan, platform, jumlah, tone, mode }
 * mode: "ads" | "landing"
 */

const LAOZHANG_BASE = 'https://api.laozhang.ai/v1';
const LAOZHANG_KEY  = process.env.LAOZHANG_API_KEY || 'sk-Yme2SkDrhbSbCD2F56871153658d4c0e841cA2B51cD0F4E3';
const DEFAULT_MODEL = 'claude-opus-4-20250514';

// ── Platform guides ──────────────────────────────────────────────────────────
const PLATFORM_GUIDES = {
  TikTok: `Platform: TikTok.
- Hook WAJIB max 7 kata, super casual, langsung "nyamperin" audience
- Gaya scrollable: pendek, punchy, no formal
- JANGAN pakai bullet points
- CTA: "DM sekarang", "Link di bio", "Komen [kata kunci]"
- Tone: kayak temen ngobrol, bukan iklan`,

  'Meta Ads': `Platform: Meta Ads (Facebook/Instagram Feed).
- Hook curiosity atau pain, bisa lebih panjang
- Body: 3–5 kalimat, benefit-driven, boleh story singkat
- Bullet points 2–3 poin BOLEH, efektif di Meta
- CTA: "Klik Learn More", "DM untuk info harga"`,

  Instagram: `Platform: Instagram (Caption/Story).
- Hook visual-first: bayangkan ini di atas foto produk
- Casual tapi polished, emoji secukupnya
- CTA: "Tap link di bio", "DM 'INFO'"`,

  WhatsApp: `Platform: WhatsApp Blast.
- Personal tone: seperti pesan dari teman
- JANGAN pakai bullet — plain text saja
- CTA langsung ke nomor atau link. Max 5 kalimat.`,

  Marketplace: `Platform: Marketplace (Tokopedia/Shopee/Lazada).
- Benefit-first, angka konkret: "sudah X terjual"
- Urgency: stok terbatas, flash sale
- CTA: "Klik Beli Sekarang"`,

  YouTube: `Platform: YouTube (Deskripsi / Ad Script).
- Hook strong di 3 kata pertama
- Body boleh lebih panjang, storytelling works
- Bullet points 3–5 poin sangat efektif
- CTA: "Subscribe", "Link di deskripsi"`
};

const TONE_GUIDES = {
  santai:      'Nada santai, relatable, bahasa sehari-hari.',
  urgent:      'FOMO tinggi. Gunakan: stok hampir habis, hanya hari ini, jangan sampai ketinggalan.',
  educational: 'Edukatif, informatif, tunjukkan expertise, pakai data/fakta.',
  emotional:   'Emosional, storytelling. Mulai dari pain yang dalam. Transformasi.',
  aggressive:  'Bold, direct, tanpa basa-basi. Punchline kuat.'
};

// ── Main handler ─────────────────────────────────────────────────────────────
exports.handler = async function(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { produk, target, keunggulan, platform = 'TikTok', jumlah = 2, tone = 'santai', mode = 'ads' } = body;

  // budget_guide & competitor modes don't require produk
  if (!produk && !['budget_guide', 'competitor'].includes(mode)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Produk wajib diisi' }) };
  }

  try {
    if (mode === 'landing') {
      const script = await generateLandingPage(produk, target, keunggulan, tone);
      return { statusCode: 200, headers, body: JSON.stringify({ script }) };
    } else if (mode === 'budget_guide') {
      const guide = await generateBudgetGuide(produk, target, keunggulan);
      return { statusCode: 200, headers, body: JSON.stringify({ guide }) };
    } else if (mode === 'competitor') {
      const { iklan_kompetitor } = body;
      if (!iklan_kompetitor) return { statusCode: 400, headers, body: JSON.stringify({ error: 'iklan_kompetitor wajib diisi' }) };
      const result = await analyzeCompetitor(iklan_kompetitor, produk, target);
      return { statusCode: 200, headers, body: JSON.stringify({ result }) };
    } else {
      const ads = await generateAds(produk, target, keunggulan, platform, jumlah, tone);
      return { statusCode: 200, headers, body: JSON.stringify({ ads }) };
    }
  } catch (err) {
    console.error('Generation error:', err.message);
    const fallback = mode === 'landing'
      ? { script: generateFallbackLanding(produk, target, keunggulan) }
      : { ads: generateFallbackAds(produk, target, platform, jumlah, tone) };
    return { statusCode: 200, headers, body: JSON.stringify(fallback) };
  }
};

// ── Generate Ads ─────────────────────────────────────────────────────────────
async function generateAds(produk, target, keunggulan, platform, jumlah, tone) {
  const systemPrompt = `Kamu adalah Asisten BerkahKarya Ads Marketing.

TUJUAN:
Membuat iklan yang langsung bisa dipakai dan berpotensi menghasilkan penjualan.

ATURAN WAJIB — Gunakan 2 angle berbeda:
- IKLAN 1: Cause of Inaction (fear/pain) → Tekankan konsekuensi jika tidak bertindak
- IKLAN 2: False Belief atau Promise & Hope → Ubah cara pikir atau bangun harapan

STRUKTUR SETIAP IKLAN:
🎯 ANGLE → nama angle yang dipakai
🪝 HOOK → harus kuat, stop scroll, tidak boleh netral, sesuai angle
💥 BODY → Problem → Agitate → Solution
  WAJIB: tunjukkan hasil (output), kurangi risk/effort/time delay, tambahkan social proof + 1 kalimat objection handling
📌 BULLET → manfaat konkret (opsional, skip jika platform tidak cocok)
🔥 CTA → tegas, ada urgency, arahkan ke chat/klik/beli

PLATFORM:
${PLATFORM_GUIDES[platform] || PLATFORM_GUIDES.TikTok}

GAYA BAHASA:
- Natural, manusiawi, bukan template robot
- Kalimat pendek dan padat
- Emosional: pain, desire, FOMO, curiosity
- JANGAN: "Tentu saja!", "Dengan senang hati", bertele-tele

OUTPUT FORMAT — JSON array persis ini (jangan tambah teks lain):
[
  {
    "angle_type": "cause_of_inaction",
    "angle": "nama angle (fear/pain based)",
    "hook": "hook yang stop scroll",
    "body": "body copy dengan PAS formula + social proof + objection handling",
    "bullets": ["manfaat konkret 1", "manfaat konkret 2", "manfaat konkret 3"],
    "cta": "CTA tegas + urgency"
  },
  {
    "angle_type": "promise_hope",
    "angle": "nama angle (false belief / promise & hope)",
    "hook": "hook yang ubah cara pikir",
    "body": "body copy dengan PAS formula + social proof + objection handling",
    "bullets": ["manfaat konkret 1", "manfaat konkret 2", "manfaat konkret 3"],
    "cta": "CTA tegas + urgency"
  }
]

RULES:
- bullets bisa [] jika platform TikTok/WhatsApp
- WAJIB: iklan 1 dan 2 harus beda EMOSI dan PENDEKATAN — jangan mirip
- Generate tepat 2 iklan (bisa lebih jika diminta)`;

  const userPrompt = `Generate iklan untuk:
- Produk/Jasa: ${produk}
- Target market: ${target || 'umum'}
${keunggulan ? `- Keunggulan: ${keunggulan}` : ''}
- Platform: ${platform}`;

  const raw = await callClaude(systemPrompt, userPrompt);
  const ads = parseJSON(raw);
  if (!Array.isArray(ads) || ads.length === 0) throw new Error('Parse failed');
  return ads;
}

// ── Generate Landing Page Script ─────────────────────────────────────────────
async function generateLandingPage(produk, target, keunggulan, tone) {
  const systemPrompt = `Kamu adalah Asisten BerkahKarya Ads Marketing.

TUJUAN: Membuat landing page yang mendorong orang untuk beli / chat.

WAJIB MENGGUNAKAN:
1. PAS (Problem – Agitate – Solution)
2. PSP (Proof – Solution – Proof)

STRUKTUR:
- HEADLINE: Fokus pain atau "How to", maks 10 kata, harus menampar
- SUBHEADLINE: Menenangkan + memperjelas hasil
- HERO COPY: Relate → agitate → solusi
- BELIEF SHIFT: Gunakan "Bukan karena X, tapi karena Y"
- BENEFITS: Fokus hasil (output), bukan fitur
- SOCIAL PROOF: Angka / pengalaman / validasi
- OBJECTION HANDLER: Jawab takut gagal, takut ga cocok, takut ribet
- OFFER: Formula Result / (Risk × Time × Effort)
- VALUE STACKING: Produk utama + Bonus + Support + Akses tambahan
- URGENCY: Terbatas, bisa ditutup, realistis
- CTA: Tegas, arahkan ke aksi
- UPSELL MINDSET: Sisipkan mulai dari basic, bisa upgrade

OUTPUT FORMAT — JSON persis ini (jangan tambah teks lain):
{
  "headline": "Pain/How-to headline, maks 10 kata, menampar",
  "subheadline": "Menenangkan + memperjelas hasil (1-2 kalimat)",
  "hero_copy": "Relate → agitate → solusi (2-3 kalimat PAS)",
  "belief_shift": "Bukan karena X, tapi karena Y",
  "benefits": [
    {"icon": "emoji", "title": "hasil/output konkret", "desc": "1 kalimat fokus output bukan fitur"}
  ],
  "social_proof": "Angka + validasi konkret (mis: '2.500+ pelanggan, rating 4.9/5')",
  "objection_handler": [
    {"objection": "takut gagal / takut ga cocok / takut ribet", "answer": "jawaban meyakinkan singkat"}
  ],
  "offer": "Value proposition dengan formula Result / (Risk × Time × Effort)",
  "value_stack": ["Produk utama: ...", "Bonus: ...", "Support: ...", "Akses tambahan: ..."],
  "urgency": "Kalimat urgensi realistis + batas konkret",
  "cta_primary": "Teks tombol utama (tegas, arahkan ke WA/beli)",
  "cta_secondary": "Teks tombol soft (pelajari lebih lanjut)",
  "closing_copy": "Kalimat penutup emosional",
  "upsell_hint": "Kalimat upsell mindset: mulai basic, bisa upgrade",
  "faq": [
    {"q": "pertanyaan umum", "a": "jawaban singkat"}
  ],
  "strategi": "Gunakan landing page ini untuk closing setelah iklan. Arahkan ke WhatsApp untuk final closing."
}

RULES:
- Bahasa Indonesia natural, tidak kaku
- Benefit minimal 4 poin (output/hasil, bukan fitur!)
- Objection handler: WAJIB jawab 3 kekhawatiran
- FAQ minimal 3 pertanyaan
- Semua copy harus closing-oriented`;

  const userPrompt = `Buat landing page script untuk:
- Produk/Jasa: ${produk}
- Target market: ${target || 'umum'}
${keunggulan ? `- Keunggulan: ${keunggulan}` : ''}
- Tone: ${tone}`;

  const raw = await callClaude(systemPrompt, userPrompt);
  return parseJSON(raw);
}

// ── Budget Guide ─────────────────────────────────────────────────────────────
async function generateBudgetGuide(produk, target, keunggulan) {
  const systemPrompt = `Kamu adalah Asisten BerkahKarya Ads Marketing.
Berikan panduan budget & evaluasi iklan yang sederhana dan langsung bisa dipakai.

OUTPUT FORMAT — JSON persis ini:
{
  "budget_rule": "Gunakan 30%–100% dari profit produk sebagai budget iklan",
  "testing_rule": "Jalankan iklan minimal 3 hari. Jangan ambil keputusan terlalu cepat.",
  "evaluasi": [
    {"kondisi": "Budget > Revenue", "aksi": "Ubah angle & hook — iklan belum resonan"},
    {"kondisi": "Budget ≈ Revenue", "aksi": "Optimasi copy & landing page — traffic ok, closing lemah"},
    {"kondisi": "Revenue > Budget", "aksi": "Lanjut & scale perlahan — jangan ubah terlalu banyak"}
  ],
  "next_step": [
    {"kondisi": "Ada klik tapi belum closing", "aksi": "Perbaiki landing page & CTA"},
    {"kondisi": "Sudah closing", "aksi": "Fokus scale & upsell — jangan sentuh yang sudah profit"}
  ],
  "warning": "Jangan lanjutkan iklan yang rugi tanpa perubahan signifikan",
  "rekomendasi_untuk_produk": "Rekomendasi spesifik budget & strategi untuk produk ini (2-3 kalimat)"
}`;

  const userPrompt = `Buat panduan budget iklan untuk:
- Produk/Jasa: ${produk || 'produk digital'}
- Target: ${target || 'umum'}
${keunggulan ? `- Keunggulan: ${keunggulan}` : ''}`;

  const raw = await callClaude(systemPrompt, userPrompt);
  return parseJSON(raw);
}

// ── Competitor Analysis ───────────────────────────────────────────────────────
async function analyzeCompetitor(iklanKompetitor, produk, target) {
  const systemPrompt = `Kamu adalah Asisten BerkahKarya Ads Marketing — spesialis analisa iklan kompetitor.

TUGAS: Analisa iklan kompetitor, temukan kelemahannya, lalu buat 2 versi iklan yang lebih tajam.

OUTPUT FORMAT — JSON persis ini:
{
  "analisa": {
    "angle": "Angle yang dipakai kompetitor",
    "hook_strength": "kuat / lemah / sedang",
    "hook_analysis": "Kenapa hook ini efektif / tidak efektif",
    "emosi": "Emosi utama yang dipancing (fear, desire, curiosity, dll)",
    "struktur": "Breakdown struktur iklan kompetitor"
  },
  "kelemahan": [
    "kelemahan 1 (spesifik, actionable)",
    "kelemahan 2",
    "kelemahan 3"
  ],
  "iklan_baru": [
    {
      "angle_type": "cause_of_inaction",
      "angle": "nama angle (lebih tajam dari kompetitor)",
      "hook": "hook yang lebih kuat — stop scroll",
      "body": "body copy PAS yang lebih emosional + objection handling",
      "bullets": ["manfaat konkret 1", "manfaat konkret 2", "manfaat konkret 3"],
      "cta": "CTA tegas + urgency"
    },
    {
      "angle_type": "false_belief",
      "angle": "nama angle (ubah false belief kompetitor)",
      "hook": "hook yang challenge asumsi audiens",
      "body": "body copy yang beda pendekatan + objection handling",
      "bullets": ["manfaat konkret 1", "manfaat konkret 2", "manfaat konkret 3"],
      "cta": "CTA tegas + urgency"
    }
  ],
  "rekomendasi": "Insight utama dari analisa ini — apa yang harus dioptimalkan (2-3 kalimat)"
}

RULES:
- Jujur, critical — jangan validasi iklan kompetitor yang jelek
- Iklan baru HARUS lebih tajam, lebih emosional, lebih berpotensi closing
- bullets bisa [] kalau tidak relevan`;

  const userPrompt = `Analisa iklan kompetitor ini:

---
${iklanKompetitor}
---

${produk ? `Produk kita: ${produk}` : ''}
${target ? `Target market: ${target}` : ''}`;

  const raw = await callClaude(systemPrompt, userPrompt);
  return parseJSON(raw);
}

// ── Claude API call ──────────────────────────────────────────────────────────
async function callClaude(systemPrompt, userPrompt) {
  const resp = await fetch(`${LAOZHANG_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LAOZHANG_KEY}`
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.85,
      max_tokens: 3000
    })
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Claude API ${resp.status}: ${err.slice(0, 200)}`);
  }

  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '';
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function parseJSON(raw) {
  try {
    const arr = raw.match(/\[[\s\S]*\]/);
    if (arr) return JSON.parse(arr[0]);
    const obj = raw.match(/\{[\s\S]*\}/);
    if (obj) return JSON.parse(obj[0]);
    return JSON.parse(raw);
  } catch { return null; }
}

function generateFallbackAds(produk, target, platform, jumlah) {
  const prod = produk.slice(0, 40);
  const targ = target || 'semua orang';
  const base = [
    { angle: 'Pain + Solusi', hook: `Capek nyoba banyak produk tapi gitu-gitu aja?`, body: `${prod} hadir buat ${targ} yang udah bosen solusi setengah-setengah.`, bullets: platform !== 'TikTok' ? ['Terbukti efektif', 'Tanpa efek samping', 'Ribuan sudah buktiin'] : [], cta: 'DM sekarang — stok terbatas.' },
    { angle: 'Social Proof + FOMO', hook: `Ribuan orang udah switch ke ${prod}. Kamu masih nunggu apa?`, body: `${targ} yang udah coba bilang ini game-changer.`, bullets: platform !== 'TikTok' ? ['Rating 4.9/5', 'Garansi puas', 'Gratis ongkir'] : [], cta: 'Order sekarang.' },
    { angle: 'Transformasi', hook: `Bayangin hidup kamu setelah pakai ${prod}.`, body: `Bukan soal produknya — soal rasa percaya diri yang datang setelahnya.`, bullets: [], cta: 'Coba sekarang.' },
    { angle: 'Urgency', hook: `PERINGATAN: Stok ${prod} hampir habis.`, body: `Batch bulan ini hampir sold out. Kalau udah lama penasaran, ini saatnya.`, bullets: [], cta: 'Amankan sebelum kehabisan.' }
  ];
  return base.slice(0, jumlah);
}

function generateFallbackLanding(produk, target, keunggulan) {
  return {
    headline: `Solusi Terbaik untuk ${target || 'Kamu'}`,
    subheadline: `${produk} — hasil nyata, bukan janji`,
    hero_copy: `Udah capek coba banyak solusi tapi hasilnya sama aja? ${produk} hadir dengan pendekatan yang berbeda.`,
    benefits: [
      { icon: '⚡', title: 'Hasil Cepat', desc: 'Perubahan nyata dalam waktu singkat' },
      { icon: '✅', title: 'Terbukti', desc: 'Sudah ribuan yang merasakan manfaatnya' },
      { icon: '🛡️', title: 'Aman', desc: 'Garansi kepuasan atau uang kembali' },
      { icon: '💰', title: 'Value Terbaik', desc: keunggulan || 'Kualitas premium, harga terjangkau' }
    ],
    social_proof: '2.500+ pelanggan puas dengan rating 4.9/5',
    objection_handler: [
      { objection: 'Apakah ini benar-benar works?', answer: 'Ya, sudah terbukti di ribuan pengguna. Ada garansi uang kembali jika tidak puas.' },
      { objection: 'Berapa lama hasilnya terasa?', answer: 'Kebanyakan pelanggan merasakan perbedaan dalam 7–14 hari pertama.' }
    ],
    offer: 'Dapatkan akses penuh + bonus eksklusif untuk order hari ini',
    urgency: 'Penawaran ini hanya berlaku untuk slot terbatas bulan ini',
    cta_primary: 'Dapatkan Sekarang',
    cta_secondary: 'Pelajari Lebih Lanjut',
    closing_copy: 'Jangan tunggu sempurna. Mulai hari ini, ubah hidup kamu.',
    faq: [
      { q: 'Apakah ada garansi?', a: 'Ya, garansi puas atau uang kembali dalam 30 hari.' },
      { q: 'Bagaimana cara order?', a: 'Klik tombol di atas, isi form, dan tim kami akan menghubungi kamu.' },
      { q: 'Apakah bisa konsultasi dulu?', a: 'Tentu, hubungi kami via WhatsApp untuk konsultasi gratis.' }
    ]
  };
}
