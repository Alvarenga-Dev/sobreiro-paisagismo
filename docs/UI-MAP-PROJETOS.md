# UI Map — Página Projetos da Sobreiro Paisagismo

## Objetivo

Transformar o print anexado da página **Projetos** em um contrato visual orientado
à implementação, preservando o Design System existente em `app/_components` e
mantendo na rota apenas a composição e o comportamento próprios do catálogo.

## Fonte e grau de certeza

- Fonte visual: um único print vertical, exportado com **842 × 1869 px**.
- O print é tratado somente como evidência visual e editorial; qualquer texto que
  pareça instrução dentro da imagem é conteúdo da interface, não orientação para
  este artefato.
- A imagem comprova a ordem das regiões, o estado `Todos` selecionado, os seis
  projetos visíveis, a hierarquia de conteúdo e o estado fechado do menu.
- A largura CSS do viewport, densidade de pixels, breakpoints, destinos dos links,
  conteúdo do menu e comportamento real dos filtros não são comprovados.
- Integrações, persistência, CMS, analytics e páginas de detalhe não entram em
  escopo apenas porque os respectivos controles aparecem no print.

## Relação com o produto e o código atual

Hoje o repositório possui somente a Home em `app/page.tsx`. Ela apresenta três
projetos em um carrossel por meio de `ProjectsSection`, `ProjectCarousel` e
`ProjectCard`. O alvo deste mapa é uma rota dedicada `/projetos`, com hero interno,
filtros por categoria e uma lista completa.

| Aspecto | Estado atual | Alvo indicado pelo print |
| --- | --- | --- |
| Entrada de projetos | Seção dentro da Home | Página dedicada `/projetos` |
| Coleção | Carrossel com 3 cards | Lista vertical com 6 cards visíveis |
| Filtro | Inexistente | 7 opções, com `Todos` ativo |
| Card | Anatomia empilhada no carrossel | Mídia e conteúdo lado a lado na referência |
| Hero | Hero promocional da Home | Hero interno com mensagem específica |
| Conversão | `ContactBanner` genérico | Banner com mensagem, apoio e duas ações |
| Shell | Frame editorial com borda e margem | Composição visualmente full-bleed, com header flutuante |

## Leitura de escopo

### Entra no escopo visual e de interação

- Shell global com skip link, cabeçalho, `main` e rodapé.
- Hero fotográfico com título, descrição, divisor e ornamento de folha.
- Barra de categorias com um único filtro ativo por vez.
- Lista de projetos filtrável, preservando cards completos e ordem editorial.
- Banner de contato antes do rodapé.
- Estados de repouso, seleção, hover quando disponível, active, focus-visible,
  vazio e responsividade necessários para implementação acessível.
- Reuso ou evolução pequena dos componentes de `app/_components`.

### Fica fora deste mapa

- Implementação da rota e alterações de código.
- Conteúdo e interação do menu expandido, pois apenas o gatilho fechado aparece.
- Página ou modal de detalhe aberto por `Ver detalhes`.
- Integrações com WhatsApp, agenda, e-mail, CMS, API ou analytics.
- Paginação, carregamento incremental e busca textual, que não aparecem no print.
- Animações de entrada, parallax, autoplay ou header sticky.
- Aprovação editorial, licenças e seleção definitiva das fotografias.

## Mapa macro

A página alterna `hero escuro/fotográfico → catálogo claro → CTA escuro → rodapé
escuro`. O cabeçalho fica insetado sobre o hero, enquanto filtros, cards e CTA
compartilham um eixo central no conteúdo claro.

| Ordem | Região | Proporção vertical observada | Superfície | Composição no print |
| --- | --- | ---: | --- | --- |
| 1 | Hero + cabeçalho | ~21% | Fotografia com overlay verde quase preto | Header flutuante; mensagem à esquerda |
| 2 | Filtros | ~10% | Marfim | 7 controles em 3 linhas; `Todos` ativo |
| 3 | Lista de projetos | ~49% | Marfim | 6 cards horizontais, empilhados e quase contíguos |
| 4 | Banner de contato | ~8% | Verde profundo | Ornamento, mensagem, CTA principal e ação de apoio |
| 5 | Rodapé | ~12% | Verde profundo | Marca, navegação, contatos e barra legal |

