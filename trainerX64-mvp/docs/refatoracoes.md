# 🏗️ Refatorações Realizadas — TrainerX64
---

## Sumário

| # | Refatoração / Evolução | Camada de atuação |
|---|--------|-------------------|
| 1 | [Organização da Arquitetura do src](#1-organização-da-arquitetura-do-src) | Estrutura geral do frontend |
| 2 | [Extração dos Tipos](#2-extração-dos-tipos) | Tipagem (frontend) |
| 3 | [Extração dos Dados Mockados](#3-extração-dos-dados-mockados) | Dados de simulação |
| 4 | [Extração das Validações](#4-extração-das-validações) | Regras de negócio (formulários) |
| 5 | [Extração das Funções de Tema](#5-extração-das-funções-de-tema) | Identidade visual |
| 6 | [Criação da Camada de Services](#6-criação-da-camada-de-services) | Comunicação e persistência |
| 7 | [Refatoração do Chat](#7-refatoração-do-chat) | Comunicação simulada |
| 8 | [Integração Inicial com Backend](#8-integração-inicial-com-backend) | API REST |
| 9 | [Integração com Banco de Dados](#9-integração-com-banco-de-dados) | Persistência real |
| 10 | [Cadastro de Aluno pelo Frontend](#10-cadastro-de-aluno-pelo-frontend) | Integração frontend/backend |

---

## Objetivo do Documento

Este documento apresenta as principais refatorações e evoluções arquiteturais realizadas no projeto **TrainerX64** durante o desenvolvimento do MVP, seguindo o mesmo padrão de organização, linguagem e estrutura utilizado no documento de **Padrões Arquiteturais** do projeto.

O objetivo é registrar, de forma clara e acadêmica, as decisões técnicas tomadas para melhorar a organização do código, reduzir responsabilidades concentradas em arquivos grandes, facilitar a manutenção do sistema e preparar a aplicação para as integrações reais com backend, banco de dados e services previstas na arquitetura final.

---

## Contexto do Projeto

O TrainerX64 é um MVP de sistema para acompanhamento de treinos, alunos e personal trainers. O projeto foi iniciado como um frontend gerado a partir do Figma Make, com o seguinte stack inicial:

| Camada | Tecnologias do MVP |
|---|---|
| **Frontend** | React · Vite · TypeScript · Tailwind CSS |
| **Dados** | Dados mockados |
| **Persistência local** | `localStorage` |

Com a evolução do projeto, o MVP passou a contar com uma base inicial de **backend** e com uma integração inicial de **banco de dados**:

| Camada | Tecnologias adicionadas |
|---|---|
| **Backend** | Node.js · Express · TypeScript |
| **Banco de Dados** | PostgreSQL · Prisma ORM |

**Arquitetura final prevista para o TrainerX64:**

```
React Native + TypeScript   → Frontend mobile
Node.js + Express           → Backend
PostgreSQL + Prisma ORM     → Persistência
Firebase Authentication     → Autenticação
Firebase Cloud Messaging    → Notificações push
Socket.io                   → Comunicação em tempo real
Cloudinary CDN              → Armazenamento de mídia
WatermelonDB                → Persistência offline (mobile)
```

>  As refatorações descritas neste documento representam **etapas intermediárias** de evolução do MVP em direção a essa arquitetura final — nem todas as tecnologias previstas estão implementadas nesta fase do projeto.

---

## Situação Antes das Refatorações

Antes das refatorações, o arquivo principal do frontend concentrava praticamente toda a lógica da aplicação:

```
trainerX64-mvp/src/app/App.tsx
```

**Responsabilidades concentradas no App.tsx:**

- ❌ Telas do sistema
- ❌ Tipos e interfaces da aplicação
- ❌ Dados mockados de alunos, treinos, notificações e chat
- ❌ Funções de validação do cadastro
- ❌ Funções de tema visual
- ❌ Lógica de chat
- ❌ Lógica de navegação principal
- ❌ Parte da manipulação de dados

**Problemas causados por essa concentração:**

- ❌ Arquivo extenso e de difícil leitura
- ❌ Alto risco de erros ao alterar qualquer parte do código
- ❌ Dificuldade para localizar funcionalidades específicas
- ❌ Estrutura incompatível com a evolução prevista para backend e banco de dados real

---

## 1. Organização da Arquitetura do src

### 1.1  Descrição da Refatoração

**Tipo de refatoração:** Separação de responsabilidades / Reorganização estrutural

Para reduzir a responsabilidade do `App.tsx`, foram criadas pastas específicas dentro de `src`, cada uma com uma finalidade única e bem definida.

### 1.2 ✅ Justificativa da Escolha

Sem essa separação, qualquer novo tipo, dado, função utilitária ou service precisaria ser adicionado dentro do mesmo arquivo já sobrecarregado, tornando o projeto cada vez mais difícil de manter.

**Problemas que essa organização resolve no TrainerX64:**

- ✅ Reduz drasticamente o tamanho e a complexidade do `App.tsx`
- ✅ Cria fronteiras claras entre tipos, dados, utilitários e services
- ✅ Facilita a localização de qualquer parte do código
- ✅ Prepara a estrutura do frontend para crescer de forma organizada

### 1.3  Aplicação no Sistema

```
src/
├── 📁 app/
│   └── App.tsx              → Telas e navegação principal
│
├── 📁 data/
│   └── mockData.ts          → Dados mockados do MVP
│
├── 📁 services/
│   ├── api.ts                → Comunicação central com o backend
│   ├── alunoService.ts       → Listagem e cadastro de alunos
│   ├── chatService.ts        → Lógica do chat simulado
│   ├── storageService.ts     → Persistência local (localStorage)
│   └── treinoService.ts      → Listagem de treinos
│
├── 📁 types/
│   └── app.ts                → Tipos e interfaces da aplicação
│
└── 📁 utils/
    ├── theme.ts               → Funções de identidade visual
    └── validation.ts          → Validações do cadastro
```

>  **Nota:** os services concentram toda a comunicação com o backend, mantendo fallback para os dados de `mockData.ts` sempre que a API não estiver disponível.

---

## 2. Extração dos Tipos

### 2.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Type

Os tipos e interfaces da aplicação, antes declarados diretamente dentro do `App.tsx`, foram centralizados em um único arquivo.

**Comparativo antes / depois:**

| | Antes | Depois |
|---|---|---|
| **Localização** | Dentro do `App.tsx` | `src/types/app.ts` |
| **Reaproveitamento** | Limitado ao próprio arquivo | Disponível para services, telas e utilitários |
| **Risco de duplicação** | 🔴 Alto | 🟢 Baixo |

**Tipos envolvidos:**

```
Screen
UserType
AppUser
Student
Workout
Exercise
Notif
ChatMsg
Tipos relacionados ao cadastro
```

### 2.2 ✅ Benefícios

- ✅ Evita duplicação de tipos
- ✅ Facilita o reaproveitamento entre telas, services e funções auxiliares
- ✅ Melhora a organização do TypeScript no projeto
- ✅ Permite que os services utilizem os mesmos tipos definidos para o frontend

---

## 3. Extração dos Dados Mockados

### 3.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Data / Move Constant

Os dados mockados, utilizados para simular informações do sistema, foram movidos de dentro do `App.tsx` para um arquivo dedicado.

**Comparativo antes / depois:**

| | Antes | Depois |
|---|---|---|
| **Localização** | Dentro do `App.tsx` | `src/data/mockData.ts` |
| **Separação de camadas** | Dados misturados com interface | Dados isolados da interface visual |

**Dados envolvidos:**

```
STUDENTS
WORKOUTS
NOTIFS
CHAT_MOCK
WEEK
MONTHS
ALL_EX
```

### 3.2 ✅ Benefícios

- ✅ Melhor separação entre dados de simulação e interface visual
- ✅ Facilita a substituição futura por dados vindos do backend
- ✅ Permite manter fallback para dados mockados em caso de indisponibilidade da API
- ✅ Reduz o tamanho e a complexidade do `App.tsx`

---

## 4. Extração das Validações

### 4.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Function / Move Function

**Problema identificado:** a validação dos campos de cadastro estava implementada diretamente dentro do componente `Register`, em funções internas. Isso deixava o componente mais carregado e misturava regra de validação com lógica de interface.

**Refatoração aplicada:** foi aplicada a técnica **Extract Function**, criando as funções `validateRegisterStepOne` e `validateRegisterStepTwo`, que recebem os dados do formulário e retornam um objeto de erros. Em seguida, as funções foram movidas, por **Move Function**, para:

```
src/utils/validation.ts
```

### 4.2 ✅ Benefícios

- ✅ Código mais limpo no componente principal
- ✅ Validações mais fáceis de localizar e manter
- ✅ Melhor separação entre lógica de validação e renderização de tela
- ✅ Possibilidade de reaproveitamento das validações em outras telas

---

## 5. Extração das Funções de Tema

### 5.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Function / Move Function

As funções responsáveis pela definição de cores por perfil de usuário — `AC`, `AC_BG` e `GRAD` — foram movidas do `App.tsx` para:

```
src/utils/theme.ts
```

### 5.2  Padrão de Cores por Perfil

| Perfil | Cor de destaque |
|---|---|
| **Personal Trainer** | 🔵 Azul / Ciano |
| **Aluno** | 🟢 Verde |

### 5.3 ✅ Benefícios

- ✅ Centralização da identidade visual da aplicação
- ✅ Facilita ajustes futuros de cor sem impactar outras partes do código
- ✅ Evita repetição de lógica visual em diferentes telas
- ✅ Mantém consistência visual entre os perfis de usuário

---

## 6. Criação da Camada de Services

### 6.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Service / Introdução de camada de serviço

Antes desta refatoração, a lógica de persistência e manipulação de dados estava espalhada entre componentes e funções internas do `App.tsx`. Foram criados services específicos para organizar essa comunicação:

```
src/services/storageService.ts
src/services/chatService.ts
src/services/api.ts
src/services/alunoService.ts
src/services/treinoService.ts
```

### 6.2 ✅ Justificativa da Escolha

A criação de uma camada de services aproxima o MVP de uma arquitetura mais realista, na qual a interface **não acessa diretamente** a fonte dos dados, mas sim uma camada intermediária responsável por essa comunicação.

**Sem a camada de services, o projeto teria:**

- ❌ Chamadas de API espalhadas por diferentes componentes
- ❌ Dificuldade para trocar a origem dos dados (mock → API real)
- ❌ Alto acoplamento entre telas e dados

**Com a camada de services:**

- ✅ Facilita a integração com o backend
- ✅ Centraliza as chamadas HTTP em um único ponto
- ✅ Permite fallback para dados mockados quando necessário
- ✅ Reduz o acoplamento entre telas e dados

### 6.3  Aplicação no Sistema

| Service | Responsabilidade |
|---|---|
| `api.ts` | Centraliza a comunicação HTTP com o backend |
| `alunoService.ts` | Listagem e cadastro de alunos |
| `treinoService.ts` | Listagem de treinos |
| `chatService.ts` | Lógica de mensagens do chat simulado |
| `storageService.ts` | Persistência local via `localStorage` |

---

## 7. Refatoração do Chat

### 7.1  Descrição da Refatoração

**Tipo de refatoração:** Extract Service / Encapsulamento de lógica

A lógica de mensagens do chat, antes implementada diretamente dentro da tela, foi movida para:

```
src/services/chatService.ts
```

A persistência local das mensagens foi centralizada em:

```
src/services/storageService.ts
```

>  **Observação importante:** no MVP, o chat permanece **simulado**, utilizando estado local e `localStorage`. O uso de **Socket.io** para comunicação em tempo real é uma tecnologia **prevista para a versão final** do sistema, ainda não implementada nesta etapa.

### 7.2 ✅ Benefícios

- ✅ Código mais organizado
- ✅ Separação clara entre lógica de mensagens e interface
- ✅ Persistência simulada centralizada em um único service
- ✅ Preparação da estrutura para uma futura integração de chat em tempo real

---

## 8. Integração Inicial com Backend

### 8.1  Descrição da Evolução

**Tipo de evolução:** Introdução de camada de API / Separação frontend/backend

Antes desta etapa, o frontend utilizava exclusivamente dados mockados locais, sem qualquer comunicação com um servidor externo. Foi então criada uma pasta de backend dentro do projeto:

```
trainerX64-mvp/backend
```

**Tecnologias utilizadas:**

| Tecnologia | Finalidade |
|---|---|
| Node.js | Ambiente de execução do backend |
| Express | Framework para as rotas da API |
| TypeScript | Tipagem estática no backend |
| CORS | Permitir comunicação entre frontend e backend |
| Dotenv | Gerenciamento de variáveis de ambiente |

**Rotas iniciais implementadas:**

```
GET /alunos
GET /treinos
```

No frontend, foi criado o service central de comunicação com a API:

```
src/services/api.ts
```

Além dos services específicos:

```
src/services/alunoService.ts
src/services/treinoService.ts
```

>  **Observação:** nesta etapa, o backend foi iniciado **apenas** com rotas para as entidades **alunos** e **treinos**. As demais funcionalidades do sistema ainda não possuem integração com o backend, permanecendo simuladas no frontend.

### 8.2 ✅ Benefícios

- ✅ O frontend passa a consumir uma API real
- ✅ O backend passa a centralizar parte dos dados da aplicação
- ✅ O sistema fica mais próximo da arquitetura planejada
- ✅ Facilita a integração futura com banco de dados

---

## 9. Integração com Banco de Dados

### 9.1  Descrição da Evolução

**Tipo de evolução:** Introdução de persistência real / Integração com ORM

**Tecnologias utilizadas:**

| Tecnologia | Finalidade |
|---|---|
| PostgreSQL | Banco de dados relacional |
| Prisma ORM | Camada de acesso ao banco de dados |

**Arquivos envolvidos:**

```
backend/prisma/schema.prisma
backend/src/database/prisma.ts
backend/src/controllers/alunos.controller.ts
backend/src/routes/alunos.routes.ts
```

>  **Observação:** a integração com o banco de dados foi realizada, nesta etapa, **inicialmente para a entidade Aluno**. As demais entidades do sistema, como treinos e notificações, ainda não possuem persistência real no banco de dados.

### 9.2 ✅ Justificativa da Escolha

A integração com o banco de dados permite substituir gradualmente os dados mockados por dados persistidos de forma real, **sem a necessidade de reescrever o MVP**.

### 9.3  Aplicação no Sistema

| Rota | Ação no banco de dados |
|---|---|
| `GET /alunos` | Busca os alunos persistidos via Prisma Client |
| `POST /alunos` | Cadastra um novo aluno no PostgreSQL |

---

## 10. Cadastro de Aluno pelo Frontend

### 10.1  Descrição da Evolução

**Tipo de evolução:** Integração frontend/backend / Ajuste de estado dinâmico / Comunicação com API

A tela **Meus Alunos**, que antes utilizava diretamente a lista mockada `STUDENTS`, passou a utilizar estado dinâmico:

```
students
setStudents
```

O service `alunoService.ts` passou a realizar as seguintes operações:

```
GET /alunos
POST /alunos
```

**Arquivos envolvidos:**

```
src/app/App.tsx
src/services/api.ts
src/services/alunoService.ts
```

>  **Observação:** esta integração se aplica especificamente ao **cadastro de alunos gerenciado pelo Personal Trainer**. O fluxo inicial de criação de conta e login do usuário **permanece simulado** no MVP, não fazendo parte desta integração.

### 10.2 ✅ Benefícios

- ✅ Permite cadastrar um aluno diretamente pelo frontend
- ✅ Atualiza automaticamente a lista de alunos após o cadastro
- ✅ Integra a tela **Meus Alunos** com o backend e o banco de dados
- ✅ Mantém fallback para dados mockados em caso de falha na comunicação com a API

---

## Cuidados Tomados nas Refatorações

Durante a realização das refatorações e evoluções descritas neste documento, foram mantidos os seguintes cuidados:

- ✅ Não recriar o MVP do zero
- ✅ Preservar a interface visual já existente
- ✅ Manter o aplicativo funcionando durante todas as mudanças
- ✅ Evitar refatorações muito grandes em uma única etapa
- ✅ Separar as alterações por branch específica
- ✅ Utilizar Pull Requests para integrar as alterações na branch `develop`
- ✅ Manter a branch `main` como versão estável do projeto
- ✅ Manter fallback para dados mockados sempre que necessário, especialmente em funcionalidades ainda não totalmente integradas ao backend

---

## Branches Relacionadas

| Branch | Finalidade |
|---|---|
| `refactor/organiza-arquitetura-src` | Reorganização da estrutura do frontend |
| `feature/backend-inicial` | Criação da API inicial com Express |
| `feature/database-prisma-postgresql` | Integração com PostgreSQL e Prisma |
| `feature/cadastro-aluno-front` | Integração do cadastro de aluno com o backend |
| `docs/refatoracoes` | Documentação das refatorações realizadas |

---

## Estratégia de Versionamento

O fluxo de versionamento utilizado no projeto seguiu o seguinte padrão:

```
feature/ | refactor/ | docs/
        ↓
     develop
        ↓
       main
```

A branch `develop` foi utilizada como branch de integração das novas funcionalidades e refatorações. A branch `main` foi utilizada como branch estável, representando as versões prontas para entrega.

Cada alteração relevante — seja uma nova funcionalidade, uma refatoração ou uma atualização de documentação — foi desenvolvida em uma branch específica, nomeada de acordo com seu propósito (`feature/`, `refactor/` ou `docs/`), e posteriormente integrada à `develop` por meio de Pull Requests.

---

## Resumo Geral das Refatorações

| Refatoração | Tipo | Localização final | Status |
|---|---|---|---|
| Organização do src | Separação de responsabilidades | `src/types`, `src/data`, `src/utils`, `src/services` | ✅ Concluída |
| Extração dos Tipos | Extract Type | `src/types/app.ts` | ✅ Concluída |
| Extração dos Dados Mockados | Extract Data | `src/data/mockData.ts` | ✅ Concluída |
| Extração das Validações | Extract Function / Move Function | `src/utils/validation.ts` | ✅ Concluída |
| Extração das Funções de Tema | Extract Function / Move Function | `src/utils/theme.ts` | ✅ Concluída |
| Criação da Camada de Services | Extract Service | `src/services/*` | ✅ Concluída |
| Refatoração do Chat | Extract Service | `src/services/chatService.ts` | 🟡 Simulado (Socket.io previsto) |
| Integração com Backend | Introdução de API | `backend/` | 🟡 Parcial (alunos e treinos) |
| Integração com Banco de Dados | Persistência real | `backend/prisma/*` | 🟡 Parcial (entidade Aluno) |
| Cadastro de Aluno pelo Frontend | Integração frontend/backend | `App.tsx`, `alunoService.ts` | ✅ Concluída |

---

## Conclusão

As refatorações realizadas no TrainerX64 contribuíram significativamente para a melhoria da organização interna do projeto, reduzindo as responsabilidades concentradas no `App.tsx` e preparando o MVP para integrações reais com backend e banco de dados.

Embora algumas funcionalidades ainda permaneçam simuladas nesta etapa do desenvolvimento — como o chat, o fluxo de login e o cadastro inicial de conta —, o projeto passou a apresentar uma arquitetura mais clara, modular e evolutiva, compatível com os padrões arquiteturais e com as tecnologias previstas para a versão final do sistema. A adoção de uma estratégia de versionamento organizada, baseada em branches específicas e Pull Requests, também contribuiu para que essas mudanças fossem realizadas de forma segura e controlada, sem comprometer a estabilidade do MVP.
