import styles from './ProvidersGrid.module.css';

interface Props { title: string; items: string[] }

export default function ProvidersGrid({ title, items }: Props) {
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.grid}>
          {items.map((p) => (
            <div key={p} className={styles.chip}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
