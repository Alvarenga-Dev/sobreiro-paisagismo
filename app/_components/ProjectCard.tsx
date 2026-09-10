import Image from "next/image";
import { LineIcon } from "./LineIcon";

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  position?: string;
}

export interface ProjectCardData {
  id: string;
  href?: string;
  title: string;
  category: string;
  summary: string;
  media: ProjectMedia;
}

export type ProjectCardDirection = "mediaFirst" | "contentFirst";
export type ProjectCardSurface = "dark" | "light";

export interface ProjectCardProps {
  project: ProjectCardData;
  layout?: "stacked" | "split";
  direction?: ProjectCardDirection;
  surface?: ProjectCardSurface;
}

export function ProjectCard({
  project,
  layout = "stacked",
  direction = "mediaFirst",
  surface = "dark",
}: ProjectCardProps) {
  const content = (
    <>
        <div className="projectCard__media">
          <Image
            src={project.media.src}
            alt={project.media.alt}
            width={project.media.width}
            height={project.media.height}
            sizes={project.media.sizes}
            style={{ objectPosition: project.media.position }}
          />
        </div>
        <div className="projectCard__content">
          <p className="projectCard__category">{project.category}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <span className="projectCard__details" aria-hidden={project.href ? true : undefined}>
            {project.href ? <>Ver detalhes {layout === "split" ? <LineIcon name="arrowRight" /> : <span>↗</span>}</> : "Detalhes em breve"}
          </span>
        </div>
    </>
  );

  return (
    <article
      className={`projectCard projectCard--${layout} projectCard--${direction} projectCard--${surface}`}
      data-direction={direction}
      data-project-id={project.id}
      data-surface={surface}
    >
      {project.href ? (
        <a className="projectCard__link" href={project.href} aria-label={`Conhecer o projeto ${project.title}`}>
          {content}
        </a>
      ) : <div className="projectCard__body">{content}</div>}
    </article>
  );
}
