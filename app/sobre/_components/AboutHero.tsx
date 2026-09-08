import Image from "next/image";
import Link from "next/link";
import { BotanicalDecoration } from "../../_components/Brand";
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
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Início</Link></li>
            <li aria-current="page">Sobre</li>
          </ol>
        </nav>
        <DisplayHeading id="sobre-hero-title" fragments={content.title} />
        <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
      </div>
      <BotanicalDecoration className="aboutHero__decoration" />
    </section>
  );
}
