import fs from "node:fs";
import path from "node:path";
import rawHomeCatalog from "../../images/portfolio/home-catalog.json";
import rawPortfolioCatalog from "../../images/portfolio/catalog.json";
import { isLineIconName, type LineIconName } from "../_components/LineIcon";
import type { ProjectCardData, ProjectMedia } from "../_components/ProjectCard";

export type PortfolioCategoryId = string;
export type ProjectDetailPublication = "draft" | "published";

export interface PortfolioImage extends ProjectMedia {
  readonly file: string;
}

export interface ProjectSolution {
  readonly id: string;
  readonly icon: LineIconName;
  readonly title: string;
  readonly description: string;
}

export interface PortfolioProjectDetails {
  readonly statement?: string;
  readonly heroFile?: string;
  readonly solutions?: readonly ProjectSolution[];
}

export interface PortfolioProject extends Readonly<ProjectCardData> {
  readonly categoryId: PortfolioCategoryId;
  readonly status: string;
  readonly detailPublication: ProjectDetailPublication;
  readonly details?: PortfolioProjectDetails;
  readonly cover: PortfolioImage;
  readonly hero: PortfolioImage;
  readonly images: readonly PortfolioImage[];
}

export interface PortfolioCategory {
  readonly id: PortfolioCategoryId;
  readonly label: string;
  readonly description: string;
  readonly projects: readonly PortfolioProject[];
}

export interface HomeCatalogHighlight {
  readonly projectId: string;
  readonly order: number;
}

export interface PortfolioCatalogData {
  readonly categories: readonly PortfolioCategory[];
  readonly projects: readonly PortfolioProject[];
  readonly highlights: readonly HomeCatalogHighlight[];
}

export interface PortfolioCategoryOption {
  readonly id: "todos" | PortfolioCategoryId;
  readonly label: string;
  readonly icon?: LineIconName;
}

export interface PortfolioBuildOptions {
  readonly assetRoot?: string;
}

const publicPortfolioRoot = path.join(process.cwd(), "public", "images", "portfolio");
const catalogCardSizes = "(min-width: 1216px) 440px, (min-width: 768px) 42vw, 100vw";
const homeCardSizes = "(max-width: 699px) 82vw, (max-width: 1099px) 43vw, 30vw";

const categoryIcons: Readonly<Record<string, LineIconName>> = {
  "paisagismo-residencial": "home",
  "paisagismo-comercial": "building",
  "paisagismo-de-fachada": "plant",
  rooftop: "waves",
  "jardins-verticais": "leaf",
  "design-de-interiores": "building",
  "conceitos-e-renders": "sprout",
};

interface ImageDimensions {
  readonly width: number;
  readonly height: number;
}

interface UnknownRecord {
  [key: string]: unknown;
}

function invalid(pathname: string, message: string): never {
  throw new Error(`Catálogo inválido em ${pathname}: ${message}`);
}

function asRecord(value: unknown, pathname: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    invalid(pathname, "esperado um objeto");
  }
  const record: UnknownRecord = {};
  for (const [key, entry] of Object.entries(value)) record[key] = entry;
  return record;
}

function asArray(value: unknown, pathname: string): readonly unknown[] {
  if (!Array.isArray(value)) invalid(pathname, "esperado um array");
  return value;
}

function requiredString(record: UnknownRecord, key: string, pathname: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    invalid(`${pathname}.${key}`, "esperado um texto não vazio");
  }
  return value;
}

function requiredInteger(record: UnknownRecord, key: string, pathname: string): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isInteger(value)) {
    invalid(`${pathname}.${key}`, "esperado um número inteiro");
  }
  return value;
}

function optionalString(record: UnknownRecord, key: string, pathname: string): string | undefined {
  return record[key] === undefined ? undefined : requiredString(record, key, pathname);
}

function detailPublication(record: UnknownRecord, pathname: string): ProjectDetailPublication {
  const value = requiredString(record, "detailPublication", pathname);
  if (value !== "draft" && value !== "published") {
    invalid(`${pathname}.detailPublication`, 'esperado "draft" ou "published"');
  }
  return value;
}

function parseDetails(record: UnknownRecord, pathname: string): PortfolioProjectDetails | undefined {
  if (record.details === undefined) return undefined;

  const detailsPath = `${pathname}.details`;
  const detailsRecord = asRecord(record.details, detailsPath);
  const statement = optionalString(detailsRecord, "statement", detailsPath);
  const heroFile = detailsRecord.heroFile === undefined
    ? undefined
    : relativeFile(detailsRecord, "heroFile", detailsPath);
  const solutionIds = new Set<string>();
  const solutions = detailsRecord.solutions === undefined
    ? undefined
    : asArray(detailsRecord.solutions, `${detailsPath}.solutions`).map((value, index) => {
        const solutionPath = `${detailsPath}.solutions[${index}]`;
        const solutionRecord = asRecord(value, solutionPath);
        const id = requiredString(solutionRecord, "id", solutionPath);
        if (solutionIds.has(id)) invalid(`${solutionPath}.id`, `ID duplicado: ${id}`);
        solutionIds.add(id);
        const icon = requiredString(solutionRecord, "icon", solutionPath);
        if (!isLineIconName(icon)) invalid(`${solutionPath}.icon`, `ícone não suportado: ${icon}`);
        return {
          id,
          icon,
          title: requiredString(solutionRecord, "title", solutionPath),
          description: requiredString(solutionRecord, "description", solutionPath),
        };
      });

  return {
    ...(statement === undefined ? {} : { statement }),
    ...(heroFile === undefined ? {} : { heroFile }),
    ...(solutions === undefined ? {} : { solutions }),
  };
}

