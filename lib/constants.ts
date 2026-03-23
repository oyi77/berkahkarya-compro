export const LANGUAGES = {
 id: 'Bahasa Indonesia',
 en: 'English',
} as const;

export type Locale = keyof typeof LANGUAGES;

export const DEFAULT_LOCALE: Locale = 'id';

export const LOCALE_PREFIX = {
 id: '/id',
 en: '/en',
} as const;

export const NAV_LINKS = [
 { href: '#home', id: 'Beranda', en: 'Home' },
 { href: '#products', id: 'Produk', en: 'Products' },
 { href: '#team', id: 'Tim', en: 'Team' },
 { href: '#contact', id: 'Kontak', en: 'Contact' },
];
