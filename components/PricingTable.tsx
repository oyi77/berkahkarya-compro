import styles from './PricingTable.module.css';
import { trackAddToCart, trackInitiateCheckout, trackPricingSelect } from '@/lib/tracking';

interface Tier { name: string; price: string; period: string; highlight?: boolean; features: string[]; cta: { text: string; href: string } }

// Parse price string to number
function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

export default function PricingTable({ tiers }: { tiers: Tier[] }) {
  const handleClick = (tier: Tier) => {
    const priceValue = parsePrice(tier.price);
    const isExternal = tier.cta.href.startsWith('http');
    
    // Track pricing selection
    trackPricingSelect({
      tier_name: tier.name,
      price: priceValue,
      currency: 'IDR',
      action: 'click',
    });
    
    // Track AddToCart for external links
    if (isExternal) {
      trackAddToCart({
        content_name: `Plan: ${tier.name}`,
        content_id: tier.name.toLowerCase().replace(/\s+/g, '-'),
        content_type: 'subscription',
        value: priceValue,
        currency: 'IDR',
        destination: tier.cta.href.includes('wa.me') ? 'whatsapp' : 'saas_app',
        destination_url: tier.cta.href,
      });
    }
    
    // Track InitiateCheckout
    trackInitiateCheckout({
      content_name: tier.name,
      content_id: tier.name.toLowerCase(),
      value: priceValue,
      currency: 'IDR',
    });
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
