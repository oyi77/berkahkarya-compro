import styles from './CTASection.module.css';

interface Props {
  title: string;
  description: string;
  button: { text: string; href: string };
}

export default function CTASection({ title, description, button }: Props) {
  return (
    <section className={`dark-bg ${styles.section}`}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={button.href} className={styles.btn} target="_blank" rel="noopener noreferrer">
          {button.text}
        </a>
      </div>
    </section>
  );
}
