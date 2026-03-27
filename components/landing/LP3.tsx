import React from 'react';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';

export default function LP3({ locale = 'id' }: { locale?: string }) {
  return (
    <Layout 
      title="Masih Edit Manual? — AI Content Studio | BerkahKarya"
      description="Stop edit manual. AI bikin video viral otomatis. BerkahKarya AI Content Studio."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Ada Cara Lebih Cepat</span>
            </div>
            
            <h1 className={styles.title}>
              Masih<br/>
              <span className={styles.gradientTextOrange}>Edit Manual?</span>
            </h1>
            
            <p className={styles.subtitle}>
              Sementara kamu habis 3 jam edit 1 video, kompetitor upload 10 video pakai AI. 
              Waktu = uang. Stop buang waktu.
            </p>
            
            <div className={styles.ctaRow}>
              <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                😫 Stop Kerja Rodi
              </a>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Hemat 3 jam/video</span>
              <span>✓ Output 10x lebih banyak</span>
              <span>✓ Kualitas tetap pro</span>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Perbandingan</span>
            <h2 className={styles.sectionTitle}>
              Edit Manual vs <span className={styles.gradientText}>AI Studio</span>
            </h2>
            
            <div className={styles.compareGrid}>
              <div className={styles.compareOld}>
                <h3>❌ Edit Manual</h3>
                <ul>
                  <li><span className={styles.xMark}>✗</span> 3-4 jam untuk 1 video 30 detik</li>
                  <li><span className={styles.xMark}>✗</span> Perlu skill CapCut/Premiere</li>
                  <li><span className={styles.xMark}>✗</span> Bayar editor Rp 300K-700K/video</li>
                  <li><span className={styles.xMark}>✗</span> Revisi bolak-balik capek</li>
                  <li><span className={styles.xMark}>✗</span> Max upload 3x seminggu</li>
                </ul>
              </div>
              <div className={styles.compareNew}>
                <h3>🚀 AI Studio</h3>
                <ul>
                  <li><span className={styles.checkMark}>✓</span> 5 menit untuk 1 video</li>
                  <li><span className={styles.checkMark}>✓</span> Zero skill — upload aja</li>
                  <li><span className={styles.checkMark}>✓</span> Rp 8.000/video</li>
                  <li><span className={styles.checkMark}>✓</span> Instant result, no revisi</li>
                  <li><span className={styles.checkMark}>✓</span> Upload 3x sehari santai</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Udahan <span className={styles.gradientText}>Kerja Rodinya</span>
            </h2>
            <p className={styles.subtitle}>Biar AI yang kerja. Kamu fokus scaling bisnis.</p>
            <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              😫 Gue Mau Upgrade
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
