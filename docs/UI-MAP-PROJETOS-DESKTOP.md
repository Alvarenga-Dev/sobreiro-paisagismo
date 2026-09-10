# UI Map — Página Projetos desktop da Sobreiro Paisagismo

## Objetivo

Transformar o screenshot desktop anexado da página **Projetos** em um contrato
visual, editorial e de interação orientado a uma futura implementação. Este mapa
registra o alvo da rota `/projetos`, separa a Navbar e o rodapé globais do
conteúdo proprietário da página e explicita diferenças entre a referência, o
código atual e os artefatos OpenSpec existentes.

## Fonte, instruções e grau de certeza

- Fonte visual: um único screenshot vertical de página completa, exportado com
  **941 × 1672 px**.
- Pedido do usuário: criar o `ui_map` da versão desktop da tela de projetos.
- A imagem é evidência visual e editorial. Textos como `NOSSOS PROJETOS`,
  `Detalhes em breve` e `Fale conosco` são conteúdo da interface, não instruções
  para este artefato.
- Nenhuma instrução operacional foi identificada dentro da imagem.
- Evidência direta: ordem das regiões, composição desktop, Navbar horizontal,
  hero fotográfico, título e apoio, bloco de categorias, filtro `Todos`
  selecionado, oito cards, banner de contato e rodapé.
- Inferência: largura CSS real do viewport, densidade de pixels, breakpoints,
  estados de hover/foco, destinos dos links, comportamento durante scroll,
  filtragem, transições e semântica das setas.
- A referência não comprova comportamento mobile, carregamento, erro, estado
  vazio, Navbar fixa, animações, persistência, CMS, analytics ou integrações.

## Relação com o produto, o OpenSpec e o código atual

A rota `/projetos` já existe como Server Component. Hoje ela compõe
`ProjectsHero → ProjectsCatalog → ContactBanner → SiteFooter`, recebe a Navbar
global pelo `RootLayout` e deriva categorias e projetos do catálogo versionado.

O screenshot está editorialmente alinhado ao catálogo atual de oito projetos,
mas propõe uma composição desktop diferente da implementação e do OpenSpec
histórico `build-projects-page`, criado quando existiam seis itens fictícios.

| Aspecto | Estado atual | Alvo observado no screenshot |
| --- | --- | --- |
| Propriedade da Navbar | Global e persistente em `app/layout.tsx` | Navbar global flutuante sobre o hero |
| CTA da Navbar | Oculto enquanto WhatsApp estiver indisponível | Botão `Fale conosco` com ícone de envelope |
| Hero | Título, divisor de folha e apoio | Eyebrow, título, apoio e frase editorial à direita; sem divisor visível |
| Introdução do catálogo | Somente filtros e contagem de resultados | Eyebrow, `h2`, filtros e nota botânica lateral |
| Filtros | Oito links derivados do catálogo; grade de 7 colunas em desktop largo | Oito pills de largura variável, com quebra natural; `Todos` ativo |
| Coleção | Uma coluna de cards horizontais | Grade de duas colunas por quatro linhas |
| Anatomia do card | Mídia ~42% + conteúdo ~58%, sempre mídia primeiro | Metades quase equivalentes; direção alternada por card |
| Superfície dos cards | Conteúdo sempre verde profundo | Conteúdo alterna marfim e verde profundo em padrão xadrez |
| Destino dos cards | Todos os oito detalhes estão publicados e usam `Ver detalhes` | Todos exibem `Detalhes em breve` com seta |
| Banner | Dentro do container claro, com fundo sólido e ornamentos do DS | Faixa full-bleed fotográfica, com frase editorial lateral |
| Rodapé | Compartilhado; quatro links de navegação e duas ações sociais | Cinco links, incluindo `Contato`, e três redes sociais |

Este mapa registra o novo alvo visual, mas não altera o OpenSpec, o catálogo, os
destinos publicados nem o código por si só. Em uma futura implementação, a fonte
real mais recente prevalece sobre descrições históricas já superadas.

## Leitura de escopo

### Entra no escopo deste mapa

