import Image from "next/image";
import { BotanicalDecoration } from "../../_components/Brand";
import { LineIcon } from "../../_components/LineIcon";
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
      <div className="aboutHero__inner">
        <div className="aboutHero__editorial">
          <p className="aboutHero__eyebrow">{content.eyebrow}</p>
          <DisplayHeading id="sobre-hero-title" fragments={content.title} />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
        </div>
        <div className="aboutHero__closing">
          <a className="aboutHero__historyLink" href={content.historyLink.href}>
            <span aria-hidden="true" className="aboutHero__historyIcon">
              <LineIcon name="arrowRight" />
            </span>
            {content.historyLink.label}
          </a>
          <p className="aboutHero__statement">{content.statement}</p>
        </div>
      </div>
      <BotanicalDecoration className="aboutHero__decoration" />
    </section>
  );
}
