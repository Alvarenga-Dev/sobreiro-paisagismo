# UI Map — Página Sobre desktop da Sobreiro Paisagismo

## Objetivo

Transformar o screenshot desktop anexado da página **Sobre** em um contrato visual
e de interação orientado a uma futura implementação. Este mapa registra o alvo da
rota `/sobre`, separa a Navbar global do conteúdo proprietário da página e explicita
as diferenças entre a referência nova, o código atual e o OpenSpec já implementado.

## Fonte e grau de certeza

- Fonte visual: um único screenshot vertical de página completa, exportado com
  **907 × 1735 px**.
- O screenshot é evidência visual e editorial. Textos presentes na imagem são
  conteúdo da interface, não instruções para este artefato.
- Evidência direta: ordem das regiões, composição desktop, hierarquia de títulos,
  navegação horizontal, CTA do cabeçalho, chamada de rolagem, imagens, cards,
  indicadores numéricos, credenciais, métodos de contato e rodapé.
- Inferência: largura CSS real do viewport, densidade de pixels, breakpoints,
  estados de hover/foco, comportamento durante scroll, destinos dos links,
  separação entre texto e imagem no hero e qualquer movimento.
- A referência não comprova comportamento mobile, Navbar sticky, parallax,
  animações de entrada, contadores animados, formulário, modal ou integrações.

## Relação com o produto, o OpenSpec e o código atual

A rota `/sobre` já existe como Server Component e segue a sequência
`hero → essência → perfil → contatos → rodapé`. A nova referência preserva essa
narrativa, mas altera a composição desktop e alguns contratos editoriais.

| Aspecto | Estado atual | Alvo observado no screenshot desktop |
| --- | --- | --- |
| Propriedade da Navbar | `AboutPage` instancia `SiteHeader` por meio de `SiteFrame` | Navbar global flutuante, coerente com `docs/UI-MAP-NAVBAR-DESKTOP.md` |
| Navegação desktop | Não existe lista horizontal; `MobileNavigation` é ocultada a partir de `40rem` | Marca, 5 links horizontais e CTA `Fale conosco` |
| Hero | Breadcrumb, `h1`, introdução e ornamento | Eyebrow `SOBRE`, `h1`, introdução, chamada `Conheça nossa história` e frase manuscrita |
| Essência | Imagem, título, 2 parágrafos e 4 valores | Mesma base + card sobreposto à imagem + coluna de 3 indicadores |
| Perfil | `FounderSection`, identidade neutra, mídia indisponível e 4 credenciais | Apresentação da equipe, imagem botânica real, card-frase sobreposto e 4 credenciais |
| Contatos | Título e 3 métodos | Título à esquerda; texto introdutório e 3 métodos à direita |
| Rodapé | Marca, 4 links de navegação, contatos, redes e barra legal | Marca, 5 links incluindo `Contato`, contatos, redes e barra legal |

O OpenSpec `build-about-page` exige breadcrumb no hero e uma área de perfil com
retrato e registro. A referência nova mostra eyebrow sem breadcrumb e identidade
de equipe sem retrato pessoal ou registro. Este mapa registra a divergência, mas
não altera nem substitui o OpenSpec por si só.

## Leitura de escopo

### Entra no escopo deste mapa

- Composição desktop completa da rota `/sobre`.
- Relação visual da Navbar global com o hero, sem atribuí-la à página.
- Hero fotográfico com conteúdo editorial e chamada de rolagem.
- Essência com mídia, nota sobreposta, narrativa, indicadores e quatro valores.
- Perfil institucional escuro com identidade da equipe, mídia botânica, frase de
  apoio e quatro credenciais.
- Faixa clara com introdução e três métodos de contato.
- Rodapé global conforme aparece na referência.
- Estados essenciais de navegação, foco e disponibilidade de contatos.
- Lacunas que precisam ser resolvidas antes de alinhar a implementação.

### Fica fora deste mapa

- Alteração de código, conteúdo, testes, OpenSpec ou Design System.
- Comportamento mobile e composição intermediária; somente adaptações mínimas são
  sugeridas como direção futura.
