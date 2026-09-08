# Coding Patterns

> Este documento define os padrões de implementação do Sobreiro Paisagismo.

# 1. Arquitetura e responsabilidades

**Arquitetura atual:** aplicação frontend baseada em rotas com Next.js App
Router e Server Components por padrão.

| Camada / componente | Responsabilidade | Pode depender de | Não deve depender de |
| --- | --- | --- | --- |
| `app/**/page.tsx` | Compor uma rota e seu conteúdo | React, APIs do Next.js, componentes da própria rota | Infraestrutura inexistente ou detalhes de persistência |
| `app/layout.tsx` | Estrutura HTML raiz e metadados globais | React, `next`, CSS global | Regras específicas de uma página |
| Componentes React | Renderizar uma unidade de interface | Props tipadas e componentes menores | Estado global implícito ou dados mutáveis em escopo de módulo |
| `app/globals.css` | Base visual global da aplicação | CSS nativo | Lógica de negócio |
| Configuração | Configurar compilação e framework | Opções oficiais das ferramentas | Código de interface |

Regras:

- ✅ Mantenha componentes como Server Components enquanto não precisarem de
  estado, efeitos, eventos ou APIs exclusivas do navegador. **[Framework]**
- ✅ Deixe `app/layout.tsx` responsável pelo idioma, `<html>`, `<body>` e
  metadados globais. **[Código atual]**
- ✅ Use HTML semântico e relacione seções aos seus títulos com ARIA quando
  necessário. **[Código atual]**
- ❌ Não adicione `"use client"` preventivamente no topo de páginas ou layouts.
- ❌ Não introduza camadas `domain`, `services` ou `repositories` sem um caso de
  uso real e uma decisão documentada.

```tsx
// ✅ BOM — componente estático permanece no servidor.
const services = ["Projetos residenciais", "Jardins corporativos"];

export default function ServicesPage() {
  return (
    <main>
      <h1>Serviços</h1>
      <ul>
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </main>
  );
}
```

```tsx
// ❌ RUIM — transforma toda a rota em Client Component sem necessidade.
"use client";

export default function ServicesPage() {
  return <h1>Serviços</h1>;
}
```

---

# 2. Estrutura de módulos e funcionalidades

Estrutura canônica atual:

```text
app/
├── globals.css
├── layout.tsx
└── page.tsx
```

Para uma nova rota simples, use a estrutura nativa do App Router:

```text
app/
├── _components/              # UI reutilizada por duas ou mais rotas
└── projetos/
    ├── _components/          # UI exclusiva da rota
    │   └── ProjectCard.tsx
    └── page.tsx
```

Regras:

- ✅ Crie uma pasta de segmento em `app/` quando houver uma nova URL.
  **[Framework]**
- ✅ Mantenha conteúdo exclusivo de uma rota próximo da rota enquanto o código
  for pequeno. **[Framework; estágio atual]**
- ✅ Mantenha tipos junto da implementação que os possui; mova-os para um módulo
  compartilhado somente quando houver mais de um consumidor. **[Skill:
  `typescript-expert`]**
- ✅ Coloque componentes exclusivos em `_components` dentro do segmento e
  componentes realmente reutilizados em `app/_components`. **[Framework; Skill:
  `design-system`]**
- ✅ Extraia um componente somente quando ele tiver responsabilidade própria,
  for reutilizado ou tornar a página difícil de ler.
- ✅ Use imports relativos enquanto o projeto não possuir alias configurado no
  `tsconfig.json`.
- ❌ Não crie pastas técnicas vazias para uma arquitetura futura.
- ❌ Não crie um barrel `index.ts` apenas para encurtar um único import.

---

# 3. Convenções de nomes

| Categoria | Convenção atual | Exemplo |
| --- | --- | --- |
| Arquivos especiais do App Router | nome reservado em minúsculas | `page.tsx`, `layout.tsx` |
| Componentes React | `PascalCase` | `Home`, `RootLayout` |
| Funções e variáveis | `camelCase` | `services`, `service` |
| Classes CSS | nomes semânticos em inglês; o código atual usa `camelCase` para compostos | `hero`, `heroText` |
| IDs de acessibilidade | `kebab-case` descritivo | `hero-title`, `services-title` |
| Constantes de módulo | `camelCase`; use `UPPER_SNAKE_CASE` apenas para constantes globais de configuração | `services`, `MAX_RETRIES` |
| Testes | mesmo nome do arquivo com `.test.ts` ou `.test.tsx` | `ServiceList.test.tsx` |
| Rotas | segmentos estáticos em `kebab-case`; parâmetros na sintaxe do App Router | `/projetos-residenciais`, `/projetos/[slug]` |

