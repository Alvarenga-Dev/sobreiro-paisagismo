# Design System — Sobreiro Paisagismo

Este documento descreve o sistema implementado pela mudança
`build-home-component-design-system`. A Home é a composição de referência. O
sistema usa CSS nativo global, Server Components por padrão e duas fronteiras
cliente: `MenuTrigger` e `ProjectCarousel`.

## 1. Direção visual

A identidade é um “jardim noturno editorial”: verde quase preto como campo
dominante, marfim em grandes painéis, oliva em ações e pequenos sinais, títulos
serifados e fotografia com luz baixa. O ritmo vem da sequência
`escuro → imagem escurecida → claro → escuro → claro → escuro`.

O gesto distintivo é a alternância entre fotografia imersiva e desenhos
botânicos lineares de baixa opacidade. Eles não carregam conteúdo e permanecem
fora da árvore de acessibilidade.

## 2. Foundations

### 2.1 Auditoria dos tokens anteriores

`app/color-tokens.css` já continha primitives `forest`, `olive`, `gold` e
`neutral`, aliases genéricos e aliases de vidro. A auditoria encontrou apenas
um consumidor de arquivo: o import em `app/globals.css`. Nenhum componente
anterior consumia custom properties; a Home mínima usava valores hardcoded.

Os aliases anteriores foram preservados como camada de compatibilidade:

| Grupo preservado | Aliases | Consumidores atuais |
| --- | --- | --- |
| Ação genérica | `--color-primary*` | Compatibilidade; novos componentes usam `--color-action-*` |
| Fundo e superfície | `--color-background*`, `--color-surface*` | Compatibilidade |
| Texto | `--color-text-*` anteriores | Compatibilidade |
| Borda e premium | `--color-border*`, `--color-premium` | Compatibilidade |
| Vidro | `--glass-*`, `--glass-border-*` | `SiteHeader`, `QuoteCard` e aliases futuros |

Primitives só são usados dentro da declaração de aliases. Componentes usam
papéis funcionais.

### 2.2 Matriz de papéis semânticos

| Papel | Superfície | Texto | Borda | Ícone | Foco |
| --- | --- | --- | --- | --- | --- |
| Canvas | `--color-canvas-external` | — | — | — | — |
| Escuro principal | `--color-surface-dark-primary` | `--color-text-on-dark` | `--color-border-on-dark` | `--color-icon-on-dark` | `--color-focus-on-dark` |
| Escuro elevado | `--color-surface-dark-raised` | `--color-text-on-dark-muted` | `--color-border-on-dark-strong` | `--color-icon-accent` | `--color-focus-on-dark` |
| Claro principal | `--color-surface-light-primary` | `--color-text-on-light` | `--color-border-on-light` | `--color-icon-on-light` | `--color-focus-on-light` |
| Claro elevado | `--color-surface-light-secondary` | `--color-text-on-light-muted` | `--color-border-on-light-strong` | `--color-icon-accent` | `--color-focus-on-light` |
| Acento | `--color-action-accent` | `--color-action-accent-text` | transparente | corrente | `--color-focus-on-light` |
| Mídia | `--color-surface-media-fallback` | `--color-text-on-dark` | `--color-border-on-dark` | — | `--color-focus-on-dark` |

### 2.3 Tipografia

| Papel | Token / família | Uso |
| --- | --- | --- |
| Display | `--font-display`, `--font-size-display` | `DisplayHeading` e hero |
| Título de seção | `--font-display`, `--font-size-section` | `SectionHeading` e banner |
| Título de card | `--font-display`, `--font-size-title` | Projetos e citação |
| Corpo | `--font-body`, `--font-size-body*` | Textos editoriais e descrição |
| Utilitário | `--font-utility`, `--font-size-caption` | Controles e metadados |
| Eyebrow | `--font-utility`, `--font-size-eyebrow` | Rótulos em caixa alta |

Georgia e a pilha sans do sistema são fallbacks aprovados até a definição das
fontes oficiais. Títulos usam `text-wrap: balance`; corpo usa `text-wrap: pretty`.

### 2.4 Ritmo, geometria, camada e movimento