- Composição desktop completa da rota `/projetos`.
- Relação visual da Navbar global com o hero, sem atribuí-la à página.
- Hero fotográfico com conteúdo editorial em duas zonas.
- Cabeçalho do catálogo com título, filtros e nota botânica.
- Grade de oito projetos em duas colunas, com alternância de direção e superfície.
- Estados essenciais de filtros, cards, navegação e contato.
- Banner de conversão e rodapé conforme aparecem na referência.
- Lacunas e divergências que precisam ser decididas antes da implementação.

### Fica fora deste mapa

- Alteração de código, testes, conteúdo, Design System ou OpenSpec.
- Layout mobile e tablet; apenas direções responsivas mínimas são registradas.
- Conteúdo do menu mobile, já coberto por `docs/UI-MAP-MENU-MOBILE.md`.
- Arquitetura e movimento completos da Navbar, já cobertos por
  `docs/UI-MAP-NAVBAR-DESKTOP.md`.
- Conteúdo das páginas individuais de projeto, coberto por
  `docs/UI-MAP-DETALHE-PROJETO.md`.
- Aprovação editorial, autoria, licença ou tratamento final das fotografias.
- CMS, API, banco de dados, busca, paginação, analytics, formulário, agenda ou
  integração de mensagens.
- Animações não demonstradas pelo screenshot.

## Mapa macro

A página alterna as superfícies
`hero fotográfico escuro → catálogo marfim → contato fotográfico escuro → rodapé
verde profundo`. A Navbar flutua sobre o hero, mas pertence ao shell global.

| Ordem | Região | Faixa vertical observada | Proporção aproximada | Superfície |
| ---: | --- | ---: | ---: | --- |
| 0 | Navbar global | `y ≈ 8–52` | sobreposta ao hero | Vidro verde quase preto com borda oliva |
| 1 | Hero Projetos | `y ≈ 0–320` | ~19% | Fotografia com overlay verde escuro |
| 2 | Introdução e filtros | `y ≈ 321–486` | ~10% | Marfim |
| 3 | Grade de projetos | `y ≈ 487–1288` | ~48% | Marfim com painéis claros e escuros |
| 4 | Banner de contato | `y ≈ 1314–1480` | ~10% | Fotografia de folha sobre verde profundo |
| 5 | Rodapé global | `y ≈ 1481–1671` | ~11% | Verde quase preto |

Há uma pequena área de respiro claro entre o fim da grade e o banner. As
coordenadas descrevem somente o arquivo de referência; não convertê-las em
alturas CSS fixas.

## Árvore de composição alvo

```text
GlobalSiteShell
├── SkipLink
├── PersistentDesktopNavbar                    ← global; fora da rota
│   ├── BrandHomeLink
│   ├── DesktopPrimaryNavigation
│   │   ├── NavigationLink × 5
│   │   └── ActiveRouteIndicator
│   └── HeaderContactAction
└── RouteViewport
    └── ProjectsPage
        ├── ProjectsHero
        │   ├── HeroMedia
        │   ├── HeroOverlay
        │   ├── HeroIntroduction
        │   │   ├── Eyebrow
        │   │   ├── DisplayHeading
        │   │   └── SupportingCopy
        │   └── HeroEditorialStatement
        ├── ProjectsCatalogSection
        │   ├── CatalogIntroduction
        │   │   ├── CatalogHeadingBlock
        │   │   ├── ProjectFilters
        │   │   │   └── ProjectFilter × 8
        │   │   └── BotanicalEditorialNote
        │   ├── ResultsAnnouncement
        │   ├── ProjectsGrid
        │   │   └── ProjectCard × 0..8
        │   │       ├── ProjectMedia
        │   │       └── ProjectSummaryPanel
        │   └── EmptyProjectsState
        ├── ProjectsContactBanner
        │   ├── ContactMessage
        │   ├── ContactActions
        │   ├── ContactEditorialStatement
        │   └── LeafMediaAndDecorations
        └── SiteFooter                         ← global reutilizado
```

## Contrato visual da tela

- Limite Navbar, conteúdo editorial do hero, catálogo e conteúdo do banner a um
  eixo central consistente, com gutters amplos. Hero, banner e rodapé continuam
  full-bleed.
- Use marfim nas superfícies claras e verde profundo nas escuras. Evite branco e
  preto puros ou sombras elevadas genéricas.
