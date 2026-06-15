# 🔗 Rastreabilidade com Histórias de Usuário — TrainerX64

> **Disciplina:** Engenharia de Software I — ICET/UFAM
> **Professor:** Dr. Andrey Rodrigues
> **Documento:** TP2 — Rastreabilidade Arquitetural

---

##  Sumário

| # | História | Domínio |
|---|---|---|
| 1 | [H01 — Cadastrar treinos padronizados](#h01--cadastrar-treinos-padronizados) | Treinos e Evolução |
| 2 | [H02 — Dashboard de progresso dos alunos](#h02--dashboard-de-progresso-dos-alunos) | Treinos e Evolução |
| 3 | [H03 — Relatórios automáticos de evolução](#h03--relatórios-automáticos-de-evolução) | Treinos e Evolução |
| 4 | [H05 — Chat direto no app](#h05--chat-direto-no-app) | Comunicação e Agenda |
| 5 | [H06 — Interface visual por ícones e cores](#h06--interface-visual-por-ícones-e-cores) | Usuários e Acesso |
| 6 | [H07 — Fluxo de primeiros passos](#h07--fluxo-de-primeiros-passos) | Usuários e Acesso |
| 7 | [H09 — Alertas de faltas do aluno](#h09--alertas-de-faltas-do-aluno) | Comunicação e Agenda |
| 8 | [H10 — Vídeos explicativos de exercícios](#h10--vídeos-explicativos-de-exercícios) | Treinos e Evolução |
| 9 | [H11 — Registrar cargas e repetições](#h11--registrar-cargas-e-repetições) | Treinos e Evolução |
| 10 | [H13 — Gráficos de evolução física](#h13--gráficos-de-evolução-física) | Treinos e Evolução |
| 11 | [H21 — Cadastrar novo aluno](#h21--cadastrar-novo-aluno) | Usuários e Acesso |
| 12 | [H22 — Visualizar mensalidades pendentes](#h22--visualizar-mensalidades-pendentes) | Usuários e Acesso |
| 13 | [H24 — Login com e-mail e senha](#h24--login-com-e-mail-e-senha) | Usuários e Acesso |

---

##  Como ler este documento

Cada história está estruturada em quatro partes:

- **Extrato da história** — redação original do TP1
- **Evidência no Modelo C4** — em qual nível e elemento do C4 a história está representada
- **Classes e métodos envolvidos** — rastreabilidade até o nível de código
- **Fluxo arquitetural** — caminho completo da interação pelo sistema

>  **Nota sobre destaques visuais:** por limitação de tempo, os destaques de setas e cores nos diagramas draw.io não foram aplicados. O fluxo arquitetural detalhado neste documento cumpre o mesmo objetivo de evidenciar, de forma verificável, o caminho de cada história pelo sistema.

---

## H01 — Cadastrar treinos padronizados

### Extrato da História

> *"Enquanto personal, desejo cadastrar treinos padronizados para replicá-los rapidamente entre alunos com objetivos similares."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT interage com o sistema para cadastrar treinos |
| Containers | App Mobile → Backend API | Requisição HTTP REST para criação do treino mãe |
| Containers | Backend API → PostgreSQL | Persistência do template via Prisma ORM |
| Classes | `TreinoMae` | Classe que representa o template de treino padronizado |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `TreinoMae` | `nome`, `objetivo`, `categoria` | `cadastrarTemplate()` |
| `FichaPersonalizada` | `alunoId`, `status` | `clonarParaAluno(alunoId: int)` |
| `PersonalTrainer` | `id`, `totalAlunos` | `cadastrarAluno()` |

### Fluxo Arquitetural

```
1. O PT acessa a tela de treinos no App Mobile (React Native)
2. Preenche nome, objetivo e categoria do treino e confirma
3. O TreinoViewModel chama POST /api/treinos/templates via HTTP REST
4. O modulo-treinos no Backend API (Node.js + Express) recebe a requisição
5. O TreinoService valida os dados e chama TreinoMaeRepository.salvar()
6. O Prisma ORM executa INSERT na tabela treinos_mae no PostgreSQL
7. O banco retorna o id do registro criado
8. O Backend retorna HTTP 201 com os dados do template criado
9. O TreinoViewModel atualiza o estado e a View exibe confirmação ao PT
10. O PT pode então acionar clonarParaAluno(alunoId) para gerar fichas
    individuais baseadas no template recém-criado
```

---

## H02 — Dashboard de progresso dos alunos

### Extrato da História

> *"Enquanto personal, desejo visualizar um dashboard centralizado para acompanhar o progresso de todos os meus alunos (presenciais e online)."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT consulta dados consolidados de todos os alunos |
| Containers | App Mobile → Backend API | Requisição HTTP REST para buscar registros de evolução |
| Containers | Backend API → PostgreSQL | Leitura consolidada de RegistroEvolucao por personalId |
| Classes | `Relatorio`, `RegistroEvolucao`, `Aluno` | Classes que alimentam os dados do dashboard |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Relatorio` | `alunoId`, `periodoInicio`, `periodoFim` | `gerarRelatorioProgresso(alunoId: int)` |
| `RegistroEvolucao` | `alunoId`, `dataExecucao`, `tempoTotalTreino` | `salvarRegistro()` |
| `Aluno` | `id`, `personalId`, `objetivo` | `verRelatorio()` |

### Fluxo Arquitetural

```
1. O PT acessa a tela de dashboard no App Mobile
2. O RelatorioViewModel dispara GET /api/relatorios?personalId={id} via HTTP REST
3. O modulo-relatorios no Backend API processa a requisição
4. O RelatorioService consulta RegistroEvolucaoRepository.listarPorPersonal(id)
5. O Prisma ORM executa SELECT consolidado cruzando Aluno e RegistroEvolucao
6. Os dados retornam agrupados por aluno com frequência e progresso
7. O Backend retorna HTTP 200 com a lista consolidada
8. O RelatorioViewModel atualiza o estado com os dados recebidos
9. A View renderiza o dashboard com cards por aluno mostrando
   frequência, última sessão e evolução de carga
```

---

## H03 — Relatórios automáticos de evolução

### Extrato da História

> *"Enquanto personal, desejo gerar relatórios automáticos de evolução para apresentar resultados profissionais aos alunos sem usar planilhas externas."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | TrainerX64 → Firebase FCM | Evento `relatorio.gerado` publicado após geração |
| Containers | Backend API → PostgreSQL | Leitura de RegistroEvolucao e escrita de Relatorio |
| Containers | Firebase FCM → App Mobile | Notificação push ao aluno informando que o relatório está disponível |
| Classes | `Relatorio`, `RegistroEvolucao`, `EventoPubSub` | Classes que compõem o fluxo de geração |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Relatorio` | `alunoId`, `periodoInicio`, `periodoFim` | `gerarRelatorioProgresso()`, `exportarDados()` |
| `RegistroEvolucao` | `dataExecucao`, `tempoTotalTreino` | `salvarRegistro()` |
| `EventoPubSub` | `nomeEvento`, `payload` | `publicarEvento()` |
| `Notificacao` | `usuarioId`, `titulo`, `corpo` | `enviarPushNotification()` |

### Fluxo Arquitetural

```
1. O PT solicita geração de relatório pelo App Mobile
2. O RelatorioViewModel chama POST /api/relatorios via HTTP REST
3. O modulo-relatorios no Backend API recebe a requisição
4. O RelatorioService consulta todos os RegistroEvolucao do aluno
   no período via RegistroEvolucaoRepository.listarPorPeriodo()
5. O Prisma ORM executa SELECT com filtro de alunoId e período
6. O RelatorioService consolida os dados e chama Relatorio.gerarRelatorioProgresso()
7. O relatório é persistido via RelatorioRepository.salvar() no PostgreSQL
8. O modulo-notificacoes publica o evento relatorio.gerado via EventoPubSub.publicarEvento()
9. O Firebase FCM recebe o evento e entrega notificação push ao App Mobile do aluno
10. O aluno recebe a notificação e pode acessar o relatório pelo app
```

---

## H05 — Chat direto no app

### Extrato da História

> *"Enquanto personal, desejo integrar um chat direto no app para centralizar a comunicação e evitar a dispersão de informações em redes sociais."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer / Aluno → TrainerX64 | Ambos os atores interagem via chat |
| Containers | App Mobile ↔ Backend API | Conexão bidirecional via WebSocket (Socket.io) |
| Containers | Backend API → PostgreSQL | Persistência das mensagens via Prisma ORM |
| Containers | Firebase FCM → App Mobile | Notificação push ao destinatário quando offline |
| Classes | `Conversa`, `Mensagem`, `EventoPubSub` | Classes que implementam o chat |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Conversa` | `alunoId`, `personalId`, `dataCriacao` | `criarConversa()`, `buscarPorParticipantes()` |
| `Mensagem` | `conversaId`, `remetenteId`, `conteudo`, `lida` | `enviarMensagem()`, `marcarComoLida()` |
| `EventoPubSub` | `nomeEvento`, `payload` | `publicarEvento()` |

### Fluxo Arquitetural

```
1. PT ou Aluno acessa a tela de chat no App Mobile
2. O ComunicacaoViewModel verifica se já existe uma Conversa entre o par
   via GET /api/conversas?alunoId={id}&personalId={id} (HTTP REST)
3. Se não existir, o Backend cria via Conversa.criarConversa()
4. O App Mobile abre a conexão WebSocket via Socket.io com o Backend
5. O usuário digita e envia a mensagem
6. O App emite o evento socket mensagem:enviar com o conteúdo
7. O modulo-comunicacao no Backend recebe o evento WebSocket
8. O MensagemService chama MensagemRepository.salvar() — Prisma persiste no PostgreSQL
9. O Backend emite o evento socket mensagem:recebida para o destinatário conectado
10. Se o destinatário estiver offline, o modulo-notificacoes publica
    mensagem.enviada no FCM para entrega push
11. A mensagem aparece em tempo real na tela do destinatário conectado
```

---

## H06 — Interface visual por ícones e cores

### Extrato da História

> *"Enquanto personal, desejo uma interface/visual baseada em ícones e cores para identificar rapidamente o status de cada aluno."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT visualiza status dos alunos na interface |
| Containers | App Mobile → Backend API | Requisição HTTP REST para listar alunos com status |
| Classes | `Aluno`, `Mensalidade`, `StatusMensalidade` | Classes que determinam o status visual exibido |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Aluno` | `id`, `personalId`, `objetivo` | `listarAlunos()` via `PersonalTrainer` |
| `Mensalidade` | `status`, `vencimento` | `verificarPendencia()` |
| `StatusMensalidade` | `PENDENTE`, `RECEBIDA` | — |

### Fluxo Arquitetural

```
1. PT acessa a tela de alunos no App Mobile
2. O AlunoViewModel dispara GET /api/alunos?personalId={id} via HTTP REST
3. O modulo-alunos no Backend consulta AlunoRepository.listarPorPersonal()
4. Para cada aluno, o FinanceiroService consulta Mensalidade.verificarPendencia()
5. O Prisma ORM executa SELECT cruzando Aluno e Mensalidade com status PENDENTE
6. O Backend retorna lista de alunos com campo statusFinanceiro calculado
7. O AlunoViewModel atualiza o estado com os dados recebidos
8. A View renderiza cada aluno com:
   - Ícone verde: mensalidade em dia
   - Ícone amarelo: vencimento próximo
   - Ícone vermelho: mensalidade pendente
```

---

## H07 — Fluxo de primeiros passos

### Extrato da História

> *"Enquanto personal, desejo um fluxo de 'primeiros passos' para aprender a configurar o sistema de forma rápida e intuitiva."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT realiza o onboarding ao entrar pela primeira vez |
| Containers | App Mobile → Backend API | Requisição de criação de conta e configuração inicial |
| Containers | Firebase Auth → Backend API | Validação do token JWT após cadastro |
| Classes | `Usuario`, `PersonalTrainer`, `Sessao`, `PerfilAcesso` | Classes acionadas no fluxo de onboarding |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Usuario` | `email`, `perfil`, `criadoEm` | `autenticar()`, `atualizarPerfil()` |
| `PersonalTrainer` | `cref`, `especialidade` | `cadastrarAluno()` |
| `Sessao` | `token`, `expiraEm` | `validarToken()` |
| `PerfilAcesso` | `PERSONAL_TRAINER` | — |

### Fluxo Arquitetural

```
1. PT instala o app e abre pela primeira vez
2. A tela de onboarding é exibida com os passos de configuração
3. PT preenche e-mail, senha e dados profissionais (CREF, especialidade)
4. O AuthViewModel chama POST /api/auth/registro via HTTP REST
5. O modulo-autenticacao cria o usuário no Firebase Authentication
6. O Firebase Auth retorna o token JWT com perfil PERSONAL_TRAINER
7. O Backend cria o registro de PersonalTrainer no PostgreSQL via Prisma
8. Uma Sessao é criada e o token é armazenado localmente no App
9. O onboarding guia o PT pelos próximos passos:
   - Passo 1: cadastrar o primeiro aluno
   - Passo 2: criar o primeiro treino mãe
   - Passo 3: atribuir a ficha ao aluno
10. Ao concluir, o PT é redirecionado para o dashboard principal
```

---

## H09 — Alertas de faltas do aluno

### Extrato da História

> *"Enquanto personal, desejo receber alertas quando um aluno faltar muitos treinos para realizar uma intervenção proativa e evitar a evasão."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | TrainerX64 → Firebase FCM | Sistema publica evento de alerta de falta |
| Containers | Backend API → Firebase FCM | Evento `compromisso.falta` publicado |
| Containers | Firebase FCM → App Mobile (PT) | Notificação push entregue ao PT |
| Classes | `Compromisso`, `LembreteAgenda`, `Notificacao`, `EventoPubSub` | Classes envolvidas no fluxo de alerta |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Compromisso` | `alunoId`, `status`, `dataHoraInicio` | `verificarFaltas()`, `atualizarStatus()` |
| `EventoPubSub` | `nomeEvento`, `payload` | `publicarEvento()` |
| `Notificacao` | `usuarioId`, `titulo`, `tipo` | `enviarPushNotification()` |

### Fluxo Arquitetural

```
1. Uma rotina agendada no Backend (job) executa diariamente
2. O AgendaService consulta todos os Compromissos com status "agendado"
   cuja dataHoraInicio já passou sem confirmação de presença
3. O Prisma ORM executa SELECT em Compromisso filtrando status e data
4. Para cada falta identificada, Compromisso.verificarFaltas() é chamado
   e o status é atualizado para "falta" via atualizarStatus()
5. O modulo-notificacoes publica o evento compromisso.falta
   via EventoPubSub.publicarEvento() com o payload do alunoId
6. O Firebase FCM recebe o evento e entrega notificação push ao PT:
   "O aluno [nome] faltou ao treino de hoje"
7. O PT recebe o alerta no App Mobile e pode abrir o chat
   para realizar a intervenção diretamente pelo sistema
```

---

## H10 — Vídeos explicativos de exercícios

### Extrato da História

> *"Enquanto aluna, desejo acessar vídeos curtos explicativos de cada exercício para garantir a execução correta sem depender do personal."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Aluno → TrainerX64 | Aluno acessa o catálogo de exercícios com vídeos |
| Containers | App Mobile → Cloudinary | Streaming direto do vídeo via CDN |
| Containers | App Mobile → Backend API | Requisição HTTP REST para buscar URL do vídeo |
| Classes | `Exercicio`, `SerieExercicio`, `FichaPersonalizada` | Classes que compõem o catálogo de exercícios |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Exercicio` | `urlVideosDemonstrativos`, `descricaoAudio`, `nome` | `obterDescricaoAudio()` |
| `SerieExercicio` | `exercicioId`, `quantidadeSeries` | — |
| `FichaPersonalizada` | `alunoId`, `status` | `visualizarFicha()` |

### Fluxo Arquitetural

```
1. Aluno acessa a ficha de treino do dia no App Mobile
2. O TreinoViewModel chama GET /api/fichas/{id} via HTTP REST
3. O modulo-treinos retorna a ficha com a lista de SerieExercicio
4. Cada SerieExercicio inclui o Exercicio com urlVideosDemonstrativos
5. A URL referencia o arquivo hospedado no Cloudinary CDN
6. O Aluno toca no exercício para ver a demonstração
7. O App Mobile inicia o streaming do vídeo diretamente pela URL do Cloudinary
   — o Backend não é intermediário do tráfego de mídia
8. Para o perfil AA, Exercicio.obterDescricaoAudio() retorna a descrição textual
   que é narrada pelo leitor de tela (VoiceOver / TalkBack)
```

---

## H11 — Registrar cargas e repetições

### Extrato da História

> *"Enquanto aluna, desejo registrar cargas e repetições realizadas para que meu personal ajuste o treino com base no meu desempenho real."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Aluno → TrainerX64 | Aluno registra dados de execução do treino |
| Containers | App Mobile → Backend API | HTTP REST para salvar registro de evolução |
| Containers | Backend API → PostgreSQL | Persistência de SerieExercicio e RegistroEvolucao |
| Classes | `SerieExercicio`, `RegistroEvolucao`, `Aluno` | Classes do fluxo de registro |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `SerieExercicio` | `carga`, `repeticoes`, `quantidadeSeries` | `concluirSerie()` |
| `RegistroEvolucao` | `alunoId`, `dataExecucao`, `tempoTotalTreino` | `salvarRegistro()` |
| `Aluno` | `id`, `personalId` | `registrarEvolucao()` |

### Fluxo Arquitetural

```
1. Aluno executa um exercício e toca em "Concluir Série" no App Mobile
2. SerieExercicio.concluirSerie() é chamado localmente — dispara o cronômetro
   de descanso e registra a série como executada
3. Se o dispositivo estiver offline, o WatermelonDB armazena o registro localmente
4. Ao finalizar o treino, o Aluno confirma a conclusão
5. O EvolucaoViewModel chama POST /api/evolucao via HTTP REST
6. O modulo-evolucao no Backend recebe os dados de carga e repetições
7. O EvolucaoService chama RegistroEvolucaoRepository.salvar()
8. O Prisma ORM executa INSERT em registro_evolucao no PostgreSQL
9. O modulo-notificacoes publica o evento evolucao.registrada
10. O Backend retorna HTTP 201 confirmando o registro
11. O PT recebe os dados atualizados no dashboard na próxima consulta
```

---

## H13 — Gráficos de evolução física

### Extrato da História

> *"Enquanto aluna, desejo visualizar gráficos de evolução física para me manter motivada ao ver meus resultados ao longo do tempo."*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Aluno → TrainerX64 | Aluno consulta seu histórico de evolução |
| Containers | App Mobile → Backend API | HTTP REST para buscar dados históricos |
| Containers | Backend API → PostgreSQL | SELECT consolidado de RegistroEvolucao por período |
| Classes | `Relatorio`, `RegistroEvolucao`, `Aluno` | Classes que alimentam os gráficos |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Relatorio` | `alunoId`, `periodoInicio`, `periodoFim` | `gerarRelatorioProgresso()`, `exportarDados()` |
| `RegistroEvolucao` | `dataExecucao`, `tempoTotalTreino` | `salvarRegistro()` |
| `Aluno` | `id`, `objetivo` | `verRelatorio()` |

### Fluxo Arquitetural

```
1. Aluno acessa a tela de evolução no App Mobile
2. O RelatorioViewModel chama GET /api/relatorios/aluno/{id}?periodo=30d
3. O modulo-relatorios no Backend busca o Relatorio mais recente do aluno
4. Se não existir para o período, o RelatorioService gera automaticamente
   consultando RegistroEvolucaoRepository.listarPorPeriodo(alunoId, inicio, fim)
5. O Prisma ORM executa SELECT com filtro de alunoId e intervalo de datas
6. Os dados retornam ordenados por data com carga, repetições e tempo por sessão
7. O Backend retorna HTTP 200 com os dados estruturados por série temporal
8. O RelatorioViewModel processa os dados e os disponibiliza para renderização
9. A View renderiza os gráficos de linha mostrando evolução de carga,
   frequência semanal e tempo médio de treino ao longo do período
```

---

## H21 — Cadastrar novo aluno

### Extrato da História

> *"Enquanto Personal Trainer, quero cadastrar um novo aluno informando nome, contato e objetivo, para iniciar o acompanhamento personalizado."*
> *(História criada durante a modelagem — lacuna identificada no TP1)*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT cadastra novo aluno no sistema |
| Containers | App Mobile → Backend API | HTTP REST para criação do aluno |
| Containers | Backend API → PostgreSQL | INSERT de novo Aluno vinculado ao PT |
| Classes | `PersonalTrainer`, `Aluno`, `Usuario` | Classes do fluxo de cadastro |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `PersonalTrainer` | `id`, `totalAlunos` | `cadastrarAluno()` |
| `Aluno` | `nomeCompleto`, `contato`, `objetivo`, `personalId` | — |
| `Usuario` | `email`, `perfil` | `autenticar()` |

### Fluxo Arquitetural

```
1. PT acessa "Cadastrar Aluno" no App Mobile
2. Preenche nome completo, contato (telefone ou e-mail) e objetivo
3. O AlunoViewModel chama POST /api/alunos via HTTP REST
4. O modulo-alunos no Backend recebe a requisição
5. O AlunoService valida os dados — verifica duplicidade de contato para o PT
6. PersonalTrainer.cadastrarAluno() é chamado e cria a instância de Aluno
7. O AlunoRepository.salvar() persiste o registro no PostgreSQL via Prisma
8. O totalAlunos do PersonalTrainer é incrementado
9. O Backend retorna HTTP 201 com os dados do aluno criado
10. O AlunoViewModel atualiza a lista e a View exibe o novo aluno
```

---

## H22 — Visualizar mensalidades pendentes

### Extrato da História

> *"Enquanto Personal Trainer, quero visualizar a lista de alunos com mensalidade pendente, para saber quem precisa ser cobrado sem verificar um por um."*
> *(História criada durante a modelagem — lacuna identificada no TP1)*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | Personal Trainer → TrainerX64 | PT consulta situação financeira dos alunos |
| Containers | App Mobile → Backend API | HTTP REST para listar pendências |
| Containers | Backend API → PostgreSQL | SELECT em Mensalidade com status PENDENTE |
| Classes | `Mensalidade`, `StatusMensalidade`, `Aluno` | Classes do módulo financeiro |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Mensalidade` | `alunoId`, `vencimento`, `status` | `listarPendencias()`, `verificarPendencia()` |
| `StatusMensalidade` | `PENDENTE` | — |
| `Aluno` | `nomeCompleto`, `contato` | — |

### Fluxo Arquitetural

```
1. PT acessa a tela de Cobranças no App Mobile
2. O FinanceiroViewModel chama GET /api/financeiro/pendencias?personalId={id}
3. O modulo-financeiro no Backend processa a requisição
4. O FinanceiroService chama Mensalidade.listarPendencias()
5. O FinanceiroRepository consulta via Prisma:
   SELECT mensalidades JOIN alunos WHERE status = 'PENDENTE'
   AND alunos.personalId = {id} ORDER BY vencimento ASC
6. O banco retorna a lista ordenada pelo vencimento mais antigo
7. O Backend retorna HTTP 200 com a lista de alunos e datas de vencimento
8. O FinanceiroViewModel atualiza o estado
9. A View exibe a lista com nome do aluno, valor e data de vencimento
10. O PT pode tocar em um aluno para marcar como recebido ou abrir o chat
```

---

## H24 — Login com e-mail e senha

### Extrato da História

> *"Enquanto usuário (PT, Aluno ou Aluno com Acessibilidade), quero fazer login com e-mail e senha, para acessar o sistema com segurança e ver apenas as informações do meu perfil."*
> *(História criada durante a modelagem — lacuna identificada no TP1)*

### Evidência no Modelo C4

| Nível C4 | Elemento | Evidência |
|---|---|---|
| Contexto | PT / Aluno / AA → TrainerX64 | Todos os perfis autenticam pelo mesmo fluxo |
| Containers | App Mobile → Firebase Auth | Validação de credenciais |
| Containers | Firebase Auth → Backend API | Token JWT validado em cada requisição |
| Containers | Backend API → PostgreSQL | Busca do perfil do usuário após autenticação |
| Classes | `Usuario`, `Sessao`, `PerfilAcesso` | Classes do fluxo de autenticação |

### Classes e Métodos Envolvidos

| Classe | Atributos-chave | Método acionado |
|---|---|---|
| `Usuario` | `email`, `perfil`, `criadoEm` | `autenticar()` |
| `Sessao` | `token`, `usuarioId`, `expiraEm` | `validarToken()` |
| `PerfilAcesso` | `PERSONAL_TRAINER`, `ALUNO`, `ALUNO_ACESSIBILIDADE` | — |

### Fluxo Arquitetural

```
1. Usuário abre o App Mobile e insere e-mail e senha
2. O AuthViewModel chama POST /api/auth/login via HTTP REST
3. O modulo-autenticacao no Backend encaminha as credenciais ao Firebase Auth
4. O Firebase Authentication valida e-mail e senha
5. Em caso de sucesso, o Firebase retorna um token JWT com claims do perfil
6. O Backend cria uma instância de Sessao com o token e expiraEm
7. O token é armazenado localmente no App Mobile
8. O Backend identifica o perfil via PerfilAcesso e retorna os dados do usuário
9. O AuthViewModel redireciona para a tela correspondente ao perfil:
   - PERSONAL_TRAINER → Dashboard de alunos
   - ALUNO → Ficha de treino do dia
   - ALUNO_ACESSIBILIDADE → Ficha com recursos assistivos ativos
10. Em caso de credenciais inválidas, o Backend retorna HTTP 401
    e a View exibe mensagem de erro clara ao usuário
```

---

##  Resumo da Rastreabilidade

| História | Módulos acionados | Containers envolvidos | Classes principais |
|---|---|---|---|
| H01 | treinos | App Mobile → Backend → PostgreSQL | `TreinoMae`, `FichaPersonalizada` |
| H02 | relatorios, evolucao | App Mobile → Backend → PostgreSQL | `Relatorio`, `RegistroEvolucao` |
| H03 | relatorios, notificacoes | App Mobile → Backend → PostgreSQL → FCM | `Relatorio`, `EventoPubSub`, `Notificacao` |
| H05 | comunicacao, notificacoes | App Mobile ↔ Backend (WS) → PostgreSQL → FCM | `Conversa`, `Mensagem`, `EventoPubSub` |
| H06 | alunos, financeiro | App Mobile → Backend → PostgreSQL | `Aluno`, `Mensalidade`, `StatusMensalidade` |
| H07 | autenticacao | App Mobile → Backend → Firebase Auth → PostgreSQL | `Usuario`, `PersonalTrainer`, `Sessao` |
| H09 | agenda, notificacoes | Backend (job) → PostgreSQL → FCM → App Mobile | `Compromisso`, `EventoPubSub`, `Notificacao` |
| H10 | treinos | App Mobile → Backend → PostgreSQL + Cloudinary | `Exercicio`, `SerieExercicio` |
| H11 | evolucao, treinos | App Mobile → Backend → PostgreSQL | `SerieExercicio`, `RegistroEvolucao` |
| H13 | relatorios, evolucao | App Mobile → Backend → PostgreSQL | `Relatorio`, `RegistroEvolucao` |
| H21 | alunos, autenticacao | App Mobile → Backend → PostgreSQL | `PersonalTrainer`, `Aluno` |
| H22 | financeiro | App Mobile → Backend → PostgreSQL | `Mensalidade`, `StatusMensalidade` |
| H24 | autenticacao | App Mobile → Firebase Auth → Backend → PostgreSQL | `Usuario`, `Sessao`, `PerfilAcesso` |

---

