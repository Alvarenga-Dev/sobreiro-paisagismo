import type { LineIconName } from "../_components/LineIcon";
import type { TextFragment } from "../_components/Typography";
import { siteContent } from "../_content/siteContent";
import { homeFeaturedProjects } from "../_content/portfolioCatalog";

export interface BenefitContent {
  id: string;
  icon: Extract<LineIconName, "droplet" | "leaf" | "lotus" | "shield" | "sun">;
  title: string;
  description: string;
}

export interface HeroContentData {
  eyebrow: string;
  title: readonly TextFragment[];
  description: string;
  media: {
    src: string;
    alt: string;
    position: string;
  };
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

export interface AboutContentData {
  eyebrow: string;
  title: readonly TextFragment[];
  description: string;
  action: {
    label: string;
    href: string;
  };
  media: {
    src: string;
    alt: string;
    position: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const homeContent = {
  contact: siteContent.contact,
  hero: {
    eyebrow: "Paisagismo autoral",
    title: [
      { text: "Transformamos ambientes em " },
      { text: "experiências", accent: true },
      { text: "." },
    ],
    description:
      "Projetos de paisagismo que unem estética, funcionalidade e bem-estar para valorizar cada detalhe do seu espaço.",
    media: {
      src: "/images/portfolio/hero.png",
      alt: "Caminho envolvido por um jardim tropical iluminado",
      position: "58% center",
    },
    primaryAction: {
      label: "Fale com a Sobreiro",
      href: siteContent.contact.href,
    },
    secondaryAction: {
      label: "Ver projetos",
      href: "#projetos",
    },
  } satisfies HeroContentData,
  benefitsHeading: [
    { text: "Por que investir em um " },
    { text: "projeto de paisagismo?", accent: true },
  ] satisfies readonly TextFragment[],
  benefits: [
    {
      id: "valor",
      icon: "leaf",
      title: "Valorização do imóvel",
      description: "Um projeto bem planejado amplia o valor e o potencial de cada espaço.",
    },
    {
      id: "bem-estar",
      icon: "lotus",
      title: "Bem-estar",
      description: "Ambientes verdes reduzem o estresse e convidam a viver com mais presença.",
    },
    {
      id: "conforto",
      icon: "droplet",
      title: "Conforto térmico",
      description: "A vegetação ajuda a amenizar o calor e torna os ambientes mais agradáveis.",
    },
    {
      id: "funcionalidade",
      icon: "shield",
      title: "Funcionalidade",
      description: "Cada escolha é pensada para um jardim bonito, prático e duradouro.",
    },
    {
      id: "identidade",
      icon: "sun",
      title: "Identidade",
      description: "Texturas, luz e espécies traduzem a personalidade de quem habita o lugar.",
    },
  ] satisfies readonly BenefitContent[],
  projectsHeading: [
    { text: "Ambientes que " },
    { text: "inspiram", accent: true },
  ] satisfies readonly TextFragment[],
  projects: homeFeaturedProjects,
  about: {
    eyebrow: "Sobre a Sobreiro",
    title: [
      { text: "Paixão por natureza, " },
      { text: "atenção a cada detalhe.", accent: true },
    ],
    description:
      "Acreditamos que o paisagismo vai muito além da estética. Ele transforma ambientes, melhora a qualidade de vida e cria conexões duradouras com a natureza.",
    action: {
      label: "Conheça nossa história",
      href: "/sobre",
    },
    media: {
      src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=86",
      alt: "Profissional de paisagismo cuidando de um jardim",
      position: "center",
    },
    quote: {
      text: "Cada jardim começa pela escuta: do lugar, da arquitetura e de quem vai vivê-lo.",
      author: "Sobreiro Paisagismo",
      role: "Estúdio de paisagismo",
    },
  } satisfies AboutContentData,
  banner: {
    message: [
      { text: "Vamos transformar " },
      { text: "seu espaço", accent: true },
      { text: " juntos?" },
    ] satisfies readonly TextFragment[],
    supportingAction: {
      label: "Agende uma conversa",
      href: siteContent.contact.href,
    },
  },
  footer: siteContent.footer,
} as const;
