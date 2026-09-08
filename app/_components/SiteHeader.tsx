import { BrandLockup } from "./Brand";
import { ContactButton } from "./ButtonLink";
import { MenuTrigger } from "./MenuTrigger";

export interface SiteHeaderProps {
  contactHref?: string;
  contactLabel?: string;
  presentation?: "standard" | "floating";
  showContact?: boolean;
}

export function SiteHeader({
  contactHref,
  contactLabel,
  presentation = "standard",
  showContact = true,
}: SiteHeaderProps) {
  const hasContact = showContact && contactHref && contactLabel;

  return (
    <header
      className={`siteHeader siteHeader--${presentation}`}
      data-region="header"
      data-presentation={presentation}
    >
      <BrandLockup compact />
      <div className="siteHeader__actions">
        {hasContact ? (
          <ContactButton className="siteHeader__contact" href={contactHref} label={contactLabel} />
        ) : null}
        <MenuTrigger disabled />
      </div>
    </header>
  );
}
