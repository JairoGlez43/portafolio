import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionConfigProvider } from "@/components/motion-config-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/skip-link";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import "../globals.css";

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

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dictionary = await getDictionary(lang);
  const metadata = dictionary.metadata;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: metadata.title,
      template: metadata.titleTemplate,
    },
    description: metadata.description,
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
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: metadata.ogLocale,
      url: `${SITE_URL}/${lang}`,
      siteName: metadata.siteName,
      title: metadata.title,
      description: metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jairo González Travieso",
    url: SITE_URL,
    email: "mailto:jairoglez1999@gmail.com",
    jobTitle: dictionary.layout.jobTitle,
    description: dictionary.metadata.description,
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

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
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
            <SkipLink label={dictionary.layout.skipLink} />
            <Header
              locale={lang}
              dictionary={dictionary.header}
              localeLabels={dictionary.localeToggle}
              themeLabels={dictionary.themeToggle}
            />
            <main id="contenido-principal" className="flex-1">
              {children}
            </main>
            <Footer madeWith={dictionary.footer.madeWith} />
          </MotionConfigProvider>
        </ThemeProvider>
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
