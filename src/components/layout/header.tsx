"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary["header"];
  localeLabels: Dictionary["localeToggle"];
  themeLabels: Dictionary["themeToggle"];
}

export function Header({
  locale,
  dictionary,
  localeLabels,
  themeLabels,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileOpen]);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          aria-label={dictionary.homeLabel}
          className="font-mono text-sm font-bold tracking-tight transition-colors hover:text-accent"
          onClick={closeMobileMenu}
        >
          jairo.gz<span className="text-accent">.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          aria-label={dictionary.navLabel}
        >
          {dictionary.nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Suspense fallback={null}>
            <LocaleToggle locale={locale} labels={localeLabels} />
          </Suspense>
          <ThemeToggle labels={themeLabels} />
        </div>

        <button
          type="button"
          aria-label={isMobileOpen ? dictionary.closeMenu : dictionary.openMenu}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          {isMobileOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-border bg-background/95 px-6 py-5 shadow-lg backdrop-blur-md transition-[opacity,transform] duration-200 md:hidden",
          isMobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none absolute inset-x-0 -translate-y-2 opacity-0",
        )}
      >
        <nav
          aria-label={dictionary.navLabel}
          className="mx-auto flex max-w-5xl flex-col gap-1"
        >
          {dictionary.nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto mt-5 flex max-w-5xl items-center justify-between border-t border-border pt-5">
          <Suspense fallback={null}>
            <LocaleToggle locale={locale} labels={localeLabels} />
          </Suspense>
          <ThemeToggle labels={themeLabels} />
        </div>
      </div>
    </header>
  );
}
