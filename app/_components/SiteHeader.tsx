import { BrandLockup } from "./Brand";
import { ButtonLink } from "./ButtonLink";
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
  whatsapp = siteContent.mobileMenu.contacts.whatsapp,
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
        <ButtonLink className="siteHeader__contact" href={whatsappHref}>
          Fale no WhatsApp
        </ButtonLink>
      ) : null}
      <MobileNavigation content={mobileMenu} navigation={navigation} />
    </header>
  );
}
