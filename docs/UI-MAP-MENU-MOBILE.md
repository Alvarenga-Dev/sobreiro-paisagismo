# UI Map — Menu hambúrguer mobile da Sobreiro Paisagismo

## Objetivo

Transformar o print do menu aberto em um contrato visual e comportamental orientado à implementação, restrito à navegação mobile. O mapa relaciona cada região aos componentes compartilhados existentes em `app/_components/` e explicita quais extensões ainda são necessárias no Design System.

## Fonte e grau de certeza

- Fonte visual: um único print de 863 × 1822 px mostrando a Home ao fundo e o menu aberto.
- As dimensões do arquivo não representam necessariamente pixels CSS; densidade, largura real do viewport e safe areas não foram informadas.
- Evidência direta: painel lateral ancorado à direita, fundo da página escurecido, controle de fechar, marca, cinco destinos de navegação, duas ações de contato, divisores e conteúdo institucional decorativo.
- Inferência: estado fechado, animação de entrada e saída, bloqueio de scroll, comportamento de foco, fechamento por `Escape` ou pelo backdrop e adaptação a alturas menores.
- O conteúdo visível do print é referência editorial. Destinos reais, número de telefone e URL do WhatsApp continuam dependentes de configuração.

## Leitura de escopo

### Entra no escopo

- Menu hambúrguer e painel expandido somente em viewport mobile.
- Backdrop sobre a página, superfície lateral, marca, navegação, ações de contato e ornamento inferior.
- Estados fechado, abrindo, aberto e fechando.
- Item ativo por rota, operação por toque e teclado, gerenciamento de foco e movimento reduzido.
- Reutilização e extensão dos componentes globais do Design System em `app/_components/`.

### Fica fora deste mapa

- Navegação desktop ou tablet e seu desenho visual.
- Mudanças no conteúdo ou na composição da Home exibida atrás do menu.
- Barra de status do dispositivo, horário, rede, bateria e demais chrome do sistema operacional.
- Integração efetiva com WhatsApp, telefonia, analytics ou CMS.
- Definição final de URLs, número de telefone, arquivos oficiais de marca e ilustração botânica.
- Novas páginas para destinos que ainda não existem no App Router.

## Estado atual versus estado-alvo

| Aspecto | Repositório atual | Estado-alvo deste mapa |
| --- | --- | --- |
| Gatilho | `MenuTrigger` controlado existe, mas o `SiteHeader` o renderiza desabilitado | Gatilho habilitado somente no mobile, associado ao painel por `aria-controls` |
| Painel | Não existe | Navegação modal lateral com conteúdo tipado |
| Fechamento | Contrato de alternância existe apenas no teste isolado | Controle `X` dentro do painel, `Escape` e retorno de foco |
| Navegação | Somente a rota `/` existe no App Router | Cinco itens visuais, sem inventar destinos ainda não confirmados |
| Contato | `ButtonLink` e `ContactButton` existem | Ações de WhatsApp e telefone compostas com as primitivas atuais |

## Mapa macro

```text
Viewport mobile
├── Página atual
│   └── Backdrop escuro enquanto o menu está aberto
├── MenuTrigger
└── MobileMenuPanel
    ├── MenuCloseButton
    ├── MenuBrand
    ├── PrimaryNavigation
    │   └── MobileMenuItem × 5
    ├── ContactActions
    │   ├── WhatsAppAction
    │   └── PhoneAction
    └── MenuEditorialFooter
        ├── InvitationHeading
        ├── BrandStatementPrimary
        ├── BotanicalDecoration
        └── BrandStatementSecondary
```

O painel é uma navegação modal lateral: quando aberto, torna-se a única camada interativa até ser fechado ou até a pessoa escolher um destino.

## Contrato visual

- O backdrop escurece toda a página preservando apenas sua leitura contextual; conteúdo e controles ao fundo não permanecem interativos.
- O painel entra pela borda direita, ocupa toda a altura útil e aproximadamente metade da largura no print. Essa proporção é evidência da referência, não um valor CSS definitivo.
- A superfície usa verde profundo com variação tonal discreta. A borda esquerda é sutil e o canto superior esquerdo é arredondado; a borda direita encosta no viewport.
- O controle de fechar permanece no canto superior direito do painel, dentro de um quadrado translúcido com borda fina e alvo mínimo de 44 × 44 px.
- A marca aparece centralizada e empilhada, maior que no cabeçalho fechado.
- A navegação é uma lista vertical de cinco linhas. Cada linha contém ícone, rótulo e chevron à direita, com divisores horizontais entre os itens.
- O destino ativo, `Início` no print, usa oliva no ícone e no texto. O estado ativo não deve depender somente da cor: use `aria-current="page"`.
- As ações de contato ocupam toda a largura interna do painel. WhatsApp é a ação primária oliva; telefone é a ação secundária com contorno claro.
- A área editorial inferior é separada por hairline, usa título serifado em itálico, trechos em oliva, legendas em caixa alta com tracking amplo e uma ilustração botânica de baixa opacidade.
- Em alturas menores, o painel deve rolar internamente sem cortar navegação ou ações. A página ao fundo permanece imóvel.