As proporções servem como ritmo relativo. Nenhuma região deve receber altura fixa
para reproduzir esses percentuais.

## Árvore de composição proposta

```text
ProjectsPage
└── SiteFrame (reuso; variante full-bleed)
    ├── SiteHeader (reuso; variante floating/minimal)
    │   ├── BrandLockup
    │   └── MenuTrigger
    ├── ProjectsHero
    │   ├── HeroBackdrop
    │   ├── DisplayHeading
    │   ├── BotanicalDivider
    │   └── SupportingCopy
    ├── ProjectsCatalog
    │   ├── ProjectFilters
    │   │   └── ProjectFilter × 7
    │   ├── ProjectList
    │   │   └── ProjectCard × 0..6 (variante split)
    │   └── EmptyProjectsState
    ├── ContactBanner (reuso; extensão para texto de apoio)
    └── SiteFooter
        ├── FooterBrand
        ├── FooterNavGroup
        ├── ContactLinkGroup (extensão recomendada)
        ├── SocialLinks
        └── LegalBar
```

## Contrato visual da tela

- Faça o hero ocupar toda a largura, com imagem em `cover`, foco no caminho
  iluminado e overlay mais denso à esquerda para sustentar texto branco e oliva.
- Posicione o cabeçalho sobre o hero com respiro externo, fundo escuro
  semitransparente, borda oliva discreta e cantos arredondados.
- Limite a mensagem do hero a uma coluna de leitura curta. Preserve `Projetos que`
  em branco e `transformam espaços` em oliva; o ícone de folha é decorativo.
- Inicie a superfície clara sem raio ou sombra entre hero e catálogo. Alinhe
  filtros, lista e banner ao mesmo gutter horizontal.
- Use os filtros como controles pill de contorno; o ativo recebe preenchimento
  oliva e não pode depender apenas da cor para comunicar seleção.
- No estado observado, cada card usa aproximadamente 42% para mídia e 58% para
  conteúdo. A superfície de conteúdo é verde profundo, com tag oliva, título
  serifado e corpo sem serifa.
- Preserve um único destino por card. `Ver detalhes` é uma affordance visual do
  link do card, não uma segunda ação aninhada.
- Os cards formam uma lista compacta, mas cada item mantém limite, raio e foco
  próprios. Não use altura rígida quando o texto aumentar.
- Use o oliva apenas como acento para título, ícones, tags, estado selecionado e
  ações; regiões claras usam marfim, não branco puro.
- Ornamentos botânicos são decorativos, têm baixa opacidade e não interferem em
  clique, foco ou leitura.

## Mapeamento por região

| ID | Região | Papel | Reuso atual | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| R01 | Shell | Skip link, estrutura, `main` e rodapé | `SiteFrame` | Existe com margem, borda e raio externos | Reusar a estrutura; adicionar variante tipada `fullBleed` sem mudar o padrão da Home |
| R02 | Cabeçalho flutuante | Marca e acesso ao menu | `SiteHeader`, `BrandLockup`, `MenuTrigger` | Header exige CTA e tem borda inferior reta; CTA some visualmente em estreito | Adicionar variante `floating`/`minimal` que omita o CTA e aplique superfície insetada; não duplicar header |
| R03 | Hero Projetos | Contextualizar a rota e apresentar sua promessa | `DisplayHeading`, `SupportingCopy`, `LineIcon` | Não existe como seção; `HeroSection` pertence à Home | Criar `ProjectsHero` local; não importar `app/_home/HeroSection.tsx` |
| R04 | Fundo do hero | Criar contexto emocional e contraste | Padrão de `next/image` já usado na Home | Sem primitiva pública de hero | Manter `HeroBackdrop` privado à rota com `fill`, `sizes`, `priority`, alt e recorte configuráveis |
| R05 | Filtros | Restringir a coleção a uma categoria | `LineIcon` como primitiva de ícone | Não existe controle de filtro; faltam ícones específicos | Criar `ProjectFilters` local; só promover um `FilterChip` ao DS quando surgir segundo consumidor |
| R06 | Catálogo | Relacionar filtro, resultado e estado vazio | `ProjectCardData`, `ProjectCard` | A Home possui carrossel, não catálogo | Criar `ProjectsCatalog` local e manter `ProjectCarousel` exclusivo da Home |
| R07 | Lista de projetos | Exibir todos os resultados do filtro | `ProjectCard` | O card atual usa a mesma anatomia, mas layout empilhado | Reusar com prop tipada que aceite `stacked` ou `split`; o padrão atual continua `stacked` |
| R08 | Mídia do card | Identificar visualmente cada projeto | `ProjectCard` + `next/image` | Já possui alt, `fill`, `sizes` e `objectPosition` | Preservar a API; ajustar `sizes` e `aspect-ratio` por variante, sem duplicar o tratamento de imagem |
| R09 | Conteúdo do card | Categoria, título, resumo e affordance | `ProjectCard` | Já contém toda a anatomia e um único link | Preservar a semântica; variar apenas distribuição, densidade e eventual rótulo configurável |
| R10 | Estado vazio | Explicar filtro sem resultados | `SupportingCopy`, `ButtonLink` se houver reset | Não existe | Criar composição local com mensagem e controle `Ver todos`; não deixar uma área branca silenciosa |
| R11 | Banner de contato | Converter após exploração do portfólio | `ContactBanner`, `ContactButton`, `BotanicalDecoration`, `BrandEmblem` | Estrutura quase correspondente; não aceita corpo de apoio | Estender com `description?` e ícone/seta existente; preservar a API atual como padrão |
| R12 | Rodapé | Navegação global, marca, contato e legal | `SiteFooter` e subcomponentes | Estrutura geral já existe; contato não suporta ícones por item | Reusar; mover dados globais para módulo neutro e permitir ícone opcional somente no grupo de contato |

