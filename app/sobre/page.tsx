import type { Metadata } from "next";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteFrame } from "../_components/SiteFrame";
import { siteContent } from "../_content/siteContent";
import { AboutHero } from "./_components/AboutHero";
import { ContactMethodsSection } from "./_components/ContactMethodsSection";
import { EssenceSection } from "./_components/EssenceSection";
import { TeamProfileSection } from "./_components/TeamProfileSection";
import { aboutContent } from "./aboutContent";

export const metadata: Metadata = {
  title: "Sobre | Sobreiro Paisagismo",
  description:
    "Conheça a essência, os valores e a abordagem da Sobreiro Paisagismo para criar espaços conectados à natureza.",
};

export default function AboutPage() {
  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} />}
    >
      <AboutHero content={aboutContent.hero} />
      <EssenceSection content={aboutContent.essence} />
      <TeamProfileSection content={aboutContent.team} />
      <ContactMethodsSection content={aboutContent.contact} />
    </SiteFrame>
  );
}
