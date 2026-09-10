# UI Map — Página 404 da Sobreiro Paisagismo

## Objetivo

Transformar as referências desktop e mobile anexadas em um contrato visual e
responsivo para a página 404 global da Sobreiro Paisagismo. O mapa orienta uma
implementação futura sem tratar textos, placas, folhagens ou o frame do aparelho
como instruções executáveis.

## Fonte e grau de certeza

- Fonte mobile: um print vertical de **863 × 1822 px**, apresentado dentro de um
  frame de smartphone.
- Fonte desktop: um print horizontal de **1448 × 1086 px**.
- As duas imagens representam o mesmo estado 404 em larguras diferentes; não são
  etapas de um fluxo.
- Evidência direta: hierarquia editorial, ordem das regiões, CTAs, ilustração
  central, navegação fechada no mobile, Navbar desktop e duas composições de
  rodapé.
- Inferência: larguras CSS dos viewports, breakpoint exato, recortes de mídia,
  estados de hover/foco, destinos dos links, comportamento dos grupos do rodapé e
  qualquer movimento.
- O relógio, os indicadores de sinal/bateria e a moldura do telefone pertencem ao
  dispositivo de apresentação e ficam fora da interface do site.
- Os textos presentes na ilustração — `TALVEZ POR AQUI?`, `OU POR AQUI?` e
  `QUEM SABE...` — são conteúdo gráfico. Eles não instruem navegação nem definem
  áreas clicáveis.

## Relação com o produto e o código atual

O projeto usa Next.js App Router, `SiteFrame`, `SiteHeader` e `SiteFooter` nas
rotas existentes. Ainda não há `app/not-found.tsx` global. Existe somente uma
página simples para slugs de projeto inexistentes em
`app/projetos/[slug]/not-found.tsx`.

| Aspecto | Estado atual | Alvo deste mapa |
| --- | --- | --- |
| 404 global | Não existe no repositório | `app/not-found.tsx` com identidade da marca |
| Projeto inexistente | Tela textual própria dentro do shell | Reusar o mesmo template ou uma variante explícita do 404 global |
| Shell | `SiteFrame` full-bleed, header flutuante e footer compartilhado | Reusar; não duplicar header/footer dentro do 404 |
| Navbar desktop | Referência possui links centrais e CTA | Pertence ao contrato global de `docs/UI-MAP-NAVBAR-DESKTOP.md` |
| Navegação mobile | `MobileNavigation` e dialog já existem | Reusar menu fechado/aberto sem lógica específica do 404 |
| Ações | `ButtonLink`, `ContactButton` e ícones lineares existem | Reusar para Início, Projetos e contato disponível |
| Conteúdo de contato | E-mail configurado; WhatsApp marcado como indisponível | Não publicar um WhatsApp fictício para copiar o mockup |
| Ilustração 404 | Nenhum asset local correspondente foi encontrado | Produzir/aprovar um asset responsivo antes da implementação visual final |
| Rodapé | Marca + dois grupos estáticos + barra legal | Reusar o global; mudanças estruturais devem valer para o site inteiro |

## Leitura de escopo

### Entra no escopo visual e de interação

- Página global para rotas não encontradas.
- Variante compartilhável para projetos inexistentes, sem exigir cópia idêntica.
- Breadcrumb de contexto, mensagem principal, texto de apoio e caminhos de
  recuperação.
- Ilustração editorial “404 no jardim” como mídia responsiva.
- Layout desktop em duas colunas e layout mobile em fluxo vertical.
- Estados essenciais de foco, hover, toque, movimento reduzido e contato
  indisponível.
- Comportamento responsivo do conteúdo próprio do 404.
- Reuso do cabeçalho, navegação, rodapé, conteúdo global e tokens existentes.

### Fica fora deste mapa

- Implementação da página, geração da ilustração ou alteração de rotas.
- Reprodução do frame do smartphone, barra de status, câmera, botões físicos ou
  fundo externo preto do aparelho.
- Transformação das placas da ilustração em links.
- Definição de número, conta ou URL de WhatsApp ainda não configurados.
- Redesign exclusivo do cabeçalho ou rodapé para a página 404.
- Analytics, registro de URLs quebradas, busca, formulário, CMS, API ou
  persistência.
