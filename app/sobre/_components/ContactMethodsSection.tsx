import { BotanicalDecoration } from "../../_components/Brand";
import { CardSurface } from "../../_components/CardSurface";
import { LineIcon } from "../../_components/LineIcon";
import { SectionHeading } from "../../_components/Typography";
import type { AboutContactContent, ContactMethod } from "../aboutContent";

export function ContactMethodCard({ method }: { method: ContactMethod }) {
  const content = (
    <CardSurface className="contactMethodCard">
      <span className="contactMethodCard__icon" aria-hidden="true">
        <LineIcon name={method.icon} size="lg" />
      </span>
      <span className="contactMethodCard__body">
        <strong>{method.title}</strong>
        <small>{method.detail}</small>
        {method.status === "unavailable" ? <em>{method.unavailableMessage}</em> : null}
      </span>
      {method.status === "configured" ? (
        <LineIcon className="contactMethodCard__arrow" name="arrowRight" aria-hidden="true" />
      ) : null}
    </CardSurface>
  );

  return method.status === "configured" ? (
    <a className="contactMethodLink" href={method.href} aria-label={method.accessibleLabel}>
      {content}
    </a>
  ) : (
    <div className="contactMethodUnavailable" data-contact-status="unavailable">{content}</div>
  );
}

export function ContactMethodsSection({ content }: { content: AboutContactContent }) {
  return (
    <section className="contactMethodsSection" aria-labelledby="contato-sobre-title" data-region="contact-methods">
      <BotanicalDecoration className="contactMethodsSection__decoration" />
      <div className="aboutSectionInner contactMethodsSection__layout">
        <SectionHeading
          id="contato-sobre-title"
          eyebrow={content.eyebrow}
          fragments={content.title}
        />
        <ul className="contactMethodsGrid" aria-label="Métodos de contato">
          {content.methods.map((method) => <li key={method.id}><ContactMethodCard method={method} /></li>)}
        </ul>
      </div>
    </section>
  );
}
