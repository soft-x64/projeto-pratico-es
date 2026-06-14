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

## 👥 Perfis do Sistema

O TrainerX64 foi projetado para atender **três perfis de usuário formais**, identificados durante a etapa de Design de Interação:

| Perfil | Sigla | Descrição |
|---|---|---|
| **Personal Trainer** | PT | Gerencia alunos, cria treinos, acompanha evolução, organiza agenda, controla cobranças e se comunica com os alunos |
| **Aluno** | A | Segue treinos, acessa vídeos e instruções, registra execuções, acompanha evolução e se comunica com o personal |
| **Aluno com Acessibilidade** | AA | Possui todas as funcionalidades do Aluno (A), acrescidas de recursos de acessibilidade: leitura por voz, alto contraste, navegação simplificada, textos ampliados e descrições alternativas |

> ⚠️ **O perfil AA não é um detalhe — é uma persona formal do sistema.**
> A acessibilidade é uma camada estrutural que atravessa todas as funcionalidades,
> não um recurso isolado adicionado ao final do desenvolvimento.

---

## 🗺️ Visão Geral da Arquitetura

O TrainerX64 combina **quatro padrões arquiteturais complementares**, cada um atuando em uma camada distinta do sistema. A escolha foi guiada pelos seguintes princípios:

- **Coerência com o domínio:** os padrões foram selecionados a partir das funcionalidades reais do backlog e dos objetivos das personas
- **Adequação ao tamanho do projeto:** evitando complexidade desnecessária como microserviços
- **Testabilidade:** cada padrão favorece separação de responsabilidades e testes independentes
- **Escalabilidade futura:** a estrutura permite crescimento incremental sem refatoração total
- **Acessibilidade integrada:** as decisões arquiteturais consideram os três perfis de usuário, incluindo o Aluno com Acessibilidade (AA)

---

<!-- ===========================================================
     FIGURA 1 — Mapa geral dos padrões arquiteturais
     Descrição para o responsável pelo diagrama:
     Criar um diagrama com 4 blocos representando as camadas:
       - Frontend → MVVM (React Native)
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

**Comparativo entre estilos arquiteturais:**

| Característica | Monolito Tradicional | Monolito Modular | Microserviços |
|---|:---:|:---:|:---:|
| Deploy único | ✅ | ✅ | ❌ |
| Fronteiras entre domínios | ❌ | ✅ | ✅ |
| Complexidade operacional | 🟢 Baixa | 🟢 Baixa | 🔴 Alta |
| Escalabilidade independente | ❌ | ❌ | ✅ |
| Adequado para times pequenos | ✅ | ✅ | ❌ |
| Evolução para microserviços | ❌ | ✅ | — |

### 1.2 ✅ Justificativa da Escolha

O TrainerX64 possui domínios funcionais claramente distintos, o que torna obrigatória a separação modular interna. O Personal Trainer opera em seis grandes domínios: gerenciamento de alunos, criação de treinos, acompanhamento de evolução, organização de agenda, controle financeiro e comunicação. O Aluno e o Aluno com Acessibilidade operam em domínios complementares: acesso ao sistema, execução de treinos, registro de evolução e comunicação.

Ao mesmo tempo, o sistema **não justifica** a complexidade operacional de microserviços: a equipe é pequena, o escopo é bem delimitado e não há requisito de escala independente por serviço nesta etapa.

**Problemas que o Monolito Modular resolve no TrainerX64:**

- ✅ Evita o caos de um monolito sem organização interna
- ✅ Não exige infraestrutura pesada como Kubernetes ou API Gateway
- ✅ Permite que cada membro da equipe trabalhe em módulos distintos sem conflito
- ✅ Serve como **base de evolução natural para microserviços** no futuro
- ✅ Facilita a rastreabilidade entre histórias de usuário e módulos do sistema
- ✅ Cada módulo corresponde diretamente a um grupo de objetivos das personas

### 1.3 🔧 Aplicação no Sistema

