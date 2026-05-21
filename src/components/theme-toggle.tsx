"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {/* Both icons render to avoid hydration mismatch; opacity swaps after mount */}
      <Sun
        className={`h-4 w-4 transition-opacity ${
          mounted && isDark ? "opacity-0 absolute" : "opacity-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 transition-opacity ${
          mounted && isDark ? "opacity-100" : "opacity-0 absolute"
        }`}
      />
    </button>
  );
}
