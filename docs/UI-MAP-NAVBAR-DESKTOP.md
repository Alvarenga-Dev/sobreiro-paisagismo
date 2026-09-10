# UI Map — Navbar desktop da Sobreiro Paisagismo

## Objetivo

Transformar a captura desktop anexada em um contrato visual, estrutural e de
movimento orientado à implementação da navegação global. Este mapa dá prioridade
a dois requisitos: a Navbar deve possuir movimento intencional e deve permanecer
fora das páginas, enquanto somente o conteúdo da rota é substituído e animado.

## Fonte e grau de certeza

- Fonte: uma única captura horizontal de **816 × 80 px**, recortada ao redor da
  Navbar e de uma pequena faixa do hero.
- Evidência direta: superfície escura arredondada e insetada, marca à esquerda,
  cinco links centrais e CTA do WhatsApp à direita.
- Evidência direta: `Projetos` aparenta ser o destino ativo, marcado por um traço
  oliva curto sob o rótulo.
- Instrução de produto: a Navbar é animada, fica fora de cada página e permanece
  enquanto a página muda.
- Inferência: estados de hover, foco, entrada inicial, direção exata da transição
  entre rotas e medidas CSS finais.
- A captura é referência visual, não prova dimensões CSS, breakpoint, nível real
  de transparência, blur ou duração das animações.

## Decisão principal: Navbar persistente, página substituível

> **A Navbar não pertence a `HomePage`, `AboutPage`, `ProjectsPage` ou a qualquer
> outra página individual. Ela pertence ao layout global e permanece montada
> durante a navegação. Somente a região de conteúdo da rota sai, muda e entra.**

Essa separação é essencial para que a interface pareça contínua. Se cada página
renderizar sua própria Navbar, a navegação pode piscar, reiniciar animações,
perder o estado do indicador ativo e produzir a sensação de recarregamento da
tela inteira.

Persistência entre rotas e persistência durante a rolagem são decisões
independentes. A segunda foi confirmada pelo produto em 09/09/2026:

| Contrato | Estado neste mapa |
| --- | --- |
| Permanecer montada enquanto a rota muda | **Obrigatório** |
| Ficar visualmente acima do conteúdo/hero | **Obrigatório** |
| Acompanhar a pessoa durante todo o scroll | **Obrigatório; usar posicionamento fixo** |

## Leitura de escopo

### Entra no escopo

- Navbar desktop global com marca, navegação principal, estado ativo e CTA.
- Composição flutuante sobre a primeira região visual de cada rota.
- Persistência da Navbar no layout compartilhado do App Router.
- Troca animada apenas do conteúdo pertencente à página.
- Movimento do indicador ativo e microinterações de links e CTA.
- Estados de repouso, hover, foco, pressionado, rota ativa e transição de rota.
- Comportamento de movimento reduzido e requisitos essenciais de acessibilidade.
- Relação com a navegação mobile no breakpoint, sem redesenhar o menu mobile.

### Fica fora deste mapa

- Implementação da Navbar ou migração imediata da árvore de layouts.
- Design do painel de navegação mobile aberto, já coberto por
  `docs/UI-MAP-MENU-MOBILE.md`.
- Conteúdo interno, rodapé ou composição específica de cada página.
- Definição de analytics, prefetch, CMS ou integrações externas.
- Configuração final do WhatsApp, que continua dependente de URL autorizada.
- Ocultação, compactação ou animação da Navbar dependente de scroll.
- Transições entre parâmetros que não trocam a página, como filtros do catálogo.

## Estado atual versus estado-alvo

| Aspecto | Repositório atual | Estado-alvo deste mapa |
| --- | --- | --- |
| Propriedade da Navbar | Cada rota instancia `SiteFrame` e fornece seu próprio `SiteHeader` | O layout global instancia uma única Navbar persistente |
| Troca de rota | `RouteTransition` envolve todos os `children` do `body`; header e página desaparecem juntos | A fronteira de transição envolve somente o conteúdo da rota |
| Navegação desktop | `SiteHeader` expõe marca, contato opcional e `MobileNavigation`; a lista horizontal não existe | Cinco links horizontais visíveis no desktop, derivados de uma fonte global tipada |
| Estado ativo | O menu mobile deriva a rota por `usePathname`; não há indicador desktop | Item ativo expõe `aria-current="page"` e indicador oliva animado |
| CTA | Existe `ContactButton`, mas a Home usa e-mail e páginas internas podem ocultá-lo | CTA desktop visível conforme a captura, com WhatsApp apenas quando configurado |
| Movimento | A opacidade é aplicada ao shell inteiro | Navbar permanece estável; página faz saída/entrada e o indicador ativo se desloca |