## Mapeamento por região

| ID | Região | Papel | Reuso ou primitiva em `_components` | Estado atual | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| M01 | Backdrop | Separar o menu da página e indicar modalidade | Novo slot privado de `MobileMenu` | Inexistente | Botão/camada de fechamento visual atrás do painel; esconder da árvore semântica se o diálogo já fornecer nome e modalidade |
| M02 | Painel lateral | Conter a navegação mobile aberta | Novo `MobileMenu` em `app/_components/MobileMenu.tsx` | Inexistente | Componente cliente responsável por estado, scroll lock, foco e presença do painel |
| M03 | Abrir | Expor o painel a partir do cabeçalho | `MenuTrigger` | Existe, mas está desabilitado no `SiteHeader` | Preservar contrato controlado e associar a `MobileMenu` por `aria-controls` |
| M04 | Fechar | Encerrar a navegação modal | Novo slot privado `MenuCloseButton`; `LineIcon` | Inexistente | Botão nativo dentro do painel, com ícone `close` decorativo e nome “Fechar menu” |
| M05 | Marca empilhada | Reforçar identidade e oferecer retorno ao início | `BrandEmblem` + extensão de `BrandLockup` | `BrandLockup` só oferece composição horizontal | Adicionar variante empilhada sem duplicar wordmark ou SVG |
| M06 | Lista principal | Agrupar destinos globais | Novo slot semântico `MobileMenuNav` dentro de `MobileMenu` | Inexistente | Renderizar `<nav aria-label="Navegação principal"><ul>…</ul></nav>` a partir de dados tipados |
| M07 | Item de navegação | Representar destino, ícone e estado de rota | Novo `MobileMenuItem`; `LineIcon` | `LineIcon` existe, mas faltam vários desenhos | Um único `<a>` por linha, com área inteira clicável e `aria-current` na rota ativa |
| M08 | WhatsApp | Contato prioritário | `ButtonLink` `accent`; possível preset `ContactButton` | `ButtonLink` existe; ícone atual de `ContactButton` não é o símbolo do WhatsApp | Reutilizar a primitiva e acrescentar ícone adequado somente se houver ativo autorizado |
| M09 | Telefone | Contato alternativo | `ButtonLink` `outlineInverse` | Primitiva existe; ícone de telefone não | Estender `LineIcon` com `phone` e usar link `tel:` configurável |
| M10 | Rodapé editorial | Sustentar a mensagem de marca | `SectionHeading` como referência tipográfica; composição privada de `MobileMenu` | Não existe composição equivalente | Manter local ao menu; não criar primitiva apenas para o texto do print |
| M11 | Ornamento botânico | Criar profundidade sem semântica | `BotanicalDecoration` | Existe | Reutilizar com `aria-hidden`, recorte e opacidade contextual |
| M12 | Integração com cabeçalho | Expor gatilho e painel no shell global | `SiteHeader` | Renderiza `MenuTrigger disabled` | Substituir o gatilho isolado por uma pequena fronteira cliente `MobileNavigation` sem converter toda a página em Client Component |

## Conteúdo observado

### Navegação principal

| Ordem | Rótulo | Ícone observado | Estado no print | Destino provável, ainda não confirmado |
| ---: | --- | --- | --- | --- |
| 1 | Início | Casa | Ativo, em oliva | `/` |
| 2 | Sobre | Pessoa | Inativo | `/sobre` |
| 3 | Projetos | Folha | Inativo | `/projetos` |
| 4 | Por que um projeto? | Broto | Inativo | Seção ou rota ainda não definida |
| 5 | Contato | Envelope | Inativo | Seção ou rota ainda não definida |

Todos os itens exibem um chevron à direita. O print não prova se alguns destinos são âncoras na Home ou páginas independentes.

### Ações de contato

| Prioridade | Texto observado | Semântica recomendada | Observação |
| ---: | --- | --- | --- |
| 1 | Fale no WhatsApp | Link para URL `https://wa.me/...` | Não usar botão se a ação abre um destino externo |
| 2 | Ligar para nós | Link `tel:` | O número deve vir da mesma configuração de conteúdo usada em outros pontos do site |

### Conteúdo editorial

