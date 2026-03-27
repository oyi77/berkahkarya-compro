'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './ProductShowcase.module.css';
import { trackGAEvent, trackMetaEvent, sendMetaCAPI, trackTikTokEvent, sendTikTokCAPI } from '@/lib/tracking';

interface Product {
  emoji: string;
  name: string;
  tagline: string;
  desc: string;
  benefits: string[];
  price: string;
  priceSub?: string;
  priceLabel?: string;
  cta: string;
  href: string;
  badge?: { label: string; type: 'new' | 'hot' | 'pro' | 'popular' };
  featured?: boolean;
  featuredStats?: { num: string; label: string }[];
}

interface Props {
  locale: 'id' | 'en';
}

const products: Record<'id' | 'en', Product[]> = {
  id: [
    {
      emoji: '🎬',
      name: 'AI Video Studio',
      tagline: 'Foto → Video Cinematic dalam 3 Menit',
      desc: 'Upload foto produk, AI buat video cinematic yang siap viral di TikTok, Reels, dan YouTube Shorts — tanpa editor, tanpa studio.',
      benefits: [
        '8 niche: kuliner, fashion, properti, otomotif & lebih',
        '4× lebih banyak views vs foto statis',
        'Rp 2.800–8.000/video (97% lebih murah dari editor)',
      ],
      price: 'Gratis 3 Hari',
      priceSub: 'lanjut Rp 49K/bulan',
      priceLabel: 'Mulai dari',
      cta: 'Coba Gratis →',
      href: '/id/ai-video-studio',
      badge: { label: '🔥 HOT', type: 'hot' },
      featured: true,
      featuredStats: [
        { num: '4×', label: 'Lebih banyak views' },
        { num: '97%', label: 'Hemat vs editor' },
        { num: '<3 mnt', label: 'Per video' },
      ],
    },
    {
      emoji: '📢',
      name: 'AdForge AI',
      tagline: 'Iklan yang Convert, Bukan Cuma Kelihatan Bagus',
      desc: 'Generate 100 variasi creative iklan otomatis. AI test, AI pilih yang paling convert. ROAS naik tanpa tambah budget.',
      benefits: [
        '100 variasi creative dalam 10 menit',
        'Auto A/B test: AI pilih pemenang',
        'Support Meta Ads, TikTok Ads, Google Ads',
      ],
      price: 'Rp 149K',
      priceSub: '/bulan',
      priceLabel: 'Mulai dari',
      cta: 'Lihat Demo →',
      href: '/id/adforge-ai',
      badge: { label: 'POPULER', type: 'popular' },
    },
    {
      emoji: '🤖',
      name: 'AI Agent Pro',
      tagline: 'Karyawan AI 24/7 — Tidak Pernah Capek',
      desc: 'Chatbot AI yang jawab pertanyaan customer, follow-up lead, dan kelola data — berjalan otomatis tanpa butuh karyawan tambahan.',
      benefits: [
        'Respon <2 detik, 24/7 tanpa libur',
        'Hemat 60% biaya customer service',
        'Integrasi WhatsApp, Telegram, Instagram DM',
      ],
      price: 'Rp 299K',
      priceSub: '/bulan',
      priceLabel: 'Mulai dari',
      cta: 'Lihat Detail →',
      href: '/id/ai-agent-pro',
      badge: { label: '⭐ PRO', type: 'pro' },
    },
    {
      emoji: '📈',
      name: 'Algorithmic Trading',
      tagline: 'Trading XAUUSD Tanpa Emosi, 24/5',
      desc: 'Sistem trading otomatis untuk XAUUSD. Eksekusi berbasis algoritma yang sudah dibacktest 5+ tahun. Win rate 58–65%.',
      benefits: [
        '58–65% win rate, 1:2+ risk:reward',
        'Backtested 5+ tahun data historis',
        'Asia session strategy (15:00 UTC+7)',
      ],
      price: 'Rp 499K',
      priceSub: '/bulan',
      priceLabel: 'Mulai dari',
      cta: 'Lihat Sistem →',
      href: '/id/algorithmic-trading',
    },
    {
      emoji: '🌐',
      name: 'OmniRoute API',
      tagline: '398 Model AI — Rp 75K/Bulan Flat',
      desc: 'Satu endpoint untuk GPT-4, Claude, Gemini, DeepSeek, Llama, dan 393+ model lainnya. Auto-failover, hemat 70% biaya API.',
      benefits: [
        '398 model AI vs OpenRouter 200 model',
        'Auto-failover dalam 50ms — zero downtime',
        'Bayar GoPay/OVO/DANA, support Telegram',
      ],
      price: 'Rp 75K',
      priceSub: '/bulan flat',
      priceLabel: 'Mulai dari',
      cta: 'Coba Gratis →',
      href: '/id/omniroute',
      badge: { label: '🆕 NEW', type: 'new' },
    },
    {
      emoji: '📱',
      name: 'Social Media Management',
      tagline: '90 Akun, Satu Dashboard, Nol Drama',
      desc: 'Konten AI otomatis, auto-posting ke 90 akun, analytics real-time. Tim konten Anda fokus strategi, bukan teknis.',
      benefits: [
        '90 akun sosmed dikelola simultan',
        'Konten AI: TikTok, IG, YouTube, FB otomatis',
        'Analytics: reach, engagement, revenue per post',
      ],
      price: 'Rp 1.5jt',
      priceSub: '/bulan',
      priceLabel: 'Mulai dari',
      cta: 'Lihat Paket →',
      href: '/id/social-media-management',
    },
    {
      emoji: '⚙️',
      name: 'AI Automation',
      tagline: '190+ Script Siap Pakai, Deploy Hari Ini',
      desc: 'Chatbot, workflow automation, integrasi API custom. 190+ scripts battle-tested untuk otomatisasi proses bisnis yang kompleks.',
      benefits: [
        '190+ scripts battle-tested langsung pakai',
        'Hemat 60% waktu operasional',
        'Integrasi: WhatsApp, CRM, ERP, spreadsheet',
      ],
      price: 'Mulai Rp 500K',
      priceSub: '/project',
      priceLabel: '',
      cta: 'Konsultasi Gratis →',
      href: '/id/ai-automation',
    },
    {
      emoji: '📦',
      name: 'Produk Digital',
      tagline: 'Template & Tools AI Siap Pakai',
      desc: 'Koleksi template, course, dan tools AI premium — langsung download dan gunakan. Tidak perlu setup teknis.',
      benefits: [
        'Mulai dari Rp 49K',
        'Template desain, caption, script viral',
        'Pembaruan seumur hidup (lifetime access)',
      ],
      price: 'Mulai Rp 49K',
      priceSub: 'one-time',
      priceLabel: '',
      cta: 'Lihat Katalog →',
      href: '/id/digital-products',
    },
    {
      emoji: '🌍',
      name: 'Website Development',
      tagline: 'Website yang Convert, Bukan Cuma Cantik',
      desc: 'Landing page, company profile, dan e-commerce dengan tracking penuh. Dibangun untuk konversi, bukan sekadar keindahan visual.',
      benefits: [
        'SEO-ready + pixel tracking terintegrasi',
        'Mobile-first, load <2 detik',
        'Revisi tidak terbatas selama 30 hari',
      ],
      price: 'Mulai Rp 2.5jt',
      priceSub: '/project',
      priceLabel: '',
      cta: 'Lihat Portfolio →',
      href: '/id/website-development',
    },
  ],
  en: [
    {
      emoji: '🎬',
      name: 'AI Video Studio',
      tagline: 'Photo → Cinematic Video in 3 Minutes',
      desc: 'Upload product photos, AI creates cinematic videos ready to go viral on TikTok, Reels, and YouTube Shorts — no editor, no studio.',
      benefits: [
        '8 niches: food, fashion, property, auto & more',
        '4× more views vs static photos',
        '$0.20–$0.50/video (97% cheaper than editors)',
      ],
      price: 'Free 3 Days',
      priceSub: 'then Rp 49K/month',
      priceLabel: 'Starting from',
      cta: 'Try Free →',
      href: '/en/ai-video-studio',
      badge: { label: '🔥 HOT', type: 'hot' },
      featured: true,
      featuredStats: [
        { num: '4×', label: 'More views' },
        { num: '97%', label: 'Cheaper vs editors' },
        { num: '<3 min', label: 'Per video' },
      ],
    },
    {
      emoji: '📢',
      name: 'AdForge AI',
      tagline: 'Ads That Convert, Not Just Look Good',
      desc: 'Generate 100 ad creative variations automatically. AI tests, AI picks the winner. ROAS increases without more budget.',
      benefits: [
        '100 creative variations in 10 minutes',
        'Auto A/B test: AI picks winner',
        'Supports Meta Ads, TikTok Ads, Google Ads',
      ],
      price: 'Rp 149K',
      priceSub: '/month',
      priceLabel: 'Starting from',
      cta: 'See Demo →',
      href: '/en/adforge-ai',
      badge: { label: 'POPULAR', type: 'popular' },
    },
    {
      emoji: '🤖',
      name: 'AI Agent Pro',
      tagline: '24/7 AI Employee — Never Tires',
      desc: 'AI chatbot that answers customer questions, follows up on leads, and manages data — fully automated without extra staff.',
      benefits: [
        '<2 second response, 24/7 no days off',
        '60% savings on customer service costs',
        'WhatsApp, Telegram, Instagram DM integration',
      ],
      price: 'Rp 299K',
      priceSub: '/month',
      priceLabel: 'Starting from',
      cta: 'See Details →',
      href: '/en/ai-agent-pro',
      badge: { label: '⭐ PRO', type: 'pro' },
    },
    {
      emoji: '📈',
      name: 'Algorithmic Trading',
      tagline: 'Emotionless XAUUSD Trading, 24/5',
      desc: 'Automated trading system for XAUUSD. Algorithm-based execution backtested over 5+ years. Win rate 58–65%.',
      benefits: [
        '58–65% win rate, 1:2+ risk:reward',
        'Backtested 5+ years of historical data',
        'Asia session strategy (15:00 UTC+7)',
      ],
      price: 'Rp 499K',
      priceSub: '/month',
      priceLabel: 'Starting from',
      cta: 'See System →',
      href: '/en/algorithmic-trading',
    },
    {
      emoji: '🌐',
      name: 'OmniRoute API',
      tagline: '398 AI Models — $5/Month Flat',
      desc: 'One endpoint for GPT-4, Claude, Gemini, DeepSeek, Llama, and 393+ models. Auto-failover, save 70% on API costs.',
      benefits: [
        '398 AI models vs OpenRouter\'s 200',
        'Auto-failover in 50ms — zero downtime',
        'Local payment (GoPay/OVO/DANA), Telegram support',
      ],
      price: '$5',
      priceSub: '/month flat',
      priceLabel: 'Starting from',
      cta: 'Try Free →',
      href: '/en/omniroute',
      badge: { label: '🆕 NEW', type: 'new' },
    },
    {
      emoji: '📱',
      name: 'Social Media Management',
      tagline: '90 Accounts, One Dashboard, Zero Hassle',
      desc: 'AI-automated content, auto-posting to 90 accounts, real-time analytics. Your content team focuses on strategy, not execution.',
      benefits: [
        '90 social accounts managed simultaneously',
        'AI content: TikTok, IG, YouTube, FB automated',
        'Analytics: reach, engagement, revenue per post',
      ],
      price: 'Rp 1.5M',
      priceSub: '/month',
      priceLabel: 'Starting from',
      cta: 'See Plans →',
      href: '/en/social-media-management',
    },
    {
      emoji: '⚙️',
      name: 'AI Automation',
      tagline: '190+ Ready-to-Deploy Scripts',
      desc: 'Chatbots, workflow automation, custom API integrations. 190+ battle-tested scripts for complex business process automation.',
      benefits: [
        '190+ battle-tested scripts ready to use',
        'Save 60% operational time',
        'Integration: WhatsApp, CRM, ERP, spreadsheets',
      ],
      price: 'From Rp 500K',
      priceSub: '/project',
      priceLabel: '',
      cta: 'Free Consultation →',
      href: '/en/ai-automation',
    },
    {
      emoji: '📦',
      name: 'Digital Products',
      tagline: 'AI Templates & Tools Ready to Use',
      desc: 'Collection of premium AI templates, courses, and tools — download and use immediately. No technical setup required.',
      benefits: [
        'Starting from Rp 49K',
        'Design, caption, viral script templates',
        'Lifetime updates (lifetime access)',
      ],
      price: 'From Rp 49K',
      priceSub: 'one-time',
      priceLabel: '',
      cta: 'Browse Catalog →',
      href: '/en/digital-products',
    },
    {
      emoji: '🌍',
      name: 'Website Development',
      tagline: 'Websites That Convert, Not Just Look Good',
      desc: 'Landing pages, company profiles, and e-commerce with full tracking. Built for conversion, not just visual appeal.',
      benefits: [
        'SEO-ready + pixel tracking integrated',
        'Mobile-first, <2 second load',
        'Unlimited revisions for 30 days',
      ],
      price: 'From Rp 2.5M',
      priceSub: '/project',
      priceLabel: '',
      cta: 'See Portfolio →',
      href: '/en/website-development',
    },
  ],
};

