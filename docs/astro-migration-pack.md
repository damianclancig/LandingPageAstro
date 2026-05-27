# ASTRO MIGRATION PACK - CLANCIG LANDING

## 1) MASTER PROMPT (COPY FROM HERE INTO ANY AI AGENT)

You are a senior web engineer. Build a complete Astro 5 + TypeScript project from scratch that recreates, as close as possible, the provided landing site behavior, structure, content, and styling direction.

Critical rules:
- Treat all data in this document as source of truth.
- Do not invent copy where official copy is provided.
- Keep i18n with exact keys and values for es/en/pt.
- Keep sections and ids: servicios, portafolio, contacto.
- Keep same brand identity: Clancig FullstackDev, profile owner Damián Clancig.
- Build production-ready code with strong defaults for SEO, accessibility, security, and performance.

Required stack:
- Astro 5
- TypeScript
- Tailwind CSS 4
- React only for isolated interactive islands (modal/dialog, contact form state, marquee animation if needed)
- Zod for server-side validation
- Contact endpoint in Astro server
- Cloudflare Turnstile preferred (if unavailable, fallback to reCAPTCHA v2 compatible contract)
- Email provider abstraction (Resend recommended) and compatibility mapping for legacy Maileroo envs
- ESLint + Prettier + npm scripts + README

Project goals:
- Multi-language routes: /es, /en, /pt
- Near-identical section architecture and content hierarchy
- Similar visual style: dark-first engineering look, teal accent, elegant headline serif + sans body + mono labels
- Preserve portfolio cards with detail dialog, pricing/services cards, tech marquee, smart contact hub with intent switch

Deliverables:
- Full project files and configuration
- Data-driven content architecture
- Components and pages implemented
- Working form endpoint with validation and anti-spam verification integration hook
- SEO metadata, sitemap, robots, canonical
- Security headers configuration
- Basic Playwright tests (home load, language route, form validation)
- Clear README with setup and deploy instructions

Acceptance criteria:
- npm install, npm run dev, npm run build, npm run typecheck pass
- All three locales render correctly
- Same key sections and business copy present
- Lighthouse-targeted optimizations applied
- No TODO placeholders in production paths

Now implement the full project end-to-end.

## 2) IMPLEMENTATION SPEC

### 2.1 Brand + Site Config
- Name: Clancig FullstackDev
- Owner: Damián Clancig
- URL: https://www.clancig.com.ar
- OG image: https://www.clancig.com.ar/images/foto_perfil.webp
- Locale default: es_AR
- Twitter creator: @damianclancig

### 2.2 Section Order (Home)
1. HeroSection
2. TechStackMarquee
3. PricingCards (services plans)
4. PortfolioGrid
5. SmartContactHub

### 2.3 Navigation
- #servicios (label key nav-services)
- #portafolio (label key nav-projects)
- #contacto (label key nav-contact)

### 2.4 Assets
- /images/background.webp
- /images/foto-perfil.jpg
- /images/foto_perfil.webp
- /images/logo.webp
- /images/picture1.png
- /images/picture2.png

If images are unavailable in target environment, generate temporary placeholders with matching aspect ratios and semantic alt text, but keep exact paths.

### 2.5 Theme and visual tokens
- Dark-first with teal accent
- Noise overlay subtle fixed layer
- Typography intent:
  - Headline: Playfair Display
  - Body: Inter
  - Code labels: Roboto Mono
- Keep rounded cards, soft borders, teal glows on hover

## 3) ENV CONTRACT
Use this exact env shape and keep compatibility names:

```env
# Variables de Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=AQUI_VA_TU_CLAVE_PUBLICA
RECAPTCHA_SECRET_KEY=AQUI_VA_TU_CLAVE_SECRETA

# Credenciales de la API de Maileroo para enviar correos
# Más información: https://maileroo.com/docs
MAILEROO_API_KEY="your_maileroo_api_key"
MAILEROO_FROM_EMAIL="your_verified_from_email"
MAILEROO_TO_CONTACT="your_contact_form_recipient_email"

# Información de contacto y enlaces sociales
# El prefijo NEXT_PUBLIC_ es necesario para que Next.js exponga estas variables al cliente de forma segura.
NEXT_PUBLIC_EMAIL_ADDRESS="your_email@example.com"
NEXT_PUBLIC_INSTAGRAM_USER="your_instagram_user"
NEXT_PUBLIC_LINKEDIN_USER="your_linkedin_user"
NEXT_PUBLIC_GITHUB_USER="your_github_user"
NEXT_PUBLIC_WHATSAPP_NUMBER="your_whatsapp_number_including_country_code" 
NEXT_PUBLIC_CAFECITO_USER="your_cafecito_user"
```

## 4) DATA: NAV ITEMS
```ts
export const navItems = [
    { href: "#servicios", labelKey: "nav-services" },
    { href: "#portafolio", labelKey: "nav-projects" },
    { href: "#contacto", labelKey: "nav-contact" },
];
```

## 5) DATA: PROJECTS
```ts
export type ProjectCategory = 'ecosystems' | 'ecommerce' | 'landing';

export interface DemoLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  role: string;
  status: string;
  challenge: string;
  solution: string[];
  techSpecs: string[];
  seniorInsight?: string;
  demoUrl?: string;
  demoUrls?: DemoLink[];
}

export const projects: Project[] = [
  {
    id: "petclan",
    category: "ecosystems",
    title: "PetClan: Ecosistema de Salud Veterinaria",
    role: "Architect & Full-Stack Developer",
    status: "Producción / SaaS Model",
    challenge: "La gestión de la salud de las mascotas suele estar fragmentada en libretas físicas fáciles de perder o dañar. El objetivo era crear una plataforma resiliente y \"Mobile-First\" que centralizara historiales clínicos, planes de vacunación y seguimiento biométrico con una curva de aprendizaje cero para el usuario final.",
    solution: [
      "Implementación de una arquitectura frontend híbrida (SSG/SSR) para asegurar una carga instantánea de los perfiles.",
      "Desarrollo de módulos de visualización de datos para el control histórico de peso mediante gráficos dinámicos.",
      "Creación de un sistema de lógica preventiva para gestionar desparasitaciones y emitir notificaciones inteligentes de próximos vencimientos."
    ],
    techSpecs: ["Next.js", "React", "TailwindCSS", "ShadCN UI"],
    seniorInsight: "Prioricé la mantenibilidad del código creando una arquitectura de componentes modulares. Esto permite escalar el sistema para añadir nuevas features, como tele-consultas, sin afectar el core de la libreta sanitaria digital.",
    demoUrl: "https://petClan.clancig.com.ar"
  },
  {
    id: "financlan",
    category: "ecosystems",
    title: "FinanClan (Caja): Inteligencia Financiera Personal",
    role: "Architect & Full-Stack Developer",
    status: "Producción / Herramienta Interna",
    challenge: "Las aplicaciones financieras comunes fallan al no ofrecer previsibilidad a largo plazo sobre gastos recurrentes y pagos fraccionados. Se requería un dashboard de alta fidelidad visual que garantizara la consistencia de los registros en tiempo real.",
    solution: [
      "Integración de un sistema de autenticación seguro (Google Auth) y normalización de la base de datos para proteger la privacidad de los flujos de caja.",
      "Desarrollo de un algoritmo de proyección que calcula el impacto mensual de las compras en cuotas y los fondos de ahorro en el presupuesto anual.",
      "Implementación de gestión de estados complejos para soportar categorías de ingresos/gastos 100% personalizables."
    ],
    techSpecs: ["React", "Node.js", "Gestión de Estados", "OAuth"],
    seniorInsight: "El verdadero valor de FinanClan reside en su motor de proyección. Diseñé la lógica de datos para que el sistema transforme registros estáticos en una herramienta predictiva para la toma de decisiones financieras.",
    demoUrl: "https://caja.clancig.com.ar"
  },
  {
    id: "aulacheck",
    category: "ecosystems",
    title: "AulaCheck: Gestión Académica en Tiempo Real",
    role: "Lead Full-Stack Developer",
    status: "En Desarrollo (Beta)",
    challenge: "Eliminar la fricción en la toma de asistencia y el seguimiento del progreso académico en entornos educativos, manejando un alto volumen de transacciones concurrentes.",
    solution: [
      "Diseño de un sistema de sincronización de datos masivos para el reporte de presencialidad de alumnos al instante.",
      "Arquitectura orientada a eventos para procesar y actualizar los dashboards de los docentes sin latencia."
    ],
    techSpecs: ["Next.js", "TypeScript", "Bases de Datos Relacionales"],
    demoUrl: "https://aulaCheck.clancig.com.ar"
  },
  {
    id: "ajalderaiz",
    category: "ecommerce",
    title: "Ajal de Raíz: Plataforma de Botánica y Servicios",
    role: "Full-Stack Developer & Technical Consultant",
    status: "Producción / Activo",
    challenge: "Unificar dos modelos de negocio divergentes (venta de productos físicos como suculentas/kokedamas y reserva de servicios por hora como guardería de plantas) en una sola experiencia de compra fluida y coherente.",
    solution: [
      "Arquitectura de E-commerce híbrido con un catálogo dinámico capaz de diferenciar flujos de checkout entre stock físico y servicios agendados.",
      "Optimización de CRO (Conversion Rate Optimization) mediante validación de zonas de envío en tiempo real e integración directa de pagos.",
      "Diseño UI adaptativo que refleja la identidad orgánica de la marca asegurando tiempos de carga (LCP) inferiores a 1.5s."
    ],
    techSpecs: ["Next.js", "TailwindCSS", "Integración de Pagos API", "SEO Técnico"],
    seniorInsight: "Actué como Consultor Tecnológico estructurando la plataforma para vender 'servicios de valor' además de productos. Esta digitalización logística permitió al negocio aumentar significativamente su ticket promedio.",
    demoUrl: "https://www.ajalderaiz.com.ar"
  },
  {
    id: "aramy",
    category: "landing",
    title: "Aramy Anahata & Xoa Yoga: Portales de Bienestar",
    role: "Frontend Developer & UI Designer",
    status: "Producción / Activo",
    challenge: "Trasladar la identidad de terapias holísticas (Reiki, masajes, yoga) a interfaces digitales minimalistas sin sacrificar la velocidad de carga ni la capacidad de captación de leads.",
    solution: [
      "Desarrollo de Landing Pages de alta fidelidad visual enfocadas en embudos de conversión directa hacia WhatsApp para la reserva de turnos.",
      "Estructuración semántica HTML5 y optimización de metadatos para dominar el SEO local en la búsqueda de terapeutas y profesores.",
      "Integración de catálogos ligeros para productos artesanales (jabones y perfumes energéticos)."
    ],
    techSpecs: ["React", "Next.js", "Optimización Core Web Vitals"],
    demoUrls: [
      { label: "Aramy Anahata", url: "https://www.aramyanahata.com.ar" },
      { label: "Xoa Yoga", url: "https://xoayoga.clancig.com.ar/" }
    ]
  },
  {
    id: "meteoclan",
    category: "landing",
    title: "MeteoClan: Consumo Ágil de Datos Climáticos",
    role: "Frontend Developer",
    status: "Producción / Activo",
    challenge: "Crear una utilidad de consulta meteorológica extremadamente rápida y limpia, libre del ruido visual de las aplicaciones climáticas tradicionales.",
    solution: [
      "Consumo eficiente y manejo de caché de APIs públicas de meteorología.",
      "Interfaz minimalista desarrollada con componentes de estado puro para garantizar respuestas instantáneas en la búsqueda de cualquier ciudad del mundo."
    ],
    techSpecs: ["React", "Fetch/Axios", "Manejo de APIs Externas"],
    demoUrl: "https://clima.clancig.com.ar"
  }
];
```