O backend do TrainerX64 é organizado nos seguintes módulos internos, cada um correspondendo diretamente a um domínio funcional do sistema:

```
backend/
├── 📁 modulo-autenticacao/   → Login, registro, permissões e controle de sessão
│                               Atende: PT | A | AA — objetivo "Acessar Sistema"
│
├── 📁 modulo-alunos/         → Cadastro, busca e gerenciamento de alunos
│                               Atende: PT — objetivo "Gerenciar Alunos"
│
├── 📁 modulo-treinos/        → Criação, edição, publicação e histórico de treinos
│                               Atende: PT — objetivo "Criar e Atualizar Treinos"
│                               Atende: A | AA — objetivo "Seguir o Treino do Dia"
│
├── 📁 modulo-evolucao/       → Registro de medições e cálculo de progresso físico
│                               Atende: PT — objetivo "Acompanhar Evolução"
│                               Atende: A | AA — objetivo "Acompanhar Evolução"
│
├── 📁 modulo-agenda/         → Planejamento, compromissos e lembretes do personal
│                               Atende: PT — objetivo "Organizar a Agenda"
│
├── 📁 modulo-financeiro/     → Agenda de cobranças: registro de mensalidades,
│                               controle de alunos em dia ou com pendências,
│                               histórico de pagamentos informados pelo PT.
│                               Não realiza transações financeiras nem integra
│                               com meios de pagamento — é um controle interno
│                               de acompanhamento de recebimentos.
│                               Atende: PT — objetivo "Controle de Cobranças"
│
├── 📁 modulo-comunicacao/    → Mensagens, feedbacks e troca de informações
│                               Atende: PT — objetivo "Comunicação Interna"
│                               Atende: A | AA — objetivo "Comunicação"
│
├── 📁 modulo-relatorios/     → Geração automática de relatórios por aluno e período
│                               Atende: PT — objetivo "Acompanhar Evolução"
│
└── 📁 modulo-notificacoes/   → Lembretes, avisos e notificações push
                                Atende: A | AA — objetivo "Notificações e Consistência"
```

> 💡 **Nota sobre acessibilidade:** o módulo de autenticação e todos os módulos que
> retornam dados para o frontend devem suportar respostas compatíveis com leitores de tela,
> descrições alternativas e estruturas de navegação simplificada — requisitos do perfil AA.

Cada módulo expõe apenas uma interface de serviço para os demais. A comunicação direta entre módulos é proibida — toda integração passa pela interface pública de cada um.

---

<!-- ===========================================================
     FIGURA 2 — Estrutura interna do Monolito Modular
     Descrição para o responsável pelo diagrama:
     Criar um diagrama com os 9 módulos internos do backend:
       Autenticação, Alunos, Treinos, Evolução, Agenda,
       Financeiro, Comunicação, Relatórios, Notificações
     Mostrar as interfaces públicas entre os módulos com setas:
       - Treinos → (evento) → Notificações
       - Evolução → (evento) → Relatórios
       - Relatórios → (evento) → Notificações
       - Comunicação → (evento) → Notificações
     Destacar que a comunicação só ocorre via interface pública
     Indicar ao lado de cada módulo qual persona ele atende (PT / A / AA)
     Salvar em: diagramas/arquitetura/fig2-monolito-modular.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 2 — Estrutura interna do Monolito Modular do TrainerX64** |
| |  <img width="1600" height="912" alt="image" src="https://github.com/user-attachments/assets/5fc9d740-ebf3-4caa-a889-db86de0635c0" />
 |
| | *Legenda: Os 9 módulos internos do backend, suas interfaces públicas de comunicação e as personas que cada um atende. Fonte: elaborado pelos autores.* |

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

O TrainerX64 será desenvolvido com **React Native** — framework mobile unificado baseado em JavaScript/TypeScript que permite construir o aplicativo para iOS e Android a partir de um único codebase. O React Native foi construído sobre o conceito de **estado reativo**: quando um dado muda, a interface é reconstruída automaticamente. Declarar o MVVM como padrão arquitetural do frontend é reconhecer e documentar o que esse framework já faz por design.

