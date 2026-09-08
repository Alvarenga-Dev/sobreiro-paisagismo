# UI Map — Home da Sobreiro Paisagismo

## Objetivo

Transformar o print mobile anexado em um contrato visual orientado à implementação, com foco na composição, nos componentes reutilizáveis e no sistema de cores. Textos, fotografias e ilustrações são tratados como conteúdo substituível, não como requisitos literais.

## Fonte e grau de certeza

- Fonte: um único print mobile, exportado com 941 × 1672 px.
- A dimensão em pixels do arquivo não deve ser interpretada como largura CSS do viewport; escala de exportação e densidade de pixels não foram informadas.
- Evidência direta: composição mobile, hierarquia vertical, densidade horizontal, proporções relativas, contraste, superfícies, bordas, raios, tipos de card e controles visíveis.
- Inferência: adaptação para celulares mais estreitos, expansão para tablet/desktop, abertura do menu, funcionamento do carrossel, estados de interação e exatidão dos valores de cor.
- As cores abaixo são aproximações extraídas visualmente do print e devem ser validadas quando houver arquivos de marca.

## Leitura de escopo

### Entra no escopo visual

- Shell central com fundo externo quase preto, borda oliva sutil e cantos arredondados.
- Cabeçalho escuro, hero fotográfico, faixa de benefícios, seção de projetos, bloco institucional, banner de conversão e rodapé.
- Primitivas compartilhadas de botão, título de seção, ícone linear, card e superfície.
- Alternância de superfícies escuras e claras como principal recurso de ritmo visual.
- Composição mobile-first e estados essenciais de toque, foco e responsividade necessários para construir os componentes.

### Fica fora deste mapa

- Redação final, escolha das fotografias e reprodução exata das ilustrações botânicas.
- Desenho vetorial definitivo da marca e dos ícones.
- Integração real com WhatsApp, analytics, CMS, formulários ou persistência.
- Conteúdo e comportamento interno do menu, porque o print mostra somente o gatilho fechado.
- Autoplay ou gesto de arraste do carrossel, pois os indicadores visuais não comprovam esses comportamentos.

## Mapa macro

O frame principal ocupa quase toda a largura do viewport móvel, preservando uma margem externa pequena. Internamente, a página alterna blocos escuros e claros e usa painéis claros arredondados para interromper o fundo verde profundo. Mesmo no mobile, várias regiões mantêm composição horizontal densa; isso é evidência do print, não uma adaptação desktop.

| Ordem | Região | Proporção vertical observada | Superfície | Composição principal |
| --- | --- | ---: | --- | --- |
| 1 | Cabeçalho | ~5% | Verde quase preto | Marca, CTA compacto e menu na mesma linha |
| 2 | Hero | ~24% | Fotografia com overlay escuro | Conteúdo alinhado à esquerda e dois CTAs |
| 3 | Benefícios | ~16% | Marfim, painel arredondado | Cinco cards compactos visíveis em uma linha |
| 4 | Projetos | ~20% | Verde profundo | Cabeçalho de seção, três cards visíveis e paginação |
| 5 | Sobre | ~17% | Marfim, painel arredondado | Composição de mídia e texto em duas colunas |
| 6 | CTA final | ~7% | Verde profundo dentro do bloco claro | Mensagem e botão de destaque lado a lado |
| 7 | Rodapé | ~10% | Verde profundo | Marca e grupos de links em grade compacta, seguidos da barra legal |

As proporções servem para preservar o ritmo, não como alturas fixas. O conteúdo deve determinar a altura real de cada seção.

## Árvore de composição

```text
HomePage
└── SiteFrame
    ├── SiteHeader
    │   ├── BrandLockup
    │   ├── ContactButton
    │   └── MenuTrigger
    ├── HeroSection
    │   ├── HeroBackdrop
    │   └── HeroContent
    │       ├── DisplayHeading
    │       ├── SupportingCopy
    │       └── ActionGroup
    ├── BenefitsPanel
    │   └── BenefitCard × 5
    ├── ProjectsSection
    │   ├── SectionHeading
    │   ├── SectionAction
    │   └── ProjectCarousel
    │       ├── ProjectCard × n
    │       └── PaginationDots
    ├── AboutPanel
    │   ├── MediaQuoteComposite
    │   │   ├── MediaFrame
    │   │   └── QuoteCard
    │   ├── SectionHeading
    │   ├── SupportingCopy
    │   ├── SecondaryButton
    │   └── BotanicalDecoration
    ├── ContactBanner
    │   ├── BrandEmblem
    │   ├── BannerMessage
    │   └── ContactButton
    └── SiteFooter
        ├── FooterBrand
        ├── FooterNavGroup × n
        ├── SocialLinks
        └── LegalBar
```

