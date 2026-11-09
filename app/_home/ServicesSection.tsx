import { SectionHeading, SupportingCopy } from "../_components/Typography";
import type { homeContent } from "./homeContent";

interface ServicesSectionProps {
  content: typeof homeContent.services;
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="homeServices" id="servicos" aria-labelledby="servicos-title">
      <div className="homeServices__inner">
        <SectionHeading id="servicos-title" eyebrow={content.eyebrow} fragments={content.heading} />
        <SupportingCopy className="homeServices__intro">{content.introduction}</SupportingCopy>
        <ul className="homeServices__list" role="list">
          {content.items.map((service) => (
            <li className="homeServices__item" key={service.title}>
              <h3>{service.title}</h3>
              <p className="homeServices__question">{service.question}</p>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
