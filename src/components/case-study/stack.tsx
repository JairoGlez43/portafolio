"use client";

import { motion } from "framer-motion";

export function CaseStudyStack({ stack }: { stack: string[] }) {
  return (
    <motion.section
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      <p className="mb-3 font-mono text-sm text-muted-foreground">
        <span className="text-accent">·</span> stack
      </p>
      <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Tecnologías utilizadas
      </h2>
      <ul className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-sm text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
