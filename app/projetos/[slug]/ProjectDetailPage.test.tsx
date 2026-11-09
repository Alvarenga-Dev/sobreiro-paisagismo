import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(generateStaticParams()).toEqual([
      { slug: "residencia-jardim-e-piscina" },
      { slug: "coffee-comfort" },
      { slug: "residencia-contemporanea-fachada" },
      { slug: "rooftop-com-piscina" },
      { slug: "jardim-vertical-residencial" },
      { slug: "cozinha-contemporanea" },
      { slug: "hall-de-entrada" },
      { slug: "suite-com-painel-iluminado" },
      { slug: "casa-suspensa-na-mata" },
    ]);
    expect(await generateMetadata({ params: Promise.resolve({ slug: "jardim-vertical-residencial" }) }))
      .toMatchObject({ title: "Jardins verticais | Sobreiro Paisagismo" });
    expect(await generateMetadata({ params: Promise.resolve({ slug: portfolioProjects[0].id }) })).toEqual({
      title: `${portfolioProjects[0].title} | Sobreiro Paisagismo`,
      description: portfolioProjects[0].summary,
    });
    expect(projectDetailMetadata(publishedProject)).toEqual({
      title: `${publishedProject.title} | Sobreiro Paisagismo`,
      description: publishedProject.summary,
    });
  });

  it.each(["slug-inexistente", "residencia-piscina-area-gourmet"])("responde com notFound para %s", async (slug) => {
    await expect(ProjectDetailPage({ params: Promise.resolve({ slug }) })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["residencia-jardim-e-piscina", "Da área gourmet ao jardim", 6],
    ["suite-com-painel-iluminado", "Luz indireta e usos integrados", 5],
  ])("renderiza narrativa e sequência de imagens na ficha %s", async (slug, heading, imageCount) => {
    render(await ProjectDetailPage({ params: Promise.resolve({ slug }) }));

    expect(screen.getByRole("heading", { name: heading })).toBeVisible();
    const gallery = screen.getByRole("region", { name: "Galeria do projeto" });
    expect(within(gallery).getAllByRole("img")).toHaveLength(imageCount);
  });

  it("aplica a mesma fronteira de rota a um registro em draft", () => {
    const draftProject: PortfolioProject = { ...publishedProject, detailPublication: "draft" };
    expect(() => requirePublishedProject([draftProject], draftProject.id)).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("compõe abertura, galeria, narrativa, retorno e contato em ordem", () => {
    const { container } = render(<ProjectDetailPageView project={publishedProject} />);
    const main = screen.getByRole("main");
    expect(Array.from(main.children).map((child) => child.className)).toEqual([
      "projectDetailHero",
      "projectDetailGallery",
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
  });

  it("mantém título integral sem acento fabricado e prioriza a primeira imagem da galeria", () => {
    const withoutAccent: PortfolioProject = {
      ...publishedProject,
      details: { ...publishedProject.details, titleAccent: undefined },
    };
    render(<ProjectDetailPageView project={withoutAccent} />);
    const heading = screen.getByRole("heading", { level: 1, name: withoutAccent.title });
    const cover = screen.getByRole("img", { name: heroMedia.alt });

    expect(heading.querySelector(".textAccent")).toBeNull();
    expect(cover).toHaveAttribute("loading", "eager");
    expect(cover).toHaveAttribute("fetchpriority", "high");
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

  it("mostra a capa primeiro com uma única descrição acessível", () => {
    const heroLater: PortfolioProject = {
      ...publishedProject,
      hero: gallerySecond,
      images: [heroMedia, gallerySecond, galleryThird],
    };
    render(<ProjectDetailPageView project={heroLater} />);
    const gallery = screen.getByRole("region", { name: "Galeria do projeto" });
    expect(within(gallery).getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual([
      gallerySecond.alt,
      heroMedia.alt,
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

  it("renderiza imagens responsivas com dimensões e textos alternativos", () => {
    render(<ProjectDetailPageView project={publishedProject} />);
    const gallery = screen.getByRole("region", { name: "Galeria do projeto" });
    const list = within(gallery).getByRole("list");
    const images = within(list).getAllByRole("img");
    const expectedImages = [heroMedia, gallerySecond, galleryThird, galleryFourth];

    expect(within(list).getAllByRole("listitem")).toHaveLength(expectedImages.length);
    expect(images.map((image) => image.getAttribute("alt"))).toEqual(expectedImages.map((image) => image.alt));
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("width", `${expectedImages[index].width}`);
      expect(image).toHaveAttribute("height", `${expectedImages[index].height}`);
      expect(image).toHaveAttribute("loading", index === 0 ? "eager" : "lazy");
      expect(image).toHaveAttribute("sizes", expect.stringContaining("82vw"));
      expect(image).toHaveAttribute("srcset", expect.stringContaining("&q=90"));
      expect(image.closest("li")).not.toHaveAttribute("tabindex");
    });
    expect(within(gallery).queryByRole("link")).not.toBeInTheDocument();
  });

  it("avança da primeira imagem parcial e aceita navegação rápida e por teclado", async () => {
    const user = userEvent.setup();
    render(<ProjectDetailPageView project={publishedProject} />);
    const track = screen.getByRole("list", { name: "Galeria do projeto" });
    const scrollTo = jest.fn();
    Object.defineProperties(track, {
      scrollTo: { value: scrollTo },
      clientWidth: { value: 400 },
      scrollWidth: { value: 880 },
    });
    within(track).getAllByRole("listitem").forEach((slide, index) => {
      Object.defineProperties(slide, {
        offsetLeft: { value: index * 220 },
        offsetWidth: { value: 220 },
      });
    });
    act(() => window.dispatchEvent(new Event("resize")));
    const next = screen.getByRole("button", { name: "Próximas imagens" });

    await user.click(next);
    await user.click(next);
    expect(scrollTo).toHaveBeenNthCalledWith(1, { left: 220, behavior: "auto" });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { left: 440, behavior: "auto" });
    expect(next).toHaveFocus();

    track.focus();
    await user.keyboard("{End}{ArrowRight}");
    expect(scrollTo).toHaveBeenNthCalledWith(3, { left: 480, behavior: "auto" });
    expect(scrollTo).toHaveBeenNthCalledWith(4, { left: 0, behavior: "instant" });
  });

  it("mantém a imagem única sem controles ou superfície vazia", () => {
    const singleMediaProject: PortfolioProject = {
      ...publishedProject,
      details: undefined,
      images: [heroMedia],
    };
    const { container } = render(<ProjectDetailPageView project={singleMediaProject} />);

    const gallery = screen.getByRole("region", { name: "Galeria do projeto" });
    expect(within(gallery).getByRole("img", { name: heroMedia.alt })).toBeVisible();
    expect(within(gallery).queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector(".projectDetailSurface")).toBeNull();
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
