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