## Contrato visual da tela

- Use o verde quase preto como superfície dominante. O marfim aparece em dois grandes painéis de contraste, não como fundo contínuo da página.
- Preserve a sequência cromática `escuro → imagem escurecida → claro → escuro → claro → escuro`.
- Preserve no viewport mobile de referência a composição horizontal densa exibida no print. Não converta automaticamente cards, bloco institucional, banner ou rodapé em pilhas verticais.
- Faça os painéis claros tocarem as laterais internas do shell e use cantos superiores e inferiores generosos. Esse recorte é parte importante da identidade visual.
- Use tipografia serifada somente nos títulos editoriais e tipografia sem serifa em controles, rótulos, metadados e corpo.
- Use o oliva como acento controlado: fragmentos de títulos, ícones, pequenas legendas, paginação ativa e botões primários.
- Mantenha bordas finas e translúcidas. Sombras, quando existirem, devem ser suaves; o contraste vem principalmente da cor da superfície.
- Trate ilustrações botânicas como camada decorativa de baixa opacidade e sem função semântica.

## Mapeamento por região

| ID | Região | Papel | Componente ou primitive | Direção de implementação |
| --- | --- | --- | --- | --- |
| R01 | Shell externo | Delimitar a experiência e criar aparência de peça editorial | `SiteFrame` | Fundo quase preto no `body`; frame com `overflow: clip`, borda oliva sutil e raio grande |
| R02 | Cabeçalho | Navegação global e conversão imediata | `SiteHeader`, `BrandLockup`, `ContactButton`, `MenuTrigger` | Layout mobile horizontal de três áreas compactas; não inferir comportamento sticky |
| R03 | Hero | Apresentar a proposta principal | `HeroSection`, `DisplayHeading`, `ActionGroup` | Imagem em cover; overlay em gradiente mais forte à esquerda; conteúdo ocupa aproximadamente a metade esquerda mesmo no mobile |
| R04 | Benefícios | Comunicar pilares em leitura rápida | `BenefitsPanel`, `BenefitCard` | Cinco cards compactos visíveis em uma única linha no mobile de referência; ícone linear, título e corpo |
| R05 | Projetos | Exibir portfólio visual | `ProjectsSection`, `ProjectCarousel`, `ProjectCard`, `PaginationDots` | Três cards visíveis simultaneamente no mobile de referência; imagem em cima e faixa informativa embaixo |
| R06 | Sobre | Equilibrar história pessoal e mensagem editorial | `AboutPanel`, `MediaQuoteComposite`, `QuoteCard` | Duas colunas no mobile de referência; card de citação sobreposto à mídia; ornamento preso à borda direita |
| R07 | Banner final | Reforçar a ação principal antes do rodapé | `ContactBanner`, `ContactButton` | Painel mobile horizontal com mensagem e ação lado a lado; ícones botânicos opcionais ao fundo |
| R08 | Rodapé | Navegação auxiliar, marca e informações legais | `SiteFooter`, `FooterNavGroup`, `SocialLinks`, `LegalBar` | Grade mobile compacta e assimétrica; barra inferior separada por hairline translúcido |

## Inventário de componentes

### Primitivas compartilhadas

| Componente | Variantes mínimas | Regras visuais |
| --- | --- | --- |
| `ButtonLink` | `accent`, `outlineInverse`, `outlineNeutral`; tamanhos `md` e `lg` | Retângulo de raio médio, peso semibold, foco visível; aceita ícone inicial ou final |
| `SectionHeading` | `onDark`, `onLight` | Eyebrow em caixa alta e título serifado; aceita trecho em cor de acento sem depender de HTML arbitrário |
| `LineIcon` | `sm`, `md`, `lg` | Traço fino oliva ou branco; caixa visual consistente mesmo com desenhos diferentes |
| `CardSurface` | `light`, `dark`, `media` | Borda sutil, raio médio, sem elevação forte |
| `PaginationDots` | `idle`, `active` | Cápsulas curtas; a ativa usa oliva mais luminoso e maior contraste |

### Componentes de seção

| Componente | Estrutura | Reutilização esperada |
| --- | --- | --- |
| `SiteHeader` | Marca + ações | Global, compartilhado entre rotas futuras |
| `HeroSection` | Backdrop + conteúdo + ações | Específico da home |
| `BenefitsPanel` | Lista de `BenefitCard` | Específico da home; cards alimentados por dados locais |
| `ProjectCard` | Mídia + título + metadados | Reutilizável em listagem de projetos |
| `ProjectCarousel` | Track + cards + paginação | Só deve virar Client Component se houver interação real |
| `MediaQuoteComposite` | Mídia base + citação sobreposta | Específico do bloco institucional |
| `ContactBanner` | Emblema + mensagem + CTA | Pode ser compartilhado em páginas de serviço e projeto |
| `SiteFooter` | Marca + navegação + social + legal | Global, compartilhado entre rotas |