## 6) I18N DICTIONARIES
### 6.1 es.json
```json
{
  "appName": "Clancig FullstackDev",
  "nav-home": "Inicio",
  "nav-bio": "Bio",
  "nav-projects": "Proyectos",
  "nav-services": "Servicios",
  "nav-offerings": "Propuestas",
  "nav-pricing": "Precios",
  "nav-contact": "Contacto",
  "hero-greeting": "Hola, soy",
  "hero-name": "Damián",
  "hero-title": "Desarrollador Full-Stack",
  "hero-subtitle": "Creando experiencias web y móviles modernas.",
  "hero-cta": "Contáctame",
  "hero-codeBackgroundAlt": "Fondo abstracto de código",
  "bio-title": "Sobre Mí",
  "bio-paragraph1": "Soy un Desarrollador Full-Stack apasionado con más de 15 años de experiencia en la creación de aplicaciones robustas y escalables. Mi especialidad se encuentra en JavaScript, TypeScript, React, Next.js, Node.js y desarrollo móvil con React Native y Flutter.",
  "bio-paragraph2": "Me encanta resolver problemas complejos y entregar software de alta calidad que satisfaga las necesidades del usuario y los objetivos comerciales. Soy un aprendiz de por vida, siempre explorando nuevas tecnologías para mejorar mis habilidades.",
  "bio-paragraph3": "Actualmente, me dedico a ofrecer soluciones web y móviles a medida, ayudando a emprendedores y empresas a materializar sus ideas con tecnología de vanguardia. Desde la creación de sitios web impactantes y tiendas online eficientes, hasta el desarrollo de aplicaciones móviles y consultoría tecnológica estratégica, mi objetivo es impulsar tu proyecto al siguiente nivel.",
  "bio-secondImageAlt": "Espacio de trabajo del desarrollador",
  "projects-title": "Portafolio de Proyectos",
  "projects-petclan-title": "PetClan: Ecosistema de Salud Veterinaria",
  "projects-petclan-description": "PetClan es una aplicación web moderna y completa diseñada para simplificar la gestión integral de la salud de tus mascotas. Con una interfaz intuitiva y elegante, permite llevar un registro detallado de vacunas, control de peso, desparasitaciones, consultas veterinarias y mucho más.",
  "projects-meteoclan-title": "MeteoClan: Consumo Ágil de Datos Climáticos",
  "projects-meteoclan-description": "Una aplicación simple y limpia para consultar el clima actual y el pronóstico de cualquier ciudad del mundo, construida con React y una API pública del clima.",
  "projects-financlan-title": "FinanClan",
  "projects-financlan-description": "Una aplicación para la gestión de finanzas personales. Permite administrar ingresos y gastos, registrar pagos en cuotas, crear fondos de ahorro y tener un control detallado de tus finanzas.",
  "projects-ajalderaiz-title": "Ajal de Raíz - Tienda Online",
  "projects-ajalderaiz-description": "Plataforma de e-commerce desarrollada para un emprendimiento de plantas, suculentas y macetas. Incluye catálogo de productos, carrito de compras e integración de pagos.",
  "projects-aramy-title": "Aramy Anahata & Xoa Yoga: Portales de Bienestar",
  "projects-aramy-description": "Landing pages de alta fidelidad para servicios de bienestar y salud, enfocadas en la conversión y optimización de SEO local.",
  "projects-view-button": "Ver Proyecto",
  "services-title": "Servicios que Ofrezco",
  "services-web-title": "Desarrollo Web",
  "services-web-description": "Sitios rápidos, escalables y fáciles de administrar. Creo landing pages efectivas, tiendas online listas para vender y sistemas web a medida, con paneles de control adaptados a tu negocio. Trabajo con tecnologías modernas como React, Next.js y Node.js para asegurar velocidad, seguridad y rendimiento.",
  "services-mobile-title": "Desarrollo Móvil",
  "services-mobile-description": "Desarrollo de aplicaciones móviles multiplataforma para Android, construidas con Flutter y React Native. Brindo experiencias fluidas, rápidas y con aspecto nativo, optimizadas para usabilidad y rendimiento en cualquier dispositivo.",
  "services-consulting-title": "Consultoría Tecnológica",
  "services-consulting-description": "Te ayudo a tomar decisiones técnicas inteligentes. Brindo asesoramiento experto en elección de tecnologías, diseño de arquitectura y buenas prácticas de desarrollo para que tu proyecto sea escalable, eficiente y exitoso desde el inicio.",
  "offerings-mainTitle": "Servicios de Creación y Mantenimiento Web",
  "offerings-intro": "Ofrezco un servicio integral para que tengas tu sitio web o tienda online funcionando en tiempo récord, sin complicaciones técnicas y con soporte continuo. Trabajamos sobre plataformas modernas como Tiendanube, Wix o Shopify para ofrecer resultados profesionales desde el primer día.",
  "offerings-essential-planName": "Plan Esencial",
  "offerings-essential-title": "Emprendé sin complicaciones",
  "offerings-essential-description": "Ideal para quienes recién empiezan o quieren validar una idea rápido. Me encargo de todo: creo tu web o tienda con un diseño atractivo y funcional.",
  "offerings-essential-includesTitle": "Incluye:",
  "offerings-essential-feature1": "Alta en plataforma (Tiendanube, Wix, etc.)",
  "offerings-essential-feature2": "Personalización de plantilla",
  "offerings-essential-feature3": "Hasta 5 secciones o productos",
  "offerings-essential-feature4": "Vinculación con redes sociales o WhatsApp",
  "offerings-essential-tagline": "Costo accesible. Entrega rápida.",
  "offerings-continuous-planName": "Plan Continuo",
  "offerings-continuous-title": "Mantené tu sitio siempre actualizado",
  "offerings-continuous-description": "Pensado para quienes ya tienen presencia online y necesitan mantenerla viva, ordenada y profesional.",
  "offerings-continuous-includesTitle": "Incluye:",
  "offerings-continuous-feature1": "Hasta 2 cambios mensuales de contenido",
  "offerings-continuous-feature2": "Actualización de banners o promociones",
  "offerings-continuous-feature3": "Optimización de imágenes",
  "offerings-continuous-feature4": "Backup mensual del sitio",
  "offerings-continuous-feature5": "Soporte técnico por WhatsApp o email",
  "offerings-continuous-tagline": "Ideal para negocios en marcha.",
  "offerings-integral-planName": "Plan Integral",
  "offerings-integral-title": "Escalá y profesionalizá tu marca",
  "offerings-integral-description": "Para quienes quieren delegar todo y enfocarse 100% en su negocio, con acompañamiento continuo y mejoras constantes.",
  "offerings-integral-includesTitle": "Incluye:",
  "offerings-integral-feature1": "Cambios ilimitados",
  "offerings-integral-feature2": "Optimización SEO básica",
  "offerings-integral-feature3": "Reporte mensual de visitas",
  "offerings-integral-feature4": "Campañas simples (Google Ads / Meta Ads)",
  "offerings-integral-feature5": "Integraciones extra (chat, analytics, etc.)",
  "offerings-integral-feature6": "Soporte prioritario",
  "offerings-integral-tagline": "Todo resuelto, sin vueltas.",
  "offerings-cta-question": "¿No sabés cuál es el plan ideal para vos?",
  "offerings-cta-invitation": "¡Hablemos! Vemos juntos qué necesita tu proyecto.",
  "offerings-cta-actionText": "Contáctame",
  "pricing-title": "Planes de Precios",
  "pricing-basic-title": "Básico",
  "pricing-basic-price": "U$s 80",
  "pricing-basic-frequency": "/mes",
  "pricing-basic-features-0": "Desarrollo de Landing Page",
  "pricing-basic-features-1": "Diseño Responsivo",
  "pricing-basic-features-2": "Configuración SEO Básica",
  "pricing-basic-features-3": "2 Revisiones",
  "pricing-standard-title": "Estándar",
  "pricing-standard-price": "U$s 150",
  "pricing-standard-frequency": "/mes",
  "pricing-standard-features-0": "Sitio Web Multi-página (hasta 5 páginas)",
  "pricing-standard-features-1": "Integración CMS",
  "pricing-standard-features-2": "SEO Avanzado",
  "pricing-standard-features-3": "5 Revisiones",
  "pricing-standard-features-4": "Código Fuente",
  "pricing-premium-title": "Premium",
  "pricing-premium-price": "U$s 500+",
  "pricing-premium-frequency": "/mes",
  "pricing-premium-features-0": "Aplicación Web Personalizada",
  "pricing-premium-features-1": "Integración API",
  "pricing-premium-features-2": "Soporte Continuo (1 mes)",
  "pricing-premium-features-3": "Revisiones Ilimitadas",
  "pricing-premium-features-4": "Propiedad Completa",
  "pricing-customText": "¿No encuentras el plan perfecto? Hablemos sobre tus necesidades únicas.",
  "pricing-customCta": "Contáctame para un Plan Personalizado",
  "cta-title": "¿Sos emprendedor, tenés un negocio o brindás servicios?",
  "cta-paragraph1": "Si necesitás una landing page, una tienda online o una web profesional para mostrar lo que hacés y atraer más clientes, estás en el lugar indicado.",
  "cta-paragraph2": "Me especializo en crear soluciones digitales claras, efectivas y adaptadas a cada tipo de proyecto. Ya sea que estés empezando o que necesites profesionalizar tu presencia online, te puedo ayudar.",
  "cta-actionButton": "Contame tu idea y vemos cómo llevarla a la web.",
  "contact-title": "Ponte en Contacto",
  "contact-description": "¿Tenés un proyecto en mente o simplemente querés saludar? Completá el formulario a continuación",
  "contact-social-intro": "o contactame a través de las siguientes redes sociales:",
  "contact-form-name": "Tu Nombre",
  "contact-form-email": "Tu Correo Electrónico",
  "contact-form-message": "Tu Mensaje",
  "contact-form-submit": "Enviar Mensaje",
  "contact-form-submit-sending": "Enviando...",
  "contact-form-success": "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.",
  "contact-form-success-title": "¡Éxito!",
  "contact-form-error-title": "¡Error!",
  "contact-form-error-unexpected": "Ocurrió un error inesperado. Por favor, intenta de nuevo.",
  "contact-form-error-user-friendly": "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo. Si el error persiste, contáctame por otro medio.",
  "contact-form-error-api": "No se pudo enviar el correo a través del servicio externo.",
  "contact-form-error-server-config": "El servidor no está configurado correctamente para enviar correos.",
  "validation-failed": "La validación falló. Por favor, revisa los datos.",
  "validation-name-required": "El nombre es obligatorio",
  "validation-name-maxLength": "El nombre es demasiado largo",
  "validation-email-invalid": "La dirección de correo electrónico no es válida",
  "validation-message-minLength": "El mensaje debe tener al menos 10 caracteres",
  "validation-message-maxLength": "El mensaje es demasiado largo",
  "recaptcha-verification-failed": "La verificación de reCAPTCHA falló. Por favor, inténtalo de nuevo.",
  "recaptcha-service-unavailable": "El servicio de reCAPTCHA no está disponible. Inténtalo más tarde.",
  "footer-copy": "© {year} Clancig FullstackDev. Todos los derechos reservados.",
  "footer-madeWith": "Hecho con Next.js & ShadCN UI",
  "socials-instagram": "Instagram",
  "socials-instagramAria": "Visita el perfil de Instagram de Damián Clancig: {handle}",
  "socials-instagramTooltip": "Ver perfil de Instagram",
  "socials-linkedin": "LinkedIn",
  "socials-linkedinAria": "Visita el perfil de LinkedIn de Damián Clancig: {handle}",
  "socials-linkedinTooltip": "Ver perfil de LinkedIn",
  "socials-github": "GitHub",
  "socials-githubAria": "Visita el perfil de GitHub de Damián Clancig: {handle}",
  "socials-githubTooltip": "Ver repositorios en GitHub",
  "socials-whatsapp": "WhatsApp",
  "socials-whatsappAria": "Contacta a Damián Clancig por WhatsApp",
  "socials-whatsappTooltip": "Enviar mensaje por WhatsApp",
  "socials-email": "Correo Electrónico",
  "socials-emailAria": "Envía un correo electrónico a Damián Clancig: {handle}",
  "socials-emailTooltip": "Enviar un correo electrónico",
  "socials-cafecito": "Cafecito",
  "socials-cafecitoAria": "Apoya a Damián Clancig en Cafecito: {handle}",
  "socials-cafecitoTooltip": "Apoyar con un cafecito",
  "languages-en": "English",
  "languages-es": "Español",
  "languages-pt": "Português",
  "landing-hero-headline": "Ingeniería Full-Stack para proyectos que buscan crecer.",
  "landing-hero-subtext": "Desde aplicaciones a medida hasta ecosistemas digitales gestionados. +15 años de experiencia transformando ideas en plataformas robustas.",
  "landing-hero-cta-primary": "Explorar Soluciones",
  "landing-hero-cta-secondary": "Ver Perfil Técnico",
  "landing-services-title": "Soluciones Digitales Gestionadas",
  "landing-services-subtitle": "Sistemas escalables como servicio. Sin costos ocultos, 100% enfocado en resultados.",
  "landing-services-essential-name": "Plan Essential",
  "landing-services-essential-title": "Digital Kickstart",
  "landing-services-essential-desc": "Presencia online robusta, dominio/hosting gestionado y mantenimiento preventivo.",
  "landing-services-business-name": "Plan Business",
  "landing-services-business-title": "Growth & Performance",
  "landing-services-business-desc": "SEO técnico, sitio multi-sección optimizado y soporte prioritario WhatsApp.",
  "landing-services-enterprise-name": "Plan Enterprise",
  "landing-services-enterprise-title": "Custom Solutions",
  "landing-services-enterprise-desc": "Desarrollo a medida Full-Stack, APIs integradas, consultoría y reporte de métricas.",
  "landing-services-cta": "Consultar Disponibilidad",
  "landing-services-recommended": "Recomendado",
  "landing-portfolio-title": "The Engineering Showcase",
  "landing-portfolio-subtitle": "Casos de estudio, arquitecturas y plataformas diseñadas y desarrolladas.",
  "landing-portfolio-category-ecosystems": "Ecosystems & SaaS",
  "landing-portfolio-category-ecommerce": "E-commerce & Retail",
  "landing-portfolio-category-landing": "Landing Pages & Conversión",
  "landing-portfolio-view-details": "Ver Detalles",
  "landing-portfolio-dialog-role": "Rol",
  "landing-portfolio-dialog-status": "Estado",
  "landing-portfolio-dialog-challenge": "El Desafío",
  "landing-portfolio-dialog-solution": "La Solución",
  "landing-portfolio-dialog-tech": "Stack Tecnológico",
  "landing-portfolio-dialog-insight": "Senior Insight",
  "landing-portfolio-dialog-demo": "Ver Demo en Vivo",
  "landing-contact-title": "Smart Contact Hub",
  "landing-contact-subtitle": "¿Cómo podemos colaborar?",
  "landing-contact-intent-recruiter": "Soy un Reclutador / Empresa",
  "landing-contact-intent-client": "Soy un Cliente / PYME",
  "landing-contact-form-company": "Nombre de la Empresa",
  "landing-contact-form-position": "Posición / Búsqueda Abierta",
  "landing-contact-form-projectType": "Tipo de Proyecto (Web, App, Sistema, SaaS)",
  "landing-contact-form-challenge": "Descripción del Desafío o Idea",
  "landing-contact-form-submit-recruiter": "Solicitar CV & Portfolio",
  "landing-contact-form-submit-client": "Pedir Presupuesto / Consultoría",
  "landing-footer-copy": "Construyendo el futuro de la web, un commit a la vez.",
  "landing-footer-tech": "Desarrollado con Next.js, TailwindCSS y ShadCN UI. Desplegado en Vercel.",
  "landing-tech-marquee-title": "Dominio Polyglot: Desde Modern Full-Stack a Legacy Enterprise",
  "landing-tech-type-modern": "Modern",
  "landing-tech-type-mobile": "Mobile",
  "landing-tech-type-enterprise": "Enterprise",
  "landing-tech-type-legacy": "Legacy",
  "landing-contact-recaptcha-verify": "Por favor, verifica que no eres un robot.",
  "landing-contact-form-company-placeholder": "Acme Corp",
  "landing-contact-form-position-placeholder": "Senior Frontend Engineer",
  "landing-contact-form-name-placeholder": "Tu nombre",
  "landing-contact-form-email-placeholder": "tucorreo@empresa.com",
  "landing-contact-form-projectType-placeholder": "Ej: Tienda Online, App Móvil...",
  "landing-contact-form-message-placeholder-recruiter": "Detalles de la oportunidad...",
  "landing-contact-form-message-placeholder-client": "Contame un poco sobre lo que necesitas resolver...",
  "landing-contact-form-success-message": "Tu mensaje ha sido enviado correctamente. Responderé a la brevedad.",
  "landing-contact-form-sending": "Enviando...",
  "projects-petclan-role": "Architect & Full-Stack Developer",
  "projects-petclan-status": "Producción / SaaS Model",
  "projects-petclan-challenge": "La gestión de la salud de las mascotas suele estar fragmentada en libretas físicas fáciles de perder o dañar. El objetivo era crear una plataforma resiliente y \"Mobile-First\" que centralizara historiales clínicos, planes de vacunación y seguimiento biométrico con una curva de aprendizaje cero para el usuario final.",
  "projects-petclan-solution-0": "Implementación de una arquitectura frontend híbrida (SSG/SSR) para asegurar una carga instantánea de los perfiles.",
  "projects-petclan-solution-1": "Desarrollo de módulos de visualización de datos para el control histórico de peso mediante gráficos dinámicos.",
  "projects-petclan-solution-2": "Creación de un sistema de lógica preventiva para gestionar desparasitaciones y emitir notificaciones inteligentes de próximos vencimientos.",
  "projects-petclan-insight": "Prioricé la mantenibilidad del código creando una arquitectura de componentes modulares. Esto permite escalar el sistema para añadir nuevas features, como tele-consultas, sin afectar el core de la libreta sanitaria digital.",
  "projects-financlan-role": "Architect & Full-Stack Developer",
  "projects-financlan-status": "Producción / Herramienta Interna",
  "projects-financlan-challenge": "Las aplicaciones financieras comunes fallan al no ofrecer previsibilidad a largo plazo sobre gastos recurrentes y pagos fraccionados. Se requería un dashboard de alta fidelidad visual que garantizara la consistencia de los registros en tiempo real.",
  "projects-financlan-solution-0": "Integración de un sistema de autenticación seguro (Google Auth) y normalización de la base de datos para proteger la privacidad de los flujos de caja.",
  "projects-financlan-solution-1": "Desarrollo de un algoritmo de proyección que calcula el impacto mensual de las compras en cuotas y los fondos de ahorro en el presupuesto anual.",
  "projects-financlan-solution-2": "Implementación de gestión de estados complejos para soportar categorías de ingresos/gastos 100% personalizables.",
  "projects-financlan-insight": "El verdadero valor de FinanClan reside en su motor de proyección. Diseñé la lógica de datos para que el sistema transforme registros estáticos en una herramienta predictiva para la toma de decisiones financieras.",
  "projects-aulacheck-title": "AulaCheck",
  "projects-aulacheck-role": "Lead Full-Stack Developer",
  "projects-aulacheck-status": "En Desarrollo (Beta)",
  "projects-aulacheck-challenge": "Eliminar la fricción en la toma de asistencia y el seguimiento del progreso académico en entornos educativos, manejando un alto volumen de transacciones concurrentes.",
  "projects-aulacheck-solution-0": "Diseño de un sistema de sincronización de datos masivos para el reporte de presencialidad de alumnos al instante.",
  "projects-aulacheck-solution-1": "Arquitectura orientada a eventos para procesar y actualizar los dashboards de los docentes sin latencia.",
  "projects-ajalderaiz-role": "Full-Stack Developer & Technical Consultant",
  "projects-ajalderaiz-status": "Producción / Activo",
  "projects-ajalderaiz-challenge": "Unificar dos modelos de negocio divergentes (venta de productos físicos como suculentas/kokedamas y reserva de servicios por hora como guardería de plantas) en una sola experiencia de compra fluida y coherente.",
  "projects-ajalderaiz-solution-0": "Arquitectura de E-commerce híbrido con un catálogo dinámico capaz de diferenciar flujos de checkout entre stock físico y servicios agendados.",
  "projects-ajalderaiz-solution-1": "Optimización de CRO (Conversion Rate Optimization) mediante validación de zonas de envío en tiempo real e integración directa de pagos.",
  "projects-ajalderaiz-solution-2": "Diseño UI adaptativo que refleja la identidad orgánica de la marca asegurando tiempos de carga (LCP) inferiores a 1.5s.",
  "projects-ajalderaiz-insight": "Actué como Consultor Tecnológico estructurando la plataforma para vender 'servicios de valor' además de productos. Esta digitalización logística permitió al negocio aumentar significativamente su ticket promedio.",
  "projects-aramy-role": "Frontend Developer & UI Designer",
  "projects-aramy-status": "Producción / Activo",
  "projects-aramy-challenge": "Trasladar la identidad de terapias holísticas (Reiki, masajes, yoga) a interfaces digitales minimalistas sin sacrificar la velocidad de carga ni la capacidad de captación de leads.",
  "projects-aramy-solution-0": "Desarrollo de Landing Pages de alta fidelidad visual enfocadas en embudos de conversión directa hacia WhatsApp para la reserva de turnos.",
  "projects-aramy-solution-1": "Estructuración semántica HTML5 y optimización de metadatos para dominar el SEO local en la búsqueda de terapeutas y profesores.",
  "projects-aramy-solution-2": "Integración de catálogos ligeros para productos artesanales (jabones y perfumes energéticos).",
  "projects-meteoclan-role": "Frontend Developer",
  "projects-meteoclan-status": "Producción / Activo",
  "projects-meteoclan-challenge": "Crear una utilidad de consulta meteorológica extremadamente rápida y limpia, libre del ruido visual de las aplicaciones climáticas tradicionales.",
  "projects-meteoclan-solution-0": "Consumo eficiente y manejo de caché de APIs públicas de meteorología.",
  "projects-meteoclan-solution-1": "Interfaz minimalista desarrollada con componentes de estado puro para garantizar respuestas instantáneas en la búsqueda de cualquier ciudad del mundo."
}```

