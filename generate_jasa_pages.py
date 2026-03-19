#!/usr/bin/env python3
"""Generate 5 jasa service landing pages with pricing — BerkahKarya design system."""

import os

DIR = os.path.dirname(os.path.abspath(__file__))
WA = "6285732740006"

# ─── Service definitions ──────────────────────────────────────────────────────

SERVICES = [
    {
        "file": "jasa-website.html",
        "title": "Jasa Pembuatan Website — BerkahKarya",
        "meta": "Jasa pembuatan website profesional untuk UMKM dan bisnis Indonesia. Landing page, company profile, toko online — selesai 7 hari, harga transparan.",
        "tag": "Jasa Website",
        "hero_title": "Website Profesional<br><em>Selesai 7 Hari</em>",
        "hero_sub": "Landing page, company profile, sampai toko online — dibangun cepat, mobile-friendly, dan siap convert pengunjung jadi pelanggan.",
        "wa_greeting": "Halo Berkah Karya, saya tertarik dengan Jasa Pembuatan Website. Bisa konsultasi?",
        "problems": [
            ("😩", "Vendor butuh 1–3 bulan", "Bisnis kamu menunggu terlalu lama untuk go online"),
            ("💸", "Budget tidak predictable", "Freelancer sering over budget dan tidak transparan"),
            ("😐", "Template generik", "Website template yang sama dipakai ribuan bisnis lain"),
            ("🐌", "Website lambat", "Loading lama = bounce rate tinggi = kehilangan pelanggan"),
            ("🔧", "Tidak tahu cara maintain", "Setelah jadi, tidak ada yang bisa bantu kalau ada masalah"),
        ],
        "deliverables": [
            ("🎨", "Desain Custom", "Bukan template. Setiap elemen dirancang sesuai brand identity kamu."),
            ("📱", "100% Responsive", "Sempurna di semua perangkat — desktop, tablet, dan HP."),
            ("🔍", "SEO On-Page", "Meta tags, heading structure, dan speed optimasi agar mudah ditemukan Google."),
            ("💬", "CTA WhatsApp", "Tombol WA strategis di setiap halaman untuk maksimalkan lead."),
            ("🌐", "Domain & Hosting", "Setup domain dan hosting — website langsung live setelah selesai."),
            ("🔄", "Revisi Tanpa Batas", "Kita terus refine sampai kamu benar-benar puas."),
        ],
        "steps": [
            ("01", "Brief & Referensi", "Diskusi kebutuhan, tujuan, dan kumpulkan referensi desain"),
            ("02", "Wireframe & Mockup", "Preview tampilan sebelum masuk development — kamu approve dulu"),
            ("03", "Development", "Bangun dengan code clean, cepat, dan SEO-friendly"),
            ("04", "Review & Revisi", "Kamu review semua halaman, kami revisi sampai puas"),
            ("05", "Launch & Handover", "Website live, kamu terima akses penuh + panduan maintenance"),
        ],
        "benefits": [
            ("⚡", "7 Hari Selesai", "Bukan 3 bulan seperti vendor biasa. Launch online dalam seminggu."),
            ("🎯", "Desain Sesuai Brand", "Setiap pixel mencerminkan identitas kamu — bukan template ribuan bisnis."),
            ("🚀", "Loading Super Cepat", "Code dioptimasi. Tidak ada pengunjung yang kabur karena loading lama."),
            ("📈", "Didesain untuk Konversi", "Struktur, CTA, dan flow dirancang mengubah pengunjung jadi pelanggan."),
        ],
        "pricing": [
            {
                "name": "Landing Page",
                "price": "Rp 1.499.000",
                "period": "one-time",
                "desc": "Ideal untuk kampanye iklan atau produk/layanan tunggal",
                "items": [
                    "1 halaman responsif (landing page)",
                    "Desain custom sesuai brand",
                    "Integrasi WhatsApp CTA",
                    "SEO on-page dasar",
                    "Hosting setup & domain guide",
                    "Selesai dalam 5 hari",
                    "Revisi hingga 3x",
                ],
                "cta": "Mulai Sekarang",
                "highlight": False,
            },
            {
                "name": "Company Profile",
                "price": "Rp 3.999.000",
                "period": "one-time",
                "desc": "Website multi-halaman untuk bisnis yang ingin tampil profesional",
                "items": [
                    "5–7 halaman (Beranda, Tentang, Layanan, Portfolio, Kontak)",
                    "Desain custom premium",
                    "Blog/artikel (opsional)",
                    "Google Analytics integration",
                    "SEO on-page lengkap",
                    "Hosting setup & SSL",
                    "Selesai dalam 7 hari",
                    "Revisi tanpa batas",
                    "Panduan maintenance 30 hari",
                ],
                "cta": "Paling Populer",
                "highlight": True,
            },
            {
                "name": "Toko Online",
                "price": "Rp 6.999.000",
                "period": "one-time",
                "desc": "E-commerce lengkap dengan sistem produk dan pembayaran",
                "items": [
                    "Semua fitur Company Profile +",
                    "Katalog produk unlimited",
                    "Keranjang belanja & checkout",
                    "Integrasi payment gateway (Midtrans/Xendit)",
                    "Dashboard admin manajemen produk",
                    "Integrasi ongkir otomatis",
                    "Selesai dalam 14 hari",
                    "Revisi tanpa batas",
                    "Support 60 hari",
                ],
                "cta": "Konsultasi Dulu",
                "highlight": False,
            },
        ],
        "usecases": [
            ("🆕", "Bisnis Baru", "Butuh kehadiran online dari hari pertama. Website = credibility instan."),
            ("🔗", "UMKM yang Pakai Linktree", "Saatnya upgrade ke website profesional yang kamu miliki sepenuhnya."),
            ("💼", "Brand yang Mau Credible", "Tampilan profesional membangun kepercayaan calon klien dan investor."),
            ("📣", "Kampanye Iklan", "Landing page dedicated untuk iklan Meta/Google — bukan halaman beranda generik."),
        ],
    },
    {
        "file": "jasa-sosmed.html",
        "title": "Jasa Kelola Social Media — BerkahKarya",
        "meta": "Jasa kelola Instagram, TikTok, dan Facebook untuk bisnis Indonesia. Konten konsisten, engagement meningkat, kamu fokus ke bisnis.",
        "tag": "Kelola Social Media",
        "hero_title": "Social Media Kamu<br><em>Dikelola Penuh</em>",
        "hero_sub": "Konten konsisten, engagement tumbuh, dan follower bertambah — sementara kamu fokus menjalankan bisnis.",
        "wa_greeting": "Halo Berkah Karya, saya tertarik dengan Jasa Kelola Social Media. Bisa konsultasi?",
        "problems": [
            ("🕐", "Tidak ada waktu", "Kelola bisnis sudah full — tidak ada waktu buat konten setiap hari"),
            ("💭", "Kehabisan ide konten", "Bingung mau posting apa, akhirnya tidak posting sama sekali"),
            ("📉", "Engagement stagnan", "Follower ada tapi tidak ada yang interact, reach terus turun"),
            ("🎨", "Kualitas visual tidak konsisten", "Desain postingan tidak seragam, tidak mencerminkan brand"),
            ("⏰", "Jadwal posting tidak teratur", "Tidak ada konsistensi waktu posting, algoritma tidak memihak"),
        ],
        "deliverables": [
            ("✍️", "Copywriting & Caption", "Teks konten yang menarik, relevan, dan disesuaikan tone of voice brand."),
            ("🎨", "Desain Visual", "Grafis dan kreasi visual konsisten sesuai brand guideline."),
            ("📅", "Content Calendar", "Jadwal konten terencana sebulan penuh — tidak ada hari tanpa konten."),
            ("📊", "Laporan Bulanan", "Report engagement, reach, dan pertumbuhan follower setiap bulan."),
            ("💬", "Community Management", "Balas komentar dan DM — bangun relasi nyata dengan audiens."),
            ("🤖", "AI-Assisted Production", "Produksi konten lebih cepat dan konsisten dengan bantuan AI tools."),
        ],
        "steps": [
            ("01", "Discovery & Onboarding", "Kenali brand, tujuan, dan target audiens kamu"),
            ("02", "Brand & Content Strategy", "Susun strategi konten, tone of voice, dan pillar konten"),
            ("03", "Content Calendar Approval", "Kamu review dan approve jadwal konten bulanan"),
            ("04", "Produksi & Publish", "Tim kami buat dan publish konten sesuai jadwal"),
            ("05", "Laporan & Evaluasi", "Review performa bulanan dan penyesuaian strategi"),
        ],
        "benefits": [
            ("⏰", "Hemat Waktu Total", "Kamu tidak perlu memikirkan konten lagi — semua ditangani tim kami."),
            ("📈", "Engagement Tumbuh", "Strategi berbasis data memastikan konten kamu disukai algoritma."),
            ("🎯", "Konsisten & On-Brand", "Tampilan visual dan tone of voice yang konsisten setiap postingan."),
            ("🤖", "AI-Powered Efficiency", "Produksi lebih cepat, lebih banyak variasi, kualitas tetap terjaga."),
        ],
        "pricing": [
            {
                "name": "Starter",
                "price": "Rp 799.000",
                "period": "/bulan",
                "desc": "Untuk bisnis yang baru mulai bangun presence di social media",
                "items": [
                    "12 konten/bulan (3x seminggu)",
                    "1 platform (Instagram atau TikTok)",
                    "Copywriting + desain visual",
                    "Jadwal posting teratur",
                    "Laporan performa bulanan",
                ],
                "cta": "Mulai Sekarang",
                "highlight": False,
            },
            {
                "name": "Growth",
                "price": "Rp 1.799.000",
                "period": "/bulan",
                "desc": "Untuk bisnis yang ingin scale presence dan engagement lebih cepat",
                "items": [
                    "20 konten/bulan (5x seminggu)",
                    "2 platform (Instagram + TikTok/Facebook)",
                    "Copywriting + desain premium",
                    "Reels/video pendek 4x/bulan",
                    "Community management (balas komentar)",
                    "Laporan performa + analisis",
                    "Content calendar live doc",
                ],
                "cta": "Paling Populer",
                "highlight": True,
            },
            {
                "name": "Pro",
                "price": "Rp 3.499.000",
                "period": "/bulan",
                "desc": "Full management untuk brand yang serius tumbuh di social media",
                "items": [
                    "30 konten/bulan (setiap hari)",
                    "3 platform (Instagram + TikTok + Facebook)",
                    "Reels/video AI 8x/bulan",
                    "Full community management",
                    "Story interaktif setiap hari",
                    "Strategi hashtag & SEO Instagram",
                    "Weekly check-in call",
                    "Laporan detail mingguan + bulanan",
                ],
                "cta": "Konsultasi Dulu",
                "highlight": False,
            },
        ],
        "usecases": [
            ("🏪", "Pemilik Bisnis Sibuk", "Tidak ada waktu untuk social media tapi butuh online presence yang kuat."),
            ("🏠", "Brand Rumahan & UMKM", "Produk bagus tapi belum dikenal — butuh strategi konten yang tepat."),
            ("🏢", "Bisnis yang Mau Scale", "Sudah ada tim tapi butuh profesional yang handle social media."),
            ("🚀", "Brand Baru", "Baru launch dan butuh strategi dari nol untuk membangun audiens."),
        ],
    },
    {
        "file": "jasa-content-planner.html",
        "title": "Jasa Content Planner — BerkahKarya",
        "meta": "Jasa content planner profesional untuk bisnis Indonesia. Strategi konten 30 hari, content calendar, dan panduan eksekusi siap pakai.",
        "tag": "Content Planner",
        "hero_title": "Strategi Konten 30 Hari<br><em>Sudah Siap Duluan</em>",
        "hero_sub": "Tidak perlu pusing mikir mau posting apa. Kami siapkan strategi, jadwal, dan ide konten lengkap sebulan penuh.",
        "wa_greeting": "Halo Berkah Karya, saya tertarik dengan Jasa Content Planner. Bisa konsultasi?",
        "problems": [
            ("🤔", "Bingung mau posting apa", "Duduk di depan HP, tidak ada ide, akhirnya tidak posting"),
            ("📉", "Konten tidak terencana", "Posting sesuka hati tanpa strategi — hasilnya tidak optimal"),
            ("🎯", "Tidak tahu target audiens", "Konten dibuat tapi tidak relevan dengan orang yang mau dibeli"),
            ("🔀", "Konten tidak terarah", "Campuran antara promosi, personal, dan konten random tanpa purpose"),
            ("⚡", "Tim tidak tahu harus mulai dari mana", "Sudah ada tim tapi tidak ada panduan yang jelas"),
        ],
        "deliverables": [
            ("🗺️", "Strategi Konten", "Framework lengkap: content pillar, tone of voice, dan content mix yang optimal."),
            ("📅", "Content Calendar 30 Hari", "Jadwal konten sebulan penuh: topik, format, dan waktu posting optimal."),
            ("💡", "100+ Ide Konten", "Bank ide yang bisa dieksekusi tim internal kamu kapanpun dibutuhkan."),
            ("📝", "Template Caption", "50+ template caption siap pakai per content pillar — tinggal customisasi."),
            ("🎬", "Brief Produksi", "Panduan teknis untuk tim konten: visual reference, hook, dan angle."),
            ("📊", "KPI & Tracking Sheet", "Target metrik per bulan dan spreadsheet monitoring performa."),
        ],
        "steps": [
            ("01", "Discovery Session", "Riset brand, kompetitor, dan target audiens kamu secara mendalam"),
            ("02", "Strategy Development", "Susun content pillar, tone, dan strategi distribusi per platform"),
            ("03", "Calendar Creation", "Buat jadwal konten lengkap 30 hari dengan topik detail setiap slot"),
            ("04", "Presentasi & Revisi", "Review bersama, sesuaikan sampai kamu setuju dengan arahnya"),
            ("05", "Handover & Briefing", "Terima semua dokumen + sesi briefing untuk tim eksekusi kamu"),
        ],
        "benefits": [
            ("⏰", "Tidak Pusing Lagi", "Dari bingung ke eksekusi dalam hitungan hari — semuanya sudah ada."),
            ("🎯", "Konten Lebih Terarah", "Setiap postingan punya tujuan yang jelas: awareness, trust, atau konversi."),
            ("📈", "Hasil Lebih Terukur", "Target dan KPI yang jelas — kamu tahu persis apa yang mau dicapai."),
            ("👥", "Tim Lebih Produktif", "Tim konten punya panduan yang jelas; tidak perlu brainstorm dari nol tiap hari."),
        ],
        "pricing": [
            {
                "name": "Content Plan Basic",
                "price": "Rp 499.000",
                "period": "one-time",
                "desc": "Content plan siap pakai untuk 1 bulan di 1 platform",
                "items": [
                    "Content calendar 30 hari",
                    "1 platform (Instagram atau TikTok)",
                    "30 topik konten detail",
                    "Content pillar & tone guide",
                    "50 template caption",
                    "Selesai dalam 3 hari",
                ],
                "cta": "Order Sekarang",
                "highlight": False,
            },
            {
                "name": "Content Strategy Pro",
                "price": "Rp 1.199.000",
                "period": "one-time",
                "desc": "Strategi lengkap + content plan multi-platform untuk 1 bulan",
                "items": [
                    "Semua fitur Basic +",
                    "2 platform (Instagram + TikTok)",
                    "Riset kompetitor & audiens",
                    "Content pillar framework lengkap",
                    "Brief produksi visual",
                    "KPI tracking sheet",
                    "100+ template caption",
                    "Sesi review 1 jam (via Zoom/Meet)",
                    "Selesai dalam 5 hari",
                ],
                "cta": "Paling Populer",
                "highlight": True,
            },
            {
                "name": "Retainer Bulanan",
                "price": "Rp 799.000",
                "period": "/bulan",
                "desc": "Content plan diperbarui tiap bulan + optimasi berkelanjutan",
                "items": [
                    "Semua fitur Pro tiap bulan",
                    "Update strategi berdasarkan performa",
                    "Monthly performance review",
                    "Rekomendasi konten trending",
                    "Priority support via WA",
                    "Fleksibel cancel kapanpun",
                ],
                "cta": "Konsultasi Dulu",
                "highlight": False,
            },
        ],
        "usecases": [
            ("👤", "Solo Content Creator", "Butuh sistem yang terorganisir agar bisa konsisten posting tanpa burnout."),
            ("🏪", "UMKM yang Kelola Sendiri", "Pemilik bisnis yang ingin handle konten tapi butuh panduan yang jelas."),
            ("👥", "Tim Konten yang Butuh Struktur", "Tim ada tapi belum punya sistem dan framework yang efisien."),
            ("🚀", "Brand yang Mau Scale Cepat", "Konten harus konsisten dan terarah untuk support pertumbuhan bisnis."),
        ],
    },
    {
        "file": "jasa-video-ai.html",
        "title": "Jasa Video AI — BerkahKarya",
        "meta": "Jasa produksi video konten AI untuk TikTok, Reels, dan YouTube. Konten video berkualitas tinggi lebih cepat dan lebih murah dari produksi konvensional.",
        "tag": "Jasa Video AI",
        "hero_title": "Video Konten yang Diproduksi AI,<br><em>Siap Viral</em>",
        "hero_sub": "TikTok, Reels, YouTube Shorts — konten video berkualitas tinggi diproduksi lebih cepat dan lebih konsisten dengan teknologi AI.",
        "wa_greeting": "Halo Berkah Karya, saya tertarik dengan Jasa Video AI. Bisa konsultasi?",
        "problems": [
            ("💸", "Produksi video mahal", "Videografer, studio, dan editing menguras budget besar setiap konten"),
            ("🕐", "Proses lama", "Dari brief ke final bisa berminggu-minggu — sementara tren sudah berlalu"),
            ("🔁", "Tidak konsisten", "Sulit maintain kualitas dan frekuensi upload yang stabil"),
            ("😰", "Takut di depan kamera", "Tidak semua pemilik bisnis nyaman jadi talent video sendiri"),
            ("📉", "Video tidak perform", "Sudah buat konten tapi views rendah dan tidak ada engagement"),
        ],
        "deliverables": [
            ("🎬", "Video Konten AI", "Short-form video (15–90 detik) yang dioptimasi untuk TikTok, Reels, dan Shorts."),
            ("🎙️", "Voiceover Profesional", "Narasi suara AI atau talent yang natural dan on-brand."),
            ("✂️", "Editing & Motion", "Cut, transisi, teks animasi, musik, dan sound effect yang menarik."),
            ("📝", "Script & Konsep", "Dari ide ke skrip — termasuk hook, konten, dan CTA yang convert."),
            ("🎯", "Optimasi Platform", "Format, rasio aspek, dan thumbnail yang dioptimasi per platform."),
            ("📊", "Brief & Referensi", "Panduan visual dan referensi untuk konsistensi brand di setiap video."),
        ],
        "steps": [
            ("01", "Brief & Konsep", "Tentukan tujuan, gaya video, dan topik yang mau diangkat"),
            ("02", "Script & Storyboard", "Tim kami tulis skrip dan buat storyboard untuk approval kamu"),
            ("03", "Produksi AI", "Generate visual, voiceover, dan elemen video dengan AI"),
            ("04", "Editing & Finishing", "Assembly, color grade, sound design, dan animasi teks"),
            ("05", "Review & Deliver", "Kamu review, kami revisi, file final dalam format siap upload"),
        ],
        "benefits": [
            ("⚡", "3–5× Lebih Cepat", "Produksi video yang biasa butuh seminggu bisa selesai dalam 2 hari."),
            ("💰", "60% Lebih Hemat", "Kualitas setara produksi konvensional dengan biaya yang jauh lebih terjangkau."),
            ("📅", "Konsisten Tiap Minggu", "Pipeline produksi yang stabil — upload schedule tidak pernah miss."),
            ("🎯", "Dioptimasi Algoritma", "Setiap video dibuat dengan mempertimbangkan cara kerja algoritma platform."),
        ],
        "pricing": [
            {
                "name": "Starter",
                "price": "Rp 799.000",
                "period": "/bulan",
                "desc": "Untuk brand yang baru memulai content video secara konsisten",
                "items": [
                    "4 video/bulan (1x seminggu)",
                    "Durasi 15–60 detik",
                    "1 platform (TikTok atau Reels)",
                    "Script + voiceover AI",
                    "Editing + caption teks",
                    "Revisi 1x per video",
                ],
                "cta": "Mulai Sekarang",
                "highlight": False,
            },
            {
                "name": "Growth",
                "price": "Rp 1.899.000",
                "period": "/bulan",
                "desc": "Frekuensi lebih tinggi untuk mempercepat pertumbuhan channel",
                "items": [
                    "10 video/bulan",
                    "Durasi 15–90 detik",
                    "2 platform (TikTok + Reels)",
                    "Script + konsep + storyboard",
                    "Voiceover AI/talent",
                    "Editing premium + motion text",
                    "Thumbnail custom",
                    "Revisi 2x per video",
                    "Laporan performa bulanan",
                ],
                "cta": "Paling Populer",
                "highlight": True,
            },
            {
                "name": "Pro",
                "price": "Rp 3.999.000",
                "period": "/bulan",
                "desc": "Produksi video masif untuk brand yang berkomitmen dominasi platform",
                "items": [
                    "20 video/bulan",
                    "Mix durasi pendek + menengah",
                    "3 platform (TikTok + Reels + YouTube Shorts)",
                    "Full pre-production (brief, script, storyboard)",
                    "Voiceover premium",
                    "Editing cinematic + visual effects",
                    "Thumbnail A/B testing",
                    "Revisi tanpa batas",
                    "Weekly strategy call",
                    "Laporan analytics mendalam",
                ],
                "cta": "Konsultasi Dulu",
                "highlight": False,
            },
        ],
        "usecases": [
            ("🏪", "Brand & Produk UMKM", "Video produk yang menarik untuk meningkatkan penjualan di semua platform."),
            ("🎓", "Edukasi & Coach", "Konten edukatif yang konsisten untuk membangun authority dan audiens."),
            ("🏢", "Bisnis yang Mau Viral", "Strategi video yang terencana untuk reach organik yang maksimal."),
            ("📣", "Campaign & Iklan", "Video iklan yang dioptimasi untuk Meta Ads, TikTok Ads, dan YouTube Ads."),
        ],
    },
    {
        "file": "jasa-foto-produk.html",
        "title": "Jasa Foto Produk AI — BerkahKarya",
        "meta": "Jasa foto produk AI untuk marketplace dan social media. Kualitas studio profesional tanpa sewa studio mahal — pengiriman cepat dalam 24 jam.",
        "tag": "Foto Produk AI",
        "hero_title": "Foto Produk Kelas Studio,<br><em>Dihasilkan AI</em>",
        "hero_sub": "Foto produk setara fotografer profesional untuk marketplace, iklan, dan social media — lebih cepat dan lebih hemat dari studio konvensional.",
        "wa_greeting": "Halo Berkah Karya, saya tertarik dengan Jasa Foto Produk AI. Bisa konsultasi?",
        "problems": [
            ("💸", "Studio foto mahal", "Sewa studio bisa ratusan ribu per jam — belum termasuk fotografer dan editing"),
            ("🕐", "Proses lama", "Antri fotografer, sesi foto, editing — bisa berminggu-minggu untuk 10 foto"),
            ("📷", "Foto sendiri tidak bagus", "Foto dengan HP biasa tidak cukup profesional untuk marketplace kompetitif"),
            ("🔁", "Tidak konsisten", "Tiap sesi foto berbeda style — brand terlihat tidak profesional"),
            ("📉", "Foto yang buruk = penjualan turun", "Di marketplace, foto produk adalah faktor #1 keputusan beli"),
        ],
        "deliverables": [
            ("🖼️", "Foto Produk Berlatar Putih", "Background putih bersih standar marketplace — siap upload ke Shopee, Tokopedia, dll."),
            ("🎨", "Foto Lifestyle & Scene", "Produk dalam konteks penggunaan nyata — meningkatkan keinginan beli."),
            ("✂️", "Background Removal", "Produk dengan background transparan (PNG) — fleksibel untuk berbagai kebutuhan."),
            ("🌟", "Enhancement & Retouching", "Perbaikan pencahayaan, shadow, dan detail — produk terlihat terbaik."),
            ("📐", "Multiple Format & Rasio", "Siap untuk berbagai platform: square, portrait, landscape, banner."),
            ("⚡", "Pengiriman 24 Jam", "File final dikirim dalam 24 jam setelah foto produk diterima."),
        ],
        "steps": [
            ("01", "Kirim Produk", "Kirim produk fisik atau foto produk yang sudah kamu miliki"),
            ("02", "Brief & Style", "Tentukan gaya foto: minimalis, lifestyle, studio, atau premium"),
            ("03", "AI Processing", "Proses enhancement, background, dan komposisi dengan AI"),
            ("04", "Review", "Kamu review semua foto, kami revisi sesuai feedback"),
            ("05", "Deliver", "File final dalam format siap pakai dikirim dalam 24–48 jam"),
        ],
        "benefits": [
            ("💰", "70% Lebih Hemat", "Dibanding sewa studio + fotografer + editor, biaya jauh lebih terjangkau."),
            ("⚡", "Pengiriman 24 Jam", "Produk baru bisa langsung listing dalam 1 hari — tidak ada delay."),
            ("🎨", "Konsisten Every Time", "Setiap foto punya quality standard yang sama — brand terlihat profesional."),
            ("♾️", "Unlimited Variasi", "Satu produk bisa jadi banyak foto dengan scene dan angle berbeda."),
        ],
        "pricing": [
            {
                "name": "Starter",
                "price": "Rp 349.000",
                "period": "one-time",
                "desc": "Untuk listing produk baru di marketplace",
                "items": [
                    "10 foto produk",
                    "Background putih bersih",
                    "Basic enhancement",
                    "Format JPG (siap marketplace)",
                    "Pengiriman dalam 48 jam",
                    "Revisi 1x",
                ],
                "cta": "Order Sekarang",
                "highlight": False,
            },
            {
                "name": "Pro",
                "price": "Rp 799.000",
                "period": "one-time",
                "desc": "Foto produk lengkap untuk marketplace dan social media",
                "items": [
                    "25 foto produk",
                    "Background putih + lifestyle scene (5 scene)",
                    "Premium enhancement & retouching",
                    "Background removal (PNG)",
                    "Multiple format & rasio",
                    "Pengiriman dalam 24 jam",
                    "Revisi 2x",
                ],
                "cta": "Paling Populer",
                "highlight": True,
            },
            {
                "name": "Brand Pack",
                "price": "Rp 1.999.000",
                "period": "one-time",
                "desc": "Shoot lengkap untuk brand yang butuh aset visual konsisten",
                "items": [
                    "60 foto produk",
                    "Background putih + 10 lifestyle scene",
                    "Color grading konsisten per brand",
                    "Background removal semua foto",
                    "Banner & thumbnail marketplace",
                    "Brand guideline warna foto",
                    "Pengiriman dalam 24 jam",
                    "Revisi tanpa batas",
                    "Raw file disertakan",
                ],
                "cta": "Konsultasi Dulu",
                "highlight": False,
            },
        ],
        "usecases": [
            ("🛍️", "Seller Marketplace", "Foto produk yang membuat listing kamu bersaing di Shopee, Tokopedia, Lazada."),
            ("📸", "Brand Baru yang Baru Launch", "Butuh semua aset foto produk untuk launch — cepat dan affordable."),
            ("📱", "Konten Social Media", "Foto produk untuk feed Instagram, TikTok, dan iklan yang menarik perhatian."),
            ("🏷️", "Reseller & Dropshipper", "Diferensiasi listing dari kompetitor yang pakai foto yang sama."),
        ],
    },
]