**Por que não MVC no frontend?**
O MVC foi criado para servidores que montam páginas HTML e devolvem ao navegador. O MVVM foi criado para **interfaces reativas** — que é exatamente o modelo do React Native. Aplicar MVC no frontend seria contrariar a arquitetura natural do framework escolhido.

**Por que React Native e não Flutter?**
Flutter exigiria que a equipe aprendesse Dart, uma linguagem fora do ecossistema do projeto. Com React Native, o frontend e o backend (Node.js + Express) compartilham a mesma linguagem — TypeScript —, reduzindo a curva de aprendizado, o atrito entre as camadas e o número de ambientes de desenvolvimento que a equipe precisa dominar.

#### ♿ Acessibilidade como requisito arquitetural do frontend

O **Aluno com Acessibilidade (AA)** é um perfil formal do sistema, com o objetivo estrutural **"Navegar com Autonomia"**. Esse objetivo não é uma funcionalidade isolada — ele é **transversal a todas as telas do sistema**.

O MVVM suporta esse requisito de forma natural:

| Recurso de acessibilidade | Como o MVVM suporta |
|---|---|
| **Leitura por voz** | A View é declarativa — o React Native permite adicionar `accessibilityLabel` e `AccessibilityInfo` em qualquer componente sem alterar o ViewModel |
| **Alto contraste** | O tema de alto contraste é um estado do ViewModel — quando ativado, toda a View que o observa se atualiza automaticamente |
| **Textos ampliados** | O tamanho de fonte é controlado via estado reativo — um único ViewModel de configuração propaga a mudança para todas as telas |
| **Navegação simplificada** | A separação entre View e ViewModel permite criar Views alternativas mais simples para o perfil AA, reaproveitando o mesmo ViewModel |
| **Descrições alternativas** | Adicionadas diretamente na View sem impactar a lógica de negócio do ViewModel |

> ✅ **O MVVM é o padrão mais adequado para garantir acessibilidade no TrainerX64**
> porque permite que os recursos de acessibilidade sejam implementados na View
> sem contaminar a lógica de negócio — mantendo o sistema limpo e testável.

### 2.3 🔧 Aplicação no Sistema

**ViewModels definidos no sistema:**

| ViewModel | Tela correspondente | Persona | Responsabilidade principal |
|---|---|---|---|
| `AuthViewModel` | Login / Registro | PT · A · AA | Controla autenticação e sessão |
| `AlunoViewModel` | Lista de alunos | PT | Filtragem, busca e navegação |
| `TreinoViewModel` | Criação e edição de treino | PT · A · AA | Validação, envio e exibição do treino |
| `EvolucaoViewModel` | Registro de evolução | A · AA | Coleta e envio de medições |
| `RelatorioViewModel` | Visualização de relatório | PT · A · AA | Carregamento e formatação de dados |
| `NotificacaoViewModel` | Central de notificações | A · AA | Listagem e marcação como lida |
| `AgendaViewModel` | Agenda do personal | PT | Organização de compromissos e lembretes |
| `FinanceiroViewModel` | Controle de cobranças | PT | Registro de mensalidades, alunos em dia e pendências |
| `AcessibilidadeViewModel` | Configurações de acessibilidade | AA | Alto contraste, tamanho de fonte, leitura por voz |

> 💡 O `AcessibilidadeViewModel` é o ViewModel responsável por propagar as
> preferências de acessibilidade do perfil AA para todas as Views do sistema.

---

<!-- ===========================================================
     FIGURA 3 — Fluxo MVVM aplicado ao TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama de sequência com 4 participantes:
       Usuário (AA) → View (tela acessível) → ViewModel → Model (API REST)
     Fluxo sugerido: aluno com acessibilidade registra evolução física
       1. Usuário AA ativa leitura por voz (AcessibilidadeViewModel)
       2. Toca em "Registrar Evolução" (navegação simplificada)
       3. View chama EvolucaoViewModel.registrarEvolucao(dados)
       4. ViewModel chama POST /api/evolucao
       5. API retorna RegistroEvolucao
       6. ViewModel atualiza estado
       7. View se atualiza com feedback acessível (narração do resultado)
     Salvar em: diagramas/arquitetura/fig3-mvvm-fluxo.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 3 — Fluxo MVVM para registro de evolução pelo Aluno com Acessibilidade (AA)** |