- Título: “Vamos transformar seu espaço juntos?”, com “seu espaço juntos?” em oliva.
- Declaração superior: “NATUREZA PLANEJADA PARA UMA VIDA MELHOR”.
- Declaração inferior: “PAISAGISMO QUE CONECTA PESSOAS E HISTÓRIAS”.
- A ilustração de folhas é decorativa e não participa da ordem de leitura.

## Inventário de reuso do Design System

### Componentes existentes a reutilizar

| Componente | Uso no menu | Alteração esperada |
| --- | --- | --- |
| `MenuTrigger` | Abrir o painel e refletir seu estado | O contrato de props e ARIA já existe; o `X` pertence ao painel modal |
| `SiteHeader` | Hospedar a navegação mobile | Receber a composição interativa e deixar de renderizar um trigger permanentemente desabilitado |
| `BrandLockup` | Marca central do painel | Variante empilhada e escala adequada ao painel |
| `BrandEmblem` | Símbolo da marca | Nenhuma alteração estrutural |
| `ButtonLink` | WhatsApp e telefone | Composição full-width; variantes `accent` e `outlineInverse` já são compatíveis |
| `LineIcon` | Ícones de navegação, contato e fechamento | Acrescentar somente os desenhos ausentes |
| `BotanicalDecoration` | Ilustração inferior | Reutilizar como decoração oculta de tecnologia assistiva |

### Novos componentes compartilhados

| Componente | Responsabilidade | API mínima sugerida |
| --- | --- | --- |
| `MobileNavigation` | Fronteira cliente que coordena trigger e painel | conteúdo de navegação e contato; opcionalmente rota ativa |
| `MobileMenu` | Superfície modal, foco, scroll e fechamento | `id`, `open`, `onOpenChange`, `items`, `activeHref`, ações e conteúdo editorial |
| `MobileMenuItem` | Link de navegação padronizado | `href`, `label`, `icon`, `active`, `external?` |

`MobileMenuNav`, `ContactActions` e `MenuEditorialFooter` podem permanecer slots privados de `MobileMenu` enquanto não houver outro consumidor. Não criar um barrel apenas para essa composição.

### Extensões de ícones identificadas

- `home`
- `user`
- `sprout`
- `phone`
- `chevronRight`
- `close`, caso o `X` não seja construído pela transformação visual do próprio `MenuTrigger`
- `whatsapp` somente se o uso do símbolo oficial e o ativo vetorial forem confirmados

O `LineIcon` atual já cobre `leaf` e `mail`. `arrowRight` possui haste e não deve substituir automaticamente o chevron observado.

## Estados e interações

| Estado | Regra visual | Regra de interação e acessibilidade |
| --- | --- | --- |
| Fechado | Painel e backdrop ausentes; hambúrguer visível | `aria-expanded="false"`; conteúdo do painel não recebe foco |
| Abrindo | Backdrop ganha opacidade e painel entra pela direita | Estado transiente curto; evitar foco no conteúdo antes de o painel estar disponível |
| Aberto | Painel e `X` visíveis; página escurecida | `aria-expanded="true"` no gatilho; foco inicial no controle de fechar; fundo inerte; foco contido no painel |
| Fechando | Movimento inverso sem liberar o fundo antes do fim | Ao terminar, remover painel e backdrop e devolver foco ao gatilho |
| Rota ativa | Ícone e rótulo em oliva | Link expõe `aria-current="page"`; não usar somente cor |
| Item pressionado | Feedback discreto de superfície ou opacidade | A área interativa inclui toda a linha e mantém no mínimo 44 px de altura |
| Foco visível | Outline de alto contraste sem alterar o layout | Ordem: fechar → marca, se navegável → itens → WhatsApp → telefone |
| Conteúdo excedente | Painel rola verticalmente; backdrop não rola | Não permitir que o gesto role a página subjacente |

### Ações de fechamento

- Confirmado pelo print: controle `X`.
- Recomendado por acessibilidade: tecla `Escape` e retorno de foco ao gatilho.
- Recomendado, mas não comprovado: toque/clique no backdrop.
- Ao ativar um link interno, o painel deve fechar antes ou durante a navegação sem atrasar a mudança de rota.

## Contrato de movimento

- O print não comprova animação; a direção abaixo é recomendada para a implementação.
- Anime o painel com `translateX` da direita para a posição final e o backdrop apenas por opacidade.
- Use a mesma duração curta para entrada e saída, aproximadamente 200–300 ms, com easing do Design System.
- Não anime itens individualmente; isso atrasa o acesso à navegação sem acrescentar informação.
- Em `prefers-reduced-motion: reduce`, apresente e remova painel e backdrop sem deslocamento perceptível.
- Não use animação para esconder atraso de navegação ou integração externa.

