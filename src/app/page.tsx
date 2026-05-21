import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Placeholder para próximas secciones (Sobre mí, Proyectos, Contacto) */}
      <section
        id="sobre-mi"
        className="mx-auto max-w-3xl px-6 py-32"
        aria-label="Sobre mí"
      >
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Sobre mí</h2>
        <p className="text-lg text-muted-foreground">
          Sección en construcción.
        </p>
      </section>
    </>
  );
}
