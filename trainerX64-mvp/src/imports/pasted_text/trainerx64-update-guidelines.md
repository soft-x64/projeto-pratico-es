Atualize o protótipo existente do TrainerX64 sem recriar o projeto do zero.

Mantenha as telas, rotas, componentes, navegação, services simulados e funcionalidades já geradas. Não apague telas existentes. Não altere a estrutura principal do sistema. Faça apenas uma evolução visual, funcional e de consistência para aproximar o protótipo do design definido no projeto de IHC, com inspiração visual em aplicativos modernos de registro de treino, sem copiar diretamente nenhum aplicativo externo.

Objetivo da correção:
Diferenciar melhor a experiência do Personal Trainer e do Aluno, mantendo a identidade do TrainerX64, o modo escuro, a navegação mobile, a logo, as heurísticas de usabilidade, a acessibilidade e os requisitos do MVP.

1. Diferenciação visual por perfil

Implemente um tema visual baseado no tipo de usuário selecionado no login ou cadastro.

Perfil Personal Trainer:

* Cor predominante: verde #00E676
* Usar verde em botões principais, item ativo da navegação, badges de status positivo, cards de ação e destaques importantes
* O dashboard do personal deve transmitir gestão, controle e organização profissional
* Textos e rótulos devem usar termos como:

  * Alunos
  * Criar treino
  * Cadastrar aluno
  * Avaliação física
  * Agenda
  * Mensalidades
  * Alunos ativos
  * Treinos pendentes
  * Avaliações recentes

Perfil Aluno:

* Cor predominante: azul/ciano #38BDF8 ou #1296F3
* Usar azul em botões principais, item ativo da navegação, cards de progresso, gráficos e ações de treino
* O dashboard do aluno deve transmitir execução, evolução e acompanhamento pessoal
* Textos e rótulos devem usar termos como:

  * Meus treinos
  * Iniciar treino
  * Progresso
  * Histórico
  * Minhas metas
  * Calendário
  * Treinos realizados
  * Dias consecutivos
  * Metas alcançadas

Importante:

* Não usar apenas cor para diferenciar os perfis. Use também textos, ícones, títulos e organização das telas.
* Manter o fundo escuro para ambos os perfis.
* O verde e o azul devem ser aplicados como acentos principais, não como fundo total da tela.

2. Ajuste do fluxo de login

Na tela de login, mantenha a seleção de tipo de usuário:

* Personal
* Aluno

Quando o usuário selecionar Personal:

* Destacar o card Personal com verde #00E676
* Botão “Entrar” em verde
* Após login, direcionar para Dashboard do Personal
* Navegação inferior do Personal:

  * Home
  * Alunos
  * Treinos
  * Perfil

Quando o usuário selecionar Aluno:

* Destacar o card Aluno com azul #38BDF8
* Botão “Entrar” em azul
* Após login, direcionar para Dashboard do Aluno
* Navegação inferior do Aluno:

  * Home
  * Treinos
  * Progresso
  * Perfil

Não crie “Aluno com Acessibilidade” como terceiro tipo de usuário na tela de login. A acessibilidade deve ser uma configuração ativável dentro do cadastro, perfil e configurações.

3. Cadastro e acessibilidade

Na tela de cadastro, mantenha apenas os tipos principais:

* Personal Trainer
* Aluno

Adicione uma seção opcional chamada “Recursos de acessibilidade”.

Texto da seção:
“Deseja ativar recursos de acessibilidade para facilitar sua navegação?”

Opções:

* Alto contraste
* Texto ampliado
* Leitura por voz
* Navegação simplificada
* Feedback sonoro/vibratório
* Descrições alternativas

Essas opções devem funcionar como preferências do usuário e não como um perfil separado.

4. Manter e melhorar o design atual de IHC

Mantenha a base visual já gerada:

* Fundo escuro
* Cards arredondados
* Ícones grandes
* Tipografia forte
* Botões destacados
* Navegação inferior fixa
* Telas com aparência mobile
* Logo TrainerX64 com ícone de halter