- Redirecionamento automático, contagem regressiva ou tentativa de adivinhar o
  destino pretendido.
- Animações de pássaro, folhas, luzes, placas ou ferramentas: os prints não
  comprovam movimento.

## Fluxo atual versus fluxo alvo

| Momento | Fluxo atual | Fluxo alvo |
| --- | --- | --- |
| URL global desconhecida | Cai no tratamento padrão do framework | Exibe 404 da marca dentro do shell global |
| Slug de projeto desconhecido | Exibe `Projeto não encontrado` com um único retorno | Usa o mesmo padrão visual, podendo preservar texto contextual de projeto |
| Recuperação principal | Depende do tipo de rota | Oferece Início e Projetos em ordem explícita |
| Contato | Não aparece na tela de projeto inexistente | Só aparece se houver canal válido configurado |
| Navegação global | Disponível pelo shell da rota de projeto | Permanece disponível em qualquer 404 |

Não redirecione sem consentimento. A pessoa deve continuar entendendo que o
endereço não existe e escolher o próximo caminho.

## Mapa macro

### Desktop

A tela organiza o conteúdo como `header flutuante → hero claro em duas colunas →
footer escuro`. A coluna esquerda concentra contexto, mensagem e ações; a direita
concentra a ilustração e a frase editorial.

| Ordem | Região | Posição observada | Composição |
| --- | --- | --- | --- |
| 1 | Cabeçalho global | Insetado sobre o topo do hero | Marca, links, estado ativo e CTA de contato |
| 2 | Breadcrumb | Topo esquerdo do conteúdo | Ícone de Início, divisor linear e rótulo atual |
| 3 | Mensagem | Coluna esquerda | `h1` serifado com uma palavra em oliva + parágrafo |
| 4 | Ações | Coluna esquerda, abaixo da mensagem | Dois botões na mesma linha + contato textual abaixo |
| 5 | Ilustração 404 | Coluna direita, área dominante | Números, vegetação, placas, pássaro e ferramentas |
| 6 | Epílogo | Centralizado sob a ilustração | Frase em itálico + divisor botânico |
| 7 | Rodapé global | Full-bleed na base | Marca, navegação, serviços, contato e barra legal na referência |

### Mobile

A tela organiza o conteúdo como `header compacto → mensagem → ilustração →
epílogo → ações → footer`. O conteúdo utiliza uma coluna e botões de largura
total, preservando respiro lateral.

| Ordem | Região | Composição observada |
| --- | --- | --- |
| 1 | Cabeçalho global | Marca à esquerda e menu hambúrguer à direita |
| 2 | Breadcrumb | Uma linha curta acima do título |
| 3 | Mensagem | Título em 2 linhas e parágrafo em 3 linhas na largura de referência |
| 4 | Ilustração 404 | Mídia larga com recorte horizontal preservado |
| 5 | Epílogo | Frase centralizada e ornamento abaixo |
| 6 | Ações | Primária e secundária empilhadas; contato textual centralizado |
| 7 | Rodapé global | Marca, redes, grupos compactos e barra legal |

As proporções dos PNGs orientam ritmo e hierarquia, não alturas fixas. A página
deve crescer com zoom, tradução e quebra de texto.

## Árvore de composição proposta

```text
NotFoundPage
└── SiteFrame (reuso; fullBleed)
    ├── SiteHeader (reuso; apresentação definida pelo shell global)
    ├── NotFoundSection
    │   └── NotFoundInner
    │       ├── NotFoundBreadcrumb
    │       ├── NotFoundMessage
    │       │   ├── ErrorEyebrow (visualmente discreto: “Erro 404”)
    │       │   ├── DisplayHeading
    │       │   └── SupportingCopy
    │       ├── NotFoundArtwork
    │       │   ├── ResponsiveArtwork
    │       │   └── NotFoundEpilogue
    │       │       └── BotanicalDivider
    │       └── NotFoundActions
    │           ├── HomeAction
    │           ├── ProjectsAction
    │           └── ConfiguredContactAction (condicional)
    └── SiteFooter (reuso)
```

`NotFoundMessage`, `NotFoundArtwork` e `NotFoundActions` podem permanecer privados
ao template. Só promova uma peça para `app/_components` se outro consumidor usar
o mesmo contrato, não apenas uma aparência parecida.

