import Link from "next/link";
import { LineIcon } from "../../_components/LineIcon";
import { projectCategories, type ProjectFilter } from "../projectsContent";

export interface ProjectFiltersProps {
  category: ProjectFilter;
  destinations: Readonly<Record<string, string>>;
}

export function ProjectFilters({ category, destinations }: ProjectFiltersProps) {
  return (
    <nav className="projectFilters" aria-label="Categorias de projetos">
      {projectCategories.map((option) => (
        <Link key={option.id} href={destinations[option.id]} scroll={false} aria-current={category === option.id ? "true" : undefined}>
          {option.icon ? <LineIcon name={option.icon} /> : null}
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