# ─── HTML Components ───────────────────────────────────────────────────────────

BK_NAV_MOBILE_STYLE = """
  .bk-nav.open .bk-nav-mobile-menu {
    display: flex; flex-direction: column; gap: 0.5rem;
    padding: 1rem 1.5rem 1.25rem;
    border-bottom: 1px solid var(--border);
  }
  .bk-nav-mobile-menu { display: none; }
  .bk-nav-mobile-menu a {
    font-size: 0.9rem; font-weight: 500; color: var(--text-muted);
    padding: 0.5rem 0; border-bottom: 1px solid var(--border);
  }
  .bk-nav-mobile-menu a:last-child { border-bottom: none; }"""


def nav_html(wa_greeting):
    wa_enc = wa_greeting.replace(" ", "%20").replace("?", "%3F").replace(",", "%2C")
    return f"""<nav class="bk-nav" id="mainNav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="digital-product.html">Produk Digital</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="https://wa.me/{WA}?text={wa_enc}" class="bk-nav-cta" target="_blank" rel="noopener">Konsultasi Gratis →</a>
    <button class="bk-nav-mobile" id="mobileToggle" aria-label="Menu">☰</button>
  </div>
  <div class="bk-nav-mobile-menu" id="mobileMenu">
    <a href="services.html">Layanan</a>
    <a href="digital-product.html">Produk Digital</a>
    <a href="tools.html">Tools</a>
    <a href="about.html">About</a>
    <a href="https://wa.me/{WA}?text={wa_enc}" target="_blank" rel="noopener">💬 Konsultasi Gratis</a>
  </div>
</nav>"""


