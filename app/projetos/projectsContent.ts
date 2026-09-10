import type { LineIconName } from "../_components/LineIcon";
import type { ContactBannerProps } from "../_components/ContactBanner";
import type { ProjectCardDirection, ProjectCardSurface } from "../_components/ProjectCard";
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
const catalogCoverSizes = "(min-width: 1600px) 23vw, (min-width: 1100px) 304px, (min-width: 768px) 42vw, 100vw";

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

export interface ProjectPresentation {
  readonly id: string;
  readonly direction: ProjectCardDirection;
  readonly surface: ProjectCardSurface;
}

export const projectPresentations = [
  { id: "residencia-piscina-area-gourmet", direction: "mediaFirst", surface: "dark" },
  { id: "coffee-comfort", direction: "mediaFirst", surface: "light" },
  { id: "residencia-contemporanea-fachada", direction: "contentFirst", surface: "light" },
  { id: "rooftop-com-piscina", direction: "mediaFirst", surface: "dark" },
  { id: "jardim-vertical-residencial", direction: "mediaFirst", surface: "dark" },
  { id: "cozinha-contemporanea", direction: "mediaFirst", surface: "light" },
  { id: "hall-de-entrada", direction: "contentFirst", surface: "light" },
  { id: "casa-suspensa-na-mata", direction: "mediaFirst", surface: "dark" },
] as const satisfies readonly ProjectPresentation[];

export function validateProjectPresentations(
  presentations: readonly ProjectPresentation[],
  projects: readonly Pick<CatalogProject, "id">[],
): ReadonlyMap<string, ProjectPresentation> {
  const projectIds = new Set(projects.map((project) => project.id));
  const presentationById = new Map<string, ProjectPresentation>();

  for (const presentation of presentations) {
    if (!projectIds.has(presentation.id)) {
      throw new Error(`Apresentação de projeto com ID desconhecido: ${presentation.id}`);
    }
    if (presentationById.has(presentation.id)) {
      throw new Error(`Apresentação de projeto com ID duplicado: ${presentation.id}`);
    }
    presentationById.set(presentation.id, presentation);
  }

  const missingIds = projects
    .map((project) => project.id)
    .filter((id) => !presentationById.has(id));
  if (missingIds.length > 0) {
    throw new Error(`Apresentação ausente para: ${missingIds.join(", ")}`);
  }

  return presentationById;
}

export const projectPresentationById = validateProjectPresentations(projectPresentations, catalogProjects);

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

const projectsHeroMedia = portfolioProjects[0].cover;

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
  contact: { readonly href: string; readonly label: string },
): Pick<ContactBannerProps, "contactHref" | "contactLabel" | "supportingAction"> {
  return {
    contactHref: whatsapp.status === "configured" ? whatsapp.href : contact.href,
    contactLabel: whatsapp.status === "configured" ? "Fale no WhatsApp" : contact.label,
    supportingAction: { label: "Agende uma conversa", href: contact.href },
  };
}
