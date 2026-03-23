import styles from './HowItWorks.module.css';
interface Step { num: string; title: string; desc: string }
interface Props { title: string; steps: Step[] }

export default function HowItWorks({ title, steps }: Props) {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className={styles.label}>⚡ Cara Kerja</p>
        <h2>{title}</h2>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.num}>{s.num}</span>
              <div className={styles.text}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