- Use serifada editorial nos títulos e frases de assinatura; use sem serifa em
  navegação, corpo, filtros, eyebrows, categorias e metadados.
- Reserve oliva para fragmentos de título, estado ativo, ícones, bordas e CTAs.
  Nenhum estado pode depender exclusivamente da cor.
- O hero concentra contraste à esquerda e preserva a área de lazer ao centro;
  as folhagens nas bordas funcionam como moldura fotográfica.
- A introdução do catálogo combina uma coluna de título, uma área flexível de
  pills e uma nota editorial estreita à direita.
- A grade usa duas colunas de mesma largura e quatro linhas. Os cards mantêm raio
  discreto, recorte fotográfico generoso e junção sem gap interno entre mídia e
  texto.
- Cada card alterna a ordem visual de mídia e conteúdo e a tonalidade do painel,
  produzindo um padrão xadrez. A ordem DOM deve continuar previsível.
- Trate os desenhos botânicos como decoração de baixa opacidade, fora da árvore
  de acessibilidade e sem capturar eventos de ponteiro.
- Use dimensões intrínsecas, `aspect-ratio` e `object-position` por fotografia;
  não fixe alturas que impeçam texto ampliado ou conteúdo revisado.

## Mapeamento por região

| ID | Região | Papel | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- |
| R01 | Shell global | Manter skip link, Navbar e viewport de rota | `RouteTransition` já mantém o header fora da região substituída | Reusar sem levar a Navbar para `ProjectsPage` |
| R02 | Navbar desktop | Marca, navegação, rota atual e contato | `SiteHeader` e `DesktopNavigation` existem; CTA depende de WhatsApp | Preservar contrato global; decidir se e-mail pode alimentar o CTA `Fale conosco` sem conflitar com o mapa da Navbar |
| R03 | Mídia do hero | Introduzir a linguagem de área externa integrada | `ProjectsHero` usa a capa do primeiro projeto | A capa corresponde à cena observada; confirmar recorte, overlay e autorização editorial |
| R04 | Introdução do hero | Identificar a coleção e explicar sua amplitude | Título e apoio existem; não há eyebrow | Adicionar `NOSSOS PROJETOS` e reorganizar o heading em três linhas visuais sem inserir `<br>` obrigatório |
| R05 | Frase do hero | Reforçar a proposta de valor no canto inferior direito | Não existe | Tratar como texto real sobre a mídia, não como parte da imagem; ocultar apenas se faltar espaço |
| R06 | Cabeçalho do catálogo | Preparar a exploração antes dos controles | O título do catálogo está visualmente oculto | Tornar eyebrow e `h2` visíveis e agrupá-los semanticamente com a seção |
| R07 | Filtros | Restringir a coleção a uma categoria | Oito links e URL `categoria` já existem | Preservar URL/SSR; trocar grade uniforme por pills intrínsecas com quebra natural e ordem estável |
| R08 | Nota botânica | Equilibrar a faixa e expressar a relação natureza–arquitetura–pessoas | Não existe | Criar bloco decorativo/editorial lateral; folha oculta de AT e frase legível como texto |
| R09 | Contagem de resultados | Anunciar mudanças de filtro | `ResultsAnnouncement` é visível e usa `aria-live` | Manter a região persistente; decidir se a contagem deve ser apenas visualmente oculta para corresponder ao screenshot |
| R10 | Grade de projetos | Exibir oito itens com comparação rápida | Lista em uma única coluna | Usar duas colunas em desktop largo e empilhar por falha de conteúdo em larguras menores |
| R11 | Direção dos cards | Criar ritmo xadrez entre mídia e conteúdo | Todos usam mídia à esquerda | Derivar variante de direção pela posição na grade, sem duplicar a anatomia do card |
| R12 | Superfície dos cards | Alternar painéis marfim e verde profundo | Todos os painéis são verdes | Adicionar variante tipada `light`/`dark`; preservar contraste, categorias e affordances |
| R13 | Mídia dos cards | Identificar cada projeto | Catálogo tipado possui capa, alt, dimensões e recorte | Reusar; ajustar `sizes` para duas colunas e conferir o foco de cada capa |
| R14 | Conteúdo dos cards | Apresentar categoria, título, resumo e estado/destino | Anatomia já existe | Reusar a mesma ordem; adequar cores por superfície e permitir crescimento vertical |
| R15 | Ação dos cards | Comunicar detalhe disponível ou futuro | Oito detalhes estão publicados e exibem `Ver detalhes` | Resolver contradição com `Detalhes em breve`; não retirar destinos reais só para reproduzir o texto do screenshot |
| R16 | Estado vazio | Recuperar categorias sem resultado | Já existe mensagem e `Ver todos` | Preservar mesmo ausente da referência; adaptar apenas o layout à nova grade |
| R17 | Banner de contato | Converter após a exploração do catálogo | `ContactBanner` existe dentro do container claro | Criar variante full-bleed fotográfica ou composição local que preserve a API global |
| R18 | Ações de contato | Oferecer contato principal e solicitação de conversa | E-mail real alimenta `Fale com a Sobreiro`; apoio usa o mesmo destino | A composição atual coincide com os rótulos observados; não inferir agenda ou WhatsApp |
| R19 | Frase do banner | Fechar a narrativa com `Projetos que cultivam bem-estar.` | Não existe | Adicionar como texto editorial na extremidade direita, com contraste independente da fotografia |
| R20 | Rodapé | Repetir marca, navegação, contato, redes e legal | Compartilhado e próximo ao alvo | Reusar; centralizar qualquer inclusão de `Contato` ou rede social em `siteContent` após validação |

