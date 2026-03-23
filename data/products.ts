const WA = 'https://wa.me/6285732740006';
const STORE = 'https://lynk.id/jendralbot';

export interface ProductFull {
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; buttons: { text: string; href: string; primary?: boolean }[] };
  problem: { hook: string; pains: { icon: string; text: string }[]; bridge: string };
  features: { icon: string; title: string; desc: string }[];
  howItWorks: { title: string; steps: { num: string; title: string; desc: string }[] };
  testimonials: { quote: string; name: string; role: string; avatar: string }[];
  pricing: { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }[];
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; description: string; button: { text: string; href: string } };
}

export const productsFullData: Record<string, Record<string, ProductFull>> = {
  'ai-video-studio': {
    id: {
      slug: 'ai-video-studio',
      meta: { title: 'AI Video Studio — Foto Jadi Video TikTok Viral dalam 3 Menit | BerkahKarya', description: 'Upload foto produk → video cinematic AI siap upload ke TikTok, IG, YouTube. Tanpa editor, tanpa software. Mulai Rp 49K/bulan.' },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO · Live & Running',
        title: 'Foto Produk Jadi Video\nTikTok Viral dalam 3 Menit.',
        description: 'Kompetitor kamu upload 10 video seminggu pakai AI. Kamu masih bayar editor Rp 500K/video dan nunggu 3 hari. Sekarang bisa balik 180°: upload foto → video cinematic siap publish — langsung dari Telegram, tanpa skill editing.',
        buttons: [
          { text: '🚀 Coba Gratis — 3 Kredit Langsung Aktif', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AI%20Video%20Studio%20gratis`, primary: true },
          { text: 'Lihat Harga', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'Kenapa konten kamu gak kunjung viral padahal upload tiap hari?',
        pains: [
          { icon: '😩', text: 'Views stuck di 200. Foto statis kalah di FYP — platform reward konten bergerak cinematic, bukan foto diam.' },
          { icon: '⏳', text: 'Edit 1 video = 3–4 jam habis. Premiere Pro, CapCut, After Effects — semua makan waktu, hasilnya belum tentu bagus.' },
          { icon: '💸', text: 'Bayar editor Rp 300–700K per video, margin tipis. Satu video iklan sudah habiskan hampir semua profit.' },
          { icon: '📉', text: 'Upload 3x seminggu sudah kelelahan. Kompetitor yang pakai AI bisa upload 2x sehari tanpa tambah effort.' },
        ],
        bridge: 'AI Video Studio selesaikan ini semua: upload foto → video cinematic dalam 3 menit, biaya Rp 2.800–8.000/video.',
      },
      features: [
        { icon: '📸', title: 'Upload Foto, Dapat Video', desc: 'Tidak perlu shooting. Upload foto produk via Telegram → AI generate video cinematic siap upload ke semua platform.' },
        { icon: '⚡', title: '3 Menit Per Video', desc: 'Yang dulu makan 3-4 jam kini selesai dalam 3 menit. Output langsung ke HP, siap publish.' },
        { icon: '🎭', title: '8 Niche Kategori', desc: 'Fashion, kuliner, elektronik, kosmetik, properti, dan 3 kategori lainnya. Setiap niche punya style visual yang tepat.' },
        { icon: '🤖', title: '4 AI Providers', desc: 'Sistem pilih AI terbaik per request — kualitas konsisten, tidak bergantung satu provider.' },
        { icon: '💰', title: 'Rp 2.800–8.000/Video', desc: 'Dibanding editor freelance Rp 300–700K/video, ini hemat 97%. Margin bisnis kamu langsung naik.' },
        { icon: '📱', title: 'Semua Platform Siap', desc: 'TikTok, Instagram Reels, YouTube Shorts, Facebook — semua format output tersedia tanpa edit tambahan.' },
      ],
      howItWorks: {
        title: 'Semudah Chat WhatsApp',
        steps: [
          { num: '1', title: 'Chat Telegram Bot', desc: 'Buka bot @BerkahKaryaAIStudio di Telegram. Tidak perlu install app atau daftar panjang.' },
          { num: '2', title: 'Upload Foto Produk', desc: 'Kirim foto produk kamu. Bisa dari kamera HP biasa — AI yang urus pencahayaan dan komposisi.' },
          { num: '3', title: 'AI Generate Video', desc: 'Dalam 3 menit, video cinematic siap. Download langsung ke HP, publish ke semua platform.' },
        ],
      },
      testimonials: [
        { quote: 'Dulu bikin 1 video butuh 3 hari dan bayar editor Rp 500K. Sekarang 3 menit dan Rp 8K. Views naik 4x dalam bulan pertama.', name: 'Rina A.', role: 'Online Seller Fashion, Bandung', avatar: '👩‍💼' },
        { quote: 'Upload 2x sehari sekarang, padahal dulu 3x seminggu aja udah kelelahan. FYP mulai banjir sejak pakai video AI ini.', name: 'Dani R.', role: 'Konten Kreator UMKM, Surabaya', avatar: '👨‍💻' },
        { quote: 'CTR iklan naik dari 1.2% ke 4.8% begitu ganti dari foto statis ke video AI. ROAS juga naik drastis.', name: 'Sari M.', role: 'Digital Marketer, Jakarta', avatar: '👩‍💻' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 49K', period: '/bulan', features: ['10 video/bulan', 'Semua 8 niche', 'Resolusi 720p', '3 kredit gratis perdana', 'Support via Telegram'], cta: { text: 'Mulai Gratis', href: `${WA}?text=Saya%20mau%20paket%20Starter%20AI%20Video%20Studio` } },
        { name: 'Creator', price: 'Rp 149K', period: '/bulan', highlight: true, features: ['50 video/bulan', 'Semua 8 niche', 'Resolusi 1080p', 'Priority render (lebih cepat)', 'Kredit tidak kadaluarsa', 'Priority support'], cta: { text: 'Pilih Creator', href: `${WA}?text=Saya%20mau%20paket%20Creator%20AI%20Video%20Studio` } },
        { name: 'Agency', price: 'Rp 399K', period: '/bulan', features: ['200 video/bulan', 'Custom branding', 'Resolusi 4K', 'API access', 'Dedicated support', 'White-label option'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Foto dari HP biasa bisa?', a: 'Ya. Kualitas foto minimal cukup — AI yang tingkatkan visual dan buat gerak. Tidak perlu kamera profesional.' },
          { q: 'Video-nya kelihatan AI banget tidak?', a: 'Tidak. Output kami sudah dioptimasi agar terlihat natural dan cinematic. Banyak user tidak tahu ini video AI.' },
          { q: 'Berapa lama prosesnya sebenarnya?', a: 'Rata-rata 2-5 menit per video. Di jam ramai bisa sampai 8 menit, tapi paket Creator dapat priority render.' },
          { q: '3 kredit gratis itu untuk berapa video?', a: '1 kredit = 2 video, jadi 3 kredit = 6 video gratis. Tidak perlu kartu kredit untuk mulai.' },
          { q: 'Bisa untuk produk makanan/kuliner?', a: 'Ya, kuliner adalah salah satu dari 8 niche kami. Hasilnya sangat cinematic dan menggugah selera.' },
        ],
      },
      cta: { title: 'Kompetitor Kamu Sudah Upload 10 Video Hari Ini', description: 'Mulai 3 kredit gratis sekarang. Tidak perlu kartu kredit. Setup 2 menit via Telegram.', button: { text: 'Coba Gratis Sekarang →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AI%20Video%20Studio%203%20kredit%20gratis` } },
    },
    en: {
      slug: 'ai-video-studio',
      meta: { title: 'AI Video Studio — Product Photo to Viral TikTok Video in 3 Minutes | BerkahKarya', description: 'Upload product photo → cinematic AI video ready for TikTok, IG, YouTube. No editor, no software. From Rp 49K/month.' },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO · Live & Running',
        title: 'Product Photo to\nViral TikTok Video in 3 Minutes.',
        description: 'Your competitors upload 10 videos a week with AI. You\'re still paying Rp 500K/video and waiting 3 days. Flip it 180°: upload photo → cinematic video ready to publish — straight from Telegram, zero editing skills needed.',
        buttons: [
          { text: '🚀 Try Free — 3 Credits Activated Now', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AI%20Video%20Studio%20free`, primary: true },
          { text: 'See Pricing', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'Why isn\'t your content going viral even though you post every day?',
        pains: [
          { icon: '😩', text: 'Views stuck at 200. Static photos lose on FYP — platforms reward cinematic moving content, not still images.' },
          { icon: '⏳', text: 'Editing 1 video = 3–4 hours gone. Premiere Pro, CapCut, After Effects — all time-consuming, results not guaranteed.' },
          { icon: '💸', text: 'Paying Rp 300–700K per video editor with thin margins. One ad video already eats almost all your profit.' },
          { icon: '📉', text: 'Posting 3x a week already exhausting. Competitors using AI post 2x daily without extra effort.' },
        ],
        bridge: 'AI Video Studio solves all of this: upload photo → cinematic video in 3 minutes at Rp 2,800–8,000/video.',
      },
      features: [
        { icon: '📸', title: 'Upload Photo, Get Video', desc: 'No shooting needed. Upload product photo via Telegram → AI generates cinematic video ready for all platforms.' },
        { icon: '⚡', title: '3 Minutes Per Video', desc: 'What used to take 3-4 hours now takes 3 minutes. Output goes straight to your phone, ready to publish.' },
        { icon: '🎭', title: '8 Niche Categories', desc: 'Fashion, food, electronics, cosmetics, property, and 3 more. Each niche has the right visual style.' },
        { icon: '🤖', title: '4 AI Providers', desc: 'System picks the best AI per request — consistent quality, not dependent on a single provider.' },
        { icon: '💰', title: 'Rp 2,800–8,000/Video', desc: 'Compared to freelance editors at Rp 300–700K/video, this saves 97%. Your business margins go up immediately.' },
        { icon: '📱', title: 'All Platforms Ready', desc: 'TikTok, Instagram Reels, YouTube Shorts, Facebook — all formats available without additional editing.' },
      ],
      howItWorks: {
        title: 'As Easy as WhatsApp Chat',
        steps: [
          { num: '1', title: 'Chat the Telegram Bot', desc: 'Open @BerkahKaryaAIStudio on Telegram. No app installation or lengthy registration.' },
          { num: '2', title: 'Upload Product Photo', desc: 'Send your product photo. Regular phone camera works — AI handles lighting and composition.' },
          { num: '3', title: 'AI Generates Video', desc: 'In 3 minutes, your cinematic video is ready. Download to phone, publish to all platforms.' },
        ],
      },
      testimonials: [
        { quote: 'Used to take 3 days and Rp 500K per video. Now 3 minutes and Rp 8K. Views increased 4x in the first month.', name: 'Rina A.', role: 'Fashion Online Seller, Bandung', avatar: '👩‍💼' },
        { quote: 'Now posting 2x daily, whereas I was exhausted at 3x weekly before. FYP started flooding since using AI video.', name: 'Dani R.', role: 'UMKM Content Creator, Surabaya', avatar: '👨‍💻' },
        { quote: 'Ad CTR went from 1.2% to 4.8% after switching from static photos to AI video. ROAS also jumped dramatically.', name: 'Sari M.', role: 'Digital Marketer, Jakarta', avatar: '👩‍💻' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 49K', period: '/mo', features: ['10 videos/month', 'All 8 niches', '720p resolution', '3 free credits on signup', 'Telegram support'], cta: { text: 'Start Free', href: `${WA}?text=I%20want%20the%20Starter%20AI%20Video%20Studio%20plan` } },
        { name: 'Creator', price: 'Rp 149K', period: '/mo', highlight: true, features: ['50 videos/month', 'All 8 niches', '1080p resolution', 'Priority render', 'Credits never expire', 'Priority support'], cta: { text: 'Choose Creator', href: `${WA}?text=I%20want%20the%20Creator%20AI%20Video%20Studio%20plan` } },
        { name: 'Agency', price: 'Rp 399K', period: '/mo', features: ['200 videos/month', 'Custom branding', '4K resolution', 'API access', 'Dedicated support', 'White-label option'], cta: { text: 'Contact Us', href: WA } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Can I use photos from a regular phone camera?', a: 'Yes. Minimum photo quality is enough — AI enhances the visuals and creates movement. No professional camera needed.' },
          { q: 'Will the video look obviously AI-generated?', a: 'No. Our output is optimized to look natural and cinematic. Many users can\'t tell it\'s AI-generated.' },
          { q: 'How long does processing actually take?', a: 'Average 2-5 minutes per video. During peak hours up to 8 minutes, but Creator plan gets priority rendering.' },
          { q: 'What are the 3 free credits?', a: '1 credit = 2 videos, so 3 credits = 6 free videos. No credit card needed to start.' },
          { q: 'Does it work for food/culinary products?', a: 'Yes, culinary is one of our 8 niches. Results are very cinematic and appetizing.' },
        ],
      },
      cta: { title: 'Your Competitors Already Uploaded 10 Videos Today', description: 'Start with 3 free credits now. No credit card. 2-minute setup via Telegram.', button: { text: 'Try Free Now →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AI%20Video%20Studio%203%20free%20credits` } },
    },
  },

  'adforge-ai': {
    id: {
      slug: 'adforge-ai',
      meta: { title: 'AdForge AI — 19 Tools Iklan yang Benar-Benar Closing | BerkahKarya', description: 'Bukan ChatGPT manual. 19 tools terintegrasi: Hook Generator, VSL Script, ROAS Calculator, Retargeting. Generate iklan yang closing dalam <30 detik.' },
      hero: {
        eyebrow: '📢 ADFORGE AI · 50 Slot Early Bird Tersisa',
        title: 'Budget Habis. ROAS\nTetap Segitu-Segitu Aja?',
        description: 'Masalahnya bukan di budget — masalahnya di copywriting iklan yang salah. AdForge adalah platform AI dengan 19 tools terintegrasi yang bikin iklan converting dari riset pain audience, hook, VSL script, sampai retargeting sequence.',
        buttons: [
          { text: '💬 Coba Gratis via WhatsApp', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AdForge%20AI`, primary: true },
          { text: 'Lihat Demo', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Capek bikin iklan yang ga closing? Ini akar masalahnya.',
        pains: [
          { icon: '😩', text: 'Nulis copy sendiri lama banget — mikir hook, body, CTA sambil jaga toko. Habis waktu, belum tentu hasilnya bagus.' },
          { icon: '💸', text: 'Boost postingan Rp 500K, hasilnya 0 order. Budget habis tapi ROAS jelek — karena copywriting-nya yang salah, bukan budget-nya.' },
          { icon: '😵', text: 'Iklan kompetitor bisa closing ratusan, punya sendiri sepi. Padahal produknya sama bagusnya — beda di copywriting formula.' },
          { icon: '🔄', text: 'Pakai ChatGPT manual tapi hasilnya generik, tidak convert. Perlu workflow khusus untuk iklan, bukan general AI.' },
        ],
        bridge: 'AdForge bukan ChatGPT. Ini 19 tools dengan workflow 5-stage yang didesain khusus untuk bikin iklan yang closing.',
      },
      features: [
        { icon: '🪝', title: 'Hook Generator + Scorer', desc: 'Generate 10+ hook berbeda, lalu AI score mana yang paling likely stop scroll. Tidak perlu tebak-tebak.' },
        { icon: '📝', title: 'VSL Script Lengkap', desc: 'Video Sales Letter script siap record — dari opening hook, problem agitation, solution, proof, sampai CTA. Satu klik.' },
        { icon: '🎯', title: 'Pain Audience Research', desc: 'AI riset exact pain point target market kamu. Copywriting berbasis pain = iklan yang lebih connect.' },
        { icon: '📊', title: 'ROAS Calculator', desc: 'Kalkulasi budget optimal sebelum launch. Tahu berapa spend yang diperlukan untuk target revenue.' },
        { icon: '🔄', title: 'Retargeting Sequence', desc: '7-day retargeting sequence siap pakai — followup otomatis untuk yang sudah lihat iklan tapi belum beli.' },
        { icon: '⚡', title: '<30 Detik Per Output', desc: 'Dari input produk dan target → iklan lengkap 2 variasi dalam kurang dari 30 detik. Bukan jam, bukan hari.' },
      ],
      howItWorks: {
        title: '3 Langkah, Iklan Siap Pakai',
        steps: [
          { num: '1', title: 'Ketik Produk & Target', desc: 'Di WhatsApp/Telegram — sebutkan produk dan target pasar. Contoh: "jual hijab premium untuk wanita 25-35 tahun".' },
          { num: '2', title: 'AI Generate 2 Variasi Iklan', desc: 'Sistem langsung buat angle + hook + body + bullet + CTA — 2 variasi berbeda dalam <30 detik.' },
          { num: '3', title: 'Copy, Paste, Iklankan', desc: 'Tempel ke Meta Ads, TikTok Ads, atau feed organik. Pilih variasi terbaik dan jalankan.' },
        ],
      },
      testimonials: [
        { quote: 'ROAS naik dari 1.8x ke 4.2x dalam 2 minggu setelah ganti copywriting pakai AdForge. Budget sama, revenue 2x lipat.', name: 'Budi K.', role: 'E-commerce Owner, Yogyakarta', avatar: '👨‍💼' },
        { quote: 'Biasanya nulis 1 iklan itu 2-3 jam. Sekarang 30 detik dan hasilnya lebih bagus. CTR naik dari 0.8% ke 3.2%.', name: 'Dewi S.', role: 'Digital Marketing Freelancer', avatar: '👩‍💻' },
        { quote: 'Spent Rp 5 juta/bulan di ads, 70% hasilnya nol. Setelah pakai formula AdForge, semua campaign di atas ROAS 3x.', name: 'Arif M.', role: 'Brand Owner, Skincare', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 299K', period: '/bulan', features: ['50 copy/bulan', '5 tools dasar', 'Hook + Body + CTA', 'Meta & TikTok ready', 'Email support'], cta: { text: 'Pilih Starter', href: `${WA}?text=Saya%20mau%20AdForge%20Starter` } },
        { name: 'Growth', price: 'Rp 799K', period: '/bulan', highlight: true, features: ['200 copy/bulan', '19 tools lengkap', 'VSL Script', 'Retargeting sequence', 'ROAS Calculator', 'Priority support'], cta: { text: 'Pilih Growth', href: `${WA}?text=Saya%20mau%20AdForge%20Growth` } },
        { name: 'Agency', price: 'Custom', period: '', features: ['Unlimited copy', 'White-label', 'Team access', 'Custom tools', 'API access', 'Dedicated support'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Bedanya sama ChatGPT?', a: 'ChatGPT adalah general AI. AdForge punya 19 tools dengan workflow spesifik untuk iklan — Hook Scorer, Pain Research, ROAS Calculator, Retargeting Sequence. Hasilnya jauh lebih targeted dan conversion-focused.' },
          { q: 'Sudah terbukti untuk jenis produk apa?', a: 'Fashion, skincare, F&B, elektronik, properti, jasa, digital product — hampir semua kategori sudah ada user yang profit. Yang penting ada target market yang jelas.' },
          { q: 'Apakah bisa untuk TikTok Ads juga?', a: 'Ya. AdForge generate copy khusus untuk Meta Ads dan TikTok Ads — format dan tone berbeda karena audiensnya berbeda.' },
          { q: '50 slot early bird artinya apa?', a: 'User early bird dapat harga terkunci seumur hidup + akses ke semua fitur baru gratis. Begitu slot penuh, harga naik.' },
        ],
      },
      cta: { title: 'Iklan Berikutnya Bisa Closing — Kalau Copywriting-nya Benar', description: '50 slot early bird, harga terkunci seumur hidup. Coba gratis via WhatsApp sekarang.', button: { text: 'Coba AdForge Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AdForge%20AI%20gratis` } },
    },
    en: {
      slug: 'adforge-ai',
      meta: { title: 'AdForge AI — 19 Ad Tools That Actually Convert | BerkahKarya', description: 'Not manual ChatGPT. 19 integrated tools: Hook Generator, VSL Script, ROAS Calculator, Retargeting. Generate converting ads in <30 seconds.' },
      hero: {
        eyebrow: '📢 ADFORGE AI · 50 Early Bird Slots Left',
        title: 'Budget Gone. ROAS\nStill the Same?',
        description: 'The problem isn\'t your budget — it\'s the wrong ad copywriting. AdForge is an AI platform with 19 integrated tools that creates converting ads from audience pain research, hooks, VSL scripts, to retargeting sequences.',
        buttons: [
          { text: '💬 Try Free via WhatsApp', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AdForge%20AI`, primary: true },
          { text: 'See Demo', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Tired of making ads that don\'t convert? Here\'s the root cause.',
        pains: [
          { icon: '😩', text: 'Writing copy yourself takes forever — thinking of hooks, body, CTA while running your store. Time gone, results uncertain.' },
          { icon: '💸', text: 'Boost Rp 500K, zero orders. Budget exhausted but ROAS sucks — because the copywriting is wrong, not the budget.' },
          { icon: '😵', text: 'Competitors closing hundreds of orders, yours is silent. Same quality product — different copywriting formula.' },
          { icon: '🔄', text: 'Used manual ChatGPT but results are generic, don\'t convert. You need a dedicated workflow for ads, not general AI.' },
        ],
        bridge: 'AdForge is not ChatGPT. This is 19 tools with a 5-stage workflow designed specifically for converting ads.',
      },
      features: [
        { icon: '🪝', title: 'Hook Generator + Scorer', desc: 'Generate 10+ different hooks, then AI scores which is most likely to stop scrolling. No more guessing.' },
        { icon: '📝', title: 'Complete VSL Script', desc: 'Video Sales Letter script ready to record — from opening hook, problem agitation, solution, proof, to CTA. One click.' },
        { icon: '🎯', title: 'Pain Audience Research', desc: 'AI researches exact pain points of your target market. Pain-based copywriting = ads that connect deeper.' },
        { icon: '📊', title: 'ROAS Calculator', desc: 'Calculate optimal budget before launch. Know exactly how much to spend to hit your revenue target.' },
        { icon: '🔄', title: 'Retargeting Sequence', desc: '7-day retargeting sequence ready to use — automatic followup for those who saw ads but didn\'t buy.' },
        { icon: '⚡', title: '<30 Seconds Per Output', desc: 'From product input and target → complete ad in 2 variations in under 30 seconds. Not hours, not days.' },
      ],
      howItWorks: {
        title: '3 Steps, Ads Ready to Use',
        steps: [
          { num: '1', title: 'Type Product & Target', desc: 'In WhatsApp/Telegram — state your product and target market. Example: "selling premium hijab for women 25-35 years old".' },
          { num: '2', title: 'AI Generates 2 Ad Variations', desc: 'System immediately creates angle + hook + body + bullets + CTA — 2 different variations in <30 seconds.' },
          { num: '3', title: 'Copy, Paste, Advertise', desc: 'Paste into Meta Ads, TikTok Ads, or organic feed. Pick the best variation and run it.' },
        ],
      },
      testimonials: [
        { quote: 'ROAS went from 1.8x to 4.2x in 2 weeks after switching copywriting to AdForge. Same budget, 2x revenue.', name: 'Budi K.', role: 'E-commerce Owner, Yogyakarta', avatar: '👨‍💼' },
        { quote: 'Writing 1 ad used to take 2-3 hours. Now 30 seconds and results are better. CTR up from 0.8% to 3.2%.', name: 'Dewi S.', role: 'Digital Marketing Freelancer', avatar: '👩‍💻' },
        { quote: 'Was spending Rp 5M/month on ads, 70% zero results. After using AdForge formula, all campaigns above 3x ROAS.', name: 'Arif M.', role: 'Skincare Brand Owner', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Starter', price: 'Rp 299K', period: '/mo', features: ['50 copies/month', '5 basic tools', 'Hook + Body + CTA', 'Meta & TikTok ready', 'Email support'], cta: { text: 'Choose Starter', href: WA } },
        { name: 'Growth', price: 'Rp 799K', period: '/mo', highlight: true, features: ['200 copies/month', 'All 19 tools', 'VSL Script', 'Retargeting sequence', 'ROAS Calculator', 'Priority support'], cta: { text: 'Choose Growth', href: WA } },
        { name: 'Agency', price: 'Custom', period: '', features: ['Unlimited copies', 'White-label', 'Team access', 'Custom tools', 'API access', 'Dedicated support'], cta: { text: 'Contact Us', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'How is this different from ChatGPT?', a: 'ChatGPT is general AI. AdForge has 19 tools with specific workflows for ads — Hook Scorer, Pain Research, ROAS Calculator, Retargeting Sequence. Results are far more targeted and conversion-focused.' },
          { q: 'Which product categories has this been proven for?', a: 'Fashion, skincare, F&B, electronics, property, services, digital products — almost all categories have profitable users. Key is having a clear target market.' },
          { q: 'Does it work for TikTok Ads too?', a: 'Yes. AdForge generates copy specifically for Meta Ads and TikTok Ads — different formats and tones because the audiences differ.' },
          { q: 'What does 50 early bird slots mean?', a: 'Early bird users get lifetime locked pricing + free access to all new features. Once slots are full, prices go up.' },
        ],
      },
      cta: { title: 'Your Next Ad Can Convert — If the Copywriting Is Right', description: '50 early bird slots, lifetime price lock. Try free via WhatsApp now.', button: { text: 'Try AdForge Free →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AdForge%20AI%20free` } },
    },
  },

  'ai-agent-pro': {
    id: {
      slug: 'ai-agent-pro',
      meta: { title: 'AI Agent Pro — Respon Lead <2 Detik, 24/7 | BerkahKarya', description: '65% lead hilang karena tidak dibalas. AI Agent Pro respon <2 detik, 24 jam, hemat 60% biaya CS. Tidak ada lead yang hilang lagi.' },
      hero: {
        eyebrow: '🤖 AI AGENT PRO · WhatsApp AI Automation',
        title: '65% Lead Kamu Hilang\nSetiap Hari. Itu Rp 21 Juta/Bulan.',
        description: 'Seorang calon customer kirim WhatsApp jam 9:15 pagi. Tim CS sedang meeting. Jam 10:30 belum dibalas. Jam 12:00 mereka tanya ke kompetitor. Jam 14:30 mereka beli di tempat lain. AI Agent Pro pastikan ini tidak pernah terjadi lagi — respon <2 detik, 24/7.',
        buttons: [
          { text: '💬 Jadwalkan Demo Gratis', href: `${WA}?text=Halo%2C%20saya%20mau%20demo%20AI%20Agent%20Pro`, primary: true },
          { text: 'Lihat Masalahnya', href: '#problem', primary: false },
        ],
      },
      problem: {
        hook: 'Berapa banyak revenue yang hilang karena customer tidak dibalas tepat waktu?',
        pains: [
          { icon: '⏰', text: '65% lead hilang jika tidak direspon dalam 5 menit pertama. CS tidak bisa online 24/7 — lead pun pergi. Estimasi rugi: Rp 21.25M/bulan.' },
          { icon: '😤', text: 'Tim CS habiskan 70% waktu untuk pertanyaan berulang — jam buka, harga, cara order. Energi habis untuk hal yang sama setiap hari.' },
          { icon: '🏃', text: 'Respons lambat = keputusan pindah. Siapa yang balas duluan, yang closing. Kompetitor yang lebih cepat ambil customer kamu.' },
          { icon: '📅', text: 'Lead masuk malam, weekend, atau saat seluruh tim rapat. Tidak ada yang melayani, peluang puluhan juta hilang begitu saja.' },
        ],
        bridge: 'AI Agent Pro tutup semua celah ini: respon <2 detik, 24/7, tanpa karyawan tambahan.',
      },
      features: [
        { icon: '⚡', title: 'Respon <2 Detik', desc: 'Lead kirim WhatsApp → AI balas dalam <2 detik, kapanpun. Tidak ada lagi "maaf kami sedang tidak online".' },
        { icon: '🧠', title: 'Custom Knowledge Base', desc: 'Train AI dengan data bisnis kamu — produk, harga, promo, FAQ, SOP. AI jawab persis seperti yang kamu mau.' },
        { icon: '📞', title: 'Auto Follow-Up', desc: 'Lead tidak langsung beli? AI follow-up otomatis dalam 1 jam, 1 hari, 3 hari — sequence yang sudah terbukti convert.' },
        { icon: '🔗', title: 'Multi-Channel', desc: 'WhatsApp, Telegram, website chat, Instagram DM — satu AI, semua channel terhubung.' },
        { icon: '📈', title: '2-3x Konversi', desc: 'Respons cepat + follow-up konsisten = konversi naik 2-3x. Lead yang tadinya cold jadi closing.' },
        { icon: '📊', title: 'Analytics Real-time', desc: 'Lihat berapa lead masuk, berapa yang dibalas, berapa yang convert. Data untuk optimasi terus-menerus.' },
      ],
      howItWorks: {
        title: 'Setup 3 Hari, Jalan Seumur Hidup',
        steps: [
          { num: '1', title: 'Konsultasi & Audit', desc: 'Tim kami audit alur CS kamu, identifikasi titik leak terbesar, dan desain AI agent yang sesuai.' },
          { num: '2', title: 'Training & Setup', desc: '2-3 hari training AI dengan data bisnis kamu — produk, FAQ, SOP, tone of voice yang kamu mau.' },
          { num: '3', title: 'Go Live & Monitor', desc: 'AI mulai balas customer. Kamu monitor via dashboard. Tim CS fokus ke kasus yang benar-benar butuh manusia.' },
        ],
      },
      testimonials: [
        { quote: 'Dulu 65% chat tidak terbalas malam hari. Sekarang AI balas <2 detik. Konversi naik 3x, CS bisa fokus closing yang sudah warm.', name: 'Hendro S.', role: 'CEO, Online Shop Fashion', avatar: '👨‍💼' },
        { quote: 'Hemat 2 orang CS, tapi respons lebih cepat dan lebih konsisten. ROI balik dalam 3 minggu pertama.', name: 'Maya R.', role: 'Founder, Skincare Brand', avatar: '👩‍💼' },
        { quote: 'Follow-up otomatis yang kita setup convert 23% lead yang tadinya cold. Itu revenue yang tadinya hilang begitu saja.', name: 'Anto P.', role: 'Sales Director, Properti', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Basic', price: 'Rp 799K', period: '/bulan', features: ['1 AI Agent', '1.000 conversation/bulan', '1 channel (WA)', 'Basic knowledge base', 'Email support'], cta: { text: 'Pilih Basic', href: `${WA}?text=Saya%20mau%20AI%20Agent%20Pro%20Basic` } },
        { name: 'Business', price: 'Rp 2.499K', period: '/bulan', highlight: true, features: ['3 AI Agent', '10.000 conversation/bulan', 'Multi-channel', 'Custom knowledge base', 'Auto follow-up', 'Priority support + monthly review'], cta: { text: 'Pilih Business', href: `${WA}?text=Saya%20mau%20AI%20Agent%20Pro%20Business` } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Agents', 'Unlimited conversations', 'Custom integrations', 'Dedicated AI engineer', 'SLA 99.9%', 'On-premise option'], cta: { text: 'Jadwalkan Demo', href: `${WA}?text=Saya%20mau%20demo%20AI%20Agent%20Pro%20Enterprise` } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Bagaimana jika AI salah jawab customer?', a: 'AI Agent punya guardrail system — kalau pertanyaan di luar knowledge base atau tidak yakin, otomatis escalate ke tim manusia kamu. Akurasi rata-rata 95%.' },
          { q: 'Apakah perlu nomor WhatsApp baru?', a: 'Tidak. AI terhubung ke nomor WA bisnis kamu yang sudah ada. Customer tetap chat ke nomor yang sama.' },
          { q: 'Berapa lama setup-nya?', a: '2-3 hari untuk training awal. Makin lengkap data yang kamu kasih, makin akurat AI-nya.' },
          { q: 'Bisa diatur jam aktifnya?', a: 'Bisa — tapi kebanyakan klien biarkan AI aktif 24/7 karena memang di situlah nilai terbesarnya: respon malam dan weekend.' },
          { q: 'Apakah customer tahu mereka chat dengan AI?', a: 'Tergantung kamu. Bisa dikonfigurasi transparan ("Hai, saya Vita asisten virtual...") atau seamless seperti CS manusia.' },
        ],
      },
      cta: { title: 'Hitung Berapa Revenue yang Hilang Tiap Bulan', description: 'Demo gratis 30 menit. Kami audit alur CS kamu dan hitung potensi revenue recovery dengan AI Agent.', button: { text: 'Jadwalkan Demo Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20demo%20gratis%20AI%20Agent%20Pro` } },
    },
    en: {
      slug: 'ai-agent-pro',
      meta: { title: 'AI Agent Pro — Respond to Leads in <2 Seconds, 24/7 | BerkahKarya', description: '65% of leads are lost because they\'re not answered. AI Agent Pro responds in <2 seconds, 24 hours, saves 60% CS costs. No more lost leads.' },
      hero: {
        eyebrow: '🤖 AI AGENT PRO · WhatsApp AI Automation',
        title: '65% of Your Leads Are\nLost Every Day. That\'s Rp 21M/Month.',
        description: 'A potential customer sends WhatsApp at 9:15 AM. CS team is in a meeting. 10:30 AM still no reply. 12:00 they ask your competitor. 2:30 PM they bought from someone else. AI Agent Pro ensures this never happens again — response <2 seconds, 24/7.',
        buttons: [
          { text: '💬 Schedule Free Demo', href: `${WA}?text=Hello%2C%20I%20want%20to%20demo%20AI%20Agent%20Pro`, primary: true },
          { text: 'See the Problem', href: '#problem', primary: false },
        ],
      },
      problem: {
        hook: 'How much revenue is lost because customers aren\'t answered on time?',
        pains: [
          { icon: '⏰', text: '65% of leads are lost if not responded to within 5 minutes. CS can\'t be online 24/7 — leads leave. Estimated loss: Rp 21.25M/month.' },
          { icon: '😤', text: 'CS team spends 70% of time on repetitive questions — hours, prices, how to order. Energy wasted on the same things every day.' },
          { icon: '🏃', text: 'Slow response = decision to move on. Whoever replies first wins. Your competitor is taking your customers.' },
          { icon: '📅', text: 'Leads come at night, weekends, or when the whole team is in meetings. Nobody serves them, tens of millions in opportunities vanish.' },
        ],
        bridge: 'AI Agent Pro closes all these gaps: <2 second response, 24/7, without additional employees.',
      },
      features: [
        { icon: '⚡', title: 'Response <2 Seconds', desc: 'Lead sends WhatsApp → AI replies in <2 seconds, anytime. No more "sorry we\'re currently offline".' },
        { icon: '🧠', title: 'Custom Knowledge Base', desc: 'Train AI with your business data — products, prices, promos, FAQ, SOPs. AI answers exactly as you want.' },
        { icon: '📞', title: 'Auto Follow-Up', desc: 'Lead didn\'t buy immediately? AI auto follows up in 1 hour, 1 day, 3 days — proven converting sequence.' },
        { icon: '🔗', title: 'Multi-Channel', desc: 'WhatsApp, Telegram, website chat, Instagram DM — one AI, all channels connected.' },
        { icon: '📈', title: '2-3x Conversions', desc: 'Fast response + consistent follow-up = 2-3x higher conversions. Cold leads become closings.' },
        { icon: '📊', title: 'Real-time Analytics', desc: 'See how many leads came in, how many were answered, how many converted. Data for continuous optimization.' },
      ],
      howItWorks: {
        title: '3 Days Setup, Runs for Life',
        steps: [
          { num: '1', title: 'Consultation & Audit', desc: 'Our team audits your CS flow, identifies the biggest leak points, and designs the right AI agent.' },
          { num: '2', title: 'Training & Setup', desc: '2-3 days training AI with your business data — products, FAQ, SOPs, tone of voice you want.' },
          { num: '3', title: 'Go Live & Monitor', desc: 'AI starts answering customers. You monitor via dashboard. CS team focuses on cases that truly need humans.' },
        ],
      },
      testimonials: [
        { quote: '65% of chats were unanswered at night. Now AI replies in <2 seconds. Conversions up 3x, CS can focus on warm leads.', name: 'Hendro S.', role: 'CEO, Fashion Online Shop', avatar: '👨‍💼' },
        { quote: 'Saved 2 CS staff costs, but faster and more consistent responses. ROI recovered in the first 3 weeks.', name: 'Maya R.', role: 'Founder, Skincare Brand', avatar: '👩‍💼' },
        { quote: 'Auto follow-up we set up converts 23% of previously cold leads. That\'s revenue that was just disappearing.', name: 'Anto P.', role: 'Sales Director, Property', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Basic', price: 'Rp 799K', period: '/mo', features: ['1 AI Agent', '1,000 conversations/month', '1 channel (WA)', 'Basic knowledge base', 'Email support'], cta: { text: 'Choose Basic', href: WA } },
        { name: 'Business', price: 'Rp 2.499K', period: '/mo', highlight: true, features: ['3 AI Agents', '10,000 conversations/month', 'Multi-channel', 'Custom knowledge base', 'Auto follow-up', 'Priority support + monthly review'], cta: { text: 'Choose Business', href: WA } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Agents', 'Unlimited conversations', 'Custom integrations', 'Dedicated AI engineer', '99.9% SLA', 'On-premise option'], cta: { text: 'Schedule Demo', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'What if AI gives wrong answers to customers?', a: 'AI Agent has a guardrail system — if questions are outside the knowledge base or it\'s unsure, it automatically escalates to your human team. Average accuracy 95%.' },
          { q: 'Do I need a new WhatsApp number?', a: 'No. AI connects to your existing business WA number. Customers still chat to the same number.' },
          { q: 'How long does setup take?', a: '2-3 days for initial training. The more complete data you provide, the more accurate the AI.' },
          { q: 'Can I set active hours?', a: 'Yes — but most clients keep AI active 24/7 because that\'s where the biggest value is: night and weekend responses.' },
          { q: 'Will customers know they\'re chatting with AI?', a: 'Up to you. Can be configured transparently ("Hi, I\'m Vita virtual assistant...") or seamlessly like a human CS.' },
        ],
      },
      cta: { title: 'Calculate How Much Revenue You\'re Losing Monthly', description: 'Free 30-minute demo. We audit your CS flow and calculate potential revenue recovery with AI Agent.', button: { text: 'Schedule Free Demo →', href: `${WA}?text=Hello%2C%20I%20want%20a%20free%20demo%20of%20AI%20Agent%20Pro` } },
    },
  },

  'algorithmic-trading': {
    id: {
      slug: 'algorithmic-trading',
      meta: { title: 'Algorithmic Trading — Stop Trading Pakai Feeling | BerkahKarya', description: 'Signal XAUUSD + algo system tervalidasi. 58-65% win rate, 1:2+ risk:reward. 7-Candle Breakout Protocol C, Asia session 15:00 WIB.' },
      hero: {
        eyebrow: '📈 ALGO TRADING · XAUUSD Aktif',
        title: 'Stop Trading Pakai Feeling.\nMulai Pakai Sistem.',
        description: 'Trading dengan emosi menghabiskan akun. Trading dengan sistem yang sudah dibacktest 5+ tahun menghasilkan profit konsisten. BerkahKarya Algo Trading: sinyal entry/exit otomatis, eksekusi disiplin, tanpa begadang monitor chart.',
        buttons: [
          { text: '💬 Konsultasi Strategi Gratis', href: `${WA}?text=Halo%2C%20saya%20tertarik%20Algo%20Trading%20BerkahKarya`, primary: true },
          { text: 'Lihat Strategi', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Kenapa sebagian besar trader retail terus rugi padahal sudah belajar bertahun-tahun?',
        pains: [
          { icon: '😰', text: 'Emosi merusak strategi — udah buat rencana trading, tapi begitu market bergerak panik, FOMO, dan overtrade. Emosi selalu menang melawan logika.' },
          { icon: '⏰', text: 'Begadang monitor chart sampai jam 3 pagi, takut miss entry. Hidup jadi budak chart — bukan trader yang profitable.' },
          { icon: '📉', text: 'Strategi dari YouTube dan grup belum pernah dibacktest proper. Trading pakai feeling = judi, bukan investasi.' },
          { icon: '💸', text: 'Akun berkali-kali habis karena tidak ada risk management yang ketat. Satu bad trade menghapus semua profit minggu lalu.' },
        ],
        bridge: 'Sistem kami trading untuk kamu — backtested, disiplin, tanpa emosi, tanpa begadang.',
      },
      features: [
        { icon: '🕯️', title: '7-Candle Breakout (Protocol C)', desc: 'Range 7 candle H1 di awal sesi → entry saat breakout konfirmasi. XAUUSD, Asia session 15:00 WIB. Backtested 5+ tahun.' },
        { icon: '🛡️', title: 'Risk Management Ketat', desc: 'Risk 1-2% per trade, RR minimal 1:2. Stop loss dan take profit otomatis — tidak bisa override saat emosi.' },
        { icon: '📊', title: '58-65% Win Rate', desc: 'Bukan janji — angka dari backtesting historical data. Dengan RR 1:2, win rate 55% sudah profitable.' },
        { icon: '⚡', title: 'Auto Execution', desc: 'Signal dikirim via Telegram + bisa dieksekusi otomatis. Tidak perlu monitor chart atau buka MT4 setiap saat.' },
        { icon: '📱', title: 'Dashboard Real-time', desc: 'Lihat equity, open positions, dan performa dari HP. Transaksi log lengkap untuk review dan improvement.' },
        { icon: '🔬', title: 'Backtested 5+ Tahun', desc: 'Semua strategi diuji dengan data historical minimal 5 tahun sebelum live. Bukan strategi kemarin-kemarin.' },
      ],
      howItWorks: {
        title: 'Cara Kerja Sistem',
        steps: [
          { num: '1', title: 'Konsultasi & Risk Profile', desc: 'Kami analisa modal dan risk tolerance kamu. Pilih strategi yang sesuai profil — bukan one-size-fits-all.' },
          { num: '2', title: 'Setup & Backtesting', desc: 'Sistem dikonfigurasi untuk akun kamu. Kamu lihat backtest result dan forward test sebelum commit live.' },
          { num: '3', title: 'Trading Otomatis', desc: 'Sistem trading sesuai strategi. Kamu terima notifikasi setiap entry/exit. Monitor dari HP, tidak perlu staring chart.' },
        ],
      },
      testimonials: [
        { quote: 'Setelah pakai sistem ini, saya berhenti overtrade. Win rate saya 62% bulan lalu dengan RR 1:2.5. Akun pertama kali tidak habis dalam 3 bulan.', name: 'Wahyu D.', role: 'Trader Retail, 2 tahun', avatar: '👨‍💼' },
        { quote: 'Protocol C XAUUSD adalah yang paling konsisten yang pernah saya coba. Entry jam 15:00 WIB, tidak perlu monitor malam.', name: 'Lia S.', role: 'Trader sambil kerja kantoran', avatar: '👩‍💼' },
        { quote: 'Dari 6 bulan pakai sistem ini, drawdown maksimal saya 8%. Sebelumnya akun bisa habis dalam 2 minggu karena emosi.', name: 'Reza F.', role: 'Full-time Trader', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Signal', price: 'Rp 499K', period: '/bulan', features: ['Sinyal entry/exit XAUUSD', 'Telegram delivery real-time', 'Risk level per trade', 'Basic analytics', 'Community support'], cta: { text: 'Pilih Signal', href: `${WA}?text=Saya%20mau%20paket%20Signal%20Algo%20Trading` } },
        { name: 'Auto-Trade', price: 'Rp 1.999K', period: '/bulan', highlight: true, features: ['Semua fitur Signal', 'Auto execution MT4/MT5', 'Risk management otomatis', 'Real-time dashboard', 'Monthly performance review', 'Priority support'], cta: { text: 'Pilih Auto-Trade', href: `${WA}?text=Saya%20mau%20paket%20Auto-Trade%20Algo%20Trading` } },
        { name: 'Fund', price: 'Custom', period: '', features: ['Managed account', 'Custom strategy', 'Dedicated quant analyst', 'Monthly reporting', 'Performance fee model', 'Min. modal konsultasi'], cta: { text: 'Hubungi Kami', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Apakah ini menjamin profit?', a: 'Tidak ada yang bisa menjamin profit di trading — siapapun yang bilang jamin profit itu bohong. Yang kami jamin adalah sistem yang sudah tervalidasi dengan risk management ketat. Hasil bergantung pada market dan disiplin eksekusi.' },
          { q: 'Berapa modal minimum?', a: 'Untuk paket Signal bisa mulai dengan modal sangat kecil — yang penting bisa risk 1-2% per trade. Untuk Auto-Trade dan Fund, konsultasikan dulu.' },
          { q: 'Apakah bisa sambil kerja?', a: 'Ya, memang dirancang untuk itu. Protocol C entry jam 15:00 WIB — kamu bisa setup order sebelum pulang kerja.' },
          { q: 'Broker apa yang kompatibel?', a: 'MT4/MT5 compatible — semua broker yang support platform ini bisa digunakan. Kami rekomendasikan beberapa broker regulated.' },
        ],
      },
      cta: { title: 'Trading Tanpa Emosi, Profit dengan Sistem', description: '⚠️ Trading mengandung risiko. Hasil masa lalu tidak menjamin keuntungan masa depan. Konsultasi gratis untuk analisa risk profile kamu.', button: { text: 'Konsultasi Strategi Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20konsultasi%20strategi%20trading` } },
    },
    en: {
      slug: 'algorithmic-trading',
      meta: { title: 'Algorithmic Trading — Stop Trading on Feeling | BerkahKarya', description: 'Validated XAUUSD signal + algo system. 58-65% win rate, 1:2+ risk:reward. 7-Candle Breakout Protocol C, Asia session 3 PM WIB.' },
      hero: {
        eyebrow: '📈 ALGO TRADING · XAUUSD Active',
        title: 'Stop Trading on Feeling.\nStart Trading on System.',
        description: 'Trading on emotion drains accounts. Trading on a system backtested 5+ years generates consistent profit. BerkahKarya Algo Trading: automatic entry/exit signals, disciplined execution, no more staying up to monitor charts.',
        buttons: [
          { text: '💬 Free Strategy Consultation', href: `${WA}?text=Hello%2C%20I%27m%20interested%20in%20BerkahKarya%20Algo%20Trading`, primary: true },
          { text: 'View Strategy', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Why do most retail traders keep losing even after years of learning?',
        pains: [
          { icon: '😰', text: 'Emotions ruin strategy — you made a trading plan, but when market moves you panic, FOMO, and overtrade. Emotions always beat logic.' },
          { icon: '⏰', text: 'Staying up until 3 AM monitoring charts, scared to miss entries. Life becomes a chart slave — not a profitable trader.' },
          { icon: '📉', text: 'Strategies from YouTube and groups never properly backtested. Trading on feeling = gambling, not investing.' },
          { icon: '💸', text: 'Account blown multiple times due to no strict risk management. One bad trade wipes all last week\'s profits.' },
        ],
        bridge: 'Our system trades for you — backtested, disciplined, no emotion, no staying up late.',
      },
      features: [
        { icon: '🕯️', title: '7-Candle Breakout (Protocol C)', desc: '7-candle H1 range at session open → entry on confirmed breakout. XAUUSD, Asia session 3 PM WIB. 5+ years backtested.' },
        { icon: '🛡️', title: 'Strict Risk Management', desc: 'Risk 1-2% per trade, minimum RR 1:2. Auto stop loss and take profit — can\'t override when emotional.' },
        { icon: '📊', title: '58-65% Win Rate', desc: 'Not a promise — numbers from historical backtesting. With 1:2 RR, 55% win rate is already profitable.' },
        { icon: '⚡', title: 'Auto Execution', desc: 'Signals sent via Telegram + can be auto-executed. No need to monitor charts or open MT4 constantly.' },
        { icon: '📱', title: 'Real-time Dashboard', desc: 'See equity, open positions, and performance from your phone. Full transaction log for review and improvement.' },
        { icon: '🔬', title: 'Backtested 5+ Years', desc: 'All strategies tested with minimum 5 years of historical data before going live. Not yesterday\'s strategy.' },
      ],
      howItWorks: {
        title: 'How the System Works',
        steps: [
          { num: '1', title: 'Consultation & Risk Profile', desc: 'We analyze your capital and risk tolerance. Choose the right strategy for your profile — not one-size-fits-all.' },
          { num: '2', title: 'Setup & Backtesting', desc: 'System configured for your account. You see backtest results and forward tests before committing live.' },
          { num: '3', title: 'Automatic Trading', desc: 'System trades according to strategy. You receive notifications on every entry/exit. Monitor from phone, no chart staring.' },
        ],
      },
      testimonials: [
        { quote: 'After using this system, I stopped overtrading. Win rate was 62% last month with 1:2.5 RR. First time account didn\'t blow in 3 months.', name: 'Wahyu D.', role: 'Retail Trader, 2 years', avatar: '👨‍💼' },
        { quote: 'Protocol C XAUUSD is the most consistent I\'ve tried. Entry at 3 PM WIB — no need to monitor at night.', name: 'Lia S.', role: 'Trader alongside day job', avatar: '👩‍💼' },
        { quote: 'In 6 months using this system, max drawdown was 8%. Before, account could blow in 2 weeks from emotion.', name: 'Reza F.', role: 'Full-time Trader', avatar: '👨‍💻' },
      ],
      pricing: [
        { name: 'Signal', price: 'Rp 499K', period: '/mo', features: ['XAUUSD entry/exit signals', 'Real-time Telegram delivery', 'Risk level per trade', 'Basic analytics', 'Community support'], cta: { text: 'Choose Signal', href: WA } },
        { name: 'Auto-Trade', price: 'Rp 1.999K', period: '/mo', highlight: true, features: ['All Signal features', 'Auto MT4/MT5 execution', 'Automatic risk management', 'Real-time dashboard', 'Monthly performance review', 'Priority support'], cta: { text: 'Choose Auto-Trade', href: WA } },
        { name: 'Fund', price: 'Custom', period: '', features: ['Managed account', 'Custom strategy', 'Dedicated quant analyst', 'Monthly reporting', 'Performance fee model', 'Minimum capital by consultation'], cta: { text: 'Contact Us', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Does this guarantee profits?', a: 'Nothing can guarantee profits in trading — anyone who says they guarantee profits is lying. What we guarantee is a validated system with strict risk management. Results depend on market and execution discipline.' },
          { q: 'What\'s the minimum capital?', a: 'Signal plan can start with very small capital — as long as you can risk 1-2% per trade. For Auto-Trade and Fund, consult first.' },
          { q: 'Can I do this while working a day job?', a: 'Yes, it\'s designed for that. Protocol C entry at 3 PM WIB — you can set up orders before heading home from work.' },
          { q: 'Which brokers are compatible?', a: 'MT4/MT5 compatible — any broker supporting these platforms works. We recommend several regulated brokers.' },
        ],
      },
      cta: { title: 'Trade Without Emotion, Profit With System', description: '⚠️ Trading involves risk. Past performance does not guarantee future results. Free consultation to analyze your risk profile.', button: { text: 'Free Strategy Consultation →', href: `${WA}?text=Hello%2C%20I%20want%20a%20trading%20strategy%20consultation` } },
    },
  },

  'digital-products': {
    id: {
      slug: 'digital-products',
      meta: { title: 'Produk Digital AI — Template & Tools Siap Pakai | BerkahKarya', description: '7 produk digital AI siap pakai: dari tools iklan, konten kreator, foto produk, sampai panduan karir dan parenting. Mulai Rp 49K. Garansi 7 hari.' },
      hero: {
        eyebrow: '📦 PRODUK DIGITAL · 7 Produk Aktif',
        title: 'Tools AI Siap Pakai\nuntuk Bisnis & Karir Kamu.',
        description: 'Tidak perlu belajar dari nol. Produk digital kami sudah dikemas jadi template, panduan, dan tools AI yang bisa langsung dipakai — dan langsung menghasilkan. Mulai dari Rp 49K, garansi uang kembali 7 hari.',
        buttons: [
          { text: '🛒 Lihat Semua Produk', href: `${STORE}`, primary: true },
          { text: 'Konsultasi Produk', href: `${WA}?text=Halo%2C%20saya%20mau%20tanya%20produk%20digital`, primary: false },
        ],
      },
      problem: {
        hook: 'Kenapa banyak orang beli course tapi hasilnya nol?',
        pains: [
          { icon: '📚', text: 'Course panjang tapi tidak ada template siap pakai. Belajar teori berbulan-bulan, implementasi sendiri dari nol.' },
          { icon: '⏳', text: 'Waktu habis research dan trial error. Yang kamu butuhkan adalah sistem yang sudah terbukti, bukan eksperimen.' },
          { icon: '💸', text: 'Tools mahal berlangganan bulanan. Bayar Rp 500K-2juta/bulan untuk tools yang harusnya bisa dimiliki one-time.' },
          { icon: '😵', text: 'Terlalu banyak informasi, tidak tahu harus mulai dari mana. Butuh panduan step-by-step yang langsung actionable.' },
        ],
        bridge: 'Produk kami = tools + template + panduan sudah jadi. Download hari ini, pakai hari ini, hasil hari ini.',
      },
      features: [
        { icon: '⚡', title: 'Langsung Bisa Dipakai', desc: 'Bukan teori. Bukan course panjang. Template dan tools yang langsung bisa diimplementasikan hari ini.' },
        { icon: '💰', title: 'Mulai Rp 49K', desc: 'Harga produk berkualitas yang terjangkau. Jauh lebih murah dari berlangganan tools bulanan.' },
        { icon: '🔄', title: 'Update Gratis Selamanya', desc: 'Beli sekali, dapat update seumur hidup. Konten terus diperbarui mengikuti perkembangan AI.' },
        { icon: '🛡️', title: 'Garansi 7 Hari', desc: 'Tidak puas? Refund penuh tanpa pertanyaan dalam 7 hari. Zero risk untuk kamu.' },
        { icon: '📱', title: 'Payment Mudah', desc: 'GoPay, OVO, DANA, transfer bank. Tidak perlu kartu kredit atau PayPal.' },
        { icon: '🤖', title: 'AI-Powered', desc: 'Semua produk memanfaatkan AI terbaru — bukan hanya panduan konvensional yang ketinggalan zaman.' },
      ],
      howItWorks: {
        title: 'Cara Beli & Gunakan',
        steps: [
          { num: '1', title: 'Pilih Produk', desc: 'Browse katalog, pilih yang sesuai kebutuhan. Baca deskripsi dan apa yang kamu dapatkan.' },
          { num: '2', title: 'Bayar & Download', desc: 'Checkout via lynk.id — GoPay, OVO, DANA. Akses langsung setelah payment berhasil.' },
          { num: '3', title: 'Implementasi Sekarang', desc: 'Ikuti panduan step-by-step. Template sudah siap — tinggal isi dan jalankan.' },
        ],
      },
      testimonials: [
        { quote: 'AI Ad Engine membantu saya bikin 50 variasi creative iklan dalam 1 jam. ROAS campaign terakhir 4.8x.', name: 'Budi S.', role: 'Digital Advertiser', avatar: '👨‍💼' },
        { quote: 'JobMagnet AI bantu CV saya lolos ATS. 3 minggu setelah pakai, sudah ada 5 interview dari perusahaan impian.', name: 'Rini A.', role: 'Fresh Graduate', avatar: '👩‍🎓' },
        { quote: 'SellPix AI buat foto produk saya terlihat setara studio. Konversi toko online naik 40% dalam 2 minggu.', name: 'Dian M.', role: 'UMKM Online Seller', avatar: '👩‍💼' },
      ],
      pricing: [
        { name: 'Single Product', price: 'Rp 49K–75K', period: '', features: ['1 produk pilihan', 'Akses seumur hidup', 'Update gratis', 'Garansi 7 hari', 'Support via WA'], cta: { text: 'Beli Sekarang', href: STORE } },
        { name: 'Bundle 3 Produk', price: 'Rp 175K', period: '', highlight: true, features: ['3 produk pilihan kamu', 'Hemat Rp 50K', 'Akses seumur hidup', 'Update gratis', 'Garansi 7 hari', 'Priority support'], cta: { text: 'Beli Bundle', href: `${WA}?text=Saya%20mau%20bundle%203%20produk%20digital` } },
        { name: 'All Access', price: 'Rp 299K', period: '', features: ['Semua 7 produk', 'Semua produk baru otomatis', 'Hemat Rp 226K', 'VIP support', '1-on-1 consultation', 'Garansi 7 hari'], cta: { text: 'All Access', href: `${WA}?text=Saya%20mau%20All%20Access%20produk%20digital` } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Format file-nya apa?', a: 'Tergantung produk — bisa PDF, Google Docs/Sheets template yang bisa langsung diedit, atau Notion template. Semuanya dijelaskan di halaman produk.' },
          { q: 'Apakah cocok untuk pemula?', a: 'Ya, semua produk dibuat untuk langsung bisa dipakai — ada panduan step-by-step. Tidak perlu background teknis.' },
          { q: 'Garansi 7 hari itu berlaku untuk semua produk?', a: 'Ya. Jika tidak puas dalam 7 hari, refund penuh. Hubungi kami via WA dengan bukti pembelian.' },
          { q: 'Apakah bisa dipakai untuk bisnis klien?', a: 'Ya, tidak ada restriksi penggunaan komersial. Satu pembelian bisa digunakan untuk bisnis sendiri maupun klien.' },
          { q: 'Update produknya seberapa sering?', a: 'Minimal setiap 3 bulan — mengikuti perkembangan AI tools terbaru. Kamu dapat notifikasi saat ada update besar.' },
        ],
      },
      cta: { title: 'Download Hari Ini, Hasilkan Hari Ini', description: 'Garansi uang kembali 7 hari. Payment GoPay, OVO, DANA. Akses langsung setelah bayar.', button: { text: 'Beli di LYNK →', href: STORE } },
    },
    en: {
      slug: 'digital-products',
      meta: { title: 'AI Digital Products — Ready-to-Use Templates & Tools | BerkahKarya', description: '7 ready-to-use AI digital products: ad tools, content creator, product photography, career and parenting guides. From Rp 49K. 7-day guarantee.' },
      hero: {
        eyebrow: '📦 DIGITAL PRODUCTS · 7 Active Products',
        title: 'Ready-to-Use AI Tools\nfor Your Business & Career.',
        description: 'No need to learn from scratch. Our digital products are packaged as templates, guides, and AI tools that can be used immediately — and generate results immediately. Starting from Rp 49K, 7-day money-back guarantee.',
        buttons: [
          { text: '🛒 View All Products', href: STORE, primary: true },
          { text: 'Product Consultation', href: `${WA}?text=Hello%2C%20I%20want%20to%20ask%20about%20digital%20products`, primary: false },
        ],
      },
      problem: {
        hook: 'Why do many people buy courses but get zero results?',
        pains: [
          { icon: '📚', text: 'Long courses but no ready-to-use templates. Learning theory for months, implementing from scratch on your own.' },
          { icon: '⏳', text: 'Time wasted on research and trial-and-error. What you need is a proven system, not experiments.' },
          { icon: '💸', text: 'Expensive monthly subscription tools. Paying Rp 500K-2M/month for tools that should be owned one-time.' },
          { icon: '😵', text: 'Too much information, don\'t know where to start. You need step-by-step guidance that is immediately actionable.' },
        ],
        bridge: 'Our products = tools + templates + guides already made. Download today, use today, results today.',
      },
      features: [
        { icon: '⚡', title: 'Ready to Use Immediately', desc: 'Not theory. Not long courses. Templates and tools that can be implemented today.' },
        { icon: '💰', title: 'Starting from Rp 49K', desc: 'Quality product prices that are affordable. Much cheaper than monthly tool subscriptions.' },
        { icon: '🔄', title: 'Free Lifetime Updates', desc: 'Buy once, get lifetime updates. Content continuously updated to follow AI developments.' },
        { icon: '🛡️', title: '7-Day Guarantee', desc: 'Not satisfied? Full refund no questions asked within 7 days. Zero risk for you.' },
        { icon: '📱', title: 'Easy Payment', desc: 'GoPay, OVO, DANA, bank transfer. No credit card or PayPal needed.' },
        { icon: '🤖', title: 'AI-Powered', desc: 'All products leverage the latest AI — not just conventional guides that are outdated.' },
      ],
      howItWorks: {
        title: 'How to Buy & Use',
        steps: [
          { num: '1', title: 'Choose Product', desc: 'Browse the catalog, choose what fits your needs. Read descriptions and what you get.' },
          { num: '2', title: 'Pay & Download', desc: 'Checkout via lynk.id — GoPay, OVO, DANA. Immediate access after successful payment.' },
          { num: '3', title: 'Implement Now', desc: 'Follow the step-by-step guide. Templates are ready — just fill in and run.' },
        ],
      },
      testimonials: [
        { quote: 'AI Ad Engine helped me create 50 ad creative variations in 1 hour. Last campaign ROAS was 4.8x.', name: 'Budi S.', role: 'Digital Advertiser', avatar: '👨‍💼' },
        { quote: 'JobMagnet AI helped my CV pass ATS filters. 3 weeks after using it, I had 5 interviews at dream companies.', name: 'Rini A.', role: 'Fresh Graduate', avatar: '👩‍🎓' },
        { quote: 'SellPix AI made my product photos look studio-quality. Online store conversion up 40% in 2 weeks.', name: 'Dian M.', role: 'UMKM Online Seller', avatar: '👩‍💼' },
      ],
      pricing: [
        { name: 'Single Product', price: 'Rp 49K–75K', period: '', features: ['1 product of choice', 'Lifetime access', 'Free updates', '7-day guarantee', 'WA support'], cta: { text: 'Buy Now', href: STORE } },
        { name: 'Bundle 3 Products', price: 'Rp 175K', period: '', highlight: true, features: ['3 products of your choice', 'Save Rp 50K', 'Lifetime access', 'Free updates', '7-day guarantee', 'Priority support'], cta: { text: 'Buy Bundle', href: WA } },
        { name: 'All Access', price: 'Rp 299K', period: '', features: ['All 7 products', 'New products automatically', 'Save Rp 226K', 'VIP support', '1-on-1 consultation', '7-day guarantee'], cta: { text: 'All Access', href: WA } },
      ],
      faq: {
        title: 'FAQ',
        items: [
          { q: 'What file format?', a: 'Depends on the product — can be PDF, Google Docs/Sheets templates that can be directly edited, or Notion templates. All explained on the product page.' },
          { q: 'Is it suitable for beginners?', a: 'Yes, all products are made to be immediately usable — with step-by-step guides. No technical background needed.' },
          { q: 'Does the 7-day guarantee apply to all products?', a: 'Yes. If unsatisfied within 7 days, full refund. Contact us via WA with proof of purchase.' },
          { q: 'Can it be used for client businesses?', a: 'Yes, no commercial use restrictions. One purchase can be used for own business and clients.' },
          { q: 'How often are products updated?', a: 'Minimum every 3 months — following the latest AI tools development. You get notifications when there are major updates.' },
        ],
      },
      cta: { title: 'Download Today, Generate Results Today', description: '7-day money-back guarantee. Payment GoPay, OVO, DANA. Immediate access after payment.', button: { text: 'Buy at LYNK →', href: STORE } },
    },
  },
};

// Digital product catalog items
export const dpCatalog = [
  { emoji: '📣', name: 'AI Ad Engine', category: 'Bisnis', desc: 'Stop buang budget iklan untuk creative yang tidak convert. Biarkan AI yang buat winning ads-nya.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '⚡', name: 'AI Creative Tools', category: 'Bisnis', desc: 'Dari blank page ke konten viral dalam 5 menit — dengan AI sebagai co-creator kamu.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '📸', name: 'Food Menu AI Studio', category: 'Bisnis', desc: 'Foto makananmu seperti bintang 5 — cukup dengan HP dan panduan yang tepat.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '🎯', name: 'JobMagnet AI', category: 'Karir', desc: 'CV kamu melewati filter ATS — dan recruiter nggak bisa menolak untuk menelepon.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '🛍️', name: 'SellPix AI (Studio Pro)', category: 'Bisnis', desc: 'Foto produk setara studio profesional — dari HP kamu, dalam hitungan detik.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '📚', name: 'Guru Pintar AI', category: 'Edukasi', desc: 'RPP 1 semester selesai dalam satu sore — guru bisa fokus ke hal yang lebih penting.', price: 'Rp 75.000', href: `${STORE}` },
  { emoji: '👶', name: 'Panduan Parenting 0–6', category: 'Personal', desc: 'Dukung tumbuh kembang si kecil dengan cara yang benar — berbasis riset, mudah dipraktikkan.', price: 'Rp 49.000', href: `${STORE}` },
];

// Legacy compat export (simple version for non-full pages)
export const productsData = productsFullData;
export const productSlugs = Object.keys(productsFullData);
