import styles from './TestimonialSection.module.css';

interface Testimonial { quote: string; name: string; role: string; avatar: string }

export default function TestimonialSection({ title, items }: { title: string; items: Testimonial[] }) {
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.grid}>
          {items.map((t) => (
            <div key={t.name} className={`card-light ${styles.card}`}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{t.avatar}</span>
                <div>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