function relativeFile(record: UnknownRecord, key: string, pathname: string): string {
  const file = requiredString(record, key, pathname);
  const normalized = path.posix.normalize(file.replaceAll("\\", "/"));
  if (normalized.startsWith("/") || normalized === ".." || normalized.startsWith("../")) {
    invalid(`${pathname}.${key}`, "o caminho deve ser relativo ao catálogo");
  }
  return normalized;
}

function imageDimensions(filePath: string, pathname: string): ImageDimensions {
  const bytes = fs.readFileSync(filePath);

  if (bytes.length >= 24 && bytes.toString("ascii", 1, 4) === "PNG") {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = bytes[offset + 1];
      offset += 2;
      if (marker === 0xd8 || marker === 0xd9) continue;
      if (marker === 0xda) break;
      if (offset + 2 > bytes.length) break;

      const segmentLength = bytes.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > bytes.length) break;

      const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isStartOfFrame && offset + 7 <= bytes.length) {
        return {
          height: bytes.readUInt16BE(offset + 3),
          width: bytes.readUInt16BE(offset + 5),
        };
      }
      offset += segmentLength;
    }
  }

  invalid(pathname, `não foi possível ler as dimensões de ${filePath}`);
}

function resolveImage(
  record: UnknownRecord,
  pathname: string,
  assetRoot: string,
  sizes: string,
): PortfolioImage {
  const file = relativeFile(record, "file", pathname);
  const alt = requiredString(record, "alt", pathname);
  const filePath = path.join(assetRoot, file);
  if (!fs.existsSync(filePath)) invalid(`${pathname}.file`, `arquivo não encontrado: ${file}`);

  const dimensions = imageDimensions(filePath, `${pathname}.file`);
  if (dimensions.width <= 0 || dimensions.height <= 0) {
    invalid(`${pathname}.file`, "dimensões inválidas");
  }
  const src = `/images/portfolio/${file.split("/").map(encodeURIComponent).join("/")}`;
  return {
    file,
    src,
    alt,
    width: dimensions.width,
    height: dimensions.height,
    sizes,
    position: "center center",
  };
}

function parseCatalog(input: unknown, assetRoot: string): readonly PortfolioCategory[] {
  const root = asRecord(input, "catalog");
  const imageCount = requiredInteger(root, "imageCount", "catalog");
  const categoryRecords = asArray(root.categories, "catalog.categories");
  const categoryIds = new Set<string>();
  const projectIds = new Set<string>();
  const referencedFiles = new Set<string>();

  const categories = categoryRecords.map((categoryValue, categoryIndex) => {
    const categoryPath = `catalog.categories[${categoryIndex}]`;
    const categoryRecord = asRecord(categoryValue, categoryPath);
    const id = requiredString(categoryRecord, "id", categoryPath);
    const label = requiredString(categoryRecord, "label", categoryPath);
    const description = requiredString(categoryRecord, "description", categoryPath);
    if (categoryIds.has(id)) invalid(`${categoryPath}.id`, `ID duplicado: ${id}`);
    categoryIds.add(id);

    const projectRecords = asArray(categoryRecord.projects, `${categoryPath}.projects`);
    const projects = projectRecords.map((projectValue, projectIndex) => {
      const projectPath = `${categoryPath}.projects[${projectIndex}]`;
      const projectRecord = asRecord(projectValue, projectPath);
      const projectId = requiredString(projectRecord, "id", projectPath);
      if (projectIds.has(projectId)) invalid(`${projectPath}.id`, `ID duplicado: ${projectId}`);
      projectIds.add(projectId);

      const title = requiredString(projectRecord, "title", projectPath);
      const summary = requiredString(projectRecord, "summary", projectPath);
      const status = requiredString(projectRecord, "status", projectPath);
      const publication = detailPublication(projectRecord, projectPath);
      const details = parseDetails(projectRecord, projectPath);
      const coverFile = relativeFile(projectRecord, "cover", projectPath);
      const imageRecords = asArray(projectRecord.images, `${projectPath}.images`);
      if (imageRecords.length === 0) invalid(`${projectPath}.images`, "a galeria não pode ser vazia");

      const images = imageRecords.map((imageValue, imageIndex) => {
        const imagePath = `${projectPath}.images[${imageIndex}]`;
        const image = resolveImage(asRecord(imageValue, imagePath), imagePath, assetRoot, catalogCardSizes);
        referencedFiles.add(image.file);
        return image;
      });
      const coverRecord = images.find((image) => image.file === coverFile);
      if (!coverRecord) invalid(`${projectPath}.cover`, `a capa ${coverFile} não está presente na galeria`);
      const heroRecord = details?.heroFile
        ? images.find((image) => image.file === details.heroFile)
        : coverRecord;
      if (!heroRecord) {
        invalid(`${projectPath}.details.heroFile`, `a mídia ${details?.heroFile} não está presente na galeria`);
      }

      const project: PortfolioProject = {
        id: projectId,
        categoryId: id,
        title,
        category: label,
        summary,
        status,
        detailPublication: publication,
        ...(details === undefined ? {} : { details }),
        cover: coverRecord,
        hero: heroRecord,
        images,
        media: coverRecord,
      };
      return project;
    });

    return { id, label, description, projects };
  });

  if (imageCount !== referencedFiles.size) {
    invalid("catalog.imageCount", `declarado ${imageCount}, mas ${referencedFiles.size} arquivos únicos foram referenciados`);
  }
  return categories;
}

