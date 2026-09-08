import type { Metadata } from "next";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteFrame } from "../_components/SiteFrame";
import { SiteHeader } from "../_components/SiteHeader";
import { siteContent } from "../_content/siteContent";
import { AboutHero } from "./_components/AboutHero";
import { ContactMethodsSection } from "./_components/ContactMethodsSection";
import { EssenceSection } from "./_components/EssenceSection";
import { FounderSection } from "./_components/FounderSection";
import { aboutContent } from "./aboutContent";

export const metadata: Metadata = {
  title: "Sobre a Sobreiro Paisagismo | Paisagismo autoral",
  description:
    "Conheça a essência, os valores e a abordagem da Sobreiro Paisagismo para criar espaços conectados à natureza.",
};

export default function AboutPage() {
  return (
    <SiteFrame
      variant="fullBleed"
      header={<SiteHeader presentation="floating" showContact={false} />}
      footer={<SiteFooter {...siteContent.internalFooter} />}
    >
      <AboutHero content={aboutContent.hero} />
      <EssenceSection content={aboutContent.essence} />
      <FounderSection content={aboutContent.founder} />
      <ContactMethodsSection content={aboutContent.contact} />
    </SiteFrame>
  );
}
