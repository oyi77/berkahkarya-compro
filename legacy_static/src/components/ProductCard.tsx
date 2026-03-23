import Link from 'next/link';

interface ProductCardProps {
  icon: string;
  title: string;
  tagline: string;
  href: string;
}

export default function ProductCard({ icon, title, tagline, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="card"
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1.75rem',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
        el.style.borderColor = 'rgba(220,38,38,0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
        el.style.borderColor = 'transparent';
      }}
    >
      <span style={{ fontSize: '3rem', lineHeight: 1 }} aria-hidden="true">
        {icon}
      </span>

      <h3 className="text-card-title" style={{ margin: 0 }}>
        {title}
      </h3>

      <p
        style={{
          color: 'var(--light-300, #999)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {tagline}
      </p>

      <span
        style={{
          color: 'var(--primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          marginTop: 'auto',
          paddingTop: '0.5rem',
        }}
      >
        Pelajari Selengkapnya &rarr;
      </span>
    </Link>
  );
}
