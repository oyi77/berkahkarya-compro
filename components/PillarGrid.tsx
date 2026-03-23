import styles from './PillarGrid.module.css';

interface Pillar { num: string; title: string; desc: string }

interface Props { title: string; items: Pillar[] }

export default function PillarGrid({ title, items }: Props) {
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.grid}>
          {items.map((p) => (
            <div key={p.num} className={styles.item}>
              <span className={styles.num}>{p.num}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
