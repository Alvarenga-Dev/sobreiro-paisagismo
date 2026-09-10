import Link from "next/link";
import { ProjectCard } from "../../_components/ProjectCard";
import { ProjectFilters, type ProjectFiltersProps } from "./ProjectFilters";
import { ResultsAnnouncement } from "./ResultsAnnouncement";
import { SectionHeading } from "../../_components/Typography";
import {
  projectCategories,
  projectPresentationById,
  projectsContent,
  type CatalogProject,
} from "../projectsContent";

interface ProjectsCatalogProps extends ProjectFiltersProps {
  projects: readonly CatalogProject[];
}

export function ProjectsCatalog({ category, destinations, projects }: ProjectsCatalogProps) {
  const categoryLabel = projectCategories.find((option) => option.id === category)?.label ?? "Todos";
  return (
    <section className="projectsCatalog" aria-labelledby="projects-catalog-title" data-region="catalog">
      <div className="projectsCatalog__introduction">
        <div className="projectsCatalog__heading">
          <SectionHeading
            eyebrow={projectsContent.catalog.eyebrow}
            fragments={projectsContent.catalog.title}
            id="projects-catalog-title"
          />
          <ProjectFilters category={category} destinations={destinations} />
        </div>
        <p className="projectsCatalog__note">
          <span aria-hidden="true">⌇</span>
          {projectsContent.catalog.note}
        </p>
      </div>
      <ResultsAnnouncement categoryLabel={categoryLabel} count={projects.length} />
      {projects.length ? (
        <ul className="projectsCatalog__list">
          {projects.map((project) => {
            const presentation = projectPresentationById.get(project.id);
            if (!presentation) throw new Error(`Apresentação ausente para: ${project.id}`);
            return (
              <li key={project.id}>
                <ProjectCard
                  project={project}
                  layout="split"
                  direction={presentation.direction}
                  surface={presentation.surface}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="projectsCatalog__empty">
          <p>Nenhum projeto encontrado nesta categoria.</p>
          <Link href={destinations.todos} scroll={false}>Ver todos</Link>
        </div>
      )}
    </section>
  );
}
