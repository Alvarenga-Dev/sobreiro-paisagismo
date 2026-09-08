# Sobreiro Paisagismo — Instruções para Agentes

> Este arquivo DEVE permanecer conciso e ter no máximo **200 linhas**.
> Prefira referências à documentação especializada em vez de adicionar regras detalhadas aqui.

---

## Contexto do Projeto

* **Produto:** site institucional e portfólio digital da Sobreiro Paisagismo, voltado à apresentação da marca, de projetos e serviços e à conversão de contatos.
* **Tipo de aplicação:** site SSR/estático com Next.js App Router.
* **Usuários principais:** potenciais clientes interessados em projetos e serviços de paisagismo.
* **Fluxos críticos:** conhecer a marca, explorar projetos e serviços, solicitar orçamento por contato.

---

## Ambiente de Desenvolvimento

* **Node:** `>=20.9.0` exigido pelo Next.js 16; versão não fixada no repositório.
* **Gerenciador de pacotes:** npm, com `package-lock.json` versionado.
* **Arquivos de ambiente:** nenhum exigido atualmente; `.env` e `.env*.local` não devem ser versionados.
* **Serviços obrigatórios:** nenhum.

### Configuração

```bash
npm ci
```

---

## Execução da Aplicação

```bash
# Desenvolvimento
npm run dev
# Build de produção
npm run build
# Execução do build de produção
npm run start
```

* URL de desenvolvimento: `http://localhost:3000`

---

## Comandos de Validação

```bash
npx tsc --noEmit
npm run lint
# Testes ainda não estão configurados.
npm run build
```

Antes de concluir uma implementação, execute todas as validações relevantes ao escopo alterado. O script `lint` precisa ser corrigido antes de ser considerado uma validação funcional; consulte as ressalvas.

---

## Arquitetura

**Arquitetura:** frontend orientado a rotas, com Next.js App Router e Server Components por padrão.

```text
app/
├── layout.tsx       # HTML raiz, metadados globais e importação do CSS global
├── page.tsx         # Composição da página inicial
├── globals.css      # Estilos e tokens globais
├── _components/     # UI realmente compartilhada entre rotas, quando necessária
└── [segmento]/      # Novas rotas e seus componentes locais
```

### Regras de Arquitetura

* Componentes DEVEM focar em apresentação e orquestração; regras de negócio permanecem próximas da funcionalidade proprietária enquanto o projeto for pequeno.
* Integrações de API e infraestrutura DEVEM ficar fora da apresentação; código compartilhado só contém comportamento genuinamente reutilizável.
* Funcionalidades NÃO DEVEM depender de detalhes internos entre si; não crie abstrações, camadas ou barrels sem necessidade concreta.

---

## Padrões React

* Use componentes funcionais e hooks; preserve Server Components e adicione `"use client"` somente na menor fronteira que exigir recursos do navegador.
* Mantenha componentes focados; extraia hooks para comportamento stateful reutilizado ou efeitos isoláveis e testáveis.
* Evite `useEffect` para estado derivável; efeitos DEVEM declarar dependências e limpeza quando aplicável.
* Não use memoização prematuramente; siga `CODING-PATTERNS.md`.

---

## Regras TypeScript

* O modo estrito está **habilitado** e DEVE ser preservado; evite `any` e use `unknown` para valores genuinamente desconhecidos.
* Não silencie erros com casts, `@ts-ignore` ou non-null assertion; prefira inferência quando permanecer clara.
* APIs públicas, utilitários compartilhados, props e contratos DEVEM ter tipos explícitos; valide e mapeie dados externos.
* Siga as convenções de `CODING-PATTERNS.md`.

---

## Gerenciamento de Estado

* **Estado local de UI:** estado React, somente em Client Components com interação real.
* **Estado global e do servidor:** nenhum; conteúdo atual é estático e imutável.
* **Estado de formulário:** nenhum; adote a solução mais simples quando necessário.
* **Estado na URL:** prefira a URL para filtros, paginação e navegação compartilháveis.

Não introduza biblioteca de estado sem uma justificativa arquitetural explícita.

---

## Busca de Dados e APIs

