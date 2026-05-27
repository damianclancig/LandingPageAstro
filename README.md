# Clancig Landing V2

Landing multilenguaje orientada a conversión para Clancig FullstackDev, construida con Astro y React islands. El proyecto prioriza rendimiento, mantenibilidad, SEO y una experiencia visual cuidada en modo claro y oscuro.

## Resumen

- Framework principal: Astro 5 en modo server
- Interactividad puntual: React 19 en islas
- Estilos: Tailwind CSS 4 y sistema visual global en CSS
- Idiomas: español, inglés y portugués
- Contacto: API route con validación Zod + captcha + envío de correo
- Calidad: ESLint, typecheck de Astro, Playwright para E2E
- Deploy objetivo: Vercel

## Stack técnico

- Astro 5
- TypeScript
- React 19 y react-dom 19
- Tailwind CSS 4
- Zod 4
- @astrojs/react
- @astrojs/sitemap
- @astrojs/vercel
- Playwright
- ESLint + Prettier

## Requisitos

- Node.js 22 recomendado para alinearse con runtime de Vercel
- npm 10 o superior

Nota: si usas Node 24 localmente, la build funciona, pero Vercel ejecuta funciones serverless con Node 22.

## Inicio rápido

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Completar variables mínimas necesarias en .env.

4. Levantar entorno local:

```bash
npm run dev
```

5. Abrir la app en http://localhost:4321

## Scripts

- npm run dev: servidor de desarrollo
- npm run start: alias de dev
- npm run build: build de producción
- npm run preview: previsualizar build local
- npm run typecheck: chequeo de tipos Astro y TS
- npm run lint: lint de código
- npm run format: formateo con Prettier
- npm run test: tests E2E con Playwright

## Variables de entorno

Tomar como base el archivo .env.example.

### Captcha

Preferido (Cloudflare Turnstile):

- PUBLIC_TURNSTILE_SITE_KEY
- TURNSTILE_SECRET_KEY

Compatibilidad legacy (Google reCAPTCHA):

- NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY
- RECAPTCHA_SECRET_KEY

Comportamiento del backend:

- En desarrollo, la verificación captcha se omite por defecto.
- En producción, si hay TURNSTILE_SECRET_KEY se valida con Turnstile.
- Si no hay Turnstile y sí RECAPTCHA_SECRET_KEY, valida con reCAPTCHA.

### Envío de correo

Proveedor recomendado (Resend):

- RESEND_API_KEY
- RESEND_FROM_EMAIL
- RESEND_TO_CONTACT

Fallback (Maileroo):

- MAILEROO_API_KEY
- MAILEROO_FROM_EMAIL
- MAILEROO_TO_CONTACT

Comportamiento del backend:

- Si Resend está configurado, se usa Resend.
- Si Resend no está completo, intenta Maileroo.
- Si no hay proveedor válido, responde error de configuración.

### Desarrollo local

- CONTACT_DEV_FORCE_SUCCESS=true permite simular envío exitoso sin llamar a proveedor externo.

### Datos públicos de contacto y redes

- NEXT_PUBLIC_EMAIL_ADDRESS
- NEXT_PUBLIC_INSTAGRAM_USER
- NEXT_PUBLIC_LINKEDIN_USER
- NEXT_PUBLIC_GITHUB_USER
- NEXT_PUBLIC_WHATSAPP_NUMBER
- NEXT_PUBLIC_CAFECITO_USER

## Arquitectura del proyecto

Estructura principal:

- src/pages: rutas Astro y endpoint API de contacto
- src/components/layout: header, footer y bloques de layout
- src/components/landing: secciones de la landing y componentes interactivos
- src/dictionaries: textos i18n en es, en y pt
- src/i18n: helper de traducción
- src/lib: utilidades server-side (email, metadata)
- src/styles.css: sistema visual global y temas
- public/images: assets estáticos
- tests: pruebas E2E con Playwright

## Rutas e i18n

Configuración de i18n activa:

- defaultLocale: es
- locales: es, en, pt
- prefixDefaultLocale: true

Rutas esperadas:

- /es
- /en
- /pt

Para agregar o modificar textos:

1. Editar claves en src/dictionaries/es.json, src/dictionaries/en.json y src/dictionaries/pt.json.
2. Consumirlas con el helper t desde src/i18n/index.ts.

## Flujo de contacto

Endpoint: src/pages/api/contact.ts

Resumen del flujo:

1. Recibe FormData desde el formulario.
2. Valida captcha según entorno y variables.
3. Valida payload con Zod.
4. Envía email por Resend o Maileroo.
5. Devuelve respuesta JSON homogénea para UI.

Errores conocidos del flujo:

- contact-form-error-server-config
- contact-form-error-api
- contact-form-error-unexpected
- validation-failed
- recaptcha-verification-failed
- recaptcha-service-unavailable

## Calidad y pruebas

Comandos recomendados antes de abrir PR o deploy:

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

Playwright:

- Configurado para chromium
- Levanta servidor local automáticamente
- Base URL de test: http://127.0.0.1:4321

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Definir variables de entorno de captcha, email y datos públicos.
3. Build command: npm run build.
4. Output lo maneja @astrojs/vercel automáticamente.

Recomendación:

- Usar Node 22 local para igualar entorno de ejecución serverless.

## Convenciones del repositorio

- No versionar .env ni artefactos de build.
- Mantener .env.example actualizado cuando se agreguen variables.
- Mantener traducciones sincronizadas entre es, en y pt.
- Priorizar cambios acotados y validados con lint, typecheck y build.

## Troubleshooting

### La build muestra warning de versión de Node en Vercel

Es esperado si trabajas con Node 24 local. Vercel ejecuta funciones en Node 22.

### El formulario de contacto responde error de configuración

Revisar que exista un proveedor completo:

- Opción A: RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_CONTACT
- Opción B: MAILEROO_API_KEY, MAILEROO_FROM_EMAIL, MAILEROO_TO_CONTACT

### Captcha no valida en producción

Verificar que TURNSTILE_SECRET_KEY o RECAPTCHA_SECRET_KEY estén definidos en el entorno de deploy y que el sitio use las claves públicas correctas.