### 6.2 en.json
```json
{
  "appName": "Clancig FullstackDev",
  "nav-home": "Home",
  "nav-bio": "Bio",
  "nav-projects": "Projects",
  "nav-services": "Services",
  "nav-offerings": "Offerings",
  "nav-pricing": "Pricing",
  "nav-contact": "Contact",
  "hero-greeting": "Hello, I'm",
  "hero-name": "Damián",
  "hero-title": "Full-Stack Developer",
  "hero-subtitle": "Crafting modern web and mobile experiences.",
  "hero-cta": "Get in Touch",
  "hero-codeBackgroundAlt": "Abstract code background",
  "bio-title": "About Me",
  "bio-paragraph1": "I am a passionate Full-Stack Developer with over 15 years of experience in creating robust and scalable applications. My expertise lies in JavaScript, TypeScript, React, Next.js, Node.js, and mobile development with React Native and Flutter.",
  "bio-paragraph2": "I thrive on solving complex problems and delivering high-quality software that meets user needs and business goals. I'm a lifelong learner, always exploring new technologies to enhance my skill set.",
  "bio-paragraph3": "Currently, I am dedicated to offering custom web and mobile solutions, helping entrepreneurs and businesses bring their ideas to life with cutting-edge technology. From creating impactful websites and efficient online stores, to developing mobile applications and strategic technology consulting, my goal is to drive your project to the next level.",
  "bio-secondImageAlt": "Developer workspace",
  "projects-title": "Project Portfolio",
  "projects-petclan-title": "PetClan: Veterinary Health Ecosystem",
  "projects-petclan-description": "PetClan is a modern, comprehensive web application designed to simplify the integral management of your pets' health. With an intuitive and elegant interface, it allows for keeping detailed records of vaccines, weight control, deworming, veterinary consultations, and much more.",
  "projects-meteoclan-title": "MeteoClan: Fast Consumption of Weather Data",
  "projects-meteoclan-description": "A simple and clean application for checking the current weather and forecast for any city in the world, built with React and a public weather API.",
  "projects-financlan-title": "FinanClan",
  "projects-financlan-description": "An application for personal finance management. It allows you to manage income and expenses, track installment payments, create savings funds, and have a detailed control over your finances.",
  "projects-ajalderaiz-title": "Ajal de Raíz - E-commerce",
  "projects-ajalderaiz-description": "E-commerce platform developed for a business of plants, succulents, and pots. It includes product catalog, shopping cart, and online payment integration.",
  "projects-aramy-title": "Aramy Anahata & Xoa Yoga: Wellness Portals",
  "projects-aramy-description": "High-fidelity landing pages for holistic health and wellness services, focused on conversion and local SEO optimization.",
  "projects-view-button": "View Project",
  "services-title": "Services I Offer",
  "services-web-title": "Web Development",
  "services-web-description": "Fast, scalable, and easy-to-manage sites. I create effective landing pages, e-commerce stores ready to sell, and custom web systems with control panels tailored to your business. I work with modern technologies like React, Next.js, and Node.js to ensure speed, security, and performance.",
  "services-mobile-title": "Mobile Development",
  "services-mobile-description": "Cross-platform mobile application development for Android, built with Flutter and React Native. I provide fluid, fast, and native-looking experiences, optimized for usability and performance on any device.",
  "services-consulting-title": "Tech Consulting",
  "services-consulting-description": "I help you make smart technical decisions. I provide expert advice on technology choices, architectural design, and development best practices so your project is scalable, efficient, and successful from the start.",
  "offerings-mainTitle": "Web Creation & Maintenance Services",
  "offerings-intro": "I offer a comprehensive service so you can have your website or online store up and running in record time, without technical complications and with ongoing support. We work on modern platforms like Tiendanube, Wix, or Shopify to deliver professional results from day one.",
  "offerings-essential-planName": "Essential Plan",
  "offerings-essential-title": "Start your venture without complications",
  "offerings-essential-description": "Ideal for those just starting out or wanting to validate an idea quickly. I take care of everything: I create your website or store with an attractive and functional design.",
  "offerings-essential-includesTitle": "Includes:",
  "offerings-essential-feature1": "Platform setup (Tiendanube, Wix, etc.)",
  "offerings-essential-feature2": "Template customization",
  "offerings-essential-feature3": "Up to 5 sections or products",
  "offerings-essential-feature4": "Link to social media or WhatsApp",
  "offerings-essential-tagline": "Affordable cost. Fast delivery.",
  "offerings-continuous-planName": "Continuous Plan",
  "offerings-continuous-title": "Keep your site always updated",
  "offerings-continuous-description": "Designed for those who already have an online presence and need to keep it alive, organized, and professional.",
  "offerings-continuous-includesTitle": "Includes:",
  "offerings-continuous-feature1": "Up to 2 monthly content changes",
  "offerings-continuous-feature2": "Banner or promotion updates",
  "offerings-continuous-feature3": "Image optimization",
  "offerings-continuous-feature4": "Monthly site backup",
  "offerings-continuous-feature5": "Technical support via WhatsApp or email",
  "offerings-continuous-tagline": "Ideal for ongoing businesses.",
  "offerings-integral-planName": "Integral Plan",
  "offerings-integral-title": "Scale and professionalize your brand",
  "offerings-integral-description": "For those who want to delegate everything and focus 100% on their business, with continuous support and constant improvements.",
  "offerings-integral-includesTitle": "Includes:",
  "offerings-integral-feature1": "Unlimited changes",
  "offerings-integral-feature2": "Basic SEO optimization",
  "offerings-integral-feature3": "Monthly visit report",
  "offerings-integral-feature4": "Simple campaigns (Google Ads / Meta Ads)",
  "offerings-integral-feature5": "Extra integrations (chat, analytics, etc.)",
  "offerings-integral-feature6": "Priority support",
  "offerings-integral-tagline": "Everything resolved, no fuss.",
  "offerings-cta-question": "Don't know which plan is ideal for you?",
  "offerings-cta-invitation": "Let's talk! Let's see together what your project needs.",
  "offerings-cta-actionText": "Contact Me",
  "pricing-title": "Pricing Plans",
  "pricing-basic-title": "Basic",
  "pricing-basic-price": "U$s 80",
  "pricing-basic-frequency": "/month",
  "pricing-basic-features-0": "Landing Page Development",
  "pricing-basic-features-1": "Responsive Design",
  "pricing-basic-features-2": "Basic SEO Setup",
  "pricing-basic-features-3": "2 Revisions",
  "pricing-standard-title": "Standard",
  "pricing-standard-price": "U$s 150",
  "pricing-standard-frequency": "/month",
  "pricing-standard-features-0": "Multi-page Website (up to 5 pages)",
  "pricing-standard-features-1": "CMS Integration",
  "pricing-standard-features-2": "Advanced SEO",
  "pricing-standard-features-3": "5 Revisions",
  "pricing-standard-features-4": "Source Code",
  "pricing-premium-title": "Premium",
  "pricing-premium-price": "U$s 500+",
  "pricing-premium-frequency": "/month",
  "pricing-premium-features-0": "Custom Web Application",
  "pricing-premium-features-1": "API Integration",
  "pricing-premium-features-2": "Ongoing Support (1 month)",
  "pricing-premium-features-3": "Unlimited Revisions",
  "pricing-premium-features-4": "Full Ownership",
  "pricing-customText": "Don't see a perfect fit? Let's discuss your unique needs.",
  "pricing-customCta": "Contact Me for a Custom Plan",
  "cta-title": "Are you an entrepreneur, have a business, or provide services?",
  "cta-paragraph1": "If you need a landing page, an online store, or a professional website to showcase what you do and attract more clients, you're in the right place.",
  "cta-paragraph2": "I specialize in creating clear, effective, and tailored digital solutions for every type of project. Whether you're just starting out or need to professionalize your online presence, I can help.",
  "cta-actionButton": "Tell me your idea and let's bring it to the web.",
  "contact-title": "Get in Touch",
  "contact-description": "Have a project in mind or just want to say hi? Fill out the form below",
  "contact-social-intro": "or contact me through the following social networks:",
  "contact-form-name": "Your Name",
  "contact-form-email": "Your Email",
  "contact-form-message": "Your Message",
  "contact-form-submit": "Send Message",
  "contact-form-submit-sending": "Sending...",
  "contact-form-success": "Message sent successfully! I'll get back to you soon.",
  "contact-form-success-title": "Success!",
  "contact-form-error-title": "Error!",
  "contact-form-error-unexpected": "An unexpected error occurred. Please try again.",
  "contact-form-error-user-friendly": "There was a problem sending your message. Please try again. If the error persists, please contact me through other means.",
  "contact-form-error-api": "Could not send the email through the external service.",
  "contact-form-error-server-config": "The server is not configured correctly to send emails.",
  "validation-failed": "Validation failed. Please check your input.",
  "validation-name-required": "Name is required",
  "validation-name-maxLength": "Name is too long",
  "validation-email-invalid": "Invalid email address",
  "validation-message-minLength": "Message must be at least 10 characters",
  "validation-message-maxLength": "Message is too long",
  "recaptcha-verification-failed": "reCAPTCHA verification failed. Please try again.",
  "recaptcha-service-unavailable": "reCAPTCHA service is unavailable. Please try again later.",
  "footer-copy": "© {year} Clancig FullstackDev. All rights reserved.",
  "footer-madeWith": "Made with Next.js & ShadCN UI",
  "socials-instagram": "Instagram",
  "socials-instagramAria": "Visit Damián Clancig's Instagram profile: {handle}",
  "socials-instagramTooltip": "View Instagram profile",
  "socials-linkedin": "LinkedIn",
  "socials-linkedinAria": "Visit Damián Clancig's LinkedIn profile: {handle}",
  "socials-linkedinTooltip": "View LinkedIn profile",
  "socials-github": "GitHub",
  "socials-githubAria": "Visit Damián Clancig's GitHub profile: {handle}",
  "socials-githubTooltip": "View repositories",
  "socials-whatsapp": "WhatsApp",
  "socials-whatsappAria": "Contact Damián Clancig on WhatsApp",
  "socials-whatsappTooltip": "Send a WhatsApp message",
  "socials-email": "Email",
  "socials-emailAria": "Send an email to Damián Clancig: {handle}",
  "socials-emailTooltip": "Send an email",
  "socials-cafecito": "Cafecito",
  "socials-cafecitoAria": "Support Damián Clancig on Cafecito: {handle}",
  "socials-cafecitoTooltip": "Support with a 'cafecito'",
  "languages-en": "English",
  "languages-es": "Español",
  "languages-pt": "Português",
  "landing-hero-headline": "Full-Stack Engineering for projects that want to grow.",
  "landing-hero-subtext": "From custom applications to managed digital ecosystems. +15 years of experience transforming ideas into robust platforms.",
  "landing-hero-cta-primary": "Explore Solutions",
  "landing-hero-cta-secondary": "View Tech Profile",
  "landing-services-title": "Managed Digital Solutions",
  "landing-services-subtitle": "Scalable systems as a service. No hidden costs, 100% focused on results.",
  "landing-services-essential-name": "Essential Plan",
  "landing-services-essential-title": "Digital Kickstart",
  "landing-services-essential-desc": "Robust online presence, managed domain/hosting and preventive maintenance.",
  "landing-services-business-name": "Business Plan",
  "landing-services-business-title": "Growth & Performance",
  "landing-services-business-desc": "Technical SEO, optimized multi-section site, and priority WhatsApp support.",
  "landing-services-enterprise-name": "Enterprise Plan",
  "landing-services-enterprise-title": "Custom Solutions",
  "landing-services-enterprise-desc": "Custom Full-Stack development, integrated APIs, consulting and metric reporting.",
  "landing-services-cta": "Check Availability",
  "landing-services-recommended": "Recommended",
  "landing-portfolio-title": "The Engineering Showcase",
  "landing-portfolio-subtitle": "Case studies, architectures and platforms designed and developed.",
  "landing-portfolio-category-ecosystems": "Ecosystems & SaaS",
  "landing-portfolio-category-ecommerce": "E-commerce & Retail",
  "landing-portfolio-category-landing": "Landing Pages & Conversión",
  "landing-portfolio-view-details": "View Details",
  "landing-portfolio-dialog-role": "Role",
  "landing-portfolio-dialog-status": "Status",
  "landing-portfolio-dialog-challenge": "The Challenge",
  "landing-portfolio-dialog-solution": "The Solution",
  "landing-portfolio-dialog-tech": "Tech Stack",
  "landing-portfolio-dialog-insight": "Senior Insight",
  "landing-portfolio-dialog-demo": "View Live Demo",
  "landing-contact-title": "Smart Contact Hub",
  "landing-contact-subtitle": "How can we collaborate?",
  "landing-contact-intent-recruiter": "I'm a Recruiter / Company",
  "landing-contact-intent-client": "I'm a Client / SMB",
  "landing-contact-form-company": "Company Name",
  "landing-contact-form-position": "Open Position / Search",
  "landing-contact-form-projectType": "Project Type (Web, App, System, SaaS)",
  "landing-contact-form-challenge": "Challenge or Idea Description",
  "landing-contact-form-submit-recruiter": "Request CV & Portfolio",
  "landing-contact-form-submit-client": "Request Quote / Consulting",
  "landing-footer-copy": "Building the future of the web, one commit at a time.",
  "landing-footer-tech": "Developed with Next.js, TailwindCSS, and ShadCN UI. Deployed on Vercel.",
  "landing-tech-marquee-title": "Polyglot Domain: From Modern Full-Stack to Legacy Enterprise",
  "landing-tech-type-modern": "Modern",
  "landing-tech-type-mobile": "Mobile",
  "landing-tech-type-enterprise": "Enterprise",
  "landing-tech-type-legacy": "Legacy",
  "landing-contact-recaptcha-verify": "Please verify that you are not a robot.",
  "landing-contact-form-company-placeholder": "Acme Corp",
  "landing-contact-form-position-placeholder": "Senior Frontend Engineer",
  "landing-contact-form-name-placeholder": "Your name",
  "landing-contact-form-email-placeholder": "yourname@company.com",
  "landing-contact-form-projectType-placeholder": "E.g.: Online Store, Mobile App...",
  "landing-contact-form-message-placeholder-recruiter": "Opportunity details...",
  "landing-contact-form-message-placeholder-client": "Tell me a bit about what you need to solve...",
  "landing-contact-form-success-message": "Your message has been successfully sent. I will respond shortly.",
  "landing-contact-form-sending": "Sending...",
  "projects-petclan-role": "Architect & Full-Stack Developer",
  "projects-petclan-status": "Production / SaaS Model",
  "projects-petclan-challenge": "Pet health management is often fragmented in physical notebooks that are easy to lose or damage. The goal was to create a resilient, Mobile-First platform that centralizes medical histories, vaccination plans, and biometric tracking with zero learning curve for the end user.",
  "projects-petclan-solution-0": "Implementation of a hybrid frontend architecture (SSG/SSR) to ensure instant profile loading.",
  "projects-petclan-solution-1": "Development of data visualization modules for historical weight control using dynamic charts.",
  "projects-petclan-solution-2": "Creation of a preventive logic system to manage deworming and issue smart notifications for upcoming due dates.",
  "projects-petclan-insight": "I prioritized code maintainability by creating a modular component architecture. This allows the system to scale to add new features, such as tele-consultations, without affecting the core digital health record.",
  "projects-financlan-role": "Architect & Full-Stack Developer",
  "projects-financlan-status": "Production / Internal Tool",
  "projects-financlan-challenge": "Common financial applications fail by not offering long-term predictability on recurring expenses and installment payments. A high-fidelity visual dashboard was required to guarantee consistency of records in real time.",
  "projects-financlan-solution-0": "Integration of a secure authentication system (Google Auth) and database normalization to protect cash flow privacy.",
  "projects-financlan-solution-1": "Development of a projection algorithm that calculates the monthly impact of installment purchases and savings funds on the annual budget.",
  "projects-financlan-solution-2": "Implementation of complex state management to support 100% customizable income/expense categories.",
  "projects-financlan-insight": "The real value of FinanClan lies in its projection engine. I designed the data logic so that the system transforms static records into a predictive tool for financial decision-making.",
  "projects-aulacheck-title": "AulaCheck",
  "projects-aulacheck-role": "Lead Full-Stack Developer",
  "projects-aulacheck-status": "In Development (Beta)",
  "projects-aulacheck-challenge": "Eliminate friction in attendance taking and tracking academic progress in educational environments, handling a high volume of concurrent transactions.",
  "projects-aulacheck-solution-0": "Design of a massive data synchronization system for instant student attendance reporting.",
  "projects-aulacheck-solution-1": "Event-oriented architecture to process and update teacher dashboards without latency.",
  "projects-ajalderaiz-role": "Full-Stack Developer & Technical Consultant",
  "projects-ajalderaiz-status": "Production / Active",
  "projects-ajalderaiz-challenge": "Unify two divergent business models (sale of physical products like succulents/kokedamas and booking of services by the hour like plant daycare) into a single fluid and coherent shopping experience.",
  "projects-ajalderaiz-solution-0": "Hybrid E-commerce architecture with a dynamic catalog capable of differentiating checkout flows between physical stock and scheduled services.",
  "projects-ajalderaiz-solution-1": "CRO (Conversion Rate Optimization) through real-time shipping zone validation and direct payment integration.",
  "projects-ajalderaiz-solution-2": "Adaptive UI design that reflects the brand's organic identity while ensuring load times (LCP) below 1.5s.",
  "projects-ajalderaiz-insight": "I acted as a Technical Consultant by structuring the platform to sell 'value services' in addition to products. This logistical digitalization allowed the business to significantly increase its average ticket.",
  "projects-aramy-role": "Frontend Developer & UI Designer",
  "projects-aramy-status": "Production / Active",
  "projects-aramy-challenge": "Translate the identity of holistic therapies (Reiki, massages, yoga) to minimalist digital interfaces without sacrificing load speed or lead capture capacity.",
  "projects-aramy-solution-0": "Development of high-fidelity visual Landing Pages focused on direct conversion funnels to WhatsApp for appointment booking.",
  "projects-aramy-solution-1": "Semantic HTML5 structuring and metadata optimization to dominate local SEO in the search for therapists and teachers.",
  "projects-aramy-solution-2": "Integration of lightweight catalogs for artisanal products (soaps and energetic perfumes).",
  "projects-meteoclan-role": "Frontend Developer",
  "projects-meteoclan-status": "Production / Active",
  "projects-meteoclan-challenge": "Create an extremely fast and clean weather query utility, free from the visual noise of traditional weather applications.",
  "projects-meteoclan-solution-0": "Efficient consumption and cache management of public weather APIs.",
  "projects-meteoclan-solution-1": "Minimalist interface developed with pure state components to guarantee instant responses when searching for any city in the world."
}```

