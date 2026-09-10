import { act, fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { siteContent } from "../_content/siteContent";
import { DesktopNavigation } from "./DesktopNavigation";

jest.mock("next/navigation", () => ({ usePathname: jest.fn(() => "/") }));

describe("DesktopNavigation", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    jest.mocked(usePathname).mockReturnValue("/");
    jest.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(function offsetLeft(this: HTMLElement) {
      return (this.textContent?.length ?? 0) * 3;
    });
    jest.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function offsetWidth(this: HTMLElement) {
      return (this.textContent?.length ?? 0) * 8;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("renderiza os cinco links na ordem e mede o indicador sem animar a primeira posição", () => {
    const { container } = render(<DesktopNavigation navigation={siteContent.navigation} />);
    const navigation = screen.getByRole("navigation", { name: "Navegação principal" });
    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual(
      siteContent.navigation.map((item) => item.label),
    );
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "page");

    const indicator = container.querySelector(".desktopNavigation__indicator");
    expect(indicator).toHaveAttribute("data-positioned", "true");
    expect(indicator).toHaveAttribute("data-animated", "false");
    expect(navigation.querySelector("ul")).toHaveStyle("--navigation-indicator-width: 48px");
  });

  it("reconhece descendentes de Projetos e atualiza a semântica imediatamente", () => {
    jest.mocked(usePathname).mockReturnValue("/projetos/jardim-sereno");
    render(<DesktopNavigation navigation={siteContent.navigation} />);
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("acompanha hashes reconhecidos da Home", () => {
    const { rerender } = render(<DesktopNavigation navigation={siteContent.navigation} />);
    act(() => {
      window.history.replaceState({}, "", "/#beneficios");
      fireEvent(window, new HashChangeEvent("hashchange"));
    });
    rerender(<DesktopNavigation navigation={siteContent.navigation} />);
    expect(screen.getByRole("link", { name: "Por que um projeto?" })).toHaveAttribute("aria-current", "page");

    act(() => {
      window.history.replaceState({}, "", "/#contato");
      fireEvent(window, new HashChangeEvent("hashchange"));
    });
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toHaveLength(1);
  });

  it("recalcula o indicador quando o viewport muda", () => {
    const { container } = render(<DesktopNavigation navigation={siteContent.navigation} />);
    fireEvent.resize(window);
    expect(container.querySelector(".desktopNavigation__indicator")).toHaveAttribute("data-positioned", "true");
  });
});
