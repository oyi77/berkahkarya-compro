import { useRouter } from 'next/router';
import styles from './Footer.module.css';

export default function Footer() {
  const router = useRouter();
  const locale = (router.query.locale as string) || 'id';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h4>BerkahKarya</h4>
          <p>{locale === 'id' ? 'AI Ecosystem untuk bisnis Indonesia.' : 'AI Ecosystem for Indonesian businesses.'}</p>
        </div>
        <div>
          <h5>{locale === 'id' ? 'Produk' : 'Products'}</h5>
          <ul>
            <li><a href={`/${locale}/ai-video-studio`}>AI Video Studio</a></li>
            <li><a href={`/${locale}/adforge-ai`}>AdForge AI</a></li>
            <li><a href={`/${locale}/ai-agent-pro`}>AI Agent Pro</a></li>
            <li><a href={`/${locale}/algorithmic-trading`}>Algo Trading</a></li>
            <li><a href={`/${locale}/digital-products`}>{locale === 'id' ? 'Produk Digital' : 'Digital Products'}</a></li>
            <li><a href={`/${locale}/omniroute`}>OmniRoute API</a></li>
          </ul>
        </div>
        <div>
          <h5>{locale === 'id' ? 'Kontak' : 'Contact'}</h5>
          <p><a href="https://wa.me/6285732740006" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
          <p><a href="https://t.me/berkahkarya_saas_bot" target="_blank" rel="noopener noreferrer">Telegram Bot</a></p>
          <p><a href="mailto:hello@berkahkarya.org">hello@berkahkarya.org</a></p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} BerkahKarya. All rights reserved.</p>
      </div>
    </footer>
  );
}
