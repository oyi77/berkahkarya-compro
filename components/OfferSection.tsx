import styles from './OfferSection.module.css';

interface OfferSectionProps {
  locale: 'id' | 'en';
}

const SAAS_URL = 'https://saas.aitradepulse.com/';

const copy = {
  id: {
    urgency: '⏰ Penawaran Terbatas · Harga Early Bird Ditutup Saat Slot Penuh',
    hook: <>Coba AI Video Studio <em>Gratis 3 Hari</em> —<br />Foto Pertama Jadi Video dalam 3 Menit.</>,
    subHook: 'Tidak perlu kartu kredit. Tidak perlu install software. Cukup buka Telegram dan upload foto produk — video cinematic siap dalam hitungan menit.',
    interestTitle: 'Kenapa ini worth it untuk kamu coba?',
    benefits: [
      { icon: '🎬', title: '6 Video Gratis untuk Mulai', body: '3 kredit langsung aktif saat daftar = 6 video cinematic tanpa bayar sepeser pun. Coba dulu, bayar kalau suka.' },
      { icon: '⚡', title: 'Hasilnya Lebih Bagus dari Edit Manual', body: 'AI pakai model BytePlus Seedance + XAI Grok Aurora — kualitas yang biasanya hanya bisa diakses agensi besar.' },
      { icon: '💸', title: '97% Lebih Murah dari Editor Freelance', body: 'Rp 8.000/video vs Rp 500.000/video. Untuk UMKM yang margin tipis, ini bukan penghematan kecil.' },
      { icon: '📈', title: 'Video Bergerak 4× Lebih Banyak Views', body: 'Data dari TikTok: video I2V (image-to-video) mendapat rata-rata 4× lebih banyak FYP reach vs foto statis.' },
    ],
    compareLabel: {
      bad: '❌ Cara Lama',
      good: '✓ Setelah AI Video Studio',
    },
    compareBad: [
      '3–4 jam edit 1 video',
      'Bayar editor Rp 300–700K/video',
      'Upload 3× seminggu sudah lelah',
      'Foto statis → views stuck 200',
      'Kompetitor jauh di depan',
    ],
    compareGood: [
      '3 menit dari foto ke video cinematic',
      'Rp 2.800–8.000/video (97% lebih murah)',
      'Upload 2× sehari tanpa tambah effort',
      'Video bergerak → FYP reward lebih banyak',
      '6 video gratis untuk langsung buktikan',
    ],
    offerLabel: '🎁 Penawaran Khusus Hari Ini',
    offerTitle: 'AI Video Studio — Starter Gratis 3 Hari',
    priceMain: 'GRATIS',
    priceOld: 'Rp 49K',
    pricePer: 'untuk 3 hari pertama, lanjut Rp 49K/bulan',
    offerItems: [
      '3 kredit = 6 video gratis',
      'Semua 8 niche kategori',
      '4 AI provider (failover otomatis)',
      'Clone video viral kompetitor',
      'Output ke TikTok/IG/YouTube/FB',
      'Kredit tidak pernah kadaluarsa',
    ],
    ctaText: '🚀 Mulai Gratis — Aktifkan 3 Kredit Sekarang',
    ctaSecondary: 'Lihat paket lengkap →',
    trust: ['Tidak perlu kartu kredit', '3 kredit langsung aktif', 'Cancel kapan saja', 'Support Telegram <5 menit'],
  },
  en: {
    urgency: '⏰ Limited Offer · Early Bird Price Closes When Slots Fill',
    hook: <>Try AI Video Studio <em>Free 3 Days</em> —<br />First Photo to Video in 3 Minutes.</>,
    subHook: 'No credit card. No software install. Just open Telegram and upload your product photo — cinematic video ready in minutes.',
    interestTitle: 'Why this is worth trying for you?',
    benefits: [
      { icon: '🎬', title: '6 Free Videos to Start', body: '3 credits activated instantly on signup = 6 cinematic videos without paying anything. Try first, pay if you love it.' },
      { icon: '⚡', title: 'Better Than Manual Editing', body: 'AI uses BytePlus Seedance + XAI Grok Aurora models — quality usually only accessible to big agencies.' },
      { icon: '💸', title: '97% Cheaper Than Freelance Editor', body: 'Rp 8,000/video vs Rp 500,000/video. For SMBs with thin margins, this isn\'t a small saving.' },
      { icon: '📈', title: 'Moving Video Gets 4× More Views', body: 'TikTok data: I2V (image-to-video) content gets average 4× more FYP reach vs static photos.' },
    ],
    compareLabel: {
      bad: '❌ Old Way',
      good: '✓ After AI Video Studio',
    },
    compareBad: [
      '3–4 hours editing 1 video',
      'Pay editor Rp 300–700K/video',
      'Posting 3× weekly already exhausting',
      'Static photos → views stuck at 200',
      'Competitors far ahead',
    ],
    compareGood: [
      '3 minutes from photo to cinematic video',
      'Rp 2,800–8,000/video (97% cheaper)',
      'Post 2× daily without extra effort',
      'Moving video → FYP rewards more reach',
      '6 free videos to prove it immediately',
    ],
    offerLabel: '🎁 Special Offer Today',
    offerTitle: 'AI Video Studio — Starter Free 3 Days',
    priceMain: 'FREE',
    priceOld: 'Rp 49K',
    pricePer: 'for first 3 days, then Rp 49K/month',
    offerItems: [
      '3 credits = 6 free videos',
      'All 8 niche categories',
      '4 AI providers (auto-failover)',
      'Clone viral competitor videos',
      'Output to TikTok/IG/YouTube/FB',
      'Credits never expire',
    ],
    ctaText: '🚀 Start Free — Activate 3 Credits Now',
    ctaSecondary: 'See full plans →',
    trust: ['No credit card', '3 credits instantly active', 'Cancel anytime', 'Telegram support <5min'],
  },
};

