import { render, screen, within } from "@testing-library/react";
import { notFound, usePathname } from "next/navigation";
import { ContactBanner } from "../../_components/ContactBanner";
import { portfolioProjects, type PortfolioProject } from "../../_content/portfolioCatalog";
import { siteContent } from "../../_content/siteContent";
import ProjectNotFound from "./not-found";
import ProjectDetailPage, {
  generateMetadata,
  generateStaticParams,
  ProjectDetailPageView,
  projectDetailMetadata,
  requirePublishedProject,
} from "./page";
import { projectDetailBanner, projectDetailContactActions } from "./projectDetailContent";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  usePathname: jest.fn(() => "/projetos/projeto-publicado"),
}));

const publishedProject: PortfolioProject = {
  ...portfolioProjects[0],
  detailPublication: "published",
  details: {
    statement: "Natureza que acompanha a vida da casa.",
    solutions: [
      {
        id: "integracao",
        icon: "leaf",
        title: "Integração com a arquitetura",
        description: "O jardim prolonga as áreas de convivência.",
      },
      {
        id: "sombra",
        icon: "plant",
        title: "Vegetação de sombra",
        description: "Espécies adequadas a cada condição de luz.",
      },
    ],
  },
};

describe("detalhe de projeto", () => {
  beforeEach(() => {
    jest.mocked(notFound).mockImplementation(() => {
      throw new Error("NEXT_NOT_FOUND");
    });
    jest.mocked(usePathname).mockReturnValue("/projetos/projeto-publicado");
  });

  afterEach(() => jest.resetAllMocks());

  it("gera somente os params reais publicados e metadados seguros", async () => {
    expect(generateStaticParams()).toEqual(portfolioProjects.map((project) => ({ slug: project.id })));
    expect(await generateMetadata({ params: Promise.resolve({ slug: portfolioProjects[0].id }) })).toEqual({
      title: `${portfolioProjects[0].title} | Sobreiro Paisagismo`,
      description: portfolioProjects[0].summary,
    });
    expect(projectDetailMetadata(publishedProject)).toEqual({
      title: `${publishedProject.title} | Sobreiro Paisagismo`,
      description: publishedProject.summary,
    });
  });

  it("responde com notFound para slug desconhecido", async () => {
    await expect(ProjectDetailPage({ params: Promise.resolve({ slug: "slug-inexistente" }) })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("aplica a mesma fronteira de rota a um registro em draft", () => {
    const draftProject: PortfolioProject = { ...publishedProject, detailPublication: "draft" };
    expect(() => requirePublishedProject([draftProject], draftProject.id)).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("compõe a página completa em ordem, com um h1 e origem editorial única", () => {
    const { container } = render(<ProjectDetailPageView project={publishedProject} />);
    const main = screen.getByRole("main");
    expect(Array.from(main.children).map((child) => child.className)).toEqual([
      "projectDetailHero",
      "projectDetailSurface",
      "projectDetailReturn",
      "projectDetailContact",
    ]);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(publishedProject.title);
    expect(screen.getByRole("heading", { name: "Sobre o projeto" }).closest("section")).toHaveAttribute(
      "aria-labelledby",
      "project-overview-title",
    );
    expect(screen.getByText(publishedProject.summary)).toBeVisible();
    expect(screen.getByText(publishedProject.details?.statement ?? "")).toBeVisible();
    expect(container.querySelector(".projectDetailHero__image")).toHaveAttribute("alt", "");
  });

  it("oferece breadcrumb ancestral e mantém o item atual sem link", () => {
    render(<ProjectDetailPageView project={publishedProject} />);
    const breadcrumb = screen.getByRole("navigation", { name: "Navegação estrutural" });
    expect(within(breadcrumb).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(within(breadcrumb).getByText(publishedProject.title)).toHaveAttribute("aria-current", "page");
    expect(within(breadcrumb).getAllByRole("link")).toHaveLength(2);
  });

  it("renderiza toda a galeria em ordem, com alt, dimensões e nenhuma interação", () => {
    const { container } = render(<ProjectDetailPageView project={publishedProject} />);
    const gallery = screen.getByRole("heading", { name: "Galeria do projeto" }).closest("section");
    if (!gallery) throw new Error("Galeria não renderizada");
    const images = within(gallery).getAllByRole("img");
    expect(images.map((image) => image.getAttribute("alt"))).toEqual(
      publishedProject.images.map((image) => image.alt),
    );
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("width", `${publishedProject.images[index].width}`);
      expect(image).toHaveAttribute("height", `${publishedProject.images[index].height}`);
      expect(image.closest("li")).not.toHaveAttribute("tabindex");
    });
    expect(within(gallery).queryByRole("button")).not.toBeInTheDocument();
    expect(within(gallery).queryByRole("link")).not.toBeInTheDocument();
    expect(container.querySelector(".projectDetailGallery [tabindex]")).toBeNull();
  });

  it("mostra soluções informativas e omite conteúdo opcional sem lacunas estruturais", () => {
    const { rerender, container } = render(<ProjectDetailPageView project={publishedProject} />);
    expect(screen.getByRole("heading", { name: "Soluções aplicadas" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Integração com a arquitetura" })).toBeVisible();
    expect(container.querySelector(".projectDetailSolutions [tabindex]")).toBeNull();

    rerender(<ProjectDetailPageView project={{ ...publishedProject, details: undefined }} />);
    expect(screen.queryByRole("heading", { name: "Soluções aplicadas" })).not.toBeInTheDocument();
    expect(screen.queryByText("Natureza que acompanha a vida da casa.")).not.toBeInTheDocument();
    expect(container.querySelector(".projectDetailOverview--withoutStatement")).toBeInTheDocument();
  });

  it("mantém retorno único, contato sem destino duplicado e Projetos atual no rodapé", () => {
    render(<ProjectDetailPageView project={publishedProject} />);
    expect(screen.getByRole("link", { name: "Ver outros projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getAllByRole("link", { name: "Ver outros projetos" })).toHaveLength(1);
    expect(screen.getByRole("link", { name: siteContent.contact.label })).toHaveAttribute(
      "href",
      siteContent.contact.href,
    );
    expect(screen.getAllByRole("link", { name: siteContent.contact.label })).toHaveLength(1);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
  });

  it("mapeia WhatsApp preenchido e e-mail em contorno com ícone decorativo", () => {
    const actions = projectDetailContactActions(
      { status: "configured", href: "https://example.com/whatsapp" },
      siteContent.contact,
    );
    const { container } = render(
      <ContactBanner id="detail-contact" {...projectDetailBanner} {...actions} />,
    );
    expect(screen.getByRole("link", { name: "Fale no WhatsApp" })).toHaveAttribute(
      "href",
      "https://example.com/whatsapp",
    );
    expect(screen.getByRole("link", { name: "Envie um e-mail" })).toHaveClass("buttonLink--outlineInverse");
    expect(screen.getByRole("link", { name: "Envie um e-mail" }).querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelectorAll("a")).toHaveLength(2);
  });

  it("apresenta 404 neutro com recuperação acessível", () => {
    render(<ProjectNotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "Projeto não encontrado" })).toBeVisible();
    expect(screen.getByText(/não está disponível/i)).toBeVisible();
    expect(screen.getByRole("link", { name: "Voltar para projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.queryByText(/rascunho/i)).not.toBeInTheDocument();
  });
});
