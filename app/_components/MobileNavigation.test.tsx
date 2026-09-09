import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderWithUser } from "../test-utils";
import { MobileNavigation } from "./MobileNavigation";

beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
    };
  }
});

describe("MobileNavigation", () => {
  it("abre o dialog nomeado com os cinco destinos e foco inicial", async () => {
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    const dialog = await screen.findByRole("dialog", { name: "Menu principal" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Fechar menu" })).toHaveFocus();
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
    expect(screen.getAllByRole("link").filter((link) => ["Início", "Sobre", "Projetos", "Por que um projeto?", "Contato"].includes(link.textContent ?? ""))).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Fale no WhatsApp" })).not.toBeInTheDocument();
  });

  it("fecha por Escape e devolve o foco ao gatilho", async () => {
    const { user } = renderWithUser(<MobileNavigation />);
    const trigger = screen.getByRole("button", { name: "Abrir menu" });
    await user.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog", { name: "Menu principal" }), { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), { timeout: 1000 });
    expect(trigger).toHaveFocus();
  });
});
