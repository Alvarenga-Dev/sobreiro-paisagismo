import { render, screen } from "@testing-library/react";
import { SiteFrame } from "./SiteFrame";
import { SiteHeader } from "./SiteHeader";

function renderFrame(variant?: "inset" | "fullBleed") {
  render(
    <SiteFrame
      variant={variant}
      header={<SiteHeader contactHref="mailto:contato@sobreiro.com.br" contactLabel="Contato" />}
      footer={<footer>Rodapé</footer>}
    >
      <h1>Conteúdo</h1>
    </SiteFrame>,
  );
}

describe("shell compartilhado", () => {
  it("mantém o frame insetado e o cabeçalho padrão como defaults", () => {
    renderFrame();

    expect(screen.getByText("Conteúdo").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "inset",
    );
    expect(screen.getByRole("banner")).toHaveAttribute("data-presentation", "standard");
    expect(screen.getByRole("link", { name: "Contato" })).toBeVisible();
  });

  it("oferece frame full-bleed sem alterar a estrutura semântica", () => {
    renderFrame("fullBleed");

    expect(screen.getByText("Conteúdo").closest("[data-region='frame']")).toHaveAttribute(
      "data-variant",
      "fullBleed",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo-principal");
  });

  it("renderiza o cabeçalho flutuante sem CTA e mantém o menu indisponível", () => {
    render(<SiteHeader presentation="floating" showContact={false} />);

    expect(screen.getByRole("banner")).toHaveAttribute("data-presentation", "floating");
    expect(screen.queryByRole("link", { name: "Contato" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menu — conteúdo em definição/i })).toBeDisabled();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
