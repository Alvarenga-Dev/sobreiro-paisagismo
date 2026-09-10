import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { siteContent } from "../_content/siteContent";
import { SiteFrame } from "./SiteFrame";
import { SiteHeader } from "./SiteHeader";

jest.mock("next/navigation", () => ({ usePathname: jest.fn(() => "/") }));

function renderFrame(variant?: "inset" | "fullBleed") {
  render(
    <SiteFrame variant={variant} footer={<footer>Rodapé</footer>}>
      <h1>Conteúdo</h1>
    </SiteFrame>,
  );
}

describe("shell compartilhado", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    jest.mocked(usePathname).mockReturnValue("/");
  });

  afterEach(() => jest.resetAllMocks());

  it("mantém o frame insetado por padrão sem assumir header ou skip link", () => {
    renderFrame();

    expect(screen.getByText("Conteúdo").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "inset",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo-principal");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Ir para o conteúdo principal" })).not.toBeInTheDocument();
  });

  it("oferece frame full-bleed sem alterar a estrutura semântica", () => {
    renderFrame("fullBleed");

    expect(screen.getByText("Conteúdo").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "fullBleed",
    );
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("contentinfo")).toBeVisible();
  });

  it("compõe marca, destinos globais e uma única navegação desktop nomeada", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    const navigation = within(header).getByRole("navigation", { name: "Navegação principal" });
    expect(within(header).getByRole("link", { name: "Sobreiro Paisagismo — página inicial" })).toHaveAttribute("href", "/");
    expect(header.querySelector(".brandEmblem--flower img")).toHaveAttribute(
      "src",
      "/images/portfolio/logo/flor-sobreiro-verde-oliva.svg",
    );
    expect(within(navigation).getAllByRole("link").map((link) => link.textContent)).toEqual(
      siteContent.navigation.map((item) => item.label),
    );
    expect(within(navigation).getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "page");
    expect(within(navigation).getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeEnabled();
  });

  it("omite WhatsApp indisponível ou inválido e aceita somente configuração verdadeira", () => {
    const { rerender } = render(<SiteHeader />);
    expect(screen.queryByRole("link", { name: "Fale no WhatsApp" })).not.toBeInTheDocument();

    rerender(<SiteHeader whatsapp={{ status: "configured", href: "https://example.com/whatsapp" }} />);
    expect(screen.queryByRole("link", { name: "Fale no WhatsApp" })).not.toBeInTheDocument();

    rerender(<SiteHeader whatsapp={{ status: "configured", href: "https://wa.me/5521999999999" }} />);
    expect(screen.getByRole("link", { name: "Fale no WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/5521999999999",
    );
  });
});