| | <img width="1600" height="912" alt="image" src="https://github.com/user-attachments/assets/70dc2c01-1dd3-40c8-9b56-08aa21b7a593" />
 |
| | *Legenda: A View acessível observa o mesmo ViewModel do aluno padrão, com recursos de narração e navegação simplificada adicionados na camada de View. Fonte: elaborado pelos autores.* |

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

O TrainerX64 define um repositório para cada entidade principal do domínio, cobrindo todos os módulos do sistema:

| Repositório | Módulo | Operações principais |
|---|---|---|
| `AlunoRepository` | Alunos | `buscarPorId` · `listarPorPersonal` · `cadastrar` · `atualizar` · `remover` |
| `TreinoRepository` | Treinos | `buscarPorAluno` · `listarHistorico` · `salvar` · `editar` · `arquivar` |
| `EvolucaoRepository` | Evolução | `registrarMedicao` · `buscarHistorico` · `calcularProgresso` |
| `RelatorioRepository` | Relatórios | `gerarPorAluno` · `gerarPorPeriodo` · `buscarUltimo` |
| `NotificacaoRepository` | Notificações | `registrar` · `marcarComoLida` · `listarPendentes` |
| `AgendaRepository` | Agenda | `buscarPorData` · `cadastrarCompromisso` · `remover` |
| `FinanceiroRepository` | Financeiro | `buscarMensalidades` · `registrarPagamentoInformado` · `listarPendencias` · `marcarComoRecebido` |
| `ComunicacaoRepository` | Comunicação | `enviarMensagem` · `listarConversa` · `marcarComoLida` |

---

<!-- ===========================================================
     FIGURA 4 — Repository Pattern no TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama em camadas mostrando:
       FinanceiroService (lógica de negócio)
           ↓ usa interface
       FinanceiroRepository (interface)
           ↓ implementado por
       PrismaFinanceiroRepository (implementação concreta)
           ↓ SQL via Prisma
       PostgreSQL (banco de dados)
     Destacar que o Service só conhece a interface, nunca a implementação
     Salvar em: diagramas/arquitetura/fig4-repository-pattern.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 4 — Repository Pattern aplicado ao módulo Financeiro do TrainerX64** |
| | <img width="1600" height="912" alt="image" src="https://github.com/user-attachments/assets/cec868e9-0a2a-4656-a071-49d5fe700668" />
 |
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

Tanto o Aluno (A) quanto o Aluno com Acessibilidade (AA) possuem o objetivo **"Notificações e Consistência"** — lembretes, avisos do personal e motivação para manter a regularidade dos treinos. Além disso, o Personal Trainer depende de comunicação assíncrona para enviar avisos e feedbacks sem interromper o fluxo principal do sistema.

| Funcionalidade | Por que precisa de Pub/Sub |
|---|---|
| Notificações e Consistência (A · AA) | O sistema não pode travar esperando a notificação ser entregue |
| Relatórios automáticos (PT) | A geração deve ocorrer em segundo plano após um evento de evolução |
| Comunicação personal → aluno (PT · A · AA) | Mensagens devem ser entregues sem bloquear outras operações |
| Avisos de agenda (PT) | Lembretes de compromissos precisam ser disparados de forma programada |
| Aviso de cobrança pendente (PT) | Alertas de mensalidade em aberto devem ser enviados automaticamente, sem processamento de transação |

O **Firebase Cloud Messaging (FCM)** já implementa o padrão Pub/Sub nativamente para notificações push, tornando a escolha tecnicamente direta e alinhada ao stack definido.