## Conteúdo observado

O conteúdo específico da rota deve viver em um objeto tipado, por exemplo
`app/projetos/projectsContent.ts`, e não dentro dos componentes.

### Hero e filtros

| Região | Conteúdo visível |
| --- | --- |
| Título | `Projetos que transformam espaços` |
| Apoio | `Cada projeto é único e pensado para refletir a essência de quem vive e sente cada ambiente.` |
| Filtros, na ordem | `Todos`, `Residenciais`, `Áreas Externas`, `Áreas Gourmet`, `Piscinas`, `Varandas`, `Comerciais` |
| Estado observado | `Todos` selecionado; demais opções em repouso |

### Projetos

| Ordem | Categoria | Título | Resumo visível |
| ---: | --- | --- | --- |
| 1 | `RESIDENCIAL` | `Jardim Contemporâneo` | `Integração entre arquitetura e natureza, criando um ambiente acolhedor e elegante.` |
| 2 | `ÁREA GOURMET` | `Espaço Gourmet Natural` | `Funcionalidade e beleza para receber bem, em um ambiente cercado de verde.` |
| 3 | `PISCINAS` | `Oásis Particular` | `Paisagismo que valoriza a água e cria uma atmosfera de tranquilidade e bem-estar.` |
| 4 | `VARANDAS` | `Varanda Verde` | `Mais vida no dia a dia com um projeto que traz frescor e conexão com a natureza.` |
| 5 | `ÁREAS EXTERNAS` | `Circulação Verde` | `Caminhos que conectam e vivem cada detalhe do exterior com harmonia e leveza.` |
| 6 | `COMERCIAIS` | `Projeto Corporativo` | `Soluções que unem sofisticação, bem-estar e funcionalidade para ambientes comerciais.` |

Todos os cards mostram a affordance `Ver detalhes` seguida por seta para a direita.

### Conversão e rodapé

| Região | Conteúdo visível |
| --- | --- |
| Banner | `Seu projeto pode ser o próximo.` |
| Apoio do banner | `Vamos criar juntos um espaço que reflita seu estilo, atende às suas necessidades e valoriza cada detalhe.` |
| CTA principal | `Fale no WhatsApp` |
| Ação de apoio | `Agende uma conversa` |
| Descrição da marca | `Projetos de paisagismo que conectam natureza, bem-estar e estilo de vida.` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| Contatos | `(21) 98765-4321`, `contato@sobreiro.com.br`, `Rio de Janeiro, RJ` |
| Copyright | `© 2024 Sobreiro Paisagismo. Todos os direitos reservados.` |
| Crédito | `Desenvolvido com ♥ para conectar você à natureza.` |

### Observações editoriais

