import type { Metadata } from "next";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteFrame } from "../_components/SiteFrame";
import { SectionHeading, SupportingCopy } from "../_components/Typography";
import { siteContent } from "../_content/siteContent";
import { AboutHero } from "./_components/AboutHero";
import { AboutVideoPlayer } from "./_components/AboutVideoPlayer";
import { ContactMethodsSection } from "./_components/ContactMethodsSection";
import { EssenceSection } from "./_components/EssenceSection";
import { TeamProfileSection } from "./_components/TeamProfileSection";
import { aboutContent } from "./aboutContent";

export const metadata: Metadata = {
  title: "Sobre | Sobreiro Paisagismo",
  description:
    "Conheça Jéssica Sobreiro e sua abordagem para projetos de paisagismo e design de interiores.",
};

export default function AboutPage() {
  const { video } = aboutContent;

  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} />}
    >
      <AboutHero content={aboutContent.hero} />
      <TeamProfileSection content={aboutContent.team} />
      <EssenceSection content={aboutContent.essence} />
      <section className="aboutVideoSection" aria-labelledby="sobre-video-title" data-region="about-video">
        <div className="aboutSectionInner aboutVideoSection__layout">
          <div className="aboutVideoSection__copy">
            <SectionHeading id="sobre-video-title" eyebrow="Vídeo" fragments={[{ text: video.title }]} />
            <SupportingCopy>{video.description}</SupportingCopy>
          </div>
          <div className="aboutVideoSection__media">
            <AboutVideoPlayer id={video.id} playerTitle={video.playerTitle} poster={video.poster} />
            <a className="editorialLink" href={video.watchUrl}>
              Assistir no YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <ContactMethodsSection content={aboutContent.contact} />
    </SiteFrame>
  );
}
