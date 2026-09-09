import { BrandLockup, BotanicalDecoration } from "./Brand";
import { ButtonLink } from "./ButtonLink";
import { LineIcon, type LineIconName } from "./LineIcon";
import type { ConfiguredContact, MobileMenuContent, MobileNavigationItem } from "../_content/siteContent";

export interface MobileMenuItemProps {
  item: MobileNavigationItem;
  active?: boolean;
}

export function MobileMenuItem({ item, active = false }: MobileMenuItemProps) {
  return (
    <li className="mobileMenu__item">
      <a className="mobileMenu__link" href={item.href} aria-current={active ? "page" : undefined}>
        <LineIcon name={item.icon} size="md" aria-hidden="true" />
        <span>{item.label}</span>
        <LineIcon name="chevronRight" size="sm" aria-hidden="true" />
      </a>
    </li>
  );
}

function ContactAction({ contact, children, icon, variant }: {
  contact: ConfiguredContact;
  children: string;
  icon: LineIconName;
  variant: "accent" | "outlineInverse";
}) {
  if (contact.status !== "configured") return null;
  return (
    <ButtonLink href={contact.href} variant={variant} size="lg" className="mobileMenu__contact" leadingIcon={<LineIcon name={icon} />}>
      {children}
    </ButtonLink>
  );
}

export interface MobileMenuProps {
  content: MobileMenuContent;
  activeId: MobileNavigationItem["id"];
  onClose: () => void;
  onCancel: (event: React.SyntheticEvent<HTMLDialogElement>) => void;
  onBackdropClick: (event: React.MouseEvent<HTMLDialogElement>) => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  phase: "opening" | "open" | "closing";
  onKeyDown: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
}

export function MobileMenu({ content, activeId, onClose, onCancel, onBackdropClick, dialogRef, closeButtonRef, phase, onKeyDown }: MobileMenuProps) {
  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu-panel"
      className={`mobileMenu mobileMenu--${phase}`}
      aria-label="Menu principal"
      onCancel={onCancel}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
    >
      <div className="mobileMenu__panel" role="document">
        <button ref={closeButtonRef} className="mobileMenu__close" type="button" aria-label="Fechar menu" onClick={onClose}>
          <LineIcon name="close" />
        </button>
        <div className="mobileMenu__brand">
          <BrandLockup presentation="stacked" />
        </div>
        <nav aria-label="Navegação principal">
          <ul className="mobileMenu__list">
            {content.navigation.map((item) => <MobileMenuItem key={item.id} item={item} active={item.id === activeId} />)}
          </ul>
        </nav>
        <div className="mobileMenu__contacts">
          <ContactAction contact={content.contacts.whatsapp} icon="message" variant="accent">Fale no WhatsApp</ContactAction>
          <ContactAction contact={content.contacts.phone} icon="phone" variant="outlineInverse">Ligar para nós</ContactAction>
        </div>
        <footer className="mobileMenu__editorial">
          <h2>{content.editorial.invitation.replace(content.editorial.invitationAccent, "")}
            <span>{content.editorial.invitationAccent}</span>
          </h2>
          <p>{content.editorial.primaryStatement}</p>
          <BotanicalDecoration className="mobileMenu__decoration" position="right" />
          <p>{content.editorial.secondaryStatement}</p>
        </footer>
      </div>
    </dialog>
  );
}
