import Link from 'next/link';

interface Tier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

interface PricingTableProps {
  tiers: Tier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        alignItems: 'stretch',
      }}
      className="pricing-grid"
    >
      {tiers.map((tier, index) => (
        <div
          key={index}
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            position: 'relative',
            borderColor: tier.popular
              ? 'var(--primary)'
              : 'rgba(255,255,255,0.08)',
            transform: tier.popular ? 'scale(1.04)' : 'none',
            zIndex: tier.popular ? 2 : 1,
          }}
        >
          {tier.popular && (
            <span
              className="badge badge-primary"
              style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Popular
            </span>
          )}

          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            {tier.name}
          </h3>

          <div style={{ marginBottom: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '2rem',
                color: '#fff',
              }}
            >
              {tier.price}
            </span>
          </div>

          <p
            style={{
              margin: '0 0 1.5rem',
              fontSize: '0.8rem',
              color: 'var(--light-300)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {tier.period}
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            {tier.features.map((feature, fIdx) => (
              <li
                key={fIdx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--light-300)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: 'var(--accent)',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '0.1rem',
                  }}
                  aria-hidden="true"
                >
                  &#10003;
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'}`}
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {tier.cta}
          </Link>
        </div>
      ))}

      <style jsx global>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          .pricing-grid > div {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