- Conteúdo do menu mobile, já coberto por `docs/UI-MAP-MENU-MOBILE.md`.
- Arquitetura e movimento completos da Navbar, já cobertos por
  `docs/UI-MAP-NAVBAR-DESKTOP.md`.
- Validação editorial de números, credenciais, fotografias e destinos externos.
- CMS, API, banco de dados, analytics, formulário, agenda, integração com
  WhatsApp ou envio de e-mail pelo servidor.
- Animações não demonstradas pelo screenshot.

## Mapa macro

A página alterna superfícies na sequência
`hero fotográfico escuro → essência marfim → perfil verde profundo → contatos
marfim → rodapé verde profundo`. A Navbar flutua sobre o hero, mas pertence ao
shell global e permanece fora da composição da rota.

| Ordem | Região | Faixa vertical observada | Proporção aproximada | Superfície |
| ---: | --- | ---: | ---: | --- |
| 0 | Navbar global | `y ≈ 12–60` | sobreposta ao hero | Vidro verde quase preto com borda oliva |
| 1 | Hero Sobre | `y ≈ 0–434` | ~25% | Fotografia com overlay escuro |
| 2 | Essência e valores | `y ≈ 435–940` | ~29% | Marfim |
| 3 | Perfil da equipe | `y ≈ 941–1294` | ~20% | Verde profundo |
| 4 | Métodos de contato | `y ≈ 1295–1516` | ~13% | Marfim |
| 5 | Rodapé global | `y ≈ 1517–1734` | ~13% | Verde quase preto |

As coordenadas descrevem somente o arquivo de referência. Não convertê-las em
alturas CSS fixas; a altura final deve responder ao conteúdo e ao viewport.

## Árvore de composição alvo

```text
GlobalSiteShell
├── SkipLink
├── PersistentDesktopNavbar                 ← global; fora da rota
│   ├── BrandHomeLink
│   ├── DesktopPrimaryNavigation
│   │   └── NavigationLink × 5
│   └── HeaderContactAction
└── RouteViewport
    └── AboutPage
        ├── AboutHero
        │   ├── HeroMedia
        │   ├── HeroOverlay
        │   ├── Eyebrow
        │   ├── DisplayHeading
        │   ├── IntroductoryCopy
        │   ├── HistoryAnchor
        │   ├── HandwrittenStatement
        │   └── BotanicalDecoration
        ├── EssenceSection
        │   ├── EssenceStory
        │   │   ├── ProcessMedia
        │   │   ├── MediaCallout
        │   │   ├── SectionHeading
        │   │   ├── EditorialCopy
        │   │   └── EssenceMetrics × 3
        │   └── ValuesGrid
        │       └── ValueCard × 4
        ├── TeamProfileSection
        │   ├── TeamIntroduction
        │   ├── TeamIdentity
        │   ├── BotanicalMedia
        │   ├── MediaStatement
        │   └── CredentialsList
        │       └── CredentialItem × 4
        ├── ContactMethodsSection
        │   ├── ContactIntroduction
        │   └── ContactMethodsGrid
        │       └── ContactMethodCard × 3
        └── SiteFooter
```

## Contrato visual da tela

- Limite o conteúdo interno a uma largura editorial centralizada, com gutters
  amplos. As superfícies de seção continuam full-bleed.
- Use marfim nas regiões claras e verde profundo nas regiões escuras; evite branco
  puro, preto puro e sombras elevadas genéricas.
- Use serifada nos títulos editoriais e sem serifa em navegação, parágrafos,
  eyebrows, legendas, credenciais e metadados.
- Reserve oliva para fragmentos de título, ícones, bordas, indicadores e pequenos
  rótulos. Não depender somente da cor para indicar estado.
- Preserve bordas finas, raios médios e contraste baixo nos cards. As imagens têm
  raios mais generosos e os cards sobrepostos parecem integrados à fotografia.
- Trate line art botânico como decoração de baixa opacidade, fora da árvore de
  acessibilidade e sem capturar ponteiro.