- Espaço: `--space-2xs` até `--space-3xl`, `--space-section`, gutter editorial e inset próprio da navbar flutuante.
- Largura: `--width-content` e `--width-reading`.
- Alvo: `--size-touch` fixa o mínimo de 44 px.
- Geometria: `--radius-control`, `--radius-card` e `--radius-panel`.
- Borda: `--border-hairline`.
- Elevação: `--shadow-soft` e `--shadow-control`.
- Camadas: `--z-base`, `--z-media`, `--z-content` e `--z-decoration`.
- Movimento: `--motion-fast`, `--motion-base`, `--motion-slow` e `--ease-standard`.

Não existe autoplay. `prefers-reduced-motion: reduce` remove deslocamento suave,
animações e transições não essenciais. Nenhuma seção depende de altura fixa;
hero e mídias usam `min-height` ou `aspect-ratio` para reservar espaço.

## 3. Propriedade e cobertura do UI MAP

| Proprietário | Componentes / slots |
| --- | --- |
| Foundations | tokens, reset, foco, redução de movimento e utilidades globais |
| `app/_components/LineIcon.tsx` | `LineIcon` |
| `app/_components/ButtonLink.tsx` | `ButtonLink`, `ContactButton`, `SecondaryButton`, `SectionAction`, `ActionGroup` |
| `app/_components/Typography.tsx` | `SectionHeading`, `DisplayHeading`, `SupportingCopy` |
| `app/_components/Brand.tsx` | `BrandLockup`, `BrandEmblem`, `FooterBrand`, `BotanicalDecoration` |
| `app/_components/CardSurface.tsx` | `CardSurface` |
| `app/_components/PaginationDots.tsx` | `PaginationDots` |
| `app/_components/MenuTrigger.tsx` | `MenuTrigger` |
| `app/_components/ProjectCard.tsx` | `ProjectCard` |
| `app/_components/SiteFrame.tsx` | `SiteFrame` |
| `app/_components/SiteHeader.tsx` | `SiteHeader` |
| `app/_components/SiteFooter.tsx` | `FooterNavGroup`, `SocialLinks`, `LegalBar`, `SiteFooter` |
| `app/_components/ContactBanner.tsx` | `ContactBanner`; `BannerMessage` é slot privado |
| `app/_home/HeroSection.tsx` | `HeroSection`; `HeroBackdrop` e `HeroContent` são slots privados |
| `app/_home/BenefitsPanel.tsx` | `BenefitsPanel`, `BenefitCard` |
| `app/_home/ProjectsSection.tsx` | `ProjectsSection` |
| `app/_home/ProjectCarousel.tsx` | `ProjectCarousel` |
| `app/_home/AboutPanel.tsx` | `AboutPanel`, `MediaFrame`, `QuoteCard`, `MediaQuoteComposite` |
| `app/sobre/_components/` | `AboutHero`, `EssenceSection`, `FounderSection`, `ContactMethodsSection` e `ContactMethodCard` |
| `app/page.tsx` | `HomePage` |
| `app/sobre/page.tsx` | `AboutPage` |

Slots privados possuem nome e responsabilidade no catálogo, mas não são exports
independentes porque não têm consumidor ou API própria. Não há nó órfão do
`docs/UI-MAP-HOME.md`.

## 4. Catálogo de primitivas

