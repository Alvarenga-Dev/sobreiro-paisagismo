# Design System — Sobreiro Paisagismo

Este documento descreve o sistema implementado pela mudança
`build-home-component-design-system`. A Home é a composição de referência. O
sistema usa CSS nativo global, Server Components por padrão e fronteiras cliente
pequenas para navegação, transição de rota e carrossel.

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

- Espaço: `--space-2xs` até `--space-3xl`, `--space-section`, gutter editorial e `--navbar-inset-*`.
- Largura: `--width-content` e `--width-reading`.
- Alvo: `--size-touch` fixa o mínimo de 44 px.
- Geometria: `--radius-control`, `--radius-card` e `--radius-panel`.
- Borda: `--border-hairline`.
- Elevação: `--shadow-soft` e `--shadow-control`.
- Camadas: `--z-base`, `--z-media`, `--z-content`, `--z-decoration` e `--navbar-layer`.
- Navbar: `--navbar-offset-block`, `--navbar-min-height`, `--navbar-clearance`, `--navbar-surface` e `--navbar-indicator-motion`.
- Movimento: `--motion-fast`, `--motion-base`, `--motion-slow`, `--route-transition-motion` e `--ease-standard`.

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
| `app/_components/DesktopNavigation.tsx` | `DesktopNavigation` e indicador ativo |
| `app/_components/MobileNavigation.tsx` | `MobileNavigation` e ciclo do diálogo |
| `app/_components/RouteTransition.tsx` | shell persistente e viewport mutável da rota |
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
| `app/sobre/_components/` | `AboutHero`, `EssenceSection`, `TeamProfileSection`, `ContactMethodsSection` e `ContactMethodCard` |
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
| `BrandEmblem` | Emblema com caixa estável. `label`, `decorative`, `artwork`, `flowerTone`. | `fallback` vetorial ou flor oficial `olive`/`light`; informativo ou decorativo. | fallback via `currentColor`; flor oficial em SVG oliva ou neutro claro. | Informativo usa `role=img`; decoração usa `aria-hidden`; a arte preserva proporção sem alterar a caixa. |
| `BrandLockup` | Link da marca. `href`, `compact`, `emblem`. | padrão, compacto; fallback ou flor oficial. | foco sobre escuro; Navbar, menu mobile e footer usam a flor oliva. | O texto visível nomeia a marca e o link tem nome completo; outros consumidores preservam o fallback até migração explícita. |
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
| `MenuTrigger` | `expanded`, `controlsId`, `onExpandedChange`, `disabled`. | fechado, pressed, focus e expanded. | Botão nativo; Enter/Espaço; `aria-expanded`, `aria-controls` e nome dinâmico. | 44 px mínimo; apresentado abaixo de `64rem`. |
| `ProjectCard` | `project` com ID, destino, textos e mídia tipada. | hover, active, focus-visible; recorte estável. | Um único link nomeado; nenhuma ação aninhada. | Aspect ratio fixo; ocupa a coluna definida pelo carrossel. |
| `SiteFrame` | slots `children` e `footer`; variante `inset` ou `fullBleed`. | Frame da rota sem possuir navegação global. | Fornece um único `main#conteudo-principal` focalizável e o rodapé da rota. | Ocupa toda a largura e ao menos a altura do viewport sem criar overflow horizontal. |
| `SiteHeader` | `navigation`, `mobileMenu` e `whatsapp`, todos com defaults globais. | Cápsula flutuante escura; marca, lista desktop, CTA condicional e menu mobile. | Landmark `banner`; marca volta ao Início; a navegação se chama “Navegação principal”; exatamente um destino conhecido usa `aria-current=page`. | Lista desktop a partir de `64rem`; gatilho mobile abaixo; CTA só aparece no desktop quando uma URL HTTPS oficial do WhatsApp é válida. |
| `DesktopNavigation` | coleção readonly de cinco `NavigationItem`. | Texto ativo e indicador oliva único medido por transform/largura; hover, pressed e foco. | Lista de links nativos; rota/hash atual é semântico imediatamente, independentemente do movimento visual. | Só participa da apresentação a partir de `64rem`; primeira medida e movimento reduzido não interpolam. |
| `RouteTransition` | slots persistente `header` e mutável `children`. | Fases visible, leaving e entering somente no viewport da rota. | Skip link precede a marca; viewport oculto recebe `inert`/`aria-hidden`; após navegação controlada, restaura a interação antes de focar o `main`. | Navbar permanece fixa no topo e não remonta; movimento reduzido navega sem espera artificial. |
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
| `ProjectCarousel` | lista de projetos. | No mobile/tablet, anterior/próximo, dots, swipe sincronizado, início/fim e estado ativo, sem autoplay; no desktop, os controles ficam ocultos. | Região rotulada como carrossel, Tab nos controles/links, setas esquerda/direita no track, `aria-live` para página ativa. | Scroll snap com 1 card estreito e ~2 no tablet; a partir de 896 px, 3 cards estáticos sem navegação visível. |
| `MediaFrame` | mídia de Sobre. | Área estável e recorte configurável. | Imagem informativa com alt. | Proporção 4:3 e `sizes` por faixa. |
| `QuoteCard` | citação, autoria e papel. | Sobreposição visual sobre a mídia. | `figure`, `blockquote` e `figcaption` mantêm relação semântica. | Fica abaixo da mídia no estreito; sobreposição cresce com espaço. |
| `MediaQuoteComposite` | mídia + citação. | Coordena sobreposição sem reordenar DOM. | Leitura mantém mídia antes de citação/autoria. | Não inverte conteúdo; remove pressão de sobreposição no estreito. |
| `AboutPanel` | conteúdo institucional tipado. | Composição de mídia, texto, ação e ornamento. | Seção nomeada; ornamento oculto. | Empilha no estreito e usa duas colunas a partir de 640 px. |
| `HomePage` | consome `homeContent` e ordena os filhos e o rodapé do `SiteFrame`. | Sem estado ou infraestrutura. | `main` com hero/benefícios/projetos/sobre/contato, seguido do footer; um `h1`. | Conteúdo muda sem remontar a navegação do layout. |

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
| 640–895 px | Navbar e hero mantêm clearance; Sobre e banner ganham duas colunas; projetos mostram ~2 cards. |
| 896–1023 px | Benefícios passam para 5 colunas; a navegação continua no menu mobile porque os cinco rótulos ainda não cabem com segurança. |
| 1024 px ou mais (`64rem`) | Lista desktop substitui integralmente o gatilho mobile; conteúdo e mídia permanecem full-bleed. |

