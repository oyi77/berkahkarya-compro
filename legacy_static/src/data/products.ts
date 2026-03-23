import type { Locale } from "./navigation";

export interface Problem {
  icon: string;
  title: string;
  desc: string;
}

export interface Step {
  num: number;
  title: string;
  desc: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface Product {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  problems: Problem[];
  steps: Step[];
  features: Feature[];
  pricing: PricingTier[];
  testimonials: Testimonial[];
}

export const products: Record<Locale, Product[]> = {
  id: [
    // ── AI Video Studio ──────────────────────────────────────────────
    {
      slug: "ai-video-studio",
      icon: "\uD83C\uDFAC",
      title: "AI Video Studio",
      tagline: "Studio video AI untuk konten viral",
      heroTitle: "Buat Video Viral Tanpa Skill Editing",
      heroSubtitle:
        "Kompetitor Anda sudah posting 10 video per hari dengan AI. Tanpa AI Video Studio, Anda akan terus kalah di algoritma dan kehilangan audiens setiap detiknya.",
      problems: [
        {
          icon: "\uD83D\uDCB8",
          title: "Biaya Produksi Mahal",
          desc: "Hiring videografer, editor, dan talent bisa menghabiskan jutaan rupiah per video. AI Video Studio memangkas biaya hingga 90%.",
        },
        {
          icon: "\u23F3",
          title: "Waktu Produksi Terlalu Lama",
          desc: "Satu video bisa memakan waktu berhari-hari. Dengan AI, selesaikan dalam hitungan menit tanpa kompromi kualitas.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "Butuh Skill Teknis Tinggi",
          desc: "Tidak semua orang menguasai software editing profesional. AI Video Studio membuat siapa pun bisa jadi kreator konten.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Upload",
          desc: "Upload gambar, teks, atau script Anda ke platform. Dukung berbagai format file.",
        },
        {
          num: 2,
          title: "AI Process",
          desc: "AI kami menganalisis konten dan membuat video secara otomatis dengan visual dan transisi terbaik.",
        },
        {
          num: 3,
          title: "Edit",
          desc: "Sesuaikan hasil video sesuai kebutuhan. Ubah teks, musik, dan elemen visual dengan mudah.",
        },
        {
          num: 4,
          title: "Publish",
          desc: "Langsung publish ke berbagai platform sosial media dalam satu klik.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCDD",
          title: "Text-to-Video",
          desc: "Ubah teks atau script menjadi video profesional lengkap dengan visual, narasi, dan musik.",
        },
        {
          icon: "\uD83D\uDDBC\uFE0F",
          title: "Image-to-Video",
          desc: "Animasikan gambar statis menjadi video dinamis dengan efek gerakan dan transisi AI.",
        },
        {
          icon: "\uD83C\uDFA4",
          title: "Voice Clone",
          desc: "Kloning suara Anda untuk narasi otomatis di setiap video. Dukung bahasa Indonesia dan Inggris.",
        },
        {
          icon: "\uD83D\uDCCB",
          title: "Auto Subtitle",
          desc: "Generate subtitle otomatis dengan akurasi tinggi dalam berbagai bahasa.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "50+ Templates",
          desc: "Pilih dari 50+ template video yang sudah dioptimasi untuk berbagai platform dan niche.",
        },
        {
          icon: "\u26A1",
          title: "Batch Render",
          desc: "Render puluhan video sekaligus. Cocok untuk produksi konten skala besar.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 199.000",
          period: "/bulan",
          features: [
            "30 video per bulan",
            "720p resolusi",
            "5 template dasar",
            "Auto subtitle",
          ],
          cta: "Mulai Starter",
        },
        {
          name: "Professional",
          price: "Rp 499.000",
          period: "/bulan",
          features: [
            "Unlimited video",
            "1080p resolusi",
            "50+ template premium",
            "Voice clone",
            "Batch render (10 video)",
            "Priority rendering",
          ],
          popular: true,
          cta: "Mulai Professional",
        },
        {
          name: "Enterprise",
          price: "Rp 999.000",
          period: "/bulan",
          features: [
            "Unlimited video",
            "4K resolusi",
            "Custom template",
            "Voice clone unlimited",
            "Batch render unlimited",
            "API access",
            "Dedicated account manager",
          ],
          cta: "Hubungi Sales",
        },
      ],
      testimonials: [
        {
          name: "Hendra Gunawan",
          role: "Content Creator, 500K+ followers",
          quote:
            "Dulu saya butuh 2 hari untuk 1 video. Sekarang dengan AI Video Studio, saya bisa buat 10 video dalam sehari. Followers naik 3x dalam 2 bulan!",
        },
        {
          name: "Lina Maharani",
          role: "Owner, Batik Nusantara Online",
          quote:
            "Biaya konten video kami turun 85% sejak pakai AI Video Studio. Kualitasnya bahkan lebih baik dari videografer freelance yang biasa kami hire.",
        },
        {
          name: "Fajar Hidayat",
          role: "Digital Marketing Manager, PT Maju Bersama",
          quote:
            "Tim kami yang hanya 3 orang sekarang bisa produksi konten video setara tim 15 orang. Game changer untuk brand kami.",
        },
      ],
    },

    // ── AdForge AI ───────────────────────────────────────────────────
    {
      slug: "adforge-ai",
      icon: "\uD83D\uDCE2",
      title: "AdForge AI",
      tagline: "Engine iklan AI untuk ROAS maksimal",
      heroTitle: "Iklan yang Menghasilkan, Bukan Menghabiskan",
      heroSubtitle:
        "80% budget iklan UMKM Indonesia terbuang sia-sia karena targeting yang salah. AdForge AI memastikan setiap rupiah bekerja untuk menghasilkan penjualan.",
      problems: [
        {
          icon: "\uD83D\uDD25",
          title: "Budget Iklan Boros",
          desc: "Jutaan rupiah habis tanpa hasil yang jelas. AI kami mengoptimasi setiap rupiah untuk konversi maksimal.",
        },
        {
          icon: "\uD83C\uDFAF",
          title: "Target Audience Salah",
          desc: "Iklan tampil ke orang yang salah berarti membuang uang. AI menemukan audience terbaik secara otomatis.",
        },
        {
          icon: "\uD83D\uDE34",
          title: "Creative Fatigue",
          desc: "Audiens bosan melihat iklan yang sama berulang kali. AI generate variasi creative tanpa batas.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Connect Ads",
          desc: "Hubungkan akun iklan Facebook, Google, TikTok, dan platform lainnya dalam hitungan menit.",
        },
        {
          num: 2,
          title: "AI Analyze",
          desc: "AI menganalisis data historis dan kompetitor untuk menemukan strategi terbaik.",
        },
        {
          num: 3,
          title: "Optimize",
          desc: "Otomatis optimasi bidding, targeting, dan creative berdasarkan performa real-time.",
        },
        {
          num: 4,
          title: "Scale",
          desc: "Scale campaign yang profitable secara otomatis tanpa mengorbankan ROAS.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCB0",
          title: "Smart Bidding",
          desc: "Algoritma bidding AI yang menyesuaikan bid secara real-time untuk mendapatkan CPA terendah.",
        },
        {
          icon: "\uD83E\uDDE0",
          title: "Audience AI",
          desc: "Temukan dan buat lookalike audience terbaik berdasarkan data konversi Anda.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "Creative Generator",
          desc: "Generate ratusan variasi ad creative dari satu brief. Teks, gambar, dan video.",
        },
        {
          icon: "\uD83D\uDD00",
          title: "A/B Auto Testing",
          desc: "Jalankan A/B test secara otomatis dan alokasikan budget ke winner secara real-time.",
        },
        {
          icon: "\uD83C\uDF10",
          title: "Multi-Platform",
          desc: "Kelola iklan di Facebook, Google, TikTok, dan Instagram dari satu dashboard.",
        },
        {
          icon: "\uD83D\uDCCA",
          title: "ROI Dashboard",
          desc: "Dashboard real-time yang menampilkan ROI, ROAS, CPA, dan metrik penting lainnya.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 299.000",
          period: "/bulan",
          features: [
            "1 ad account",
            "1 platform",
            "Smart bidding dasar",
            "Weekly report",
          ],
          cta: "Mulai Starter",
        },
        {
          name: "Professional",
          price: "Rp 699.000",
          period: "/bulan",
          features: [
            "5 ad accounts",
            "Multi-platform",
            "Smart bidding advanced",
            "Creative generator",
            "A/B auto testing",
            "Daily report",
          ],
          popular: true,
          cta: "Mulai Professional",
        },
        {
          name: "Enterprise",
          price: "Rp 1.499.000",
          period: "/bulan",
          features: [
            "Unlimited ad accounts",
            "Semua platform",
            "AI audience builder",
            "Unlimited creative generation",
            "Custom attribution model",
            "Dedicated strategist",
            "API access",
          ],
          cta: "Hubungi Sales",
        },
      ],
      testimonials: [
        {
          name: "Agus Prabowo",
          role: "Owner, Toko Elektronik Jaya",
          quote:
            "ROAS kami naik dari 2x ke 8x setelah pakai AdForge AI. Budget iklan tetap sama tapi penjualan naik 4 kali lipat.",
        },
        {
          name: "Ratna Sari Dewi",
          role: "CMO, Fashion Hijab Premium",
          quote:
            "Tim marketing kami bisa fokus ke strategi besar karena optimasi harian sudah ditangani AI. Efisiensi naik drastis.",
        },
        {
          name: "Dimas Ardiansyah",
          role: "Performance Marketer Freelance",
          quote:
            "Saya handle 12 klien sekarang, dulu maksimal 4. AdForge AI membantu saya scale bisnis tanpa nambah karyawan.",
        },
      ],
    },

    // ── AI Agent Pro ─────────────────────────────────────────────────
    {
      slug: "ai-agent-pro",
      icon: "\uD83E\uDD16",
      title: "AI Agent Pro",
      tagline: "Chatbot AI enterprise untuk customer service 24/7",
      heroTitle: "Customer Service 24/7 Tanpa Tambah Karyawan",
      heroSubtitle:
        "78% pelanggan meninggalkan brand karena response yang lambat. AI Agent Pro menjawab setiap pertanyaan dalam hitungan detik, 24 jam nonstop.",
      problems: [
        {
          icon: "\uD83D\uDC22",
          title: "Response Lambat",
          desc: "Pelanggan tidak mau menunggu. AI Agent merespons dalam hitungan detik, kapanpun pelanggan menghubungi.",
        },
        {
          icon: "\uD83D\uDE29",
          title: "CS Overload",
          desc: "Tim customer service kewalahan saat peak hours. AI menangani ribuan percakapan bersamaan.",
        },
        {
          icon: "\u2753",
          title: "Jawaban Tidak Konsisten",
          desc: "Setiap CS bisa memberikan jawaban berbeda. AI memastikan konsistensi jawaban 100% setiap saat.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Setup",
          desc: "Konfigurasi AI Agent sesuai brand Anda. Pilih persona, tone, dan behavior yang diinginkan.",
        },
        {
          num: 2,
          title: "Train",
          desc: "Upload knowledge base, FAQ, dan dokumen produk. AI belajar semua informasi bisnis Anda.",
        },
        {
          num: 3,
          title: "Deploy",
          desc: "Deploy ke WhatsApp, website, Instagram, dan channel lainnya dalam satu klik.",
        },
        {
          num: 4,
          title: "Monitor",
          desc: "Pantau performa, tingkat kepuasan pelanggan, dan terus tingkatkan kualitas AI.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCF1",
          title: "Multi-Channel",
          desc: "Deploy di WhatsApp, website chat, Instagram DM, Telegram, dan LINE sekaligus.",
        },
        {
          icon: "\uD83D\uDCDA",
          title: "Knowledge Base",
          desc: "Upload dokumen, FAQ, dan informasi produk. AI belajar dan menjawab berdasarkan data Anda.",
        },
        {
          icon: "\uD83D\uDE0A",
          title: "Sentiment Analysis",
          desc: "Deteksi emosi pelanggan dan sesuaikan respons secara otomatis untuk pengalaman terbaik.",
        },
        {
          icon: "\uD83E\uDD1D",
          title: "Human Handoff",
          desc: "Transfer otomatis ke agen manusia untuk kasus kompleks dengan konteks percakapan lengkap.",
        },
        {
          icon: "\uD83D\uDCC8",
          title: "Analytics",
          desc: "Dashboard lengkap untuk menganalisis volume percakapan, topik trending, dan kepuasan pelanggan.",
        },
        {
          icon: "\uD83C\uDFAD",
          title: "Custom Persona",
          desc: "Sesuaikan kepribadian, gaya bahasa, dan tone AI agar sesuai dengan identitas brand Anda.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 199.000",
          period: "/bulan",
          features: [
            "1 channel",
            "1.000 percakapan/bulan",
            "Knowledge base dasar",
            "Email support",
          ],
          cta: "Mulai Starter",
        },
        {
          name: "Business",
          price: "Rp 599.000",
          period: "/bulan",
          features: [
            "3 channel",
            "10.000 percakapan/bulan",
            "Knowledge base advanced",
            "Sentiment analysis",
            "Human handoff",
            "Priority support",
          ],
          popular: true,
          cta: "Mulai Business",
        },
        {
          name: "Enterprise",
          price: "Rp 1.299.000",
          period: "/bulan",
          features: [
            "Unlimited channel",
            "Unlimited percakapan",
            "Custom AI training",
            "Custom persona",
            "API access",
            "Dedicated success manager",
            "SLA 99.9% uptime",
          ],
          cta: "Hubungi Sales",
        },
      ],
      testimonials: [
        {
          name: "Putu Ayu Lestari",
          role: "Customer Experience Lead, Klinik Sehat Sentosa",
          quote:
            "AI Agent Pro menangani 80% pertanyaan pasien secara otomatis. Tim CS kami sekarang bisa fokus ke kasus yang benar-benar butuh sentuhan manusia.",
        },
        {
          name: "Irfan Hakim",
          role: "Owner, Marketplace Kuliner Nusantara",
          quote:
            "Response time kami turun dari 4 jam ke 5 detik. Rating kepuasan pelanggan naik dari 3.2 ke 4.8 bintang.",
        },
        {
          name: "Nadia Kusuma",
          role: "Head of Operations, EduTech Cerdas",
          quote:
            "Kami hemat Rp 25 juta per bulan dari biaya CS setelah deploy AI Agent Pro. ROI-nya luar biasa cepat.",
        },
      ],
    },

    // ── Algorithmic Trading ──────────────────────────────────────────
    {
      slug: "algorithmic-trading",
      icon: "\uD83D\uDCCA",
      title: "Algorithmic Trading",
      tagline: "Bot trading AI untuk profit konsisten",
      heroTitle: "Trading Tanpa Emosi, Profit Konsisten",
      heroSubtitle:
        "95% trader retail kehilangan uang karena emosi. Algorithmic Trading menghilangkan faktor emosi dan mengeksekusi strategi dengan presisi mesin.",
      problems: [
        {
          icon: "\uD83D\uDE30",
          title: "Emosi dalam Trading",
          desc: "Fear dan greed menghancurkan strategi trading. Bot AI trading tanpa emosi, 100% berdasarkan data.",
        },
        {
          icon: "\u231A",
          title: "Miss Opportunity",
          desc: "Market bergerak 24/7 tapi Anda tidak bisa pantau terus. Bot menangkap setiap peluang secara otomatis.",
        },
        {
          icon: "\uD83D\uDCC9",
          title: "Analisis Manual",
          desc: "Menganalisis chart dan indikator memakan waktu berjam-jam. AI melakukannya dalam milidetik.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Connect Exchange",
          desc: "Hubungkan akun exchange Anda (Binance, Tokocrypto, dll) melalui API yang aman.",
        },
        {
          num: 2,
          title: "Set Strategy",
          desc: "Pilih dari 15+ strategi yang sudah proven atau kustomisasi strategi Anda sendiri.",
        },
        {
          num: 3,
          title: "Backtest",
          desc: "Uji strategi dengan data historis untuk melihat performa sebelum menggunakan uang sungguhan.",
        },
        {
          num: 4,
          title: "Go Live",
          desc: "Aktifkan bot dan biarkan AI trading untuk Anda 24/7 dengan risk management otomatis.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCC8",
          title: "15+ Strategies",
          desc: "Pilih dari 15+ strategi trading yang sudah diuji dan terbukti profitable di berbagai kondisi market.",
        },
        {
          icon: "\uD83D\uDD04",
          title: "Multi-Exchange",
          desc: "Trading di Binance, Tokocrypto, Indodax, dan exchange lainnya dari satu platform.",
        },
        {
          icon: "\uD83D\uDEE1\uFE0F",
          title: "Risk Management",
          desc: "Stop loss, take profit, dan position sizing otomatis untuk melindungi modal Anda.",
        },
        {
          icon: "\uD83D\uDD14",
          title: "Real-time Signals",
          desc: "Notifikasi sinyal trading real-time via Telegram, WhatsApp, dan email.",
        },
        {
          icon: "\uD83D\uDCBC",
          title: "Portfolio Tracker",
          desc: "Pantau seluruh portfolio Anda di berbagai exchange dalam satu dashboard.",
        },
        {
          icon: "\uD83D\uDD2C",
          title: "Backtesting Engine",
          desc: "Backtest strategi dengan data historis hingga 5 tahun untuk validasi sebelum go live.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 499.000",
          period: "/bulan",
          features: [
            "1 exchange",
            "3 strategi",
            "Basic risk management",
            "Email signals",
          ],
          cta: "Mulai Starter",
        },
        {
          name: "Trader",
          price: "Rp 999.000",
          period: "/bulan",
          features: [
            "3 exchange",
            "10 strategi",
            "Advanced risk management",
            "Real-time signals",
            "Backtesting engine",
            "Portfolio tracker",
          ],
          popular: true,
          cta: "Mulai Trader",
        },
        {
          name: "Institutional",
          price: "Rp 2.499.000",
          period: "/bulan",
          features: [
            "Unlimited exchange",
            "15+ strategi & custom",
            "Enterprise risk management",
            "Dedicated trading server",
            "API access",
            "Priority execution",
            "Personal trading advisor",
          ],
          cta: "Hubungi Sales",
        },
      ],
      testimonials: [
        {
          name: "Wahyu Nugroho",
          role: "Crypto Trader, 5 tahun pengalaman",
          quote:
            "Sejak pakai Algorithmic Trading, portfolio saya tumbuh 40% dalam 6 bulan. Yang paling penting, saya bisa tidur nyenyak tanpa khawatir market.",
        },
        {
          name: "Siti Nurhaliza",
          role: "Investor Retail",
          quote:
            "Saya bukan ahli trading tapi dengan bot AI ini, hasil saya konsisten setiap bulan. Risk management-nya luar biasa.",
        },
        {
          name: "Tommy Tanaka",
          role: "Fund Manager, Crypto Alpha Capital",
          quote:
            "Kami mengelola dana investor dengan bantuan Algorithmic Trading. Execution speed dan backtesting engine-nya setara platform institusional.",
        },
      ],
    },

    // ── Digital Products ─────────────────────────────────────────────
    {
      slug: "digital-products",
      icon: "\uD83D\uDC8E",
      title: "Digital Products",
      tagline: "Marketplace produk digital premium",
      heroTitle: "Shortcut Sukses Digital Anda",
      heroSubtitle:
        "Berhenti buang waktu membangun semuanya dari nol. Gunakan template, course, dan tools yang sudah proven untuk percepat kesuksesan digital Anda.",
      problems: [
        {
          icon: "\uD83E\uDD37",
          title: "Bingung Mulai dari Mana",
          desc: "Terlalu banyak informasi di internet membuat bingung. Produk digital kami tersusun jadi roadmap yang jelas.",
        },
        {
          icon: "\uD83D\uDC4E",
          title: "Template Murahan",
          desc: "Template gratisan sering kali kualitasnya buruk dan tidak profesional. Kami kurasi hanya yang terbaik.",
        },
        {
          icon: "\uD83D\uDEAB",
          title: "Tidak Ada Support",
          desc: "Beli produk digital lain lalu ditinggal sendiri. Di sini Anda dapat akses komunitas dan support langsung.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Browse",
          desc: "Jelajahi 500+ produk digital premium yang sudah dikurasi untuk berbagai kebutuhan bisnis.",
        },
        {
          num: 2,
          title: "Purchase",
          desc: "Bayar sekali atau berlangganan untuk akses penuh. Pembayaran aman via berbagai metode.",
        },
        {
          num: 3,
          title: "Download",
          desc: "Langsung download dan akses produk digital Anda. Tersedia di member area selamanya.",
        },
        {
          num: 4,
          title: "Implement",
          desc: "Terapkan template dan ikuti panduan step-by-step. Dapatkan support dari komunitas eksklusif.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCC2",
          title: "500+ Templates",
          desc: "Koleksi 500+ template desain, website, presentasi, dan dokumen bisnis siap pakai.",
        },
        {
          icon: "\uD83C\uDF93",
          title: "Video Courses",
          desc: "Kursus video lengkap tentang digital marketing, AI, bisnis online, dan skill digital lainnya.",
        },
        {
          icon: "\uD83E\uDD16",
          title: "AI Prompts Library",
          desc: "Koleksi 1000+ AI prompt yang sudah dioptimasi untuk ChatGPT, Midjourney, dan tools AI lainnya.",
        },
        {
          icon: "\uD83D\uDEE0\uFE0F",
          title: "Business Tools",
          desc: "Spreadsheet, kalkulator bisnis, SOP template, dan tools operasional siap pakai.",
        },
        {
          icon: "\uD83D\uDD04",
          title: "Monthly Updates",
          desc: "Produk baru dan update ditambahkan setiap bulan. Selalu up-to-date dengan tren terbaru.",
        },
        {
          icon: "\uD83D\uDC65",
          title: "Community Access",
          desc: "Bergabung dengan komunitas eksklusif untuk networking, diskusi, dan support sesama member.",
        },
      ],
      pricing: [
        {
          name: "Single Item",
          price: "Rp 99.000",
          period: "/item",
          features: [
            "1 produk digital pilihan",
            "Lifetime access",
            "Update gratis",
          ],
          cta: "Beli Sekarang",
        },
        {
          name: "Bundle",
          price: "Rp 299.000",
          period: "/bundle",
          features: [
            "Paket 10 produk digital",
            "Lifetime access",
            "Update gratis",
            "Community access",
            "Email support",
          ],
          popular: true,
          cta: "Beli Bundle",
        },
        {
          name: "All Access",
          price: "Rp 599.000",
          period: "/bulan",
          features: [
            "Akses semua 500+ produk",
            "Video courses lengkap",
            "AI prompts library",
            "Community premium",
            "Monthly live session",
            "Priority support",
          ],
          cta: "Mulai All Access",
        },
      ],
      testimonials: [
        {
          name: "Anisa Fitriani",
          role: "Freelance Designer",
          quote:
            "Template dari BerkahKarya menghemat waktu saya berjam-jam setiap project. Kualitasnya premium dan sangat mudah dikustomisasi.",
        },
        {
          name: "Riko Mandala",
          role: "Owner, Startup Edukasi Online",
          quote:
            "All Access pass adalah investasi terbaik untuk bisnis saya. Dari SOP template sampai AI prompts, semuanya langsung applicable.",
        },
        {
          name: "Wulan Sari",
          role: "Social Media Manager",
          quote:
            "Komunitas-nya yang bikin betah. Selain dapat produk digital berkualitas, saya juga dapat insight dan networking yang berharga.",
        },
      ],
    },
  ],

  en: [
    // ── AI Video Studio ──────────────────────────────────────────────
    {
      slug: "ai-video-studio",
      icon: "\uD83C\uDFAC",
      title: "AI Video Studio",
      tagline: "AI video studio for viral content",
      heroTitle: "Create Viral Videos Without Editing Skills",
      heroSubtitle:
        "Your competitors are already posting 10 videos per day with AI. Without AI Video Studio, you will keep losing in the algorithm and bleeding your audience every second.",
      problems: [
        {
          icon: "\uD83D\uDCB8",
          title: "Expensive Production Costs",
          desc: "Hiring videographers, editors, and talent can cost millions per video. AI Video Studio cuts costs by up to 90%.",
        },
        {
          icon: "\u23F3",
          title: "Time-Consuming Production",
          desc: "A single video can take days to produce. With AI, finish in minutes without compromising quality.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "Requires Technical Skills",
          desc: "Not everyone masters professional editing software. AI Video Studio makes anyone a content creator.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Upload",
          desc: "Upload your images, text, or scripts to the platform. Multiple file formats supported.",
        },
        {
          num: 2,
          title: "AI Process",
          desc: "Our AI analyzes content and automatically creates videos with optimal visuals and transitions.",
        },
        {
          num: 3,
          title: "Edit",
          desc: "Customize the video output to your needs. Change text, music, and visual elements with ease.",
        },
        {
          num: 4,
          title: "Publish",
          desc: "Publish directly to multiple social media platforms with a single click.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCDD",
          title: "Text-to-Video",
          desc: "Transform text or scripts into professional videos complete with visuals, narration, and music.",
        },
        {
          icon: "\uD83D\uDDBC\uFE0F",
          title: "Image-to-Video",
          desc: "Animate static images into dynamic videos with AI-powered motion effects and transitions.",
        },
        {
          icon: "\uD83C\uDFA4",
          title: "Voice Clone",
          desc: "Clone your voice for automatic narration on every video. Supports Indonesian and English.",
        },
        {
          icon: "\uD83D\uDCCB",
          title: "Auto Subtitle",
          desc: "Generate automatic subtitles with high accuracy in multiple languages.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "50+ Templates",
          desc: "Choose from 50+ video templates optimized for various platforms and niches.",
        },
        {
          icon: "\u26A1",
          title: "Batch Render",
          desc: "Render dozens of videos simultaneously. Perfect for large-scale content production.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 199,000",
          period: "/month",
          features: [
            "30 videos per month",
            "720p resolution",
            "5 basic templates",
            "Auto subtitles",
          ],
          cta: "Start Starter",
        },
        {
          name: "Professional",
          price: "Rp 499,000",
          period: "/month",
          features: [
            "Unlimited videos",
            "1080p resolution",
            "50+ premium templates",
            "Voice clone",
            "Batch render (10 videos)",
            "Priority rendering",
          ],
          popular: true,
          cta: "Start Professional",
        },
        {
          name: "Enterprise",
          price: "Rp 999,000",
          period: "/month",
          features: [
            "Unlimited videos",
            "4K resolution",
            "Custom templates",
            "Unlimited voice clone",
            "Unlimited batch render",
            "API access",
            "Dedicated account manager",
          ],
          cta: "Contact Sales",
        },
      ],
      testimonials: [
        {
          name: "Hendra Gunawan",
          role: "Content Creator, 500K+ followers",
          quote:
            "I used to need 2 days for 1 video. Now with AI Video Studio, I can create 10 videos in a day. Followers grew 3x in 2 months!",
        },
        {
          name: "Lina Maharani",
          role: "Owner, Batik Nusantara Online",
          quote:
            "Our video content costs dropped 85% since using AI Video Studio. The quality is even better than freelance videographers we used to hire.",
        },
        {
          name: "Fajar Hidayat",
          role: "Digital Marketing Manager, PT Maju Bersama",
          quote:
            "Our team of just 3 people can now produce video content equivalent to a team of 15. A game changer for our brand.",
        },
      ],
    },

    // ── AdForge AI ───────────────────────────────────────────────────
    {
      slug: "adforge-ai",
      icon: "\uD83D\uDCE2",
      title: "AdForge AI",
      tagline: "AI ad engine for maximum ROAS",
      heroTitle: "Ads That Generate Revenue, Not Drain It",
      heroSubtitle:
        "80% of SME ad budgets in Indonesia are wasted on wrong targeting. AdForge AI ensures every rupiah works toward generating sales.",
      problems: [
        {
          icon: "\uD83D\uDD25",
          title: "Wasted Ad Budget",
          desc: "Millions spent with no clear results. Our AI optimizes every rupiah for maximum conversions.",
        },
        {
          icon: "\uD83C\uDFAF",
          title: "Wrong Target Audience",
          desc: "Showing ads to the wrong people means throwing away money. AI finds your best audience automatically.",
        },
        {
          icon: "\uD83D\uDE34",
          title: "Creative Fatigue",
          desc: "Audiences get bored seeing the same ads repeatedly. AI generates unlimited creative variations.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Connect Ads",
          desc: "Connect your Facebook, Google, TikTok, and other ad accounts in minutes.",
        },
        {
          num: 2,
          title: "AI Analyze",
          desc: "AI analyzes historical data and competitors to find the best strategy.",
        },
        {
          num: 3,
          title: "Optimize",
          desc: "Automatically optimize bidding, targeting, and creatives based on real-time performance.",
        },
        {
          num: 4,
          title: "Scale",
          desc: "Automatically scale profitable campaigns without sacrificing ROAS.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCB0",
          title: "Smart Bidding",
          desc: "AI bidding algorithm that adjusts bids in real-time to achieve the lowest CPA.",
        },
        {
          icon: "\uD83E\uDDE0",
          title: "Audience AI",
          desc: "Discover and create the best lookalike audiences based on your conversion data.",
        },
        {
          icon: "\uD83C\uDFA8",
          title: "Creative Generator",
          desc: "Generate hundreds of ad creative variations from a single brief. Text, images, and video.",
        },
        {
          icon: "\uD83D\uDD00",
          title: "A/B Auto Testing",
          desc: "Run A/B tests automatically and allocate budget to winners in real-time.",
        },
        {
          icon: "\uD83C\uDF10",
          title: "Multi-Platform",
          desc: "Manage ads on Facebook, Google, TikTok, and Instagram from one dashboard.",
        },
        {
          icon: "\uD83D\uDCCA",
          title: "ROI Dashboard",
          desc: "Real-time dashboard displaying ROI, ROAS, CPA, and other critical metrics.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 299,000",
          period: "/month",
          features: [
            "1 ad account",
            "1 platform",
            "Basic smart bidding",
            "Weekly report",
          ],
          cta: "Start Starter",
        },
        {
          name: "Professional",
          price: "Rp 699,000",
          period: "/month",
          features: [
            "5 ad accounts",
            "Multi-platform",
            "Advanced smart bidding",
            "Creative generator",
            "A/B auto testing",
            "Daily report",
          ],
          popular: true,
          cta: "Start Professional",
        },
        {
          name: "Enterprise",
          price: "Rp 1,499,000",
          period: "/month",
          features: [
            "Unlimited ad accounts",
            "All platforms",
            "AI audience builder",
            "Unlimited creative generation",
            "Custom attribution model",
            "Dedicated strategist",
            "API access",
          ],
          cta: "Contact Sales",
        },
      ],
      testimonials: [
        {
          name: "Agus Prabowo",
          role: "Owner, Toko Elektronik Jaya",
          quote:
            "Our ROAS jumped from 2x to 8x after using AdForge AI. Same ad budget but 4x more sales.",
        },
        {
          name: "Ratna Sari Dewi",
          role: "CMO, Fashion Hijab Premium",
          quote:
            "Our marketing team can now focus on big-picture strategy because daily optimization is handled by AI. Efficiency skyrocketed.",
        },
        {
          name: "Dimas Ardiansyah",
          role: "Freelance Performance Marketer",
          quote:
            "I handle 12 clients now, used to max out at 4. AdForge AI helps me scale my business without hiring more staff.",
        },
      ],
    },

    // ── AI Agent Pro ─────────────────────────────────────────────────
    {
      slug: "ai-agent-pro",
      icon: "\uD83E\uDD16",
      title: "AI Agent Pro",
      tagline: "Enterprise AI chatbot for 24/7 customer service",
      heroTitle: "24/7 Customer Service Without Hiring More Staff",
      heroSubtitle:
        "78% of customers abandon brands due to slow responses. AI Agent Pro answers every question in seconds, 24 hours nonstop.",
      problems: [
        {
          icon: "\uD83D\uDC22",
          title: "Slow Response Times",
          desc: "Customers refuse to wait. AI Agent responds in seconds, whenever customers reach out.",
        },
        {
          icon: "\uD83D\uDE29",
          title: "CS Overload",
          desc: "Customer service teams are overwhelmed during peak hours. AI handles thousands of conversations simultaneously.",
        },
        {
          icon: "\u2753",
          title: "Inconsistent Answers",
          desc: "Different agents give different answers. AI ensures 100% answer consistency at all times.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Setup",
          desc: "Configure your AI Agent to match your brand. Choose the persona, tone, and behavior you want.",
        },
        {
          num: 2,
          title: "Train",
          desc: "Upload your knowledge base, FAQ, and product documents. AI learns all your business information.",
        },
        {
          num: 3,
          title: "Deploy",
          desc: "Deploy to WhatsApp, website, Instagram, and other channels with a single click.",
        },
        {
          num: 4,
          title: "Monitor",
          desc: "Monitor performance, customer satisfaction levels, and continuously improve AI quality.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCF1",
          title: "Multi-Channel",
          desc: "Deploy on WhatsApp, website chat, Instagram DM, Telegram, and LINE simultaneously.",
        },
        {
          icon: "\uD83D\uDCDA",
          title: "Knowledge Base",
          desc: "Upload documents, FAQs, and product information. AI learns and answers based on your data.",
        },
        {
          icon: "\uD83D\uDE0A",
          title: "Sentiment Analysis",
          desc: "Detect customer emotions and automatically adjust responses for the best experience.",
        },
        {
          icon: "\uD83E\uDD1D",
          title: "Human Handoff",
          desc: "Auto-transfer to human agents for complex cases with full conversation context.",
        },
        {
          icon: "\uD83D\uDCC8",
          title: "Analytics",
          desc: "Comprehensive dashboard analyzing conversation volume, trending topics, and customer satisfaction.",
        },
        {
          icon: "\uD83C\uDFAD",
          title: "Custom Persona",
          desc: "Customize the AI personality, language style, and tone to match your brand identity.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 199,000",
          period: "/month",
          features: [
            "1 channel",
            "1,000 conversations/month",
            "Basic knowledge base",
            "Email support",
          ],
          cta: "Start Starter",
        },
        {
          name: "Business",
          price: "Rp 599,000",
          period: "/month",
          features: [
            "3 channels",
            "10,000 conversations/month",
            "Advanced knowledge base",
            "Sentiment analysis",
            "Human handoff",
            "Priority support",
          ],
          popular: true,
          cta: "Start Business",
        },
        {
          name: "Enterprise",
          price: "Rp 1,299,000",
          period: "/month",
          features: [
            "Unlimited channels",
            "Unlimited conversations",
            "Custom AI training",
            "Custom persona",
            "API access",
            "Dedicated success manager",
            "SLA 99.9% uptime",
          ],
          cta: "Contact Sales",
        },
      ],
      testimonials: [
        {
          name: "Putu Ayu Lestari",
          role: "Customer Experience Lead, Klinik Sehat Sentosa",
          quote:
            "AI Agent Pro handles 80% of patient inquiries automatically. Our CS team can now focus on cases that truly need a human touch.",
        },
        {
          name: "Irfan Hakim",
          role: "Owner, Marketplace Kuliner Nusantara",
          quote:
            "Our response time dropped from 4 hours to 5 seconds. Customer satisfaction rating went from 3.2 to 4.8 stars.",
        },
        {
          name: "Nadia Kusuma",
          role: "Head of Operations, EduTech Cerdas",
          quote:
            "We save Rp 25 million per month in CS costs after deploying AI Agent Pro. The ROI was incredibly fast.",
        },
      ],
    },

    // ── Algorithmic Trading ──────────────────────────────────────────
    {
      slug: "algorithmic-trading",
      icon: "\uD83D\uDCCA",
      title: "Algorithmic Trading",
      tagline: "AI trading bot for consistent profits",
      heroTitle: "Trade Without Emotions, Profit Consistently",
      heroSubtitle:
        "95% of retail traders lose money due to emotions. Algorithmic Trading eliminates the emotional factor and executes strategies with machine precision.",
      problems: [
        {
          icon: "\uD83D\uDE30",
          title: "Emotional Trading",
          desc: "Fear and greed destroy trading strategies. AI bot trades without emotion, 100% data-driven.",
        },
        {
          icon: "\u231A",
          title: "Missed Opportunities",
          desc: "Markets move 24/7 but you can't monitor them constantly. The bot captures every opportunity automatically.",
        },
        {
          icon: "\uD83D\uDCC9",
          title: "Manual Analysis",
          desc: "Analyzing charts and indicators takes hours. AI does it in milliseconds.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Connect Exchange",
          desc: "Connect your exchange accounts (Binance, Tokocrypto, etc.) through secure API integration.",
        },
        {
          num: 2,
          title: "Set Strategy",
          desc: "Choose from 15+ proven strategies or customize your own trading strategy.",
        },
        {
          num: 3,
          title: "Backtest",
          desc: "Test strategies against historical data to see performance before risking real money.",
        },
        {
          num: 4,
          title: "Go Live",
          desc: "Activate the bot and let AI trade for you 24/7 with automatic risk management.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCC8",
          title: "15+ Strategies",
          desc: "Choose from 15+ tested and proven trading strategies across various market conditions.",
        },
        {
          icon: "\uD83D\uDD04",
          title: "Multi-Exchange",
          desc: "Trade on Binance, Tokocrypto, Indodax, and other exchanges from one platform.",
        },
        {
          icon: "\uD83D\uDEE1\uFE0F",
          title: "Risk Management",
          desc: "Automatic stop loss, take profit, and position sizing to protect your capital.",
        },
        {
          icon: "\uD83D\uDD14",
          title: "Real-time Signals",
          desc: "Real-time trading signal notifications via Telegram, WhatsApp, and email.",
        },
        {
          icon: "\uD83D\uDCBC",
          title: "Portfolio Tracker",
          desc: "Monitor your entire portfolio across multiple exchanges in a single dashboard.",
        },
        {
          icon: "\uD83D\uDD2C",
          title: "Backtesting Engine",
          desc: "Backtest strategies with up to 5 years of historical data for validation before going live.",
        },
      ],
      pricing: [
        {
          name: "Starter",
          price: "Rp 499,000",
          period: "/month",
          features: [
            "1 exchange",
            "3 strategies",
            "Basic risk management",
            "Email signals",
          ],
          cta: "Start Starter",
        },
        {
          name: "Trader",
          price: "Rp 999,000",
          period: "/month",
          features: [
            "3 exchanges",
            "10 strategies",
            "Advanced risk management",
            "Real-time signals",
            "Backtesting engine",
            "Portfolio tracker",
          ],
          popular: true,
          cta: "Start Trader",
        },
        {
          name: "Institutional",
          price: "Rp 2,499,000",
          period: "/month",
          features: [
            "Unlimited exchanges",
            "15+ strategies & custom",
            "Enterprise risk management",
            "Dedicated trading server",
            "API access",
            "Priority execution",
            "Personal trading advisor",
          ],
          cta: "Contact Sales",
        },
      ],
      testimonials: [
        {
          name: "Wahyu Nugroho",
          role: "Crypto Trader, 5 years experience",
          quote:
            "Since using Algorithmic Trading, my portfolio grew 40% in 6 months. Most importantly, I can sleep soundly without worrying about the market.",
        },
        {
          name: "Siti Nurhaliza",
          role: "Retail Investor",
          quote:
            "I'm not a trading expert but with this AI bot, my results have been consistent every month. The risk management is outstanding.",
        },
        {
          name: "Tommy Tanaka",
          role: "Fund Manager, Crypto Alpha Capital",
          quote:
            "We manage investor funds with help from Algorithmic Trading. The execution speed and backtesting engine rival institutional platforms.",
        },
      ],
    },

    // ── Digital Products ─────────────────────────────────────────────
    {
      slug: "digital-products",
      icon: "\uD83D\uDC8E",
      title: "Digital Products",
      tagline: "Premium digital products marketplace",
      heroTitle: "Your Digital Success Shortcut",
      heroSubtitle:
        "Stop wasting time building everything from scratch. Use proven templates, courses, and tools to accelerate your digital success.",
      problems: [
        {
          icon: "\uD83E\uDD37",
          title: "Don't Know Where to Start",
          desc: "Too much information on the internet creates confusion. Our digital products are organized into a clear roadmap.",
        },
        {
          icon: "\uD83D\uDC4E",
          title: "Low-Quality Templates",
          desc: "Free templates are often poorly made and unprofessional. We curate only the best quality products.",
        },
        {
          icon: "\uD83D\uDEAB",
          title: "No Support",
          desc: "Buy digital products elsewhere and get left on your own. Here you get community access and direct support.",
        },
      ],
      steps: [
        {
          num: 1,
          title: "Browse",
          desc: "Explore 500+ curated premium digital products for various business needs.",
        },
        {
          num: 2,
          title: "Purchase",
          desc: "Pay once or subscribe for full access. Secure payments via multiple methods.",
        },
        {
          num: 3,
          title: "Download",
          desc: "Instantly download and access your digital products. Available in the member area forever.",
        },
        {
          num: 4,
          title: "Implement",
          desc: "Apply templates and follow step-by-step guides. Get support from the exclusive community.",
        },
      ],
      features: [
        {
          icon: "\uD83D\uDCC2",
          title: "500+ Templates",
          desc: "Collection of 500+ ready-to-use design, website, presentation, and business document templates.",
        },
        {
          icon: "\uD83C\uDF93",
          title: "Video Courses",
          desc: "Comprehensive video courses on digital marketing, AI, online business, and other digital skills.",
        },
        {
          icon: "\uD83E\uDD16",
          title: "AI Prompts Library",
          desc: "Collection of 1,000+ optimized AI prompts for ChatGPT, Midjourney, and other AI tools.",
        },
        {
          icon: "\uD83D\uDEE0\uFE0F",
          title: "Business Tools",
          desc: "Spreadsheets, business calculators, SOP templates, and ready-to-use operational tools.",
        },
        {
          icon: "\uD83D\uDD04",
          title: "Monthly Updates",
          desc: "New products and updates added every month. Always up-to-date with the latest trends.",
        },
        {
          icon: "\uD83D\uDC65",
          title: "Community Access",
          desc: "Join an exclusive community for networking, discussions, and peer support among members.",
        },
      ],
      pricing: [
        {
          name: "Single Item",
          price: "Rp 99,000",
          period: "/item",
          features: [
            "1 digital product of your choice",
            "Lifetime access",
            "Free updates",
          ],
          cta: "Buy Now",
        },
        {
          name: "Bundle",
          price: "Rp 299,000",
          period: "/bundle",
          features: [
            "Pack of 10 digital products",
            "Lifetime access",
            "Free updates",
            "Community access",
            "Email support",
          ],
          popular: true,
          cta: "Buy Bundle",
        },
        {
          name: "All Access",
          price: "Rp 599,000",
          period: "/month",
          features: [
            "Access to all 500+ products",
            "Complete video courses",
            "AI prompts library",
            "Premium community",
            "Monthly live sessions",
            "Priority support",
          ],
          cta: "Start All Access",
        },
      ],
      testimonials: [
        {
          name: "Anisa Fitriani",
          role: "Freelance Designer",
          quote:
            "Templates from BerkahKarya save me hours on every project. Premium quality and very easy to customize.",
        },
        {
          name: "Riko Mandala",
          role: "Owner, Online Education Startup",
          quote:
            "The All Access pass is the best investment for my business. From SOP templates to AI prompts, everything is immediately applicable.",
        },
        {
          name: "Wulan Sari",
          role: "Social Media Manager",
          quote:
            "The community is what keeps me coming back. Beyond quality digital products, I also get invaluable insights and networking.",
        },
      ],
    },
  ],
} as const satisfies Record<Locale, Product[]>;
