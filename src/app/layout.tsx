import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionConfigProvider } from "@/components/motion-config-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jairogonzalez.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Desarrollador Frontend especializado en React, Next.js y TypeScript. Construyo interfaces modernas, accesibles y de alto rendimiento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jairo González — Desarrollador Frontend",
    template: "%s | Jairo González",
  },
  description,
  authors: [{ name: "Jairo González Travieso", url: SITE_URL }],
  creator: "Jairo González Travieso",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Madrid",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Jairo González — Portafolio",
    title: "Jairo González — Desarrollador Frontend",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jairo González — Desarrollador Frontend",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jairo González Travieso",
  url: SITE_URL,
  email: "mailto:jarioglez1999@gmail.com",
  jobTitle: "Frontend Developer",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
  sameAs: ["https://github.com/JairoGlez43"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionConfigProvider>
            <SkipLink />
            <Header />
            <main id="contenido-principal" className="flex-1">
              {children}
            </main>
            <Footer />
          </MotionConfigProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          // JSON-LD must be inlined as raw JSON string
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