O inset da navbar, sua altura mínima e o clearance do hero são tokens funcionais
distintos de `--gutter-section`. O hero reserva a soma do deslocamento superior,
da altura mínima do cabeçalho e de uma margem de segurança, inclusive quando o
texto quebra ou é ampliado. O breakpoint CSS `64rem` espelha
`DESKTOP_NAVIGATION_MEDIA_QUERY`; nunca reduzir tipografia ou alvos para manter a
lista desktop antes de ela caber.

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
- Abaixo de `64rem`, o menu modal substitui integralmente a lista desktop; ao
  abrir, o foco vai para “Fechar menu” e o fundo deixa de ser interativo.
- Ordem DOM, ordem visual e ordem de tabulação permanecem equivalentes.
- `prefers-reduced-motion` desativa scroll suave e transições não essenciais.

### 8.1 Navbar persistente

- **Propriedade global:** `app/layout.tsx` fornece uma única instância de
  `SiteHeader` e do skip link ao coordenador persistente. Páginas fornecem apenas
  `main` e `footer` por `SiteFrame`.
- **Conteúdo:** desktop e mobile consomem os cinco `NavigationItem` de
  `siteContent.navigation`, na ordem Início, Sobre, Projetos, Por que um projeto?
  e Contato.
- **Variantes responsivas:** a lista horizontal existe na apresentação a partir
  de `64rem`; abaixo disso, somente o gatilho e o diálogo mobile ficam operáveis.