* **Cliente de API:** nenhum atualmente; prefira `fetch` nativo do Next.js quando necessário.
* **Local da camada de API:** ainda não existe; crie-a junto da funcionalidade consumidora, fora da apresentação.
* **Estratégia de estado do servidor:** recursos nativos do App Router antes de adicionar biblioteca.
* Requisições NÃO DEVEM ficar em componentes de apresentação; fluxos assíncronos DEVEM considerar carregamento, erro, vazio e sucesso.
* Dados externos DEVEM ser tratados como `unknown`, validados e mapeados quando diferirem do modelo interno.

---

## Estilos e Design System

* **Estilização:** CSS nativo global em `app/globals.css`.
* **Biblioteca de componentes:** nenhuma.
* **Tokens de design:** custom properties em `app/globals.css`.
* Prefira padrões existentes; não duplique primitivas nem adicione outra tecnologia de estilos sem necessidade documentada.
* Nomeie tokens pela função, não pelo valor.

---

## Acessibilidade

* Prefira HTML semântico a elementos genéricos com ARIA.
* Elementos interativos DEVEM funcionar por teclado e apresentar foco visível; campos DEVEM possuir rótulos acessíveis.
* Imagens DEVEM possuir texto alternativo apropriado.
* Relacione seções aos títulos com `aria-labelledby` quando aplicável.
* **Meta:** WCAG 2.2 nível AA; respeite `prefers-reduced-motion`.

---

## Testes

* **Unitários/integração:** Jest, React Testing Library e `userEvent` são o padrão definido, mas ainda não estão instalados; adicione configuração e script junto ao primeiro teste.
* **E2E:** não definido; exige decisão própria antes da adoção. Teste comportamento, não detalhes de implementação.
* Fluxos críticos candidatos a E2E: navegação pelo portfólio, descoberta de serviços e solicitação de orçamento.

---

## Carregamento Progressivo de Documentação

**CRÍTICO:** leia somente a documentação relevante à tarefa atual. Não carregue automaticamente todos os documentos do projeto.

| Tarefa | Ler |
| --- | --- |
| Implementação de UI/componentes | `CODING-PATTERNS.md`; skill `frontend-design` |
| Alteração de arquitetura/módulos | `CODING-PATTERNS.md`; OpenSpec relevante |
| Integração de API | `CODING-PATTERNS.md`; OpenSpec relevante |
| Testes | seção 12 de `CODING-PATTERNS.md`; skill `javascript-typescript-jest` |
| Design System | seção 20 de `CODING-PATTERNS.md`; skill `design-system` |
| Acessibilidade | seções 5 e 20 de `CODING-PATTERNS.md`; skill `web-design-guidelines` |

Se um documento referenciado não existir, inspecione o repositório antes de presumir suas regras.

---

## Skills e Fluxo do Agente

* **Planejamento:** OpenSpec para mudanças não triviais; use `openspec-explore` ou `openspec-propose` conforme a intenção.
* **Implementação:** use `openspec-apply-change` quando houver uma mudança OpenSpec aprovada.
* **Especificações:** `openspec/specs/` e `openspec/changes/`.
* **Skills especializadas:** `.agents/skills/` e `.codex/skills/`.

Para tarefas não triviais:

1. Entenda a especificação relevante e a implementação existente.
2. Leia somente a documentação necessária.
3. Produza ou atualize o plano quando exigido.
4. Implemente a menor solução sustentável.
5. Adicione ou atualize testes.
6. Execute as validações relevantes.
7. Relate decisões importantes, limitações e resultados.

---

## Regras Gerais

* Convenções existentes prevalecem; siga o código próximo e não adicione dependências desnecessárias.
* Não refatore código alheio ao escopo nem quebre compatibilidade sem especificação explícita.
* Evite abstrações especulativas e excesso de engenharia.
* Nunca exponha segredos, tokens, credenciais ou valores privados de ambiente.
* Falhas de lint, TypeScript, testes ou build causadas pela implementação são bloqueantes.
* Em conflitos, priorize: especificação → documentação → arquitetura existente → convenções gerais.

---

## Ressalvas Específicas do Projeto

* O projeto está em estágio inicial, sem API, persistência, autenticação, estado global ou testes; respeite o `package-lock.json` e não atualize versões `latest` incidentalmente.
* Com Next.js 16, `next lint` não existe; o script atual `npm run lint` falha até a migração para ESLint CLI e configuração flat. Não trate essa falha preexistente como causada por outra tarefa.
* Preserve conteúdo visível em português do Brasil e `lang="pt-BR"` no layout raiz.
