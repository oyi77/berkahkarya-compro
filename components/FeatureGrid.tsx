import styles from './FeatureGrid.module.css';
interface Feature { icon: string; title: string; desc: string }

export default function FeatureGrid({ items, title }: { items: Feature[]; title?: string }) {
  return (
    <section className={styles.wrap} id="features">
      <div className={styles.container}>
        {title && <><p className={styles.label}>✦ Fitur Unggulan</p><h2 className={styles.heading}>{title}</h2></>}
        <div className={styles.grid}>
          {items.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
