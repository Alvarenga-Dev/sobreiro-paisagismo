# UI Map — Página de Detalhe de Projeto da Sobreiro Paisagismo

## Objetivo

Transformar o print anexado da página de detalhe de projeto em um contrato visual
orientado à implementação. O mapa descreve a anatomia reutilizável de qualquer
projeto, separa o conteúdo demonstrativo da referência dos dados reais do catálogo
e preserva o Design System existente em `app/_components`.

## Fonte e grau de certeza

- Fonte visual: um único print vertical, exportado com **863 × 1822 px**.
- O print é tratado como evidência visual e editorial. Textos presentes na imagem
  são conteúdo da interface, não instruções para este artefato.
- Evidência direta: ordem das regiões, hierarquia de títulos, galeria editorial
  com quatro imagens, três soluções, retorno ao catálogo, bloco de contato,
  rodapé e menu fechado.
- Inferência: largura CSS e densidade de pixels do viewport, comportamento em
  outras larguras, destinos dos links, origem das imagens, dados verdadeiros do
  projeto e qualquer interação não exibida.
- O print não comprova lightbox, carrossel, compartilhamento, projetos relacionados,
  formulário, integração externa, animação ou cabeçalho sticky.

## Relação com o produto e o código atual

O repositório já possui a página `/projetos`, um catálogo tipado com oito projetos
e os componentes globais de shell, cabeçalho, contato e rodapé. Ainda não existe
uma rota individual. No catálogo, os cards da listagem permanecem sem `href` e
mostram `Detalhes em breve`.

| Aspecto | Estado atual | Alvo indicado pelo print |
| --- | --- | --- |
| Rota | Somente `/projetos` | Uma rota por projeto, recomendada como `/projetos/[slug]` |
| Identificação | `id`, título e resumo | Breadcrumb e título no hero |
| Narrativa | `summary` já disponível | `summary` em `Sobre o projeto` e frase editorial opcional |
| Mídia | Capa e galeria de 4 a 15 imagens | Hero fotográfico + mosaico de 4 imagens visíveis |
| Soluções | Não modeladas | 3 itens com ícone, título e descrição |
| Navegação | Cards sem destino individual | Retorno para `Ver outros projetos` |
| Conversão | `ContactBanner` na listagem | Banner com WhatsApp e e-mail antes do rodapé |
| Shell | `SiteFrame` full-bleed e header flutuante já implementados | Mesmo padrão das rotas internas |

`Jardim Contemporâneo` é conteúdo demonstrativo do print e não corresponde a um
registro atual de `images/portfolio/catalog.json`. Não criar, renomear ou
sobrepor um projeto real apenas para reproduzir a referência.

## Leitura de escopo

### Entra no escopo visual e de interação

- Template reutilizável para uma página individual de projeto.
- Shell global com skip link, cabeçalho flutuante, `main` e rodapé.
- Hero fotográfico com breadcrumb, título e divisor.
- Apresentação editorial que usa o `summary` existente e uma frase de destaque
  opcional.
- Galeria responsiva alimentada pelas imagens do catálogo.
- Lista de soluções aplicadas, quando cadastrada.
- Link inequívoco de retorno ao catálogo.
- Banner de contato com dois canais configurados.
- Estados de carregamento do framework, `not-found`, foco, toque, responsividade e
  falha de conteúdo necessários para uma implementação acessível.

### Fica fora deste mapa

- Implementação da rota ou qualquer alteração de código.
- Criação de conteúdo real a partir dos textos e imagens do mockup.
- Aprovação editorial, direitos autorais, autoria ou status de execução das obras.
- CMS, banco de dados, API, analytics, compartilhamento e persistência.
- Formulário, agendamento, rastreamento de WhatsApp ou envio de e-mail no site.
- Conteúdo e animação do menu expandido, já pertencentes ao menu global.
- Lightbox, zoom, download, carrossel ou navegação por gesto na galeria.
- Projetos anterior/próximo, recomendações e filtros dentro do detalhe, pois não
  aparecem no print.
- A faixa de tipo, categoria, local e ano exibida no print, removida do alvo por
  decisão explícita de produto.

## Mapa macro

A página alterna `hero fotográfico escuro → conteúdo editorial claro → CTA escuro
→ rodapé escuro`. A superfície clara concentra narrativa, galeria, soluções e
retorno ao catálogo; o banner cria a transição para o rodapé.

