import styles from './StatsRow.module.css';
interface Stat { value: string; label: string }

export default function StatsRow({ items }: { items: Stat[] }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        {items.map((s) => (
          <div key={s.label} className={styles.item}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
