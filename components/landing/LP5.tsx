import React from 'react';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';

export default function LP5({ locale = 'id' }: { locale?: string }) {
  return (
    <Layout 
      title="Ini Cara Baru — AI Content Studio | BerkahKarya"
      description="Cara baru bikin konten viral. AI Content Studio dari BerkahKarya."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>The Future is Here</span>
            </div>
            
            <h1 className={styles.title}>
              Ini<br/>
              <span className={styles.gradientTextIndigo}>Cara Baru</span>
            </h1>
            
            <p className={styles.subtitle}>
              Yang lain masih pakai cara 2020. Kamu? Pakai teknologi 2025. 
              Image-to-Video AI yang bikin konten viral dalam hitungan menit.
            </p>
            
            <div className={styles.ctaRow}>
              <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                🚀 Upgrade Cara Kerja
              </a>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Teknologi terbaru</span>
              <span>✓ First mover advantage</span>
              <span>✓ Gratis coba</span>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Evolusi</span>
            <h2 className={styles.sectionTitle}>
              Evolusi <span className={styles.gradientText}>Bikin Konten</span>
            </h2>
            
            <div className={styles.timeline}>
              <div className={`${styles.timelineItem} ${styles.timelineOld}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h3>2018 — Foto Statis</h3>
                  <p>Upload foto produk ke IG. Engagement rendah. Algoritma gak suka.</p>
                </div>
              </div>
              <div className={`${styles.timelineItem} ${styles.timelineOld}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h3>2020 — Edit Manual</h3>
                  <p>Belajar CapCut/Premiere. Habis waktu berjam-jam. Output terbatas.</p>
                </div>
              </div>
              <div className={`${styles.timelineItem} ${styles.timelineOld}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h3>2022 — Hire Editor</h3>
                  <p>Outsource ke freelancer. Mahal, inkonsisten, revisi tanpa akhir.</p>
                </div>
              </div>
              <div className={`${styles.timelineItem} ${styles.timelineNew}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h3>2025 — AI Content Studio 🚀</h3>
                  <p>Upload foto → video viral otomatis. 5 menit. Rp 8.000. Tanpa skill.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Siap <span className={styles.gradientText}>Upgrade?</span>
            </h2>
            <p className={styles.subtitle}>Jangan ketinggalan. Kompetitor udah pakai ini.</p>
            <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              🚀 Mulai Sekarang
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
