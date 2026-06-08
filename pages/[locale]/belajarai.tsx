import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
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

/* ─── Tripay Checkout Modal ─── */
function TripayModal({ plan, locale, onClose }: { plan: any; locale: 'id' | 'en'; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const isId = locale === 'id';

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create-tripay-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.data_plan, customer_name: name, customer_email: email, customer_phone: phone, method: 'QRIS' }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Transaction failed');
        setLoading(false);
        return;
      }
      setResult(data);
      setLoading(false);
    } catch (e: any) {
      setError(e.message || 'Network error');
      setLoading(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!plan) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)', padding: '1rem',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--dark-secondary)', borderRadius: '1rem',
        maxWidth: 440, width: '100%', padding: '2rem',
        border: '1px solid rgba(124,58,237,0.3)', position: 'relative',
        maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', color: 'var(--text-white-60)',
          fontSize: '1.5rem', cursor: 'pointer',
        }}>✕</button>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>{plan.name}</h3>
        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal-primary)', marginBottom: '1.5rem' }}>
          {plan.price} <span style={{ fontSize: '0.9rem', color: 'var(--text-white-60)', fontWeight: 400 }}>{plan.period}</span>
        </p>

        {!result ? (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-white-60)', marginBottom: '0.3rem' }}>
                {isId ? 'Nama *' : 'Name *'}
              </label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder={isId ? 'Nama lengkap' : 'Full name'}
                style={inputStyle} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-white-60)', marginBottom: '0.3rem' }}>
                Email *
              </label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" type="email"
                style={inputStyle} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-white-60)', marginBottom: '0.3rem' }}>
                {isId ? 'No. WhatsApp (opsional)' : 'WhatsApp (optional)'}
              </label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xxxxxxxxxx"
                style={inputStyle} />
            </div>

            <div style={{
              background: 'rgba(29,158,117,0.1)', borderRadius: '0.75rem',
              padding: '0.75rem 1rem', marginBottom: '1.5rem',
              fontSize: '0.8rem', color: 'var(--teal-primary)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>💳 {isId ? 'Pembayaran via QRIS' : 'Pay via QRIS'}</span>
              <span style={{ color: 'var(--text-white-70)' }}>{plan.price}</span>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem',
                marginBottom: '1rem',
              }}>{error}</div>
            )}

            <button onClick={handleSubmit} disabled={loading || !name || !email} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem',
              border: 'none', background: loading ? 'var(--text-white-30)' : 'linear-gradient(135deg, var(--teal-primary), var(--violet-light))',
              color: loading ? '#888' : '#fff', fontSize: '1rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? (isId ? 'Memproses...' : 'Processing...') : (isId ? `Bayar ${plan.price} via QRIS` : `Pay ${plan.price} via QRIS`)}
            </button>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-white-50)', textAlign: 'center', marginTop: '1rem' }}>
              {isId
                ? 'Atau chat Paijo di Telegram @codergaboets untuk metode bayar lain'
                : 'Or chat Paijo on Telegram @codergaboets for other payment methods'}
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {isId ? 'Pesanan Dibuat!' : 'Order Created!'}
            </h4>
            <p style={{ color: 'var(--text-white-70)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {isId ? 'Scan QRIS atau klik link di bawah untuk bayar:' : 'Scan QRIS or click the link below to pay:'}
            </p>

            {result.checkout_url ? (
              <a href={result.checkout_url} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', padding: '0.9rem', borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, var(--teal-primary), var(--violet-light))',
                color: '#fff', fontWeight: 700, textDecoration: 'none',
                marginBottom: '1rem', fontSize: '0.95rem',
              }}>
                🔗 {isId ? 'Buka Halaman Pembayaran' : 'Open Payment Page'}
              </a>
            ) : null}

            {result.pay_code && (
              <div style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem',
                padding: '1rem', marginBottom: '1rem',
              }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-white-60)', marginBottom: '0.3rem' }}>
                  {isId ? 'Kode Bayar / VA:' : 'Payment Code / VA:'}
                </p>
                <p style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.1em' }}>{result.pay_code}</p>
                <button onClick={() => handleCopy(result.pay_code, 'pay_code')} style={{
                  background: 'rgba(29,158,117,0.2)', border: 'none', color: 'var(--teal-primary)',
                  padding: '0.4rem 1rem', borderRadius: '0.5rem', cursor: 'pointer',
                  marginTop: '0.5rem', fontSize: '0.85rem',
                }}>
                  {copied === 'pay_code' ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--text-white-50)' }}>
              {isId ? 'Setelah bayar, chat Paijo di @codergaboets untuk akses materi.' : 'After payment, DM Paijo on @codergaboets for material access.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.7rem 0.9rem', borderRadius: '0.5rem',
  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)',
  color: '#fff', fontSize: '0.95rem', outline: 'none',
  boxSizing: 'border-box',
};

