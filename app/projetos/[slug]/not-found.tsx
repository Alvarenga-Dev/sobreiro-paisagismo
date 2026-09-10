import Link from "next/link";
import { SiteFooter } from "../../_components/SiteFooter";
import { SiteFrame } from "../../_components/SiteFrame";
import { siteContent } from "../../_content/siteContent";

export default function ProjectNotFound() {
  return (
    <SiteFrame
      variant="fullBleed"
      footer={<SiteFooter {...siteContent.internalFooter} currentPath="/projetos" />}
    >
      <section className="projectDetailNotFound" aria-labelledby="project-not-found-title">
        <div>
          <p className="projectDetailNotFound__eyebrow">Portfólio</p>
          <h1 id="project-not-found-title">Projeto não encontrado</h1>
          <p>Este projeto não está disponível. Explore outros trabalhos no nosso portfólio.</p>
          <Link href="/projetos">Voltar para projetos</Link>
        </div>
      </section>
    </SiteFrame>
  );
}
