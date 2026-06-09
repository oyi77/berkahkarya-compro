import styles from './ProblemSection.module.css';
interface Pain { icon: string; text?: string; title?: string; desc?: string }
interface Props { hook: string; pains: Pain[]; bridge: string }

export default function ProblemSection({ hook, pains, bridge }: Props) {
  return (
    <section className={styles.wrap} style={{ padding: '5rem 0' }}>
      <div className={styles.container}>
        <p className={styles.hook}>{hook}</p>
        <div className={styles.grid}>
          {pains.map((p, i) => (
            <div key={i} className={styles.pain}>
              <div className={styles.iconWrap}>{p.icon}</div>
              {p.title ? (
                <>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-white-70)', fontSize: '0.85rem', lineHeight: 1.6 }}>{p.desc}</p>
                </>
              ) : (
                <p>{p.text}</p>
              )}
            </div>
          ))}
        </div>
        <p className={styles.bridge}>{bridge}</p>
      </div>
    </section>
  );
}