Use termos de domínio estáveis. Prefira `service`, `project` e `contact` a nomes
genéricos como `item`, `data` ou `thing` quando o contexto permitir.

```tsx
// ✅ BOM
const landscapingServices = ["Projeto paisagístico", "Manutenção"];

function ServiceList() {
  return landscapingServices.map((service) => (
    <li key={service}>{service}</li>
  ));
}

// ❌ RUIM
const data = ["Projeto paisagístico", "Manutenção"];
function Component1() {
  return data.map((item, i) => <li key={i}>{item}</li>);
}
```

---

# 4. Acesso a dados e repositórios

**Padrão para o escopo atual:** a aplicação não possui camada de persistência.
Dados estáticos permanecem como constantes tipadas próximas da rota ou do
componente proprietário.

Se uma fonte persistente for introduzida, o acesso deve ficar fora de componentes
de apresentação, os contratos devem usar tipos explícitos e os métodos devem
expressar intenção de domínio. Não crie uma interface genérica antes de existirem
operações e consumidores reais. **[Skill: `typescript-expert`]**

```ts
// ✅ BOM — contrato pequeno e orientado ao domínio.
interface ProjectRepository {
  findPublishedBySlug(slug: string): Promise<Project | null>;
  listFeatured(): Promise<readonly Project[]>;
}
```

```ts
// ❌ EVITAR — abstração especulativa sem consumidor nem tecnologia definida.
interface Repository<T> {
  findAll(): Promise<T[]>;
  save(value: T): Promise<void>;
}
```

Antes do primeiro código persistente, uma ADR deve registrar tecnologia,
transações, migrações e estratégia de testes. Até isso ocorrer, dependências de
ORM ou banco não fazem parte do padrão do projeto.

# 5. Entradas da aplicação e UI

As entradas atuais são `app/page.tsx` e `app/layout.tsx`.

- ✅ Uma página compõe seções e componentes e fornece dados à apresentação.
- ✅ O layout define metadados globais e a estrutura raiz.
- ✅ Use elementos HTML pelo seu significado antes de recorrer a `div`.
- ❌ Não coloque acesso a banco, parsing de payload ou lógica de autorização
  dentro de componentes de apresentação.

```tsx
// ✅ BOM
<section aria-labelledby="services-title">
  <h2 id="services-title">Serviços em destaque</h2>
  <ul>{/* itens */}</ul>
</section>

// ❌ RUIM
<div onClick={() => window.location.assign("mailto:contato@example.com")}>
  Solicitar orçamento
</div>
```

O primeiro exemplo preserva semântica, navegação por teclado e relacionamento
entre região e título. Para navegação ou ação simples, use o elemento nativo
adequado (`a` ou `button`).

---

# 6. DTOs, modelos e mapeamento

O único modelo tipado de fronteira hoje são as props do `RootLayout`, definidas
como somente leitura.

```tsx
// ✅ PADRÃO ATUAL
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body>{children}</body>;
}
```

Regras iniciais:

- ✅ Declare props com nomes e tipos explícitos.
- ✅ Trate props como imutáveis.
- ✅ Mantenha tipos próximos do componente enquanto tiverem um único dono.
- ✅ Prefira `interface` para objetos e `type` para uniões, aliases e tipos
  derivados. **[Skill: `typescript-expert`]**
- ✅ Valide dados externos como `unknown` na entrada e converta-os para um modelo
  interno tipado antes da renderização.
- ❌ Não use um único tipo para API, persistência e UI.
- ❌ Não crie uma pasta global `types/` para tipos usados por apenas um arquivo.

Quando existirem fronteiras externas, use a seguinte separação:

```text
DTO externo (unknown na entrada) → validação/mapeamento → modelo interno → props de UI
```

DTOs pertencem à integração, modelos internos pertencem à funcionalidade e props
pertencem ao componente. Entidades de persistência não devem atravessar essas
fronteiras diretamente.

---

# 7. Tratamento de erros

**Padrão:** falhas esperadas devem ser modeladas como estados discriminados;
falhas inesperadas usam `Error`, são capturadas na fronteira responsável e não
expõem detalhes técnicos na interface. **[Skill: `typescript-expert`]**

