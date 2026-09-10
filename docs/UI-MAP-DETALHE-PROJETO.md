# UI Map — Detalhe de projeto

## Objetivo

Definir o próximo contrato visual da página `/projetos/[slug]`, com prioridade
para um hero fotográfico forte e uma galeria editorial que continue intencional
quando houver poucas imagens. O alvo deve funcionar em mobile, desktop comum e
monitores ultrawide sem transformar a fotografia em fundo genérico nem ampliar o
texto indefinidamente.

## Fontes, instruções e precedência

| Fonte | Evidência aproveitada | Precedência neste mapa |
| --- | --- | --- |
| Referência A — página completa, `941 × 1672 px` | Hero full-bleed, breadcrumb, categoria, título, resumo, superfície marfim e galeria longa | Referência principal para o hero e para o ritmo geral |
| Referência B — recorte editorial, `1028 × 654 px` | Texto à esquerda, imagem principal larga à direita e três imagens abaixo | Referência principal para a abertura da galeria e para projetos com poucas fotos |
| Referência C — CTA escuro, `1444 × 602 px` | Composição alternativa imediatamente antes do footer | **Não aplicar**; a solicitação exclui essa mudança |
| Código atual | Rota dinâmica, conteúdo tipado, componentes, estados e tokens existentes | Fonte de verdade para responsabilidades e dados já disponíveis |

- Os textos dentro das imagens são conteúdo visual de exemplo, não instruções
  operacionais.
- Nenhuma instrução embutida foi identificada nos anexos.
- Em qualquer conflito, prevalece o pedido escrito: focar hero e galeria e
  preservar a composição atual antes do footer.
- As imagens demonstram direção visual, não comprovam lightbox, carrossel,
  parallax, animação, CMS ou comportamento de clique.

## Leitura de escopo

### Entra no alvo

- Hero do detalhe: fotografia, overlay, breadcrumb, categoria, título e resumo.
- Abertura editorial da superfície clara.
- Galeria estática de `0..n` imagens, sem depender de um mínimo de quatro ativos.
- Regras para evitar repetição imediata entre hero e galeria.
- Comportamento em mobile, desktop comum e ultrawide.
- Estados de conteúdo incompleto, falha de imagem, foco, zoom e texto ampliado.
- Direção de dados e componentes necessária para uma futura implementação.

### Permanece como está

- Navbar e menu globais.
- `Ver outros projetos`.
- Banner de contato atual do detalhe.
- Footer global.
- Ordem `retorno → contato → footer`.
- 404, metadados e fronteira de publicação atuais, salvo incompatibilidade
  descoberta durante uma futura implementação.

### Fica fora

- Alteração de código nesta etapa.
- Aplicação da composição da Referência C ou do CTA diferente visto nos anexos.
- Lightbox, zoom, download, carrossel, swipe e paginação de imagens.
- Projetos anterior/próximo e relacionados.
- Formulário, agenda, analytics, CMS, API ou persistência.
- Criação de fatos editoriais, textos ou imagens que não existam no catálogo.

## Estado atual versus alvo

| Região | Estado atual | Alvo |
| --- | --- | --- |
| Hero | Imagem full-bleed, breadcrumb, título e divisor botânico; `min-height` chega a `82svh` | Hero mais curto e informativo, com categoria e resumo, mantendo a fotografia como tese da página |
| Título | Texto integral em branco | Acento oliva opcional e editorialmente definido; nunca inferido por quebra automática |
| Resumo | Aparece somente em `Sobre o projeto` | Aparece no hero; não deve ser repetido logo abaixo |
| Abertura clara | `Sobre o projeto` e statement opcional em duas colunas | Narrativa à esquerda e primeira foto disponível à direita, como na Referência B |
| Galeria | Padrão rígido `panorama → alta + duas empilhadas`; imagens adicionais entram em duas colunas | Composição derivada da quantidade real de imagens, sem células vazias nem recortes extremos |
| Mídia repetida | O hero normalmente é a capa e essa mesma imagem reaparece como primeiro item | Evitar repetição imediata quando existir outra mídia única |
| Largura | Hero e galeria limitados pelo mesmo `--width-content: 76rem` | Texto continua em `76rem`; trilho fotográfico pode chegar a `90rem` no ultrawide |
| Pré-footer | Retorno, `ContactBanner` e footer atuais | Sem mudança |

