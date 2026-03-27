import React from 'react';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';

export default function LP1({ locale = 'id' }: { locale?: string }) {
  return (
    <Layout 
      title="Konten Ini Bikin Laku — AI Content Studio | BerkahKarya"
      description="Buat konten viral yang bikin produk laku keras. AI-Powered Content Creation."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>AI-Powered Content Creation</span>
            </div>
            
            <h1 className={styles.title}>
              Konten Ini<br/>
              <span className={styles.gradientText}>Bikin Laku</span>
            </h1>
            
            <p className={styles.subtitle}>
              Upload foto produk → dapat video viral + caption + hashtag dalam hitungan menit. 
              Tanpa skill editing. Tanpa ribet.
            </p>
            
            <div className={styles.ctaRow}>
              <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                🚀 Coba Gratis Sekarang
              </a>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Gratis 3 kredit</span>
              <span>✓ Tanpa kartu kredit</span>
              <span>✓ Langsung pakai</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Kenapa Ini Works</span>
            <h2 className={styles.sectionTitle}>
              Kenapa Konten Ini <span className={styles.gradientText}>Bikin Laku?</span>
            </h2>
            
            <div className={styles.grid3}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>🎯</div>
                <h3>Hook yang Nangkep</h3>
                <p>AI analisis 10.000+ video viral untuk generate hook yang bikin scroll berhenti. Terbukti naikkan watch time 3x lipat.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>🎬</div>
                <h3>Video Cinematic</h3>
                <p>Foto produk biasa jadi video bergerak profesional. Kualitas studio, harga warung kopi.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>📈</div>
                <h3>Optimized untuk FYP</h3>
                <p>Caption, hashtag, timing posting — semua di-optimize AI berdasarkan data real-time trending.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Siap Bikin Konten yang <span className={styles.gradientText}>Laku Keras?</span>
            </h2>
            <p className={styles.subtitle}>Join 500+ seller yang udah buktiin hasilnya.</p>
            <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              🚀 Mulai Gratis — 3 Kredit Aktif
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