function parseHighlights(input: unknown, projects: readonly PortfolioProject[]): readonly HomeCatalogHighlight[] {
  const root = asRecord(input, "home-catalog");
  const records = asArray(root.highlights, "home-catalog.highlights");
  if (records.length !== 3) invalid("home-catalog.highlights", "esperadas exatamente três referências");

  const projectIds = new Set(projects.map((project) => project.id));
  const referencedIds = new Set<string>();
  const orders = new Set<number>();
  const highlights = records.map((value, index) => {
    const highlightPath = `home-catalog.highlights[${index}]`;
    const record = asRecord(value, highlightPath);
    const projectId = requiredString(record, "projectId", highlightPath);
    const order = requiredInteger(record, "order", highlightPath);
    if (!projectIds.has(projectId)) invalid(`${highlightPath}.projectId`, `projeto inexistente: ${projectId}`);
    if (referencedIds.has(projectId)) invalid(`${highlightPath}.projectId`, `referência duplicada: ${projectId}`);
    if (orders.has(order)) invalid(`${highlightPath}.order`, `ordem duplicada: ${order}`);
    referencedIds.add(projectId);
    orders.add(order);
    return { projectId, order };
  });

  return [...highlights].sort((first, second) => first.order - second.order);
}

export function buildPortfolioCatalog(
  catalogInput: unknown,
  homeInput: unknown,
  options: PortfolioBuildOptions = {},
): PortfolioCatalogData {
  const assetRoot = options.assetRoot ?? publicPortfolioRoot;
  const categories = parseCatalog(catalogInput, assetRoot);
  const projects = categories.flatMap((category) => category.projects);
  const highlights = parseHighlights(homeInput, projects);
  return { categories, projects, highlights };
}

export function toProjectCardData(
  project: PortfolioProject,
  context: "catalog" | "home" = "catalog",
): ProjectCardData {
  const media = context === "home" ? { ...project.cover, sizes: homeCardSizes } : project.cover;
  return {
    id: project.id,
    href: context === "home"
      ? "/projetos"
      : project.detailPublication === "published"
        ? `/projetos/${encodeURIComponent(project.id)}`
        : undefined,
    title: project.title,
    category: project.category,
    summary: project.summary,
    media,
  };
}

export function getPublishedProjects(
  projects: readonly PortfolioProject[],
): readonly PortfolioProject[] {
  return projects.filter((project) => project.detailPublication === "published");
}

export function findPublishedProjectBySlug(
  projects: readonly PortfolioProject[],
  slug: string,
): PortfolioProject | undefined {
  return projects.find(
    (project) => project.detailPublication === "published" && project.id === slug,
  );
}

export function getPublishedProjectParams(
  projects: readonly PortfolioProject[],
): readonly { readonly slug: string }[] {
  return getPublishedProjects(projects).map((project) => ({ slug: project.id }));
}

export const portfolioCatalog = buildPortfolioCatalog(rawPortfolioCatalog, rawHomeCatalog);

export const portfolioCategories: readonly PortfolioCategory[] = portfolioCatalog.categories;
export const portfolioProjects: readonly PortfolioProject[] = portfolioCatalog.projects;
export const publishedPortfolioProjects: readonly PortfolioProject[] = getPublishedProjects(portfolioProjects);
export const homeHighlights: readonly HomeCatalogHighlight[] = portfolioCatalog.highlights;
export const homeFeaturedProjects: readonly ProjectCardData[] = homeHighlights.map(({ projectId }) => {
  const project = portfolioProjects.find((candidate) => candidate.id === projectId);
  if (!project) throw new Error(`Catálogo inválido em home-catalog.highlights: projeto inexistente: ${projectId}`);
  return toProjectCardData(project, "home");
});

export const portfolioCategoryOptions: readonly PortfolioCategoryOption[] = [
  { id: "todos", label: "Todos" },
  ...portfolioCategories.map((category) => ({
    id: category.id,
    label: category.label,
    icon: categoryIcons[category.id],
  })),
];
