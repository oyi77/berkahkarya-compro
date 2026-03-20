/**
 * BerkahKarya Ads Marketing AI — Netlify Function
 * POST /api/generate-ads
 * Body: { produk, target, keunggulan, platform, jumlah, tone }
 */

const PLATFORM_GUIDES = {
  TikTok: `Platform: TikTok.
- Hook WAJIB max 7 kata, super casual, langsung "nyamperin" audience
- Gaya scrollable: pendek, punchy, no formal
- JANGAN pakai bullet points
- CTA: "DM sekarang", "Link di bio", "Komen [kata kunci]"
- Tone: kayak temen ngobrol, bukan iklan`,

  'Meta Ads': `Platform: Meta Ads (Facebook/Instagram Feed).
- Hook curiosity atau pain, bisa lebih panjang
- Body: 3-5 kalimat, benefit-driven, boleh story singkat
- Bullet points: 2-3 poin BOLEH, efektif di Meta
- CTA: "Klik Learn More", "DM untuk info harga"`,

  Instagram: `Platform: Instagram (Caption/Story).
- Hook visual-first: bayangkan ini ada di atas foto produk
- Casual tapi polished
- Emoji secukupnya (jangan berlebihan)
- Hashtag bisa disebut di CTA
- CTA: "Tap link di bio", "DM 'INFO'"`,

  WhatsApp: `Platform: WhatsApp Blast.
- Personal tone: seperti pesan dari teman, bukan brand
- Mulai dengan nama pembuka opsional
- JANGAN pakai bullet — plain text saja
- CTA langsung ke nomor atau link
- Pendek, max 5 kalimat`,

  Marketplace: `Platform: Marketplace (Tokopedia/Shopee/Lazada).
- Benefit-first, langsung ke value
- Angka konkret: "sudah X terjual", "rating X.X"
- Urgency: stok terbatas, flash sale
- Kata kunci SEO marketplace jika relevan
- CTA: "Klik Beli Sekarang", "Promo hari ini saja"`,

  YouTube: `Platform: YouTube (Deskripsi / Ad Copy).
- Hook strong di 3 kata pertama — menangkap attention
- Body: boleh lebih panjang, storytelling works
- Bullet points 3-5 poin sangat efektif
- CTA: "Subscribe", "Link di deskripsi", "Watch full video"`
};

const TONE_GUIDES = {
  santai: 'Nada santai, relatable, seperti teman ngobrol. Hindari kata formal. Gunakan bahasa sehari-hari.',
  urgent: 'Nada urgent, FOMO tinggi. Gunakan kata: "Jangan sampai ketinggalan", "Stok hampir habis", "Hanya hari ini". Tekanan waktu dan kelangkaan.',
  educational: 'Nada edukatif, informatif. Jelaskan WHY sebelum WHAT. Tunjukkan expertise. Data/fakta membantu.',
  emotional: 'Nada emosional, storytelling. Mulai dari pain yang dalam. Buat reader merasa "itu aku". Transformasi.',
  aggressive: 'Nada bold, direct, tanpa basa-basi. Langsung ke masalah dan solusi. Berani. Punchline kuat.'
};

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { produk, target, keunggulan, platform = 'TikTok', jumlah = 2, tone = 'santai' } = body;

  if (!produk) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Produk wajib diisi' })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  const useGemini = !process.env.OPENAI_API_KEY && !!process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Fallback: generate template-based ads jika API tidak tersedia
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ads: generateFallback(produk, target, platform, jumlah, tone) })
    };
  }

  const systemPrompt = `Kamu adalah copywriter iklan profesional BerkahKarya — spesialis iklan digital Indonesia yang closing.

IDENTITAS:
- Bukan AI generik. Kamu adalah copywriter yang sudah bantu 500+ brand Indonesia
- Nulis iklan yang terasa manusiawi, natural — bukan template robot
- Setiap kata dipilih untuk KONVERSI, bukan sekedar informasi

GAYA BAHASA:
- Santai, natural, terasa ditulis manusia
- Kalimat pendek dan padat
- Emosional: pain, desire, fear of missing out, curiosity
- JANGAN: "Tentu saja!", "Dengan senang hati", kalimat bertele-tele, klise marketing lama

${PLATFORM_GUIDES[platform] || PLATFORM_GUIDES.TikTok}

TONE: ${TONE_GUIDES[tone] || TONE_GUIDES.santai}

OUTPUT FORMAT (JSON ARRAY, persis ini):
[
  {
    "angle": "nama angle (misal: Pain + Solusi, Social Proof, Fear + Urgency)",
    "hook": "kalimat pembuka yang langsung ngena",
    "body": "body copy 2-4 kalimat",
    "bullets": ["poin 1", "poin 2", "poin 3"],
    "cta": "call to action yang kuat + urgency"
  }
]

RULES:
- bullets bisa [] (array kosong) jika platform tidak butuh bullet
- Semua field wajib ada kecuali bullets yang boleh kosong
- Jangan tambahkan komentar atau teks di luar JSON array
- Generate tepat ${jumlah} variasi iklan
- Setiap variasi harus punya angle yang BERBEDA`;

  const userPrompt = `Generate ${jumlah} variasi iklan untuk:
- Produk/Jasa: ${produk}
- Target market: ${target || 'umum'}
${keunggulan ? `- Keunggulan utama: ${keunggulan}` : ''}
- Platform: ${platform}
- Tone: ${tone}`;

  try {
    let ads;

    if (useGemini) {
      // Gemini API
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
            ],
            generationConfig: { temperature: 0.85, maxOutputTokens: 2048 }
          })
        }
      );
      const data = await resp.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
      ads = parseAds(raw);
    } else {
      // OpenAI API
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.85,
          max_tokens: 2048,
          response_format: { type: 'json_object' }
        })
      });
      const data = await resp.json();
      const raw = data.choices?.[0]?.message?.content || '{"ads":[]}';
      const parsed = JSON.parse(raw);
      ads = parsed.ads || parsed || [];
    }

    if (!Array.isArray(ads) || ads.length === 0) {
      ads = generateFallback(produk, target, platform, jumlah, tone);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ ads })
    };
  } catch (err) {
    console.error('AI generation error:', err);
    // Fallback ke template
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ads: generateFallback(produk, target, platform, jumlah, tone) })
    };
  }
};

