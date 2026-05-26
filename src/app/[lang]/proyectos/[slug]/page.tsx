import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCaseStudyNeighbors,
  getCaseStudySlugs,
  getProjectBySlug,
  type Project,
} from "@/content/projects";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudyCover } from "@/components/case-study/cover";
import { CaseStudySection } from "@/components/case-study/section";
import { CaseStudyDecisions } from "@/components/case-study/decisions";
import { CaseStudyStack } from "@/components/case-study/stack";
import { CaseStudyNav } from "@/components/case-study/nav";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateStaticParams() {
  const dictionary = await getDictionary(defaultLocale);
  const projects = dictionary.projects.items as Project[];
  const slugs = getCaseStudySlugs(projects);

  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const dictionary = await getDictionary(lang);
  const projects = dictionary.projects.items as Project[];
  const project = getProjectBySlug(projects, slug);
  if (!project || !project.caseStudy) return {};

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Case study`,
      description: project.subtitle,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const projects = dictionary.projects.items as Project[];
  const project = getProjectBySlug(projects, slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;
  const { prev, next } = getCaseStudyNeighbors(projects, slug);
  const sections = dictionary.caseStudy.sections;

  return (
    <article>
      <CaseStudyHero
        locale={lang}
        project={project}
        dictionary={dictionary.caseStudy}
        statusLabels={dictionary.projectCard.status}
      />
      <CaseStudyCover
        project={project}
        alt={dictionary.caseStudy.coverAlt}
      />

      <div className="mx-auto max-w-3xl px-6 pb-24">
        <CaseStudySection
          label={sections.challenge.label}
          title={sections.challenge.title}
        >
          <p>{caseStudy.challenge}</p>
        </CaseStudySection>

        <CaseStudySection
          label={sections.solution.label}
          title={sections.solution.title}
        >
          <p>{caseStudy.solution}</p>
        </CaseStudySection>

        <CaseStudyDecisions
          decisions={caseStudy.decisions}
          label={sections.decisions.label}
          title={sections.decisions.title}
        />

        <CaseStudySection
          label={sections.outcome.label}
          title={sections.outcome.title}
        >
          <p>{caseStudy.outcome}</p>
        </CaseStudySection>

        <CaseStudyStack
          stack={project.stack}
          label={sections.stack.label}
          title={sections.stack.title}
        />

        <CaseStudyNav
          locale={lang}
          prev={prev}
          next={next}
          dictionary={dictionary.caseStudy.nav}
        />
      </div>
    </article>
  );
}
