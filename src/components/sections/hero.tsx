"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/i18n/dictionaries";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero({ dictionary }: { dictionary: Dictionary["hero"] }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Sin esto, los elementos con visibility:hidden en CSS
        // quedarían ocultos para siempre
        gsap.set("[data-anim]", { autoAlpha: 1 });
        return;
      }

      const show = { autoAlpha: 1 } as const;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo('[data-anim="label"]',
          { y: 20, autoAlpha: 0 },
          { y: 0, ...show, duration: 0.6 },
        )
        .fromTo(
          '[data-anim="name-char"]',
          { y: 80, autoAlpha: 0 },
          { y: 0, ...show, duration: 0.9, stagger: 0.04 },
          "-=0.3",
        )
        .fromTo(
          '[data-anim="role"]',
          { y: 20, autoAlpha: 0 },
          { y: 0, ...show, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          '[data-anim="tagline"]',
          { y: 20, autoAlpha: 0 },
          { y: 0, ...show, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          '[data-anim="cta"]',
          { y: 20, autoAlpha: 0 },
          { y: 0, ...show, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );

      gsap.to('[data-anim="hero-content"]', {
        yPercent: -20,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  const name = dictionary.name;
  const chars = name.split("");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6"
      aria-label={dictionary.ariaLabel}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_30%,rgba(96,165,250,0.08),transparent_70%)]"
      />

      <div data-anim="hero-content" className="mx-auto w-full max-w-4xl">
        <p
          data-anim="label"
          className="mb-6 font-mono text-sm text-muted-foreground"
        >
          {dictionary.intro}
        </p>

        <h1
          aria-label={name}
          className="mb-4 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          {chars.map((char, i) => (
            <span
              key={i}
              data-anim="name-char"
              aria-hidden="true"
              className="inline-block whitespace-pre"
            >
              {char}
            </span>
          ))}
        </h1>

        <p
          data-anim="role"
          className="mb-6 text-2xl font-medium text-muted-foreground sm:text-3xl"
        >
          {dictionary.role}
        </p>

        <p
          data-anim="tagline"
          className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {dictionary.taglineStart}{" "}
          <span className="text-foreground">{dictionary.taglineTech[0]}</span>,{" "}
          <span className="text-foreground">{dictionary.taglineTech[1]}</span>{" "}
          {dictionary.taglineAnd}{" "}
          <span className="text-foreground">{dictionary.taglineTech[2]}</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            data-anim="cta"
            href="#proyectos"
            className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-all hover:-translate-y-0.5 active:scale-95"
          >
            {dictionary.projectsCta}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <a
            data-anim="cta"
            href={dictionary.cvHref}
            download={dictionary.cvDownload}
            className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-accent/20 bg-accent/5 px-6 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/10 hover:-translate-y-0.5 active:scale-95"
          >
            {dictionary.cvCta}
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
