import { render, screen, within } from "@testing-library/react";
import { SiteHeader } from "../_components/SiteHeader";
import AboutPage, { metadata } from "./page";
import { ContactMethodCard } from "./_components/ContactMethodsSection";
import { EssenceSection } from "./_components/EssenceSection";
import { TeamProfileSection } from "./_components/TeamProfileSection";
import { aboutContent } from "./aboutContent";
import type {
  AboutEssenceContent,
  AboutTeamContent,
  ConfiguredContactMethod,
  UnavailableContactMethod,
} from "./aboutContent";

describe("AboutPage", () => {
  afterEach(() => jest.resetAllMocks());

  it("expõe metadados próprios em português do Brasil", () => {
    expect(metadata.title).toMatch(/sobre a sobreiro paisagismo/i);
    expect(metadata.description).toMatch(/essência, os valores e a abordagem/i);
  });

  it("compõe a narrativa na ordem prevista e preserva um único h1", () => {
    render(<AboutPage />);

    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(main.children).toHaveLength(4);
    expect(Array.from(main.children).map((region) => region.getAttribute("data-region"))).toEqual([
      "about-hero",
      "essence",
      "team-profile",
      "contact-methods",
    ]);
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /sobre a sobreiro paisagismo/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /design com propósito/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /paixão que floresce/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /vamos transformar seu espaço/i })).toBeVisible();
  });

  it("identifica a página sem breadcrumb e oferece uma âncora nativa para a história", () => {
    render(<AboutPage />);

    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).not.toBeInTheDocument();
    expect(screen.getByText("Sobre", { selector: ".aboutHero__eyebrow" })).toBeVisible();
    expect(screen.getByText(aboutContent.hero.introduction)).toBeVisible();
    expect(screen.getByText(aboutContent.hero.statement)).toBeVisible();
    expect(screen.getByRole("link", { name: "Conheça nossa história" })).toHaveAttribute(
      "href",
      "#essencia",
    );
    expect(screen.getByRole("heading", { name: /design com propósito/i }).closest("section")).toHaveAttribute(
      "id",
      "essencia",
    );
    within(screen.getByRole("main")).getAllByRole("heading", { level: 2 }).forEach((heading) => {
      expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
    });
  });

  it("mantém todo o significado do hero no texto quando a mídia é atmosférica", () => {
    render(<AboutPage />);

    const hero = screen.getByRole("heading", { level: 1 }).closest("section");
    expect(hero?.querySelector("img")).toHaveAttribute("alt", "");
    expect(within(hero as HTMLElement).getByText(aboutContent.hero.introduction)).toBeVisible();
    expect(within(hero as HTMLElement).getByText(aboutContent.hero.statement)).toBeVisible();
  });

  it("apresenta quatro valores e quatro credenciais como conteúdo textual", () => {
    render(<AboutPage />);

    const metrics = screen.getByRole("list", { name: "Indicadores da Sobreiro Paisagismo" });
    expect(within(metrics).getByText("Natureza")).toBeVisible();
    expect(screen.queryByText("+100")).not.toBeInTheDocument();
    expect(screen.queryByText("100%")).not.toBeInTheDocument();

    const values = screen.getByRole("list", { name: "Valores da Sobreiro Paisagismo" });
    expect(values.children).toHaveLength(4);
    ["Personalização", "Sustentabilidade", "Bem-estar", "Qualidade"].forEach((title) => {
      expect(within(values).getByRole("heading", { level: 3, name: title })).toBeVisible();
    });

    const credentials = screen.getByRole("list", { name: "Credenciais da equipe" });
    expect(credentials.children).toHaveLength(4);
    ["Formação", "Especialização", "Experiência", "Atendimento"].forEach((label) => {
      expect(within(credentials).getByText(label)).toBeVisible();
    });
  });

  it("mantém os três métodos reais em ordem e cria link somente para o e-mail", () => {
    render(<AboutPage />);

    const methods = screen.getByRole("list", { name: "Métodos de contato" });
    expect(methods.children).toHaveLength(3);
    expect(Array.from(methods.children).map((method) => method.querySelector("strong")?.textContent)).toEqual([
      "Fale no WhatsApp",
      "Envie um e-mail",
      "Agende uma conversa",
    ]);
    expect(within(methods).getAllByRole("link")).toHaveLength(1);
    expect(within(methods).getByRole("link", { name: /enviar e-mail/i })).toHaveAttribute(
      "href",
      "mailto:contato@sobreiro.com.br",
    );
    expect(within(methods).getByText("Contato ainda não disponível")).toBeVisible();
    expect(within(methods).getByText("Agenda ainda não disponível")).toBeVisible();
    expect(methods.querySelectorAll("[data-contact-status='unavailable']")).toHaveLength(2);
  });

  it("não duplica o cabeçalho global dentro da rota", () => {
    render(<AboutPage />);

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Abrir menu" })).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: /menu principal/i })).not.toBeInTheDocument();
  });

  it("forma um único shell com banner, main e rodapé quando recebe a Navbar global", () => {
    render(
      <>
        <SiteHeader />
        <AboutPage />
      </>,
    );

    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  });

  it("usa destinos globais válidos no rodapé da rota interna", () => {
    render(<AboutPage />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "/sobre");
    expect(within(footer).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(within(footer).getByRole("link", { name: "Contato" })).toHaveAttribute("href", "/#contato");
  });

});