| Componente | Propósito e API | Variantes / tamanhos | Estados e tokens | Acessibilidade / responsividade |
| --- | --- | --- | --- | --- |
| `ButtonLink` | Link visual para destinos. `href`, `children`, ícones, `ariaLabel`, `external`, `disabled`. | `accent`, `outlineInverse`, `outlineNeutral`; `md`, `lg`. | repouso, hover, active, focus-visible, disabled; `--color-action-*`, `--radius-control`, `--size-touch`. | É sempre `<a>`; disabled remove destino e expõe `aria-disabled`. Enter ativa. Pode ocupar a largura do grupo em telas estreitas. |
| `SectionHeading` | Eyebrow e fragmentos tipados. `id`, `fragments`, `eyebrow`, `context`, `level`. | `onDark`, `onLight`; níveis 2 e 3. | acento pelo fragmento, sem HTML arbitrário. | Mantém uma única ordem textual; título relaciona a seção via `aria-labelledby`. |
| `DisplayHeading` | Título editorial principal. `id`, `fragments`, `level`. | níveis 1 e 2. | fragmento de acento e escala fluida. | A Home usa uma única instância `h1`. |
| `SupportingCopy` | Corpo editorial. `children`, `context`. | `onDark`, `onLight`. | texto principal ou muted da superfície. | Largura de leitura limitada; quebra natural de conteúdo longo. |
| `LineIcon` | Caixa SVG com `currentColor`. `name`, `size`, `decorative`, `label`. | `sm`, `md`, `lg`; 11 desenhos. | herda cor e stroke. | Decorativo por padrão com `aria-hidden`; informativo usa `role=img` e rótulo. |
| `CardSurface` | Superfície e geometria sem decidir marcação. `children`, `tone`. | `light`, `dark`, `media`. | borda e fundo por contexto. | Não adiciona papel ARIA; consumidor escolhe semântica. |
| `PaginationDots` | Comunica e, opcionalmente, altera página. `count`, `activeIndex`, `label`, `onSelect`. | estático ou interativo. | idle, active, hover, focus. | Interativo usa botões de 44 px, `aria-current=page` e rótulos com posição; estático fornece texto oculto. |
| `BrandEmblem` | Fallback de emblema com caixa estável. `label`, `decorative`. | informativo ou decorativo. | cor via `currentColor`. | Informativo usa `role=img`; decoração usa `aria-hidden`. |
| `BrandLockup` | Link da marca. `href`, `compact`. | padrão, compacto. | foco sobre escuro. | O texto visível nomeia a marca e o link tem nome completo; fallback não depende de arquivo. |
| `BotanicalDecoration` | Ornamento linear. `position`. | esquerda, direita. | baixa opacidade e sem interação. | Sempre `aria-hidden`, `focusable=false`, `pointer-events:none`. |

### Exemplo de primitiva

```tsx
<ButtonLink
  href="#projetos"
  size="lg"
  variant="outlineInverse"
  trailingIcon={<LineIcon name="arrowRight" />}
>
  Ver projetos
</ButtonLink>
```

Use `ButtonLink` para navegação. Ações que só alteram estado de interface usam
`button`, como `MenuTrigger` e controles do carrossel.

## 5. Catálogo compartilhado de site e domínio

