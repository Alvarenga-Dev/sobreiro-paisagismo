import { siteContent } from "../_content/siteContent";
import { configuredWhatsAppHref, resolveActiveNavigationId } from "./navigation";

describe("navegação global", () => {
  afterEach(() => jest.resetAllMocks());

  it("mantém uma única fonte para os cinco destinos na ordem contratada", () => {
    expect(siteContent.navigation).toEqual([
      { id: "home", label: "Início", href: "/", icon: "home" },
      { id: "about", label: "Sobre", href: "/sobre", icon: "user" },
      { id: "projects", label: "Projetos", href: "/projetos", icon: "leaf" },
      { id: "benefits", label: "Por que um projeto?", href: "/#beneficios", icon: "sprout" },
      { id: "contact", label: "Contato", href: "/#contato", icon: "mail" },
    ]);
    expect(siteContent.mobileMenu).not.toHaveProperty("navigation");
  });

  it.each([
    ["/", "", "home"],
    ["/#desconhecido", "", "home"],
    ["/", "#beneficios", "benefits"],
    ["/#contato", "", "contact"],
    ["/sobre", "", "about"],
    ["/projetos?categoria=piscinas", "", "projects"],
    ["/projetos/jardim-da-serra?origem=home", "", "projects"],
  ])("resolve %s %s como %s", (pathname, hash, activeId) => {
    expect(resolveActiveNavigationId(pathname, hash)).toBe(activeId);
  });

  it("aceita somente URLs HTTPS dos hosts oficiais do WhatsApp", () => {
    expect(configuredWhatsAppHref({ status: "configured", href: "https://wa.me/5521999999999" })).toBe(
      "https://wa.me/5521999999999",
    );
    expect(configuredWhatsAppHref({ status: "configured", href: "https://example.com/whatsapp" })).toBeUndefined();
    expect(configuredWhatsAppHref({ status: "unavailable" })).toBeUndefined();
  });
});
