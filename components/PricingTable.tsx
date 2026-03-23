import styles from './PricingTable.module.css';
import { trackCTAClick, trackMetaEvent, sendMetaCAPI, trackTikTokEvent, sendTikTokCAPI } from '@/lib/tracking';

interface Tier { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }

export default function PricingTable({ tiers }: { tiers: Tier[] }) {
  const handleClick = (tier: Tier) => {
    trackCTAClick(`pricing_${tier.name}`, tier.cta.href);
    trackMetaEvent('InitiateCheckout', { content_name: tier.name, value: tier.price, currency: 'IDR' });
    sendMetaCAPI('InitiateCheckout', { content_name: tier.name, value: tier.price, currency: 'IDR' });
    trackTikTokEvent('InitiateCheckout', { content_name: tier.name, content_type: 'product' });
    sendTikTokCAPI('InitiateCheckout', { content_name: tier.name });
  };

  return (
    <section className={styles.wrap} id="pricing">
      <div className={styles.container}>
        <p className={styles.label}>💎 Pilih Paket</p>
        <h2>Investasi yang Langsung Balik Modal</h2>
        <p className={styles.sub}>Mulai kapan saja. Cancel kapan saja. Garansi 7 hari uang kembali.</p>
        <div className={styles.grid}>
          {tiers.map((t) => (
            <div key={t.name} className={`${styles.card} ${t.highlight ? styles.highlight : ''}`} style={{ position: 'relative' }}>
              {t.highlight && <span className={styles.popularBadge}>⭐ Paling Populer</span>}
              <span className={styles.name}>{t.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>{t.price}</span>
                {t.period && <span className={styles.period}>{t.period}</span>}
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                {t.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a
                href={t.cta.href}
                className={`${styles.btn} ${t.highlight ? styles.btnHighlight : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(t)}
              >
                {t.cta.text}
              </a>
            </div>
          ))}
        </div>
        <p className={styles.note}>🛡️ Semua paket dilengkapi garansi uang kembali 7 hari · Tidak perlu kartu kredit</p>
      </div>
    </section>
  );
}
