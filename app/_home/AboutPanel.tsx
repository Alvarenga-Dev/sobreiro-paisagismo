import Image from "next/image";
import { BotanicalDecoration } from "../_components/Brand";
import { SecondaryButton } from "../_components/ButtonLink";
import { SectionHeading, SupportingCopy } from "../_components/Typography";
import type { AboutContentData } from "./homeContent";

export function MediaFrame({ media }: Pick<AboutContentData, "media">) {
  return (
    <figure className="mediaFrame">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 699px) 92vw, (max-width: 1099px) 48vw, 38vw"
        style={{ objectPosition: media.position }}
      />
    </figure>
  );
}

export function QuoteCard({ quote }: Pick<AboutContentData, "quote">) {
  return (
    <figure className="quoteCard">
      <blockquote>“{quote.text}”</blockquote>
      <figcaption>
        <strong>{quote.author}</strong>
        <span>{quote.role}</span>
      </figcaption>
    </figure>
  );
}

export function MediaQuoteComposite({ content }: { content: AboutContentData }) {
  return (
    <div className="mediaQuoteComposite">
      <MediaFrame media={content.media} />
      <QuoteCard quote={content.quote} />
    </div>
  );
}

export interface AboutPanelProps {
  content: AboutContentData;
}

export function AboutPanel({ content }: AboutPanelProps) {
  return (
    <section className="aboutPanel" id="sobre" aria-labelledby="sobre-title" data-region="about">
      <BotanicalDecoration />
      <MediaQuoteComposite content={content} />
      <div className="aboutPanel__content">
        <SectionHeading
          id="sobre-title"
          eyebrow={content.eyebrow}
          fragments={content.title}
          context="onLight"
        />
        <SupportingCopy>{content.description}</SupportingCopy>
        <SecondaryButton href={content.action.href} label={content.action.label} />
      </div>
    </section>
  );
}
