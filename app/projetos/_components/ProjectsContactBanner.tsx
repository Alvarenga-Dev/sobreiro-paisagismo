import Image from "next/image";
import { ButtonLink, ContactButton } from "../../_components/ButtonLink";
import type { LineIconName } from "../../_components/LineIcon";
import { SectionHeading, SupportingCopy } from "../../_components/Typography";
import type { ProjectsBannerMedia } from "../projectsContent";
import type { TextFragment } from "../../_components/Typography";

export interface ProjectsContactBannerProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly message: readonly TextFragment[];
  readonly description: string;
  readonly statement: string;
  readonly media: ProjectsBannerMedia;
  readonly contactHref?: string;
  readonly contactLabel?: string;
  readonly contactIcon?: LineIconName;
  readonly contactIconSize?: "sm" | "md" | "lg";
  readonly contactExternal?: boolean;
  readonly supportingAction?: {
    readonly label: string;
    readonly href: string;
  };
}

export function ProjectsContactBanner({
  id,
  eyebrow,
  message,
  description,
  statement,
  media,
  contactHref,
  contactLabel,
  contactIcon,
  contactIconSize,
  contactExternal,
  supportingAction,
}: ProjectsContactBannerProps) {
  return (
    <section
      className={`projectsContactBanner projectsContactBanner--${media.status}`}
      aria-labelledby={id}
      data-media-status={media.status}
      data-region="contact"
    >
      {media.status === "approved" ? (
        <Image
          className="projectsContactBanner__image"
          src={media.src}
          alt={media.alt}
          fill
          sizes={media.sizes}
          style={{ objectPosition: media.position }}
        />
      ) : null}
      <div className="projectsContactBanner__inner">
        <div className="projectsContactBanner__message">
          <SectionHeading id={id} eyebrow={eyebrow} fragments={message} context="onDark" />
          <SupportingCopy context="onDark">{description}</SupportingCopy>
          {contactHref && contactLabel ? (
            <div className="projectsContactBanner__actions">
              <ContactButton
                href={contactHref}
                label={contactLabel}
                icon={contactIcon}
                iconSize={contactIconSize}
                external={contactExternal}
              />
              {supportingAction ? (
                <ButtonLink href={supportingAction.href} variant="outlineInverse">
                  {supportingAction.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : (
            <p className="projectsContactBanner__unavailable">Contato temporariamente indisponível.</p>
          )}
        </div>
        <p className="projectsContactBanner__statement">{statement}</p>
      </div>
    </section>
  );
}
