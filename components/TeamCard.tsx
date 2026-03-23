import styles from './TeamCard.module.css';

interface Member { name: string; role: string; desc: string; avatar: string }

export default function TeamGrid({ members }: { members: Member[] }) {
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <div className={styles.grid}>
          {members.map((m) => (
            <div key={m.name} className={`card-light ${styles.card}`}>
              <span className={styles.avatar}>{m.avatar}</span>
              <h3 className={styles.name}>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
              <p className={styles.desc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