| Componente | API e composição | Comportamento / estados | Teclado e leitor de tela | Responsividade e tokens |
| --- | --- | --- | --- | --- |
| `ContactButton` | `href`, `label`; preset de `ButtonLink accent` com ícone de mensagem. | Estados de `ButtonLink`; destino totalmente configurável. | Link anunciado pelo rótulo; Enter abre o destino. | Pode crescer no hero e banner; ação e alvo pelos tokens de controle. |
| `SecondaryButton` | `href`, `label`; preset `outlineNeutral`. | Apoio em superfícies claras. | Link nativo. | Largura pelo conteúdo, quebra do grupo em estreito. |
| `SectionAction` | `href`, `label`; preset `outlineInverse` com seta. | Navegação secundária sobre escuro. | Nome acessível explicita navegação. | Fica junto ao heading ou quebra abaixo. |
| `ActionGroup` | `children`, `className`. | Agrupa links sem mudar semântica. | Ordem DOM igual à visual. | Flex e quebra; ações podem preencher linha estreita. |
| `MenuTrigger` | `expanded`, `controlsId`, `onExpandedChange`, `disabled`. | fechado, pressed, focus, expanded e não expansível. | Botão nativo; Enter/Espaço; `aria-expanded`, `aria-controls` e nome dinâmico. | 44 px mínimo. Na Home fica desabilitado porque o painel não foi definido. |
| `ProjectCard` | `project` com ID, destino, textos e mídia tipada. | hover, active, focus-visible; recorte estável. | Um único link nomeado; nenhuma ação aninhada. | Aspect ratio fixo; ocupa a coluna definida pelo carrossel. |
| `SiteFrame` | slots `header`, `children`, `footer`; variante `fullBleed` usada pelas rotas atuais. | Shell full-bleed, overflow e canvas escuro entre seções; sem margem, largura máxima, borda, raio ou sombra externos. | Inclui skip link e `main` nomeável por estrutura; a ordem permanece header → main → footer. | Ocupa toda a largura e ao menos a altura do viewport sem criar overflow horizontal. |
| `SiteHeader` | `contactHref`, `contactLabel`, `presentation` e `showContact`. | Superfície flutuante sobre o hero, com fundo escuro, contorno, raio, sombra e menu não expansível. | Landmark `banner`, link de marca, link de contato e botão nomeado; foco visível e skip link ficam acima da sobreposição. | Inset lateral/superior próprio com safe areas; CTA aparece a partir de 640 px, enquanto marca e menu preservam alvos de 44 px. |
| `FooterNavGroup` | `label`, `links`, `index`. | links com hover/focus. | Cada grupo é `nav` com heading exclusivo; links são lista. | Coluna da grade compacta. |
| `SocialLinks` | lista de `label`, `href`, `icon`. | ícones em alvos circulares. | `nav` distinguível; cada link tem nome completo. | Mantém alvos de 44 px. |
| `LegalBar` | copyright, crédito e destino. | links discretos. | Texto e link nativos na última ordem de leitura. | Uma coluna no estreito e duas a partir de 640 px. |
| `FooterBrand` | descrição e slot social. | Marca + resumo. | Link da marca e texto corrido. | Ocupa a coluna mais larga do rodapé. |
| `SiteFooter` | descrição, grupos, redes e legal. | Compõe os componentes de rodapé. | landmark `contentinfo`; navs possuem nomes distintos. | Grade 1 coluna no estreito e 3 colunas a partir de 640 px. |
| `ContactBanner` | ID, fragmentos, destino/label e ação secundária opcional. | CTA principal e link de apoio. | `section` ligada ao `BannerMessage`; decoração oculta. | Empilha no estreito e fica horizontal a partir de 640 px. |
| `BannerMessage` | Slot privado de `ContactBanner`; recebe ID e fragmentos. | Título editorial com acento. | `h2` nomeia a seção. | Máximo de 14 caracteres por linha visual; escala fluida. |

## 6. Catálogo exclusivo da Home

| Componente | API e composição | Comportamento / estados | Teclado e leitor de tela | Responsividade e tokens |
| --- | --- | --- | --- | --- |
| `HeroSection` | `content`; compõe backdrop e conteúdo. | Imagem prioritária, overlays horizontal/vertical. | `section` ligada ao único `h1`; mídia é decorativa porque a mensagem textual cobre sua função. | Conteúdo determina altura com mínimo editorial; overlay fica mais concentrado à esquerda em telas amplas. |
| `HeroBackdrop` | Slot privado de mídia substituível. | `next/image`, `fill`, `priority`, recorte configurável. | `alt=""` e `aria-hidden`. | `sizes` cobre mobile e shell amplo. |
| `HeroContent` | Slot privado de título, copy e ações. | Sem estado próprio. | Ordem: eyebrow, `h1`, corpo, ações. | Largura de leitura e ações quebráveis. |
| `BenefitCard` | `benefit` tipado. | Ícone, título e descrição. | Cada item é `li`; ícone decorativo. | Superfície com altura mínima interna; texto pode crescer. |
| `BenefitsPanel` | heading e lista de benefícios. | Coleção de 5 itens no conteúdo atual. | Seção nomeada, lista nomeada. | Scroll horizontal no estreito; 5 colunas a partir de 896 px. |
| `ProjectsSection` | heading e projetos. | Cabeçalho + ação + carrossel. | Seção nomeada; título e ação permanecem fora do track. | Cabeçalho quebra abaixo de 432 px. |
| `ProjectCarousel` | lista de projetos. | anterior/próximo, dots, início/fim, estado ativo, sem autoplay. | Região rotulada como carrossel, Tab nos controles/links, setas esquerda/direita no track, `aria-live` para página ativa. | Base sempre rolável com scroll snap; 1 card estreito, ~2 no tablet e 3 no desktop. |
| `MediaFrame` | mídia de Sobre. | Área estável e recorte configurável. | Imagem informativa com alt. | Proporção 4:3 e `sizes` por faixa. |
| `QuoteCard` | citação, autoria e papel. | Sobreposição visual sobre a mídia. | `figure`, `blockquote` e `figcaption` mantêm relação semântica. | Fica abaixo da mídia no estreito; sobreposição cresce com espaço. |
| `MediaQuoteComposite` | mídia + citação. | Coordena sobreposição sem reordenar DOM. | Leitura mantém mídia antes de citação/autoria. | Não inverte conteúdo; remove pressão de sobreposição no estreito. |
| `AboutPanel` | conteúdo institucional tipado. | Composição de mídia, texto, ação e ornamento. | Seção nomeada; ornamento oculto. | Empilha no estreito e usa duas colunas a partir de 640 px. |
| `HomePage` | consome `homeContent` e ordena slots do `SiteFrame`. | Sem estado ou infraestrutura. | Ordem: header, main com hero/benefícios/projetos/sobre/contato, footer; um `h1`. | Conteúdo muda sem alterar marcação estrutural. |