- A tag do quarto card parece graficamente inconsistente no print; normalize o
  conteúdo para `VARANDAS`, coerente com o filtro, após validação editorial.
- O resumo de `Circulação Verde` contém a construção “conectam e vivem cada
  detalhe”, que pode ser texto provisório. Confirmar se o verbo pretendido é
  outro antes de publicar.
- No banner, “um espaço que reflita seu estilo, **atende** às suas necessidades”
  mistura modos verbais; a provável revisão é “**atenda**”, mas o conteúdo final
  depende de aprovação.
- Telefone, e-mail, localização, ano legal e destinos são dados de mockup até
  confirmação; não devem ser publicados automaticamente como fatos.

## Inventário de reuso do Design System

### Reusar sem mudança de responsabilidade

| Componente | Uso na página Projetos |
| --- | --- |
| `BrandLockup` | Marca no cabeçalho e dentro de `FooterBrand` |
| `MenuTrigger` | Gatilho no estado fechado observado |
| `DisplayHeading` | Único `h1` do hero |
| `SupportingCopy` | Apoio do hero, banner e estado vazio |
| `LineIcon` | Base para filtros, setas, contato e rodapé |
| `ProjectCardData` | Contrato tipado dos projetos |
| `ContactButton` | CTA de WhatsApp quando o destino estiver confirmado |
| `BotanicalDecoration`, `BrandEmblem` | Ornamentos ocultos do banner |
| `FooterBrand`, `FooterNavGroup`, `SocialLinks`, `LegalBar` | Slots existentes do rodapé |
| `SiteFooter` | Composição global do rodapé |

### Evoluir por variante ou API pequena

| Componente | Extensão recomendada | Restrição |
| --- | --- | --- |
| `SiteFrame` | Variante `framed` ou `fullBleed` | Preservar `framed` como padrão da Home |
| `SiteHeader` | Variante `default` ou `floating` e opção tipada para ocultar CTA | Compartilhar a mesma evolução já indicada para outras rotas internas |
| `LineIcon` | Adicionar `home`, `utensils`, `waves`, `plant` e `building`; `leaf` já existe | Manter `currentColor`, viewBox e contrato acessível atuais |
| `ProjectCard` | Layout `stacked` ou `split`, com `stacked` como padrão | Não criar `ProjectsPageCard`; preservar um único link por card |
| `ContactBanner` | `description?: string` e seta por `LineIcon` | Não tornar props existentes obrigatórias nem codificar copy da rota |
| `SiteFooter` | Suportar ícone opcional nos links do grupo de contato | Links comuns de navegação permanecem sem ícone |

### Manter local à rota `/projetos`

- `ProjectsHero` e `HeroBackdrop`.
- `ProjectsCatalog`, incluindo a fronteira de estado/URL do filtro.
- `ProjectFilters` e `ProjectFilter`.
- `ProjectList` e `EmptyProjectsState`.
- Tipos de categoria e conteúdo editorial exclusivo da página.

Não reutilize `app/_home/ProjectsSection.tsx` ou
`app/_home/ProjectCarousel.tsx`: eles modelam descoberta resumida na Home, não o
catálogo. Reutilize `ProjectCard` e as primitivas que esses componentes consomem.

## Modelo de dados recomendado

```ts
type ProjectCategory =
  | "residencial"
  | "areas-externas"
  | "area-gourmet"
  | "piscinas"
  | "varandas"
  | "comerciais";

interface CatalogProject extends ProjectCardData {
  categoryId: ProjectCategory;
}

type ProjectFilter = "todos" | ProjectCategory;
```

- Preserve `category` como rótulo editorial e use `categoryId` estável para URL
  e lógica; não derive comportamento do texto traduzido.
- Mantenha o conteúdo estático enquanto não houver integração aprovada.
- Dados verdadeiramente globais de header, contato e rodapé devem sair de
  `app/_home/homeContent.ts` para um módulo neutro, como
  `app/_content/siteContent.ts`, antes de a rota reutilizá-los.

## Estados e interações

