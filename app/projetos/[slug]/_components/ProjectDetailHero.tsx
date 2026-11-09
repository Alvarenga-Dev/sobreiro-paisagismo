import Link from "next/link";
import { DisplayHeading, SupportingCopy, type TextFragment } from "../../../_components/Typography";

export interface ProjectDetailHeroProps {
  readonly title: string;
  readonly category: string;
  readonly summary: string;
  readonly titleAccent?: string;
}

function titleFragments(title: string, titleAccent?: string): readonly TextFragment[] {
  if (!titleAccent) return [{ text: title }];
  const accentStart = title.indexOf(titleAccent);
  if (accentStart < 0) return [{ text: title }];

  const before = title.slice(0, accentStart);
  const after = title.slice(accentStart + titleAccent.length);
  return [
    ...(before ? [{ text: before }] : []),
    { text: titleAccent, accent: true },
    ...(after ? [{ text: after }] : []),
  ];
}

export function ProjectDetailHero({
  title,
  category,
  summary,
  titleAccent,
}: ProjectDetailHeroProps) {
  return (
    <section className="projectDetailHero" aria-labelledby="project-detail-title">
      <div className="projectDetailHero__inner">
        <nav className="projectDetailBreadcrumb" aria-label="Navegação estrutural">
          <ol>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/projetos">Projetos</Link></li>
            <li className="projectDetailBreadcrumb__current" aria-current="page">{title}</li>
          </ol>
        </nav>
        <div className="projectDetailHero__editorial">
          <p className="projectDetailHero__eyebrow">{category}</p>
          <DisplayHeading id="project-detail-title" fragments={titleFragments(title, titleAccent)} />
          <SupportingCopy className="projectDetailHero__summary">
            {summary}
          </SupportingCopy>
        </div>
      </div>
    </section>
  );
}