O estado atual é citado apenas para orientar a futura migração. Este artefato não
autoriza sobrescrever alterações em andamento no repositório.

## Mapa macro

```text
RootLayout
└── GlobalSiteShell
    ├── SkipLink
    ├── PersistentDesktopNavbar       ← permanece montada entre rotas
    │   ├── BrandHomeLink
    │   ├── DesktopPrimaryNavigation
    │   │   ├── NavigationLink × 5
    │   │   └── AnimatedActiveIndicator
    │   └── WhatsAppAction
    └── RouteViewport                  ← única região substituída
        └── PageTransitionBoundary     ← única região com saída/entrada
            └── CurrentRoutePage
                ├── PageMain
                └── PageFooter
```

### Regra de propriedade

- `PersistentDesktopNavbar` pertence ao layout compartilhado.
- `CurrentRoutePage` não recebe nem instancia a Navbar.
- A rota informa seu estado apenas por pathname, metadados ou contrato de layout;
  ela não controla a existência do cabeçalho.
- O indicador ativo reage à nova rota sem desmontar a lista de navegação.
- O espaço necessário sob a Navbar é responsabilidade do shell/viewport, não de
  offsets copiados e repetidos em cada página.

## Contrato visual

- A Navbar forma uma cápsula retangular ampla, com cantos médios e borda oliva de
  baixo contraste.
- A superfície usa verde quase preto com transparência controlada; blur pode ser
  usado para preservar a leitura da imagem sem perder contraste.
- A barra fica insetada horizontalmente e não toca as bordas do viewport.
- A marca ocupa a extremidade esquerda: emblema circular, wordmark `SOBREIRO` e
  descritor `PAISAGISMO`.
- Os cinco destinos formam uma linha central, com espaçamento regular e sem
  divisores verticais.
- O item ativo usa texto claro e um traço oliva curto abaixo do rótulo. A cor não
  é o único sinal semântico; o link também usa `aria-current="page"`.
- O CTA fica na extremidade direita, com fundo oliva, ícone do WhatsApp e texto
  `Fale no WhatsApp`.
- A Navbar deve manter altura estável durante a mudança de rota. Nenhum rótulo,
  CTA ou logo pode deslocar verticalmente quando o item ativo muda.
- O hero ou topo da página continua visível ao redor da barra, reforçando sua
  aparência flutuante.

## Mapeamento por região

| ID | Região | Papel | Movimento | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| N01 | Shell global | Manter Navbar e viewport de rota como irmãos | Não participa da transição de página | `RootLayout` entrega toda a árvore a `RouteTransition` | Criar composição global em `app/layout.tsx` ou layout de site equivalente |
| N02 | Superfície da Navbar | Agrupar e destacar a navegação sobre o conteúdo | Permanece estável entre rotas; entrada inicial opcional e discreta | `SiteHeader--floating` já oferece inset, borda, fundo e blur | Preservar a variante visual e mover sua propriedade para o layout |
| N03 | Marca | Identificar e levar ao Início | Feedback curto em hover/foco; não sai com a página | `BrandLockup` existe | Tornar o lockup um link global para `/` sem duplicar marcação |
| N04 | Navegação primária | Expor destinos principais | Links mudam cor; indicador ativo se desloca | Conteúdo existe no menu mobile, não como lista desktop | Criar `DesktopNavigation` derivado da mesma fonte global de itens |
| N05 | Item ativo | Comunicar localização atual | Traço oliva desliza ou redimensiona até o novo item | Não existe no desktop | Derivar de `usePathname`, aplicar `aria-current` e animar apenas transform/escala quando possível |
| N06 | CTA WhatsApp | Converter contato prioritário | Cor, borda e ícone respondem a hover/press; não some na troca | `ContactButton` existe; WhatsApp está indisponível no conteúdo atual | Reusar `ButtonLink`/`ContactButton` após configurar destino real |
| N07 | Viewport da rota | Hospedar somente o conteúdo mutável | Faz saída e entrada coordenadas | `RouteTransition` envolve Navbar e página juntas | Reposicionar a fronteira de transição abaixo da Navbar |
| N08 | Clearance superior | Impedir que a Navbar cubra título ou controles do hero | Sem animação independente | Cada hero hoje compensa o header flutuante | Centralizar a regra no shell por token compartilhado; permitir ajuste local apenas quando comprovado |
| N09 | Navegação mobile | Substituir a lista desktop em larguras menores | Transição própria do menu | `MobileNavigation` existe | Alternar por breakpoint sem montar duas landmarks navegáveis simultaneamente |

