"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface NavProps {
  locale: Locale;
  prev: Project | null;
  next: Project | null;
  dictionary: Dictionary["caseStudy"]["nav"];
}

function NeighborCard({
  locale,
  project,
  direction,
  dictionary,
}: {
  locale: Locale;
  project: Project;
  direction: "prev" | "next";
  dictionary: Dictionary["caseStudy"]["nav"];
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/${locale}/proyectos/${project.slug}`}
      className="group flex min-h-[140px] flex-1 flex-col justify-between gap-4 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
        {isPrev ? (
          <>
            <ArrowLeft className="h-3 w-3" />
            {dictionary.previous}
          </>
        ) : (
          <>
            {dictionary.next}
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

export function CaseStudyNav({ locale, prev, next, dictionary }: NavProps) {
  return (
    <motion.nav
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={dictionary.ariaLabel}
      className="mt-24 border-t border-border pt-12"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {prev && (
          <NeighborCard
            locale={locale}
            project={prev}
            direction="prev"
            dictionary={dictionary}
          />
        )}
        {next && (
          <NeighborCard
            locale={locale}
            project={next}
            direction="next"
            dictionary={dictionary}
          />
        )}
      </div>
      <div className="flex justify-center">
        <Link
          href={`/${locale}#proyectos`}
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          {dictionary.allProjects}
        </Link>
      </div>
    </motion.nav>
  );
}
