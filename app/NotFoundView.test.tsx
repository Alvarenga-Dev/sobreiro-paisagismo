import { render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./_components/SiteHeader";
import { globalNotFoundCopy } from "./_components/notFoundContent";
import GlobalNotFound from "./not-found";

describe("experiência 404 global", () => {
  afterEach(() => jest.resetAllMocks());

  it("apresenta mensagem, landmarks e uma única região nomeada pelo h1", () => {
    render(<GlobalNotFound />);

    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("contentinfo")).toBeVisible();
    expect(screen.getByText("Erro 404")).toBeVisible();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Ops! Essa página se perdeu no jardim.",
    });
    const region = screen.getByRole("region", { name: heading.textContent ?? "" });

    expect(region).toHaveAttribute("aria-labelledby", heading.id);
    expect(within(region).getByText(globalNotFoundCopy.supporting)).toBeVisible();
    expect(within(region).getByText(globalNotFoundCopy.epilogue)).toBeVisible();
  });

  it("expõe breadcrumb semântico e marca o item atual", () => {
    render(<GlobalNotFound />);

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByText("Página não encontrada")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("mantém recuperação e contato configurado na ordem prevista", () => {
    const { container } = render(<GlobalNotFound />);
    const actions = container.querySelector(".notFound__actions");

    expect(actions).not.toBeNull();
    const links = within(actions as HTMLElement).getAllByRole("link");
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      "Voltar para o início",
      "Ver projetos",
      "Fale com a Sobreiro",
    ]);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/projetos");
    expect(links[2]).toHaveAttribute("href", "mailto:contato@sobreiro.com.br");
    expect(screen.queryByRole("link", { name: /whatsapp/i })).not.toBeInTheDocument();
  });

  it("trata o artwork como decoração não interativa e mantém o conteúdo independente dele", () => {
    const { container } = render(<GlobalNotFound />);
    const artwork = container.querySelector(".notFound__artwork");

    expect(artwork).toHaveAttribute("alt", "");
    expect(artwork).toHaveAttribute("width", "1200");
    expect(artwork).toHaveAttribute("height", "900");
    expect(artwork).toHaveAttribute("sizes", "(min-width: 64rem) 55vw, 100vw");
    expect(artwork?.closest("a, button")).toBeNull();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    artwork?.remove();
    expect(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(screen.getByRole("link", { name: "Voltar para o início" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Ver projetos" })).toBeVisible();
  });

  it("herda exatamente um cabeçalho global sem duplicá-lo na rota", () => {
    const { rerender } = render(<GlobalNotFound />);

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();

    rerender(
      <>
        <SiteHeader />
        <GlobalNotFound />
      </>,
    );

    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  });
});
