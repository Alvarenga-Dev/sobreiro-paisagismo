import rawHomeCatalog from "../../images/portfolio/home-catalog.json";
import rawPortfolioCatalog from "../../images/portfolio/catalog.json";
import {
  buildPortfolioCatalog,
  findPublishedProjectBySlug,
  getPublishedProjectParams,
  getPublishedProjects,
  homeFeaturedProjects,
  portfolioCatalog,
  portfolioProjects,
  toProjectCardData,
} from "./portfolioCatalog";

function copyHomeCatalog(): typeof rawHomeCatalog {
  return {
    ...rawHomeCatalog,
    highlights: rawHomeCatalog.highlights.map((highlight) => ({ ...highlight })),
  };
}

function copyPortfolioCatalog(): typeof rawPortfolioCatalog {
  return {
    ...rawPortfolioCatalog,
    categories: rawPortfolioCatalog.categories.map((category) => ({
      ...category,
      projects: category.projects.map((project) => ({
        ...project,
        images: project.images.map((image) => ({ ...image })),
      })),
    })),
  };
}

function replaceFirstProject(project: unknown): unknown {
  const catalog = copyPortfolioCatalog();
  const firstCategory = catalog.categories[0];
  return {
    ...catalog,
    categories: [
      { ...firstCategory, projects: [project, ...firstCategory.projects.slice(1)] },
      ...catalog.categories.slice(1),
    ],
  };
}

