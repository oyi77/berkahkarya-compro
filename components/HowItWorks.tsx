import styles from './HowItWorks.module.css';

interface Step { num: string; title: string; desc: string }

interface Props {
  title: string;
  steps: Step[];
}

export default function HowItWorks({ title, steps }: Props) {
  return (
    <section className="dark-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.num}>{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
