import { CardSurface } from "../../../_components/CardSurface";
import { LineIcon } from "../../../_components/LineIcon";
import { SectionHeading } from "../../../_components/Typography";
import type { ProjectSolution } from "../../../_content/portfolioCatalog";

export interface AppliedSolutionsProps {
  readonly solutions?: readonly ProjectSolution[];
}

export function AppliedSolutions({ solutions }: AppliedSolutionsProps) {
  if (!solutions?.length) return null;

  return (
    <section className="projectDetailSolutions" aria-labelledby="project-solutions-title">
      <SectionHeading
        id="project-solutions-title"
        fragments={[{ text: "Soluções " }, { text: "aplicadas", accent: true }]}
      />
      <ul>
        {solutions.map((solution) => (
          <li key={solution.id}>
            <CardSurface className="projectDetailSolutionCard">
              <LineIcon name={solution.icon} size="lg" decorative />
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </CardSurface>
          </li>
        ))}
      </ul>
    </section>
  );
}