- Evite alturas fixas. Use `aspect-ratio`, dimensões intrínsecas e `object-position`
  por mídia para proteger o foco da pá, do jardim e das folhas.

## Mapeamento por região

| ID | Região | Papel | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- |
| R01 | Shell global | Manter Navbar, skip link e viewport de rota | `SiteFrame` ainda recebe o header por página | Seguir `UI-MAP-NAVBAR-DESKTOP`: elevar a Navbar ao layout e animar somente a rota |
| R02 | Navbar desktop | Marca, navegação primária, estado atual e contato | `SiteHeader` tem superfície flutuante, mas não tem lista desktop; `/sobre` oculta o CTA | Criar/reusar navegação global; marcar `Sobre` semanticamente como atual; centralizar rótulo e destino do CTA |
| R03 | Mídia do hero | Criar atmosfera de trabalho manual e cultivo | `AboutHero` aceita mídia tipada provisória | Substituir por ativo aprovado com recorte configurável e overlay independente |
| R04 | Conteúdo do hero | Identificar a página e expressar a proposta da marca | Há `h1` e introdução; o primeiro elemento é breadcrumb | Adicionar eyebrow `SOBRE`; decidir em spec se o breadcrumb deixa de existir visualmente |
| R05 | Chamada de história | Conduzir à próxima região | Não existe | Implementar como link nativo para a seção Essência se o destino for confirmado; ícone circular e rótulo formam um único alvo |
| R06 | Frase manuscrita | Reforçar uma assinatura editorial sobre a fotografia | Não existe | Confirmar se é texto real ou parte da imagem; não usar como única fonte de informação |
| R07 | Essência | Explicar propósito, processo e compromissos | `EssenceSection` já possui mídia, título, parágrafos e valores | Evoluir a grade desktop para mídia + narrativa + indicadores, preservando a ordem DOM |
| R08 | Mídia de processo | Mostrar jardim residencial concluído | `essence.media` existe, hoje com fotografia provisória diferente | Usar mídia aprovada, alt contextual, dimensões estáveis e recorte editorial |
| R09 | Nota da mídia | Ligar a imagem à ideia de significado | Não existe | Criar callout local sobreposto à borda inferior direita da imagem; não torná-lo interativo |
| R10 | Indicadores da essência | Comunicar volume, abordagem e presença da natureza | Não existem | Modelar como lista de 3 itens; publicar `+100` e `100%` somente após validação editorial |
| R11 | Valores | Resumir Personalização, Sustentabilidade, Bem-estar e Qualidade | Lista tipada e 4 cards já existem | Preservar como cards informativos em uma linha; ajustar apenas ritmo, proporções e iconografia aprovados |
| R12 | Perfil da equipe | Apresentar autoria institucional sem inventar biografia | `FounderSection` e `AboutFounderContent` mantêm nomenclatura de fundadora, embora exibam equipe | Renomear o domínio para equipe/perfil institucional em uma mudança futura; não publicar retrato ou registro pessoal ausente no alvo |
| R13 | Mídia botânica do perfil | Materializar cuidado e natureza | O estado atual mostra placeholder de retrato indisponível | Permitir mídia configurada não pessoal; usar alt informativo se transmitir contexto |
| R14 | Frase sobre a mídia | Reforçar beleza, equilíbrio e propósito | Não existe | Criar callout escuro sobreposto à lateral inferior esquerda da imagem; conteúdo textual real |
| R15 | Credenciais | Explicar formação, especialização, experiência e atendimento | 4 itens tipados já existem com conteúdo pendente | Preservar lista vertical com ícones e divisores; manter linguagem de validação até aprovação |
| R16 | Introdução de contato | Enquadrar os três canais antes da ação | Título existe; parágrafo introdutório não | Adicionar supporting copy acima da grade na coluna direita |
| R17 | Métodos de contato | Oferecer WhatsApp, e-mail e agenda com peso visual equivalente | 3 métodos tipados; somente e-mail configurado | Manter card como link apenas quando houver destino e superfície informativa quando indisponível |
| R18 | Ornamento de contato | Encerrar a superfície clara e conduzir ao rodapé | Ornamento existe, atualmente ancorado à esquerda | Reposicionar para a borda direita como no screenshot, sem interferir em texto ou cards |
| R19 | Rodapé | Repetir marca, navegação, contatos, redes e legal | `SiteFooter` é compartilhado e próximo ao alvo | Reusar; alinhar fonte global para incluir `Contato` e preservar estado atual da rota |

