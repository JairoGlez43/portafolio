export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="font-mono text-sm text-muted-foreground mb-4">
          Hola, soy
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
          Jairo González
        </h1>
        <p className="text-xl text-muted-foreground">
          Desarrollador Frontend · React · Next.js · TypeScript
        </p>
        <p className="mt-8 text-sm text-muted-foreground font-mono">
          Portafolio en construcción
        </p>
      </div>
    </main>
  );
}
