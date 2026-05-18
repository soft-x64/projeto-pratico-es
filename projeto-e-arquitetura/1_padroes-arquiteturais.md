# 🏗️ Padrões Arquiteturais — TrainerX64
---

## 📋 Sumário

| # | Padrão | Camada de atuação |
|---|--------|-------------------|
| 1 | [Monolito Modular](#1-monolito-modular) | Estrutura geral do backend |
| 2 | [MVVM — Model-View-ViewModel](#2-mvvm--model-view-viewmodel) | Interface (frontend) |
| 3 | [Repository Pattern](#3-repository-pattern) | Acesso a dados |
| 4 | [Pub/Sub — Publisher/Subscriber](#4-pubsub--publishersubscriber) | Comunicação assíncrona e notificações |

---

## 🗺️ Visão Geral da Arquitetura

O TrainerX64 combina **quatro padrões arquiteturais complementares**, cada um atuando em uma camada distinta do sistema. A escolha foi guiada pelos seguintes princípios:

- **Coerência com o domínio:** os padrões foram selecionados a partir das funcionalidades reais do backlog
- **Adequação ao tamanho do projeto:** evitando complexidade desnecessária como microserviços
- **Testabilidade:** cada padrão favorece separação de responsabilidades e testes independentes
- **Escalabilidade futura:** a estrutura permite crescimento incremental sem refatoração total

---

<!-- ===========================================================
     FIGURA 1 — Mapa geral dos padrões arquiteturais
     Descrição para o responsável pelo diagrama:
     Criar um diagrama com 4 blocos representando as camadas:
       - Frontend → MVVM (Flutter / React)
       - Backend  → Monolito Modular (Node.js + Express)
       - Dados    → Repository Pattern (PostgreSQL)
       - Eventos  → Pub/Sub (Firebase FCM)
     Setas conectando Frontend → Backend → Dados e Backend → Eventos
     Salvar em: diagramas/arquitetura/fig1-mapa-geral.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 1 — Mapa geral dos padrões arquiteturais do TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig1-mapa-geral.png`* |
| | *Legenda: Visão geral dos quatro padrões e em qual camada do sistema cada um atua. Fonte: elaborado pelos autores.* |

---

## 1. Monolito Modular

### 1.1 📖 Descrição do Padrão

O **Monolito Modular** é um estilo arquitetural no qual o sistema é desenvolvido e implantado como uma **única unidade de software**, mas organizado internamente em **módulos independentes** por domínio de negócio.

Diferente de um monolito tradicional — onde todo o código é misturado sem fronteiras claras —, o Monolito Modular impõe **separação explícita de responsabilidades**: cada módulo representa um domínio funcional e expõe apenas uma interface controlada para comunicação com os demais.

> ⚠️ **Regra fundamental:** nenhum módulo acessa diretamente o código interno de outro.
> Toda comunicação ocorre exclusivamente pelas **interfaces públicas** de cada módulo.

### 1.2 Justificativa da Escolha

O TrainerX64 possui domínios funcionais claramente distintos — **treinos, alunos, evolução física, relatórios e notificações** — o que torna benéfica a separação modular interna. Ao mesmo tempo, o sistema **não justifica** a complexidade operacional de microserviços: a equipe é pequena, o escopo é bem delimitado e não há requisito de escala independente por serviço nesta etapa.

**Problemas que o Monolito Modular resolve no TrainerX64:**

- ✅ Evita o caos de um monolito sem organização interna
- ✅ Não exige infraestrutura pesada como Kubernetes ou API Gateway
- ✅ Permite que cada membro da equipe trabalhe em módulos distintos sem conflito
- ✅ Serve como **base de evolução natural para microserviços** no futuro
- ✅ Facilita a rastreabilidade entre histórias de usuário e módulos do sistema

### 1.3 🔧 Aplicação no Sistema

O backend do TrainerX64 é organizado nos seguintes módulos internos:

```
backend/
├── 📁 modulo-autenticacao/   → Login, registro, permissões e controle de sessão
├── 📁 modulo-alunos/         → Cadastro e gerenciamento de alunos vinculados ao personal
├── 📁 modulo-treinos/        → Criação, edição, publicação e histórico de treinos
├── 📁 modulo-evolucao/       → Registro de medições e cálculo de progresso físico
├── 📁 modulo-relatorios/     → Geração automática de relatórios por aluno e período
└── 📁 modulo-notificacoes/   → Disparo de alertas e integração com Firebase FCM
```

Cada módulo expõe apenas uma interface de serviço para os demais. A comunicação direta entre módulos é proibida — toda integração passa pela interface pública de cada um. Essa regra garante que os módulos possam ser evoluídos ou substituídos de forma independente no futuro.

---

<!-- ===========================================================
     FIGURA 2 — Estrutura interna do Monolito Modular
     Descrição para o responsável pelo diagrama:
     Criar um diagrama com os 6 módulos internos do backend:
       Autenticação, Alunos, Treinos, Evolução, Relatórios, Notificações
     Mostrar as interfaces públicas entre os módulos com setas:
       - Treinos → (evento) → Notificações
       - Evolução → (evento) → Relatórios
       - Relatórios → (evento) → Notificações
     Destacar que a comunicação só ocorre via interface pública
     Salvar em: diagramas/arquitetura/fig2-monolito-modular.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 2 — Estrutura interna do Monolito Modular do TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig2-monolito-modular.png`* |
| | *Legenda: Os módulos se comunicam apenas por interfaces públicas, sem acesso direto ao código interno uns dos outros. Fonte: elaborado pelos autores.* |

---

## 2. MVVM — Model-View-ViewModel

### 2.1 📖 Descrição do Padrão

O **MVVM (Model-View-ViewModel)** é um padrão arquitetural voltado para a **camada de interface do usuário**. Ele divide a interface em três componentes com responsabilidades bem definidas:

| Componente | Responsabilidade | Exemplo no TrainerX64 |
|---|---|---|
| **Model** | Dados e entidades do domínio | `Treino`, `Aluno`, `RegistroEvolucao` |
| **View** | Interface visual — sem lógica de negócio | Tela de treinos, tela de evolução |
| **ViewModel** | Estado da tela e processamento de ações | `TreinoViewModel`, `EvolucaoViewModel` |

O mecanismo central do MVVM é o **data binding reativo**: quando os dados no ViewModel mudam, a View se atualiza automaticamente — sem comandos manuais do desenvolvedor.

```
┌───────────────────────────────────────────────────┐
│                      MVVM                         │
│                                                   │
│  ┌──────────┐   observa    ┌─────────────────┐    │
│  │   View   │◄─────────────│   ViewModel     │    │
│  │  (tela)  │              │  (lógica de UI) │    │
│  └──────────┘              └────────┬────────┘    │
│       │                            │              │
│    ações                         chama            │
│       │                            ▼              │
│       └──────────────────► ┌──────────────┐       │
│                            │    Model     │       │
│                            │   (dados)    │       │
│                            └──────────────┘       │
└───────────────────────────────────────────────────┘
```

### 2.2 ✅ Justificativa da Escolha

O TrainerX64 será desenvolvido com **Flutter** (mobile) e **React.js** (web). Ambos os frameworks foram construídos sobre o conceito de **estado reativo** — quando um dado muda, a interface é reconstruída automaticamente.

> 💡 O MVVM já está presente por natureza nesses frameworks.
> Declará-lo como padrão é **reconhecer e documentar** o que o Flutter e o React já fazem por design.

### 2.3 🔧 Aplicação no Sistema

**ViewModels definidos no sistema:**

| ViewModel | Tela correspondente | Responsabilidade principal |
|---|---|---|
| `AuthViewModel` | Login / Registro | Controla autenticação e sessão |
| `AlunoViewModel` | Lista de alunos | Filtragem, busca e navegação |
| `TreinoViewModel` | Criação e edição de treino | Validação e envio do treino |
| `EvolucaoViewModel` | Registro de evolução | Coleta e envio de medições |
| `RelatorioViewModel` | Visualização de relatório | Carregamento e formatação de dados |
| `NotificacaoViewModel` | Central de notificações | Listagem e marcação como lida |

---

<!-- ===========================================================
     FIGURA 3 — Fluxo MVVM aplicado ao TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama de sequência com 4 participantes:
       Usuário → View (tela) → ViewModel → Model (API REST)
     Fluxo sugerido: registro de evolução física pelo aluno
       1. Usuário toca em "Registrar Evolução"
       2. View chama ViewModel.registrarEvolucao(dados)
       3. ViewModel chama POST /api/evolucao
       4. API retorna RegistroEvolucao
       5. ViewModel atualiza estado
       6. View se atualiza automaticamente
     Salvar em: diagramas/arquitetura/fig3-mvvm-fluxo.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 3 — Fluxo MVVM para registro de evolução física no TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig3-mvvm-fluxo.png`* |
| | *Legenda: A View não contém lógica — ela apenas observa o ViewModel e se atualiza automaticamente. Fonte: elaborado pelos autores.* |

---

## 3. Repository Pattern

### 3.1 📖 Descrição do Padrão

O **Repository Pattern** cria uma **camada de abstração** entre a lógica de negócio e o mecanismo de acesso a dados. Em vez de o código de negócio realizar chamadas diretas ao banco de dados, ele interage com um **repositório** — uma interface que expõe operações padronizadas de leitura e escrita, sem expor os detalhes de implementação do banco.

```
┌────────────────────────────────────────────────────┐
│             Camada de Negócio (Services)           │
└────────────────────────┬───────────────────────────┘
                         │  usa interface
                         ▼
┌────────────────────────────────────────────────────┐
│           Repository Interface                     │
│   buscar() · salvar() · atualizar() · remover()    │
└────────────────────────┬───────────────────────────┘
                         │  implementado por
                         ▼
┌────────────────────────────────────────────────────┐
│         Implementação Concreta (Prisma ORM)        │
│                   PostgreSQL                       │
└────────────────────────────────────────────────────┘
```

### 3.2 ✅ Justificativa da Escolha

Sem o Repository Pattern, a lógica de acesso ao banco ficaria **dispersa por todo o código**, gerando:

- ❌ Duplicação de consultas em diferentes partes do sistema
- ❌ Dificuldade de trocar o banco de dados sem reescrever o sistema
- ❌ Impossibilidade de testar a lógica de negócio sem depender do banco real

**Com o Repository Pattern:**

- ✅ Cada entidade tem um único lugar responsável pelas operações de banco
- ✅ A lógica de negócio não sabe — nem precisa saber — como os dados são armazenados
- ✅ Os repositórios podem ser substituídos por **mocks** durante os testes automatizados
- ✅ A troca de banco de dados no futuro afeta apenas a implementação dos repositórios

### 3.3 🔧 Aplicação no Sistema

O TrainerX64 define um repositório para cada entidade principal do domínio:

| Repositório | Operações principais |
|---|---|
| `AlunoRepository` | `buscarPorId` · `listarPorPersonal` · `cadastrar` · `atualizar` · `remover` |
| `TreinoRepository` | `buscarPorAluno` · `listarHistorico` · `salvar` · `editar` · `arquivar` |
| `EvolucaoRepository` | `registrarMedicao` · `buscarHistorico` · `calcularProgresso` |
| `RelatorioRepository` | `gerarPorAluno` · `gerarPorPeriodo` · `buscarUltimo` |
| `NotificacaoRepository` | `registrar` · `marcarComoLida` · `listarPendentes` |

---

<!-- ===========================================================
     FIGURA 4 — Repository Pattern no TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama em camadas mostrando:
       TreinoService (lógica de negócio)
           ↓ usa interface
       TreinoRepository (interface)
           ↓ implementado por
       PrismaTreinoRepository (implementação concreta)
           ↓ SQL via Prisma
       PostgreSQL (banco de dados)
     Destacar que o Service só conhece a interface, nunca a implementação
     Salvar em: diagramas/arquitetura/fig4-repository-pattern.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 4 — Repository Pattern aplicado ao TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig4-repository-pattern.png`* |
| | *Legenda: O Service conhece apenas a interface do repositório — nunca a implementação concreta ou o banco de dados. Fonte: elaborado pelos autores.* |

---

## 4. Pub/Sub — Publisher/Subscriber

### 4.1 📖 Descrição do Padrão

O **Pub/Sub (Publisher/Subscriber)** é um padrão de **comunicação assíncrona baseada em eventos**. Os componentes do sistema não se comunicam diretamente — em vez disso:

- **Publisher (publicador):** dispara um evento quando algo relevante acontece. Não sabe quem vai receber.
- **Canal (broker):** recebe o evento e o distribui para todos os assinantes registrados.
- **Subscriber (assinante):** está inscrito no canal e reage automaticamente quando o evento chega.

```
  Publisher ──► [ Canal / Broker ] ──► Subscriber A
                       │
                       ├─────────────► Subscriber B
                       │
                       └─────────────► Subscriber C
```

> 💡 O desacoplamento é total: quem publica não conhece quem assina, e quem assina não conhece quem publica.

### 4.2 ✅ Justificativa da Escolha

O TrainerX64 possui funcionalidades que dependem de **comunicação assíncrona por natureza**:

| Funcionalidade do backlog | Por que precisa de Pub/Sub |
|---|---|
| Notificações automáticas | O sistema não pode travar esperando a notificação ser entregue |
| Relatórios automáticos | A geração deve ocorrer em segundo plano após um evento |
| Comunicação personal → aluno | Mensagens devem ser entregues sem bloquear outras operações |

O **Firebase Cloud Messaging (FCM)** já implementa o padrão Pub/Sub nativamente para notificações push, tornando a escolha tecnicamente direta. As funcionalidades de _"notificações automáticas"_ e _"relatórios automáticos"_ listadas no backlog do TP1 **não seriam viáveis** sem esse padrão.

### 4.3 🔧 Aplicação no Sistema

**Eventos definidos no sistema:**

| Evento | Publisher | Subscriber | Ação resultante |
|---|---|---|---|
| `treino.publicado` | Módulo de Treinos | Módulo de Notificações | Notificação push para o aluno |
| `evolucao.registrada` | Módulo de Evolução | Módulo de Relatórios | Atualização automática do relatório |
| `mensagem.enviada` | Módulo de Comunicação | Módulo de Notificações | Notificação push de nova mensagem |
| `relatorio.gerado` | Módulo de Relatórios | Módulo de Notificações | Notificação de relatório disponível |

---

<!-- ===========================================================
     FIGURA 5 — Fluxo Pub/Sub no TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama de sequência com os participantes:
       Personal → API REST (Publisher) → Firebase FCM (Broker) → App do Aluno (Subscriber)
     Fluxo sugerido: personal publica treino novo
       1. Personal publica treino no painel web
       2. API salva treino no banco
       3. API publica evento treino.publicado no FCM
       4. FCM distribui a notificação
       5. App do aluno recebe a notificação push
     Salvar em: diagramas/arquitetura/fig5-pubsub-fluxo.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 5 — Fluxo Pub/Sub para publicação de treino no TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig5-pubsub-fluxo.png`* |
| | *Legenda: O personal publica o treino, a API dispara o evento e o FCM entrega a notificação de forma assíncrona. Fonte: elaborado pelos autores.* |

---

## 📊 Resumo das Decisões Arquiteturais

| Padrão | Camada | Problema que resolve |
|---|---|---|
| **Monolito Modular** | Backend — estrutura geral | Organização por domínio sem complexidade de microserviços |
| **MVVM** | Frontend — interface | Interface reativa e testável no Flutter e React |
| **Repository Pattern** | Backend — acesso a dados | Operações de banco centralizadas e desacopladas |
| **Pub/Sub** | Backend — eventos | Comunicação assíncrona para notificações e relatórios |

---

<!-- ===========================================================
     FIGURA 6 — Diagrama consolidado de todos os padrões
     Descrição para o responsável pelo diagrama:
     Criar uma visão única mostrando todos os 4 padrões integrados:
       [Frontend - MVVM] → [Backend - Monolito Modular]
                                      ↓                ↓
                        [Dados - Repository]   [Eventos - Pub/Sub]
     Pode usar cores diferentes para cada padrão
     Salvar em: diagramas/arquitetura/fig6-visao-consolidada.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 6 — Visão consolidada de todos os padrões arquiteturais do TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig6-visao-consolidada.png`* |
| | *Legenda: Mapa completo mostrando como os quatro padrões se integram no sistema. Fonte: elaborado pelos autores.* |

---
