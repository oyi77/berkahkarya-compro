import Image from 'next/image';
import styles from './CharacterAvatar.module.css';

interface Props {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  glow?: boolean;
  float?: boolean;
  className?: string;
}

const sizes = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 180,
  hero: 280,
};

export default function CharacterAvatar({ src, alt, size = 'md', glow = false, float = false, className = '' }: Props) {
  const dim = sizes[size];
  return (
    <div className={`${styles.wrapper} ${glow ? styles.glow : ''} ${float ? styles.float : ''} ${styles[size]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={dim}
        height={dim}
        className={styles.image}
        priority={size === 'hero'}
      />
    </div>
  );
}
