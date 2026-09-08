import Image from "next/image";
import { BotanicalDecoration } from "../../_components/Brand";
import { LineIcon } from "../../_components/LineIcon";
import { SectionHeading, SupportingCopy } from "../../_components/Typography";
import type { AboutFounderContent } from "../aboutContent";

export function FounderSection({ content }: { content: AboutFounderContent }) {
  return (
    <section className="founderSection" aria-labelledby="fundadora-title" data-region="founder">
      <BotanicalDecoration className="founderSection__decoration" position="left" />
      <div className="aboutSectionInner founderSection__layout">
        <div className="founderSection__intro">
          <SectionHeading
            id="fundadora-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
            context="onDark"
          />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
          <div className="founderIdentity">
            <strong>{content.name}</strong>
            <span>{content.role}</span>
            {content.registration ? <small>{content.registration}</small> : null}
          </div>
        </div>
        {content.portrait.status === "configured" ? (
          <figure className="founderPortrait">
            <Image
              src={content.portrait.media.src}
              alt={content.portrait.media.alt}
              fill
              sizes={content.portrait.media.sizes}
              style={{ objectPosition: content.portrait.media.position }}
            />
          </figure>
        ) : (
          <figure className="founderPortrait founderPortrait--unavailable" role="img" aria-label={content.portrait.message}>
            <LineIcon name="leaf" size="lg" />
            <figcaption>{content.portrait.message}</figcaption>
          </figure>
        )}
        <ul className="credentialsList" aria-label="Credenciais profissionais">
          {content.credentials.map((credential) => (
            <li key={credential.id}>
              <span className="credentialIcon" aria-hidden="true">
                <LineIcon name={credential.icon} />
              </span>
              <span>
                <strong>{credential.label}</strong>
                <small>{credential.detail}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
