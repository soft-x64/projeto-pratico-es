# 🧩 C4 — Nível 4: Diagrama de Classes UML — TrainerX64

---

## 📋 Sumário

| # | Seção |
|---|---|
| 1 | [Visão Geral](#1-visão-geral) |
| 2 | [Padrões e Convenções](#2-padrões-e-convenções) |
| 3 | [Domínio: Usuários e Acesso](#3-domínio-usuários-e-acesso) |
| 4 | [Domínio: Treinos e Evolução](#4-domínio-treinos-e-evolução) |
| 5 | [Domínio: Comunicação e Agenda](#5-domínio-comunicação-e-agenda) |
| 6 | [Relações entre Domínios](#6-relações-entre-domínios) |

---

##  Sobre o Nível de Classes

O **nível 4 do C4 Model** desce ao nível de código, descrevendo a estrutura interna de cada container por meio de classes, atributos, métodos e relações UML. O diagrama foi organizado em três domínios funcionais — **Usuários e Acesso**, **Treinos e Evolução** e **Comunicação e Agenda** — refletindo a estrutura do Monolito Modular definida no nível de containers.

---

##  Atores do Sistema

| Ator | Sigla | Descrição |
|---|---|---|
| **Personal Trainer** | PT | Gerencia alunos, treinos, agenda, cobranças e comunicação |
| **Aluno** | A | Acessa treinos, registra evoluções e se comunica com o PT |
| **Aluno com Acessibilidade** | AA | Mesmas ações do Aluno, com suporte a leitura por voz, alto contraste e navegação simplificada |

---

##  1. Visão Geral

O diagrama cobre 18 classes distribuídas em três domínios. As relações entre domínios são representadas por associações explícitas que cruzam os boundaries modulares, garantindo rastreabilidade entre arquitetura e implementação.

| Domínio | Módulos cobertos | Classes |
|---|---|---|
| Usuários e Acesso | autenticacao · alunos · financeiro | Usuario, PersonalTrainer, Aluno, AlunoAcessibilidade, Sessao, Mensalidade + 2 Enums |
| Treinos e Evolução | treinos · evolucao · relatorios | TreinoMae, FichaPersonalizada, Exercicio, SerieExercicio, RegistroEvolucao, Relatorio |
| Comunicação e Agenda | comunicacao · agenda · notificacoes | Conversa, Mensagem, Compromisso, LembreteAgenda, Notificacao, EventoPubSub |

###  Diagrama Geral — Visão Integrada dos Três Domínios

| | |
|---|---|
| 📷 | **Figura — Diagrama de Classes UML completo (TrainerX64)** |
| | *Inserir imagem: `diagramas/uml/fig-classes-geral.png`* |
| | *Legenda: Visão integrada dos três domínios com todas as classes, atributos, métodos e relações. Fonte: elaborado pelos autores.* |

---

## 2. Padrões e Convenções

| Convenção | Definição | Exemplo |
|---|---|---|
| Nomenclatura de classes | PascalCase | PersonalTrainer, FichaPersonalizada |
| Nomenclatura de atributos e métodos | camelCase | nomeCompleto, cadastrarAluno() |
| Tipo de identificador | int (uniforme entre domínios) | id: int |
| Visibilidade — atributos | Privado ( - ) | - email: String |
| Visibilidade — métodos | Público ( + ) | + autenticar(): Boolean |
| Classe abstrata | Nome em itálico no draw.io | *Usuario* |
| Enumerações | Estereótipo «enumeration» | PerfilAcesso, StatusMensalidade |

### Tipos de Relações UML

| Tipo | Semântica | Exemplo no sistema |
|---|---|---|
| Herança | "é um" — subclasse herda atributos e métodos da superclasse | PersonalTrainer herda de Usuario |
| Composição | "não existe sem" — ciclo de vida dependente | Aluno possui Mensalidade |
| Associação | "se relaciona com" — referência entre objetos independentes | FichaPersonalizada referencia Aluno |
| Dependência | "usa temporariamente" — uso pontual de outro tipo | Usuario usa PerfilAcesso |

---

## 3. Domínio: Usuários e Acesso

Centraliza identidade, autenticação e controle financeiro. É o domínio base do sistema — suas classes são referenciadas pelos outros dois domínios via associação.

### 🖼️ Diagrama — Domínio: Usuários e Acesso

| | |
|---|---|
| 📷 | **Figura — Classes do domínio Usuários e Acesso** |
| | *Inserir imagem: `diagramas/uml/fig-classes-usuarios.png`* |
| | *Legenda: Classes Usuario, PersonalTrainer, Aluno, AlunoAcessibilidade, Sessao, Mensalidade e enums. Fonte: elaborado pelos autores.* |

---

### 3.1 Classe *Usuario* — Abstrata
*Módulo: modulo-autenticacao*

Base hierárquica de todos os perfis. Não pode ser instanciada diretamente — toda instância concreta será um PersonalTrainer, Aluno ou AlunoAcessibilidade.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do usuário |
| nomeCompleto | String | privado | Nome completo |
| email | String | privado | E-mail de login — único no sistema |
| perfil | PerfilAcesso | privado | Tipo de acesso (PT, A ou AA) |
| criadoEm | DateTime | privado | Data e hora de criação do cadastro |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| autenticar() | Boolean | Valida credenciais via Firebase Auth e inicia sessão |
| atualizarPerfil() | void | Atualiza dados cadastrais |
| logout() | void | Encerra a sessão ativa |

---

### 3.2 Classe PersonalTrainer
*Módulo: modulo-autenticacao / modulo-alunos*

Subclasse de Usuario com maior número de responsabilidades — gerencia alunos, treinos, agenda, cobranças e comunicação.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| cref | String | privado | Número de registro profissional |
| especialidade | String | privado | Área de atuação principal |
| totalAlunos | int | privado | Quantidade atual de alunos vinculados |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| cadastrarAluno() | Aluno | Cria e persiste um novo aluno vinculado a este PT |
| listaAluno() | List\<Aluno\> | Retorna a lista de alunos deste PT |
| gerarRelatorios() | void | Solicita geração de relatório de evolução de um aluno |

---

### 3.3 Classe Aluno
*Módulo: modulo-alunos*

Subclasse de Usuario mais referenciada do sistema — FichaPersonalizada, RegistroEvolucao, Relatorio, Conversa e Notificacao a referenciam via `alunoId`.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| contato | String | privado | Telefone ou e-mail de contato |
| objetivo | String | privado | Objetivo principal (ex: emagrecimento, hipertrofia) |
| personalId | int | privado | Referência ao PT responsável |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| acessarTreino() | void | Acessa a ficha de treino personalizada atual |
| registrarEvolucao() | void | Registra medições e dados de progresso físico |
| verRelatorio() | void | Visualiza o relatório de evolução |

---

### 3.4 Classe AlunoAcessibilidade
*Módulo: modulo-alunos*

Subclasse de Aluno com atributos de acessibilidade. Os valores são observados pelo `AcessibilidadeViewModel`, que reconstrói as telas automaticamente (padrão MVVM).

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| altoContraste | Boolean | privado | Modo de alto contraste ativo |
| tamanhoFonte | int | privado | Tamanho de fonte preferido (em sp) |
| leituraVoz | Boolean | privado | Integração com leitor de tela ativa |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| ativarLeituraVoz() | void | Ativa VoiceOver (iOS) e TalkBack (Android) |
| ajustarContraste() | void | Alterna entre tema padrão e alto contraste |
| ajustarFonte() | void | Atualiza tamanho de fonte em todas as telas via ViewModel |

---

### 3.5 Classe Sessao
*Módulo: modulo-autenticacao*

Representa a sessão ativa de um usuário autenticado. Cada usuário autenticado possui exatamente uma Sessao ativa.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da sessão |
| usuarioId | int | privado | Referência ao usuário autenticado |
| token | String | privado | Token JWT gerado pelo Firebase Auth |
| expiraEm | DateTime | privado | Data e hora de expiração do token |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| validarToken() | Boolean | Verifica se o token JWT ainda está válido |
| encerrar() | void | Invalida a sessão ativa |

---

### 3.6 Classe Mensalidade
*Módulo: modulo-financeiro*

Registro de cobrança de um aluno. O módulo financeiro funciona como agenda de cobranças — o PT informa manualmente o recebimento e o sistema atualiza o status.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da mensalidade |
| alunoId | int | privado | Referência ao aluno |
| valor | Decimal | privado | Valor cobrado |
| vencimento | Date | privado | Data de vencimento |
| status | StatusMensalidade | privado | PENDENTE ou RECEBIDA |
| recebidoEm | DateTime | privado | Data do recebimento informado pelo PT (nullable) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| marcarRecebida() | void | Atualiza status para RECEBIDA e registra a data |
| verificarPendencia() | Boolean | Retorna true se o status for PENDENTE |
| listarPendencias() | List\<Mensalidade\> | Retorna todas as mensalidades PENDENTES do PT |

---

### 3.7 Enum PerfilAcesso
*Módulo: modulo-autenticacao*

| Valor | Descrição |
|---|---|
| PERSONAL_TRAINER | Acesso completo ao gerenciamento de alunos, treinos, agenda, cobranças e comunicação |
| ALUNO | Acesso aos próprios treinos, evolução e canal de comunicação com o PT |
| ALUNO_ACESSIBILIDADE | Mesmo acesso do perfil ALUNO, acrescido dos recursos de acessibilidade |

---

### 3.8 Enum StatusMensalidade
*Módulo: modulo-financeiro*

| Valor | Descrição |
|---|---|
| PENDENTE | Mensalidade ainda não registrada como recebida — aparece na lista de pendências |
| RECEBIDA | PT informou o recebimento — data registrada em `recebidoEm` |

---

### 3.9 Relações do Domínio

| Origem | Tipo | Destino | Multiplicidade | Descrição |
|---|---|---|---|---|
| PersonalTrainer | Herança | Usuario | — | Herda id, email, perfil e métodos base |
| Aluno | Herança | Usuario | — | Herda os mesmos atributos e métodos base |
| AlunoAcessibilidade | Herança | Aluno | — | Herda contato, objetivo, personalId e métodos de Aluno |
| Usuario | Associação | Sessao | 1..1 | Cada usuário autenticado possui exatamente uma sessão ativa |
| Aluno | Composição | Mensalidade | 1..N | Mensalidade não existe sem o Aluno |
| Usuario | Dependência | PerfilAcesso | — | Usa o enum para definir e verificar o tipo de acesso |
| Mensalidade | Dependência | StatusMensalidade | — | Usa o enum para controlar seu estado atual |

---

## 4. Domínio: Treinos e Evolução

Concentra a lógica central do produto — criação e execução de treinos, registro de progresso e geração de relatórios. Estruturado em torno do conceito de **TreinoMae** e suas fichas personalizadas por aluno.

### 🖼️ Diagrama — Domínio: Treinos e Evolução

| | |
|---|---|
| 📷 | **Figura — Classes do domínio Treinos e Evolução** |
| | *Inserir imagem: `diagramas/uml/fig-classes-treinos.png`* |
| | *Legenda: Classes TreinoMae, FichaPersonalizada, Exercicio, SerieExercicio, RegistroEvolucao e Relatorio. Fonte: elaborado pelos autores.* |

---

### 4.1 Classe TreinoMae
*Módulo: modulo-treinos*

Template base de um treino criado pelo PT. Pode ser clonado para múltiplos alunos via `clonarParaAluno()`, gerando instâncias de FichaPersonalizada sem impactar o modelo original.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do treino mãe |
| nome | String | privado | Nome descritivo do template |
| objetivo | String | privado | Objetivo do treino (ex: hipertrofia, condicionamento) |
| categoria | String | privado | Categoria (ex: musculação, funcional, cardio) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| cadastrarTemplate() | void | Persiste o template no banco de dados |
| editarTemplate(id: int) | void | Atualiza os dados do template |
| clonarParaAluno(alunoId: int) | FichaPersonalizada | Gera uma FichaPersonalizada para o aluno indicado |

---

### 4.2 Classe FichaPersonalizada
*Módulo: modulo-treinos*

Instância personalizada de um treino para um aluno específico. Classe central do domínio — conecta treino, aluno, exercícios e registros de evolução.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da ficha |
| alunoId | int | privado | Referência ao aluno |
| dataCriacao | Date | privado | Data de criação ou atribuição |
| status | String | privado | Estado atual (ex: ativa, arquivada) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| visualizarFicha() | FichaPersonalizada | Retorna a ficha completa com exercícios e séries |
| ativarFicha() | void | Define a ficha como ativa para o aluno |
| desativarFicha() | void | Arquiva a ficha |

---

### 4.3 Classe Exercicio
*Módulo: modulo-treinos*

Exercício do catálogo do sistema. O atributo `urlVideosDemonstrativos` referencia a URL no Cloudinary — o backend nunca manipula o arquivo diretamente. O `descricaoAudio` atende ao requisito de acessibilidade do perfil AA.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do exercício |
| nome | String | privado | Nome do exercício |
| grupoMuscular | String | privado | Grupo muscular principal |
| urlVideosDemonstrativos | String | privado | URL do vídeo no Cloudinary CDN |
| descricaoAudio | String | privado | Descrição para leitura por voz (perfil AA) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| obterDescricaoAudio() | String | Retorna a descrição textual para leitura por voz |
| atualizarMidia(videoUrl, audioUrl: String) | void | Atualiza as referências de URL de mídia |

---

### 4.4 Classe SerieExercicio
*Módulo: modulo-treinos*

Configuração de séries de um exercício dentro de uma FichaPersonalizada. Fornece controle do cronômetro de descanso entre séries, atendendo ao perfil AA (comandos de voz — H18).

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da série |
| exercicioId | int | privado | Referência ao exercício |
| quantidadeSeries | int | privado | Número de séries |
| repeticoes | int | privado | Repetições por série |
| carga | float | privado | Carga em quilogramas |
| tempoDescanso | int | privado | Descanso entre séries em segundos |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| iniciarCronometroDescanso() | void | Inicia a contagem regressiva do descanso |
| pausarCronometroDescanso() | void | Pausa o cronômetro em andamento |
| concluirSerie() | void | Registra conclusão e dispara o cronômetro automaticamente |

---

### 4.5 Classe RegistroEvolucao
*Módulo: modulo-evolucao*

Registro de uma sessão de treino realizada pelo aluno. Serve de base para cálculo de progressão de carga e geração de relatórios.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do registro |
| alunoId | int | privado | Referência ao aluno |
| dataExecucao | DateTime | privado | Data e hora de execução do treino |
| tempoTotalTreino | int | privado | Duração total em minutos |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| salvarRegistro() | Boolean | Persiste o registro e retorna true em caso de sucesso |

---

### 4.6 Classe Relatorio
*Módulo: modulo-relatorios*

Relatório de progresso gerado automaticamente após evento de evolução registrada (padrão Pub/Sub). Disponível tanto ao PT quanto ao Aluno.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do relatório |
| alunoId | int | privado | Referência ao aluno |
| periodoInicio | Date | privado | Data de início do período analisado |
| periodoFim | Date | privado | Data de fim do período analisado |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| gerarRelatorioProgresso(alunoId: int) | void | Consolida registros de evolução e gera o relatório |
| exportarDados() | String | Exporta dados em formato estruturado |

---

### 4.7 Relações do Domínio

| Origem | Tipo | Destino | Multiplicidade | Descrição |
|---|---|---|---|---|
| TreinoMae | Associação | FichaPersonalizada | 1..* | Um TreinoMae gera uma ou mais fichas via clonarParaAluno() |
| FichaPersonalizada | Associação | RegistroEvolucao | 0..* | Uma ficha pode ter zero ou vários registros de execução |
| FichaPersonalizada | Composição | SerieExercicio | 1..* | SerieExercicio não existe sem a ficha |
| SerieExercicio | Associação | Exercicio | 0..* | O mesmo exercício pode aparecer em várias séries |
| RegistroEvolucao | Associação | Relatorio | 1..* | Um ou mais registros originam um Relatório de progresso |

---

## 5. Domínio: Comunicação e Agenda

Gerencia a comunicação entre PT e Aluno, o planejamento de agenda e o sistema de notificações via Pub/Sub. É o domínio que mais consome referências de outros domínios.

### 🖼️ Diagrama — Domínio: Comunicação e Agenda

| | |
|---|---|
| 📷 | **Figura — Classes do domínio Comunicação e Agenda** |
| | *Inserir imagem: `diagramas/uml/fig-classes-comunicacao.png`* |
| | *Legenda: Classes Conversa, Mensagem, Compromisso, LembreteAgenda, Notificacao e EventoPubSub. Fonte: elaborado pelos autores.* |

---

### 5.1 Classe Conversa
*Módulo: modulo-comunicacao*

Canal de comunicação entre um PT e um Aluno específico. Cada par PT-Aluno possui uma única Conversa. Comunicação em tempo real via WebSocket (Socket.io).

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da conversa |
| alunoId | int | privado | Referência ao Aluno participante |
| personalId | int | privado | Referência ao PT participante |
| dataCriacao | Date | privado | Data de criação da conversa |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| criarConversa(alunoId, personalId: int) | Conversa | Cria e persiste novo canal entre PT e Aluno |
| buscarPorParticipantes(alunoId, personalId: int) | Conversa | Localiza a conversa existente entre o par |

---

### 5.2 Classe Mensagem
*Módulo: modulo-comunicacao*

Mensagem individual dentro de uma Conversa. O `remetenteId` pode referenciar tanto um Aluno quanto um PT. Entrega em tempo real via Socket.io; notificação push via FCM.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da mensagem |
| conversaId | int | privado | Referência à Conversa |
| remetenteId | int | privado | Referência ao Usuario remetente (PT ou Aluno) |
| conteudo | String | privado | Texto da mensagem |
| dataEnvio | DateTime | privado | Data e hora de envio |
| lida | Boolean | privado | Indica se o destinatário visualizou |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| enviarMensagem() | Boolean | Persiste a mensagem e retorna true em caso de sucesso |
| marcarComoLida() | void | Atualiza o atributo `lida` para true |

---

### 5.3 Classe Compromisso
*Módulo: modulo-agenda*

Compromisso agendado pelo PT. Pode estar vinculado a um aluno (sessão presencial) ou ser um compromisso geral do PT.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do compromisso |
| personalId | int | privado | Referência ao PT responsável |
| alunoId | int | privado | Referência ao Aluno (nullable) |
| titulo | String | privado | Título descritivo |
| descricao | String | privado | Descrição detalhada |
| dataHoraInicio | DateTime | privado | Data e hora de início |
| dataHoraFim | DateTime | privado | Data e hora de fim |
| status | String | privado | Estado atual (agendado, concluído, cancelado) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| agendarCompromisso() | Boolean | Persiste o compromisso e retorna true em caso de sucesso |
| atualizarStatus(novoStatus: String) | void | Atualiza o status atual |
| cancelarCompromisso() | void | Cancela e notifica os envolvidos |
| verificarFaltas() | void | Verifica e registra ausência do aluno |

---

### 5.4 Classe LembreteAgenda
*Módulo: modulo-agenda*

Lembrete vinculado a um Compromisso. Não existe sem o Compromisso ao qual pertence.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do lembrete |
| compromissoId | int | privado | Referência ao Compromisso |
| tempoAntecedenciaMinutos | int | privado | Minutos de antecedência para o disparo |
| enviado | Boolean | privado | Indica se o lembrete já foi disparado |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| verificarDisparo() | Boolean | Verifica se está na hora de disparar o lembrete |
| dispararLembrete() | void | Publica o evento no FCM e marca `enviado` como true |

---

### 5.5 Classe Notificacao
*Módulo: modulo-notificacoes*

Registro de notificação push enviada ao usuário. Funciona como Subscriber no padrão Pub/Sub. Para o perfil AA, o payload inclui descrição textual compatível com leitores de tela.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único da notificação |
| eventoId | int | privado | Referência ao EventoPubSub de origem |
| usuarioId | int | privado | Referência ao Usuario destinatário |
| titulo | String | privado | Título exibido no dispositivo |
| corpo | String | privado | Corpo da mensagem |
| dataDisparo | DateTime | privado | Data e hora do envio |
| lida | Boolean | privado | Indica se o usuário visualizou |
| tipo | String | privado | Tipo (treino, cobranca, lembrete, mensagem) |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| enviarPushNotification() | Boolean | Envia ao dispositivo via FCM e retorna true em caso de sucesso |
| marcarNotificacaoComoLida() | void | Atualiza `lida` para true |

---

### 5.6 Classe EventoPubSub
*Módulo: modulo-notificacoes*

Publisher do sistema — quando um módulo dispara um evento, uma instância é criada e distribuída via FCM para os Subscribers. Cada evento pode originar zero ou mais Notificacoes.

#### Atributos

| Atributo | Tipo | Visibilidade | Descrição |
|---|---|---|---|
| id | int | privado | Identificador único do evento |
| nomeEvento | String | privado | Nome do evento (ex: treino.publicado, cobranca.pendente) |
| payload | String | privado | Dados do evento em JSON serializado |
| dataOcorrencia | DateTime | privado | Data e hora da publicação |

#### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| publicarEvento() | void | Publica o evento no FCM para distribuição aos Subscribers |
| inscreverNoEvento(nomeEvento: String) | void | Registra o dispositivo como Subscriber do evento |

---

### 5.7 Relações do Domínio

| Origem | Tipo | Destino | Multiplicidade | Descrição |
|---|---|---|---|---|
| Conversa | Composição | Mensagem | 1..* | Mensagem não existe sem a Conversa |
| Compromisso | Composição | LembreteAgenda | 0..* | LembreteAgenda não existe sem o Compromisso |
| EventoPubSub | Associação | Notificacao | 0..* | Um evento pode originar zero ou várias Notificacoes |

---

## 6. Relações entre Domínios

As classes dos domínios de Treinos e Evolução e de Comunicação e Agenda referenciam classes do domínio de Usuários e Acesso via associação, cruzando os boundaries modulares.

| Origem (Domínio) | Tipo | Destino (Domínio) | Mult. | Descrição |
|---|---|---|---|---|
| TreinoMae (Treinos) | Associação | PersonalTrainer (Usuários) | N..1 | PT é criador e proprietário do TreinoMae |
| FichaPersonalizada (Treinos) | Associação | Aluno (Usuários) | N..1 | A ficha pertence a um Aluno específico |
| RegistroEvolucao (Treinos) | Associação | Aluno (Usuários) | N..1 | Cada registro pertence a um Aluno |
| Relatorio (Treinos) | Associação | Aluno (Usuários) | N..1 | Cada relatório é gerado para um Aluno específico |
| Conversa (Comunicação) | Associação | Aluno (Usuários) | N..1 | Cada Conversa envolve um Aluno |
| Conversa (Comunicação) | Associação | PersonalTrainer (Usuários) | N..1 | Cada Conversa envolve um PT |
| Compromisso (Agenda) | Associação | PersonalTrainer (Usuários) | N..1 | Cada Compromisso pertence a um PT |
| Notificacao (Notificações) | Associação | Usuario (Usuários) | N..1 | Cada Notificação é destinada a um usuário |

---
