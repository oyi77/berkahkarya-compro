import React from 'react';
import Layout from '@/components/Layout';
import styles from './LandingPage.module.css';

export default function LP6({ locale = 'id' }: { locale?: string }) {
  return (
    <Layout 
      title="Hasil Nyata Seller — AI Content Studio | BerkahKarya"
      description="Hasil nyata seller yang pakai AI Content Studio. Bukti, bukan janji."
    >
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Real Results, Real Sellers</span>
            </div>
            
            <h1 className={styles.title}>
              Hasil Nyata<br/>
              <span className={styles.gradientTextGold}>Seller</span>
            </h1>
            
            <p className={styles.subtitle}>
              Bukan teori. Bukan janji manis. 
              Ini hasil real dari seller yang udah pakai AI Content Studio.
            </p>
            
            <div className={styles.ctaRow}>
              <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                ⭐ Mau Hasil Kayak Gini
              </a>
            </div>
            
            <div className={styles.trustStrip}>
              <span>✓ Verified results</span>
              <span>✓ Real testimonials</span>
              <span>✓ Kamu bisa juga</span>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className={styles.imageSection}>
          <div className={styles.container}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="https://i.postimg.cc/VNPX50T2/Gemini-Generated-Image-wqs45xwqs45xwqs4.png" 
                alt="AI Content Studio - Hasil Nyata Seller"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Testimonials</span>
            <h2 className={styles.sectionTitle}>
              Kata Mereka yang <span className={styles.gradientText}>Udah Coba</span>
            </h2>
            
            <div className={styles.grid3}>
              <div className={styles.testiCard}>
                <div className={styles.testiStars}>★★★★★</div>
                <blockquote>
                  "Dulu upload 3x seminggu udah ngos-ngosan. Sekarang upload 2x sehari santai. Views naik 400% dalam 2 minggu."
                </blockquote>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>R</div>
                  <div>
                    <strong>Rina S.</strong>
                    <span>Seller Fashion, Bandung</span>
                  </div>
                </div>
              </div>
              <div className={styles.testiCard}>
                <div className={styles.testiStars}>★★★★★</div>
                <blockquote>
                  "Gue skeptis awalnya. Ternyata video AI ini performanya lebih bagus dari video yang gue edit sendiri berjam-jam. Mind blown."
                </blockquote>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>A</div>
                  <div>
                    <strong>Andi W.</strong>
                    <span>Dropshipper, Jakarta</span>
                  </div>
                </div>
              </div>
              <div className={styles.testiCard}>
                <div className={styles.testiStars}>★★★★★</div>
                <blockquote>
                  "ROI paling gila. Bayar 49K, dapat 12 video yang hasilin omset jutaan. Ini game changer buat UMKM."
                </blockquote>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>D</div>
                  <div>
                    <strong>Dewi L.</strong>
                    <span>UMKM Kuliner, Surabaya</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <div className={styles.statNum}>500+</div>
                <div className={styles.statLabel}>Active Sellers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>12K+</div>
                <div className={styles.statLabel}>Videos Generated</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>4.8★</div>
                <div className={styles.statLabel}>Average Rating</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>3x</div>
                <div className={styles.statLabel}>Avg Views Increase</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Giliran Kamu <span className={styles.gradientText}>Buktiin</span>
            </h2>
            <p className={styles.subtitle}>Join 500+ seller yang udah rasain hasilnya.</p>
            <a href="https://saas.aitradepulse.com/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              ⭐ Coba Gratis Sekarang
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