function parseAds(raw) {
  try {
    // Cari JSON array dalam string
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function generateFallback(produk, target, platform, jumlah, tone) {
  const prod = produk.slice(0, 40);
  const targ = target || 'semua orang';
  const angles = [
    {
      angle: 'Pain + Solusi Langsung',
      hook: `Capek nyoba banyak produk tapi hasilnya gitu-gitu aja?`,
      body: `${prod} hadir buat ${targ} yang udah bosan dengan solusi setengah-setengah. Ini bukan janji — ini udah terbukti.`,
      bullets: platform !== 'TikTok' && platform !== 'WhatsApp' ? ['Hasil terasa dalam 7 hari', 'Tanpa efek samping', 'Sudah ribuan yang buktiin'] : [],
      cta: 'DM sekarang — stok hari ini terbatas.'
    },
    {
      angle: 'Social Proof + FOMO',
      hook: `Ribuan orang udah switch ke ${prod}. Kamu masih nunggu apa?`,
      body: `${targ} yang udah coba bilang ini game-changer. Bukan karena hype — tapi karena emang kerja.`,
      bullets: platform !== 'TikTok' && platform !== 'WhatsApp' ? ['Rating 4.9/5 dari 2.000+ pengguna', 'Garansi puas atau uang kembali', 'Gratis ongkir hari ini'] : [],
      cta: 'Jangan jadi yang paling akhir tahu. Order sekarang.'
    },
    {
      angle: 'Transformasi + Desire',
      hook: `Bayangin hidup kamu setelah pakai ${prod}.`,
      body: `Bukan soal produknya — tapi soal rasa percaya diri yang datang setelahnya. ${targ} yang udah pakai ini ngerasain bedanya.`,
      bullets: platform !== 'TikTok' && platform !== 'WhatsApp' ? ['Perubahan nyata dalam 2 minggu', 'Direkomendasikan 98% pengguna', 'Formula eksklusif, hanya di sini'] : [],
      cta: 'Coba sekarang — buktiin sendiri.'
    },
    {
      angle: 'Urgency + Kelangkaan',
      hook: `PERINGATAN: Stok ${prod} hampir habis.`,
      body: `Batch bulan ini hampir sold out. Kalau kamu udah lama penasaran, ini saatnya — bukan besok.`,
      bullets: platform !== 'TikTok' && platform !== 'WhatsApp' ? ['Stok tersisa: sangat terbatas', 'Harga promo berakhir malam ini', 'No restock dalam waktu dekat'] : [],
      cta: 'Amankan sekarang sebelum kehabisan.'
    }
  ];

  return angles.slice(0, jumlah);
}
