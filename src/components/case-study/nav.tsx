"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

interface NavProps {
  prev: Project | null;
  next: Project | null;
}

function NeighborCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex min-h-[140px] flex-1 flex-col justify-between gap-4 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
        {isPrev ? (
          <>
            <ArrowLeft className="h-3 w-3" />
            anterior
          </>
        ) : (
          <>
            siguiente
            <ArrowRight className="h-3 w-3" />
          </>
        )}
      </span>
      <div className={isPrev ? "" : "text-right"}>
        <p className="text-xs text-muted-foreground">{project.year}</p>
        <p className="mt-1 text-xl font-bold tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

export function CaseStudyNav({ prev, next }: NavProps) {
  return (
    <motion.nav
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Navegación entre case studies"
      className="mt-24 border-t border-border pt-12"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {prev && <NeighborCard project={prev} direction="prev" />}
        {next && <NeighborCard project={next} direction="next" />}
      </div>
      <div className="flex justify-center">
        <Link
          href="/#proyectos"
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Ver todos los proyectos
        </Link>
      </div>
    </motion.nav>
  );
}
