import styles from './ProblemSection.module.css';
interface Pain { icon: string; text: string }
interface Props { hook: string; pains: Pain[]; bridge: string }

export default function ProblemSection({ hook, pains, bridge }: Props) {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className={styles.hook}>{hook}</p>
        <div className={styles.grid}>
          {pains.map((p) => (
            <div key={p.text} className={styles.pain}>
              <div className={styles.iconWrap}>{p.icon}</div>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <p className={styles.bridge}>{bridge}</p>
      </div>
    </section>
  );
}
