import { BotanicalDecoration, BrandEmblem } from "./Brand";
import { ContactButton } from "./ButtonLink";
import type { TextFragment } from "./Typography";

export interface ContactBannerProps {
  id: string;
  message: readonly TextFragment[];
  contactHref: string;
  contactLabel: string;
  supportingAction?: {
    label: string;
    href: string;
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
  contactHref,
  contactLabel,
  supportingAction,
}: ContactBannerProps) {
  return (
    <section className="contactBanner" aria-labelledby={id} data-region="contact">
      <BotanicalDecoration position="left" />
      <BrandEmblem decorative />
      <BannerMessage id={id} fragments={message} />
      <div className="contactBanner__actions">
        <ContactButton href={contactHref} label={contactLabel} />
        {supportingAction ? (
          <a className="contactBanner__supporting" href={supportingAction.href}>
            {supportingAction.label} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
