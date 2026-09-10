import Image from "next/image";
import { BotanicalDecoration } from "../../_components/Brand";
import { LineIcon } from "../../_components/LineIcon";
import { SectionHeading, SupportingCopy } from "../../_components/Typography";
import type { AboutTeamContent } from "../aboutContent";

export function TeamProfileSection({ content }: { content: AboutTeamContent }) {
  return (
    <section
      className="teamProfileSection"
      aria-labelledby="equipe-title"
      data-region="team-profile"
    >
      <BotanicalDecoration className="teamProfileSection__decoration" position="left" />
      <div className="aboutSectionInner teamProfileSection__layout">
        <div className="teamProfileSection__intro">
          <SectionHeading
            id="equipe-title"
            eyebrow={content.eyebrow}
            fragments={content.title}
            context="onDark"
          />
          <SupportingCopy context="onDark">{content.introduction}</SupportingCopy>
          <div className="teamIdentity">
            <strong>{content.identity}</strong>
            <span>{content.role}</span>
          </div>
        </div>

        <div className="teamMediaComposite">
          {content.media.status === "configured" ? (
            <figure className="teamMedia" data-media-status="configured">
              <Image
                src={content.media.media.src}
                alt={content.media.media.alt}
                fill
                sizes={content.media.media.sizes}
                style={{ objectPosition: content.media.media.position }}
              />
            </figure>
          ) : (
            <div className="teamMedia teamMedia--unavailable" data-media-status="unavailable">
              <span aria-hidden="true">
                <LineIcon name="leaf" size="lg" />
              </span>
              <p>{content.media.message}</p>
            </div>
          )}
          <p className="teamMediaCallout">{content.media.callout}</p>
        </div>

        <ul className="credentialsList" aria-label="Credenciais da equipe">
          {content.credentials.map((credential) => (
            <li key={credential.id} data-editorial-status={credential.status}>
              <span className="credentialIcon" aria-hidden="true">
                <LineIcon name={credential.icon} />
              </span>
              <span>
                <strong>{credential.label}</strong>
                <small>
                  {credential.status === "approved"
                    ? credential.detail
                    : credential.pendingMessage}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
