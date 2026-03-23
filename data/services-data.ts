// services-data.ts — 8 new service landing page data (added 2026-03-23)
// Import and merge with productsData in products.ts

const WA = 'https://wa.me/6285732740006';

export interface ServiceData {
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; buttons: { text: string; href: string; primary?: boolean }[] };
  problem: { hook: string; pains: { icon: string; text: string }[]; bridge: string };
  features: { icon: string; title: string; desc: string }[];
  howItWorks: { title: string; steps: { num: string; title: string; desc: string }[] };
  pricing: { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }[];
  faq: { title: string; items: { q: string; a: string }[] };
  stats: { value: string; label: string }[];
  cta: { title: string; description: string; button: { text: string; href: string } };
}

export const servicesData: Record<string, Record<string, ServiceData>> = {

  'custom-documents': {
    id: {
      slug: 'custom-documents',
      meta: { title: 'Jasa Dokumen Kustom — BerkahKarya', description: 'Dokumen profesional dalam 15-60 menit. Laporan, memo, surat, proposal, invoice, CV, SOP, kontrak. Branded sesuai perusahaan.' },
      hero: {
        eyebrow: '📄 CUSTOM DOCUMENTS',
        title: 'Dokumen Profesional\nDalam Hitungan Menit',
        description: 'Masih bikin proposal manual di Word berjam-jam? Kami generate 9 jenis dokumen profesional dalam 15-60 menit — fully branded sesuai identitas perusahaan Anda.',
        buttons: [
          { text: 'Pesan Dokumen →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20pesan%20dokumen%20profesional`, primary: true },
          { text: 'Lihat Contoh', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Kalau kamu masih ngalamin ini, kamu buang waktu dan uang.',
        pains: [
          { icon: '⏰', text: 'Bikin proposal 10 halaman makan 3-4 jam. Padahal meeting besok.' },
          { icon: '😩', text: 'Template Word tidak konsisten — font beda-beda, warna tidak matching brand.' },
          { icon: '💸', text: 'Hire desainer untuk dokumen sehari-hari? Mahal dan tidak worth it.' },
          { icon: '🤦', text: 'Surat resmi ke klien pakai template generic yang tidak profesional.' },
        ],
        bridge: 'Satu solusi: AI generate dokumen branded dalam 15 menit.',
      },
      features: [
        { icon: '🤖', title: 'AI-Powered Generation', desc: 'AI generate konten + formatting otomatis sesuai brief Anda.' },
        { icon: '📋', title: '9 Jenis Dokumen', desc: 'Laporan, memo, surat, proposal, invoice, CV, SOP, kontrak, sertifikat.' },
        { icon: '🎨', title: 'Full Brand Customization', desc: 'Warna, font, logo, header/footer sesuai identitas perusahaan.' },
        { icon: '⚡', title: 'Delivery 15-60 Menit', desc: 'Order sekarang, terima file dalam 15-60 menit. Tidak ada waiting list.' },
        { icon: '📝', title: 'Format .docx Editable', desc: 'File Word yang bisa diedit sendiri. Bukan PDF terkunci.' },
        { icon: '🌐', title: 'Bilingual ID/EN', desc: 'Request dokumen dalam Bahasa Indonesia atau Inggris.' },
      ],
      howItWorks: {
        title: 'Proses Mudah dalam 3 Langkah',
        steps: [
          { num: '1', title: 'Kirim Brief', desc: 'Ceritakan jenis dokumen, konten, dan brand identity via WhatsApp atau Telegram.' },
          { num: '2', title: 'Bayar & Proses', desc: 'Konfirmasi pembayaran → AI generate + QC oleh tim dalam 15-60 menit.' },
          { num: '3', title: 'Terima File', desc: 'File .docx dikirim. Include 1x revisi gratis dalam 3 hari kerja.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: 'Rp 50K–150K', period: '/dokumen', features: ['Memo / Surat / Invoice', 'Branded header & footer', 'Editable .docx', 'Delivery < 30 menit', '1x revisi'], cta: { text: 'Pesan Sekarang', href: `${WA}?text=Halo%2C%20saya%20mau%20pesan%20dokumen%20Starter` } },
        { name: 'Business', price: 'Rp 200K–300K', period: '/dokumen', highlight: true, features: ['Laporan / Proposal / Kontrak / SOP', 'Full brand customization', 'Editable .docx + PDF', 'Delivery < 60 menit', '1x revisi gratis', 'Priority delivery'], cta: { text: 'Pesan Sekarang', href: `${WA}?text=Halo%2C%20saya%20mau%20pesan%20dokumen%20Business` } },
        { name: 'Paket Bundel', price: 'Rp 350K–750K', period: '/paket', features: ['Paket 5 dok: Rp 350K (hemat 30%)', 'Paket 10 dok: Rp 750K (hemat 40%)', 'Mix semua jenis dokumen', 'Brand setup sekali', 'Priority delivery'], cta: { text: 'Lihat Paket', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20bundel%20dokumen` } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Jenis dokumen apa saja yang bisa dibuat?', a: '9 jenis: Laporan bisnis, Memo, Surat resmi, Proposal, Invoice, CV/Resume, SOP, Kontrak, Sertifikat.' },
          { q: 'Berapa lama proses pengerjaannya?', a: 'Dokumen standar: 15-30 menit. Dokumen kompleks: 30-60 menit. Setelah pembayaran dikonfirmasi.' },
          { q: 'Bagaimana kalau hasilnya tidak sesuai?', a: '1x revisi gratis per order. Revisi dikirim dalam 30 menit setelah request. Revisi tambahan Rp 50K/round.' },
          { q: 'Format file apa yang dikirimkan?', a: 'Default: .docx editable. PDF tersedia opsional tanpa biaya tambahan.' },
          { q: 'Apakah bisa pakai logo dan warna brand saya?', a: 'Ya, brand customization termasuk. Kirim brand guidelines atau sebutkan warna/font yang diinginkan.' },
        ],
      },
      stats: [
        { value: '15 Mnt', label: 'Waktu delivery tercepat' },
        { value: '9', label: 'Jenis dokumen tersedia' },
        { value: '100%', label: 'Editable & branded' },
        { value: '1x', label: 'Revisi gratis' },
      ],
      cta: { title: 'Butuh Dokumen Profesional Sekarang?', description: 'Order via WhatsApp. Brief → Bayar → Terima file dalam 60 menit.', button: { text: 'Pesan via WhatsApp →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20pesan%20dokumen%20profesional` } },
    },
    en: {
      slug: 'custom-documents',
      meta: { title: 'Custom Document Service — BerkahKarya', description: 'Professional documents in 15-60 minutes. Reports, memos, letters, proposals, invoices, CVs, SOPs, contracts. Branded to your company.' },
      hero: {
        eyebrow: '📄 CUSTOM DOCUMENTS',
        title: 'Professional Documents\nIn Minutes',
        description: 'Still manually building proposals in Word for hours? We generate 9 types of professional documents in 15-60 minutes — fully branded to your company identity.',
        buttons: [
          { text: 'Order Document →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20to%20order%20a%20professional%20document`, primary: true },
          { text: 'See Examples', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'If you still deal with this, you are wasting time and money.',
        pains: [
          { icon: '⏰', text: 'A 10-page proposal takes 3-4 hours. But the meeting is tomorrow.' },
          { icon: '😩', text: 'Your Word templates are inconsistent — mixed fonts, colors off-brand.' },
          { icon: '💸', text: 'Hiring a designer for everyday documents? Too expensive and not worth it.' },
          { icon: '🤦', text: 'Formal letters to clients use generic templates that look unprofessional.' },
        ],
        bridge: 'One solution: AI generates branded documents in 15 minutes.',
      },
      features: [
        { icon: '🤖', title: 'AI-Powered Generation', desc: 'AI generates content + formatting automatically based on your brief.' },
        { icon: '📋', title: '9 Document Types', desc: 'Reports, memos, letters, proposals, invoices, CVs, SOPs, contracts, certificates.' },
        { icon: '🎨', title: 'Full Brand Customization', desc: 'Colors, fonts, logo, header/footer matching your company identity.' },
        { icon: '⚡', title: '15-60 Min Delivery', desc: 'Order now, receive your file within 15-60 minutes. No waiting list.' },
        { icon: '📝', title: 'Editable .docx Format', desc: 'A Word file you can edit yourself. Not a locked PDF.' },
        { icon: '🌐', title: 'Bilingual ID/EN', desc: 'Request documents in Bahasa Indonesia or English.' },
      ],
      howItWorks: {
        title: 'Simple 3-Step Process',
        steps: [
          { num: '1', title: 'Send Brief', desc: 'Tell us document type, content, and brand identity via WhatsApp or Telegram.' },
          { num: '2', title: 'Pay & Process', desc: 'Confirm payment → AI generates + team QC in 15-60 minutes.' },
          { num: '3', title: 'Receive File', desc: '.docx file delivered. Includes 1 free revision within 3 business days.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: '$3–$10', period: '/document', features: ['Memo / Letter / Invoice', 'Branded header & footer', 'Editable .docx', 'Delivery < 30 min', '1 revision'], cta: { text: 'Order Now', href: `${WA}?text=Hello%2C%20I%20want%20to%20order%20a%20Starter%20document` } },
        { name: 'Business', price: '$13–$20', period: '/document', highlight: true, features: ['Report / Proposal / Contract / SOP', 'Full brand customization', 'Editable .docx + PDF', 'Delivery < 60 min', '1 free revision', 'Priority delivery'], cta: { text: 'Order Now', href: `${WA}?text=Hello%2C%20I%20want%20to%20order%20a%20Business%20document` } },
        { name: 'Bundle Pack', price: '$23–$50', period: '/pack', features: ['Pack of 5: $23 (save 30%)', 'Pack of 10: $50 (save 40%)', 'Mix all document types', 'One-time brand setup', 'Priority delivery'], cta: { text: 'View Bundles', href: `${WA}?text=Hello%2C%20I%20want%20document%20bundle%20packages` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'What types of documents can you create?', a: '9 types: Business reports, Memos, Formal letters, Proposals, Invoices, CVs/Resumes, SOPs, Contracts, Certificates.' },
          { q: 'How long does it take?', a: 'Standard documents: 15-30 min. Complex documents: 30-60 min. After payment is confirmed.' },
          { q: 'What if the result does not match my expectations?', a: '1 free revision per order. Revision delivered within 30 minutes of request. Additional revisions at $3/round.' },
          { q: 'What file format will I receive?', a: 'Default: editable .docx. PDF available optionally at no extra charge.' },
          { q: 'Can I use my logo and brand colors?', a: 'Yes, brand customization is included. Send your brand guidelines or specify preferred colors/fonts.' },
        ],
      },
      stats: [
        { value: '15 Min', label: 'Fastest delivery time' },
        { value: '9', label: 'Document types available' },
        { value: '100%', label: 'Editable & branded' },
        { value: '1x', label: 'Free revision included' },
      ],
      cta: { title: 'Need a Professional Document Now?', description: 'Order via WhatsApp. Brief → Pay → Receive file within 60 minutes.', button: { text: 'Order via WhatsApp →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20to%20order%20a%20professional%20document` } },
    },
  },

  'social-media-management': {
    id: {
      slug: 'social-media-management',
      meta: { title: 'Jasa Social Media Management — BerkahKarya', description: 'Kelola semua platform sosial media bisnis Anda dengan AI. Konten otomatis, posting terjadwal, analytics. Mulai Rp 1.5jt/bulan.' },
      hero: {
        eyebrow: '📱 SOCIAL MEDIA MANAGEMENT',
        title: '90 Akun Sosmed\nDikelola AI. Bisnis Anda?',
        description: 'Kompetitor posting 3x sehari. Anda? BerkahKarya manage semua platform sosial media bisnis Anda — konten AI, auto-posting ke TikTok/IG/YouTube/Facebook — mulai Rp 1.5jt/bulan.',
        buttons: [
          { text: 'Mulai Sekarang →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20jasa%20social%20media%20management`, primary: true },
          { text: 'Lihat Paket', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'Kalau akun sosmed bisnis kamu seperti ini, kamu sudah ketinggalan.',
        pains: [
          { icon: '📅', text: 'Posting tidak konsisten — kadang ramai, kadang mati berminggu-minggu.' },
          { icon: '⏰', text: 'Bikin 1 konten makan 2-3 jam. Kamu tidak punya waktu untuk itu.' },
          { icon: '📉', text: 'Engagement stagnan. Followers tidak tumbuh karena algoritma butuh konsistensi.' },
          { icon: '😫', text: 'Hire social media manager mahal. Freelancer tidak konsisten dan sering hilang.' },
        ],
        bridge: 'BerkahKarya handle semua ini dengan AI yang tidak pernah cuti.',
      },
      features: [
        { icon: '🏗️', title: 'Infrastruktur 90 Akun', desc: 'Backend kuat yang sudah manage 90 akun aktif. Siap scale bisnis Anda.' },
        { icon: '🤖', title: 'Konten AI Otomatis', desc: 'AI generate caption, hashtag, dan script konten sesuai niche bisnis Anda.' },
        { icon: '📤', title: 'Auto-Posting Multi-Platform', desc: 'Jadwal dan posting otomatis ke TikTok, Instagram, YouTube, Facebook, Threads.' },
        { icon: '📊', title: 'Analytics & Reporting', desc: 'Laporan performa mingguan — reach, engagement, follower growth, best content.' },
        { icon: '#️⃣', title: 'Hashtag Optimization', desc: 'AI riset hashtag tren untuk setiap post agar jangkauan maksimal.' },
        { icon: '🔄', title: 'Content Calendar', desc: 'Kalender konten terencana 30 hari ke depan. Tidak ada lagi posting dadakan.' },
      ],
      howItWorks: {
        title: 'Onboarding Mudah, Hasil Nyata',
        steps: [
          { num: '1', title: 'Onboarding & Brief', desc: 'Kami pelajari bisnis, target audience, dan tone of voice Anda. Setup selesai dalam 1 hari.' },
          { num: '2', title: 'Produksi Konten AI', desc: 'Tim AI generate konten sesuai brand Anda. Anda review & approve sebelum dipublish.' },
          { num: '3', title: 'Posting & Monitor', desc: 'Konten dipublish sesuai jadwal optimal. Anda terima laporan performa mingguan.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: 'Rp 1.5jt', period: '/bulan', features: ['10 konten/bulan', '1 platform (TikTok ATAU IG)', 'Caption + hashtag AI', 'Monthly report', 'Respon 24 jam'], cta: { text: 'Pilih Starter', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Starter%20social%20media` } },
        { name: 'Growth', price: 'Rp 2.5jt', period: '/bulan', highlight: true, features: ['15 konten/bulan', '2 platform (TikTok + IG)', 'Caption + hashtag AI', 'Weekly performance report', '1x revisi per konten', 'Content calendar 30 hari', 'Respon prioritas'], cta: { text: 'Pilih Growth', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Growth%20social%20media` } },
        { name: 'Scale', price: 'Rp 5jt', period: '/bulan', features: ['30 konten/bulan', '3 platform (TikTok + IG + YouTube)', 'Premium caption + CTA', 'Weekly report + analytics', 'Unlimited revisi', 'Dedicated account manager'], cta: { text: 'Pilih Scale', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Scale%20social%20media` } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Apakah saya bisa review konten sebelum diposting?', a: 'Ya. Semua konten dikirim untuk approval Anda sebelum dipublish.' },
          { q: 'Platform apa saja yang didukung?', a: 'TikTok, Instagram, YouTube Shorts, Facebook, Threads.' },
          { q: 'Apakah konten foto/video disediakan?', a: 'Starter & Growth: kami butuh aset visual dari Anda. Scale: kami bantu sourcing visual AI.' },
          { q: 'Berapa lama sebelum terlihat hasilnya?', a: 'Follower growth terlihat dalam 30-60 hari. Engagement biasanya naik dalam 2 minggu pertama.' },
          { q: 'Bisa cancel kapan saja?', a: 'Ya. Kontrak bulanan, tidak ada lock-in. Cancel dengan notice 7 hari sebelum tanggal billing.' },
        ],
      },
      stats: [
        { value: '90', label: 'Akun aktif dikelola' },
        { value: '3x', label: 'Posting per hari per akun' },
        { value: '5+', label: 'Platform didukung' },
        { value: '30 Hr', label: 'Konten terencana ke depan' },
      ],
      cta: { title: 'Siap Dominasi Sosmed Bisnis Anda?', description: 'Konsultasi gratis. Kami setup akun dan mulai produksi konten dalam 24 jam.', button: { text: 'Konsultasi Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20konsultasi%20social%20media%20management` } },
    },
    en: {
      slug: 'social-media-management',
      meta: { title: 'Social Media Management — BerkahKarya', description: 'Manage all your business social media with AI. Automated content, scheduled posting, analytics. From $99/month.' },
      hero: {
        eyebrow: '📱 SOCIAL MEDIA MANAGEMENT',
        title: '90 Social Accounts\nManaged by AI. Yours?',
        description: 'Competitors post 3x a day. You? BerkahKarya manages all your business social platforms — AI content, auto-posting to TikTok/IG/YouTube/Facebook — from $99/month.',
        buttons: [
          { text: 'Get Started →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20social%20media%20management`, primary: true },
          { text: 'View Packages', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'If your business social media looks like this, you are already behind.',
        pains: [
          { icon: '📅', text: 'Inconsistent posting — active sometimes, dead for weeks at a time.' },
          { icon: '⏰', text: 'One piece of content takes 2-3 hours. You simply do not have time for that.' },
          { icon: '📉', text: 'Stagnant engagement. Followers do not grow because algorithms demand consistency.' },
          { icon: '😫', text: 'Hiring a social media manager is expensive. Freelancers are inconsistent.' },
        ],
        bridge: 'BerkahKarya handles it all with AI that never takes a day off.',
      },
      features: [
        { icon: '🏗️', title: '90-Account Infrastructure', desc: 'Proven backend already managing 90 active accounts. Ready to scale your business.' },
        { icon: '🤖', title: 'AI Content Generation', desc: 'AI generates captions, hashtags, and content scripts tailored to your niche.' },
        { icon: '📤', title: 'Multi-Platform Auto-Posting', desc: 'Schedule and auto-post to TikTok, Instagram, YouTube, Facebook, Threads.' },
        { icon: '📊', title: 'Analytics & Reporting', desc: 'Weekly performance reports — reach, engagement, follower growth, top content.' },
        { icon: '#️⃣', title: 'Hashtag Optimization', desc: 'AI researches trending hashtags for each post to maximize reach.' },
        { icon: '🔄', title: 'Content Calendar', desc: 'Planned 30-day content calendar. No more last-minute posting.' },
      ],
      howItWorks: {
        title: 'Easy Onboarding, Real Results',
        steps: [
          { num: '1', title: 'Onboarding & Brief', desc: 'We learn your business, target audience, and tone of voice. Setup done in 1 day.' },
          { num: '2', title: 'AI Content Production', desc: 'AI team generates brand-matched content. You review & approve before publishing.' },
          { num: '3', title: 'Post & Monitor', desc: 'Content published at optimal times. You receive weekly performance reports.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: '$99', period: '/month', features: ['10 content pieces/month', '1 platform (TikTok OR IG)', 'AI captions + hashtags', 'Monthly report', '24h response time'], cta: { text: 'Choose Starter', href: `${WA}?text=Hello%2C%20I%20want%20the%20Starter%20social%20media%20package` } },
        { name: 'Growth', price: '$165', period: '/month', highlight: true, features: ['15 content pieces/month', '2 platforms (TikTok + IG)', 'AI captions + hashtags', 'Weekly performance report', '1 revision per content', '30-day content calendar', 'Priority response'], cta: { text: 'Choose Growth', href: `${WA}?text=Hello%2C%20I%20want%20the%20Growth%20social%20media%20package` } },
        { name: 'Scale', price: '$330', period: '/month', features: ['30 content pieces/month', '3 platforms (TikTok + IG + YouTube)', 'Premium captions + CTAs', 'Weekly report + analytics', 'Unlimited revisions', 'Dedicated account manager'], cta: { text: 'Choose Scale', href: `${WA}?text=Hello%2C%20I%20want%20the%20Scale%20social%20media%20package` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Can I review content before it is posted?', a: 'Yes. All content is sent for your approval before publishing.' },
          { q: 'What platforms are supported?', a: 'TikTok, Instagram, YouTube Shorts, Facebook, Threads.' },
          { q: 'Are photo/video assets provided?', a: 'Starter & Growth: we need visual assets from you. Scale: we assist with AI-sourced visuals.' },
          { q: 'How long before results are visible?', a: 'Follower growth visible in 30-60 days. Engagement typically rises within the first 2 weeks.' },
          { q: 'Can I cancel anytime?', a: 'Yes. Monthly contract, no lock-in. Cancel with 7 days notice before your next billing date.' },
        ],
      },
      stats: [
        { value: '90', label: 'Active accounts managed' },
        { value: '3x', label: 'Posts per day per account' },
        { value: '5+', label: 'Platforms supported' },
        { value: '30 Days', label: 'Content planned ahead' },
      ],
      cta: { title: 'Ready to Dominate Your Business Social Media?', description: 'Free consultation. We set up your account and start content production within 24 hours.', button: { text: 'Free Consultation →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20social%20media%20management%20consultation` } },
    },
  },

  'ai-automation': {
    id: {
      slug: 'ai-automation',
      meta: { title: 'Jasa AI Automation & Custom Bots — BerkahKarya', description: 'Otomatisasi proses bisnis dengan AI custom. Chatbot, workflow automation, integrasi API. Hemat 60% waktu operasional.' },
      hero: {
        eyebrow: '🤖 AI AUTOMATION',
        title: 'Otomatisasi Bisnis\nDengan AI Custom',
        description: 'Masih kerja manual repetitif setiap hari? Kami bangun sistem AI automation yang bekerja 24/7 — chatbot, workflow automation, integrasi platform, data processing. Hemat 60% waktu operasional.',
        buttons: [
          { text: 'Konsultasi Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20konsultasi%20AI%20automation`, primary: true },
          { text: 'Lihat Use Cases', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Kalau timmu masih ngerjain ini secara manual, kamu bakar uang setiap hari.',
        pains: [
          { icon: '🔁', text: 'Input data yang sama ke 3 sistem berbeda. Setiap hari. Manual. Bisa salah kapan saja.' },
          { icon: '😴', text: 'Customer service tutup jam 6. Lead yang masuk tengah malam hilang ke kompetitor.' },
          { icon: '📧', text: 'Reply email dan chat satu per satu. Tim CS habis waktunya untuk hal repetitif.' },
          { icon: '📊', text: 'Laporan bisnis dibuat manual setiap minggu. 4 jam pekerjaan yang bisa diotomasi.' },
        ],
        bridge: 'AI Automation bekerja 24/7, tidak pernah salah input, tidak pernah capek.',
      },
      features: [
        { icon: '📜', title: '190+ Battle-Tested Scripts', desc: 'Library scripts automation yang sudah diuji di operasional nyata.' },
        { icon: '🔗', title: 'Multi-Platform Integration', desc: 'Hubungkan WhatsApp, Telegram, Shopee, Tokopedia, Google Sheets, email, dan 50+ platform.' },
        { icon: '💬', title: 'Custom Chatbots', desc: 'Chatbot AI yang paham konteks bisnis Anda — bukan bot script kaku.' },
        { icon: '⚙️', title: 'Workflow Automation', desc: 'Trigger → Action berjalan otomatis. Dari sederhana sampai pipeline kompleks.' },
        { icon: '📊', title: 'Data Processing', desc: 'Extract, transform, load data antar sistem. Laporan otomatis tanpa manual.' },
        { icon: '🔌', title: 'API Integration', desc: 'Hubungkan sistem lama dengan tools baru via API tanpa ganti sistem.' },
      ],
      howItWorks: {
        title: 'Dari Masalah ke Otomasi dalam 3 Tahap',
        steps: [
          { num: '1', title: 'Discovery & Mapping', desc: 'Kami analisa proses bisnis Anda, identifikasi bottleneck, dan desain solusi automation yang tepat.' },
          { num: '2', title: 'Build & Test', desc: 'Tim developer bangun sistem automation, integrasi dengan tools yang ada, dan test menyeluruh.' },
          { num: '3', title: 'Deploy & Monitor', desc: 'Go-live dengan monitoring real-time. Support 30 hari post-launch termasuk.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: 'Rp 2jt', period: '/project', features: ['1 automation workflow', 'Up to 3 platform integrations', 'Basic chatbot', 'Testing & dokumentasi', 'Support 14 hari'], cta: { text: 'Mulai Starter', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Starter%20AI%20Automation` } },
        { name: 'Business', price: 'Rp 5jt', period: '/project', highlight: true, features: ['3-5 automation workflows', 'Unlimited platform integrations', 'AI chatbot context-aware', 'Dashboard monitoring', 'Testing + dokumentasi', 'Support 30 hari', 'Training tim Anda'], cta: { text: 'Mulai Business', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Business%20AI%20Automation` } },
        { name: 'Enterprise', price: 'Rp 10–20jt', period: '/project', features: ['Unlimited workflows', 'Full system integration', 'Custom AI model fine-tuning', 'Real-time monitoring dashboard', 'SLA guarantee', 'Support 90 hari', 'Dedicated engineer'], cta: { text: 'Hubungi Kami', href: `${WA}?text=Halo%2C%20saya%20mau%20Enterprise%20AI%20Automation` } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Automation apa yang paling populer?', a: 'Top 3: WhatsApp auto-reply CS, auto-posting konten ke sosmed, sinkronisasi data Shopee/Tokopedia dengan spreadsheet.' },
          { q: 'Apakah perlu IT team di sisi saya?', a: 'Tidak. Kami handle semua aspek teknis. Yang diperlukan hanya akses ke platform dan pemahaman proses bisnis.' },
          { q: 'Bagaimana kalau ada bug setelah launch?', a: 'Semua paket include support period (14-90 hari). Bug fix gratis selama periode tersebut.' },
          { q: 'Berapa lama pengerjaan?', a: 'Starter: 3-5 hari kerja. Business: 1-2 minggu. Enterprise: 3-4 minggu.' },
          { q: 'Apakah data bisnis saya aman?', a: 'Ya. Kami tanda tangani NDA sebelum project dimulai. Data tidak pernah dishare ke pihak ketiga.' },
        ],
      },
      stats: [
        { value: '190+', label: 'Scripts battle-tested' },
        { value: '60%', label: 'Hemat waktu operasional' },
        { value: '50+', label: 'Platform terintegrasi' },
        { value: '24/7', label: 'AI bekerja non-stop' },
      ],
      cta: { title: 'Otomatisasi Proses yang Paling Menyita Waktu Anda', description: 'Konsultasi gratis 30 menit. Kami identifikasi 3 proses yang paling worth diotomasi.', button: { text: 'Konsultasi Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20konsultasi%20AI%20automation` } },
    },
    en: {
      slug: 'ai-automation',
      meta: { title: 'AI Automation & Custom Bots — BerkahKarya', description: 'Automate business processes with custom AI. Chatbots, workflow automation, API integrations. Save 60% of operational time.' },
      hero: {
        eyebrow: '🤖 AI AUTOMATION',
        title: 'Automate Your Business\nWith Custom AI',
        description: 'Still doing the same repetitive manual tasks every day? We build AI automation systems that work 24/7 — chatbots, workflow automation, platform integrations, data processing. Save 60% of operational time.',
        buttons: [
          { text: 'Free Consultation →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20AI%20automation%20consultation`, primary: true },
          { text: 'See Use Cases', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'If your team still does this manually, you are burning money every day.',
        pains: [
          { icon: '🔁', text: 'Entering the same data into 3 different systems. Every day. Manually. Error-prone.' },
          { icon: '😴', text: 'Customer service closes at 6PM. Midnight leads go straight to your competitors.' },
          { icon: '📧', text: 'Replying to emails and chats one by one. CS team wastes time on repetitive tasks.' },
          { icon: '📊', text: 'Business reports created manually every week. 4 hours of automatable work.' },
        ],
        bridge: 'AI Automation works 24/7, never makes input errors, never gets tired.',
      },
      features: [
        { icon: '📜', title: '190+ Battle-Tested Scripts', desc: 'Library of automation scripts tested in real operations.' },
        { icon: '🔗', title: 'Multi-Platform Integration', desc: 'Connect WhatsApp, Telegram, Shopee, Tokopedia, Google Sheets, email, and 50+ platforms.' },
        { icon: '💬', title: 'Custom Chatbots', desc: 'AI chatbots that understand your business context — not rigid scripted bots.' },
        { icon: '⚙️', title: 'Workflow Automation', desc: 'Trigger → Action running automatically. From simple to complex pipelines.' },
        { icon: '📊', title: 'Data Processing', desc: 'Extract, transform, load data between systems. Automatic reports.' },
        { icon: '🔌', title: 'API Integration', desc: 'Connect legacy systems with new tools via API — no need to replace existing systems.' },
      ],
      howItWorks: {
        title: 'From Problem to Automation in 3 Phases',
        steps: [
          { num: '1', title: 'Discovery & Mapping', desc: 'We analyze your business processes, identify bottlenecks, and design the right automation solution.' },
          { num: '2', title: 'Build & Test', desc: 'Our team builds the automation system, integrates with existing tools, and tests thoroughly.' },
          { num: '3', title: 'Deploy & Monitor', desc: 'Go-live with real-time monitoring. 30-day post-launch support included.' },
        ],
      },
      pricing: [
        { name: 'Starter', price: '$133', period: '/project', features: ['1 automation workflow', 'Up to 3 platform integrations', 'Basic chatbot', 'Testing & documentation', '14-day support'], cta: { text: 'Start Starter', href: `${WA}?text=Hello%2C%20I%20want%20the%20Starter%20AI%20Automation%20package` } },
        { name: 'Business', price: '$330', period: '/project', highlight: true, features: ['3-5 automation workflows', 'Unlimited platform integrations', 'Context-aware AI chatbot', 'Monitoring dashboard', 'Testing + documentation', '30-day support', 'Team training'], cta: { text: 'Start Business', href: `${WA}?text=Hello%2C%20I%20want%20the%20Business%20AI%20Automation%20package` } },
        { name: 'Enterprise', price: '$660–$1320', period: '/project', features: ['Unlimited workflows', 'Full system integration', 'Custom AI fine-tuning', 'Real-time dashboard', 'SLA guarantee', '90-day support', 'Dedicated engineer'], cta: { text: 'Contact Us', href: `${WA}?text=Hello%2C%20I%20want%20Enterprise%20AI%20Automation` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'What automations are most popular?', a: 'Top 3: WhatsApp auto-reply for CS, auto-posting content to social media, data sync between Shopee/Tokopedia and spreadsheets.' },
          { q: 'Do I need an IT team on my side?', a: 'No. We handle all technical aspects. We just need access to your platforms and an understanding of the processes.' },
          { q: 'What if there are bugs after launch?', a: 'All packages include a support period (14-90 days). Bug fixes are free during that period.' },
          { q: 'How long does development take?', a: 'Starter: 3-5 business days. Business: 1-2 weeks. Enterprise: 3-4 weeks.' },
          { q: 'Is my business data safe?', a: 'Yes. We sign an NDA before the project begins. Your data is never shared with third parties.' },
        ],
      },
      stats: [
        { value: '190+', label: 'Battle-tested scripts' },
        { value: '60%', label: 'Operational time saved' },
        { value: '50+', label: 'Platforms integrated' },
        { value: '24/7', label: 'AI works non-stop' },
      ],
      cta: { title: 'Automate Your Most Time-Consuming Processes', description: 'Free 30-minute consultation. We identify the 3 processes most worth automating.', button: { text: 'Free Consultation →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20AI%20automation%20consultation` } },
    },
  },

  'website-development': {
    id: {
      slug: 'website-development',
      meta: { title: 'Jasa Website Development — BerkahKarya', description: 'Website profesional dengan Next.js/React. Landing page, company profile, e-commerce, bilingual. Mulai Rp 2jt.' },
      hero: {
        eyebrow: '🌐 WEBSITE DEVELOPMENT',
        title: 'Website Pro\nDalam Hitungan Hari',
        description: 'Website lambat, tampilan jelek, tidak mobile-friendly = kehilangan customer setiap hari. Kami bangun website modern Next.js — cepat, SEO-optimized, bilingual ID/EN — yang benar-benar convert.',
        buttons: [
          { text: 'Konsultasi Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20buat%20website%20profesional`, primary: true },
          { text: 'Lihat Portfolio', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Website Anda mungkin lebih merugikan bisnis daripada tidak punya website.',
        pains: [
          { icon: '🐌', text: 'Website loading lebih dari 3 detik. 53% pengunjung langsung tutup tab.' },
          { icon: '📱', text: 'Tampilan berantakan di HP. 70%+ traffic sekarang dari mobile.' },
          { icon: '🔍', text: 'Tidak muncul di Google. Kompetitor dengan website lebih baik ambil semua traffic organik.' },
          { icon: '💔', text: 'Desain kuno, tidak profesional. Klien ragu untuk menghubungi.' },
        ],
        bridge: 'Website modern bukan biaya — itu investasi yang menghasilkan leads 24/7.',
      },
      features: [
        { icon: '⚛️', title: 'Next.js / React', desc: 'Framework terdepan — ultra cepat, SEO-friendly, skalabel jangka panjang.' },
        { icon: '🔍', title: 'SEO Optimized', desc: 'Meta tags, schema markup, sitemap, robots.txt — siap ranking di Google.' },
        { icon: '📱', title: 'Mobile Responsive', desc: 'Pixel-perfect di semua device — desktop, tablet, HP.' },
        { icon: '🌐', title: 'Bilingual ID/EN', desc: 'Routing /id/ dan /en/ — satu website, dua bahasa, dua market.' },
        { icon: '⚡', title: 'Fast Delivery', desc: 'Landing page: 3-5 hari. Company profile: 7-10 hari. Full website: 2-4 minggu.' },
        { icon: '🛡️', title: 'Support 30 Hari', desc: 'Free support dan minor fixes selama 30 hari setelah launch.' },
      ],
      howItWorks: {
        title: 'Dari Brief ke Website Live dalam 3 Fase',
        steps: [
          { num: '1', title: 'Discovery & Wireframe', desc: 'Kami pelajari bisnis dan goal Anda. Buat wireframe dan structure konten sebelum coding.' },
          { num: '2', title: 'Design & Development', desc: 'Develop dengan Next.js sesuai brand Anda. Preview link dikirim untuk review setiap milestone.' },
          { num: '3', title: 'Launch & Handover', desc: 'Deploy ke Netlify/Vercel, setup domain, SEO final check. Training dasar termasuk.' },
        ],
      },
      pricing: [
        { name: 'Landing Page', price: 'Rp 2jt', period: '/project', features: ['1 halaman lengkap', 'Hero + fitur + pricing + CTA', 'Mobile responsive', 'SEO basic', 'Delivery 3-5 hari', 'Support 14 hari'], cta: { text: 'Pesan Landing Page', href: `${WA}?text=Halo%2C%20saya%20mau%20buat%20landing%20page` } },
        { name: 'Company Profile', price: 'Rp 5jt', period: '/project', highlight: true, features: ['5-8 halaman lengkap', 'Desain custom branded', 'Bilingual ID/EN', 'Blog/artikel', 'SEO optimized', 'Delivery 7-10 hari', 'Support 30 hari'], cta: { text: 'Pesan Company Profile', href: `${WA}?text=Halo%2C%20saya%20mau%20buat%20website%20company%20profile` } },
        { name: 'Full Website', price: 'Rp 8–20jt', period: '/project', features: ['10+ halaman + blog', 'E-commerce opsional', 'CMS/admin panel', 'Custom features', 'Performance optimized', 'Delivery 2-4 minggu', 'Support 60 hari'], cta: { text: 'Konsultasi Sekarang', href: `${WA}?text=Halo%2C%20saya%20mau%20buat%20full%20website` } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Teknologi apa yang digunakan?', a: 'Next.js 14 + TypeScript + CSS Modules. Deploy ke Netlify atau Vercel. Framework yang sama dipakai Netflix dan TikTok.' },
          { q: 'Apakah saya perlu sedia konten?', a: 'Kami butuh: profil perusahaan, logo, foto (opsional), dan poin konten utama. Kami bantu struktur dan copywrite.' },
          { q: 'Domain dan hosting termasuk?', a: 'Domain tidak termasuk (~Rp 150K/tahun beli sendiri). Hosting di Netlify/Vercel gratis untuk website standar.' },
          { q: 'Bisa tambah fitur setelah launch?', a: 'Ya. Pengembangan lanjutan tersedia dengan rate Rp 150K/jam atau per-project quote.' },
          { q: 'Apa bedanya dengan WordPress?', a: 'Next.js 5-10x lebih cepat, lebih aman, tidak butuh plugin berbayar. Pilihan lebih baik untuk bisnis serius.' },
        ],
      },
      stats: [
        { value: '30+', label: 'Halaman live berkahkarya.org' },
        { value: '<1s', label: 'Target loading time' },
        { value: '100%', label: 'Mobile responsive' },
        { value: '2 Bhs', label: 'Bilingual ID + EN' },
      ],
      cta: { title: 'Website yang Menghasilkan Leads 24/7', description: 'Konsultasi gratis. Kami audit website lama Anda dan rekomendasikan solusi terbaik.', button: { text: 'Konsultasi Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20konsultasi%20pembuatan%20website` } },
    },
    en: {
      slug: 'website-development',
      meta: { title: 'Website Development — BerkahKarya', description: 'Professional websites with Next.js/React. Landing pages, company profiles, e-commerce, bilingual. From $133.' },
      hero: {
        eyebrow: '🌐 WEBSITE DEVELOPMENT',
        title: 'Professional Website\nIn Days, Not Months',
        description: 'Slow website, ugly design, not mobile-friendly = losing customers every day. We build modern Next.js websites — fast, SEO-optimized, bilingual ID/EN — that actually convert visitors into customers.',
        buttons: [
          { text: 'Free Consultation →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20a%20professional%20website`, primary: true },
          { text: 'View Portfolio', href: '#features', primary: false },
        ],
      },
      problem: {
        hook: 'Your website might be hurting your business more than having no website.',
        pains: [
          { icon: '🐌', text: 'Website loads in more than 3 seconds. 53% of visitors immediately close the tab.' },
          { icon: '📱', text: 'Broken layout on mobile. 70%+ of traffic now comes from mobile devices.' },
          { icon: '🔍', text: 'Not showing on Google. Competitors with better websites take all organic traffic.' },
          { icon: '💔', text: 'Outdated, unprofessional design. Clients hesitate to reach out.' },
        ],
        bridge: 'A modern website is not a cost — it is an investment that generates leads 24/7.',
      },
      features: [
        { icon: '⚛️', title: 'Next.js / React', desc: 'Leading framework — ultra fast, SEO-friendly, scalable for the long term.' },
        { icon: '🔍', title: 'SEO Optimized', desc: 'Meta tags, schema markup, sitemap, robots.txt — ready to rank on Google.' },
        { icon: '📱', title: 'Mobile Responsive', desc: 'Pixel-perfect on all devices — desktop, tablet, phone.' },
        { icon: '🌐', title: 'Bilingual ID/EN', desc: '/id/ and /en/ routing — one website, two languages, two markets.' },
        { icon: '⚡', title: 'Fast Delivery', desc: 'Landing page: 3-5 days. Company profile: 7-10 days. Full website: 2-4 weeks.' },
        { icon: '🛡️', title: '30-Day Support', desc: 'Free support and minor fixes for 30 days after launch.' },
      ],
      howItWorks: {
        title: 'From Brief to Live Website in 3 Phases',
        steps: [
          { num: '1', title: 'Discovery & Wireframe', desc: 'We learn your business and goals. Create wireframes and content structure before coding.' },
          { num: '2', title: 'Design & Development', desc: 'Develop with Next.js matching your brand. Preview link sent for review at every milestone.' },
          { num: '3', title: 'Launch & Handover', desc: 'Deploy to Netlify/Vercel, domain setup, final SEO check. Basic usage training included.' },
        ],
      },
      pricing: [
        { name: 'Landing Page', price: '$133', period: '/project', features: ['1 complete page', 'Hero + features + pricing + CTA', 'Mobile responsive', 'Basic SEO', 'Delivery 3-5 days', '14-day support'], cta: { text: 'Order Landing Page', href: `${WA}?text=Hello%2C%20I%20want%20to%20build%20a%20landing%20page` } },
        { name: 'Company Profile', price: '$330', period: '/project', highlight: true, features: ['5-8 complete pages', 'Custom branded design', 'Bilingual ID/EN', 'Blog/articles', 'SEO optimized', 'Delivery 7-10 days', '30-day support'], cta: { text: 'Order Company Profile', href: `${WA}?text=Hello%2C%20I%20want%20to%20build%20a%20company%20profile%20website` } },
        { name: 'Full Website', price: '$530–$1320', period: '/project', features: ['10+ pages + blog', 'Optional e-commerce', 'CMS/admin panel', 'Custom features', 'Performance optimized', 'Delivery 2-4 weeks', '60-day support'], cta: { text: 'Consult Now', href: `${WA}?text=Hello%2C%20I%20want%20to%20build%20a%20full%20website` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'What technology is used?', a: 'Next.js 14 + TypeScript + CSS Modules. Deployed to Netlify or Vercel. Same framework used by Netflix and TikTok.' },
          { q: 'Do I need to prepare content?', a: 'We need: company profile, logo, photos (optional), and key content points. We help structure and copywrite.' },
          { q: 'Are domain and hosting included?', a: 'Domain not included (~$10/year, buy yourself). Hosting on Netlify/Vercel is free for standard websites.' },
          { q: 'Can I add features after launch?', a: 'Yes. Continued development available at $10/hour or per-project quotes.' },
          { q: 'What is the difference from WordPress?', a: 'Next.js is 5-10x faster, more secure, no paid plugins needed. Better long-term choice for serious businesses.' },
        ],
      },
      stats: [
        { value: '30+', label: 'Pages live on berkahkarya.org' },
        { value: '<1s', label: 'Target loading time' },
        { value: '100%', label: 'Mobile responsive' },
        { value: '2 Lang', label: 'Bilingual ID + EN' },
      ],
      cta: { title: 'A Website That Generates Leads 24/7', description: 'Free consultation. We audit your existing website and recommend the best solution.', button: { text: 'Free Consultation →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20website%20development%20consultation` } },
    },
  },

  'video-production': {
    id: {
      slug: 'video-production',
      meta: { title: 'Jasa AI Video Production — BerkahKarya', description: 'Produksi video marketing dengan AI. Text-to-video, image-to-video, auto captions. 15 video/bulan mulai Rp 1.5jt.' },
      hero: {
        eyebrow: '🎬 VIDEO PRODUCTION',
        title: '15 Video Sebulan?\nAI Bisa Lebih Cepat',
        description: 'Bikin 1 video marketing makan berhari-hari dan jutaan rupiah? Kami produksi video profesional dengan AI — dari teks jadi video dalam hitungan menit. 15 video/bulan mulai Rp 1.5jt.',
        buttons: [
          { text: 'Mulai Produksi →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20jasa%20AI%20video%20production`, primary: true },
          { text: 'Lihat Paket', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'Kalau produksi video kamu masih seperti ini, kamu sudah ketinggalan.',
        pains: [
          { icon: '💸', text: 'Sewa videografer + editor = Rp 3-5jt per video. Budget habis sebelum konten jalan.' },
          { icon: '⏰', text: '1 video makan 3-5 hari dari konsep sampai publish. Algoritma butuh konten konsisten setiap hari.' },
          { icon: '📉', text: 'Posting video jarang karena repot produksi. Engagement turun, reach stagnan.' },
          { icon: '😩', text: 'Kualitas video tidak konsisten. Kadang bagus, kadang asal-asalan tergantung mood.' },
        ],
        bridge: 'AI Video Production: produksi konsisten, kualitas stabil, harga 90% lebih hemat.',
      },
      features: [
        { icon: '✍️', title: 'Text-to-Video AI', desc: 'Ketik script atau topik, AI langsung buat video lengkap dengan visual dan narasi.' },
        { icon: '🖼️', title: 'Image-to-Video', desc: 'Foto produk atau gambar jadi video cinematic dalam hitungan menit.' },
        { icon: '📝', title: 'Auto Captions', desc: 'Subtitle otomatis yang akurat — penting untuk engagement TikTok dan Reels.' },
        { icon: '⚡', title: 'Batch Production', desc: 'Produksi 10-30 video sekaligus. Scale konten tanpa nambah tim.' },
        { icon: '📐', title: 'Multi-Platform Format', desc: 'Output 9:16 (TikTok/Reels), 16:9 (YouTube), 1:1 (Instagram) — semua format sekaligus.' },
        { icon: '📤', title: 'Auto-Publishing', desc: 'Video langsung dipublish ke TikTok, IG, YouTube via PostBridge setelah approved.' },
      ],
      howItWorks: {
        title: 'Dari Brief ke Video Live dalam 3 Langkah',
        steps: [
          { num: '1', title: 'Brief & Aset', desc: 'Kirim topik, target audience, tone, dan aset visual (foto produk, logo). Kami handle sisanya.' },
          { num: '2', title: 'Produksi & Review', desc: 'AI generate video dalam 1-2 jam. Anda review dan approve sebelum dipublish.' },
          { num: '3', title: 'Publish & Lapor', desc: 'Video dipublish ke semua platform terjadwal. Laporan performa dikirim mingguan.' },
        ],
      },
      pricing: [
        { name: 'Per Video', price: 'Rp 100K', period: '/video', features: ['1 video sesuai brief', 'Format 9:16 atau 16:9', 'Auto captions', 'Delivery < 2 jam', '1x revisi'], cta: { text: 'Pesan Video', href: `${WA}?text=Halo%2C%20saya%20mau%20pesan%201%20video%20AI` } },
        { name: 'Growth', price: 'Rp 1.5jt', period: '/bulan', highlight: true, features: ['15 video/bulan', 'Multi-format (9:16 + 16:9)', 'Auto captions semua video', 'Auto-publishing ke 2 platform', 'Weekly analytics report', '1x revisi per video'], cta: { text: 'Pilih Growth', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Growth%20video%20production` } },
        { name: 'Scale', price: 'Rp 2.5jt', period: '/bulan', features: ['30 video/bulan', 'Semua format output', 'Auto captions + translate', 'Auto-publishing ke 3 platform', 'Real-time analytics', 'Unlimited revisi', 'Dedicated content manager'], cta: { text: 'Pilih Scale', href: `${WA}?text=Halo%2C%20saya%20mau%20paket%20Scale%20video%20production` } },
      ],
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        items: [
          { q: 'Kualitas video AI sudah bagus belum?', a: 'Sudah sangat bagus untuk konten marketing. Resolusi 1080p, motion smooth, tidak terlihat seperti video generik.' },
          { q: 'Apakah saya perlu sedia script?', a: 'Tidak harus. Anda bisa kirim topik dan referensi saja — AI generate script sekaligus.' },
          { q: 'Berapa lama 1 video selesai?', a: 'Per-video: 1-2 jam setelah brief diterima. Paket bulanan: batch 15 video diproduksi dalam 1-2 hari.' },
          { q: 'Platform apa saja yang didukung untuk auto-publish?', a: 'TikTok, Instagram Reels, YouTube Shorts, Facebook. Pilih sesuai paket.' },
          { q: 'Bisa pakai footage/foto produk saya sendiri?', a: 'Ya, sangat dianjurkan. Kirim foto produk → AI jadikan video cinematic yang branded.' },
        ],
      },
      stats: [
        { value: '15', label: 'Video per bulan (Growth)' },
        { value: '90%', label: 'Lebih hemat vs videografer' },
        { value: '4', label: 'Platform auto-publish' },
        { value: '1080p', label: 'Resolusi output standar' },
      ],
      cta: { title: 'Mulai Produksi Video Konsisten Hari Ini', description: 'Order 1 video gratis untuk lihat kualitasnya. Tidak ada komitmen.', button: { text: 'Coba Video Gratis →', href: `${WA}?text=Halo%20BerkahKarya%2C%20saya%20mau%20coba%201%20video%20gratis` } },
    },
    en: {
      slug: 'video-production',
      meta: { title: 'AI Video Production — BerkahKarya', description: 'Marketing video production with AI. Text-to-video, image-to-video, auto captions. 15 videos/month from $99.' },
      hero: {
        eyebrow: '🎬 VIDEO PRODUCTION',
        title: '15 Videos a Month?\nAI Can Do It Faster',
        description: 'Making 1 marketing video takes days and millions of rupiah? We produce professional videos with AI — from text to video in minutes. 15 videos/month from $99.',
        buttons: [
          { text: 'Start Production →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20AI%20video%20production`, primary: true },
          { text: 'View Packages', href: '#pricing', primary: false },
        ],
      },
      problem: {
        hook: 'If your video production still looks like this, you are already behind.',
        pains: [
          { icon: '💸', text: 'Hiring a videographer + editor = $200-330 per video. Budget exhausted before content gets going.' },
          { icon: '⏰', text: '1 video takes 3-5 days from concept to publish. Algorithms need consistent daily content.' },
          { icon: '📉', text: 'Rarely posting videos because production is too much work. Engagement drops, reach stagnates.' },
          { icon: '😩', text: 'Inconsistent video quality. Sometimes great, sometimes rushed depending on mood.' },
        ],
        bridge: 'AI Video Production: consistent output, stable quality, 90% cheaper.',
      },
      features: [
        { icon: '✍️', title: 'Text-to-Video AI', desc: 'Type a script or topic, AI immediately creates a complete video with visuals and narration.' },
        { icon: '🖼️', title: 'Image-to-Video', desc: 'Product photos or images become cinematic videos in minutes.' },
        { icon: '📝', title: 'Auto Captions', desc: 'Accurate automatic subtitles — essential for TikTok and Reels engagement.' },
        { icon: '⚡', title: 'Batch Production', desc: 'Produce 10-30 videos at once. Scale content without adding team members.' },
        { icon: '📐', title: 'Multi-Platform Format', desc: '9:16 (TikTok/Reels), 16:9 (YouTube), 1:1 (Instagram) — all formats at once.' },
        { icon: '📤', title: 'Auto-Publishing', desc: 'Videos published directly to TikTok, IG, YouTube via PostBridge after approval.' },
      ],
      howItWorks: {
        title: 'From Brief to Live Video in 3 Steps',
        steps: [
          { num: '1', title: 'Brief & Assets', desc: 'Send topic, target audience, tone, and visual assets (product photos, logo). We handle the rest.' },
          { num: '2', title: 'Production & Review', desc: 'AI generates video in 1-2 hours. You review and approve before publishing.' },
          { num: '3', title: 'Publish & Report', desc: 'Video published to all scheduled platforms. Weekly performance reports sent.' },
        ],
      },
      pricing: [
        { name: 'Per Video', price: '$7', period: '/video', features: ['1 video per brief', '9:16 or 16:9 format', 'Auto captions', 'Delivery < 2 hours', '1 revision'], cta: { text: 'Order Video', href: `${WA}?text=Hello%2C%20I%20want%20to%20order%201%20AI%20video` } },
        { name: 'Growth', price: '$99', period: '/month', highlight: true, features: ['15 videos/month', 'Multi-format (9:16 + 16:9)', 'Auto captions for all videos', 'Auto-publishing to 2 platforms', 'Weekly analytics report', '1 revision per video'], cta: { text: 'Choose Growth', href: `${WA}?text=Hello%2C%20I%20want%20the%20Growth%20video%20production%20package` } },
        { name: 'Scale', price: '$165', period: '/month', features: ['30 videos/month', 'All output formats', 'Auto captions + translate', 'Auto-publishing to 3 platforms', 'Real-time analytics', 'Unlimited revisions', 'Dedicated content manager'], cta: { text: 'Choose Scale', href: `${WA}?text=Hello%2C%20I%20want%20the%20Scale%20video%20production%20package` } },
      ],
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'Is AI video quality good enough?', a: 'Absolutely, for marketing content. 1080p resolution, smooth motion, does not look like generic stock video.' },
          { q: 'Do I need to prepare a script?', a: 'Not required. You can just send a topic and reference — AI generates the script as well.' },
          { q: 'How long does 1 video take?', a: 'Per-video: 1-2 hours after brief received. Monthly packages: batch of 15 videos produced in 1-2 days.' },
          { q: 'What platforms are supported for auto-publish?', a: 'TikTok, Instagram Reels, YouTube Shorts, Facebook. Choose per package.' },
          { q: 'Can I use my own product footage/photos?', a: 'Yes, highly recommended. Send product photos → AI turns them into branded cinematic videos.' },
        ],
      },
      stats: [
        { value: '15', label: 'Videos per month (Growth)' },
        { value: '90%', label: 'Cheaper than videographers' },
        { value: '4', label: 'Platforms auto-publish' },
        { value: '1080p', label: 'Standard output resolution' },
      ],
      cta: { title: 'Start Consistent Video Production Today', description: 'Order 1 free video to see the quality. No commitment required.', button: { text: 'Try Free Video →', href: `${WA}?text=Hello%20BerkahKarya%2C%20I%20want%20to%20try%201%20free%20video` } },
    },
  },

};

export const servicesSlugs = Object.keys(servicesData);
