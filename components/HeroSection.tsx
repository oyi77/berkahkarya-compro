import styles from './HeroSection.module.css';

interface Button {
  text: string;
  href: string;
  primary?: boolean;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  buttons?: Button[];
  dark?: boolean;
}

export default function HeroSection({ eyebrow, title, description, buttons, dark = true }: HeroProps) {
  return (
    <section className={dark ? 'dark-bg' : 'light-bg'}>
      <div className={styles.container}>
        {eyebrow && <span className={styles.badge}>{eyebrow}</span>}
        <h1 className={dark ? 'text-white' : 'text-primary'} style={{ whiteSpace: 'pre-line' }}>{title}</h1>
        <p className={dark ? 'text-white-85' : 'text-muted'}>{description}</p>
        {buttons && buttons.length > 0 && (
          <div className={styles.buttons}>
            {buttons.map((btn) => (
              <a
                key={btn.text}
                href={btn.href}
                className={btn.primary ? styles.primary : styles.secondary}
                target={btn.href.startsWith('http') ? '_blank' : undefined}
                rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
