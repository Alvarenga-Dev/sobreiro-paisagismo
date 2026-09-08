# UI Map — Página Sobre da Sobreiro Paisagismo

## Objetivo

Transformar o print anexado da página **Sobre** em um contrato visual orientado à
implementação, preservando o Design System já existente em `app/_components` e
mantendo na rota apenas as composições que são específicas desta página.

## Fonte e grau de certeza

- Fonte: um único print vertical, exportado com **842 × 1869 px**.
- O arquivo comprova a composição em uma largura visual ampla, mas não informa a
  largura CSS do viewport nem a densidade de pixels.
- Evidência direta: ordem das regiões, hierarquia, textos visíveis, proporções
  relativas, superfícies, bordas, raios, tratamento das imagens e estado fechado
  do menu.
- Inferência: comportamento em larguras menores e maiores, abertura do menu,
  destinos dos contatos, breakpoints e valores exatos de tokens.
- O conteúdo do print é evidência visual e editorial. Ele não autoriza nem define
  integrações, persistência, analytics ou fluxos externos.

## Leitura de escopo

### Entra no escopo visual

- Shell global com cabeçalho, conteúdo principal e rodapé.
- Hero interno com breadcrumb, título, texto introdutório, fotografia e ornamento.
- Bloco claro de essência com mídia, texto editorial e quatro valores.
- Bloco escuro de perfil profissional com apresentação, retrato e credenciais.
- Faixa clara de conversão com três métodos de contato.
- Estados essenciais de link, foco, toque e responsividade necessários para uma
  implementação acessível.
- Reuso e evolução controlada das primitivas e componentes de site já existentes.

### Fica fora deste mapa

- Implementação da rota ou alteração dos componentes existentes.
- Redação final, validação das credenciais e escolha definitiva das fotografias.
- Arquivos oficiais de logo, assinatura, ícones e ornamentos botânicos.
- Conteúdo e comportamento do menu expandido, pois só o gatilho fechado aparece.
- Integração com WhatsApp, agenda, provedor de e-mail, CMS, formulário ou analytics.
- Animações de entrada, parallax ou cabeçalho sticky, que não são comprovados pelo
  print.

## Mapa macro

A página é full-bleed e alterna superfícies na sequência
`hero escuro → conteúdo claro → perfil escuro → contato claro → rodapé escuro`.
O cabeçalho aparece como uma superfície translúcida e arredondada, insetada sobre
a área fotográfica do hero.

| Ordem | Região | Proporção vertical observada | Superfície | Composição no print |
| --- | --- | ---: | --- | --- |
| 1 | Hero + cabeçalho | ~24% | Fotografia com overlay verde quase preto | Cabeçalho flutuante; texto à esquerda e ambiente à direita |
| 2 | Essência + valores | ~33% | Marfim | Mídia/texto em 2 colunas; 4 cards abaixo |
| 3 | Perfil profissional | ~19% | Verde profundo | Apresentação, retrato e credenciais em 3 colunas |
| 4 | Faixa de contato | ~11% | Marfim | Título editorial e 3 cards de contato |
| 5 | Rodapé | ~13% | Verde profundo | Marca, navegação e contatos; barra legal abaixo |

As proporções preservam o ritmo do print; não devem virar alturas fixas.

## Árvore de composição proposta

```text
AboutPage
└── SiteFrame (reuso; variante full-bleed recomendada)
    ├── SiteHeader (reuso; variante floating/minimal recomendada)
    │   ├── BrandLockup
    │   └── MenuTrigger
    ├── AboutHero
    │   ├── HeroBackdrop
    │   ├── Breadcrumb
    │   ├── DisplayHeading
    │   ├── IntroductoryCopy
    │   └── BotanicalDecoration
    ├── EssenceSection
    │   ├── EssenceMedia
    │   ├── SectionHeading
    │   ├── EditorialCopy
    │   └── ValuesGrid
    │       └── ValueCard × 4
    │           ├── LineIcon
    │           └── CardSurface
    ├── FounderSection
    │   ├── FounderIntroduction
    │   │   ├── SectionHeading
    │   │   ├── SupportingCopy
    │   │   ├── SignatureMark
    │   │   └── ProfessionalRegistration
    │   ├── FounderPortrait
    │   └── CredentialsList
    │       └── CredentialItem × 4
    ├── ContactMethodsSection
    │   ├── SectionHeading
    │   ├── BotanicalDecoration
    │   └── ContactMethodGrid
    │       └── ContactMethodCard × 3
    └── SiteFooter
        ├── FooterBrand
        ├── FooterNavGroup
        ├── ContactLinkGroup (extensão recomendada)
        ├── SocialLinks
        └── LegalBar
```

