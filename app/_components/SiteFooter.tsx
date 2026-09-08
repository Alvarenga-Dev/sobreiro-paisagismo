import { FooterBrand } from "./Brand";
import { LineIcon, type LineIconName } from "./LineIcon";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterNavGroupData {
  label: string;
  links: readonly FooterLink[];
}

export interface SocialLink extends FooterLink {
  icon: Extract<LineIconName, "instagram" | "message">;
}

export interface LegalContent {
  copyright: string;
  credit: string;
  creditHref: string;
}

export interface FooterNavGroupProps extends FooterNavGroupData {
  index: number;
}

export function FooterNavGroup({ label, links, index }: FooterNavGroupProps) {
  return (
    <nav className="footerNavGroup" aria-labelledby={`footer-group-${index}`}>
      <h2 id={`footer-group-${index}`}>{label}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
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
            <a href={link.href} aria-label={link.label}>
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
  description: string;
  groups: readonly FooterNavGroupData[];
  socialLinks: readonly SocialLink[];
  legal: LegalContent;
}

export function SiteFooter({ description, groups, socialLinks, legal }: SiteFooterProps) {
  return (
    <footer className="siteFooter" data-region="footer">
      <div className="siteFooter__grid">
        <FooterBrand description={description}>
          <SocialLinks links={socialLinks} />
        </FooterBrand>
        {groups.map((group, index) => (
          <FooterNavGroup {...group} index={index} key={group.label} />
        ))}
      </div>
      <LegalBar content={legal} />
    </footer>
  );
}