O catálogo versionado hoje contém de 4 a 15 imagens por projeto, mas o contrato
alvo não usa esse intervalo como pré-condição: novos projetos podem chegar com
menos material sem quebrar a composição.

## Direção visual

O detalhe deve parecer um percurso editorial por um jardim: a primeira dobra cria
atmosfera e orienta; a superfície clara desacelera a leitura; a galeria alterna
vistas amplas e detalhes sem virar uma grade de catálogo.

- **Paleta:** preservar os tokens funcionais existentes — marfim
  `--color-surface-light-primary`, verde profundo `--color-surface-deep`, texto
  escuro e oliva semântico. Não introduzir branco ou preto puros.
- **Tipografia:** manter a serifada de display nos títulos e a sem serifa no
  corpo, breadcrumb e categoria. A fotografia e a composição carregam a
  personalidade; não criar um terceiro estilo tipográfico.
- **Assinatura:** a primeira imagem da galeria compartilha a mesma linha editorial
  da narrativa, maior e deslocada para a direita. Esse gesto aproxima projeto e
  explicação e substitui ornamentos sem função.
- **Ritmo:** bordas arredondadas discretas, gutters curtos entre fotos e espaços
  maiores entre capítulos. Evitar sombras de card na galeria.
- **Movimento:** nenhum movimento próprio. A experiência é fotográfica e estática;
  somente estados globais e transições discretas já existentes permanecem.

## Mapa macro

```text
GlobalSiteShell
├── SiteHeader                                      ← reuso, sem mudança
└── ProjectDetailPage
    ├── ProjectDetailHero
    │   ├── HeroMedia
    │   ├── ContrastOverlay
    │   └── HeroContent
    │       ├── Breadcrumb
    │       ├── ProjectCategory
    │       ├── ProjectTitle
    │       └── ProjectSummary
    ├── ProjectStorySurface
    │   └── ProjectMediaRail
    │       ├── ProjectStoryGallery
    │       │   ├── ProjectNarrative
    │       │   ├── LeadGalleryImage?              ← depende da quantidade
    │       │   └── GalleryImage × 0..n
    │       └── AppliedSolutions?                  ← comportamento atual
    ├── ProjectsReturnLink                         ← congelado neste mapa
    ├── ProjectDetailContact                       ← congelado neste mapa
    └── SiteFooter                                 ← reuso, sem mudança
```

## Wireframes responsivos

### Ultrawide, `≥ 1600 px`

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ [navbar limitada ao shell]                                               │
│                                                                          │
│  breadcrumb                                                              │
│  CATEGORIA                      título e texto não passam de 76rem        │
│  Título do projeto                                                       │
│  resumo                                      fotografia ocupa o restante │
└──────────────────────────────────────────────────────────────────────────┘

      ┌──────────── 90rem no máximo ────────────────────────────────┐
      │ narrativa 4/12 │ imagem principal 8/12                      │
      ├────────────────┴────────────────────────────────────────────┤
      │ imagem 4/12     │ imagem 4/12      │ imagem 4/12            │
      └──────────────────────────────────────────────────────────────┘
