import { render, screen, within } from "@testing-library/react";
import { notFound, usePathname } from "next/navigation";
import { ContactBanner } from "../../_components/ContactBanner";
import {
  portfolioProjects,
  type PortfolioImage,
  type PortfolioProject,
} from "../../_content/portfolioCatalog";
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

function projectImage(
  file: string,
  alt: string,
  width = 1600,
  height = 1000,
): PortfolioImage {
  return {
    file,
    src: `/images/portfolio/fixture/${file}`,
    alt,
    width,
    height,
    sizes: "100vw",
    position: "60% 40%",
    positionMobile: "right center",
  };
}

const heroMedia = projectImage("hero.jpg", "Piscina integrada ao jardim");
const gallerySecond = projectImage("estar.jpg", "Área de estar entre folhagens", 1200, 900);
const galleryThird = projectImage("detalhe.jpg", "Detalhe das espécies tropicais", 900, 1200);
const galleryFourth = projectImage("percurso.jpg", "Percurso de pedra pelo jardim", 1000, 1000);

const publishedProject: PortfolioProject = {
  ...portfolioProjects[0],
  id: "projeto-publicado",
  title: "Residência com jardim vivo",
  category: "Paisagismo residencial",
  summary: "Um jardim que integra piscina, arquitetura e áreas de convivência.",
  detailPublication: "published",
  cover: heroMedia,
  hero: heroMedia,
  media: heroMedia,
  images: [heroMedia, gallerySecond, galleryThird, galleryFourth],
  details: {
    titleAccent: "jardim vivo",
    introHeading: "A paisagem acompanha todos os ritmos da casa.",
    body: [
      "O percurso verde aproxima os espaços internos da área de lazer.",
      "Folhagens de diferentes alturas preservam vistas e criam intimidade.",
    ],
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

  it("compõe hero, superfície, retorno e contato em ordem com origem editorial única", () => {
    const { container } = render(<ProjectDetailPageView project={publishedProject} />);
    const main = screen.getByRole("main");
    expect(Array.from(main.children).map((child) => child.className)).toEqual([
      "projectDetailHero",
      "projectDetailSurface",
      "projectDetailReturn",
      "projectDetailContact",
    ]);

    const hero = container.querySelector(".projectDetailHero");
    const heading = screen.getByRole("heading", { level: 1, name: publishedProject.title });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(heading).toHaveTextContent(publishedProject.title);
    expect(heading.querySelector(".textAccent")).toHaveTextContent("jardim vivo");
    expect(screen.getByText(publishedProject.category)).toBeVisible();
    expect(screen.getAllByText(publishedProject.summary)).toHaveLength(1);
    expect(screen.getByText(publishedProject.summary).closest(".projectDetailHero")).toBe(hero);
    expect(container.querySelector(".projectDetailHero__divider")).not.toBeInTheDocument();
  });

  it("mantém título integral sem acento fabricado e aplica foco responsivo à única imagem prioritária", () => {
    const withoutAccent: PortfolioProject = {
      ...publishedProject,
      details: { ...publishedProject.details, titleAccent: undefined },
    };
    const { container } = render(<ProjectDetailPageView project={withoutAccent} />);
    const heading = screen.getByRole("heading", { level: 1, name: withoutAccent.title });
    const heroImages = container.querySelectorAll(".projectDetailHero__image");

    expect(heading.querySelector(".textAccent")).toBeNull();
    expect(heroImages).toHaveLength(1);
    expect(heroImages[0]).toHaveAttribute("sizes", "100vw");
    expect(heroImages[0]).not.toHaveAttribute("loading", "lazy");
    expect(heroImages[0].getAttribute("style")).toContain("--project-detail-image-position: 60% 40%");
    expect(heroImages[0].getAttribute("style")).toContain("--project-detail-image-position-mobile: right center");
  });

  it("oferece breadcrumb ancestral e mantém o item atual sem link", () => {
    render(<ProjectDetailPageView project={publishedProject} />);
    const breadcrumb = screen.getByRole("navigation", { name: "Navegação estrutural" });
    expect(within(breadcrumb).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(within(breadcrumb).getByText(publishedProject.title)).toHaveAttribute("aria-current", "page");
    expect(within(breadcrumb).getByText(publishedProject.title)).toHaveClass("projectDetailBreadcrumb__current");
    expect(within(breadcrumb).getAllByRole("link")).toHaveLength(2);
  });

  it("calcula a alternativa do hero conforme sua permanência informativa na galeria", () => {
    const { rerender, container } = render(<ProjectDetailPageView project={publishedProject} />);
    expect(container.querySelector(".projectDetailHero__image")).toHaveAttribute("alt", heroMedia.alt);

    const heroLater: PortfolioProject = {
      ...publishedProject,
      hero: gallerySecond,
      images: [heroMedia, gallerySecond, galleryThird],
    };
    rerender(<ProjectDetailPageView project={heroLater} />);
    expect(container.querySelector(".projectDetailHero__image")).toHaveAttribute("alt", "");
    const gallery = screen.getByRole("heading", { name: "Galeria do projeto" }).closest("section");
    if (!gallery) throw new Error("Galeria não renderizada");
    expect(within(gallery).getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual([
      heroMedia.alt,
      gallerySecond.alt,
      galleryThird.alt,
    ]);
  });

  it("renderiza narrativa real, preserva parágrafos e nunca repete o resumo", () => {
    const { rerender, container } = render(<ProjectDetailPageView project={publishedProject} />);
    const narrativeHeading = publishedProject.details?.introHeading ?? "";
    const narrative = screen.getByRole("heading", { name: narrativeHeading }).closest("section");
    if (!narrative) throw new Error("Narrativa não renderizada");

    expect(narrative).toHaveAttribute("aria-labelledby", "project-narrative-title");
    expect(within(narrative).getByText("Sobre o projeto")).toBeVisible();
    expect(Array.from(narrative.querySelectorAll(".projectDetailNarrative__body p")).map(
      (paragraph) => paragraph.textContent,
    )).toEqual(publishedProject.details?.body);
    expect(within(narrative).queryByText(publishedProject.summary)).not.toBeInTheDocument();

    const withStatement: PortfolioProject = {
      ...publishedProject,
      details: { statement: "Natureza que acompanha a vida da casa." },
    };
    rerender(<ProjectDetailPageView project={withStatement} />);
    expect(screen.getByRole("heading", { name: "Natureza que acompanha a vida da casa." })).toBeVisible();
    expect(container.querySelector("blockquote")).toBeNull();

    rerender(<ProjectDetailPageView project={{ ...publishedProject, details: undefined }} />);
    expect(screen.queryByText("Sobre o projeto")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /a paisagem acompanha/i })).not.toBeInTheDocument();
    expect(screen.getAllByText(publishedProject.summary)).toHaveLength(1);
  });

  it("renderiza galeria nomeada em lista, deduplicada e sem interação", () => {
    const { container } = render(<ProjectDetailPageView project={publishedProject} />);
    const gallery = screen.getByRole("heading", { name: "Galeria do projeto" }).closest("section");
    if (!gallery) throw new Error("Galeria não renderizada");
    const list = within(gallery).getByRole("list");
    const images = within(list).getAllByRole("img");
    const expectedImages = [gallerySecond, galleryThird, galleryFourth];

    expect(within(list).getAllByRole("listitem")).toHaveLength(expectedImages.length);
    expect(images.map((image) => image.getAttribute("alt"))).toEqual(expectedImages.map((image) => image.alt));
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("width", `${expectedImages[index].width}`);
      expect(image).toHaveAttribute("height", `${expectedImages[index].height}`);
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image.closest("li")).not.toHaveAttribute("tabindex");
    });
    expect(images[0].closest("li")).toHaveAttribute("data-gallery-role", "lead");
    expect(images[1].closest("li")).toHaveAttribute("data-gallery-role", "pair");
    expect(within(gallery).queryByRole("button")).not.toBeInTheDocument();
    expect(within(gallery).queryByRole("link")).not.toBeInTheDocument();
    expect(container.querySelector(".projectDetailGallery [tabindex]")).toBeNull();
  });

  it("omite galeria e superfície vazias quando o hero é a única mídia", () => {
    const singleMediaProject: PortfolioProject = {
      ...publishedProject,
      details: undefined,
      images: [heroMedia],
    };
    const { container } = render(<ProjectDetailPageView project={singleMediaProject} />);

    expect(screen.queryByRole("heading", { name: "Galeria do projeto" })).not.toBeInTheDocument();
    expect(container.querySelector(".projectDetailGallery")).toBeNull();
    expect(container.querySelector(".projectDetailSurface")).toBeNull();
    expect(container.querySelector(".projectDetailHero__image")).toHaveAttribute("alt", heroMedia.alt);
  });

  it("mostra soluções informativas e omite soluções opcionais", () => {
    const { rerender, container } = render(<ProjectDetailPageView project={publishedProject} />);
    expect(screen.getByRole("heading", { name: "Soluções aplicadas" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Integração com a arquitetura" })).toBeVisible();
    expect(container.querySelector(".projectDetailSolutions [tabindex]")).toBeNull();

    rerender(<ProjectDetailPageView project={{ ...publishedProject, details: undefined }} />);
    expect(screen.queryByRole("heading", { name: "Soluções aplicadas" })).not.toBeInTheDocument();
  });

  it("mantém retorno único, contato sem destino duplicado e Projetos atual no rodapé", () => {
    render(<ProjectDetailPageView project={publishedProject} />);
    expect(screen.getByRole("link", { name: "Ver outros projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getAllByRole("link", { name: "Ver outros projetos" })).toHaveLength(1);
    const contact = screen.getByRole("link", { name: siteContent.contact.label });
    expect(contact).toHaveAttribute(
      "href",
      siteContent.contact.href,
    );
    expect(contact).toHaveAttribute("target", "_blank");
    expect(contact.querySelector("path")).toHaveAttribute(
      "d",
      "M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4l-4.4 1.4 1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z",
    );
    expect(screen.getAllByRole("link", { name: siteContent.contact.label })).toHaveLength(1);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
  });

  it("mapeia WhatsApp preenchido e e-mail em contorno com ícone decorativo", () => {
    const actions = projectDetailContactActions(
      { status: "configured", href: "https://example.com/whatsapp" },
      siteContent.contact,
      siteContent.email,
    );
    const { container } = render(
      <ContactBanner id="detail-contact" {...projectDetailBanner} {...actions} />,
    );
    expect(screen.getByRole("link", { name: "Fale com a Sobreiro" })).toHaveAttribute(
      "href",
      "https://example.com/whatsapp",
    );
    expect(screen.getByRole("link", { name: "Fale com a Sobreiro" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Envie um e-mail" })).toHaveClass("buttonLink--outlineInverse");
    expect(screen.getByRole("link", { name: "Envie um e-mail" }).querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelectorAll("a")).toHaveLength(2);
  });

  it("apresenta 404 neutro com recuperação acessível", () => {
    render(<ProjectNotFound />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Este projeto não está disponível no portfólio.",
      }),
    ).toBeVisible();
    expect(screen.getByText(/não encontramos este endereço entre os projetos publicados/i)).toBeVisible();
    expect(screen.getByText("Erro 404")).toBeVisible();
    expect(screen.getByRole("link", { name: "Voltar para o início" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.queryByText(/rascunho|removido|ausente/i)).not.toBeInTheDocument();
  });
});
