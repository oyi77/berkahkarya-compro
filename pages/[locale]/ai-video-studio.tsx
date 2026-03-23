import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/prelander.module.css';

type Locale = 'id' | 'en';
export const getStaticPaths: GetStaticPaths = async () => ({ paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }], fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { locale: (params?.locale as Locale) || 'id' } });

export default function AIVideoStudioPreLander({ locale }: { locale: Locale }) {
  const word = locale === 'id' ? 'VIRAL.' : 'VIRAL.';
  const cta = locale === 'id' ? '🚀 Mulai Sekarang' : '🚀 Start Now';
  
  return (
    <Layout title="AI Video Studio — Viral" description="Bikin konten viral dalam hitungan menit">
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.word}>{word}</h1>
          <a href="https://saas.aitradepulse.com/" className={styles.cta} target="_blank" rel="noopener noreferrer">
            {cta}
          </a>
        </div>
      </section>
    </Layout>
  );
}