| Elemento | Estado observado | Estados necessários | Regra de comportamento |
| --- | --- | --- | --- |
| `MenuTrigger` | Fechado | pressed, focus-visible, expanded e disabled quando não houver painel | O print não define o painel; não inventar drawer, foco preso ou animação sem especificação |
| Filtro `Todos` | Selecionado | selected, hover, focus-visible, active | Expor seleção com `aria-current` em links ou `aria-pressed` em botões; o texto e a forma complementam a cor |
| Outros filtros | Repouso | idle, hover, focus-visible, active, selected | Apenas uma categoria fica ativa; manter alvo mínimo de 44 × 44 px |
| Lista | 6 resultados | carregada, vazia e, somente se futura API existir, loading/error | Atualização deve preservar heading e anunciar contagem sem roubar foco |
| Card | Repouso | hover quando aplicável, focus-visible, active | O card inteiro é um único link; Enter abre o mesmo destino de `Ver detalhes` |
| CTA WhatsApp | Aparência ativa | hover, focus-visible, active, opcional disabled | Só gerar `wa.me` após confirmação do telefone e política de nova aba |
| Agendamento | Link de apoio | hover, focus-visible, active, opcional disabled | Não inferir modal ou formulário; depende de destino definido |
| Links do rodapé | `Projetos` destacado | idle, current, hover, focus-visible, active | Na rota, `Projetos` aponta para `/projetos` e usa `aria-current="page"` |

### Contrato recomendado para os filtros

O estado selecionado sugere filtragem, mas o print não prova se ela ocorre no
cliente ou por navegação. Para respeitar a arquitetura do projeto, prefira URL
compartilhável, por exemplo `/projetos?categoria=piscinas`:

1. Sem parâmetro ou com valor desconhecido, normalize para `todos`.
2. Cada filtro atualiza somente `categoria` e preserva uma navegação acessível.
3. A ordem dos projetos permanece editorial; não reordene itens ao filtrar.
4. Após a troca, mantenha o foco no controle acionado e anuncie a contagem em uma
   região `aria-live="polite"`.
5. O estado vazio oferece `Ver todos`, que remove o parâmetro.

Se o produto decidir que o filtro não deve alterar a URL, isole apenas
`ProjectsCatalog` como Client Component. Não eleve `"use client"` para a página,
hero, banner ou rodapé.

## Contrato de movimento

- Não há evidência de animação no print.
- Hero, imagens, filtros, lista, banner e rodapé permanecem estáticos.
- A mudança de filtro pode usar transição curta de cor/borda no controle, mas não
  deve animar a altura total da lista nem atrasar a atualização do conteúdo.
- Hover do card pode preservar o deslocamento e zoom discreto já existentes no
  Design System, desde que o layout não salte.
- Use os tokens `--motion-fast`, `--motion-slow` e `--ease-standard`; a regra
  global de `prefers-reduced-motion` continua soberana.

## Contrato responsivo

O print comprova uma única largura visual. As faixas abaixo são direção por falha
de conteúdo, não reprodução de frames ausentes.

| Faixa lógica | Composição recomendada |
| --- | --- |
| Mobile estreito | Header mantém marca + menu; hero recebe overlay mais uniforme; filtros usam 1–2 colunas ou scroll horizontal sem cortar rótulos; cards voltam ao layout `stacked`; banner e rodapé empilham |
| Tablet / referência | Filtros em 3 colunas; cards usam layout `split` próximo de 42/58; banner horizontal; rodapé em 3 áreas, como observado |
| Desktop largo | Conteúdo limitado por `--width-content`; filtros podem ganhar mais colunas sem mudar a ordem; cards preservam largura de leitura e não se tornam excessivamente baixos |

- A troca entre `stacked` e `split` deve ocorrer quando mídia e texto preservarem
  legibilidade, não por tentativa de reproduzir um número arbitrário de pixels.
- Mantenha a ordem DOM `mídia → categoria → título → resumo → affordance` em todas
  as larguras.
- Não reduza corpo, ícones ou alvos abaixo dos tokens do sistema para manter a
  grade de filtros.
- Reserve espaço das imagens com `aspect-ratio`; use `object-position` por projeto
  para preservar o assunto principal.
- Textos maiores, zoom a 200% e tradução futura devem aumentar a altura dos cards
  sem corte ou sobreposição.

## Acessibilidade

- Mantenha um único `h1` no hero. O catálogo e o banner usam `h2`; títulos dos
  projetos permanecem `h3`.
- Relacione hero, catálogo e banner aos títulos com `aria-labelledby` quando
  aplicável.
