import styles from './CTASection.module.css';
import { trackCTAClick } from '@/lib/tracking';

interface Props {
  title: string;
  description: string;
  button: { text: string; href: string };
}

export default function CTASection({ title, description, button }: Props) {
  const handleClick = () => {
    trackCTAClick(button.text, button.href);
  };

  return (
    <section className={`dark-bg ${styles.section}`}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a
          href={button.href}
          className={styles.btn}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {button.text}
        </a>
      </div>
    </section>
  );
}
