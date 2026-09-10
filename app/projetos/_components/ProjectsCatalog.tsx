import Link from "next/link";
import { ProjectCard } from "../../_components/ProjectCard";
import { ProjectFilters, type ProjectFiltersProps } from "./ProjectFilters";
import { ResultsAnnouncement } from "./ResultsAnnouncement";
import { projectCategories, type CatalogProject } from "../projectsContent";

interface ProjectsCatalogProps extends ProjectFiltersProps {
  projects: readonly CatalogProject[];
}

export function ProjectsCatalog({ category, destinations, projects }: ProjectsCatalogProps) {
  const categoryLabel = projectCategories.find((option) => option.id === category)?.label ?? "Todos";
  return (
    <section className="projectsCatalog" aria-labelledby="projects-catalog-title">
      <h2 id="projects-catalog-title" className="visuallyHidden">Explore nossos projetos</h2>
      <ProjectFilters category={category} destinations={destinations} />
      <ResultsAnnouncement categoryLabel={categoryLabel} count={projects.length} />
      {projects.length ? (
        <ul className="projectsCatalog__list">
          {projects.map((project) => <li key={project.id}><ProjectCard project={project} layout="split" /></li>)}
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
