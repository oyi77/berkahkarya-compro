import styles from './CodeBlock.module.css';

interface Props { title: string; code: string }

export default function CodeBlock({ title, code }: Props) {
  return (
    <section className="dark-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.window}>
          <div className={styles.dots}>
            <span className={styles.dotRed} /><span className={styles.dotYellow} /><span className={styles.dotGreen} />
          </div>
          <pre className={styles.code}><code>{code}</code></pre>
        </div>
      </div>
    </section>
  );
}
