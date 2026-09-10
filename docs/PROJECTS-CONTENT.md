# Conteúdo e mídia de Projetos

O conteúdo publicado de `/projetos` vem de [`images/portfolio/catalog.json`](../images/portfolio/catalog.json), por meio do adaptador tipado [`app/_content/portfolioCatalog.ts`](../app/_content/portfolioCatalog.ts). A rota não mantém cópia de títulos, resumos, categorias ou mídias dos projetos.

## Catálogo atual

O catálogo contém oito projetos e sete categorias editoriais:

| Categoria | Projetos |
| --- | --- |
| Paisagismo residencial | Residência com piscina e área gourmet |
| Paisagismo comercial | Coffee Comfort |
| Paisagismo de fachada | Residência contemporânea — fachada |
| Rooftop e áreas de lazer elevadas | Rooftop com piscina |
| Jardins verticais | Jardim vertical residencial |
| Design de interiores | Cozinha contemporânea; Hall de entrada e escada |
| Conceitos e renders | Casa suspensa na mata |

Os filtros exibidos na página são derivados desses IDs, preservam `todos` e usam o parâmetro `categoria`. Categorias inválidas são tratadas como `todos`, sem remover os demais parâmetros da URL.

## Mídia

Os 58 ativos fornecidos ficam exclusivamente em `public/images/portfolio`, mantendo os agrupamentos e nomes do catálogo. As capas são resolvidas pelo campo `cover`; todas as imagens permanecem no modelo de projeto para uma futura galeria de detalhes. O adaptador calcula dimensões reais, `sizes`, proporção e recorte central para os cards.

A rota individual `/projetos/[slug]` usa a galeria completa na ordem do catálogo,
com `cover` como fallback do hero. O campo obrigatório `detailPublication` é a
única fronteira de publicação do detalhe: somente `published` gera path e href;
`draft` mantém o card informativo com “Detalhes em breve”. O campo livre `status`
não participa dessa decisão.

## Aprovação do primeiro lançamento

Em 09/09/2026, o responsável pelo produto aprovou explicitamente todos os oito
slugs para páginas individuais. Os registros estão declarados como `published`.
Em 10/09/2026, Jéssica Sobreiro confirmou a autoria dos oito projetos e a
autorização para exibi-los publicamente com os ativos atuais.
Nenhuma frase, mídia específica de hero ou solução aplicada foi confirmada; esses
campos opcionais permanecem omitidos e o hero usa o fallback de `cover`.

| Slug | Publicação do detalhe | Conteúdo opcional confirmado |
| --- | --- | --- |
| `residencia-piscina-area-gourmet` | `published` | Nenhum |
| `coffee-comfort` | `published` | Nenhum |
| `residencia-contemporanea-fachada` | `published` | Nenhum |
| `rooftop-com-piscina` | `published` | Nenhum |
| `jardim-vertical-residencial` | `published` | Nenhum |
| `cozinha-contemporanea` | `published` | Nenhum |
| `hall-de-entrada` | `published` | Nenhum |
| `casa-suspensa-na-mata` | `published` | Nenhum |

O template, seus fallbacks e os estados `published`/`draft` são verificados com
fixtures automatizadas. Os oito cards do catálogo agora apontam para seus slugs.

## Destaques da Home

[`images/portfolio/home-catalog.json`](../images/portfolio/home-catalog.json) seleciona exatamente três projetos, nesta ordem:

1. Residência com piscina e área gourmet (`residencia-piscina-area-gourmet`);
2. Coffee Comfort (`coffee-comfort`);
3. Jardim vertical residencial (`jardim-vertical-residencial`).

O arquivo de destaques não duplica galeria, capa ou texto. Qualquer alteração no catálogo completo é refletida automaticamente nos cards da Home.

## Pendências editoriais

- A referência `01-paisagismo-residencial/residencia-piscina-area-gourmet/07-composicao-noturna.jpg` estava declarada no catálogo original, mas não foi fornecida; foi removida para evitar uma URL quebrada e deve ser reposta somente após confirmação do arquivo.
- `casa-suspensa-na-mata` permanece em `conceitos-e-renders` e não é apresentada como obra executada.
- Novos projetos ou ativos devem receber confirmação de autoria e autorização pública antes de entrar em `public/images/portfolio`.
- Revisar os textos alternativos com a Jéssica para confirmar ambientes e espécies vegetais.
- Confirmar, quando disponível, frase, hero específico e soluções aplicadas para
  cada projeto; ausência de confirmação implica omissão, não despublicação.

## Validação do detalhe — 09/09/2026

A inspeção local usou temporariamente fixtures editoriais equivalentes a um
projeto com 15 imagens e outro com 4 imagens. Em 320, 640, 863 e 1440 px, as duas composições mantiveram
um único `h1`, todas as imagens, ordem DOM, alts e ausência de controles na
galeria. A grade empilhou abaixo de 48rem e formou panorama + alta + duas baixas
acima dessa faixa; os excedentes continuaram em duas colunas. O caso de 320 px,
equivalente à largura CSS disponível em 200% de zoom sobre 640 px, terminou com
`scrollWidth` igual a `clientWidth` após a remoção do mínimo global fixo.

Também foram conferidos link seletivo do card, retorno ao catálogo, acesso direto,
reload e o mesmo 404 neutro para slug desconhecido ou em `draft`. Um `src`
temporariamente inexistente confirmou `naturalWidth = 0` no hero enquanto fundo,
overlay, breadcrumb e título permaneceram visíveis; a mesma superfície é pintada
antes da mídia e cobre carregamento lento. Títulos longos, recortes PNG/JPEG e a
ausência de frase/soluções foram exercitados. As limitações editoriais restantes
estão restritas ao conteúdo opcional e às revisões de mídia listadas acima.