## Conteúdo observado no screenshot

O conteúdo abaixo registra a referência. Destinos, redes, ano legal, crédito e
status de publicação não se tornam aprovados apenas por aparecerem na imagem.

### Navbar e hero

| Região | Conteúdo visível |
| --- | --- |
| Marca | `SOBREIRO` / `PAISAGISMO` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| Estado atual | `Projetos`, com traço oliva inferior |
| CTA | `Fale conosco`, acompanhado por ícone de envelope |
| Eyebrow | `NOSSOS PROJETOS` |
| Título | `Projetos que transformam espaços`, com `transformam espaços` em oliva |
| Introdução | `Conheça projetos residenciais, comerciais, interiores, rooftops e jardins verticais, além de estudos conceituais claramente identificados.` |
| Frase sobre a mídia | `Mais que espaços, paisagens para uma vida melhor.` |

O screenshot não mostra o divisor horizontal com folha presente no código atual.
A fotografia usada no hero corresponde visualmente à capa do projeto
`Residência com piscina e área gourmet`.

### Introdução e filtros

| Região | Conteúdo visível |
| --- | --- |
| Eyebrow | `EXPLORE POR CATEGORIA` |
| Título | `Encontre o projeto que inspira você.` |
| Filtros, na ordem | `Todos`, `Paisagismo residencial`, `Paisagismo comercial`, `Paisagismo de fachada`, `Rooftop e áreas de lazer elevadas`, `Jardins verticais`, `Design de interiores`, `Conceitos e renders` |
| Estado observado | `Todos` preenchido em oliva; demais opções com fundo marfim e contorno fino |
| Frase lateral | `Natureza, arquitetura e pessoas em harmonia.` |

Os filtros têm largura intrínseca ao rótulo. `Conceitos e renders` quebra para a
linha seguinte no screenshot; isso parece consequência de espaço disponível, não
uma posição fixa que deva ser codificada.

### Projetos

