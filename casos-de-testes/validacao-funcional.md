# ✅ Validação Funcional — TrainerX64

---

## Sumário

| # | História | Perfil atendido | Área de validação |
|---|---|---|---|
| 1 | [H01 — Cadastro de treinos padronizados](#1-h01--cadastro-de-treinos-padronizados) | PT | Treinos |
| 2 | [H02 — Dashboard centralizado de alunos](#2-h02--dashboard-centralizado-de-alunos) | PT | Dashboard / Evolução |
| 3 | [H03 — Relatórios automáticos de evolução](#3-h03--relatorios-automaticos-de-evolucao) | PT | Relatórios |
| 4 | [H05 — Chat direto entre personal e aluno](#4-h05--chat-direto-entre-personal-e-aluno) | PT · A | Comunicação |
| 5 | [H06 — Interface visual de status dos alunos](#5-h06--interface-visual-de-status-dos-alunos) | PT | Alunos / Status |
| 6 | [H07 — Fluxo de primeiros passos](#6-h07--fluxo-de-primeiros-passos) | PT · A · AA | Onboarding |
| 7 | [H08 — Atalhos de teclado na versão desktop](#7-h08--atalhos-de-teclado-na-versao-desktop) | PT | Produtividade desktop |
| 8 | [H09 — Alertas de faltas do aluno](#8-h09--alertas-de-faltas-do-aluno) | PT | Alertas / Evasão |
| 9 | [H10 — Vídeos explicativos dos exercícios](#9-h10--videos-explicativos-dos-exercicios) | A · AA | Treinos / Mídia |
| 10 | [H11 — Registro de cargas e repetições](#10-h11--registro-de-cargas-e-repeticoes) | A · AA | Execução de treino |
| 11 | [H12 — Lembretes de treino para o personal](#11-h12--lembretes-de-treino-para-o-personal) | PT | Agenda / Notificações |
| 12 | [H13 — Gráficos de evolução física](#12-h13--graficos-de-evolucao-fisica) | A · AA | Evolução física |
| 13 | [H16 — Suporte a leitores de tela](#13-h16--suporte-a-leitores-de-tela) | AA | Acessibilidade |
| 14 | [H17 — Alto contraste e fontes escaláveis](#14-h17--alto-contraste-e-fontes-escalaveis) | AA | Acessibilidade |
| 15 | [H18 — Comandos de voz para cronômetro de descanso](#15-h18--comandos-de-voz-para-cronometro-de-descanso) | AA | Acessibilidade |
| 16 | [H20 — Feedback vibratório ao concluir série](#16-h20--feedback-vibratorio-ao-concluir-serie) | AA | Acessibilidade |
| 17 | [H21 — Cadastro de novo aluno](#17-h21--cadastro-de-novo-aluno) | PT | Alunos |
| 18 | [H22 — Relatório de desempenho da aluna](#18-h22--relatorio-de-desempenho-da-aluna) | A | Relatórios |
| 19 | [H23 — Gráficos de progresso da aluna](#19-h23--graficos-de-progresso-da-aluna) | A | Progresso |
| 20 | [H24 — Ficha personalizada do dia](#20-h24--ficha-personalizada-do-dia) | A | Treinos |
| 21 | [H25 — Lembretes de treino para o aluno](#21-h25--lembretes-de-treino-para-o-aluno) | A · AA | Notificações |
| 22 | [H26 — Lista de alunos com mensalidade pendente](#22-h26--lista-de-alunos-com-mensalidade-pendente) | PT | Financeiro |
| 23 | [H27 — Marcação de mensalidade como recebida](#23-h27--marcacao-de-mensalidade-como-recebida) | PT | Financeiro |
| 24 | [H28 — Login com e-mail e senha](#24-h28--login-com-e-mail-e-senha) | PT · A · AA | Autenticação |
| 25 | [H29 — Recuperação de senha por e-mail](#25-h29--recuperacao-de-senha-por-e-mail) | PT · A · AA | Autenticação |

---

## Perfis do Sistema

O documento considera os mesmos perfis utilizados na documentação técnica do **TrainerX64**, mantendo rastreabilidade entre persona, funcionalidade e validação.

| Perfil | Sigla | Descrição |
|---|---|---|
| **Personal Trainer** | PT | Gerencia alunos, treinos, evolução, agenda, cobranças, relatórios e comunicação |
| **Aluno** | A | Acessa treinos, registra execuções, acompanha progresso, recebe notificações e utiliza relatórios |
| **Aluno com Acessibilidade** | AA | Utiliza as funcionalidades do aluno com recursos de acessibilidade, como leitores de tela, alto contraste, voz e feedback vibratório |

> ✅ **Rastreabilidade adotada:** cada história concentra seus critérios de aceitação, regras de negócio, classes de equivalência e casos de teste em uma única seção.

---

## Visão Geral da Validação

A validação funcional foi organizada para permitir que um avaliador percorra o fluxo completo de análise sem consultar documentos externos:

```text
História de Usuário
        ↓
Critérios de Aceitação
        ↓
Regras de Negócio
        ↓
Classes de Equivalência
        ↓
Casos de Teste
```

---

## 1. H01 — Cadastro de treinos padronizados

### 1.1 História de Usuário

> H01 - Enquanto personal, desejo cadastrar treinos padronizados: que possuem uma mesma base de exercícios para replicá-los rapidamente entre alunos com objetivos similares que são de mesma categoria.

### 1.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir salvar uma sequência de exercícios como um "Treino Padrão".
- **CA02:** O personal deve conseguir nomear e categorizar o template optando pelos nomes padrões "Hipertrofia Iniciante", "Emagrecimento Avançado" ou escrever uma categoria.
- **CA03:** Ao acessar o perfil de um aluno, deve haver uma opção "Importar de Template" que liste os treinos salvos.
- **CA04:** Alterações feitas no treino específico de um aluno após a importação não devem afetar o template original e depois de importado alterações feitas no template padrão também não afetam o treino do aluno.

### 1.3 Regras de Negócio

- **RN01:** Um template só pode ser salvo se possuir, no mínimo, um Nome de Identificação, pelo menos 1 exercício cadastrado com suas respectivas séries e repetições e a categoria determinada, caso não tenha um exercício cadastrado o botão de salvar não estará disponível.
- **RN02:** O sistema não deve permitir o cadastro de dois treinos padronizados com o mesmo nome para o mesmo Personal, por exemplo: não permitir dois templates chamados "Iniciante A" apresentando uma mensagem de erro informando que já existe um treino com esse nome.

### 1.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H01-CE01 | Nome do Template | Nome preenchido e inédito para o Personal | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H01-CE02 | Nome do Template | — | Nome está vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H01-CE03 | Nome do Template | — | Nome duplicado para o mesmo Personal | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H01-CE04 | Categoria do Template | Categoria informada (padrão selecionada ou customizada escrita) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H01-CE05 | Categoria do Template | — | Categoria deixada em branco / não determinada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H01-CE06 | Quantidade de Exercícios | Pelo menos 1 exercício adicionado à lista | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H01-CE07 | Quantidade de Exercícios | — | Nenhum exercício cadastrado (botão salvar indisponível) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H01-CE08 | Detalhes do Exercício | Séries e repetições preenchidas | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H01-CE09 | Detalhes do Exercício | — | Exercício cadastrado sem séries ou sem repetições | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 1.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H01-CT01 | Validar comportamento com nome: "Iniciante A" Categoria: "Hipertrofia Iniciante" Exercícios: [Supino Reto - 3x10] | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "Iniciante A" Categoria: "Hipertrofia Iniciante" Exercícios: [Supino Reto - 3x10] | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino padrão salvo com sucesso. | H01-CE01, H01-CE04, H01-CE06, H01-CE08 |
| H01-CT02 | Validar comportamento com nome: "" (Vazio) Categoria: "Emagrecimento Avançado" Exercícios: [Leg Press - 3x12] | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "" (Vazio) Categoria: "Emagrecimento Avançado" Exercícios: [Leg Press - 3x12] | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido (Nome obrigatório). | H01-CE02, H01-CE04, H01-CE06, H01-CE08 |
| H01-CT03 | Validar comportamento com nome: "Iniciante A" (Já existente) Categoria: "Hipertrofia Iniciante" Exercícios: [Agacham | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "Iniciante A" (Já existente) Categoria: "Hipertrofia Iniciante" Exercícios: [Agachamento - 4x12] | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido (Mensagem: nome já existe). | H01-CE03, H01-CE04, H01-CE06, H01-CE08 |
| H01-CT04 | Validar comportamento com nome: "Treino Funcional" Categoria: "" (Vazia) Exercícios: [Corrida - 1x20min] | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "Treino Funcional" Categoria: "" (Vazia) Exercícios: [Corrida - 1x20min] | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido (Categoria obrigatória). | H01-CE01, H01-CE05, H01-CE06, H01-CE08 |
| H01-CT05 | Validar comportamento com nome: "Treino Vazio" Categoria: "Hipertrofia Iniciante" Exercícios: Nenhum | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "Treino Vazio" Categoria: "Hipertrofia Iniciante" Exercícios: Nenhum | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido (Botão salvar desabilitado). | H01-CE01, H01-CE04, H01-CE07, H01-CE08 |
| H01-CT06 | Validar comportamento com nome: "Treino Incompleto" Categoria: "Hipertrofia Iniciante" Exercícios: [Flexão de Braço | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome: "Treino Incompleto" Categoria: "Hipertrofia Iniciante" Exercícios: [Flexão de Braço - Sem séries] | 1. Acessar a funcionalidade relacionada à história H01<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido (Dados obrigatórios faltando). | H01-CE01, H01-CE04, H01-CE06, H01-CE09 |

---

## 2. H02 — Dashboard centralizado de alunos

### 2.1 História de Usuário

> H02 - Enquanto personal, desejo visualizar um dashboard centralizado para acompanhar o progresso de todos os meus alunos (presenciais e online).

### 2.2 Critérios de Aceitação

- **CA01:** O personal deve visualizar na tela inicial uma lista com o nome de todos os alunos cadastrados e seu último status de atividade.
- **CA02:** O sistema deve disponibilizar um filtro funcional para selecionar alunos "Online", "Presenciais" ou "Híbridos".
- **CA03:** Um aluno híbrido deve aparecer no filtro "Híbridos" e não deve aparecer isoladamente nos filtros "Online" ou "Presenciais".
- **CA04:** Ao clicar em um aluno, o sistema deve abrir uma visão detalhada com o gráfico de desempenho das últimas 4 semanas referente à categoria selecionada pelo personal, como: "carga", "repetições", exibindo a modalidade de cada sessão registrada (presencial ou online) quando o aluno for híbrido.

### 2.3 Regras de Negócio

- **RN01:** O dashboard deve permitir a visualização segregada entre alunos de atendimento presencial, alunos de consultoria online e alunos híbridos (que realizam ambos os tipos de sessão com o mesmo personal).
- **RN02:** Um aluno é classificado como híbrido quando possui ao menos uma sessão presencial e uma sessão online registradas no histórico.
- **RN03:** O sistema deve processar os dados de execução (cargas e repetições) para gerar indicadores de evolução em tempo real.
- **RN04:** O acesso aos dados de cada aluno deve respeitar a privacidade configurada no perfil do usuário.

### 2.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H02-CE01 | Tipo de filtro selecionado | Modalidade existente escolhida: "Presenciais", "Online" ou "Híbridos" | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H02-CE02 | Tipo de filtro selecionado | — | Nenhum filtro selecionado ou enviado em branco | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE03 | Tipo de filtro selecionado | — | Filtro inexistente ou corrompido informado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE04 | Exibição do aluno híbrido | Aluno com sessões dos dois tipos aparece exclusivamente no filtro "Híbridos" | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H02-CE05 | Exibição do aluno híbrido | — | Aluno híbrido listado incorretamente no filtro isolado "Presenciais" | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE06 | Exibição do aluno híbrido | — | Aluno híbrido listado incorretamente no filtro isolado "Online" | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE07 | Métrica do gráfico detalhado | Categoria de evolução suportada escolhida: "carga" ou "repetições" | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H02-CE08 | Métrica do gráfico detalhado | — | Métrica deixada em branco ou não selecionada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE09 | Métrica do gráfico detalhado | — | Métrica inválida ou não suportada solicitada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H02-CE10 | Configuração de privacidade | Permissão de visualização de dados ativa no perfil do aluno | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H02-CE11 | Configuração de privacidade | — | Privacidade configurada para ocultar dados do personal | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 2.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H02-CT01 | Validar cenário: sucesso — Fluxo Híbrido | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Híbridos" Aluno: João (1 sessão presencial e 1 online no histórico; Privacidade: Aberta) Métrica: "carga" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Lista apenas alunos híbridos. Ao clicar em João, abre o gráfico das últimas 4 semanas de carga indicando quais sessões foram presenciais e quais foram online. | H02-CE01, H02-CE04, H02-CE07, H02-CE10 |
| H02-CT02 | Validar cenário: falha — Filtro Vazio | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "" (Vazio) Aluno: Aluno Padrão Métrica: "carga" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Filtro inválido (O sistema mantém a listagem geral padrão com todos os alunos ou ignora a requisição). | H02-CE02, H02-CE04, H02-CE07, H02-CE10 |
| H02-CT03 | Validar cenário: falha — Filtro Inexistente | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Inexistente" Aluno: Aluno Padrão Métrica: "carga" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Filtro inválido (O sistema trata o erro e não quebra a interface). | H02-CE03, H02-CE04, H02-CE07, H02-CE10 |
| H02-CT04 | Validar cenário: falha — Híbrido no Presencial | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Presenciais" Aluno: João (Híbrido) Métrica: "carga" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cenário inválido (O aluno João não deve aparecer listado quando este filtro estiver ativo). | H02-CE01, H02-CE05, H02-CE07, H02-CE10 |
| H02-CT05 | Validar cenário: falha — Híbrido no Online | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Online" Aluno: João (Híbrido) Métrica: "carga" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cenário inválido (O aluno João não deve aparecer listado quando este filtro estiver ativo). | H02-CE01, H02-CE06, H02-CE07, H02-CE10 |
| H02-CT06 | Validar cenário: falha — Métrica Trocada | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Híbridos" Aluno: João (Híbrido) Métrica: "" (Vazia) | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Detalhes inválidos (O sistema impede a geração do gráfico e solicita a seleção de uma métrica). | H02-CE01, H02-CE04, H02-CE08, H02-CE10 |
| H02-CT07 | Validar cenário: falha — Métrica Inexistente | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Híbridos" Aluno: João (Híbrido) Métrica: "batimento_cardiaco" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Detalhes inválidos (Sistema exibe mensagem informando que a métrica não é suportada). | H02-CE01, H02-CE04, H02-CE09, H02-CE10 |
| H02-CT08 | Validar cenário: restrição — Privacidade | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Filtro: "Híbridos" Aluno: Carlos (Histórico híbrido; Privacidade: Restrita) Métrica: "repetições" | 1. Acessar a funcionalidade relacionada à história H02<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O aluno aparece na listagem inicial com seu status. Porém, ao clicar nele, o gráfico não é gerado e uma mensagem avisa sobre a restrição de privacidade. | H02-CE01, H02-CE04, H02-CE07, H02-CE11 |

---

## 3. H03 — Relatórios automáticos de evolução

### 3.1 História de Usuário

> H03 - Enquanto personal, desejo gerar relatórios automáticos de evolução para apresentar resultados profissionais aos alunos sem usar planilhas externas.

### 3.2 Critérios de Aceitação

- **CA01:** O sistema deve gerar relatórios com dados de evolução (cargas, frequência e desempenho) com 4 opções de período (semana, mês, três meses e um ano).
- **CA02:** O sistema deve permitir selecionar o aluno para geração do relatório.
- **CA03:** O sistema deve permitir visualizar o relatório dentro do sistema.
- **CA04:** O sistema deve permitir exportar o relatório em formato PDF.
- **CA05:** O sistema deve atualizar automaticamente os dados conforme novos treinos são registrados.

### 3.3 Regras de Negócio

- **RN01:** Apenas personal trainers podem gerar relatórios.
- **RN02:** O relatório deve considerar apenas dados já registrados no sistema.
- **RN03:** O acesso aos relatórios deve ser restrito ao personal e ao aluno relacionado, e o personal possui a opção de mandar o relatório ao aluno via aplicativo.

### 3.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H03-CE01 | Perfil de Usuário | Usuário logado possui o papel de personal trainer | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H03-CE02 | Perfil de Usuário | — | Usuário logado possui o papel de Aluno | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE03 | Perfil de Usuário | — | Usuário não está autenticado no sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE04 | Período do Relatório | Uma dasopções selecionada ("semana", "mês", "três meses" ou "um ano") | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H03-CE05 | Período do Relatório | — | Nenhum período selecionado / enviado em branco | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE06 | Período do Relatório | — | Período customizado ou fora das opções informado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE07 | Seleção do Aluno | Aluno selecionado é cadastrado e vinculado ao Personal | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H03-CE08 | Seleção do Aluno | — | Nenhum aluno foi selecionado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE09 | Seleção do Aluno | — | Aluno selecionado pertence a outro personal trainer | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE10 | Histórico de Dados | Aluno possui dados de treino/evolução já registrados no sistema | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H03-CE11 | Histórico de Dados | — | Aluno cadastrado, mas sem nenhum dado registrado no sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H03-CE12 | Formato de Exportação | Exportação solicitada exclusivamente no formato PDF | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H03-CE13 | Formato de Exportação | — | Exportação solicitada em formato não suportado (ex: .xlsx, .csv) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 3.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H03-CT01 | Validar cenário: sucesso — Fluxo Base | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "mês" Aluno: Rodrigo (Vinculado e com treinos) Ação: Visualizar e exportar PDF | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Relatório gerado com sucesso na tela contendo dados de cargas, frequência e desempenho atualizados. Download do arquivo PDF concluído com sucesso. | H03-CE01, H03-CE04, H03-CE07, H03-CE10, H03-CE12 |
| H03-CT02 | Validar cenário: falha — Perfil Aluno | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: Aluno Período: "mês" Aluno: Próprio aluno Ação: Tentar gerar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Acesso negado. O sistema bloqueia a operação informando que apenas personal trainers podem gerar relatórios. | H03-CE02, H03-CE04, H03-CE07, H03-CE10, H03-CE12 |
| H03-CT03 | Validar cenário: falha — Período Vazio | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "" (Vazio) Aluno: Rodrigo Ação: Visualizar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Relatório inválido. O sistema impede a geração e solicita a seleção de um período válido. | H03-CE01, H03-CE05, H03-CE07, H03-CE10, H03-CE12 |
| H03-CT04 | Validar cenário: falha — Período Inválido | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "2 anos" Aluno: Rodrigo Ação: Visualizar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Relatório inválido. O sistema rejeita o parâmetro e não processa a requisição. | H03-CE01, H03-CE06, H03-CE07, H03-CE10, H03-CE12 |
| H03-CT05 | Validar cenário: falha — Sem Aluno | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "semana" Aluno: "" (Não selecionado) Ação: Visualizar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Relatório inválido. O sistema exige a seleção de um aluno antes de prosseguir. | H03-CE01, H03-CE04, H03-CE08, H03-CE10, H03-CE12 |
| H03-CT06 | Validar cenário: falha — Vínculo Inválido | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "um ano" Aluno: Carlos (De outro Personal) Ação: Visualizar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Erro de restrição de acesso. O sistema bloqueia a visualização de dados de alunos não relacionados. | H03-CE01, H03-CE04, H03-CE09, H03-CE10, H03-CE12 |
| H03-CT07 | Validar cenário: falha — Sem Histórico | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "três meses" Aluno: Marcos (Novo, sem treinos) Ação: Visualizar relatório | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Geração interrompida ou relatório em branco. O sistema exibe mensagem informando que não há dados registrados para este aluno. | H03-CE01, H03-CE04, H03-CE07, H03-CE11, H03-CE12 |
| H03-CT08 | Validar cenário: falha — Formato Errado | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Usuário: personal trainer Período: "mês" Aluno: Rodrigo Ação: Exportar para Planilha (.xlsx) | 1. Acessar a funcionalidade relacionada à história H03<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Exportação rejeitada. O sistema informa que o formato não é suportado e disponibiliza apenas a opção em PDF. | H03-CE01, H03-CE04, H03-CE07, H03-CE10, H03-CE13 |

---

## 4. H05 — Chat direto entre personal e aluno

### 4.1 História de Usuário

> H05 - Como personal, desejo integrar um chat direto no aplicativo com o meu respectivo aluno para centralizar a comunicação e evitar a dispersão de informações em redes sociais.

### 4.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir o envio de mensagens de texto contendo de 1 a 500 caracteres.
- **CA02:** O chat só deve transmitir mensagens se o remetente e o destinatário possuírem um vínculo ativo no sistema (Personal-Aluno).
- **CA03:** O sistema deve exibir uma mensagem de erro caso o texto não atenda às regras de tamanho.

### 4.3 Regras de Negócio

- **RN01:** Mensagens totalmente vazias (0 caracteres) ou que excedam 500 caracteres devem ser rejeitadas pelo sistema.
- **RN02:** Se o plano do aluno estiver cancelado ou o vínculo com o personal inativo no banco de dados, o envio de novas mensagens deve ser bloqueado.

### 4.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H05-CE01 | Comprimento da mensagem | Entre 1 e 500 caracteres | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H05-CE02 | Comprimento da mensagem | — | Mensagem vazia (0 caracteres) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H05-CE03 | Comprimento da mensagem | — | Mais de 500 caracteres | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H05-CE04 | Vínculo entre os usuários | Usuários com vínculo ativo | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H05-CE05 | Vínculo entre os usuários | — | Usuários sem vínculo ativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 4.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H05-CT01 | Validar comportamento com texto: "Sua ficha de treino foi atualizada." | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Texto: "Sua ficha de treino foi atualizada." | 1. Acessar a funcionalidade relacionada à história H05<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Mensagem enviada com sucesso | H05-CE01, H05-CE04 |
| H05-CT02 | Validar comportamento com texto: “Erro” | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Texto: “Erro” | 1. Acessar a funcionalidade relacionada à história H05<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Rejeitar envio e alertar "Mensagem vazia" | H05-CE02, H05-CE04 |
| H05-CT03 | Validar comportamento com texto: "A" repetido 501 vezes | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Texto: "A" repetido 501 vezes | 1. Acessar a funcionalidade relacionada à história H05<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Rejeitar envio e alertar "Limite excedido" | H05-CE03, H05-CE04 |
| H05-CT04 | Validar comportamento com texto: "Olá, e esse treino, cola hoje?" | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Texto: "Olá, e esse treino, cola hoje?" | 1. Acessar a funcionalidade relacionada à história H05<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Rejeitar envio e alertar "Vínculo inexistente" | H05-CE01, H05-CE05 |

---

## 5. H06 — Interface visual de status dos alunos

### 5.1 História de Usuário

> H06 - Enquanto personal, desejo uma interface visual baseada em ícones e cores para identificar rapidamente o status de cada aluno.

### 5.2 Critérios de Aceitação

- **CA01:** O sistema deve exibir dois status possíveis para cada aluno: Ativo e Inativo.
- **CA02:** Cada status deve ser representado por uma cor e um ícone distintos na lista de alunos.
- **CA03:** O personal deve conseguir identificar o status de um aluno sem precisar abrir o perfil detalhado.
- **CA04:** O personal deve conseguir alterar o status de um aluno diretamente pela interface.

### 5.3 Regras de Negócio

- **RN01:** Ativo: aluno com mensalidade em dia e frequência registrada nos últimos 30 dias. Representado pela cor verde e ícone de check.
- **RN02:** Inativo: aluno sem frequência registrada nos últimos 30 dias ou marcado manualmente como inativo pelo personal. Representado pela cor vermelha e ícone de X.
- **RN03:** Ao alterar o status manualmente, o sistema deve registrar a data da alteração.
- **RN04:** O status é calculado automaticamente pelo sistema, mas pode ser sobrescrito manualmente pelo personal.

### 5.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H06-CE01 | Situação financeira e frequência do aluno | Mensalidade em dia e frequência registrada nos últimos 30 dias → Status Ativo | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE02 | Situação financeira e frequência do aluno | — | Mensalidade em atraso | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE03 | Situação financeira e frequência do aluno | — | Frequência superior a0 dias sem registro | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE04 | Identificação visual do status | Status Ativo exibido com cor verde e ícone de check | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE05 | Identificação visual do status | — | Cor diferente da especificada para Ativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE06 | Identificação visual do status | — | Ícone diferente do especificado para Ativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE07 | Identificação visual do status | Status Inativo exibido com cor vermelha e ícone X | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE08 | Identificação visual do status | — | Cor diferente da especificada para Inativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE09 | Identificação visual do status | — | Ícone diferente do especificado para Inativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE10 | Visualização na lista de alunos | Status visível diretamente na lista de alunos | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE11 | Visualização na lista de alunos | — | Necessidade de abrir perfil para visualizar status | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE12 | Visualização na lista de alunos | — | Status não exibido na lista | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE13 | Alteração manual de status | personal altera status e sistema registra data da alteração | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE14 | Alteração manual de status | — | personal altera status e data não é registrada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE15 | Alteração manual de status | — | Alteração não é salva pelo sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE16 | Sobrescrita do status automático | Status automático pode ser alterado manualmente pelo personal | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H06-CE17 | Sobrescrita do status automático | — | Sistema impede alteração manual | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H06-CE18 | Sobrescrita do status automático | — | Sistema ignora a alteração manual realizada pelo personal | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 5.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H06-CT01 | Validar comportamento com mensalidade em dia e frequência registrada nos últimos 30 dias | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mensalidade em dia e frequência registrada nos últimos 30 dias | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Status Ativo exibido na lista com cor verde e ícone de check | H06-CE01, H06-CE04, H06-CE10 |
| H06-CT02 | Validar comportamento com mensalidade em atraso | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mensalidade em atraso | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Status Inativo exibido na lista com cor vermelha e ícone X | H06-CE02, H06-CE07, H06-CE10 |
| H06-CT03 | Validar comportamento com frequência superior a 30 dias sem registro | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Frequência superior a 30 dias sem registro | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Status Inativo exibido na lista com cor vermelha e ícone X | H06-CE03, H06-CE07, H06-CE10 |
| H06-CT04 | Validar cenário funcional do caso 4 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | > Observação: informação não especificada no material original. | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | > Observação: informação não especificada no material original. | H06-CE05, H06-CE06 |
| H06-CT05 | Validar comportamento com aluno inativo apresentado com elementos visuais incorretos | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Aluno inativo apresentado com elementos visuais incorretos | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | > Observação: informação não especificada no material original. | H06-CE08, H06-CE09 |
| H06-CT06 | Validar resultado esperado do caso 6 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | > Observação: informação não especificada no material original. | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Requisito de visualização rápida não é atendido | H06-CE11, H06-CE12 |
| H06-CT07 | Validar comportamento com Personal altera manualmente o status de um aluno | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Personal altera manualmente o status de um aluno | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Status atualizado com sucesso e data da alteração registrada | H06-CE13, H06-CE16 |
| H06-CT08 | Validar comportamento com Personal altera manualmente o status de um aluno | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Personal altera manualmente o status de um aluno | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | > Observação: informação não especificada no material original. | H06-CE14, H06-CE15 |
| H06-CT09 | Validar comportamento com Personal tenta sobrescrever o status automático | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Personal tenta sobrescrever o status automático | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | > Observação: informação não especificada no material original. | H06-CE17, H06-CE18 |
| H06-CT10 | Validar comportamento com personal altera um aluno anteriormente inativo para Ativo | Personal autenticado no sistema e com permissão para executar a funcionalidade. | personal altera um aluno anteriormente inativo para Ativo | 1. Acessar a funcionalidade relacionada à história H06<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Status atualizado corretamente e alteração registrada | H06-CE01, H06-CE04, H06-CE10, H06-CE13, H06-CE16 |

---

## 6. H07 — Fluxo de primeiros passos

### 6.1 História de Usuário

> H07 - Como usuário, quero passar por um fluxo de "primeiros passos" (onboarding) ao acessar o sistema pela primeira vez, para aprender a configurá-lo de forma direcionada.

### 6.2 Critérios de Aceitação

- **CA01:** O sistema deve detectar o primeiro acesso do usuário e iniciar o fluxo automaticamente.
- **CA02:** O fluxo de onboarding deve conter exatamente 3 telas explicativas em sequência.
- **CA03:** O sistema deve fornecer um botão "Pular Tutorial" visível em qualquer uma das etapas.

### 6.3 Regras de Negócio

- **RN01:** O tutorial só pode ser exibido se a flag primeiro_acesso no banco de dados for igual a true. Assim que finalizado ou pulado, o sistema deve atualizar essa flag para false.
- **RN02:** As etapas devem seguir estritamente a ordem (1 - Apresentação, 2 - Configuração Inicial, 3 - Conclusão). O usuário não pode acessar uma tela à frente sem interagir com a atual.

### 6.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H07-CE01 | Identificação do acesso | Flag de primeiro acesso ativa (true) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H07-CE02 | Identificação do acesso | — | Flag de primeiro acesso inativa (false) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H07-CE03 | Sequência de navegação | Seguir a ordem numérica exata (1 → 2 → 3) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H07-CE04 | Sequência de navegação | — | Tentar pular para uma tela fora de ordem | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 6.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H07-CT01 | Validar comportamento com flag: true Navegação: Tela 1 para Tela 2 | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Flag: true Navegação: Tela 1 para Tela 2 | 1. Acessar a funcionalidade relacionada à história H07<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Onboarding iniciado e avanço autorizado | H07-CE01, H07-CE03 |
| H07-CT02 | Validar comportamento com flag: false Navegação: Redirecionar para o onboarding | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Flag: false Navegação: Redirecionar para o onboarding | 1. Acessar a funcionalidade relacionada à história H07<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Bloquear o onboarding e carregar a Home direta | H07-CE02, H07-CE03 |
| H07-CT03 | Validar comportamento com flag: true Navegação: Tentar abrir Tela 3 a partir da Tela 1 | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Flag: true Navegação: Tentar abrir Tela 3 a partir da Tela 1 | 1. Acessar a funcionalidade relacionada à história H07<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Bloquear avanço e reter o usuário na Tela 1 | H07-CE01, H07-CE04 |

---

## 7. H08 — Atalhos de teclado na versão desktop

### 7.1 História de Usuário

> H08 - Enquanto personal, desejo utilizar atalhos de teclado na versão desktop para agilizar a montagem de cronogramas semanais de treino.

### 7.2 Critérios de Aceitação

- **CA01:** O sistema desktop deve aceitar combinações de teclas para as funções principais de salvar e criar treinos.
- **CA02:** O sistema deve ignorar comandos quando o usuário estiver digitando dentro de campos de texto (inputs).

### 7.3 Regras de Negócio

- **RN01:** O comando Ctrl + S deve disparar a ação de salvar. O comando Ctrl + N deve disparar a criação de um novo cronograma.
- **RN02:** Se o elemento ativo do DOM for um campo de entrada de texto, a captura global do teclado deve ser suspensa para evitar que o atalho seja disparado acidentalmente.

### 7.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H08-CE01 | Combinação de teclas pressionada | Pressionar Ctrl + S ou Ctrl + N | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H08-CE02 | Combinação de teclas pressionada | — | Pressionar apenas S ou N (sem Ctrl) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H08-CE03 | Combinação de teclas pressionada | — | Teclas sem comando associado (ex: Ctrl + J) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H08-CE04 | Foco do ponteiro/cursor do sistema | Foco fora de campos de texto editáveis | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H08-CE05 | Foco do ponteiro/cursor do sistema | — | Foco dentro de um input de texto ativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 7.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H08-CT01 | Validar comportamento com teclas: Ctrl + S Foco: Clicado na área cinza do painel | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Teclas: Ctrl + S Foco: Clicado na área cinza do painel | 1. Acessar a funcionalidade relacionada à história H08<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Ação executada: Cronograma salvo com sucesso | H08-CE01, H08-CE04 |
| H08-CT02 | Validar comportamento com teclas: S Foco: Clicado na área cinza do painel | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Teclas: S Foco: Clicado na área cinza do painel | 1. Acessar a funcionalidade relacionada à história H08<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Nenhuma ação é executada | H08-CE02, H08-CE04 |
| H08-CT03 | Validar comportamento com teclas: Ctrl + J Foco: Clicado na área cinza do painel | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Teclas: Ctrl + J Foco: Clicado na área cinza do painel | 1. Acessar a funcionalidade relacionada à história H08<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Nenhuma ação é executada | H08-CE03, H08-CE04 |
| H08-CT04 | Validar comportamento com teclas: Ctrl + S Foco: Cursor piscando no input "Nome do Exercício" | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Teclas: Ctrl + S Foco: Cursor piscando no input "Nome do Exercício" | 1. Acessar a funcionalidade relacionada à história H08<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Atalho ignorado; caractere ou comando inserido apenas no input | H08-CE01, H08-CE05 |

---

## 8. H09 — Alertas de faltas do aluno

### 8.1 História de Usuário

> H09 - Enquanto personal, desejo receber alertas no painel quando um aluno faltar a muitos treinos seguidos, para intervir antes de uma possível evasão.

### 8.2 Critérios de Aceitação

- **CA01:** O sistema deve exibir um aviso em destaque no painel do personal indicando quais alunos atingiram o limite de ausência.

### 8.3 Regras de Negócio

- **RN01:** O sistema deve disparar o alerta de forma automatizada assim que o número de dias seguidos sem check-in em treinos for estritamente maior que 14 dias (duas semanas).

### 8.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H09-CE01 | Quantidade de dias consecutivos sem check-in | Número inteiro maior que 14 (Ex: 15) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H09-CE02 | Quantidade de dias consecutivos sem check-in | — | Número de dias entre 0 e 14 | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H09-CE03 | Quantidade de dias consecutivos sem check-in | — | Número negativo de dias | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 8.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H09-CT01 | Validar comportamento com dias consecutivos: 15 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Dias consecutivos: 15 | 1. Acessar a funcionalidade relacionada à história H09<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Alerta gerado: Aluno listado em "Risco de Evasão" | H09-CE01 |
| H09-CT02 | Validar comportamento com dias consecutivos: 10 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Dias consecutivos: 10 | 1. Acessar a funcionalidade relacionada à história H09<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Nenhum alerta é emitido para este aluno | H09-CE02 |
| H09-CT03 | Validar comportamento com dias consecutivos: -5 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Dias consecutivos: -5 | 1. Acessar a funcionalidade relacionada à história H09<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema ignora a entrada e registra um erro de log | H09-CE03 |

---

## 9. H10 — Vídeos explicativos dos exercícios

### 9.1 História de Usuário

> H10 - Enquanto aluna, desejo acessar vídeos curtos explicativos de cada exercício para garantir a execução correta sem depender do personal.

### 9.2 Critérios de Aceitação

- **CA01:** Cada exercício na lista de treino deve exibir um ícone de vídeo ou miniatura clicável.
- **CA02:** Os vídeos devem ter curta duração (15 a 30 segundos), priorizando o carregamento rápido e foco na técnica.
- **CA03:** O vídeo deve ser reproduzido em loop automaticamente enquanto a tela de detalhes do exercício estiver aberta.

### 9.3 Regras de Negócio

- **RN01:** Uma vez que o aluno inicie o "Modo Treino", o aplicativo deve realizar o pré-carregamento dos vídeos dos exercícios daquele dia. Se o vídeo já foi assistido anteriormente, o sistema deve priorizar a execução do arquivo armazenado em cache no dispositivo em vez de realizar um novo download.
- **RN02:** O sistema não deve permitir que um personal trainer publique um treino para o aluno se o exercício selecionado não possuir um vídeo correspondente ou uma imagem técnica alternativa, garantindo que a proposta de "autonomia sem o personal" seja cumprida.
- **RN03:** O servidor de streaming deve identificar o tipo de conexão do usuário. Se detectada conexão móvel, a resolução do vídeo deve ser ajustada automaticamente para o patamar mínimo aceitável para garantir a fluidez sem travar a execução do treino.

### 9.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H10-CE01 | Mídia do Exercício (Publicação) | Exercício possui vídeo de curta duração 5 a 30s) ou imagem técnica | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H10-CE02 | Mídia do Exercício (Publicação) | — | Exercício sem nenhuma mídia associada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H10-CE03 | Mídia do Exercício (Publicação) | — | Exercício com vídeo fora do tempo padrão (ex: mais de0s) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H10-CE04 | Estado do Cache (Modo Treino) | Arquivo de vídeo já assistido antes e armazenado localmente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H10-CE05 | Estado do Cache (Modo Treino) | — | Vídeo inédito (não está gravado no cache do dispositivo) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H10-CE06 | Tipo de Conexão à Internet | Tipo de rede identificado com sucesso (Móvel ou Wi-Fi) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H10-CE07 | Tipo de Conexão à Internet | — | Falha do sistema ao identificar o tipo de conexão ativa | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H10-CE08 | Controle de Loop da Interface | Vídeo reinicia automaticamente enquanto a tela de detalhes está aberta | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H10-CE09 | Controle de Loop da Interface | — | Vídeo para de tocar sozinho após a primeira execução | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 9.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H10-CT01 | Validar comportamento com mídia: Vídeo de 20s cadastrado Cache: Vídeo já assistido Conexão: Rede Móvel detectada Int | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Vídeo de 20s cadastrado Cache: Vídeo já assistido Conexão: Rede Móvel detectada Interface: Tela de detalhes aberta | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Vídeo é carregado instantaneamente do cache local (sem novo download) e reproduzido em loop automático na resolução mínima aceitável. | H10-CE01, H10-CE04, H10-CE06, H10-CE08 |
| H10-CT02 | Validar comportamento com mídia: Exercício sem vídeo ou imagem Cache: N/A Conexão: Wi-Fi | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Exercício sem vídeo ou imagem Cache: N/A Conexão: Wi-Fi | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido. O sistema impede o personal trainer de publicar o treino e bloqueia a ação. | H10-CE02, H10-CE04, H10-CE06, H10-CE08 |
| H10-CT03 | Validar comportamento com mídia: Vídeo longo (60 segundos) Cache: N/A Conexão: Wi-Fi | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Vídeo longo (60 segundos) Cache: N/A Conexão: Wi-Fi | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Treino inválido. O sistema recusa o upload do vídeo por violar a regra de tempo (máximo de 30s). | H10-CE03, H10-CE04, H10-CE06, H10-CE08 |
| H10-CT04 | Validar comportamento com mídia: Vídeo de 15s cadastrado Cache: Vídeo inédito (sem cache) Conexão: Wi-Fi | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Vídeo de 15s cadastrado Cache: Vídeo inédito (sem cache) Conexão: Wi-Fi | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema faz o pré-carregamento por download no início do "Modo Treino" e exibe o vídeo normalmente. | H10-CE01, H10-CE05, H10-CE06, H10-CE08 |
| H10-CT05 | Validar comportamento com mídia: Vídeo de 25s cadastrado Cache: Vídeo já assistido Conexão: Indefinida (Erro de dete | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Vídeo de 25s cadastrado Cache: Vídeo já assistido Conexão: Indefinida (Erro de detecção) | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Streaming inválido. Na falta de identificação da rede, o sistema adota a resolução mínima por segurança. | H10-CE01, H10-CE04, H10-CE07, H10-CE08 |
| H10-CT06 | Validar comportamento com mídia: Vídeo de 20s cadastrado Cache: Vídeo já assistido Conexão: Wi-Fi Interface: Tela ab | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mídia: Vídeo de 20s cadastrado Cache: Vídeo já assistido Conexão: Wi-Fi Interface: Tela aberta | 1. Acessar a funcionalidade relacionada à história H10<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Interface inválida. O vídeo encerra após 20 segundos e não reinicia (o teste falha ao quebrar a regra do loop). | H10-CE01, H10-CE04, H10-CE06, H10-CE09 |

---

## 10. H11 — Registro de cargas e repetições

### 10.1 História de Usuário

> H11 - Enquanto aluna, desejo registrar cargas e repetições realizadas para que meu personal ajuste o treino com base no meu desempenho real.

### 10.2 Critérios de Aceitação

- **CA01:** A interface de treino deve exibir um campo de entrada numérica para "Peso (kg)" e outro para "Repetições" logo abaixo do nome do exercício.
- **CA02:** O sistema deve exibir a carga utilizada na última sessão daquele mesmo exercício como referência para a aluna.
- **CA03:** O sistema deve haver um botão "Concluir Série", visível enquanto houver séries restantes do exercício atual. Ao ser clicado, salva os dados da série e limpa os campos para a aluna inserir os dados da próxima série do mesmo exercício.
- **CA04:** Quando a última série planejada do exercício for confirmada, o botão deve mudar para "Próximo Exercício", indicando que o sistema avançará para o exercício seguinte da ficha.
- **CA05:** O sistema deve exibir um contador visível do tipo "Série 2 de 4" para que a aluna saiba em que ponto da sequência está.

### 10.3 Regras de Negócio

- **RN01:** O registro deve ser obrigatório para a conclusão de cada exercício do treino do dia.
- **RN02:** O sistema deve permitir que o usuário altere a carga sugerida pelo personal caso a execução real seja diferente da planejada.
- **RN03:** Cada entrada de dado deve ser salva com um registro de data e hora (timestamp).

### 10.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H11-CE01 | Campo "Peso (kg)" | Número real maior do que zero | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H11-CE02 | Campo "Peso (kg)" | — | Campo deixado em branco / vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H11-CE03 | Campo "Peso (kg)" | — | Valor negativo ou caracteres de texto | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H11-CE04 | Campo "Repetições" | Número inteiro maior do que zero | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H11-CE05 | Campo "Repetições" | — | Campo deixado em branco / vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H11-CE06 | Campo "Repetições" | — | Valor decimal, negativo ou texto | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H11-CE07 | Contador de Séries | Série atual menor ou igual ao total planejado (ex: Série 2 de 4) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H11-CE08 | Contador de Séries | — | Série atual tenta registrar acima do total planejado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H11-CE09 | Obrigatoriedade de Registro | Todas as séries planejadas preenchidas e salvas antes de avançar | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H11-CE10 | Obrigatoriedade de Registro | — | Tentativa de avançar de exercício pulando séries obrigatórias | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 10.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H11-CT01 | Validar cenário: sucesso — Série Inicial | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: 14 Repetições: 10 Contador: Série 1 de 3 Ação: Clicar em "Concluir Série" | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Dados salvos com data e hora (timestamp). Os campos são limpos para a próxima entrada e o contador muda para "Série 2 de 3". O botão continua "Concluir Série". | H11-CE01, H11-CE04, H11-CE07, H11-CE09 |
| H11-CT02 | Validar cenário: falha — Peso Vazio | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: "" (Vazio) Repetições: 12 Contador: Série 1 de 3 | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Registro rejeitado. O sistema impede o salvamento por falta de preenchimento do peso. | H11-CE02, H11-CE04, H11-CE07, H11-CE09 |
| H11-CT03 | Validar cenário: falha — Peso Inválido | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: "-10" ou "dez" Repetições: 12 Contador: Série 1 de 3 | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Registro rejeitado. O sistema impede o salvamento por formato de dado inválido. | H11-CE03, H11-CE04, H11-CE07, H11-CE09 |
| H11-CT04 | Validar cenário: falha — Repetições Vazias | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: 20 Repetições: "" (Vazio) Contador: Série 2 de 4 | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Registro rejeitado. O sistema exige que o número de repetições seja informado. | H11-CE01, H11-CE05, H11-CE07, H11-CE09 |
| H11-CT05 | Validar cenário: falha — Repetições Inválidas | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: 20 Repetições: "10.5" ou "muitas" Contador: Série 2 de 4 | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Registro rejeitado. O campo aceita apenas números inteiros estritamente positivos. | H11-CE01, H11-CE06, H11-CE07, H11-CE09 |
| H11-CT06 | Validar cenário: sucesso — Mudança de Botão | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: 16 Repetições: 8 Contador: Série 3 de 3 (Última) Ação: Confirmar última série | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Dados salvos com sucesso (timestamp). Como a última série planejada foi atingida, o texto do botão muda automaticamente para "Próximo Exercício". | H11-CE01, H11-CE04, H11-CE07, H11-CE09 |
| H11-CT07 | Validar cenário: falha — Forçar Próximo | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Peso: 12 Repetições: 10 Contador: Série 1 de 3 Ação: Tentar pular exercício | 1. Acessar a funcionalidade relacionada à história H11<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema bloqueia a ação. O botão "Próximo Exercício" não fica disponível enquanto houver séries obrigatórias restantes na sequência. | H11-CE01, H11-CE04, H11-CE07, H11-CE10 |

---

## 11. H12 — Lembretes de treino para o personal

### 11.1 História de Usuário

> H12 - Como personal, quero receber notificações de lembrete de treino dos alunos do dia, para organizar meus horários de acompanhamento na academia.

### 11.2 Critérios de Aceitação

- **CA01:** O sistema deve enviar um lembrete contendo o resumo da agenda de alunos do dia corrente.
- **CA02:** O lembrete deve ser gerado e enviado em um horário fixo programado de forma antecipada.

### 11.3 Regras de Negócio

- **RN01:** A rotina de notificações deve ser disparada de maneira diária, exatamente às 06:00 (fuso local), varrendo a base em busca de agendamentos para a data.

### 11.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H12-CE01 | Horário do sistema para disparo | Horário idêntico a 06:00 | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H12-CE02 | Horário do sistema para disparo | — | Horários antes de 06:00 (ex: 05:59) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H12-CE03 | Horário do sistema para disparo | — | Horários depois de 06:00 (ex: 06:01) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 11.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H12-CT01 | Validar comportamento com hora do servidor: 06:00 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Hora do servidor: 06:00 | 1. Acessar a funcionalidade relacionada à história H12<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Rotina executa e envia as notificações de agenda do dia | H12-CE01 |
| H12-CT02 | Validar comportamento com hora do servidor: 05:59 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Hora do servidor: 05:59 | 1. Acessar a funcionalidade relacionada à história H12<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Nenhuma notificação de lembrete é disparada | H12-CE02 |
| H12-CT03 | Validar comportamento com hora do servidor: 06:01 | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Hora do servidor: 06:01 | 1. Acessar a funcionalidade relacionada à história H12<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Nenhuma ação é tomada (já foi enviada ou aguarda próximo dia) | H12-CE03 |

---

## 12. H13 — Gráficos de evolução física

### 12.1 História de Usuário

> H13 - Enquanto aluna, desejo visualizar gráficos de evolução física para me manter motivada ao ver meus resultados ao longo do tempo.

### 12.2 Critérios de Aceitação

- **CA01:** Dado que existam registros históricos de peso corporal, quando a aluna acessar a área de evolução física, então o sistema deverá exibir um gráfico de evolução do peso ao longo do tempo.
- **CA02:** Dado que existam registros históricos de percentual de gordura corporal, quando a aluna acessar a área de evolução física, então o sistema deverá exibir um gráfico correspondente.
- **CA03:** Dado que existam medidas corporais registradas, quando a aluna selecionar uma medida específica, então o sistema deverá exibir sua evolução histórica.
- **CA04:** Dado que não existam dados suficientes para uma métrica, quando a aluna tentar visualizar o gráfico correspondente, então o sistema deverá informar a indisponibilidade de dados.

### 12.3 Regras de Negócio

- **RN01:** O sistema deverá apresentar gráficos de evolução física com base nos registros realizados pela aluna.
- **RN02:** Os gráficos poderão utilizar as seguintes métricas cadastradas no sistema: Peso corporal; Percentual de gordura corporal; Medidas corporais registradas (ex.: cintura, braço, quadril e similares).
- **RN03:** Cada métrica deverá possuir histórico próprio para acompanhamento ao longo do tempo.
- **RN04:** Os dados exibidos deverão considerar apenas informações registradas pela própria aluna ou por profissional autorizado no sistema.

### 12.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H13-CE01 | Métrica Selecionada | Tipo de métrica suportada ("Peso corporal", "Percentual de gordura" ou "Medidas corporais") | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H13-CE02 | Métrica Selecionada | — | Nenhuma métrica selecionada / campo em branco | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H13-CE03 | Métrica Selecionada | — | Métrica não suportada ou inválida informada (ex.: "Altura") | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H13-CE04 | Quantidade de Dados | Histórico com dados suficientes registrados para a métrica escolhida | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H13-CE05 | Quantidade de Dados | — | Dados insuficientes ou nenhum registro histórico na métrica | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H13-CE06 | Origem do Registro | Dados cadastrados pela própria aluna ou por profissional autorizado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H13-CE07 | Origem do Registro | — | Dados inseridos por usuários não autorizados no sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 12.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H13-CT01 | Validar cenário: sucesso — Peso | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Peso corporal" Histórico: 3 registros válidos Origem: Registrado pela aluna | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Exibe com sucesso o gráfico de evolução do peso corporal ao longo do tempo. | H13-CE01, H13-CE04, H13-CE06 |
| H13-CT02 | Validar cenário: sucesso — Gordura | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Percentual de gordura" Histórico: 2 registros válidos Origem: Registrado pelo personal autorizado | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Exibe com sucesso o gráfico de evolução do percentual de gordura ao longo do tempo. | H13-CE01, H13-CE04, H13-CE06 |
| H13-CT03 | Validar cenário: sucesso — Medida | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Medidas corporais" (Cintura) Histórico: 4 registros válidos Origem: Registrado pela aluna | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Exibe com sucesso o gráfico de evolução histórica específico da medida da cintura. | H13-CE01, H13-CE04, H13-CE06 |
| H13-CT04 | Validar cenário: falha — Métrica Vazia | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "" (Vazio) Histórico: Registros existentes Origem: Registrado pela aluna | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Gráfico inválido. O sistema impede a renderização e solicita a seleção de uma métrica. | H13-CE02, H13-CE04, H13-CE06 |
| H13-CT05 | Validar cenário: falha — Não Suportada | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Frequência Cardíaca" Histórico: Registros existentes Origem: Registrado pela aluna | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Gráfico inválido. O sistema rejeita a consulta informando que a métrica não é suportada para a evolução física. | H13-CE03, H13-CE04, H13-CE06 |
| H13-CT06 | Validar cenário: aviso — Sem Dados | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Percentual de gordura" Histórico: 0 registros cadastrados Origem: N/A | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Operação interrompida. O sistema exibe uma mensagem clara informando a indisponibilidade de dados para a métrica. | H13-CE01, H13-CE05, H13-CE06 |
| H13-CT07 | Validar cenário: falha — Sem Autorização | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Métrica: "Peso corporal" Histórico: 2 registros na base Origem: Usuário não autorizado | 1. Acessar a funcionalidade relacionada à história H13<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Os dados de origem não autorizada são desconsiderados e omitidos pelo sistema, não alimentando o gráfico da aluna. | H13-CE01, H13-CE04, H13-CE07 |

---

## 13. H16 — Suporte a leitores de tela

### 13.1 História de Usuário

> H16 - Enquanto usuário com baixa visão, desejo suporte total a leitores de tela para navegar nos menus de treino com autonomia.

### 13.2 Critérios de Aceitação

- **CA01:** O sistema deve ser compatível com leitores de tela do sistema.
- **CA02:** O sistema deve descrever corretamente botões e ações.
- **CA03:** O sistema deve permitir navegação completa sem uso visual. Deve fornecer feedback sonoro das ações.

### 13.3 Regras de Negócio

- **RN01:** A funcionalidade depende da ativação do leitor de tela no dispositivo.

### 13.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H16-CE01 | Estado do Leitor de Tela | Ativado nas configurações globais do dispositivo | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H16-CE02 | Estado do Leitor de Tela | — | Desativado no sistema operacional do dispositivo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H16-CE03 | Rótulos dos Elementos (Labels) | Todos os botões e ações possuem descrição textual correta | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H16-CE04 | Rótulos dos Elementos (Labels) | — | Botão ou ação sem descrição (leitor anuncia apenas "botão") | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H16-CE05 | Rótulos dos Elementos (Labels) | — | Descrição incorreta ou incoerente com a ação do elemento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H16-CE06 | Ordem de Foco (Navegação) | Sequência lógica que permite alcançar 100% dos menus sem visão | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H16-CE07 | Ordem de Foco (Navegação) | — | Elemento importante ignorado pelo foco ou travado em loop | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H16-CE08 | Feedback de Confirmação | Retorno sonoro/vocal imediato após qualquer ação concluída | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H16-CE09 | Feedback de Confirmação | — | Ação executada sem nenhum aviso audível (apenas visual) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 13.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H16-CT01 | Validar cenário: sucesso — Fluxo Base | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Ativado Interface: Menu de treinos com rótulos OK Ação: Navegar sequencialmente e acionar botões | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O usuário navega por todos os menus por meio de gestos/teclado, ouve as descrições corretas e recebe feedback sonoro a cada ação. | H16-CE01, H16-CE03, H16-CE06, H16-CE08 |
| H16-CT02 | Validar cenário: restrição — Leitor Inativo | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Desativado Interface: Menu de treinos | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O aplicativo funciona normalmente por navegação puramente visual, sem disparar recursos de acessibilidade por voz. | H16-CE02, H16-CE03, H16-CE06, H16-CE08 |
| H16-CT03 | Validar cenário: falha — Sem Rótulo | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Ativado Interface: Botão "Iniciar Treino" sem propriedade de acessibilidade | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Interface inválida. O leitor anuncia apenas "botão" ou "elemento gráfico", impossibilitando a autonomia do usuário. | H16-CE01, H16-CE04, H16-CE06, H16-CE08 |
| H16-CT04 | Validar cenário: falha — Rótulo Errado | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Ativado Interface: Botão "Avançar Exercício" rotulado como "Excluir" | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Interface inválida. O sistema induz o usuário ao erro por fornecer uma descrição incorreta da ação. | H16-CE01, H16-CE05, H16-CE06, H16-CE08 |
| H16-CT05 | Validar cenário: falha — Foco Incompleto | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Ativado Interface: O foco ignora o botão de "Ver Gráfico de Evolução" | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Navegação inválida. O usuário não consegue acessar a funcionalidade porque o leitor de tela pula o elemento na ordem de leitura. | H16-CE01, H16-CE03, H16-CE07, H16-CE08 |
| H16-CT06 | Validar cenário: falha — Sem Som | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Leitor de tela: Ativado Interface: Clique em "Concluir Série" Feedback: Apenas visual na tela | 1. Acessar a funcionalidade relacionada à história H16<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Feedback inválido. A série é salva no sistema, mas a falta de aviso sonoro deixa o usuário sem saber se a operação funcionou. | H16-CE01, H16-CE03, H16-CE06, H16-CE09 |

---

## 14. H17 — Alto contraste e fontes escaláveis

### 14.1 História de Usuário

> H17 - Enquanto usuário com baixa visão, desejo configurações de alto contraste e fontes escaláveis para facilitar a leitura das instruções de treino.

### 14.2 Critérios de Aceitação

- **CA01:** O usuário deve encontrar no menu de configurações uma opção de "Acessibilidade" com um seletor para ativar o "Modo de Alto Contraste".
- **CA02:** Ao ativar o modo, a interface deve mudar instantaneamente para fundo preto (#000000) com textos em amarelo (#FFD600) — cor fixa definida pelo time, sem opção de escolha pelo usuário nesta versão.
- **CA03:** O sistema deve permitir aumentar o tamanho da fonte das instruções de treino em até 200% através de um seletor deslizante (slider).

### 14.3 Regras de Negócio

- **RN01:** O modo de alto contraste deve priorizar combinações de cores que facilitem a leitura para quem possui sensibilidade visual reduzida.
- **RN02:** O redimensionamento de fontes deve ser aplicado a todos os textos instrucionais e nomes de exercícios. Caso o texto não couber no espaço disponível após o redimensionamento, o sistema deve aplicar quebra de linha (wrap); não deve haver corte de texto (ellipsis) nem rolagem horizontal nos textos instrucionais.
- **RN03:** A configuração escolhida deve ser persistente, permanecendo ativa sempre que o usuário fizer login no aplicativo.

### 14.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H17-CE01 | Cores do Alto Contraste | Interface muda para fundo preto (#000000) e textos em amarelo (#FFD600) | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H17-CE02 | Cores do Alto Contraste | — | Ativação não altera as cores originais da tela | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE03 | Cores do Alto Contraste | — | Interface aplica cores incorretas ou diferentes do padrão fixado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE04 | Tamanho da Fonte (Slider) | Ajuste de escala selecionado entre 100% e 200% | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H17-CE05 | Tamanho da Fonte (Slider) | — | Valor de escala abaixo do mínimo de 100% | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE06 | Tamanho da Fonte (Slider) | — | Valor de escala acima do teto de 200% | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE07 | Comportamento do Texto Expandido | Texto sofre quebra de linha automática (wrap) para caber na tela | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H17-CE08 | Comportamento do Texto Expandido | — | Texto longo é cortado com reticências (ellipsis) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE09 | Comportamento do Texto Expandido | — | Interface gera barra de rolagem horizontal para exibir o texto | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H17-CE10 | Persistência das Configurações | Preferências de acessibilidade continuam ativas após um novo login | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H17-CE11 | Persistência das Configurações | — | Configurações são resetadas para o padrão de fábrica após o logout | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 14.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H17-CT01 | Validar cenário: sucesso — Fluxo Base | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 150% Instrução: Texto longo de treino Ação: Fazer logout e login | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | A interface muda instantaneamente para preto e amarelo. O texto é ampliado, sofre quebra de linha sem barras horizontais e as configurações são mantidas após o novo login. | H17-CE01, H17-CE04, H17-CE07, H17-CE10 |
| H17-CT02 | Validar cenário: falha — Cores Erradas | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 100% | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cenário inválido. O sistema aplica cores fora do padrão definido pelo time (ex: fundo cinza), falhando no critério de aceitação. | H17-CE03, H17-CE04, H17-CE07, H17-CE10 |
| H17-CT03 | Validar cenário: falha — Escala Mínima | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 50% (Forçado) | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cenário inválido. O sistema recusa o valor abaixo do limite e mantém a fonte no patamar mínimo de 100%. | H17-CE01, H17-CE05, H17-CE07, H17-CE10 |
| H17-CT04 | Validar cenário: falha — Escala Máxima | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 250% (Forçado) | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cenário inválido. O sistema barra o excesso e limita o tamanho final estritamente em 200%. | H17-CE01, H17-CE06, H17-CE07, H17-CE10 |
| H17-CT05 | Validar cenário: falha — Texto Cortado | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 200% Instrução: "Realizar três séries..." | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Comportamento inválido. O nome do exercício ou instrução é cortado por falta de espaço (ex: "Realizar três sé..."), violando a regra de negócio. | H17-CE01, H17-CE04, H17-CE08, H17-CE10 |
| H17-CT06 | Validar cenário: falha — Rolagem Horizontal | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 200% Instrução: Texto longo de treino | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Comportamento inválido. O texto expandido força a criação de uma barra de rolagem lateral para ser lido por inteiro. | H17-CE01, H17-CE04, H17-CE09, H17-CE10 |
| H17-CT07 | Validar cenário: falha — Sem Persistência | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Alto Contraste: Ativado Escala da Fonte: 180% Ação: Deslogar e logar de novo | 1. Acessar a funcionalidade relacionada à história H17<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Estado inválido. O aplicativo retorna com o tema claro e fonte 100%, esquecendo as escolhas do usuário com baixa visão. | H17-CE01, H17-CE04, H17-CE07, H17-CE11 |

---

## 15. H18 — Comandos de voz para cronômetro de descanso

### 15.1 História de Usuário

> H18 - Enquanto usuário com baixa visão, desejo comandos de voz para iniciar e pausar o cronômetro de descanso para manter o foco no exercício físico.

### 15.2 Critérios de Aceitação

- **CA01:** Na tela de descanso, o sistema deve reconhecer o comando de voz "Iniciar descanso" e começar a contagem regressiva automaticamente.
- **CA02:** O usuário deve conseguir pausar a contagem dizendo "Pausar cronômetro".
- **CA03:** O usuário deve conseguir retomar a contagem a partir do ponto em que foi pausada dizendo "Retomar cronômetro".
- **CA04:** Caso o comando de voz não seja reconhecido, o aplicativo deve responder com o áudio "Não entendi, repita o comando" e oferecer um botão visual de fallback para pausar/retomar/iniciar manualmente.
- **CA05:** Ao chegar a zero, o aplicativo deve anunciar por voz: "Fim do descanso. Próxima série disponível".

### 15.3 Regras de Negócio

- **RN01:** O sistema de reconhecimento de voz deve ser implementado de forma nativa no aplicativo, utilizando as bibliotecas de Speech-to-Text disponíveis para React Native, garantindo funcionamento equivalente em iOS e Android, sem depender de assistentes virtuais de terceiros (Google Assistant, Siri ou similares).
- **RN02:** O intervalo de descanso deve ser configurado previamente pelo personal trainer no momento da criação do treino.
- **RN03:** O aplicativo deve emitir um feedback sonoro obrigatório ao final da contagem para que o usuário não precise olhar para a tela.
- **RN04:** Caso o sistema não reconheça o comando de voz após 2 tentativas consecutivas (ruído ambiente, fala incompreensível, etc.), deve emitir o feedback sonoro "Não entendi, repita o comando" e exibir um botão de fallback na tela para controle manual do cronômetro.

### 15.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H18-CE01 | Comando de Voz Falado | Comando exato e reconhecido ("Iniciar descanso", "Pausar cronômetro" ou "Retomar cronômetro") | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H18-CE02 | Comando de Voz Falado | — | Comando não reconhecido ou ruído na primeira tentativa | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H18-CE03 | Comando de Voz Falado | — | Comando não reconhecido por duas vezes consecutivas | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H18-CE04 | Intervalo de Descanso | Tempo de intervalo previamente configurado pelo personal trainer | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H18-CE05 | Intervalo de Descanso | — | Treino carregado sem tempo de descanso configurado (nulo/zerado) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H18-CE06 | Término da Contagem | Cronômetro atinge o tempo zero | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H18-CE07 | Término da Contagem | — | Cronômetro trava ou encerra antes de chegar a zero | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 15.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H18-CT01 | Validar cenário: sucesso — Iniciar | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Parado Intervalo: 45 segundos Comando: "Iniciar descanso" | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O cronômetro nativo inicia a contagem regressiva de 45 segundos automaticamente. | H18-CE01, H18-CE04, H18-CE06 |
| H18-CT02 | Validar cenário: sucesso — Pausar | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Rodando (30s restantes) Comando: "Pausar cronômetro" | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | A contagem regressiva é interrompida exatamente no segundo 30. | H18-CE01, H18-CE04, H18-CE06 |
| H18-CT03 | Validar cenário: sucesso — Retomar | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Pausado (30s restantes) Comando: "Retomar cronômetro" | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | A contagem regressiva recomeça exatamente a partir dos 30 segundos em que havia parado. | H18-CE01, H18-CE04, H18-CE06 |
| H18-CT04 | Validar cenário: falha — 1ª Incompreensão | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Parado Comando: "Começar timer" (Não reconhecido - 1ª vez) | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema ignora o comando inválido e permanece aguardando uma instrução correta, sem disparar o fallback. | H18-CE02, H18-CE04, H18-CE06 |
| H18-CT05 | Validar cenário: falha — 2ª Incompreensão | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Parado Comando: "Começar timer" (1ª falha) + Ruído de peso caindo (2ª falha) | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O aplicativo emite o áudio obrigatório: "Não entendi, repita o comando" e exibe o botão visual de fallback na tela para controle manual. | H18-CE03, H18-CE04, H18-CE06 |
| H18-CT06 | Validar cenário: sucesso — Fim do Tempo | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Rodando (1 segundo restante) | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Assim que o cronômetro chega a zero, o sistema emite o feedback sonoro automático: "Fim do descanso. Próxima série disponível". | H18-CE01, H18-CE04, H18-CE06 |
| H18-CT07 | Validar cenário: falha — Sem Configuração | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Estado: Tela de descanso aberta Intervalo: Não definido pelo Personal Comando: "Iniciar descanso" | 1. Acessar a funcionalidade relacionada à história H18<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Ação rejeitada. O cronômetro não inicia e o sistema emite um alerta informando que não há tempo de descanso configurado para este exercício. | H18-CE01, H18-CE05, H18-CE06 |

---

## 16. H20 — Feedback vibratório ao concluir série

### 16.1 História de Usuário

> H20 - Enquanto usuário com baixa visão, desejo receber feedback vibratório ao completar uma série para saber que concluí a tarefa sem precisar olhar a tela.

### 16.2 Critérios de Aceitação

- **CA01:** Ao clicar no botão "Concluir Série", o dispositivo móvel do usuário deve emitir uma resposta vibratória imediata.
- **CA02:** O padrão de vibração deve ser claramente distinguível de notificações comuns do sistema (ex.: uma vibração dupla e firme).
- **CA03:** O menu de configurações de acessibilidade do aplicativo deve conter um seletor (toggle) para ativar ou desativar o feedback vibratório.

### 16.3 Regras de Negócio

- **RN01:** A execução da funcionalidade depende do suporte de hardware do dispositivo móvel; caso o aparelho não possua motor de vibração (haptic feedback), o sistema deve ignorar a chamada sem interromper ou travar o fluxo do aplicativo.
- **RN02:** O feedback vibratório deve ocorrer de forma síncrona com o feedback sonoro e com o salvamento do timestamp da série concluída.

### 16.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H20-CE01 | Hardware do Dispositivo | Aparelho possui motor de vibração funcional | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H20-CE02 | Hardware do Dispositivo | — | Aparelho não possui motor de vibração (ausência de hardware) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H20-CE03 | Configuração de Acessibilidade | Função de vibração ativada nas configurações do aplicativo | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H20-CE04 | Configuração de Acessibilidade | — | Função de vibração desativada nas configurações do aplicativo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H20-CE05 | Ação de Conclusão | Clique efetuado no botão "Concluir Série" | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H20-CE06 | Ação de Conclusão | — | Clique fora do botão ou nenhuma ação realizada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 16.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H20-CT01 | Validar cenário: sucesso | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Hardware: Com motor Configuração: Ativado Ação: Clique em "Concluir Série" | 1. Acessar a funcionalidade relacionada à história H20<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Dispositivo emite uma vibração dupla e firme imediatamente; os dados da série são salvos. | H20-CE01, H20-CE03, H20-CE05 |
| H20-CT02 | Validar cenário: inativo | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Hardware: Com motor Configuração: Desativado Ação: Clique em "Concluir Série" | 1. Acessar a funcionalidade relacionada à história H20<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Os dados da série são salvos normalmente, mas nenhuma vibração é emitida pelo dispositivo. | H20-CE01, H20-CE04, H20-CE05 |
| H20-CT03 | Validar cenário: sem Hardware | Usuário com baixa visão autenticado e recurso de acessibilidade disponível. | Hardware: Sem motor Configuração: Ativado Ação: Clique em "Concluir Série" | 1. Acessar a funcionalidade relacionada à história H20<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema ignora a chamada de vibração por falta de suporte físico e salva a série sem travar o aplicativo. | H20-CE02, H20-CE03, H20-CE05 |

---

## 17. H21 — Cadastro de novo aluno

### 17.1 História de Usuário

> H21 - Como personal, quero cadastrar um novo aluno informando nome, contato e objetivo, para iniciar o acompanhamento personalizado.

### 17.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir o cadastro de um novo aluno.
- **CA02:** O sistema deve exigir o preenchimento dos campos nome, contato e objetivo.
- **CA03:** O sistema não deve permitir o cadastro caso algum campo obrigatório esteja vazio.
- **CA04:** O sistema deve validar se o contato informado está em formato aceitável.
- **CA05:** Após o cadastro, o aluno deve ficar disponível na lista de alunos.
- **CA06:** O sistema deve exibir uma mensagem de confirmação ao concluir o cadastro.

### 17.3 Regras de Negócio

- **RN01:** O nome do aluno é obrigatório.
- **RN02:** O contato do aluno é obrigatório.
- **RN03:** O objetivo do aluno é obrigatório.
- **RN04:** O contato deve possuir um formato válido, como telefone ou e-mail.
- **RN05:** Não deve ser permitido cadastrar aluno com contato já existente.
- **RN06:** Ao cadastrar um novo aluno, o sistema deve registrar a data do cadastro.
- **RN07:** Ao ser cadastrado, o aluno deve iniciar com status Ativo.

### 17.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H21-CE01 | Nome do aluno | Nome preenchido corretamente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE02 | Nome do aluno | — | Nome vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE03 | Nome do aluno | — | Nome com caracteres inválidos | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE04 | Contato do aluno | Contato preenchido em formato válido | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE05 | Contato do aluno | — | Contato vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE06 | Contato do aluno | — | Contato em formato inválido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE07 | Objetivo do aluno | Objetivo preenchido corretamente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE08 | Objetivo do aluno | — | Objetivo vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE09 | Objetivo do aluno | — | Objetivo incompreensível ou inválido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE10 | Duplicidade de cadastro | Contato ainda não cadastrado no sistema | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE11 | Duplicidade de cadastro | — | Contato já cadastrado no sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE12 | Duplicidade de cadastro | — | Cadastro duplicado para o mesmo aluno | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE13 | Finalização do cadastro | Cadastro salvo com sucesso | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE14 | Finalização do cadastro | — | Cadastro não é salvo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE15 | Finalização do cadastro | — | Mensagem de confirmação não é exibida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE16 | Registro inicial do aluno | Data de cadastro registrada e aluno inserido na lista | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H21-CE17 | Registro inicial do aluno | — | Data de cadastro não registrada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H21-CE18 | Registro inicial do aluno | — | Aluno não aparece na lista após cadastro | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 17.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H21-CT01 | Validar comportamento com nome, contato e objetivo válidos | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome, contato e objetivo válidos | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Aluno cadastrado com sucesso, data registrada e exibido na lista | H21-CE01, H21-CE04, H21-CE07, H21-CE10, H21-CE13, H21-CE16 |
| H21-CT02 | Validar comportamento com nome vazio | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome vazio | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede o cadastro e informa que o nome é obrigatório | H21-CE02 |
| H21-CT03 | Validar comportamento com nome com caracteres inválidos | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Nome com caracteres inválidos | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede o cadastro e informa que o nome está inválido | H21-CE03 |
| H21-CT04 | Validar comportamento com contato vazio | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Contato vazio | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede o cadastro e informa que o contato é obrigatório | H21-CE05 |
| H21-CT05 | Validar comportamento com contato em formato inválido | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Contato em formato inválido | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede o cadastro e informa que o contato está inválido | H21-CE06 |
| H21-CT06 | Validar comportamento com objetivo vazio ou incompreensível | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Objetivo vazio ou incompreensível | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede o cadastro e solicita um objetivo válido | H21-CE08, H21-CE09 |
| H21-CT07 | Validar comportamento com contato já cadastrado ou cadastro duplicado | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Contato já cadastrado ou cadastro duplicado | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede cadastro duplicado | H21-CE11, H21-CE12 |
| H21-CT08 | Validar comportamento com falha ao finalizar cadastro | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha ao finalizar cadastro | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Cadastro não é concluído ou mensagem de confirmação não é exibida | H21-CE14, H21-CE15 |
| H21-CT09 | Validar comportamento com cadastro salvo sem registro correto | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Cadastro salvo sem registro correto | 1. Acessar a funcionalidade relacionada à história H21<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema apresenta falha ao registrar data ou ao listar o aluno | H21-CE17, H21-CE18 |

---

## 18. H22 — Relatório de desempenho da aluna

### 18.1 História de Usuário

> H22 - Como aluna, quero gerar um relatório semanal ou mensal com meu desempenho, para que eu possa acompanhar minha evolução física e meu histórico de atividades.

### 18.2 Critérios de Aceitação

- **CA01:** A aluna deve encontrar em seu perfil uma opção clara para "Gerar Relatório de Desempenho".
- **CA02:** A interface deve oferecer um seletor obrigatório para escolher o período do relatório entre duas opções: "Semanal" ou "Mensal".
- **CA03:** O relatório gerado deve consolidar o histórico de treinos concluídos, a frequência e os dados de evolução física (medidas e peso) coletados no período.
- **CA04:** O sistema deve permitir a leitura do relatório diretamente na tela do aplicativo e disponibilizar um botão para exportá-lo em formato PDF.

### 18.3 Regras de Negócio

- **RN01:** O período "Semanal" compreende os últimos 7 dias corridos e o "Mensal" os últimos 30 dias corridos, contados regressivamente a partir do dia da solicitação.
- **RN02:** Caso não existam treinos ou avaliações físicas registrados no intervalo selecionado, a geração deve ser interrompida e o sistema exibirá a mensagem: "Dados insuficientes para o período selecionado".

### 18.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H22-CE01 | Seleção do Período | Opção suportada escolhida ("Semanal" ou "Mensal") | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H22-CE02 | Seleção do Período | — | Campo de período deixado vazio / em branco | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H22-CE03 | Seleção do Período | — | Período inválido ou customizado enviado por requisição | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H22-CE04 | Histórico de Dados | Existem treinos ou avaliações físicas registrados no período indicado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H22-CE05 | Histórico de Dados | — | Zero treinos ou dados de evolução registrados no intervalo | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H22-CE06 | Formato de Exportação | Exportação solicitada estritamente em formato PDF | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H22-CE07 | Formato de Exportação | — | Exportação solicitada em formato não suportado (ex: .xlsx, .csv) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 18.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H22-CT01 | Validar cenário: sucesso | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Período: "Mensal" Histórico: 12 treinos concluídos Ação: Visualizar e exportar PDF | 1. Acessar a funcionalidade relacionada à história H22<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Relatório gerado na tela com o histórico dos últimos 30 dias e download do PDF concluído com sucesso. | H22-CE01, H22-CE04, H22-CE06 |
| H22-CT02 | Validar cenário: falha — Sem Período | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Período: "" (Vazio) Histórico: Dados existentes | 1. Acessar a funcionalidade relacionada à história H22<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Geração rejeitada. O sistema impede o avanço e exige a escolha do período. | H22-CE02, H22-CE04, H22-CE06 |
| H22-CT03 | Validar cenário: falha — Sem Dados | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Período: "Semanal" Histórico: 0 treinos nos últimos 7 dias | 1. Acessar a funcionalidade relacionada à história H22<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Operação interrompida. O sistema exibe a mensagem: "Dados insuficientes para o período selecionado". | H22-CE01, H22-CE05, H22-CE06 |
| H22-CT04 | Validar cenário: falha — Formato Errado | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Período: "Semanal" Histórico: Dados existentes Ação: Exportar para Excel | 1. Acessar a funcionalidade relacionada à história H22<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Exportação bloqueada. O sistema informa que o formato não é aceito. | H22-CE01, H22-CE04, H22-CE07 |

---

## 19. H23 — Gráficos de progresso da aluna

### 19.1 História de Usuário

> H23 - Como aluna, quero visualizar gráficos do meu progresso de cargas, frequência e calorias gastas, para que eu possa analisar minha evolução e manter minha motivação.

### 19.2 Critérios de Aceitação

- **CA01:** A área de progresso da aluna deve exibir três abas de navegação gráfica distintas: "Cargas", "Frequência" e "Calorias Gastas".
- **CA02:** Na aba de "Cargas", a aluna deve conseguir selecionar um exercício específico de seu histórico para renderizar o gráfico linear de evolução do peso.
- **CA03:** Na aba de "Frequência", o gráfico em formato de barras deve quantificar os dias de treinos realizados por semana ou por mês.
- **CA04:** Na aba de "Calorias Gastas", a aluna deve visualizar o somatório estimado do gasto energético diário ou acumulado.

### 19.3 Regras de Negócio

- **RN01:** Os gráficos devem processar única e exclusivamente dados de sessões e séries marcadas no banco de dados com o status de "Concluído".
- **RN02:** O gráfico de calorias gastas deve realizar o cálculo de forma automática cruzando o tempo total de duração do treino com o gasto calórico estimado parametrizado pelo personal trainer na ficha de exercícios.

### 19.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H23-CE01 | Aba / Métrica de Evolução | Uma das três abas suportadas ativada ("Cargas", "Frequência" ou "Calorias") | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H23-CE02 | Aba / Métrica de Evolução | — | Nenhuma aba selecionada pela interface | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H23-CE03 | Aba / Métrica de Evolução | — | Seleção de métrica inexistente ou corrompida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H23-CE04 | Status das Sessões | Dados pertencem a séries ou treinos com o status "Concluído" | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H23-CE05 | Status das Sessões | — | Dados pertencem a treinos apenas planejados (status pendente) | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H23-CE06 | Filtro de Exercício (Aba Cargas) | Exercício existente e com histórico é selecionado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H23-CE07 | Filtro de Exercício (Aba Cargas) | — | Nenhum exercício selecionado ao carregar a aba de cargas | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 19.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H23-CT01 | Validar cenário: sucesso — Cargas | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Aba: "Cargas" Status: Treinos Concluídos Exercício: "Supino Reto" | 1. Acessar a funcionalidade relacionada à história H23<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Renderiza com sucesso o gráfico linear mostrando a evolução do peso do exercício selecionado. | H23-CE01, H23-CE04, H23-CE06 |
| H23-CT02 | Validar cenário: sucesso — Frequência | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Aba: "Frequência" Status: Treinos Concluídos | 1. Acessar a funcionalidade relacionada à história H23<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Renderiza com sucesso o gráfico de barras quantificando os dias de treinos realizados. | H23-CE01, H23-CE04, H23-CE06 |
| H23-CT03 | Validar cenário: falha — Dados Pendentes | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Aba: "Calorias Gastas" Status: Apenas treinos pendentes | 1. Acessar a funcionalidade relacionada à história H23<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O gráfico exibe valores zerados, ignorando os treinos que ainda não foram marcados como concluídos. | H23-CE01, H23-CE05, H23-CE06 |
| H23-CT04 | Validar cenário: falha — Sem Exercício | Aluna autenticada no sistema e com acesso à funcionalidade correspondente. | Aba: "Cargas" Status: Treinos Concluídos Exercício: "" (Vazio) | 1. Acessar a funcionalidade relacionada à história H23<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema deixa o espaço do gráfico em estado neutro e solicita a seleção de um exercício da lista. | H23-CE01, H23-CE04, H23-CE07 |

---

## 20. H24 — Ficha personalizada do dia

### 20.1 História de Usuário

> H24 - Como aluna, quero visualizar minha ficha personalizada do dia, para que eu saiba exatamente qual rotina de treinos foi adaptada aos meus objetivos atuais.

### 20.2 Critérios de Aceitação

- **CA01:** Ao acessar a tela inicial do aplicativo no "Modo Treino", o sistema deve abrir automaticamente a ficha correspondente ao dia da semana ou à sequência de rotação (ex.: Treino A, Treino B).
- **CA02:** A ficha do dia deve listar em ordem cronológica o nome de todos os exercícios, a quantidade de séries, repetições planejadas e a carga sugerida pelo treinador.
- **CA03:** O topo da tela deve destacar visualmente o objetivo macro configurado no perfil (ex.: "Foco Atual: Hipertrofia Avançada").

### 20.3 Regras de Negócio

- **RN01:** Caso o personal trainer não tenha publicado ou associado nenhuma ficha de treino ativa para a aluna, o aplicativo deve exibir um bloqueio amigável com o aviso: "Nenhum treino disponível. Solicite sua ficha ao seu personal trainer".
- **RN02:** A aluna não possui permissão para excluir, adicionar ou alterar a ordem dos exercícios determinados na ficha do dia; ela tem autonomia apenas para preencher e salvar as cargas e repetições reais executadas.

### 20.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H24-CE01 | Atribuição de Ficha | Ficha de treino ativa publicada e associada à aluna pelo Personal | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H24-CE02 | Atribuição de Ficha | — | Nenhuma ficha ativa vinculada ao perfil da aluna no sistema | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H24-CE03 | Modificação da Estrutura | Aluna tenta preencher apenas os campos reais de carga e repetições | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H24-CE04 | Modificação da Estrutura | — | Aluna tenta excluir, adicionar ou alterar a ordem dos exercícios | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 20.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H24-CT01 | Validar cenário: sucesso — Fluxo Base | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Ficha: Ativa ("Treino A") Ação: Acessar Modo Treino e digitar dados reais | 1. Acessar a funcionalidade relacionada à história H24<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Ficha exibe a lista ordenada de exercícios, o objetivo macro ("Hipertrofia Avançada") e permite salvar as cargas reais executadas. | H24-CE01, H24-CE03 |
| H24-CT02 | Validar cenário: falha — Sem Treino | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Ficha: Nenhuma vinculada Ação: Acessar Modo Treino | 1. Acessar a funcionalidade relacionada à história H24<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O aplicativo exibe um bloqueio amigável na tela com a mensagem: "Nenhum treino disponível. Solicite sua ficha ao seu personal trainer". | H24-CE02, H24-CE03 |
| H24-CT03 | Validar cenário: falha — Alteração Proibida | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Ficha: Ativa ("Treino A") Ação: Tentar excluir um exercício ou arrastar para mudar a ordem | 1. Acessar a funcionalidade relacionada à história H24<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O sistema bloqueia a ação na interface; os botões de edição estrutural permanecem ocultos ou desabilitados para o perfil de aluna. | H24-CE01, H24-CE04 |

---

## 21. H25 — Lembretes de treino para o aluno

### 21.1 História de Usuário

> H25 - Como aluno, desejo receber notificações de lembrete de treino no meu celular, para manter o foco e a consistência na rotina esportiva.

### 21.2 Critérios de Aceitação

- **CA01:** O sistema deve emitir um lembrete no celular do aluno avisando que ele possui um treino programado para aquele dia.
- **CA02:** As notificações não devem ser enviadas se o usuário tiver desativado os lembretes nas configurações da conta.

### 21.3 Regras de Negócio

- **RN01:** O sistema deve verificar a propriedade notificacoes_ativas no perfil do aluno. Se o valor for falso, o fluxo de envio para o dispositivo móvel correspondente é encerrado.

### 21.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H25-CE01 | Configuração de push no perfil | Flag notificacoes_ativas é igual a true | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H25-CE02 | Configuração de push no perfil | — | Flag notificacoes_ativas é igual a false | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 21.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H25-CT01 | Validar comportamento com flag no perfil: true | Aluno autenticado no sistema e com acesso à funcionalidade correspondente. | Flag no perfil: true | 1. Acessar a funcionalidade relacionada à história H25<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Notificação push é montada e despachada ao celular | H25-CE01 |
| H25-CT02 | Validar comportamento com flag no perfil: false | Aluno autenticado no sistema e com acesso à funcionalidade correspondente. | Flag no perfil: false | 1. Acessar a funcionalidade relacionada à história H25<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | O envio é cancelado e nenhuma mensagem é enviada para o aluno | H25-CE02 |

---

## 22. H26 — Lista de alunos com mensalidade pendente

### 22.1 História de Usuário

> H26 - Enquanto personal, quero visualizar a lista de alunos com mensalidade pendente, para saber quem precisa ser cobrado sem verificar um por um.

### 22.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir a visualização da lista de alunos com mensalidade pendente.
- **CA02:** O sistema deve exibir apenas alunos com pagamentos em atraso.
- **CA03:** O sistema deve apresentar informações suficientes para identificação do aluno.
- **CA04:** O sistema deve permitir que o personal acesse rapidamente os alunos pendentes sem consultar cada perfil individualmente.
- **CA05:** O sistema deve atualizar a lista conforme a situação financeira dos alunos.
- **CA06:** O sistema deve informar quando não houver alunos com mensalidade pendente.

### 22.3 Regras de Negócio

- **RN01:** Considera-se pendente a mensalidade que ultrapassou a data de vencimento sem registro de pagamento.
- **RN02:** Apenas alunos com mensalidade pendente devem aparecer na lista.
- **RN03:** Alunos com mensalidade em dia não devem ser exibidos.
- **RN04:** A lista deve ser atualizada automaticamente após confirmação de pagamento.
- **RN05:** O sistema deve exibir nome e informação da pendência do aluno.
- **RN06:** Caso não existam pendências, o sistema deve exibir mensagem informativa ao personal.

### 22.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H26-CE01 | Situação da mensalidade | Mensalidade vencida e sem pagamento registrado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE02 | Situação da mensalidade | — | Mensalidade em dia | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE03 | Situação da mensalidade | — | Mensalidade quitada após vencimento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE04 | Exibição na lista | Aluno pendente exibido na lista | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE05 | Exibição na lista | — | Aluno pendente não exibido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE06 | Exibição na lista | — | Aluno sem pendência exibido na lista | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE07 | Informações do aluno | Nome e dados da pendência exibidos corretamente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE08 | Informações do aluno | — | Nome não exibido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE09 | Informações do aluno | — | Dados da pendência não exibidos | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE10 | Atualização da lista | Lista atualizada após pagamento | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE11 | Atualização da lista | — | Lista não atualizada após pagamento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE12 | Atualização da lista | — | Aluno permanece listado após quitar débito | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE13 | Consulta pelo personal | Personal visualiza todos os alunos pendentes sem acessar perfis individuais | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE14 | Consulta pelo personal | — | Necessidade de acessar perfil para identificar pendência | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE15 | Consulta pelo personal | — | Lista indisponível para consulta | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE16 | Ausência de pendências | Sistema exibe mensagem informativa quando não há pendências | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H26-CE17 | Ausência de pendências | — | Mensagem informativa não exibida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H26-CE18 | Ausência de pendências | — | Sistema exibe lista vazia sem explicação | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 22.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H26-CT01 | Validar comportamento com existem alunos com mensalidade pendente | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Existem alunos com mensalidade pendente | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema exibe corretamente a lista de alunos pendentes | H26-CE01, H26-CE04, H26-CE07, H26-CE13 |
| H26-CT02 | Validar comportamento com alunos com mensalidade em dia ou quitada | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Alunos com mensalidade em dia ou quitada | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Alunos não são exibidos na lista de pendências | H26-CE02, H26-CE03, H26-CE06 |
| H26-CT03 | Validar comportamento com falha na exibição das informações do aluno | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha na exibição das informações do aluno | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema apresenta inconsistência na listagem | H26-CE05, H26-CE08, H26-CE09 |
| H26-CT04 | Validar comportamento com pagamento registrado para aluno pendente | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Pagamento registrado para aluno pendente | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Aluno é removido automaticamente da lista de pendências | H26-CE10 |
| H26-CT05 | Validar comportamento com pagamento registrado, mas lista não atualizada | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Pagamento registrado, mas lista não atualizada | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema mantém informação incorreta | H26-CE11, H26-CE12 |
| H26-CT06 | Validar comportamento com Personal precisa acessar perfis individuais ou lista está indisponível | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Personal precisa acessar perfis individuais ou lista está indisponível | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Requisito de consulta rápida não é atendido | H26-CE14, H26-CE15 |
| H26-CT07 | Validar comportamento com não existem pendências cadastradas | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Não existem pendências cadastradas | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema exibe mensagem informativa indicando que não há pendências | H26-CE16 |
| H26-CT08 | Validar comportamento com não existem pendências cadastradas | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Não existem pendências cadastradas | 1. Acessar a funcionalidade relacionada à história H26<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema não informa adequadamente a ausência de pendências | H26-CE17, H26-CE18 |

---

## 23. H27 — Marcação de mensalidade como recebida

### 23.1 História de Usuário

> H27 - Enquanto personal, quero marcar uma mensalidade como recebida, para manter o controle de cobranças atualizado.

### 23.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir que o personal marque uma mensalidade como recebida.
- **CA02:** O sistema deve atualizar o status da mensalidade após a confirmação do recebimento.
- **CA03:** O sistema deve registrar a data em que o pagamento foi marcado como recebido.
- **CA04:** O sistema deve remover o aluno da lista de mensalidades pendentes após o pagamento ser registrado.
- **CA05:** O sistema deve impedir que uma mensalidade já recebida seja marcada novamente sem necessidade.
- **CA06:** O sistema deve exibir uma mensagem de confirmação após a atualização.

### 23.3 Regras de Negócio

- **RN01:** Uma mensalidade pendente pode ser marcada como recebida pelo personal.
- **RN02:** Ao marcar como recebida, o status da mensalidade deve mudar para paga.
- **RN03:** A data de recebimento deve ser registrada automaticamente pelo sistema.
- **RN04:** Após a confirmação do pagamento, o aluno não deve mais aparecer na lista de pendências.
- **RN05:** Mensalidades já pagas não devem permanecer como pendentes.
- **RN06:** O sistema deve manter o histórico do pagamento registrado.

### 23.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H27-CE01 | Situação da mensalidade | Mensalidade pendente selecionada | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE02 | Situação da mensalidade | — | Mensalidade já recebida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE03 | Situação da mensalidade | — | Mensalidade inexistente ou não selecionada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE04 | Confirmação do recebimento | Personal confirma recebimento da mensalidade | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE05 | Confirmação do recebimento | — | Personal cancela a ação de recebimento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE06 | Confirmação do recebimento | — | Sistema não permite confirmar recebimento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE07 | Atualização do status | Status atualizado para paga ou recebida | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE08 | Atualização do status | — | Status permanece como pendente | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE09 | Atualização do status | — | Status atualizado incorretamente | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE10 | Registro da data | Data de recebimento registrada automaticamente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE11 | Registro da data | — | Data de recebimento não registrada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE12 | Registro da data | — | Data registrada incorretamente | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE13 | Lista de pendências | Aluno removido da lista após pagamento | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE14 | Lista de pendências | — | Aluno permanece na lista após pagamento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE15 | Lista de pendências | — | Lista não é atualizada após recebimento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE16 | Confirmação e histórico | Mensagem de confirmação exibida e histórico mantido | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H27-CE17 | Confirmação e histórico | — | Mensagem de confirmação não exibida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H27-CE18 | Confirmação e histórico | — | Histórico de pagamento não é registrado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 23.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H27-CT01 | Validar comportamento com mensalidade pendente selecionada; ação: confirmar recebimento | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mensalidade pendente selecionada; ação: confirmar recebimento | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Mensalidade marcada como paga, data registrada, aluno removido da lista, mensagem exibida e histórico mantido | H27-CE01, H27-CE04, H27-CE07, H27-CE10, H27-CE13, H27-CE16 |
| H27-CT02 | Validar comportamento com mensalidade já recebida; ação: tentar confirmar novamente | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mensalidade já recebida; ação: tentar confirmar novamente | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede ação duplicada e informa que a mensalidade já foi recebida | H27-CE02, H27-CE04 |
| H27-CT03 | Validar comportamento com mensalidade inexistente ou não selecionada | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Mensalidade inexistente ou não selecionada | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede a ação e solicita a seleção de uma mensalidade válida | H27-CE03 |
| H27-CT04 | Validar comportamento com Personal cancela a ação de recebimento | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Personal cancela a ação de recebimento | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema mantém a mensalidade como pendente e não registra pagamento | H27-CE05 |
| H27-CT05 | Validar comportamento com sistema não permite confirmar recebimento | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Sistema não permite confirmar recebimento | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Requisito de marcação de mensalidade como recebida não é atendido | H27-CE06 |
| H27-CT06 | Validar comportamento com falha na alteração do status | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha na alteração do status | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema mantém status pendente ou atualiza incorretamente | H27-CE08, H27-CE09 |
| H27-CT07 | Validar comportamento com falha no registro da data de recebimento | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha no registro da data de recebimento | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema não registra corretamente a data do pagamento | H27-CE11, H27-CE12 |
| H27-CT08 | Validar comportamento com falha na atualização da lista de pendências | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha na atualização da lista de pendências | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Aluno continua aparecendo indevidamente como pendente | H27-CE14, H27-CE15 |
| H27-CT09 | Validar comportamento com falha na confirmação ou histórico | Personal autenticado no sistema e com permissão para executar a funcionalidade. | Falha na confirmação ou histórico | 1. Acessar a funcionalidade relacionada à história H27<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema não exibe confirmação ou não registra histórico do pagamento | H27-CE17, H27-CE18 |

---

## 24. H28 — Login com e-mail e senha

### 24.1 História de Usuário

> H28 - Como usuário, quero fazer login com e-mail e senha, para acessar o sistema com segurança.

### 24.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir login utilizando e-mail e senha.
- **CA02:** O sistema deve validar se o e-mail informado está em formato válido.
- **CA03:** O sistema deve exigir o preenchimento dos campos e-mail e senha.
- **CA04:** O sistema deve permitir acesso apenas quando as credenciais forem válidas.
- **CA05:** O sistema deve impedir o acesso quando e-mail ou senha estiverem incorretos.
- **CA06:** O sistema deve exibir mensagem de erro quando o login não for realizado.
- **CA07:** Após login bem-sucedido, o usuário deve ser direcionado para a tela principal do sistema.

### 24.3 Regras de Negócio

- **RN01:** O e-mail é obrigatório.
- **RN02:** A senha é obrigatória.
- **RN03:** O e-mail deve estar cadastrado no sistema.
- **RN04:** A senha informada deve corresponder ao e-mail cadastrado.
- **RN05:** Usuários com credenciais inválidas não podem acessar o sistema.
- **RN06:** Após autenticação válida, o sistema deve iniciar uma sessão de usuário.
- **RN07:** O sistema não deve informar especificamente se o erro foi no e-mail ou na senha, por segurança.

### 24.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H28-CE01 | E-mail informado | E-mail preenchido em formato válido | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE02 | E-mail informado | — | E-mail vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE03 | E-mail informado | — | E-mail em formato inválido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE04 | Senha informada | Senha preenchida corretamente | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE05 | Senha informada | — | Senha vazia | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE06 | Senha informada | — | Senha incorreta | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE07 | Cadastro do usuário | E-mail cadastrado no sistema | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE08 | Cadastro do usuário | — | E-mail não cadastrado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE09 | Cadastro do usuário | — | Usuário inexistente | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE10 | Autenticação | E-mail e senha correspondem ao usuário cadastrado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE11 | Autenticação | — | E-mail e senha não correspondem | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE12 | Autenticação | — | Credenciais inválidas | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE13 | Acesso ao sistema | Login realizado e sessão iniciada | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE14 | Acesso ao sistema | — | Acesso negado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE15 | Acesso ao sistema | — | Sessão não iniciada após login válido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE16 | Mensagens e redirecionamento | Mensagem adequada e redirecionamento correto após login | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H28-CE17 | Mensagens e redirecionamento | — | Login inválido sem mensagem de erro | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H28-CE18 | Mensagens e redirecionamento | — | Login válido sem redirecionamento | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 24.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H28-CT01 | Validar comportamento com e-mail válido e cadastrado; senha correta | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail válido e cadastrado; senha correta | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Login realizado com sucesso, sessão iniciada e usuário redirecionado para a tela principal | H28-CE01, H28-CE04, H28-CE07, H28-CE10, H28-CE13, H28-CE16 |
| H28-CT02 | Validar comportamento com e-mail vazio | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail vazio | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede login e informa que o e-mail é obrigatório | H28-CE02 |
| H28-CT03 | Validar comportamento com e-mail em formato inválido | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail em formato inválido | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede login e informa erro de formato de e-mail | H28-CE03 |
| H28-CT04 | Validar comportamento com senha vazia | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Senha vazia | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede login e informa que a senha é obrigatória | H28-CE05 |
| H28-CT05 | Validar comportamento com senha incorreta | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Senha incorreta | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema nega acesso e exibe mensagem genérica de credenciais inválidas | H28-CE06, H28-CE11, H28-CE12, H28-CE14 |
| H28-CT06 | Validar comportamento com e-mail não cadastrado ou usuário inexistente | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail não cadastrado ou usuário inexistente | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema nega acesso e exibe mensagem genérica de credenciais inválidas | H28-CE08, H28-CE09, H28-CE12, H28-CE14 |
| H28-CT07 | Validar comportamento com login válido sem iniciar sessão | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Login válido sem iniciar sessão | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema apresenta falha ao autenticar corretamente o usuário | H28-CE15 |
| H28-CT08 | Validar comportamento com login inválido sem mensagem de erro | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Login inválido sem mensagem de erro | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema falha por não exibir mensagem de erro adequada | H28-CE17 |
| H28-CT09 | Validar comportamento com login válido sem redirecionamento | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Login válido sem redirecionamento | 1. Acessar a funcionalidade relacionada à história H28<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema autentica, mas não direciona o usuário para a tela principal | H28-CE18 |

---

## 25. H29 — Recuperação de senha por e-mail

### 25.1 História de Usuário

> H29 - Como usuário, quero recuperar minha senha por e-mail, para não perder acesso à conta caso eu a esqueça.

### 25.2 Critérios de Aceitação

- **CA01:** O sistema deve permitir que o usuário solicite a recuperação de senha informando seu e-mail.
- **CA02:** O sistema deve validar se o e-mail informado possui formato válido.
- **CA03:** O sistema deve verificar se o e-mail está cadastrado no sistema.
- **CA04:** O sistema deve enviar instruções de recuperação para o e-mail cadastrado.
- **CA05:** O sistema deve permitir a redefinição da senha por meio do link enviado.
- **CA06:** O sistema deve exibir mensagens adequadas de sucesso ou erro durante o processo.
- **CA07:** Após redefinir a senha, o usuário deve conseguir realizar login com a nova senha.

### 25.3 Regras de Negócio

- **RN01:** O e-mail é obrigatório para solicitar recuperação de senha.
- **RN02:** Apenas usuários cadastrados podem recuperar a senha.
- **RN03:** O sistema deve gerar um link ou token único para redefinição da senha.
- **RN04:** O link de recuperação deve possuir prazo de validade.
- **RN05:** Após a redefinição da senha, o token utilizado deve ser invalidado.
- **RN06:** A nova senha substitui a senha anterior.
- **RN07:** O sistema deve registrar a data da solicitação de recuperação.

### 25.4 Classes de Equivalência

| ID | Campo/Condição | Classe Válida | Classe Inválida | Resultado Esperado |
|---|---|---|---|---|
| H29-CE01 | E-mail informado | E-mail preenchido em formato válido | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE02 | E-mail informado | — | E-mail vazio | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE03 | E-mail informado | — | E-mail em formato inválido | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE04 | Cadastro do usuário | E-mail cadastrado no sistema | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE05 | Cadastro do usuário | — | E-mail não cadastrado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE06 | Cadastro do usuário | — | Usuário inexistente | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE07 | Solicitação de recuperação | Solicitação realizada com sucesso | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE08 | Solicitação de recuperação | — | Solicitação não processada | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE09 | Solicitação de recuperação | — | Falha no envio da solicitação | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE10 | Envio de recuperação | Link ou token enviado ao e-mail cadastrado | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE11 | Envio de recuperação | — | Link ou token não enviado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE12 | Envio de recuperação | — | Link ou token enviado incorretamente ou com falha de entrega | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE13 | Token de recuperação | Token válido utilizado dentro do prazo | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE14 | Token de recuperação | — | Token expirado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE15 | Token de recuperação | — | Token inválido ou já utilizado | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE16 | Redefinição de senha | Nova senha redefinida com sucesso | — | Sistema aceita a condição e permite continuidade do fluxo funcional. |
| H29-CE17 | Redefinição de senha | — | Senha não redefinida | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |
| H29-CE18 | Redefinição de senha | — | Login não funciona com a nova senha | Sistema bloqueia, rejeita ou trata a condição inválida conforme a regra de negócio. |

### 25.5 Casos de Teste

| ID | Objetivo | Pré-condições | Dados de Entrada | Passos | Resultado Esperado | Classe Relacionada |
|---|---|---|---|---|---|---|
| H29-CT01 | Validar comportamento com usuário informa e-mail válido e cadastrado | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Usuário informa e-mail válido e cadastrado | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema envia link ou token de recuperação para o e-mail cadastrado | H29-CE01, H29-CE04, H29-CE07, H29-CE10 |
| H29-CT02 | Validar comportamento com e-mail vazio | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail vazio | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede a solicitação e informa que o e-mail é obrigatório | H29-CE02 |
| H29-CT03 | Validar comportamento com e-mail em formato inválido | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail em formato inválido | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede a solicitação e informa erro no formato do e-mail | H29-CE03 |
| H29-CT04 | Validar comportamento com e-mail não cadastrado | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | E-mail não cadastrado | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema informa que não foi possível processar a recuperação | H29-CE05, H29-CE06 |
| H29-CT05 | Validar comportamento com falha no processamento ou envio do link | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Falha no processamento ou envio do link | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema não conclui corretamente a recuperação | H29-CE08, H29-CE09, H29-CE11, H29-CE12 |
| H29-CT06 | Validar comportamento com usuário utiliza token válido e redefine a senha | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Usuário utiliza token válido e redefine a senha | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema redefine a senha com sucesso e invalida o token utilizado | H29-CE13, H29-CE16 |
| H29-CT07 | Validar comportamento com usuário utiliza token expirado | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Usuário utiliza token expirado | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede a redefinição e solicita nova recuperação | H29-CE14 |
| H29-CT08 | Validar comportamento com usuário utiliza token inválido ou já utilizado | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Usuário utiliza token inválido ou já utilizado | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema impede a redefinição da senha | H29-CE15 |
| H29-CT09 | Validar comportamento com redefinição realizada incorretamente | Usuário autenticado no sistema e com acesso à funcionalidade correspondente. | Redefinição realizada incorretamente | 1. Acessar a funcionalidade relacionada à história H29<br>2. Informar os dados de entrada definidos no caso<br>3. Executar a ação principal do cenário<br>4. Verificar o resultado esperado | Sistema não altera a senha ou não permite login com a nova senha | H29-CE17, H29-CE18 |

---

## Resumo de Rastreabilidade

| Métrica | Total |
|---|---:|
| Histórias de usuário documentadas | 25 |
| Classes de equivalência padronizadas | 240 |
| Casos de teste padronizados | 149 |

> ✅ Todos os casos de teste referenciam pelo menos uma classe de equivalência padronizada no formato `HXX-CEXX`.
