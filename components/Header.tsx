import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { slug: '', id: 'Beranda', en: 'Home' },
  { slug: 'ai-video-studio', id: 'Video AI', en: 'AI Video' },
  { slug: 'adforge-ai', id: 'Iklan AI', en: 'AI Ads' },
  { slug: 'ai-agent-pro', id: 'Agent AI', en: 'AI Agent' },
  { slug: 'algorithmic-trading', id: 'Trading', en: 'Trading' },
  { slug: 'omniroute', id: 'OmniRoute', en: 'OmniRoute' },
  { slug: 'team', id: 'Tim', en: 'Team' },
];

export default function Header() {
  const router = useRouter();
  const locale = (router.query.locale as string) || 'id';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const target = locale === 'id' ? 'en' : 'id';
    const path = router.asPath.replace(`/${locale}`, `/${target}`);
    router.push(path);
  };

  const currentSlug = (router.query.locale ? router.asPath.split('/').pop() : '') || '';

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link href={`/${locale}`} className={styles.logo}>
          Berkah<span>Karya</span>
        </Link>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.slug}>
              <Link
                href={`/${locale}/${link.slug}`}
                className={currentSlug === link.slug || (link.slug === '' && currentSlug === locale) ? styles.active : ''}
              >
                {locale === 'id' ? link.id : link.en}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <button onClick={switchLocale} className={styles.langBtn}>
            🌐 {locale === 'id' ? 'EN' : 'ID'}
          </button>
          <a href="https://wa.me/6285732740006" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            💬 {locale === 'id' ? 'Mulai Gratis' : 'Start Free'}
          </a>
          <button className={styles.menuBtn} aria-label="Menu">☰</button>
        </div>
      </nav>
    </header>
  );
}
