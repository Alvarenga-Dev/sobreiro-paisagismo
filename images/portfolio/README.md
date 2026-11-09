# Portfólio de imagens — Sobreiro Paisagismo

Esta pasta reúne os catálogos editoriais que alimentam o portfólio do site. Os arquivos visuais ficam em `public/images/portfolio`, a única localização pública e editável dos ativos. Os arquivos foram agrupados por tipo de trabalho, depois por projeto, e receberam nomes descritivos para facilitar a implementação.

## Estrutura

```text
images/portfolio/
├── catalog.json
├── home-catalog.json
└── README.md

public/images/portfolio/
├── 01-paisagismo-residencial/
├── 02-paisagismo-comercial/
├── 03-paisagismo-de-fachada/
├── 04-rooftop/
├── 05-jardins-verticais/
├── 06-design-de-interiores/
└── 07-conceitos-e-renders/
```

O arquivo [`catalog.json`](./catalog.json) é a fonte editorial do portfólio. Ele contém os títulos, categorias, descrições, capas, status de curadoria e caminhos relativos da mídia. O adaptador em `app/_content/portfolioCatalog.ts` valida o JSON, resolve os caminhos públicos e calcula dimensões reais para `next/image`.

O arquivo [`home-catalog.json`](./home-catalog.json) seleciona, em ordem, Paisagismo residencial, Coffee Comfort e Projetos de interiores. Cada referência pode definir um título e escolher uma imagem do projeto como capa.

O catálogo reúne projetos de Jéssica Sobreiro. A residência com jardim e piscina e a suíte com painel iluminado têm fichas publicadas com narrativa e galeria. Os destaques da Home levam diretamente a essas fichas.

## Imagens principais dos cards

Em cada projeto, o campo `cover` aponta para a imagem principal do card. As demais imagens do array `images` podem compor a página de detalhes e a galeria do projeto.

| Projeto | Imagem do card |
| --- | --- |
| Residência com jardim e piscina | `vista-aerea.jpg` |
| Coffee Comfort | `capa-fachada-frontal.jpg` |
| Residência contemporânea — fachada | `01-fachada-principal.png` |
| Rooftop com piscina | `02-piscina-e-lounge.png` |
| Jardins verticais | `01-fachada-com-jardim-vertical.png` |
| Cozinha contemporânea | `01-cozinha-integrada.png` |
| Hall de entrada e escada | `02-hall-e-escada.JPG` |
| Suíte com painel iluminado | `vista-ampla-da-suite.jpg` |
| Casa suspensa na mata — conceito | `02-vista-ampla.png` |

## Schema mínimo

`catalog.json` possui `imageCount` e `categories`. Cada categoria tem `id`, `label`, `description` e `projects`; cada projeto tem `id`, `title`, `summary`, `status`, `cover` e `images`; cada imagem tem `file` e `alt`. Dimensões, proporção, `sizes`, recorte e URL pública são derivados pelo adaptador a partir do arquivo local.

`home-catalog.json` possui `version` e `highlights`. Cada destaque tem `projectId` e `order` e pode incluir `title` e `cover`. O adaptador exige exatamente três IDs e ordens distintos e verifica que a capa pertence à galeria do projeto.

## Critérios de organização

- As pastas numeradas definem a ordem sugerida das categorias no portfólio.
- Os nomes dos arquivos descrevem o enquadramento ou o ambiente principal, sem alterar o conteúdo visual.
- `residencia-jardim-e-piscina` usa seis imagens do acervo residencial compartilhado. `vista-aerea.jpg` também é a mídia do hero da listagem de Projetos.
- `suite-com-painel-iluminado` usa cinco imagens do acervo de interiores, incluindo as duas vistas distintas nomeadas `FOTO 3` no Drive.
- `coffee-comfort` é o projeto comercial identificado nas imagens pela marca do café.
- `casa-suspensa-na-mata` foi mantida separada como conceito/renderização e não é apresentada como obra executada.

## Manutenção editorial

- O projeto antigo `residencia-piscina-area-gourmet` saiu do catálogo e sua rota de detalhe foi retirada. Os arquivos permanecem no acervo do repositório.
- As novas fichas descrevem elementos visíveis nas imagens. A classificação das novas imagens como fotografia ou render permanece pendente de confirmação.
- A imagem `02-jardim-vertical-com-piscina.jpg` permanece classificada como renderização do projeto.
- Marcas da Sobreiro presentes nas imagens fazem parte dos ativos aprovados; substituições futuras devem preservar a autoria e a autorização de uso.
- Os textos alternativos sugeridos estão no `catalog.json`; revisar com a Jéssica antes de publicar para refletir o projeto e as espécies vegetais corretas.