| Ordem | Categoria | Título | Resumo visível | Painel | Direção visual |
| ---: | --- | --- | --- | --- | --- |
| 1 | `PAISAGISMO RESIDENCIAL` | `Residência com piscina e área gourmet` | `Paisagismo residencial para uma área de lazer integrada à piscina, ao deck e à área gourmet.` | Escuro | mídia → texto |
| 2 | `PAISAGISMO COMERCIAL` | `Coffee Comfort` | `Paisagismo e ambientação para uma cafeteria, conectando fachada, acesso, salão e balcão de atendimento.` | Claro | mídia → texto |
| 3 | `PAISAGISMO DE FACHADA` | `Residência contemporânea — fachada` | `Paisagismo de fachada com canteiro linear, palmeiras e folhagens tropicais junto à arquitetura contemporânea.` | Claro | texto → mídia |
| 4 | `ROOFTOP E ÁREAS DE LAZER ELEVADAS` | `Rooftop com piscina` | `Rooftop com piscina, área gourmet, floreiras e soluções de vegetação para uma cobertura de convivência.` | Escuro | mídia → texto |
| 5 | `JARDINS VERTICAIS` | `Jardim vertical residencial` | `Jardim vertical integrado à fachada e à área da piscina, com diferentes espécies e arranjos de composição.` | Escuro | mídia → texto |
| 6 | `DESIGN DE INTERIORES` | `Cozinha contemporânea` | `Cozinha integrada com marcenaria escura, revestimento texturizado, área de jantar e jardim interno.` | Claro | mídia → texto |
| 7 | `DESIGN DE INTERIORES` | `Hall de entrada e escada` | `Hall de entrada com painel ripado, iluminação indireta, estar e escada envidraçada.` | Claro | texto → mídia |
| 8 | `CONCEITOS E RENDERS` | `Casa suspensa na mata` | `Estudo conceitual de uma residência compacta integrada à mata, com terraço, vegetação tropical e diferentes momentos de luz.` | Escuro | mídia → texto |

Todos os cards exibem `Detalhes em breve` seguido por seta horizontal. Há duas
pequenas diferenças editoriais entre screenshot e catálogo atual:

- `Jardim vertical residencial`: o catálogo usa `diferentes enquadramentos e
  detalhes de composição`, enquanto o screenshot usa `diferentes espécies e
  arranjos de composição`.
- `Casa suspensa na mata`: o catálogo usa `diferentes atmosferas de luz`, enquanto
  o screenshot usa `diferentes momentos de luz`.

Não alterar a fonte do catálogo sem uma decisão editorial explícita.

### Banner de contato e rodapé

| Região | Conteúdo visível |
| --- | --- |
| Eyebrow do banner | `VAMOS CONVERSAR?` |
| Título do banner | `Seu projeto pode ser o próximo.`, com `o próximo.` em oliva |
| Apoio | `Vamos criar juntos um espaço que reflita seu estilo, atenda às suas necessidades e valorize cada detalhe.` |
| CTA principal | `Fale com a Sobreiro`, com ícone de envelope |
| Ação de apoio | `Agende uma conversa` seguida por seta |
| Frase lateral | `Projetos que cultivam bem-estar.` |
| Descrição da marca | `Projetos de paisagismo que conectam natureza, bem-estar e estilo de vida.` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| Contato | `contato@sobreiro.com.br`; `Rio de Janeiro, RJ` |
| Redes visíveis | Instagram, Facebook e LinkedIn |
| Legal | `© 2025 Sobreiro Paisagismo. Todos os direitos reservados.` |

O crédito na extremidade direita parece `Desenvolvido com ♥ por Sieglab`, mas o
texto é pequeno demais para validação segura. O código atual usa ano 2026, duas
ações sociais e crédito `Alvarenga`; esses dados globais não devem ser trocados
pela leitura do screenshot sem aprovação.

## Matriz do padrão xadrez dos cards

| Linha | Coluna esquerda | Coluna direita |
| ---: | --- | --- |
| 1 | mídia à esquerda + painel escuro | mídia à esquerda + painel claro |
| 2 | painel claro + mídia à direita | mídia à esquerda + painel escuro |
| 3 | mídia à esquerda + painel escuro | mídia à esquerda + painel claro |
| 4 | painel claro + mídia à direita | mídia à esquerda + painel escuro |

O padrão visual não deve ser obtido com `order` arbitrário por título. Modele a
apresentação como metadado ou derive-a de posição apenas se a ordem editorial for
estável e essa dependência estiver testada. Em todas as variantes, mantenha uma
ordem de leitura coerente: categoria, título, resumo e destino devem permanecer
associados à mídia correta.

## Estados e interações

