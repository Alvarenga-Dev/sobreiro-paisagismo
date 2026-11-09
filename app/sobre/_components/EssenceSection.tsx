import Image from "next/image";
import { SectionHeading } from "../../_components/Typography";
import type { AboutEssenceContent } from "../aboutContent";

export function EssenceSection({ content }: { content: AboutEssenceContent }) {
  return (
    <section id="essencia" className="essenceSection" aria-labelledby="essencia-title" data-region="essence">
      <div className="aboutSectionInner essenceSection__layout">
        <div className="essenceSection__copy">
          <SectionHeading
            id="essencia-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
          />
          <div className="editorialCopy">
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <blockquote className="essenceSection__statement">{content.statement}</blockquote>
        </div>
        <figure className="essenceMedia">
          <Image {...content.media} alt={content.media.alt} />
        </figure>
      </div>
    </section>
  );
}
