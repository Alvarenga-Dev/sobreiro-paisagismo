import type { PortfolioImage } from "../../_content/portfolioCatalog";
import {
  galleryMediaOrientation,
  planGalleryLayout,
  prepareProjectDetailMedia,
} from "./projectDetailMedia";

function image(
  file: string,
  width = 1200,
  height = 800,
  alt = `Descrição de ${file}`,
): PortfolioImage {
  return {
    file,
    src: `/images/portfolio/${file}`,
    alt,
    width,
    height,
    sizes: "100vw",
    position: "center center",
    positionMobile: "center center",
  };
}

function files(plan: ReturnType<typeof planGalleryLayout>): readonly string[] {
  return [
    ...(plan.lead ? [plan.lead.file] : []),
    ...plan.rows.flatMap((row) => row.items.map((media) => media.file)),
  ];
}

describe("prepareProjectDetailMedia", () => {
  it("produz galeria vazia e alt informativo quando nenhuma mídia permanece", () => {
    const hero = image("hero.jpg", 1200, 800, "Jardim visto da varanda");

    expect(prepareProjectDetailMedia(hero, [])).toEqual({
      hero,
      heroAlt: "Jardim visto da varanda",
      galleryMedia: [],
    });
    expect(prepareProjectDetailMedia(hero, [hero])).toEqual({
      hero,
      heroAlt: "Jardim visto da varanda",
      galleryMedia: [],
    });
  });

  it("remove a repetição imediata do hero quando existe outra mídia única", () => {
    const hero = image("hero.jpg");
    const second = image("segunda.jpg");
    const third = image("terceira.jpg");

    const prepared = prepareProjectDetailMedia(hero, [hero, second, third]);

    expect(prepared.galleryMedia).toEqual([second, third]);
    expect(prepared.heroAlt).toBe("Descrição de hero.jpg");
  });

  it("mantém hero posterior na galeria e evita descrição acessível duplicada", () => {
    const first = image("primeira.jpg");
    const hero = image("hero.jpg", 1200, 800, "Vista principal do jardim");
    const third = image("terceira.jpg");

    const prepared = prepareProjectDetailMedia(hero, [first, hero, third]);

    expect(prepared.galleryMedia).toEqual([first, hero, third]);
    expect(prepared.heroAlt).toBe("");
  });

  it("deduplica por arquivo, preserva enquadramentos distintos e não altera a fonte", () => {
    const hero = image("hero.jpg");
    const repeated = image("detalhe.jpg", 900, 900, "Primeira descrição aprovada");
    const repeatedLater = image("detalhe.jpg", 900, 900, "Descrição que não deve substituir a primeira");
    const visuallySimilar = image("detalhe-02.jpg", 900, 900, "Outro enquadramento do detalhe");
    const source = Object.freeze([repeated, repeatedLater, visuallySimilar]);

    const prepared = prepareProjectDetailMedia(hero, source);

    expect(prepared.galleryMedia).toEqual([repeated, visuallySimilar]);
    expect(source).toEqual([repeated, repeatedLater, visuallySimilar]);
    expect(source[0]).toBe(repeated);
  });
});

describe("planGalleryLayout", () => {
  it.each([
    { count: 0, rows: [] },
    { count: 1, rows: [] },
    { count: 2, rows: ["full"] },
    { count: 3, rows: ["pair"] },
    { count: 4, rows: ["trio"] },
    { count: 5, rows: ["pair", "pair"] },
    { count: 6, rows: ["trio", "pair"] },
    { count: 8, rows: ["trio", "pair", "pair"] },
    { count: 12, rows: ["trio", "trio", "trio", "pair"] },
  ])("cobre exatamente $count mídias com linhas completas", ({ count, rows }) => {
    const media = Array.from({ length: count }, (_, index) => image(`${index + 1}.jpg`, 1000, 1000));
    const plan = planGalleryLayout(media);

    expect(plan.rows.map((row) => row.kind)).toEqual(rows);
    expect(files(plan)).toEqual(media.map((item) => item.file));
    expect(new Set(files(plan)).size).toBe(count);
  });

  it("alterna pares 7/5 e 5/7 sem mudar a ordem", () => {
    const media = Array.from({ length: 8 }, (_, index) => image(`${index + 1}.jpg`, 1000, 1000));
    const plan = planGalleryLayout(media);
    const pairs = plan.rows.filter((row) => row.kind === "pair");

    expect(pairs.map((row) => row.pairVariant)).toEqual(["sevenFive", "fiveSeven"]);
    expect(files(plan)).toEqual(media.map((item) => item.file));
  });

  it("deriva orientação e promove panorama incompatível com trio a linha integral", () => {
    const lead = image("lead.jpg", 1600, 1000);
    const panorama = image("panorama.jpg", 2400, 900);
    const square = image("square.jpg", 1000, 1000);
    const portrait = image("portrait.jpg", 800, 1200);

    expect(galleryMediaOrientation(lead)).toBe("landscape");
    expect(galleryMediaOrientation(panorama)).toBe("panoramic");
    expect(galleryMediaOrientation(square)).toBe("square");
    expect(galleryMediaOrientation(portrait)).toBe("portrait");
    expect(planGalleryLayout([lead, panorama, square, portrait]).rows.map((row) => row.kind)).toEqual([
      "full",
      "pair",
    ]);
  });
});
