import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import StatsRow from '@/components/StatsRow';
import ProblemSection from '@/components/ProblemSection';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TestimonialSection from '@/components/TestimonialSection';
import { belajaraiData } from '@/data/belajarai';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function BelajarAIPage({ locale }: { locale: Locale }) {
  const d = belajaraiData[locale];
  const isId = locale === 'id';

  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      {/* Hero */}
      <HeroSection
        eyebrow={d.hero.eyebrow}
        title={d.hero.title}
        description={d.hero.description}
        buttons={[...d.hero.buttons]}
        dark
        character={{ src: '/characters/vilona-side.jpg', alt: 'Belajar AI' }}
      />

      {/* Stats Bar */}
      <StatsRow items={[...d.stats]} />

      {/* Problem Section */}
      {d.problem && (
        <ProblemSection
          hook={d.problem.hook}
          pains={[...d.problem.pains]}
          bridge={d.problem.bridge}
        />
      )}

      {/* For Whom - 3 Target Segments */}
      {d.forWhom && (
        <section className="dark-bg" style={{ padding: '6rem 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
            <p className="eyebrow" style={{ textAlign: 'center', width: '100%' }}>🎯 TARGET AUDIENCE</p>
            <h2 style={{
              textAlign: 'center', fontSize: '2.5rem', fontWeight: 800,
              fontFamily: 'var(--font-heading)', marginBottom: '0.75rem'
            }}>{d.forWhom.title}</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem', marginTop: '3rem'
            }}>
              {d.forWhom.items.map((item: { icon: string; title: string; desc: string; pct: string }) => (
                <div key={item.title} className="card-dark" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <span style={{
                    display: 'inline-block', background: 'linear-gradient(135deg, var(--teal-primary), var(--violet-light))',
                    color: '#000', borderRadius: '999px', padding: '0.25rem 0.75rem', fontSize: '0.8rem',
                    fontWeight: 700, marginBottom: '0.75rem'
                  }}>{item.pct}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-white-70)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curriculum: 6 Modul Inti */}
      {d.curriculum && (
        <section className="dark-bg" id="kurikulum" style={{ padding: '6rem 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
            <p className="eyebrow" style={{ textAlign: 'center', width: '100%' }}>📚 KURIKULUM</p>
            <h2 style={{
              textAlign: 'center', fontSize: '2.5rem', fontWeight: 800,
              fontFamily: 'var(--font-heading)', marginBottom: '0.75rem'
            }}>{d.curriculum.title}</h2>
            <p style={{
              textAlign: 'center', color: 'var(--text-white-60)', fontSize: '1rem',
              maxWidth: 600, margin: '0 auto 3rem'
            }}>{d.curriculum.subtitle}</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {d.curriculum.modules.map((m: { icon: string; title: string; desc: string }) => (
                <div key={m.title} className="card-dark" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '2rem', flexShrink: 0, marginTop: '0.15rem' }}>{m.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{m.title}</h3>
                    <p style={{ color: 'var(--text-white-70)', fontSize: '0.85rem', lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Track */}
      {d.technicalTrack && (
        <section className="dark-bg" style={{ padding: '6rem 0', background: 'var(--dark-secondary)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
            <p className="eyebrow" style={{ textAlign: 'center', width: '100%' }}>⚡ TECHNICAL TRACK</p>
            <h2 style={{
              textAlign: 'center', fontSize: '2.5rem', fontWeight: 800,
              fontFamily: 'var(--font-heading)', marginBottom: '0.75rem'
            }}>{d.technicalTrack.title}</h2>
            <p style={{
              textAlign: 'center', color: 'var(--text-white-60)', fontSize: '1rem',
              maxWidth: 700, margin: '0 auto 3rem'
            }}>{d.technicalTrack.subtitle}</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}>
              {d.technicalTrack.items.map((item: { icon: string; title: string; desc: string }) => (
                <div key={item.title} className="card-dark" style={{ padding: '1.75rem' }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-white-70)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <span style={{
                display: 'inline-block', padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #7C3AED, #00D9FF)',
                color: '#fff', borderRadius: '10px', fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                👑 Tersedia Eksklusif di Platinum Pass
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Specializations: Trading & Affiliate */}
      {d.specializations && (
        <section className="dark-bg" style={{ padding: '6rem 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
            <p className="eyebrow" style={{ textAlign: 'center', width: '100%' }}>🚀 SPESIALISASI</p>
            <h2 style={{
              textAlign: 'center', fontSize: '2.5rem', fontWeight: 800,
              fontFamily: 'var(--font-heading)', marginBottom: '0.75rem'
            }}>{d.specializations.title}</h2>
            <p style={{
              textAlign: 'center', color: 'var(--text-white-60)', fontSize: '1rem',
              maxWidth: 600, margin: '0 auto 3rem'
            }}>{d.specializations.subtitle}</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {d.specializations.items.map((item: { icon: string; title: string; desc: string; badge: string }) => (
                <div key={item.title} className="card-dark" style={{
                  padding: '2rem', position: 'relative', overflow: 'hidden',
                  border: '1px solid rgba(124,58,237,0.25)'
                }}>
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'linear-gradient(135deg, var(--gold), #F97316)',
                    color: '#000', borderRadius: '999px', padding: '0.3rem 0.75rem',
                    fontSize: '0.75rem', fontWeight: 700
                  }}>{item.badge}</span>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-white-70)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <HowItWorks title={d.howItWorks.title} steps={[...d.howItWorks.steps]} />

      {/* Pricing */}
      <PricingTable tiers={d.pricing.map(t => ({ ...t, features: [...t.features], cta: { ...t.cta } }))} />

      {/* Testimonials */}
      {d.testimonials && (
        <TestimonialSection title={d.testimonials.title} items={[...d.testimonials.items]} />
      )}

      {/* FAQ */}
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />

      {/* CTA */}
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