Regras de TypeScript válidas desde já:

- ✅ Em um `catch`, trate o valor como `unknown` antes de acessar propriedades.
- ✅ Use união discriminada para resultados esperados como sucesso, vazio e erro.
- ✅ Registre uma falha inesperada uma única vez, na fronteira que consegue
  acrescentar contexto ou convertê-la em resposta.
- ✅ Mostre mensagens apropriadas ao usuário e preserve detalhes técnicos apenas
  para diagnóstico seguro.
- ❌ Não silencie erros com `catch {}`.
- ❌ Não converta erros em `any`.

```ts
// ✅ BOM
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Erro desconhecido";
}

// ❌ RUIM
function errorMessage(error: any) {
  return error.message;
}
```

```ts
type LoadProjectsResult =
  | { status: "success"; projects: readonly Project[] }
  | { status: "empty" }
  | { status: "error"; message: string };
```

Use classes de erro próprias somente quando um chamador precisar distinguir a
categoria programaticamente; não crie uma hierarquia de erros por antecipação.

# 8. Gerenciamento de estado

O estado atual é conteúdo imutável em escopo de módulo; não há biblioteca de
estado ou estado de cliente.

```tsx
// ✅ PADRÃO ATUAL — dados constantes renderizados deterministicamente.
const services = ["Projetos residenciais", "Jardins corporativos"];

function ServiceList() {
  return (
    <ul>
      {services.map((service) => (
        <li key={service}>{service}</li>
      ))}
    </ul>
  );
}
```

- ✅ Mantenha dados derivados como valores derivados, não como outro estado.
- ✅ Adicione `useState` somente em um Client Component que tenha interação real.
- ✅ Modele operações assíncronas com união discriminada, impedindo combinações
  inválidas de `loading`, `data` e `error`. **[Skill: `typescript-expert`]**
- ✅ Mantenha estado local no componente proprietário e eleve-o apenas até o
  ancestral comum que realmente precisa coordená-lo.
- ❌ Não use variável mutável de módulo como estado compartilhado.
- ❌ Não adote biblioteca de estado global antes de existir estado global real.

```ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string };
```

Estado persistente ou compartilhado entre rotas deve usar primeiro a URL ou a
fonte de dados responsável. Uma biblioteca global exige uma necessidade que não
possa ser atendida por props, composição, URL ou APIs nativas do React.

# 9. Configuração e ambiente

Configuração atual:

- `next.config.mjs` exporta um `NextConfig` vazio;
- TypeScript usa `strict`, `noEmit`, `moduleResolution: "bundler"` e o plugin do
  Next.js;
- ESLint estende `next/core-web-vitals`;
- variáveis de ambiente devem ser lidas e validadas em um módulo exclusivo do
  servidor.

Regras:

- ✅ Preserve configuração no arquivo da ferramenta responsável.
- ✅ Mantenha segredos somente no servidor.
- ✅ Valide uma variável obrigatória antes de usá-la.
- ❌ Não use prefixo `NEXT_PUBLIC_` em segredos; esse prefixo expõe o valor ao
  bundle do navegador.
- ❌ Não espalhe fallback silencioso para configuração obrigatória.

```ts
// lib/env.ts
import "server-only";

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  contactEmail: requiredEnvironment("CONTACT_EMAIL"),
} as const;
```

Somente `lib/env.ts` acessa `process.env` diretamente. Outros módulos importam o
objeto `env` tipado. Variáveis públicas devem usar `NEXT_PUBLIC_` apenas quando o
valor for intencionalmente exposto ao navegador.

---

# 10. Constantes e valores finitos

- ✅ Use `const` por padrão.
- ✅ Modele conjuntos finitos com união literal quando isso impedir valores
  inválidos.
- ✅ Use `satisfies` quando quiser validar a forma sem perder inferência literal.
- ❌ Não crie `enum` ou tipo sofisticado para uma lista sem comportamento ou
  contrato.
- ❌ Não repita números ou strings que tenham significado de domínio sem nome.

```ts
// ✅ BOM
type ServiceCategory = "residential" | "corporate" | "maintenance";

interface Service {
  title: string;
  category: ServiceCategory;
}

const services = [
  { title: "Projetos residenciais", category: "residential" },
  { title: "Jardins corporativos", category: "corporate" },
] satisfies readonly Service[];

// ❌ RUIM
const servicesBad = [
  { title: "Projetos residenciais", category: "whatever" },
];
```

