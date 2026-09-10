import type { PortfolioImage } from "../../../_content/portfolioCatalog";
import {
  galleryMediaOrientation,
  planGalleryLayout,
  type GalleryPairVariant,
  type GalleryRowKind,
} from "../projectDetailMedia";
import { DeferredGalleryImage } from "./DeferredGalleryImage";

export interface ProjectGalleryProps {
  readonly images: readonly PortfolioImage[];
  readonly hasNarrative: boolean;
}

function imageSizes(
  role: "lead" | GalleryRowKind,
  pairVariant?: GalleryPairVariant,
  pairIndex?: number,
): string {
  if (role === "lead") {
    return "(min-width: 1600px) 960px, (min-width: 1200px) 64vw, (min-width: 768px) 90vw, 100vw";
  }
  if (role === "full") {
    return "(min-width: 1600px) 1440px, (min-width: 1200px) 1216px, (min-width: 768px) 90vw, 100vw";
  }
  if (role === "trio") return "(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw";

  const isWide = pairVariant === "sevenFive" ? pairIndex === 0 : pairIndex === 1;
  return isWide
    ? "(min-width: 1200px) 52vw, (min-width: 768px) 45vw, 100vw"
    : "(min-width: 1200px) 38vw, (min-width: 768px) 45vw, 100vw";
}

function itemClassName(
  image: PortfolioImage,
  role: "lead" | GalleryRowKind,
  pairVariant?: GalleryPairVariant,
  pairIndex?: number,
): string {
  const classes = [
    "projectDetailGallery__item",
    `projectDetailGallery__item--${role}`,
    `projectDetailGallery__item--${galleryMediaOrientation(image)}`,
  ];
  if (role === "pair") {
    const isWide = pairVariant === "sevenFive" ? pairIndex === 0 : pairIndex === 1;
    classes.push(`projectDetailGallery__item--${isWide ? "wide" : "narrow"}`);
  }
  return classes.join(" ");
}

function GalleryImage({
  image,
  role,
  pairVariant,
  pairIndex,
}: {
  readonly image: PortfolioImage;
  readonly role: "lead" | GalleryRowKind;
  readonly pairVariant?: GalleryPairVariant;
  readonly pairIndex?: number;
}) {
  return (
    <DeferredGalleryImage
      className={itemClassName(image, role, pairVariant, pairIndex)}
      image={image}
      orientation={galleryMediaOrientation(image)}
      pairIndex={pairIndex}
      role={role}
      sizes={imageSizes(role, pairVariant, pairIndex)}
    />
  );
}

export function ProjectGallery({ images, hasNarrative }: ProjectGalleryProps) {
  const plan = planGalleryLayout(images);
  if (!plan.lead) return null;

  return (
    <section
      className={`projectDetailGallery${hasNarrative ? " projectDetailGallery--withNarrative" : ""}`}
      aria-labelledby="project-gallery-title"
    >
      <h2 className="visuallyHidden" id="project-gallery-title">Galeria do projeto</h2>
      <ul role="list">
        <GalleryImage image={plan.lead} role="lead" />
        {plan.rows.flatMap((row) => row.items.map((image, index) => (
          <GalleryImage
            image={image}
            role={row.kind}
            pairVariant={row.pairVariant}
            pairIndex={index}
            key={image.file}
          />
        )))}
      </ul>
    </section>
  );
}
