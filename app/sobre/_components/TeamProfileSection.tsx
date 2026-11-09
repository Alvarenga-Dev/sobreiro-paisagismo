import Image from "next/image";
import { SectionHeading, SupportingCopy } from "../../_components/Typography";
import type { aboutContent } from "../aboutContent";

export function TeamProfileSection({ content }: { content: typeof aboutContent.team }) {
  return (
    <section
      id="perfil"
      className="teamProfileSection"
      aria-labelledby="equipe-title"
      data-region="team-profile"
    >
      <div className="aboutSectionInner teamProfileSection__layout">
        <figure className="profilePortrait">
          <Image {...content.media} alt={content.media.alt} />
        </figure>
        <div className="teamProfileSection__intro">
          <SectionHeading
            id="equipe-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
            context="onDark"
          />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
        </div>
      </div>
    </section>
  );
}