O exemplo mostra uma ferramenta disponível; só crie `ServiceCategory` se a
categoria participar de regras, filtros ou contratos reais.

---

# 11. Valores opcionais e nulos

`strict` está habilitado em `tsconfig.json`, incluindo verificação estrita de
null. **[Configuração]**

- ✅ Modele ausência explicitamente com `?`, `undefined` ou `null` conforme o
  contrato da fronteira.
- ✅ Faça narrowing antes de usar um valor opcional.
- ❌ Não use non-null assertion (`!`) para ocultar um caso não tratado.
- ❌ Não use truthiness quando `""` ou `0` forem valores válidos.

```ts
// ✅ BOM
function projectSubtitle(subtitle: string | undefined): string {
  return subtitle ?? "Projeto paisagístico";
}

// ❌ RUIM
function projectSubtitle(subtitle?: string): string {
  return subtitle!;
}
```

---

# 12. Testes

**Padrão adotado a partir das skills:** Jest para unitários e componentes, React
Testing Library para renderização e `userEvent` para interações. As dependências
e o script de teste devem ser adicionados junto com o primeiro teste. Testes E2E
exigem decisão própria. **[Skill: `javascript-typescript-jest`]**

- ✅ Nomeie arquivos como `.test.ts` ou `.test.tsx` e mantenha-os ao lado do
  código testado; use `__tests__` somente para suítes transversais.
- ✅ Organize cenários relacionados com `describe` e escreva nomes que expressem
  o comportamento esperado.
- ✅ Teste comportamento observável, não detalhes internos.
- ✅ Consulte elementos por papel, label ou texto e use `userEvent` em vez de
  `fireEvent`.
