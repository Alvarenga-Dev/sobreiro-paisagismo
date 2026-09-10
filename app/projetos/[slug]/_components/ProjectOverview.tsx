import { SectionHeading, SupportingCopy } from "../../../_components/Typography";

export interface ProjectOverviewProps {
  readonly summary: string;
  readonly statement?: string;
}

export function ProjectOverview({ summary, statement }: ProjectOverviewProps) {
  return (
    <section
      className={`projectDetailOverview${statement ? "" : " projectDetailOverview--withoutStatement"}`}
      aria-labelledby="project-overview-title"
    >
      <div className="projectDetailOverview__copy">
        <SectionHeading
          id="project-overview-title"
          fragments={[{ text: "Sobre o " }, { text: "projeto", accent: true }]}
        />
        <SupportingCopy>{summary}</SupportingCopy>
      </div>
      {statement ? <blockquote className="projectDetailStatement">{statement}</blockquote> : null}
    </section>
  );
}