## Conteúdo observado no screenshot

O conteúdo abaixo registra a referência. Números, destinos, autoria e fatos
profissionais não se tornam aprovados apenas por aparecerem no screenshot.

### Navbar e hero

| Região | Conteúdo visível |
| --- | --- |
| Marca | `SOBREIRO` / `PAISAGISMO` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| CTA | `Fale conosco`, acompanhado por ícone de WhatsApp |
| Eyebrow | `SOBRE` |
| Título | `Sobre a Sobreiro Paisagismo`, com `Sobreiro Paisagismo` em oliva |
| Introdução | `Acreditamos que o paisagismo vai muito além da estética. Ele transforma ambientes, melhora a qualidade de vida e conecta pessoas à natureza.` |
| Chamada de rolagem | `Conheça nossa história` |
| Frase sobre a mídia | `Paisagens que inspiram vidas melhores.` |

O screenshot não mostra breadcrumb. Também não evidencia com segurança um traço
ativo sob `Sobre`; o estado atual deve existir semanticamente mesmo que o detalhe
visual final seja definido pelo contrato global da Navbar.

### Essência e indicadores

| Região | Conteúdo visível |
| --- | --- |
| Nota da mídia | `Natureza que faz sentido` |
| Apoio da nota | `Projetos que valorizam pessoas, espaços e histórias.` |
| Eyebrow | `NOSSA ESSÊNCIA` |
| Título | `Design com propósito, natureza com intenção.`, com a segunda frase em oliva |
| Corpo 1 | `Cada projeto é pensado de forma única, respeitando as características do espaço, os desejos de cada cliente e o equilíbrio com o meio ambiente.` |
| Corpo 2 | `Nossos compromissos e valores guiam cada etapa do projeto — do conceito à execução — sempre com escuta ativa, criatividade e dedicação.` |
| Indicador 1 | `+100` / `projetos realizados` |
| Indicador 2 | `100%` / `foco em soluções personalizadas` |
| Indicador 3 | `Natureza` / `como aliada em todas as etapas` |

### Valores

| Ordem | Título | Descrição visível |
| ---: | --- | --- |
| 1 | `Personalização` | `Projetos exclusivos que refletem o estilo e as necessidades de cada cliente.` |
| 2 | `Sustentabilidade` | `Escolhas conscientes que respeitam a natureza e o futuro.` |
| 3 | `Bem-estar` | `Ambientes que promovem conforto, harmonia e qualidade de vida.` |
| 4 | `Qualidade` | `Técnica, atenção aos detalhes e compromisso em todas as etapas do projeto.` |

### Perfil da equipe

| Região | Conteúdo visível |
| --- | --- |
| Eyebrow | `QUEM ESTÁ POR TRÁS` |
| Título | `Paixão que floresce em cada projeto.`, com `em cada projeto.` em oliva |
| Introdução | `A Sobreiro reúne sensibilidade para a natureza, cuidado com o desenho e escuta atenta em cada novo projeto.` |
| Identidade | `Equipe Sobreiro Paisagismo` |
| Papel | `Estúdio de paisagismo` |
| Frase sobre a mídia | `Beleza, equilíbrio e propósito em cada detalhe.` |
| Credencial 1 | `Formação` / `Trajetória acadêmica em validação editorial.` |
| Credencial 2 | `Especialização` / `Especializações profissionais em validação editorial.` |
| Credencial 3 | `Experiência` / `Histórico de projetos em validação editorial.` |
| Credencial 4 | `Atendimento` / `Abordagem de atendimento em validação editorial.` |