### 6.3 pt.json
```json
{
  "appName": "Clancig FullstackDev",
  "nav-home": "Início",
  "nav-bio": "Bio",
  "nav-projects": "Projetos",
  "nav-services": "Serviços",
  "nav-offerings": "Ofertas",
  "nav-pricing": "Preços",
  "nav-contact": "Contato",
  "hero-greeting": "Olá, eu sou",
  "hero-name": "Damián",
  "hero-title": "Desenvolvedor Full-Stack",
  "hero-subtitle": "Criando experiências web e móveis modernas.",
  "hero-cta": "Entre em Contato",
  "hero-codeBackgroundAlt": "Fundo abstrato de código",
  "bio-title": "Sobre Mim",
  "bio-paragraph1": "Sou um Desenvolvedor Full-Stack apaixonado com mais de 15 anos de experiência na criação de aplicações robustas e escaláveis. Minha especialidade reside em JavaScript, TypeScript, React, Next.js, Node.js e desenvolvimento móvel com React Native e Flutter.",
  "bio-paragraph2": "Eu prospero resolvendo problemas complexos e entregando software de alta qualidade que atenda às necessidades do usuário e aos objetivos de negócios. Sou um aprendiz vitalício, sempre explorando novas tecnologias para aprimorar meu conjunto de habilidades.",
  "bio-paragraph3": "Atualmente, dedico-me a oferecer soluções web e móveis personalizadas, ajudando empreendedores e empresas a materializar suas ideias com tecnologia de ponta. Desde a criação de sites impactantes e lojas online eficientes, até o desenvolvimento de aplicativos móveis e consultoria tecnológica estratégica, meu objetivo é impulsionar seu projeto para o próximo nível.",
  "bio-secondImageAlt": "Espaço de trabalho do desenvolvedor",
  "projects-title": "Portfólio de Projetos",
  "projects-petclan-title": "PetClan: Ecossistema de Saúde Veterinária",
  "projects-petclan-description": "PetClan é uma aplicação web moderna e completa projetada para simplificar a gestão integral da saúde dos seus animais de estimação. Com uma interface intuitiva e elegante, permite manter registros detalhados de vacinas, controle de peso, desparasitações, consultas veterinárias e muito mais.",
  "projects-meteoclan-title": "MeteoClan: Consumo Ágil de Dados Climáticos",
  "projects-meteoclan-description": "Uma aplicação simples e limpa para verificar o clima atual e a previsão para qualquer cidade do mundo, construída com React e uma API de clima pública.",
  "projects-financlan-title": "FinanClan",
  "projects-financlan-description": "Uma aplicação para gestão de finanças pessoais. Permite gerir receitas e despesas, registar pagamentos parcelados, criar fundos de poupança e ter um controlo detalhado das suas finanças.",
  "projects-ajalderaiz-title": "Ajal de Raíz - E-commerce",
  "projects-ajalderaiz-description": "Plataforma de e-commerce desenvolvida para um negócio de plantas, suculentas e vasos. Inclui catálogo de produtos, carrinho de compras e integração de pagamentos online.",
  "projects-aramy-title": "Aramy Anahata & Xoa Yoga: Portais de Bem-Estar",
  "projects-aramy-description": "Páginas de destino de alta fidelidade para serviços de saúde e bem-estar holísticos, focadas na conversão e otimização de SEO local.",
  "projects-view-button": "Ver Projeto",
  "services-title": "Serviços que Ofereço",
  "services-web-title": "Desenvolvimento Web",
  "services-web-description": "Sites rápidos, escaláveis e fáceis de gerenciar. Crio landing pages eficazes, lojas online prontas para vender e sistemas web personalizados, com painéis de controle adaptados ao seu negócio. Trabalho com tecnologias modernas como React, Next.js e Node.js para garantir velocidade, segurança e desempenho.",
  "services-mobile-title": "Desenvolvimento Móvel",
  "services-mobile-description": "Desenvolvimento de aplicativos móveis multiplataforma para Android, construídos com Flutter e React Native. Ofereço experiências fluidas, rápidas e com aparência nativa, otimizadas para usabilidade e desempenho em qualquer dispositivo.",
  "services-consulting-title": "Consultoria de Tecnologia",
  "services-consulting-description": "Eu te ajudo a tomar decisões técnicas inteligentes. Forneço aconselhamento especializado na escolha de tecnologias, design de arquitetura e boas práticas de desenvolvimento para que seu projeto seja escalável, eficiente e bem-sucedido desde o início.",
  "offerings-mainTitle": "Serviços de Criação e Manutenção Web",
  "offerings-intro": "Ofereço um serviço completo para que você tenha seu site ou loja online funcionando em tempo recorde, sem complicações técnicas e com suporte contínuo. Trabalhamos em plataformas modernas como Tiendanube, Wix ou Shopify para entregar resultados profissionais desde o primeiro dia.",
  "offerings-essential-planName": "Plano Essencial",
  "offerings-essential-title": "Comece seu empreendimento sem complicações",
  "offerings-essential-description": "Ideal para quem está começando ou quer validar uma ideia rapidamente. Eu cuido de tudo: crio seu site ou loja com um design atraente e funcional.",
  "offerings-essential-includesTitle": "Inclui:",
  "offerings-essential-feature1": "Configuração da plataforma (Tiendanube, Wix, etc.)",
  "offerings-essential-feature2": "Personalização de template",
  "offerings-essential-feature3": "Até 5 seções ou produtos",
  "offerings-essential-feature4": "Vinculação com redes sociais ou WhatsApp",
  "offerings-essential-tagline": "Custo acessível. Entrega rápida.",
  "offerings-continuous-planName": "Plano Contínuo",
  "offerings-continuous-title": "Mantenha seu site sempre atualizado",
  "offerings-continuous-description": "Pensado para quem já tem presença online e precisa mantê-la viva, organizada e profissional.",
  "offerings-continuous-includesTitle": "Inclui:",
  "offerings-continuous-feature1": "Até 2 alterações mensais de conteúdo",
  "offerings-continuous-feature2": "Atualização de banners ou promoções",
  "offerings-continuous-feature3": "Otimização de imagens",
  "offerings-continuous-feature4": "Backup mensal do site",
  "offerings-continuous-feature5": "Suporte técnico via WhatsApp ou email",
  "offerings-continuous-tagline": "Ideal para negócios em andamento.",
  "offerings-integral-planName": "Plano Integral",
  "offerings-integral-title": "Escale e profissionalize sua marca",
  "offerings-integral-description": "Para quem quer delegar tudo e focar 100% no seu negócio, com acompanhamento contínuo e melhorias constantes.",
  "offerings-integral-includesTitle": "Inclui:",
  "offerings-integral-feature1": "Alterações ilimitadas",
  "offerings-integral-feature2": "Otimização SEO básica",
  "offerings-integral-feature3": "Relatório mensal de visitas",
  "offerings-integral-feature4": "Campanhas simples (Google Ads / Meta Ads)",
  "offerings-integral-feature5": "Integrações extras (chat, analytics, etc.)",
  "offerings-integral-feature6": "Suporte prioritário",
  "offerings-integral-tagline": "Tudo resolvido, sem complicações.",
  "offerings-cta-question": "Não sabe qual é o plano ideal para você?",
  "offerings-cta-invitation": "Vamos conversar! Veremos juntos o que seu projeto precisa.",
  "offerings-cta-actionText": "Contate-me",
  "pricing-title": "Planos de Preços",
  "pricing-basic-title": "Básico",
  "pricing-basic-price": "U$s 80",
  "pricing-basic-frequency": "/mês",
  "pricing-basic-features-0": "Desenvolvimento de Landing Page",
  "pricing-basic-features-1": "Design Responsivo",
  "pricing-basic-features-2": "Configuração SEO Básica",
  "pricing-basic-features-3": "2 Revisões",
  "pricing-standard-title": "Padrão",
  "pricing-standard-price": "U$s 150",
  "pricing-standard-frequency": "/mês",
  "pricing-standard-features-0": "Website Multi-página (até 5 páginas)",
  "pricing-standard-features-1": "Integração CMS",
  "pricing-standard-features-2": "SEO Avançado",
  "pricing-standard-features-3": "5 Revisões",
  "pricing-standard-features-4": "Código Fonte",
  "pricing-premium-title": "Premium",
  "pricing-premium-price": "U$s 500+",
  "pricing-premium-frequency": "/mês",
  "pricing-premium-features-0": "Aplicação Web Personalizada",
  "pricing-premium-features-1": "Integração API",
  "pricing-premium-features-2": "Suporte Contínuo (1 mês)",
  "pricing-premium-features-3": "Revisões Ilimitadas",
  "pricing-premium-features-4": "Propriedade Total",
  "pricing-customText": "Não encontrou o plano perfeito? Vamos discutir suas necessidades exclusivas.",
  "pricing-customCta": "Contate-me para um Plano Personalizado",
  "cta-title": "Você é empreendedor, tem um negócio ou oferece serviços?",
  "cta-paragraph1": "Se você precisa de uma landing page, uma loja online ou um site profissional para mostrar o que faz e atrair mais clientes, você está no lugar certo.",
  "cta-paragraph2": "Sou especialista em criar soluções digitais claras, eficazes e adaptadas a cada tipo de projeto. Seja para quem está começando ou para quem precisa profissionalizar sua presença online, eu posso ajudar.",
  "cta-actionButton": "Conte-me sua ideia e vamos levá-la para a web.",
  "contact-title": "Entre em Contato",
  "contact-description": "Tem um projeto em mente ou só quer dizer oi? Preencha o formulário abaixo",
  "contact-social-intro": "ou entre em contato através das seguintes redes sociais:",
  "contact-form-name": "Seu Nome",
  "contact-form-email": "Seu Email",
  "contact-form-message": "Sua Mensagem",
  "contact-form-submit": "Enviar Mensagem",
  "contact-form-submit-sending": "Enviando...",
  "contact-form-success": "Mensagem enviada com sucesso! Entrarei em contato em breve.",
  "contact-form-success-title": "Sucesso!",
  "contact-form-error-title": "Erro!",
  "contact-form-error-unexpected": "Ocorreu um erro inesperado. Por favor, tente novamente.",
  "contact-form-error-user-friendly": "Houve um problema ao enviar sua mensagem. Por favor, tente novamente. Se o erro persistir, entre em contato por outros meios.",
  "contact-form-error-api": "Não foi possível enviar o e-mail através do serviço externo.",
  "contact-form-error-server-config": "O servidor não está configurado corretamente para enviar e-mails.",
  "validation-failed": "A validação falhou. Por favor, verifique suas informações.",
  "validation-name-required": "O nome é obrigatório",
  "validation-name-maxLength": "O nome é muito longo",
  "validation-email-invalid": "Endereço de e-mail inválido",
  "validation-message-minLength": "A mensagem deve ter pelo menos 10 caracteres",
  "validation-message-maxLength": "A mensagem é muito longa",
  "recaptcha-verification-failed": "A verificação do reCAPTCHA falhou. Por favor, tente novamente.",
  "recaptcha-service-unavailable": "O serviço reCAPTCHA não está disponível. Por favor, tente novamente mais tarde.",
  "footer-copy": "© {year} Clancig FullstackDev. Todos os direitos reservados.",
  "footer-madeWith": "Feito com Next.js & ShadCN UI",
  "socials-instagram": "Instagram",
  "socials-instagramAria": "Visite o perfil do Instagram de Damián Clancig: {handle}",
  "socials-instagramTooltip": "Ver perfil do Instagram",
  "socials-linkedin": "LinkedIn",
  "socials-linkedinAria": "Visite o perfil do LinkedIn de Damián Clancig: {handle}",
  "socials-linkedinTooltip": "Ver perfil do LinkedIn",
  "socials-github": "GitHub",
  "socials-githubAria": "Visite o perfil do GitHub de Damián Clancig: {handle}",
  "socials-githubTooltip": "Ver repositórios no GitHub",
  "socials-whatsapp": "WhatsApp",
  "socials-whatsappAria": "Contate Damián Clancig no WhatsApp",
  "socials-whatsappTooltip": "Enviar mensagem pelo WhatsApp",
  "socials-email": "Email",
  "socials-emailAria": "Envie um email para Damián Clancig: {handle}",
  "socials-emailTooltip": "Enviar um e-mail",
  "socials-cafecito": "Cafecito",
  "socials-cafecitoAria": "Apoie Damián Clancig no Cafecito: {handle}",
  "socials-cafecitoTooltip": "Apoiar com um 'cafecito'",
  "languages-en": "English",
  "languages-es": "Español",
  "languages-pt": "Português",
  "landing-hero-headline": "Engenharia Full-Stack para projetos que buscam crescer.",
  "landing-hero-subtext": "Desde aplicativos sob medida até ecossistemas digitais gerenciados. +15 anos de experiência transformando ideias em plataformas robustas.",
  "landing-hero-cta-primary": "Explorar Soluções",
  "landing-hero-cta-secondary": "Ver Perfil Técnico",
  "landing-services-title": "Soluções Digitais Gerenciadas",
  "landing-services-subtitle": "Sistemas escaláveis como serviço. Sem custos ocultos, 100% focado em resultados.",
  "landing-services-essential-name": "Plano Essential",
  "landing-services-essential-title": "Digital Kickstart",
  "landing-services-essential-desc": "Presença online robusta, domínio/hospedagem gerenciada e manutenção preventiva.",
  "landing-services-business-name": "Plano Business",
  "landing-services-business-title": "Growth & Performance",
  "landing-services-business-desc": "SEO técnico, site multisseção otimizado e suporte prioritário no WhatsApp.",
  "landing-services-enterprise-name": "Plano Enterprise",
  "landing-services-enterprise-title": "Custom Solutions",
  "landing-services-enterprise-desc": "Desenvolvimento sob medida Full-Stack, APIs integradas, consultoria e relatórios de métricas.",
  "landing-services-cta": "Consultar Disponibilidade",
  "landing-services-recommended": "Recomendado",
  "landing-portfolio-title": "The Engineering Showcase",
  "landing-portfolio-subtitle": "Casos de estudo, arquiteturas e plataformas projetadas e desenvolvidas.",
  "landing-portfolio-category-ecosystems": "Ecosystems & SaaS",
  "landing-portfolio-category-ecommerce": "E-commerce & Retail",
  "landing-portfolio-category-landing": "Landing Pages & Conversión",
  "landing-portfolio-view-details": "Ver Detalhes",
  "landing-portfolio-dialog-role": "Papel",
  "landing-portfolio-dialog-status": "Status",
  "landing-portfolio-dialog-challenge": "O Desafio",
  "landing-portfolio-dialog-solution": "A Solução",
  "landing-portfolio-dialog-tech": "Stack Tecnológico",
  "landing-portfolio-dialog-insight": "Senior Insight",
  "landing-portfolio-dialog-demo": "Ver Demo ao Vivo",
  "landing-contact-title": "Smart Contact Hub",
  "landing-contact-subtitle": "Como podemos colaborar?",
  "landing-contact-intent-recruiter": "Sou um Recrutador / Empresa",
  "landing-contact-intent-client": "Sou um Cliente / PME",
  "landing-contact-form-company": "Nome da Empresa",
  "landing-contact-form-position": "Posição / Vaga Aberta",
  "landing-contact-form-projectType": "Tipo de Projeto (Web, App, Sistema, SaaS)",
  "landing-contact-form-challenge": "Descrição do Desafio ou Ideia",
  "landing-contact-form-submit-recruiter": "Solicitar CV & Portfólio",
  "landing-contact-form-submit-client": "Pedir Orçamento / Consultoria",
  "landing-footer-copy": "Construindo o futuro da web, um commit de cada vez.",
  "landing-footer-tech": "Desenvolvido com Next.js, TailwindCSS e ShadCN UI. Hospedado na Vercel.",
  "landing-tech-marquee-title": "Domínio Polyglot: De Modern Full-Stack a Legacy Enterprise",
  "landing-tech-type-modern": "Modern",
  "landing-tech-type-mobile": "Mobile",
  "landing-tech-type-enterprise": "Enterprise",
  "landing-tech-type-legacy": "Legacy",
  "landing-contact-recaptcha-verify": "Por favor, verifique se você não é um robô.",
  "landing-contact-form-company-placeholder": "Acme Corp",
  "landing-contact-form-position-placeholder": "Senior Frontend Engineer",
  "landing-contact-form-name-placeholder": "Seu nome",
  "landing-contact-form-email-placeholder": "seunome@empresa.com",
  "landing-contact-form-projectType-placeholder": "Ex: Loja Online, App Móvel...",
  "landing-contact-form-message-placeholder-recruiter": "Detalhes da oportunidade...",
  "landing-contact-form-message-placeholder-client": "Conte-me um pouco sobre o que você precisa resolver...",
  "landing-contact-form-success-message": "Sua mensagem foi enviada com sucesso. Responderei em breve.",
  "landing-contact-form-sending": "Enviando...",
  "projects-petclan-role": "Architect & Full-Stack Developer",
  "projects-petclan-status": "Produção / SaaS Model",
  "projects-petclan-challenge": "A gestão da saúde dos animais de estimação é muitas vezes fragmentada em cadernetas físicas fáceis de perder ou danificar. O objetivo foi criar uma plataforma resiliente, Mobile-First, que centralizasse históricos médicos, planos de vacinação e acompanhamento biométrico com curva de aprendizado zero para o usuário final.",
  "projects-petclan-solution-0": "Implementação de uma arquitetura frontend híbrida (SSG/SSR) para garantir o carregamento instantâneo dos perfis.",
  "projects-petclan-solution-1": "Desenvolvimento de módulos de visualização de dados para controle histórico de peso usando gráficos dinâmicos.",
  "projects-petclan-solution-2": "Criação de um sistema de lógica preventiva para gerenciar desparasitações e emitir notificações inteligentes de próximos vencimentos.",
  "projects-petclan-insight": "Priorizei a manutenibilidade do código criando uma arquitetura de componentes modulares. Isso permite que o sistema escale para adicionar novos recursos, como teleconsultas, sem afetar o núcleo do registro de saúde digital.",
  "projects-financlan-role": "Architect & Full-Stack Developer",
  "projects-financlan-status": "Produção / Ferramenta Interna",
  "projects-financlan-challenge": "As aplicações financeiras comuns falham por não oferecer previsibilidade a longo prazo sobre despesas recorrentes e pagamentos parcelados. Foi necessário um dashboard visual de alta fidelidade para garantir a consistência dos registros em tempo real.",
  "projects-financlan-solution-0": "Integração de um sistema de autenticação seguro (Google Auth) e normalização da base de dados para proteger a privacidade do fluxo de caixa.",
  "projects-financlan-solution-1": "Desenvolvimento de um algoritmo de projeção que calcula o impacto mensal de compras parceladas e fundos de poupança no orçamento anual.",
  "projects-financlan-solution-2": "Implementación de gerenciamento de estado complexo para suportar categorias de receitas/despesas 100% personalizáveis.",
  "projects-financlan-insight": "O real valor do FinanClan reside em seu mecanismo de projeção. Desenhei a lógica de dados para que o sistema transforme registros estáticos em uma ferramenta preditiva para a tomada de decisões financeiras.",
  "projects-aulacheck-title": "AulaCheck",
  "projects-aulacheck-role": "Lead Full-Stack Developer",
  "projects-aulacheck-status": "Em Desenvolvimento (Beta)",
  "projects-aulacheck-challenge": "Eliminar o atrito na tomada de presença e acompanhamento do progresso acadêmico em ambientes educacionais, lidando com um alto volume de transações simultâneas.",
  "projects-aulacheck-solution-0": "Projeto de um sistema de sincronização de dados massivo para relatório instantâneo de presença dos alunos.",
  "projects-aulacheck-solution-1": "Arquitetura orientada a eventos para processar e atualizar os dashboards dos professores sem latência.",
  "projects-ajalderaiz-role": "Full-Stack Developer & Technical Consultant",
  "projects-ajalderaiz-status": "Produção / Activo",
  "projects-ajalderaiz-challenge": "Unificar dois modelos de negócio divergentes (venda de produtos físicos como suculentas/kokedamas e reserva de serviços por hora como creche de plantas) em uma única experiência de compra fluida e coerente.",
  "projects-ajalderaiz-solution-0": "Arquitetura de E-commerce híbrida com um catálogo dinámico capaz de diferenciar fluxos de checkout entre estoque físico e serviços agendados.",
  "projects-ajalderaiz-solution-1": "Otimização de CRO (Conversion Rate Optimization) por meio de validação de zona de envio em tempo real e integração direta de pagamentos.",
  "projects-ajalderaiz-solution-2": "Design de UI adaptável que reflete a identidade orgânica da marca, garantindo tempos de carregamento (LCP) inferiores a 1,5s.",
  "projects-ajalderaiz-insight": "Atuei como Consultor Técnico estruturando a plataforma para vender 'servicios de valor' além de produtos. Esta digitalização logística permitiu ao negócio aumentar significativamente seu ticket médio.",
  "projects-aramy-role": "Frontend Developer & UI Designer",
  "projects-aramy-status": "Produção / Ativo",
  "projects-aramy-challenge": "Traduzir a identidade de terapias holísticas (Reiki, massagens, yoga) em interfaces digitais minimalistas sem sacrificar a velocidade de carregamento ou a capacidade de captura de leads.",
  "projects-aramy-solution-0": "Desenvolvimento de Landing Pages de alta fidelidad visual focadas em funis de conversão direta para o WhatsApp para agendamento de consultas.",
  "projects-aramy-solution-1": "Estruturação semântica HTML5 e otimização de metadados para dominar o SEO local na busca por terapeutas e professores.",
  "projects-aramy-solution-2": "Integração de catálogos leves para produtos artesanais (sabonetes e perfumes energéticos).",
  "projects-meteoclan-role": "Frontend Developer",
  "projects-meteoclan-status": "Produção / Activo",
  "projects-meteoclan-challenge": "Criar um utilitário de consulta meteorológica extremamente rápido e limpo, livre do ruído visual das aplicações meteorológicas tradicionais.",
  "projects-meteoclan-solution-0": "Consumo eficiente e gerenciamento de cache de APIs meteorológicas públicas.",
  "projects-meteoclan-solution-1": "Interface minimalista desenvolvida com componentes de estado puro para garantir respostas instantâneas ao pesquisar qualquer cidade no mundo."
}```

