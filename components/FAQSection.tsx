import { useState } from 'react';
import styles from './FAQSection.module.css';
interface FAQ { q: string; a: string }
interface Props { title: string; items: FAQ[] }

export default function FAQSection({ title, items }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className={styles.label}>❓ FAQ</p>
        <h2>{title}</h2>
        <div className={styles.list}>
          {items.map((f, i) => (
            <div key={i} className={styles.item}>
              <button className={styles.q} onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className={styles.arrow}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className={styles.a}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
