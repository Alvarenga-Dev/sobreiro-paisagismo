import Image from "next/image";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";

export interface ProjectGalleryProps {
  readonly images: readonly PortfolioImage[];
}

function positionName(index: number): string {
  if (index === 0) return "featured";
  if (index === 1) return "tall";
  if (index === 2 || index === 3) return "stacked";
  return "additional";
}

function imageSizes(index: number): string {
  if (index === 0) return "(min-width: 1216px) 1216px, 100vw";
  return "(min-width: 768px) 50vw, 100vw";
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <section className="projectDetailGallery" aria-labelledby="project-gallery-title">
      <h2 className="visuallyHidden" id="project-gallery-title">Galeria do projeto</h2>
      <ul>
        {images.map((image, index) => (
          <li className={`projectDetailGallery__item projectDetailGallery__item--${positionName(index)}`} key={image.file}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={imageSizes(index)}
              style={{ objectPosition: image.position }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
