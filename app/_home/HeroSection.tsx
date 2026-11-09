import Image from "next/image";
import { ActionGroup, ButtonLink, ContactButton } from "../_components/ButtonLink";
import { NatureAmbient } from "../_components/NatureAmbient";
import { SupportingCopy } from "../_components/Typography";
import type { HeroContentData } from "./homeContent";

export interface HeroSectionProps {
  content: HeroContentData;
}

function HeroBackdrop({ media }: Pick<HeroContentData, "media">) {
  return (
    <div className="heroBackdrop" aria-hidden="true">
      <Image
        src={media.src}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 900px) 100vw, 92vw"
        style={{ objectPosition: media.position }}
      />
    </div>
  );
}

function HeroContent({ content }: HeroSectionProps) {
  return (
    <div className="heroContent">
      <p className="heroContent__eyebrow">{content.eyebrow}</p>
      <hgroup>
        <h1 id="inicio-title" className="displayHeading">{content.title}</h1>
        <p className="heroContent__handwritten">{content.signature}</p>
      </hgroup>
      <SupportingCopy context="onDark">{content.description}</SupportingCopy>
      <ActionGroup>
        <ContactButton
          href={content.primaryAction.href}
          label={content.primaryAction.label}
          icon={content.primaryAction.icon}
          iconSize="sm"
          external={content.primaryAction.external}
        />
        <ButtonLink href={content.secondaryAction.href} size="lg" variant="outlineInverse">
          {content.secondaryAction.label}
        </ButtonLink>
      </ActionGroup>
    </div>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="inicio" className="homeHero" aria-labelledby="inicio-title" data-region="hero">
      <link rel="preload" href="/fonts/allura/allura-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <HeroBackdrop media={content.media} />
      <NatureAmbient variant="home" />
      <HeroContent content={content} />
    </section>
  );
}