| Elemento | Estado observado | Estados necessários | Regra de comportamento |
| --- | --- | --- | --- |
| Navbar | `Projetos` ativo | idle, hover, focus-visible, active, current | Usar `aria-current="page"`; o indicador visual não substitui a semântica |
| CTA da Navbar | Aparência ativa | hover, focus-visible, active, indisponível | Só renderizar como link com destino real; o screenshot não define o destino |
| Filtro `Todos` | Selecionado | selected, hover, focus-visible, active | Exatamente um filtro selecionado; forma, peso e semântica complementam a cor |
| Demais filtros | Repouso | idle, hover, focus-visible, active, selected | Manter alvo mínimo de 44 × 44 px e rótulo completo |
| Resultados | Oito cards | carregado, filtrado, vazio | Preservar ordem editorial e anunciar categoria + contagem sem roubar foco |
| Card | Estado informativo | informativo ou link, hover, focus-visible, active | Com destino, usar um único link envolvendo a anatomia; sem destino, não criar falso tab stop |
| CTA principal | Link de e-mail sugerido pelo ícone | hover, focus-visible, active | O destino deve vir de `siteContent`; não inventar WhatsApp |
| Agendamento | Link de apoio | hover, focus-visible, active | Pode solicitar conversa por canal existente; não prometer calendário |
| Rodapé | `Projetos` atual | idle, current, hover, focus-visible, active | Reutilizar o mesmo destino e `aria-current="page"` da navegação global |

### Contrato dos filtros

O screenshot mostra seleção única, mas não comprova o mecanismo. A implementação
atual já oferece um contrato adequado e deve ser preservada:

1. A URL é a fonte de verdade por meio de `?categoria=<id>`.
2. `Todos` remove o parâmetro; valores inválidos ou repetidos normalizam para
   `todos` sem quebrar a página.
3. Cada opção é um link real, utilizável sem JavaScript e em nova aba.
4. Outros parâmetros da URL permanecem intactos.
5. A troca preserva foco e rolagem quando aprimorada no cliente.
6. A região persistente anuncia categoria e quantidade com `aria-live="polite"`.
7. O estado vazio mantém filtros e banner e oferece `Ver todos`.

### Contrato dos cards

- Não aninhar `Detalhes em breve` como botão dentro de um card clicável.
- Se o detalhe está publicado, o card inteiro pode ser um único link e a
  affordance deve comunicar `Ver detalhes` ou equivalente verdadeiro.
- Se não existe destino, o card é um artigo informativo, não recebe cursor de
  ação nem entra na ordem de foco.
- A seta observada não basta para afirmar interatividade; texto, semântica e
  destino devem concordar.
- O hover pode aplicar mudança discreta de cor ou escala da mídia sem alterar o
  layout. O foco visível deve envolver o alvo interativo completo.

## Contrato de movimento

- O screenshot não comprova animação própria do hero, catálogo, cards ou banner.
- A Navbar e a transição entre rotas seguem o contrato global de
  `docs/UI-MAP-NAVBAR-DESKTOP.md`.
- A filtragem não deve animar a altura total da grade nem atrasar a atualização.
- Mudanças curtas de cor, borda e mídia em hover podem usar os tokens existentes.
- Não adicionar parallax, entrada em cascata, autoplay ou movimento botânico sem
  uma especificação posterior.
- Em `prefers-reduced-motion: reduce`, qualquer transição não essencial deve ser
  removida ou reduzida a uma mudança imediata.

## Contrato responsivo

O screenshot comprova apenas desktop. As faixas abaixo são direção de adaptação,
não reprodução de frames ausentes.

| Faixa lógica | Composição recomendada |
| --- | --- |
| Mobile estreito | Menu mobile global; hero com overlay uniforme; introdução, filtros e nota empilhados; cards com mídia antes do texto; banner e rodapé empilhados |
| Tablet | Uma coluna de cards split quando houver largura; filtros em múltiplas linhas; nota botânica reposicionada sem ocupar espaço essencial |
| Desktop de referência | Duas colunas de cards, introdução em três zonas e banner horizontal full-bleed |
| Desktop largo | Conteúdo limitado por `--width-content`; não aumentar indefinidamente cards, linhas de texto ou distância entre regiões |

- Faça a grade mudar de duas para uma coluna quando cada card deixar de acomodar
  duas metades legíveis, e não por tentativa de reproduzir 941 pixels físicos.
- Quando o card empilhar, preserve mídia antes de categoria, título, resumo e
  destino na ordem DOM, independentemente da direção mostrada no desktop.
- Pills devem quebrar integralmente; não cortar rótulos nem reduzir tipografia ou
  alvo de toque para manter uma única linha.