### Exemplo de conteúdo substituível

```ts
const benefit = {
  id: "conforto",
  icon: "droplet",
  title: "Conforto térmico",
  description: "A vegetação ajuda a amenizar o calor.",
} satisfies BenefitContent;
```

O conteúdo inicial vive em `app/_home/homeContent.ts`. Não mova textos para os
componentes nem crie CMS até existir uma integração aprovada.

## 7. Responsividade

Os breakpoints representam falha de conteúdo, não medição do PNG:

| Faixa validada | Regra principal |
| --- | --- |
| 320–431 px | Shell encosta às bordas; navbar usa inset compacto; CTA do header fica oculto; benefícios/projetos continuam roláveis e os alvos não são reduzidos. |
| 432–639 px | Cabeçalho de projetos volta à linha; coleções continuam roláveis. |
| 640–895 px | CTA do header aparece; navbar e hero mantêm clearance; Sobre e banner ganham duas colunas; projetos mostram ~2 cards. |
| 896–1099 px | Benefícios passam para 5 colunas; densidade do mobile de referência é preservada. |
| 1100 px ou mais | Conteúdo e mídia permanecem full-bleed; projetos mostram 3 cards, e gutters editoriais e sobreposição da citação aumentam. |

O inset da navbar, sua altura mínima e o clearance do hero são tokens funcionais
distintos de `--gutter-section`. O hero reserva a soma do deslocamento superior,
da altura mínima do cabeçalho e de uma margem de segurança, inclusive quando o
texto quebra ou é ampliado. O CTA do cabeçalho é a primeira ação omitida quando
falta largura; marca, menu e foco visível permanecem prioritários.

Coleções usam scroll horizontal como fallback progressivo; conteúdo nunca some
sem JavaScript. Os limites de leitura permanecem nos contêineres internos,
enquanto superfícies e mídias podem alcançar as bordas do viewport.

## 8. Acessibilidade

- Skip link é o primeiro controle focável e leva a `#conteudo-principal`.
- Todos os controles usam elementos nativos, foco `:focus-visible` e alvo de
  pelo menos 44 × 44 px.
- A página possui um único `h1`; cada seção aplicável usa `aria-labelledby`.
- Ícones e ornamentos decorativos são ocultos; mídia informativa tem alt.
- O carrossel não usa autoplay, possui botões, setas de teclado, estado de
  início/fim, `aria-current` e anúncio polite.
- O menu não inventa painel: na Home ele é anunciado como conteúdo em definição
  e fica desabilitado. O contrato controlado está testado para uso futuro.
- Ordem DOM, ordem visual e ordem de tabulação permanecem equivalentes.
- `prefers-reduced-motion` desativa scroll suave e transições não essenciais.

## 9. Recomendações de uso

| Faça | Evite |
| --- | --- |
| Escolha a variante pelo contexto de superfície. | Copiar regras de botão em uma seção. |
| Passe conteúdo por objetos tipados. | Inserir HTML arbitrário em títulos. |
| Use `ProjectCard` com um único destino. | Aninhar botão ou segundo link no card. |
| Preserve `sizes`, proporção e alt ao trocar mídia. | Depender da fotografia para garantir contraste. |
| Mantenha a Home majoritariamente no servidor. | Elevar `use client` para a página inteira. |
| Adicione um novo token quando o papel realmente se repetir. | Nomear token pelo valor ou por uma tela específica. |

