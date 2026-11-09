# Conteúdo e mídia de Projetos

O conteúdo publicado de `/projetos` vem de [`images/portfolio/catalog.json`](../images/portfolio/catalog.json), por meio do adaptador tipado [`app/_content/portfolioCatalog.ts`](../app/_content/portfolioCatalog.ts). A rota não mantém cópia de títulos, resumos, categorias ou mídias dos projetos.

## Catálogo atual

O catálogo contém nove projetos e sete categorias editoriais:

| Categoria | Projetos |
| --- | --- |
| Paisagismo residencial | Residência com jardim e piscina |
| Paisagismo comercial | Coffee Comfort |
| Paisagismo de fachada | Residência contemporânea — fachada |
| Rooftop e áreas de lazer elevadas | Rooftop com piscina |
| Jardins verticais | Jardins verticais |
| Design de interiores | Cozinha contemporânea; Hall de entrada e escada; Suíte com painel iluminado |
| Conceitos e renders | Casa suspensa na mata |

Os filtros exibidos na página são derivados desses IDs, preservam `todos` e usam o parâmetro `categoria`. Categorias inválidas são tratadas como `todos`, sem remover os demais parâmetros da URL.

## Mídia

O catálogo referencia 55 ativos em `public/images/portfolio`. As capas são resolvidas pelo campo `cover`, e o adaptador calcula dimensões e pontos focais para a renderização. A vista aérea da Residência com jardim e piscina também serve de hero para a listagem de Projetos.

A rota individual `/projetos/[slug]` usa a galeria completa na ordem do catálogo,
com `cover` como fallback do hero. O campo obrigatório `detailPublication` é a
única fronteira de publicação do detalhe: somente `published` gera path e href;
`draft` mantém o card informativo com “Detalhes em breve”. O campo livre `status`
não participa dessa decisão.

## Publicação dos detalhes

Os oito projetos iniciais foram aprovados para exibição em setembro de 2026.
Na revisão do catálogo, a antiga `residencia-piscina-area-gourmet` foi retirada.
Seu slug retorna 404. Os dois projetos adicionados nesta revisão têm detalhe
publicado com narrativa e mídia do acervo compartilhado.

| Slug | Mídia |
| --- | --- |
| `residencia-jardim-e-piscina` | Vista aérea no hero e cinco imagens na galeria |
| `suite-com-painel-iluminado` | Vista ampla no hero e quatro imagens na galeria |

Os nove cards do catálogo apontam para seus slugs. A narrativa das novas fichas
se limita aos elementos visíveis nas imagens. [Acervo compartilhado](https://drive.google.com/drive/folders/1ijbckYQ73wFUqTNwxOKbCgTwrPw7wqzD)

## Destaques da Home

[`images/portfolio/home-catalog.json`](../images/portfolio/home-catalog.json) seleciona exatamente três projetos, nesta ordem:

1. Paisagismo residencial (`residencia-jardim-e-piscina`)
2. Coffee Comfort (`coffee-comfort`)
3. Projetos de interiores (`suite-com-painel-iluminado`)

O arquivo de destaques referencia os projetos e pode definir título e capa para a Home. Os três links apontam para os detalhes publicados.

## Pendências editoriais

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
