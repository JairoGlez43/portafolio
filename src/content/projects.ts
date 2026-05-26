// ============================================================================
// Project types and helpers
// ============================================================================
// Localized project content lives in `src/i18n/messages/*.json`.
// This file keeps the shared contracts and navigation helpers.
// ============================================================================

export type ProjectStatus = "live" | "private" | "archived";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseStudyDecision {
  title: string;
  body: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  decisions: CaseStudyDecision[];
  outcome: string;
  gallery?: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  status: ProjectStatus;
  image: string;
  accent: string;
  links?: ProjectLink[];
  featured: boolean;
  caseStudy?: CaseStudy;
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(
  projects: Project[],
  slug: string,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getCaseStudySlugs(projects: Project[]): string[] {
  return projects
    .filter((project) => project.caseStudy)
    .map((project) => project.slug);
}

export function getCaseStudyNeighbors(
  projects: Project[],
  slug: string,
): {
  prev: Project | null;
  next: Project | null;
} {
  const studies = projects.filter((project) => project.caseStudy);
  const index = studies.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = studies[(index - 1 + studies.length) % studies.length];
  const next = studies[(index + 1) % studies.length];

  return { prev, next };
}
