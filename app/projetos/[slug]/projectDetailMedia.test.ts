import type { PortfolioImage } from "../../_content/portfolioCatalog";
import { prepareProjectDetailMedia } from "./projectDetailMedia";

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

describe("prepareProjectDetailMedia", () => {
  it("preserva a capa como imagem única quando não há outros arquivos", () => {
    const hero = image("hero.jpg", 1200, 800, "Jardim visto da varanda");

    expect(prepareProjectDetailMedia(hero, [])).toEqual([hero]);
    expect(prepareProjectDetailMedia(hero, [hero])).toEqual([hero]);
  });

  it("abre com a capa e preserva a ordem dos demais arquivos", () => {
    const first = image("primeira.jpg");
    const hero = image("hero.jpg", 1200, 800, "Vista principal do jardim");
    const third = image("terceira.jpg");

    const prepared = prepareProjectDetailMedia(hero, [first, hero, third]);

    expect(prepared).toEqual([hero, first, third]);
  });

  it("deduplica por arquivo, preserva enquadramentos distintos e não altera a fonte", () => {
    const hero = image("hero.jpg");
    const repeated = image("detalhe.jpg", 900, 900, "Primeira descrição aprovada");
    const repeatedLater = image("detalhe.jpg", 900, 900, "Descrição que não deve substituir a primeira");
    const visuallySimilar = image("detalhe-02.jpg", 900, 900, "Outro enquadramento do detalhe");
    const source = Object.freeze([repeated, repeatedLater, visuallySimilar]);

    const prepared = prepareProjectDetailMedia(hero, source);

    expect(prepared).toEqual([hero, repeated, visuallySimilar]);
    expect(source).toEqual([repeated, repeatedLater, visuallySimilar]);
    expect(source[0]).toBe(repeated);
  });
});