### Contato e rodapé

| Região | Conteúdo visível |
| --- | --- |
| Eyebrow | `VAMOS CONVERSAR` |
| Título | `Vamos transformar seu espaço juntos?`, com `seu espaço` em oliva |
| Introdução | `Conte-nos sobre o seu projeto. Será um prazer ouvir suas ideias e encontrar a melhor solução para o seu espaço.` |
| WhatsApp | `Fale no WhatsApp` / `Canal em atualização` / `Contato ainda não disponível.` |
| E-mail | `Envie um e-mail` / `contato@sobreiro.com.br` |
| Agenda | `Agende uma conversa` / `Atendimento personalizado` / `Agenda ainda não disponível.` |
| Descrição da marca | `Projetos de paisagismo que conectam natureza, bem-estar e estilo de vida.` |
| Navegação | `Início`, `Sobre`, `Projetos`, `Por que um projeto?`, `Contato` |
| Contato | `contato@sobreiro.com.br`; `Rio de Janeiro, RJ` |
| Legal | `© 2026 Sobreiro Paisagismo. Todos os direitos reservados.` |

O crédito final está pequeno demais para transcrição confiável a partir do
screenshot. A implementação deve continuar usando o conteúdo global tipado em
`siteContent`, não uma leitura aproximada da imagem.

## Contrato por região

### Navbar global sobre o hero

- Posicione a Navbar insetada nos quatro lados do topo visível, com largura quase
  total do conteúdo e altura estável.
- Mantenha marca à esquerda, cinco destinos centralizados e CTA à direita.
- Trate a Navbar como camada do shell, não como descendente de `AboutPage`.
- Use superfície escura translúcida, borda oliva discreta, blur e raio médio.
- O CTA usa ícone de WhatsApp, mas só deve apontar para WhatsApp quando existir um
  destino real aprovado.
- O rótulo `Fale conosco` diverge de `Fale no WhatsApp` no mapa global da Navbar;
  a decisão deve ser centralizada para todas as rotas.

### Hero

- Use fotografia full-bleed com a pá ocupando o centro e o vaso no lado direito.
- Aplique overlay verde/preto mais forte à esquerda e na base, preservando leitura
  do texto branco e oliva em qualquer recorte aprovado.
- Restrinja o bloco de conteúdo à coluna esquerda e não o deixe competir com o
  objeto central da fotografia.
- Use o único `h1` da página. O eyebrow identifica o contexto sem substituir a
  semântica do título.
- A chamada `Conheça nossa história` aparece na base esquerda com seta para baixo
  em círculo. Se implementada, deve levar à Essência por âncora real.
- A frase manuscrita fica no quadrante inferior direito. Confirmar se será texto,
  SVG ou parte da mídia antes de escolher semântica e responsividade.

### Essência e valores

- Organize a primeira linha em três zonas: mídia à esquerda, narrativa ao centro e
  indicadores estreitos à direita.
- Faça o card `Natureza que faz sentido` cruzar a borda inferior direita da mídia,
  mantendo contraste, respiro e leitura independente do recorte.
- Separe a coluna de indicadores por linha vertical fina. Use números/títulos
  serifados e descrições pequenas sem reduzir contraste.
- Mantenha os quatro valores em uma linha de cards equivalentes abaixo da primeira
  composição. Eles são informativos e não recebem hover de ação ou `tabIndex`.

### Perfil da equipe

- Organize em três colunas: narrativa e identidade; imagem; credenciais.
- Use a superfície verde profunda como uma única faixa full-bleed sem cards ao
  redor da narrativa principal.
- A imagem central é botânica, vertical e arredondada. O callout cruza sua lateral
  inferior esquerda e usa uma superfície verde elevada, não marfim.
- A identidade é institucional: `Equipe Sobreiro Paisagismo` e
  `Estúdio de paisagismo`. Não inferir pessoa, registro ou biografia.
- Credenciais formam lista vertical com ícone circular, título, apoio e divisores.
  Os ícones são decorativos; o texto carrega todo o significado.

