import type { TextFragment } from "./Typography";

export interface NotFoundCopy {
  readonly breadcrumb: {
    readonly home: string;
    readonly current: string;
  };
  readonly code: string;
  readonly title: readonly TextFragment[];
  readonly supporting: string;
  readonly epilogue: string;
  readonly recovery: {
    readonly home: string;
    readonly projects: string;
  };
}

export const globalNotFoundCopy = {
  breadcrumb: {
    home: "Início",
    current: "Página não encontrada",
  },
  code: "Erro 404",
  title: [
    { text: "Ops! Essa página se perdeu " },
    { text: "no jardim.", accent: true },
  ],
  supporting:
    "Não encontramos a página que você procura. Talvez ela tenha mudado de endereço ou nunca tenha florescido por aqui.",
  epilogue: "Até os melhores caminhos pedem um novo começo.",
  recovery: {
    home: "Voltar para o início",
    projects: "Ver projetos",
  },
} satisfies NotFoundCopy;

export const projectNotFoundCopy = {
  breadcrumb: {
    home: "Início",
    current: "Projeto não encontrado",
  },
  code: "Erro 404",
  title: [
    { text: "Este projeto não está " },
    { text: "disponível no portfólio.", accent: true },
  ],
  supporting:
    "Não encontramos este endereço entre os projetos publicados da Sobreiro. Você pode conhecer outros trabalhos ou voltar ao início.",
  epilogue: "Há outros jardins esperando para serem descobertos.",
  recovery: {
    home: "Voltar para o início",
    projects: "Ver projetos",
  },
} satisfies NotFoundCopy;