## Contrato visual da tela

- Faça o hero ocupar a largura integral da página, com fotografia em `cover` e
  gradiente mais forte à esquerda para sustentar o texto branco.
- Posicione o cabeçalho visualmente sobre o hero, com respiro externo, borda oliva
  translúcida, fundo escuro semitransparente e cantos arredondados.
- Preserve uma única coluna de leitura no hero, ocupando aproximadamente a metade
  esquerda; mantenha a cadeira e o jardim reconhecíveis à direita.
- Use marfim, não branco puro, nas regiões claras. Diferencie os cards por uma
  alteração discreta de luminosidade, sem sombra forte.
- Use tipografia serifada nos títulos editoriais e sem serifa em corpo, controles,
  eyebrow, credenciais e metadados.
- Use oliva somente como acento: fragmentos de título, ícones, assinatura,
  breadcrumb, divisores e pequenos rótulos.
- Trate ornamentos botânicos como decoração de baixa opacidade, sem semântica e
  sem interferência em clique ou leitura.
- Preserve raios generosos nas fotografias e nos cards, mas mantenha as transições
  entre as grandes seções retas e full-bleed.

## Mapeamento por região

| ID | Região | Papel | Reuso atual | Estado no código | Direção de implementação |
| --- | --- | --- | --- | --- | --- |
| R01 | Shell | Estrutura semântica, skip link, `main` e rodapé | `SiteFrame` | Existe, mas cria frame externo com margem, borda e raio | Reusar a estrutura; adicionar variante tipada `fullBleed` ou permitir `className` sem alterar o padrão da Home |
| R02 | Cabeçalho flutuante | Marca e acesso ao menu | `SiteHeader`, `BrandLockup`, `MenuTrigger` | Existe com CTA obrigatório e borda inferior reta | Adicionar variante `floating`/`minimal` que omita o CTA e aplique superfície insetada; não duplicar logo ou gatilho |
| R03 | Hero Sobre | Contextualizar a página e apresentar sua mensagem central | `DisplayHeading`, `SupportingCopy`, `BotanicalDecoration` | Não existe como seção; `HeroSection` é exclusivo da Home | Criar `AboutHero` local à rota; extrair `Breadcrumb` para compartilhado somente se uma segunda rota interna o consumir |
| R04 | Breadcrumb | Mostrar `Início > Sobre` | Nenhum componente específico | Não existe | Usar `<nav aria-label="Breadcrumb">` e lista ordenada; `Início` é link, `Sobre` usa `aria-current="page"` |
| R05 | Bloco Essência | Explicar princípios e processo | `SectionHeading`, `SupportingCopy` | Não existe como seção | Criar `EssenceSection` local com duas colunas amplas e ordem DOM mídia → conteúdo, como no print |
| R06 | Mídia de processo | Humanizar a prática profissional | Possível padrão de `MediaFrame`, hoje exclusivo da Home | Existe apenas em `app/_home/AboutPanel.tsx` e depende do tipo da Home | Não importar de `_home`; criar composição local e só promover uma primitive de mídia quando houver contrato realmente comum |
| R07 | Grade de valores | Resumir quatro compromissos | `CardSurface`, `LineIcon` | Superfície existe; faltam alguns desenhos de ícone | Criar `ValuesGrid`/`ValueCard` locais, alimentados por dados tipados; estender apenas o catálogo de `LineIcon` necessário |
| R08 | Perfil profissional | Apresentar autoria, formação e diferencial | `SectionHeading`, `SupportingCopy`, `BotanicalDecoration` | Não existe | Criar `FounderSection` local com três áreas semânticas; não modelar como card genérico |
| R09 | Assinatura | Reforçar autoria pessoal | Nenhum | Não existe | Tratar como imagem com alt quando for assinatura real; se for apenas nome em fonte script, manter texto e não depender dele como única identificação |
| R10 | Retrato | Identificar a profissional | Nenhum compartilhado necessário | Não existe | Usar `next/image`, dimensões estáveis, `sizes`, recorte configurável e alt informativo |
| R11 | Credenciais | Comunicar formação, experiência e atendimento | `LineIcon` como primitive | Faltam `graduationCap`, `award` e `users`; `leaf` já existe | Criar lista semântica local; ícones decorativos dentro de círculos e divisores entre itens |
| R12 | Faixa de contato | Oferecer três canais equivalentes | `SectionHeading`, `CardSurface`, `LineIcon`, `BotanicalDecoration` | `ContactBanner` atual modela 1 CTA principal + 1 apoio | Criar `ContactMethodsSection` local; não sobrecarregar `ContactBanner` com uma anatomia incompatível |
| R13 | Método de contato | Representar WhatsApp, e-mail ou agendamento | `CardSurface`, `LineIcon` | Existem `message` e `mail`; falta `calendar` | Criar `ContactMethodCard` local como link quando houver destino; usar texto neutro enquanto o destino não estiver confirmado |
| R14 | Rodapé | Navegação, marca, contatos e legal | `SiteFooter`, `FooterBrand`, `FooterNavGroup`, `SocialLinks`, `LegalBar` | Existe e corresponde à estrutura geral | Reusar; compartilhar os dados globais fora de `_home`; permitir ícones opcionais nos links de contato ou criar um grupo específico |

