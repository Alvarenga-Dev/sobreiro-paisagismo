import type { LineIconName } from "../_components/LineIcon";
import type { ContactBannerProps } from "../_components/ContactBanner";
import type { ConfiguredContact } from "../_content/siteContent";
import {
  portfolioCategories,
  portfolioCategoryOptions,
  portfolioProjects,
  toProjectCardData,
  type PortfolioProject,
} from "../_content/portfolioCatalog";

export type ProjectCategory = string;
export type ProjectFilter = "todos" | ProjectCategory;
export type CatalogProject = PortfolioProject;

export interface CategoryOption {
  readonly id: ProjectFilter;
  readonly label: string;
  readonly icon?: LineIconName;
}

export const projectCategories: readonly CategoryOption[] = portfolioCategoryOptions;
const catalogCoverSizes = "(min-width: 68.75rem) min(390px, calc(30vw - 1rem)), (min-width: 48rem) calc(45vw - 0.75rem), 100vw";

export const catalogProjects: readonly CatalogProject[] = portfolioProjects.map((project) => {
  const cardData = toProjectCardData(project);
  return {
    ...project,
    ...cardData,
    media: {
      ...cardData.media,
      sizes: catalogCoverSizes,
    },
  };
});

export type ProjectsBannerMedia =
  | { readonly status: "pendingApproval" }
  | {
      readonly status: "approved";
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      readonly sizes: string;
      readonly position?: string;
    };

const projectsHeroMedia = portfolioProjects.find((project) => project.id === "residencia-jardim-e-piscina")?.hero
  ?? portfolioProjects[0].hero;

export const projectsContent = {
  hero: {
    eyebrow: "NOSSOS PROJETOS",
    title: [{ text: "Projetos que " }, { text: "transformam espaços", accent: true }],
    introduction: "Conheça projetos residenciais, comerciais, interiores, rooftops e jardins verticais, além de estudos conceituais claramente identificados.",
    statement: "Mais que espaços, paisagens para uma vida melhor.",
    media: {
      ...projectsHeroMedia,
      sizes: "100vw",
    },
  },
  catalog: {
    eyebrow: "EXPLORE POR CATEGORIA",
    title: [{ text: "Encontre o projeto que " }, { text: "inspira você.", accent: true }],
    note: "Natureza, arquitetura e pessoas em harmonia.",
  },
  banner: {
    eyebrow: "VAMOS CONVERSAR?",
    message: [{ text: "Seu projeto pode ser " }, { text: "o próximo.", accent: true }],
    description: "Vamos criar juntos um espaço que reflita seu estilo, atenda às suas necessidades e valorize cada detalhe.",
    statement: "Projetos que cultivam bem-estar.",
    media: { status: "pendingApproval" } satisfies ProjectsBannerMedia,
  },
  categoryDescriptions: portfolioCategories.map((category) => ({
    id: category.id,
    label: category.label,
    description: category.description,
  })),
} as const;

export function projectContactActions(
  whatsapp: ConfiguredContact,
  contact: { readonly label: string },
  email: { readonly href: string },
): Pick<ContactBannerProps, "contactHref" | "contactLabel" | "contactIcon" | "contactIconSize" | "contactExternal"> {
  if (whatsapp.status !== "configured") {
    return {
      contactHref: email.href,
      contactLabel: "Envie um e-mail",
      contactIcon: "mail",
      contactIconSize: "sm",
      contactExternal: false,
    };
  }

  return {
    contactHref: whatsapp.href,
    contactLabel: contact.label,
    contactIcon: "whatsapp",
    contactIconSize: "sm",
    contactExternal: true,
  };
}
