import styles from './HeroSection.module.css';
import CharacterAvatar from './CharacterAvatar';
import { trackCTAClick } from '@/lib/tracking';

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
  character?: { src: string; alt: string };
}

export default function HeroSection({ eyebrow, title, description, buttons, dark = true, character }: HeroProps) {
  return (
    <section className={dark ? 'dark-bg' : 'light-bg'}>
      <div className={`${styles.container} ${character ? styles.withCharacter : ''}`}>
        <div className={styles.content}>
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
                  onClick={() => trackCTAClick(`hero_${btn.text}`, btn.href)}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
        {character && (
          <div className={styles.characterWrap}>
            <CharacterAvatar src={character.src} alt={character.alt} size="hero" glow float />
          </div>
        )}
      </div>
    </section>
  );
}