## 7) SEO + METADATA SOURCE
```tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/i18n-provider'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { cn } from '@/lib/utils'

const siteConfig = {
  name: 'Clancig FullstackDev',
  description:
    'Portfolio de Damián Clancig, Desarrollador Full-Stack especializado en la creación de aplicaciones web y móviles modernas con React, Next.js, Node.js, y Flutter.',
  url: 'https://www.clancig.com.ar',
  ogImage: 'https://www.clancig.com.ar/images/foto_perfil.webp',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Desarrollador Full-Stack',
    'React',
    'Next.js',
    'Node.js',
    'Flutter',
    'React Native',
    'Desarrollo Web',
    'Desarrollo Móvil',
    'Portfolio',
    'Damián Clancig',
  ],
  authors: [{ name: 'Damián Clancig', url: siteConfig.url }],
  creator: 'Damián Clancig',

  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@damianclancig', // Replace with your Twitter handle if you have one
  },
  icons: {
    icon: '/images/foto_perfil.webp',
    shortcut: '/images/foto_perfil.webp',
    apple: '/images/foto_perfil.webp',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(inter.variable, playfair.variable, robotoMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical Logo for better discovery */}
        <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="noise-pattern" aria-hidden="true" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 8) STYLE TOKENS SOURCE
### 8.1 globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --background-alt: 240 4.8% 95.9%;
    --foreground: 240 5.9% 10%;

    --card: 0 0% 100%;
    --card-foreground: 240 5.9% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 5.9% 10%;

    --primary: 173 80% 32%; /* Teal 600 for light mode */
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    --accent: 173 80% 32%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 173 80% 32%;

    --radius: 0.5rem;

    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 240 5% 4.1%; /* #09090b Rich Black */
    --background-alt: 240 5.9% 10%; /* #18181b */
    --foreground: 0 0% 98%; /* #fafafa */

    --card: 240 5.9% 10%; /* #18181b Zinc-900 */
    --card-foreground: 0 0% 98%;

    --popover: 240 5.9% 10%;
    --popover-foreground: 0 0% 98%;

    --primary: 172 66% 50%; /* #2dd4bf Cian Esmeralda */
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%; /* #a1a1aa */

    --accent: 172 66% 50%; /* Cian Esmeralda */
    --accent-foreground: 240 5.9% 10%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 172 66% 50%;

    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer utilities {
  .noise-pattern {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03; /* 3% opacity as requested */
    mix-blend-mode: overlay;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    /* Removed font-family here, will be set by tailwind.config.ts via className on body */
  }
}
```
### 8.2 tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        code: ['var(--font-roboto-mono)', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        'background-alt': 'hsl(var(--background-alt))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