| Ordem | Região | Proporção vertical observada | Superfície | Composição no print |
| --- | --- | ---: | --- | --- |
| 1 | Hero + cabeçalho | ~20% | Fotografia com overlay verde quase preto | Header flutuante; conteúdo à esquerda e paisagem ao fundo |
| 2 | Apresentação | ~17% | Marfim | `summary` à esquerda; frase e ornamento à direita |
| 3 | Galeria | ~29% | Marfim | 1 imagem panorâmica + mosaico 1/2 com 3 imagens |
| 4 | Soluções + retorno | ~17% | Marfim | 3 cards em linha e faixa escura de navegação |
| 5 | Banner de contato | ~9% | Verde profundo | Mensagem à esquerda e 2 ações empilhadas à direita |
| 6 | Rodapé | ~8% | Verde profundo | Marca, navegação, contato e barra legal |

As proporções servem somente como ritmo relativo. Altura e quantidade de linhas
devem ser determinadas pelo conteúdo, nunca por valores fixos derivados do PNG.

## Árvore de composição proposta

```text
ProjectDetailPage
└── SiteFrame (reuso; fullBleed)
    ├── SiteHeader (reuso; floating, sem CTA)
    │   ├── BrandLockup
    │   └── MobileNavigation
    ├── ProjectDetailHero
    │   ├── ProjectHeroMedia
    │   ├── Breadcrumb
    │   ├── DisplayHeading
    │   └── BotanicalDivider
    ├── ProjectDetailSurface
    │   └── ProjectDetailInner
    │       ├── ProjectOverview
    │       │   ├── SectionHeading
    │       │   ├── SupportingCopy (project.summary)
    │       │   ├── ProjectStatement (opcional)
    │       │   └── BotanicalDecoration
    │       ├── ProjectGallery
    │       │   └── ProjectGalleryImage × n
    │       ├── AppliedSolutions
    │       │   ├── SectionHeading
    │       │   └── SolutionCard × n
    │       └── ProjectsReturnLink
    ├── ContactBanner (reuso; variante com 2 botões)
    └── SiteFooter (reuso)
```

## Contrato visual da tela

- Faça o hero ocupar toda a largura e use a imagem em `cover`. O recorte deve
  preservar o foco paisagístico e arquitetônico, sem depender de uma mídia
  específica para sustentar o layout.
- Aplique overlay escuro mais denso à esquerda e na base. Breadcrumb e título
  precisam manter contraste mesmo quando a fotografia mudar.
- Posicione o cabeçalho sobre o hero com o mesmo tratamento flutuante usado nas
  demais rotas internas: inset, fundo escuro translúcido, contorno oliva, raio e
  sombra discretos.
- Limite o título a uma coluna curta. Use tipografia serifada e oliva como acento
  editorial controlado.
- Use marfim, não branco puro, em toda a superfície de conteúdo. Cards recebem
  uma diferença tonal sutil, sem elevação forte.
- Alinhe apresentação, galeria, soluções e retorno ao mesmo eixo central e ao
  limite `--width-content`.
- Na apresentação, o `summary` do catálogo ocupa a área dominante à esquerda. A
  frase curta em caixa alta e o ornamento botânico equilibram o espaço à direita
  e são opcionais por conteúdo.
- A galeria usa raios médios e gutters estreitos. A primeira imagem é panorâmica;
  abaixo, uma imagem alta ocupa a coluna esquerda e duas imagens baixas se empilham
  à direita.
- Os cards de solução são informativos, com ícone linear oliva, título semibold e
  descrição curta. Não sugerir clique por sombra, cursor ou hover.
- `Ver outros projetos` é uma faixa escura de largura total do conteúdo, com ícone
  de grade, rótulo e seta. Todo o bloco pode ser um único link.
- O banner de contato é full-bleed, sem canto arredondado na transição com a página.
  As duas ações têm peso equivalente de descoberta, com WhatsApp preenchido e
  e-mail em contorno.
- Ornamentos botânicos permanecem em baixa opacidade, atrás do conteúdo, sem
  interferir em leitura, clique ou foco.

## Mapeamento por região