> ♿ **Para o perfil AA**, as notificações push devem ser compatíveis com leitores de tela
> e conter descrições alternativas claras no payload — garantindo que o conteúdo
> seja compreendido via narração de voz, sem depender exclusivamente de elementos visuais.

### 4.3 🔧 Aplicação no Sistema

**Eventos definidos no sistema:**

| Evento | Publisher | Subscriber | Persona atendida |
|---|---|---|---|
| `treino.publicado` | Módulo de Treinos | Módulo de Notificações | A · AA |
| `evolucao.registrada` | Módulo de Evolução | Módulo de Relatórios | PT |
| `relatorio.gerado` | Módulo de Relatórios | Módulo de Notificações | PT · A · AA |
| `mensagem.enviada` | Módulo de Comunicação | Módulo de Notificações | A · AA |
| `compromisso.agendado` | Módulo de Agenda | Módulo de Notificações | PT · A · AA |
| `cobranca.pendente` | Módulo Financeiro | Módulo de Notificações | PT |

---

<!-- ===========================================================
     FIGURA 5 — Fluxo Pub/Sub no TrainerX64
     Descrição para o responsável pelo diagrama:
     Criar um diagrama de sequência com os participantes:
       Personal → API REST (Publisher) → Firebase FCM (Broker) → App do Aluno AA (Subscriber)
     Fluxo sugerido: personal publica treino → aluno AA recebe notificação acessível
       1. Personal publica treino novo
       2. API salva treino e publica evento treino.publicado
       3. Firebase FCM recebe o evento (Broker)
       4. FCM entrega notificação com descrição de texto para leitura por voz
       5. App do Aluno AA exibe e narra a notificação
     Destacar que o payload da notificação inclui texto alternativo para AA
     Salvar em: diagramas/arquitetura/fig5-pubsub-fluxo.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 5 — Fluxo Pub/Sub para publicação de treino com suporte ao perfil AA** |
| | *Inserir imagem: `diagramas/arquitetura/fig5-pubsub-fluxo.png`* |
| | *Legenda: O payload da notificação inclui descrição textual alternativa compatível com leitores de tela, atendendo ao perfil AA. Fonte: elaborado pelos autores.* |

---

## 📊 Resumo das Decisões Arquiteturais

| Padrão | Camada | Problema que resolve | Personas atendidas |
|---|---|---|---|
| **Monolito Modular** | Backend — estrutura geral | Organização por domínio sem complexidade de microserviços | PT · A · AA |
| **MVVM** | Frontend — interface | Interface reativa, testável e acessível no React Native | PT · A · AA |
| **Repository Pattern** | Backend — acesso a dados | Operações de banco centralizadas e desacopladas por entidade | PT · A · AA |
| **Pub/Sub** | Backend — eventos | Comunicação assíncrona para notificações, relatórios e agenda | PT · A · AA |

---

<!-- ===========================================================
     FIGURA 6 — Diagrama consolidado de todos os padrões
     Descrição para o responsável pelo diagrama:
     Criar uma visão única mostrando todos os 4 padrões integrados:
       [Frontend - MVVM] → [Backend - Monolito Modular]
                                      ↓                ↓
                        [Dados - Repository]   [Eventos - Pub/Sub]
     Indicar os 3 perfis (PT, A, AA) como usuários do frontend
     Destacar o AcessibilidadeViewModel como componente especial do MVVM
     Frontend usa React Native (mobile unificado iOS/Android)
     Pode usar cores diferentes para cada padrão
     Salvar em: diagramas/arquitetura/fig6-visao-consolidada.png
=========================================================== -->

| | |
|---|---|
| 📷 | **Figura 6 — Visão consolidada de todos os padrões arquiteturais do TrainerX64** |
| | *Inserir imagem: `diagramas/arquitetura/fig6-visao-consolidada.png`* |
| | *Legenda: Mapa completo mostrando como os quatro padrões se integram e quais personas são atendidas por cada camada. Fonte: elaborado pelos autores.* |

---
