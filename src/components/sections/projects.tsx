"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";

interface ProjectsProps {
  locale: Locale;
  dictionary: Dictionary["projectsSection"];
  cardDictionary: Dictionary["projectCard"];
  projects: Project[];
}

export function Projects({
  locale,
  dictionary,
  cardDictionary,
  projects,
}: ProjectsProps) {
  const featured = getFeaturedProjects(projects);

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-4 font-mono text-sm text-muted-foreground">
            <span className="text-accent">·</span> {dictionary.eyebrow}
          </p>
          <h2
            id="proyectos-titulo"
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {dictionary.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {dictionary.description}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {featured.map((project) => (
            <li key={project.slug} className="list-none">
              <ProjectCard
                locale={locale}
                project={project}
                dictionary={cardDictionary}
              />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
