import Link from 'next/link';

interface CTASectionProps {
  title: string;
  subtitle: string;
  btnLabel: string;
  btnHref: string;
  dark?: boolean;
}

export default function CTASection({
  title,
  subtitle,
  btnLabel,
  btnHref,
  dark = true,
}: CTASectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        background: dark
          ? 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(10,10,10,1) 50%, rgba(20,184,166,0.1) 100%)'
          : 'var(--light-50)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <h2
          className="text-section-title"
          style={{
            margin: 0,
            color: dark ? '#fff' : 'var(--dark-900)',
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: dark
              ? 'var(--light-300, rgba(255,255,255,0.65))'
              : 'var(--dark-500)',
            fontFamily: 'var(--font-body)',
            maxWidth: 560,
          }}
        >
          {subtitle}
        </p>

        <Link
          href={btnHref}
          className="btn btn-accent"
          style={{
            textDecoration: 'none',
            marginTop: '0.75rem',
          }}
        >
          {btnLabel}
        </Link>
      </div>
    </section>
  );
}