## Conteúdo observado

O conteúdo deve viver em um objeto tipado local, por exemplo
`app/sobre/aboutContent.ts`, e não dentro dos componentes.

| Região | Rótulo / título | Conteúdo visível |
| --- | --- | --- |
| Hero | `Início > Sobre` | Breadcrumb da rota atual |
| Hero | `Sobre a Sobreiro Paisagismo` | `Sobre a` em branco e `Sobreiro Paisagismo` em oliva |
| Hero | Introdução | “Acreditamos que o paisagismo vai muito além da estética. Ele transforma ambientes, melhora a qualidade de vida e conecta pessoas à natureza.” |
| Essência | `NOSSA ESSÊNCIA` | Eyebrow em caixa alta |
| Essência | `Design com propósito, natureza com intenção.` | Fragmento “natureza com intenção.” em oliva |
| Essência | Corpo 1 | “Cada projeto é pensado de forma única, respeitando as características do espaço, os desejos de cada cliente e o equilíbrio com o meio ambiente.” |
| Essência | Corpo 2 | “Nossos compromissos valores guiam cada etapa do projeto — do conceito à execução — sempre com escuta ativa, criatividade e dedicação.” |
| Valor 1 | `Personalização` | “Projetos exclusivos que refletem o estilo e as necessidades de cada cliente.” |
| Valor 2 | `Sustentabilidade` | “Escolhas conscientes que respeitam a natureza e o futuro.” |
| Valor 3 | `Bem-estar` | “Ambientes que promovem conforto, harmonia e qualidade de vida.” |
| Valor 4 | `Qualidade` | “Técnica, atenção aos detalhes e compromisso em todas as etapas do projeto.” |
| Perfil | `QUEM ESTÁ POR TRÁS` | Eyebrow em caixa alta |
| Perfil | `Paixão que floresce em cada projeto.` | Fragmento “em cada projeto.” em oliva |
| Perfil | Apresentação | “À frente da Sobreiro Paisagismo está uma profissional apaixonada por natureza, design e pessoas.” |
| Perfil | Identidade | `Juliana Sobreiro`; `Paisagista`; `Registro CAU/BR: A123456-7` |
| Credencial 1 | Formação | `Formação em Arquitetura e Urbanismo – Universidade Federal de Minas Gerais` |
| Credencial 2 | Especialização | `Especialização em Paisagismo — Escola da Natureza` |
| Credencial 3 | Experiência | `Mais de 5 anos de experiência em projetos autorais` |
| Credencial 4 | Atendimento | `Atendimento próximo e personalizado — do planejamento ao pós-entrega` |
| Contato | `Vamos transformar seu espaço juntos?` | Fragmento “seu espaço” em oliva |
| Contato 1 | `Fale no WhatsApp` | `(21) 98765-4321` |
| Contato 2 | `Envie um e-mail` | `contato@sobreiro.com.br` |
| Contato 3 | `Agende uma conversa` | `Atendimento personalizado` |

