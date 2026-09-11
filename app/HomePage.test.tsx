import { render, screen, within } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  afterEach(() => jest.resetAllMocks());

  it("renderiza a narrativa principal na ordem semântica prevista", () => {
    render(<HomePage />);

    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    const sectionNames = [
      /transformamos ambientes em experiências/i,
      /por que investir em um projeto de paisagismo/i,
      /ambientes que inspiram/i,
      /paixão por natureza, atenção a cada detalhe/i,
      /vamos transformar seu espaço juntos/i,
    ];

    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.children).toHaveLength(5);
    sectionNames.forEach((name, index) => {
      expect(within(main.children[index] as HTMLElement).getByRole("heading", { name })).toBeVisible();
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renderiza cinco benefícios, três projetos e mídias com alternativas", () => {
    render(<HomePage />);

    const projectCards = screen.getAllByRole("article");
    expect(projectCards).toHaveLength(3);
    expect(projectCards.map((card) => card.getAttribute("data-project-id"))).toEqual([
      "residencia-piscina-area-gourmet",
      "coffee-comfort",
      "jardim-vertical-residencial",
    ]);
    for (const card of projectCards) {
      expect(card.querySelector("img")).toHaveAttribute("src", expect.stringContaining("%2Fimages%2Fportfolio%2F"));
      expect(card.querySelector("img")).not.toHaveAttribute("src", expect.stringContaining("unsplash"));
    }
    expect(screen.getByRole("list", { name: "Benefícios do paisagismo" }).children).toHaveLength(5);
    expect(screen.getByAltText(/Jéssica Sobreiro, paisagista e fundadora/i)).toHaveAttribute(
      "src",
      expect.stringContaining("%2Fimages%2Fportfolio%2Fprofile-jess.webp"),
    );
    expect(screen.getByAltText(/piscina integrada à área gourmet/i)).toBeVisible();
    const quote = screen.getByText(/cada jardim começa pela escuta/i).closest("blockquote");
    expect(quote).toBeInTheDocument();
    expect(screen.getByText("Sobreiro Paisagismo", { selector: "strong" })).toBeVisible();
  });

  it("mantém CTAs e conteúdo configurável em português do Brasil", () => {
    render(<HomePage />);

    const main = screen.getByRole("main");
    const contactBanner = screen
      .getByRole("heading", { name: /vamos transformar seu espaço juntos/i })
      .closest("section");
    const footer = screen.getByRole("contentinfo");
    const heroContact = within(main.children[0] as HTMLElement).getByRole("link", { name: "Fale com a Sobreiro" });
    const bannerContact = within(contactBanner as HTMLElement).getByRole("link", { name: "Fale com a Sobreiro" });
    for (const contact of [heroContact, bannerContact]) {
      expect(contact).toHaveAttribute("href", "https://wa.me/message/CRFBFPI3Y5TJC1");
      expect(contact).toHaveAttribute("target", "_blank");
      expect(contact).toHaveAttribute("rel", "noreferrer");
      expect(contact.querySelector(".lineIcon")).toHaveClass("lineIcon--sm");
      expect(contact.querySelector("path")).toHaveAttribute(
        "d",
        "M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4l-4.4 1.4 1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z",
      );
    }
    expect(screen.getByText(/projetos de paisagismo que conectam natureza/i)).toBeVisible();
    expect(contactBanner?.querySelector(".contactBanner__decoration img")).toHaveAttribute(
      "src",
      "/images/portfolio/logo/flor-sobreiro-neutra-clara.svg",
    );
    expect(contactBanner?.querySelector(".botanicalDecoration")).toBeNull();
    expect(footer.querySelector(".footerBrand .brandEmblem--flower img")).toHaveAttribute(
      "src",
      "/images/portfolio/logo/flor-sobreiro-verde-oliva.svg",
    );
  });

  it("mantém o movimento ambiente do hero decorativo e fora da árvore acessível", () => {
    render(<HomePage />);

    const ambientMotion = screen.getByRole("heading", { level: 1 }).closest("section")
      ?.querySelector("[data-ambient-motion='nature']");
    expect(ambientMotion).toHaveClass("natureAmbient--home");
    expect(ambientMotion).toHaveAttribute("aria-hidden", "true");
    expect(ambientMotion?.querySelector("svg")).toHaveAttribute("focusable", "false");
    expect(ambientMotion?.querySelectorAll("[data-pollen-grain='true']")).toHaveLength(31);
    expect(ambientMotion?.querySelector(".natureAmbient__sprig")).not.toBeInTheDocument();
  });

  it("deixa o cabeçalho global fora da rota e preserva rodapé e destinos", () => {
    render(<HomePage />);

    expect(screen.getByRole("main").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "fullBleed",
    );
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Abrir menu" })).not.toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2026 Sobreiro Paisagismo. Todos os direitos reservados.",
    );
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("href", "#inicio");
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "/sobre");
    expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute("href", "#projetos");
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "WhatsApp da Sobreiro" })).toHaveAttribute(
      "href",
      "https://wa.me/message/CRFBFPI3Y5TJC1",
    );
    expect(screen.getAllByRole("link", { name: "contato@sobreiro.com.br" })[0]).toHaveAttribute(
      "href",
      "mailto:contato@sobreiro.com.br",
    );
  });
});
