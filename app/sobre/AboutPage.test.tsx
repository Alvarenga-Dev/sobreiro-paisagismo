import { render, screen, within } from "@testing-library/react";
import AboutPage, { metadata } from "./page";
import { ContactMethodCard } from "./_components/ContactMethodsSection";
import type { ConfiguredContactMethod, UnavailableContactMethod } from "./aboutContent";

describe("AboutPage", () => {
  afterEach(() => jest.resetAllMocks());

  it("expõe metadados próprios em português do Brasil", () => {
    expect(metadata.title).toMatch(/sobre a sobreiro paisagismo/i);
    expect(metadata.description).toMatch(/essência, os valores e a abordagem/i);
  });

  it("compõe a narrativa na ordem prevista e preserva um único h1", () => {
    render(<AboutPage />);

    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(main.children).toHaveLength(4);
    expect(Array.from(main.children).map((region) => region.getAttribute("data-region"))).toEqual([
      "about-hero",
      "essence",
      "founder",
      "contact-methods",
    ]);
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /sobre a sobreiro paisagismo/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /design com propósito/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /paixão que floresce/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /vamos transformar seu espaço/i })).toBeVisible();
  });

  it("oferece breadcrumb semântico e nomeia todas as regiões principais", () => {
    render(<AboutPage />);

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByText("Sobre")).toHaveAttribute("aria-current", "page");
    within(screen.getByRole("main")).getAllByRole("heading", { level: 2 }).forEach((heading) => {
      expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
    });
  });

  it("apresenta quatro valores e quatro credenciais como conteúdo textual", () => {
    render(<AboutPage />);

    const values = screen.getByRole("list", { name: "Valores da Sobreiro Paisagismo" });
    expect(values.children).toHaveLength(4);
    ["Personalização", "Sustentabilidade", "Bem-estar", "Qualidade"].forEach((title) => {
      expect(within(values).getByRole("heading", { level: 3, name: title })).toBeVisible();
    });

    const credentials = screen.getByRole("list", { name: "Credenciais profissionais" });
    expect(credentials.children).toHaveLength(4);
    ["Formação", "Especialização", "Experiência", "Atendimento"].forEach((label) => {
      expect(within(credentials).getByText(label)).toBeVisible();
    });
  });

  it("mantém o cabeçalho flutuante fechado, indisponível e sem painel de menu", () => {
    render(<AboutPage />);

    expect(screen.getByRole("banner")).toHaveAttribute("data-presentation", "floating");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeEnabled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: /menu principal/i })).not.toBeInTheDocument();
  });

  it("usa destinos globais válidos no rodapé da rota interna", () => {
    render(<AboutPage />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "/sobre");
    expect(within(footer).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/#projetos");
  });
});

describe("ContactMethodCard", () => {
  const configured = {
    id: "email",
    icon: "mail",
    title: "Envie um e-mail",
    detail: "contato@sobreiro.com.br",
    status: "configured",
    href: "mailto:contato@sobreiro.com.br",
    accessibleLabel: "Enviar e-mail para contato@sobreiro.com.br",
  } satisfies ConfiguredContactMethod;

  const unavailable = {
    id: "agenda",
    icon: "calendar",
    title: "Agende uma conversa",
    detail: "Atendimento personalizado",
    status: "unavailable",
    unavailableMessage: "Agenda ainda não disponível",
  } satisfies UnavailableContactMethod;

  it("renderiza um único link nativo quando o destino está configurado", () => {
    render(<ContactMethodCard method={configured} />);

    const link = screen.getByRole("link", { name: configured.accessibleLabel });
    expect(link).toHaveAttribute("href", configured.href);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("renderiza superfície informativa não focável sem fabricar URL", () => {
    const { container } = render(<ContactMethodCard method={unavailable} />);

    expect(screen.getByText(unavailable.title)).toBeVisible();
    expect(screen.getByText(unavailable.unavailableMessage)).toBeVisible();
    expect(container.querySelector("a")).not.toBeInTheDocument();
    expect(container.querySelector("[tabindex]")).not.toBeInTheDocument();
  });
});
