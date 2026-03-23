import { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQ { q: string; a: string }

interface Props {
  title: string;
  items: FAQ[];
}

export default function FAQSection({ title, items }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.list}>
          {items.map((f, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
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
