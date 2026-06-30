Crie um MVP funcional, navegável e visualmente consistente para o aplicativo mobile TrainerX64.

O TrainerX64 é um sistema digital de gestão de treinos voltado para personal trainers e alunos. O objetivo é centralizar em um único aplicativo o gerenciamento de alunos, criação e acompanhamento de treinos, registro de execução, evolução física, notificações, comunicação básica e organização da rotina fitness.

O aplicativo deve ser projetado como um MVP mobile, com foco em navegação clara, telas funcionais, componentes reutilizáveis e estrutura visual pronta para ser evoluída posteriormente no Visual Studio Code.

Use como tecnologias de referência do projeto:

* Front-end: React Native com TypeScript
* Arquitetura de interface: MVVM
* Back-end previsto: Node.js + Express em monolito modular
* Banco principal previsto: PostgreSQL com Prisma ORM
* Banco local/offline previsto: WatermelonDB para cache de treinos e evolução
* Autenticação prevista: Firebase Authentication
* Notificações previstas: Firebase Cloud Messaging
* Comunicação em tempo real prevista: Socket.io
* Mídia de exercícios prevista: Cloudinary para vídeos demonstrativos
* Versionamento previsto: GitHub + Git

Não implemente backend real. Crie dados mockados e services simulados no front-end:

* authService
* userService
* treinoService
* evolucaoService
* notificationService
* accessibilityService
* storageService

A estrutura sugerida do projeto deve conter:

* src/components
* src/pages
* src/services
* src/assets
* src/App.jsx ou App.tsx
* src/main.jsx ou main.tsx

A identidade visual deve seguir um estilo mobile fitness moderno inspirado em aplicativos de registro de treino, com fundo escuro, cards compactos, hierarquia visual forte, botões grandes e navegação rápida. Use os prints de referência como inspiração de usabilidade, mas não copie marca, layout exato ou identidade de outro aplicativo. O TrainerX64 deve manter identidade própria.

Direção visual:

* Fundo principal quase preto: #000000 ou #121212
* Cards e listas: #1C1C1E ou #1E1E1E
* Divisórias sutis: #2A2A2A
* Texto principal: #FFFFFF
* Texto secundário: #A0A0A0
* Texto desabilitado: #6E6E6E
* Verde principal do TrainerX64: #00E676
* Azul/ciano de ação: #38BDF8
* Azul de botão primário inspirado em apps fitness: #1296F3 ou #38BDF8
* Evitar telas claras
* Manter alto contraste
* Bordas arredondadas entre 16px e 24px
* Botões grandes, com altura entre 48px e 56px
* Cards com espaçamento interno confortável

Tipografia:

* Títulos grandes: Montserrat Bold 700, tamanho aproximado 28px a 32px
* Títulos de seção: Montserrat SemiBold, tamanho aproximado 20px a 22px
* Títulos de cards: Montserrat SemiBold, tamanho aproximado 17px a 19px
* Texto comum: Inter Regular, tamanho aproximado 15px a 17px
* Legendas e textos secundários: Inter Regular, tamanho aproximado 13px a 14px
* Labels da navegação inferior: Inter Medium, tamanho aproximado 12px a 13px

Crie uma logo original para o TrainerX64:

* Pode usar o texto “TrainerX64” ou o monograma “TX64”
* Estilo fitness, tecnológico e moderno
* Usar verde #00E676 e azul/ciano #38BDF8
* Funcionar bem em fundo escuro
* Deve aparecer obrigatoriamente na tela de login
* Também pode aparecer no cadastro, dashboard e perfil

A navegação inferior deve seguir o estilo de cápsula flutuante, semelhante aos prints de referência:

* Fundo escuro translúcido
* Bordas arredondadas grandes
* Ícones com rótulos textuais
* Item ativo destacado com cápsula interna
* Não depender apenas da cor para indicar o item ativo
* Itens sugeridos:

  * Início
  * Treinos
  * Evolução
  * Notificações
  * Perfil

O MVP deve conter 8 telas principais navegáveis:

1. Tela de Cadastro de Usuário

Objetivo: permitir criação de conta no aplicativo.

Campos:

* Nome completo
* E-mail
* Senha
* Confirmar senha
* Tipo de conta: Personal Trainer ou Aluno
* Objetivo principal: Hipertrofia, Emagrecimento, Condicionamento, Saúde ou Reabilitação
* Checkbox obrigatório: “Aceito os Termos de Uso e a Política de Privacidade”

Importante:
Não coloque “Aluno com Acessibilidade” como tipo de conta principal. Em vez disso, crie uma seção opcional chamada “Recursos de Acessibilidade”, com a pergunta:
“Deseja ativar recursos de acessibilidade?”