FOOTER_HTML = """<footer class="bk-footer">
  <div class="bk-footer-inner">
    <div class="bk-footer-brand">
      <div class="bk-logo">Berkah<span>Karya</span></div>
      <p>AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital dalam satu ekosistem.</p>
    </div>
    <div class="bk-footer-col">
      <h5>Layanan</h5>
      <ul>
        <li><a href="jasa-sosmed.html">Kelola Social Media</a></li>
        <li><a href="jasa-video-ai.html">Jasa Video AI</a></li>
        <li><a href="jasa-website.html">Jasa Website</a></li>
        <li><a href="jasa-foto-produk.html">Foto Produk AI</a></li>
        <li><a href="jasa-content-planner.html">Content Planner</a></li>
      </ul>
    </div>
    <div class="bk-footer-col">
      <h5>Produk Digital</h5>
      <ul>
        <li><a href="digital-product.html">Katalog Produk</a></li>
        <li><a href="dp-job-magnet.html">JobMagnet AI</a></li>
        <li><a href="dp-ai-creative-tools.html">AI Creative Tools</a></li>
        <li><a href="dp-guru-ai.html">Guru Pintar AI</a></li>
      </ul>
    </div>
    <div class="bk-footer-col">
      <h5>Perusahaan</h5>
      <ul>
        <li><a href="about.html">Tentang Kami</a></li>
        <li><a href="contact.html">Kontak</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="legal/privacy-policy.html">Privasi</a></li>
      </ul>
    </div>
  </div>
  <div class="bk-footer-bottom">
    <span>© 2025 BerkahKarya. All rights reserved.</span>
    <span>Made with ❤️ + 🤖 AI in Indonesia</span>
  </div>
</footer>"""


