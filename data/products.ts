export interface ProductData {
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; buttons: { text: string; href: string; primary?: boolean }[] };
  problem: { hook: string; pains: { icon: string; text: string }[]; bridge: string };
  features: { icon: string; title: string; desc: string }[];
  howItWorks: { title: string; steps: { num: string; title: string; desc: string }[] };
  testimonials: { title: string; items: { quote: string; name: string; role: string; avatar: string }[] };
  pricing: { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }[];
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; description: string; button: { text: string; href: string } };
  catalog?: { title: string; items: { icon: string; name: string; price: string; desc: string; href: string }[] };
}

const WA = 'https://wa.me/6285732740006';
const STORE = 'https://lynk.id/jendralbot';

export const productsData: Record<string, Record<string, ProductData>> = {

  // ============================================================
  // 1. AI VIDEO STUDIO
  // ============================================================
  'ai-video-studio': {
    id: {
      slug: 'ai-video-studio',
      meta: {
        title: 'AI Video Studio — Foto Jadi Video TikTok Viral 3 Menit | BerkahKarya',
        description: 'Upload foto produk, dapat video cinematic siap posting dalam 3 menit via Telegram bot. Mulai Rp 2.800/video. 3 kredit gratis.',
      },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO',
        title: 'Foto Produk Jadi Video\nTikTok Viral dalam 3 Menit',
        description: 'Upload foto ke Telegram bot → AI proses → video cinematic siap FYP. Tanpa skill editing, tanpa software mahal. Mulai dari Rp 2.800/video.',
        buttons: [
          { text: 'Coba 3 Video Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%203%20video%20gratis%20AI%20Video%20Studio`, primary: true },
          { text: 'Lihat Contoh Video', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Konten statis kalah di FYP. Video = senjata utama di 2024.',
        pains: [
          { icon: '⏰', text: 'Edit 1 video = 3-4 jam. Habis waktu, habis energi, konten cuma 1.' },
          { icon: '💸', text: 'Hire editor? Rp 500K/video. 30 video/bulan = Rp 15 juta terbakar.' },
          { icon: '📉', text: 'Foto produk di-scroll lewat. Engagement jeblok, sales stagnan.' },
          { icon: '😩', text: 'Belajar CapCut/Premiere butuh berminggu-minggu. Bisnis ga bisa nunggu.' },
        ],
        bridge: 'AI Video Studio menghapus semua hambatan itu. Upload foto → 3 menit → video siap viral.',
      },
      features: [
        { icon: '📱', title: 'Telegram Bot Simple', desc: 'Kirim foto ke bot Telegram, video jadi otomatis. Semudah kirim chat.' },
        { icon: '🎬', title: 'Video Cinematic', desc: 'Zoom, pan, transition smooth — kualitas setara editor profesional.' },
        { icon: '⚡', title: '3 Menit Selesai', desc: 'Dari upload foto sampai video siap download, hanya 3 menit.' },
        { icon: '🎯', title: '8 Niche Template', desc: 'Fashion, F&B, beauty, properti, otomotif — template sesuai niche Anda.' },
        { icon: '🤖', title: '4 AI Provider', desc: 'Kami pakai 4 provider AI terbaik untuk hasil optimal di setiap video.' },
        { icon: '💰', title: 'Harga Mulai Rp 2.800', desc: 'Per video hanya Rp 2.800-8.000. Bandingkan dengan Rp 500K/video editor.' },
      ],
      howItWorks: {
        title: 'Cara Kerja — Gampang Banget',
        steps: [
          { num: '01', title: 'Upload Foto Produk', desc: 'Kirim foto produk Anda ke Telegram bot @BerkahKaryaBot. Bisa 1 foto atau batch.' },
          { num: '02', title: 'AI Proses Otomatis', desc: 'AI pilih angle terbaik, tambah motion, musik, dan text overlay sesuai niche.' },
          { num: '03', title: 'Download & Posting', desc: 'Video siap dalam 3 menit. Download langsung, posting ke TikTok/Reels/Shorts.' },
        ],
      },
      testimonials: {
        title: 'Kata Mereka yang Sudah Pakai',
        items: [
          { quote: 'Dulu 1 video 4 jam. Sekarang 3 menit, hasilnya lebih bagus. Omzet naik 40% sejak rutin posting video.', name: 'Rina S.', role: 'Owner Toko Fashion Online', avatar: '👩' },
          { quote: 'Budget editor Rp 10 juta/bulan turun jadi Rp 500K. Video tetap keren, bahkan lebih konsisten.', name: 'Andi P.', role: 'Brand Manager F&B', avatar: '👨' },
          { quote: 'Sebagai reseller, saya perlu konten cepat. AI Video Studio game changer banget.', name: 'Maya K.', role: 'Reseller Skincare', avatar: '👩' },
        ],
      },
      pricing: [
        { name: 'Trial', price: 'GRATIS', period: '', features: ['3 video gratis', 'Semua template', 'Resolusi 720p', 'Watermark kecil'], cta: { text: 'Coba Gratis →', href: `${WA}?text=Halo%2C%20mau%20coba%203%20video%20gratis` } },
        { name: 'Pro', price: 'Rp 49K', period: '/bulan', highlight: true, features: ['20 video/bulan', '8 niche template', 'Resolusi 1080p', 'Tanpa watermark', 'Priority render', 'Rp 2.800/video'], cta: { text: 'Langganan Pro →', href: `${WA}?text=Halo%2C%20mau%20langganan%20Pro%20AI%20Video%20Studio` } },
        { name: 'Unlimited', price: 'Rp 149K', period: '/bulan', features: ['Unlimited video', 'Semua fitur Pro', 'Custom template', 'Batch upload', 'Dedicated support'], cta: { text: 'Pilih Unlimited →', href: `${WA}?text=Halo%2C%20mau%20paket%20Unlimited%20AI%20Video%20Studio` } },
      ],
      faq: {
        title: 'Pertanyaan Umum',
        items: [
          { q: 'Apakah benar gratis 3 video?', a: 'Ya, 100% gratis tanpa kartu kredit. Langsung chat bot Telegram kami dan upload 3 foto pertama Anda.' },
          { q: 'Format video apa yang didapat?', a: 'MP4 resolusi 720p (gratis) atau 1080p (Pro). Ratio 9:16 siap untuk TikTok, Reels, dan Shorts.' },
          { q: 'Bisa untuk niche apa saja?', a: 'Kami punya 8 template niche: fashion, F&B, beauty, properti, otomotif, elektronik, furniture, dan general product.' },
          { q: 'Berapa lama video selesai?', a: 'Rata-rata 3 menit dari upload sampai video siap download. Batch upload bisa lebih cepat per video.' },
          { q: 'Bagaimana cara bayar?', a: 'Transfer bank, GoPay, OVO, DANA, atau QRIS. Otomatis aktif setelah pembayaran konfirmasi.' },
        ],
      },
      cta: {
        title: 'Coba 3 Video Gratis Sekarang',
        description: 'Upload foto produk pertama Anda. Lihat sendiri hasilnya dalam 3 menit. Zero risiko.',
        button: { text: 'Chat Bot Telegram →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AI%20Video%20Studio` },
      },
    },
    en: {
      slug: 'ai-video-studio',
      meta: {
        title: 'AI Video Studio — Product Photos to Viral TikTok Videos in 3 Min | BerkahKarya',
        description: 'Upload product photos, get cinematic videos ready to post in 3 minutes via Telegram bot. Starting at $0.18/video. 3 free credits.',
      },
      hero: {
        eyebrow: '🎬 AI VIDEO STUDIO',
        title: 'Product Photos to Viral\nTikTok Videos in 3 Minutes',
        description: 'Upload photos to Telegram bot → AI processes → cinematic video ready for FYP. No editing skills, no expensive software. Starting $0.18/video.',
        buttons: [
          { text: 'Try 3 Free Videos →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%203%20free%20videos%20AI%20Video%20Studio`, primary: true },
          { text: 'See Sample Videos', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Static content loses on FYP. Video is the #1 weapon in 2024.',
        pains: [
          { icon: '⏰', text: 'Editing 1 video = 3-4 hours. Time gone, energy drained, only 1 piece of content.' },
          { icon: '💸', text: 'Hire an editor? $30/video. 30 videos/month = $900 burned.' },
          { icon: '📉', text: 'Product photos get scrolled past. Engagement drops, sales stagnate.' },
          { icon: '😩', text: 'Learning CapCut/Premiere takes weeks. Your business can\'t wait.' },
        ],
        bridge: 'AI Video Studio removes all those barriers. Upload photo → 3 minutes → video ready to go viral.',
      },
      features: [
        { icon: '📱', title: 'Simple Telegram Bot', desc: 'Send a photo to our Telegram bot, video is made automatically. Easy as sending a message.' },
        { icon: '🎬', title: 'Cinematic Video', desc: 'Zoom, pan, smooth transitions — quality on par with professional editors.' },
        { icon: '⚡', title: 'Done in 3 Minutes', desc: 'From uploading a photo to downloading the video, only 3 minutes.' },
        { icon: '🎯', title: '8 Niche Templates', desc: 'Fashion, F&B, beauty, property, automotive — templates for your niche.' },
        { icon: '🤖', title: '4 AI Providers', desc: 'We use 4 best AI providers for optimal results on every video.' },
        { icon: '💰', title: 'Starting at $0.18', desc: 'Per video only $0.18-0.50. Compare with $30/video for a human editor.' },
      ],
      howItWorks: {
        title: 'How It Works — Super Easy',
        steps: [
          { num: '01', title: 'Upload Product Photo', desc: 'Send your product photo to Telegram bot @BerkahKaryaBot. Single or batch upload.' },
          { num: '02', title: 'AI Processes Automatically', desc: 'AI picks the best angle, adds motion, music, and text overlay matching your niche.' },
          { num: '03', title: 'Download & Post', desc: 'Video ready in 3 minutes. Download instantly, post to TikTok/Reels/Shorts.' },
        ],
      },
      testimonials: {
        title: 'What Our Users Say',
        items: [
          { quote: 'Used to take 4 hours per video. Now 3 minutes, results are even better. Revenue up 40% since posting videos consistently.', name: 'Rina S.', role: 'Online Fashion Store Owner', avatar: '👩' },
          { quote: 'Editor budget dropped from $600/month to $30. Videos are still great, even more consistent.', name: 'Andi P.', role: 'F&B Brand Manager', avatar: '👨' },
          { quote: 'As a reseller, I need content fast. AI Video Studio is an absolute game changer.', name: 'Maya K.', role: 'Skincare Reseller', avatar: '👩' },
        ],
      },
      pricing: [
        { name: 'Trial', price: 'FREE', period: '', features: ['3 free videos', 'All templates', '720p resolution', 'Small watermark'], cta: { text: 'Try Free →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%203%20free%20videos` } },
        { name: 'Pro', price: '$3.29', period: '/mo', highlight: true, features: ['20 videos/month', '8 niche templates', '1080p resolution', 'No watermark', 'Priority render', '$0.18/video'], cta: { text: 'Subscribe Pro →', href: `${WA}?text=Hello%2C%20I%20want%20Pro%20plan%20AI%20Video%20Studio` } },
        { name: 'Unlimited', price: '$9.99', period: '/mo', features: ['Unlimited videos', 'All Pro features', 'Custom templates', 'Batch upload', 'Dedicated support'], cta: { text: 'Choose Unlimited →', href: `${WA}?text=Hello%2C%20I%20want%20Unlimited%20plan%20AI%20Video%20Studio` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Are 3 videos really free?', a: 'Yes, 100% free with no credit card. Just message our Telegram bot and upload your first 3 photos.' },
          { q: 'What video format do I get?', a: 'MP4 at 720p (free) or 1080p (Pro). 9:16 ratio ready for TikTok, Reels, and Shorts.' },
          { q: 'What niches are supported?', a: 'We have 8 niche templates: fashion, F&B, beauty, property, automotive, electronics, furniture, and general product.' },
          { q: 'How long until the video is ready?', a: 'Average 3 minutes from upload to download-ready. Batch uploads can be even faster per video.' },
          { q: 'What payment methods are accepted?', a: 'Bank transfer, GoPay, OVO, DANA, or QRIS. Auto-activated after payment confirmation.' },
        ],
      },
      cta: {
        title: 'Try 3 Free Videos Now',
        description: 'Upload your first product photo. See the results in 3 minutes. Zero risk.',
        button: { text: 'Chat Telegram Bot →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AI%20Video%20Studio` },
      },
    },
  },

  // ============================================================
  // 2. ADFORGE AI
  // ============================================================
  'adforge-ai': {
    id: {
      slug: 'adforge-ai',
      meta: {
        title: 'AdForge AI — 19 Tools Iklan AI untuk ROAS Maksimal | BerkahKarya',
        description: 'Hook Generator, VSL Script, ROAS Calculator, Retargeting — 19 tools AI iklan dalam 1 dashboard. 50 slot early bird.',
      },
      hero: {
        eyebrow: '📢 ADFORGE AI — 19 TOOLS IKLAN',
        title: 'Budget Habis. ROAS Tetap\nSegitu-Segitu Aja?',
        description: '19 AI tools iklan dalam 1 platform: Hook Generator, VSL Script Writer, ROAS Calculator, Retargeting Planner. Ketik produk + target → AI generate 2 variasi iklan → copy paste ke Meta/TikTok.',
        buttons: [
          { text: 'Coba 19 Tools Gratis →', href: `${WA}?text=Halo%2C%20saya%20mau%20coba%20AdForge%20AI`, primary: true },
          { text: 'Lihat 19 Tools', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Ini Masalahnya: Budget terus keluar, tapi konversi ga naik-naik.',
        pains: [
          { icon: '🔥', text: 'Budget ads habis jutaan, ROAS cuma 1.5x — ga profitable.' },
          { icon: '✍️', text: 'Nulis copywriting iklan butuh 2-3 jam per variasi. Testing lambat.' },
          { icon: '🤷', text: 'Ga tau formula hook yang works. Trial error terus sampai budget habis.' },
          { icon: '📊', text: 'Ga punya sistem tracking ROAS per creative. Ga tau mana yang convert.' },
        ],
        bridge: 'AdForge AI kasih Anda 19 senjata iklan yang dipakai top advertiser — semua powered by AI.',
      },
      features: [
        { icon: '🎣', title: 'Hook Generator', desc: '50+ formula hook viral untuk Meta & TikTok Ads. AI generate hook yang bikin thumb-stop.' },
        { icon: '🎬', title: 'VSL Script Writer', desc: 'AI tulis Video Sales Letter script yang convert. Framework AIDA, PAS, dan custom.' },
        { icon: '📊', title: 'ROAS Calculator', desc: 'Hitung break-even ROAS, target CPA, dan profit margin per produk otomatis.' },
        { icon: '🔄', title: 'Retargeting Planner', desc: 'AI susun retargeting sequence: warm audience, cart abandoner, past buyer.' },
        { icon: '🧪', title: 'A/B Copy Generator', desc: 'Generate 2 variasi iklan sekaligus. Tinggal test, lihat mana yang menang.' },
        { icon: '🎯', title: 'Audience Builder', desc: 'AI suggest interest, behavior, dan lookalike audience berdasarkan produk Anda.' },
      ],
      howItWorks: {
        title: 'Cara Kerja — 3 Langkah',
        steps: [
          { num: '01', title: 'Input Produk & Target', desc: 'Ketik nama produk, target market, dan budget. AI pahami konteks bisnis Anda.' },
          { num: '02', title: 'AI Generate 2 Variasi', desc: 'Dalam 30 detik, AI generate 2 variasi copy iklan lengkap: headline, body, CTA.' },
          { num: '03', title: 'Copy-Paste & Launch', desc: 'Copy paste ke Meta Ads atau TikTok Ads Manager. Langsung launch, langsung test.' },
        ],
      },
      testimonials: {
        title: 'Kata Advertiser yang Sudah Pakai',
        items: [
          { quote: 'ROAS naik dari 1.8x ke 4.2x dalam 2 minggu. Hook Generator-nya gila — thumb-stop rate naik 3x lipat.', name: 'Budi T.', role: 'Performance Marketer', avatar: '👨' },
          { quote: 'Dulu nulis 1 copy ads 2 jam. Sekarang 30 detik dapet 2 variasi. Testing jadi 10x lebih cepat.', name: 'Sari M.', role: 'E-commerce Owner', avatar: '👩' },
          { quote: 'VSL Script Writer mengubah game saya. Conversion rate video ads naik 180% setelah pakai script dari AdForge.', name: 'Reza A.', role: 'Dropshipper', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Free Trial', price: 'GRATIS', period: '', features: ['5 tools dasar', '10 generate/hari', 'Hook Generator', 'ROAS Calculator'], cta: { text: 'Coba Gratis →', href: `${WA}?text=Halo%2C%20mau%20coba%20AdForge%20AI%20gratis` } },
        { name: 'Early Bird', price: 'Rp 99K', period: '/bulan', highlight: true, features: ['19 tools lengkap', 'Unlimited generate', 'VSL Script Writer', 'Retargeting Planner', 'A/B Copy Generator', 'Priority support', '🔥 50 slot only'], cta: { text: 'Ambil Slot Early Bird →', href: `${WA}?text=Halo%2C%20mau%20slot%20Early%20Bird%20AdForge%20AI` } },
        { name: 'Agency', price: 'Rp 299K', period: '/bulan', features: ['Semua fitur Early Bird', 'Multi-brand (5 brand)', 'Team collaboration', 'White-label report', 'Dedicated account manager'], cta: { text: 'Hubungi Kami →', href: `${WA}?text=Halo%2C%20mau%20paket%20Agency%20AdForge%20AI` } },
      ],
      faq: {
        title: 'Pertanyaan Umum',
        items: [
          { q: 'Ada 19 tools apa saja?', a: 'Hook Generator, VSL Script, ROAS Calculator, Retargeting Planner, A/B Copy, Audience Builder, Headline Optimizer, CTA Generator, Ad Angle Finder, Budget Allocator, Creative Brief, Landing Page Copy, Email Sequence, Offer Stack Builder, Objection Handler, Social Proof Writer, Urgency Creator, Benefit Extractor, dan Competitor Ad Analyzer.' },
          { q: 'Bisa untuk Meta Ads dan TikTok Ads?', a: 'Ya, semua tools sudah optimized untuk Meta (Facebook/Instagram) dan TikTok Ads. Output langsung bisa di-copy paste ke Ads Manager.' },
          { q: 'Apa bedanya dengan ChatGPT?', a: 'AdForge AI punya framework iklan spesifik Indonesia, database hook viral, dan formula yang sudah terbukti convert — bukan prompt generic.' },
          { q: 'Early Bird 50 slot, serius?', a: 'Ya, harga Rp 99K/bulan hanya untuk 50 user pertama. Setelah slot habis, harga naik ke Rp 299K/bulan.' },
        ],
      },
      cta: {
        title: '50 Slot Early Bird — Jangan Sampai Kehabisan',
        description: '19 tools iklan AI seharga Rp 99K/bulan. Setelah 50 slot habis, harga naik 3x lipat.',
        button: { text: 'Ambil Slot Sekarang →', href: `${WA}?text=Halo%2C%20mau%20slot%20Early%20Bird%20AdForge%20AI` },
      },
    },
    en: {
      slug: 'adforge-ai',
      meta: {
        title: 'AdForge AI — 19 AI Ad Tools for Maximum ROAS | BerkahKarya',
        description: 'Hook Generator, VSL Script, ROAS Calculator, Retargeting — 19 AI ad tools in 1 dashboard. 50 early bird slots.',
      },
      hero: {
        eyebrow: '📢 ADFORGE AI — 19 AD TOOLS',
        title: 'Budget Gone. ROAS Still\nStuck at the Same Number?',
        description: '19 AI ad tools in 1 platform: Hook Generator, VSL Script Writer, ROAS Calculator, Retargeting Planner. Type product + target → AI generates 2 ad variations → copy paste to Meta/TikTok.',
        buttons: [
          { text: 'Try 19 Tools Free →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AdForge%20AI`, primary: true },
          { text: 'See All 19 Tools', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Here\'s the Problem: Budget keeps flowing out, but conversions won\'t budge.',
        pains: [
          { icon: '🔥', text: 'Ad budget burning through thousands, ROAS only 1.5x — not profitable.' },
          { icon: '✍️', text: 'Writing ad copy takes 2-3 hours per variation. Testing is painfully slow.' },
          { icon: '🤷', text: 'No idea which hook formulas work. Trial and error until budget runs dry.' },
          { icon: '📊', text: 'No system to track ROAS per creative. Can\'t tell what\'s converting.' },
        ],
        bridge: 'AdForge AI gives you 19 ad weapons used by top advertisers — all powered by AI.',
      },
      features: [
        { icon: '🎣', title: 'Hook Generator', desc: '50+ viral hook formulas for Meta & TikTok Ads. AI generates thumb-stopping hooks.' },
        { icon: '🎬', title: 'VSL Script Writer', desc: 'AI writes converting Video Sales Letter scripts. AIDA, PAS, and custom frameworks.' },
        { icon: '📊', title: 'ROAS Calculator', desc: 'Calculate break-even ROAS, target CPA, and profit margin per product automatically.' },
        { icon: '🔄', title: 'Retargeting Planner', desc: 'AI builds retargeting sequences: warm audience, cart abandoners, past buyers.' },
        { icon: '🧪', title: 'A/B Copy Generator', desc: 'Generate 2 ad variations at once. Just test and see which wins.' },
        { icon: '🎯', title: 'Audience Builder', desc: 'AI suggests interests, behaviors, and lookalike audiences based on your product.' },
      ],
      howItWorks: {
        title: 'How It Works — 3 Steps',
        steps: [
          { num: '01', title: 'Input Product & Target', desc: 'Type your product name, target market, and budget. AI understands your business context.' },
          { num: '02', title: 'AI Generates 2 Variations', desc: 'In 30 seconds, AI generates 2 complete ad copy variations: headline, body, CTA.' },
          { num: '03', title: 'Copy-Paste & Launch', desc: 'Copy paste to Meta Ads or TikTok Ads Manager. Launch immediately, test immediately.' },
        ],
      },
      testimonials: {
        title: 'What Advertisers Are Saying',
        items: [
          { quote: 'ROAS jumped from 1.8x to 4.2x in 2 weeks. The Hook Generator is insane — thumb-stop rate tripled.', name: 'Budi T.', role: 'Performance Marketer', avatar: '👨' },
          { quote: 'Used to spend 2 hours on 1 ad copy. Now 30 seconds for 2 variations. Testing is 10x faster.', name: 'Sari M.', role: 'E-commerce Owner', avatar: '👩' },
          { quote: 'VSL Script Writer changed my game. Video ad conversion rate up 180% after using AdForge scripts.', name: 'Reza A.', role: 'Dropshipper', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Free Trial', price: 'FREE', period: '', features: ['5 basic tools', '10 generations/day', 'Hook Generator', 'ROAS Calculator'], cta: { text: 'Try Free →', href: `${WA}?text=Hello%2C%20I%20want%20to%20try%20AdForge%20AI%20free` } },
        { name: 'Early Bird', price: '$6.59', period: '/mo', highlight: true, features: ['All 19 tools', 'Unlimited generations', 'VSL Script Writer', 'Retargeting Planner', 'A/B Copy Generator', 'Priority support', '🔥 50 slots only'], cta: { text: 'Grab Early Bird Slot →', href: `${WA}?text=Hello%2C%20I%20want%20Early%20Bird%20slot%20AdForge%20AI` } },
        { name: 'Agency', price: '$19.99', period: '/mo', features: ['All Early Bird features', 'Multi-brand (5 brands)', 'Team collaboration', 'White-label reports', 'Dedicated account manager'], cta: { text: 'Contact Us →', href: `${WA}?text=Hello%2C%20I%20want%20Agency%20plan%20AdForge%20AI` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'What are all 19 tools?', a: 'Hook Generator, VSL Script, ROAS Calculator, Retargeting Planner, A/B Copy, Audience Builder, Headline Optimizer, CTA Generator, Ad Angle Finder, Budget Allocator, Creative Brief, Landing Page Copy, Email Sequence, Offer Stack Builder, Objection Handler, Social Proof Writer, Urgency Creator, Benefit Extractor, and Competitor Ad Analyzer.' },
          { q: 'Does it work for Meta Ads and TikTok Ads?', a: 'Yes, all tools are optimized for Meta (Facebook/Instagram) and TikTok Ads. Output can be directly copy-pasted to Ads Manager.' },
          { q: 'How is this different from ChatGPT?', a: 'AdForge AI has specific ad frameworks for the Indonesian market, viral hook databases, and proven conversion formulas — not generic prompts.' },
          { q: 'Are the 50 early bird slots real?', a: 'Yes, the $6.59/month price is only for the first 50 users. After slots are filled, price goes up to $19.99/month.' },
        ],
      },
      cta: {
        title: '50 Early Bird Slots — Don\'t Miss Out',
        description: '19 AI ad tools for $6.59/month. After 50 slots are gone, price triples.',
        button: { text: 'Grab Your Slot Now →', href: `${WA}?text=Hello%2C%20I%20want%20Early%20Bird%20slot%20AdForge%20AI` },
      },
    },
  },

  // ============================================================
  // 3. AI AGENT PRO
  // ============================================================
  'ai-agent-pro': {
    id: {
      slug: 'ai-agent-pro',
      meta: {
        title: 'AI Agent Pro — WhatsApp AI Respon <2 Detik, 24/7 | BerkahKarya',
        description: '65% lead hilang karena tidak dibalas. AI Agent Pro respon WhatsApp <2 detik, 24/7, follow-up otomatis. Hemat 60% biaya CS.',
      },
      hero: {
        eyebrow: '🤖 AI AGENT PRO — WHATSAPP AI',
        title: '65% Lead Kamu Hilang\nSetiap Hari.',
        description: 'Itu rugi Rp 21 juta/bulan. AI Agent Pro respon WhatsApp customer <2 detik, 24/7 non-stop, follow-up otomatis sampai closing. Hemat 60% biaya CS.',
        buttons: [
          { text: 'Aktifkan AI Agent →', href: `${WA}?text=Halo%2C%20saya%20mau%20aktifkan%20AI%20Agent%20Pro`, primary: true },
          { text: 'Lihat Demo', href: '#how-it-works', primary: false },
        ],
      },
      problem: {
        hook: '65% lead hilang bukan karena produk Anda jelek — tapi karena tidak dibalas tepat waktu.',
        pains: [
          { icon: '📱', text: '65% chat masuk tidak dibalas dalam 5 menit. Lead pergi ke kompetitor.' },
          { icon: '😴', text: 'Jam 10 malam customer chat? Besok pagi baru dibalas = lead sudah cold.' },
          { icon: '👥', text: 'CS overloaded — 1 CS handle 50+ chat. Response time amburadul.' },
          { icon: '💸', text: 'Kerugian Rp 21.25 juta/bulan dari lead yang tidak di-follow-up.' },
        ],
        bridge: 'AI Agent Pro jaga setiap lead 24/7. Respon <2 detik. Follow-up otomatis. Tidak pernah lupa, tidak pernah cape.',
      },
      features: [
        { icon: '⚡', title: 'Respon <2 Detik', desc: 'AI balas chat WhatsApp dalam hitungan detik. Tidak ada lead yang menunggu.' },
        { icon: '🕐', title: '24/7 Non-Stop', desc: '168 jam/minggu aktif. Subuh, malam, weekend, tanggal merah — always on.' },
        { icon: '🔄', title: 'Follow-up Otomatis', desc: 'AI follow-up lead yang belum closing. Sequence otomatis sampai deal atau opt-out.' },
        { icon: '🧠', title: 'Paham Produk Anda', desc: 'Train AI dengan katalog, harga, FAQ, SOP bisnis Anda. Jawab seperti CS terbaik.' },
        { icon: '📊', title: 'Dashboard Analytics', desc: 'Track response time, conversion rate, lead score, dan performa real-time.' },
        { icon: '🔗', title: 'Multi-Channel', desc: 'WhatsApp, Instagram DM, Telegram, website chat — semua dari 1 dashboard.' },
      ],
      howItWorks: {
        title: 'Setup Cuma 15 Menit',
        steps: [
          { num: '01', title: 'Connect WhatsApp', desc: 'Hubungkan nomor WhatsApp bisnis Anda. Setup cuma 15 menit, tanpa coding.' },
          { num: '02', title: 'Train AI Anda', desc: 'Upload katalog produk, FAQ, dan SOP. AI belajar bisnis Anda dalam hitungan menit.' },
          { num: '03', title: 'AI Mulai Kerja', desc: 'AI langsung respon chat, handle inquiry, dan follow-up lead 24/7.' },
          { num: '04', title: 'Monitor & Optimize', desc: 'Pantau performa di dashboard. AI makin pintar seiring waktu.' },
        ],
      },
      testimonials: {
        title: 'Kata Pemilik Bisnis yang Sudah Pakai',
        items: [
          { quote: 'Closing rate naik 2.5x setelah pakai AI Agent. Lead yang tadinya hilang sekarang di-follow-up otomatis sampai deal.', name: 'Hendri W.', role: 'Owner Toko Elektronik', avatar: '👨' },
          { quote: 'Hemat 2 CS staff. AI handle 80% chat rutin. Tim CS fokus handle case kompleks aja.', name: 'Lina D.', role: 'Manager CS E-commerce', avatar: '👩' },
          { quote: 'Yang paling kerasa: lead jam 11 malam langsung direspon. Sebelumnya itu semua lost.', name: 'Fajar R.', role: 'Owner Properti', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Starter', price: 'Rp 299K', period: '/bulan', features: ['1 WhatsApp number', '500 chat/bulan', 'Basic AI response', 'Working hours only', 'Email support'], cta: { text: 'Pilih Starter →', href: `${WA}?text=Halo%2C%20mau%20paket%20Starter%20AI%20Agent` } },
        { name: 'Business', price: 'Rp 799K', period: '/bulan', highlight: true, features: ['1 WhatsApp number', '3.000 chat/bulan', 'Smart AI + follow-up', '24/7 active', 'Custom knowledge', 'Dashboard analytics', 'Priority support'], cta: { text: 'Pilih Business →', href: `${WA}?text=Halo%2C%20mau%20paket%20Business%20AI%20Agent` } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Multi-number', 'Unlimited chat', 'Advanced AI + CRM', '24/7 + human fallback', 'Custom integration', 'Dedicated engineer', 'SLA guarantee'], cta: { text: 'Hubungi Kami →', href: `${WA}?text=Halo%2C%20mau%20paket%20Enterprise%20AI%20Agent` } },
      ],
      faq: {
        title: 'Pertanyaan Umum',
        items: [
          { q: 'Apakah AI bisa jawab pertanyaan spesifik tentang produk saya?', a: 'Ya, Anda train AI dengan data produk, harga, stok, FAQ, dan SOP bisnis. AI akan jawab sesuai knowledge yang Anda berikan.' },
          { q: 'Bagaimana kalau AI tidak bisa jawab?', a: 'AI akan escalate ke CS manusia. Customer tidak pernah stuck — selalu ada fallback ke tim Anda.' },
          { q: 'Apakah customer tahu sedang chat dengan AI?', a: 'Bisa di-set transparan (AI disclosure) atau seamless. AI menggunakan tone dan gaya bahasa yang natural.' },
          { q: 'Berapa lama setup?', a: '15 menit untuk basic setup. Training knowledge base 1-2 jam tergantung jumlah data produk.' },
          { q: 'Bisa integrasi dengan CRM yang sudah ada?', a: 'Ya, kami support integrasi dengan berbagai CRM, Google Sheets, dan tools bisnis lainnya via API.' },
        ],
      },
      cta: {
        title: 'Stop Kehilangan 65% Lead Anda',
        description: 'Aktifkan AI Agent Pro sekarang. Setiap menit tanpa AI = lead yang hilang ke kompetitor.',
        button: { text: 'Aktifkan AI Agent →', href: `${WA}?text=Halo%2C%20saya%20mau%20aktifkan%20AI%20Agent%20Pro` },
      },
    },
    en: {
      slug: 'ai-agent-pro',
      meta: {
        title: 'AI Agent Pro — WhatsApp AI Response <2 Seconds, 24/7 | BerkahKarya',
        description: '65% of leads are lost because they\'re not replied to. AI Agent Pro responds on WhatsApp in <2 seconds, 24/7, with auto follow-up. Save 60% CS costs.',
      },
      hero: {
        eyebrow: '🤖 AI AGENT PRO — WHATSAPP AI',
        title: '65% of Your Leads\nDisappear Every Day.',
        description: 'That\'s $1,400/month lost. AI Agent Pro responds to WhatsApp messages in <2 seconds, 24/7 non-stop, auto follow-up until closing. Save 60% on CS costs.',
        buttons: [
          { text: 'Activate AI Agent →', href: `${WA}?text=Hello%2C%20I%20want%20to%20activate%20AI%20Agent%20Pro`, primary: true },
          { text: 'See Demo', href: '#how-it-works', primary: false },
        ],
      },
      problem: {
        hook: '65% of leads are lost not because your product is bad — but because they weren\'t replied to in time.',
        pains: [
          { icon: '📱', text: '65% of incoming chats aren\'t replied to within 5 minutes. Leads go to competitors.' },
          { icon: '😴', text: 'Customer messages at 10 PM? Reply next morning = lead already cold.' },
          { icon: '👥', text: 'CS overloaded — 1 agent handling 50+ chats. Response time is chaos.' },
          { icon: '💸', text: '$1,400/month lost from leads that aren\'t followed up.' },
        ],
        bridge: 'AI Agent Pro guards every lead 24/7. Response in <2 seconds. Auto follow-up. Never forgets, never gets tired.',
      },
      features: [
        { icon: '⚡', title: 'Response <2 Seconds', desc: 'AI replies to WhatsApp chats in seconds. No lead is left waiting.' },
        { icon: '🕐', title: '24/7 Non-Stop', desc: '168 hours/week active. Dawn, midnight, weekends, holidays — always on.' },
        { icon: '🔄', title: 'Auto Follow-up', desc: 'AI follows up leads that haven\'t closed. Automatic sequence until deal or opt-out.' },
        { icon: '🧠', title: 'Knows Your Products', desc: 'Train AI with your catalog, pricing, FAQs, business SOPs. Answers like your best CS agent.' },
        { icon: '📊', title: 'Analytics Dashboard', desc: 'Track response time, conversion rate, lead score, and real-time performance.' },
        { icon: '🔗', title: 'Multi-Channel', desc: 'WhatsApp, Instagram DM, Telegram, website chat — all from 1 dashboard.' },
      ],
      howItWorks: {
        title: 'Setup Takes Only 15 Minutes',
        steps: [
          { num: '01', title: 'Connect WhatsApp', desc: 'Connect your business WhatsApp number. Setup takes just 15 minutes, no coding required.' },
          { num: '02', title: 'Train Your AI', desc: 'Upload product catalog, FAQs, and SOPs. AI learns your business in minutes.' },
          { num: '03', title: 'AI Starts Working', desc: 'AI immediately responds to chats, handles inquiries, and follows up leads 24/7.' },
          { num: '04', title: 'Monitor & Optimize', desc: 'Monitor performance on the dashboard. AI gets smarter over time.' },
        ],
      },
      testimonials: {
        title: 'What Business Owners Are Saying',
        items: [
          { quote: 'Closing rate up 2.5x after using AI Agent. Leads that used to disappear are now auto-followed-up until deal.', name: 'Hendri W.', role: 'Electronics Store Owner', avatar: '👨' },
          { quote: 'Saved 2 CS staff. AI handles 80% of routine chats. CS team focuses on complex cases only.', name: 'Lina D.', role: 'E-commerce CS Manager', avatar: '👩' },
          { quote: 'The biggest impact: leads at 11 PM get instant responses. Before, those were all lost.', name: 'Fajar R.', role: 'Property Business Owner', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Starter', price: '$19.99', period: '/mo', features: ['1 WhatsApp number', '500 chats/month', 'Basic AI response', 'Working hours only', 'Email support'], cta: { text: 'Choose Starter →', href: `${WA}?text=Hello%2C%20I%20want%20Starter%20plan%20AI%20Agent` } },
        { name: 'Business', price: '$53', period: '/mo', highlight: true, features: ['1 WhatsApp number', '3,000 chats/month', 'Smart AI + follow-up', '24/7 active', 'Custom knowledge', 'Dashboard analytics', 'Priority support'], cta: { text: 'Choose Business →', href: `${WA}?text=Hello%2C%20I%20want%20Business%20plan%20AI%20Agent` } },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Multi-number', 'Unlimited chats', 'Advanced AI + CRM', '24/7 + human fallback', 'Custom integration', 'Dedicated engineer', 'SLA guarantee'], cta: { text: 'Contact Us →', href: `${WA}?text=Hello%2C%20I%20want%20Enterprise%20plan%20AI%20Agent` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Can AI answer specific questions about my products?', a: 'Yes, you train AI with your product data, pricing, stock, FAQs, and business SOPs. AI answers based on the knowledge you provide.' },
          { q: 'What if AI can\'t answer?', a: 'AI will escalate to a human CS agent. Customers are never stuck — there\'s always a fallback to your team.' },
          { q: 'Will customers know they\'re chatting with AI?', a: 'Can be set as transparent (AI disclosure) or seamless. AI uses natural tone and language style.' },
          { q: 'How long does setup take?', a: '15 minutes for basic setup. Knowledge base training takes 1-2 hours depending on product data volume.' },
          { q: 'Can it integrate with my existing CRM?', a: 'Yes, we support integration with various CRMs, Google Sheets, and other business tools via API.' },
        ],
      },
      cta: {
        title: 'Stop Losing 65% of Your Leads',
        description: 'Activate AI Agent Pro now. Every minute without AI = leads lost to competitors.',
        button: { text: 'Activate AI Agent →', href: `${WA}?text=Hello%2C%20I%20want%20to%20activate%20AI%20Agent%20Pro` },
      },
    },
  },

  // ============================================================
  // 4. ALGORITHMIC TRADING
  // ============================================================
  'algorithmic-trading': {
    id: {
      slug: 'algorithmic-trading',
      meta: {
        title: 'Algorithmic Trading — Stop Trading Pakai Feeling, Mulai Pakai Sistem | BerkahKarya',
        description: 'Signal & algo XAUUSD/Forex/Crypto. 7-Candle Breakout Protocol, 58-65% win rate, 1:2+ RR. Backtested. Asia session 15:00 WIB.',
      },
      hero: {
        eyebrow: '📈 ALGORITHMIC TRADING',
        title: 'Stop Trading Pakai Feeling.\nMulai Pakai Sistem.',
        description: 'Signal & algorithmic trading XAUUSD, Forex, Crypto. 7-Candle Breakout Protocol C dengan 58-65% win rate dan 1:2+ risk-reward. Backtested, bukan gambling.',
        buttons: [
          { text: 'Gabung Sekarang →', href: `${WA}?text=Halo%2C%20saya%20tertarik%20Algo%20Trading%20BerkahKarya`, primary: true },
          { text: 'Lihat Track Record', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Trading pakai emosi = transfer uang ke market maker.',
        pains: [
          { icon: '😰', text: 'Trading pakai feeling — kadang profit, lebih sering loss. Emosi naik turun.' },
          { icon: '🌙', text: 'Begadang pantau chart sampai subuh. Kesehatan rusak, hasil tetap minus.' },
          { icon: '📉', text: 'Strategi pinjam sana-sini, belum pernah dibacktest. Ga tau edge-nya dimana.' },
          { icon: '💸', text: 'Sudah habis jutaan untuk course trading, tapi hasilnya masih minus.' },
        ],
        bridge: 'Algorithmic Trading menghilangkan emosi dari equation. Sistem yang sudah dibacktest, bukan feeling.',
      },
      features: [
        { icon: '📊', title: '7-Candle Breakout Protocol', desc: 'Strategi proprietary kami: 7-Candle Breakout Protocol C. Backtested dengan data historis.' },
        { icon: '🎯', title: '58-65% Win Rate', desc: 'Win rate konsisten 58-65%. Bukan janji 90% palsu, tapi edge yang real dan sustainable.' },
        { icon: '⚖️', title: '1:2+ Risk-Reward', desc: 'Minimum risk-reward ratio 1:2. Artinya 1 win bisa cover 2 loss dan masih profit.' },
        { icon: '🕐', title: 'Asia Session 15:00 WIB', desc: 'Fokus di Asia session jam 15:00 WIB. Tidak perlu begadang, trading di jam kerja normal.' },
        { icon: '🧪', title: 'Fully Backtested', desc: 'Semua strategi dibacktest sebelum live. Data driven, bukan prediction atau feeling.' },
        { icon: '📱', title: 'Signal via Telegram', desc: 'Signal dikirim langsung ke Telegram Anda. Entry, SL, TP sudah ditentukan — tinggal eksekusi.' },
      ],
      howItWorks: {
        title: 'Cara Kerja',
        steps: [
          { num: '01', title: 'Join Channel', desc: 'Gabung Telegram channel kami. Anda akan mendapat akses ke signal dan edukasi trading.' },
          { num: '02', title: 'Terima Signal', desc: 'Signal masuk di jam Asia session (15:00 WIB). Entry price, Stop Loss, Take Profit sudah jelas.' },
          { num: '03', title: 'Eksekusi di Broker', desc: 'Copy signal ke broker Anda (MT4/MT5). Atau gunakan auto-copy untuk eksekusi otomatis.' },
          { num: '04', title: 'Review & Belajar', desc: 'Weekly review: kenapa entry, kenapa skip. Anda belajar sistem, bukan cuma ikut signal.' },
        ],
      },
      testimonials: {
        title: 'Kata Member Trading Kami',
        items: [
          { quote: 'Setelah 2 tahun rugi trading sendiri, akhirnya konsisten profit pakai sistem ini. Win rate memang 58-65%, tapi RR 1:2+ yang bikin profitable.', name: 'Dimas H.', role: 'Trader XAUUSD', avatar: '👨' },
          { quote: 'Paling suka karena ga perlu begadang. Asia session jam 15:00 WIB, selesai di jam kerja normal.', name: 'Putri N.', role: 'Part-time Trader', avatar: '👩' },
          { quote: 'Edukasi-nya yang paling berharga. Saya bukan cuma ikut signal, tapi paham kenapa entry dan kenapa skip.', name: 'Arief S.', role: 'Swing Trader', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Signal Only', price: 'Rp 199K', period: '/bulan', features: ['Daily signal XAUUSD', 'Entry, SL, TP jelas', 'Telegram delivery', 'Basic market update'], cta: { text: 'Pilih Signal →', href: `${WA}?text=Halo%2C%20mau%20paket%20Signal%20Algo%20Trading` } },
        { name: 'Signal + Edukasi', price: 'Rp 499K', period: '/bulan', highlight: true, features: ['Semua fitur Signal', 'Weekly review session', 'Edukasi 7-Candle Protocol', 'Multi-pair (Forex + Crypto)', 'Community access', 'Priority support'], cta: { text: 'Pilih Signal + Edu →', href: `${WA}?text=Halo%2C%20mau%20paket%20Signal%20%2B%20Edukasi%20Algo%20Trading` } },
        { name: 'Auto-Copy', price: 'Rp 999K', period: '/bulan', features: ['Semua fitur Edu', 'Auto-copy ke MT4/MT5', 'Risk management otomatis', 'Real-time monitoring', 'Monthly performance report'], cta: { text: 'Pilih Auto-Copy →', href: `${WA}?text=Halo%2C%20mau%20paket%20Auto-Copy%20Algo%20Trading` } },
      ],
      faq: {
        title: 'Pertanyaan Umum',
        items: [
          { q: 'Apakah ini MLM atau investasi bodong?', a: 'Tidak. Kami memberikan signal dan edukasi trading. Anda trade di broker Anda sendiri. Dana tetap di akun Anda, kami tidak pernah minta transfer dana.' },
          { q: 'Berapa modal minimum?', a: 'Rekomendasi minimal $200-500. Bisa mulai dari lebih kecil, tapi risk management jadi lebih sulit.' },
          { q: 'Apakah pasti profit?', a: 'TIDAK ADA yang pasti di trading. Win rate kami 58-65%, artinya ada 35-42% loss. Yang membuat profitable adalah konsistensi sistem dan risk-reward 1:2+.' },
          { q: 'Pair apa saja?', a: 'Fokus utama XAUUSD (gold). Paket Edukasi termasuk major forex pairs dan beberapa crypto.' },
          { q: 'Broker apa yang direkomendasikan?', a: 'Kami tidak affiliate dengan broker manapun. Anda bebas pakai broker pilihan yang support MT4/MT5.' },
        ],
      },
      cta: {
        title: 'Mulai Trading dengan Sistem, Bukan Feeling',
        description: 'Trading mengandung risiko. Hanya gunakan dana yang Anda siap kehilangan. Past performance bukan jaminan hasil di masa depan.',
        button: { text: 'Gabung Sekarang →', href: `${WA}?text=Halo%2C%20saya%20mau%20gabung%20Algo%20Trading` },
      },
    },
    en: {
      slug: 'algorithmic-trading',
      meta: {
        title: 'Algorithmic Trading — Stop Trading on Feelings, Start Using a System | BerkahKarya',
        description: 'Signals & algo for XAUUSD/Forex/Crypto. 7-Candle Breakout Protocol, 58-65% win rate, 1:2+ RR. Backtested. Asia session.',
      },
      hero: {
        eyebrow: '📈 ALGORITHMIC TRADING',
        title: 'Stop Trading on Feelings.\nStart Using a System.',
        description: 'Signals & algorithmic trading for XAUUSD, Forex, Crypto. 7-Candle Breakout Protocol C with 58-65% win rate and 1:2+ risk-reward. Backtested, not gambling.',
        buttons: [
          { text: 'Join Now →', href: `${WA}?text=Hello%2C%20I%27m%20interested%20in%20Algo%20Trading%20BerkahKarya`, primary: true },
          { text: 'View Track Record', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Trading on emotions = transferring money to market makers.',
        pains: [
          { icon: '😰', text: 'Trading on feelings — sometimes profit, more often loss. Emotions all over the place.' },
          { icon: '🌙', text: 'Staying up all night watching charts. Health ruined, account still negative.' },
          { icon: '📉', text: 'Strategies borrowed from everywhere, never backtested. No idea where the edge is.' },
          { icon: '💸', text: 'Spent thousands on trading courses, but results are still negative.' },
        ],
        bridge: 'Algorithmic Trading removes emotion from the equation. A backtested system, not feelings.',
      },
      features: [
        { icon: '📊', title: '7-Candle Breakout Protocol', desc: 'Our proprietary strategy: 7-Candle Breakout Protocol C. Backtested with historical data.' },
        { icon: '🎯', title: '58-65% Win Rate', desc: 'Consistent 58-65% win rate. Not fake 90% promises, but a real and sustainable edge.' },
        { icon: '⚖️', title: '1:2+ Risk-Reward', desc: 'Minimum 1:2 risk-reward ratio. Meaning 1 win can cover 2 losses and still be profitable.' },
        { icon: '🕐', title: 'Asia Session Focus', desc: 'Focus on Asia session. No staying up late, trade during normal working hours.' },
        { icon: '🧪', title: 'Fully Backtested', desc: 'All strategies are backtested before going live. Data-driven, not prediction or feelings.' },
        { icon: '📱', title: 'Signals via Telegram', desc: 'Signals delivered directly to your Telegram. Entry, SL, TP are predetermined — just execute.' },
      ],
      howItWorks: {
        title: 'How It Works',
        steps: [
          { num: '01', title: 'Join Channel', desc: 'Join our Telegram channel. You\'ll get access to signals and trading education.' },
          { num: '02', title: 'Receive Signals', desc: 'Signals come during Asia session. Entry price, Stop Loss, Take Profit are clearly defined.' },
          { num: '03', title: 'Execute at Broker', desc: 'Copy signals to your broker (MT4/MT5). Or use auto-copy for automatic execution.' },
          { num: '04', title: 'Review & Learn', desc: 'Weekly review: why we entered, why we skipped. You learn the system, not just follow signals.' },
        ],
      },
      testimonials: {
        title: 'What Our Trading Members Say',
        items: [
          { quote: 'After 2 years of losing trading on my own, finally consistently profitable with this system. Win rate is indeed 58-65%, but the 1:2+ RR makes it profitable.', name: 'Dimas H.', role: 'XAUUSD Trader', avatar: '👨' },
          { quote: 'Best part: no staying up late. Asia session during normal working hours.', name: 'Putri N.', role: 'Part-time Trader', avatar: '👩' },
          { quote: 'The education is the most valuable part. I don\'t just follow signals, I understand why we enter and why we skip.', name: 'Arief S.', role: 'Swing Trader', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Signal Only', price: '$13.29', period: '/mo', features: ['Daily XAUUSD signals', 'Clear Entry, SL, TP', 'Telegram delivery', 'Basic market updates'], cta: { text: 'Choose Signal →', href: `${WA}?text=Hello%2C%20I%20want%20Signal%20plan%20Algo%20Trading` } },
        { name: 'Signal + Education', price: '$33', period: '/mo', highlight: true, features: ['All Signal features', 'Weekly review sessions', '7-Candle Protocol education', 'Multi-pair (Forex + Crypto)', 'Community access', 'Priority support'], cta: { text: 'Choose Signal + Edu →', href: `${WA}?text=Hello%2C%20I%20want%20Signal%20%2B%20Education%20Algo%20Trading` } },
        { name: 'Auto-Copy', price: '$66', period: '/mo', features: ['All Education features', 'Auto-copy to MT4/MT5', 'Automatic risk management', 'Real-time monitoring', 'Monthly performance report'], cta: { text: 'Choose Auto-Copy →', href: `${WA}?text=Hello%2C%20I%20want%20Auto-Copy%20Algo%20Trading` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Is this an MLM or investment scam?', a: 'No. We provide trading signals and education. You trade on your own broker. Your funds stay in your account — we never ask for fund transfers.' },
          { q: 'What is the minimum capital?', a: 'Recommended minimum $200-500. You can start smaller, but risk management becomes more challenging.' },
          { q: 'Is profit guaranteed?', a: 'NOTHING is guaranteed in trading. Our win rate is 58-65%, meaning 35-42% are losses. What makes it profitable is system consistency and 1:2+ risk-reward.' },
          { q: 'What pairs are covered?', a: 'Primary focus is XAUUSD (gold). Education package includes major forex pairs and select crypto.' },
          { q: 'Which broker is recommended?', a: 'We are not affiliated with any broker. You are free to use any broker that supports MT4/MT5.' },
        ],
      },
      cta: {
        title: 'Start Trading with a System, Not Feelings',
        description: 'Trading involves risk. Only use funds you can afford to lose. Past performance is not a guarantee of future results.',
        button: { text: 'Join Now →', href: `${WA}?text=Hello%2C%20I%20want%20to%20join%20Algo%20Trading` },
      },
    },
  },

  // ============================================================
  // 5. DIGITAL PRODUCTS
  // ============================================================
  'digital-products': {
    id: {
      slug: 'digital-products',
      meta: {
        title: 'Produk Digital AI — 7 Tools Mulai Rp 49K | BerkahKarya',
        description: 'AI Ad Engine, Creative Tools, Food Menu AI, Guru Pintar AI, JobMagnet AI, Parenting Guide, SellPix AI. Garansi 7 hari. GoPay/OVO/DANA.',
      },
      hero: {
        eyebrow: '📦 PRODUK DIGITAL — 7 AI TOOLS',
        title: 'AI Tools Siap Pakai\nMulai Rp 49K',
        description: '7 produk digital AI yang langsung bisa dipakai. Dari bikin iklan, desain menu, sampai cari kerja — semua dibantu AI. Garansi 7 hari uang kembali.',
        buttons: [
          { text: 'Lihat Semua Produk →', href: STORE, primary: true },
          { text: 'Lihat Katalog', href: '#catalog', primary: false },
        ],
      },
      problem: {
        hook: 'Banyak tools AI mahal yang sebenarnya bisa Anda dapatkan jauh lebih murah.',
        pains: [
          { icon: '💸', text: 'Tools AI internasional harga $20-100/bulan. Terlalu mahal untuk UMKM Indonesia.' },
          { icon: '🌐', text: 'Interface bahasa Inggris, contoh luar negeri — ga relevan untuk pasar Indonesia.' },
          { icon: '🤔', text: 'Bingung pilih tools mana yang benar-benar berguna untuk bisnis Anda.' },
          { icon: '⏰', text: 'Bayar subscription bulanan tapi cuma pakai sesekali. Uang terbuang.' },
        ],
        bridge: 'Produk digital kami: harga Indonesia, bahasa Indonesia, sekali bayar lifetime access.',
      },
      features: [
        { icon: '📢', title: 'AI Ad Engine', desc: 'Generate copy iklan yang convert. Headline, body, CTA — siap paste ke Meta/TikTok Ads.' },
        { icon: '🎨', title: 'AI Creative Tools', desc: 'Buat visual marketing tanpa skill desain. Template siap edit untuk sosmed & ads.' },
        { icon: '🍽️', title: 'Food Menu AI Studio', desc: 'Desain menu restoran/cafe otomatis. Upload foto makanan → menu profesional jadi.' },
        { icon: '👨‍🏫', title: 'Guru Pintar AI', desc: 'Tools untuk guru: buat soal, RPP, materi ajar, dan rubrik penilaian dengan AI.' },
        { icon: '💼', title: 'JobMagnet AI', desc: 'CV, cover letter, dan persiapan interview dengan AI. Tingkatkan peluang diterima kerja.' },
        { icon: '📸', title: 'SellPix AI', desc: 'Edit foto produk jadi profesional. Background removal, enhance, dan mockup otomatis.' },
      ],
      howItWorks: {
        title: 'Cara Beli & Pakai',
        steps: [
          { num: '01', title: 'Pilih Produk', desc: 'Browse 7 produk digital di store kami. Pilih yang sesuai kebutuhan.' },
          { num: '02', title: 'Bayar Instan', desc: 'Bayar via GoPay, OVO, DANA, atau transfer bank. Akses langsung setelah bayar.' },
          { num: '03', title: 'Langsung Pakai', desc: 'Download dan langsung pakai. Panduan lengkap disertakan di setiap produk.' },
        ],
      },
      testimonials: {
        title: 'Kata Pembeli Kami',
        items: [
          { quote: 'SellPix AI mengubah foto produk saya total. Dari foto HP biasa jadi kayak foto studio. Penjualan naik 30%.', name: 'Dewi S.', role: 'Online Shop Owner', avatar: '👩' },
          { quote: 'Guru Pintar AI sangat membantu. Bikin soal ujian yang biasanya 3 jam, sekarang 15 menit. Kualitas tetap bagus.', name: 'Pak Agus', role: 'Guru SMA', avatar: '👨' },
          { quote: 'AI Ad Engine worth it banget. Rp 75K sekali bayar, tapi copy iklan yang dihasilkan sudah menghasilkan jutaan.', name: 'Rico M.', role: 'Digital Marketer', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Satuan', price: 'Rp 49-75K', period: 'sekali bayar', features: ['1 produk pilihan', 'Lifetime access', 'Update gratis', 'Panduan lengkap', 'Garansi 7 hari'], cta: { text: 'Beli di Store →', href: STORE } },
        { name: 'Bundle 3', price: 'Rp 149K', period: 'sekali bayar', highlight: true, features: ['3 produk pilihan', 'Hemat sampai 40%', 'Lifetime access', 'Update gratis', 'Priority support', 'Garansi 7 hari'], cta: { text: 'Beli Bundle →', href: `${WA}?text=Halo%2C%20mau%20beli%20Bundle%203%20produk%20digital` } },
        { name: 'All Access', price: 'Rp 299K', period: 'sekali bayar', features: ['Semua 7 produk', 'Hemat 50%+', 'Lifetime access', 'Produk baru gratis', 'VIP support', 'Garansi 7 hari'], cta: { text: 'All Access →', href: `${WA}?text=Halo%2C%20mau%20All%20Access%20semua%20produk%20digital` } },
      ],
      faq: {
        title: 'Pertanyaan Umum',
        items: [
          { q: 'Apakah sekali bayar atau langganan?', a: 'Sekali bayar, lifetime access. Tidak ada biaya bulanan atau hidden fee.' },
          { q: 'Bagaimana garansi 7 hari?', a: 'Kalau tidak puas dalam 7 hari setelah pembelian, uang dikembalikan 100%. Tanpa drama, tanpa pertanyaan.' },
          { q: 'Bayar pakai apa?', a: 'GoPay, OVO, DANA, ShopeePay, transfer bank (BCA, BRI, Mandiri, BNI), dan QRIS.' },
          { q: 'Bisa dipakai di HP?', a: 'Ya, semua produk bisa diakses dari HP, tablet, atau laptop. Berbasis web, tidak perlu install.' },
          { q: 'Ada update setelah beli?', a: 'Ya, setiap update produk gratis. Anda juga dapat notifikasi kalau ada fitur baru.' },
        ],
      },
      cta: {
        title: 'Mulai dari Rp 49K — Garansi 7 Hari',
        description: 'Pilih produk yang Anda butuhkan. Tidak cocok? Uang kembali. Zero risiko.',
        button: { text: 'Buka Store →', href: STORE },
      },
      catalog: {
        title: 'Katalog Produk Digital',
        items: [
          { icon: '📢', name: 'AI Ad Engine', price: 'Rp 75K', desc: 'Generate copy iklan Meta & TikTok yang convert. Headline, body, CTA siap pakai.', href: STORE },
          { icon: '🎨', name: 'AI Creative Tools', price: 'Rp 75K', desc: 'Buat visual marketing tanpa skill desain. Template sosmed & ads siap edit.', href: STORE },
          { icon: '🍽️', name: 'Food Menu AI Studio', price: 'Rp 75K', desc: 'Desain menu restoran/cafe otomatis dari foto makanan Anda.', href: STORE },
          { icon: '👨‍🏫', name: 'Guru Pintar AI', price: 'Rp 75K', desc: 'Buat soal, RPP, materi ajar, dan rubrik penilaian dengan AI.', href: STORE },
          { icon: '💼', name: 'JobMagnet AI', price: 'Rp 75K', desc: 'CV, cover letter, dan persiapan interview AI. Tingkatkan peluang kerja.', href: STORE },
          { icon: '👶', name: 'Parenting Guide AI', price: 'Rp 49K', desc: 'Panduan parenting cerdas berbasis AI. Tips sesuai usia dan tahap tumbuh kembang.', href: STORE },
          { icon: '📸', name: 'SellPix AI', price: 'Rp 75K', desc: 'Edit foto produk jadi profesional. Background removal, enhance, mockup.', href: STORE },
        ],
      },
    },
    en: {
      slug: 'digital-products',
      meta: {
        title: 'Digital AI Products — 7 Tools Starting at $3.29 | BerkahKarya',
        description: 'AI Ad Engine, Creative Tools, Food Menu AI, Smart Teacher AI, JobMagnet AI, Parenting Guide, SellPix AI. 7-day guarantee. Instant payment.',
      },
      hero: {
        eyebrow: '📦 DIGITAL PRODUCTS — 7 AI TOOLS',
        title: 'Ready-to-Use AI Tools\nStarting at $3.29',
        description: '7 digital AI products ready to use immediately. From creating ads, designing menus, to job hunting — all powered by AI. 7-day money-back guarantee.',
        buttons: [
          { text: 'View All Products →', href: STORE, primary: true },
          { text: 'See Catalog', href: '#catalog', primary: false },
        ],
      },
      problem: {
        hook: 'Many expensive AI tools can actually be had for much less.',
        pains: [
          { icon: '💸', text: 'International AI tools cost $20-100/month. Too expensive for small businesses.' },
          { icon: '🌐', text: 'English interface, foreign examples — not relevant for the Indonesian market.' },
          { icon: '🤔', text: 'Confused about which tools are actually useful for your business.' },
          { icon: '⏰', text: 'Paying monthly subscriptions but only using them occasionally. Money wasted.' },
        ],
        bridge: 'Our digital products: local pricing, local language, one-time payment with lifetime access.',
      },
      features: [
        { icon: '📢', title: 'AI Ad Engine', desc: 'Generate converting ad copy. Headlines, body, CTA — ready to paste into Meta/TikTok Ads.' },
        { icon: '🎨', title: 'AI Creative Tools', desc: 'Create marketing visuals without design skills. Ready-to-edit templates for social & ads.' },
        { icon: '🍽️', title: 'Food Menu AI Studio', desc: 'Auto-design restaurant/cafe menus. Upload food photos → professional menu done.' },
        { icon: '👨‍🏫', title: 'Smart Teacher AI', desc: 'Tools for teachers: create exams, lesson plans, teaching materials, and rubrics with AI.' },
        { icon: '💼', title: 'JobMagnet AI', desc: 'CV, cover letter, and interview prep with AI. Increase your job acceptance chances.' },
        { icon: '📸', title: 'SellPix AI', desc: 'Turn product photos professional. Background removal, enhancement, and auto mockups.' },
      ],
      howItWorks: {
        title: 'How to Buy & Use',
        steps: [
          { num: '01', title: 'Choose a Product', desc: 'Browse 7 digital products in our store. Pick what fits your needs.' },
          { num: '02', title: 'Instant Payment', desc: 'Pay via GoPay, OVO, DANA, or bank transfer. Instant access after payment.' },
          { num: '03', title: 'Use Immediately', desc: 'Download and start using right away. Complete guide included with every product.' },
        ],
      },
      testimonials: {
        title: 'What Our Buyers Say',
        items: [
          { quote: 'SellPix AI transformed my product photos completely. From basic phone photos to studio-quality. Sales up 30%.', name: 'Dewi S.', role: 'Online Shop Owner', avatar: '👩' },
          { quote: 'Smart Teacher AI is incredibly helpful. Creating exam questions that used to take 3 hours now takes 15 minutes.', name: 'Pak Agus', role: 'High School Teacher', avatar: '👨' },
          { quote: 'AI Ad Engine is totally worth it. One-time $5 payment, but the ad copy generated has earned thousands.', name: 'Rico M.', role: 'Digital Marketer', avatar: '👨' },
        ],
      },
      pricing: [
        { name: 'Single', price: '$3.29-5', period: 'one-time', features: ['1 product of choice', 'Lifetime access', 'Free updates', 'Complete guide', '7-day guarantee'], cta: { text: 'Buy at Store →', href: STORE } },
        { name: 'Bundle 3', price: '$9.99', period: 'one-time', highlight: true, features: ['3 products of choice', 'Save up to 40%', 'Lifetime access', 'Free updates', 'Priority support', '7-day guarantee'], cta: { text: 'Buy Bundle →', href: `${WA}?text=Hello%2C%20I%20want%20Bundle%203%20digital%20products` } },
        { name: 'All Access', price: '$19.99', period: 'one-time', features: ['All 7 products', 'Save 50%+', 'Lifetime access', 'New products free', 'VIP support', '7-day guarantee'], cta: { text: 'All Access →', href: `${WA}?text=Hello%2C%20I%20want%20All%20Access%20digital%20products` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Is it one-time payment or subscription?', a: 'One-time payment, lifetime access. No monthly fees or hidden charges.' },
          { q: 'How does the 7-day guarantee work?', a: 'If not satisfied within 7 days of purchase, 100% money back. No drama, no questions asked.' },
          { q: 'What payment methods are accepted?', a: 'GoPay, OVO, DANA, ShopeePay, bank transfer (BCA, BRI, Mandiri, BNI), and QRIS.' },
          { q: 'Can I use it on mobile?', a: 'Yes, all products are accessible from phone, tablet, or laptop. Web-based, no installation needed.' },
          { q: 'Are there updates after purchase?', a: 'Yes, all product updates are free. You also get notified when new features are added.' },
        ],
      },
      cta: {
        title: 'Starting at $3.29 — 7-Day Guarantee',
        description: 'Pick the product you need. Not satisfied? Money back. Zero risk.',
        button: { text: 'Open Store →', href: STORE },
      },
      catalog: {
        title: 'Digital Product Catalog',
        items: [
          { icon: '📢', name: 'AI Ad Engine', price: '$5', desc: 'Generate converting Meta & TikTok ad copy. Headlines, body, CTA ready to use.', href: STORE },
          { icon: '🎨', name: 'AI Creative Tools', price: '$5', desc: 'Create marketing visuals without design skills. Social & ad templates ready to edit.', href: STORE },
          { icon: '🍽️', name: 'Food Menu AI Studio', price: '$5', desc: 'Auto-design restaurant/cafe menus from your food photos.', href: STORE },
          { icon: '👨‍🏫', name: 'Smart Teacher AI', price: '$5', desc: 'Create exams, lesson plans, teaching materials, and rubrics with AI.', href: STORE },
          { icon: '💼', name: 'JobMagnet AI', price: '$5', desc: 'AI-powered CV, cover letter, and interview prep. Boost your job chances.', href: STORE },
          { icon: '👶', name: 'Parenting Guide AI', price: '$3.29', desc: 'Smart AI-based parenting guide. Tips tailored to age and developmental stage.', href: STORE },
          { icon: '📸', name: 'SellPix AI', price: '$5', desc: 'Turn product photos professional. Background removal, enhancement, mockups.', href: STORE },
        ],
      },
    },
  },
};

export const productSlugs = Object.keys(productsData);