| ID | Região | Papel | Reuso atual | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| R01 | Shell | Estruturar skip link, header, `main` e footer | `SiteFrame` | Variante `fullBleed` já existe | Reusar sem criar shell específico do detalhe |
| R02 | Cabeçalho flutuante | Marca e acesso à navegação global | `SiteHeader`, `BrandLockup`, `MobileNavigation` | `floating` e `showContact={false}` já usados em `/projetos` | Reusar a mesma configuração e o mesmo contrato do menu |
| R03 | Hero de projeto | Identificar o projeto e criar contexto emocional | `DisplayHeading` | Não existe como seção; `ProjectsHero` é da listagem | Criar `ProjectDetailHero` local à rota dinâmica; não adicionar modos incompatíveis a `ProjectsHero` |
| R04 | Breadcrumb | Relacionar Início, Projetos e item atual | Padrão semântico já documentado em `/sobre` | Não há primitive compartilhada | Criar uma primitive compartilhada somente se o padrão realmente for usado por duas rotas; usar `nav` + lista ordenada |
| R05 | Mídia do hero | Sustentar o título e antecipar a atmosfera | `PortfolioImage`, `next/image` | Catálogo tem `cover` e `images`, mas não `hero` explícito | Permitir `hero` editorial opcional e fallback documentado para `cover`; manter alt vazio se a mídia for redundante |
| R06 | Apresentação | Explicar conceito, relação com o espaço e intenção | `SectionHeading`, `SupportingCopy` | `summary` já existe em todos os projetos | Consumir `project.summary` diretamente; não criar um segundo campo de descrição longa |
| R07 | Frase de destaque | Reforçar mensagem editorial curta | `BotanicalDecoration` e fragmentos tipados | Não existe dado equivalente | Modelar como campo opcional; omitir o bloco e reequilibrar a grade quando ausente |
| R08 | Galeria editorial | Mostrar conjunto visual da obra | `PortfolioImage[]`, `next/image` | Todas as mídias já são validadas e dimensionadas | Criar `ProjectGallery` local com layout por posição; não alterar a ordem editorial dos arquivos |
| R09 | Imagem da galeria | Exibir mídia informativa com recorte estável | Tratamento de imagem de `ProjectCard` | Não há primitive de mídia pública | Criar slot local com `width`, `height`, `sizes`, alt e `object-position`; só promover após segundo consumidor compatível |
| R10 | Soluções aplicadas | Explicar decisões de projeto | `CardSurface`, `LineIcon` | Não modeladas no catálogo | Criar `AppliedSolutions` e `SolutionCard` locais, alimentados por uma lista tipada opcional |
| R11 | Retorno ao catálogo | Voltar à exploração do portfólio | `ButtonLink` ou `SectionAction`, `LineIcon` | Não há variante de faixa escura | Preferir `ButtonLink` com variante semântica nova apenas se os tokens existentes não cobrirem a faixa; destino `/projetos` |
| R12 | Banner de contato | Converter após a leitura do case | `ContactBanner`, `ContactButton` | Suporta mensagem, descrição, CTA e ação secundária textual | Evoluir a ação secundária para apresentação opcional em botão com ícone de e-mail; preservar o padrão atual |
| R13 | Rodapé | Navegação global, marca, contatos e legal | `SiteFooter` e subcomponentes | Já corresponde à estrutura observada | Reusar `siteContent.internalFooter` com `currentPath="/projetos"` |
| R14 | Estado inexistente | Responder a slug desconhecido ou projeto não publicável | Recursos do App Router | Não existe rota dinâmica | Usar `notFound()` e uma página 404 coerente; não renderizar projeto indisponível |

## Conteúdo observado no print

Este conteúdo registra a referência, mas não deve ser publicado como dado real.

### Hero

| Região | Conteúdo visível |
| --- | --- |
| Breadcrumb | `Início / Projetos` |
| Título | `Jardim Contemporâneo`, com `Contemporâneo` em oliva |

O texto de apoio visível no hero não possui hoje um campo independente no
catálogo. Para evitar duplicar `summary`, o alvo deste mapa mantém somente o título
no hero e usa `summary` na seção `Sobre o projeto`.

O breadcrumb do print não exibe o título atual. Para orientação completa, a
estrutura recomendada é `Início / Projetos / {Título}`, podendo ocultar apenas o
item atual visualmente em largura estreita. Se a decisão for reproduzir literalmente
os dois níveis, nenhum deles recebe `aria-current="page"`, pois ambos levam a
páginas ancestrais; o `h1` continua identificando a página atual.

### Apresentação e frase editorial