JASA_CSS = """
    /* ── Jasa LP shared styles ── */
    .js-hero {
      background: var(--bg-white); border-bottom: 1px solid var(--border);
      padding: calc(64px + 5rem) 1.5rem 5rem; text-align: center;
    }
    .js-hero-inner { max-width: 760px; margin: 0 auto; }
    .js-tag {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--bg-muted); border: 1px solid var(--border);
      border-radius: 999px; padding: 6px 14px; margin-bottom: 1.5rem;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; color: var(--mustard);
    }
    .js-hero h1 {
      font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 900;
      letter-spacing: -0.04em; line-height: 1.08; margin: 0 0 1.25rem;
    }
    .js-hero h1 em { font-style: normal; color: var(--mustard); }
    .js-hero-sub {
      font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;
      margin: 0 auto 2rem; max-width: 580px;
    }
    .js-hero-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

    /* Sections */
    .js-sec { padding: 5rem 1.5rem; }
    .js-sec.alt { background: var(--bg-muted); }
    .js-sec-inner { max-width: var(--max-width); margin: 0 auto; }
    .js-sec-head { margin-bottom: 3rem; }
    .js-sec-head.center { text-align: center; }
    .sec-lbl { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mustard); margin-bottom: 0.6rem; }
    .js-sec-head h2 { font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.2; margin: 0; }
    .js-sec-head h2 em { font-style: normal; color: var(--mustard); }
    .js-sec-head p { color: var(--text-muted); line-height: 1.65; margin: 0.75rem 0 0; max-width: 560px; }
    .js-sec-head.center p { margin-left: auto; margin-right: auto; }

    /* Problems */
    .js-prob-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .js-prob-item {
      display: flex; align-items: flex-start; gap: 1rem;
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 1.25rem;
    }
    .js-prob-icon { font-size: 1.5rem; flex-shrink: 0; line-height: 1; }
    .js-prob-item h4 { font-size: 0.9rem; font-weight: 800; color: var(--text); margin: 0 0 0.25rem; }
    .js-prob-item p { font-size: 0.82rem; color: var(--text-muted); margin: 0; line-height: 1.55; }

    /* Deliverables */
    .js-deliv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    .js-deliv-card {
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.75rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .js-deliv-card:hover { border-color: var(--mustard); box-shadow: 0 4px 20px rgba(200,146,10,0.08); }
    .js-deliv-icon { font-size: 1.8rem; display: block; margin-bottom: 0.75rem; }
    .js-deliv-card h4 { font-size: 0.9rem; font-weight: 800; color: var(--text); margin: 0 0 0.4rem; }
    .js-deliv-card p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin: 0; }

    /* Process steps */
    .js-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; margin-top: 1rem; }
    .js-steps::before { content: ''; position: absolute; top: 32px; left: 10%; right: 10%; height: 1px; background: var(--border); z-index: 0; }
    .js-step { text-align: center; padding: 0 0.75rem; position: relative; }
    .js-step-num {
      width: 64px; height: 64px; border-radius: 50%;
      border: 2px solid var(--mustard); background: var(--bg-muted);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 900; color: var(--mustard);
      margin: 0 auto 1rem; position: relative; z-index: 1;
    }
    .js-step h4 { font-size: 0.85rem; font-weight: 800; color: var(--text); margin: 0 0 0.35rem; }
    .js-step p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin: 0; }

    /* Benefits */
    .js-benefit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
    .js-benefit {
      display: flex; gap: 1rem; align-items: flex-start;
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.5rem;
    }
    .js-benefit-icon { font-size: 1.8rem; flex-shrink: 0; }
    .js-benefit strong { display: block; font-size: 0.95rem; font-weight: 800; color: var(--text); margin-bottom: 0.3rem; }
    .js-benefit p { font-size: 0.83rem; color: var(--text-muted); line-height: 1.55; margin: 0; }

    /* Pricing */
    .js-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .js-plan {
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 2rem;
      display: flex; flex-direction: column;
      transition: box-shadow 0.2s;
    }
    .js-plan.highlight {
      border-color: var(--mustard); border-width: 2px;
      box-shadow: 0 0 0 4px rgba(212,160,23,0.08);
      position: relative;
    }
    .js-plan.highlight::before {
      content: '⭐ Paling Dipilih';
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: var(--mustard); color: #fff;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em;
      padding: 4px 14px; border-radius: 999px; white-space: nowrap;
    }
    .js-plan-name { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mustard); margin-bottom: 0.5rem; }
    .js-plan-price { font-size: 2.2rem; font-weight: 900; letter-spacing: -0.04em; color: var(--text); line-height: 1; }
    .js-plan-price span { font-size: 0.85rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0; }
    .js-plan-desc { font-size: 0.83rem; color: var(--text-muted); line-height: 1.55; margin: 0.75rem 0 1.5rem; }
    .js-plan-items { list-style: none; padding: 0; margin: 0 0 1.75rem; display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
    .js-plan-items li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.83rem; color: var(--text-muted); }
    .js-plan-items li::before { content: '✓'; color: var(--mustard); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .js-plan-btn { display: block; text-align: center; padding: 12px 20px; border-radius: var(--radius-sm); font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .js-plan.highlight .js-plan-btn { background: var(--mustard); color: #fff; }
    .js-plan.highlight .js-plan-btn:hover { background: var(--mustard-dark); }
    .js-plan:not(.highlight) .js-plan-btn { border: 1.5px solid var(--border); color: var(--text); }
    .js-plan:not(.highlight) .js-plan-btn:hover { border-color: var(--mustard); color: var(--mustard); }
    .js-pricing-note { text-align: center; margin-top: 1.5rem; font-size: 0.82rem; color: var(--text-light); }

    /* Use cases */
    .js-usecase-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .js-usecase-item {
      background: var(--bg-white); border-left: 3px solid var(--mustard);
      border: 1px solid var(--border); border-left: 3px solid var(--mustard);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 1.25rem 1.5rem;
    }
    .js-usecase-item h4 { font-size: 0.9rem; font-weight: 800; color: var(--text); margin: 0 0 0.3rem; }
    .js-usecase-item p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; margin: 0; }

    /* CTA Final */
    .js-cta-final { text-align: center; padding: 5rem 1.5rem; }
    .js-cta-inner { max-width: 600px; margin: 0 auto; }
    .js-cta-inner h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 900; letter-spacing: -0.03em; margin: 0 0 1rem; }
    .js-cta-inner h2 em { font-style: normal; color: var(--mustard); }
    .js-cta-inner p { color: var(--text-muted); line-height: 1.7; margin: 0 0 2rem; }
    .js-cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

    /* Responsive */
    @media (max-width: 1000px) { .js-steps { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; } .js-steps::before { display: none; } }
    @media (max-width: 900px) { .js-deliv-grid, .js-pricing-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 680px) {
      .js-prob-grid, .js-deliv-grid, .js-pricing-grid, .js-benefit-grid, .js-usecase-grid, .js-steps { grid-template-columns: 1fr; }
      .js-hero { padding: calc(64px + 3rem) 1.25rem 3rem; }
      .js-sec { padding: 3.5rem 1.25rem; }
      .js-plan.highlight::before { font-size: 0.65rem; }
    }"""


