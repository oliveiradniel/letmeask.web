# ❓ Plataforma Web LetMeAsk

> Interface web para um sistema de perguntas e respostas com IA que transforma áudio em conhecimento pesquisável utilizando RAG (Retrieval Augmented Generation).

A aplicação permite que usuários criem salas, gravem áudios em tempo real e façam perguntas que são respondidas com base no conteúdo dessas gravações.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

## 🎯 O que este projeto resolve

Em sistemas baseados em IA, não basta ter um bom backend.

É necessário uma interface que:

- lide com estados assíncronos complexos
- responda em tempo real
- mantenha fluídez mesmo com processamento de IA

Este projeto foca exatamente nisso:
> experiência do usuário em um sistema com pipeline de IA contínuo.

---

## ⚙️ Como funciona (experiência do usuário)

A aplicação foi desenhada para funcionar de forma fluida mesmo com processamento assíncrono:

- O usuário grava áudio diretamente na interface
- O áudio é enviado em chunks a cada 5 segundos
- A API processa e gera contexto incrementalmente
- Perguntas podem ser feitas a qualquer momento
- Respostas são exibidas dinamicamente com base no contexto disponível

---

## ⚡ Destaque de engenharia (Frontend)

### Optimistic UI + Estado assíncrono avançado

A aplicação utiliza **TanStack Query** com controle refinado de estados:

- `onMutate` → atualização imediata da UI
- `onError` → rollback consistente
- `onSuccess` → sincronização com servidor

Foram criadas extensões específicas de estado:

- `QuestionQueryData._isGeneratingAnswer`
- `RoomQueryData._isCreating`

👉 Isso permite simular comportamento de aplicações como:

- chat em tempo real
- sistemas de mensagem (ex: WhatsApp, Discord)

---

## 🧠 Integração com IA (RAG)

O frontend não é apenas consumidor de API.

Ele é responsável por:

- controlar o fluxo de envio de áudio
- refletir estados intermediários de geração de resposta
- lidar com latência de IA sem quebrar UX

---

## 🧱 Arquitetura (visão frontend)

![LetMeAsk - Arquitetura](https://raw.githubusercontent.com/oliveiradniel/letmeask.web/refs/heads/main/src/assets/images/frontend_architecture.png)

---

## 🎨 Interface

### Listagem de salas

![LetMeAsk - Tela de Criação de Listagem de Salas](https://raw.githubusercontent.com/oliveiradniel/letmeask.web/refs/heads/main/_screenshots/room-listing-creation-page.png)

### Perguntas e respostas

Criação de perguntas sobre a sala e listagem perguntas feitas e respondidas.

![LetMeAsk - Tela de Criação e Listagem de Perguntas](https://raw.githubusercontent.com/oliveiradniel/letmeask.web/refs/heads/main/_screenshots/question-listing-creation-page.png)

### Gravação de áudio

![LetMeAsk - Tela de Gravação de Áudio](https://raw.githubusercontent.com/oliveiradniel/letmeask.web/refs/heads/main/_screenshots/record-page.png)

## 🚀 Stacks Principais (Produção)

| Tecnologia                   | Papel no Sistema                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Vite                         | Build tool ultra-rápido para o desenvolvimento e empacotamento do projeto.                   |
| React                        | Biblioteca principal para construção da interface baseada em componentes.                    |
| TailwindCSS                  | Framework CSS utilitário para estilização rápida e responsiva.                               |
| React Router              | Gerenciamento de rotas para navegação na SPA.                 |
| TanStack Query (React Query) | Gerenciamento de estado assíncrono, cache e sincronização de dados com a API.                |
| Axios                        | Cliente HTTP para consumo dos endpoints REST da API Quarkus.                                 |
| React Hook Form              | Gerenciamento de formulários focado em performance e validação flexível.                     |
| Zod                          | Esquema de validação de dados com tipagem estática para garantir a integridade dos inputs.   |
| Lucide React                          | Ícones.   |

---

## 🧪 Stacks de Desenvolvimento

| Tecnologia                   | Uso                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| shadcn                       | Componentes de interface reutilizáveis e acessíveis, construídos com Radix UI.               |
| Prettier                     | Formatador de código opinativo para manter a consistência visual do projeto.                 |
| ESLint                       | Ferramenta de linting para identificar e corrigir problemas no código JavaScript/TypeScript. |
| Husky                       | Git hooks (qualidade de commits). |
| Commitlint                       | Padronização de commits. |

---

## 📄 Variáveis de Ambiente

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome           | Descrição                | Exemplo                 |
| -------------- | ------------------------ | ----------------------- |
| `VITE_API_URL` | URL de conexão com a API | `http://localhost:3001` |

---

## ▶️ Instruções para rodar a plataforma web

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/letmeask.web.git
cd lestmeask.web
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:

```bash
# Linux/macOS
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env

```

4. Execute a aplicação:

```bash
npm run dev
```

---

## 🛜 Conexão com a API

Este projeto consome a API:

👉 [https://github.com/oliveiradniel/letmeask.web](https://github.com/oliveiradniel/letmeask.web)

## 🧑🏻‍💻 Veja mais projetos meus

### Produção

- [JungleOps](https://jungleops.com.br/cadastro?redirect=%2Ftarefas) - Gestão de tarefas em equipe em tempo real..
- [InOrbit](https://app.inorbit.site/login) - Gestão de metas semanais com gamificação.Gestão de metas semanais com gamificação.

### Repositório

- [Plataforma ForgePlan](https://github.com/oliveiradniel/forgeplan-web) - Aplicação web para organização e descoberta de livros com integração à Google Books API.
- [Plataforma Jovem Books](https://github.com/oliveiradniel/jovem-books-front-end) - Aplicação web para controle de produção industrial com cálculo preciso.