- ✅ Use `async`/`await`, `resolves` ou `rejects` para código assíncrono.
- ✅ Restaure mocks com `jest.resetAllMocks()` em `afterEach`.
- ✅ Uma correção de bug deve incluir um teste de regressão.
- ❌ Não faça mock da unidade sob teste nem de funções puras internas.
- ❌ Não use snapshot grande como substituto de asserções de comportamento.

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ContactLink", () => {
  afterEach(() => jest.resetAllMocks());

  it("opens the configured email address", async () => {
    const user = userEvent.setup();
    render(<ContactLink email="contato@sobreiro.com" />);

    const link = screen.getByRole("link", { name: /solicitar orçamento/i });
    await user.click(link);

    expect(link).toHaveAttribute("href", "mailto:contato@sobreiro.com");
  });
});
```

---

# 13. Logging e observabilidade

**Padrão para o escopo atual:** não há dependência de observabilidade. Falhas
inesperadas são registradas uma única vez na fronteira de servidor, com mensagem
estável e contexto estruturado. A interface recebe uma mensagem segura.

- ✅ Registre o evento, a operação e identificadores técnicos necessários para
  correlação, sem incluir o payload completo por padrão.
- ✅ Nunca registre senhas, tokens, cookies, conteúdo de segredo ou dados
  pessoais sem finalidade e proteção explícitas.
- ❌ Não use `console.log` como contrato de observabilidade de produção.
- ❌ Não registre o mesmo erro em todas as camadas.

```ts
// ✅ Aceitável enquanto não houver logger dedicado: uma fronteira, objeto
// estruturado e nenhum segredo.
console.error("project.load.failed", {
  projectSlug,
  error: errorMessage(error),
});
```

Um logger dedicado deve preservar esse contrato e substituir a chamada na
fronteira, sem espalhar uma API de provider pelo domínio ou pela UI.

---

# 14. Padrões sensíveis à segurança

O projeto não possui fluxo autenticado. Se uma área protegida for criada, a
autenticação identifica o usuário e a autorização deve ser verificada no
servidor em cada operação protegida; ocultar controles na UI não concede nem
revoga permissão. A escolha do provider exige uma ADR de segurança. **[Skill:
`security-review`]**

- ✅ Trate todo dado externo como não confiável até ser validado.
- ✅ Mantenha segredos fora do código-fonte e de Client Components.
- ✅ Rastreie a origem de uma entrada e confirme se ela é controlada pelo usuário
  antes de classificá-la ou tratá-la como risco.
- ✅ Confie no escape padrão de texto do React; sanitize conteúdo externo somente
  quando HTML for um requisito comprovado.
- ✅ Use elementos e APIs nativas do framework sem desabilitar proteções por
  conveniência.
- ❌ Não renderize HTML externo com `dangerouslySetInnerHTML` sem sanitização
  comprovada.
- ❌ Não use somente ocultação na UI como autorização.

```tsx
// ❌ RUIM — conteúdo externo pode executar marcação/script malicioso.
function ExternalDescription({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ BOM — React escapa texto por padrão.
function ExternalDescription({ text }: { text: string }) {
  return <p>{text}</p>;
}
```

---

# 15. Padrões sensíveis à performance

**Padrão:** entregue HTML pelo servidor por padrão, mantenha a fronteira de
cliente mínima e meça antes de adicionar otimizações. Não existe orçamento
numérico específico do projeto; regressões devem ser comparadas com a versão
anterior da mesma rota.

- ✅ Prefira Server Components para conteúdo sem interatividade, reduzindo
  JavaScript enviado ao navegador. **[Framework]**
- ✅ Use chaves estáveis de domínio em listas; o código atual usa o próprio valor
  único do serviço. **[Código atual]**
- ✅ Garanta responsividade até telas móveis e respeite
  `prefers-reduced-motion`. **[Skill: `frontend-design`]**
- ❌ Não use o índice como chave quando itens puderem mudar de ordem.
- ❌ Não adicione memoização, cache ou virtualização sem medir o problema.

```tsx
// ✅ BOM
projects.map((project) => <article key={project.id}>{project.title}</article>);

// ❌ RUIM para coleções reordenáveis
projects.map((project, index) => <article key={index}>{project.title}</article>);
```

---

# 16. Padrões específicos de Next.js e React

- ✅ Use exports default para `page.tsx` e `layout.tsx`. **[Framework]**
- ✅ Exporte `metadata` tipado com `Metadata` quando o metadado for estático.
  **[Código atual]**
- ✅ Defina o idioma do documento no layout raiz. O projeto usa `pt-BR`.
  **[Código atual]**
- ✅ Importe `globals.css` uma vez no layout raiz. **[Código atual]**
- ✅ Adicione `"use client"` apenas na menor fronteira que requer APIs de cliente.
- ❌ Não use `useEffect` para calcular durante o cliente um valor que pode ser
  calculado diretamente durante a renderização.
- ❌ Não transforme links em `div` clicável.

```tsx
// ✅ BOM — metadado estático, tipado e renderizado pelo framework.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobreiro Paisagismo",
  description: "Projetos paisagísticos para transformar ambientes.",
};
```

```tsx
// ❌ RUIM — efeito desnecessário para dado derivado.
"use client";

function FullName({ firstName, lastName }: { firstName: string; lastName: string }) {
  const [fullName, setFullName] = useState("");
  useEffect(() => setFullName(`${firstName} ${lastName}`), [firstName, lastName]);
  return <p>{fullName}</p>;
}

// ✅ BOM
function FullName({ firstName, lastName }: { firstName: string; lastName: string }) {
  return <p>{`${firstName} ${lastName}`}</p>;
}
```

---

# 17. Padrões específicos de TypeScript

- ✅ Preserve `strict: true` e resolva erros de tipo em vez de afrouxar a
  configuração. **[Configuração]**
- ✅ Use `import type` para imports exclusivamente de tipo. **[Código atual]**
- ✅ Prefira `unknown` a `any` na entrada de dados não tipados.
- ✅ Declare tipos explícitos em props, configuração e APIs públicas.
- ✅ Prefira tipos simples e legíveis a programação de tipos sem necessidade.
- ✅ Use união discriminada quando estados mutuamente exclusivos precisarem ser
  modelados.
- ❌ Não use casts `as` para contornar validação ausente.
- ❌ Não adicione `@ts-ignore` sem justificativa e decisão explícita.

```ts
// ✅ BOM — estados inválidos não são representáveis.
type ProjectState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; projects: readonly Project[] }
  | { status: "error"; message: string };

