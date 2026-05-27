"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export function About({ dictionary }: { dictionary: Dictionary["about"] }) {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-14"
        >
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mb-4 font-mono text-sm text-muted-foreground"
          >
            <span className="text-accent text-base">·</span> {dictionary.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={transition}
            id="sobre-mi-titulo"
            className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {dictionary.title}
          </motion.h2>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {dictionary.paragraphs.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp} transition={transition}>
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Stack agrupado */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={transition}
          className="rounded-xl border border-border bg-muted/20 p-6 sm:p-8"
        >
          <p className="mb-6 font-mono text-sm text-muted-foreground">
            {dictionary.stackLabel}
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.skillGroups.map((group) => (
              <li key={group.label}>
                <p className="mb-2 text-sm font-semibold tracking-tight">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
