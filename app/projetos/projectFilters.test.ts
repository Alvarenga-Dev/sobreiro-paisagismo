import { filterProjects, normalizeCategory, projectFilterHref } from "./projectFilters";
import { catalogProjects, projectCategories, type CatalogProject } from "./projectsContent";

describe("filtros do catálogo", () => {
  it.each([undefined, "", "invalido", "todos", ["piscinas", "varandas"], ["piscinas"]])("normaliza %j para Todos", (value) => {
    expect(normalizeCategory(value)).toBe("todos");
  });
  it.each(projectCategories)("seleciona $id e preserva a ordem editorial", ({ id }) => {
    expect(normalizeCategory(id)).toBe(id);
    expect(filterProjects(catalogProjects, id)).toEqual(id === "todos" ? catalogProjects : catalogProjects.filter((project) => project.categoryId === id));
    expect(filterProjects(catalogProjects, id).length).toBe(id === "todos" ? catalogProjects.length : catalogProjects.filter((project) => project.categoryId === id).length);
  });
  it("mantém múltiplos resultados em ordem e aceita coleção vazia", () => {
    const fixture: readonly CatalogProject[] = catalogProjects.map((project, index) => ({ ...project, categoryId: index % 2 ? "jardins-verticais" : "paisagismo-residencial" }));
    expect(filterProjects(fixture, "paisagismo-residencial").map((project) => project.id)).toEqual(fixture.filter((project) => project.categoryId === "paisagismo-residencial").map((project) => project.id));
    expect(filterProjects([], "todos")).toEqual([]);
    expect(filterProjects(fixture, "comerciais")).toEqual([]);
  });
  it("preserva parâmetros repetidos e substitui somente categoria", () => {
    const params = { origem: "home", tag: ["a", "b"], categoria: ["varandas", "residencial"], vazio: "", ausente: undefined };
    expect(projectFilterHref(params, "piscinas")).toBe("/projetos?origem=home&tag=a&tag=b&vazio=&categoria=piscinas");
    expect(projectFilterHref(params, "todos")).toBe("/projetos?origem=home&tag=a&tag=b&vazio=");
    expect(projectFilterHref({ categoria: "todos" }, "todos")).toBe("/projetos");
    expect(projectFilterHref({ tag: "a & b" }, "todos")).toBe("/projetos?tag=a+%26+b");
  });
});
