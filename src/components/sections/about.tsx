"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Frameworks",
    items: ["React 18/19", "Next.js 14–16", "Vite"],
  },
  {
    label: "UI & Estilos",
    items: ["Tailwind CSS", "Radix UI", "shadcn/ui"],
  },
  {
    label: "Animaciones",
    items: ["Framer Motion", "GSAP"],
  },
  {
    label: "Estado & Datos",
    items: ["Zustand", "SWR", "TanStack Query", "React Hook Form", "Zod"],
  },
  {
    label: "Bases de datos",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & Build",
    items: ["Cloudflare Workers", "Vercel", "Bun", "Turborepo", "Docker"],
  },
];

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-14"
        >
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mb-4 font-mono text-sm text-muted-foreground"
          >
            <span className="text-accent">·</span> sobre mí
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={transition}
            id="sobre-mi-titulo"
            className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Cómo llegué hasta aquí
          </motion.h2>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <motion.p variants={fadeUp} transition={transition}>
              Empecé estudiando Farmacia en la Universidad de La Habana, donde
              me licencié. Durante esos años cursé también dos años de Ciencias
              de la Computación que abandoné por motivos personales — pero la
              curiosidad por la programación se quedó.
            </motion.p>
            <motion.p variants={fadeUp} transition={transition}>
              Lo retomé de forma autodidacta y, en los últimos{" "}
              <span className="text-foreground">2 años</span>, he construido
              aplicaciones web completas como freelance: plataformas SaaS
              multi-tenant, herramientas con integraciones de IA, dashboards
              de cripto y sitios con animaciones avanzadas.
            </motion.p>
            <motion.p variants={fadeUp} transition={transition}>
              Hoy trabajo desde <span className="text-foreground">Madrid</span>,
              especializado en frontend con React y Next.js, con disponibilidad
              para proyectos remotos o presenciales. Me importan las
              interfaces que se sienten rápidas, accesibles y bien diseñadas.
            </motion.p>
          </div>
        </motion.div>

        {/* Stack agrupado */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={transition}
          className="rounded-xl border border-border bg-muted/20 p-6 sm:p-8"
        >
          <p className="mb-6 font-mono text-sm text-muted-foreground">
            Stack que uso a diario
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <li key={group.label}>
                <p className="mb-2 text-sm font-semibold tracking-tight">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
