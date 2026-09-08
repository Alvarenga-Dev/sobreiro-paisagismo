import { SectionAction } from "../_components/ButtonLink";
import { SectionHeading, type TextFragment } from "../_components/Typography";
import type { ProjectCardData } from "../_components/ProjectCard";
import { ProjectCarousel } from "./ProjectCarousel";

export interface ProjectsSectionProps {
  heading: readonly TextFragment[];
  projects: readonly ProjectCardData[];
}

export function ProjectsSection({ heading, projects }: ProjectsSectionProps) {
  return (
    <section className="projectsSection" id="projetos" aria-labelledby="projetos-title" data-region="projects">
      <div className="projectsSection__header">
        <SectionHeading
          id="projetos-title"
          eyebrow="Projetos"
          fragments={heading}
          context="onDark"
        />
        <SectionAction href="#contato" label="Ver todos" />
      </div>
      <ProjectCarousel projects={projects} />
    </section>
  );
}