export default function OfferSection({ locale }: OfferSectionProps) {
  const c = copy[locale];
  return (
    <section className={styles.section} id="offer">
      <div className={styles.container}>
        {/* Urgency bar */}
        <div className={styles.urgencyBar}>
          <span className={styles.dot} />
          {c.urgency}
        </div>

        {/* Hook */}
        <h2 className={styles.hook}>{c.hook}</h2>
        <p className={styles.subHook}>{c.subHook}</p>

        {/* INTEREST — 4 benefit cards */}
        <div className={styles.interest}>
          <div className={styles.interestTitle}>{c.interestTitle}</div>
          <ul className={styles.benefitList}>
            {c.benefits.map((b, i) => (
              <li key={i} className={styles.benefitItem}>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <div className={styles.benefitText}>
                  <h4>{b.title}</h4>
                  <p>{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Before / After */}
        <div className={styles.compare}>
          <div className={styles.compareCol}>
            <div className={`${styles.compareLabel} ${styles.bad}`}>{c.compareLabel.bad}</div>
            <ul className={styles.compareList}>
              {c.compareBad.map((t, i) => <li key={i} className={styles.bad}>{t}</li>)}
            </ul>
          </div>
          <div className={`${styles.compareCol} ${styles.after}`}>
            <div className={`${styles.compareLabel} ${styles.good}`}>{c.compareLabel.good}</div>
            <ul className={styles.compareList}>
              {c.compareGood.map((t, i) => <li key={i} className={styles.good}>{t}</li>)}
            </ul>
          </div>
        </div>

        {/* Offer box */}
        <div className={styles.offerBox}>
          <div className={styles.offerLabel}>{c.offerLabel}</div>
          <div className={styles.offerTitle}>{c.offerTitle}</div>
          <div className={styles.offerPrice}>
            <span className={styles.priceMain}>{c.priceMain}</span>
            <span className={styles.priceOld}>{c.priceOld}</span>
            <span className={styles.pricePer}>{c.pricePer}</span>
          </div>
          <ul className={styles.offerItems}>
            {c.offerItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <a href={SAAS_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            {c.ctaText}
          </a>
          <a href={SAAS_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
            {c.ctaSecondary}
          </a>
        </div>

        {/* Trust row */}
        <div className={styles.trust}>
          {c.trust.map((t, i) => <span key={i}>✓ {t}</span>)}
        </div>
      </div>
    </section>
  );
}
