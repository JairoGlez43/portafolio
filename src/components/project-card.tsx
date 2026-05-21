"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const STACK_PREVIEW_COUNT = 5;

function getCardLink(project: Project): {
  href: string | null;
  label: string;
  external: boolean;
} {
  if (project.caseStudy) {
    return {
      href: `/proyectos/${project.slug}`,
      label: "Ver caso de estudio",
      external: false,
    };
  }
  if (project.links?.[0]) {
    return {
      href: project.links[0].href,
      label: project.links[0].label,
      external: true,
    };
  }
  return { href: null, label: "Privado", external: false };
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const config = {
    live: { label: "En vivo", color: "bg-emerald-500" },
    private: { label: "Privado", color: "bg-zinc-500" },
    archived: { label: "Archivado", color: "bg-amber-500" },
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
      <span className={cn("h-1.5 w-1.5 rounded-full", config.color)} />
      {config.label}
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { href, label, external } = getCardLink(project);
  const isLinked = href !== null;

  const cardContent = (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-border bg-muted/30 transition-all duration-500",
        isLinked && "hover:border-foreground/20 hover:shadow-2xl",
      )}
      style={{
        // Hover glow uses the project accent color
        ["--accent-glow" as string]: `#${project.accent}`,
      }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`Captura del proyecto ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        {/* Top-right status */}
        <div className="absolute right-3 top-3">
          <StatusBadge status={project.status} />
        </div>
        {/* Top-left year */}
        <div className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
          {project.year}
        </div>
        {/* Accent glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 100%, var(--accent-glow), transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">{project.subtitle}</p>

        {/* Stack chips */}
        <ul className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, STACK_PREVIEW_COUNT).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > STACK_PREVIEW_COUNT && (
            <li className="px-2 py-0.5 font-mono text-xs text-muted-foreground">
              +{project.stack.length - STACK_PREVIEW_COUNT} más
            </li>
          )}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-medium">
          {isLinked ? (
            <>
              <span className="transition-colors group-hover:text-foreground">
                {label}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              {label}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  const motionWrapper = (children: React.ReactNode) => (
    <motion.div
      variants={{
        hidden: { y: 30, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );

  if (!isLinked) {
    return motionWrapper(cardContent);
  }

  if (external) {
    return motionWrapper(
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
        aria-label={`${project.title} — ${label}`}
      >
        {cardContent}
      </a>,
    );
  }

  return motionWrapper(
    <Link
      href={href}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      aria-label={`${project.title} — ${label}`}
    >
      {cardContent}
    </Link>,
  );
}
