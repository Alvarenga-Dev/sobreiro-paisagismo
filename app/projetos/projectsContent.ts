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
export const catalogProjects: readonly CatalogProject[] = portfolioProjects.map((project) => ({
  ...project,
  ...toProjectCardData(project),
}));

const projectsHeroMedia = portfolioProjects[0].cover;

export const projectsContent = {
  hero: {
    title: [{ text: "Projetos que " }, { text: "transformam espaços", accent: true }],
    introduction: "Conheça projetos residenciais, comerciais, interiores, rooftops e jardins verticais, além de estudos conceituais claramente identificados.",
    media: {
      ...projectsHeroMedia,
      sizes: "100vw",
    },
  },
  banner: {
    message: [{ text: "Seu projeto pode ser " }, { text: "o próximo.", accent: true }],
    description: "Vamos criar juntos um espaço que reflita seu estilo, atenda às suas necessidades e valorize cada detalhe.",
  },
  categoryDescriptions: portfolioCategories.map((category) => ({
    id: category.id,
    label: category.label,
    description: category.description,
  })),
} as const;

export function projectContactActions(
  whatsapp: ConfiguredContact,
  contact: { readonly href: string; readonly label: string },
): Pick<ContactBannerProps, "contactHref" | "contactLabel" | "supportingAction"> {
  return {
    contactHref: whatsapp.status === "configured" ? whatsapp.href : contact.href,
    contactLabel: whatsapp.status === "configured" ? "Fale no WhatsApp" : contact.label,
    supportingAction: { label: "Agende uma conversa", href: contact.href },
  };
}
