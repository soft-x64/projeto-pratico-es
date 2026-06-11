# 📦 C4 — Nível 2: Containers — TrainerX64

> **Disciplina:** Engenharia de Software I — ICET/UFAM
> **Professor:** Dr. Andrey Rodrigues
> **Documento:** TP2 — Diagrama de Containers (C4 Model)

---

## 📋 Sumário

| # | Container | Tecnologia |
|---|-----------|------------|
| 1 | [App Mobile](#1-app-mobile) | React Native |
| 2 | [Backend API](#2-backend-api) | Node.js + Express + Socket.io |
| 3 | [Banco de Dados](#3-banco-de-dados) | PostgreSQL |
| 4 | [Firebase Auth](#4-firebase-auth-sistema-externo) | Firebase Authentication |
| 5 | [Firebase FCM](#5-firebase-fcm-sistema-externo) | Firebase Cloud Messaging |
| 6 | [Cloudinary](#6-cloudinary-sistema-externo) | CDN de Mídia |

---

## 🧭 Sobre o Nível de Containers

O **nível 2 do C4 Model** amplia o zoom sobre o sistema TrainerX64, revelando os processos e armazenamentos de dados que o compõem. Cada container é uma unidade executável ou armazenável de forma independente — ou seja, um processo separado, um banco de dados ou um aplicativo. O objetivo deste diagrama é mostrar **o que existe**, **qual tecnologia cada parte usa** e **como as partes se comunicam entre si**.

---

## 👥 Atores do Sistema

| Ator | Sigla | Descrição |
|---|---|---|
| **Personal Trainer** | PT | Gerencia alunos, treinos, agenda, cobranças e comunicação |
| **Aluno** | A | Acessa treinos, registra evoluções e se comunica com o PT |
| **Aluno com Acessibilidade** | AA | Mesmas ações do Aluno, com suporte a leitura por voz, alto contraste e navegação simplificada |

Todos os três atores interagem exclusivamente com o **App Mobile** — não há acesso direto ao backend ou ao banco de dados.

---

## 🗺️ Diagrama de Containers

<!-- ===========================================================
     FIGURA — Diagrama C4 de Containers do TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama C4 nível 2 (Containers) com:
     ATORES (fora do sistema):
       - Personal Trainer [Person]
       - Aluno [Person]
       - Aluno com Acessibilidade [Person — AA]
     CONTAINERS INTERNOS (dentro do boundary TrainerX64):
       - App Mobile [React Native] — MVVM + WatermelonDB offline
       - Backend API [Node.js + Express + Socket.io] — Monolito Modular
       - Banco de Dados [PostgreSQL]
     SISTEMAS EXTERNOS (fora do boundary):
       - Firebase Auth [autenticação]
       - Firebase FCM [notificações push]
       - Cloudinary [CDN de mídia]
     RELAÇÕES:
       - PT / A / AA → App Mobile: "usa"
       - App Mobile → Backend API: "HTTP REST"
       - App Mobile ↔ Backend API: "WebSocket (Socket.io)"
       - Backend API → Banco de Dados: "lê/escreve via Prisma ORM"
       - Backend API → Firebase Auth: "valida tokens e credenciais"
       - Backend API → Firebase FCM: "publica eventos de notificação"
       - Backend API → Cloudinary: "armazena e referencia URLs de mídia"
       - Firebase FCM → App Mobile: "entrega notificações push"
     Salvar em: diagramas/c4/fig-containers.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura — Diagrama C4 de Containers do TrainerX64** |
| | *Inserir imagem: `diagramas/c4/fig-containers.png`* |
| | *Legenda: Visão dos containers internos, sistemas externos e relações de comunicação. Fonte: elaborado pelos autores.* |

---

## 1. App Mobile

**Tecnologia:** React Native

**Responsabilidade:** É o único ponto de contato entre os três perfis de usuário (PT, A e AA) e o sistema. Responsável por renderizar todas as telas, gerenciar o estado local via MVVM e persistir dados offline quando não há conexão com a internet.

**Características principais:**

- Implementa o padrão **MVVM**: cada tela possui um ViewModel dedicado que gerencia o estado e se comunica com o backend via HTTP REST
- Embute o **WatermelonDB** para persistência local — permite que o Aluno acesse suas fichas de treino mesmo sem conexão. Ao restabelecer a rede, sincroniza automaticamente com o PostgreSQL
- Consome as APIs de acessibilidade nativas do iOS (`VoiceOver`) e Android (`TalkBack`) para atender o perfil AA, via `accessibilityLabel` e `AccessibilityInfo`
- Mantém uma conexão **WebSocket via Socket.io** para o chat em tempo real com o Personal Trainer

**Relações:**

| De | Para | Protocolo | Descrição |
|---|---|---|---|
| PT / A / AA | App Mobile | Interface nativa | Interação direta com o aplicativo |
| App Mobile | Backend API | HTTP REST | Todas as operações CRUD dos módulos |
| App Mobile | Backend API | WebSocket | Chat bidirecional em tempo real |
| Firebase FCM | App Mobile | Push Notification | Recebimento de eventos e lembretes |

---

## 2. Backend API

**Tecnologia:** Node.js + Express + Socket.io

**Responsabilidade:** Motor lógico central do sistema. Processa todas as regras de negócio, autentica requisições, coordena eventos assíncronos e persiste dados no banco. Organizado internamente como um **Monolito Modular** com 9 módulos de domínio.

**Módulos internos:**

| Módulo | Responsabilidade | Perfis atendidos |
|---|---|---|
| `modulo-autenticacao` | Login, registro, sessão e controle de permissões | PT · A · AA |
| `modulo-alunos` | Cadastro, busca e gerenciamento de alunos | PT |
| `modulo-treinos` | Criação, edição, publicação e histórico de treinos | PT · A · AA |
| `modulo-evolucao` | Registro de medições e cálculo de progresso físico | PT · A · AA |
| `modulo-agenda` | Planejamento de compromissos e lembretes | PT |
| `modulo-financeiro` | Agenda de cobranças: mensalidades, pendências e recebimentos informados | PT |
| `modulo-comunicacao` | Chat e troca de mensagens via WebSocket | PT · A · AA |
| `modulo-relatorios` | Geração automática de relatórios por aluno e período | PT · A · AA |
| `modulo-notificacoes` | Disparo de eventos para o FCM e controle de notificações | A · AA |

> ⚠️ **Regra fundamental do Monolito Modular:** nenhum módulo acessa diretamente o código interno de outro. Toda comunicação ocorre pelas interfaces públicas de cada módulo.

**Acesso a dados:** Todos os módulos utilizam o **Repository Pattern** implementado via **Prisma ORM**, que abstrai as operações SQL e garante tipagem TypeScript dos modelos.

**Relações:**

| De | Para | Protocolo | Descrição |
|---|---|---|---|
| App Mobile | Backend API | HTTP REST | Requisições de todos os módulos |
| App Mobile | Backend API | WebSocket | Mensagens do chat em tempo real |
| Backend API | PostgreSQL | SQL via Prisma | Leitura e escrita de todos os dados |
| Backend API | Firebase Auth | HTTPS | Validação de tokens JWT por requisição |
| Backend API | Firebase FCM | HTTPS | Publicação de eventos Pub/Sub |
| Backend API | Cloudinary | HTTPS | Armazenamento e referência de URLs de mídia |

---

## 3. Banco de Dados

**Tecnologia:** PostgreSQL

**Responsabilidade:** Armazenamento persistente e centralizado de todos os dados do sistema — alunos, treinos, evoluções, mensalidades, mensagens, agenda e relatórios.

**Características principais:**

- Garante integridade referencial entre entidades relacionadas — um "Treino Mãe" pode gerar múltiplas fichas customizadas por aluno com consistência garantida por chaves estrangeiras
- Nunca é acessado diretamente pelos módulos do backend — toda comunicação passa pelo **Prisma ORM**, que implementa os repositórios definidos no Repository Pattern
- Gerenciado por migrações automáticas do Prisma, mantendo o schema versionado junto ao código

**Relações:**

| De | Para | Descrição |
|---|---|---|
| Backend API | PostgreSQL | Leitura e escrita via Prisma ORM |

---

## 4. Firebase Auth — Sistema Externo

**Tecnologia:** Firebase Authentication (Google)

**Responsabilidade:** Gerenciamento centralizado de identidades e autenticação dos três perfis de usuário. Emite tokens JWT com claims customizados que identificam o perfil (PT, A ou AA), utilizados pelo backend para aplicar permissões por rota e módulo.

**Relações:**

| De | Para | Descrição |
|---|---|---|
| Backend API | Firebase Auth | Validação de tokens JWT a cada requisição |

---

## 5. Firebase FCM — Sistema Externo

**Tecnologia:** Firebase Cloud Messaging (Google)

**Responsabilidade:** Broker do padrão **Pub/Sub** — recebe eventos publicados pelo backend e os entrega como notificações push para os dispositivos dos usuários. Garante entrega assíncrona sem bloquear o fluxo principal do sistema.

**Eventos publicados pelo backend:**

| Evento | Subscriber | Descrição |
|---|---|---|
| `treino.publicado` | A · AA | Novo treino disponível para o aluno |
| `evolucao.registrada` | PT | Aluno registrou evolução — relatório disponível |
| `relatorio.gerado` | PT · A · AA | Relatório de progresso gerado |
| `mensagem.enviada` | A · AA | Nova mensagem do personal no chat |
| `compromisso.agendado` | PT · A · AA | Lembrete de compromisso na agenda |
| `cobranca.pendente` | PT | Mensalidade em aberto identificada |

> ♿ **Para o perfil AA**, os payloads das notificações incluem descrições textuais alternativas compatíveis com leitores de tela, garantindo que o conteúdo seja compreendido via narração de voz.

**Relações:**

| De | Para | Descrição |
|---|---|---|
| Backend API | Firebase FCM | Publicação de eventos assíncronos |
| Firebase FCM | App Mobile | Entrega de notificações push |

---

## 6. Cloudinary — Sistema Externo

**Tecnologia:** Cloudinary CDN

**Responsabilidade:** Hospedagem e entrega otimizada dos vídeos demonstrativos do catálogo de exercícios. Alivia o backend de tráfego de arquivos pesados, entregando o conteúdo diretamente ao app mobile via CDN global com otimização automática de qualidade e resolução.

**Integração:** O `modulo-treinos` do backend armazena apenas a **URL** da mídia no PostgreSQL. O app mobile acessa o vídeo diretamente pela URL do Cloudinary — o backend nunca manipula o arquivo em si.

**Relações:**

| De | Para | Descrição |
|---|---|---|
| Backend API | Cloudinary | Upload e referência de URLs de vídeo |
| App Mobile | Cloudinary | Streaming direto de vídeos via CDN |

---

## 📊 Resumo das Relações

| Origem | Destino | Protocolo | Direção |
|---|---|---|---|
| PT / A / AA | App Mobile | Interface nativa | → |
| App Mobile | Backend API | HTTP REST | ↔ |
| App Mobile | Backend API | WebSocket (Socket.io) | ↔ |
| App Mobile | Cloudinary | HTTPS (streaming) | → |
| Backend API | PostgreSQL | SQL via Prisma | ↔ |
| Backend API | Firebase Auth | HTTPS | → |
| Backend API | Firebase FCM | HTTPS | → |
| Backend API | Cloudinary | HTTPS | → |
| Firebase FCM | App Mobile | Push Notification | → |

---

## 📚 Referências

- BROWN, Simon. *The C4 Model for Visualising Software Architecture*. Disponível em: [https://c4model.com](https://c4model.com)
- MARTIN, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall, 2017.
- Prisma Documentation. *Prisma ORM*. Prisma, 2024. Disponível em: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- Firebase Documentation. *Firebase Cloud Messaging* e *Firebase Authentication*. Google, 2024. Disponível em: [https://firebase.google.com/docs](https://firebase.google.com/docs)

---

<div align="center">

*Documento elaborado para o Trabalho Prático II — Engenharia de Software I — ICET/UFAM*

</div>
