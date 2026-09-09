import type { FooterNavGroupData, LegalContent, SocialLink } from "../_components/SiteFooter";
import type { LineIconName } from "../_components/LineIcon";

export type MobileNavigationItem = {
  readonly id: "home" | "about" | "projects" | "benefits" | "contact";
  readonly label: string;
  readonly href: string;
  readonly icon: Extract<LineIconName, "home" | "user" | "leaf" | "sprout" | "mail">;
};

export type ConfiguredContact =
  | { readonly status: "configured"; readonly href: string }
  | { readonly status: "unavailable" };

export interface MobileMenuContent {
  readonly navigation: readonly MobileNavigationItem[];
  readonly contacts: {
    readonly whatsapp: ConfiguredContact;
    readonly phone: ConfiguredContact;
  };
  readonly editorial: {
    readonly invitation: string;
    readonly invitationAccent: string;
    readonly primaryStatement: string;
    readonly secondaryStatement: string;
  };
}

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
      { label: "Sobre", href: "/sobre" },
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
  mobileMenu: {
    navigation: [
      { id: "home", label: "Início", href: "/", icon: "home" },
      { id: "about", label: "Sobre", href: "/sobre", icon: "user" },
      { id: "projects", label: "Projetos", href: "/#projetos", icon: "leaf" },
      { id: "benefits", label: "Por que um projeto?", href: "/#beneficios", icon: "sprout" },
      { id: "contact", label: "Contato", href: "/#contato", icon: "mail" },
    ] satisfies readonly MobileNavigationItem[],
    contacts: {
      whatsapp: { status: "unavailable" },
      phone: { status: "unavailable" },
    },
    editorial: {
      invitation: "Vamos transformar seu espaço juntos?",
      invitationAccent: "seu espaço juntos?",
      primaryStatement: "NATUREZA PLANEJADA PARA UMA VIDA MELHOR",
      secondaryStatement: "PAISAGISMO QUE CONECTA PESSOAS E HISTÓRIAS",
    },
  } satisfies MobileMenuContent,
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