| Região | Conteúdo visível |
| --- | --- |
| Título | `Sobre o projeto`, com `projeto` em oliva |
| Corpo | `Um jardim contemporâneo que valoriza a conexão entre o design arquitetônico, a vegetação e o bem-estar, com espaços fluidos, iluminação acolhedora e espécies tropicais que trazem vida e personalidade ao ambiente.` |
| Frase | `NATUREZA QUE FAZ PARTE DA SUA HISTÓRIA.` |

Na implementação, o corpo observado acima é substituído por `project.summary`, já
presente no catálogo. Não criar `description`, `longDescription` ou cópia paralela
para esta seção.

### Soluções aplicadas

| Ordem | Título | Descrição visível | Ícone sugerido |
| ---: | --- | --- | --- |
| 1 | `Integração com a arquitetura` | `Paisagismo em harmonia com o projeto, criando transição natural entre os espaços.` | `leaf` |
| 2 | `Iluminação paisagística` | `Valoriza a vegetação e cria atmosferas únicas ao entardecer.` | novo `lightbulb` ou desenho aprovado |
| 3 | `Vegetação tropical` | `Espécies selecionadas para beleza, sombra e bem-estar o ano todo.` | `sprout` |

### Navegação, conversão e rodapé

| Região | Conteúdo visível |
| --- | --- |
| Retorno | `Ver outros projetos` |
| Banner | `Vamos transformar seu espaço juntos?` |
| Apoio | `Fale com a nossa equipe e descubra como o paisagismo pode transformar a sua vida.` |
| CTA principal | `Fale no WhatsApp` |
| CTA secundário | `Envie um e-mail` |
| Descrição da marca | `Projetos de paisagismo que conectam natureza, bem-estar e estilo de vida.` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| Contatos | `(21) 98765-4321`, `contato@sobreiro.com.br`, `Rio de Janeiro, RJ` |
| Copyright | `© 2024 Sobreiro Paisagismo. Todos os direitos reservados.` |
| Crédito | `Desenvolvido com ♡ para conectar pessoas à natureza.` |

Telefone, e-mail, localização, ano legal e links são dados do mockup até
confirmação. A implementação deve consumir os valores globais já centralizados em
`app/_content/siteContent.ts`, não copiar estes textos.

## Inventário de reuso do Design System

### Reusar sem mudança de responsabilidade

| Componente / contrato | Uso no detalhe |
| --- | --- |
| `SiteFrame` | Shell full-bleed e skip link |
| `SiteHeader` | Cabeçalho flutuante sem CTA duplicado |
| `BrandLockup`, `MobileNavigation` | Marca e menu global |
| `DisplayHeading` | Único `h1` do hero |
| `SectionHeading` | `Sobre o projeto` e `Soluções aplicadas` |
| `SupportingCopy` | `summary` do projeto e apoio do banner |
| `CardSurface` | Soluções informativas |
| `LineIcon` | Soluções, setas, contato e rodapé |
| `BotanicalDecoration` | Ornamentos semânticos ocultos |
| `ContactButton` | Ação principal de WhatsApp quando configurada |
| `SiteFooter` | Rodapé global alimentado por `siteContent` |
| `PortfolioProject`, `PortfolioImage` | Identidade, capa, `summary` e galeria |

### Evoluir por API pequena

| Componente / contrato | Extensão recomendada | Restrição |
| --- | --- | --- |
| `LineIcon` | Adicionar `lightbulb` e `grid` se os desenhos do print forem aprovados | Manter `currentColor`, viewBox, traço e contrato acessível |
| `ContactBanner` | Permitir ação secundária `button` com ícone `mail` | O default textual atual não muda; não transformar o componente em lista genérica de contatos |
| Catálogo de portfólio | Adicionar apenas frase, hero e soluções opcionais | Não duplicar `id`, título, `summary`, capa ou imagens |
| `toProjectCardData` | Gerar `href` para detalhes publicáveis | Não criar links para registros sem conteúdo suficiente ou não aprovados |

### Manter local à rota `/projetos/[slug]`

- `ProjectDetailHero` e `ProjectHeroMedia`.
- `ProjectOverview` e `ProjectStatement`.
- `ProjectGallery` e seu slot de imagem.
- `AppliedSolutions` e `SolutionCard`.
- `ProjectsReturnLink`.
- Funções de obtenção de slug, metadados e paths estáticos, caso não sejam
  reutilizadas fora da rota.