## Contrato visual da tela

- Use marfim como superfície do 404 e verde quase preto no shell global.
- Preserve o contraste editorial entre título serifado e corpo/controles sem
  serifa.
- Limite o texto a uma coluna de leitura curta. No desktop, o título deve ocupar
  aproximadamente metade da largura útil; no mobile, deve quebrar naturalmente.
- Aplique oliva somente em `jardim.` e em detalhes controlados. Não transforme
  cada ícone, divisor e texto em acento de igual intensidade.
- Trate a ilustração como o foco visual, mas mantenha a mensagem de erro e as
  ações compreensíveis sem ela.
- A ilustração pode ser um único asset com transparência ou fundo compatível com
  a superfície. Use `object-fit: contain`; não corte os números `404`, o pássaro
  ou as ferramentas em larguras suportadas.
- Se um único arquivo não sustentar os dois recortes, use `<picture>` ou duas
  fontes com a mesma narrativa, mantendo o DOM e o texto alternativo estáveis.
- Ornamentos botânicos de canto são decorativos, ficam atrás do conteúdo, usam
  baixa opacidade e nunca recebem eventos de ponteiro.
- Desktop: organize mensagem/ações e artwork em duas colunas, com a mídia como
  área dominante.
- Mobile: empilhe em uma coluna e mova visualmente a mídia para antes das ações,
  como no print. A ordem semântica pode priorizar mensagem e caminhos de
  recuperação, desde que foco e leitura permaneçam previsíveis.
- Preserve ao menos 44 × 44 px para controles e espaço suficiente para foco
  visível sem corte por `overflow`.
- Não force o rodapé para fora da tela com uma altura fixa. Use `min-height` no
  conteúdo somente se necessário para evitar um vazio desproporcional.

## Mapeamento por região

| ID | Região | Papel | Reuso atual | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| E01 | Shell | Fornecer skip link, header, `main` e footer | `SiteFrame` | Implementado | Reusar `fullBleed`; não criar um frame do aparelho |
| E02 | Cabeçalho | Manter identidade e navegação global | `SiteHeader`, `BrandLockup`, `MobileNavigation` | Implementado; Navbar desktop completa ainda tem mapa próprio | Consumir a configuração global vigente, sem fork para 404 |
| E03 | Seção 404 | Agrupar conteúdo e definir a superfície clara | Padrões das páginas internas | Não existe | Criar seção local ligada ao `h1` por `aria-labelledby` |
| E04 | Breadcrumb | Oferecer retorno imediato e indicar estado atual | `LineIcon` | Não há primitive compartilhada | Usar `nav` + lista; criar primitive só após reuso comprovado |
| E05 | Eyebrow de erro | Tornar o código 404 textual, não dependente da imagem | Tipografia utilitária existente | Não existe no not-found atual | Exibir `Erro 404` ou disponibilizar equivalente para tecnologia assistiva |
| E06 | Título | Explicar o erro em linguagem da marca | `DisplayHeading` | Implementado | Usar um único `h1` com fragmento oliva em `jardim.` |
| E07 | Apoio | Confirmar que a página não foi encontrada e orientar | `SupportingCopy` | Implementado | Manter curto, direto e independente da ilustração |
| E08 | Artwork | Criar reconhecimento e personalidade | `next/image`; tratamento de mídia existente | Asset ausente | Aprovar arquivo local, dimensões intrínsecas, `sizes` e política de recorte |
| E09 | Placas e objetos | Compor a narrativa visual | Parte do artwork | Não existem isoladamente | Manter incorporados à imagem e sem áreas clicáveis |
| E10 | Epílogo | Conectar a ilustração aos caminhos de recuperação | Tipografia editorial + ornamento existente | Não existe como conjunto | Implementar como conteúdo curto; ornamento oculto semanticamente |
| E11 | Ações principais | Levar a destinos internos seguros | `ButtonLink`, `ActionGroup`, `LineIcon` | Implementados | Primária para `/`; secundária para `/projetos` |
| E12 | Contato | Oferecer ajuda humana opcional | `ContactButton`, `siteContent` | Somente e-mail configurado | Renderizar canal real; WhatsApp somente após configuração explícita |
| E13 | Rodapé | Manter navegação e informações globais | `SiteFooter` | Implementado com estrutura diferente do mockup | Reusar fonte global; não copiar grupos fictícios da referência |
| E14 | Projeto inexistente | Tratar slug inválido com consistência | `app/projetos/[slug]/not-found.tsx` | Implementado com visual simples | Reusar o template com copy contextual ou encaminhar à variante global |
| E15 | Decorações de borda | Reforçar linguagem botânica | `BotanicalDecoration` | Implementado em outras regiões | Reusar ou criar composição local puramente decorativa |