## 10. Pontos provisórios e substituição

| Item provisório | Estado atual | Ponto de substituição sem alterar API |
| --- | --- | --- |
| Logo, emblema e ornamentos | SVGs lineares fallback em `Brand.tsx` | Fazer `BrandEmblem`/`BrandLockup` consumir os arquivos oficiais mantendo caixa e rótulos. |
| Fontes | Georgia + pilha sans do sistema | Alterar `--font-display` e `--font-body` ou integrar fonte aprovada no layout. |
| Hero e projetos | Fotografias provisórias do Unsplash | Trocar `src`, `alt`, `position` e dimensões em `homeContent.ts`. |
| Destino de contato | `mailto:contato@sobreiro.com.br` | Alterar `siteContent.contact`; consumidores globais recebem o destino por props. |
| Menu | Gatilho não expansível | Fornecer painel, `controlsId`, estado e callback sem mudar `MenuTrigger`. |
| Projetos | 3 itens demonstrativos e destinos `#contato` | Trocar a lista local e os destinos, mantendo `ProjectCardData`. |
| Instagram | Destino genérico | Substituir em `homeContent.footer.socialLinks`. |
| Texto e autoria | Conteúdo editorial provisório | Substituir objetos locais sem mudar componentes. |

Fotografias provisórias:

- Hero: `photo-1416879595882-3373a0480b5b`.
- Projeto residencial: `photo-1585320806297-9794b3e4eeae`.
- Área de convivência: `photo-1600566753086-00f18fb6b3ea`.
- Piscina: `photo-1600607687920-4e2a09cf159d`.
- Sobre: `photo-1558904541-efa843a96f01`.

## 11. Validação

Automação prevista:

```bash
npx tsc --noEmit
npm test -- --runInBand
npm run lint
npm run build
```

### Resultado da inspeção visual

| Viewport | Resultado |
| --- | --- |
| 320 × 900 px | Sem overflow da página; coleções mantêm scroll interno; header compacto; Sobre, banner e rodapé quebram de forma controlada. O `heroContent` foi corrigido para não ultrapassar o frame. |
| 768 × 900 px | Header em uma linha, Sobre e banner em 2 colunas, projetos progressivamente visíveis e coleções sem corte de conteúdo. |
| 941 × 1000 px | Composição de referência confirmada: 5 benefícios e 3 projetos integralmente visíveis, Sobre em 2 colunas, banner horizontal e rodapé em grade compacta. |
| 1440 × 1000 px | Frame limitado a 1313 px no ambiente de teste, 5 benefícios e 3 projetos, respiro ampliado e nenhuma imagem quebrada. |

Em todas as larguras, `scrollWidth` não superou a largura interna do viewport,
nenhum controle visível ficou abaixo de 44 × 44 px e não houve imagem concluída
com `naturalWidth` igual a zero.

### Auditoria de acessibilidade

- Contraste calculado dos papéis recorrentes: acento sobre escuro 7,40:1;
  texto principal sobre escuro 16,97:1; muted sobre escuro 10,09:1; texto
  principal sobre claro 14,00:1; muted sobre claro 4,61:1; acento sobre claro
  5,99:1; texto de ação sobre oliva 8,08:1.
- Todos os controles possuem semântica nativa; icon buttons têm nome;
  decoração está oculta; seções apontam para headings existentes.
- O foco global usa outline sólido de 3 px. O fluxo de menu foi confirmado por
  `userEvent` e a suíte cobre ativação por Enter, estado expandido e destino.
- Não há autoplay, `transition: all`, bloqueio de zoom, ação em `div`/`span` ou
  `outline: none`. O carrossel possui alternativa de clique e teclado.
- O CSS contém uma regra global de movimento reduzido e o carrossel consulta a
  mesma preferência antes de rolar suavemente.

A revisão também foi comparada com a versão vigente das Web Interface
Guidelines em 31/08/2026; nenhuma divergência permaneceu nos arquivos da Home.

## 12. Extensões da página Sobre

### Variantes compartilhadas