```

O conteúdo fica centralizado. A área excedente revela mais da fotografia do
hero, não aumenta fonte, largura de leitura ou altura da galeria.

### Desktop comum, `1024–1599 px`

```text
┌──────────────────────────────────────────────────────────────┐
│ hero full-bleed; conteúdo inferior esquerdo; recorte focal   │
└──────────────────────────────────────────────────────────────┘
┌───────────────────┬──────────────────────────────────────────┐
│ narrativa 4/12    │ imagem principal 8/12                    │
├───────────────────┴──────────────────────────────────────────┤
│ imagens em 2 ou 3 colunas conforme largura e quantidade     │
└──────────────────────────────────────────────────────────────┘
```

Em `1024–1199 px`, priorizar duas colunas para as imagens secundárias. Três
colunas só entram quando cada foto mantém largura útil e o texto não é comprimido.

### Mobile, `< 768 px`

```text
┌──────────────────────────┐
│ hero                     │
│ breadcrumb               │
│ categoria                │
│ título                   │
│ resumo                   │
└──────────────────────────┘
┌──────────────────────────┐
│ narrativa                │
├──────────────────────────┤
│ imagem 1                 │
├──────────────────────────┤
│ imagem 2                 │
├──────────────────────────┤
│ ...                      │
└──────────────────────────┘
```

A ordem DOM é a ordem visual. Não preservar mosaico desktop por meio de fotos
minúsculas, recortes agressivos, `order` ou posicionamento absoluto.

## Contrato do hero

### Conteúdo e hierarquia

1. Breadcrumb: `Início / Projetos / {projeto}`.
2. Categoria editorial real do catálogo, em eyebrow; por exemplo,
   `PAISAGISMO RESIDENCIAL`.
3. Um único `h1` com o título do projeto.
4. `summary` em uma ou duas linhas de leitura no desktop e crescimento natural no
   mobile.

O divisor botânico atual sai do alvo: categoria e resumo passam a fornecer a
estrutura que ele tentava sugerir. Não adicionar outro ornamento para preencher
o espaço.

### Fotografia e contraste

- Hero full-bleed, `object-fit: cover`, sem largura máxima na imagem.
- Altura alvo: `clamp(34rem, 68svh, 46rem)` em desktop e
  `clamp(30rem, 76svh, 40rem)` em mobile. A altura pode crescer para acomodar
  texto ampliado; o conteúdo nunca é cortado.
- O recorte deve usar o `position` editorial existente. Se um mesmo ponto focal
  não servir a desktop e mobile, admitir `positionMobile` opcional em vez de
  duplicar a mídia.
- Overlay em duas camadas: gradiente lateral para o texto e gradiente inferior
  para a zona de leitura. Em mobile, usar cobertura mais uniforme.
- Título limitado a aproximadamente `15ch`; resumo a `46–58ch`.
- Não escalar o título depois de aproximadamente `5.25rem` no ultrawide.
- O header deve manter seu clearance; breadcrumb nunca fica atrás da Navbar.
- Se a imagem falhar, a superfície verde profunda e o overlay ainda sustentam
  contraste suficiente.

### Acento do título

O oliva pode destacar o fragmento semântico final, como `área gourmet`, mas a
decisão deve vir de dado editorial (`titleFragments` ou `accentText`). Não usar
`lastIndexOf`, número de palavras, quebra de linha ou CSS para adivinhar o trecho.
Na ausência desse dado, todo o título permanece na cor principal.

### Responsividade do hero

| Faixa | Regra |
| --- | --- |
| `< 480 px` | Ocultar visualmente o item atual do breadcrumb se ele repetir um `h1` longo; mantê-lo acessível. Título e resumo usam a largura total disponível. |
| `480–767 px` | Preservar os três níveis do breadcrumb quando couberem; conteúdo ancorado na base. |
| `768–1199 px` | Conteúdo ocupa no máximo cerca de 62% da largura; recorte protege o assunto principal. |
| `1200–1599 px` | Conteúdo acompanha `--width-content`; imagem ganha área negativa à direita. |
| `≥ 1600 px` | Hero continua full-bleed, mas o bloco textual não se afasta do eixo do restante da página. Não aumentar altura só porque há largura. |

## Contrato da narrativa e da galeria

### Preparação das mídias

Defina `galleryMedia` sem alterar a ordem do catálogo:

1. Resolva a mídia do hero pelo contrato atual (`heroFile` ou fallback de capa).
2. Remova duplicatas exatas por `file` apenas da apresentação visual.
3. Se o arquivo do hero também for o primeiro de `images` e existirem outras
   mídias únicas, não o repita imediatamente na galeria.
4. Se só existir uma mídia única, use-a no hero e não fabrique uma galeria vazia.
5. Preserve todos os demais arquivos na ordem editorial declarada.

Essa regra evita a repetição hero → primeira foto, mas não exclui fotos parecidas
que representem enquadramentos distintos.

### Narrativa

- A coluna textual usa eyebrow `SOBRE O PROJETO`, um heading editorial e corpo
  curto, como na Referência B.
- `summary` já foi usado no hero e não deve aparecer de novo.
- O heading e o corpo abaixo do hero são opcionais e precisam de conteúdo real.
  Campos recomendados: `details.introHeading` e `details.body` como parágrafos.
- `details.statement` pode alimentar o heading editorial quando fizer sentido,
  sem caixa alta obrigatória.
- Se não houver narrativa adicional, omitir o bloco; a galeria começa alinhada ao
  topo da superfície clara, sem texto placeholder.

### Matriz por quantidade

`N` abaixo é o total de `galleryMedia` após a regra de não repetição.

| N | Composição desktop | Composição mobile |
| ---: | --- | --- |
| 0 | Somente narrativa, com largura de leitura; se ela também não existir, reduzir o padding da superfície antes das soluções | Nenhuma região de galeria; não renderizar heading vazio |
| 1 | Narrativa `4/12` + foto `8/12`; sem linha secundária | Narrativa seguida da foto |
| 2 | Narrativa `4/12` + foto 1 `8/12`; foto 2 panorâmica abaixo | Narrativa → foto 1 → foto 2 |
| 3 | Narrativa + foto 1; fotos 2 e 3 em duas colunas abaixo | Uma coluna em ordem |
| 4 | Narrativa + foto 1; fotos 2–4 em três colunas, como a Referência B | Uma coluna em ordem |
| `5+` | Narrativa + foto 1; continuar com linhas de 2 ou 3 itens e alternar proporções `7/5` e `5/7` sem mudar a ordem DOM | Uma coluna em ordem; opcionalmente duas colunas somente acima de `40rem` e com proporções compatíveis |

### Regras de composição

- Usar Grid explícito e determinístico; não usar masonry baseada em JavaScript.
- A primeira foto disponível é a imagem principal do bloco e deve ter proporção
  próxima de `16:9` ou `3:2`, respeitando o ponto focal.
- Fotos secundárias usam proporção derivada do grupo: `4:3` em pares e entre
  `4:5` e `1:1` em trios. Não impor retrato a uma fotografia panorâmica.
- A última linha nunca deixa uma célula vazia visível. Um item órfão ocupa a
  largura total útil; dois itens dividem a linha.
- Gutter sugerido: `clamp(0.5rem, 1vw, 1rem)`. O espaçamento entre narrativa e
  nova linha de fotos é maior que o gutter interno.
- Raio usa `--radius-card`; não criar moldura, sombra ou legenda flutuante.
- Todas as fotos têm largura e altura intrínsecas, `sizes` coerente com a célula,
  `object-fit: cover` e `object-position` editorial.
- Nenhuma foto é link, botão ou recebe `tabIndex` enquanto não houver lightbox.
- Cada imagem informativa usa seu `alt` existente. O hero mantém `alt=""` somente
  quando a mesma mídia também aparece com descrição na galeria; se for a única
  ocorrência do arquivo, o hero recebe o `alt` editorial da mídia.

## Largura, escala e falha de conteúdo

| Contexto | Trilho textual | Trilho de mídia | Comportamento esperado |
| --- | --- | --- | --- |
| Mobile | `100%` menos gutter e safe area | Igual ao textual | Uma coluna, sem overflow horizontal |
| Tablet | Até `--width-content` | Até `--width-content` | Narrativa pode continuar empilhada até a composição caber |
| Desktop comum | Até `76rem` | Até `76rem` | Relação `4/12 + 8/12`; pares/trios por largura útil |
| Ultrawide | Até `76rem` para leitura | Novo limite funcional sugerido de `90rem` | Galeria respira mais que o texto, mas permanece centralizada |

- Introduzir um token funcional como `--width-media: 90rem` somente se a
  implementação confirmar reuso em outras páginas fotográficas.
- Nunca usar `100vw` dentro do corpo para simular largura ultrawide; isso quebra
  gutters, scrollbar e alinhamento.
- Zoom de 200%, títulos longos e parágrafos adicionais expandem a altura.
- Breakpoints devem ocorrer quando a célula deixa de sustentar imagem e texto,
  não para reproduzir exatamente as larguras dos screenshots.

## Mapeamento por região

| ID | Região | Papel | Reuso / estado atual | Direção |
| --- | --- | --- | --- | --- |
| R01 | Shell | Manter skip link, header, main e footer | `SiteFrame`, `SiteHeader`, `SiteFooter` | Reusar sem mudança de responsabilidade |
| R02 | Hero | Contextualizar e emocionar | `ProjectDetailHero` já existe | Incluir categoria e resumo; remover divisor decorativo |
| R03 | Breadcrumb | Orientar na hierarquia | Já possui links ancestrais e item atual | Preservar semântica; adaptar visualmente em títulos longos |
| R04 | Hero media | Sustentar atmosfera | `project.hero`, `next/image` | Preservar prioridade e dimensões; admitir foco mobile opcional |
| R05 | Título | Identificar o projeto | `DisplayHeading` | Aceitar acento editorial explícito, com fallback simples |
| R06 | Resumo | Explicar rapidamente o case | Hoje vive em `ProjectOverview` | Mover para o hero e não duplicar |
| R07 | Narrativa | Aprofundar intenção e contexto | `ProjectOverview` usa summary + statement | Remodelar como conteúdo adicional opcional |
| R08 | Galeria | Mostrar vistas e detalhes | `ProjectGallery` renderiza toda a lista em ordem | Tornar layout dependente da quantidade e evitar repetição do hero |
| R09 | Soluções | Explicar decisões do projeto | `AppliedSolutions`, opcional | Manter após a galeria; fora da revisão visual prioritária |
| R10 | Retorno | Voltar ao catálogo | `ProjectsReturnLink` | Congelado neste mapa |
| R11 | Contato | Converter após a leitura | `ContactBanner` atual | Congelado; não aplicar Referência C |
| R12 | Footer | Navegação e dados globais | `SiteFooter` | Reusar sem mudança |

## Estados e interações

| Estado | Regra visual | Regra funcional |
| --- | --- | --- |
| Carregado | Hero e mídia aparecem sem salto de layout | Reservar espaço pelas dimensões intrínsecas |
| Imagem do hero indisponível | Fundo verde profundo mantém contraste | O conteúdo e a navegação permanecem completos |
| Galeria sem mídia adicional | Nenhuma caixa vazia ou heading visível | Omitir a região e seguir para soluções/retorno |
| 1–3 imagens | Composição usa a matriz reduzida | Não duplicar ou esticar ativos para preencher slots |
| Muitas imagens | Linhas editoriais continuam até o fim | Renderizar todos os ativos na ordem do catálogo |
| Narrativa ausente | Galeria assume o início do trilho | Não repetir `summary` nem inserir texto genérico |
| Hover | Fotos não sugerem clique | Nenhuma transformação ou cursor de ação |
| Foco | Somente breadcrumb e ações posteriores recebem foco visível | Galeria estática fica fora da ordem de tabulação |
| Movimento reduzido | Nenhuma diferença na galeria estática | Contrato global continua respeitando `prefers-reduced-motion` |

## Acessibilidade e semântica

- Manter um único `h1` no hero.
- Breadcrumb usa `nav` com lista ordenada; o projeto atual usa
  `aria-current="page"` e não é link.
- Categoria é texto auxiliar, não heading.
- Narrativa usa `section aria-labelledby` somente quando seu heading existir.
- Galeria usa lista semântica. Se houver mídia, manter um `h2` visualmente oculto
  como nome da região; se não houver mídia, não renderizar a seção.
- A regra de deduplicação não pode apagar a única descrição acessível de uma
  fotografia: mídia exclusiva do hero recebe `alt` informativo.
- Não transmitir informação apenas pela cor do fragmento oliva.
- Garantir contraste WCAG 2.2 AA do resumo e breadcrumb sobre qualquer recorte.
- Áreas clicáveis preservadas pelo shell têm ao menos `44 × 44 px` e foco visível.
- Em 200% de zoom, o hero cresce e a galeria empilha sem corte ou rolagem lateral.

## Contrato de dados sugerido

Somente campos que representam decisões editoriais novas devem ser adicionados.

```ts
interface PortfolioImage {
  readonly file: string;
  readonly alt: string;
  readonly position?: string;
  readonly positionMobile?: string;
}