## Sistema de cores aproximado

| Token sugerido | Valor aproximado | Uso |
| --- | --- | --- |
| `--color-canvas` | `#020502` | Fundo externo ao frame |
| `--color-forest-950` | `#0A140B` | Cabeçalho e áreas mais profundas |
| `--color-forest-900` | `#0F1E12` | Projetos, banner e rodapé |
| `--color-forest-800` | `#1C2B1C` | Cards escuros e variações tonais |
| `--color-olive-500` | `#989E55` | Botão primário, ícones e destaques |
| `--color-olive-400` | `#B1BC62` | Estado ativo e acento mais luminoso |
| `--color-ivory-50` | `#F7F4F0` | Grandes painéis claros |
| `--color-sand-100` | `#F1EDEA` | Cards sobre o painel claro |
| `--color-ink` | `#192419` | Texto sobre superfícies claras |
| `--color-text-inverse` | `#F8F7F2` | Texto principal sobre verde escuro |
| `--color-text-muted-dark` | `#C8CCC2` | Texto secundário sobre verde escuro |
| `--color-border-dark` | `rgba(213, 224, 195, 0.28)` | Bordas sobre superfícies escuras |
| `--color-border-light` | `rgba(25, 36, 25, 0.14)` | Bordas sobre superfícies claras |

### Composições de cor

- Hero: aplique sobre a fotografia um gradiente horizontal próximo de `rgba(4, 12, 6, 0.86)` à esquerda, reduzindo a opacidade até quase transparente à direita. Pode haver um segundo gradiente vertical suave para garantir contraste junto às bordas.
- Botão de destaque: use fundo oliva com leve variação tonal; o print sugere brilho discreto, não um gradiente saturado.
- Cards de projeto: preserve a fotografia como área dominante e use uma base verde acinzentada escura para título e metadados.
- Superfícies claras: diferencie painel e card por poucos pontos de luminosidade; evite branco puro em grandes áreas.

## Escala visual aproximada

Os valores abaixo são direção de sistema, não medição pixel-perfect.

| Propriedade | Faixa sugerida |
| --- | --- |
| Margem externa do frame | `8–16px` no mobile |
| Padding horizontal das seções | `clamp(16px, 5vw, 28px)` |
| Raio do frame | `18–22px` |
| Raio dos painéis claros | `20–24px` |
| Raio dos cards | `12–16px` |
| Raio dos botões | `10–14px` |
| Espaço entre cards | `14–20px` |
| Borda | `1px`, sempre de baixo contraste |
| Área mínima de toque | `44 × 44px`, mesmo quando o controle visual for menor |
| Título hero | `clamp(2.25rem, 10vw, 3.5rem)` |
| Título de seção | `clamp(1.5rem, 6vw, 2.25rem)` |
| Corpo | `0.875rem–1rem`, entrelinha confortável |

## Estados e interações

| Elemento | Estado inicial observado | Estados necessários para implementação | Regra |
| --- | --- | --- | --- |
| `MenuTrigger` | Fechado, ícone hambúrguer | `pressed`, `focus-visible`, `expanded` | Deve ter alvo de toque adequado e expor `aria-expanded`; o painel aberto depende de design adicional |
| `ButtonLink` | Repouso | `pressed`, `focus-visible`, `active`, opcional `disabled` | Não depender de hover; preservar alvo de toque e foco de contraste adequado |
| `ProjectCard` | Repouso | `pressed`, `focus-within` e `hover` quando suportado | Se o card inteiro navegar, usar um único link sem controles aninhados |
| `ProjectCarousel` | Primeiro estado aparente | Página ativa, anterior/próxima e fim | O print sugere quatro páginas pelos indicadores, mas não define setas, autoplay ou swipe |
| `FooterNavGroup` | Links visíveis | `pressed`, `focus-visible` e `hover` quando suportado | Manter área de toque adequada e contraste AA |

## Contrato de movimento

- Não há evidência suficiente para animações de entrada, parallax ou cabeçalho sticky.
- Caso o portfólio seja realmente um carrossel, anime somente o track e o indicador ativo; mantenha título e ação da seção fixos.
- Prefira transição curta, entre 200 e 350 ms, com deslocamento discreto.
- Desative deslocamentos não essenciais em `prefers-reduced-motion: reduce`.
- Não implemente autoplay sem requisito explícito.

