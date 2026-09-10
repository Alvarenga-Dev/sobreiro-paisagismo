import { projectCategories, type CatalogProject, type ProjectFilter } from "./projectsContent";

export type ProjectSearchParams = Readonly<Record<string, string | string[] | undefined>>;

export function normalizeCategory(value: string | readonly string[] | undefined): ProjectFilter {
  return projectCategories.find((category) => category.id === value)?.id ?? "todos";
}

export function filterProjects(projects: readonly CatalogProject[], category: ProjectFilter): readonly CatalogProject[] {
  return category === "todos" ? projects : projects.filter((project) => project.categoryId === category);
}

export function projectFilterHref(params: ProjectSearchParams, category: ProjectFilter): string {
  const query = new URLSearchParams();
  for (const [name, value] of Object.entries(params)) {
    if (name === "categoria" || value === undefined) continue;
    for (const entry of Array.isArray(value) ? value : [value]) query.append(name, entry);
  }
  if (category !== "todos") query.set("categoria", category);
  const search = query.toString();
  return `/projetos${search ? `?${search}` : ""}`;
}