### Contato

- Use uma grade desktop assimétrica: título editorial à esquerda e conteúdo de
  ação à direita.
- Posicione o parágrafo introdutório acima dos três cards, alinhado ao início da
  grade de métodos.
- Mantenha três cards de mesma altura e peso visual. O estado funcional pode
  variar sem que uma superfície indisponível imite um link.
- O ornamento botânico entra pela borda direita e permanece atrás do conteúdo.

### Rodapé

- Reuse o rodapé global em três colunas: marca/redes, navegação e contato.
- Inclua `Contato` na navegação somente por meio da fonte global compartilhada.
- Preserve a barra legal separada por hairline e o crédito alinhado à direita.
- Não copie e mantenha dados globais dentro do conteúdo local de `/sobre`.

## Estados e interações

| Elemento | Estado observado | Estados necessários | Regra |
| --- | --- | --- | --- |
| Link `Sobre` da Navbar | Rota atual; destaque visual pouco conclusivo | repouso, hover, focus-visible, active, current | Usar `aria-current="page"`; indicador visual pertence ao mapa global da Navbar |
| CTA do cabeçalho | Aparência ativa | repouso, hover, focus-visible, active, indisponível | Só renderizar como link com destino real; não fabricar URL de WhatsApp |
| Chamada `Conheça nossa história` | Aparência de link de rolagem | repouso, hover, focus-visible, active | Um único `<a href="#essencia">`; garantir destino e foco previsível |
| Nota da mídia | Informativa | estática | Não focável e sem affordance de clique |
| Indicadores | Informativos | estáticos, conteúdo pendente | Não animar contagem sem requisito; validar afirmações antes da publicação |
| Cards de valor | Informativos | estáticos | Usar lista; sem cursor, hover promocional ou `tabIndex` |
| Frase sobre mídia | Informativa | estática | Texto legível ou decoração corretamente escondida conforme decisão editorial |
| Credenciais | Informativas e pendentes | aprovado, pendente ou omitido | Não transformar ícones em controles; fatos não aprovados permanecem explícitos ou ausentes |
| Card de WhatsApp | Indisponível na referência | configurado ou indisponível | Link nativo somente com destino real; caso contrário, superfície não focável |
| Card de e-mail | Configurado | repouso, hover, focus-visible, active | Card inteiro como um único `mailto:`; nenhum link aninhado |
| Card de agenda | Indisponível na referência | configurado ou indisponível | Não inferir modal, calendário ou formulário |
| Links do rodapé | Aparência ativa | repouso, hover, focus-visible, active, current | Consumir destinos globais; `Sobre` pode usar `aria-current="page"` |

## Contrato de movimento

- O screenshot não comprova movimento de conteúdo, parallax, reveal de seções ou
  contadores animados.
- Hero, callouts, indicadores, valores, perfil, contatos e ornamentos permanecem
  estáticos neste contrato.
- A seta para baixo comunica direção, mas não prova animação de bounce.
- A rolagem por âncora pode usar o comportamento global existente; não atrasar a
  ação para executar transição decorativa.
- Movimento persistente e transição de rota da Navbar seguem exclusivamente
  `docs/UI-MAP-NAVBAR-DESKTOP.md`.
- Hover e foco usam transições curtas já tokenizadas; com
  `prefers-reduced-motion: reduce`, eliminar deslocamentos não essenciais.

## Contrato responsivo

Esta referência comprova somente a versão desktop. As regras abaixo evitam que a
composição falhe em outras larguras, mas não constituem um `ui_map` mobile.

| Faixa lógica | Direção mínima recomendada |
| --- | --- |
| Desktop de referência | Navbar horizontal; Essência em 3 zonas + 4 valores; perfil em 3 colunas; contato em título + bloco de ações |
| Desktop largo | Manter `--width-content`; ampliar gutters, não tipografia, gaps e imagens sem limite |
| Desktop limite | Trocar para navegação mobile antes de colidir marca, 5 links e CTA; permitir que indicadores desçam para nova linha antes de comprimir texto |
| Abaixo do desktop | Preservar ordem DOM e conteúdo; composição específica depende de referência ou decisão mobile posterior |