### Observação editorial

O segundo parágrafo de “Nossa essência” aparece no print como “Nossos
compromissos valores...”, construção possivelmente incompleta. A tabela mantém a
transcrição como evidência; a redação deve confirmar se o texto correto é
“Nossos compromissos **e** valores...” antes da implementação final.

O registro `A123456-7`, a formação, a especialização, o tempo de experiência, o
nome profissional e os dados de contato devem ser validados como conteúdo real,
não copiados como fatos somente porque aparecem no mockup.

## Inventário de reuso do Design System

### Reusar sem mudança de responsabilidade

| Componente | Uso na página Sobre |
| --- | --- |
| `BrandLockup` | Marca no cabeçalho e dentro de `FooterBrand` |
| `MenuTrigger` | Gatilho do menu no estado fechado observado |
| `DisplayHeading` | Único `h1` do hero |
| `SectionHeading` | Títulos de Essência, Perfil e Contato |
| `SupportingCopy` | Introdução e textos editoriais curtos |
| `LineIcon` | Base para valores, credenciais, contatos e rodapé |
| `CardSurface` | Superfície dos valores e métodos de contato |
| `BotanicalDecoration` | Ornamentos semânticos ocultos |
| `FooterBrand`, `SocialLinks`, `LegalBar` | Slots existentes do rodapé |
| `SiteFooter` | Composição global do rodapé |

### Evoluir por variante ou API pequena

| Componente | Extensão recomendada | Restrição |
| --- | --- | --- |
| `SiteFrame` | Variante full-bleed ou `className` de rota | Preservar o comportamento atual da Home como padrão |
| `SiteHeader` | Variante `floating` e opção tipada para ocultar o CTA | Não criar um segundo cabeçalho apenas por diferença de superfície |
| `LineIcon` | Adicionar `calendar`, `graduationCap`, `award`, `users` e, se necessário, `phone` | Manter `currentColor`, viewBox e contrato acessível atuais |
| `FooterNavGroup` / `SiteFooter` | Suportar ícone opcional em links de contato ou aceitar slot de grupo | Não exigir ícone dos links de navegação comuns |

### Manter local à rota `/sobre`

- `AboutHero`
- `EssenceSection`
- `ValuesGrid` e `ValueCard`
- `FounderSection`, `FounderPortrait`, `CredentialsList` e `CredentialItem`
- `ContactMethodsSection` e `ContactMethodCard`
- Tipos e conteúdo editorial exclusivos da página

Não reutilize `app/_home/HeroSection.tsx` ou `app/_home/AboutPanel.tsx`: esses
componentes têm anatomia e contratos próprios da Home. Reutilize as primitivas
que eles já consomem.

## Estados e interações

| Elemento | Estado observado | Estados necessários | Regra de comportamento |
| --- | --- | --- | --- |
| Breadcrumb | `Sobre` atual, `Início` navegável | repouso, hover quando disponível, focus-visible, active | `Início` leva a `/`; item atual não é link e usa `aria-current="page"` |
| `MenuTrigger` | Fechado | pressed, focus-visible, expanded, disabled quando não houver painel | O print não define o painel; não inventar drawer, foco preso ou transição sem especificação |
| Cards de valor | Informativos | nenhum estado interativo obrigatório | Usar lista; não aplicar cursor ou hover de link se não houver ação |
| Cards de contato | Aparência de ação | repouso, hover, focus-visible, active; opcional disabled | O card inteiro pode ser um único link; não aninhar links nem tornar apenas o ícone clicável |
| WhatsApp | Destino sugerido pelo rótulo | externo ou indisponível | Confirmar telefone e política de nova aba antes de gerar URL `wa.me` |
| E-mail | Destino sugerido pelo endereço | link `mailto:` | Confirmar endereço final; manter o endereço como nome acessível compreensível |
| Agendamento | Destino indefinido | link externo, âncora ou indisponível | Não inferir modal/formulário; depende de decisão funcional |
| Links do rodapé | Visíveis | repouso, hover, focus-visible, active | Usar URLs reais da rota, não âncoras da Home quando a navegação for global |

## Contrato de movimento

