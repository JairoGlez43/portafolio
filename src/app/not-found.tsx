import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-muted-foreground">error 404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          Esta página no existe.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Igual estaba aquí antes. O igual nunca lo estuvo. En cualquier caso,
          volvamos a casa.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
