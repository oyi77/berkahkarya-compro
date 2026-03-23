import type { Locale } from '@/src/lib/i18n';
import { locales } from '@/src/lib/i18n';
import { team } from '@/src/data/team';
import HeroSection from '@/src/components/HeroSection';
import Section from '@/src/components/Section';
import TeamCard from '@/src/components/TeamCard';
import CTASection from '@/src/components/CTASection';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

const workflowSteps: Record<Locale, WorkflowStep[]> = {
  id: [
    { number: 1, title: 'Konsultasi', description: 'Diskusi kebutuhan dan tantangan bisnis Anda bersama tim ahli kami.' },
    { number: 2, title: 'Riset & Strategi', description: 'Kami merancang solusi berbasis data yang sesuai dengan tujuan Anda.' },
    { number: 3, title: 'Eksekusi AI', description: 'Tim kami membangun dan mengimplementasikan solusi AI terbaik.' },
    { number: 4, title: 'Review & Optimasi', description: 'Evaluasi hasil dan optimasi berkelanjutan untuk performa maksimal.' },
  ],
  en: [
    { number: 1, title: 'Consultation', description: 'Discuss your business needs and challenges with our expert team.' },
    { number: 2, title: 'Research & Strategy', description: 'We design data-driven solutions tailored to your goals.' },
    { number: 3, title: 'AI Execution', description: 'Our team builds and implements the best AI solutions.' },
    { number: 4, title: 'Review & Optimization', description: 'Evaluate results and continuously optimize for maximum performance.' },
  ],
};

export default function TeamPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const members = team[lang];
  const steps = workflowSteps[lang];

  const heroContent = {
    id: {
      badge: 'Tim Kami',
      title: 'Dibalik Teknologi,<br>Ada <em style="color: var(--accent)">Tim Hebat</em>',
      subtitle:
        'Kami adalah tim engineer, desainer, dan strategist yang berdedikasi membangun ekosistem AI terbaik untuk bisnis Indonesia.',
    },
    en: {
      badge: 'Our Team',
      title: 'Behind the Technology,<br>An <em style="color: var(--accent)">Amazing Team</em>',
      subtitle:
        'We are a team of engineers, designers, and strategists dedicated to building the best AI ecosystem for Indonesian businesses.',
    },
  } as const;

  const teamGridTitle = lang === 'id' ? 'Kenali Tim Kami' : 'Meet Our Team';
  const workflowTitle = lang === 'id' ? 'Cara Kami Bekerja' : 'How We Work';

  const ctaContent = {
    id: {
      title: 'Siap Berkolaborasi?',
      subtitle: 'Hubungi tim kami untuk konsultasi gratis.',
      btnLabel: 'Hubungi Kami',
    },
    en: {
      title: 'Ready to Collaborate?',
      subtitle: 'Contact our team for a free consultation.',
      btnLabel: 'Contact Us',
    },
  } as const;

  return (
    <>
      {/* 1. Hero (dark) */}
      <HeroSection
        badge={heroContent[lang].badge}
        title={heroContent[lang].title}
        subtitle={heroContent[lang].subtitle}
        dark
      />

      {/* 2. Team Grid (light) */}
      <Section variant="light">
        <h2
          className="text-section-title"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {teamGridTitle}
        </h2>
        <div className="grid-3">
          {members.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              avatar={member.avatar}
            />
          ))}
        </div>
      </Section>

      {/* 3. Workflow Section (white) */}
      <Section variant="white">
        <h2
          className="text-section-title"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {workflowTitle}
        </h2>
        <div className="grid-4">
          {steps.map((step) => (
            <div
              key={step.number}
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
                  background: 'var(--accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {step.number}
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
                className="text-secondary"
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. CTA (dark) */}
      <CTASection
        title={ctaContent[lang].title}
        subtitle={ctaContent[lang].subtitle}
        btnLabel={ctaContent[lang].btnLabel}
        btnHref="#contact"
        dark
      />
    </>
  );
}
