import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/prelander.module.css';

type Locale = 'id' | 'en';
export const getStaticPaths: GetStaticPaths = async () => ({ paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }], fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { locale: (params?.locale as Locale) || 'id' } });

export default function AIVideoStudioPreLander({ locale }: { locale: Locale }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours from now
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const word = locale === 'id' ? 'VIRAL.' : 'VIRAL.';
  const timerText = locale === 'id' ? 'Promo berakhir dalam' : 'Offer ends in';
  const cta = locale === 'id' ? '🔥 Klaim Sekarang' : '🔥 Claim Now';
  const urgency = locale === 'id' ? '⚡ Hanya 50 slot tersisa hari ini' : '⚡ Only 50 slots left today';
  
  return (
    <Layout title="AI Video Studio — Viral" description="Bikin konten viral dalam hitungan menit">
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.word}>{word}</h1>
          
          <div className={styles.timer}>
            <p className={styles.timerLabel}>{timerText}</p>
            <div className={styles.timerBoxes}>
              <div className={styles.timerBox}>
                <span className={styles.timerValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.timerUnit}>{locale === 'id' ? 'JAM' : 'HRS'}</span>
              </div>
              <span className={styles.timerSep}>:</span>
              <div className={styles.timerBox}>
                <span className={styles.timerValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.timerUnit}>{locale === 'id' ? 'MENIT' : 'MIN'}</span>
              </div>
              <span className={styles.timerSep}>:</span>
              <div className={styles.timerBox}>
                <span className={styles.timerValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className={styles.timerUnit}>{locale === 'id' ? 'DETIK' : 'SEC'}</span>
              </div>
            </div>
          </div>

          <a href="https://saas.aitradepulse.com/" className={styles.cta} target="_blank" rel="noopener noreferrer">
            {cta}
          </a>

          <p className={styles.urgency}>{urgency}</p>
        </div>
      </section>
    </Layout>
  );
}