- **Estados:** links oferecem repouso, hover, foco visível e pressionado. O item
  atual recebe ênfase textual, indicador oliva único e `aria-current="page"`.
- **Movimento:** o indicador usa transform/largura por
  `--navbar-indicator-motion`; a primeira medida e movimento reduzido não
  interpolam. Somente `routeViewport` usa saída/entrada de rota.
- **Teclado e leitor de tela:** a ordem inicial é skip link → marca → navegação;
  o landmark se chama “Navegação principal”, o diálogo se chama “Menu principal”
  e o foco retorna ao gatilho ou segue para o `main` conforme a ação.
- **CTA:** `Fale no WhatsApp` só é renderizado no desktop para estado
  `configured` com URL HTTPS em `wa.me` ou `api.whatsapp.com`; indisponibilidade
  ou URL incompatível não cria placeholder nem ação enganosa.

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
| Logo, emblema e ornamentos | Navbar, menu mobile e footer usam a flor oficial oliva; `ContactBanner` usa a versão neutra clara como marca-d'água | Migrar os consumidores restantes de forma explícita, mantendo caixa, proporção e rótulos. |
| Fontes | Georgia + pilha sans do sistema | Alterar `--font-display` e `--font-body` ou integrar fonte aprovada no layout. |
| Hero e projetos | Fotografias locais da Sobreiro Paisagismo | Trocar `src`, `alt`, `position` e dimensões nos módulos de conteúdo, mantendo os ativos em `public/images/portfolio`. |
| Destino de contato | `mailto:contato@sobreiro.com.br` | Alterar `siteContent.contact`; consumidores globais recebem o destino por props. |
| WhatsApp da Navbar | Indisponível | Configurar `siteContent.mobileMenu.contacts.whatsapp` com URL HTTPS oficial; a área aparece sem alterar a composição dos demais destinos. |
| Projetos | 3 itens demonstrativos e destinos `#contato` | Trocar a lista local e os destinos, mantendo `ProjectCardData`. |
| Instagram | Destino genérico | Substituir em `homeContent.footer.socialLinks`. |
| Texto e autoria | Conteúdo editorial provisório | Substituir objetos locais sem mudar componentes. |

As fotografias e renderizações atuais são ativos locais de projetos autorais de
Jéssica Sobreiro, aprovados para exibição pública no site.

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

### Validação da Navbar persistente — 09/09/2026

Home, Sobre, Projetos e um detalhe publicado foram inspecionados em 320, 640,
1024 e 1440 pixels CSS. Em todas as 16 combinações houve um `main`, um footer,
um header, nenhum resíduo de `inert`, nenhum overlap entre Navbar e `h1` e nenhum
overflow horizontal. Em 320/640 somente o menu mobile participou da apresentação;
em 1024/1440 somente a lista desktop participou. O reflow equivalente a 200% de
zoom em uma janela física de 1024 px foi validado em 512 pixels CSS nas quatro
rotas, com a mesma integridade.

Teclado e árvore de acessibilidade confirmaram skip link → marca → navegação,
foco inicial e contenção no diálogo, fechamento por Escape, retorno ao gatilho,
`aria-current` por pathname/hash e foco no `main` depois da navegação controlada.
Cliques entre rotas, hashes, query string e Back foram repetidos sem remontar o
header nem deixar o viewport oculto. Após a decisão posterior de produto, o
header usa `position: fixed` e conserva o mesmo inset superior durante o scroll.

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

### Composição sucessora e propriedade

`/sobre` usa `SiteFrame` em `fullBleed` e mantém a ordem DOM
`about-hero → essence → team-profile → contact-methods`. A Navbar e o skip link
pertencem exclusivamente ao shell persistente em `app/layout.tsx`; a rota não
recebe prop de header, não copia navegação e reutiliza `SiteFooter` com os dados
globais de `app/_content/siteContent.ts`.

Os componentes locais continuam Server Components. A direção visual é o jardim
noturno editorial: fotografia atmosférica no hero, superfície marfim para
Essência e contato, faixa verde profunda para o perfil e tipografia serifada nos
gestos editoriais. Callouts, indicadores, ornamentos e cards não introduzem
animação, parallax, reveal, bounce nem contador.

