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
  readonly status: "provisional";
}

export interface AboutHeroContent {
  readonly title: readonly TextFragment[];
  readonly introduction: string;
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
  readonly values: readonly AboutValue[];
}

export interface AboutCredential {
  readonly id: string;
  readonly icon: Extract<LineIconName, "graduationCap" | "award" | "leaf" | "users">;
  readonly label: string;
  readonly detail: string;
  readonly status: "pendingApproval";
}

export type PortraitContent =
  | { readonly status: "configured"; readonly media: AboutMedia }
  | { readonly status: "unavailable"; readonly message: string };

export interface AboutFounderContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly introduction: string;
  readonly name: string;
  readonly role: string;
  readonly registration?: string;
  readonly portrait: PortraitContent;
  readonly credentials: readonly AboutCredential[];
}

interface ContactMethodBase {
  readonly id: string;
  readonly icon: Extract<LineIconName, "message" | "mail" | "calendar">;
  readonly title: string;
  readonly detail: string;
}

export interface ConfiguredContactMethod extends ContactMethodBase {
  readonly status: "configured";
  readonly href: string;
  readonly accessibleLabel: string;
}

export interface UnavailableContactMethod extends ContactMethodBase {
  readonly status: "unavailable";
  readonly unavailableMessage: string;
}

export type ContactMethod = ConfiguredContactMethod | UnavailableContactMethod;

export interface AboutContactContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly methods: readonly ContactMethod[];
}

// Pontos únicos de substituição: imagens provisórias e conteúdo editorial ainda
// dependente de aprovação permanecem identificados pelos estados tipados abaixo.
export const aboutContent = {
  hero: {
    title: [
      { text: "Sobre a " },
      { text: "Sobreiro Paisagismo", accent: true },
    ],
    introduction:
      "Acreditamos que o paisagismo vai muito além da estética. Ele transforma ambientes, melhora a qualidade de vida e conecta pessoas à natureza.",
    media: {
      src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2000&q=88",
      alt: "",
      width: 2000,
      height: 1328,
      sizes: "100vw",
      position: "62% center",
      status: "provisional",
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
      src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1400&q=86",
      alt: "Profissional realizando o cuidado manual de um jardim",
      width: 1400,
      height: 1050,
      sizes: "(max-width: 639px) 100vw, (max-width: 895px) 46vw, 42vw",
      position: "center",
      status: "provisional",
    },
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
  founder: {
    eyebrow: "Quem está por trás",
    title: [
      { text: "Paixão que floresce " },
      { text: "em cada projeto.", accent: true },
    ],
    introduction:
      "A Sobreiro reúne sensibilidade para a natureza, cuidado com o desenho e escuta atenta em cada novo projeto.",
    name: "Equipe Sobreiro Paisagismo",
    role: "Estúdio de paisagismo",
    portrait: {
      status: "unavailable",
      message: "Retrato profissional em atualização",
    },
    credentials: [
      {
        id: "formacao",
        icon: "graduationCap",
        label: "Formação",
        detail: "Trajetória acadêmica em validação editorial.",
        status: "pendingApproval",
      },
      {
        id: "especializacao",
        icon: "award",
        label: "Especialização",
        detail: "Especializações profissionais em validação editorial.",
        status: "pendingApproval",
      },
      {
        id: "experiencia",
        icon: "leaf",
        label: "Experiência",
        detail: "Histórico de projetos em validação editorial.",
        status: "pendingApproval",
      },
      {
        id: "atendimento",
        icon: "users",
        label: "Atendimento",
        detail: "Abordagem de atendimento em validação editorial.",
        status: "pendingApproval",
      },
    ],
  } satisfies AboutFounderContent,
  contact: {
    eyebrow: "Vamos conversar",
    title: [
      { text: "Vamos transformar " },
      { text: "seu espaço", accent: true },
      { text: " juntos?" },
    ],
    methods: [
      {
        id: "whatsapp",
        icon: "message",
        title: "Fale no WhatsApp",
        detail: "Canal em atualização",
        status: "unavailable",
        unavailableMessage: "Contato ainda não disponível",
      },
      {
        id: "email",
        icon: "mail",
        title: "Envie um e-mail",
        detail: siteContent.contact.email,
        status: "configured",
        href: siteContent.contact.href,
        accessibleLabel: `Enviar e-mail para ${siteContent.contact.email}`,
      },
      {
        id: "agenda",
        icon: "calendar",
        title: "Agende uma conversa",
        detail: "Atendimento personalizado",
        status: "unavailable",
        unavailableMessage: "Agenda ainda não disponível",
      },
    ],
  } satisfies AboutContactContent,
} as const;
