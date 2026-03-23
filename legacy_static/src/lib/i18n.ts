export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export function getAlternateLocale(lang: Locale): Locale {
  return lang === 'id' ? 'en' : 'id';
}
