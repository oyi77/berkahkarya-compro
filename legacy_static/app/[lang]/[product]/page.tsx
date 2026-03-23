import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/src/lib/i18n';
import type { Locale } from '@/src/lib/i18n';
import { products } from '@/src/data/products';
import HeroSection from '@/src/components/HeroSection';
import Section from '@/src/components/Section';
import PricingTable from '@/src/components/PricingTable';
import TestimonialCard from '@/src/components/TestimonialCard';

/* ------------------------------------------------------------------ */
/*  Static params — pre-render every locale x product combination     */
/* ------------------------------------------------------------------ */

const slugs = [
  'ai-video-studio',
  'adforge-ai',
  'ai-agent-pro',
  'algorithmic-trading',
  'digital-products',
] as const;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    slugs.map((product) => ({ lang, product })),
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ProductPage({
  params,
}: {
  params: { lang: Locale; product: string };
}) {
  const { lang, product: slug } = params;

  const product = products[lang]?.find((p) => p.slug === slug);
  if (!product) return notFound();

  const isId = lang === 'id';

  /* Derive CTA label from the popular pricing tier, fallback text */
  const popularTier = product.pricing.find((t) => t.popular);
  const ctaLabel = popularTier?.cta || (isId ? 'Mulai Sekarang' : 'Get Started');

  return (
    <>
      {/* ============================== 1. HERO (dark) ============================== */}
      <HeroSection
        badge={`${product.icon} ${product.title}`}
        title={product.heroTitle}
        subtitle={product.heroSubtitle}
        ctaPrimary={{ label: ctaLabel, href: '#pricing' }}
        dark
      />

      {/* ======================== 2. PROBLEM CARDS (light) ========================= */}
      <Section variant="light">
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem',
            color: 'var(--dark-900)',
          }}
        >
          {isId ? 'Masalah yang Kami Selesaikan' : 'Problems We Solve'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="grid-responsive-3"
        >
          {product.problems.map((problem, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--dark-700)',
                color: 'var(--text-on-dark)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius)',
                padding: '2rem',
              }}
            >
              <div
                style={{ fontSize: '2rem', marginBottom: '0.75rem' }}
                aria-hidden="true"
              >
                {problem.icon}
              </div>
              <h3
                className="text-card-title"
                style={{
                  margin: '0 0 0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                }}
              >
                {problem.title}
              </h3>
              <p
                className="text-muted"
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  opacity: 0.75,
                }}
              >
                {problem.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ======================= 3. SOLUTION STEPS (white) ========================= */}
      <Section variant="white">
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem',
            color: 'var(--dark-900)',
          }}
        >
          {isId ? 'Cara Kerja' : 'How It Works'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}
          className="grid-responsive-4"
        >
          {product.steps.map((step) => (
            <div
              key={step.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {step.num}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--dark-900)',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--dark-500)',
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ======================= 4. FEATURES GRID (light) ========================== */}
      <Section variant="light">
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem',
            color: 'var(--dark-900)',
          }}
        >
          {isId ? 'Fitur Unggulan' : 'Key Features'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="grid-responsive-3"
        >
          {product.features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 'var(--radius)',
                padding: '2rem',
              }}
            >
              <div
                style={{ fontSize: '2rem', marginBottom: '0.75rem' }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  margin: '0 0 0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: 'var(--dark-900)',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--dark-500)',
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ======================== 5. PRICING TABLE (dark) ========================== */}
      <Section variant="dark" id="pricing">
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem',
            color: '#fff',
          }}
        >
          {isId ? 'Pilih Paket Anda' : 'Choose Your Plan'}
        </h2>

        <PricingTable tiers={product.pricing} />
      </Section>

      {/* ======================== 6. TESTIMONIALS (white) ========================== */}
      <Section variant="white">
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem',
            color: 'var(--dark-900)',
          }}
        >
          {isId ? 'Apa Kata Mereka' : 'What They Say'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="grid-responsive-3"
        >
          {product.testimonials.map((t, idx) => (
            <TestimonialCard
              key={idx}
              name={t.name}
              role={t.role}
              quote={t.quote}
            />
          ))}
        </div>
      </Section>

      {/* ============================ 7. CTA (dark) =============================== */}
      <Section variant="dark">
        <div
          style={{
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#fff',
            }}
          >
            {isId ? 'Siap Memulai?' : 'Ready to Start?'}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--light-300, rgba(255,255,255,0.65))',
              fontFamily: 'var(--font-body)',
            }}
          >
            {isId
              ? 'Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat teknologi AI kami. Mulai perjalanan Anda hari ini.'
              : 'Join thousands of users already benefiting from our AI technology. Start your journey today.'}
          </p>
          <Link
            href="#contact"
            className="btn btn-primary"
            style={{ textDecoration: 'none', marginTop: '0.5rem' }}
          >
            {isId ? 'Hubungi Kami' : 'Contact Us'}
          </Link>
        </div>
      </Section>
    </>
  );
}
