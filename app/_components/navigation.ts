import type { ConfiguredContact, NavigationItemId } from "../_content/siteContent";

export const DESKTOP_NAVIGATION_MEDIA_QUERY = "(min-width: 64rem)";

const homeHashDestinations = {
  "#beneficios": "benefits",
  "#contato": "contact",
} as const satisfies Readonly<Record<string, NavigationItemId>>;

function urlParts(pathname: string, hash: string): { pathname: string; hash: string } {
  const [withoutHash, embeddedHash = ""] = pathname.split("#", 2);
  const [cleanPathname] = withoutHash.split("?", 1);
  return {
    pathname: cleanPathname || "/",
    hash: hash || (embeddedHash ? `#${embeddedHash}` : ""),
  };
}

export function resolveActiveNavigationId(
  currentPathname: string,
  currentHash = "",
): NavigationItemId | undefined {
  const location = urlParts(currentPathname, currentHash);

  if (location.pathname === "/projetos" || location.pathname.startsWith("/projetos/")) {
    return "projects";
  }

  if (location.pathname === "/sobre") return "about";
  if (location.pathname !== "/") return undefined;

  return homeHashDestinations[location.hash as keyof typeof homeHashDestinations] ?? "home";
}

export function configuredWhatsAppHref(contact: ConfiguredContact): string | undefined {
  if (contact.status !== "configured") return undefined;

  try {
    const url = new URL(contact.href);
    const isWhatsAppHost = url.hostname === "wa.me" || url.hostname === "api.whatsapp.com";
    return url.protocol === "https:" && isWhatsAppHost ? url.href : undefined;
  } catch {
    return undefined;
  }
}
