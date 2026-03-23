import Link from 'next/link';

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  dark?: boolean;
}

export default function HeroSection({
  badge,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  dark = true,
}: HeroSectionProps) {
  return (
    <section
      className={dark ? 'section-dark' : 'section-light'}
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '6rem 1.5rem 4rem',
      }}
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.12) 0%, rgba(20,184,166,0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="section-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {badge && (
          <span
            className="badge badge-accent"
            style={{ marginBottom: '0.5rem' }}
          >
            {badge}
          </span>
        )}

        <h1
          className="text-hero"
          dangerouslySetInnerHTML={{ __html: title }}
          style={{ margin: 0 }}
        />

        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: 1.7,
            color: dark
              ? 'var(--light-300, rgba(255,255,255,0.65))'
              : 'var(--dark-500)',
            maxWidth: 640,
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          {subtitle}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="btn btn-outline"
                style={{ textDecoration: 'none' }}
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
