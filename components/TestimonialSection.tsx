import styles from './TestimonialSection.module.css';
interface Testimonial { quote: string; name: string; role: string; avatar: string }

export default function TestimonialSection({ title, items }: { title: string; items: Testimonial[] }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className={styles.label}>💬 Testimoni</p>
        <h2>{title}</h2>
        <div className={styles.grid}>
          {items.map((t) => (
            <div key={t.name} className={styles.card}>
              <p className={styles.stars}>★★★★★</p>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
