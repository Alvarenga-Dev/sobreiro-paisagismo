import type { Metadata } from "next";
import { SiteFrame } from "../_components/SiteFrame";
import { SiteFooter } from "../_components/SiteFooter";
import { siteContent } from "../_content/siteContent";
import { ProjectsHero } from "./_components/ProjectsHero";
import { ProjectsCatalog } from "./_components/ProjectsCatalog";
import { ProjectsContactBanner } from "./_components/ProjectsContactBanner";
import { catalogProjects, projectCategories, projectsContent, projectContactActions } from "./projectsContent";
import { filterProjects, normalizeCategory, projectFilterHref, type ProjectSearchParams } from "./projectFilters";

export const metadata: Metadata = {
  title: "Projetos | Sobreiro Paisagismo",
  description: "Explore o portfólio da Sobreiro Paisagismo: projetos residenciais, áreas externas, áreas gourmet, piscinas, varandas e espaços comerciais.",
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<ProjectSearchParams> }) {
  const params = await searchParams;
  const category = normalizeCategory(params.categoria);
  const destinations = Object.fromEntries(
    projectCategories.map((option) => [option.id, projectFilterHref(params, option.id)]),
  );
  return (
    <SiteFrame variant="fullBleed" footer={<SiteFooter {...siteContent.internalFooter} currentPath="/projetos" />}>
      <ProjectsHero />
      <div className="projectsPage__surface">
        <div className="projectsPage__inner">
          <ProjectsCatalog category={category} destinations={destinations} projects={filterProjects(catalogProjects, category)} />
        </div>
      </div>
      <ProjectsContactBanner
        id="projects-contact-title"
        {...projectsContent.banner}
        {...projectContactActions(siteContent.mobileMenu.contacts.whatsapp, siteContent.contact, siteContent.email)}
      />
    </SiteFrame>
  );
}
