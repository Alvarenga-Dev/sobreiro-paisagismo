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

O arquivo [`catalog.json`](./catalog.json) é a fonte editorial única do portfólio. Ele contém os títulos, categorias, descrições, capas, status de curadoria e caminhos relativos das 58 imagens fornecidas. O adaptador em `app/_content/portfolioCatalog.ts` valida o JSON, resolve os caminhos públicos e calcula dimensões reais para `next/image`.

O arquivo [`home-catalog.json`](./home-catalog.json) contém somente três referências ordenadas por `projectId`: residência com piscina e área gourmet, Coffee Comfort e jardim vertical residencial. Títulos, resumos, capas e galerias continuam vindo do catálogo completo.

Os oito projetos do catálogo são públicos e de autoria de Jéssica Sobreiro. Os
ativos atuais foram aprovados para exibição no portfólio da Sobreiro Paisagismo.

## Imagens principais dos cards

Em cada projeto, o campo `cover` aponta para a imagem principal do card. As demais imagens do array `images` podem compor a página de detalhes e a galeria do projeto.

| Projeto | Imagem do card |
| --- | --- |
| Residência com piscina e área gourmet | `01-piscina-area-gourmet.jpg` |
| Coffee Comfort | `01-fachada.jpg` |
| Residência contemporânea — fachada | `01-fachada-principal.png` |
| Rooftop com piscina | `02-piscina-e-lounge.png` |
| Jardim vertical residencial | `01-fachada-com-jardim-vertical.png` |
| Cozinha contemporânea | `01-cozinha-integrada.png` |
| Hall de entrada e escada | `02-hall-e-escada.JPG` |
| Casa suspensa na mata — conceito | `02-vista-ampla.png` |

## Schema mínimo

`catalog.json` possui `imageCount` e `categories`. Cada categoria tem `id`, `label`, `description` e `projects`; cada projeto tem `id`, `title`, `summary`, `status`, `cover` e `images`; cada imagem tem `file` e `alt`. Dimensões, proporção, `sizes`, recorte e URL pública são derivados pelo adaptador a partir do arquivo local.

`home-catalog.json` possui `version` e `highlights`; cada destaque tem `projectId` e `order`. O adaptador exige exatamente três referências únicas a projetos existentes.

## Critérios de organização

- As pastas numeradas definem a ordem sugerida das categorias no portfólio.
- Os nomes dos arquivos descrevem o enquadramento ou o ambiente principal, sem alterar o conteúdo visual.
- `residencia-piscina-area-gourmet` é um único projeto residencial fotografado em diferentes horários e ângulos.
- `coffee-comfort` é o projeto comercial identificado nas imagens pela marca do café.
- `casa-suspensa-na-mata` foi mantida separada como conceito/renderização e não é apresentada como obra executada.

## Manutenção editorial

- A referência ausente `01-paisagismo-residencial/residencia-piscina-area-gourmet/07-composicao-noturna.jpg` foi removida do catálogo porque não existe entre os ativos fornecidos; ela permanece como pendência para reposição editorial, sem duplicar outro arquivo.
- A autoria dos projetos e a publicação dos ativos atuais foram confirmadas por Jéssica Sobreiro.
- A imagem `02-jardim-vertical-com-piscina.jpg` permanece classificada como renderização do projeto.
- Marcas da Sobreiro presentes nas imagens fazem parte dos ativos aprovados; substituições futuras devem preservar a autoria e a autorização de uso.
- Os textos alternativos sugeridos estão no `catalog.json`; revisar com a Jéssica antes de publicar para refletir o projeto e as espécies vegetais corretas.
