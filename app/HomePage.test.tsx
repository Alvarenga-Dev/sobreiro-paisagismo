import { render, screen, within } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  afterEach(() => jest.resetAllMocks());

  it("renderiza a narrativa principal na ordem semântica prevista", () => {
    render(<HomePage />);

    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    const sectionNames = [
      "Projetos de paisagismo e design de interiores",
      /prazer, sou jéssica sobreiro/i,
      "Como posso ajudar no seu espaço?",
      "Do jardim ao interior",
      "O que um projeto ajuda a resolver?",
      "O que você quer mudar no seu espaço?",
    ];

    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.children).toHaveLength(6);
    sectionNames.forEach((name, index) => {
      expect(within(main.children[index] as HTMLElement).getByRole("heading", { name })).toBeVisible();
    });
    const h1 = screen.getByRole("heading", { level: 1 });
    const hero = screen.getByRole("region", { name: "Projetos de paisagismo e design de interiores" });
    const signature = within(hero).getByText("Um espaço que respira");
    expect(h1).not.toContainElement(signature);
    expect(h1.compareDocumentPosition(signature) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(hero).getByText("Com Jéssica Sobreiro")).toBeVisible();
    expect(within(hero).getByText(/para casas e negócios/i)).toBeVisible();
    expect(Array.from(main.children).slice(0, 5).map((section) => section.id)).toEqual([
      "inicio", "sobre", "servicos", "projetos", "beneficios",
    ]);
    expect(within(main).getByRole("heading", { name: "O que você quer mudar no seu espaço?" }))
      .toHaveAttribute("id", "contato");
  });

  it("mostra as três opções de serviço e apresenta a indicação na voz de Jéssica", () => {
    render(<HomePage />);

    const services = screen.getByRole("region", { name: "Como posso ajudar no seu espaço?" });
    expect(services).toHaveAttribute("id", "servicos");
    expect(within(services).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent))
      .toEqual([
        "Consultoria em paisagismo",
        "Projeto de áreas externas e interiores",
        "Indicação de fornecedores e profissionais",
      ]);
    expect(within(services).getByText("Precisa tirar o projeto do papel?")).toBeVisible();
    expect(within(services).getByText(/^Tenho parceiros especializados e posso indicar fornecedores e profissionais/))
      .toBeVisible();
  });

  it("renderiza três benefícios, três projetos e mídias com alternativas", () => {
    render(<HomePage />);

    const projectCards = screen.getAllByRole("article");
    expect(projectCards).toHaveLength(3);
    expect(projectCards.map((card) => card.getAttribute("data-project-id"))).toEqual([
      "residencia-jardim-e-piscina",
      "coffee-comfort",
      "suite-com-painel-iluminado",
    ]);
    const highlights = [
      ["Paisagismo residencial", "vista-aerea.jpg", "/projetos/residencia-jardim-e-piscina", "Conhecer o projeto Paisagismo residencial"],
      ["Coffee Comfort", "capa-fachada-frontal.jpg", "/projetos/coffee-comfort", "Conhecer o projeto Coffee Comfort"],
      ["Projetos de interiores", "vista-ampla-da-suite.jpg", "/projetos/suite-com-painel-iluminado", "Conhecer o projeto Projetos de interiores"],
    ];
    highlights.forEach(([title, cover, href, label], index) => {
      const card = within(projectCards[index]);
      expect(card.getByRole("heading", { level: 3 })).toHaveTextContent(title);
      expect(card.getByRole("img")).toHaveAttribute("src", expect.stringContaining(cover));
      expect(card.getByRole("link", { name: label })).toHaveAttribute("href", href);
      expect(projectCards[index].querySelector("p")).toBeNull();
    });
    const benefits = screen.getByRole("list", { name: "Benefícios do planejamento" });
    expect(within(benefits).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent))
      .toEqual(["Espaços mais fáceis de usar", "Plantas adequadas ao lugar", "Escolhas que funcionam juntas"]);
    expect(screen.getByRole("img", { name: /Jéssica Sobreiro sentada/i })).toHaveAttribute(
      "src",
      expect.stringContaining("jessica-sobreiro-retrato.webp"),
    );
    expect(screen.getByText(/Meu ponto de partida é ouvir como você quer usar o espaço/i)).toBeVisible();
    expect(screen.getByRole("link", { name: "Conheça minha abordagem" })).toHaveAttribute("href", "/sobre");
  });

  it("mantém CTAs e conteúdo configurável em português do Brasil", () => {
    render(<HomePage />);

    const hero = screen.getByRole("region", { name: "Projetos de paisagismo e design de interiores" });
    const contactBanner = screen.getByRole("region", { name: "O que você quer mudar no seu espaço?" });
    const footer = screen.getByRole("contentinfo");
    const heroContact = within(hero).getByRole("link", { name: "Conversar com Jéssica" });
    const bannerContact = within(contactBanner).getByRole("link", { name: "Conversar com Jéssica" });
    expect(within(contactBanner).getByText(/^Conte onde fica o imóvel e o que você quer criar ou renovar/))
      .toBeVisible();
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
    expect(screen.getByRole("link", { name: "Ver todos os projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "Ver serviços" })).toHaveAttribute("href", "#servicos");
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
