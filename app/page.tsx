import { ContactBanner } from "./_components/ContactBanner";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteFrame } from "./_components/SiteFrame";
import { SiteHeader } from "./_components/SiteHeader";
import { AboutPanel } from "./_home/AboutPanel";
import { BenefitsPanel } from "./_home/BenefitsPanel";
import { HeroSection } from "./_home/HeroSection";
import { ProjectsSection } from "./_home/ProjectsSection";
import { homeContent } from "./_home/homeContent";

export default function HomePage() {
  return (
    <SiteFrame
      variant="fullBleed"
      header={
        <SiteHeader
          contactHref={homeContent.contact.href}
          contactLabel={homeContent.contact.label}
          presentation="floating"
        />
      }
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
      <BenefitsPanel heading={homeContent.benefitsHeading} benefits={homeContent.benefits} />
      <ProjectsSection heading={homeContent.projectsHeading} projects={homeContent.projects} />
      <AboutPanel content={homeContent.about} />
      <ContactBanner
        id="contato"
        message={homeContent.banner.message}
        contactHref={homeContent.contact.href}
        contactLabel={homeContent.contact.label}
        supportingAction={homeContent.banner.supportingAction}
      />
    </SiteFrame>
  );
}