describe("EssenceSection", () => {
  it("renderiza callout, mídia contextual, quatro valores e somente indicadores aprovados", () => {
    const content = {
      ...aboutContent.essence,
      metrics: [
        {
          id: "approved-projects",
          status: "approved",
          value: "12",
          label: "projetos com publicação aprovada",
        },
        {
          id: "pending-projects",
          status: "pendingApproval",
          candidateValue: "+100",
          candidateLabel: "projetos realizados",
        },
      ],
    } satisfies AboutEssenceContent;

    render(<EssenceSection content={content} />);

    expect(screen.getByRole("img", { name: content.media.alt })).toBeVisible();
    expect(screen.getByText(content.mediaCallout.title)).toBeVisible();
    expect(screen.getByText(content.mediaCallout.description)).toBeVisible();
    const metrics = screen.getByRole("list", { name: "Indicadores da Sobreiro Paisagismo" });
    expect(within(metrics).getByText("12")).toBeVisible();
    expect(screen.queryByText("+100")).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Valores da Sobreiro Paisagismo" }).children).toHaveLength(4);
    expect(screen.queryByText(/contador/i)).not.toBeInTheDocument();
  });
});

describe("TeamProfileSection", () => {
  it("apresenta Jéssica Sobreiro com foto e credenciais textuais", () => {
    render(<TeamProfileSection content={aboutContent.team} />);

    expect(screen.getByText("Jéssica Sobreiro")).toBeVisible();
    expect(screen.getByText("Paisagista e fundadora da Sobreiro Paisagismo")).toBeVisible();
    expect(screen.getByRole("img", { name: /Jéssica Sobreiro/ })).toBeVisible();
    expect(screen.getByText(aboutContent.team.media.callout)).toBeVisible();
    expect(screen.getByRole("list", { name: "Credenciais da equipe" }).children).toHaveLength(4);
    expect(screen.queryByText(/mídia botânica em atualização|retrato profissional/i)).not.toBeInTheDocument();
  });

  it("renderiza mídia botânica configurada com alternativa contextual", () => {
    const content = {
      ...aboutContent.team,
      media: {
        status: "configured",
        media: aboutContent.essence.media,
        callout: aboutContent.team.media.callout,
      },
    } satisfies AboutTeamContent;

    render(<TeamProfileSection content={content} />);

    expect(screen.getByRole("img", { name: content.media.media.alt })).toBeVisible();
    expect(screen.queryByText("Mídia botânica em atualização")).not.toBeInTheDocument();
  });
});

describe("ContactMethodCard", () => {
  const configured = {
    id: "email",
    icon: "mail",
    title: "Envie um e-mail",
    detail: "contato@sobreiro.com.br",
    status: "configured",
    href: "mailto:contato@sobreiro.com.br",
    accessibleLabel: "Enviar e-mail para contato@sobreiro.com.br",
  } satisfies ConfiguredContactMethod;

  const unavailable = {
    id: "agenda",
    icon: "calendar",
    title: "Agende uma conversa",
    detail: "Atendimento personalizado",
    status: "unavailable",
    unavailableMessage: "Agenda ainda não disponível",
  } satisfies UnavailableContactMethod;

  it("renderiza um único link nativo quando o destino está configurado", () => {
    render(<ContactMethodCard method={configured} />);

    const link = screen.getByRole("link", { name: configured.accessibleLabel });
    expect(link).toHaveAttribute("href", configured.href);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("renderiza superfície informativa não focável sem fabricar URL", () => {
    const { container } = render(<ContactMethodCard method={unavailable} />);

    expect(screen.getByText(unavailable.title)).toBeVisible();
    expect(screen.getByText(unavailable.unavailableMessage)).toBeVisible();
    expect(container.querySelector("a")).not.toBeInTheDocument();
    expect(container.querySelector("[tabindex]")).not.toBeInTheDocument();
  });
});
