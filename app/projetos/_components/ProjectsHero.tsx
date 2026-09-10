import Image from "next/image";
import { DisplayHeading, SupportingCopy } from "../../_components/Typography";
import { projectsContent } from "../projectsContent";

export function ProjectsHero() {
  const { hero } = projectsContent;
  return (
    <section className="projectsHero" aria-labelledby="projects-hero-title" data-region="hero">
      <Image className="projectsHero__image" src={hero.media.src} alt={hero.media.alt} fill priority sizes={hero.media.sizes} style={{ objectPosition: hero.media.position }} />
      <div className="projectsHero__inner">
        <div className="projectsHero__introduction">
          <p className="projectsHero__eyebrow">{hero.eyebrow}</p>
          <DisplayHeading id="projects-hero-title" fragments={hero.title} />
          <SupportingCopy context="onDark">{hero.introduction}</SupportingCopy>
        </div>
        <p className="projectsHero__statement">{hero.statement}</p>
      </div>
    </section>
  );
}
