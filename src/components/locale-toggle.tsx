"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LocaleToggleProps {
  locale: Locale;
  labels: {
    switchToEnglish: string;
    switchToSpanish: string;
  };
}

function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    const pathWithoutLocale = `/${segments.slice(2).join("/")}`;
    return pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, "");
  }

  return pathname || "/";
}

function getLocalizedPathname(locale: Locale, pathname: string) {
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

export function LocaleToggle({ locale, labels }: LocaleToggleProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleLocale = (nextLocale: Locale) => {
    if (locale === nextLocale) return;

    const basePathname = stripLocaleFromPathname(pathname);
    const nextPathname = getLocalizedPathname(nextLocale, basePathname);
    const queryString = searchParams.toString();

    document.cookie = `locale=${nextLocale}; path=/; max-age=${365 * 86400}; SameSite=Lax`;
    router.replace(queryString ? `${nextPathname}?${queryString}` : nextPathname);
  };

  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-md border border-border bg-muted/30 p-1 text-xs">
      <button
        type="button"
        aria-label={labels.switchToEnglish}
        onClick={() => toggleLocale("en")}
        className={cn(
          "h-7 rounded px-2.5 font-mono uppercase text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          locale === "en" && "bg-background text-foreground shadow-sm",
        )}
      >
        EN
      </button>
      <button
        type="button"
        aria-label={labels.switchToSpanish}
        onClick={() => toggleLocale("es")}
        className={cn(
          "h-7 rounded px-2.5 font-mono uppercase text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          locale === "es" && "bg-background text-foreground shadow-sm",
        )}
      >
        ES
      </button>
    </div>
  );
}