| Componente | API adicionada | Padrão preservado | Uso em `/sobre` |
| --- | --- | --- | --- |
| `SiteFrame` | `variant: "inset" \| "fullBleed"` | API preservada; o shell base não aplica moldura externa | `fullBleed`; o conteúdo de cada região continua limitado por `--width-content` |
| `SiteHeader` | `presentation: "standard" \| "floating"` e `showContact` | API preservada; a Home seleciona `floating` com CTA responsivo | `floating`, com superfície escura insetada e CTA omitido |
| `LineIcon` | desenhos `award`, `calendar`, `graduationCap` e `users` | caixa, tamanhos, `currentColor` e modo decorativo existentes | valores, credenciais e agendamento |

O `SiteFooter` não precisou de nova API. Seus dados agora pertencem a
`app/_content/siteContent.ts`, preservando exatamente a saída observável da Home
e permitindo o reuso pela rota interna sem dependência de `_home`.

### Propriedade e estados locais

Os componentes em `app/sobre/_components/` pertencem somente à rota. O conteúdo
e seus contratos readonly ficam em `app/sobre/aboutContent.ts`; a página e as
seções continuam Server Components, e `MenuTrigger` permanece a única fronteira
cliente herdada.

`ContactMethod` é uma união discriminada:

- `configured`: exige `href` e `accessibleLabel` e renderiza um único `<a>` nativo
  envolvendo toda a superfície;
- `unavailable`: exige uma mensagem explícita e renderiza conteúdo informativo
  sem `href`, `tabIndex`, papel de botão ou estado de hover acionável.

No estado atual, somente o e-mail global está configurado. WhatsApp e agenda não
fabricam destinos. O perfil usa identidade neutra, omite registro e assinatura e
mostra um fallback informativo para o retrato. Credenciais não aprovadas aparecem
como categorias em validação editorial, nunca como fatos profissionais.

### Responsividade e acessibilidade

- Em 320 px, regiões, valores, perfil e contatos usam uma coluna; em 640 px,
  Essência ganha duas colunas, valores usam grade 2 × 2 e contatos usam duas
  colunas; a partir de 896 px, valores ocupam quatro colunas e o perfil distribui
  introdução, retrato e credenciais em três áreas. Contatos só usam três colunas
  quando os seus rótulos cabem sem fragmentação.
- Regiões não têm altura fixa. Hero usa `min-height`; mídias reservam espaço por
  `aspect-ratio`, `sizes`, fallback de superfície e `object-position` configurado.
- O breadcrumb é uma navegação nomeada, o hero contém o único `h1`, cada região
  principal aponta para seu `h2`, e coleções informativas usam listas.
- Ícones repetitivos e ornamentos são decorativos. Somente links reais recebem
  foco; os alvos mantêm ao menos `--size-touch` (44 px) e o foco muda conforme a
  superfície.
- A regra global de `prefers-reduced-motion` cobre as transições adicionadas. Não
  há animação de entrada, sticky header, painel de menu ou reordenação visual do
  DOM.

### Validação da rota Sobre — 07/09/2026

| Viewport | Resultado observado |
| --- | --- |
| 320 × 900 px | Regiões, valores e contatos em uma coluna; título e cabeçalho preservados; e-mail sem fragmentação; `scrollWidth` igual a 320 px |
| 640 × 900 px | Essência em duas colunas, valores 2 × 2, contatos 2 + 1 e rodapé em duas áreas legíveis, sem conteúdo cortado |
| 896 × 900 px | Quatro valores, perfil em três áreas e contatos em duas colunas orientadas pelo conteúdo; nenhuma imagem quebrada |
| 1440 × 1000 px | Conteúdo interno limitado a 1216 px, composição assimétrica ampla, contatos em três colunas e gutters crescentes |

Em todos os casos a ordem DOM permaneceu `hero → essência → perfil → contato`,
sem overflow horizontal. A inspeção encontrou um único `h1`, zero focáveis nos
dois contatos indisponíveis e alvos acionáveis com altura mínima de 44 px. As
relações recorrentes de contraste usadas pela rota medem 7,40:1 para acento em
escuro, 10,09:1 para texto muted em escuro, 5,99:1 para acento em claro e 4,61:1
para texto muted em claro; o foco quente sobre escuro mede 12,79:1.

TypeScript, 23 testes Jest, ESLint e o build de produção passaram. O Next.js
classificou `/sobre` como rota estática.
