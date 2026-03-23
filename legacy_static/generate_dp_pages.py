#!/usr/bin/env python3
"""Generate digital-product.html (catalog) + 7 individual LP pages."""

import os

DIR = os.path.dirname(os.path.abspath(__file__))
WA = "6285732740006"

# ─── Product data ─────────────────────────────────────────────────────────────
PRODUCTS = [
    {
        "file": "dp-parenting.html",
        "name": "Panduan Cerdas Parenting Anak 0–6 Tahun",
        "short": "Panduan Parenting 0–6",
        "cat": "Personal",
        "cat_emoji": "👨‍👩‍👧",
        "price": "Rp 49.000",
        "price_raw": "49.000",
        "emoji": "👶",
        "desc_short": "Panduan lengkap untuk mendukung perkembangan fisik, emosi, dan kognitif anak usia 0–6 tahun dengan kegiatan harian, tips nutrisi, dan stimulasi.",
        "tagline": "Dukung tumbuh kembang si kecil dengan cara yang benar — berbasis riset, mudah dipraktikkan setiap hari.",
        "about": "Kebanyakan orang tua baru bertanya-tanya: \"Sudah benar belum cara saya mendidik anak?\" Panduan ini hadir untuk menjawab pertanyaan itu. Berbasis penelitian tumbuh kembang anak, ditulis dengan bahasa yang mudah dipahami, dan langsung bisa dipraktikkan mulai hari ini.",
        "gets": [
            ("📋", "Panduan Kegiatan Harian", "Jadwal stimulasi yang disesuaikan usia (0-3 bulan, 3-6 bulan, dst.) untuk mengoptimalkan tumbuh kembang kognitif dan motorik anak."),
            ("🥗", "Panduan Nutrisi Lengkap", "Rekomendasi makanan per tahap usia, porsi ideal, dan cara mengatasi anak susah makan berbasis evidence-based nutrition."),
            ("🧠", "Stimulasi Kecerdasan", "100+ aktivitas bermain edukatif yang merangsang perkembangan bahasa, sosial-emosional, dan kreativitas anak."),
            ("💬", "Panduan Komunikasi Positif", "Cara bicara yang membangun kepercayaan diri anak, mengelola tantrum, dan membangun kedekatan emosional yang kuat."),
            ("📊", "Milestone Tracker", "Checklist perkembangan yang normal dan tanda-tanda kapan perlu konsultasi ke dokter atau psikolog anak."),
            ("🔄", "Update Gratis Seumur Hidup", "Konten diperbarui secara berkala mengikuti perkembangan riset terbaru tentang parenting dan child development."),
        ],
        "benefits": [
            ("⏰", "Hemat Waktu Research", "Semua informasi penting sudah dirangkum; tidak perlu membaca puluhan buku parenting terpisah."),
            ("✅", "Berbasis Riset", "Setiap rekomendasi didukung penelitian ilmiah, bukan sekadar opini atau tradisi."),
            ("📱", "Bisa Diakses Kapan Saja", "Format digital yang bisa dibuka dari HP, tablet, atau laptop kapanpun dibutuhkan."),
            ("🎯", "Praktis & Actionable", "Langsung bisa dipraktikkan tanpa perlu jadi ahli psikologi anak terlebih dahulu."),
        ],
        "targets": ["Orang tua baru dengan anak 0–6 tahun", "Ibu hamil yang ingin mempersiapkan diri", "Nenek/kakek yang membantu mengasuh cucu", "Pengasuh profesional & daycare"],
        "how": [
            ("1", "Beli & Download", "Setelah pembayaran, link download dikirim langsung ke email atau WhatsApp kamu dalam 5 menit."),
            ("2", "Tentukan Usia Anak", "Buka bab sesuai usia anak saat ini untuk langsung menemukan panduan yang relevan."),
            ("3", "Praktikkan Harian", "Ikuti jadwal kegiatan harian yang sudah dirancang dan catat perkembangan anak menggunakan milestone tracker."),
        ],
        "faqs": [
            ("Format filenya apa?", "PDF berkualitas tinggi, bisa dibuka di HP/laptop/tablet. Setelah beli, kamu terima link download permanen."),
            ("Ada garansi?", "Ya — garansi uang kembali 7 hari jika konten tidak sesuai ekspektasi. Hubungi kami via WA."),
            ("Anak saya sudah 5 tahun, masih relevan?", "Bab 4-6 tahun khusus membahas persiapan sekolah, kemandirian, dan stimulasi kecerdasan anak pra-SD."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli Panduan Cerdas Parenting Anak 0-6 Tahun (Rp 49.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/panduan-parenting",
    },
    {
        "file": "dp-job-magnet.html",
        "name": "JobMagnet AI",
        "short": "JobMagnet AI",
        "cat": "Karir",
        "cat_emoji": "💼",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "🎯",
        "desc_short": "Biarkan AI yang mencari pekerjaan untukmu. Upgrade CV & profil LinkedIn agar ATS-friendly, latihan interview, serta strategi job hunting.",
        "tagline": "CV kamu melewati filter ATS — dan recruiter nggak bisa menolak untuk menelepon.",
        "about": "95% lamaran pekerjaan gagal bukan karena pelamarnya tidak kompeten, tapi karena CV tidak melewati filter ATS (Applicant Tracking System). JobMagnet AI hadir untuk mengubah itu. Toolkit ini memberikan panduan lengkap dari template CV ATS-friendly, optimasi LinkedIn, hingga prompt AI untuk latihan interview — semua dalam satu paket.",
        "gets": [
            ("📄", "Template CV ATS-Friendly", "10+ template CV profesional yang sudah diuji lolos ATS berbagai perusahaan besar. Tinggal isi data, langsung kirim."),
            ("🔗", "Panduan Optimasi LinkedIn", "Langkah demi langkah cara mengoptimalkan profil LinkedIn agar muncul di pencarian recruiter dan mendapat lebih banyak InMail."),
            ("🤖", "200+ AI Prompt untuk Job Hunting", "Prompt siap pakai untuk ChatGPT/Claude: tulis cover letter, sesuaikan CV ke job desc, latihan interview, negosiasi gaji."),
            ("🎤", "Bank Soal Interview", "100+ pertanyaan interview paling sering ditanyakan + framework jawaban STAR yang sudah terbukti berhasil."),
            ("💰", "Panduan Negosiasi Gaji", "Strategi berbasis data untuk negosiasi gaji agar kamu tidak underbid dan meninggalkan uang di meja."),
            ("🔄", "Update Berkala", "Toolkit diperbarui sesuai tren job market Indonesia terbaru — termasuk tips untuk melamar ke startup dan korporat."),
        ],
        "benefits": [
            ("📈", "CV Lolos ATS", "Template yang sudah dioptimasi untuk melewati filter algoritma sebelum sampai ke tangan HRD manusia."),
            ("⏰", "Hemat Waktu 10×", "Tidak perlu membuat CV dan cover letter dari nol setiap kali melamar — AI yang tulis, kamu yang review."),
            ("🎯", "Tingkat Respons Lebih Tinggi", "Pengguna melaporkan 3-5× lebih banyak callback interview setelah menggunakan template ini."),
            ("💪", "Percaya Diri Interview", "Latihan dengan bank soal yang komprehensif membuat kamu tidak gugup saat interview yang sebenarnya."),
        ],
        "targets": ["Fresh graduate yang kesulitan mendapat panggilan interview", "Karyawan yang ingin pindah kerja atau naik level", "Profesional yang ingin memasuki industri baru", "Siapapun yang sudah lama melamar tapi tidak ada respons"],
        "how": [
            ("1", "Download & Extract", "File ZIP berisi semua template, panduan PDF, dan file prompt AI. Extract ke folder lokal."),
            ("2", "Pilih Template CV", "Pilih template sesuai industri target. Edit di Canva atau Microsoft Word (link edit tersedia di dalam file)."),
            ("3", "Gunakan AI Prompt", "Copy prompt yang relevan ke ChatGPT/Claude untuk generate cover letter, sesuaikan ke job desc, atau latihan interview."),
        ],
        "faqs": [
            ("Template bisa diedit di mana?", "Template tersedia dalam format Canva (gratis) dan DOCX (Microsoft Word/Google Docs). Semua link edit sudah disertakan."),
            ("Apakah cocok untuk fresh graduate?", "Ya, ada template khusus fresh graduate yang menonjolkan skills, proyek kuliah, dan pengalaman organisasi."),
            ("AI prompt-nya untuk ChatGPT versi berapa?", "Prompt kompatibel dengan ChatGPT 3.5 (gratis) dan 4.0, serta Claude dan Gemini."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli JobMagnet AI (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/jobmagnet-ai",
    },
    {
        "file": "dp-ai-ad-engine.html",
        "name": "AI Creative & Performance Ad Engine",
        "short": "AI Ad Engine",
        "cat": "Bisnis",
        "cat_emoji": "📣",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "🚀",
        "desc_short": "Mesin AI yang menghasilkan winning ad creative untuk Meta Ads dalam hitungan menit; 1000+ template copy, strategi audience & creative breakdown.",
        "tagline": "Stop buang budget iklan untuk creative yang tidak convert. Biarkan AI yang buat winning ads-nya.",
        "about": "80% kegagalan iklan Meta bukan karena targeting yang salah, tapi karena creative yang lemah. AI Creative & Performance Ad Engine adalah toolkit lengkap untuk menghasilkan ad copy, hook, headline, dan strategi creative yang terbukti convert — menggunakan framework yang sama dengan pemenang Facebook Ad Awards.",
        "gets": [
            ("✍️", "1000+ Template Ad Copy", "Template copy untuk berbagai industri: fashion, F&B, properti, finance, pendidikan, dan lainnya. Tinggal sesuaikan dengan produk."),
            ("🎣", "Bank Hook Viral", "300+ formula hook pembuka iklan yang terbukti menghentikan scroll dan membuat orang lanjut baca — berdasarkan analisis 10.000+ winning ads."),
            ("🎯", "Panduan Strategi Audience", "Framework step-by-step untuk riset dan build audience yang tepat: lookalike, interest stacking, custom audience, dan retargeting."),
            ("🖼️", "Creative Brief Template", "Template brief untuk briefing tim desainer atau AI image generator agar visual iklan selaras dengan copy dan target audience."),
            ("📊", "Ad Performance Analyzer Prompt", "Prompt AI untuk menganalisis iklan yang tidak perform dan menemukan masalah utamanya dengan cepat."),
            ("🔄", "Studi Kasus Winning Ads", "Breakdown 50+ contoh iklan dengan ROAS tinggi: kenapa berhasil, elemen mana yang paling berpengaruh, cara replikasi."),
        ],
        "benefits": [
            ("💰", "Hemat Budget Iklan", "Creative yang kuat dari awal = tidak perlu buang budget untuk testing berlebihan."),
            ("⚡", "Produksi Creative 10× Lebih Cepat", "Dari ide ke ad copy siap tayang dalam hitungan menit, bukan jam."),
            ("📈", "ROAS Lebih Tinggi", "Framework berbasis data dari winning ads yang sudah terbukti menghasilkan return yang konsisten."),
            ("🧪", "Sistem A/B Testing", "Template dan panduan untuk running A/B test yang efektif dan mengambil keputusan berbasis data."),
        ],
        "targets": ["Pemilik bisnis yang mengelola iklan sendiri", "Digital marketer dan media buyer", "Agensi iklan yang ingin meningkatkan efisiensi", "Brand manager yang sering briefing creative team"],
        "how": [
            ("1", "Identifikasi Produk & Audience", "Gunakan worksheet di dalam paket untuk menentukan USP produk dan profil audience yang paling potential."),
            ("2", "Pilih Template & Generate Copy", "Pilih template sesuai tujuan iklan (awareness, traffic, conversion). Masukkan informasi produk ke dalam prompt AI untuk generate variasi copy."),
            ("3", "Test & Optimize", "Jalankan 2-3 variasi creative, pantau ROAS, gunakan framework analisis di dalam paket untuk optimasi berkelanjutan."),
        ],
        "faqs": [
            ("Bisa dipakai untuk Google Ads juga?", "Sebagian besar framework dan copy template bisa diadaptasi untuk Google Ads, YouTube Ads, dan TikTok Ads."),
            ("Perlu pengalaman iklan sebelumnya?", "Ada panduan untuk pemula di bagian pertama, tapi optimal jika sudah pernah running iklan minimal 1 kali."),
            ("Update konten ikut tren?", "Ya, kami update template secara berkala mengikuti perubahan algoritma Meta dan tren creative terbaru."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli AI Creative & Performance Ad Engine (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/ai-ad-engine",
    },
    {
        "file": "dp-food-menu.html",
        "name": "Food Menu AI Studio",
        "short": "Food Menu AI Studio",
        "cat": "Bisnis",
        "cat_emoji": "🍽️",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "📸",
        "desc_short": "Foto menu bintang 5 bermodal kamera HP. Dapatkan preset plating, latar belakang profesional, dan panduan pembuatan.",
        "tagline": "Foto makananmu seperti bintang 5 — cukup dengan HP dan panduan yang tepat.",
        "about": "Foto menu yang buruk membunuh nafsu makan pelanggan bahkan sebelum mereka mencicipi makanannya. Food Menu AI Studio hadir untuk mengubah foto HP biasa menjadi visual menu yang menggugah selera — tanpa kamera mahal, tanpa fotografer profesional, tanpa studio sewa jutaan rupiah.",
        "gets": [
            ("🎨", "50+ Preset Plating & Styling", "Panduan plating untuk berbagai jenis makanan: nasi, mie, kopi, kue, street food, dan fine dining — lengkap dengan foto referensi."),
            ("🖼️", "Template Background Digital", "100+ background digital berkualitas tinggi yang bisa digunakan sebagai latar foto menu — dari kayu rustic sampai marble elegan."),
            ("✏️", "Prompt AI Image Enhancement", "Prompt untuk tools AI (Canva AI, Adobe Firefly, Midjourney) untuk enhance foto makanan: perbaiki pencahayaan, hapus background, tambahkan efek steam."),
            ("💡", "Panduan Lighting HP", "Teknik pencahayaan natural dan artifisial menggunakan ring light murah atau cahaya matahari — untuk foto konsisten setiap saat."),
            ("📐", "Komposisi & Angle Guide", "Panduan komposisi foto untuk setiap jenis makanan: sudut terbaik, rule of thirds, dan cara membuat makanan terlihat lebih besar dan menggiurkan."),
            ("📱", "Template Menu Digital", "15+ template desain menu digital (Canva-editable) untuk WhatsApp Business, Instagram, dan GoFood/GrabFood."),
        ],
        "benefits": [
            ("💸", "Hemat Biaya Fotografer", "Foto menu profesional bisa menelan jutaan per sesi. Dengan panduan ini, kamu bisa foto sendiri kapanpun."),
            ("📈", "Tingkatkan Pesanan", "Visual makanan yang menarik terbukti meningkatkan konversi di platform delivery dan media sosial."),
            ("⚡", "Cepat & Praktis", "Setup foto bisa dilakukan dalam 10 menit, tidak perlu peralatan khusus selain HP dan ring light sederhana."),
            ("🔄", "Konsistensi Brand", "Panduan yang terstruktur memastikan foto menu kamu punya gaya visual yang konsisten dan profesional."),
        ],
        "targets": ["Pemilik restoran, warung, atau kafe", "Pelaku usaha kuliner di platform delivery (GoFood, GrabFood, ShopeeFood)", "UMKM makanan yang berjualan via Instagram atau WhatsApp", "Catering dan bisnis kue rumahan"],
        "how": [
            ("1", "Setup Area Foto", "Ikuti panduan lighting dan pilih background digital yang sesuai dengan konsep restoran kamu."),
            ("2", "Plate & Foto", "Gunakan panduan plating untuk menata makanan. Ambil foto dengan HP menggunakan komposisi dan angle yang disarankan."),
            ("3", "Enhance dengan AI", "Masukkan foto ke Canva AI atau tools yang disarankan menggunakan prompt yang sudah disediakan untuk hasil foto level profesional."),
        ],
        "faqs": [
            ("HP merek apa yang direkomendasikan?", "Panduan ini bekerja untuk HP apapun dengan kamera minimal 12MP. Tips khusus tersedia untuk iPhone dan Android flagship."),
            ("Perlu beli background fisik?", "Tidak wajib. Panduan menyediakan 2 metode: background digital (layar laptop/print) dan background fisik sederhana dari bahan murah."),
            ("Apakah termasuk editing tutorial?", "Ya, ada panduan editing menggunakan Lightroom Mobile (gratis), Snapseed, dan Canva untuk touch-up akhir."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli Food Menu AI Studio (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/food-menu-ai-studio",
    },
    {
        "file": "dp-studio-pro.html",
        "name": "Studio Marketplace Pro (SellPix AI)",
        "short": "SellPix AI",
        "cat": "Bisnis",
        "cat_emoji": "🏪",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "🛍️",
        "desc_short": "Bikin foto produk setara studio dalam hitungan detik. Preset scene, filter AI, dan template listing yang siap pakai.",
        "tagline": "Foto produk setara studio profesional — dari HP kamu, dalam hitungan detik.",
        "about": "Di marketplace yang kompetitif, foto produk adalah senjata utama. SellPix AI hadir untuk memberikan penjual online keunggulan visual yang selama ini hanya dimiliki brand besar dengan budget fotografi besar. Dengan panduan, preset, dan prompt AI ini, foto produk kamu akan bersaing — bahkan mengalahkan — kompetitor.",
        "gets": [
            ("🎬", "100+ Scene Preset", "Template scene siap pakai untuk berbagai kategori produk: fashion, elektronik, kecantikan, makanan, dekorasi rumah, dan aksesori."),
            ("✂️", "Background Removal Guide", "Panduan langkah demi langkah menghapus background foto produk menggunakan tools gratis (Remove.bg, Canva, Adobe Express)."),
            ("🤖", "AI Enhancement Prompts", "Prompt untuk Midjourney, Adobe Firefly, dan Canva AI untuk generate background premium dan lifestyle shots yang realistis."),
            ("📝", "Template Deskripsi Produk", "50+ template deskripsi produk yang SEO-friendly untuk Tokopedia, Shopee, Lazada — meningkatkan visibility dan conversion."),
            ("🖼️", "Template Thumbnail Listing", "Desain thumbnail listing yang proven CTR tinggi, tersedia dalam format Canva yang mudah diedit."),
            ("📊", "Panduan A/B Test Foto", "Framework untuk testing 2+ variasi foto produk dan menentukan mana yang menghasilkan lebih banyak klik dan pembelian."),
        ],
        "benefits": [
            ("💰", "Hemat Budget Foto Studio", "Jasa foto produk studio bisa Rp 50-200 ribu per gambar. SellPix AI memungkinkan foto unlimited dengan kualitas serupa."),
            ("🚀", "Upload Lebih Cepat", "Dari produk baru ke listing live dalam waktu yang jauh lebih singkat — tanpa antri di fotografer."),
            ("📈", "Tingkatkan CTR & Konversi", "Foto produk yang profesional adalah faktor #1 yang mempengaruhi keputusan beli di marketplace."),
            ("🏆", "Kompetitif di Marketplace", "Tampil seprofesional brand besar tanpa perlu budget besar — keunggulan nyata di pasar yang kompetitif."),
        ],
        "targets": ["Seller Tokopedia, Shopee, Lazada, dan TikTok Shop", "Dropshipper yang ingin membedakan listing dari kompetitor", "Brand lokal yang ingin tampil profesional", "Reseller yang mengelola banyak SKU produk"],
        "how": [
            ("1", "Foto Produk Dasar", "Ambil foto produk dengan background putih atau polos menggunakan HP. Tidak perlu sempurna — AI yang akan menyelesaikan sisanya."),
            ("2", "Remove Background & Enhance", "Gunakan tools dan prompt yang disediakan untuk hapus background dan enhance kualitas foto."),
            ("3", "Pilih Scene & Finalisasi", "Pilih scene preset yang sesuai, terapkan ke foto, dan export dalam resolusi optimal untuk setiap marketplace."),
        ],
        "faqs": [
            ("Bisa dipakai untuk TikTok Shop?", "Ya, ada panduan dan template khusus TikTok Shop termasuk format video pendek untuk showcase produk."),
            ("Perlu berlangganan tools berbayar?", "Tidak wajib. Sebagian besar workflow menggunakan tools gratis. Ada juga panduan untuk yang ingin upgrade ke tools premium."),
            ("Berapa produk yang bisa diproses?", "Tidak ada batasan — toolkit ini bisa dipakai untuk ratusan SKU produk."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli Studio Marketplace Pro SellPix AI (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/sellpix-ai",
    },
    {
        "file": "dp-ai-creative-tools.html",
        "name": "AI Creative Tools — Bikin Konten Viral 5 Menit",
        "short": "AI Creative Tools",
        "cat": "Bisnis",
        "cat_emoji": "✨",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "⚡",
        "desc_short": "Toolkit AI serba guna untuk membuat copywriting, caption, skrip, dan ide konten viral hanya dalam beberapa menit.",
        "tagline": "Dari blank page ke konten viral dalam 5 menit — dengan AI sebagai co-creator kamu.",
        "about": "Content creator dan marketer tahu rasa sakitnya: duduk di depan layar kosong, deadline mendekat, tidak ada ide. AI Creative Tools hadir untuk mengakhiri penderitaan itu. Toolkit ini berisi sistem prompt dan framework yang memungkinkan siapapun membuat konten berkualitas tinggi dalam hitungan menit — bukan jam.",
        "gets": [
            ("📝", "500+ Content Prompt Library", "Prompt terorganisir per jenis konten: caption IG, thread Twitter/X, skrip TikTok, artikel blog, email newsletter, dan lebih banyak lagi."),
            ("🎣", "Framework Hook Viral", "50+ formula hook pembuka yang terbukti menghentikan scroll dan mendorong engagement — dengan contoh implementasi untuk setiap niche."),
            ("🗓️", "Content Calendar Generator", "Sistem prompt untuk generate content plan 30 hari berdasarkan industri, audience, dan tujuan marketing kamu."),
            ("✍️", "Copywriting Swipe File", "Koleksi copy terbaik dari brand Indonesia dan global yang sudah terbukti convert — untuk referensi dan inspirasi."),
            ("🎬", "Skrip Video Template", "Template skrip untuk berbagai format: tutorial, review, storytelling, problem-solution, dan before-after."),
            ("🔄", "Repurposing Framework", "Cara mengubah 1 konten panjang menjadi 10+ konten di berbagai platform — maksimalkan setiap piece of content."),
        ],
        "benefits": [
            ("⏰", "Hemat Waktu 80%", "Yang biasanya butuh 2 jam sekarang selesai dalam 15 menit. Buat lebih banyak konten, konsisten setiap hari."),
            ("📈", "Engagement Lebih Tinggi", "Konten yang dibuat dengan framework yang tepat secara konsisten mendapat engagement lebih baik."),
            ("🎨", "Tidak Perlu Jadi Copywriter", "Framework yang terstruktur memandu proses kreatif sehingga siapapun bisa menghasilkan copy yang menarik."),
            ("♾️", "Ide Tidak Pernah Habis", "Dengan sistem prompt yang terus bisa dikombinasikan, ide konten praktis tidak ada batasnya."),
        ],
        "targets": ["Content creator dan influencer di semua niche", "Social media manager dan digital marketer", "Pemilik bisnis yang mengelola konten sendiri", "Copywriter yang ingin meningkatkan produktivitas"],
        "how": [
            ("1", "Tentukan Tujuan Konten", "Pilih kategori konten yang dibutuhkan (awareness, engagement, conversion) dan buka bagian prompt yang relevan."),
            ("2", "Copy & Customize Prompt", "Copy prompt ke ChatGPT/Claude, isi bagian yang dikustomisasi (nama brand, produk, audience), dan generate."),
            ("3", "Edit & Publish", "Review output AI, tambahkan sentuhan personal, dan publish. Biasanya hanya butuh editing ringan 1-2 menit."),
        ],
        "faqs": [
            ("AI mana yang direkomendasikan?", "Prompt dioptimasi untuk ChatGPT (3.5 dan 4.0) dan Claude. Bisa juga dipakai di Gemini dengan sedikit penyesuaian."),
            ("Apa konten yang bisa dibuat?", "Caption IG/Facebook, thread, skrip TikTok/Reels, artikel blog, email, iklan, headline, tagline, dan banyak lagi."),
            ("Perlu berlangganan ChatGPT Plus?", "Tidak wajib. ChatGPT versi gratis sudah cukup untuk sebagian besar prompt. Tips menggunakan versi gratis juga disertakan."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli AI Creative Tools (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/ai-creative-tools",
    },
    {
        "file": "dp-guru-ai.html",
        "name": "Guru Pintar AI — RPP & Modul Ajar 1 Semester",
        "short": "Guru Pintar AI",
        "cat": "Edukasi",
        "cat_emoji": "🎓",
        "price": "Rp 75.000",
        "price_raw": "75.000",
        "emoji": "📚",
        "desc_short": "AI khusus guru untuk menghasilkan RPP, modul ajar, bahan evaluasi, dan aktivitas kreatif dalam satu sore.",
        "tagline": "RPP 1 semester selesai dalam satu sore — guru bisa fokus ke hal yang lebih penting: mengajar.",
        "about": "Guru Indonesia menghabiskan rata-rata 40% waktunya untuk administrasi: RPP, modul ajar, soal evaluasi, laporan. Waktu yang seharusnya bisa digunakan untuk siswa dan pengembangan diri. Guru Pintar AI hadir untuk mengubah itu — membantu guru menyelesaikan seluruh administrasi mengajar dalam waktu yang jauh lebih singkat menggunakan kekuatan AI.",
        "gets": [
            ("📋", "Template RPP Lengkap", "Template RPP yang sesuai format Kurikulum Merdeka dan Kurikulum 2013 — untuk semua mata pelajaran dan jenjang SD/SMP/SMA."),
            ("📖", "Modul Ajar Generator", "Sistem prompt untuk generate modul ajar lengkap: tujuan pembelajaran, materi, kegiatan, dan asesmen dalam satu paket."),
            ("📝", "Bank Soal Evaluasi", "Panduan dan prompt untuk membuat soal pilihan ganda, essay, dan proyek berbasis HOTS (Higher Order Thinking Skills)."),
            ("🎨", "Aktivitas Kreatif & Ice Breaker", "100+ ide aktivitas belajar yang menyenangkan dan interaktif untuk berbagai materi pelajaran dan usia siswa."),
            ("📊", "Template Laporan & Penilaian", "Template rapor narasi, catatan perkembangan siswa, dan rubrik penilaian yang bisa langsung diisi dan dicetak."),
            ("🔄", "Prompt Diferensiasi Pembelajaran", "Panduan membuat variasi kegiatan untuk siswa dengan kebutuhan belajar berbeda (diferensiasi konten, proses, produk)."),
        ],
        "benefits": [
            ("⏰", "Hemat Waktu 70%", "RPP yang biasanya makan 3-4 jam bisa diselesaikan dalam 30-45 menit dengan bantuan AI."),
            ("✅", "Sesuai Standar Kurikulum", "Template dan panduan disesuaikan dengan standar Kemdikbud terbaru untuk Kurikulum Merdeka."),
            ("🎯", "Kualitas Lebih Konsisten", "Framework yang terstruktur memastikan RPP dan modul selalu lengkap dan tidak ada yang terlewat."),
            ("😌", "Kurangi Burnout Guru", "Beban administrasi yang berkurang = lebih banyak energi untuk mengajar dengan passion."),
        ],
        "targets": ["Guru SD, SMP, dan SMA semua mata pelajaran", "Kepala sekolah dan pengawas yang ingin standarisasi dokumen", "Guru honorer yang mengelola banyak kelas sekaligus", "Mahasiswa calon guru yang belajar membuat perangkat ajar"],
        "how": [
            ("1", "Tentukan Mata Pelajaran & Kelas", "Pilih template yang sesuai dengan mata pelajaran, kelas, dan kurikulum yang digunakan di sekolah kamu."),
            ("2", "Input Kompetensi Dasar", "Masukkan KD atau CP (Capaian Pembelajaran) ke dalam prompt AI untuk generate RPP lengkap secara otomatis."),
            ("3", "Review & Personalisasi", "Review output AI, tambahkan konteks lokal dan karakter kelas kamu, lalu simpan dalam format yang dibutuhkan (PDF/Word)."),
        ],
        "faqs": [
            ("Bisa untuk Kurikulum Merdeka?", "Ya, template utama sudah disesuaikan untuk Kurikulum Merdeka termasuk format Modul Ajar dan ATP (Alur Tujuan Pembelajaran)."),
            ("Semua mata pelajaran tersedia?", "Ada panduan umum yang bisa diterapkan ke semua mata pelajaran, plus template spesifik untuk Matematika, Bahasa Indonesia, IPA, IPS, dan Bahasa Inggris."),
            ("Apakah RPP-nya bisa langsung dicetak?", "Ya, output bisa langsung di-copy ke Word, diformat, dan dicetak. Template Word juga tersedia di dalam paket."),
        ],
        "wa_greeting": "Halo Berkah Karya, saya tertarik membeli Guru Pintar AI RPP & Modul Ajar (Rp 75.000). Bagaimana cara pembeliannya?",
        "lynk": "https://lynk.id/berkahkarya/guru-pintar-ai",
    },
]


# ─── HTML Templates ────────────────────────────────────────────────────────────

BK_NAV = """<nav class="bk-nav">
  <div class="bk-nav-inner">
    <a href="index.html" class="bk-logo">Berkah<span>Karya</span></a>
    <ul class="bk-nav-links">
      <li><a href="services.html">Layanan</a></li>
      <li><a href="digital-product.html">Produk Digital</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <a href="https://wa.me/{wa}?text=Halo%20Berkah%20Karya%2C%20saya%20ingin%20konsultasi%20layanan" class="bk-nav-cta" target="_blank" rel="noopener">Konsultasi →</a>
    <button class="bk-nav-mobile" aria-label="Menu">☰</button>
  </div>
</nav>""".format(wa=WA)

BK_FOOTER = """<footer class="bk-footer">
  <div class="bk-footer-inner">
    <div class="bk-footer-brand">
      <div class="bk-logo">Berkah<span>Karya</span></div>
      <p>AI Ecosystem untuk bisnis Indonesia — agency kreatif, AI tools, dan produk digital siap pakai.</p>
    </div>
    <div class="bk-footer-col">
      <h5>Produk Digital</h5>
      <ul>
        <li><a href="dp-parenting.html">Panduan Parenting</a></li>
        <li><a href="dp-job-magnet.html">JobMagnet AI</a></li>
        <li><a href="dp-ai-ad-engine.html">AI Ad Engine</a></li>
        <li><a href="dp-food-menu.html">Food Menu AI</a></li>
        <li><a href="dp-ai-creative-tools.html">AI Creative Tools</a></li>
        <li><a href="dp-guru-ai.html">Guru Pintar AI</a></li>
      </ul>
    </div>
    <div class="bk-footer-col">
      <h5>Layanan</h5>
      <ul>
        <li><a href="jasa-sosmed.html">Kelola Sosmed</a></li>
        <li><a href="jasa-video-ai.html">Jasa Video AI</a></li>
        <li><a href="jasa-website.html">Jasa Website</a></li>
        <li><a href="ai-agent-pro.html">AI Agent Pro</a></li>
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

NAV_SCRIPT = """<script>
  const _btn = document.querySelector('.bk-nav-mobile');
  const _nav = document.querySelector('.bk-nav');
  if (_btn && _nav) _btn.addEventListener('click', () => _nav.classList.toggle('open'));
</script>"""


# ─── LP template ──────────────────────────────────────────────────────────────

def make_lp(p):
    gets_html = "\n".join([
        f"""      <div class="dp-get-card">
        <span class="dp-get-icon">{icon}</span>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>""" for icon, title, desc in p["gets"]
    ])

    benefits_html = "\n".join([
        f"""      <div class="dp-benefit">
        <span class="dp-benefit-icon">{icon}</span>
        <div>
          <strong>{title}</strong>
          <p>{desc}</p>
        </div>
      </div>""" for icon, title, desc in p["benefits"]
    ])

    targets_html = "\n".join([f"      <li>✓ {t}</li>" for t in p["targets"]])

    how_html = "\n".join([
        f"""      <div class="dp-step">
        <div class="dp-step-num">{num}</div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>""" for num, title, desc in p["how"]
    ])

    faqs_html = "\n".join([
        f"""      <div class="dp-faq-item">
        <h4>{q}</h4>
        <p>{a}</p>
      </div>""" for q, a in p["faqs"]
    ])

    wa_encoded = p["wa_greeting"].replace(" ", "%20").replace(",", "%2C").replace("?", "%3F").replace("–", "-")

    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{p["name"]} — BerkahKarya</title>
  <meta name="description" content="{p["desc_short"]}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
    /* ── DP Landing Page styles ─── */
    .dp-hero {{
      background: var(--bg-white); border-bottom: 1px solid var(--border);
      padding: calc(64px + 5rem) 1.5rem 5rem; text-align: center;
    }}
    .dp-hero-inner {{ max-width: 760px; margin: 0 auto; }}
    .dp-cat-tag {{
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--bg-muted); border: 1px solid var(--border);
      border-radius: 999px; padding: 6px 14px; margin-bottom: 1.5rem;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; color: var(--mustard);
    }}
    .dp-hero h1 {{
      font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900;
      letter-spacing: -0.04em; line-height: 1.1; margin: 0 0 1.25rem;
    }}
    .dp-hero-tagline {{
      font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;
      margin: 0 auto 2rem; max-width: 580px;
    }}
    .dp-hero-price {{
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 2.2rem; font-weight: 900; color: var(--mustard);
      letter-spacing: -0.03em; margin-bottom: 2rem;
    }}
    .dp-hero-price small {{ font-size: 0.9rem; font-weight: 500; color: var(--text-muted); }}
    .dp-hero-btns {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }}
    .dp-guarantee-note {{ margin-top: 1rem; font-size: 0.8rem; color: var(--text-light); }}
    .dp-guarantee-note strong {{ color: var(--text-muted); }}

    /* Sections */
    .dp-section {{ padding: 5rem 1.5rem; }}
    .dp-section.alt {{ background: var(--bg-muted); }}
    .dp-section-inner {{ max-width: var(--max-width); margin: 0 auto; }}
    .dp-section-head {{ text-align: center; margin-bottom: 3rem; }}
    .dp-section-head h2 {{
      font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 900;
      letter-spacing: -0.03em; margin: 0 0 0.75rem;
    }}
    .dp-section-head h2 em {{ font-style: normal; color: var(--mustard); }}
    .dp-section-head p {{ color: var(--text-muted); line-height: 1.65; max-width: 540px; margin: 0 auto; }}
    .sec-label {{ display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mustard); margin-bottom: 0.75rem; }}

    /* About */
    .dp-about-text {{
      max-width: 700px; margin: 0 auto; font-size: 1.05rem;
      line-height: 1.75; color: var(--text-muted); text-align: center;
    }}
    .dp-about-text strong {{ color: var(--text); }}

    /* What you get */
    .dp-gets-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }}
    .dp-get-card {{
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.75rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }}
    .dp-get-card:hover {{ border-color: var(--mustard); box-shadow: 0 4px 20px rgba(200,146,10,0.08); }}
    .dp-get-icon {{ font-size: 1.8rem; display: block; margin-bottom: 0.75rem; }}
    .dp-get-card h4 {{ font-size: 0.95rem; font-weight: 800; color: var(--text); margin: 0 0 0.5rem; }}
    .dp-get-card p {{ font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; margin: 0; }}

    /* Benefits */
    .dp-benefits-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }}
    .dp-benefit {{
      display: flex; gap: 1rem; align-items: flex-start;
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.5rem;
    }}
    .dp-benefit-icon {{ font-size: 1.8rem; flex-shrink: 0; }}
    .dp-benefit strong {{ display: block; font-size: 0.95rem; font-weight: 800; color: var(--text); margin-bottom: 0.3rem; }}
    .dp-benefit p {{ font-size: 0.83rem; color: var(--text-muted); line-height: 1.55; margin: 0; }}

    /* Target */
    .dp-targets {{ max-width: 600px; margin: 0 auto; }}
    .dp-targets ul {{ list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }}
    .dp-targets li {{
      display: flex; align-items: flex-start; gap: 10px;
      padding: 1rem 1.25rem; background: var(--bg-white);
      border: 1px solid var(--border); border-radius: var(--radius-sm);
      font-size: 0.9rem; font-weight: 500; color: var(--text);
    }}

    /* How to use */
    .dp-steps {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }}
    .dp-step {{
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 2rem; text-align: center;
    }}
    .dp-step-num {{
      font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em;
      color: rgba(200,146,10,0.15); line-height: 1; margin-bottom: 0.5rem;
    }}
    .dp-step h4 {{ font-size: 0.95rem; font-weight: 800; color: var(--text); margin: 0 0 0.5rem; }}
    .dp-step p {{ font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; margin: 0; }}

    /* FAQ */
    .dp-faqs {{ display: flex; flex-direction: column; gap: 1px; max-width: 700px; margin: 0 auto; overflow: hidden; border-radius: var(--radius); border: 1px solid var(--border); }}
    .dp-faq-item {{ background: var(--bg-white); padding: 1.5rem; border-bottom: 1px solid var(--border); }}
    .dp-faq-item:last-child {{ border-bottom: none; }}
    .dp-faq-item h4 {{ font-size: 0.95rem; font-weight: 800; color: var(--text); margin: 0 0 0.5rem; }}
    .dp-faq-item p {{ font-size: 0.87rem; color: var(--text-muted); line-height: 1.6; margin: 0; }}

    /* CTA Final */
    .dp-cta-final {{
      background: var(--bg-muted); border-top: 1px solid var(--border);
      padding: 5rem 1.5rem; text-align: center;
    }}
    .dp-cta-inner {{ max-width: 640px; margin: 0 auto; }}
    .dp-cta-inner h2 {{
      font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 900;
      letter-spacing: -0.03em; margin: 0 0 1rem;
    }}
    .dp-cta-inner h2 em {{ font-style: normal; color: var(--mustard); }}
    .dp-cta-inner p {{ color: var(--text-muted); line-height: 1.7; margin: 0 0 1.75rem; }}
    .dp-cta-price {{
      font-size: 2rem; font-weight: 900; color: var(--mustard);
      letter-spacing: -0.03em; margin-bottom: 1.5rem; display: block;
    }}
    .dp-cta-buttons {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }}
    .dp-back {{ display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem; transition: color 0.2s; }}
    .dp-back:hover {{ color: var(--mustard); }}

    /* Responsive */
    @media (max-width: 900px) {{
      .dp-gets-grid {{ grid-template-columns: repeat(2, 1fr); }}
    }}
    @media (max-width: 700px) {{
      .dp-gets-grid, .dp-benefits-grid, .dp-steps {{ grid-template-columns: 1fr; }}
      .dp-hero, .dp-section, .dp-cta-final {{ padding-left: 1.25rem; padding-right: 1.25rem; }}
      .dp-hero {{ padding-top: calc(64px + 3rem); padding-bottom: 3rem; }}
    }}
  </style>
</head>
<body>

{BK_NAV}

<section class="dp-hero">
  <div class="dp-hero-inner">
    <a href="digital-product.html" class="dp-back">← Kembali ke Katalog Produk</a>
    <div class="dp-cat-tag">{p["cat_emoji"]} {p["cat"]}</div>
    <h1>{p["emoji"]} {p["name"]}</h1>
    <p class="dp-hero-tagline">{p["tagline"]}</p>
    <div class="dp-hero-price">{p["price"]} <small>one-time</small></div>
    <div class="dp-hero-btns">
      <a href="https://wa.me/{WA}?text={wa_encoded}" class="btn-primary" target="_blank" rel="noopener">
        🛒 Dapatkan Akses Sekarang
      </a>
      <a href="#tentang" class="btn-secondary">Pelajari Dulu ↓</a>
    </div>
    <p class="dp-guarantee-note"><strong>✓ Garansi uang kembali 7 hari</strong> · Update gratis seumur hidup · Akses langsung setelah pembayaran</p>
  </div>
</section>

<!-- Tentang Produk -->
<section class="dp-section alt" id="tentang">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">Tentang Produk</span>
      <h2>Kenapa Kamu <em>Butuh Ini?</em></h2>
    </div>
    <p class="dp-about-text">{p["about"]}</p>
  </div>
</section>

<!-- Apa yang Kamu Dapatkan -->
<section class="dp-section" id="dapatkan">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">Yang Kamu Dapatkan</span>
      <h2>Isi <em>Lengkap</em> Produk</h2>
    </div>
    <div class="dp-gets-grid">
{gets_html}
    </div>
  </div>
</section>

<!-- Manfaat -->
<section class="dp-section alt" id="manfaat">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">Manfaat</span>
      <h2>Hasil <em>Nyata</em> yang Kamu Dapat</h2>
    </div>
    <div class="dp-benefits-grid">
{benefits_html}
    </div>
  </div>
</section>

<!-- Target Pengguna -->
<section class="dp-section" id="target">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">Siapa yang Cocok</span>
      <h2>Produk Ini <em>Untuk Kamu</em> Jika...</h2>
    </div>
    <div class="dp-targets">
      <ul>
{targets_html}
      </ul>
    </div>
  </div>
</section>

<!-- Cara Pakai -->
<section class="dp-section alt" id="cara-pakai">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">Cara Pakai</span>
      <h2>Mulai dalam <em>3 Langkah</em></h2>
    </div>
    <div class="dp-steps">
{how_html}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="dp-section" id="faq">
  <div class="dp-section-inner">
    <div class="dp-section-head">
      <span class="sec-label">FAQ</span>
      <h2>Pertanyaan yang <em>Sering Ditanya</em></h2>
    </div>
    <div class="dp-faqs">
{faqs_html}
    </div>
  </div>
</section>

<!-- CTA Final -->
<section class="dp-cta-final">
  <div class="dp-cta-inner">
    <span class="sec-label" style="text-align:center;">Dapatkan Sekarang</span>
    <h2>Siap? Mulai<br><em>Hari Ini</em></h2>
    <p>One-time payment. Akses selamanya. Update gratis. Garansi 7 hari uang kembali.</p>
    <span class="dp-cta-price">{p["price"]}</span>
    <div class="dp-cta-buttons">
      <a href="https://wa.me/{WA}?text={wa_encoded}" class="btn-primary" target="_blank" rel="noopener">
        🛒 Dapatkan Akses Sekarang
      </a>
      <a href="digital-product.html" class="btn-secondary">Lihat Produk Lain</a>
    </div>
  </div>
</section>

{BK_FOOTER}
{NAV_SCRIPT}
</body>
</html>"""


# ─── Catalog ──────────────────────────────────────────────────────────────────

def make_catalog():
    cards = ""
    for p in PRODUCTS:
        cards += f"""
      <div class="dp-card" data-category="{p['cat'].lower()}">
        <div class="dp-card-emoji">{p['emoji']}</div>
        <div class="dp-card-cat">{p['cat_emoji']} {p['cat']}</div>
        <h3>{p['short']}</h3>
        <p>{p['desc_short']}</p>
        <div class="dp-card-footer">
          <div class="dp-card-price">{p['price']}</div>
          <a href="{p['file']}" class="dp-card-btn">Pelajari Selengkapnya →</a>
        </div>
      </div>"""

    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Produk Digital — BerkahKarya</title>
  <meta name="description" content="Template, panduan, dan alat berbasis AI untuk membantu karirmu dan bisnismu tumbuh lebih cepat. Produk digital BerkahKarya." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
    /* ── Catalog styles ─── */
    .cat-hero {{
      background: var(--bg-white); border-bottom: 1px solid var(--border);
      padding: calc(64px + 5rem) 1.5rem 5rem; text-align: center;
    }}
    .cat-hero-inner {{ max-width: 700px; margin: 0 auto; }}
    .cat-tag {{
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--bg-muted); border: 1px solid var(--border);
      border-radius: 999px; padding: 6px 14px; margin-bottom: 1.5rem;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; color: var(--mustard);
    }}
    .cat-hero h1 {{
      font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900;
      letter-spacing: -0.04em; line-height: 1.1; margin: 0 0 1.25rem;
    }}
    .cat-hero h1 em {{ font-style: normal; color: var(--mustard); }}
    .cat-hero p {{ font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; margin: 0; }}

    /* Filter */
    .cat-filter-wrap {{ padding: 2rem 1.5rem 0; }}
    .cat-filter {{ max-width: var(--max-width); margin: 0 auto; display: flex; flex-wrap: wrap; gap: 0.75rem; }}
    .cat-filter-btn {{
      padding: 8px 18px; border-radius: 999px; font-size: 0.85rem;
      font-weight: 700; cursor: pointer; border: 1.5px solid var(--border);
      background: var(--bg-white); color: var(--text-muted);
      transition: all 0.2s; font-family: var(--font);
    }}
    .cat-filter-btn.active, .cat-filter-btn:hover {{
      background: var(--mustard); color: #fff; border-color: var(--mustard);
    }}

    /* Grid */
    .cat-grid-wrap {{ padding: 3rem 1.5rem 5rem; }}
    .cat-grid {{ max-width: var(--max-width); margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }}
    .dp-card {{
      background: var(--bg-white); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 2rem;
      display: flex; flex-direction: column;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    }}
    .dp-card:hover {{ border-color: var(--mustard); box-shadow: 0 6px 30px rgba(200,146,10,0.10); transform: translateY(-2px); }}
    .dp-card.hidden {{ display: none; }}
    .dp-card-emoji {{ font-size: 2.5rem; margin-bottom: 0.75rem; display: block; }}
    .dp-card-cat {{
      display: inline-flex; align-items: center; gap: 5px;
      background: var(--bg-muted); border-radius: 999px;
      padding: 3px 10px; font-size: 0.72rem; font-weight: 700;
      color: var(--text-muted); margin-bottom: 0.75rem; align-self: flex-start;
    }}
    .dp-card h3 {{ font-size: 1rem; font-weight: 900; color: var(--text); margin: 0 0 0.6rem; line-height: 1.3; }}
    .dp-card p {{ font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; margin: 0; flex: 1; }}
    .dp-card-footer {{ display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; gap: 0.75rem; flex-wrap: wrap; }}
    .dp-card-price {{ font-size: 1.1rem; font-weight: 900; color: var(--mustard); letter-spacing: -0.02em; }}
    .dp-card-btn {{
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.8rem; font-weight: 700; color: var(--mustard);
      border: 1.5px solid var(--mustard); border-radius: var(--radius-sm);
      padding: 7px 14px; transition: all 0.2s; white-space: nowrap;
    }}
    .dp-card-btn:hover {{ background: var(--mustard); color: #fff; }}

    /* CTA block */
    .cat-cta-wrap {{ background: var(--bg-muted); border-top: 1px solid var(--border); padding: 5rem 1.5rem; text-align: center; }}
    .cat-cta-inner {{ max-width: 600px; margin: 0 auto; }}
    .cat-cta-inner h2 {{ font-size: 2rem; font-weight: 900; letter-spacing: -0.03em; margin: 0 0 0.75rem; }}
    .cat-cta-inner h2 em {{ font-style: normal; color: var(--mustard); }}
    .cat-cta-inner p {{ color: var(--text-muted); margin: 0 0 2rem; line-height: 1.7; }}

    @media (max-width: 900px) {{ .cat-grid {{ grid-template-columns: repeat(2, 1fr); }} }}
    @media (max-width: 640px) {{
      .cat-grid {{ grid-template-columns: 1fr; }}
      .cat-hero {{ padding: calc(64px + 3rem) 1.25rem 3rem; }}
    }}
  </style>
</head>
<body>

{BK_NAV}

<section class="cat-hero">
  <div class="cat-hero-inner">
    <div class="cat-tag">✨ Produk Digital</div>
    <h1>Produk Digital<br><em>Berkah Karya</em></h1>
    <p>Template, panduan, dan alat berbasis AI untuk membantu karirmu dan bisnismu tumbuh lebih cepat — tanpa perlu keahlian teknis.</p>
  </div>
</section>

<div class="cat-filter-wrap">
  <div class="cat-filter">
    <button class="cat-filter-btn active" data-filter="all">Semua Produk</button>
    <button class="cat-filter-btn" data-filter="bisnis">Bisnis</button>
    <button class="cat-filter-btn" data-filter="karir">Karir</button>
    <button class="cat-filter-btn" data-filter="personal">Personal</button>
    <button class="cat-filter-btn" data-filter="edukasi">Edukasi</button>
  </div>
</div>

<div class="cat-grid-wrap">
  <div class="cat-grid" id="dpGrid">
{cards}
  </div>
</div>

<div class="cat-cta-wrap">
  <div class="cat-cta-inner">
    <span style="display:block;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--mustard);margin-bottom:0.75rem;">Custom Order</span>
    <h2>Butuh Produk <em>Custom?</em></h2>
    <p>Kami bisa buatkan template, panduan, atau tools digital yang disesuaikan spesifik untuk kebutuhan bisnis kamu.</p>
    <a href="https://wa.me/{WA}?text=Halo%20Berkah%20Karya%2C%20saya%20ingin%20konsultasi%20produk%20digital%20custom." class="btn-primary" target="_blank" rel="noopener">
      💬 Chat WhatsApp
    </a>
  </div>
</div>

{BK_FOOTER}

<script>
  // Category filter
  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  const cards = document.querySelectorAll('.dp-card');
  filterBtns.forEach(btn => {{
    btn.addEventListener('click', () => {{
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach(card => {{
        if (filter === 'all' || card.dataset.category === filter) {{
          card.classList.remove('hidden');
        }} else {{
          card.classList.add('hidden');
        }}
      }});
    }});
  }});

  // Nav mobile
  const _btn = document.querySelector('.bk-nav-mobile');
  const _nav = document.querySelector('.bk-nav');
  if (_btn && _nav) _btn.addEventListener('click', () => _nav.classList.toggle('open'));
</script>
</body>
</html>"""


# ─── Write files ──────────────────────────────────────────────────────────────

os.chdir(DIR)

# Catalog
with open("digital-product.html", "w", encoding="utf-8") as f:
    f.write(make_catalog())
print("✅ digital-product.html")

# LPs
for p in PRODUCTS:
    with open(p["file"], "w", encoding="utf-8") as f:
        f.write(make_lp(p))
    print(f"✅ {p['file']}")

print(f"\n✅ Done — 1 catalog + {len(PRODUCTS)} LP pages generated.")
