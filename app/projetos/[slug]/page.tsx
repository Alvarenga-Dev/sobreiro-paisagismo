import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBanner } from "../../_components/ContactBanner";
import { SiteFooter } from "../../_components/SiteFooter";
import { SiteFrame } from "../../_components/SiteFrame";
import {
  findPublishedProjectBySlug,
  getPublishedProjectParams,
  portfolioProjects,
  type PortfolioProject,
} from "../../_content/portfolioCatalog";
import { siteContent } from "../../_content/siteContent";
import { AppliedSolutions } from "./_components/AppliedSolutions";
import { ProjectDetailHero } from "./_components/ProjectDetailHero";
import { ProjectGallery } from "./_components/ProjectGallery";
import { ProjectOverview } from "./_components/ProjectOverview";
import { ProjectsReturnLink } from "./_components/ProjectsReturnLink";
import { projectDetailBanner, projectDetailContactActions } from "./projectDetailContent";

interface ProjectDetailPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export function projectDetailMetadata(project: PortfolioProject | undefined): Metadata {
  return project
    ? { title: `${project.title} | Sobreiro Paisagismo`, description: project.summary }
    : { title: "Projeto não encontrado | Sobreiro Paisagismo" };
}

export function generateStaticParams() {
  return [...getPublishedProjectParams(portfolioProjects)];
}

export function requirePublishedProject(
  projects: readonly PortfolioProject[],
  slug: string,
): PortfolioProject {
  const project = findPublishedProjectBySlug(projects, slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return projectDetailMetadata(findPublishedProjectBySlug(portfolioProjects, slug));
}

export function ProjectDetailPageView({ project }: { readonly project: PortfolioProject }) {
  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} currentPath="/projetos" />}
    >
      <ProjectDetailHero title={project.title} media={project.hero} />
      <div className="projectDetailSurface">
        <div className="projectDetailInner">
          <ProjectOverview summary={project.summary} statement={project.details?.statement} />
          <ProjectGallery images={project.images} />
          <AppliedSolutions solutions={project.details?.solutions} />
        </div>
      </div>
      <ProjectsReturnLink />
      <div className="projectDetailContact">
        <ContactBanner
          id="project-detail-contact-title"
          {...projectDetailBanner}
          {...projectDetailContactActions(siteContent.mobileMenu.contacts.whatsapp, siteContent.contact)}
        />
      </div>
    </SiteFrame>
  );
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = requirePublishedProject(portfolioProjects, slug);
  return <ProjectDetailPageView project={project} />;
}
