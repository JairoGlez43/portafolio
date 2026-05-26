import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Project } from "@/content/projects";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const projects = dictionary.projects.items as Project[];

  return (
    <>
      <Hero dictionary={dictionary.hero} />
      <Projects
        locale={lang}
        dictionary={dictionary.projectsSection}
        cardDictionary={dictionary.projectCard}
        projects={projects}
      />
      <About dictionary={dictionary.about} />
      <Contact dictionary={dictionary.contact} />
    </>
  );
}
