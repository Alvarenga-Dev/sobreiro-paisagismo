import { fireEvent, screen } from "@testing-library/react";
import { renderWithUser } from "../test-utils";
import { homeContent } from "./homeContent";
import { ProjectCarousel } from "./ProjectCarousel";

describe("ProjectCarousel", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => jest.resetAllMocks());

  it("mantém todos os projetos e um único destino por card no HTML", () => {
    renderWithUser(<ProjectCarousel projects={homeContent.projects} />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getAllByRole("link")).toHaveLength(3);
    for (const article of screen.getAllByRole("article")) {
      expect(article.querySelectorAll("a")).toHaveLength(1);
      expect(article.querySelector("button")).not.toBeInTheDocument();
    }
  });

  it("sincroniza controles, paginação, teclado e anúncio acessível", async () => {
    const { user, getByRole } = renderWithUser(<ProjectCarousel projects={homeContent.projects} />);
    const carousel = getByRole("region", { name: "Projetos em destaque" });
    const previous = getByRole("button", { name: "Projeto anterior" });
    const next = getByRole("button", { name: "Próximo projeto" });

    expect(previous).toHaveAttribute("aria-disabled", "true");
    await user.click(next);

    expect(previous).toHaveAttribute("aria-disabled", "false");
    expect(getByRole("button", { name: "Ir para o projeto 2 de 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText(/projeto 2 de 3: coffee comfort/i)).toBeInTheDocument();

    carousel.focus();
    await user.keyboard("{ArrowRight}");
    expect(next).toHaveAttribute("aria-disabled", "true");
    expect(getByRole("button", { name: "Ir para o projeto 3 de 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("mantém o foco no controle ao chegar ao último destaque", async () => {
    const { user, getByRole } = renderWithUser(<ProjectCarousel projects={homeContent.projects} />);
    const next = getByRole("button", { name: "Próximo projeto" });
    next.focus();
    await user.keyboard("{Enter}{Enter}");

    expect(next).toHaveFocus();
    expect(next).toHaveAttribute("aria-disabled", "true");
  });

  it("sincroniza a paginação quando a pessoa desliza a galeria", () => {
    renderWithUser(<ProjectCarousel projects={homeContent.projects} />);
    const track = screen.getByRole("list");
    const slides = Array.from(track.children) as HTMLElement[];

    Object.defineProperties(track, {
      scrollLeft: { configurable: true, writable: true, value: 304 },
      scrollWidth: { configurable: true, value: 870 },
      clientWidth: { configurable: true, value: 370 },
    });
    slides.forEach((slide, index) => {
      Object.defineProperty(slide, "offsetLeft", {
        configurable: true,
        value: index * 304,
      });
    });

    fireEvent.scroll(track);

    expect(screen.getByRole("button", { name: "Ir para o projeto 2 de 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText(/projeto 2 de 3: coffee comfort/i)).toBeInTheDocument();

    track.scrollLeft = 500;
    fireEvent.scroll(track);
    expect(screen.getByRole("button", { name: "Ir para o projeto 3 de 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
