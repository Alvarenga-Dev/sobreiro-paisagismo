import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DisplayHeading, SupportingCopy, type TextFragment } from "../../../_components/Typography";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";

export interface ProjectDetailHeroProps {
  readonly title: string;
  readonly category: string;
  readonly summary: string;
  readonly titleAccent?: string;
  readonly media: PortfolioImage;
  readonly heroAlt: string;
}

interface ProjectDetailHeroImageStyle extends CSSProperties {
  readonly "--project-detail-image-position": string;
  readonly "--project-detail-image-position-mobile": string;
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
  media,
  heroAlt,
}: ProjectDetailHeroProps) {
  const imageStyle: ProjectDetailHeroImageStyle = {
    "--project-detail-image-position": media.position ?? "center center",
    "--project-detail-image-position-mobile": media.positionMobile ?? media.position ?? "center center",
  };

  return (
    <section className="projectDetailHero" aria-labelledby="project-detail-title">
      <Image
        className="projectDetailHero__image"
        src={media.src}
        alt={heroAlt}
        width={media.width}
        height={media.height}
        sizes="100vw"
        priority
        style={imageStyle}
      />
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
          <SupportingCopy context="onDark" className="projectDetailHero__summary">
            {summary}
          </SupportingCopy>
        </div>
      </div>
    </section>
  );
}
