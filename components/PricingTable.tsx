import styles from './PricingTable.module.css';
import { trackCTAClick, trackMetaEvent } from '@/lib/tracking';

interface Tier {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  features: string[];
  cta: { text: string; href: string };
}

export default function PricingTable({ tiers }: { tiers: Tier[] }) {
  const handleClick = (tier: Tier) => {
    trackCTAClick(`pricing_${tier.name}`, tier.cta.href);
    trackMetaEvent('InitiateCheckout', {
      content_name: tier.name,
      value: tier.price,
      currency: 'IDR',
    });
  };

  return (
    <section className="light-bg" id="pricing">
      <div className={styles.container}>
        <div className={styles.grid}>
          {tiers.map((t) => (
            <div key={t.name} className={`${styles.card} ${t.highlight ? styles.highlight : ''}`}>
              <span className={styles.name}>{t.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>{t.price}</span>
                {t.period && <span className={styles.period}>{t.period}</span>}
              </div>
              <ul className={styles.features}>
                {t.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
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
      </div>
    </section>
  );
}
