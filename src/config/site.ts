export const locales = ['es', 'en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: 'Clancig FullstackDev',
  owner: 'Damián Clancig',
  url: 'https://www.clancig.com.ar',
  ogImage: 'https://www.clancig.com.ar/images/foto_perfil_v2.webp',
  ogImageType: 'image/webp',
  ogImageWidth: '487',
  ogImageHeight: '487',
  ogImageAlt: 'Foto de perfil de Clancig Fullstack Developer',

  locale: 'es_AR',
  localeMap: {
    es: 'es_AR',
    en: 'en_US',
    pt: 'pt_BR',
  } as const,
  twitterCreator: '@damianclancig',
  twitterSite: '@damianclancig',
  titleMap: {
    es: 'Damián Clancig | Desarrollador Full-Stack & Mobile',
    en: 'Damián Clancig | Full-Stack & Mobile Developer',
    pt: 'Damián Clancig | Desenvolvedor Full-Stack & Mobile',
  } as const,
  keywordsMap: {
    es: 'Damián Clancig, Desarrollador Full-Stack, Programador, Astro, React, Node.js, Flutter, TypeScript, Tailwind CSS, Aplicaciones Web, Aplicaciones Móviles, Portfolio Developer, Argentina',
    en: 'Damián Clancig, Full-Stack Developer, Software Engineer, Astro, React, Node.js, Flutter, TypeScript, Tailwind CSS, Web Applications, Mobile Apps, Developer Portfolio, Argentina',
    pt: 'Damián Clancig, Desenvolvedor Full-Stack, Programador, Astro, React, Node.js, Flutter, TypeScript, Tailwind CSS, Aplicações Web, Aplicativos Móveis, Portfólio Developer, Argentina',
  } as const,
  descriptionMap: {
    es: 'Portafolio de Damián Clancig: Casos de estudio y plataformas desarrolladas. Especializado en desarrollo Full-Stack y Mobile (Astro, React, Node.js, Flutter).',
    en: 'Portfolio of Damián Clancig: Case studies and platforms developed. Specialized in Full-Stack and Mobile development (Astro, React, Node.js, Flutter).',
    pt: 'Portfólio de Damián Clancig: Casos de estudo e plataformas desenvolvidas. Especializado em desenvolvimento Full-Stack e Mobile (Astro, React, Node.js, Flutter).',
  } as const,
};