Não reutilize `app/projetos/_components/ProjectsHero.tsx` ou
`ProjectsCatalog.tsx`: ambos modelam a listagem, não o detalhe. Compartilhe tipos,
conteúdo global e primitivas, sem acoplar uma rota à composição da outra.

## Modelo de dados recomendado

O catálogo atual já é a fonte única de títulos, `summary` e imagens. Estenda o
registro somente para o conteúdo que ainda não existe.

```ts
interface ProjectSolution {
  readonly id: string;
  readonly icon: LineIconName;
  readonly title: string;
  readonly description: string;
}

interface PortfolioProjectDetails {
  readonly statement?: string;
  readonly heroFile?: string;
  readonly solutions?: readonly ProjectSolution[];
}

interface PortfolioProject {
  // Campos atuais relevantes para o detalhe.
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly status: string;
  readonly cover: PortfolioImage;
  readonly images: readonly PortfolioImage[];
  readonly details?: PortfolioProjectDetails;
}
```

- Use `id` como slug estável enquanto o produto não definir outro campo.
- `heroFile`, quando presente, deve referenciar um arquivo já incluído em `images`;
  isso evita mídia duplicada e mantém a validação centralizada.
- `summary` é o corpo de `Sobre o projeto`. Não criar outro campo para o mesmo
  conteúdo nem repeti-lo no hero.
- `status` é controle editorial interno. Não exponha observações como “confirmar
  autoria” na interface pública; use-as para decidir se a página é publicável.
- `details` é opcional porque frase, hero específico e soluções também são
  opcionais. A ausência desse objeto não impede a página quando título, `summary`,
  capa e imagens já estiverem aprovados.

## Contrato da galeria

O print prova uma galeria estática com quatro imagens, mas o catálogo atual possui
entre quatro e quinze imagens por projeto.

1. Preserve a ordem declarada em `images`; ela é a ordem editorial.
2. Use a primeira imagem da galeria como panorama largo, exceto quando ela já foi
   consumida como hero e houver decisão editorial explícita para evitar repetição.
3. Para as quatro primeiras posições, reproduza a composição observada:
   `panorama → alta à esquerda + duas baixas à direita`.
4. Para imagens adicionais, a direção recomendada — não comprovada pelo print — é
   continuar em uma grade simples de duas colunas, sem esconder ativos.
5. Em mobile estreito, empilhe todas as imagens na ordem do DOM. Não preserve o
   mosaico por meio de recortes excessivos ou alturas ilegíveis.
6. Use dimensões intrínsecas, `sizes`, `aspect-ratio` e ponto de recorte por mídia.
   Evite `fill` sem contêiner reservado.
7. Imagens são informativas e usam os textos alternativos já existentes. Não
   repita no alt “imagem de” nem o título quando ele não descrever a cena.
8. Não faça as imagens focáveis: não há evidência de zoom ou lightbox.

## Estados e interações

| Elemento | Estado observado | Estados necessários | Regra de comportamento |
| --- | --- | --- | --- |
| Breadcrumb | `Início / Projetos` | repouso, hover quando disponível, focus-visible, active, atual | `Início` leva a `/`; `Projetos` leva a `/projetos`; o item atual não é link |
| Menu | Fechado | contrato global de fechado, aberto, foco e redução de movimento | Reusar `MobileNavigation`; o detalhe não cria um segundo menu |
| Hero | Conteúdo disponível | carregado e fallback visual de mídia | Texto permanece legível se a imagem falhar ou estiver lenta |
| Galeria | 4 imagens estáticas | 1..n imagens válidas | Ordem estável; sem controles ou foco se não houver lightbox aprovado |
| Soluções | 3 cards informativos | ausente ou 1..n itens | Omitir a seção inteira quando não houver soluções; cards não recebem `tabIndex` |
| Retorno | Link ativo | hover, focus-visible, active | Link único para `/projetos`; seta e ícone são decorativos |
| WhatsApp | Botão preenchido | configurado ou fallback seguro | Consumir o contato global; não gerar `wa.me` com telefone de mockup |
| E-mail | Botão de contorno | configurado | Usar o `mailto:` global confirmado; ícone é decorativo |
| Slug | Projeto existente | desconhecido ou não publicável | Slug desconhecido usa 404; conteúdo não aprovado permanece sem link no catálogo |
| Rodapé | `Projetos` como seção corrente | repouso, hover, focus-visible, active, current | Usar `aria-current="page"` em `Projetos`, não criar item para cada slug |

## Contrato de movimento

