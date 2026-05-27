"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  label: string;
  title: string;
  children: ReactNode;
}

export function CaseStudySection({ label, title, children }: SectionProps) {
  return (
    <motion.section
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      <p className="mb-3 font-mono text-sm text-muted-foreground">
        <span className="text-accent text-base">·</span> {label}
      </p>
      <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="prose-case max-w-none text-lg leading-relaxed text-muted-foreground">
        {children}
      </div>
    </motion.section>
  );
}