## Conteúdo observado e conteúdo recomendado

Os textos abaixo registram a referência. A redação pode ser ajustada antes da
implementação, mas o sentido e a hierarquia devem permanecer.

| Região | Conteúdo observado | Contrato recomendado |
| --- | --- | --- |
| Breadcrumb | `Página não encontrada` | Link `Início` + item atual `Página não encontrada` |
| Código | O número `404` aparece somente na arte | Acrescentar `Erro 404` como texto discreto ou acessível |
| Título | `Ops! Essa página se perdeu no jardim.` | Manter como `h1`; acentuar somente `jardim.` |
| Corpo | `A página que você está procurando não foi encontrada, mas ainda podemos te ajudar a encontrar inspiração para o seu espaço.` | Manter ou revisar editorialmente sem alterar a função |
| Epílogo | `Enquanto isso, que tal explorar outros caminhos?` | Manter como texto informativo, não como heading obrigatório |
| Primária | `Voltar para o início` | Link para `/` com ícone de casa |
| Secundária | `Ver projetos` | Link para `/projetos` com ícone de grade |
| Terciária | `Falar no WhatsApp` | Condicional a um `href` real; fallback editorial para o e-mail configurado |

O breadcrumb observado mostra um ícone de casa sem o rótulo `Início`. Para
acessibilidade, o link precisa de nome acessível mesmo se o texto continuar
visualmente oculto. O item atual usa `aria-current="page"`.

## Contrato responsivo

As referências não definem um breakpoint numérico. A mudança deve acontecer
quando duas colunas deixarem de sustentar o título, as ações e o artwork sem
compressão; **64rem é apenas um ponto inicial de validação**, não um valor extraído
do print.

| Faixa de comportamento | Layout | Ações | Mídia | Shell global |
| --- | --- | --- | --- | --- |
| Estreita | Uma coluna: breadcrumb → mensagem → artwork/epílogo → ações | Botões em largura total; contato centralizado | `contain`, largura disponível e proporção reservada | Header compacto; footer segue variante global estreita |
| Intermediária | Uma coluna mais larga ou duas colunas somente se o conteúdo couber | Podem continuar empilhadas | Mantém números completos e altura previsível | Não antecipar Navbar desktop se os links não couberem |
| Ampla | Grade assimétrica: conteúdo à esquerda, artwork à direita | Primária e secundária lado a lado; terciária abaixo | Ocupa a maior área visual e inclui epílogo | Navbar/rodapé globais em suas variantes amplas |

### Regras de ordem e quebra

- A mensagem precede todos os caminhos de recuperação na árvore acessível.
- No mobile, a ilustração pode aparecer visualmente entre a mensagem e as ações.
  Como ela não recebe foco, isso não altera a ordem de tabulação.
- A primária precede a secundária no DOM e na apresentação.
- Não reduzir rótulos nem esconder uma ação apenas para manter os botões na mesma
  linha; empilhar antes de comprimir.
- Em 320 px, zoom de 200% e textos ampliados, não deve existir rolagem horizontal.
- Safe areas pertencem ao shell/header. Não copie offsets do frame de iPhone para
  a seção 404.

## Estados e interações

