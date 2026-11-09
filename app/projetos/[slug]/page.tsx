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
import { ProjectNarrative } from "./_components/ProjectNarrative";
import { ProjectsReturnLink } from "./_components/ProjectsReturnLink";
import { projectDetailBanner, projectDetailContactActions } from "./projectDetailContent";
import { prepareProjectDetailMedia } from "./projectDetailMedia";

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
  const galleryImages = prepareProjectDetailMedia(project.hero, project.images);
  const narrativeHeading = project.details?.introHeading ?? project.details?.statement;
  const hasStorySurface = narrativeHeading !== undefined || Boolean(project.details?.solutions?.length);

  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} currentPath="/projetos" />}
    >
      <ProjectDetailHero
        title={project.title}
        category={project.category}
        summary={project.summary}
        titleAccent={project.details?.titleAccent}
      />
      <ProjectGallery key={project.id} images={galleryImages} />
      {hasStorySurface ? (
        <div className="projectDetailSurface">
          <div className="projectDetailInner">
            <ProjectNarrative heading={narrativeHeading} body={project.details?.body} />
            <AppliedSolutions solutions={project.details?.solutions} />
          </div>
        </div>
      ) : null}
      <ProjectsReturnLink />
      <div className="projectDetailContact">
        <ContactBanner
          id="project-detail-contact-title"
          {...projectDetailBanner}
          {...projectDetailContactActions(siteContent.mobileMenu.contacts.whatsapp, siteContent.contact, siteContent.email)}
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