def make_jasa_page(s):
    wa_enc = s["wa_greeting"].replace(" ", "%20").replace("?", "%3F").replace(",", "%2C")

    # Problems
    probs = ""
    for icon, title, desc in s["problems"]:
        probs += f"""      <div class="js-prob-item">
        <span class="js-prob-icon">{icon}</span>
        <div><h4>{title}</h4><p>{desc}</p></div>
      </div>\n"""

    # Deliverables
    delivs = ""
    for icon, title, desc in s["deliverables"]:
        delivs += f"""      <div class="js-deliv-card">
        <span class="js-deliv-icon">{icon}</span>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>\n"""

    # Steps
    steps = ""
    for num, title, desc in s["steps"]:
        steps += f"""      <div class="js-step">
        <div class="js-step-num">{num}</div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>\n"""

    # Benefits
    bens = ""
    for icon, title, desc in s["benefits"]:
        bens += f"""      <div class="js-benefit">
        <span class="js-benefit-icon">{icon}</span>
        <div><strong>{icon} {title}</strong><p>{desc}</p></div>
      </div>\n"""
    # Fix: remove double emoji in strong
    for icon, title, desc in s["benefits"]:
        pass  # handled below

    bens = ""
    for icon, title, desc in s["benefits"]:
        bens += f"""      <div class="js-benefit">
        <div>
          <strong>{icon} {title}</strong>
          <p>{desc}</p>
        </div>
      </div>\n"""

    # Pricing
    plans = ""
    for p in s["pricing"]:
        hl_class = " highlight" if p["highlight"] else ""
        btn_txt = p["cta"]
        items = "\n".join([f"          <li>{it}</li>" for it in p["items"]])
        plans += f"""      <div class="js-plan{hl_class}">
        <div class="js-plan-name">{p["name"]}</div>
        <div class="js-plan-price">{p["price"]} <span>{p["period"]}</span></div>
        <p class="js-plan-desc">{p["desc"]}</p>
        <ul class="js-plan-items">
{items}
        </ul>
        <a href="https://wa.me/{WA}?text={wa_enc}" class="js-plan-btn" target="_blank" rel="noopener">{btn_txt}</a>
      </div>\n"""

    # Use cases
    usecases = ""
    for icon, title, desc in s["usecases"]:
        usecases += f"""      <div class="js-usecase-item">
        <h4>{icon} {title}</h4>
        <p>{desc}</p>
      </div>\n"""

    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{s["title"]}</title>
  <meta name="description" content="{s["meta"]}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
{JASA_CSS}
{BK_NAV_MOBILE_STYLE}
  </style>