## Conteúdo observado e destinos

| Ordem | Rótulo observado | Destino já usado no projeto | Estado na captura |
| ---: | --- | --- | --- |
| 1 | `Início` | `/` | Inativo |
| 2 | `Sobre` | `/sobre` | Inativo |
| 3 | `Projetos` | `/projetos` | Aparentemente ativo |
| 4 | `Por que um projeto?` | `/#beneficios` | Inativo |
| 5 | `Contato` | `/#contato` | Inativo |

O CTA observado é `Fale no WhatsApp`. O print não fornece telefone ou URL; não
substituir essa lacuna por um destino fictício. A fonte de itens deve ser única e
compartilhada com o menu mobile para evitar divergência de rótulo, ordem e rota.

## Por que a animação é parte essencial da Navbar

A animação não é decoração adicional neste componente. Ela comunica que o shell
global continua presente enquanto o contexto da página muda. Esse movimento deve:

1. preservar a continuidade espacial da Navbar;
2. confirmar qual destino se tornou ativo;
3. suavizar a substituição da página sem simular um reload completo;
4. manter resposta imediata ao clique, ao teclado e ao toque;
5. evitar movimento excessivo ou competição entre barra e conteúdo.

O contrato combina dois níveis de movimento:

| Nível | O que anima | O que permanece estável |
| --- | --- | --- |
| Microinteração da Navbar | Cor dos links, indicador ativo, superfície/ícone do CTA | Caixa, logo, largura geral e posição da Navbar |
| Transição de rota | Conteúdo da página atual sai e a próxima página entra | Navbar inteira, foco visível e contexto global |

## Contrato de animação

### 1. Troca de item ativo

- O indicador oliva se move do item anterior para o novo destino, reforçando a
  continuidade da mesma Navbar.
- Preferir `transform` e `scaleX` ou uma técnica equivalente que não provoque
  relayout da lista inteira.
- Faixa inicial recomendada: **180–280 ms**, com easing de desaceleração suave.
- O novo link recebe `aria-current="page"` assim que a navegação for confirmada;
  a animação visual não pode atrasar a semântica.
- Para destinos em âncoras da Home, a regra de ativo exige decisão específica:
  pathname sozinho não diferencia `Início`, `Por que um projeto?` e `Contato`.

### 2. Saída e entrada da página

- Ao ativar um link interno, somente `RouteViewport` inicia a saída.
- A Navbar continua opaca, interativa e na mesma coordenada visual.
- A saída pode combinar opacidade com deslocamento vertical muito curto; a entrada
  usa o movimento inverso após a nova rota estar disponível.
- Faixa inicial recomendada: **220–320 ms** por fase, sem bloquear a navegação por
  tempo perceptivelmente longo.
- Evitar animar páginas antigas e novas sobrepostas quando isso duplicar landmarks,
  IDs, foco ou conteúdo acessível.
- Mudanças de query string usadas por filtros devem preservar o foco e evitar uma
  transição de página completa, salvo requisito posterior.

### 3. Hover, foco e pressionado

- Links: transição curta de cor e/ou opacidade entre **120–180 ms**.
- CTA: pequena mudança de fundo/borda; `scale` no pressionado pode ser sutil e não
  deve alterar o layout.
- Foco por teclado aparece imediatamente e não depende do fim da animação.
- Não usar animações contínuas, brilho pulsante ou deslocamento de cada item em
  sequência; a Navbar é um ponto de orientação, não uma peça promocional.

### 4. Movimento reduzido

- Em `prefers-reduced-motion: reduce`, remover deslocamentos e interpolação do
  indicador.
