import type { Locale } from '@/src/lib/i18n';
import { homeContent } from '@/src/data/home';
import { products } from '@/src/data/products';
import HeroSection from '@/src/components/HeroSection';
import StatsGrid from '@/src/components/StatsGrid';
import ProductCard from '@/src/components/ProductCard';
import Section from '@/src/components/Section';
import CTASection from '@/src/components/CTASection';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ lang: 'id' }, { lang: 'en' }];
}

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const content = homeContent[lang];
  const productList = products[lang];

  const productsTitle = lang === 'id' ? 'Produk AI Kami' : 'Our AI Products';
  const pillarsTitle = lang === 'id' ? 'Pilar Ekosistem Kami' : 'Our Ecosystem Pillars';
  const teamTitle = lang === 'id' ? 'Tim Kami' : 'Our Team';
  const teamSubtitle =
    lang === 'id'
      ? 'Kenali orang-orang di balik ekosistem AI BerkahKarya.'
      : 'Meet the people behind the BerkahKarya AI ecosystem.';
  const teamBtnLabel = lang === 'id' ? 'Lihat Tim Kami' : 'Meet Our Team';

  return (
    <>
      {/* 1. Hero (dark) */}
      <HeroSection
        badge={content.hero.badge}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        ctaPrimary={{ label: content.hero.ctaPrimary, href: `/${lang}/ai-video-studio` }}
        ctaSecondary={{ label: content.hero.ctaSecondary, href: `/${lang}/team` }}
      />

      {/* 2. Stats (dark) */}
      <div
        style={{
          background: 'var(--dark-800, #141414)',
          padding: '3rem 1.5rem',
        }}
      >
        <div className="section-inner">
          <StatsGrid stats={content.stats} dark />
        </div>
      </div>

      {/* 3. Products (light) */}
      <Section variant="light">
        <h2
          className="text-section-title"
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          {productsTitle}
        </h2>
        <div className="grid-3">
          {productList.map((product) => (
            <ProductCard
              key={product.slug}
              icon={product.icon}
              title={product.title}
              tagline={product.tagline}
              href={`/${lang}/${product.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* 4. Pillars (white) */}
      <Section variant="white">
        <h2
          className="text-section-title"
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          {pillarsTitle}
        </h2>
        <div className="grid-3">
          {content.pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <span
                className="badge badge-accent"
                style={{ alignSelf: 'flex-start' }}
              >
                {pillar.num}
              </span>
              <h3 className="text-card-title" style={{ margin: 0 }}>
                {pillar.title}
              </h3>
              <p
                className="text-secondary"
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Team Teaser (light) */}
      <Section variant="light">
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h2 className="text-section-title" style={{ margin: 0 }}>
            {teamTitle}
          </h2>
          <p
            className="text-secondary"
            style={{
              margin: 0,
              maxWidth: 560,
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            {teamSubtitle}
          </p>
          <Link
            href={`/${lang}/team`}
            className="btn btn-outline-dark"
            style={{ textDecoration: 'none', marginTop: '0.5rem' }}
          >
            {teamBtnLabel}
          </Link>
        </div>
      </Section>

      {/* 6. CTA (dark) */}
      <CTASection
        title={content.ctaSection.title}
        subtitle={content.ctaSection.subtitle}
        btnLabel={content.ctaSection.btnLabel}
        btnHref="#contact"
      />
    </>
  );
}
