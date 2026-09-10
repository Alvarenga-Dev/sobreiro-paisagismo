/* eslint-disable @next/next/no-html-link-for-pages -- this suite verifies delegated native-anchor behavior. */
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { RouteTransition } from "./RouteTransition";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({ push })),
}));

function renderTransition(content = <main id="conteudo-principal" tabIndex={-1}>Home</main>) {
  return render(
    <RouteTransition header={<header><a href="/sobre">Sobre no header</a></header>}>
      {content}
    </RouteTransition>,
  );
}

describe("RouteTransition", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.history.replaceState({}, "", "/");
    jest.mocked(usePathname).mockReturnValue("/");
    jest.mocked(useRouter).mockReturnValue({
      back: jest.fn(),
      bfcacheId: "route-transition-test",
      forward: jest.fn(),
      prefetch: jest.fn(),
      push,
      refresh: jest.fn(),
      replace: jest.fn(),
    });
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("mantém header e skip link fora da região que troca de pathname", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { container, rerender } = renderTransition();
    const header = screen.getByRole("banner");
    const viewport = container.querySelector("[data-region='route-viewport']");
    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Ir para o conteúdo principal" })).toHaveLength(1);

    await user.click(screen.getByRole("link", { name: "Sobre no header" }));
    expect(header).toBeInTheDocument();
    expect(header).not.toHaveClass("routeViewport--leaving");
    expect(viewport).toHaveClass("routeViewport--leaving");
    expect(viewport).toHaveAttribute("inert");
    expect(viewport).toHaveAttribute("aria-hidden", "true");
    expect(push).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(260));
    expect(push).toHaveBeenCalledWith("/sobre");

    jest.mocked(usePathname).mockReturnValue("/sobre");
    rerender(
      <RouteTransition header={<header><a href="/">Início no header</a></header>}>
        <main id="conteudo-principal" tabIndex={-1}>Sobre</main>
      </RouteTransition>,
    );
    expect(screen.getByRole("banner", { hidden: true })).toBe(header);
    expect(viewport).toHaveClass("routeViewport--entering");
    expect(screen.getAllByRole("main", { hidden: true })).toHaveLength(1);

    act(() => jest.advanceTimersByTime(260));
    act(() => jest.runOnlyPendingTimers());
    expect(viewport).toHaveClass("routeViewport--visible");
    expect(viewport).not.toHaveAttribute("inert");
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("não interfere em hash, query string ou destino atual", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const preventNavigation = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();
    const { container } = renderTransition(
      <main id="conteudo-principal" tabIndex={-1}>
        <a href="/#contato" onClick={preventNavigation}>Contato</a>
        <a href="/?categoria=residencial" onClick={preventNavigation}>Residenciais</a>
        <a href="/" onClick={preventNavigation}>Início</a>
      </main>,
    );

    await user.click(screen.getByRole("link", { name: "Contato" }));
    await user.click(screen.getByRole("link", { name: "Residenciais" }));
    await user.click(screen.getByRole("link", { name: "Início" }));

    expect(container.querySelector("[data-region='route-viewport']")).toHaveClass("routeViewport--visible");
    expect(push).not.toHaveBeenCalled();
  });

  it("preserva links externos, download, outro target e modificadores", () => {
    renderTransition(
      <main id="conteudo-principal" tabIndex={-1}>
        <a href="https://example.com" onClick={(event) => event.preventDefault()}>Externo</a>
        <a href="/arquivo.pdf" download>Download</a>
        <a href="/sobre" target="_blank">Nova aba</a>
        <a href="/projetos">Com modificador</a>
      </main>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Externo" }));
    fireEvent.click(screen.getByRole("link", { name: "Download" }));
    fireEvent.click(screen.getByRole("link", { name: "Nova aba" }));
    fireEvent.click(screen.getByRole("link", { name: "Com modificador" }), { metaKey: true });

    expect(push).not.toHaveBeenCalled();
  });

  it("faz a última navegação rápida válida prevalecer e substitui o timer", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <RouteTransition
        header={
          <header>
            <a href="/sobre">Sobre</a>
            <a href="/projetos">Projetos</a>
          </header>
        }
      >
        <main id="conteudo-principal" tabIndex={-1}>Home</main>
      </RouteTransition>,
    );

    await user.click(screen.getByRole("link", { name: "Sobre" }));
    await user.click(screen.getByRole("link", { name: "Projetos" }));
    expect(jest.getTimerCount()).toBe(1);
    act(() => jest.advanceTimersByTime(260));
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/projetos");
  });

  it("navega imediatamente com movimento reduzido e limpa timers no unmount", async () => {
    jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { container, unmount } = renderTransition();

    await user.click(screen.getByRole("link", { name: "Sobre no header" }));
    expect(push).toHaveBeenCalledWith("/sobre");
    expect(container.querySelector("[data-region='route-viewport']")).toHaveClass("routeViewport--visible");
    expect(jest.getTimerCount()).toBe(0);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it("restaura a rota quando o histórico volta antes de a entrada anterior terminar", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { container, rerender } = renderTransition();
    await user.click(screen.getByRole("link", { name: "Sobre no header" }));
    act(() => jest.advanceTimersByTime(260));

    jest.mocked(usePathname).mockReturnValue("/sobre");
    rerender(
      <RouteTransition header={<header><a href="/">Início no header</a></header>}>
        <main id="conteudo-principal" tabIndex={-1}>Sobre</main>
      </RouteTransition>,
    );
    expect(container.querySelector(".routeViewport")).toHaveClass("routeViewport--entering");

    jest.mocked(usePathname).mockReturnValue("/");
    rerender(
      <RouteTransition header={<header><a href="/sobre">Sobre no header</a></header>}>
        <main id="conteudo-principal" tabIndex={-1}>Home</main>
      </RouteTransition>,
    );
    expect(container.querySelector(".routeViewport")).toHaveClass("routeViewport--entering");

    act(() => jest.advanceTimersByTime(260));
    expect(container.querySelector(".routeViewport")).toHaveClass("routeViewport--visible");
    expect(container.querySelector(".routeViewport")).not.toHaveAttribute("inert");
  });
});
