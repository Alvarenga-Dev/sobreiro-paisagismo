import type { LineIconName } from "../_components/LineIcon";
import type { TextFragment } from "../_components/Typography";
import { siteContent } from "../_content/siteContent";

export interface AboutMedia {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly position: string;
  readonly status: "approved";
}

export interface AboutHeroContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly introduction: string;
  readonly statement: string;
  readonly historyLink: {
    readonly label: string;
    readonly href: `#${string}`;
  };
  readonly media: AboutMedia;
}

export interface AboutValue {
  readonly id: string;
  readonly icon: Extract<LineIconName, "leaf" | "shield" | "lotus" | "award">;
  readonly title: string;
  readonly description: string;
}

export interface AboutEssenceContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly paragraphs: readonly [string, string];
  readonly media: AboutMedia;
  readonly mediaCallout: {
    readonly title: string;
    readonly description: string;
  };
  readonly metrics: readonly AboutMetric[];
  readonly values: readonly AboutValue[];
}

interface AboutMetricBase {
  readonly id: string;
}

export interface ApprovedAboutMetric extends AboutMetricBase {
  readonly status: "approved";
  readonly value: string;
  readonly label: string;
}

export interface PendingAboutMetric extends AboutMetricBase {
  readonly status: "pendingApproval";
  readonly candidateValue: string;
  readonly candidateLabel: string;
}

export type AboutMetric = ApprovedAboutMetric | PendingAboutMetric;

interface AboutCredentialBase {
  readonly id: string;
  readonly icon: Extract<LineIconName, "graduationCap" | "award" | "leaf" | "users">;
  readonly label: string;
}

export interface ApprovedAboutCredential extends AboutCredentialBase {
  readonly status: "approved";
  readonly detail: string;
}

export interface PendingAboutCredential extends AboutCredentialBase {
  readonly status: "pendingApproval";
  readonly pendingMessage: string;
}

export type AboutCredential = ApprovedAboutCredential | PendingAboutCredential;

export type TeamMediaContent =
  | {
      readonly status: "configured";
      readonly media: AboutMedia;
      readonly callout: string;
    }
  | {
      readonly status: "unavailable";
      readonly message: string;
      readonly callout: string;
    };

export interface AboutTeamContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly introduction: string;
  readonly identity: string;
  readonly role: string;
  readonly media: TeamMediaContent;
  readonly credentials: readonly AboutCredential[];
}

export interface ContactMethod {
  readonly id: string;
  readonly icon: Extract<LineIconName, "whatsapp" | "mail">;
  readonly title: string;
  readonly detail: string;
  readonly href: string;
  readonly accessibleLabel: string;
  readonly external?: boolean;
}

export interface AboutContactContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly introduction: string;
  readonly methods: readonly ContactMethod[];
}