/* ─── Founder Section ─── */
function FounderSection({ d, isId }: { d: any; isId: boolean }) {
  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, var(--dark-primary) 0%, rgba(124,58,237,0.03) 50%, var(--dark-secondary) 100%)',
      borderTop: '1px solid rgba(124,58,237,0.1)',
      borderBottom: '1px solid rgba(124,58,237,0.1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <p className="eyebrow" style={{ textAlign: 'center', width: '100%', marginBottom: '0.75rem' }}>
          🧑‍💻 TENTANG MENTOR
        </p>
        <h2 style={{
          textAlign: 'center', fontSize: '2.5rem', fontWeight: 800,
          fontFamily: 'var(--font-heading)', marginBottom: '0.5rem',
        }}>
          Belajar Langsung dari <span style={{ background: 'linear-gradient(135deg, var(--teal-primary), #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Praktisi</span>
        </h2>
        <p style={{
          textAlign: 'center', color: 'var(--text-white-60)', fontSize: '1rem',
          marginBottom: '3rem',
        }}>{d.tagline}</p>

        {/* Stats Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem', marginBottom: '3rem',
        }}>
          {d.stats.map((s: any) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '1rem',
              padding: '1.5rem', textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal-primary)' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-white-60)', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{
          maxWidth: 800, margin: '0 auto 3rem',
          background: 'rgba(124,58,237,0.05)', borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid rgba(124,58,237,0.15)',
        }}>
          <p style={{ color: 'var(--text-white-80)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            {d.bio}
          </p>
        </div>

        {/* OSS Achievements */}
        <h3 style={{
          textAlign: 'center', fontSize: '1.1rem', fontWeight: 700,
          marginBottom: '1.25rem', color: 'var(--text-white-70)',
        }}>
          ⭐ Kontribusi Open Source
        </h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '0.75rem',
        }}>
          {d.achievements.map((a: any) => (
            <div key={a.text} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem',
              padding: '0.85rem 1.15rem',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{a.icon}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-white-80)', lineHeight: 1.4 }}>{a.text}</span>
            </div>
          ))}
        </div>

        {/* Telegram CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href={`https://t.me/codergaboets`} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.85rem 2rem', borderRadius: '999px',
            background: 'var(--accent-gradient)',
            color: '#000', fontWeight: 700, textDecoration: 'none',
            fontSize: '0.95rem',
          }}>
            💬 Chat @codergaboets — Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Payment Info Section ─── */
function PaymentInfoSection({ d, isId }: { d: any; isId: boolean }) {
  return (
    <section style={{ padding: '4rem 0', background: 'var(--dark-secondary)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          {d.paymentInfo.title}
        </h3>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          {d.paymentInfo.methods.map((m: string) => (
            <span key={m} style={{
              background: 'rgba(29,158,117,0.1)', borderRadius: '999px',
              padding: '0.5rem 1rem', fontSize: '0.85rem',
              color: 'var(--teal-primary)', border: '1px solid rgba(29,158,117,0.2)',
            }}>{m}</span>
          ))}
        </div>
        <p style={{ color: 'var(--text-white-60)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          {d.paymentInfo.note}
        </p>
        <a href={d.paymentInfo.telegram} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: 'var(--teal-primary)', textDecoration: 'none',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          💬 {isId ? 'Ada kendala bayar? Chat Paijo' : 'Payment issue? Chat Paijo'}
        </a>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function BelajarAIPage({ locale }: { locale: Locale }) {
  const d = belajaraiData[locale];
  const isId = locale === 'id';
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      const btn = e.target.closest('[data-plan]');
      if (btn) {
        const planId = btn.getAttribute('data-plan');
        const plan = d.pricing.find((p: any) => p.id === planId);
        if (plan) setSelectedPlan(plan);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [d.pricing]);

  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      {/* Hero */}
      <HeroSection
        eyebrow={d.hero.eyebrow}
        title={d.hero.title}
        description={d.hero.description}
        buttons={[...d.hero.buttons]}
        dark
        badges={d.hero.badges}
        character={{ src: '/characters/vilona-side.jpg', alt: 'Belajar AI' }}
      />

      {/* Founder Section */}
      {d.founder && <FounderSection d={d.founder} isId={isId} />}

      {/* Stats */}
      <StatsRow items={[...d.stats]} />

      {/* Problem Section */}
      {d.problem && (
        <ProblemSection
          hook={d.problem.hook}
          pains={[...d.problem.pains]}
          bridge={d.problem.bridge}
        />
      )}

      {/* For Whom */}
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

      {/* Curriculum */}
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

      {/* Specializations */}
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

      {/* Pricing with Tripay */}
      <section id="pricing">
        <PricingTable tiers={d.pricing.map((t: any) => ({
          ...t,
          features: [...t.features],
          cta: { ...t.cta, href: '#' },
        }))} />
      </section>

      {/* Payment Info */}
      {d.paymentInfo && <PaymentInfoSection d={d} isId={isId} />}

      {/* Testimonials */}
      {d.testimonials && (
        <TestimonialSection title={d.testimonials.title} items={[...d.testimonials.items]} />
      )}

      {/* FAQ */}
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />

      {/* Contact CTA */}
      {d.contact && (
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, rgba(29,158,117,0.05), rgba(124,58,237,0.05))',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              {d.contact.telegram_text}
            </h2>
            <p style={{ color: 'var(--text-white-60)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {d.contact.telegram_sub}
            </p>
            <a href={d.contact.telegram} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 2rem', borderRadius: '999px',
              background: 'linear-gradient(135deg, #0088cc, #00a8e8)',
              color: '#fff', fontWeight: 700, textDecoration: 'none',
              fontSize: '1rem',
            }}>
              💬 @codergaboets
            </a>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        title={d.cta.title}
        description={d.cta.description}
        button={{ text: d.cta.button.text, href: d.cta.button.href }}
      />

      {/* Tripay Modal */}
      {selectedPlan && <TripayModal plan={selectedPlan} locale={locale} onClose={() => setSelectedPlan(null)} />}
    </Layout>
  );
}
