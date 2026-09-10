import { render, screen, within } from "@testing-library/react";
import ProjectsPage, { metadata } from "./page";
import { ProjectsCatalog } from "./_components/ProjectsCatalog";
import { ResultsAnnouncement } from "./_components/ResultsAnnouncement";
import { ProjectCard } from "../_components/ProjectCard";
import { ProjectsContactBanner } from "./_components/ProjectsContactBanner";
import { SiteFooter } from "../_components/SiteFooter";
import { siteContent } from "../_content/siteContent";
import {
  catalogProjects,
  projectCategories,
  projectContactActions,
  projectPresentationById,
  projectPresentations,
  projectsContent,
  validateProjectPresentations,
} from "./projectsContent";

const destinations = Object.fromEntries(projectCategories.map((option) => [option.id, `/projetos?categoria=${option.id}`]));
destinations.todos = "/projetos?tag=a&tag=b";

describe("Projetos", () => {
  afterEach(() => jest.resetAllMocks());
  it("entrega composição filtrada no servidor com seleção, headings e contato", async () => {
    render(await ProjectsPage({ searchParams: Promise.resolve({ categoria: "paisagismo-comercial", tag: ["a", "b"] }) }));
    expect(metadata.title).toBe("Projetos | Sobreiro Paisagismo");
    expect(metadata.description).toMatch(/portfólio/);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Projetos que transformam espaços");
    expect(screen.getByRole("heading", { level: 2, name: "Encontre o projeto que inspira você." })).toBeVisible();
    expect(screen.getByText("NOSSOS PROJETOS")).toBeVisible();
    expect(screen.getByText("EXPLORE POR CATEGORIA")).toBeVisible();
    expect(screen.getByText("VAMOS CONVERSAR?")).toBeVisible();
    expect(screen.getByText(projectsContent.hero.statement)).toBeVisible();
    expect(screen.getByText(projectsContent.catalog.note)).toBeVisible();
    expect(screen.getByText(projectsContent.banner.statement)).toBeVisible();
    expect(document.querySelector("main header")).toBeNull();
    expect(
      Array.from(document.querySelectorAll("main section[data-region]")).map((section) => section.getAttribute("data-region")),
    ).toEqual(["hero", "catalog", "contact"]);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(["Coffee Comfort"]);
    const filters = screen.getByRole("navigation", { name: "Categorias de projetos" });
    expect(within(filters).getAllByRole("link")).toHaveLength(8);
    expect(within(filters).getByRole("link", { name: "Paisagismo comercial" })).toHaveAttribute("aria-current", "true");
    expect(within(filters).getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toHaveLength(1);
    expect(within(filters).getByRole("link", { name: "Todos" })).toHaveAttribute("href", "/projetos?tag=a&tag=b");
    expect(screen.getByRole("status")).toHaveTextContent("Paisagismo comercial: 1 projeto encontrado");
    expect(screen.getByRole("link", { name: "Fale com a Sobreiro" })).toHaveAttribute("href", siteContent.contact.href);
    expect(within(screen.getByRole("contentinfo")).getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
    for (const heading of screen.getAllByRole("heading", { level: 2 }).filter((h) => h.closest("main"))) {
      expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
    }
  });
  it("mostra a coleção completa e sua ordem para categoria ambígua", async () => {
    render(await ProjectsPage({ searchParams: Promise.resolve({ categoria: ["paisagismo-comercial", "jardins-verticais"] }) }));
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(catalogProjects.map((project) => project.title));
    expect(screen.getByRole("status")).toHaveTextContent("Todos: 8 projetos encontrados");
  });
  it.each(["paisagismo-comercial", "todos"] as const)("oferece recuperação com coleção vazia em %s", (category) => {
    render(<><ProjectsCatalog projects={[]} category={category} destinations={destinations} /><ProjectsContactBanner id="contact" {...projectsContent.banner} {...projectContactActions({ status: "unavailable" }, siteContent.contact)} /></>);
    expect(screen.getByText("Nenhum projeto encontrado nesta categoria.")).toBeVisible();
    expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute("href", "/projetos?tag=a&tag=b");
    expect(screen.getByRole("status")).toHaveTextContent("0 projetos encontrados");
    expect(screen.getByRole("navigation", { name: "Categorias de projetos" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Seu projeto pode ser o próximo." })).toBeVisible();
  });
  it("atualiza a região persistente entre contagens iguais", () => {
    const { rerender } = render(<ResultsAnnouncement categoryLabel="Piscinas" count={1} />);
    const region = screen.getByRole("status");
    rerender(<ResultsAnnouncement categoryLabel="Varandas" count={1} />);
    expect(screen.getByRole("status")).toBe(region);
    expect(region).toHaveTextContent("Varandas: 1 projeto encontrado");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveAttribute("aria-atomic", "true");
  });
  it("cards informativos não simulam links; cards com destino têm só uma ação", () => {
    const project = { ...catalogProjects[0], href: undefined };
    const { rerender, container } = render(<ProjectCard project={project} layout="split" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Detalhes em breve")).toBeVisible();
    expect(container.querySelector("[tabindex]")).toBeNull();
    rerender(<ProjectCard project={{ ...project, href: "/destino-confirmado" }} layout="split" />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/destino-confirmado");
    expect(screen.getByText(/Ver detalhes/)).toBeVisible();
    rerender(<ProjectCard project={{ ...project, href: "/destino-confirmado" }} />);
    expect(screen.getByRole("article")).toHaveClass("projectCard--stacked");
  });
  it("mantém a matriz xadrez completa e estável por ID após filtragem", () => {
    expect(projectPresentations).toHaveLength(8);
    expect([...projectPresentationById.keys()]).toEqual(catalogProjects.map((project) => project.id));
    expect(projectPresentations.map(({ direction, surface }) => `${direction}:${surface}`)).toEqual([
      "mediaFirst:dark",
      "mediaFirst:light",
      "contentFirst:light",
      "mediaFirst:dark",
      "mediaFirst:dark",
      "mediaFirst:light",
      "contentFirst:light",
      "mediaFirst:dark",
    ]);
    const filtered = catalogProjects.filter((project) => project.categoryId === "design-de-interiores");
    expect(filtered.map((project) => projectPresentationById.get(project.id))).toEqual([
      projectPresentations[5],
      projectPresentations[6],
    ]);
  });
  it("rejeita apresentações ausentes, duplicadas ou desconhecidas", () => {
    expect(() => validateProjectPresentations(projectPresentations.slice(1), catalogProjects)).toThrow(/ausente/i);
    expect(() => validateProjectPresentations([...projectPresentations, projectPresentations[0]], catalogProjects)).toThrow(/duplicado/i);
    expect(() => validateProjectPresentations([...projectPresentations, { id: "desconhecido", direction: "mediaFirst", surface: "dark" }], catalogProjects)).toThrow(/desconhecido/i);
  });
  it("banner usa fallback sem imagem e WhatsApp somente quando configurado", () => {
    const { rerender } = render(<ProjectsContactBanner id="contact" {...projectsContent.banner} {...projectContactActions({ status: "unavailable" }, siteContent.contact)} />);
    expect(screen.getByRole("heading", { name: "Seu projeto pode ser o próximo." })).toBeVisible();
    expect(document.querySelector(".projectsContactBanner__image")).toBeNull();
    expect(screen.queryByRole("link", { name: "Fale no WhatsApp" })).not.toBeInTheDocument();
    rerender(<ProjectsContactBanner id="contact" {...projectsContent.banner} {...projectContactActions({ status: "configured", href: "https://example.com/whatsapp" }, siteContent.contact)} />);
    expect(screen.getByText(projectsContent.banner.description)).toBeVisible();
    expect(screen.getByRole("link", { name: "Fale no WhatsApp" })).toHaveAttribute("href", "https://example.com/whatsapp");
    expect(screen.getByRole("link", { name: "Agende uma conversa" })).toHaveAttribute("href", siteContent.contact.href);
  });
  it("banner renderiza mídia aprovada e não fabrica ações indisponíveis", () => {
    const approvedMedia = {
      status: "approved" as const,
      ...catalogProjects[0].media,
    };
    const { rerender } = render(
      <ProjectsContactBanner id="contact" {...projectsContent.banner} media={approvedMedia} />,
    );
    expect(document.querySelector(".projectsContactBanner__image")).toHaveAttribute("src");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Contato temporariamente indisponível.")).toBeVisible();
    rerender(<ProjectsContactBanner id="contact" {...projectsContent.banner} />);
    expect(document.querySelector(".projectsContactBanner__image")).toBeNull();
  });
  it("rodapé reconhece página com query e mantém default sem seleção", () => {
    const { rerender } = render(<SiteFooter {...siteContent.internalFooter} currentPath="/projetos?categoria=piscinas" />);
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
    rerender(<SiteFooter {...siteContent.internalFooter} />);
    expect(screen.getByRole("link", { name: "Projetos" })).not.toHaveAttribute("aria-current");
  });
});
