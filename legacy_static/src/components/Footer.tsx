import Link from 'next/link';
import type { Locale } from '@/src/lib/i18n';

interface FooterProps {
  lang: Locale;
}

const productLinks = [
  { label: 'AI Agent Pro', path: 'products/ai-agent-pro' },
  { label: 'AI Video Studio', path: 'products/ai-video-studio' },
  { label: 'Trading Signal', path: 'products/trading-signal' },
  { label: 'Digital Marketing', path: 'products/digital-marketing' },
  { label: 'TikTok Ads', path: 'products/tiktok-ads' },
];

const companyLinks = [
  { label: 'Team', path: 'team' },
  { label: 'Blog', path: 'blog' },
  { label: 'Contact', path: 'contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: 'privacy' },
  { label: 'Terms of Service', path: 'terms' },
];

const socialLinks = [
  { label: 'Instagram', url: '#', icon: 'IG' },
  { label: 'TikTok', url: '#', icon: 'TK' },
  { label: 'YouTube', url: '#', icon: 'YT' },
  { label: 'LinkedIn', url: '#', icon: 'LI' },
];

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'var(--light-300)',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-body)',
  lineHeight: 2,
  transition: 'color 0.2s ease',
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '1rem',
  color: '#fff',
  marginBottom: '1rem',
};

export default function Footer({ lang }: FooterProps) {
  return (
    <footer
      style={{
        background: 'var(--dark-900)',
        padding: '4rem 1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
        }}
        className="footer-grid"
      >
        {/* Brand Column */}
        <div>
          <Link
            href={`/${lang}`}
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '1.5rem',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ color: '#fff' }}>Berkah</span>
            <span
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Karya
            </span>
          </Link>
          <p
            style={{
              color: 'var(--light-300)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              maxWidth: 280,
            }}
          >
            Empowering Indonesian entrepreneurs with AI-powered business tools
            for the digital era.
          </p>
        </div>

        {/* Products Column */}
        <div>
          <h4 style={headingStyle}>Products</h4>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {productLinks.map((link) => (
              <Link
                key={link.path}
                href={`/${lang}/${link.path}`}
                style={linkStyle}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Company Column */}
        <div>
          <h4 style={headingStyle}>Company</h4>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {companyLinks.map((link) => (
              <Link
                key={link.path}
                href={`/${lang}/${link.path}`}
                style={linkStyle}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal Column */}
        <div>
          <h4 style={headingStyle}>Legal</h4>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                href={`/${lang}/${link.path}`}
                style={linkStyle}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: '3rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            color: 'var(--light-300)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-body)',
            margin: 0,
          }}
        >
          &copy; {new Date().getFullYear()} BerkahKarya. All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              aria-label={social.label}
              style={{
                color: 'var(--light-300)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '0.35rem 0.6rem',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.05)',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