- Texto ampliado a 200% deve aumentar a altura das regiões sem recorte,
  sobreposição ou rolagem horizontal da página.
- Frases editoriais laterais podem mudar de posição ou ser omitidas em telas
  estreitas, desde que não sejam a única fonte de informação essencial.

## Acessibilidade

- Preserve um único `h1` no hero. O catálogo e o banner usam `h2`; cada projeto
  usa `h3`.
- Relacione hero, catálogo e banner aos próprios títulos com `aria-labelledby`.
- Use `nav aria-label="Categorias de projetos"` para os filtros; não use tabs.
- O filtro atual precisa de estado semântico e distinção além da cor.
- Mantenha skip link, foco visível e alvos mínimos de 44 × 44 px.
- Use `ul`/`li` para a coleção e `article` por projeto.
- Alt de cada capa descreve o conteúdo relevante sem repetir título e categoria.
- Imagens informativas não podem ser backgrounds CSS; overlays e desenhos
  botânicos decorativos permanecem `aria-hidden`.
- Valide contraste AA sobre fotografia, especialmente no hero, na frase lateral
  do banner e nos textos oliva dos painéis escuros.
- Não usar `aria-disabled` em links sem destino; renderizar texto não interativo.
- A troca de filtro não move foco para a grade. A contagem é anunciada de forma
  polida e permanece associada ao catálogo.

## Inventário de reuso

### Reusar sem mudança de responsabilidade

| Componente ou fonte | Uso no alvo |
| --- | --- |
| `SiteFrame` | Shell full-bleed da rota |
| `SiteHeader` / `DesktopNavigation` | Navbar global, item atual e CTA configurado |
| `BrandLockup` | Marca na Navbar e no rodapé |
| `DisplayHeading` / `SupportingCopy` | Título e textos editoriais |
| `LineIcon` | Envelope, setas, contato e ornamentos aprovados |
| `ProjectFilters` | Navegação por categoria e estado atual |
| `ResultsAnnouncement` | Anúncio acessível da coleção filtrada |
| `portfolioCatalog` | Categorias, ordem, títulos, resumos, mídia e publicação |
| `ProjectCard` | Anatomia, imagem, conteúdo e destino único |
| `ContactBanner` | Conteúdo e ações de conversão |
| `SiteFooter` | Marca, grupos, redes e barra legal |

### Evoluir por variante ou composição

| Componente | Extensão provável | Restrição |
| --- | --- | --- |
| `ProjectsHero` | Eyebrow, bloco editorial direito e remoção do divisor visual | Manter mídia, overlay, um `h1` e área de segurança da Navbar |
| `ProjectsCatalog` | Introdução visível e grade desktop de duas colunas | Preservar filtro SSR, anúncio e estado vazio |
| `ProjectFilters` | Layout flexível de pills intrínsecas | Preservar hrefs, ordem, foco e semântica atuais |
| `ProjectCard` | `direction` e `surface` tipados | Não criar oito componentes nem duplicar anatomia interativa/informativa |
| `ContactBanner` | Variante fotográfica full-bleed e frase lateral opcional | Preservar default dos outros consumidores |
| `SiteFooter` | Eventual quinto link e redes adicionais | Alterar somente por fonte global validada |

### Manter local à rota `/projetos`

- Conteúdo editorial do hero e da introdução do catálogo.
- Nota botânica da faixa de filtros.
- Regras de apresentação do padrão xadrez.
- Composição fotográfica e frase lateral do banner, se não houver segundo uso.
- Estado vazio específico do catálogo.

Não crie um segundo catálogo, copie os oito projetos para `projectsContent.ts`
nem derive categorias de rótulos visíveis. `images/portfolio/catalog.json` e
`app/_content/portfolioCatalog.ts` permanecem a fonte única.

## Lacunas e decisões pendentes

