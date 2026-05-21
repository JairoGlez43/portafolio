import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCaseStudyNeighbors,
  getCaseStudySlugs,
  getProjectBySlug,
} from "@/content/projects";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudyCover } from "@/components/case-study/cover";
import { CaseStudySection } from "@/components/case-study/section";
import { CaseStudyDecisions } from "@/components/case-study/decisions";
import { CaseStudyStack } from "@/components/case-study/stack";
import { CaseStudyNav } from "@/components/case-study/nav";

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;
  const { prev, next } = getCaseStudyNeighbors(slug);

  return (
    <article>
      <CaseStudyHero project={project} />
      <CaseStudyCover project={project} />

      <div className="mx-auto max-w-3xl px-6 pb-24">
        <CaseStudySection label="el reto" title="¿Qué había que resolver?">
          <p>{caseStudy.challenge}</p>
        </CaseStudySection>

        <CaseStudySection label="la solución" title="Cómo lo abordé">
          <p>{caseStudy.solution}</p>
        </CaseStudySection>

        <CaseStudyDecisions decisions={caseStudy.decisions} />

        <CaseStudySection label="resultado" title="Qué dejó este proyecto">
          <p>{caseStudy.outcome}</p>
        </CaseStudySection>

        <CaseStudyStack stack={project.stack} />

        <CaseStudyNav prev={prev} next={next} />
      </div>
    </article>
  );
}
