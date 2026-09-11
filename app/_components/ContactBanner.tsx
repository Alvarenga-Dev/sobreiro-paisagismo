import { BrandEmblem } from "./Brand";
import { ButtonLink, ContactButton } from "./ButtonLink";
import { LineIcon, type LineIconName } from "./LineIcon";
import { SupportingCopy, type TextFragment } from "./Typography";

export interface ContactBannerProps {
  id: string;
  message: readonly TextFragment[];
  description?: string;
  contactHref: string;
  contactLabel: string;
  contactIcon?: LineIconName;
  contactIconSize?: "sm" | "md" | "lg";
  contactExternal?: boolean;
  supportingAction?: {
    label: string;
    href: string;
    presentation?: "text" | "outline";
    icon?: LineIconName;
  };
}

function BannerMessage({ id, fragments }: { id: string; fragments: readonly TextFragment[] }) {
  return (
    <h2 className="bannerMessage" id={id}>
      {fragments.map((fragment, index) => (
        <span className={fragment.accent ? "textAccent" : undefined} key={`${fragment.text}-${index}`}>
          {fragment.text}
        </span>
      ))}
    </h2>
  );
}

export function ContactBanner({
  id,
  message,
  description,
  contactHref,
  contactLabel,
  contactIcon,
  contactIconSize,
  contactExternal,
  supportingAction,
}: ContactBannerProps) {
  return (
    <section className="contactBanner" aria-labelledby={id} data-region="contact">
      <BrandEmblem
        artwork="flower"
        flowerTone="light"
        className="contactBanner__decoration"
        decorative
      />
      {description ? (
        <div className="contactBanner__message">
          <BannerMessage id={id} fragments={message} />
          <SupportingCopy context="onDark">{description}</SupportingCopy>
        </div>
      ) : <BannerMessage id={id} fragments={message} />}
      <div className="contactBanner__actions">
        <ContactButton
          href={contactHref}
          label={contactLabel}
          icon={contactIcon}
          iconSize={contactIconSize}
          external={contactExternal}
        />
        {supportingAction?.presentation === "outline" ? (
          <ButtonLink
            href={supportingAction.href}
            variant="outlineInverse"
            leadingIcon={supportingAction.icon ? <LineIcon name={supportingAction.icon} decorative /> : undefined}
          >
            {supportingAction.label}
          </ButtonLink>
        ) : supportingAction ? (
          <a className="contactBanner__supporting" href={supportingAction.href}>
            {supportingAction.label} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