| Estado | Regra visual | Regra de interação e acessibilidade |
| --- | --- | --- |
| Padrão | Mensagem e arte completas; ação inicial em destaque | Foco começa no documento/estratégia global, nunca é movido automaticamente para um CTA |
| Hover | Botões respondem com tokens existentes, sem salto de layout | Aplicar somente quando o dispositivo oferece hover |
| Foco visível | Outline de alto contraste sobre claro ou escuro | Não cortar outline; ordem: header → conteúdo → ações → footer |
| Pressionado | Feedback curto de cor/posição | Não atrasar navegação para concluir efeito visual |
| Mobile menu fechado | Hambúrguer visível no header | Reusar `MobileNavigation`; nenhum estado local do 404 |
| Mobile menu aberto | Dialog global cobre o conteúdo | Foco contido, Escape e restauração seguem o componente existente |
| WhatsApp indisponível | Ação do mockup não aparece como link falso | Omitir ou substituir por canal configurado com rótulo correspondente |
| Asset ausente/falha | Layout reserva espaço ou usa fallback discreto | Mensagem e ações continuam suficientes; não exibir alt redundante quebrado |
| Projeto inexistente | Copy pode citar projeto/portfólio | Preservar `h1`, destinos de recuperação e shell compartilhado |
| Movimento reduzido | Sem deslocamento, parallax ou entrada elaborada | Transição de rota pode usar corte ou fade mínimo conforme regra global |

## Contrato de movimento

Os prints não provam animação. A implementação deve permanecer estática por
padrão e herdar somente os movimentos já aprovados:

- `RouteTransition` pode controlar a entrada/saída da rota, sem animar header e
  footer separadamente caso eles se tornem persistentes.
- Botões usam as microinterações de `ButtonLink`.
- O menu usa o contrato de `MobileNavigation`.
- Não adicionar parallax, flutuação do pássaro, crescimento de plantas, brilho
  pulsante ou balanço das placas sem nova especificação.
- Em `prefers-reduced-motion: reduce`, remova deslocamentos e mantenha mudanças de
  estado imediatas.

## Acessibilidade e semântica

- Manter um único `h1` e ligar a seção com `aria-labelledby`.
- Representar breadcrumb como `nav aria-label="Breadcrumb"` e lista ordenada.
- Nomear o link de casa como `Início`, ainda que o rótulo visual seja somente o
  ícone.
- Usar links nativos para `/`, `/projetos` e contato; não usar `button` para
  navegação.
- Marcar o item atual do breadcrumb com `aria-current="page"`.
- Tratar ícones dentro de links nomeados como decorativos.
- Tornar a arte decorativa com `alt=""` quando `Erro 404` estiver expresso em
  texto. Se a arte carregar informação não repetida, usar alt curto, sem
  transcrever folhagem, ferramentas e placas em excesso.
- Manter ornamentos com `aria-hidden="true"`, `focusable="false"` e
  `pointer-events: none`.
- Garantir contraste WCAG 2.2 AA para corpo, links, foco e texto sobre oliva.
- Não depender da cor oliva para comunicar destino principal ou estado atual.

## Inventário de reuso

### Reusar sem mudar responsabilidade

| Componente / fonte | Uso no 404 |
| --- | --- |
| `SiteFrame` | Skip link, ordem estrutural e shell full-bleed |
| `SiteHeader` | Marca e navegação global |
| `MobileNavigation` | Menu compacto e dialog |
| `SiteFooter` | Rodapé global alimentado por conteúdo centralizado |
| `DisplayHeading` | `h1` com fragmento acentuado |
| `SupportingCopy` | Parágrafo explicativo |
| `ButtonLink` / `ActionGroup` | Links de recuperação |
| `LineIcon` | Casa, grade, mensagem e detalhes lineares |
| `BotanicalDecoration` | Folhagem semântica oculta, se o desenho for compatível |
| `siteContent` | Contato, navegação, rodapé e dados legais reais |
| Tokens em `globals.css` e `color-tokens.css` | Cor, tipografia, espaçamento, foco, motion e breakpoints por conteúdo |

### Extensões pequenas possíveis

| Contrato | Extensão | Restrição |
| --- | --- | --- |
| `LineIconName` | Adicionar `grid` se o ícone do botão for aprovado | Preservar `currentColor`, traço e acessibilidade existentes |
| Conteúdo global de contato | Configurar WhatsApp real | Não inferir telefone/URL a partir do mockup |
| Template 404 | Aceitar copy contextual opcional para `/projetos/[slug]` | Manter defaults globais e não criar um construtor genérico de páginas |

### Manter local ao 404