### APIs locais e estados editoriais

| Contrato | Campos e estados | Saída observável |
| --- | --- | --- |
| `AboutHeroContent` | `eyebrow`, `title`, `introduction`, `statement`, `historyLink` tipado como hash e mídia | Um `h1`, texto completo sobre overlay e um `<a href="#essencia">`; sem breadcrumb |
| `AboutEssenceContent` | mídia, `mediaCallout`, narrativa, `metrics` e quatro valores | Mídia/callout → narrativa → indicadores aprovados → valores, na mesma ordem do DOM |
| `AboutMetric` | `approved` possui `value`/`label`; `pendingApproval` possui apenas campos `candidate*` | Somente o estado aprovado é publicado; valores candidatos não entram no HTML |
| `AboutTeamContent` | identidade, papel, `TeamMediaContent` e credenciais | Linguagem institucional, sem pessoa, registro, biografia ou semântica de retrato |
| `TeamMediaContent` | `configured` exige mídia; `unavailable` exige mensagem; ambos exigem `callout` | Imagem botânica com alt contextual ou fallback verdadeiro, sempre com callout textual |
| `AboutCredential` | `approved` exige `detail`; `pendingApproval` exige `pendingMessage` | Lista de quatro categorias com o estado editorial verdadeiro |
| `ContactMethod` | `configured` exige `href` e `accessibleLabel`; `unavailable` exige mensagem | Card inteiro como um único link ou superfície informativa não focável |

No conteúdo vigente, `+100` e `100%` permanecem candidatos pendentes e não são
renderizados; somente o indicador neutro `Natureza` está aprovado. Hero e
processo ainda usam ativos remotos provisórios; a mídia botânica da equipe está
indisponível. Somente o e-mail está configurado; WhatsApp e agenda permanecem sem
URL. Esses pontos são substituídos exclusivamente em `aboutContent.ts` após
aprovação editorial e de licenciamento.

### Layout, tokens e responsividade

Nenhum token novo foi necessário. A página reutiliza `--width-content`,
`--navbar-clearance`, `--size-touch`, espaços, raios, hairlines, cores
contextuais, camadas, foco e movimento existentes.

- Base: todas as regiões empilham; callouts ficam no fluxo e os cards de contato
  e valores usam uma coluna.
- `40rem`: Essência usa mídia + narrativa, indicadores descem em faixa própria;
  perfil usa duas áreas; valores e contatos usam duas colunas.
- `56rem`: os quatro valores cabem em uma linha, sem reduzir texto.
- `68.75rem`: Essência e perfil usam três zonas; callouts só então cruzam a borda
  com espaço reservado; indicadores ficam em coluna; contatos usam três cards.
- `80rem`: contato assume grade assimétrica título → introdução/métodos.
- `100rem`: em monitores ultrawide, os contêineres internos passam a acompanhar
  os gutters da Home em vez de permanecerem como uma ilha central de 76rem; a
  estrutura e as grades das regiões não mudam.
- Abaixo de `100rem`, o conteúdo interno para de crescer em `--width-content`;
  superfícies continuam full-bleed. Imagens usam `aspect-ratio`, `object-fit` e
  ponto focal configurado, e nenhuma seção tem `height` fixa.

### Semântica, teclado e movimento

- O hero contém o único `h1`; Essência, perfil e contato usam `aria-labelledby`
  com seus `h2`. A seção `#essencia` aplica `scroll-margin-top` compatível com a
  Navbar fixa.
- Indicadores, valores, credenciais e métodos de contato são listas. Cards
  informativos e callouts não têm `tabIndex`, cursor de ação ou papel interativo.
- A foto atmosférica do hero usa alt vazio; a mídia de processo usa alternativa
  contextual. Ícones repetitivos e ornamentos usam `aria-hidden`; SVGs também
  usam `focusable="false"` e ornamentos ignoram o ponteiro.
- A ordem de foco acompanha o DOM. Links reais têm foco visível por superfície e
  alvos mínimos de `--size-touch` (44 × 44 px).