Se ativado, mostrar opções:

* Alto contraste
* Texto ampliado
* Leitura por voz
* Navegação simplificada
* Feedback sonoro/vibratório
* Descrições alternativas

Internamente, isso representa o perfil Aluno com Acessibilidade, mas na interface deve parecer uma configuração de autonomia e inclusão, não uma separação do usuário.

Requisitos:

* Validar campos obrigatórios
* Validar formato de e-mail
* Validar senha mínima
* Validar confirmação de senha
* Bloquear cadastro se os termos não forem aceitos
* Exibir mensagens de erro claras
* Exibir mensagem de sucesso após cadastro
* Simular armazenamento local dos dados
* Ter links ou botões para abrir modal de Termos de Uso e Política de Privacidade

Mensagens:

* “Cadastro realizado com sucesso. Você já pode acessar o TrainerX64.”
* “Preencha todos os campos obrigatórios.”
* “Digite um e-mail válido.”
* “As senhas não conferem.”
* “Você precisa aceitar os Termos de Uso e a Política de Privacidade.”

2. Tela de Login

Objetivo: permitir acesso seguro ao sistema.

A tela de login deve ter visual mais marcante e profissional, com inspiração tecnológica/fitness usada no início do trabalho. Ela deve ser mais forte visualmente que uma tela simples de formulário.

Elementos:

* Logo TrainerX64 em destaque no topo
* Frase curta: “Organize treinos. Acompanhe evolução. Treine com autonomia.”
* Campo de e-mail
* Campo de senha
* Botão principal “Entrar”
* Link “Criar conta”
* Link “Esqueci minha senha”
* Link para Termos de Uso
* Link para Política de Privacidade
* Pequeno texto de segurança: “Autenticação segura prevista com Firebase Authentication.”

Requisitos:

* Simular autenticação com e-mail e senha
* Exibir loading ao clicar em entrar
* Exibir mensagem de sucesso quando o login for válido
* Exibir mensagem de erro quando dados forem inválidos
* Redirecionar para Dashboard após login
* Não quebrar se os dados estiverem vazios

Mensagens:

* “Login realizado com sucesso. Bem-vindo ao TrainerX64.”
* “E-mail ou senha inválidos. Verifique os dados e tente novamente.”

3. Dashboard / Início

Objetivo: ser a tela principal após o login.

Visual:

* Fundo escuro
* Título grande
* Cards compactos
* Ícones claros
* Informações rápidas
* Botões de ação com destaque

Elementos:

* Saudação personalizada: “Olá, Rafael” ou “Olá, Gustavo”
* Resumo da semana:

  * Horas treinadas
  * Treinos concluídos
  * Evoluções registradas
  * Alunos ativos
* Gráfico simples em barras ou linha mostrando desempenho semanal ou mensal
* Filtros em formato de cápsula:

  * Semana
  * Mês
  * 3 meses
* Cards de painel:

  * Estatísticas
  * Exercícios
  * Medições
  * Calendário
* Últimos treinos ou alunos recentes
* Status visual dos alunos:

  * Em dia
  * Pendente
  * Treino atualizado
  * Sem atividade recente

Requisitos de UX:

* Mostrar status do sistema
* Usar texto junto com ícones
* Mostrar estados vazios amigáveis
* Permitir navegação para Treinos, Evolução, Notificações e Perfil

4. Tela Lista de Treinos

Objetivo: listar rotinas/treinos disponíveis.

Visual inspirado nos prints de referência:

* Título grande “Treinos”
* Botão grande “Iniciar Treinamento Vazio”
* Seção “Rotinas”
* Botões em cards:

  * Nova Rotina
  * Explorar
* Cards de treino com nome, resumo dos exercícios e botão de ação
* Menu de três pontos em cada card
* Botão principal azul/ciano “Iniciar Rotina”

Elementos:

* Barra de busca
* Filtros por categoria:

  * Hipertrofia
  * Emagrecimento
  * Condicionamento
  * Mobilidade
* Seções:

  * Treinos disponíveis
  * Minhas rotinas
  * Treinos recentes

Cards de treino:

* Nome: “Upper”
* Nome: “Push 1, Push 2”
* Nome: “Pull 1, Pull 2”
* Objetivo
* Exercícios resumidos
* Quantidade de exercícios
* Duração estimada
* Status: Disponível, Em andamento ou Concluído
* Botão “Iniciar Rotina”

Requisitos:

* Simular lista com dados mockados
* Mostrar estado vazio se nenhum treino for encontrado
* Mostrar feedback quando filtro for aplicado
* Usar cards reutilizáveis

5. Tela Detalhe do Treino / Rotina

Objetivo: mostrar a rotina selecionada e permitir início do treino.