</head>
<body>

{nav_html(s["wa_greeting"])}

<!-- HERO -->
<section class="js-hero">
  <div class="js-hero-inner">
    <div class="js-tag">✨ {s["tag"]}</div>
    <h1>{s["hero_title"]}</h1>
    <p class="js-hero-sub">{s["hero_sub"]}</p>
    <div class="js-hero-btns">
      <a href="https://wa.me/{WA}?text={wa_enc}" class="btn-primary" target="_blank" rel="noopener">
        💬 Konsultasi Gratis
      </a>
      <a href="#harga" class="btn-secondary">Lihat Harga ↓</a>
    </div>
  </div>
</section>

<!-- MASALAH -->
<section class="js-sec alt">
  <div class="js-sec-inner">
    <div class="js-sec-head">
      <span class="sec-lbl">Masalah yang Kami Selesaikan</span>
      <h2>Kenapa Bisnis Kamu <em>Butuh Ini?</em></h2>
    </div>
    <div class="js-prob-grid">
{probs}    </div>
  </div>
</section>

<!-- DELIVERABLES -->
<section class="js-sec" id="layanan">
  <div class="js-sec-inner">
    <div class="js-sec-head center">
      <span class="sec-lbl">Yang Kamu Dapatkan</span>
      <h2>Semua yang <em>Kamu Butuhkan</em></h2>
    </div>
    <div class="js-deliv-grid">
{delivs}    </div>
  </div>
