import es from '@/dictionaries/es.json';
import en from '@/dictionaries/en.json';
import pt from '@/dictionaries/pt.json';
import type { Locale } from '@/config/site';

export const dictionaries: Record<Locale, Record<string, string>> = {
  es,
  en,
  pt,
};

export function t(locale: Locale, key: string, replacements?: Record<string, string | number>) {
  const source = dictionaries[locale] ?? dictionaries.es;
  let value = source[key] ?? key;

  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }

  return value;
}
