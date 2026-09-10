import { act, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderWithUser } from "../test-utils";
import { usePathname } from "next/navigation";
import { MobileNavigation } from "./MobileNavigation";

jest.mock("next/navigation", () => ({ usePathname: jest.fn(() => "/") }));

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
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    jest.mocked(usePathname).mockReturnValue("/");
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("identifica Projetos na rota cujo pathname independe da query", async () => {
    jest.mocked(usePathname).mockReturnValue("/projetos");
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });
  it("abre o dialog nomeado com os cinco destinos e foco inicial", async () => {
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    const dialog = await screen.findByRole("dialog", { name: "Menu principal" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Fechar menu" })).toHaveFocus();
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
    expect(dialog.querySelector(".mobileMenu__brand .brandEmblem--flower img")).toHaveAttribute(
      "src",
      "/images/portfolio/logo/flor-sobreiro-verde-oliva.svg",
    );
    expect(screen.getAllByRole("link").filter((link) => ["Início", "Sobre", "Projetos", "Por que um projeto?", "Contato"].includes(link.textContent ?? ""))).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Fale no WhatsApp" })).not.toBeInTheDocument();
  });

  it("sincroniza o destino ativo quando o hash da Home muda", async () => {
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    window.history.replaceState({}, "", "/#contato");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("fecha por Escape e devolve o foco ao gatilho", async () => {
    const { user } = renderWithUser(<MobileNavigation />);
    const trigger = screen.getByRole("button", { name: "Abrir menu" });
    await user.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog", { name: "Menu principal" }), { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), { timeout: 1000 });
    expect(trigger).toHaveFocus();
  });

  it.each([
    ["Por que um projeto?", "/#beneficios"],
    ["Contato", "/#contato"],
  ])("fecha o menu ao navegar por %s", async (label, href) => {
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);
    await user.click(link);

    expect(screen.getByRole("dialog", { name: "Menu principal" })).toHaveClass("mobileMenu--closing");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Menu principal" })).not.toBeInTheDocument(), { timeout: 1000 });
    expect(screen.getByRole("button", { name: "Abrir menu" })).not.toHaveFocus();
  });

  it("fecha e limpa o scroll ao cruzar o breakpoint desktop de 64rem", async () => {
    const originalMatchMedia = window.matchMedia;
    const mediaTarget = new EventTarget();
    let desktopMatches = false;
    const desktopMedia: MediaQueryList = {
      get matches() { return desktopMatches; },
      media: "(min-width: 64rem)",
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: mediaTarget.addEventListener.bind(mediaTarget),
      removeEventListener: mediaTarget.removeEventListener.bind(mediaTarget),
      dispatchEvent: mediaTarget.dispatchEvent.bind(mediaTarget),
    };
    jest.spyOn(window, "matchMedia").mockImplementation((query) =>
      query === desktopMedia.media ? desktopMedia : originalMatchMedia(query)
    );
    const { user } = renderWithUser(<MobileNavigation />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(document.documentElement.style.overflow).toBe("hidden");

    desktopMatches = true;
    act(() => {
      desktopMedia.dispatchEvent(new Event("change"));
    });

    expect(screen.queryByRole("dialog", { name: "Menu principal" })).not.toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("");
  });
});
