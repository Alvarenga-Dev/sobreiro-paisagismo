import Image from "next/image";
import { ButtonLink } from "../../_components/ButtonLink";
import { LineIcon } from "../../_components/LineIcon";
import { NatureAmbient } from "../../_components/NatureAmbient";
import { DisplayHeading, SupportingCopy } from "../../_components/Typography";
import type { AboutHeroContent } from "../aboutContent";

export function AboutHero({ content }: { content: AboutHeroContent }) {
  return (
    <section className="aboutHero" aria-labelledby="sobre-hero-title" data-region="about-hero">
      <Image
        className="aboutHero__image"
        src={content.media.src}
        alt={content.media.alt}
        fill
        priority
        fetchPriority="high"
        sizes={content.media.sizes}
        style={{ objectPosition: content.media.position }}
      />
      <NatureAmbient variant="about" />
      <div className="aboutHero__inner">
        <div className="aboutHero__editorial">
          <p className="aboutHero__eyebrow">{content.eyebrow}</p>
          <DisplayHeading id="sobre-hero-title" fragments={content.title} />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
          <ButtonLink
            className="aboutHero__historyLink"
            href={content.historyLink.href}
            variant="outlineInverse"
            trailingIcon={<LineIcon name="arrowRight" size="sm" />}
          >
            {content.historyLink.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
