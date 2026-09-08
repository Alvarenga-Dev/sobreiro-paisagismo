import type { FooterNavGroupData, LegalContent, SocialLink } from "../_components/SiteFooter";

const contactHref = "mailto:contato@sobreiro.com.br";
const footerDescription =
  "Projetos de paisagismo que conectam natureza, bem-estar e estilo de vida.";
const footerSocialLinks = [
  { label: "Instagram da Sobreiro", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "Enviar mensagem para a Sobreiro", href: contactHref, icon: "message" },
] satisfies readonly SocialLink[];
const footerLegal = {
  copyright: "© 2026 Sobreiro Paisagismo. Todos os direitos reservados.",
  credit: "Alvarenga",
  creditHref: "https://alvarenga.dev/",
} satisfies LegalContent;

const homeFooterGroups = [
  {
    label: "Navegação",
    links: [
      { label: "Início", href: "#inicio" },
      { label: "Sobre", href: "#sobre" },
      { label: "Projetos", href: "#projetos" },
      { label: "Por que um projeto?", href: "#beneficios" },
    ],
  },
  {
    label: "Fale conosco",
    links: [
      { label: "contato@sobreiro.com.br", href: contactHref },
      { label: "Rio de Janeiro, RJ", href: "#contato" },
    ],
  },
] satisfies readonly FooterNavGroupData[];

const internalFooterGroups = [
  {
    label: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Sobre", href: "/sobre" },
      { label: "Projetos", href: "/#projetos" },
      { label: "Por que um projeto?", href: "/#beneficios" },
    ],
  },
  {
    label: "Fale conosco",
    links: [
      { label: "contato@sobreiro.com.br", href: contactHref },
      { label: "Rio de Janeiro, RJ", href: "/#contato" },
    ],
  },
] satisfies readonly FooterNavGroupData[];

export const siteContent = {
  contact: {
    href: contactHref,
    label: "Fale com a Sobreiro",
    email: "contato@sobreiro.com.br",
  },
  footer: {
    description: footerDescription,
    groups: homeFooterGroups,
    socialLinks: footerSocialLinks,
    legal: footerLegal,
  },
  internalFooter: {
    description: footerDescription,
    groups: internalFooterGroups,
    socialLinks: footerSocialLinks,
    legal: footerLegal,
  },
} as const;
