import type { LineIconName } from "../_components/LineIcon";
import type { TextFragment } from "../_components/Typography";
import { siteContent } from "../_content/siteContent";
import { homeFeaturedProjects } from "../_content/portfolioCatalog";
import { jessicaProfile } from "../_content/jessicaProfile";

export interface BenefitContent {
  id: string;
  icon: Extract<LineIconName, "droplet" | "leaf" | "lotus" | "shield" | "sun">;
  title: string;
  description: string;
}

export interface ServiceContent {
  title: string;
  question: string;
  description: string;
}

export interface HeroContentData {
  eyebrow: string;
  title: string;
  signature: string;
  description: string;
  media: {
    src: string;
    alt: string;
    position: string;
  };
  primaryAction: {
    label: string;
    href: string;
    icon: LineIconName;
    external: boolean;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

const homeContact = { ...siteContent.contact, label: "Conversar com a Sobreiro" } as const;

export const homeContent = {
  contact: homeContact,
  hero: {
    eyebrow: "Paisagismo autoral",
    title: "Projetando pra você",
    signature: "“um espaço que respira”",
    description: "Projetos de Paisagismo e Design que transformam experiências.",
    media: {
      src: "/images/portfolio/hero.png",
      alt: "Caminho envolvido por um jardim tropical iluminado",
      position: "58% center",
    },
    primaryAction: homeContact,
    secondaryAction: {
      label: "Ver serviços",
      href: "#servicos",
    },
  } satisfies HeroContentData,
  services: {
    eyebrow: "Serviços",
    heading: [{ text: "Como posso ajudar no seu espaço?" }] satisfies readonly TextFragment[],
    introduction: "Da escolha das plantas ao planejamento de um ambiente inteiro, o ponto de partida é o que você quer mudar.",
    items: [
      {
        title: "Consultoria em paisagismo",
        question: "Quer criar ou renovar um jardim?",
        description: "Receba orientação para escolher as espécies e encontrar soluções adequadas ao seu espaço.",
      },
      {
        title: "Projeto de áreas externas e interiores",
        question: "Quer planejar o espaço como um todo?",
        description: "Tenha um projeto personalizado que reúne materiais, iluminação e vegetação, conforme o ambiente e o uso.",
      },
      {
        title: "Indicação de fornecedores e profissionais",
        question: "Precisa tirar o projeto do papel?",
        description: "Tenho parceiros especializados e posso indicar fornecedores e profissionais conforme as necessidades do seu projeto.",
      },
    ] satisfies readonly ServiceContent[],
  },
  benefitsHeading: [
    { text: "O que um projeto ajuda a resolver?" },
  ] satisfies readonly TextFragment[],
  benefits: [
    {
      id: "uso",
      icon: "shield",
      title: "Espaços mais fáceis de usar",
      description: "Planeje a circulação, as áreas de descanso e os pontos de encontro conforme a sua rotina.",
    },
    {
      id: "plantas",
      icon: "leaf",
      title: "Plantas adequadas ao lugar",
      description: "Escolha espécies que façam sentido para a luz, o clima e o cuidado que você pode dedicar.",
    },
    {
      id: "integracao",
      icon: "sun",
      title: "Escolhas que funcionam juntas",
      description: "Pense em vegetação, materiais e iluminação em conjunto para que o espaço faça sentido no dia a dia.",
    },
  ] satisfies readonly BenefitContent[],
  projectsHeading: [
    { text: "Do jardim ao interior" },
  ] satisfies readonly TextFragment[],
  projects: homeFeaturedProjects,
  about: {
    ...jessicaProfile,
    introduction: "Meu ponto de partida é ouvir como você quer usar o espaço. A partir daí, penso em soluções que tragam conforto e expressem a sua personalidade. No paisagismo, valorizo espécies nativas e o que cada região oferece.",
    action: { label: "Conheça minha abordagem", href: "/sobre" },
  },
  banner: {
    message: [
      { text: "O que você quer mudar " },
      { text: "no seu espaço?", accent: true },
    ] satisfies readonly TextFragment[],
    description: "Conte onde fica o imóvel e o que você quer criar ou renovar. A partir daí, podemos conversar sobre o tipo de ajuda que faz sentido para você.",
  },
  footer: siteContent.footer,
} as const;
