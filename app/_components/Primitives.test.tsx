import { render, screen } from "@testing-library/react";
import { BrandEmblem, BrandLockup, BotanicalDecoration } from "./Brand";
import { ButtonLink, ContactButton } from "./ButtonLink";
import { LineIcon } from "./LineIcon";
import { PaginationDots } from "./PaginationDots";
import { SectionHeading } from "./Typography";

describe("primitivas do design system", () => {
  afterEach(() => jest.resetAllMocks());

  it("preserva semântica e destino nas ações compostas", () => {
    render(
      <>
        <ButtonLink href="#projetos" leadingIcon={<LineIcon name="leaf" />}>
          Ver projetos
        </ButtonLink>
        <ContactButton href="mailto:contato@sobreiro.com.br" label="Fale com a Sobreiro" />
        <ButtonLink href="#" disabled>Indisponível</ButtonLink>
      </>,
    );

    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute("href", "#projetos");
    expect(screen.getByRole("link", { name: "Fale com a Sobreiro" })).toHaveAttribute(
      "href",
      "mailto:contato@sobreiro.com.br",
    );
    expect(screen.getByText("Indisponível").closest("a")).toHaveAttribute("aria-disabled", "true");
  });

  it("mantém títulos estruturados em uma única ordem de leitura", () => {
    render(
      <SectionHeading
        id="titulo"
        eyebrow="Projetos"
        fragments={[{ text: "Ambientes que " }, { text: "inspiram", accent: true }]}
      />,
    );

    expect(screen.getByRole("heading", { level: 2, name: "Ambientes que inspiram" })).toBeVisible();
    expect(screen.getByText("Projetos")).toBeVisible();
  });

  it("oferece fallback informativo de marca e oculta decoração", () => {
    render(
      <>
        <BrandLockup />
        <BrandEmblem />
      </>,
    );

    expect(screen.getByRole("link", { name: /sobreiro paisagismo — página inicial/i })).toBeVisible();
    expect(screen.getByRole("img", { name: /emblema da sobreiro/i })).toBeVisible();
    const { container } = render(<BotanicalDecoration />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("informa a página ativa além da cor", () => {
    render(<PaginationDots count={3} activeIndex={1} label="Projetos" />);

    expect(screen.getByText("Projeto 2 de 3")).toBeInTheDocument();
  });

  it("mantém ícones decorativos inertes e oferece nome ao grid informativo", () => {
    const { container, rerender } = render(<LineIcon name="grid" />);
    const decorative = container.querySelector("svg");
    expect(decorative).toHaveAttribute("aria-hidden", "true");
    expect(decorative).toHaveAttribute("stroke", "currentColor");
    expect(decorative).toHaveAttribute("viewBox", "0 0 24 24");
    expect(decorative).toHaveAttribute("focusable", "false");

    rerender(<LineIcon name="grid" decorative={false} label="Grade de projetos" />);
    expect(screen.getByRole("img", { name: "Grade de projetos" })).toBeVisible();
  });
});
