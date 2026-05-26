import type { MetadataRoute } from "next";
import { getCaseStudySlugs, type Project } from "@/content/projects";
import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jairogonzalez.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const dictionary = await getDictionary(defaultLocale);
  const projects = dictionary.projects.items as Project[];
  const slugs = getCaseStudySlugs(projects);

  return [
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === defaultLocale ? 1 : 0.9,
    })),
    ...locales.flatMap((locale) =>
      slugs.map((slug) => ({
        url: `${SITE_URL}/${locale}/proyectos/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
  ];
}