const badgeClass: Record<string, string> = {
  new: styles.badgeNew,
  hot: styles.badgeHot,
  pro: styles.badgePro,
  popular: styles.badgePopular,
};

export default function ProductShowcase({ locale }: Props) {
  const items = products[locale];
  const featured = items[0]; // AI Video Studio
  const rest = items.slice(1);

  useEffect(() => {
    // Track section view + referrer
    const referrer = document.referrer || 'direct';
    const path = window.location.pathname;

    trackGAEvent('view_product_showcase', {
      page_path: path,
      referrer,
      locale,
    });

    trackMetaEvent('ViewContent', {
      content_name: 'Product Showcase Homepage',
      content_type: 'product_listing',
    });

    sendMetaCAPI('ViewContent', {
      content_name: 'Product Showcase Homepage',
      content_type: 'product_listing',
      referrer_url: referrer,
    });

    trackTikTokEvent('ViewContent', {
      content_name: 'Product Showcase Homepage',
      content_type: 'product_listing',
    });

    sendTikTokCAPI('ViewContent', {
      content_name: 'Product Showcase Homepage',
      content_type: 'product_listing',
    });
  }, [locale]);

  function handleCardClick(product: Product) {
    const referrer = typeof window !== 'undefined' ? document.referrer || 'direct' : '';
    trackGAEvent('product_card_click', {
      product_name: product.name,
      product_href: product.href,
      referrer,
      locale,
    });
    trackMetaEvent('ViewContent', {
      content_name: product.name,
      content_type: 'product_card',
    });
    sendMetaCAPI('ViewContent', {
      content_name: product.name,
      referrer_url: referrer,
    });
    trackTikTokEvent('ViewContent', { content_name: product.name });
    sendTikTokCAPI('ViewContent', { content_name: product.name });
  }

  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            {locale === 'id' ? '🚀 9 Solusi AI · Siap Pakai Hari Ini' : '🚀 9 AI Solutions · Ready to Deploy Today'}
          </span>
          <h2>
            {locale === 'id'
              ? 'Pilih Solusi AI yang Anda Butuhkan'
              : 'Choose the AI Solution You Need'}
          </h2>
          <p>
            {locale === 'id'
              ? 'Setiap produk bisa dipakai terpisah atau sebagai ekosistem terintegrasi. Mulai dari Rp 49K.'
              : 'Each product works standalone or as an integrated ecosystem. Starting from Rp 49K.'}
          </p>
        </div>

        <div className={styles.grid}>
          {/* Featured card (AI Video Studio) */}
          <Link
            href={featured.href}
            className={`${styles.card} ${styles.cardFeatured}`}
            onClick={() => handleCardClick(featured)}
          >
            {featured.badge && (
              <span className={`${styles.cardBadge} ${badgeClass[featured.badge.type]}`}>
                {featured.badge.label}
              </span>
            )}
            <div className={styles.cardTop}>
              <span className={styles.cardIcon}>{featured.emoji}</span>
              <div className={styles.cardName}>{featured.name}</div>
              <div className={styles.cardTagline}>{featured.tagline}</div>
              <p className={styles.cardDesc}>{featured.desc}</p>
              <ul className={styles.cardBenefits}>
                {featured.benefits.map((b, i) => (
                  <li key={i}>
                    <span className={styles.checkIcon}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className={styles.cardBottom} style={{ borderTop: 'none', padding: '0' }}>
                {featured.priceLabel && <span style={{ fontSize: '0.7rem', color: '#999' }}>{featured.priceLabel}</span>}
                <div className={styles.priceValue}>{featured.price}</div>
                <span className={styles.priceSub}>{featured.priceSub}</span>
                <span className={styles.cardCta}>{featured.cta}</span>
              </div>
            </div>
            {featured.featuredStats && (
              <div className={styles.cardFeaturedRight}>
                {featured.featuredStats.map((s, i) => (
                  <div key={i} className={styles.featuredStat}>
                    <span className={styles.featuredStatNum}>{s.num}</span>
                    <span className={styles.featuredStatLabel}>{s.label}</span>
                  </div>
                ))}
                <span className={styles.featuredCta}>{featured.cta}</span>
              </div>
            )}
          </Link>

          {/* Regular cards */}
          {rest.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className={styles.card}
              onClick={() => handleCardClick(product)}
            >
              {product.badge && (
                <span className={`${styles.cardBadge} ${badgeClass[product.badge.type]}`}>
                  {product.badge.label}
                </span>
              )}
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{product.emoji}</span>
                <div className={styles.cardName}>{product.name}</div>
                <div className={styles.cardTagline}>{product.tagline}</div>
                <p className={styles.cardDesc}>{product.desc}</p>
                <ul className={styles.cardBenefits}>
                  {product.benefits.map((b, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                  {product.priceLabel && <span className={styles.priceLabel}>{product.priceLabel}</span>}
                  <span className={styles.priceValue}>{product.price}</span>
                  <span className={styles.priceSub}>{product.priceSub}</span>
                </div>
                <span className={styles.cardCta}>{product.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