Melhore a consistência visual:

* Padronizar bordas dos cards
* Padronizar espaçamento
* Padronizar altura dos botões
* Padronizar estilo de ícones
* Padronizar títulos e subtítulos
* Padronizar cards de estatísticas e ações rápidas

Use inspiração visual dos prints de apps de treino apenas nos seguintes pontos:

* Fundo escuro limpo
* Cards compactos
* Botões grandes e objetivos
* Abas/filtros em formato de cápsula
* Navegação inferior com item ativo destacado
* Listas de treino com cards claros e resumidos
* Tela de rotina com tabela de série, kg e repetições
* Perfil/configurações em formato de lista com ícone à esquerda e seta à direita

Não copie a marca, o layout exato, a logo ou textos de nenhum aplicativo externo.

5. Correções de responsividade e texto

Corrija problemas de quebra de texto e corte visual.

Evite cards onde textos ficam quebrados de forma ruim, por exemplo:

* “Dias Consecuti vos”
* “Metas Alcança das”
* “Agenda da Semana” quebrado em muitas linhas sem necessidade

Ajuste:

* Largura dos cards
* Tamanho da fonte
* Espaçamento interno
* Altura dos cards
* Quebra de linha
* Alinhamento vertical

Se o texto for longo, use uma destas soluções:

* Reduzir levemente o tamanho da fonte
* Usar rótulos menores, como “Sequência” em vez de “Dias consecutivos”
* Usar duas linhas no máximo
* Usar ellipsis apenas em descrições secundárias, nunca em títulos principais

6. Dashboard do Personal

A tela “Bem-vindo(a), Personal” deve manter predominância verde.

Elementos:

* Título: “Bem-vindo(a), Personal”
* Subtítulo: “Gerencie seus alunos e treinos”
* Cards superiores:

  * Alunos ativos
  * Treinos pendentes
  * Avaliações recentes
* Ações rápidas:

  * Criar treino
  * Cadastrar aluno
  * Avaliação física
  * Agenda da semana
* Seção “Alunos recentes”
* Botão “Ver todos”
* Status dos alunos:

  * Treino atualizado
  * Avaliação pendente
  * Mensalidade pendente
  * Sem atividade recente

Aplicação de cor:

* Verde para ações principais e status positivos
* Amarelo/laranja para pendências
* Cinza para dados secundários
* Azul apenas como cor auxiliar, não predominante no perfil Personal

7. Dashboard do Aluno

A tela “Bem-vindo(a), Aluno” deve manter predominância azul.

Elementos:

* Título: “Bem-vindo(a), Aluno”
* Subtítulo: “Continue sua jornada fitness”
* Cards superiores:

  * Treinos realizados
  * Sequência
  * Metas alcançadas
* Ações rápidas:

  * Iniciar treino
  * Minhas metas
  * Histórico
  * Calendário
* Seção “Meus treinos”
* Botão “Ver todos”
* Card do treino atual com botão “Iniciar treino”

Aplicação de cor:

* Azul/ciano para ações principais, gráficos e progresso
* Verde pode aparecer apenas para conclusão/sucesso
* Cinza para dados secundários
* Não usar verde como cor principal no perfil Aluno

8. Tela Meus Alunos

Mantenha a tela “Meus Alunos” apenas para o perfil Personal.

Melhorias:

* Cor predominante verde
* Botão de adicionar aluno em verde
* Filtros em cápsula:

  * Todos
  * Treino atualizado
  * Avaliação pendente
  * Mensalidade pendente
* Cards de alunos com:

  * Foto/avatar
  * Nome
  * Status textual
  * Treino atual
  * Ícone de seta para abrir detalhes
* Status:

  * Verde: último treino recente / em dia
  * Amarelo: avaliação pendente
  * Vermelho discreto: mensalidade pendente ou atraso
* Manter texto + ícone, nunca apenas cor

9. Tela Detalhes do Aluno

