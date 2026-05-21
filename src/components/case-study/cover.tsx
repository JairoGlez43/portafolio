"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

export function CaseStudyCover({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="mx-auto max-w-5xl px-6"
    >
      <div
        className="overflow-hidden rounded-2xl border border-border"
        style={{ ["--accent-glow" as string]: `#${project.accent}` }}
      >
        <div className="relative aspect-[16/10]">
          <img
            src={project.image}
            alt={`Captura del proyecto ${project.title}`}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 100%, var(--accent-glow), transparent 70%)",
              mixBlendMode: "soft-light",
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