- A regra global de `prefers-reduced-motion` troca scroll suave por imediato e
  reduz transições não essenciais; a página não depende de movimento.

### Validação visual — 10/09/2026

| Viewport | Resultado observado |
| --- | --- |
| 320 × 800 px | Uma coluna, callouts no fluxo, hero e Navbar legíveis, âncora funcional, alvos ≥ 44 px e sem overflow horizontal |
| 640 × 900 px | Essência em duas zonas, valores 2 × 2, perfil e contatos empilhando sem corte |
| 1024 × 900 px | Navbar desktop sem colisão; valores em quatro colunas; perfil em duas áreas e credenciais abaixo |
| 1440 × 960 px | Essência e perfil em três zonas, callouts sobrepostos com reserva, contato assimétrico e conteúdo limitado |
| 2435 × 1200 px | Hero, Essência, perfil, contato e rodapé compartilham os gutters de 88 px da Home, sem overflow horizontal |

Em todas as larguras permaneceram um banner global, um `main`, um footer, um
`h1` e a ordem narrativa prevista, sem overflow horizontal. A paleta reutiliza as
relações de contraste já auditadas: 7,40:1 para acento sobre escuro, 10,09:1 para
muted sobre escuro, 5,99:1 para acento sobre claro e 4,61:1 para muted sobre
claro; o foco quente sobre escuro mede 12,79:1.

TypeScript, 101 testes Jest, ESLint e o build de produção passaram; o Next.js
classificou `/sobre` como rota estática. A revisão das Web Interface Guidelines
vigentes em 10/09/2026 não encontrou divergências nos arquivos alterados.

## 9. Navegação mobile

`MobileNavigation` é a fronteira cliente do menu e compõe `MenuTrigger` e
`MobileMenu`. O gatilho é controlado, usa `aria-expanded`/`aria-controls` e só é
visível abaixo de `64rem`; em telas maiores o conjunto fecha, restaura scroll e
fica fora da apresentação e da ordem de foco.

`MobileMenu` usa um `<dialog>` modal nativo nomeado “Menu principal”. A API
aceita `MobileMenuContent` para contatos/editorial e a mesma coleção global
readonly de `NavigationItem` usada no desktop. Cada item possui `id`, `label`,
`href` e `LineIconName`; cada `MobileMenuItem` é um único link de linha
inteira, marca o destino atual com `aria-current="page"` e mantém chevron e ícone
decorativos. A ordem DOM é fechar, marca empilhada, navegação, contatos e rodapé.

WhatsApp e telefone usam a união `ConfiguredContact`: somente o estado
`configured` produz um `ButtonLink` (`accent` ou `outlineInverse`); o estado
`unavailable` não produz âncora. O conteúdo atual mantém ambos indisponíveis até
que URLs aprovadas sejam adicionadas a `app/_content/siteContent.ts`.

Ao abrir, o foco vai para “Fechar menu”; `Escape`, backdrop, botão e links
internos compartilham o ciclo de fechamento. O dialog nativo fornece modalidade
e contenção de foco, com contenção de Tab como reforço; o scroll inline anterior
é restaurado exatamente e o foco retorna ao gatilho quando não há navegação.
`prefers-reduced-motion` reduz a transição a uma conclusão imediata. O painel usa
`100dvh`, safe areas e rolagem interna para preservar rótulos e alvos de 44 px em
320 px e em paisagem.

## Extensões do catálogo de Projetos

`ProjectCard` mantém `project` e `layout?: "stacked" | "split"` e acrescenta as
variantes ortogonais `direction?: "mediaFirst" | "contentFirst"` e
`surface?: "dark" | "light"`. Os defaults continuam `stacked`, `mediaFirst` e
`dark`, preservando Home e demais consumidores. Classes e atributos de dados
expõem as variantes para CSS e testes. A ordem DOM é sempre mídia → categoria →
título → resumo → affordance; `contentFirst` troca somente as áreas da grade em
desktop amplo.

