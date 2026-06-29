import type { Locale } from '@/config/site';
import { siteConfig } from '@/config/site';

export function buildCanonical(locale: Locale) {
  return `${siteConfig.url}/${locale}`;
}

export function buildTitle(locale: Locale = 'es') {
  return siteConfig.titleMap[locale] ?? siteConfig.name;
}

export function buildDescription(locale: Locale) {
  return siteConfig.descriptionMap[locale] ?? siteConfig.descriptionMap.es;
}

export function buildKeywords(locale: Locale) {
  return siteConfig.keywordsMap[locale] ?? siteConfig.keywordsMap.es;
}

