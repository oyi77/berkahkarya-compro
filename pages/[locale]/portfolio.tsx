import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
import styles from '@/styles/Portfolio.module.css';

type Locale = 'id' | 'en';

const portfolioData = {
  id: {
    meta: { 
      title: 'Portfolio — BerkahKarya', 
      description: 'Lihat hasil karya dan proyek yang sudah kami selesaikan untuk klien di berbagai industri.' 
    },
    hero: {
      eyebrow: '📂 PORTFOLIO',
      title: 'Karya Kami\nBerbicara',
      description: 'Setiap proyek adalah cerita sukses. Lihat bagaimana kami membantu bisnis berkembang dengan solusi AI, website, video, dan layanan digital lainnya.',
      buttons: [
        { text: 'Mulai Proyek →', href: 'https://wa.me/6285732740006?text=Halo%20BerkahKarya%2C%20saya%20tertarik%20dengan%20jasa%20Anda', primary: true },
        { text: 'Lihat Layanan', href: '#categories', primary: false },
      ],
    },
    categories: [
      {
        title: '🤖 AI & Automation',
        items: [
          { name: 'AI Video Studio', desc: 'Konten video AI untuk brand F&B — 50+ video/bulan', client: 'F&B Chain' },
          { name: 'Chatbot AI', desc: 'Customer service bot dengan 95% resolution rate', client: 'E-commerce Startup' },
          { name: 'AI Agent Pro', desc: 'Asisten AI untuk operasional internal', client: 'Tech Company' },
        ],
      },
      {
        title: '🌐 Website Development',
        items: [
          { name: 'Company Profile', desc: 'Website profesional dengan CMS', client: 'Manufacturing Co.' },
          { name: 'E-commerce Platform', desc: 'Toko online dengan payment gateway', client: 'Fashion Brand' },
          { name: 'SaaS Dashboard', desc: 'Admin panel untuk aplikasi SaaS', client: 'Fintech Startup' },
        ],
      },
      {
        title: '🎬 Video Production',
        items: [
          { name: 'Product Video', desc: 'Video produk untuk marketplace', client: 'Consumer Electronics' },
          { name: 'Company Profile Video', desc: 'Video company profile 3 menit', client: 'Construction Firm' },
          { name: 'Social Media Content', desc: 'Konten video TikTok/Reels', client: 'Beauty Brand' },
        ],
      },
      {
        title: '📱 Social Media',
        items: [
          { name: 'Content Strategy', desc: 'Strategi konten + eksekusi 30 post/bulan', client: 'Hospitality' },
          { name: 'Influencer Campaign', desc: 'Koordinasi 20 influencer, reach 5M+', client: 'FMCG Brand' },
          { name: 'Community Management', desc: 'Kelola komunitas 50K+ member', client: 'Gaming Company' },
        ],
      },
      {
        title: '🔍 Research & Security',
        items: [
          { name: 'Competitor Analysis', desc: 'Analisis 10 kompetitor + rekomendasi', client: 'SaaS Company' },
          { name: 'Security Audit', desc: 'Penetration testing + vulnerability report', client: 'Banking App' },
          { name: 'Market Research', desc: 'Riset pasar untuk ekspansi regional', client: 'Retail Chain' },
        ],
      },
      {
        title: '📈 Trading & Fintech',
        items: [
          { name: 'Trading Bot', desc: 'Algorithmic trading XAUUSD', client: 'Hedge Fund' },
          { name: 'API Integration', desc: 'OmniRoute multi-LLM gateway', client: 'AI Startup' },
          { name: 'Payment System', desc: 'Custom payment gateway integration', client: 'Marketplace' },
        ],
      },
    ],
    stats: [
      { value: '150+', label: 'Proyek Selesai' },
      { value: '50+', label: 'Klien Puas' },
      { value: '98%', label: 'Tingkat Kepuasan' },
      { value: '24/7', label: 'Support' },
    ],
    cta: {
      title: 'Siap Jadi Bagian dari Portfolio Kami?',
      description: 'Konsultasi gratis 15 menit. Ceritakan proyek Anda dan lihat bagaimana kami bisa membantu.',
      button: { text: 'Konsultasi Gratis →', href: 'https://wa.me/6285732740006?text=Halo%20BerkahKarya%2C%20saya%20mau%20konsultasi%20proyek' },
    },
  },
  en: {
    meta: { 
      title: 'Portfolio — BerkahKarya', 
      description: 'See our work and completed projects for clients across various industries.' 
    },
    hero: {
      eyebrow: '📂 PORTFOLIO',
      title: 'Our Work\nSpeaks',
      description: 'Every project is a success story. See how we help businesses grow with AI solutions, websites, video, and other digital services.',
      buttons: [
        { text: 'Start Project →', href: 'https://wa.me/6285732740006?text=Hello%20BerkahKarya%2C%20I%20am%20interested%20in%20your%20services', primary: true },
        { text: 'View Services', href: '#categories', primary: false },
      ],
    },
    categories: [
      {
        title: '🤖 AI & Automation',
        items: [
          { name: 'AI Video Studio', desc: 'AI video content for F&B brand — 50+ videos/month', client: 'F&B Chain' },
          { name: 'AI Chatbot', desc: 'Customer service bot with 95% resolution rate', client: 'E-commerce Startup' },
          { name: 'AI Agent Pro', desc: 'AI assistant for internal operations', client: 'Tech Company' },
        ],
      },
      {
        title: '🌐 Website Development',
        items: [
          { name: 'Company Profile', desc: 'Professional website with CMS', client: 'Manufacturing Co.' },
          { name: 'E-commerce Platform', desc: 'Online store with payment gateway', client: 'Fashion Brand' },
          { name: 'SaaS Dashboard', desc: 'Admin panel for SaaS application', client: 'Fintech Startup' },
        ],
      },
      {
        title: '🎬 Video Production',
        items: [
          { name: 'Product Video', desc: 'Product videos for marketplace', client: 'Consumer Electronics' },
          { name: 'Company Profile Video', desc: '3-minute company profile video', client: 'Construction Firm' },
          { name: 'Social Media Content', desc: 'TikTok/Reels video content', client: 'Beauty Brand' },
        ],
      },
      {
        title: '📱 Social Media',
        items: [
          { name: 'Content Strategy', desc: 'Content strategy + execution 30 posts/month', client: 'Hospitality' },
          { name: 'Influencer Campaign', desc: 'Coordinated 20 influencers, 5M+ reach', client: 'FMCG Brand' },
          { name: 'Community Management', desc: 'Managed 50K+ member community', client: 'Gaming Company' },
        ],
      },
      {
        title: '🔍 Research & Security',
        items: [
          { name: 'Competitor Analysis', desc: 'Analysis of 10 competitors + recommendations', client: 'SaaS Company' },
          { name: 'Security Audit', desc: 'Penetration testing + vulnerability report', client: 'Banking App' },
          { name: 'Market Research', desc: 'Market research for regional expansion', client: 'Retail Chain' },
        ],
      },
      {
        title: '📈 Trading & Fintech',
        items: [
          { name: 'Trading Bot', desc: 'XAUUSD algorithmic trading', client: 'Hedge Fund' },
          { name: 'API Integration', desc: 'OmniRoute multi-LLM gateway', client: 'AI Startup' },
          { name: 'Payment System', desc: 'Custom payment gateway integration', client: 'Marketplace' },
        ],
      },
    ],
    stats: [
      { value: '150+', label: 'Projects Completed' },
      { value: '50+', label: 'Happy Clients' },
      { value: '98%', label: 'Satisfaction Rate' },
      { value: '24/7', label: 'Support' },
    ],
    cta: {
      title: 'Ready to Be Part of Our Portfolio?',
      description: 'Free 15-minute consultation. Tell us about your project and see how we can help.',
      button: { text: 'Free Consultation →', href: 'https://wa.me/6285732740006?text=Hello%20BerkahKarya%2C%20I%20want%20project%20consultation' },
    },
  },
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function Portfolio({ locale }: { locale: Locale }) {
  const d = portfolioData[locale];

  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection
        eyebrow={d.hero.eyebrow}
        title={d.hero.title}
        description={d.hero.description}
        buttons={d.hero.buttons}
        dark
      />

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {d.stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className={styles.portfolio} id="categories">
        <div className={styles.container}>
          {d.categories.map((cat, i) => (
            <div key={i} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              <div className={styles.projectsGrid}>
                {cat.items.map((item, j) => (
                  <div key={j} className={styles.projectCard}>
                    <h3 className={styles.projectName}>{item.name}</h3>
                    <p className={styles.projectDesc}>{item.desc}</p>
                    <span className={styles.projectClient}>{item.client}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={d.cta.title}
        description={d.cta.description}
        button={d.cta.button}
      />
    </Layout>
  );
}
