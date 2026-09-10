import { FooterBrand } from "./Brand";
import { LineIcon, type LineIconName } from "./LineIcon";

export interface FooterLink {
  label: string;
  href: string;
  icon?: LineIconName;
}

export interface FooterNavGroupData {
  label: string;
  links: readonly FooterLink[];
}

export interface SocialLink extends FooterLink {
  icon: Extract<LineIconName, "instagram" | "youtube" | "message">;
}

export interface LegalContent {
  copyright: string;
  credit: string;
  creditHref: string;
}

export interface FooterNavGroupProps extends FooterNavGroupData {
  index: number;
  currentPath?: string;
}

export function FooterNavGroup({ label, links, index, currentPath }: FooterNavGroupProps) {
  return (
    <nav className="footerNavGroup" aria-labelledby={`footer-group-${index}`}>
      <h2 id={`footer-group-${index}`}>{label}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} aria-current={currentPath && !link.href.includes("#") && link.href.split("?")[0] === currentPath.split("?")[0] ? "page" : undefined}>
              {link.icon ? <LineIcon name={link.icon} size="sm" /> : null}{link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SocialLinks({ links }: { links: readonly SocialLink[] }) {
  return (
    <nav className="socialLinks" aria-label="Redes sociais e contato rápido">
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noreferrer"
            >
              <LineIcon name={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LegalBar({ content }: { content: LegalContent }) {
  return (
    <div className="legalBar">
      <p>{content.copyright}</p>
      <p>
        Desenvolvido com <span aria-label="carinho">♥</span> por{" "}
        <a href={content.creditHref}>{content.credit}</a>
      </p>
    </div>
  );
}

export interface SiteFooterProps {
  currentPath?: string;
  description: string;
  groups: readonly FooterNavGroupData[];
  socialLinks: readonly SocialLink[];
  legal: LegalContent;
}

export function SiteFooter({ description, groups, socialLinks, legal, currentPath }: SiteFooterProps) {
  return (
    <footer className="siteFooter" data-region="footer">
      <div className="siteFooter__grid">
        <FooterBrand description={description}>
          <SocialLinks links={socialLinks} />
        </FooterBrand>
        {groups.map((group, index) => (
          <FooterNavGroup {...group} currentPath={currentPath} index={index} key={group.label} />
        ))}
      </div>
      <LegalBar content={legal} />
    </footer>
  );
}
