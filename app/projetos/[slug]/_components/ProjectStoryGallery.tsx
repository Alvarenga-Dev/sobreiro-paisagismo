import type { PortfolioImage, PortfolioProjectDetails } from "../../../_content/portfolioCatalog";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectNarrative } from "./ProjectNarrative";

export interface ProjectStoryGalleryProps {
  readonly details?: PortfolioProjectDetails;
  readonly images: readonly PortfolioImage[];
}

export function ProjectStoryGallery({ details, images }: ProjectStoryGalleryProps) {
  const narrativeHeading = details?.introHeading ?? details?.statement;
  const hasNarrative = narrativeHeading !== undefined;
  if (!hasNarrative && images.length === 0) return null;

  return (
    <div
      className={`projectStoryGallery${hasNarrative ? " projectStoryGallery--withNarrative" : ""}`}
      data-has-narrative={hasNarrative ? "true" : "false"}
    >
      <ProjectNarrative heading={narrativeHeading} body={details?.body} />
      <ProjectGallery images={images} hasNarrative={hasNarrative} />
    </div>
  );
}
