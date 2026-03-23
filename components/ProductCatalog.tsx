import styles from './ProductCatalog.module.css';

interface Product { emoji: string; name: string; category: string; desc: string; price: string; href: string }

export default function ProductCatalog({ title, items }: { title: string; items: Product[] }) {
  return (
    <section className="light-bg" id="catalog">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.grid}>
          {items.map((p) => (
            <div key={p.name} className={`card-light ${styles.card}`}>
              <span className={styles.emoji}>{p.emoji}</span>
              <span className={styles.cat}>{p.category}</span>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.footer}>
                <span className={styles.price}>{p.price}</span>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.btn}>Beli Sekarang →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
