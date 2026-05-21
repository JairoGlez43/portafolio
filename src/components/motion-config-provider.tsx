"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honor the user's `prefers-reduced-motion` setting across all Framer Motion
 * animations in the tree. `"user"` defers to the OS-level preference.
 */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