- Não esconder conteúdo editorial para conservar a composição horizontal.
- Não reduzir controles abaixo de 44 × 44 CSS px.
- Cards sobrepostos devem voltar ao fluxo quando a sobreposição causar corte,
  overflow ou colisão.
- Use `aspect-ratio` e `object-position` por breakpoint; não fixe altura de seção.

## Semântica e acessibilidade

- Mantenha um único `main` e um único `h1`.
- Relacione Essência, Perfil e Contato aos respectivos `h2` com
  `aria-labelledby`.
- O screenshot novo não mostra breadcrumb; se ele continuar por obrigação do
  OpenSpec, evite duplicar a indicação de rota com conteúdo visual redundante.
- Modele valores, indicadores, credenciais e métodos de contato como listas.
- Dê alt contextual às imagens de processo e perfil botânico quando elas
  transmitirem informação; o hero pode ter alt vazio se for atmosférico.
- Ícones que repetem rótulos são decorativos e usam `aria-hidden`.
- Callouts informativos não recebem foco.
- Links usam foco visível de alto contraste sobre marfim, fotografia e verde
  profundo.
- Valide texto oliva, captions pequenas, bordas e indicadores em WCAG 2.2 AA.
- Ornamentos usam `aria-hidden="true"`, `focusable="false"` e
  `pointer-events: none`.

## Inventário de reuso

### Reusar sem mudar a responsabilidade

| Componente / contrato | Uso no alvo |
| --- | --- |
| `SiteFrame` ou shell sucessor | Skip link, `main` e rodapé full-bleed |
| `BrandLockup` | Marca na Navbar e no rodapé |
| `DisplayHeading` | Único `h1` do hero |
| `SectionHeading` | Essência, perfil e contato |
| `SupportingCopy` | Introduções e corpo editorial |
| `CardSurface` | Valores, contatos e base dos callouts quando compatível |
| `LineIcon` | Valores, indicadores visuais, credenciais, contatos e rodapé |
| `BotanicalDecoration` | Line art semântico oculto |
| `SiteFooter` | Rodapé global |
| Tipos de contato configurado/indisponível | Estados verdadeiros dos métodos de contato |

### Evoluir por API pequena ou composição local

| Componente / contrato | Evolução sugerida | Restrição |
| --- | --- | --- |
| `SiteHeader` | Consumir navegação desktop e CTA global | Não manter uma instância por rota |
| `AboutHero` | Eyebrow, history anchor e statement opcional | Não acoplar comportamento global da Navbar |
| `AboutEssenceContent` | Callout e indicadores tipados | Números exigem aprovação editorial |
| `EssenceSection` | Grade desktop em 3 zonas | Preservar mídia → texto → indicadores na ordem DOM |
| `FounderSection` | Migrar para `TeamProfileSection`/domínio neutro | Não manter nomenclatura pessoal sem pessoa no conteúdo |
| Mídia do perfil | Aceitar imagem botânica configurada | Não chamar de retrato quando não identifica uma pessoa |
| `AboutContactContent` | Supporting copy introdutório | Preservar união discriminada dos estados de contato |
| Conteúdo global | Adicionar destino `Contato` e definir rótulo do CTA | Fonte única para desktop, mobile e rodapé |

## Lacunas e divergências

1. **Breadcrumb versus eyebrow:** o OpenSpec exige `Início > Sobre`; o screenshot
   mostra somente `SOBRE`. Definir qual contrato prevalece antes da alteração.
2. **Perfil pessoal versus equipe:** o OpenSpec descreve retrato e registro; a nova
   referência usa identidade institucional e fotografia de folhas.
3. **Navbar por rota versus global:** o código atual instancia o header em
   `AboutPage`; o alvo e o mapa da Navbar exigem propriedade no layout.
4. **Rótulo do CTA:** o screenshot mostra `Fale conosco`; o mapa global registra
   `Fale no WhatsApp`; o conteúdo atual só possui e-mail configurado.
