// ============================================================================
// Projects content
// ============================================================================
// Single source of truth for portfolio projects.
// - `featured: true`  → aparece en el grid de la home
// - `caseStudy` definido → genera ruta /proyectos/[slug]
// ============================================================================

export type ProjectStatus = "live" | "private" | "archived";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseStudyDecision {
  title: string;
  body: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  decisions: CaseStudyDecision[];
  outcome: string;
  gallery?: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  status: ProjectStatus;
  /** Imagen de portada (relativa a /public). */
  image: string;
  /** Color de acento para placeholder/hover (hex sin #). */
  accent: string;
  links?: ProjectLink[];
  featured: boolean;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  {
    slug: "voo-platform",
    title: "VOO Platform",
    subtitle:
      "Frontend de SaaS multi-tenant para comercio electrónico, reservas y eventos",
    year: "2024 — Presente",
    role: "Desarrollador Frontend",
    status: "private",
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "next-intl",
      "Zustand",
      "SWR",
      "Cloudflare Workers",
    ],
    description:
      "Plataforma SaaS multi-tenant que permite a negocios de eventos, gastronomía y servicios desplegar su propio sitio en minutos. Construí el frontend completo: dashboard de cliente, panel admin global, landing pública y un sistema de templates personalizables que sirve a múltiples tenants desde un único codebase.",
    highlights: [
      "Monorepo con 3 aplicaciones frontend y 5 paquetes compartidos (UI, auth, queries, emails)",
      "Soporte de dominios personalizados con routing dinámico por tenant",
      "Multi-idioma con next-intl y theming dinámico configurable por cada negocio",
      "Despliegue en Cloudflare Workers vía OpenNext para latencia global baja",
    ],
    image: "/projects/voo-platform.svg",
    accent: "60a5fa",
    featured: true,
    caseStudy: {
      challenge:
        "Construir desde cero el frontend de un SaaS multi-tenant que permitiera a tres verticales muy distintas (eventos, gastronomía, servicios) ofrecer una experiencia personalizada al usuario final, sin duplicar código y manteniendo accesibilidad y rendimiento al nivel de productos enterprise.",
      solution:
        "Diseñé una arquitectura de monorepo basada en Bun y Turborepo con tres aplicaciones independientes (dashboard de cliente, admin global y landing) que comparten paquetes de UI, autenticación, queries y plantillas de email. El sistema de templates permite a cada tenant personalizar colores, tipografías, idioma y bloques de contenido sin tocar código.",
      decisions: [
        {
          title: "Composición de UI con Radix + shadcn/ui",
          body: "Construí un sistema de componentes accesibles (WAI-ARIA) reutilizado por las 3 apps, con tokens semánticos en CSS variables para soportar theming por tenant en runtime sin recompilación.",
        },
        {
          title: "Internacionalización con next-intl",
          body: "Integré next-intl con segmentación por subdominio para servir contenido en idiomas distintos según la región del tenant, con fallback automático y soporte de pluralización.",
        },
        {
          title: "Edge deployment con Cloudflare Workers",
          body: "Migré el deploy a Cloudflare Workers usando @opennextjs/cloudflare para obtener latencia <50ms global, eliminando cold starts y reduciendo costes de infraestructura.",
        },
        {
          title: "Tipado end-to-end",
          body: "Compartí tipos generados desde la API (TypeBox/Prisma) entre las apps frontend, eliminando errores de contrato y dándome autocomplete completo en cada llamada.",
        },
      ],
      outcome:
        "El producto soporta hoy múltiples tenants en producción con tiempos de carga inferiores a 1s y Lighthouse 90+ en mobile. La arquitectura modular permite añadir nuevas verticales en cuestión de días, no semanas.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "ai-analyzer",
    title: "AI Analyzer",
    subtitle:
      "Detección y humanización de contenido generado por IA con editor enriquecido",
    year: "2024",
    role: "Desarrollador Frontend",
    status: "live",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "SWR",
      "React Hook Form",
      "Zod",
      "Stripe",
      "Claude API",
      "Gemini API",
    ],
    description:
      "Plataforma SaaS que analiza textos para detectar contenido generado por IA y ofrece humanización automática. Integra 3 modelos distintos (Anthropic Claude, Google Gemini, Winston AI) en una interfaz unificada con editor enriquecido, sistema de créditos y suscripciones de pago.",
    highlights: [
      "Editor de texto enriquecido (Novel/TipTap) con resaltado de código y comparativa antes/después",
      "Integración de 3 proveedores de IA con UI única y selector de modelo en runtime",
      "Sistema de suscripciones con Stripe (checkout, webhook, portal de cliente)",
      "Visualización de resultados con gráficos interactivos y exportación a PDF",
    ],
    image: "/projects/ai-analyzer.svg",
    accent: "a78bfa",
    featured: true,
    caseStudy: {
      challenge:
        "Diseñar una experiencia de usuario que hiciera comprensible y accionable el output de tres modelos de IA distintos para usuarios no técnicos, manteniendo tiempos de respuesta perceptiblemente rápidos a pesar de las latencias inherentes a las llamadas a LLMs.",
      solution:
        "Construí una interfaz centrada en un editor enriquecido como elemento principal, con resultados de análisis presentados como visualizaciones interactivas en lugar de raw output. La integración con Vercel AI SDK permite streaming de respuestas, dando feedback inmediato al usuario.",
      decisions: [
        {
          title: "Streaming con Vercel AI SDK",
          body: "Usé el AI SDK para hacer streaming de las respuestas de Claude/Gemini directamente al editor, eliminando la sensación de espera y mostrando el contenido humanizado conforme se genera.",
        },
        {
          title: "Editor con Novel + extensiones de TipTap",
          body: "Personalicé Novel con extensiones de resaltado de código, marcadores de probabilidad de IA por párrafo y comparativa visual antes/después, todo manteniendo el flujo de un editor común.",
        },
        {
          title: "Stripe + sistema de créditos",
          body: "Implementé checkout, webhooks y portal de cliente con Stripe, sumado a un sistema de créditos que descuenta tokens según el modelo y la longitud del texto, con límites visualmente claros en la UI.",
        },
        {
          title: "Validación con Zod + React Hook Form",
          body: "Toda la entrada del usuario (prompts, configuración, datos de pago) se valida en cliente con Zod y React Hook Form, devolviendo errores inline accesibles antes de gastar créditos.",
        },
      ],
      outcome:
        "La interfaz convirtió un producto técnico en algo usable para creadores de contenido sin background en IA. La arquitectura permite añadir nuevos proveedores de IA con cambios mínimos en el frontend.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "cubanparty",
    title: "CubanParty",
    subtitle: "Plataforma de eventos con animaciones interactivas",
    year: "2024",
    role: "Desarrollador Frontend",
    status: "live",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "tsparticles",
      "Radix UI",
      "Appwrite",
      "AWS S3",
    ],
    description:
      "Plataforma de promoción y gestión de eventos con un fuerte componente visual: animaciones interactivas de partículas, transiciones fluidas entre páginas y un sistema de gestión de contenido respaldado por Appwrite. Toda la multimedia se sirve desde AWS S3 con preloading inteligente.",
    highlights: [
      "Animaciones de partículas con tsparticles sincronizadas con el scroll",
      "Transiciones de página suaves con Framer Motion (layout animations + AnimatePresence)",
      "Backend serverless con Appwrite (auth, base de datos, storage)",
      "Optimización de medios con AWS S3 + preloading basado en viewport",
    ],
    image: "/projects/cubanparty.svg",
    accent: "f472b6",
    featured: true,
    caseStudy: {
      challenge:
        "Crear una experiencia visual memorable para una plataforma de eventos sin sacrificar el rendimiento en dispositivos móviles, donde la mayoría del público accede. El reto era integrar animaciones complejas de partículas con datos en tiempo real sin frame drops.",
      solution:
        "Combiné tsparticles para los efectos de fondo (con presets ligeros en mobile) con Framer Motion para las transiciones de UI, separando claramente animaciones decorativas de las interactivas. La gestión de datos con Appwrite + SWR mantiene la app reactiva sin necesidad de backend propio.",
      decisions: [
        {
          title: "Particle system adaptativo",
          body: "Implementé detección de capacidad del dispositivo para reducir partículas y desactivar interactividad en mobile, manteniendo 60fps consistentes incluso en gama media.",
        },
        {
          title: "Appwrite como BaaS",
          body: "Elegí Appwrite frente a Firebase por su modelo de datos relacional, su API REST cacheable y su SDK que se integra cleanly con SWR para datos en tiempo real.",
        },
        {
          title: "Layout animations con Framer Motion",
          body: "Usé layoutId para transiciones compartidas entre listado y detalle de eventos, dando una sensación cinematográfica sin penalización de rendimiento.",
        },
        {
          title: "AWS S3 + transformaciones on-the-fly",
          body: "Combiné S3 con transformaciones de imágenes en edge para servir formatos modernos (AVIF/WebP) según el browser del usuario, reduciendo el peso medio de imagen un 70%.",
        },
      ],
      outcome:
        "La plataforma logró Lighthouse Performance 90+ en mobile pese a las animaciones, y se convirtió en una pieza de portafolio que demuestra que rendimiento y diseño visual no son excluyentes.",
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: "memecoin",
    title: "Memecoin Dashboard",
    subtitle: "Interfaz de trading de tokens con visualización en tiempo real",
    year: "2024",
    role: "Desarrollador Frontend",
    status: "private",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Radix UI",
      "React Hook Form",
      "date-fns",
    ],
    description:
      "Dashboard para gestionar y visualizar transacciones de tokens cripto. Formularios complejos con validación en tiempo real, gráficos de evolución de precios y diseño responsive optimizado para uso prolongado en pantallas grandes.",
    highlights: [
      "Formularios multi-paso con React Hook Form y validación instantánea",
      "Visualización de datos en tiempo real con actualización optimista",
      "Diseño responsive optimizado para sesiones largas en desktop",
      "Sistema de notificaciones contextual con Radix Toast",
    ],
    image: "/projects/memecoin.svg",
    accent: "fbbf24",
    featured: true,
  },

  // -------------------------------------------------------------------------
  {
    slug: "mojitos-bar",
    title: "Mojitos Bar",
    subtitle: "Sitio web de cócteles con storytelling animado en GSAP",
    year: "2025",
    role: "Desarrollador Frontend",
    status: "live",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    description:
      "Sitio web one-page de un bar de cócteles construido como showcase de animaciones avanzadas con GSAP. Cada sección está coreografiada con timelines y ScrollTriggers, demostrando dominio de micro-interacciones y storytelling visual.",
    highlights: [
      "Timelines de GSAP con ScrollTrigger en cada sección",
      "Reveals de texto carácter por carácter sincronizados con el scroll",
      "Parallax multicapa y scrubbing de animaciones complejas",
      "Diseño responsive sin perder fluidez en mobile",
    ],
    image: "/projects/mojitos-bar.svg",
    accent: "34d399",
    links: [
      {
        label: "Código en GitHub",
        href: "https://github.com/JairoGlez43/Mojitos-Bar",
      },
    ],
    featured: true,
  },
];

// ============================================================================
// Helpers
// ============================================================================

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}

/**
 * Returns prev/next case studies relative to the given slug, looping around
 * (cyclic). Useful for inter-case-study navigation.
 */
export function getCaseStudyNeighbors(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const studies = projects.filter((p) => p.caseStudy);
  const idx = studies.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = studies[(idx - 1 + studies.length) % studies.length];
  const next = studies[(idx + 1) % studies.length];
  return { prev, next };
}