describe("adaptador do catálogo de portfólio", () => {
  afterEach(() => jest.resetAllMocks());

  it("transforma o catálogo válido em projetos com galeria e mídia local", () => {
    expect(portfolioCatalog.projects).toHaveLength(8);
    expect(portfolioCatalog.highlights.map((highlight) => highlight.projectId)).toEqual([
      "residencia-piscina-area-gourmet",
      "coffee-comfort",
      "jardim-vertical-residencial",
    ]);
    expect(portfolioProjects[0].images.length).toBeGreaterThan(1);
    expect(portfolioProjects[0].detailPublication).toBe("published");
    expect(portfolioProjects[0].hero).toBe(portfolioProjects[0].cover);
    expect(portfolioProjects[0].media.src).toMatch(/^\/images\/portfolio\//);
    expect(portfolioProjects[0].media.width).toBeGreaterThan(0);
    expect(portfolioProjects[0].media.height).toBeGreaterThan(0);
    expect(portfolioProjects[0].media.sizes).toContain("min-width");
    expect(homeFeaturedProjects.map((project) => project.id)).toEqual([
      "residencia-piscina-area-gourmet",
      "coffee-comfort",
      "jardim-vertical-residencial",
    ]);
    expect(homeFeaturedProjects.map((project) => project.href)).toEqual([
      "/projetos/residencia-piscina-area-gourmet",
      "/projetos/coffee-comfort",
      "/projetos/jardim-vertical-residencial",
    ]);
  });

  it("rejeita referência duplicada na seleção da Home", () => {
    const homeCatalog = copyHomeCatalog();
    homeCatalog.highlights[1].projectId = homeCatalog.highlights[0].projectId;

    expect(() => buildPortfolioCatalog(rawPortfolioCatalog, homeCatalog)).toThrow(
      "home-catalog.highlights[1].projectId: referência duplicada",
    );
  });

  it("rejeita referência de projeto inexistente", () => {
    const homeCatalog = copyHomeCatalog();
    homeCatalog.highlights[1].projectId = "projeto-inexistente";

    expect(() => buildPortfolioCatalog(rawPortfolioCatalog, homeCatalog)).toThrow(
      "home-catalog.highlights[1].projectId: projeto inexistente",
    );
  });

  it("rejeita projeto sem capa", () => {
    const portfolioCatalogInput = copyPortfolioCatalog();
    portfolioCatalogInput.categories[0].projects[0].cover = "";

    expect(() => buildPortfolioCatalog(portfolioCatalogInput, rawHomeCatalog)).toThrow(
      "catalog.categories[0].projects[0].cover: esperado um texto não vazio",
    );
  });

  it("rejeita alternativa textual vazia", () => {
    const portfolioCatalogInput = copyPortfolioCatalog();
    portfolioCatalogInput.categories[0].projects[0].images[0].alt = " ";

    expect(() => buildPortfolioCatalog(portfolioCatalogInput, rawHomeCatalog)).toThrow(
      "catalog.categories[0].projects[0].images[0].alt: esperado um texto não vazio",
    );
  });

  it("exige estado explícito de publicação e rejeita valor desconhecido", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];
    const { detailPublication, ...withoutPublication } = project;
    expect(detailPublication).toBe("published");

    expect(() => buildPortfolioCatalog(replaceFirstProject(withoutPublication), rawHomeCatalog)).toThrow(
      "catalog.categories[0].projects[0].detailPublication: esperado um texto não vazio",
    );
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, detailPublication: "public" }),
      rawHomeCatalog,
    )).toThrow('detailPublication: esperado "draft" ou "published"');
  });

  it("resolve hero cadastrado pela mesma mídia da galeria e usa a capa como fallback", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];
    const selectedHeroFile = project.images[1].file;
    const withHero = buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { heroFile: selectedHeroFile } }),
      rawHomeCatalog,
    ).projects[0];
    const withoutHero = buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { statement: "Natureza integrada ao cotidiano." } }),
      rawHomeCatalog,
    ).projects[0];

    expect(withHero.hero).toBe(withHero.images[1]);
    expect(withoutHero.hero).toBe(withoutHero.cover);
    expect(withHero.hero.file).toBe(selectedHeroFile);
  });

  it("normaliza acento, narrativa e pontos focais editoriais opcionais", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];
    const catalog = buildPortfolioCatalog(
      replaceFirstProject({
        ...project,
        details: {
          titleAccent: "área gourmet",
          introHeading: "Um jardim para viver a casa por inteiro.",
          body: [
            "O percurso verde acompanha as áreas de convivência.",
            "Texturas tropicais aproximam arquitetura e paisagem.",
          ],
        },
        images: project.images.map((image, index) => index === 0
          ? { ...image, position: "65% 40%", positionMobile: "right center" }
          : image),
      }),
      rawHomeCatalog,
    );
    const parsed = catalog.projects[0];

    expect(parsed.details).toMatchObject({
      titleAccent: "área gourmet",
      introHeading: "Um jardim para viver a casa por inteiro.",
      body: [
        "O percurso verde acompanha as áreas de convivência.",
        "Texturas tropicais aproximam arquitetura e paisagem.",
      ],
    });
    expect(parsed.images[0]).toMatchObject({
      position: "65% 40%",
      positionMobile: "right center",
    });
  });

  it("aplica os fallbacks de foco sem preencher campos editoriais ausentes", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];
    const withDesktopFocus = buildPortfolioCatalog(
      replaceFirstProject({
        ...project,
        images: project.images.map((image, index) => index === 0
          ? { ...image, position: "left top" }
          : image),
      }),
      rawHomeCatalog,
    ).projects[0];
    const legacy = buildPortfolioCatalog(rawPortfolioCatalog, rawHomeCatalog).projects[0];

    expect(withDesktopFocus.images[0]).toMatchObject({
      position: "left top",
      positionMobile: "left top",
    });
    expect(legacy.images[0]).toMatchObject({
      position: "center center",
      positionMobile: "center center",
    });
    expect(legacy.details).toBeUndefined();
  });

  it("rejeita acento vazio ou ausente do título de forma determinística", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];

    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { titleAccent: " " } }),
      rawHomeCatalog,
    )).toThrow("details.titleAccent: esperado um texto não vazio");
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { titleAccent: "jardim inexistente" } }),
      rawHomeCatalog,
    )).toThrow('details.titleAccent: o fragmento "jardim inexistente" não pertence ao título');
  });

  it("rejeita parágrafos vazios e corpo sem heading editorial", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];

    expect(() => buildPortfolioCatalog(
      replaceFirstProject({
        ...project,
        details: { introHeading: "Uma paisagem habitada.", body: ["Primeiro parágrafo.", " "] },
      }),
      rawHomeCatalog,
    )).toThrow("details.body[1]: esperado um texto não vazio");
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { body: ["Corpo sem título."] } }),
      rawHomeCatalog,
    )).toThrow("details.body: parágrafos exigem details.introHeading ou details.statement");
  });

  it("rejeita CSS arbitrário e percentuais fora do intervalo nos pontos focais", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];

    for (const position of ["calc(50% + 1rem) center", "101% 50%", "left 20%", "inherit"]) {
      expect(() => buildPortfolioCatalog(
        replaceFirstProject({
          ...project,
          images: project.images.map((image, index) => index === 0
            ? { ...image, position }
            : image),
        }),
        rawHomeCatalog,
      )).toThrow("position: esperada uma posição por keywords ou um par percentual entre 0% e 100%");
    }
  });

  it("rejeita hero externo à galeria e frase vazia", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];

    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { heroFile: "outra-pasta/imagem.jpg" } }),
      rawHomeCatalog,
    )).toThrow("details.heroFile: a mídia outra-pasta/imagem.jpg não está presente na galeria");
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { statement: " " } }),
      rawHomeCatalog,
    )).toThrow("details.statement: esperado um texto não vazio");
  });

  it("valida IDs, texto e ícones das soluções", () => {
    const project = copyPortfolioCatalog().categories[0].projects[0];
    const solution = {
      id: "integracao",
      icon: "leaf",
      title: "Integração com a arquitetura",
      description: "O jardim prolonga os espaços de convivência.",
    };

    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { solutions: [solution, solution] } }),
      rawHomeCatalog,
    )).toThrow("solutions[1].id: ID duplicado: integracao");
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { solutions: [{ ...solution, icon: "unknown" }] } }),
      rawHomeCatalog,
    )).toThrow("solutions[0].icon: ícone não suportado: unknown");
    expect(() => buildPortfolioCatalog(
      replaceFirstProject({ ...project, details: { solutions: [{ ...solution, title: "" }] } }),
      rawHomeCatalog,
    )).toThrow("solutions[0].title: esperado um texto não vazio");
  });

  it("mantém coleção, lookup, params e href restritos aos projetos publicados", () => {
    const sourceCatalog = copyPortfolioCatalog();
    const catalog = {
      ...sourceCatalog,
      categories: sourceCatalog.categories.map((category) => ({
        ...category,
        projects: category.projects.map((project) => ({ ...project, detailPublication: "draft" })),
      })),
    };
    const firstCategory = catalog.categories[0];
    const secondCategory = catalog.categories[1];
    const mixedInput = {
      ...catalog,
      categories: [
        {
          ...firstCategory,
          projects: firstCategory.projects.map((project) => ({ ...project, detailPublication: "published" })),
        },
        {
          ...secondCategory,
          projects: secondCategory.projects.map((project) => ({ ...project, detailPublication: "published" })),
        },
        ...catalog.categories.slice(2),
      ],
    };
    const projects = buildPortfolioCatalog(mixedInput, rawHomeCatalog).projects;
    const published = getPublishedProjects(projects);

    expect(published.map((project) => project.id)).toEqual([
      "residencia-piscina-area-gourmet",
      "coffee-comfort",
    ]);
    expect(getPublishedProjectParams(projects)).toEqual([
      { slug: "residencia-piscina-area-gourmet" },
      { slug: "coffee-comfort" },
    ]);
    expect(new Set(getPublishedProjectParams(projects).map(({ slug }) => slug)).size).toBe(2);
    expect(findPublishedProjectBySlug(projects, "coffee-comfort")?.title).toBe("Coffee Comfort");
    expect(findPublishedProjectBySlug(projects, "Coffee-Comfort")).toBeUndefined();
    expect(findPublishedProjectBySlug(projects, portfolioProjects[2].id)).toBeUndefined();
    expect(toProjectCardData(published[0]).href).toBe("/projetos/residencia-piscina-area-gourmet");
    expect(toProjectCardData({ ...portfolioProjects[0], detailPublication: "draft" }).href).toBeUndefined();
    expect(getPublishedProjects([])).toEqual([]);
    expect(getPublishedProjectParams([])).toEqual([]);
  });
});
