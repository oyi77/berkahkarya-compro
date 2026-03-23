'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/src/lib/i18n';
import { getAlternateLocale } from '@/src/lib/i18n';

interface LanguageSwitcherProps {
  lang: Locale;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const alternateLang = getAlternateLocale(lang);

  const handleSwitch = () => {
    const newPath = pathname.replace(`/${lang}`, `/${alternateLang}`);
    router.push(newPath);
  };

  const flag = alternateLang === 'id' ? '\u{1F1EE}\u{1F1E9}' : '\u{1F1EC}\u{1F1E7}';
  const label = alternateLang.toUpperCase();

  return (
    <button
      onClick={handleSwitch}
      aria-label={`Switch to ${alternateLang === 'id' ? 'Indonesian' : 'English'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.3rem 0.7rem',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: 'var(--light-300)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.1)';
        el.style.borderColor = 'rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.06)';
        el.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      <span>{flag}</span>
      <span>{label}</span>
    </button>
  );
}
