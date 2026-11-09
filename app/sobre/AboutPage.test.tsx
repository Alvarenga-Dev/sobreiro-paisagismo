import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "../_components/SiteHeader";
import AboutPage, { metadata } from "./page";
import { ContactMethodCard } from "./_components/ContactMethodsSection";
import { aboutContent } from "./aboutContent";
import type { ContactMethod } from "./aboutContent";

describe("AboutPage", () => {
  afterEach(() => jest.resetAllMocks());

  it("expõe metadados próprios em português do Brasil", () => {
    expect(metadata.title).toBe("Sobre | Sobreiro Paisagismo");
    expect(metadata.description).toMatch(/Jéssica Sobreiro e sua abordagem/i);
  });

  it("compõe a narrativa na ordem prevista e preserva um único h1", () => {
    render(<AboutPage />);

    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(main.children).toHaveLength(5);
    expect(Array.from(main.children).map((region) => region.getAttribute("data-region"))).toEqual([
      "about-hero",
      "team-profile",
      "essence",
      "about-video",
      "contact-methods",
    ]);
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /sobre a sobreiro paisagismo/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "Prazer, sou Jéssica Sobreiro." })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "Cada projeto começa pela escuta." })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "Sobreiro em vídeo" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /vamos transformar seu espaço/i })).toBeVisible();
  });

  it("identifica a página sem breadcrumb e oferece uma âncora nativa para a história", () => {
    render(<AboutPage />);

    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).not.toBeInTheDocument();
    expect(screen.getByText("Sobre", { selector: ".aboutHero__eyebrow" })).toBeVisible();
    expect(screen.getByText(aboutContent.hero.introduction)).toBeVisible();
    expect(screen.getByRole("link", { name: "Conheça a Jéssica" })).toHaveAttribute("href", "#perfil");
    expect(screen.getByRole("region", { name: "Prazer, sou Jéssica Sobreiro." })).toHaveAttribute("id", "perfil");
    expect(screen.getByRole("region", { name: "Cada projeto começa pela escuta." })).toHaveAttribute("id", "essencia");
    within(screen.getByRole("main")).getAllByRole("heading", { level: 2 }).forEach((heading) => {
      expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
    });
  });

  it("mantém todo o significado do hero no texto quando a mídia é atmosférica", () => {
    render(<AboutPage />);

    const hero = screen.getByRole("heading", { level: 1 }).closest("section");
    expect(hero?.querySelector("img")).toHaveAttribute("alt", "");
    expect(within(hero as HTMLElement).getByText(aboutContent.hero.introduction)).toBeVisible();
  });

  it("usa a variação botânica ambiente como decoração não anunciada", () => {
    render(<AboutPage />);

    const hero = screen.getByRole("heading", { level: 1 }).closest("section");
    const ambientMotion = hero?.querySelector("[data-ambient-motion='nature']");
    expect(ambientMotion).toHaveClass("natureAmbient--about");
    expect(ambientMotion).toHaveAttribute("aria-hidden", "true");
    expect(hero?.querySelector(".botanicalDecoration")).not.toBeInTheDocument();
  });

  it("apresenta o perfil e a abordagem com a narrativa em primeira pessoa e as imagens editoriais", () => {
    render(<AboutPage />);

    const profile = screen.getByRole("region", { name: "Prazer, sou Jéssica Sobreiro." });
    expect(within(profile).getByText(/Atuo no desenvolvimento de projetos de paisagismo/i)).toBeVisible();
    expect(within(profile).getByRole("img", { name: /Jéssica Sobreiro sentada/i }))
      .toHaveAttribute("src", expect.stringContaining("jessica-sobreiro-retrato.webp"));

    const essence = screen.getByRole("region", { name: "Cada projeto começa pela escuta." });
    expect(within(essence).getByText("Como eu projeto")).toBeVisible();
    expect(within(essence).getByText(/Escuto as necessidades.*conforto ao dia a dia/i)).toBeVisible();
    expect(within(essence).getByText(/dou atenção às espécies nativas do Brasil/i)).toBeVisible();
    expect(within(essence).getByText("Qualquer espaço pode se tornar “um espaço que respira”.")).toBeVisible();
    expect(within(essence).getByRole("img", { name: "Mão tocando a folha de uma palmeira" })).toBeVisible();
  });

  it("carrega o player por teclado e mantém o link externo disponível", async () => {
    const user = userEvent.setup();
    render(<AboutPage />);

    const section = screen.getByRole("region", { name: "Sobreiro em vídeo" });
    const video = within(section);
    const fallback = video.getByRole("link", { name: "Assistir no YouTube" });
    const loadButton = video.getByRole("button", { name: "Carregar vídeo" });
    expect(video.getByText("Conheça um pouco mais da Sobreiro. Assista aqui mesmo ou abra o vídeo no YouTube.")).toBeVisible();
    expect(section.querySelector("img")).toHaveAttribute("src", expect.stringContaining("sobreiro-em-video-poster.webp"));
    expect(section.querySelector("iframe")).toBeNull();
    expect(fallback).toHaveAttribute("href", "https://www.youtube.com/watch?v=Rvv5bZX8TZs");
    expect(fallback).toBeVisible();

    loadButton.focus();
    await user.keyboard("{Enter}");

    const frame = video.getByTitle("Vídeo da Sobreiro Paisagismo no YouTube");
    expect(frame).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/Rvv5bZX8TZs?playsinline=1&hl=pt-BR");
    expect(frame).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    expect(frame).toHaveAttribute("allowfullscreen");
    expect(frame).toHaveFocus();
    expect(loadButton).not.toBeInTheDocument();
    expect(fallback).toBeVisible();
  });

  it("oferece WhatsApp e e-mail como os dois métodos reais de contato", () => {
    render(<AboutPage />);

    const methods = screen.getByRole("list", { name: "Métodos de contato" });
    expect(methods.children).toHaveLength(2);
    expect(Array.from(methods.children).map((method) => method.querySelector("strong")?.textContent)).toEqual([
      "Fale no WhatsApp",
      "Envie um e-mail",
    ]);
    expect(within(methods).getAllByRole("link")).toHaveLength(2);
    expect(within(methods).getByRole("link", { name: /falar com a sobreiro pelo whatsapp/i })).toHaveAttribute(
      "href",
      "https://wa.me/message/CRFBFPI3Y5TJC1",
    );
    expect(within(methods).getByRole("link", { name: /enviar e-mail/i })).toHaveAttribute(
      "href",
      "mailto:contato@sobreiro.com.br",
    );
    expect(within(methods).queryByText(/agend/i)).not.toBeInTheDocument();
  });

  it("usa a flor oficial da marca como decoração do contato", () => {
    render(<AboutPage />);

    const section = screen.getByRole("heading", { name: /vamos transformar seu espaço/i }).closest("section");
    const decoration = section?.querySelector(".contactMethodsSection__decoration");
    expect(decoration).toHaveClass("brandEmblem--flower");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration?.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("flor-sobreiro-verde-oliva.svg"),
    );
  });

  it("não duplica o cabeçalho global dentro da rota", () => {
    render(<AboutPage />);

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Abrir menu" })).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: /menu principal/i })).not.toBeInTheDocument();
  });

  it("forma um único shell com banner, main e rodapé quando recebe a Navbar global", () => {
    render(
      <>
        <SiteHeader />
        <AboutPage />
      </>,
    );

    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  });

  it("usa destinos globais válidos no rodapé da rota interna", () => {
    render(<AboutPage />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "/sobre");
    expect(within(footer).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(within(footer).getByRole("link", { name: "Contato" })).toHaveAttribute("href", "/#contato");
  });

});

describe("ContactMethodCard", () => {
  const configured = {
    id: "email",
    icon: "mail",
    title: "Envie um e-mail",
    detail: "contato@sobreiro.com.br",
    href: "mailto:contato@sobreiro.com.br",
    accessibleLabel: "Enviar e-mail para contato@sobreiro.com.br",
  } satisfies ContactMethod;

  it("renderiza um único link nativo quando o destino está configurado", () => {
    render(<ContactMethodCard method={configured} />);

    const link = screen.getByRole("link", { name: configured.accessibleLabel });
    expect(link).toHaveAttribute("href", configured.href);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

});
