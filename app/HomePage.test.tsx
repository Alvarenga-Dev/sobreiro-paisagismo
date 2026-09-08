import { render, screen, within } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  afterEach(() => jest.resetAllMocks());

  it("renderiza a narrativa principal na ordem semântica prevista", () => {
    render(<HomePage />);

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    const sectionNames = [
      /transformamos ambientes em experiências/i,
      /por que investir em um projeto de paisagismo/i,
      /ambientes que inspiram/i,
      /paixão por natureza, atenção a cada detalhe/i,
      /vamos transformar seu espaço juntos/i,
    ];

    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.children).toHaveLength(5);
    sectionNames.forEach((name, index) => {
      expect(within(main.children[index] as HTMLElement).getByRole("heading", { name })).toBeVisible();
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renderiza cinco benefícios, três projetos e mídias com alternativas", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("list", { name: "Benefícios do paisagismo" }).children).toHaveLength(5);
    expect(screen.getByAltText(/profissional de paisagismo cuidando/i)).toBeVisible();
    expect(screen.getByAltText(/casa contemporânea com piscina/i)).toBeVisible();
    const quote = screen.getByText(/cada jardim começa pela escuta/i).closest("blockquote");
    expect(quote).toBeInTheDocument();
    expect(screen.getByText("Sobreiro Paisagismo", { selector: "strong" })).toBeVisible();
  });

  it("mantém CTAs e conteúdo configurável em português do Brasil", () => {
    render(<HomePage />);

    const contactLinks = screen.getAllByRole("link", { name: "Fale com a Sobreiro" });
    expect(contactLinks.length).toBeGreaterThanOrEqual(2);
    contactLinks.forEach((link) => expect(link).toHaveAttribute("href", "mailto:contato@sobreiro.com.br"));
    expect(screen.getByText(/projetos de paisagismo que conectam natureza/i)).toBeVisible();
  });

  it("preserva cabeçalho, rodapé e destinos globais durante a extração de conteúdo", () => {
    render(<HomePage />);

    expect(screen.getByRole("main").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "fullBleed",
    );
    expect(screen.getByRole("banner")).toHaveAttribute("data-presentation", "floating");
    expect(screen.getByRole("button", { name: /menu — conteúdo em definição/i })).toBeDisabled();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2026 Sobreiro Paisagismo. Todos os direitos reservados.",
    );
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("href", "#inicio");
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "#sobre");
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "#projetos");
    expect(screen.getAllByRole("link", { name: "contato@sobreiro.com.br" })[0]).toHaveAttribute(
      "href",
      "mailto:contato@sobreiro.com.br",
    );
  });
});
