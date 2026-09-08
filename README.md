# 🌿 Sobreiro Paisagismo

**Website institucional e portfólio digital desenvolvido para a Sobreiro Paisagismo.**

Uma experiência visual pensada para apresentar projetos paisagísticos, fortalecer a identidade da marca e transformar o site em um novo canal de contato com potenciais clientes.

---

## Sobre o projeto

O **Sobreiro Paisagismo** é um website desenvolvido para apresentar de forma elegante e objetiva o trabalho da marca, seus projetos, serviços e identidade.

O projeto busca traduzir para o ambiente digital a proposta visual da Sobreiro: uma estética sofisticada, orgânica e atemporal, valorizando fotografia, natureza, arquitetura e paisagismo.

Além de funcionar como portfólio, o site foi pensado para facilitar o contato entre a Sobreiro e pessoas interessadas em desenvolver seus próprios espaços.

### Objetivos

- Apresentar a identidade e o posicionamento da Sobreiro Paisagismo
- Criar um portfólio visual para os projetos realizados
- Apresentar os principais serviços oferecidos
- Comunicar o valor de um projeto profissional de paisagismo
- Criar uma jornada simples até o contato e solicitação de orçamento
- Garantir uma experiência responsiva em diferentes dispositivos

---

## Identidade visual

A interface segue a identidade desenvolvida para a marca, combinando:

- tons escuros e naturais;
- verde profundo;
- branco e tons neutros;
- detalhes dourados;
- tipografia elegante;
- fotografias como elemento central da composição;
- transparências e elementos inspirados em glassmorphism.

A proposta visual procura transmitir **sofisticação, natureza, exclusividade e tranquilidade**.

---

## Experiência

A experiência do site está sendo estruturada em torno das principais informações que um potencial cliente precisa conhecer sobre o estúdio:

### Início

Apresentação da Sobreiro através de uma composição visual de alto impacto e uma introdução à proposta da marca.

### Projetos

Portfólio destinado a destacar trabalhos e diferentes aplicações do paisagismo.

### Serviços

Apresentação das soluções oferecidas pela Sobreiro Paisagismo.

### Sobre

Espaço dedicado à história, abordagem e identidade do estúdio.

### Por que investir em paisagismo?

Conteúdo pensado para explicar como um projeto paisagístico pode transformar a relação entre arquitetura, natureza e bem-estar.

### Contato

Chamada direta para transformar o interesse pelo trabalho em uma conversa sobre um novo projeto.

---

## Tecnologias

| Tecnologia | Utilização |
| --- | --- |
| Next.js | Framework da aplicação |
| React | Construção da interface |
| TypeScript | Desenvolvimento tipado |
| CSS | Estilização e identidade visual |
| ESLint | Padronização e qualidade do código |

---

## Estrutura atual

```text
sobreiro-paisagismo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

O projeto utiliza o **App Router do Next.js**, mantendo a estrutura inicial simples enquanto os componentes e seções do site são evoluídos.

---

## Executando localmente

### Pré-requisitos

- Node.js 24.20.0 LTS (a versão do projeto está fixada em `.nvmrc`)
- npm 11
- Git

Clone o projeto:

```bash
git clone https://github.com/Alvarenga-Dev/sobreiro-paisagismo.git
cd sobreiro-paisagismo
```

Instale as dependências exatamente como registradas no lockfile:

```bash
nvm use
npm ci
```

Por segurança, scripts de ciclo de vida de dependências ficam desabilitados no
`.npmrc`. Qualquer exceção deve ser revisada e aprovada explicitamente.

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação poderá ser acessada em:

```text
http://localhost:3000
```

### Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npx tsc --noEmit
npm audit
```

---

## Status

🚧 **Em desenvolvimento**

O projeto está sendo desenvolvido de forma incremental, partindo da identidade visual e da experiência definida para a Sobreiro Paisagismo.

---

## Desenvolvimento

Projeto desenvolvido por **[Lucas Alvarenga](https://alvarenga.dev/)**.

Para conhecer outros projetos e trabalhos de desenvolvimento:

**[alvarenga.dev](https://alvarenga.dev/)**

---
