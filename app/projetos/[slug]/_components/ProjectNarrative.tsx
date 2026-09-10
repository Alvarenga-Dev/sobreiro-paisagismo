import { SectionHeading } from "../../../_components/Typography";

export interface ProjectNarrativeProps {
  readonly heading?: string;
  readonly body?: readonly string[];
}

export function ProjectNarrative({ heading, body }: ProjectNarrativeProps) {
  if (!heading) return null;

  return (
    <section
      className="projectDetailNarrative"
      aria-labelledby="project-narrative-title"
    >
      <SectionHeading
        id="project-narrative-title"
        eyebrow="Sobre o projeto"
        fragments={[{ text: heading }]}
      />
      {body?.length ? (
        <div className="projectDetailNarrative__body">
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ) : null}
    </section>
  );
}
