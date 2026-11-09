import type { Metadata } from "next";
import { ContactBanner } from "./_components/ContactBanner";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteFrame } from "./_components/SiteFrame";
import { AboutPanel } from "./_home/AboutPanel";
import { BenefitsPanel } from "./_home/BenefitsPanel";
import { HeroSection } from "./_home/HeroSection";
import { ProjectsSection } from "./_home/ProjectsSection";
import { ServicesSection } from "./_home/ServicesSection";
import { homeContent } from "./_home/homeContent";

export const metadata: Metadata = {
  title: "Sobreiro Paisagismo | Paisagismo e design de interiores",
  description: "Conheça os projetos de Jéssica Sobreiro para jardins, áreas externas e interiores. Veja quando uma consultoria em paisagismo pode ajudar e converse sobre seu espaço.",
};

export default function HomePage() {
  return (
    <SiteFrame
      variant="fullBleed"
      footer={
        <SiteFooter
          description={homeContent.footer.description}
          groups={homeContent.footer.groups}
          socialLinks={homeContent.footer.socialLinks}
          legal={homeContent.footer.legal}
        />
      }
    >
      <HeroSection content={homeContent.hero} />
      <AboutPanel content={homeContent.about} />
      <ServicesSection content={homeContent.services} />
      <ProjectsSection heading={homeContent.projectsHeading} projects={homeContent.projects} />
      <BenefitsPanel heading={homeContent.benefitsHeading} benefits={homeContent.benefits} />
      <ContactBanner
        id="contato"
        message={homeContent.banner.message}
        description={homeContent.banner.description}
        contactHref={homeContent.contact.href}
        contactLabel={homeContent.contact.label}
        contactIcon={homeContent.contact.icon}
        contactIconSize="sm"
        contactExternal={homeContent.contact.external}
      />
    </SiteFrame>
  );
}
