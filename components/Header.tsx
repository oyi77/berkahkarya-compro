import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const navLinks = [
  { slug: '', id: 'Beranda', en: 'Home' },
  { slug: 'ai-video-studio', id: 'Video AI', en: 'AI Video' },
  { slug: 'adforge-ai', id: 'Iklan AI', en: 'AI Ads' },
  { slug: 'ai-agent-pro', id: 'Agent AI', en: 'AI Agent' },
  { slug: 'omniroute', id: 'OmniRoute', en: 'OmniRoute' },
  { slug: 'team', id: 'Tim', en: 'Team' },
  { slug: 'contact', id: 'Kontak', en: 'Contact' },
];

export default function Header() {
  const router = useRouter();
  const locale = (router.query.locale as string) || 'id';

  const switchLocale = () => {
    const target = locale === 'id' ? 'en' : 'id';
    const path = router.asPath.replace(`/${locale}`, `/${target}`);
    router.push(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          Berkah<span>Karya</span>
        </Link>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.slug} href={`/${locale}/${link.slug}`} className={styles.link}>
              {locale === 'id' ? link.id : link.en}
            </Link>
          ))}
        </nav>
        <button onClick={switchLocale} className={styles.langButton}>
          🌐 {locale === 'id' ? 'EN' : 'ID'}
        </button>
      </div>
    </header>
  );
}