Mantenha a tela “Detalhes do Aluno” apenas para o Personal.

Melhorias:

* Cor predominante verde
* Card principal com foto, nome e status
* Métricas:

  * Peso
  * Altura
  * Idade
  * Nível
  * Categoria
  * Objetivo
* Ações rápidas:

  * Criar treino
  * Ver evolução
  * Registrar avaliação
  * Mensalidade
* Botão de ajuda no topo pode permanecer
* Botão voltar deve estar claro

10. Tela Criar Treino

Mantenha a tela “Criar Treino” para o Personal.

Melhorias:

* Cor predominante verde
* Campos:

  * Selecionar aluno
  * Nome do treino
  * Categoria do treino
  * Descrição opcional
* Seção “Exercícios do treino”
* Botão “Adicionar exercício”
* Botão “Salvar treino” deve ficar desabilitado quando os campos obrigatórios estiverem vazios
* Quando estiver habilitado, usar verde
* Exibir mensagem clara quando faltar informação

Validações:

* Nome do treino obrigatório
* Categoria obrigatória
* Pelo menos 1 exercício obrigatório
* Não permitir salvar treino vazio

11. Modal Selecionar Exercício

Mantenha o modal de seleção de exercício.

Melhorias:

* Fundo escuro
* Cards compactos
* Busca no topo
* Filtros em cápsula:

  * Todos
  * Peito
  * Costas
  * Pernas
  * Ombros
  * Braços
* Cards de exercício com:

  * Ícone
  * Nome
  * Descrição curta
  * Categoria
* Usar verde quando aberto pelo fluxo do Personal
* Usar azul quando aberto pelo fluxo do Aluno
* Botão de fechar claro no topo
* Estado vazio se nenhum exercício for encontrado

12. Tela Treinos / Rotinas

A tela de treinos deve ser acessível para Personal e Aluno, mas com variações.

Para Personal:

* Predominância verde
* Ações:

  * Criar treino
  * Modelos de treino
  * Treinos dos alunos
  * Templates
* Cards com botão “Editar treino” ou “Atribuir ao aluno”

Para Aluno:

* Predominância azul
* Ações:

  * Iniciar treino
  * Ver rotina
  * Ver histórico
* Cards com botão “Iniciar rotina”

Visual:

* Inspirar-se nos prints de treino/rotina:

  * Cards escuros
  * Botão principal largo
  * Menu de três pontos
  * Resumo dos exercícios
  * Seções “Rotinas” e “Meus treinos”

13. Tela Detalhe do Treino

Melhore a tela de detalhe do treino com inspiração em apps de registro de treino.

Elementos:

* Nome do treino
* Criado por
* Botão principal:

  * Personal: “Editar treino” ou “Atribuir treino”
  * Aluno: “Iniciar rotina”
* Gráfico simples:

  * Volume
  * Repetições
  * Duração
* Filtros em cápsula
* Lista de exercícios
* Para cada exercício:

  * Nome
  * Ícone ou miniatura
  * Tabela:

    * Série
    * KG
    * Reps
  * Botão “Ver execução”
  * Botão “Marcar concluído” no fluxo do aluno

Mídias:

* Não implementar vídeo real.
* Usar apenas placeholder “Ver execução” e descrição técnica.
* Indicar que a integração futura será com Cloudinary.

14. Tela Progresso / Evolução

Para Aluno:

* Nome da aba: “Progresso”
* Predominância azul
* Mostrar gráficos de evolução
* Mostrar cards:

  * Peso atual
  * Frequência semanal
  * Volume total
  * Última avaliação
* Botão “Registrar evolução”

Para Personal:

* Pode aparecer como “Avaliação Física” ou “Evolução do aluno”
* Predominância verde
* Mostrar evolução do aluno selecionado
* Botão “Registrar avaliação”

15. Tela Perfil e Configurações

A tela de perfil/configurações deve combinar o design atual de IHC com inspiração dos prints de configurações.

Elementos:

