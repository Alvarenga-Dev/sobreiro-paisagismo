import type { PortfolioImage } from "../../_content/portfolioCatalog";

export function prepareProjectDetailMedia(
  cover: PortfolioImage,
  images: readonly PortfolioImage[],
): readonly PortfolioImage[] {
  const files = new Set<string>();
  return [cover, ...images].filter((image) => {
    if (files.has(image.file)) return false;
    files.add(image.file);
    return true;
  });
}
