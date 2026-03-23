import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
import { contactData } from '@/data/contact';
import styles from '@/styles/contact.module.css';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function ContactPage({ locale }: { locale: Locale }) {
  const d = contactData[locale];
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} dark />
      <section className="light-bg">
        <div className={styles.container}>
          <div className={styles.grid}>
            {d.channels.map((ch) => (
              <a key={ch.name} href={ch.link} target="_blank" rel="noopener noreferrer" className={`card-light ${styles.card}`}>
                <span className={styles.icon}>{ch.icon}</span>
                <h3>{ch.name}</h3>
                <p className={styles.desc}>{ch.desc}</p>
                <span className={styles.link}>{ch.label}</span>
              </a>
            ))}
          </div>
          <div className={styles.office}>
            <h3>{d.office.title}</h3>
            <p>{d.office.address}</p>
            <p>{d.office.hours}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