- Atualizar o estado ativo de forma imediata.
- A página pode trocar com corte direto ou fade praticamente instantâneo.
- A Navbar continua persistente; movimento reduzido não altera sua posição na
  arquitetura.

## Estados e interações

| Estado | Regra visual | Regra de interação e acessibilidade |
| --- | --- | --- |
| Repouso | Links claros de contraste secundário; CTA oliva | Todos os destinos são links nativos e entram na ordem de tabulação |
| Hover | Rótulo ganha contraste; CTA responde sem salto de layout | Aplicar apenas em dispositivos que suportam hover |
| Foco visível | Outline de alto contraste e afastado da borda | Não remover outline; foco aparece imediatamente |
| Pressionado | Feedback curto de cor ou escala sutil | Não atrasar navegação para completar microinteração |
| Rota ativa | Texto destacado e indicador oliva | Usar `aria-current="page"`; não depender somente da cor |
| Página saindo | Conteúdo perde opacidade/desloca discretamente | Navbar permanece operável; evitar cliques repetidos conflitantes na região em saída |
| Página entrando | Novo conteúdo aparece sob a Navbar | Foco segue a estratégia de navegação definida; anúncio de rota não depende da animação |
| Destino atual acionado | Indicador não reinicia desnecessariamente | Não executar transição completa para o mesmo pathname/hash já ativo |
| Link externo | Feedback padrão, sem transição de rota interna | Respeitar nova aba somente quando explicitamente indicada |
| CTA indisponível | Não exibir ação falsa ou sem destino | Preferir ocultar ou substituir por canal realmente configurado |

## Contrato estrutural para o App Router

A composição-alvo deve preservar Server Components por padrão e limitar a fronteira
cliente ao comportamento que realmente depende do navegador.

```text
app/layout.tsx
├── PersistentSiteNavigation
│   ├── Server shell e conteúdo global
│   └── pequena ilha cliente para pathname/indicador, se necessária
└── RouteTransition
    └── {children}
```

Regras obrigatórias:

- Não importar `SiteHeader` em `app/page.tsx`, `app/sobre/page.tsx`,
  `app/projetos/page.tsx` ou futuras páginas que usam o mesmo shell.
- Não colocar a Navbar dentro do elemento animado por troca de rota.
- Não usar uma `key` por pathname no shell que force a remontagem da Navbar.
- Não duplicar a Navbar para obter aparente continuidade visual.
- Não tornar o layout raiz inteiro um Client Component apenas para ler a rota.
- Manter uma única fonte tipada para itens, destinos e contato.
- Manter o skip link antes da navegação e direcioná-lo ao `main` da página atual.

### Responsabilidade do shell e da página

| Shell global | Página da rota |
| --- | --- |
| Navbar, skip link, breakpoint, z-index e clearance base | Hero, seções, conteúdo e composição editorial |
| Fonte global de links e contato | Metadados e dados próprios da rota |
| Estado ativo derivado da URL | Ajustes locais de contraste quando realmente necessários |
| Fronteira externa da transição | Conteúdo que efetivamente entra e sai |

## Contrato responsivo

- A captura comprova somente o desktop. O breakpoint exato não pode ser medido.
- Enquanto houver espaço para marca, cinco links e CTA sem colisão, renderizar a
  composição horizontal.
- Abaixo do breakpoint definido pelo conteúdo, esconder a lista desktop e expor o
  gatilho mobile já especificado.
- Não comprimir tipografia ou alvos abaixo do mínimo acessível para prolongar
  artificialmente o estado desktop.
- Não manter simultaneamente a lista desktop e o menu mobile acessíveis por teclado
  quando apenas um deles estiver visível.
- A troca de breakpoint não deve alterar a propriedade global: desktop e mobile
  continuam pertencendo ao mesmo shell persistente.

## Semântica e acessibilidade

- Usar `<header>` global com `<nav aria-label="Navegação principal">`.
- Renderizar os itens como lista de links; marca navegável deve possuir nome
  acessível que indique retorno ao Início.
- Usar `aria-current="page"` somente no destino correspondente à rota atual.
- Ícone do WhatsApp é decorativo quando o texto já nomeia a ação.
- Garantir contraste WCAG 2.2 AA sobre fotografia clara ou escura; aumentar a
  opacidade da superfície antes de comprometer a legibilidade.
