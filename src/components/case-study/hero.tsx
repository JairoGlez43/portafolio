"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-emerald-500",
  private: "bg-zinc-500",
  archived: "bg-amber-500",
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export function CaseStudyHero({
  locale,
  project,
  dictionary,
  statusLabels,
}: {
  locale: Locale;
  project: Project;
  dictionary: Dictionary["caseStudy"];
  statusLabels: Dictionary["projectCard"]["status"];
}) {
  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="mx-auto max-w-4xl px-6 pt-12 pb-16 sm:pt-20"
    >
      <motion.div variants={fadeUp} transition={transition}>
        <Link
          href={`/${locale}#proyectos`}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {dictionary.backToProjects}
        </Link>
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={transition}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`}
        />
        {dictionary.badgeLabel} · {statusLabels[project.status].toLowerCase()}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        transition={transition}
        className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
      >
        {project.title}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={transition}
        className="mt-6 text-xl text-muted-foreground sm:text-2xl"
      >
        {project.subtitle}
      </motion.p>

      <motion.div
        variants={fadeUp}
        transition={transition}
        className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6 text-sm"
      >
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            {dictionary.year}
          </p>
          <p className="mt-1 font-medium">{project.year}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            {dictionary.role}
          </p>
          <p className="mt-1 font-medium">{project.role}</p>
        </div>
        {project.links && project.links.length > 0 && (
          <div className="ml-auto flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.header>
  );
}