- Não há evidência de animação no print.
- Hero, narrativa, galeria, soluções, banner e rodapé permanecem estáticos.
- Não introduzir parallax, revelação por scroll, zoom automático ou transição de
  layout da galeria.
- Hover e foco podem usar os tokens existentes de cor, borda e deslocamento
  discreto, sem provocar salto de layout.
- O comportamento do menu segue o contrato global e respeita
  `prefers-reduced-motion: reduce`.

## Contrato responsivo

O print comprova apenas uma composição visual ampla. As adaptações são direção por
falha de conteúdo, não reprodução de outros frames.

| Faixa lógica | Composição recomendada |
| --- | --- |
| Mobile estreito | Header mantém marca + menu; hero recebe overlay mais uniforme; apresentação vira 1 coluna; galeria empilha; soluções e CTAs empilham |
| Tablet / referência | Apresentação em 2 áreas; galeria editorial 1 + 3; soluções em 3 colunas; banner em 2 colunas |
| Desktop largo | Limitar o conteúdo por `--width-content`; preservar largura de leitura; ampliar gutters e respiro, não escalar indiscriminadamente imagens e texto |

- Defina breakpoints pela falha do conteúdo, especialmente na galeria, nas
  soluções e no banner.
- A ordem DOM é sempre hero → apresentação → galeria → soluções → retorno
  → contato, independentemente do grid visual.
- Preserve o título sem sobrepor o header e limite a largura de leitura do
  `summary`, inclusive em zoom de 200%.
- Use `min-height` apenas no hero; nenhuma outra seção recebe altura fixa.
- Textos maiores, traduções futuras e parágrafos extras expandem os cards e seções
  sem corte, elipse ou sobreposição.

## Acessibilidade e semântica

- Mantenha um único `h1` com o nome do projeto. `Sobre o projeto`, `Soluções
  aplicadas` e contato usam `h2`; títulos de solução usam `h3`.
- Use `<nav aria-label="Breadcrumb">` com lista ordenada. O item atual recebe
  `aria-current="page"` e não precisa ser link.
- Modele soluções como lista semântica.
- O hero pode usar alt vazio se a mesma imagem aparecer na galeria e for puramente
  atmosférica. Imagens da galeria são informativas e precisam de alt específico.
- Ícones que repetem rótulos são decorativos. Nenhum card informativo recebe foco,
  papel de botão ou cursor de ação.
- Relacione apresentação, galeria, soluções e banner aos seus títulos com
  `aria-labelledby`. Se a galeria não tiver heading visual, forneça nome acessível
  curto sem introduzir um título falso no layout.
- O link `Ver outros projetos` e os CTAs mantêm foco visível, nome acessível e alvo
  mínimo de 44 × 44 px.
- Valide contraste do oliva em texto pequeno, ícones e divisores sobre marfim e
  verde profundo segundo WCAG 2.2 AA.
- Ornamentos usam `aria-hidden="true"`, `focusable="false"` e
  `pointer-events: none`.
- Não use anúncio `aria-live` para imagens estáticas ou carregamento normal do
  servidor. O status HTTP e o heading da página de erro cobrem o `not-found`.

## SEO, metadados e geração da rota

- Gere `title` e `description` a partir de título e resumo reais do catálogo.
- Use o ID/slug do projeto para paths estáveis. Uma alteração de slug publicada
  exige redirecionamento, não apenas renomear o campo.
- `generateStaticParams` pode derivar somente projetos editorialmente aprovados;
  conteúdo ainda em validação continua sem rota pública. `details` não é requisito,
  pois todos os seus campos são opcionais.
- `generateMetadata` deve tratar slug inexistente sem afirmar conteúdo que não foi
  carregado.
- Open Graph precisa de imagem com direitos confirmados e proporção adequada; não
  inferir que a capa atual já está aprovada para compartilhamento.
- Se forem adicionados dados estruturados, validar o tipo Schema.org apropriado e
  fatos reais. O print não autoriza marcação de obra concluída, autor, cliente ou
  endereço.

## Lacunas antes da implementação final

1. Quais projetos do catálogo estão aprovados para receber página individual.
2. Conteúdo real da frase editorial e das soluções, caso essas regiões sejam
   mantidas para todos os projetos.
3. Política editorial para o campo interno `status` e critério de publicação.
4. Imagem específica do hero ou regra aprovada de fallback para `cover`.
5. Regra para galerias com mais de quatro imagens e confirmação de que nenhuma
   mídia deve ser omitida.