- Não há evidência de animação no print.
- Imagens, títulos, cards, credenciais e ornamentos permanecem estáticos.
- O cabeçalho não deve ser sticky sem requisito adicional.
- Se houver transições de hover/foco, use os tokens de movimento já existentes e
  preserve `prefers-reduced-motion: reduce`.
- Uma futura abertura de menu pertence ao contrato do menu global e não a esta
  página.

## Contrato responsivo

O print comprova somente a composição ampla. Os comportamentos abaixo são direção
recomendada baseada na falha de conteúdo, não reprodução confirmada de outros
frames.

| Faixa lógica | Composição recomendada |
| --- | --- |
| Mobile estreito | Cabeçalho flutuante mantém marca + menu; hero preserva foco do texto; Essência empilha mídia e conteúdo; valores ficam em 1 coluna ou scroll horizontal; Perfil empilha introdução, retrato e credenciais; contatos ficam em 1 coluna |
| Tablet | Essência usa 2 colunas se houver largura; valores usam 2 × 2; Perfil pode usar introdução + retrato na primeira linha e credenciais abaixo; contatos usam até 3 colunas quando cada ação preservar alvo e legibilidade |
| Referência ampla | Essência em 2 colunas + 4 cards; Perfil em 3 colunas; contatos em 3 colunas; rodapé em 3 áreas como observado |
| Desktop largo | Limitar o conteúdo interno por `--width-content`; ampliar gutters, não tipografia e imagens indiscriminadamente |

- Preserve a ordem DOM igual à ordem de leitura, mesmo quando CSS Grid reorganizar
  as colunas.
- Não reduza corpo, ícones ou alvos abaixo dos tokens do sistema para manter grades.
- Use `aspect-ratio` para reservar espaço de retrato e mídia; não fixe a altura das
  seções.
- Em imagens estreitas, ajuste `object-position` por conteúdo, sem esconder o rosto
  ou o foco arquitetônico principal.

## Acessibilidade

- Mantenha um único `h1` no hero e use `h2` para Essência, Perfil e Contato.
- Relacione cada seção ao seu título com `aria-labelledby`.
- Imagens de processo e retrato são informativas e precisam de alt contextual;
  fotografia puramente atmosférica do hero pode usar alt vazio quando a mensagem
  já estiver integralmente no texto.
- Ícones que repetem o rótulo do card são decorativos. Credenciais não podem
  depender do desenho do ícone para serem compreendidas.
- O breadcrumb usa `nav`, nome acessível e lista ordenada.
- Cards informativos não recebem `tabIndex`. Cards de contato usam links nativos,
  foco visível e área mínima de 44 × 44 px.
- O oliva sobre marfim e verde profundo deve ser validado em WCAG 2.2 AA,
  especialmente em eyebrow, assinatura, telefone e metadados pequenos.
- Ornamentos usam `aria-hidden="true"`, `focusable="false"` e
  `pointer-events: none`.

## Dados e propriedade do conteúdo

- Criar `app/sobre/aboutContent.ts` para textos, mídias, valores, credenciais e
  métodos de contato tipados.
- Retirar dados verdadeiramente globais de `app/_home/homeContent.ts` antes de a
  nova rota consumi-los. Cabeçalho, rodapé e destinos globais podem viver em um
  módulo neutro, como `app/_content/siteContent.ts`.
- Não importar `homeContent` dentro de `/sobre`, pois isso acoplaria a rota ao
  conteúdo proprietário da Home.
- Não criar CMS, camada de API ou estado global para conteúdo estático.

## Lacunas antes da implementação final

1. Texto final e validação da frase “Nossos compromissos valores...”.
2. Nome, formação, especialização, tempo de experiência e registro profissionais
   confirmados.
3. Fotografias finais, direitos de uso, dimensões e pontos de recorte.
4. Arquivo oficial da assinatura ou decisão de representá-la como texto.
5. Destinos reais de WhatsApp, e-mail e agendamento.
6. Conteúdo e interação do menu expandido.
7. Definição de se o cabeçalho flutuante e o shell full-bleed são variantes globais
   ou uma direção visual que também substituirá a Home.
8. Comportamento desejado da grade de valores no mobile: pilha ou scroll.
9. Ícones oficiais para valores, credenciais, calendário, telefone e redes sociais.
10. Largura CSS do viewport usado para gerar o print e breakpoints aprovados.
11. Links globais do rodapé e política de navegação entre rotas versus âncoras.

