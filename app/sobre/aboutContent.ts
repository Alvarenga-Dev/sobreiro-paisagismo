import type { LineIconName } from "../_components/LineIcon";
import type { TextFragment } from "../_components/Typography";
import { jessicaProfile } from "../_content/jessicaProfile";
import { siteContent } from "../_content/siteContent";

export interface AboutMedia {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
}

export interface AboutHeroContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly introduction: string;
  readonly historyLink: {
    readonly label: string;
    readonly href: `#${string}`;
  };
  readonly media: AboutMedia & { readonly position: string };
}

export interface AboutEssenceContent {
  readonly eyebrow: string;
  readonly title: readonly TextFragment[];
  readonly paragraphs: readonly string[];
  readonly statement: string;
  readonly media: AboutMedia;
}

export interface AboutVideoContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly playerTitle: string;
  readonly watchUrl: string;
  readonly poster: AboutMedia;
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

export const aboutContent = {
  hero: {
    eyebrow: "Sobre",
    title: [{ text: "Sobre a Sobreiro Paisagismo" }],
    introduction: "Projetos de paisagismo e design de interiores, guiados pela escuta e pelo lugar.",
    historyLink: {
      label: "Conheça a Jéssica",
      href: "#perfil",
    },
    media: {
      src: "/images/portfolio/hero.png",
      alt: "",
      width: 2000,
      height: 1328,
      sizes: "100vw",
      position: "62% center",
    },
  } satisfies AboutHeroContent,
  team: jessicaProfile,
  essence: {
    eyebrow: "Como eu projeto",
    title: [{ text: "Cada projeto começa pela escuta." }],
    paragraphs: [
      "Escuto as necessidades e os desejos de quem vai viver naquele espaço. Busco traduzir a personalidade dessas pessoas em soluções que tragam conforto ao dia a dia.",
      "Nos projetos de paisagismo, dou atenção às espécies nativas do Brasil e ao que cada região oferece.",
    ],
    statement: "Qualquer espaço pode se tornar “um espaço que respira”.",
    media: {
      src: "/images/portfolio/editorial/mao-e-folhagem.webp",
      alt: "Mão tocando a folha de uma palmeira",
      width: 720,
      height: 1080,
      sizes: "(max-width: 639px) 92vw, (max-width: 1216px) 42vw, 540px",
    },
  } satisfies AboutEssenceContent,
  video: {
    id: "Rvv5bZX8TZs",
    title: "Sobreiro em vídeo",
    description: "Conheça um pouco mais da Sobreiro. Assista aqui mesmo ou abra o vídeo no YouTube.",
    playerTitle: "Vídeo da Sobreiro Paisagismo no YouTube",
    watchUrl: "https://www.youtube.com/watch?v=Rvv5bZX8TZs",
    poster: {
      src: "/images/portfolio/editorial/sobreiro-em-video-poster.webp",
      alt: "",
      width: 1280,
      height: 852,
      sizes: "(max-width: 639px) 92vw, (max-width: 1216px) 58vw, 780px",
    },
  } satisfies AboutVideoContent,
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