- Preservar alvo interativo de pelo menos 44 × 44 px, ainda que o rótulo visível
  seja menor.
- Após navegação, definir estratégia previsível de foco: manter foco no link e
  anunciar o novo conteúdo, ou mover foco programaticamente ao título principal.
- O conteúdo em transição não pode permanecer focável quando estiver visualmente
  oculto.

## Lacunas antes da implementação

1. Definir se a Navbar deve ocultar ou compactar durante o scroll. A decisão atual
   mantém a superfície fixa, estável e integralmente visível.
2. Fornecer e validar a URL real do WhatsApp.
3. Confirmar o breakpoint em que a navegação horizontal cede lugar ao menu mobile.
4. Definir como o indicador ativo representa âncoras da Home.
5. Confirmar se o rodapé deve ficar dentro ou fora da transição de rota; pela
   arquitetura atual, a direção recomendada é a página inteira, incluindo rodapé,
   mudar sob a Navbar persistente.
6. Validar duração e deslocamento em navegador real, inclusive com navegação rápida,
   histórico, hash, teclado e movimento reduzido.
7. Confirmar se a Navbar possui uma entrada apenas no primeiro carregamento. Se
   existir, ela não deve se repetir a cada rota.

## Direção de implementação sugerida

1. Elevar `SiteHeader` e a fonte global de navegação para um layout compartilhado.
2. Alterar `SiteFrame` para representar somente a região específica da rota ou
   separar `GlobalSiteShell` de `PageFrame`, removendo o `header` como prop da página.
3. Reposicionar `RouteTransition` para envolver apenas `{children}` mutáveis abaixo
   da Navbar.
4. Criar a lista desktop a partir de `siteContent.mobileMenu.navigation`, renomeando
   a estrutura para um contrato global caso necessário.
5. Criar o indicador ativo animado com estado derivado da URL e sem remontar a
   Navbar.
6. Configurar o CTA real e reutilizar a primitiva de botão existente.
7. Centralizar z-index, inset, altura e clearance em tokens funcionais do shell.
8. Adicionar testes de persistência entre rotas, item ativo, navegação por teclado,
   movimento reduzido e ausência da Navbar dentro das páginas.
9. Validar visualmente desktop largo, largura limite do breakpoint e pelo menos uma
   rota com hero claro e outra com hero escuro.

## Critérios de aceite do futuro trabalho

- Existe uma única instância da Navbar no shell compartilhado.
- Navegar entre `/`, `/sobre` e `/projetos` não desmonta nem faz a Navbar piscar.
- Apenas o conteúdo da página executa saída e entrada.
- O indicador ativo se atualiza e se move para o destino correto.
- A Navbar exibe marca, cinco destinos e CTA no desktop sem colisão.
- O foco permanece visível e a rota ativa é anunciada semanticamente.
- `prefers-reduced-motion` elimina deslocamentos não essenciais.
- Nenhuma página importa ou instancia diretamente a Navbar global.
- O CTA não aponta para número ou URL fictícia.

## Referências técnicas

- `app/layout.tsx`: futuro proprietário do shell persistente e da Navbar.
- `app/_components/SiteHeader.tsx`: superfície visual atual a evoluir.
- `app/_components/SiteFrame.tsx`: composição atual que ainda recebe header por rota.
- `app/_components/RouteTransition.tsx`: fronteira atual que precisa excluir a Navbar.
- `app/_components/MobileNavigation.tsx`: leitura de pathname e navegação mobile já
  implementadas.
- `app/_content/siteContent.ts`: itens globais existentes e estado do contato.
- `app/globals.css`: tokens e estilos atuais de header flutuante e movimento.
- `docs/UI-MAP-MENU-MOBILE.md`: contrato complementar para larguras menores.
- `docs/DESIGN-SYSTEM.md`: catálogo de primitivas e decisões compartilhadas.

## Resultado esperado deste artefato

Permitir que a Navbar desktop seja especificada e implementada como uma camada
global, contínua e reconhecível: ela permanece fora das páginas, comunica a troca
de contexto com um indicador animado e deixa apenas o conteúdo da rota mudar sob
ela, sem duplicação, piscadas ou remontagens desnecessárias.