| Prioridade | Lacuna | Por que importa | Direção segura |
| --- | --- | --- | --- |
| Alta | `Detalhes em breve` contradiz oito páginas publicadas | Texto e comportamento não podem divergir | Preservar destinos reais ou aprovar explicitamente a despublicação; não imitar o screenshot isoladamente |
| Alta | Duas versões de resumo divergem do catálogo | Cria duas fontes editoriais | Manter catálogo atual até revisão formal |
| Alta | Origem e direito de uso de algumas mídias ainda pedem confirmação | Afeta publicação pública | Preservar os status editoriais existentes e validar antes do lançamento |
| Média | CTA da Navbar aparece com e-mail, enquanto o mapa global prevê WhatsApp | Afeta consistência entre rotas | Definir uma regra global de fallback e um único rótulo por estado |
| Média | Contagem de resultados não aparece na referência | Pode alterar o ritmo visual, mas é funcional para AT | Manter semanticamente; avaliar apresentação visual discreta ou somente para leitores de tela |
| Média | Padrão xadrez depende da ordem dos itens | Reordenação ou filtro pode gerar combinações imprevistas | Definir se a variante pertence ao projeto ou à posição da coleção filtrada |
| Média | Banner exige uma fotografia/recorte específico de folha molhada | Sem ativo aprovado, o alvo não pode ser reproduzido fielmente | Selecionar ativo local aprovado e fornecer fallback verde com contraste equivalente |
| Média | Footer da referência tem `Contato` e três redes | Código atual possui quatro links e duas ações sociais | Validar destinos antes de alterar `siteContent` |
| Baixa | Comportamento da frase lateral em larguras menores é desconhecido | Pode competir com conteúdo essencial | Reposicionar ou ocultar em breakpoints por falha de conteúdo |
| Baixa | Medidas CSS e breakpoint da captura são desconhecidos | Pixels físicos não definem layout | Implementar por largura disponível, conteúdo e tokens |

## Direção sugerida de implementação

1. Tratar este arquivo como nova referência visual e abrir uma mudança OpenSpec
   específica de alinhamento desktop; não editar artefatos históricos concluídos.
2. Preservar shell, Navbar, URL dos filtros, catálogo tipado, páginas de detalhe,
   anúncio acessível e rodapé compartilhado.
3. Evoluir primeiro `ProjectCard` com variantes pequenas de direção e superfície,
   mantendo seu destino único e seus defaults para Home.
4. Reestruturar `ProjectsCatalog` em introdução + filtros + anúncio + grade, sem
   elevar a rota inteira a Client Component.
5. Ajustar o hero com eyebrow e frase editorial, reutilizando a capa e o modelo de
   mídia existentes.
6. Criar uma variante do banner somente se ela preservar compatibilidade com Home
   e Sobre; caso contrário, manter a composição fotográfica local à rota.
7. Resolver contradições editoriais e de destino antes de mudar copy, status de
   publicação, links globais ou redes sociais.
8. Validar 320, 768, 1024 e 1440 px, zoom de 200%, teclado, contraste, movimento
   reduzido, URLs filtradas, voltar/avançar e ausência de JavaScript.

## Referências técnicas prováveis

- `app/layout.tsx`
- `app/globals.css`
- `app/_components/SiteHeader.tsx`
- `app/_components/DesktopNavigation.tsx`
- `app/_components/ProjectCard.tsx`
- `app/_components/ContactBanner.tsx`
- `app/_components/SiteFooter.tsx`
- `app/_content/siteContent.ts`
- `app/_content/portfolioCatalog.ts`
- `app/projetos/page.tsx`
- `app/projetos/projectsContent.ts`
- `app/projetos/projectFilters.ts`
- `app/projetos/_components/ProjectsHero.tsx`
- `app/projetos/_components/ProjectsCatalog.tsx`
- `app/projetos/_components/ProjectFilters.tsx`
- `app/projetos/_components/ResultsAnnouncement.tsx`
- `images/portfolio/catalog.json`
- `docs/PROJECTS-CONTENT.md`
- `docs/UI-MAP-NAVBAR-DESKTOP.md`
- `docs/UI-MAP-DETALHE-PROJETO.md`
- `openspec/changes/build-projects-page/`
- `openspec/changes/integrate-portfolio-catalogs/`

## Resultado esperado deste artefato

Uma futura implementação deve conseguir reproduzir a versão desktop mostrada na
referência sem confundir conteúdo visível com instrução, sem duplicar o catálogo,
sem quebrar a filtragem por URL ou os detalhes publicados e sem transformar
decorações e dados de mockup em requisitos funcionais não aprovados.
