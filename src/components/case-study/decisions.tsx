"use client";

import { motion } from "framer-motion";
import type { CaseStudyDecision } from "@/content/projects";

interface DecisionsProps {
  decisions: CaseStudyDecision[];
  label: string;
  title: string;
}

export function CaseStudyDecisions({ decisions, label, title }: DecisionsProps) {
  return (
    <motion.section
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      <p className="mb-3 font-mono text-sm text-muted-foreground">
        <span className="text-accent text-base">·</span> {label}
      </p>
      <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <ol className="space-y-10">
        {decisions.map((decision, idx) => (
          <motion.li
            key={decision.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-l border-border pl-5"
          >
            <span className="row-span-2 font-mono text-2xl font-bold tabular-nums text-accent">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold tracking-tight">
              {decision.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {decision.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
