import { BrandEmblem } from "../../_components/Brand";
import { CardSurface } from "../../_components/CardSurface";
import { LineIcon } from "../../_components/LineIcon";
import { SectionHeading, SupportingCopy } from "../../_components/Typography";
import type { AboutContactContent, ContactMethod } from "../aboutContent";

export function ContactMethodCard({ method }: { method: ContactMethod }) {
  return (
    <a
      className="contactMethodLink"
      href={method.href}
      aria-label={method.accessibleLabel}
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noreferrer" : undefined}
    >
      <CardSurface className="contactMethodCard">
        <span className="contactMethodCard__icon" aria-hidden="true">
          <LineIcon name={method.icon} size="lg" />
        </span>
        <span className="contactMethodCard__body">
          <strong>{method.title}</strong>
          <small>{method.detail}</small>
        </span>
        <LineIcon className="contactMethodCard__arrow" name="arrowRight" aria-hidden="true" />
      </CardSurface>
    </a>
  );
}

export function ContactMethodsSection({ content }: { content: AboutContactContent }) {
  return (
    <section className="contactMethodsSection" aria-labelledby="contato-sobre-title" data-region="contact-methods">
      <BrandEmblem
        artwork="flower"
        flowerTone="olive"
        className="contactMethodsSection__decoration"
        decorative
      />
      <div className="aboutSectionInner contactMethodsSection__layout">
        <SectionHeading
          id="contato-sobre-title"
          eyebrow={content.eyebrow}
          fragments={content.title}
        />
        <div className="contactMethodsSection__actions">
          <SupportingCopy>{content.introduction}</SupportingCopy>
          <ul className="contactMethodsGrid" aria-label="Métodos de contato">
            {content.methods.map((method) => <li key={method.id}><ContactMethodCard method={method} /></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
