import Image from "next/image";

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
  href: string;
  title: string;
  category: string;
  summary: string;
  media: ProjectMedia;
}

export interface ProjectCardProps {
  project: ProjectCardData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="projectCard" data-project-id={project.id}>
      <a className="projectCard__link" href={project.href} aria-label={`Conhecer o projeto ${project.title}`}>
        <div className="projectCard__media">
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            sizes={project.media.sizes}
            style={{ objectPosition: project.media.position }}
          />
        </div>
        <div className="projectCard__content">
          <p className="projectCard__category">{project.category}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <span className="projectCard__details" aria-hidden="true">Ver detalhes <span>↗</span></span>
        </div>
      </a>
    </article>
  );
}
