import { useRouter } from 'next/router';
import styles from './Footer.module.css';

export default function Footer() {
  const router = useRouter();
  const locale = (router.query.locale as string) || 'id';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div>
          <h4>BerkahKarya</h4>
          <p className={styles.tagline}>
            {locale === 'id'
              ? 'AI Ecosystem untuk bisnis Indonesia. Tools, automation, dan sistem AI yang langsung menghasilkan.'
              : 'AI Ecosystem for Indonesian businesses. Tools, automation, and AI systems that generate results.'}
          </p>
          <div className={styles.socials}>
            <a href="https://wa.me/6285732740006" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
            <a href="https://t.me/berkahkarya_saas_bot" target="_blank" rel="noopener noreferrer" aria-label="Telegram">✈️</a>
            <a href="mailto:hello@berkahkarya.org" aria-label="Email">📧</a>
          </div>
        </div>

        {/* Products */}
        <div>
          <h5>{locale === 'id' ? 'Produk' : 'Products'}</h5>
          <ul>
            <li><a href={`/${locale}/ai-video-studio`}>AI Video Studio</a></li>
            <li><a href={`/${locale}/adforge-ai`}>AdForge AI</a></li>
            <li><a href={`/${locale}/ai-agent-pro`}>AI Agent Pro</a></li>
            <li><a href={`/${locale}/algorithmic-trading`}>Algo Trading</a></li>
            <li><a href={`/${locale}/digital-products`}>{locale === 'id' ? 'Produk Digital' : 'Digital Products'}</a></li>
            <li><a href={`/${locale}/1ai`}>1Ai</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5>{locale === 'id' ? 'Kontak' : 'Contact'}</h5>
          <ul>
            <li><a href="https://wa.me/6285732740006" target="_blank" rel="noopener noreferrer">📱 WhatsApp</a></li>
            <li><a href="https://t.me/berkahkarya_saas_bot" target="_blank" rel="noopener noreferrer">✈️ Telegram Bot</a></li>
            <li><a href="mailto:hello@berkahkarya.org">📧 hello@berkahkarya.org</a></li>
          </ul>
          <div className={styles.pages}>
            <a href={`/${locale}/team`}>{locale === 'id' ? 'Tim Kami' : 'Our Team'}</a>
            <a href={`/${locale}/contact`}>{locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}</a>
          </div>
        </div>

        {/* Office address */}
        <div>
          <h5>{locale === 'id' ? 'Kantor' : 'Office'}</h5>
          <div className={styles.address}>
            <p className={styles.officeName}>Vilona AI Agent</p>
            <p>Berkah Karya Digital Agency</p>
            <p>Perumahan Nirwana Regency</p>
            <p>Blok C12, Jombang</p>
            <p>Jawa Timur, Indonesia</p>
          </div>
          <p className={styles.hours}>
            {locale === 'id' ? '🕐 AI aktif 24/7 — respon <2 detik' : '🕐 AI active 24/7 — response <2 sec'}
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} BerkahKarya · Berkah Karya Digital Agency · Jombang, Jawa Timur</p>
      </div>
    </footer>
  );
}