`href` continua opcional. Com destino, todo o card é um único link acionável por
Tab/Enter, possui foco visível e comunica “Ver detalhes”. Sem destino, o card é
um artigo informativo, sem tab stop, cursor ou hover de ação, e comunica
“Detalhes em breve”. Ambas as superfícies usam tokens contextuais próprios para
texto, apoio, borda, acento e foco; títulos e resumos crescem sem truncamento.

A composição exclusiva de `/projetos` usa `ProjectsHero`, `ProjectsCatalog` e
`ProjectsContactBanner`, todos Server Components. Conteúdo editorial local e o
estado de mídia pertencem a `projectsContent.ts`; categorias, projetos, capas,
copy, publicação e destinos continuam exclusivamente no catálogo versionado. A
tabela readonly de apresentação é indexada por ID e validada contra ausências,
duplicatas e IDs desconhecidos, portanto a variante não muda após filtragem.

O banner local usa a união discriminada `pendingApproval | approved`. O primeiro
publica uma superfície verde profunda completa e não cria `src` vazio; o segundo
exige `src`, `alt`, dimensões, `sizes` e ponto focal e recebe overlay independente
do crop. A primitiva compartilhada `ContactBanner` não mudou. Ações só são links
quando existe destino configurado; indisponibilidade não fabrica rota ou tab stop.

`SiteFooter.currentPath?: string`, também aceito por `FooterNavGroup`, marca links
de página com `aria-current="page"`, sublinhado e peso; queries são ignoradas e
âncoras não são marcadas como páginas. Default sem seleção. `FooterLink.icon?`
aceita `LineIconName`; os dados globais só o preenchem nos contatos existentes.
Ícones são decorativos. `LineIcon` acrescenta utensils, waves, plant e building,
preservando currentColor, tamanhos e semântica. `SectionAction` usa seu rótulo
visível como nome acessível, pois agora pode navegar para uma página.

`ProjectFilters`, `ProjectsCatalog` e `ResultsAnnouncement` são locais à rota.
A URL é a única fonte de seleção, sem estado duplicado. Oito links reais usam
`flex-wrap`, largura intrínseca e `scroll={false}`, preservando os demais
parâmetros. Seleção combina cor, sublinhado, peso e `aria-current`, sem semântica
de tabs. Alvos mínimos usam `--size-touch`; cada pill quebra como uma unidade. A
região de status persistente anuncia categoria + contagem com pluralização e
`aria-atomic`; o estado vazio mantém introdução, filtros, contato e “Ver todos”.

A página empilha tudo na base; a partir de 48rem, cards isolados podem usar a
divisão 42/58 já existente. Em 56rem, statements editoriais ocupam uma segunda
zona sem mudar a ordem DOM. Em 68.75rem, a coleção passa a duas colunas e os cards
usam metades equivalentes, incluindo a inversão visual por áreas nomeadas. As
quatro linhas usam a mesma altura fluida, com mínimo de 20rem; a mídia preenche a
linha e o maior conteúdo pode expandir todas elas sem truncamento. A partir de
100rem, hero, catálogo e contato deixam o limite de `--width-content` e acompanham
os gutters da viewport, como a Home, sem alterar sua estrutura. Hero e banner são
full-bleed; em larguras menores o catálogo continua limitado por
`--width-content`. Todos preservam safe areas e crescimento de texto. Não há
altura fixa, parallax ou animação de entrada; a regra global de
`prefers-reduced-motion` cobre as transições compartilhadas.

Hero, catálogo e contato usam `aria-labelledby`; o hero contém o único `h1` e os
projetos usam `h3` em artigos dentro de uma lista. A Navbar, o skip link e o rodapé
permanecem no shell global. A frase botânica e os statements são texto real; o
único glifo ornamental da introdução está oculto para tecnologia assistiva.

Fontes editoriais, exceções visuais e evidências: [PROJECTS-CONTENT.md](PROJECTS-CONTENT.md)
e [PROJECTS-VALIDATION.md](PROJECTS-VALIDATION.md).

## Extensões do detalhe de Projeto

### APIs compartilhadas

