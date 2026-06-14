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
