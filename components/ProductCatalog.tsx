import styles from './ProductCatalog.module.css';
import { trackCTAClick } from '@/lib/tracking';

interface CatalogItem { icon: string; name: string; price: string; desc: string; href: string }

interface Props {
  title: string;
  items: CatalogItem[];
}

export default function ProductCatalog({ title, items }: Props) {
  return (
    <section className="dark-bg" id="catalog">
      <div className={styles.container}>
        <h2 className="text-white">{title}</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              onClick={() => trackCTAClick(`catalog_${item.name}`, item.href)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <span className={styles.price}>{item.price}</span>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
