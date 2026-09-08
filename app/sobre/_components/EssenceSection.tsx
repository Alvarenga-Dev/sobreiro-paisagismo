import Image from "next/image";
import { CardSurface } from "../../_components/CardSurface";
import { LineIcon } from "../../_components/LineIcon";
import { SectionHeading } from "../../_components/Typography";
import type { AboutEssenceContent, AboutValue } from "../aboutContent";

function ValueCard({ value }: { value: AboutValue }) {
  return (
    <li>
      <CardSurface className="valueCard">
        <span className="valueCard__icon" aria-hidden="true">
          <LineIcon name={value.icon} size="lg" />
        </span>
        <h3>{value.title}</h3>
        <p>{value.description}</p>
      </CardSurface>
    </li>
  );
}

export function EssenceSection({ content }: { content: AboutEssenceContent }) {
  return (
    <section className="essenceSection" aria-labelledby="essencia-title" data-region="essence">
      <div className="aboutSectionInner essenceSection__layout">
        <figure className="essenceMedia">
          <Image
            src={content.media.src}
            alt={content.media.alt}
            fill
            sizes={content.media.sizes}
            style={{ objectPosition: content.media.position }}
          />
        </figure>
        <div className="essenceSection__copy">
          <SectionHeading
            id="essencia-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
          />
          <div className="editorialCopy">
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <ul className="valuesGrid" aria-label="Valores da Sobreiro Paisagismo">
          {content.values.map((value) => <ValueCard key={value.id} value={value} />)}
        </ul>
      </div>
    </section>
  );
}
