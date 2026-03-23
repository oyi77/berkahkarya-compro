interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

export default function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: '1.75rem',
        borderLeft: '3px solid var(--accent)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '3rem',
          lineHeight: 1,
          color: 'var(--accent)',
          opacity: 0.4,
          marginBottom: '-0.5rem',
        }}
      >
        &ldquo;
      </div>

      <p
        style={{
          margin: 0,
          fontStyle: 'italic',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--light-300, #999)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {quote}
      </p>

      <div style={{ marginTop: 'auto' }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#fff',
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: 0,
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