`LineIconName` inclui `grid`, desenhado no `viewBox="0 0 24 24"` com traço
`currentColor`. O default de `LineIcon` continua decorativo (`aria-hidden` e
`focusable="false"`); com `decorative={false}`, `label` fornece o nome acessível.
Não foi adicionado ícone sem consumidor aprovado.

`ContactBanner.supportingAction` preserva `{ label, href }` como link textual
default e aceita, de forma aditiva, `presentation?: "text" | "outline"` e
`icon?: LineIconName`. `outline` usa `ButtonLink` `outlineInverse`; o ícone é
decorativo e o texto visível permanece como nome acessível. O estado hover aumenta
o contraste, active desloca o controle e focus-visible usa o foco da superfície
escura. A ausência de `supportingAction` remove a segunda âncora do DOM.

No detalhe, WhatsApp configurado produz a ação preenchida e e-mail produz a ação
de contorno. WhatsApp indisponível produz somente o e-mail como ação principal,
sem dois rótulos apontando para o mesmo `mailto:`. Consumidores anteriores mantêm
a apresentação textual por default.

### Padrões locais da rota

`ProjectDetailHero`, `ProjectStoryGallery`, `ProjectNarrative`, `ProjectGallery`,
`AppliedSolutions` e `ProjectsReturnLink` pertencem a `/projetos/[slug]`; não são
primitives. A rota continua um Server Component e segue hero escuro → superfície
marfim → retorno escuro → contato/rodapé escuros. Nenhum token global novo foi
necessário: a largura fotográfica de até `90rem` é uma variável local, enquanto
texto e regiões preservadas continuam limitados por `--width-content` e
`--width-reading`.

O hero recebe categoria, título, `summary` e a mídia do mesmo registro publicado.
`details.titleAccent` pode destacar somente uma substring literal validada do
título; sem o campo, o título permanece integral e sem acento inferido.
`PortfolioImage.position` aceita keywords seguras ou dois percentuais e cai em
`center center`; `positionMobile` cai no foco desktop. O componente usa uma única
imagem prioritária e troca o foco por CSS, sobre superfície verde e gradientes
lateral e inferior independentes.

A narrativa nunca repete `summary`. Ela exige um heading editorial real, resolvido
por `details.introHeading ?? details.statement`, e pode renderizar os parágrafos de
`details.body` na ordem declarada. Sem heading, a região “Sobre o projeto” é
omitida. Os campos são opcionais para permitir adoção editorial gradual; o parser
rejeita corpo sem heading, parágrafo vazio e acento incompatível.

Antes de renderizar, `prepareProjectDetailMedia` deduplica a coleção por `file`
sem mutar o catálogo. Quando o hero é a primeira mídia e existe outra fotografia
única, essa repetição imediata sai da galeria. O hero recebe `alt` informativo se
for a única ocorrência apresentada e `alt=""` somente quando o mesmo arquivo
continua descrito na lista.

A galeria é uma única lista estática, nomeada por heading visualmente oculto. A
primeira mídia é o destaque; as restantes usam linhas integrais, pares alternados
`7/5`–`5/7` ou trios. Quatro itens restantes fecham em dois pares, panoramas que
não sustentam trio passam para linha integral e a orientação intrínseca define
proporções compatíveis. De 320 a 767 px todas as fotos empilham; de 768 a 1199 px
pares podem dividir o trilho; a composição `4/12 + 8/12` e trios entram a partir
de 1200 px; acima de 1600 px a mídia respira até o limite local sem ampliar texto,
hero ou tipografia indefinidamente.

Imagens abaixo do hero preservam lazy loading, dimensões intrínsecas, `sizes` por
papel e ponto focal. Elas não recebem link, botão, `tabIndex`, cursor de ação,
listener, hover de transformação, lightbox, zoom ou gesto. Breadcrumb e retorno
são navegação nativa; o item atual permanece no DOM com `aria-current="page"` e
pode ser ocultado apenas visualmente abaixo de 480 px. Safe areas, foco visível e
o crescimento do texto permanecem no fluxo; não há movimento local, e a regra
global de `prefers-reduced-motion` cobre somente transições compartilhadas.