## Direção de implementação

1. Criar `app/sobre/page.tsx`, os componentes locais em
   `app/sobre/_components/` e o conteúdo tipado em `app/sobre/aboutContent.ts`.
2. Extrair do conteúdo da Home apenas os dados realmente globais de cabeçalho e
   rodapé para um módulo neutro.
3. Evoluir `SiteFrame` e `SiteHeader` com variantes pequenas, preservando a API e
   aparência atuais por padrão.
4. Estender o catálogo de `LineIcon` somente com os desenhos usados na página.
5. Implementar hero e Essência primeiro; depois valores, Perfil, contato e rodapé.
6. Manter a página como Server Component. Somente o menu justifica fronteira
   cliente, já isolada em `MenuTrigger`.
7. Usar `next/image` com `sizes`, dimensões estáveis e recortes definidos por mídia.
8. Validar a largura ampla do print, depois 320 px, 640 px, 896 px e desktop largo;
   por fim validar teclado, foco, contraste, alt e redução de movimento.

## Referências técnicas prováveis

- `app/sobre/page.tsx`: composição futura da rota.
- `app/sobre/_components/`: seções exclusivas da página Sobre.
- `app/sobre/aboutContent.ts`: conteúdo e contratos locais.
- `app/_components/SiteFrame.tsx`: shell e skip link existentes.
- `app/_components/SiteHeader.tsx`: cabeçalho global a evoluir por variante.
- `app/_components/SiteFooter.tsx`: rodapé global reutilizável.
- `app/_components/Typography.tsx`: `DisplayHeading`, `SectionHeading` e
  `SupportingCopy`.
- `app/_components/CardSurface.tsx`: superfícies dos cards.
- `app/_components/LineIcon.tsx`: ícones lineares e extensões necessárias.
- `app/_components/Brand.tsx`: marca e ornamentos botânicos.
- `app/_components/ContactBanner.tsx`: referência de comparação, não componente
  recomendado para a anatomia de três contatos.
- `app/globals.css` e `app/color-tokens.css`: estilos, tokens e variantes.
- `docs/DESIGN-SYSTEM.md`: contrato atual do sistema.

## Resultado esperado deste artefato

Permitir que a página Sobre seja implementada como uma rota acessível, responsiva
e majoritariamente server-rendered, preservando a identidade “jardim noturno
editorial” e reaproveitando o sistema existente sem transformar diferenças de
anatomia em componentes genéricos ou duplicados.

## Registro da implementação `build-about-page`

O mapa foi aplicado mantendo suas distinções entre evidência visual e conteúdo
pendente. A sequência implementada é hero fotográfico escuro, Essência clara,
perfil escuro, métodos de contato claros e rodapé global escuro. O shell
full-bleed e o cabeçalho flutuante são variantes opt-in; a Home conserva os
defaults anteriores.

| Região | Implementação | Decisão sobre lacunas |
| --- | --- | --- |
| R01–R04 | `SiteFrame`, `SiteHeader` e `AboutHero` | Breadcrumb usa `/`; menu permanece desabilitado, sem painel; hero usa mídia provisória isolada no conteúdo |
| R05–R07 | `EssenceSection` e quatro `ValueCard` | Frase editorial corrigida para “compromissos e valores”; mídia provisória tem alt e ponto de recorte |
| R08–R11 | `FounderSection` e quatro credenciais | Nome usa fallback institucional; registro e assinatura foram omitidos; retrato recebe fallback visível; fatos não aprovados são sinalizados como “em validação editorial” |
| R12–R13 | `ContactMethodsSection` | E-mail existente é link; WhatsApp e agenda são superfícies informativas não focáveis e sem URL |
| R14 | `SiteFooter` | Contrato existente foi suficiente; dados globais foram movidos para `app/_content/siteContent.ts` sem mudar a Home |

Os pontos de substituição ficam centralizados em `app/sobre/aboutContent.ts`:
fotografias, recortes, identidade, registro, retrato, credenciais e destinos. As
imagens atuais são provisórias; o arquivo oficial de assinatura não foi simulado.
O layout responde por falha de conteúdo em 320, 640 e 896 px, mantém o conteúdo
interno em `--width-content` no desktop largo e não presume que os 842 px do print
correspondam à largura CSS do viewport.
