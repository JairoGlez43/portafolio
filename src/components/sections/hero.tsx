"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entry timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from('[data-anim="label"]', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          '[data-anim="name-char"]',
          {
            y: 80,
            opacity: 0,
            duration: 0.9,
            stagger: 0.04,
          },
          "-=0.3",
        )
        .from(
          '[data-anim="role"]',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5",
        )
        .from(
          '[data-anim="tagline"]',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          '[data-anim="cta"]',
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .from(
          '[data-anim="scroll-hint"]',
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        );

      // Subtle parallax fade-out on scroll
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

  const name = "Jairo González";
  // Split into characters preserving spaces
  const chars = name.split("");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6"
      aria-label="Presentación"
    >
      {/* Subtle radial gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_30%,rgba(96,165,250,0.08),transparent_70%)]"
      />

      <div data-anim="hero-content" className="mx-auto w-full max-w-4xl">
        <p
          data-anim="label"
          className="mb-6 font-mono text-sm text-muted-foreground"
        >
          Hola, soy
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
          Desarrollador Frontend
        </p>

        <p
          data-anim="tagline"
          className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Construyo interfaces accesibles, rápidas y con animaciones que cuentan
          historias. Especializado en{" "}
          <span className="text-foreground">React</span>,{" "}
          <span className="text-foreground">Next.js</span> y{" "}
          <span className="text-foreground">TypeScript</span>.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            data-anim="cta"
            href="#proyectos"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Ver proyectos
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <a
            data-anim="cta"
            href="/cv-jairo-gonzalez.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Descargar CV
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-anim="scroll-hint"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground"
      >
        <span>scroll</span>
        <span className="h-8 w-px animate-pulse bg-border" />
      </div>
    </section>
  );
}