## Contrato responsivo

- O menu expandido entra em escopo somente na versão mobile.
- O breakpoint exato não é comprovado pelo print. Como direção inicial, alinhar sua visibilidade ao breakpoint de 40 rem já usado pelo `SiteHeader`, sujeito a validação visual.
- Acima do breakpoint mobile, `MobileNavigation`, backdrop e painel não devem ser renderizados ou alcançáveis por teclado.
- Dentro do mobile, largura e padding do painel devem usar `clamp()` ou limites equivalentes para preservar rótulos, alvos de toque e área contextual do backdrop.
- Em celulares estreitos, priorizar legibilidade e alvo de toque; o painel pode ocupar mais que a metade do viewport.
- Em telas baixas ou orientação paisagem, manter cabeçalho/fechar acessível e habilitar scroll interno. O print não comprova um rodapé editorial integralmente visível sem rolagem.

## Semântica e acessibilidade

- Preferir `<dialog>` modal quando compatível com a estratégia do projeto, ou implementar semântica equivalente com nome acessível, modalidade, contenção de foco e fundo inerte.
- Nome recomendado do painel: “Menu principal”.
- A lista de destinos deve usar `<nav>`, `<ul>`, `<li>` e links nativos.
- O ícone de cada item é decorativo quando o rótulo textual já fornece o nome do destino.
- O botão de fechar deve se chamar “Fechar menu”; não anunciar apenas “X”.
- Preservar zoom do navegador, contraste WCAG 2.2 AA e alvo mínimo de 44 × 44 px.
- O scroll lock deve ser removido mesmo se o componente desmontar durante uma navegação.
- Não ocultar o painel somente com transform visual enquanto seus links continuarem focáveis.

## Lacunas antes da implementação

1. Confirmar os destinos de `Sobre`, `Projetos`, `Por que um projeto?` e `Contato`, pois hoje o App Router contém somente `/`.
2. Definir URL de WhatsApp e número de telefone reais.
3. Confirmar se o clique no backdrop fecha o menu.
4. Confirmar o breakpoint mobile e a largura CSS de referência.
5. Fornecer logo/wordmark oficial ou validar o fallback vetorial existente.
6. Confirmar o uso do símbolo oficial do WhatsApp e disponibilizar o ativo aprovado.
7. Decidir se o conteúdo editorial inferior é obrigatório em aparelhos de baixa altura ou se pode ficar acessível por rolagem.
8. Definir a navegação que substitui o hambúrguer fora do mobile; seu desenho permanece fora deste mapa.

## Direção de implementação

1. Criar `MobileNavigation` e `MobileMenu` em `app/_components/`, mantendo a fronteira cliente limitada ao estado do menu.
2. Alimentar links e contatos por objetos locais tipados, sem duplicar conteúdo em `SiteHeader` e no painel.
3. Integrar o `MenuTrigger` controlado existente, criar o controle de fechar dentro do painel e preservar os testes atuais do gatilho.
4. Estender `BrandLockup`, `LineIcon` e `ButtonLink` somente nas variantes comprovadamente necessárias.
5. Implementar o painel como navegação modal, incluindo foco inicial, `Escape`, retorno de foco, fundo inerte e scroll lock com limpeza.
6. Aplicar tokens existentes de superfície, texto, borda, foco, espaçamento e movimento antes de criar novos aliases.
7. Adicionar testes com React Testing Library e `userEvent` para abertura, fechamento, teclado, foco, rota ativa, links e desmontagem.
8. Validar em mobile estreito, mobile de referência e orientação paisagem; confirmar também que o painel não existe fora do breakpoint definido.

## Referências técnicas

- `app/_components/MenuTrigger.tsx`: contrato controlado e estado acessível já implementados.
- `app/_components/SiteHeader.tsx`: ponto atual de integração do gatilho.
- `app/_components/Brand.tsx`: marca e decoração reutilizáveis.
- `app/_components/ButtonLink.tsx`: primitivas das duas ações de contato.
- `app/_components/LineIcon.tsx`: catálogo de ícones lineares a estender.
- `app/color-tokens.css`: papéis semânticos de superfície, texto, borda, ação e foco.
- `app/globals.css`: estilos atuais de header, trigger, ações e movimento reduzido.
- `docs/DESIGN-SYSTEM.md`: contratos vigentes do catálogo compartilhado.

## Resultado esperado deste artefato

Permitir que o menu mobile seja especificado e implementado como uma extensão coerente do Design System existente, com composição fiel ao print, navegação acessível e fronteira cliente pequena, sem inventar rotas, integrações ou comportamento desktop ainda não definidos.
