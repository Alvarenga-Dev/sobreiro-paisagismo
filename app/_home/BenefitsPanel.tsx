import { CardSurface } from "../_components/CardSurface";
import { LineIcon } from "../_components/LineIcon";
import { SectionHeading, type TextFragment } from "../_components/Typography";
import type { BenefitContent } from "./homeContent";

export interface BenefitCardProps {
  benefit: BenefitContent;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <li className="benefitCard">
      <CardSurface className="benefitCard__surface">
        <LineIcon name={benefit.icon} size="lg" />
        <h3>{benefit.title}</h3>
        <p>{benefit.description}</p>
      </CardSurface>
    </li>
  );
}

export interface BenefitsPanelProps {
  heading: readonly TextFragment[];
  benefits: readonly BenefitContent[];
}

export function BenefitsPanel({ heading, benefits }: BenefitsPanelProps) {
  return (
    <section className="benefitsPanel" id="beneficios" aria-labelledby="beneficios-title" data-region="benefits">
      <SectionHeading id="beneficios-title" fragments={heading} context="onLight" />
      <ul className="benefitsPanel__list" aria-label="Benefícios do paisagismo">
        {benefits.map((benefit) => <BenefitCard benefit={benefit} key={benefit.id} />)}
      </ul>
    </section>
  );
}
