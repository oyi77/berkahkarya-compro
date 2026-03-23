'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/src/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  lang: Locale;
}

const navLinks = [
  { label: 'Home', path: '' },
  { label: 'Products', path: 'products' },
  { label: 'Team', path: 'team' },
];

export default function Header({ lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${lang}`}
          style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
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

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="header-desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={`/${lang}${link.path ? `/${link.path}` : ''}`}
              style={{
                textDecoration: 'none',
                color: 'var(--light-300)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--light-300)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/products`}
            className="btn btn-primary"
            style={{
              fontSize: '0.8rem',
              padding: '0.4rem 1rem',
              textDecoration: 'none',
            }}
          >
            Get Started
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="header-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#fff',
              fontSize: '1.5rem',
              lineHeight: 1,
            }}
          >
            {menuOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="header-mobile-menu"
          style={{
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '1rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={`/${lang}${link.path ? `/${link.path}` : ''}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'var(--light-300)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
