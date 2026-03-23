import type { Locale } from "./navigation";

export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  num: number;
  title: string;
  desc: string;
}

export interface CtaSection {
  title: string;
  subtitle: string;
  btnLabel: string;
}

export interface HomeContent {
  hero: HeroContent;
  stats: Stat[];
  pillars: Pillar[];
  ctaSection: CtaSection;
}

export const homeContent: Record<Locale, HomeContent> = {
  id: {
    hero: {
      badge: "AI Ecosystem #1 di Indonesia",
      title: "AI Ecosystem untuk Bisnis Indonesia",
      subtitle:
        "Kompetitor Anda sudah menggunakan AI untuk memangkas biaya 10x lipat dan memproduksi konten 50x lebih cepat. Setiap hari Anda menunda, mereka semakin jauh meninggalkan Anda.",
      ctaPrimary: "Mulai Sekarang",
      ctaSecondary: "Lihat Demo",
    },
    stats: [
      { value: "500+", label: "Konten dibuat per hari" },
      { value: "10x", label: "Lebih cepat dari cara manual" },
      { value: "15+", label: "Platform terintegrasi" },
      { value: "24jam", label: "Operasional non-stop" },
    ],
    pillars: [
      {
        num: 1,
        title: "Automasi Konten",
        desc: "Buat ratusan video, iklan, dan copy dalam hitungan menit dengan AI yang memahami pasar Indonesia.",
      },
      {
        num: 2,
        title: "Optimasi Revenue",
        desc: "Tingkatkan ROAS iklan dan konversi penjualan dengan algoritma AI yang belajar dari data bisnis Anda.",
      },
      {
        num: 3,
        title: "Skalabilitas Bisnis",
        desc: "Dari UMKM hingga enterprise, ekosistem AI kami tumbuh bersama bisnis Anda tanpa perlu tambah tim.",
      },
    ],
    ctaSection: {
      title: "Siap Transformasi Bisnis Anda dengan AI?",
      subtitle:
        "Bergabung dengan 500+ bisnis Indonesia yang sudah merasakan kekuatan AI ecosystem BerkahKarya.",
      btnLabel: "Konsultasi Gratis Sekarang",
    },
  },
  en: {
    hero: {
      badge: "#1 AI Ecosystem in Indonesia",
      title: "AI Ecosystem for Indonesian Businesses",
      subtitle:
        "Your competitors are already using AI to cut costs by 10x and produce content 50x faster. Every day you delay, they pull further ahead of you.",
      ctaPrimary: "Get Started",
      ctaSecondary: "Watch Demo",
    },
    stats: [
      { value: "500+", label: "Content pieces created daily" },
      { value: "10x", label: "Faster than manual methods" },
      { value: "15+", label: "Integrated platforms" },
      { value: "24h", label: "Non-stop operations" },
    ],
    pillars: [
      {
        num: 1,
        title: "Content Automation",
        desc: "Create hundreds of videos, ads, and copy in minutes with AI that understands the Indonesian market.",
      },
      {
        num: 2,
        title: "Revenue Optimization",
        desc: "Boost ad ROAS and sales conversions with AI algorithms that learn from your business data.",
      },
      {
        num: 3,
        title: "Business Scalability",
        desc: "From SMEs to enterprise, our AI ecosystem grows with your business without expanding your team.",
      },
    ],
    ctaSection: {
      title: "Ready to Transform Your Business with AI?",
      subtitle:
        "Join 500+ Indonesian businesses already experiencing the power of the BerkahKarya AI ecosystem.",
      btnLabel: "Get Free Consultation Now",
    },
  },
} as const satisfies Record<Locale, HomeContent>;
