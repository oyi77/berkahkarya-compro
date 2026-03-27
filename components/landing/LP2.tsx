'use client';

import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';
import TrackedCTA from './TrackedCTA';
import { useEngagementTracking } from '@/hooks/useEngagementTracking';

export default function LP2({ locale = 'id' }: { locale?: string }) {
  useEngagementTracking('AI Video Studio - LP2', '0', 'ai-video-studio-lp2');
  return (
    <Layout 
      title="Serius, Sesimpel Ini? — AI Content Studio | BerkahKarya"
      description="Bikin konten viral sesimpel upload foto. AI Content Studio BerkahKarya."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>3 Langkah. Selesai.</span>
            </div>
            
            <h1 className={styles.title}>
              Serius,<br/>
              <span className={styles.gradientTextPurple}>Sesimpel Ini?</span>
            </h1>
            
            <p className={styles.subtitle}>
              Upload foto → pilih style → video viral siap download. 
              Gak perlu skill. Gak perlu software mahal. Gak perlu waktu berjam-jam.
            </p>
            
            <div className={styles.ctaRow}>
              <TrackedCTA 
                href="https://saas.aitradepulse.com/" 
                className={styles.btnPrimary}
                productName="AI Video Studio - LP2 Hero"
                productId="ai-video-studio-lp2"
              >
                😱 Buktiin Sendiri
              </TrackedCTA>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Literally 3 langkah</span>
              <span>✓ 5 menit selesai</span>
              <span>✓ Gratis coba</span>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className={styles.imageSection}>
          <div className={styles.container}>
            <div className={styles.heroImageWrapper}>
              <Image 
                src="https://i.postimg.cc/8PsRYSMn/Gemini-Generated-Image-je8mgkje8mgkje8m.png" 
                alt="AI Content Studio - Sesimpel Ini"
                width={900}
                height={600}
                className={styles.heroImage}
                priority
                quality={75}
              />
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Cara Kerja</span>
            <h2 className={styles.sectionTitle}>
              Cuma <span className={styles.gradientText}>3 Langkah</span>
            </h2>
            
            <div className={styles.grid3}>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>1</div>
                <h3>Upload Foto</h3>
                <p>Foto produk dari HP aja cukup. AI enhance otomatis.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>2</div>
                <h3>Pilih Style</h3>
                <p>Mau cinematic? Energetic? Aesthetic? Tinggal klik.</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>3</div>
                <h3>Download</h3>
                <p>Video + caption + hashtag ready. Langsung upload.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Masih Gak Percaya? <span className={styles.gradientText}>Coba Aja Gratis</span>
            </h2>
            <p className={styles.subtitle}>3 kredit gratis. Tanpa kartu kredit. Tanpa commitment.</p>
            <TrackedCTA 
              href="https://saas.aitradepulse.com/" 
              className={styles.btnPrimary}
              productName="AI Video Studio - LP2 Footer"
              productId="ai-video-studio-lp2-footer"
            >
              😱 Oke, Gue Coba
            </TrackedCTA>
          </div>
        </section>
      </div>
    </Layout>
  );
}