- `NotFoundSection` e sua grade responsiva.
- `NotFoundBreadcrumb`, até existir um segundo breadcrumb com o mesmo contrato.
- `NotFoundArtwork` e `NotFoundEpilogue`.
- Conteúdo editorial específico do erro.

## Lacunas e decisões pendentes

| Lacuna | Impacto | Decisão necessária |
| --- | --- | --- |
| Asset 404 final ausente | Impede fidelidade visual e validação de recorte | Aprovar origem, licença, formato, dimensões e art direction |
| WhatsApp indisponível | CTA terciário do mockup não pode funcionar | Configurar canal real ou usar e-mail com rótulo correspondente |
| Navbar desktop ainda não está no componente atual | Header amplo difere da referência | Implementar conforme `UI-MAP-NAVBAR-DESKTOP`, como mudança global |
| Footer mobile do mockup sugere accordions | Interação não é comprovada e o footer atual é estático | Manter footer global ou especificar evolução separada |
| Grupo `Serviços` e telefone do mockup não existem no conteúdo atual | Copiar criaria informação possivelmente falsa | Consumir somente `siteContent` aprovado |
| Estratégia entre 404 global e de projeto | Pode haver duas experiências concorrentes | Escolher template único com variante de copy ou substituir a tela local |
| Texto final | Pode exigir aprovação de marca | Confirmar título, apoio, epílogo e fallback de contato |

Nenhuma dessas lacunas impede criar a estrutura semântica, os destinos internos e
o layout responsivo. Elas impedem apenas publicar fielmente a arte e o canal de
WhatsApp observados.

## Direção de implementação sugerida

1. Criar `app/not-found.tsx` como Server Component e compor o shell compartilhado.
2. Extrair um `NotFoundView` compartilhado somente se o 404 de projeto for migrado
   na mesma mudança; caso contrário, começar local ao arquivo global.
3. Centralizar a copy e os destinos em um objeto tipado próximo da página.
4. Implementar a estrutura semântica sem depender do asset final.
5. Adicionar o artwork local via `next/image`, com dimensões intrínsecas, `sizes`,
   espaço reservado e recorte validado nos dois extremos.
6. Modelar a troca de composição com CSS Grid e media query por falha de conteúdo,
   não por detecção de dispositivo.
7. Reusar `ButtonLink`, tokens, header e footer; não copiar CSS exclusivo para
   controles já existentes.
8. Reconciliar `app/projetos/[slug]/not-found.tsx` com o novo contrato.
9. Adicionar testes de renderização, destinos, ausência de WhatsApp falso e copy
   contextual do projeto, além das validações TypeScript e build.
10. Validar visualmente em 320, 390, 768, 1024 e 1440 px, com zoom de 200%,
    teclado e movimento reduzido.

## Referências técnicas prováveis

- `app/not-found.tsx` — novo ponto global do App Router.
- `app/projetos/[slug]/not-found.tsx` — estado local já existente a reconciliar.
- `app/_components/SiteFrame.tsx` — shell, skip link e `main`.
- `app/_components/SiteHeader.tsx` — cabeçalho compartilhado.
- `app/_components/MobileNavigation.tsx` — navegação mobile.
- `app/_components/SiteFooter.tsx` — rodapé compartilhado.
- `app/_components/ButtonLink.tsx` — CTAs navegacionais.
- `app/_components/Typography.tsx` — título e corpo.
- `app/_components/LineIcon.tsx` — ícones lineares.
- `app/_components/Brand.tsx` — marca e ornamentos botânicos.
- `app/_content/siteContent.ts` — navegação, contato e conteúdo legal aprovado.
- `app/globals.css` — composição responsiva e estados.
- `app/color-tokens.css` — papéis semânticos de cor.
- `docs/UI-MAP-NAVBAR-DESKTOP.md` — contrato separado da Navbar ampla.
- `docs/DESIGN-SYSTEM.md` — regras atuais de reuso e foundations.

## Resultado esperado deste artefato

Uma futura implementação deve produzir uma única experiência 404 responsiva,
reconhecível como parte da Sobreiro, útil mesmo sem a ilustração e consistente com
o shell global. Desktop e mobile mudam a composição, não a semântica, os destinos
ou a fonte de conteúdo. Qualquer canal de contato, grupo de rodapé ou asset só
entra quando existir como dado real e aprovado.
