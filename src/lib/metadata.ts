import type { Locale } from '@/config/site';
import { siteConfig } from '@/config/site';

export function buildCanonical(locale: Locale) {
  return `${siteConfig.url}/${locale}`;
}

export function buildTitle() {
  return siteConfig.name;
}

export function buildDescription(locale: Locale) {
  return siteConfig.descriptionMap[locale] ?? siteConfig.descriptionMap.es;
}