## 9) CONTACT FLOW SOURCE (SERVER VALIDATION + PROVIDER CONTRACT)
```ts

"use server";

import { z } from "zod";
import ContactFormEmail from "@/components/emails/contact-form-email";
import { render } from "@react-email/render";


// Define el esquema fuera de la función para evitar la redeclaración en cada llamada
const contactFormSchema = z.object({
  name: z.string().trim().min(1, "validation-name-required").max(200, "validation-name-maxLength"),
  email: z.string().trim().email("validation-email-invalid"),
  message: z.string().trim().min(5, "validation-message-minLength").max(1000, "validation-message-maxLength"),
});

export interface ContactFormState {
  success: boolean;
  message?: string;
  technicalError?: string; // Nuevo campo para errores técnicos
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    _form?: string[];
  };
}

export async function submitContactForm(
  prevState: ContactFormState | undefined, // Para useFormState
  formData: FormData
): Promise<ContactFormState> {

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const token = formData.get("recaptcha-token");

  // 1. Verificación de reCAPTCHA (Omitida en development o con token de bypass)
  if (process.env.NODE_ENV !== "development" && token !== "development-bypass-token") {
    if (!token) {
      return {
        success: false,
        message: "recaptcha-verification-failed",
        errors: { _form: ["recaptcha-verification-failed"] }
      };
    }

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      });

      const recaptchaData = await response.json();
      if (!recaptchaData.success) {
        console.error("Fallo en la verificación de reCAPTCHA:", recaptchaData['error-codes']);
        return {
          success: false,
          message: "recaptcha-verification-failed",
          errors: { _form: ["recaptcha-verification-failed"] }
        };
      }
    } catch (error) {
      console.error("Error al contactar el servicio de reCAPTCHA:", error);
      return {
        success: false,
        message: "recaptcha-service-unavailable",
        errors: { _form: ["recaptcha-service-unavailable"] },
        technicalError: error instanceof Error ? error.message : "Error desconocido"
      };
    }
  }

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactFormSchema.safeParse(rawFormData);

  if (!parsed.success) {
    console.error("DEBUG - Validation Errors:", parsed.error.flatten().fieldErrors);
    console.error("DEBUG - Received Data:", rawFormData);
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "validation-failed",
    };
  }

  // 2. Extracción de datos (React Email ya sanitiza contra XSS automáticamente)
  const name = parsed.data.name;
  const email = parsed.data.email;
  const message = parsed.data.message;

  // Configuración de la API de Maileroo
  const apiKey = process.env.MAILEROO_API_KEY;
  const fromEmail = process.env.MAILEROO_FROM_EMAIL;
  const toEmail = process.env.MAILEROO_TO_CONTACT;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Las credenciales de la API de Maileroo no están configuradas en las variables de entorno.");
    return {
      success: false,
      message: "contact-form-error-server-config",
      errors: { _form: ["contact-form-error-server-config"] },
      technicalError: "El servidor no está configurado para enviar correos. Faltan las variables de entorno de Maileroo."
    };
  }

  // Renderiza el componente de React a una cadena HTML para el cuerpo del correo
  // Usamos los datos ya sanitizados
  const emailHtml = await render(
    ContactFormEmail({
      name: name,
      email: email,
      message: message
    })
  );

  // Versión de texto plano como respaldo
  const plainText = `
    Nuevo mensaje de DevPortfolio:
    Nombre: ${name}
    Email: ${email}
    Mensaje: ${message}
  `;

  const mailerooApiUrl = 'https://smtp.maileroo.com/api/v2/emails';

  try {
    const response = await fetch(mailerooApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: {
          address: fromEmail,
          display_name: "DevPortfolio Contact Form" // Nombre a mostrar
        },
        to: [
          {
            address: toEmail,
          }
        ],
        reply_to: {
          address: email,
          display_name: name,
        },
        subject: `Nuevo Mensaje desde DevPortfolio: ${name}`,
        plain: plainText,
        html: emailHtml,
        tracking: false
      })
    });

    const responseData = await response.json();

    // Log para depuración en el servidor al recibir la respuesta
    console.log("Maileroo API Response:", responseData);

    if (!response.ok) {
      console.error("Error de la API de Maileroo:", responseData);
      return {
        success: false,
        message: "contact-form-error-api",
        errors: { _form: ["contact-form-error-api"] },
        technicalError: JSON.stringify(responseData, null, 2)
      };
    }

    // Final return serializable clean object
    return { 
      success: true, 
      message: "contact-form-success" 
    };

  } catch (error) {
    console.error("Error en el envío del formulario de contacto:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return {
      success: false,
      message: "contact-form-error-unexpected",
      errors: { _form: ["contact-form-error-unexpected"] },
      technicalError: errorMessage
    };
  }
}
```

