import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';

export default function LP4({ locale = 'id' }: { locale?: string }) {
  return (
    <Layout 
      title="Tinggal Upload Doang — AI Content Studio | BerkahKarya"
      description="Video viral tinggal upload. AI yang kerjain sisanya. BerkahKarya AI Content Studio."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Zero Effort Content</span>
            </div>
            
            <h1 className={styles.title}>
              Tinggal<br/>
              <span className={styles.gradientTextTeal}>Upload Doang</span>
            </h1>
            
            <p className={styles.subtitle}>
              Upload foto produk. AI generate video + caption + hashtag + jadwal posting. 
              Kamu? Tinggal terima notifikasi "Video ready".
            </p>
            
            <div className={styles.ctaRow}>
              <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                ⚡ Mau Yang Gampang
              </a>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Upload sekali</span>
              <span>✓ Dapat 4 output</span>
              <span>✓ AI handle sisanya</span>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className={styles.imageSection}>
          <div className={styles.container}>
            <div className={styles.heroImageWrapper}>
              <Image 
                src="https://i.postimg.cc/MGJ1Xf4N/Gemini-Generated-Image-m9dyorm9dyorm9dy.png" 
                alt="AI Content Studio - Tinggal Upload Doang"
                width={900}
                height={600}
                className={styles.heroImage}
                priority
                quality={75}
              />
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Output</span>
            <h2 className={styles.sectionTitle}>
              Upload 1 Foto, <span className={styles.gradientText}>Dapat 4 Ini</span>
            </h2>
            
            <div className={styles.grid4}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>🎬</div>
                <h3>Video Cinematic</h3>
                <p>Foto jadi video bergerak professional. Siap TikTok/Reels.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>📝</div>
                <h3>Caption Viral</h3>
                <p>Hook + storytelling + CTA. Copywriting level agency.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>#️⃣</div>
                <h3>Hashtag Optimized</h3>
                <p>Mix trending + niche + branded. Maximum reach.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>📅</div>
                <h3>Best Time to Post</h3>
                <p>AI suggest waktu posting optimal berdasar niche kamu.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Mau Yang <span className={styles.gradientText}>Gampang?</span>
            </h2>
            <p className={styles.subtitle}>3 kredit gratis. Langsung cobain.</p>
            <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              ⚡ Upload Sekarang
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