// Pontos únicos de substituição: imagens provisórias e conteúdo editorial ainda
// dependente de aprovação permanecem identificados pelos estados tipados abaixo.
export const aboutContent = {
  hero: {
    eyebrow: "Sobre",
    title: [
      { text: "Sobre a " },
      { text: "Sobreiro Paisagismo", accent: true },
    ],
    introduction:
      "Acreditamos que o paisagismo vai muito além da estética. Ele transforma ambientes, melhora a qualidade de vida e conecta pessoas à natureza.",
    statement: "Paisagens que inspiram vidas melhores.",
    historyLink: {
      label: "Conheça nossa história",
      href: "#essencia",
    },
    media: {
      src: "/images/portfolio/hero.png",
      alt: "",
      width: 2000,
      height: 1328,
      sizes: "100vw",
      position: "62% center",
      status: "approved",
    },
  } satisfies AboutHeroContent,
  essence: {
    eyebrow: "Nossa essência",
    title: [
      { text: "Design com propósito, " },
      { text: "natureza com intenção.", accent: true },
    ],
    paragraphs: [
      "Cada projeto é pensado de forma única, respeitando as características do espaço, os desejos de cada cliente e o equilíbrio com o meio ambiente.",
      "Nossos compromissos e valores guiam cada etapa do projeto — do conceito à execução — sempre com escuta ativa, criatividade e dedicação.",
    ],
    media: {
      src: "/images/portfolio/01-paisagismo-residencial/residencia-piscina-area-gourmet/04-detalhe-de-vegetacao.jpg",
      alt: "Detalhe de vegetação ornamental em projeto da Sobreiro Paisagismo",
      width: 1600,
      height: 849,
      sizes: "(max-width: 639px) 100vw, (max-width: 895px) 46vw, 42vw",
      position: "center",
      status: "approved",
    },
    mediaCallout: {
      title: "Natureza que faz sentido",
      description: "Projetos que valorizam pessoas, espaços e histórias.",
    },
    metrics: [
      {
        id: "projetos-realizados",
        status: "pendingApproval",
        candidateValue: "+100",
        candidateLabel: "projetos realizados",
      },
      {
        id: "solucoes-personalizadas",
        status: "pendingApproval",
        candidateValue: "100%",
        candidateLabel: "foco em soluções personalizadas",
      },
      {
        id: "natureza-aliada",
        status: "approved",
        value: "Natureza",
        label: "como aliada em todas as etapas",
      },
    ],
    values: [
      {
        id: "personalizacao",
        icon: "leaf",
        title: "Personalização",
        description: "Projetos exclusivos que refletem o estilo e as necessidades de cada cliente.",
      },
      {
        id: "sustentabilidade",
        icon: "shield",
        title: "Sustentabilidade",
        description: "Escolhas conscientes que respeitam a natureza e o futuro.",
      },
      {
        id: "bem-estar",
        icon: "lotus",
        title: "Bem-estar",
        description: "Ambientes que promovem conforto, harmonia e qualidade de vida.",
      },
      {
        id: "qualidade",
        icon: "award",
        title: "Qualidade",
        description: "Técnica, atenção aos detalhes e compromisso em todas as etapas do projeto.",
      },
    ],
  } satisfies AboutEssenceContent,
  team: {
    eyebrow: "Quem está por trás",
    title: [
      { text: "Paixão que floresce " },
      { text: "em cada projeto.", accent: true },
    ],
    introduction:
      "À frente da Sobreiro, Jéssica Sobreiro transforma escuta, repertório e sensibilidade para a natureza em paisagens que fazem sentido para cada pessoa.",
    identity: "Jéssica Sobreiro",
    role: "Paisagista e fundadora da Sobreiro Paisagismo",
    media: {
      status: "configured",
      media: {
        src: "/images/portfolio/profile-jess.webp",
        alt: "Jéssica Sobreiro, paisagista e fundadora da Sobreiro Paisagismo",
        width: 800,
        height: 904,
        sizes: "(max-width: 639px) 100vw, (max-width: 895px) 46vw, 34vw",
        position: "center",
        status: "approved",
      },
      callout: "Beleza, equilíbrio e propósito em cada detalhe.",
    },
    credentials: [
      {
        id: "formacao",
        icon: "graduationCap",
        label: "Formação",
        status: "approved",
        detail: "Paisagismo autoral",
      },
      {
        id: "especializacao",
        icon: "award",
        label: "Especialização",
        status: "approved",
        detail: "Projetos residenciais e comerciais",
      },
      {
        id: "experiencia",
        icon: "leaf",
        label: "Experiência",
        status: "approved",
        detail: "Natureza, desenho e bem-estar",
      },
      {
        id: "atendimento",
        icon: "users",
        label: "Atendimento",
        status: "approved",
        detail: "Escuta atenta em cada projeto",
      },
    ],
  } satisfies AboutTeamContent,
  contact: {
    eyebrow: "Vamos conversar",
    title: [
      { text: "Vamos transformar " },
      { text: "seu espaço", accent: true },
      { text: " juntos?" },
    ],
    introduction:
      "Conte-nos sobre o seu projeto. Será um prazer ouvir suas ideias e encontrar a melhor solução para o seu espaço.",
    methods: [
      {
        id: "whatsapp",
        icon: "whatsapp",
        title: "Fale no WhatsApp",
        detail: "Atendimento direto pelo WhatsApp",
        href: siteContent.contact.href,
        accessibleLabel: "Falar com a Sobreiro pelo WhatsApp",
        external: siteContent.contact.external,
      },
      {
        id: "email",
        icon: "mail",
        title: "Envie um e-mail",
        detail: siteContent.email.address,
        href: siteContent.email.href,
        accessibleLabel: `Enviar e-mail para ${siteContent.email.address}`,
      },
    ],
  } satisfies AboutContactContent,
} as const;
