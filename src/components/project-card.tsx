"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project, ProjectLink } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const STACK_PREVIEW_COUNT = 5;

function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.99 10.99 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.42.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  );
}

type CardAction = {
  href: string;
  label: string;
  external: boolean;
};

function isGithub(link: ProjectLink): boolean {
  return link.href.includes("github.com");
}

/**
 * Resolves the clickable actions for a card:
 * - Case studies open the internal case-study page (single primary action).
 * - Projects with links open the live site as the primary (full-card) action,
 *   and expose a separate GitHub action when a repo link exists.
 * - Everything else is a private, non-clickable card.
 */
function getCardActions(
  project: Project,
  locale: Locale,
  dictionary: Dictionary["projectCard"],
): { primary: CardAction | null; secondary: CardAction | null } {
  if (project.caseStudy) {
    return {
      primary: {
        href: `/${locale}/proyectos/${project.slug}`,
        label: dictionary.caseStudyCta,
        external: false,
      },
      secondary: null,
    };
  }

  const links = project.links ?? [];
  const github = links.find(isGithub);
  const live = links.find((link) => !isGithub(link));

  if (live || github) {
    const primaryLink = live ?? github!;
    return {
      primary: {
        href: primaryLink.href,
        label: live ? dictionary.liveCta : dictionary.codeCta,
        external: true,
      },
      secondary:
        live && github
          ? { href: github.href, label: dictionary.codeCta, external: true }
          : null,
    };
  }

  return { primary: null, secondary: null };
}

function StatusBadge({
  status,
  labels,
}: {
  status: Project["status"];
  labels: Dictionary["projectCard"]["status"];
}) {
  const config = {
    live: { label: labels.live, color: "bg-emerald-500" },
    private: { label: labels.private, color: "bg-zinc-500" },
    archived: { label: labels.archived, color: "bg-amber-500" },
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
      <span className={cn("h-1.5 w-1.5 rounded-full", config.color)} />
      {config.label}
    </span>
  );
}

interface ProjectCardProps {
  locale: Locale;
  project: Project;
  dictionary: Dictionary["projectCard"];
}

export function ProjectCard({ locale, project, dictionary }: ProjectCardProps) {
  const { primary, secondary } = getCardActions(project, locale, dictionary);
  const isLinked = primary !== null;

  return (
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
            alt={dictionary.imageAlt.replace("{title}", project.title)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          {/* Top-right status */}
          <div className="absolute right-3 top-3">
            <StatusBadge status={project.status} labels={dictionary.status} />
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
          <p className="mb-4 text-sm text-muted-foreground">
            {project.subtitle}
          </p>

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
                +{project.stack.length - STACK_PREVIEW_COUNT} {dictionary.more}
              </li>
            )}
          </ul>

          {/* CTA row */}
          <div className="flex items-center justify-between gap-3 text-sm font-medium">
            {isLinked ? (
              <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-foreground">
                {primary.label}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                {dictionary.privateCta}
              </span>
            )}

            {/* Secondary action (e.g. GitHub) sits above the full-card overlay */}
            {secondary && (
              <a
                href={secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${secondary.label}`}
                className="relative z-20 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                {secondary.label}
              </a>
            )}
          </div>
        </div>

        {/* Full-card (stretched) primary link overlay */}
        {isLinked &&
          (primary.external ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${primary.label}`}
              className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          ) : (
            <Link
              href={primary.href}
              aria-label={`${project.title} — ${primary.label}`}
              className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          ))}
      </article>
    </motion.div>
  );
}
