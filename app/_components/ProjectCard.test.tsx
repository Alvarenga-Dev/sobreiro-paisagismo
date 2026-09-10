import { render, screen } from "@testing-library/react";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

const project: ProjectCardData = {
  id: "jardim-teste",
  href: "/projetos/jardim-teste",
  title: "Jardim teste",
  category: "Paisagismo residencial",
  summary: "Um jardim criado para validar o contrato do card.",
  media: {
    src: "/images/portfolio/teste.jpg",
    alt: "Jardim com vegetação",
    width: 1200,
    height: 800,
    sizes: "100vw",
  },
};

describe("ProjectCard", () => {
  afterEach(() => jest.resetAllMocks());

  it("preserva os defaults escuro, empilhado e com mídia primeiro", () => {
    render(<ProjectCard project={project} />);
    const article = screen.getByRole("article");

    expect(article).toHaveClass(
      "projectCard--stacked",
      "projectCard--mediaFirst",
      "projectCard--dark",
    );
    expect(article).toHaveAttribute("data-direction", "mediaFirst");
    expect(article).toHaveAttribute("data-surface", "dark");
    expect(article.querySelector(".projectCard__media")?.nextElementSibling).toHaveClass(
      "projectCard__content",
    );
  });

  it.each([
    ["mediaFirst", "dark"],
    ["mediaFirst", "light"],
    ["contentFirst", "dark"],
    ["contentFirst", "light"],
  ] as const)("expõe as variantes direction=%s e surface=%s sem mudar a ordem DOM", (direction, surface) => {
    render(<ProjectCard project={project} layout="split" direction={direction} surface={surface} />);
    const article = screen.getByRole("article");

    expect(article).toHaveClass(`projectCard--${direction}`, `projectCard--${surface}`);
    expect(article.querySelector(".projectCard__media")?.nextElementSibling).toHaveClass(
      "projectCard__content",
    );
  });

  it("oferece um único link para projeto publicado", () => {
    render(<ProjectCard project={project} layout="split" />);

    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: `Conhecer o projeto ${project.title}` })).toHaveAttribute(
      "href",
      project.href,
    );
    expect(screen.getByText(/Ver detalhes/)).toBeVisible();
    expect(screen.queryByText("Detalhes em breve")).not.toBeInTheDocument();
  });

  it("mantém projeto sem destino informativo e fora da ordem de foco", () => {
    const { container } = render(<ProjectCard project={{ ...project, href: undefined }} layout="split" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Detalhes em breve")).toBeVisible();
    expect(container.querySelector("[tabindex]")).toBeNull();
  });
});
