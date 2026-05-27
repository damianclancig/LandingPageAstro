export const locales = ['es', 'en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: 'Clancig FullstackDev',
  owner: 'Damián Clancig',
  url: 'https://www.clancig.com.ar',
  ogImage: 'https://www.clancig.com.ar/images/foto_perfil_v2.webp',
  ogImageType: 'image/webp',
  ogImageAlt: 'Foto de perfil de Damián Clancig, Full-Stack Developer',
  locale: 'es_AR',
  localeMap: {
    es: 'es_AR',
    en: 'en_US',
    pt: 'pt_BR',
  } as const,
  twitterCreator: '@damianclancig',
  twitterSite: '@damianclancig',
  descriptionMap: {
    es: 'Portfolio de Damián Clancig, Desarrollador Full-Stack especializado en crear aplicaciones web y móviles modernas con Astro, React, Node.js y Flutter.',
    en: 'Portfolio of Damián Clancig, a Full-Stack Developer specialized in building modern web and mobile applications with Astro, React, Node.js, and Flutter.',
    pt: 'Portfólio de Damián Clancig, Desenvolvedor Full-Stack especializado em criar aplicações web e móveis modernas com Astro, React, Node.js e Flutter.',
  } as const,
};