Visual inspirado nos prints de detalhe de rotina:

* Topo com botão voltar
* Título central “Rotina”
* Botões de ação no topo: compartilhar e menu
* Nome grande do treino
* Texto “Criado por TrainerX64” ou nome do usuário
* Botão grande “Iniciar Rotina”
* Gráfico de evolução da rotina
* Filtros em cápsula:

  * Volume
  * Repetições
  * Duração
* Lista de exercícios em formato técnico

Elementos:

* Nome do treino
* Objetivo do treino
* Duração estimada
* Volume total simulado
* Gráfico simples com dados mockados
* Lista de exercícios
* Para cada exercício:

  * Miniatura ou ícone técnico
  * Nome
  * Tabela com colunas: Série, KG, Reps
  * Botão “Ver execução”
  * Botão “Marcar como concluído”

Exemplo de exercício:

* Supino Sentado Máquina

  * Série 1 | 80 kg | 8 reps
  * Série 2 | 80 kg | 9 reps

Requisitos:

* Simular marcação de exercício concluído
* Atualizar progresso do treino
* Exibir mensagem ao concluir exercício
* Exibir mensagem ao concluir treino
* Prevenir erro ao tentar concluir treino sem nenhuma ação
* Usar feedback visual e textual
* Para acessibilidade, fornecer descrições textuais dos exercícios e feedback sonoro/vibratório simulado

Mídia:

* Não implementar vídeo externo real no MVP
* Criar apenas botão/placeholder “Ver execução”
* Mostrar miniatura ou ícone técnico do exercício
* Indicar visualmente que a integração futura será com Cloudinary
* Se não houver vídeo, mostrar alternativa: “Descrição técnica disponível”

Mensagens:

* “Exercício marcado como concluído.”
* “Treino concluído com sucesso.”
* “Conclua pelo menos um exercício antes de finalizar o treino.”

6. Tela Evolução Física

Objetivo: registrar e visualizar evolução física do aluno.

Visual:

* Inspirar-se na tela de perfil com gráfico dos prints
* Usar gráfico em barras ou linha
* Usar filtros de período em cápsula
* Cards escuros com indicadores

Elementos:

* Título “Evolução”
* Cards:

  * Peso atual
  * Último registro
  * Frequência semanal
  * Volume total
* Gráfico simples de evolução com dados mockados
* Filtros:

  * Semana
  * Mês
  * 3 meses
  * Ano
* Formulário para registrar:

  * Peso
  * Altura
  * Cintura
  * Braço
  * Perna
  * Observações
* Botão “Salvar evolução”

Requisitos:

* Validar campos numéricos
* Não permitir valores negativos
* Exibir mensagem de erro para dados inválidos
* Exibir mensagem de sucesso após salvar
* Simular persistência local dos dados
* Indicar que no projeto final a sincronização será feita com WatermelonDB, API Node.js/Express e PostgreSQL via Prisma

Mensagens:

* “Informe valores válidos para registrar sua evolução.”
* “Evolução registrada com sucesso.”

7. Tela Notificações

Objetivo: centralizar avisos, lembretes e mensagens importantes.

Visual:

* Lista escura semelhante à tela de configurações dos prints
* Ícones grandes à esquerda
* Texto principal branco
* Texto secundário cinza
* Chevron ou ação à direita
* Separadores sutis

Elementos:

* Título “Notificações”
* Filtros:

  * Todas
  * Não lidas
  * Treinos
  * Financeiro
  * Mensagens
* Lista de notificações:

  * Novo treino publicado
  * Lembrete de treino
  * Evolução registrada
  * Mensalidade pendente
  * Mensagem do personal
* Cada notificação deve ter:

  * Ícone
  * Título
  * Descrição
  * Horário/data
  * Status: Lida ou Não lida
* Botão “Marcar como lida”

Requisitos:

* Simular notificações vindas do Firebase Cloud Messaging
* Criar fallback seguro: se notificationService falhar ou estiver vazio, mostrar lista mockada ou estado vazio
* Nunca quebrar a tela por falta de dados
* Para acessibilidade, notificações devem ter descrições claras para leitura por voz
* Não usar apenas cor para indicar status

8. Tela Perfil / Configurações

Objetivo: permitir visualização, edição simples e preferências do usuário.

Visual inspirado diretamente nos prints de perfil/configurações:

* Fundo preto
* Topo com nome do usuário
* Avatar circular
* Estatísticas rápidas
* Gráfico de treino
* Cards em grade
* Lista de configurações em linhas grandes
* Ícones à esquerda e chevron à direita
* Navegação inferior em cápsula

Elementos da área de perfil:

* Avatar
* Nome
* E-mail
* Tipo de conta: Personal Trainer ou Aluno
* Treinos concluídos
* Seguidores/seguindo podem ser omitidos ou trocados por dados mais úteis:

  * Treinos
  * Alunos
  * Evoluções
* Gráfico dos últimos 3 meses
* Filtros:

  * Duração
  * Volume
  * Repetições

Painel:

* Estatísticas
* Exercícios
* Medições
* Calendário

Configurações:

* Conta
* Notificações
* Treinamentos
* Privacidade
* Unidades
* Idioma
* Acessibilidade
* Termos de Uso
* Política de Privacidade

Preferências de acessibilidade:

* Alto contraste
* Texto ampliado
* Leitura por voz
* Navegação simplificada
* Feedback sonoro/vibratório
* Descrições alternativas

Requisitos:

* Simular edição de dados
* Exibir mensagem de sucesso ao salvar
* Exigir confirmação antes de sair da conta
* Aplicar visualmente alto contraste e texto ampliado quando ativados
* A acessibilidade deve ser uma configuração transversal, não uma tela isolada sem impacto

Modais reutilizáveis:

* Modal de Termos de Uso
* Modal de Política de Privacidade
* Modal de confirmação de saída
* Toast de sucesso
* Toast de erro
* Estado vazio amigável
* Loading simples

Heurísticas de IHC obrigatórias:

1. Visibilidade do status do sistema:

* Mostrar loading, sucesso, erro, progresso de treino e estados lido/não lido
* Sempre informar ao usuário o que aconteceu após uma ação

2. Prevenção de erros:

* Bloquear botões quando campos obrigatórios estiverem vazios
* Validar dados antes de salvar
* Confirmar ações sensíveis, como sair da conta
* Evitar exclusões sem confirmação

3. Consistência e padrões:

* Manter mesmos estilos de botão, cards, inputs, ícones e navegação
* Usar nomes claros
* Manter ícones acompanhados de texto

4. Reconhecimento em vez de memorização:

* Mostrar rótulos em todos os ícones
* Usar cards informativos
* Manter filtros visíveis
* Evitar menus escondidos demais

5. Design minimalista:

* Evitar excesso de informação
* Priorizar dados essenciais
* Usar hierarquia visual clara

6. Recuperação de erros:

* Mensagens simples e específicas
* Indicar como corrigir o problema
* Exemplo: “Digite um e-mail válido” em vez de “Erro no campo”

7. Acessibilidade:

* Alto contraste
* Textos legíveis
* Botões grandes
* Ordem lógica de navegação
* Elementos com rótulos acessíveis
* Não depender apenas de cores
* Descrições alternativas em ícones, gráficos e exercícios
* Feedback visual e textual
* Compatibilidade conceitual com TalkBack e VoiceOver

Componentes reutilizáveis:

* PrimaryButton
* SecondaryButton
* InputField
* PasswordField
* FeedbackToast
* Modal
* Header
* FloatingBottomNavigation
* Card
* StatusBadge
* WorkoutCard
* RoutineCard
* ExerciseCard
* ExerciseSetTable
* MetricCard
* NotificationCard
* ProfileOption
* AccessibilityToggle
* PeriodFilter
* ChartCard

Dados mockados sugeridos:

* Personal: Rafael
* Aluno: Gustavo
* Aluna: Serena
* Aluno com recursos de acessibilidade ativados: Gabriel
* Rotinas:

  * Upper
  * Push 1, Push 2
  * Pull 1, Pull 2
  * Hipertrofia Iniciante
* Exercícios:

  * Supino Sentado Máquina
  * Supino Inclinado na Máquina
  * Puxada Alta
  * Remada Baixa
  * Leg Press
  * Agachamento
  * Rosca Direta
* Notificações:

  * Novo treino publicado
  * Treino de hoje disponível
  * Mensalidade pendente
  * Evolução registrada
  * Mensagem do personal

Fluxo de navegação:
Cadastro → Login → Dashboard
Login → Dashboard
Dashboard → Lista de Treinos
Lista de Treinos → Detalhe do Treino
Dashboard → Evolução Física
Dashboard → Notificações
Dashboard → Perfil
Login/Cadastro → Modal de Termos de Uso
Login/Cadastro → Modal de Política de Privacidade
Perfil → Configurações de Acessibilidade
Perfil → Sair da conta → Login

O resultado deve parecer um MVP real, funcional e navegável, não apenas um protótipo visual. Priorize telas prontas para demonstração em sala, com estados de erro, sucesso, vazio, carregamento e confirmação.

Mantenha o sistema com identidade própria do TrainerX64, apenas usando a referência visual dos prints para melhorar hierarquia, espaçamento, cards, botões, gráficos, listas e navegação.
