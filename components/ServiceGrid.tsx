import styles from './ServiceGrid.module.css';

interface Service {
  emoji: string;
  name: string;
  desc: string;
  href: string;
}

interface Props {
  title: string;
  subtitle?: string;
  items: Service[];
}

export default function ServiceGrid({ title, subtitle, items }: Props) {
  return (
    <section className="light-bg" id="products">
      <div className={styles.container}>
        <h2>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.grid}>
          {items.map((s) => (
            <a key={s.name} href={s.href} className={`card-light ${styles.card}`}>
              <span className={styles.emoji}>{s.emoji}</span>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <span className={styles.link}>Learn more →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
