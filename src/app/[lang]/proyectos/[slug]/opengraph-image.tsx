import { ImageResponse } from "next/og";
import {
  getCaseStudySlugs,
  getProjectBySlug,
  type Project,
} from "@/content/projects";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Case study — Jairo González";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const dictionary = await getDictionary(defaultLocale);
  const projects = dictionary.projects.items as Project[];
  const slugs = getCaseStudySlugs(projects);

  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dictionary = await getDictionary(locale);
  const projects = dictionary.projects.items as Project[];
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    return new ImageResponse(
      (
        <div style={{ fontSize: 48, color: "white", background: "#0a0a0a" }}>
          {dictionary.caseStudy.og.notFound}
        </div>
      ),
      { ...size },
    );
  }

  const accent = `#${project.accent}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `radial-gradient(60% 60% at 30% 20%, ${accent}40, transparent 70%), #0a0a0a`,
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: 4,
          }}
        >
          <div style={{ display: "flex" }}>{dictionary.caseStudy.og.label}</div>
          <div style={{ display: "flex" }}>{project.year}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 28,
              color: accent,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            {project.title.toLowerCase()}
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {project.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            fontSize: 22,
            fontFamily: "monospace",
            color: "#94a3b8",
          }}
        >
          {project.stack.slice(0, 6).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "8px 16px",
                border: "1px solid #27272a",
                borderRadius: 8,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