6. Decisão sobre repetir ou não a mídia do hero na galeria.
7. Direitos, autoria, alt e pontos de recorte de todas as fotografias.
8. Estrutura final do breadcrumb: dois níveis visuais como no print ou três níveis
   incluindo o projeto atual.
9. Destinos reais de WhatsApp e e-mail e política de abertura de links externos.
10. Texto final do banner e validação dos dados globais exibidos no rodapé.
11. Ícones oficiais para iluminação, grade e soluções.
12. Necessidade futura de lightbox ou projeto anterior/próximo; ambos ficam fora
    da primeira implementação até existir especificação própria.

## Direção sugerida de implementação

1. Estender `images/portfolio/catalog.json` e o parser de
   `app/_content/portfolioCatalog.ts` com `details` opcional e validação estrita.
2. Definir claramente quais registros são publicáveis e gerar `href` apenas para
   esses cards; preservar `Detalhes em breve` nos demais.
3. Criar `app/projetos/[slug]/page.tsx` como Server Component, com
   `generateStaticParams`, `generateMetadata` e `notFound()`.
4. Criar componentes exclusivos em `app/projetos/[slug]/_components/`, sem
   importar composições da listagem ou da Home.
5. Reusar `SiteFrame`, `SiteHeader`, `SiteFooter`, tipografia, superfícies, ícones
   e dados globais. Evoluir apenas `ContactBanner` e `LineIcon` pelas APIs pequenas
   descritas neste mapa.
6. Implementar primeiro hero e narrativa; depois galeria, soluções, retorno
   e contato. A página permanece no servidor se a galeria continuar estática.
7. Adicionar testes para slug válido, `not-found`, metadados, uso de `summary`,
   ordem/alt da galeria, seção de soluções ausente, link de retorno, cards
   publicáveis e preservação do rodapé corrente.
8. Validar TypeScript, Jest, ESLint CLI e build; inspecionar visualmente em 320,
   640, 863 e 1440 px, além de teclado, zoom, contraste e movimento reduzido.

## Referências técnicas prováveis

| Arquivo | Uso esperado |
| --- | --- |
| `images/portfolio/catalog.json` | Fonte única; `summary` alimenta a apresentação e apenas frase, hero e soluções podem exigir extensão opcional |
| `app/_content/portfolioCatalog.ts` | Validação, tipos, resolução de mídia e consulta por slug |
| `app/_components/ProjectCard.tsx` | Receber os destinos das páginas publicáveis |
| `app/projetos/page.tsx` | Catálogo e retorno do detalhe |
| `app/projetos/_components/ProjectsCatalog.tsx` | Consumidor dos cards com ou sem link |
| `app/projetos/[slug]/page.tsx` | Composição futura da rota dinâmica |
| `app/projetos/[slug]/_components/` | Hero, narrativa, galeria, soluções e retorno locais |
| `app/_components/SiteFrame.tsx` | Shell full-bleed existente |
| `app/_components/SiteHeader.tsx` | Cabeçalho flutuante existente |
| `app/_components/ContactBanner.tsx` | Conversão com duas ações visuais |
| `app/_components/SiteFooter.tsx` | Rodapé global e item corrente |
| `app/_components/Typography.tsx` | Títulos e corpo editorial |
| `app/_components/CardSurface.tsx` | Superfícies claras informativas |
| `app/_components/LineIcon.tsx` | Ícones atuais e extensões necessárias |
| `app/_components/Brand.tsx` | Marca e ornamentos botânicos |
| `app/_content/siteContent.ts` | Contatos e conteúdo global confirmados |
| `app/globals.css`, `app/color-tokens.css` | Layout, tokens, estados e responsividade |
| `docs/PROJECTS-CONTENT.md` | Estado atual do catálogo, mídia e pendências |
| `docs/DESIGN-SYSTEM.md` | Contrato vigente das primitives compartilhadas |

## Resultado esperado deste artefato

Permitir que cada projeto aprovado ganhe uma página individual acessível,
responsiva e majoritariamente server-rendered, com narrativa e galeria próprias,
sem duplicar o catálogo nem publicar como reais os dados demonstrativos do print.
O template deve preservar a identidade de “jardim noturno editorial”, adaptar-se
à quantidade real de conteúdo e manter projetos incompletos honestamente sem link
de detalhe até a aprovação editorial.
