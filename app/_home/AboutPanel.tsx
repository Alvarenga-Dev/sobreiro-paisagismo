import Image from "next/image";
import { LineIcon } from "../_components/LineIcon";
import { SectionHeading, SupportingCopy } from "../_components/Typography";
import type { homeContent } from "./homeContent";

export interface AboutPanelProps {
  content: typeof homeContent.about;
}

export function AboutPanel({ content }: AboutPanelProps) {
  return (
    <section className="aboutPanel" id="sobre" aria-labelledby="sobre-title" data-region="about">
      <div className="aboutSectionInner aboutPanel__layout">
        <figure className="profilePortrait">
          <Image {...content.media} alt={content.media.alt} />
        </figure>
        <div className="aboutPanel__content">
          <SectionHeading
            id="sobre-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
            context="onDark"
          />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
          <a className="editorialLink" href={content.action.href}>
            {content.action.label}
            <LineIcon name="arrowRight" size="sm" />
          </a>
        </div>
      </div>
    </section>
  );
}