* Card do usuário com avatar, nome, tipo de conta e ID
* Botão “Editar perfil”
* Seção Conta:

  * Alterar senha
  * Editar informações pessoais
* Seção Notificações:

  * Lembretes de treino
  * Atualizações do personal
  * Alertas de progresso
* Seção Acessibilidade:

  * Alto contraste
  * Texto ampliado
  * Leitura por voz
  * Navegação simplificada
  * Feedback sonoro/vibratório
* Seção Legal:

  * Termos de Uso
  * Política de Privacidade
* Botão “Sair da conta” com confirmação

Aplicação de cor:

* Se Personal: usar verde nos botões, toggles ativos e destaques
* Se Aluno: usar azul nos botões, toggles ativos e destaques
* Usar verde sempre para sucesso/conclusão, mesmo no perfil aluno
* Usar amarelo para alerta
* Usar vermelho apenas para erro ou ação destrutiva

16. Navegação inferior

Corrija a navegação inferior para diferenciar perfis.

Personal:

* Home
* Alunos
* Treinos
* Perfil

Aluno:

* Home
* Treinos
* Progresso
* Perfil

Requisitos:

* Item ativo com cápsula destacada
* Cor do item ativo muda conforme o perfil:

  * Verde para Personal
  * Azul para Aluno
* Ícone sempre acompanhado de texto
* A navegação deve ficar fixa no rodapé
* Não deve cobrir conteúdo importante
* Adicionar padding inferior nas telas para evitar que cards fiquem escondidos atrás da barra

17. Heurísticas de usabilidade obrigatórias

Aplique em todas as telas:

Visibilidade do status do sistema:

* Mostrar loading, sucesso, erro, progresso, item ativo, estados vazios e estados concluídos

Prevenção de erros:

* Desabilitar botões quando campos obrigatórios estiverem vazios
* Validar dados antes de salvar
* Confirmar ações sensíveis
* Não permitir salvar treino sem exercício
* Não permitir cadastro sem aceitar termos

Consistência:

* Mesmo padrão de cards, botões, inputs, ícones e navegação
* Mesma lógica de cores por perfil
* Mesmos nomes para ações iguais

Reconhecimento em vez de memorização:

* Ícones com rótulo
* Filtros visíveis
* Cards autoexplicativos
* Mensagens claras

Recuperação de erros:

* Mensagens simples e específicas
* Indicar como corrigir o erro

Acessibilidade:

* Alto contraste
* Textos legíveis
* Botões grandes
* Rótulos em ícones
* Não depender apenas de cor
* Descrições textuais em gráficos, status e exercícios
* Compatibilidade conceitual com leitores de tela

18. Correções técnicas

Não implementar backend real neste momento.

Manter como simulação/localStorage:

* authService
* userService
* treinoService
* alunoService
* evolucaoService
* notificationService
* accessibilityService
* storageService

Garantir que nenhum service quebre a aplicação.
Se algum dado estiver vazio, undefined ou null, mostrar estado vazio amigável.

Não exibir “Unexpected Application Error”.
Não deixar a aplicação quebrar se não houver notificações, treinos, alunos ou evolução cadastrada.

19. Preservar requisitos do TP4

O protótipo deve continuar demonstrando:

* Cadastro com validação
* Login com autenticação simulada
* Logo obrigatória na tela de login
* Termos de Uso
* Política de Privacidade
* Mínimo de 8 telas navegáveis
* Navegação funcional
* Persistência simulada
* Feedback de erro e sucesso
* Acessibilidade
* Rastreabilidade com histórias de usuário
* Estrutura pronta para evolução no VS Code

Resultado esperado:
Um MVP mobile escuro, moderno e funcional do TrainerX64, com duas experiências claras:

* Personal Trainer: verde, gestão de alunos e criação de treinos
* Aluno: azul, execução de treinos e acompanhamento de progresso

Mantenha o design criado em IHC, melhore a consistência visual com inspiração em apps de treino, corrija quebras de texto, ajuste a navegação por perfil e preserve todas as funcionalidades já geradas.
