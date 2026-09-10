import Image from "next/image";
import Link from "next/link";
import { BotanicalDecoration } from "../../../_components/Brand";
import { DisplayHeading } from "../../../_components/Typography";
import type { PortfolioImage } from "../../../_content/portfolioCatalog";

export interface ProjectDetailHeroProps {
  readonly title: string;
  readonly media: PortfolioImage;
}

export function ProjectDetailHero({ title, media }: ProjectDetailHeroProps) {
  return (
    <section className="projectDetailHero" aria-labelledby="project-detail-title">
      <Image
        className="projectDetailHero__image"
        src={media.src}
        alt=""
        width={media.width}
        height={media.height}
        sizes="100vw"
        priority
        style={{ objectPosition: media.position }}
      />
      <div className="projectDetailHero__inner">
        <nav className="projectDetailBreadcrumb" aria-label="Navegação estrutural">
          <ol>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/projetos">Projetos</Link></li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <DisplayHeading id="project-detail-title" fragments={[{ text: title }]} />
        <div className="projectDetailHero__divider" aria-hidden="true">
          <BotanicalDecoration position="right" />
        </div>
      </div>
    </section>
  );
}
