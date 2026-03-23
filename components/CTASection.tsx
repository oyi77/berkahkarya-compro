import styles from './CTASection.module.css';
import { trackCTAClick } from '@/lib/tracking';
interface Props { title: string; description: string; button: { text: string; href: string } }

export default function CTASection({ title, description, button }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={button.href} className={styles.btn} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCTAClick(button.text, button.href)}>
          {button.text}
        </a>
        <div className={styles.trust}>
          <div className={styles.trustItem}><span>✓</span><span>Garansi 7 hari uang kembali</span></div>
          <div className={styles.trustItem}><span>✓</span><span>Support 24/7</span></div>
          <div className={styles.trustItem}><span>✓</span><span>Setup &lt;5 menit</span></div>
        </div>
      </div>
    </section>
  );
}