## Contrato responsivo

O print comprova a composição mobile. Como a largura CSS do viewport não foi informada, qualquer mudança abaixo dessa referência ou expansão para telas maiores continua sendo inferência.

| Faixa | Composição recomendada |
| --- | --- |
| Mobile de referência | Reproduzir a composição observada: cabeçalho em uma linha, hero com conteúdo à esquerda, 5 benefícios, 3 projetos visíveis, sobre em 2 colunas, banner horizontal e rodapé em grade |
| Mobile mais estreito | Não reduzir tipografia ou alvos de toque para manter a grade; preferir overflow horizontal em benefícios/projetos e permitir quebra controlada no cabeçalho, banner, sobre e rodapé |
| Tablet e desktop | Manter a mesma ordem e as mesmas famílias de superfície; expandir gutters, limites de largura e respiro sem simplesmente ampliar toda a página como uma imagem |

A largura CSS exata do mobile de referência deve ser conhecida antes de fixar breakpoints. Abaixo dela, a sobreposição do `QuoteCard` pode reduzir ou desaparecer e o CTA do cabeçalho pode ser compactado, mas essas adaptações não fazem parte do estado comprovado pelo print.

## Hierarquia de conteúdo sem acoplamento ao texto

Cada seção deve receber conteúdo por props ou objetos locais, mantendo a estrutura independente da redação final:

- `DisplayHeading`: fragmentos normal e destacado.
- `BenefitCard`: ícone, rótulo curto e descrição curta.
- `ProjectCard`: mídia, título, categoria e metadado breve.
- `QuoteCard`: citação curta, autoria e assinatura opcional.
- `FooterNavGroup`: rótulo do grupo e lista de links.

As imagens devem declarar proporção e recorte no componente. O layout não deve depender de uma fotografia específica para manter altura ou contraste.

## Lacunas a resolver antes da implementação final

1. Arquivos oficiais de logo, monograma, ícones e ornamentos botânicos.
2. Famílias tipográficas da marca e licenças de uso.
3. Destino dos CTAs e convenção para abrir WhatsApp.
4. Conteúdo e comportamento do menu expandido.
5. Confirmação de que projetos são um carrossel; quantidade de itens, controles e navegação por teclado.
6. Largura CSS e densidade de pixels do viewport mobile usado como referência.
7. Comportamento dos blocos horizontais em aparelhos mais estreitos: compressão, quebra ou scroll.
8. Breakpoints e política de recorte de imagens por dispositivo.
9. Contraste do oliva sobre o verde escuro, que deve ser validado antes de seu uso em texto pequeno.

## Estado atual do repositório

- `app/page.tsx` contém apenas hero e lista simples de serviços; nenhuma das regiões do print está componentizada.
- `app/globals.css` já usa uma direção de verde e marfim, mas ainda não possui o conjunto de tokens, superfícies e variantes necessários.
- Não há biblioteca de componentes, ativos de imagem, ícones, estado global ou integração externa.
- A implementação pode permanecer majoritariamente em Server Components. Somente menu e carrossel, se forem interativos, justificam pequenas fronteiras com `"use client"`.

## Direção de implementação

1. Consolidar os tokens cromáticos, tipográficos, espaciais, de borda e raio em `app/globals.css`.
2. Construir primeiro as primitivas `ButtonLink`, `SectionHeading`, `LineIcon` e `CardSurface`.
3. Implementar o shell, cabeçalho e rodapé como componentes realmente compartilhados.
4. Manter hero, benefícios, projetos e bloco institucional próximos da rota da home enquanto não houver reutilização concreta.
5. Alimentar listas com dados locais tipados, evitando duplicação de marcação.
6. Usar `next/image` com `sizes`, proporções estáveis e recortes definidos por componente.
7. Validar primeiro na largura mobile de referência, depois em aparelhos mais estreitos, tablet e desktop; por fim validar toque, teclado, foco, contraste e redução de movimento.

## Referências técnicas prováveis

- `app/page.tsx`: composição da home.
- `app/globals.css`: tokens e estilos globais existentes.
- `app/layout.tsx`: shell raiz, metadados e tipografia global.
- `app/_components/`: somente cabeçalho, rodapé e primitivas que forem de fato compartilhados entre rotas.
- Componentes exclusivos da home devem permanecer colocalizados com a rota, sem criar uma camada compartilhada prematuramente.

## Resultado esperado deste artefato

Permitir que a home mobile seja implementada por regiões independentes, visualmente coerentes e responsivas, preservando tanto a identidade de verde profundo, oliva e marfim quanto a densidade horizontal observada, sem acoplar a interface aos textos ou às fotografias exibidas na referência.