5. **Destino da chamada de história:** confirmar se aponta para Essência e qual ID
   público deve ser estável.
6. **Indicadores:** confirmar autorização e fonte para `+100` e `100%`.
7. **Frase manuscrita:** definir se é HTML, SVG ou parte licenciada da fotografia.
8. **Ativos:** fornecer imagens finais, licenças, dimensões, crops e pontos focais
   para hero, processo e perfil.
9. **Callouts:** confirmar se são conteúdo editorial obrigatório ou apenas direção
   visual; ambos aparecem legíveis e, portanto, não devem ser tratados
   automaticamente como decoração.
10. **Contato no rodapé:** a navegação atual possui 4 itens; a referência mostra 5.
11. **Breakpoint desktop:** definir por teste de colisão da Navbar, não pela largura
    física de 907 px do PNG.
12. **Estado ativo da Navbar:** a imagem não prova indicador visual em `Sobre`;
    manter `aria-current` e seguir a decisão global.

## Direção sugerida para uma futura implementação

1. Atualizar o OpenSpec ou registrar uma nova mudança que resolva breadcrumb,
   perfil institucional, indicadores, CTA e navegação global.
2. Implementar primeiro a Navbar persistente conforme seu mapa próprio; retirar o
   header da composição de `AboutPage`.
3. Evoluir o conteúdo tipado da rota para callouts, indicadores e supporting copy,
   sem colocar strings diretamente nos componentes.
4. Ajustar `AboutHero` e `EssenceSection`, preservando Server Components e usando
   links nativos para navegação/âncora.
5. Renomear o domínio `Founder` para equipe/perfil e trocar o placeholder por mídia
   aprovada sem carregar semântica de retrato pessoal.
6. Ajustar contato e rodapé a partir da fonte global compartilhada.
7. Adicionar/atualizar testes semânticos, estados de contato, item atual, destino da
   âncora e regressão das demais rotas.
8. Validar TypeScript, Jest, lint conforme ressalva do projeto, build e inspeção
   visual no desktop de referência, desktop largo e largura limite da Navbar.
9. Auditar teclado, foco, contraste, textos alternativos e movimento reduzido.

## Referências técnicas prováveis

- `app/layout.tsx`: proprietário futuro da Navbar persistente e da transição.
- `app/sobre/page.tsx`: composição da rota sem header local no alvo.
- `app/sobre/aboutContent.ts`: conteúdo tipado da página.
- `app/sobre/_components/AboutHero.tsx`: hero da rota.
- `app/sobre/_components/EssenceSection.tsx`: Essência, indicadores e valores.
- `app/sobre/_components/FounderSection.tsx`: implementação atual a renomear ou
  substituir por domínio institucional.
- `app/sobre/_components/ContactMethodsSection.tsx`: introdução e métodos.
- `app/_components/SiteHeader.tsx`: superfície atual da Navbar.
- `app/_components/MobileNavigation.tsx`: navegação mobile complementar.
- `app/_components/SiteFooter.tsx`: rodapé compartilhado.
- `app/_content/siteContent.ts`: destinos, navegação, contato e legal globais.
- `app/globals.css`: tokens, superfícies, grids, recortes e responsividade.
- `docs/UI-MAP-NAVBAR-DESKTOP.md`: propriedade, movimento e estados da Navbar.
- `docs/UI-MAP-MENU-MOBILE.md`: comportamento da navegação em larguras menores.
- `openspec/changes/build-about-page/`: especificação implementada que hoje diverge
  da nova referência em pontos editoriais e estruturais.

## Resultado esperado deste artefato

Permitir que uma futura mudança alinhe a versão desktop de `/sobre` ao screenshot
sem confundir conteúdo visual com instrução, sem publicar fatos não validados e
sem reintroduzir a Navbar dentro da página. O resultado deve preservar a narrativa
institucional, a identidade “jardim noturno editorial”, os estados verdadeiros de
contato e a acessibilidade do sistema compartilhado.
