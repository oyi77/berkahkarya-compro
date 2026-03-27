import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from './Header.module.css';

interface NavItem {
  slug: string;
  id: string;
  en: string;
  children?: NavItem[];
}

const navLinks: NavItem[] = [
  { slug: '', id: 'Beranda', en: 'Home' },
  { slug: 'team', id: 'Tentang Kami', en: 'About Us' },
  { slug: 'portfolio', id: 'Portfolio', en: 'Portfolio' },
  {
    slug: 'services',
    id: 'Produk & Jasa',
    en: 'Products & Services',
    children: [
      // AI & Automation
      { slug: '__divider__', id: '🤖 AI & Otomasi', en: '🤖 AI & Automation' },
      { slug: 'ai-video-studio', id: 'Video AI Studio', en: 'AI Video Studio' },
      { slug: 'ai-agent-pro', id: 'AI Agent Pro', en: 'AI Agent Pro' },
      { slug: 'ai-automation', id: 'AI Automation', en: 'AI Automation' },
      { slug: 'adforge-ai', id: 'AdForge AI', en: 'AdForge AI' },
      // Digital Services
      { slug: '__divider__', id: '💼 Layanan Digital', en: '💼 Digital Services' },
      { slug: 'website-development', id: 'Pembuatan Website', en: 'Website Development' },
      { slug: 'social-media-management', id: 'Kelola Media Sosial', en: 'Social Media Management' },
      { slug: 'video-production', id: 'Produksi Video', en: 'Video Production' },
      { slug: 'custom-documents', id: 'Dokumen Custom', en: 'Custom Documents' },
      { slug: 'certificate-design', id: 'Desain Sertifikat', en: 'Certificate Design' },
      // Research & Security
      { slug: '__divider__', id: '🔍 Riset & Keamanan', en: '🔍 Research & Security' },
      { slug: 'deep-research', id: 'Deep Research', en: 'Deep Research' },
      { slug: 'security-audit', id: 'Audit Keamanan', en: 'Security Audit' },
      // Trading & Finance
      { slug: '__divider__', id: '📈 Trading & Fintech', en: '📈 Trading & Fintech' },
      { slug: 'algorithmic-trading', id: 'Trading Algoritmik', en: 'Algorithmic Trading' },
      { slug: '1ai', id: '1Ai', en: '1Ai' },
      // Digital Products
      { slug: '__divider__', id: '📦 Produk Digital', en: '📦 Digital Products' },
      { slug: 'digital-products', id: 'Produk Digital', en: 'Digital Products' },
    ],
  },
  { slug: 'contact', id: 'Kontak', en: 'Contact' },
];

export default function Header() {
  const router = useRouter();
  const locale = (router.query.locale as string) || 'id';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [router.asPath]);

  const switchLocale = () => {
    const target = locale === 'id' ? 'en' : 'id';
    const path = router.asPath.replace(`/${locale}`, `/${target}`);
    router.push(path);
  };

  const currentSlug = router.asPath.split('/').filter(Boolean).pop() || '';

  const isActive = (slug: string) => {
    if (slug === '' && (currentSlug === locale || currentSlug === 'id' || currentSlug === 'en')) return true;
    return currentSlug === slug;
  };

  const renderNavItem = (link: NavItem, isMobile = false) => {
    if (link.children) {
      return (
        <li
          key={link.slug}
          className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownOpen : ''}`}
          ref={dropdownRef}
        >
          <button
            className={styles.dropdownTrigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {locale === 'id' ? link.id : link.en}
            <span className={styles.arrow}>▼</span>
          </button>
          <ul className={`${styles.dropdownMenu} ${isMobile ? styles.mobileDropdown : ''}`}>
            {link.children.map((child, idx) => {
              if (child.slug === '__divider__') {
                return (
                  <li key={`div-${idx}`} className={styles.divider}>
                    {locale === 'id' ? child.id : child.en}
                  </li>
                );
              }
              return (
                <li key={child.slug}>
                  <Link
                    href={`/${locale}/${child.slug}`}
                    className={isActive(child.slug) ? styles.active : ''}
                  >
                    {locale === 'id' ? child.id : child.en}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    return (
      <li key={link.slug}>
        <Link
          href={`/${locale}/${link.slug}`}
          className={isActive(link.slug) ? styles.active : ''}
        >
          {locale === 'id' ? link.id : link.en}
        </Link>
      </li>
    );
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link href={`/${locale}`} className={styles.logo}>
          Berkah<span>Karya</span>
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.links}>
          {navLinks.map((link) => renderNavItem(link))}
        </ul>

        <div className={styles.actions}>
          <button onClick={switchLocale} className={styles.langBtn}>
            🌐 {locale === 'id' ? 'EN' : 'ID'}
          </button>
          <a
            href="https://wa.me/6285732740006"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            💬 {locale === 'id' ? 'Mulai Gratis' : 'Start Free'}
          </a>
          <button
            className={`${styles.menuBtn} ${mobileOpen ? styles.menuOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link) => renderNavItem(link, true))}
        </ul>
        <div className={styles.mobileActions}>
          <button onClick={switchLocale} className={styles.langBtn}>
            🌐 {locale === 'id' ? 'English' : 'Indonesia'}
          </button>
          <a
            href="https://wa.me/6285732740006"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            💬 {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </a>
        </div>
      </div>
    </header>
  );
}
