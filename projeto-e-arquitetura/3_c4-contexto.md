# 🗺️ C4 — Nível 1: Contexto — TrainerX64
---

## 📋 Sumário

| # | Elemento | Tipo | Descrição Macro |
|---|----------|------|-----------------|
| 1 | [Personal Trainer](#-atores-do-sistema) | Pessoa | Gerencia alunos, monta planilhas de exercícios e acompanha a evolução física. |
| 2 | [Aluno](#-atores-do-sistema) | Pessoa | Consulta fichas de treino, registra cargas diárias e interage via chat. |
| 3 | [Aluno com Acessibilidade](#-atores-do-sistema) | Pessoa | Consome recursos assistivos de voz e contraste para treinar com autonomia. |
| 4 | [Sistema TrainerX64](#-sistema-central) | Sistema de Software | O ecossistema completo (App + Backend + Banco) tratado como caixa preta. |
| 5 | [Firebase Auth](#-sistemas-externos-de-terceiros) | Sistema Externo | Gerenciamento descentralizado de identidades, segurança e sessões. |
| 6 | [Firebase FCM](#-sistemas-externos-de-terceiros) | Sistema Externo | Broker Pub/Sub responsável pelo disparo assíncrono de notificações. |
| 7 | [Cloudinary CDN](#-sistemas-externos-de-terceiros) | Sistema Externo | Armazenamento e streaming otimizado dos vídeos do catálogo de exercícios. |

---
## 🧭 Sobre o Nível de Contexto

O **nível 1 do C4 Model** estabelece o ponto de partida da arquitetura, definindo o escopo do ecossistema **TrainerX64**. Neste momento, o sistema é tratado estritamente como uma **caixa preta única**, ocultando qualquer detalhe de implementação interna (como linguagens, frameworks ou bancos de dados). O objetivo primordial deste artefato é mapear quem são os usuários do sistema, quais sistemas externos de terceiros são consumidos e como o fluxo de valor transita entre essas fronteiras através de canais síncronos e assíncronos.

---

## 👥 Atores do Sistema

| Ator | Sigla | Descrição no Contexto de Negócio |
|---|---|---|
| **Personal Trainer** | PT | Usuário responsável pela gestão avançada de alunos, criação de planilhas de exercícios "mãe", monitoramento de evolução física, controle de agenda e auditoria de cobranças. |
| **Aluno** | A | Usuário final convencional que consulta rotinas de treino vigentes, registra cargas diárias executadas, acompanha o histórico de progresso e comunica-se com o PT. |
| **Aluno com Acessibilidade** | AA | Usuário final com necessidades específicas de navegação. Acessa as mesmas rotinas de treino e históricos que o aluno comum, utilizando de forma autônoma recursos assistivos de leitura por voz, alto contraste e gestos simplificados. |

---

## 🗺️ Diagrama de Contexto

Abaixo está a representação gráfica do ecossistema macro. O diagrama separa claramente os limites do software das dependências externas de nuvem, além de evidenciar a presença de conexões persistentes de WebSockets (para o chat) operando paralelamente às requisições tradicionais.

| | |
|---|---|
| 📷 | **Figura — Diagrama C4 de Contexto do TrainerX64** |
| | ![Diagrama C4 de Contexto](https://i.ibb.co/6R2g9XF0/diagrama-c4-contexto-trainerx64.png)|
| | *Legenda: Relação de alto nível entre atores, fronteiras do sistema central e integrações. Fonte: elaborado pelos autores.* |

---
## 🏗️ Sistema Central

**Identificação:** Sistema TrainerX64

**Responsabilidade:** Centraliza e governa todas as capacidades do negócio. Atua processando cadastros, regras de validação de exercícios, históricos de medições físicas, persistência e roteamento de mensagens. No escopo do Nível 1, ele abstrai a totalidade do código (Monolito), as interfaces mobile (React Native) e os bancos relacionais (PostgreSQL), unificand-os sob uma única perspectiva operacional.

---

## ☁️ Sistemas Externos de Terceiros

### 1. Firebase Auth
- **Responsabilidade:** Provedor externo de identidade (*Identity Provider*). Isola a complexidade de criptografia de senhas, validações de e-mail e emissão de tokens seguros da aplicação.
- **Integração:** Toda requisição recebida pelo ecossistema central tem sua assinatura digital validada de forma automatizada contra as chaves públicas deste parceiro.

### 2. Firebase FCM
- **Responsabilidade:** Atua como o motor de mensageria assíncrona orientada a eventos (**Pub/Sub**). Garante o desacoplamento de infraestrutura ao despachar notificações push em background diretamente para os sistemas operacionais móveis dos atores (PT, A e AA).
- **Acessibilidade (AA):** Os payloads assinados garantem compatibilidade com os leitores locais de tela dos smartphones dos alunos com acessibilidade.

### 3. Cloudinary CDN
- **Responsabilidade:** Rede de Distribuição de Conteúdo (*Content Delivery Network*). Gerencia de forma autônoma o armazenamento de arquivos pesados de mídia (vídeos) e realiza o streaming dinâmico adaptando resolução e consumo de rede de forma transparente para o aplicativo.

---

## 📊 Tabela Geral de Relações de Contexto

Esta matriz consolida a malha de comunicações macros que compõe o Nível 1 do C4 Model do sistema TrainerX64.

| Elemento de Origem | Elemento de Destino | Protocolo / Meio | Tipo de Fluxo | Descrição da Interação |
|---|---|---|---|---|
| Personal Trainer (PT) | Sistema TrainerX64 | HTTPS | Síncrono | Prescreve novos treinos, cria fichas e consome relatórios. |
| Aluno (A) | Sistema TrainerX64 | HTTPS | Síncrono | Consulta fichas, envia feedback e registra evolução de carga. |
| Aluno com Acessibilidade (AA) | Sistema TrainerX64 | HTTPS | Síncrono | Acessa treinos de forma idêntica à do Aluno convencional. |
| Personal Trainer (PT) | Sistema TrainerX64 | WebSockets (Socket.io) | Bidirecional | Envia e recebe mensagens instantâneas no chat. |
| Aluno (A) | Sistema TrainerX64 | WebSockets (Socket.io) | Bidirecional | Envia e recebe mensagens instantâneas no chat. |
| Aluno com Acessibilidade (AA) | Sistema TrainerX64 | WebSockets (Socket.io) | Bidirecional | Envia e recebe mensagens instantâneas no chat. |
| Sistema TrainerX64 | Firebase Auth | HTTPS / REST API | Síncrono | Valida tokens e autentica as sessões de usuário recebidas. |
| Sistema TrainerX64 | Firebase FCM | HTTPS / SDK | Síncrono (Disparo) | Publica os tópicos e eventos que geram notificações. |
| Sistema TrainerX64 | Cloudinary CDN | HTTPS / REST API | Síncrono | Registra e requisita chaves criptográficas de URLs de vídeo. |
| Firebase FCM | Personal Trainer (PT) | Push Notification | Assíncrono | Notifica em background sobre cobranças e agenda de aulas. |
| Firebase FCM | Aluno (A) | Push Notification | Assíncrono | Entrega avisos imediatos de novos treinos disponíveis. |
| Firebase FCM | Aluno com Acessibilidade (AA)| Push Notification | Assíncrono | Despacha alertas estruturados para leitura por voz. |