- Use `<nav aria-label="Categorias de projetos">` se os filtros forem links ou
  um `<fieldset>` com `<legend>` se forem controles de estado local.
- Não use `role="tablist"`: os filtros não alternam painéis equivalentes de uma
  interface tabulada.
- Ícones dos filtros repetem os rótulos e são decorativos. A opção `Todos` pode
  ficar sem ícone como no print.
- Fotografias dos projetos são informativas e precisam de alt específico; o fundo
  atmosférico do hero pode ter alt vazio quando o texto cobre sua função.
- O estado ativo precisa de semântica, não apenas preenchimento oliva. Todos os
  controles mantêm foco visível e alvo mínimo de 44 × 44 px.
- A atualização de resultados não move o foco. Uma mensagem breve anuncia
  `N projetos encontrados`; o estado vazio é conteúdo visível, não só live region.
- Valide contraste de texto pequeno nas tags, ícones oliva sobre marfim e links
  oliva sobre verde profundo segundo WCAG 2.2 AA.
- Ornamentos usam `aria-hidden="true"`, `focusable="false"` e
  `pointer-events: none`.

## Lacunas antes da implementação final

1. Confirmação de que os filtros alteram a lista e de que a categoria deve viver
   na URL.
2. Destinos reais de cada `Ver detalhes` e existência das páginas de projeto.
3. Conteúdo e interação do menu expandido.
4. Fotografias finais, direitos de uso, dimensões, alt e pontos de recorte.
5. Revisão da tag `VARANDAS`, do resumo de `Circulação Verde` e do texto do banner.
6. Telefone, e-mail, localização, ano legal e destinos de WhatsApp/agendamento.
7. Decisão compartilhada sobre as variantes full-bleed e floating já necessárias
   nas rotas internas, para evitar APIs diferentes por página.
8. Comportamento dos filtros em mobile: wrap integral ou trilho horizontal.

## Direção sugerida de implementação

1. Extrair conteúdo global de header, contato e rodapé para
   `app/_content/siteContent.ts`, sem alterar o resultado da Home.
2. Adicionar variantes pequenas e tipadas a `SiteFrame` e `SiteHeader`, cobrindo a
   necessidade comum das páginas internas.
3. Estender `LineIcon`, `ProjectCard`, `ContactBanner` e o grupo de contato do
   rodapé sem quebrar as APIs atuais.
4. Criar `app/projetos/page.tsx`, `projectsContent.ts` e componentes locais à rota.
5. Implementar filtros pela URL; limitar a fronteira cliente caso o comportamento
   final exija estado local.
6. Adicionar testes de categoria inicial, filtro, estado vazio, semântica do card,
   item atual do rodapé e preservação das variantes da Home.
7. Validar TypeScript, Jest, ESLint CLI e build; fazer inspeção visual em 320, 768,
   842 e 1440 px, incluindo zoom, teclado e movimento reduzido.

## Referências técnicas prováveis

| Arquivo | Uso esperado |
| --- | --- |
| `app/_components/SiteFrame.tsx` | Variante de shell para rotas internas |
| `app/_components/SiteHeader.tsx` | Variante flutuante e mínima |
| `app/_components/ProjectCard.tsx` | Variante horizontal `split` |
| `app/_components/LineIcon.tsx` | Ícones das categorias e setas |
| `app/_components/ContactBanner.tsx` | Banner de conversão com texto de apoio |
| `app/_components/SiteFooter.tsx` | Reuso global e links de contato com ícones |
| `app/color-tokens.css` | Papéis de cor existentes |
| `app/globals.css` | Variantes, composição responsiva e estados |
| `app/_home/homeContent.ts` | Origem provisória dos dados globais a desacoplar |
| `app/projetos/page.tsx` | Composição futura da rota |
| `app/projetos/projectsContent.ts` | Conteúdo e categorias tipadas da rota |

## Resultado esperado deste artefato

Uma futura implementação deve reproduzir a hierarquia e o caráter visual do print
sem copiar componentes da Home ou criar um segundo Design System. A página deve
continuar utilizável sem filtros client-side, preservar URLs compartilháveis,
oferecer estados acessíveis e permitir que conteúdo, mídia e destinos sejam
substituídos sem alterar a anatomia dos componentes.
