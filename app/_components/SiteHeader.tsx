import { BrandLockup } from "./Brand";
import { ContactButton } from "./ButtonLink";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { configuredWhatsAppHref } from "./navigation";
import { siteContent } from "../_content/siteContent";
import type { ConfiguredContact, MobileMenuContent, NavigationItem } from "../_content/siteContent";

export interface SiteHeaderProps {
  navigation?: readonly NavigationItem[];
  mobileMenu?: MobileMenuContent;
  whatsapp?: ConfiguredContact;
}

export function SiteHeader({
  navigation = siteContent.navigation,
  mobileMenu = siteContent.mobileMenu,
  whatsapp = siteContent.contact,
}: SiteHeaderProps) {
  const whatsappHref = configuredWhatsAppHref(whatsapp);

  return (
    <header
      className="siteHeader siteHeader--floating"
      data-region="header"
      data-presentation="floating"
      data-has-action={whatsappHref ? "true" : "false"}
    >
      <BrandLockup compact emblem="flower" />
      <DesktopNavigation navigation={navigation} />
      {whatsappHref ? (
        <ContactButton
          className="siteHeader__contact"
          href={whatsappHref}
          label="Fale com a Sobreiro"
          icon="whatsapp"
          iconSize="sm"
          external
        />
      ) : null}
      <MobileNavigation content={mobileMenu} navigation={navigation} />
    </header>
  );
}