## 10) LANDING STRUCTURE SOURCE
### 10.1 page.tsx
```tsx
import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';
import TechStackMarquee from '@/components/landing/TechStackMarquee';
import PricingCards from '@/components/landing/PricingCards';
import PortfolioGrid from '@/components/landing/PortfolioGrid';

const SmartContactHub = dynamic(() => import('@/components/landing/SmartContactHub'), {
  ssr: true, // Maintain SEO but load JS later
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackMarquee />
      <PricingCards />
      <PortfolioGrid />
      <SmartContactHub />
    </>
  );
}
```
### 10.2 HeroSection.tsx
```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with blur and overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.webp"
          alt={t("hero-codeBackgroundAlt") || "Background"}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover blur-[8px]"
          quality={75}
        />
        <div className="absolute inset-0 bg-background/80 dark:bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Profile Image - Premium Presentation */}
        <div className="mb-8 relative group animate-fade-in-up">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-emerald-400/50 rounded-full opacity-75 blur transform group-hover:scale-110 transition duration-1000"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background overflow-hidden shadow-2xl">
            <Image
              src="/images/foto_perfil.webp"
              alt="Damián Clancig"
              fill
              fetchPriority="high"
              sizes="(max-width: 768px) 128px, 160px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              quality={85}
            />
          </div>
        </div>

        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          {t("landing-hero-headline")}
        </h1>

        <p
          className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          {t("landing-hero-subtext")}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md sm:min-w-[200px]">
            <Link href="#servicios">
              {t("landing-hero-cta-primary")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-md sm:min-w-[200px] border-border hover:bg-card">
            <Link href="#portafolio">
              {t("landing-hero-cta-secondary")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```
### 10.3 TechStackMarquee.tsx
```tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

const stackItems = [
  { name: "Next.js", type: "Modern", color: "text-zinc-100" },
  { name: "React", type: "Modern", color: "text-blue-400" },
  { name: "Node.js", type: "Modern", color: "text-green-500" },
  { name: "TailwindCSS", type: "Modern", color: "text-cyan-400" },
  { name: "TypeScript", type: "Modern", color: "text-blue-500" },
  { name: "Flutter", type: "Mobile", color: "text-blue-300" },
  { name: "React Native", type: "Mobile", color: "text-blue-400" },
  { name: "Java", type: "Enterprise", color: "text-orange-500" },
  { name: "C# (.NET)", type: "Enterprise", color: "text-purple-500" },
  { name: "SQL Server", type: "Enterprise", color: "text-red-500" },
  { name: "VB6", type: "Legacy", color: "text-blue-700" },
];

export default function TechStackMarquee() {
  const { t } = useTranslation();

  // Duplicate items to ensure smooth infinite scrolling
  const duplicatedItems = [...stackItems, ...stackItems, ...stackItems];

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-background border-y border-border/40 min-h-[300px]">
      
      {/* Decorative gradient edges for fading effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-full items-center justify-center mb-8 px-10 text-center">
        <p className="font-code text-sm text-muted-foreground uppercase tracking-wider leading-relaxed">
          {t("landing-tech-marquee-title")}
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center shrink-0"
          initial={{ x: 0 }}
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group mx-6 flex h-16 sm:h-20 min-w-[140px] flex-col items-center justify-center rounded-lg border border-border/50 bg-card px-6 transition-all duration-300 hover:border-border hover:shadow-[0_0_15px_rgba(45,212,191,0.15)]"
            >
              <span className="font-code text-lg sm:text-xl font-bold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {item.name}
              </span>
              <span className="mt-1 font-body text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">
                {t(`landing-tech-type-${item.type.toLowerCase()}` as any)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```
