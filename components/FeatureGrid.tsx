import styles from './FeatureGrid.module.css';

interface Feature { icon: string; title: string; desc: string }

export default function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <section className="light-bg" id="features">
      <div className={styles.container}>
        <div className={styles.grid}>
          {items.map((f) => (
            <div key={f.title} className={`card-light ${styles.card}`}>
              <span className={styles.icon}>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
