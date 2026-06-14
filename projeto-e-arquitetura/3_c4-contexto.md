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
