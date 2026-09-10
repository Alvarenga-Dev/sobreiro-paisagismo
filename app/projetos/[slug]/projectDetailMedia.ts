import type { PortfolioImage } from "../../_content/portfolioCatalog";

export interface PreparedProjectDetailMedia {
  readonly hero: PortfolioImage;
  readonly heroAlt: string;
  readonly galleryMedia: readonly PortfolioImage[];
}

export type GalleryMediaOrientation = "panoramic" | "landscape" | "square" | "portrait";
export type GalleryRowKind = "full" | "pair" | "trio";
export type GalleryPairVariant = "sevenFive" | "fiveSeven";

export interface GalleryRowPlan {
  readonly kind: GalleryRowKind;
  readonly items: readonly PortfolioImage[];
  readonly pairVariant?: GalleryPairVariant;
}

export interface GalleryLayoutPlan {
  readonly lead?: PortfolioImage;
  readonly rows: readonly GalleryRowPlan[];
}

function uniqueMediaByFile(images: readonly PortfolioImage[]): readonly PortfolioImage[] {
  const files = new Set<string>();
  return images.filter((image) => {
    if (files.has(image.file)) return false;
    files.add(image.file);
    return true;
  });
}

export function prepareProjectDetailMedia(
  hero: PortfolioImage,
  images: readonly PortfolioImage[],
): PreparedProjectDetailMedia {
  const uniqueMedia = uniqueMediaByFile(images);
  const galleryMedia = uniqueMedia.length > 1 && uniqueMedia[0]?.file === hero.file
    ? uniqueMedia.slice(1)
    : uniqueMedia.length === 1 && uniqueMedia[0]?.file === hero.file
      ? []
      : uniqueMedia;
  const heroAlt = galleryMedia.some((image) => image.file === hero.file) ? "" : hero.alt;

  return { hero, heroAlt, galleryMedia };
}

export function galleryMediaOrientation(
  media: Pick<PortfolioImage, "width" | "height">,
): GalleryMediaOrientation {
  const ratio = media.width / media.height;
  if (ratio >= 2.2) return "panoramic";
  if (ratio >= 1.08) return "landscape";
  if (ratio <= 0.82) return "portrait";
  return "square";
}

function preferredGroupSize(remaining: number): 1 | 2 | 3 {
  if (remaining === 1) return 1;
  if (remaining === 2 || remaining === 4) return 2;
  return 3;
}

function safeGroupSize(
  media: readonly PortfolioImage[],
  start: number,
  preferred: 1 | 2 | 3,
): 1 | 2 | 3 {
  if (preferred !== 3) return preferred;

  const candidate = media.slice(start, start + preferred);
  const panoramicIndex = candidate.findIndex(
    (image) => galleryMediaOrientation(image) === "panoramic",
  );
  if (panoramicIndex === -1) return preferred;
  if (panoramicIndex === 0) return 1;
  return panoramicIndex === 1 ? 1 : 2;
}

export function planGalleryLayout(media: readonly PortfolioImage[]): GalleryLayoutPlan {
  const lead = media[0];
  if (!lead) return { rows: [] };

  const remaining = media.slice(1);
  const rows: GalleryRowPlan[] = [];
  let index = 0;
  let pairIndex = 0;

  while (index < remaining.length) {
    const preferred = preferredGroupSize(remaining.length - index);
    const groupSize = safeGroupSize(remaining, index, preferred);
    const items = remaining.slice(index, index + groupSize);

    if (groupSize === 1) {
      rows.push({ kind: "full", items });
    } else if (groupSize === 2) {
      rows.push({
        kind: "pair",
        items,
        pairVariant: pairIndex % 2 === 0 ? "sevenFive" : "fiveSeven",
      });
      pairIndex += 1;
    } else {
      rows.push({ kind: "trio", items });
    }
    index += groupSize;
  }

  return { lead, rows };
}