// ❌ RUIM — permite loading=true junto com data e error ao mesmo tempo.
interface ProjectStateBad {
  loading: boolean;
  projects?: Project[];
  error?: string;
}
```

Não adote branded types, tipos recursivos ou generics avançados até que um erro
real de domínio justifique a complexidade.

---

# 18. Complexidade e legibilidade

Não há limites automáticos de tamanho ou complexidade configurados.

- ✅ Use retorno antecipado quando ele eliminar aninhamento.
- ✅ Nomeie funções pelo resultado ou pela ação de domínio.
- ✅ Mantenha JSX legível; extraia um componente quando houver uma unidade
  semântica clara.
- ✅ Aceite pequena duplicação até que exista um padrão estável para abstrair.
- ❌ Não extraia uma função que apenas renomeia uma linha sem melhorar intenção,
  teste ou reutilização.
- ❌ Não use parâmetro booleano quando duas ações com nomes diferentes forem
  mais claras.

```ts
// ✅ BOM
function contactLabel(email: string | undefined): string {
  if (!email) return "Contato indisponível";
  return `Fale conosco: ${email}`;
}

// ❌ RUIM
function contactLabel(email?: string): string {
  if (email) {
    return `Fale conosco: ${email}`;
  } else {
    return "Contato indisponível";
  }
}
```

# 19. Antipadrões comuns

| Antipadrão | Por que é um problema | Padrão correto |
| --- | --- | --- |
| `"use client"` em páginas estáticas | Aumenta o JavaScript no cliente e perde benefícios do servidor | Server Component por padrão; fronteira cliente mínima |
| `any`, `!` ou cast para silenciar o compilador | Oculta estados e entradas não tratados | `unknown`, narrowing e tipos explícitos |
| Índice como chave de lista mutável | Pode associar estado ao item errado | ID estável do domínio |
| `div` clicável no lugar de elemento nativo | Prejudica teclado, semântica e acessibilidade | `a` para navegação, `button` para ação |
| Estado global mutável em módulo | Pode vazar entre renders/requisições e cria dependência oculta | Props, estado local ou solução escolhida por decisão explícita |
| Camada ou abstração especulativa | Aumenta custo sem resolver um problema atual | Abstrair após responsabilidade e consumidores reais existirem |
| Biblioteca sem caso de uso | Cria padrão acidental e custo de manutenção | Registrar a necessidade e escolher conscientemente |

# 20. Padrões específicos do projeto

## Conteúdo em português do Brasil

- ✅ Preserve `lang="pt-BR"` no layout raiz.
- ✅ Escreva o texto visível ao usuário em português do Brasil, salvo conteúdo
  explicitamente localizado.
- ❌ Não misture idiomas na mesma experiência sem requisito de localização.

**Referência:** `app/layout.tsx` e `app/page.tsx`.

## Seções nomeadas de forma acessível

- ✅ Quando uma `section` for introduzida por um título, use
  `aria-labelledby` apontando para o `id` desse título.
- ❌ Não duplique IDs nem aponte para um elemento inexistente.

```tsx
// ✅ Referência do projeto
<section className="services" aria-labelledby="services-title">
  <h2 id="services-title">Serviços em destaque</h2>
</section>
```

**Referência:** `app/page.tsx`.

## CSS global atual

O projeto usa um único `globals.css`, importado pelo layout. O padrão inicial é
CSS nativo com custom properties em `:root` para tokens de cor, tipografia,
espaçamento, borda, sombra e movimento. CSS Modules só deve ser introduzido
quando o escopo global gerar conflito real; CSS-in-JS não faz parte do padrão.
**[Skills: `design-system`, `frontend-design`]**

- ✅ Nomeie tokens pela função (`--color-text`, `--space-section`) e não pelo
  valor (`--green`, `--space-48`).
- ✅ Todo componente reutilizável documenta propósito, props, variantes, estados,
  tamanhos, comportamento, teclado e anúncio por leitor de tela.
- ✅ Implemente foco visível, layout responsivo e alternativa para movimento
  reduzido.
- ✅ Verifique a especificidade dos seletores para evitar regras que se anulem.
- ✅ Reutilize tokens e a linguagem visual antes de criar uma variante quase
  idêntica.
- ❌ Não adicione uma segunda tecnologia de estilos sem necessidade e decisão.
- ❌ Não use valores arbitrários repetidos quando eles representam o mesmo papel
  visual.

```css
:root {
  --color-text: #183223;
  --color-surface: #f6f3ea;
  --space-section: clamp(2rem, 7vw, 5.5rem);
  --radius-card: 1.75rem;
  --motion-fast: 160ms;
}

:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    transition-duration: 0.01ms;
    animation-duration: 0.01ms;
  }
}
```