</section>

<!-- PROSES -->
<section class="js-sec alt" id="proses">
  <div class="js-sec-inner">
    <div class="js-sec-head center">
      <span class="sec-lbl">Proses Kerja</span>
      <h2>Cara Kerja <em>yang Transparan</em></h2>
    </div>
    <div class="js-steps">
{steps}    </div>
  </div>
</section>

<!-- KEUNGGULAN -->
<section class="js-sec">
  <div class="js-sec-inner">
    <div class="js-sec-head center">
      <span class="sec-lbl">Keunggulan</span>
      <h2>Kenapa Pilih <em>BerkahKarya?</em></h2>
    </div>
    <div class="js-benefit-grid">
{bens}    </div>
  </div>
</section>

<!-- PRICING -->
<section class="js-sec alt" id="harga">
  <div class="js-sec-inner">
    <div class="js-sec-head center">
      <span class="sec-lbl">Harga Transparan</span>
      <h2>Pilih Paket yang <em>Pas untuk Kamu</em></h2>
      <p>Semua harga sudah termasuk semua yang disebutkan. Tidak ada biaya tersembunyi.</p>
    </div>
    <div class="js-pricing-grid">
{plans}    </div>
    <p class="js-pricing-note">💬 Semua paket bisa dikonsultasikan lebih lanjut · Custom paket tersedia · Pembayaran bisa dicicil untuk paket di atas Rp 2 juta</p>
  </div>
