import Image from "next/image";
import { DisplayHeading, SupportingCopy } from "../../_components/Typography";
import { LineIcon } from "../../_components/LineIcon";
import { projectsContent } from "../projectsContent";

export function ProjectsHero() {
  const { hero } = projectsContent;
  return (
    <section className="projectsHero" aria-labelledby="projects-hero-title">
      <Image className="projectsHero__image" src={hero.media.src} alt={hero.media.alt} fill priority sizes={hero.media.sizes} style={{ objectPosition: hero.media.position }} />
      <div className="projectsHero__inner">
        <DisplayHeading id="projects-hero-title" fragments={hero.title} />
        <div className="projectsHero__divider" aria-hidden="true"><LineIcon name="leaf" /></div>
        <SupportingCopy context="onDark">{hero.introduction}</SupportingCopy>
      </div>
    </section>
  );
}