### 10.4 PricingCards.tsx
```tsx
"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";

export default function PricingCards() {
  const { t } = useTranslation();

  return (
    <section id="servicios" className="py-20 md:py-32 bg-background-alt relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("landing-services-title")}
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            {t("landing-services-subtitle")}
          </p>
        </div>

        {/* Bento Grid layout for Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Essential Plan */}
          <div className="flex flex-col p-8 rounded-2xl bg-card border border-border/50 transition-all hover:border-border hover:shadow-lg h-full justify-between">
            <div>
              <span className="font-code text-sm text-primary font-medium tracking-wider uppercase mb-2 block">
                {t("landing-services-essential-name")}
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("landing-services-essential-title")}
              </h3>
              <p className="font-body text-muted-foreground mb-8">
                {t("landing-services-essential-desc")}
              </p>
            </div>
            <Button variant="outline" className="w-full border-border hover:bg-muted" asChild>
              <Link href="#contacto">{t("landing-services-cta")}</Link>
            </Button>
          </div>

          {/* Business Plan (Highlighted) */}
          <div className="relative flex flex-col p-8 rounded-2xl bg-card border border-primary shadow-[0_0_20px_rgba(45,212,191,0.15)] md:scale-105 z-10 h-full justify-between transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full flex items-center gap-1 font-body text-sm font-semibold shadow-md whitespace-nowrap">
              <Star className="w-4 h-4 fill-current" /> {t("landing-services-recommended")}
            </div>
            <div>
              <span className="font-code text-sm text-primary font-medium tracking-wider uppercase mb-2 block mt-2">
                {t("landing-services-business-name")}
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("landing-services-business-title")}
              </h3>
              <p className="font-body text-muted-foreground mb-8">
                {t("landing-services-business-desc")}
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="#contacto">{t("landing-services-cta")}</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-8 rounded-2xl bg-card border border-border/50 transition-all hover:border-border hover:shadow-lg h-full justify-between">
            <div>
              <span className="font-code text-sm text-primary font-medium tracking-wider uppercase mb-2 block">
                {t("landing-services-enterprise-name")}
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("landing-services-enterprise-title")}
              </h3>
              <p className="font-body text-muted-foreground mb-8">
                {t("landing-services-enterprise-desc")}
              </p>
            </div>
            <Button variant="outline" className="w-full border-border hover:bg-muted" asChild>
              <Link href="#contacto">{t("landing-services-cta")}</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
```
### 10.5 PortfolioGrid.tsx
```tsx
"use client";

import { useTranslation } from "@/hooks/use-translation";
import { projects } from "@/data/projects";
import ProjectDialog from "./ProjectDialog";
import { ExternalLink } from "lucide-react";

export default function PortfolioGrid() {
  const { t } = useTranslation();

  return (
    <section id="portafolio" className="py-20 md:py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("landing-portfolio-title")}
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            {t("landing-portfolio-subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectDialog key={project.id} project={project}>
              <button className="group relative flex flex-col text-left w-full justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary transition-all cursor-pointer overflow-hidden hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] h-full min-h-[300px]">
                
                {/* Decorative subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <span className="font-code text-xs text-primary font-medium tracking-widest uppercase mb-4 block">
                    {t(`landing-portfolio-category-${project.category}` as any)}
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {t(`projects-${project.id}-title` as any) || project.title}
                  </h3>
                  <p className="font-body text-muted-foreground line-clamp-3 leading-relaxed">
                    {t(`projects-${project.id}-challenge` as any) || project.challenge}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center text-primary font-code text-sm font-semibold uppercase tracking-wider gap-2">
                  <span>{t("landing-portfolio-view-details")}</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </button>
            </ProjectDialog>
          ))}
        </div>
      </div>
    </section>
  );
}
```
### 10.6 SmartContactHub.tsx
```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReCAPTCHA from "react-google-recaptcha";
import { submitContactForm } from "@/app/actions";
import { Loader2, CheckCircle2 } from "lucide-react";

type Intent = "recruiter" | "client";

export default function SmartContactHub() {
  const { t } = useTranslation();
  const [intent, setIntent] = useState<Intent>("recruiter");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer to load reCAPTCHA only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRecaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load a bit earlier before user reaches it
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget; 
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const token = recaptchaRef.current?.getValue();
    const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
    
    if (!token && process.env.NODE_ENV !== "development" && !isLocalhost) {
      setStatus("error");
      setErrorMsg(t("landing-contact-recaptcha-verify"));
      return;
    }

    const form = new FormData(formElement);
    form.append("recaptcha-token", token || "development-bypass-token");

    // Mapeo dual form a Zod Schema de actions.ts
    const email = form.get("email") as string;
    
    if (intent === "recruiter") {
      const company = form.get("company") as string;
      const position = form.get("position") as string;
      const originalMessage = form.get("message") as string;
      
      form.set("name", `[Reclutador] ${company} - ${position}`);
      form.set("message", originalMessage);
    } else {
      const clientName = form.get("clientName") as string;
      const projectType = form.get("projectType") as string;
      const originalMessage = form.get("message") as string;
      
      form.set("name", `[Cliente] ${clientName}`);
      form.set("message", `Tipo de Proyecto: ${projectType}\n\nDesafío:\n${originalMessage}`);
    }

    try {
      const res = await submitContactForm(undefined, form);
      if (res.success) {
        setStatus("success");
        formElement.reset(); 
        recaptchaRef.current?.reset();
      } else {
        setStatus("error");
        setErrorMsg(res.message ? t(res.message) || "Hubo un error en el envío." : "Hubo un error en el envío.");
        if (res.errors) {
          setFieldErrors(res.errors as any);
        }
        recaptchaRef.current?.reset();
      }
    } catch (err) {
      console.error("DEBUG - Click Contact Error:", err);
      setStatus("error");
      setErrorMsg(t("contact-form-error-unexpected"));
      recaptchaRef.current?.reset();
    }
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-20 md:py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t("landing-contact-title")}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {t("landing-contact-subtitle")}
          </p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-10 shadow-lg">
          
          {/* Intent Selector */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-background-alt p-1.5 rounded-xl border border-border/40 cursor-pointer">
            <button
              onClick={() => setIntent("recruiter")}
              className={`flex-1 py-3 px-4 rounded-lg font-body font-medium transition-all ${
                intent === "recruiter" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("landing-contact-intent-recruiter")}
            </button>
            <button
              onClick={() => setIntent("client")}
              className={`flex-1 py-3 px-4 rounded-lg font-body font-medium transition-all ${
                intent === "client" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("landing-contact-intent-client")}
            </button>
          </div>

          {/* Dynamic Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Common fields or intent-specific fields */}
            {intent === "recruiter" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("landing-contact-form-company")}</label>
                    <Input name="company" required className="bg-background-alt/50 border-border font-body" placeholder={t("landing-contact-form-company-placeholder")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("landing-contact-form-position")}</label>
                    <Input name="position" required className="bg-background-alt/50 border-border font-body" placeholder={t("landing-contact-form-position-placeholder")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("contact-form-email")}</label>
                  <Input 
                    name="email" 
                    type="email" 
                    required 
                    onFocus={() => setShowRecaptcha(true)}
                    className="bg-background-alt/50 border-border font-body" 
                    placeholder={t("landing-contact-form-email-placeholder")} 
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("contact-form-name")}</label>
                    <Input name="clientName" required className="bg-background-alt/50 border-border font-body" placeholder={t("landing-contact-form-name-placeholder")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("contact-form-email")}</label>
                    <Input 
                      name="email" 
                      type="email" 
                      required 
                      onFocus={() => setShowRecaptcha(true)}
                      className="bg-background-alt/50 border-border font-body" 
                      placeholder={t("landing-contact-form-email-placeholder")} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("landing-contact-form-projectType")}</label>
                  <Input name="projectType" required className="bg-background-alt/50 border-border font-body" placeholder={t("landing-contact-form-projectType-placeholder")} />
                </div>
              </>
            )}

            {/* Common Textarea block */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {intent === "recruiter" ? t("contact-form-message") : t("landing-contact-form-challenge")}
              </label>
              <Textarea 
                name="message"
                required 
                onFocus={() => setShowRecaptcha(true)}
                className="bg-background-alt/50 border-border font-body min-h-[120px]" 
                placeholder={intent === "recruiter" ? t("landing-contact-form-message-placeholder-recruiter") : t("landing-contact-form-message-placeholder-client")}
              />
            </div>

            {showRecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY && (
              <div className="flex justify-center md:justify-start">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
                  theme="dark" // Always dark to fit 'Dark Engineering' theme
                />
              </div>
            )}
            
            {status === "error" && (
              <div className="text-red-500 font-body text-sm font-medium bg-red-500/10 p-4 rounded-lg border border-red-500/20 space-y-2">
                <p className="font-bold">{errorMsg}</p>
                {Object.keys(fieldErrors).length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {Object.entries(fieldErrors).map(([field, messages]) => (
                      <li key={field}>
                        <span className="capitalize">{field}:</span> {" "}
                        {messages.map(m => t(m) || m).join(", ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2 text-emerald-400 font-body text-sm font-medium bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
                <p>{t("landing-contact-form-success-message")}</p>
              </div>
            )}

            <Button disabled={status === "loading" || status === "success"} type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold transition-all">
              {status === "loading" ? (
                 <><Loader2 className="w-5 h-5 animate-spin mr-2" /> {t("landing-contact-form-sending")}</>
              ) : (
                intent === "recruiter" ? t("landing-contact-form-submit-recruiter") : t("landing-contact-form-submit-client")
              )}
            </Button>
            
          </form>
        </div>
      </div>
    </section>
  );
}
```

## 11) HEADER/FOOTER + I18N PROVIDER SOURCE
### 11.1 header.tsx
```tsx

"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Separator } from "../ui/separator"
import Image from "next/image"
import { navItems } from "@/data/navItems"

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/images/logo.webp"
            alt="DevPortfolio Logo"
            width={160}
            height={50}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-accent/80">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="border-b border-accent/40 pb-4 text-left">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                      src="/images/logo.webp"
                      alt="DevPortfolio Logo"
                      width={140}
                      height={40}
                      className="h-14 w-auto object-contain"
                    />
                  </Link>
                </SheetHeader>
                <div className="py-6">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium transition-colors hover:text-primary text-foreground/80"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <Separator className="my-6 bg-accent/40" />
                  <div className="flex justify-center space-x-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
```
### 11.2 footer.tsx
```tsx
"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Github, Linkedin, MessageCircle, Instagram, Coffee, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background-alt border-t border-border/30 py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Brand / Copy */}
        <div className="flex flex-col gap-2">
          <p className="font-headline font-semibold text-foreground text-lg">
            Damián Clancig
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-sm border-l-2 border-primary/50 pl-3 italic">
            "{t("landing-footer-copy")}"
          </p>
        </div>

        {/* Core Links */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
          {process.env.NEXT_PUBLIC_GITHUB_USER && (
            <Link href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USER}`} target="_blank" className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_LINKEDIN_USER && (
            <Link href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USER}`} target="_blank" className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_INSTAGRAM_USER && (
            <Link href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_USER}`} target="_blank" className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_CAFECITO_USER && (
            <Link href={`https://cafecito.app/${process.env.NEXT_PUBLIC_CAFECITO_USER}`} target="_blank" className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="Cafecito">
              <Coffee className="w-5 h-5" />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_EMAIL_ADDRESS && (
            <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`} className="p-2 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors inline-block" aria-label="Email">
              <Mail className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* Tech Stack Data */}
        <div className="flex flex-col gap-1 items-center md:items-end">
          <span className="font-code text-xs text-muted-foreground uppercase tracking-widest">
            {t("landing-footer-tech")}
          </span>
          <span className="font-code text-[10px] text-muted-foreground/70 mt-1">
            v2.0 • 2026
          </span>
        </div>

      </div>
    </footer>
  );
}
```
### 11.3 language-switcher.tsx
```tsx
"use client"

import * as React from "react"
import { Check, Languages } from "lucide-react"

import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Locale = 'en' | 'es' | 'pt';

const languageOptions: { value: Locale; labelKey: string }[] = [
  { value: 'en', labelKey: 'languages-en' },
  { value: 'es', labelKey: 'languages-es' },
  { value: 'pt', labelKey: 'languages-pt' },
];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('Change language')} className="border-accent/80">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value)}
            className={cn("flex items-center justify-between", language === option.value && "bg-accent")}
          >
            {t(option.labelKey)}
            {language === option.value && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```
### 11.4 i18n-provider.tsx
```tsx
"use client"

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';

import esTranslations from '@/dictionaries/es.json';

type Locale = 'en' | 'es' | 'pt';
type Translations = Record<string, string>; 

export interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  translations: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const loadTranslations = async (locale: Locale): Promise<Translations> => {
  if (locale === 'es') return esTranslations as Translations;
  try {
    const module = await import(`@/dictionaries/${locale}.json`);
    return module.default || {};
  } catch (error) {
    console.error(`Failed to load translations for ${locale}.json`, error);
    return esTranslations as Translations;
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Locale>('es');
  const [translations, setTranslations] = useState<Translations>(esTranslations as Translations);

  useEffect(() => {
    const fetchTranslations = async () => {
      const loadedTranslations = await loadTranslations(language);
      setTranslations(loadedTranslations);
    };

    fetchTranslations();
  }, [language]);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    let result = translations[key] || key;
    
    if (replacements) {
      result = Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(`{${placeholder}}`, String(value));
      }, result);
    }

    return result;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

## 12) FINAL EXECUTION INSTRUCTIONS FOR TARGET AI
- Initialize Astro project with TypeScript and Tailwind.
- Recreate all sections and routes from this pack.
- Port content exactly.
- Keep same IDs and anchor behavior.
- Implement security headers and SEO parity.
- Produce runnable project with README and scripts.