</section>

<!-- USE CASES -->
<section class="js-sec" id="cocok-untuk">
  <div class="js-sec-inner">
    <div class="js-sec-head center">
      <span class="sec-lbl">Siapa yang Cocok</span>
      <h2>Layanan Ini <em>Tepat Untukmu</em> Jika...</h2>
    </div>
    <div class="js-usecase-grid">
{usecases}    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="js-cta-final">
  <div class="js-cta-inner">
    <span class="sec-lbl" style="display:block;text-align:center;">Mulai Sekarang</span>
    <h2>Siap? Kita Mulai<br><em>Hari Ini</em></h2>
    <p>Konsultasi pertama gratis. Ceritakan kebutuhan kamu — kami bantu temukan solusi yang tepat dalam budget kamu.</p>
    <div class="js-cta-btns">
      <a href="https://wa.me/{WA}?text={wa_enc}" class="btn-primary" target="_blank" rel="noopener">
        💬 Konsultasi Gratis via WhatsApp
      </a>
      <a href="services.html" class="btn-secondary">Lihat Semua Layanan</a>
    </div>
  </div>
</section>

{FOOTER_HTML}

<script>
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
</script>
</body>
</html>"""


# ─── Generate ──────────────────────────────────────────────────────────────────

os.chdir(DIR)

for s in SERVICES:
    with open(s["file"], "w", encoding="utf-8") as f:
        f.write(make_jasa_page(s))
    print(f"✅ {s['file']}")

print(f"\n✅ Done — {len(SERVICES)} jasa pages generated with pricing.")