interface PortfolioProjectDetails {
  readonly heroFile?: string;
  readonly titleAccent?: string;
  readonly introHeading?: string;
  readonly body?: readonly string[];
  readonly statement?: string;
  readonly solutions?: readonly ProjectSolution[];
}
```

- Categoria, título, `summary`, hero e imagens continuam derivados do catálogo.
- `titleAccent` precisa ser substring exata do título; entrada inválida falha na
  validação, em vez de produzir marcação incorreta.
- `body` é opcional e não substitui `summary`: ele aprofunda a história depois do
  hero.
- Não adicionar campos de layout por índice (`featured`, `tall`, `column`) ao
  catálogo nesta etapa. A composição é derivada de quantidade e proporção.

## Lacunas para implementação

1. Aprovar o conteúdo real de `introHeading` e `body` para cada projeto, ou
   confirmar que a galeria pode iniciar sem narrativa adicional.
2. Definir os fragmentos de título que recebem acento; não derivá-los
   automaticamente.
3. Validar pontos focais em desktop e mobile para todas as mídias de hero.
4. Confirmar se a mídia do hero deve reaparecer mais tarde em algum case por
   intenção editorial específica.
5. Definir se o trilho de `90rem` merece token global ou permanece local.
6. Confirmar direitos, autoria e alt das mídias marcadas como referência ou
   renderização no catálogo.
7. Decidir se projetos futuros podem ter zero imagens adicionais; o mapa suporta
   esse estado, mas publicação continua sendo decisão editorial.

## Direção de implementação

1. Ajustar e validar o modelo do catálogo antes da apresentação.
2. Evoluir `ProjectDetailHero` com categoria, resumo, acento explícito e foco
   responsivo.
3. Substituir a relação independente `ProjectOverview + ProjectGallery` por uma
   composição local `ProjectStoryGallery`, mantendo subcomponentes pequenos.
4. Derivar uma lista visual sem repetição e uma variante de layout por quantidade,
   sem alterar o array fonte.
5. Manter a implementação como Server Components; não há estado interativo novo.
6. Preservar `AppliedSolutions`, `ProjectsReturnLink`, `ContactBanner` e
   `SiteFooter` durante esta mudança.
7. Cobrir em testes `0`, `1`, `2`, `3`, `4` e `5+` imagens, ordem, deduplicação,
   alt, ausência de foco, título longo e narrativa opcional.
8. Validar visualmente em `360`, `390`, `768`, `1024`, `1440`, `1920` e `2560 px`,
   além de zoom de 200% e falha da imagem do hero.

## Referências técnicas prováveis

| Arquivo | Papel |
| --- | --- |
| `images/portfolio/catalog.json` | Conteúdo, ordem editorial, hero e mídias |
| `app/_content/portfolioCatalog.ts` | Tipos, validação e resolução de mídia |
| `app/projetos/[slug]/page.tsx` | Composição e fornecimento de categoria/resumo |
| `app/projetos/[slug]/_components/ProjectDetailHero.tsx` | Hero alvo |
| `app/projetos/[slug]/_components/ProjectOverview.tsx` | Narrativa atual a ser remodelada |
| `app/projetos/[slug]/_components/ProjectGallery.tsx` | Galeria e variantes por quantidade |
| `app/projetos/[slug]/_components/AppliedSolutions.tsx` | Região preservada após a galeria |
| `app/projetos/[slug]/_components/ProjectsReturnLink.tsx` | Início da região congelada |
| `app/projetos/[slug]/projectDetailContent.ts` | Conteúdo do banner preservado |
| `app/globals.css`, `app/color-tokens.css` | Tokens, layout e breakpoints |
| `app/projetos/[slug]/ProjectDetailPage.test.tsx` | Contratos atuais e novos cenários |

## Resultado esperado

Uma página de detalhe reconhecível como Sobreiro, com hero mais informativo e
galeria cinematográfica sem fragilidade estrutural. Projetos com uma única foto
continuam completos e honestos; projetos extensos ganham ritmo editorial; o bloco
de conversão e o footer permanecem exatamente fora desta revisão.
