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
      <div className="aboutSectionInner projectsSection__inner">
        <div className="projectsSection__header">
          <SectionHeading
            id="projetos-title"
            eyebrow="Projetos em destaque"
            fragments={heading}
            context="onDark"
          />
          <SectionAction href="/projetos" label="Ver todos os projetos" />
        </div>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
