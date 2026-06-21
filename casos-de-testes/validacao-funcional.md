# 🧪 Validação Funcional — TrainerX64

---

<a id="sumario"></a>
## Sumário

| # | História | Perfil | Classes | Casos de Teste |
|---:|---|:---:|---:|---:|
| 1 | [H01 — Cadastro de treinos padronizados](#h01-cadastro-de-treinos-padronizados) | `PT` | 9 | 6 |
| 2 | [H02 — Dashboard centralizado de alunos](#h02-dashboard-centralizado-de-alunos) | `PT` | 11 | 8 |
| 3 | [H03 — Relatórios automáticos de evolução](#h03-relatorios-automaticos-de-evolucao) | `PT` | 13 | 8 |
| 4 | [H05 — Chat direto entre personal e aluno](#h05-chat-direto-entre-personal-e-aluno) | `PT` | 5 | 4 |
| 5 | [H06 — Interface visual de status dos alunos](#h06-interface-visual-de-status-dos-alunos) | `PT` | 18 | 10 |
| 6 | [H07 — Fluxo de primeiros passos](#h07-fluxo-de-primeiros-passos) | `PT · A · AA` | 4 | 3 |
| 7 | [H08 — Atalhos de teclado](#h08-atalhos-de-teclado) | `PT` | 5 | 4 |
| 8 | [H09 — Alertas de faltas do aluno](#h09-alertas-de-faltas-do-aluno) | `PT` | 3 | 3 |
| 9 | [H10 — Vídeos explicativos dos exercícios](#h10-videos-explicativos-dos-exercicios) | `A` | 9 | 6 |
| 10 | [H11 — Registro de cargas e repetições](#h11-registro-de-cargas-e-repeticoes) | `A` | 10 | 7 |
| 11 | [H12 — Lembretes de treino para o personal](#h12-lembretes-de-treino-para-o-personal) | `PT` | 3 | 3 |
| 12 | [H13 — Gráficos de evolução física](#h13-graficos-de-evolucao-fisica) | `A` | 7 | 7 |
| 13 | [H16 — Suporte a leitores de tela](#h16-suporte-a-leitores-de-tela) | `AA` | 9 | 6 |
| 14 | [H17 — Alto contraste e fontes escaláveis](#h17-alto-contraste-e-fontes-escalaveis) | `AA` | 11 | 7 |
| 15 | [H18 — Comandos de voz para cronômetro de descanso](#h18-comandos-de-voz-para-cronometro-de-descanso) | `AA` | 7 | 7 |
| 16 | [H20 — Feedback vibratório ao concluir série](#h20-feedback-vibratorio-ao-concluir-serie) | `AA` | 6 | 3 |
| 17 | [H21 — Cadastro de novo aluno](#h21-cadastro-de-novo-aluno) | `PT` | 18 | 9 |
| 18 | [H22 — Relatório semanal ou mensal de desempenho](#h22-relatorio-semanal-ou-mensal-de-desempenho) | `A` | 7 | 4 |
| 19 | [H23 — Gráficos de progresso da aluna](#h23-graficos-de-progresso-da-aluna) | `A` | 7 | 4 |
| 20 | [H24 — Ficha personalizada do dia](#h24-ficha-personalizada-do-dia) | `A` | 4 | 3 |
| 21 | [H25 — Lembretes de treino para o aluno](#h25-lembretes-de-treino-para-o-aluno) | `A` | 2 | 2 |
| 22 | [H26 — Lista de alunos com mensalidade pendente](#h26-lista-de-alunos-com-mensalidade-pendente) | `PT` | 18 | 8 |
| 23 | [H27 — Marcação de mensalidade como recebida](#h27-marcacao-de-mensalidade-como-recebida) | `PT` | 18 | 9 |
| 24 | [H28 — Login com e-mail e senha](#h28-login-com-e-mail-e-senha) | `PT · A · AA` | 18 | 9 |
| 25 | [H29 — Recuperação de senha por e-mail](#h29-recuperacao-de-senha-por-e-mail) | `PT · A · AA` | 18 | 9 |

---

## Perfis utilizados

| Sigla | Perfil | Descrição |
|---|---|---|
| `PT` | Personal Trainer | Usuário responsável por gerenciar alunos, treinos, evolução, agenda e cobranças. |
| `A` | Aluno/Aluna | Usuário que executa treinos, registra dados e acompanha sua evolução. |
| `AA` | Aluno com Acessibilidade | Usuário com baixa visão ou necessidade de recursos acessíveis, como leitor de tela, alto contraste, voz e vibração. |

> [!NOTE]
> Este documento reorganiza as histórias, classes de equivalência e casos de teste em ordem numérica crescente, preservando a base do material original. Foram aplicadas apenas padronizações de escrita, identificadores e correções pontuais de inconsistências evidentes de cópia/colagem.

---

## Convenção de rastreabilidade

| Artefato | Padrão utilizado | Exemplo |
|---|---|---|
| Critério de Aceitação | `HXX-CA99` | `H21-CA01` |
| Regra de Negócio | `HXX-RN99` | `H21-RN01` |
| Classe de Equivalência | `HXX-CE99` | `H21-CE01` |
| Caso de Teste | `HXX-CT99` | `H21-CT01` |

```text
História de Usuário → Critérios de Aceitação → Regras de Negócio → Classes de Equivalência → Casos de Teste
```

---

<a id="h01-cadastro-de-treinos-padronizados"></a>
## H01 — Cadastro de treinos padronizados

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H01` → critérios → regras → `H01-CE01` a `H01-CE09` → `H01-CT01` a `H01-CT06`

### 📖 História de Usuário

> H01 - Enquanto personal, desejo cadastrar treinos padronizados: que possuem uma mesma base de exercícios para replicá-los rapidamente entre alunos com objetivos similares que são de mesma categoria.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H01-CA01` | O sistema deve permitir salvar uma sequência de exercícios como um "Treino Padrão". |
| `H01-CA02` | O personal deve conseguir nomear e categorizar o template optando pelos nomes padrões "Hipertrofia Iniciante", "Emagrecimento Avançado" ou escrever uma categoria. |
| `H01-CA03` | Ao acessar o perfil de um aluno, deve haver uma opção "Importar de Template" que liste os treinos salvos. |
| `H01-CA04` | Alterações feitas no treino específico de um aluno após a importação não devem afetar o template original e depois de importado alterações feitas no template padrão também não afetam o treino do aluno. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H01-RN01` | Um template só pode ser salvo se possuir, no mínimo, um Nome de Identificação, pelo menos 1 exercício cadastrado com suas respectivas séries e repetições e a categoria determinada, caso não tenha um exercício cadastrado o botão de salvar não estará disponível. |
| `H01-RN02` | O sistema não deve permitir o cadastro de dois treinos padronizados com o mesmo nome para o mesmo Personal, por exemplo: não permitir dois templates chamados "Iniciante A" apresentando uma mensagem de erro informando que já existe um treino com esse nome. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H01-CE01` | `1` | Nome do Template | ✅ Válida | Nome preenchido e inédito para o Personal | Aceitar / permitir o fluxo. |
| `H01-CE02` | `2` | Nome do Template | ❌ Inválida | Nome está vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H01-CE03` | `3` | Nome do Template | ❌ Inválida | Nome duplicado para o mesmo Personal | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H01-CE04` | `4` | Categoria do Template | ✅ Válida | Categoria informada (padrão selecionada ou customizada escrita) | Aceitar / permitir o fluxo. |
| `H01-CE05` | `5` | Categoria do Template | ❌ Inválida | Categoria deixada em branco / não determinada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H01-CE06` | `6` | Quantidade de Exercícios | ✅ Válida | Pelo menos 1 exercício adicionado à lista | Aceitar / permitir o fluxo. |
| `H01-CE07` | `7` | Quantidade de Exercícios | ❌ Inválida | Nenhum exercício cadastrado (botão salvar indisponível) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H01-CE08` | `8` | Detalhes do Exercício | ✅ Válida | Séries e repetições preenchidas | Aceitar / permitir o fluxo. |
| `H01-CE09` | `9` | Detalhes do Exercício | ❌ Inválida | Exercício cadastrado sem séries ou sem repetições | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H01-CT01` | Caso 1 | `H01-CE01`, `H01-CE04`, `H01-CE06`, `H01-CE08` | Nome: "Iniciante A"<br>Categoria: "Hipertrofia Iniciante"<br>Exercícios: [Supino Reto - 3x10] | Treino padrão salvo com sucesso. |
| `H01-CT02` | Caso 2 | `H01-CE02`, `H01-CE04`, `H01-CE06`, `H01-CE08` | Nome: "" (Vazio)<br>Categoria: "Emagrecimento Avançado"<br>Exercícios: [Leg Press - 3x12] | Treino inválido (Nome obrigatório). |
| `H01-CT03` | Caso 3 | `H01-CE03`, `H01-CE04`, `H01-CE06`, `H01-CE08` | Nome: "Iniciante A" (Já existente)<br>Categoria: "Hipertrofia Iniciante"<br>Exercícios: [Agachamento - 4x12] | Treino inválido (Mensagem: nome já existe). |
| `H01-CT04` | Caso 4 | `H01-CE01`, `H01-CE05`, `H01-CE06`, `H01-CE08` | Nome: "Treino Funcional"<br>Categoria: "" (Vazia)<br>Exercícios: [Corrida - 1x20min] | Treino inválido (Categoria obrigatória). |
| `H01-CT05` | Caso 5 | `H01-CE01`, `H01-CE04`, `H01-CE07`, `H01-CE08` | Nome: "Treino Vazio"<br>Categoria: "Hipertrofia Iniciante"<br>Exercícios: Nenhum | Treino inválido (Botão salvar desabilitado). |
| `H01-CT06` | Caso 6 | `H01-CE01`, `H01-CE04`, `H01-CE06`, `H01-CE09` | Nome: "Treino Incompleto"<br>Categoria: "Hipertrofia Iniciante"<br>Exercícios: [Flexão de Braço - Sem séries] | Treino inválido (Dados obrigatórios faltando). |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h02-dashboard-centralizado-de-alunos"></a>
## H02 — Dashboard centralizado de alunos

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H02` → critérios → regras → `H02-CE01` a `H02-CE11` → `H02-CT01` a `H02-CT08`

### 📖 História de Usuário

> H02 - Enquanto personal, desejo visualizar um dashboard centralizado para acompanhar o progresso de todos os meus alunos (presenciais e online).

> [!IMPORTANT]
> A linha “Nome do Template” aparecia no material original dentro da H02, mas era incompatível com a história de dashboard. Ela foi removida da tabela principal para evitar conflito de rastreabilidade com as classes do filtro.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H02-CA01` | O personal deve visualizar na tela inicial uma lista com o nome de todos os alunos cadastrados e seu último status de atividade. |
| `H02-CA02` | Deve existir um filtro funcional para selecionar alunos "Online", "Presenciais" ou "Híbridos". |
| `H02-CA03` | Um aluno híbrido deve aparecer no filtro "Híbridos" e não deve aparecer isoladamente nos filtros "Online" ou "Presenciais". |
| `H02-CA04` | Ao clicar em um aluno, o sistema deve abrir uma visão detalhada com o gráfico de desempenho das últimas 4 semanas referente a categoria optada pelo personal, como: "carga", "repetições", exibindo a modalidade de cada sessão registrada (presencial ou online) quando o aluno for híbrido. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H02-RN01` | O dashboard deve permitir a visualização segregada entre alunos de atendimento presencial, alunos de consultoria online e alunos híbridos (que realizam ambos os tipos de sessão com o mesmo personal). |
| `H02-RN02` | Um aluno é classificado como híbrido quando possui ao menos uma sessão presencial e uma sessão online registradas no histórico. |
| `H02-RN03` | O sistema deve processar os dados de execução (cargas e repetições) para gerar indicadores de evolução em tempo real. |
| `H02-RN04` | O acesso aos dados de cada aluno deve respeitar a privacidade configurada no perfil do usuário. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H02-CE01` | `1` | Tipo de Filtro Selecionado | ✅ Válida | Modalidade existente escolhida ("Presenciais", "Online" ou "Híbridos") | Aceitar / permitir o fluxo. |
| `H02-CE02` | `2` | Tipo de Filtro Selecionado | ❌ Inválida | Nenhum filtro selecionado / enviado em branco | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE03` | `3` | Tipo de Filtro Selecionado | ❌ Inválida | Filtro inexistente ou corrompido informado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE04` | `4` | Exibição do Aluno Híbrido | ✅ Válida | Aluno com sessões de ambos os tipos aparece exclusivamente no filtro "Híbridos" | Aceitar / permitir o fluxo. |
| `H02-CE05` | `5` | Exibição do Aluno Híbrido | ❌ Inválida | Aluno híbrido listado incorretamente no filtro isolado "Presenciais" | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE06` | `6` | Exibição do Aluno Híbrido | ❌ Inválida | Aluno híbrido listado incorretamente no filtro isolado "Online" | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE07` | `7` | Métrica do Gráfico Detalhado | ✅ Válida | Categoria de evolução suportada escolhida ("carga" ou "repetições") | Aceitar / permitir o fluxo. |
| `H02-CE08` | `8` | Métrica do Gráfico Detalhado | ❌ Inválida | Métrica deixada em branco / não selecionada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE09` | `9` | Métrica do Gráfico Detalhado | ❌ Inválida | Métrica inválida ou não suportada solicitada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H02-CE10` | `10` | Configuração de Privacidade | ✅ Válida | Permissão de visualização de dados ativa no perfil do aluno | Aceitar / permitir o fluxo. |
| `H02-CE11` | `11` | Configuração de Privacidade | ❌ Inválida | Privacidade configurada para ocultar dados do Personal | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H02-CT01` | Caso 1 (Sucesso - Fluxo Híbrido) | `H02-CE01`, `H02-CE04`, `H02-CE07`, `H02-CE10` | Filtro: "Híbridos"<br>Aluno: João (1 sessão presencial e 1 online no histórico; Privacidade: Aberta)<br>Métrica: "carga" | Lista apenas alunos híbridos. Ao clicar em João, abre o gráfico das últimas 4 semanas de carga indicando quais sessões foram presenciais e quais foram online. |
| `H02-CT02` | Caso 2 (Falha - Filtro Vazio) | `H02-CE02`, `H02-CE04`, `H02-CE07`, `H02-CE10` | Filtro: "" (Vazio)<br>Aluno: Aluno Padrão<br>Métrica: "carga" | Filtro inválido (O sistema mantém a listagem geral padrão com todos os alunos ou ignora a requisição). |
| `H02-CT03` | Caso 3 (Falha - Filtro Inexistente) | `H02-CE03`, `H02-CE04`, `H02-CE07`, `H02-CE10` | Filtro: "Inexistente"<br>Aluno: Aluno Padrão<br>Métrica: "carga" | Filtro inválido (O sistema trata o erro e não quebra a interface). |
| `H02-CT04` | Caso 4 (Falha - Híbrido no Presencial) | `H02-CE01`, `H02-CE05`, `H02-CE07`, `H02-CE10` | Filtro: "Presenciais"<br>Aluno: João (Híbrido)<br>Métrica: "carga" | Cenário inválido (O aluno João não deve aparecer listado quando este filtro estiver ativo). |
| `H02-CT05` | Caso 5 (Falha - Híbrido no Online) | `H02-CE01`, `H02-CE06`, `H02-CE07`, `H02-CE10` | Filtro: "Online"<br>Aluno: João (Híbrido)<br>Métrica: "carga" | Cenário inválido (O aluno João não deve aparecer listado quando este filtro estiver ativo). |
| `H02-CT06` | Caso 6 (Falha - Métrica Trocada) | `H02-CE01`, `H02-CE04`, `H02-CE08`, `H02-CE10` | Filtro: "Híbridos"<br>Aluno: João (Híbrido)<br>Métrica: "" (Vazia) | Detalhes inválidos (O sistema impede a geração do gráfico e solicita a seleção de uma métrica). |
| `H02-CT07` | Caso 7 (Falha - Métrica Inexistente) | `H02-CE01`, `H02-CE04`, `H02-CE09`, `H02-CE10` | Filtro: "Híbridos"<br>Aluno: João (Híbrido)<br>Métrica: "batimento_cardiaco" | Detalhes inválidos (Sistema exibe mensagem informando que a métrica não é suportada). |
| `H02-CT08` | Caso 8 (Restrição - Privacidade) | `H02-CE01`, `H02-CE04`, `H02-CE07`, `H02-CE11` | Filtro: "Híbridos"<br>Aluno: Carlos (Histórico híbrido; Privacidade: Restrita)<br>Métrica: "repetições" | O aluno aparece na listagem inicial com seu status. Porém, ao clicar nele, o gráfico não é gerado e uma mensagem avisa sobre a restrição de privacidade. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h03-relatorios-automaticos-de-evolucao"></a>
## H03 — Relatórios automáticos de evolução

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H03` → critérios → regras → `H03-CE01` a `H03-CE13` → `H03-CT01` a `H03-CT08`

### 📖 História de Usuário

> H03 - Enquanto personal, desejo gerar relatórios automáticos de evolução para apresentar resultados profissionais aos alunos sem usar planilhas externas.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H03-CA01` | Deve gerar relatórios com dados de evolução (cargas, frequência e desempenho) com 4 opções de período (semana, mês, três meses e um ano). |
| `H03-CA02` | Deve permitir selecionar o aluno para geração do relatório. |
| `H03-CA03` | Deve permitir visualizar o relatório dentro do sistema. |
| `H03-CA04` | Deve permitir exportar o relatório em formato PDF. |
| `H03-CA05` | Deve atualizar automaticamente os dados conforme novos treinos são registrados. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H03-RN01` | Apenas personal trainers podem gerar relatórios. |
| `H03-RN02` | O relatório deve considerar apenas dados já registrados no sistema. |
| `H03-RN03` | O acesso aos relatórios deve ser restrito ao personal e ao aluno relacionado, onde o personal tem a opção de mandar o relatório ao aluno via app. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H03-CE01` | `1` | Perfil de Usuário | ✅ Válida | Usuário logado possui o papel de Personal Trainer | Aceitar / permitir o fluxo. |
| `H03-CE02` | `2` | Perfil de Usuário | ❌ Inválida | Usuário logado possui o papel de Aluno | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE03` | `3` | Perfil de Usuário | ❌ Inválida | Usuário não está autenticado no sistema | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE04` | `4` | Período do Relatório | ✅ Válida | Uma das 4 opções selecionada ("semana", "mês", "três meses" ou "um ano") | Aceitar / permitir o fluxo. |
| `H03-CE05` | `5` | Período do Relatório | ❌ Inválida | Nenhum período selecionado / enviado em branco | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE06` | `6` | Período do Relatório | ❌ Inválida | Período customizado ou fora das opções informado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE07` | `7` | Seleção do Aluno | ✅ Válida | Aluno selecionado é cadastrado e vinculado ao Personal | Aceitar / permitir o fluxo. |
| `H03-CE08` | `8` | Seleção do Aluno | ❌ Inválida | Nenhum aluno foi selecionado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE09` | `9` | Seleção do Aluno | ❌ Inválida | Aluno selecionado pertence a outro Personal Trainer | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE10` | `10` | Histórico de Dados | ✅ Válida | Aluno possui dados de treino/evolução já registrados no sistema | Aceitar / permitir o fluxo. |
| `H03-CE11` | `11` | Histórico de Dados | ❌ Inválida | Aluno cadastrado, mas sem nenhum dado registrado no sistema | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H03-CE12` | `12` | Formato de Exportação | ✅ Válida | Exportação solicitada exclusivamente no formato PDF | Aceitar / permitir o fluxo. |
| `H03-CE13` | `13` | Formato de Exportação | ❌ Inválida | Exportação solicitada em formato não suportado (ex: .xlsx, .csv) | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H03-CT01` | Caso 1 (Sucesso - Fluxo Base) | `H03-CE01`, `H03-CE04`, `H03-CE07`, `H03-CE10`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "mês"<br>Aluno: Rodrigo (Vinculado e com treinos)<br>Ação: Visualizar e exportar PDF | Relatório gerado com sucesso na tela contendo dados de cargas, frequência e desempenho atualizados. Download do arquivo PDF concluído com sucesso. |
| `H03-CT02` | Caso 2 (Falha - Perfil Aluno) | `H03-CE02`, `H03-CE04`, `H03-CE07`, `H03-CE10`, `H03-CE12` | Usuário: Aluno<br>Período: "mês"<br>Aluno: Próprio aluno<br>Ação: Tentar gerar relatório | Acesso negado. O sistema bloqueia a operação informando que apenas personal trainers podem gerar relatórios. |
| `H03-CT03` | Caso 3 (Falha - Período Vazio) | `H03-CE01`, `H03-CE05`, `H03-CE07`, `H03-CE10`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "" (Vazio)<br>Aluno: Rodrigo<br>Ação: Visualizar relatório | Relatório inválido. O sistema impede a geração e solicita a seleção de um período válido. |
| `H03-CT04` | Caso 4 (Falha - Período Inválido) | `H03-CE01`, `H03-CE06`, `H03-CE07`, `H03-CE10`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "2 anos"<br>Aluno: Rodrigo<br>Ação: Visualizar relatório | Relatório inválido. O sistema rejeita o parâmetro e não processa a requisição. |
| `H03-CT05` | Caso 5 (Falha - Sem Aluno) | `H03-CE01`, `H03-CE04`, `H03-CE08`, `H03-CE10`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "semana"<br>Aluno: "" (Não selecionado)<br>Ação: Visualizar relatório | Relatório inválido. O sistema exige a seleção de um aluno antes de prosseguir. |
| `H03-CT06` | Caso 6 (Falha - Vínculo Inválido) | `H03-CE01`, `H03-CE04`, `H03-CE09`, `H03-CE10`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "um ano"<br>Aluno: Carlos (De outro Personal)<br>Ação: Visualizar relatório | Erro de restrição de acesso. O sistema bloqueia a visualização de dados de alunos não relacionados. |
| `H03-CT07` | Caso 7 (Falha - Sem Histórico) | `H03-CE01`, `H03-CE04`, `H03-CE07`, `H03-CE11`, `H03-CE12` | Usuário: Personal Trainer<br>Período: "três meses"<br>Aluno: Marcos (Novo, sem treinos)<br>Ação: Visualizar relatório | Geração interrompida ou relatório em branco. O sistema exibe mensagem informando que não há dados registrados para este aluno. |
| `H03-CT08` | Caso 8 (Falha - Formato Errado) | `H03-CE01`, `H03-CE04`, `H03-CE07`, `H03-CE10`, `H03-CE13` | Usuário: Personal Trainer<br>Período: "mês"<br>Aluno: Rodrigo<br>Ação: Exportar para Planilha (.xlsx) | Exportação rejeitada. O sistema informa que o formato não é suportado e disponibiliza apenas a opção em PDF. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h05-chat-direto-entre-personal-e-aluno"></a>
## H05 — Chat direto entre personal e aluno

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H05` → critérios → regras → `H05-CE01` a `H05-CE05` → `H05-CT01` a `H05-CT04`

### 📖 História de Usuário

> H05 - Como personal, desejo integrar um chat direto no app com o meu respectivo aluno para centralizar a comunicação e evitar a dispersão de informações em redes sociais.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H05-CA01` | O sistema deve permitir o envio de mensagens de texto contendo de 1 a 500 caracteres. |
| `H05-CA02` | O chat só deve transmitir mensagens se o remetente e o destinatário possuírem um vínculo ativo no sistema (Personal-Aluno). |
| `H05-CA03` | O sistema deve exibir uma mensagem de erro caso o texto não atenda às regras de tamanho. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H05-RN01` | (Limite de tamanho) Mensagens totalmente vazias (0 caracteres) ou que excedam 500 caracteres devem ser rejeitadas pelo sistema. |
| `H05-RN02` | (Validação de vínculo) Se o plano do aluno estiver cancelado ou o vínculo com o personal inativo no banco de dados, o envio de novas mensagens deve ser bloqueado. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H05-CE01` | `1` | Comprimento da mensagem | ✅ Válida | Entre 1 e 500 caracteres | Aceitar / permitir o fluxo. |
| `H05-CE02` | `2` | Comprimento da mensagem | ❌ Inválida | Mensagem vazia (0 caracteres) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H05-CE03` | `3` | Comprimento da mensagem | ❌ Inválida | Mais de 500 caracteres | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H05-CE04` | `4` | Vínculo entre os usuários | ✅ Válida | Usuários com vínculo ativo | Aceitar / permitir o fluxo. |
| `H05-CE05` | `5` | Vínculo entre os usuários | ❌ Inválida | Usuários sem vínculo ativo | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H05-CT01` | Caso 1 | `H05-CE01`, `H05-CE04` | Texto: "Sua ficha de treino foi atualizada." | Mensagem enviada com sucesso |
| `H05-CT02` | Caso 2 | `H05-CE02`, `H05-CE04` | Texto: “Erro” | Rejeitar envio e alertar "Mensagem vazia" |
| `H05-CT03` | Caso 3 | `H05-CE03`, `H05-CE04` | Texto: "A" repetido 501 vezes | Rejeitar envio e alertar "Limite excedido" |
| `H05-CT04` | Caso 4 | `H05-CE01`, `H05-CE05` | Texto: "Olá, e esse treino, cola hoje?" | Rejeitar envio e alertar "Vínculo inexistente" |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h06-interface-visual-de-status-dos-alunos"></a>
## H06 — Interface visual de status dos alunos

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H06` → critérios → regras → `H06-CE01` a `H06-CE18` → `H06-CT01` a `H06-CT10`

### 📖 História de Usuário

> H06 - Enquanto personal, desejo uma interface visual baseada em ícones e cores para identificar rapidamente o status de cada aluno.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H06-CA01` | O sistema deve exibir dois status possíveis para cada aluno: Ativo e Inativo |
| `H06-CA02` | Cada status deve ser representado por uma cor e um ícone distintos na lista de alunos |
| `H06-CA03` | O PT deve conseguir identificar o status de um aluno sem precisar abrir o perfil detalhado |
| `H06-CA04` | O PT deve conseguir alterar o status de um aluno diretamente pela interface |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H06-RN01` | Ativo: aluno com mensalidade em dia e frequência registrada nos últimos 30 dias. Representado pela cor verde e ícone de check. |
| `H06-RN02` | Inativo: aluno sem frequência registrada nos últimos 30 dias ou marcado manualmente como inativo pelo PT. Representado pela cor vermelha e ícone de X. |
| `H06-RN03` | Ao alterar o status manualmente, o sistema deve registrar a data da alteração. |
| `H06-RN04` | O status é calculado automaticamente pelo sistema, mas pode ser sobrescrito manualmente pelo PT. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H06-CE01` | `1` | Situação financeira e frequência do aluno | ✅ Válida | Mensalidade em dia e frequência registrada nos últimos 30 dias → Status Ativo | Aceitar / permitir o fluxo. |
| `H06-CE02` | `2` | Situação financeira e frequência do aluno | ❌ Inválida | Mensalidade em atraso | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE03` | `3` | Situação financeira e frequência do aluno | ❌ Inválida | Frequência superior a 30 dias sem registro | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE04` | `4` | Identificação visual do status | ✅ Válida | Status Ativo exibido com cor verde e ícone de check | Aceitar / permitir o fluxo. |
| `H06-CE05` | `5` | Identificação visual do status | ❌ Inválida | Cor diferente da especificada para Ativo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE06` | `6` | Identificação visual do status | ❌ Inválida | Ícone diferente do especificado para Ativo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE07` | `7` | Identificação visual do status | ✅ Válida | Status Inativo exibido com cor vermelha e ícone X | Aceitar / permitir o fluxo. |
| `H06-CE08` | `8` | Identificação visual do status | ❌ Inválida | Cor diferente da especificada para Inativo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE09` | `9` | Identificação visual do status | ❌ Inválida | Ícone diferente do especificado para Inativo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE10` | `10` | Visualização na lista de alunos | ✅ Válida | Status visível diretamente na lista de alunos | Aceitar / permitir o fluxo. |
| `H06-CE11` | `11` | Visualização na lista de alunos | ❌ Inválida | Necessidade de abrir perfil para visualizar status | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE12` | `12` | Visualização na lista de alunos | ❌ Inválida | Status não exibido na lista | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE13` | `13` | Alteração manual de status | ✅ Válida | PT altera status e sistema registra data da alteração | Aceitar / permitir o fluxo. |
| `H06-CE14` | `14` | Alteração manual de status | ❌ Inválida | PT altera status e data não é registrada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE15` | `15` | Alteração manual de status | ❌ Inválida | Alteração não é salva pelo sistema | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE16` | `16` | Sobrescrita do status automático | ✅ Válida | Status automático pode ser alterado manualmente pelo PT | Aceitar / permitir o fluxo. |
| `H06-CE17` | `17` | Sobrescrita do status automático | ❌ Inválida | Sistema impede alteração manual | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H06-CE18` | `18` | Sobrescrita do status automático | ❌ Inválida | Sistema ignora a alteração manual realizada pelo PT | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H06-CT01` | Caso 1 | `H06-CE01`, `H06-CE04`, `H06-CE10` | Mensalidade em dia e frequência registrada nos últimos 30 dias | Status Ativo exibido na lista com cor verde e ícone de check |
| `H06-CT02` | Caso 2 | `H06-CE02`, `H06-CE07`, `H06-CE10` | Mensalidade em atraso | Status Inativo exibido na lista com cor vermelha e ícone X |
| `H06-CT03` | Caso 3 | `H06-CE03`, `H06-CE07`, `H06-CE10` | Frequência superior a 30 dias sem registro | Status Inativo exibido na lista com cor vermelha e ícone X |
| `H06-CT04` | Caso 4 | `H06-CE05`, `H06-CE06` | Aluno ativo apresentado com elementos visuais incorretos | Sistema apresenta inconsistência visual no status Ativo |
| `H06-CT05` | Caso 5 | `H06-CE08`, `H06-CE09` | Aluno inativo apresentado com elementos visuais incorretos | Sistema apresenta inconsistência visual no status Inativo |
| `H06-CT06` | Caso 6 | `H06-CE11`, `H06-CE12` | Visualização inadequada do status na lista de alunos | Requisito de visualização rápida não é atendido |
| `H06-CT07` | Caso 7 | `H06-CE13`, `H06-CE16` | PT altera manualmente o status de um aluno | Status atualizado com sucesso e data da alteração registrada |
| `H06-CT08` | Caso 8 | `H06-CE14`, `H06-CE15` | PT altera manualmente o status de um aluno | Alteração realizada incorretamente (sem registro da data ou não salva) |
| `H06-CT09` | Caso 9 | `H06-CE17`, `H06-CE18` | PT tenta sobrescrever o status automático | Sistema impede ou ignora a alteração manual |
| `H06-CT10` | Caso 10 | `H06-CE01`, `H06-CE04`, `H06-CE10`, `H06-CE13`, `H06-CE16` | PT altera um aluno anteriormente inativo para Ativo | Status atualizado corretamente e alteração registrada |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h07-fluxo-de-primeiros-passos"></a>
## H07 — Fluxo de primeiros passos

> **Perfil principal:** `PT · A · AA`  
> **Rastreabilidade:** `H07` → critérios → regras → `H07-CE01` a `H07-CE04` → `H07-CT01` a `H07-CT03`

### 📖 História de Usuário

> H07 - Como usuário, quero passar por um fluxo de "primeiros passos" (onboarding) ao acessar o sistema pela primeira vez, para aprender a configurá-lo de forma direcionada.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H07-CA01` | O sistema deve detectar o primeiro acesso do usuário e iniciar o fluxo automaticamente. |
| `H07-CA02` | O fluxo de onboarding deve conter exatamente 3 telas explicativas em sequência. |
| `H07-CA03` | O sistema deve fornecer um botão "Pular Tutorial" visível em qualquer uma das etapas. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H07-RN01` | (Controle de acesso) O tutorial só pode ser exibido se a flag primeiro_acesso no banco de dados for igual a true. Assim que finalizado ou pulado, o sistema deve atualizar essa flag para false. |
| `H07-RN02` | (Sequenciamento de telas) As etapas devem seguir estritamente a ordem (1 - Apresentação, 2 - Configuração Inicial, 3 - Conclusão). O usuário não pode acessar uma tela à frente sem interagir com a atual. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H07-CE01` | `6` | Identificação do acesso | ✅ Válida | Flag de primeiro acesso ativa (true) | Aceitar / permitir o fluxo. |
| `H07-CE02` | `7` | Identificação do acesso | ❌ Inválida | Flag de primeiro acesso inativa (false) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H07-CE03` | `8` | Sequência de navegação | ✅ Válida | Seguir a ordem numérica exata (1 → 2 → 3) | Aceitar / permitir o fluxo. |
| `H07-CE04` | `9` | Sequência de navegação | ❌ Inválida | Tentar pular para uma tela fora de ordem | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H07-CT01` | Caso 1 | `H07-CE01`, `H07-CE03` | Flag: true<br>Navegação: Tela 1 para Tela 2 | Onboarding iniciado e avanço autorizado |
| `H07-CT02` | Caso 2 | `H07-CE02`, `H07-CE03` | Flag: false<br>Navegação: Redirecionar para o onboarding | Bloquear o onboarding e carregar a Home direta |
| `H07-CT03` | Caso 3 | `H07-CE01`, `H07-CE04` | Flag: true<br>Navegação: Tentar abrir Tela 3 a partir da Tela 1 | Bloquear avanço e reter o usuário na Tela 1 |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h08-atalhos-de-teclado"></a>
## H08 — Atalhos de teclado

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H08` → critérios → regras → `H08-CE01` a `H08-CE05` → `H08-CT01` a `H08-CT04`

### 📖 História de Usuário

> H08 - Enquanto personal, desejo utilizar atalhos de teclado na versão desktop para agilizar a montagem de cronogramas semanais de treino.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H08-CA01` | O sistema desktop deve aceitar combinações de teclas para as funções principais de salvar e criar treinos. |
| `H08-CA02` | O sistema deve ignorar comandos quando o usuário estiver digitando dentro de campos de texto (inputs). |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H08-RN01` | (Mapeamento de teclas) O comando Ctrl + S deve disparar a ação de salvar. O comando Ctrl + N deve disparar a criação de um novo cronograma. |
| `H08-RN02` | (Isolamento de foco) Se o elemento ativo do DOM for um campo de entrada de texto, a captura global do teclado deve ser suspensa para evitar que o atalho seja disparado acidentalmente. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H08-CE01` | `10` | Combinação de teclas pressionada | ✅ Válida | Pressionar Ctrl + S ou Ctrl + N | Aceitar / permitir o fluxo. |
| `H08-CE02` | `11` | Combinação de teclas pressionada | ❌ Inválida | Pressionar apenas S ou N (sem Ctrl) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H08-CE03` | `12` | Combinação de teclas pressionada | ❌ Inválida | Teclas sem comando associado (ex: Ctrl + J) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H08-CE04` | `13` | Foco do ponteiro/cursor do sistema | ✅ Válida | Foco fora de campos de texto editáveis | Aceitar / permitir o fluxo. |
| `H08-CE05` | `14` | Foco do ponteiro/cursor do sistema | ❌ Inválida | Foco dentro de um input de texto ativo | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H08-CT01` | Caso 1 | `H08-CE01`, `H08-CE04` | Teclas: Ctrl + S<br>Foco: Clicado na área cinza do painel | Ação executada: Cronograma salvo com sucesso |
| `H08-CT02` | Caso 2 | `H08-CE02`, `H08-CE04` | Teclas: S<br>Foco: Clicado na área cinza do painel | Nenhuma ação é executada |
| `H08-CT03` | Caso 3 | `H08-CE03`, `H08-CE04` | Teclas: Ctrl + J<br>Foco: Clicado na área cinza do painel | Nenhuma ação é executada |
| `H08-CT04` | Caso 4 | `H08-CE01`, `H08-CE05` | Teclas: Ctrl + S<br>Foco: Cursor piscando no input "Nome do Exercício" | Atalho ignorado; caractere ou comando inserido apenas no input |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h09-alertas-de-faltas-do-aluno"></a>
## H09 — Alertas de faltas do aluno

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H09` → critérios → regras → `H09-CE01` a `H09-CE03` → `H09-CT01` a `H09-CT03`

### 📖 História de Usuário

> H09 - Enquanto personal, desejo receber alertas no painel quando um aluno faltar a muitos treinos seguidos, para intervir antes de uma possível evasão.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H09-CA01` | O sistema deve exibir um aviso em destaque no painel do personal indicando quais alunos atingiram o limite de ausência. |
| `H09-CA02` | O limite de faltas deve ser parametrizável ou fixado por regra de negócio. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H09-RN01` | (Gatilho de evasão) O sistema deve disparar o alerta de forma automatizada assim que o número de dias seguidos sem check-in em treinos for estritamente maior que 14 dias (duas semanas). |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H09-CE01` | `15` | Quantidade de dias consecutivos sem check-in | ✅ Válida | Número inteiro maior que 14 (Ex: 15) | Aceitar / permitir o fluxo. |
| `H09-CE02` | `16` | Quantidade de dias consecutivos sem check-in | ❌ Inválida | Número de dias entre 0 e 14 | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H09-CE03` | `17` | Quantidade de dias consecutivos sem check-in | ❌ Inválida | Número negativo de dias | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H09-CT01` | Caso 1 | `H09-CE01` | Dias consecutivos: 15 | Alerta gerado: Aluno listado em "Risco de Evasão" |
| `H09-CT02` | Caso 2 | `H09-CE02` | Dias consecutivos: 10 | Nenhum alerta é emitido para este aluno |
| `H09-CT03` | Caso 3 | `H09-CE03` | Dias consecutivos: -5 | O sistema ignora a entrada e registra um erro de log |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h10-videos-explicativos-dos-exercicios"></a>
## H10 — Vídeos explicativos dos exercícios

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H10` → critérios → regras → `H10-CE01` a `H10-CE09` → `H10-CT01` a `H10-CT06`

### 📖 História de Usuário

> H10 - Enquanto aluna, desejo acessar vídeos curtos explicativos de cada exercício para garantir a execução correta sem depender do personal.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H10-CA01` | Cada exercício na lista de treino deve exibir um ícone de vídeo ou miniatura clicável. |
| `H10-CA02` | Os vídeos devem ter curta duração (15 a 30 segundos), priorizando o carregamento rápido e foco na técnica. |
| `H10-CA03` | O vídeo deve ser reproduzido em loop automaticamente enquanto a tela de detalhes do exercício estiver aberta. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H10-RN01` | Uma vez que o aluno inicie o "Modo Treino", o aplicativo deve realizar o pré-carregamento dos vídeos dos exercícios daquele dia. Se o vídeo já foi assistido anteriormente, o sistema deve priorizar a execução do arquivo armazenado em cache no dispositivo em vez de realizar um novo download. |
| `H10-RN02` | O sistema não deve permitir que um Personal Trainer publique um treino para o aluno se o exercício selecionado não possuir um vídeo correspondente ou uma imagem técnica alternativa, garantindo que a proposta de "autonomia sem o personal" seja cumprida. |
| `H10-RN03` | O servidor de streaming deve identificar o tipo de conexão do usuário. Se detectada conexão móvel, a resolução do vídeo deve ser ajustada automaticamente para o patamar mínimo aceitável para garantir a fluidez sem travar a execução do treino. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H10-CE01` | `1` | Mídia do Exercício (Publicação) | ✅ Válida | Exercício possui vídeo de curta duração (15 a 30s) ou imagem técnica | Aceitar / permitir o fluxo. |
| `H10-CE02` | `2` | Mídia do Exercício (Publicação) | ❌ Inválida | Exercício sem nenhuma mídia associada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H10-CE03` | `3` | Mídia do Exercício (Publicação) | ❌ Inválida | Exercício com vídeo fora do tempo padrão (ex: mais de 30s) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H10-CE04` | `4` | Estado do Cache (Modo Treino) | ✅ Válida | Arquivo de vídeo já assistido antes e armazenado localmente | Aceitar / permitir o fluxo. |
| `H10-CE05` | `5` | Estado do Cache (Modo Treino) | ❌ Inválida | Vídeo inédito (não está gravado no cache do dispositivo) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H10-CE06` | `6` | Tipo de Conexão à Internet | ✅ Válida | Tipo de rede identificado com sucesso (Móvel ou Wi-Fi) | Aceitar / permitir o fluxo. |
| `H10-CE07` | `7` | Tipo de Conexão à Internet | ❌ Inválida | Falha do sistema ao identificar o tipo de conexão ativa | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H10-CE08` | `8` | Controle de Loop da Interface | ✅ Válida | Vídeo reinicia automaticamente enquanto a tela de detalhes está aberta | Aceitar / permitir o fluxo. |
| `H10-CE09` | `9` | Controle de Loop da Interface | ❌ Inválida | Vídeo para de tocar sozinho após a primeira execução | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H10-CT01` | Caso 1 | `H10-CE01`, `H10-CE04`, `H10-CE06`, `H10-CE08` | Mídia: Vídeo de 20s cadastrado<br>Cache: Vídeo já assistido<br>Conexão: Rede Móvel detectada<br>Interface: Tela de detalhes aberta | Vídeo é carregado instantaneamente do cache local (sem novo download) e reproduzido em loop automático na resolução mínima aceitável. |
| `H10-CT02` | Caso 2 | `H10-CE02`, `H10-CE04`, `H10-CE06`, `H10-CE08` | Mídia: Exercício sem vídeo ou imagem<br>Cache: N/A<br>Conexão: Wi-Fi | Treino inválido. O sistema impede o Personal Trainer de publicar o treino e bloqueia a ação. |
| `H10-CT03` | Caso 3 | `H10-CE03`, `H10-CE04`, `H10-CE06`, `H10-CE08` | Mídia: Vídeo longo (60 segundos)<br>Cache: N/A<br>Conexão: Wi-Fi | Treino inválido. O sistema recusa o upload do vídeo por violar a regra de tempo (máximo de 30s). |
| `H10-CT04` | Caso 4 | `H10-CE01`, `H10-CE05`, `H10-CE06`, `H10-CE08` | Mídia: Vídeo de 15s cadastrado<br>Cache: Vídeo inédito (sem cache)<br>Conexão: Wi-Fi | O sistema faz o pré-carregamento por download no início do "Modo Treino" e exibe o vídeo normalmente. |
| `H10-CT05` | Caso 5 | `H10-CE01`, `H10-CE04`, `H10-CE07`, `H10-CE08` | Mídia: Vídeo de 25s cadastrado<br>Cache: Vídeo já assistido<br>Conexão: Indefinida (Erro de detecção) | Streaming inválido. Na falta de identificação da rede, o sistema adota a resolução mínima por segurança. |
| `H10-CT06` | Caso 6 | `H10-CE01`, `H10-CE04`, `H10-CE06`, `H10-CE09` | Mídia: Vídeo de 20s cadastrado<br>Cache: Vídeo já assistido<br>Conexão: Wi-Fi<br>Interface: Tela aberta | Interface inválida. O vídeo encerra após 20 segundos e não reinicia (o teste falha ao quebrar a regra do loop). |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h11-registro-de-cargas-e-repeticoes"></a>
## H11 — Registro de cargas e repetições

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H11` → critérios → regras → `H11-CE01` a `H11-CE10` → `H11-CT01` a `H11-CT07`

### 📖 História de Usuário

> H11 - Enquanto aluna, desejo registrar cargas e repetições realizadas para que meu personal ajuste o treino com base no meu desempenho real.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H11-CA01` | A interface de treino deve exibir um campo de entrada numérica para "Peso (kg)" e outro para "Repetições" logo abaixo do nome do exercício. |
| `H11-CA02` | O sistema deve exibir a carga utilizada na última sessão daquele mesmo exercício como referência para a aluna. |
| `H11-CA03` | Deve haver um botão "Concluir Série", visível enquanto houver séries restantes do exercício atual. Ao ser clicado, salva os dados da série e limpa os campos para a aluna inserir os dados da próxima série do mesmo exercício. |
| `H11-CA04` | Quando a última série planejada do exercício for confirmada, o botão deve mudar para "Próximo Exercício", indicando que o sistema avançará para o exercício seguinte da ficha. |
| `H11-CA05` | O sistema deve exibir um contador visível do tipo "Série 2 de 4" para que a aluna saiba em que ponto da sequência está. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H11-RN01` | O registro deve ser obrigatório para a conclusão de cada exercício do treino do dia. |
| `H11-RN02` | O sistema deve permitir que o usuário altere a carga sugerida pelo personal caso a execução real seja diferente da planejada. |
| `H11-RN03` | Cada entrada de dado deve ser salva com um registro de data e hora (timestamp). |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H11-CE01` | `1` | Campo "Peso (kg)" | ✅ Válida | Número real maior do que zero | Aceitar / permitir o fluxo. |
| `H11-CE02` | `2` | Campo "Peso (kg)" | ❌ Inválida | Campo deixado em branco / vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H11-CE03` | `3` | Campo "Peso (kg)" | ❌ Inválida | Valor negativo ou caracteres de texto | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H11-CE04` | `4` | Campo "Repetições" | ✅ Válida | Número inteiro maior do que zero | Aceitar / permitir o fluxo. |
| `H11-CE05` | `5` | Campo "Repetições" | ❌ Inválida | Campo deixado em branco / vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H11-CE06` | `6` | Campo "Repetições" | ❌ Inválida | Valor decimal, negativo ou texto | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H11-CE07` | `7` | Contador de Séries | ✅ Válida | Série atual menor ou igual ao total planejado (ex: Série 2 de 4) | Aceitar / permitir o fluxo. |
| `H11-CE08` | `8` | Contador de Séries | ❌ Inválida | Série atual tenta registrar acima do total planejado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H11-CE09` | `9` | Obrigatoriedade de Registro | ✅ Válida | Todas as séries planejadas preenchidas e salvas antes de avançar | Aceitar / permitir o fluxo. |
| `H11-CE10` | `10` | Obrigatoriedade de Registro | ❌ Inválida | Tentativa de avançar de exercício pulando séries obrigatórias | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H11-CT01` | Caso 1 (Sucesso - Série Inicial) | `H11-CE01`, `H11-CE04`, `H11-CE07`, `H11-CE09` | Peso: 14<br>Repetições: 10<br>Contador: Série 1 de 3<br>Ação: Clicar em "Concluir Série" | Dados salvos com data e hora (timestamp). Os campos são limpos para a próxima entrada e o contador muda para "Série 2 de 3". O botão continua "Concluir Série". |
| `H11-CT02` | Caso 2 (Falha - Peso Vazio) | `H11-CE02`, `H11-CE04`, `H11-CE07`, `H11-CE09` | Peso: "" (Vazio)<br>Repetições: 12<br>Contador: Série 1 de 3 | Registro rejeitado. O sistema impede o salvamento por falta de preenchimento do peso. |
| `H11-CT03` | Caso 3 (Falha - Peso Inválido) | `H11-CE03`, `H11-CE04`, `H11-CE07`, `H11-CE09` | Peso: "-10" ou "dez"<br>Repetições: 12<br>Contador: Série 1 de 3 | Registro rejeitado. O sistema impede o salvamento por formato de dado inválido. |
| `H11-CT04` | Caso 4 (Falha - Repetições Vazias) | `H11-CE01`, `H11-CE05`, `H11-CE07`, `H11-CE09` | Peso: 20<br>Repetições: "" (Vazio)<br>Contador: Série 2 de 4 | Registro rejeitado. O sistema exige que o número de repetições seja informado. |
| `H11-CT05` | Caso 5 (Falha - Repetições Inválidas) | `H11-CE01`, `H11-CE06`, `H11-CE07`, `H11-CE09` | Peso: 20<br>Repetições: "10.5" ou "muitas"<br>Contador: Série 2 de 4 | Registro rejeitado. O campo aceita apenas números inteiros estritamente positivos. |
| `H11-CT06` | Caso 6 (Sucesso - Mudança de Botão) | `H11-CE01`, `H11-CE04`, `H11-CE07`, `H11-CE09` | Peso: 16<br>Repetições: 8<br>Contador: Série 3 de 3 (Última)<br>Ação: Confirmar última série | Dados salvos com sucesso (timestamp). Como a última série planejada foi atingida, o texto do botão muda automaticamente para "Próximo Exercício". |
| `H11-CT07` | Caso 7 (Falha - Forçar Próximo) | `H11-CE01`, `H11-CE04`, `H11-CE07`, `H11-CE10` | Peso: 12<br>Repetições: 10<br>Contador: Série 1 de 3<br>Ação: Tentar pular exercício | O sistema bloqueia a ação. O botão "Próximo Exercício" não fica disponível enquanto houver séries obrigatórias restantes na sequência. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h12-lembretes-de-treino-para-o-personal"></a>
## H12 — Lembretes de treino para o personal

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H12` → critérios → regras → `H12-CE01` a `H12-CE03` → `H12-CT01` a `H12-CT03`

### 📖 História de Usuário

> H12 - Como personal, quero receber notificações de lembrete de treino dos alunos do dia, para organizar meus horários de acompanhamento na academia.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H12-CA01` | O sistema deve enviar um lembrete contendo o resumo da agenda de alunos do dia corrente. |
| `H12-CA02` | O lembrete deve ser gerado e enviado em um horário fixo programado de forma antecipada. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H12-RN01` | (Disparo por horário) A rotina de notificações deve ser disparada de maneira diária, exatamente às 06:00 (fuso local), varrendo a base em busca de agendamentos para a data. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H12-CE01` | `18` | Horário do sistema para disparo | ✅ Válida | Horário idêntico a 06:00 | Aceitar / permitir o fluxo. |
| `H12-CE02` | `19` | Horário do sistema para disparo | ❌ Inválida | Horários antes de 06:00 (ex: 05:59) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H12-CE03` | `20` | Horário do sistema para disparo | ❌ Inválida | Horários depois de 06:00 (ex: 06:01) | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H12-CT01` | Caso 1 | `H12-CE01` | Hora do servidor: 06:00 | Rotina executa e envia as notificações de agenda do dia |
| `H12-CT02` | Caso 2 | `H12-CE02` | Hora do servidor: 05:59 | Nenhuma notificação de lembrete é disparada |
| `H12-CT03` | Caso 3 | `H12-CE03` | Hora do servidor: 06:01 | Nenhuma ação é tomada (já foi enviada ou aguarda próximo dia) |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h13-graficos-de-evolucao-fisica"></a>
## H13 — Gráficos de evolução física

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H13` → critérios → regras → `H13-CE01` a `H13-CE07` → `H13-CT01` a `H13-CT07`

### 📖 História de Usuário

> H13 - Enquanto aluna, desejo visualizar gráficos de evolução física para me manter motivada ao ver meus resultados ao longo do tempo.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H13-CA01` | Dado que existam registros históricos de peso corporal, quando a aluna acessar a área de evolução física, então o sistema deverá exibir um gráfico de evolução do peso ao longo do tempo. |
| `H13-CA02` | Dado que existam registros históricos de percentual de gordura corporal, quando a aluna acessar a área de evolução física, então o sistema deverá exibir um gráfico correspondente. |
| `H13-CA03` | Dado que existam medidas corporais registradas, quando a aluna selecionar uma medida específica, então o sistema deverá exibir sua evolução histórica. |
| `H13-CA04` | Dado que não existam dados suficientes para uma métrica, quando a aluna tentar visualizar o gráfico correspondente, então o sistema deverá informar a indisponibilidade de dados. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H13-RN01` | O sistema deverá apresentar gráficos de evolução física com base nos registros realizados pela aluna. |
| `H13-RN02` | Os gráficos poderão utilizar as seguintes métricas cadastradas no sistema: Peso corporal; Percentual de gordura corporal; Medidas corporais registradas (ex.: cintura, braço, quadril e similares). |
| `H13-RN03` | Cada métrica deverá possuir histórico próprio para acompanhamento ao longo do tempo. |
| `H13-RN04` | O dados exibidos deverão considerar apenas informações registradas pela própria aluna ou por profissional autorizado no sistema. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H13-CE01` | `1` | Métrica Selecionada | ✅ Válida | Tipo de métrica suportada ("Peso corporal", "Percentual de gordura" ou "Medidas corporais") | Aceitar / permitir o fluxo. |
| `H13-CE02` | `2` | Métrica Selecionada | ❌ Inválida | Nenhuma métrica selecionada / campo em branco | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H13-CE03` | `3` | Métrica Selecionada | ❌ Inválida | Métrica não suportada ou inválida informada (ex.: "Altura") | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H13-CE04` | `4` | Quantidade de Dados | ✅ Válida | Histórico com dados suficientes registrados para a métrica escolhida | Aceitar / permitir o fluxo. |
| `H13-CE05` | `5` | Quantidade de Dados | ❌ Inválida | Dados insuficientes ou nenhum registro histórico na métrica | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H13-CE06` | `6` | Origem do Registro | ✅ Válida | Dados cadastrados pela própria aluna ou por profissional autorizado | Aceitar / permitir o fluxo. |
| `H13-CE07` | `7` | Origem do Registro | ❌ Inválida | Dados inseridos por usuários não autorizados no sistema | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H13-CT01` | Caso 1 (Sucesso - Peso) | `H13-CE01`, `H13-CE04`, `H13-CE06` | Métrica: "Peso corporal"<br>Histórico: 3 registros válidos<br>Origem: Registrado pela aluna | Exibe com sucesso o gráfico de evolução do peso corporal ao longo do tempo. |
| `H13-CT02` | Caso 2 (Sucesso - Gordura) | `H13-CE01`, `H13-CE04`, `H13-CE06` | Métrica: "Percentual de gordura"<br>Histórico: 2 registros válidos<br>Origem: Registrado pelo personal autorizado | Exibe com sucesso o gráfico de evolução do percentual de gordura ao longo do tempo. |
| `H13-CT03` | Caso 3 (Sucesso - Medida) | `H13-CE01`, `H13-CE04`, `H13-CE06` | Métrica: "Medidas corporais" (Cintura)<br>Histórico: 4 registros válidos<br>Origem: Registrado pela aluna | Exibe com sucesso o gráfico de evolução histórica específico da medida da cintura. |
| `H13-CT04` | Caso 4 (Falha - Métrica Vazia) | `H13-CE02`, `H13-CE04`, `H13-CE06` | Métrica: "" (Vazio)<br>Histórico: Registros existentes<br>Origem: Registrado pela aluna | Gráfico inválido. O sistema impede a renderização e solicita a seleção de uma métrica. |
| `H13-CT05` | Caso 5 (Falha - Não Suportada) | `H13-CE03`, `H13-CE04`, `H13-CE06` | Métrica: "Frequência Cardíaca"<br>Histórico: Registros existentes<br>Origem: Registrado pela aluna | Gráfico inválido. O sistema rejeita a consulta informando que a métrica não é suportada para a evolução física. |
| `H13-CT06` | Caso 6 (Aviso - Sem Dados) | `H13-CE01`, `H13-CE05`, `H13-CE06` | Métrica: "Percentual de gordura"<br>Histórico: 0 registros cadastrados<br>Origem: N/A | Operação interrompida. O sistema exibe uma mensagem clara informando a indisponibilidade de dados para a métrica. |
| `H13-CT07` | Caso 7 (Falha - Sem Autorização) | `H13-CE01`, `H13-CE04`, `H13-CE07` | Métrica: "Peso corporal"<br>Histórico: 2 registros na base<br>Origem: Usuário não autorizado | Os dados de origem não autorizada são desconsiderados e omitidos pelo sistema, não alimentando o gráfico da aluna. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h16-suporte-a-leitores-de-tela"></a>
## H16 — Suporte a leitores de tela

> **Perfil principal:** `AA`  
> **Rastreabilidade:** `H16` → critérios → regras → `H16-CE01` a `H16-CE09` → `H16-CT01` a `H16-CT06`

### 📖 História de Usuário

> H16 - Enquanto usuário com baixa visão, desejo suporte total a leitores de tela para navegar nos menus de treino com autonomia.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H16-CA01` | Deve ser compatível com leitores de tela do sistema. |
| `H16-CA02` | Deve descrever corretamente botões e ações. |
| `H16-CA03` | Deve permitir navegação completa sem uso visual. Deve fornecer feedback sonoro das ações. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H16-RN01` | A funcionalidade depende da ativação do leitor de tela no dispositivo. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H16-CE01` | `1` | Estado do Leitor de Tela | ✅ Válida | Ativado nas configurações globais do dispositivo | Aceitar / permitir o fluxo. |
| `H16-CE02` | `2` | Estado do Leitor de Tela | ❌ Inválida | Desativado no sistema operacional do dispositivo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H16-CE03` | `3` | Rótulos dos Elementos (Labels) | ✅ Válida | Todos os botões e ações possuem descrição textual correta | Aceitar / permitir o fluxo. |
| `H16-CE04` | `4` | Rótulos dos Elementos (Labels) | ❌ Inválida | Botão ou ação sem descrição (leitor anuncia apenas "botão") | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H16-CE05` | `5` | Rótulos dos Elementos (Labels) | ❌ Inválida | Descrição incorreta ou incoerente com a ação do elemento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H16-CE06` | `6` | Ordem de Foco (Navegação) | ✅ Válida | Sequência lógica que permite alcançar 100% dos menus sem visão | Aceitar / permitir o fluxo. |
| `H16-CE07` | `7` | Ordem de Foco (Navegação) | ❌ Inválida | Elemento importante ignorado pelo foco ou travado em loop | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H16-CE08` | `8` | Feedback de Confirmação | ✅ Válida | Retorno sonoro/vocal imediato após qualquer ação concluída | Aceitar / permitir o fluxo. |
| `H16-CE09` | `9` | Feedback de Confirmação | ❌ Inválida | Ação executada sem nenhum aviso audível (apenas visual) | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H16-CT01` | Caso 1 (Sucesso - Fluxo Base) | `H16-CE01`, `H16-CE03`, `H16-CE06`, `H16-CE08` | Leitor de tela: Ativado<br>Interface: Menu de treinos com rótulos OK<br>Ação: Navegar sequencialmente e acionar botões | O usuário navega por todos os menus por meio de gestos/teclado, ouve as descrições corretas e recebe feedback sonoro a cada ação. |
| `H16-CT02` | Caso 2 (Restrição - Leitor Inativo) | `H16-CE02`, `H16-CE03`, `H16-CE06`, `H16-CE08` | Leitor de tela: Desativado<br>Interface: Menu de treinos | O aplicativo funciona normalmente por navegação puramente visual, sem disparar recursos de acessibilidade por voz. |
| `H16-CT03` | Caso 3 (Falha - Sem Rótulo) | `H16-CE01`, `H16-CE04`, `H16-CE06`, `H16-CE08` | Leitor de tela: Ativado<br>Interface: Botão "Iniciar Treino" sem propriedade de acessibilidade | Interface inválida. O leitor anuncia apenas "botão" ou "elemento gráfico", impossibilitando a autonomia do usuário. |
| `H16-CT04` | Caso 4 (Falha - Rótulo Errado) | `H16-CE01`, `H16-CE05`, `H16-CE06`, `H16-CE08` | Leitor de tela: Ativado<br>Interface: Botão "Avançar Exercício" rotulado como "Excluir" | Interface inválida. O sistema induz o usuário ao erro por fornecer uma descrição incorreta da ação. |
| `H16-CT05` | Caso 5 (Falha - Foco Incompleto) | `H16-CE01`, `H16-CE03`, `H16-CE07`, `H16-CE08` | Leitor de tela: Ativado<br>Interface: O foco ignora o botão de "Ver Gráfico de Evolução" | Navegação inválida. O usuário não consegue acessar a funcionalidade porque o leitor de tela pula o elemento na ordem de leitura. |
| `H16-CT06` | Caso 6 (Falha - Sem Som) | `H16-CE01`, `H16-CE03`, `H16-CE06`, `H16-CE09` | Leitor de tela: Ativado<br>Interface: Clique em "Concluir Série"<br>Feedback: Apenas visual na tela | Feedback inválido. A série é salva no sistema, mas a falta de aviso sonoro deixa o usuário sem saber se a operação funcionou. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h17-alto-contraste-e-fontes-escalaveis"></a>
## H17 — Alto contraste e fontes escaláveis

> **Perfil principal:** `AA`  
> **Rastreabilidade:** `H17` → critérios → regras → `H17-CE01` a `H17-CE11` → `H17-CT01` a `H17-CT07`

### 📖 História de Usuário

> H17 - Enquanto usuário com baixa visão, desejo configurações de alto contraste e fontes escaláveis para facilitar a leitura das instruções de treino.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H17-CA01` | O usuário deve encontrar no menu de configurações uma opção de "Acessibilidade" com um seletor para ativar o "Modo de Alto Contraste". |
| `H17-CA02` | Ao ativar o modo, a interface deve mudar instantaneamente para fundo preto (#000000) com textos em amarelo (#FFD600) — cor fixa definida pelo time, sem opção de escolha pelo usuário nesta versão. |
| `H17-CA03` | O sistema deve permitir aumentar o tamanho da fonte das instruções de treino em até 200% através de um seletor deslizante (slider). |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H17-RN01` | O modo de alto contraste deve priorizar combinações de cores que facilitem a leitura para quem possui sensibilidade visual reduzida. |
| `H17-RN02` | O redimensionamento de fontes deve ser aplicado a todos os textos instrucionais e nomes de exercícios. Caso o texto não couber no espaço disponível após o redimensionamento, o sistema deve aplicar quebra de linha (wrap); não deve haver corte de texto (ellipsis) nem rolagem horizontal nos textos instrucionais. |
| `H17-RN03` | A configuração escolhida deve ser persistente, permanecendo ativa sempre que o usuário fizer login no app. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H17-CE01` | `1` | Cores do Alto Contraste | ✅ Válida | Interface muda para fundo preto (#000000) e textos em amarelo (#FFD600) | Aceitar / permitir o fluxo. |
| `H17-CE02` | `2` | Cores do Alto Contraste | ❌ Inválida | Ativação não altera as cores originais da tela | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE03` | `3` | Cores do Alto Contraste | ❌ Inválida | Interface aplica cores incorretas ou diferentes do padrão fixado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE04` | `4` | Tamanho da Fonte (Slider) | ✅ Válida | Ajuste de escala selecionado entre 100% e 200% | Aceitar / permitir o fluxo. |
| `H17-CE05` | `5` | Tamanho da Fonte (Slider) | ❌ Inválida | Valor de escala abaixo do mínimo de 100% | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE06` | `6` | Tamanho da Fonte (Slider) | ❌ Inválida | Valor de escala acima do teto de 200% | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE07` | `7` | Comportamento do Texto Expandido | ✅ Válida | Texto sofre quebra de linha automática (wrap) para caber na tela | Aceitar / permitir o fluxo. |
| `H17-CE08` | `8` | Comportamento do Texto Expandido | ❌ Inválida | Texto longo é cortado com reticências (ellipsis) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE09` | `9` | Comportamento do Texto Expandido | ❌ Inválida | Interface gera barra de rolagem horizontal para exibir o texto | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H17-CE10` | `10` | Persistência das Configurações | ✅ Válida | Preferências de acessibilidade continuam ativas após um novo login | Aceitar / permitir o fluxo. |
| `H17-CE11` | `11` | Persistência das Configurações | ❌ Inválida | Configurações são resetadas para o padrão de fábrica após o logout | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H17-CT01` | Caso 1 (Sucesso - Fluxo Base) | `H17-CE01`, `H17-CE04`, `H17-CE07`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 150%<br>Instrução: Texto longo de treino<br>Ação: Fazer logout e login | A interface muda instantaneamente para preto e amarelo. O texto é ampliado, sofre quebra de linha sem barras horizontais e as configurações são mantidas após o novo login. |
| `H17-CT02` | Caso 2 (Falha - Cores Erradas) | `H17-CE03`, `H17-CE04`, `H17-CE07`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 100% | Cenário inválido. O sistema aplica cores fora do padrão definido pelo time (ex: fundo cinza), falhando no critério de aceitação. |
| `H17-CT03` | Caso 3 (Falha - Escala Mínima) | `H17-CE01`, `H17-CE05`, `H17-CE07`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 50% (Forçado) | Cenário inválido. O sistema recusa o valor abaixo do limite e mantém a fonte no patamar mínimo de 100%. |
| `H17-CT04` | Caso 4 (Falha - Escala Máxima) | `H17-CE01`, `H17-CE06`, `H17-CE07`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 250% (Forçado) | Cenário inválido. O sistema barra o excesso e limita o tamanho final estritamente em 200%. |
| `H17-CT05` | Caso 5 (Falha - Texto Cortado) | `H17-CE01`, `H17-CE04`, `H17-CE08`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 200%<br>Instrução: "Realizar três séries..." | Comportamento inválido. O nome do exercício ou instrução é cortado por falta de espaço (ex: "Realizar três sé..."), violando a regra de negócio. |
| `H17-CT06` | Caso 6 (Falha - Rolagem Horizontal) | `H17-CE01`, `H17-CE04`, `H17-CE09`, `H17-CE10` | Alto Contraste: Ativado<br>Escala da Fonte: 200%<br>Instrução: Texto longo de treino | Comportamento inválido. O texto expandido força a criação de uma barra de rolagem lateral para ser lido por inteiro. |
| `H17-CT07` | Caso 7 (Falha - Sem Persistência) | `H17-CE01`, `H17-CE04`, `H17-CE07`, `H17-CE11` | Alto Contraste: Ativado<br>Escala da Fonte: 180%<br>Ação: Deslogar e logar de novo | Estado inválido. O aplicativo retorna com o tema claro e fonte 100%, esquecendo as escolhas do usuário com baixa visão. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h18-comandos-de-voz-para-cronometro-de-descanso"></a>
## H18 — Comandos de voz para cronômetro de descanso

> **Perfil principal:** `AA`  
> **Rastreabilidade:** `H18` → critérios → regras → `H18-CE01` a `H18-CE07` → `H18-CT01` a `H18-CT07`

### 📖 História de Usuário

> H18 - Enquanto usuário com baixa visão, desejo comandos de voz para iniciar e pausar o cronômetro de descanso para manter o foco no exercício físico.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H18-CA01` | Na tela de descanso, o sistema deve reconhecer o comando de voz "Iniciar descanso" e começar a contagem regressiva automaticamente. |
| `H18-CA02` | O usuário deve conseguir pausar a contagem dizendo "Pausar cronômetro". |
| `H18-CA03` | O usuário deve conseguir retomar a contagem a partir do ponto em que foi pausada dizendo "Retomar cronômetro". |
| `H18-CA04` | Caso o comando de voz não seja reconhecido, o app deve responder com o áudio "Não entendi, repita o comando" e oferecer um botão visual de fallback para pausar/retomar/iniciar manualmente. |
| `H18-CA05` | Ao chegar a zero, o aplicativo deve anunciar por voz: "Fim do descanso. Próxima série disponível". |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H18-RN01` | O sistema de reconhecimento de voz deve ser implementado de forma nativa no aplicativo, utilizando as bibliotecas de Speech-to-Text disponíveis para React Native, garantindo funcionamento equivalente em iOS e Android, sem depender de assistentes virtuais de terceiros (Google Assistant, Siri ou similares). |
| `H18-RN02` | O intervalo de descanso deve ser configurado previamente pelo personal trainer no momento da criação do treino. |
| `H18-RN03` | O app deve emitir um feedback sonoro obrigatório ao final da contagem para que o usuário não precise olhar para a tela. |
| `H18-RN04` | Caso o sistema não reconheça o comando de voz após 2 tentativas consecutivas (ruído ambiente, fala incompreensível, etc.), deve emitir o feedback sonoro "Não entendi, repita o comando" e exibir um botão de fallback na tela para controle manual do cronômetro. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H18-CE01` | `1` | Comando de Voz Falado | ✅ Válida | Comando exato e reconhecido ("Iniciar descanso", "Pausar cronômetro" ou "Retomar cronômetro") | Aceitar / permitir o fluxo. |
| `H18-CE02` | `2` | Comando de Voz Falado | ❌ Inválida | Comando não reconhecido ou ruído na primeira tentativa | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H18-CE03` | `3` | Comando de Voz Falado | ❌ Inválida | Comando não reconhecido por duas vezes consecutivas | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H18-CE04` | `4` | Intervalo de Descanso | ✅ Válida | Tempo de intervalo previamente configurado pelo Personal Trainer | Aceitar / permitir o fluxo. |
| `H18-CE05` | `5` | Intervalo de Descanso | ❌ Inválida | Treino carregado sem tempo de descanso configurado (nulo/zerado) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H18-CE06` | `6` | Término da Contagem | ✅ Válida | Cronômetro atinge o tempo zero | Aceitar / permitir o fluxo. |
| `H18-CE07` | `7` | Término da Contagem | ❌ Inválida | Cronômetro trava ou encerra antes de chegar a zero | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H18-CT01` | Caso 1 (Sucesso - Iniciar) | `H18-CE01`, `H18-CE04`, `H18-CE06` | Estado: Parado<br>Intervalo: 45 segundos<br>Comando: "Iniciar descanso" | O cronômetro nativo inicia a contagem regressiva de 45 segundos automaticamente. |
| `H18-CT02` | Caso 2 (Sucesso - Pausar) | `H18-CE01`, `H18-CE04`, `H18-CE06` | Estado: Rodando (30s restantes)<br>Comando: "Pausar cronômetro" | A contagem regressiva é interrompida exatamente no segundo 30. |
| `H18-CT03` | Caso 3 (Sucesso - Retomar) | `H18-CE01`, `H18-CE04`, `H18-CE06` | Estado: Pausado (30s restantes)<br>Comando: "Retomar cronômetro" | A contagem regressiva recomeça exatamente a partir dos 30 segundos em que havia parado. |
| `H18-CT04` | Caso 4 (Falha - 1ª Incompreensão) | `H18-CE02`, `H18-CE04`, `H18-CE06` | Estado: Parado<br>Comando: "Começar timer" (Não reconhecido - 1ª vez) | O sistema ignora o comando inválido e permanece aguardando uma instrução correta, sem disparar o fallback. |
| `H18-CT05` | Caso 5 (Falha - 2ª Incompreensão) | `H18-CE03`, `H18-CE04`, `H18-CE06` | Estado: Parado<br>Comando: "Começar timer" (1ª falha) + Ruído de peso caindo (2ª falha) | O aplicativo emite o áudio obrigatório: "Não entendi, repita o comando" e exibe o botão visual de fallback na tela para controle manual. |
| `H18-CT06` | Caso 6 (Sucesso - Fim do Tempo) | `H18-CE01`, `H18-CE04`, `H18-CE06` | Estado: Rodando (1 segundo restante) | Assim que o cronômetro chega a zero, o sistema emite o feedback sonoro automático: "Fim do descanso. Próxima série disponível". |
| `H18-CT07` | Caso 7 (Falha - Sem Configuração) | `H18-CE01`, `H18-CE05`, `H18-CE06` | Estado: Tela de descanso aberta<br>Intervalo: Não definido pelo Personal<br>Comando: "Iniciar descanso" | Ação rejeitada. O cronômetro não inicia e o sistema emite um alerta informando que não há tempo de descanso configurado para este exercício. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h20-feedback-vibratorio-ao-concluir-serie"></a>
## H20 — Feedback vibratório ao concluir série

> **Perfil principal:** `AA`  
> **Rastreabilidade:** `H20` → critérios → regras → `H20-CE01` a `H20-CE06` → `H20-CT01` a `H20-CT03`

### 📖 História de Usuário

> H20 - Enquanto usuário com baixa visão, desejo receber feedback vibratório ao completar uma série para saber que concluí a tarefa sem precisar olhar a tela.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H20-CA01` | Ao clicar no botão "Concluir Série", o dispositivo móvel do usuário deve emitir uma resposta vibratória imediata. |
| `H20-CA02` | O padrão de vibração deve ser claramente distinguível de notificações comuns do sistema (ex.: uma vibração dupla e firme). |
| `H20-CA03` | O menu de configurações de acessibilidade do aplicativo deve conter um seletor (toggle) para ativar ou desativar o feedback vibratório. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H20-RN01` | A execução da funcionalidade depende do suporte de hardware do dispositivo móvel; caso o aparelho não possua motor de vibração (haptic feedback), o sistema deve ignorar a chamada sem interromper ou travar o fluxo do aplicativo. |
| `H20-RN02` | O feedback vibratório deve ocorrer de forma síncrona com o feedback sonoro e com o salvamento do timestamp da série concluída. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H20-CE01` | `1` | Hardware do Dispositivo | ✅ Válida | Aparelho possui motor de vibração funcional | Aceitar / permitir o fluxo. |
| `H20-CE02` | `2` | Hardware do Dispositivo | ❌ Inválida | Aparelho não possui motor de vibração (ausência de hardware) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H20-CE03` | `3` | Configuração de Acessibilidade | ✅ Válida | Função de vibração ativada nas configurações do app | Aceitar / permitir o fluxo. |
| `H20-CE04` | `4` | Configuração de Acessibilidade | ❌ Inválida | Função de vibração desativada nas configurações do app | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H20-CE05` | `5` | Ação de Conclusão | ✅ Válida | Clique efetuado no botão "Concluir Série" | Aceitar / permitir o fluxo. |
| `H20-CE06` | `6` | Ação de Conclusão | ❌ Inválida | Clique fora do botão ou nenhuma ação realizada | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H20-CT01` | Caso 1 (Sucesso) | `H20-CE01`, `H20-CE03`, `H20-CE05` | Hardware: Com motor<br>Configuração: Ativado<br>Ação: Clique em "Concluir Série" | Dispositivo emite uma vibração dupla e firme imediatamente; os dados da série são salvos. |
| `H20-CT02` | Caso 2 (Inativo) | `H20-CE01`, `H20-CE04`, `H20-CE05` | Hardware: Com motor<br>Configuração: Desativado<br>Ação: Clique em "Concluir Série" | Os dados da série são salvos normalmente, mas nenhuma vibração é emitida pelo dispositivo. |
| `H20-CT03` | Caso 3 (Sem Hardware) | `H20-CE02`, `H20-CE03`, `H20-CE05` | Hardware: Sem motor<br>Configuração: Ativado<br>Ação: Clique em "Concluir Série" | O sistema ignora a chamada de vibração por falta de suporte físico e salva a série sem travar o aplicativo. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h21-cadastro-de-novo-aluno"></a>
## H21 — Cadastro de novo aluno

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H21` → critérios → regras → `H21-CE01` a `H21-CE18` → `H21-CT01` a `H21-CT09`

### 📖 História de Usuário

> H21 - Como personal, quero cadastrar um novo aluno informando nome, contato e objetivo, para iniciar o acompanhamento personalizado.

> [!IMPORTANT]
> A linha de “Objetivo do aluno” trazia termos de senha no material original. A tabela foi ajustada para objetivo vazio/inválido, mantendo a intenção da história e do Caso 6.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H21-CA01` | O sistema deve permitir o cadastro de um novo aluno. |
| `H21-CA02` | O sistema deve exigir o preenchimento dos campos nome, contato e objetivo. |
| `H21-CA03` | O sistema não deve permitir o cadastro caso algum campo obrigatório esteja vazio. |
| `H21-CA04` | O sistema deve validar se o contato informado está em formato aceitável. |
| `H21-CA05` | Após o cadastro, o aluno deve ficar disponível na lista de alunos. |
| `H21-CA06` | O sistema deve exibir uma mensagem de confirmação ao concluir o cadastro. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H21-RN01` | O nome do aluno é obrigatório. |
| `H21-RN02` | O contato do aluno é obrigatório. |
| `H21-RN03` | O objetivo do aluno é obrigatório. |
| `H21-RN04` | O contato deve possuir um formato válido, como telefone ou e-mail. |
| `H21-RN05` | Não deve ser permitido cadastrar aluno com contato já existente. |
| `H21-RN06` | Ao cadastrar um novo aluno, o sistema deve registrar a data do cadastro. |
| `H21-RN07` | Ao ser cadastrado, o aluno deve iniciar com status Ativo. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H21-CE01` | `1` | Nome do Aluno | ✅ Válida | Nome preenchido corretamente | Aceitar / permitir o fluxo. |
| `H21-CE02` | `2` | Nome do Aluno | ❌ Inválida | Nome vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE03` | `3` | Nome do Aluno | ❌ Inválida | Nome com caracteres inválidos | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE04` | `4` | Contato do aluno | ✅ Válida | Contato preenchido em formato válido | Aceitar / permitir o fluxo. |
| `H21-CE05` | `5` | Contato do aluno | ❌ Inválida | Contato vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE06` | `6` | Contato do aluno | ❌ Inválida | Contato em formato inválido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE07` | `7` | Objetivo do aluno | ✅ Válida | Objetivo preenchido corretamente | Aceitar / permitir o fluxo. |
| `H21-CE08` | `8` | Objetivo do aluno | ❌ Inválida | Objetivo vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE09` | `9` | Objetivo do aluno | ❌ Inválida | Objetivo incompreensível ou inválido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE10` | `10` | Duplicidade de cadastro | ✅ Válida | Contato ainda não cadastrado no sistema | Aceitar / permitir o fluxo. |
| `H21-CE11` | `11` | Duplicidade de cadastro | ❌ Inválida | Contato já cadastrado no sistema | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE12` | `12` | Duplicidade de cadastro | ❌ Inválida | Cadastro duplicado para o mesmo aluno | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE13` | `13` | Finalização do cadastro | ✅ Válida | Cadastro salvo com sucesso | Aceitar / permitir o fluxo. |
| `H21-CE14` | `14` | Finalização do cadastro | ❌ Inválida | Cadastro não é salvo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE15` | `15` | Finalização do cadastro | ❌ Inválida | Mensagem de confirmação não é exibida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE16` | `16` | Registro inicial do aluno | ✅ Válida | Data de cadastro registrada e aluno inserido na lista | Aceitar / permitir o fluxo. |
| `H21-CE17` | `17` | Registro inicial do aluno | ❌ Inválida | Data de cadastro não registrada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H21-CE18` | `18` | Registro inicial do aluno | ❌ Inválida | Aluno não aparece na lista após cadastro | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H21-CT01` | Caso 1 | `H21-CE01`, `H21-CE04`, `H21-CE07`, `H21-CE10`, `H21-CE13`, `H21-CE16` | Nome, contato e objetivo válidos | Aluno cadastrado com sucesso, data registrada e exibido na lista |
| `H21-CT02` | Caso 2 | `H21-CE02` | Nome vazio | Sistema impede o cadastro e informa que o nome é obrigatório |
| `H21-CT03` | Caso 3 | `H21-CE03` | Nome com caracteres inválidos | Sistema impede o cadastro e informa que o nome está inválido |
| `H21-CT04` | Caso 4 | `H21-CE05` | Contato vazio | Sistema impede o cadastro e informa que o contato é obrigatório |
| `H21-CT05` | Caso 5 | `H21-CE06` | Contato em formato inválido | Sistema impede o cadastro e informa que o contato está inválido |
| `H21-CT06` | Caso 6 | `H21-CE08`, `H21-CE09` | Objetivo vazio ou incompreensível | Sistema impede o cadastro e solicita um objetivo válido |
| `H21-CT07` | Caso 7 | `H21-CE11`, `H21-CE12` | Contato já cadastrado ou cadastro duplicado | Sistema impede cadastro duplicado |
| `H21-CT08` | Caso 8 | `H21-CE14`, `H21-CE15` | Falha ao finalizar cadastro | Cadastro não é concluído ou mensagem de confirmação não é exibida |
| `H21-CT09` | Caso 9 | `H21-CE17`, `H21-CE18` | Cadastro salvo sem registro correto | Sistema apresenta falha ao registrar data ou ao listar o aluno |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h22-relatorio-semanal-ou-mensal-de-desempenho"></a>
## H22 — Relatório semanal ou mensal de desempenho

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H22` → critérios → regras → `H22-CE01` a `H22-CE07` → `H22-CT01` a `H22-CT04`

### 📖 História de Usuário

> H22 - Como aluna, quero gerar um relatório semanal ou mensal com meu desempenho, para que eu possa acompanhar minha evolução física e meu histórico de atividades.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H22-CA01` | A aluna deve encontrar em seu perfil uma opção clara para "Gerar Relatório de Desempenho". |
| `H22-CA02` | A interface deve oferecer um seletor obrigatório para escolher o período do relatório entre duas opções: "Semanal" ou "Mensal". |
| `H22-CA03` | O relatório gerado deve consolidar o histórico de treinos concluídos, a frequência e os dados de evolução física (medidas e peso) coletados no período. |
| `H22-CA04` | O sistema deve permitir a leitura do relatório diretamente na tela do aplicativo e disponibilizar um botão para exportá-lo em formato PDF. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H22-RN01` | O período "Semanal" compreende os últimos 7 dias corridos e o "Mensal" os últimos 30 dias corridos, contados regressivamente a partir do dia da solicitação. |
| `H22-RN02` | Caso não existam treinos ou avaliações físicas registrados no intervalo selecionado, a geração deve ser interrompida e o sistema exibirá a mensagem: "Dados insuficientes para o período selecionado". |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H22-CE01` | `1` | Seleção do Período | ✅ Válida | Opção suportada escolhida ("Semanal" ou "Mensal") | Aceitar / permitir o fluxo. |
| `H22-CE02` | `2` | Seleção do Período | ❌ Inválida | Campo de período deixado vazio / em branco | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H22-CE03` | `3` | Seleção do Período | ❌ Inválida | Período inválido ou customizado enviado por requisição | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H22-CE04` | `4` | Histórico de Dados | ✅ Válida | Existem treinos ou avaliações físicas registrados no período indicado | Aceitar / permitir o fluxo. |
| `H22-CE05` | `5` | Histórico de Dados | ❌ Inválida | Zero treinos ou dados de evolução registrados no intervalo | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H22-CE06` | `6` | Formato de Exportação | ✅ Válida | Exportação solicitada estritamente em formato PDF | Aceitar / permitir o fluxo. |
| `H22-CE07` | `7` | Formato de Exportação | ❌ Inválida | Exportação solicitada em formato não suportado (ex: .xlsx, .csv) | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H22-CT01` | Caso 1 (Sucesso) | `H22-CE01`, `H22-CE04`, `H22-CE06` | Período: "Mensal"<br>Histórico: 12 treinos concluídos<br>Ação: Visualizar e exportar PDF | Relatório gerado na tela com o histórico dos últimos 30 dias e download do PDF concluído com sucesso. |
| `H22-CT02` | Caso 2 (Falha - Sem Período) | `H22-CE02`, `H22-CE04`, `H22-CE06` | Período: "" (Vazio)<br>Histórico: Dados existentes | Geração rejeitada. O sistema impede o avanço e exige a escolha do período. |
| `H22-CT03` | Caso 3 (Falha - Sem Dados) | `H22-CE01`, `H22-CE05`, `H22-CE06` | Período: "Semanal"<br>Histórico: 0 treinos nos últimos 7 dias | Operação interrompida. O sistema exibe a mensagem: "Dados insuficientes para o período selecionado". |
| `H22-CT04` | Caso 4 (Falha - Formato Errado) | `H22-CE01`, `H22-CE04`, `H22-CE07` | Período: "Semanal"<br>Histórico: Dados existentes<br>Ação: Exportar para Excel | Exportação bloqueada. O sistema informa que o formato não é aceito. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h23-graficos-de-progresso-da-aluna"></a>
## H23 — Gráficos de progresso da aluna

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H23` → critérios → regras → `H23-CE01` a `H23-CE07` → `H23-CT01` a `H23-CT04`

### 📖 História de Usuário

> H23 - Como aluna, quero visualizar gráficos do meu progresso de cargas, frequência e calorias gastas, para que eu possa analisar minha evolução e manter minha motivação.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H23-CA01` | A área de progresso da aluna deve exibir três abas de navegação gráfica distintas: "Cargas", "Frequência" e "Calorias Gastas". |
| `H23-CA02` | Na aba de "Cargas", a aluna deve conseguir selecionar um exercício específico de seu histórico para renderizar o gráfico linear de evolução do peso. |
| `H23-CA03` | Na aba de "Frequência", o gráfico em formato de barras deve quantificar os dias de treinos realizados por semana ou por mês. |
| `H23-CA04` | Na aba de "Calorias Gastas", a aluna deve visualizar o somatório estimado do gasto energético diário ou acumulado. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H23-RN01` | Os gráficos devem processar única e exclusivamente dados de sessões e séries marcadas no banco de dados com o status de "Concluído". |
| `H23-RN02` | O gráfico de calorias gastas deve realizar o cálculo de forma automática cruzando o tempo total de duração do treino com o gasto calórico estimado parametrizado pelo Personal Trainer na ficha de exercícios. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H23-CE01` | `1` | Aba / Métrica de Evolução | ✅ Válida | Uma das três abas suportadas ativada ("Cargas", "Frequência" ou "Calorias") | Aceitar / permitir o fluxo. |
| `H23-CE02` | `2` | Aba / Métrica de Evolução | ❌ Inválida | Nenhuma aba selecionada pela interface | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H23-CE03` | `3` | Aba / Métrica de Evolução | ❌ Inválida | Seleção de métrica inexistente ou corrompida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H23-CE04` | `4` | Status das Sessões | ✅ Válida | Dados pertencem a séries ou treinos com o status "Concluído" | Aceitar / permitir o fluxo. |
| `H23-CE05` | `5` | Status das Sessões | ❌ Inválida | Dados pertencem a treinos apenas planejados (status pendente) | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H23-CE06` | `6` | Filtro de Exercício (Aba Cargas) | ✅ Válida | Exercício existente e com histórico é selecionado | Aceitar / permitir o fluxo. |
| `H23-CE07` | `7` | Filtro de Exercício (Aba Cargas) | ❌ Inválida | Nenhum exercício selecionado ao carregar a aba de cargas | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H23-CT01` | Caso 1 (Sucesso - Cargas) | `H23-CE01`, `H23-CE04`, `H23-CE06` | Aba: "Cargas"<br>Status: Treinos Concluídos<br>Exercício: "Supino Reto" | Renderiza com sucesso o gráfico linear mostrando a evolução do peso do exercício selecionado. |
| `H23-CT02` | Caso 2 (Sucesso - Frequência) | `H23-CE01`, `H23-CE04`, `H23-CE06` | Aba: "Frequência"<br>Status: Treinos Concluídos | Renderiza com sucesso o gráfico de barras quantificando os dias de treinos realizados. |
| `H23-CT03` | Caso 3 (Falha - Dados Pendentes) | `H23-CE01`, `H23-CE05`, `H23-CE06` | Aba: "Calorias Gastas"<br>Status: Apenas treinos pendentes | O gráfico exibe valores zerados, ignorando os treinos que ainda não foram marcados como concluídos. |
| `H23-CT04` | Caso 4 (Falha - Sem Exercício) | `H23-CE01`, `H23-CE04`, `H23-CE07` | Aba: "Cargas"<br>Status: Treinos Concluídos<br>Exercício: "" (Vazio) | O sistema deixa o espaço do gráfico em estado neutro e solicita a seleção de um exercício da lista. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h24-ficha-personalizada-do-dia"></a>
## H24 — Ficha personalizada do dia

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H24` → critérios → regras → `H24-CE01` a `H24-CE04` → `H24-CT01` a `H24-CT03`

### 📖 História de Usuário

> H24 - Como aluna, quero visualizar minha ficha personalizada do dia, para que eu saiba exatamente qual rotina de treinos foi adaptada aos meus objetivos atuais.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H24-CA01` | Ao acessar a tela inicial do aplicativo no "Modo Treino", o sistema deve abrir automaticamente a ficha correspondente ao dia da semana ou à sequência de rotação (ex.: Treino A, Treino B). |
| `H24-CA02` | A ficha do dia deve listar em ordem cronológica o nome de todos os exercícios, a quantidade de séries, repetições planejadas e a carga sugerida pelo treinador. |
| `H24-CA03` | O topo da tela deve destacar visualmente o objetivo macro configurado no perfil (ex.: "Foco Atual: Hipertrofia Avançada"). |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H24-RN01` | Caso o Personal Trainer não tenha publicado ou associado nenhuma ficha de treino ativa para a aluna, o aplicativo deve exibir um bloqueio amigável com o aviso: "Nenhum treino disponível. Solicite sua ficha ao seu Personal Trainer". |
| `H24-RN02` | A aluna não possui permissão para excluir, adicionar ou alterar a ordem dos exercícios determinados na ficha do dia; ela tem autonomia apenas para preencher e salvar as cargas e repetições reais executadas. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H24-CE01` | `1` | Atribuição de Ficha | ✅ Válida | Ficha de treino ativa publicada e associada à aluna pelo Personal | Aceitar / permitir o fluxo. |
| `H24-CE02` | `2` | Atribuição de Ficha | ❌ Inválida | Nenhuma ficha ativa vinculada ao perfil da aluna no sistema | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H24-CE03` | `3` | Modificação da Estrutura | ✅ Válida | Aluna tenta preencher apenas os campos reais de carga e repetições | Aceitar / permitir o fluxo. |
| `H24-CE04` | `4` | Modificação da Estrutura | ❌ Inválida | Aluna tenta excluir, adicionar ou alterar a ordem dos exercícios | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H24-CT01` | Caso 1 (Sucesso - Fluxo Base) | `H24-CE01`, `H24-CE03` | Ficha: Ativa ("Treino A")<br>Ação: Acessar Modo Treino e digitar dados reais | Ficha exibe a lista ordenada de exercícios, o objetivo macro ("Hipertrofia Avançada") e permite salvar as cargas reais executadas. |
| `H24-CT02` | Caso 2 (Falha - Sem Treino) | `H24-CE02`, `H24-CE03` | Ficha: Nenhuma vinculada<br>Ação: Acessar Modo Treino | O aplicativo exibe um bloqueio amigável na tela com a mensagem: "Nenhum treino disponível. Solicite sua ficha ao seu Personal Trainer". |
| `H24-CT03` | Caso 3 (Falha - Alteração Proibida) | `H24-CE01`, `H24-CE04` | Ficha: Ativa ("Treino A")<br>Ação: Tentar excluir um exercício ou arrastar para mudar a ordem | O sistema bloqueia a ação na interface; os botões de edição estrutural permanecem ocultos ou desabilitados para o perfil de aluna. |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h25-lembretes-de-treino-para-o-aluno"></a>
## H25 — Lembretes de treino para o aluno

> **Perfil principal:** `A`  
> **Rastreabilidade:** `H25` → critérios → regras → `H25-CE01` a `H25-CE02` → `H25-CT01` a `H25-CT02`

### 📖 História de Usuário

> H25 - Como aluno, desejo receber notificações de lembrete de treino no meu celular, para manter o foco e a consistência na rotina esportiva.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H25-CA01` | O sistema deve emitir um lembrete no celular do aluno avisando que ele possui um treino programado para aquele dia. |
| `H25-CA02` | As notificações não devem ser enviadas se o usuário tiver desativado os lembretes nas configurações da conta. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H25-RN01` | (Preferência de privacidade) O sistema deve verificar a propriedade notificacoes_ativas no perfil do aluno. Se o valor for falso, o fluxo de envio para o dispositivo móvel correspondente é encerrado. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H25-CE01` | `21` | Configuração de push no perfil | ✅ Válida | Flag notificacoes_ativas é igual a true | Aceitar / permitir o fluxo. |
| `H25-CE02` | `22` | Configuração de push no perfil | ❌ Inválida | Flag notificacoes_ativas é igual a false | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H25-CT01` | Caso 1 | `H25-CE01` | Flag no perfil: true | Notificação push é montada e despachada ao celular |
| `H25-CT02` | Caso 2 | `H25-CE02` | Flag no perfil: false | O envio é cancelado e nenhuma mensagem incomoda o aluno |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h26-lista-de-alunos-com-mensalidade-pendente"></a>
## H26 — Lista de alunos com mensalidade pendente

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H26` → critérios → regras → `H26-CE01` a `H26-CE18` → `H26-CT01` a `H26-CT08`

### 📖 História de Usuário

> H26 - Enquanto personal, quero visualizar a lista de alunos com mensalidade pendente, para saber quem precisa ser cobrado sem verificar um por um.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H26-CA01` | O sistema deve permitir a visualização da lista de alunos com mensalidade pendente. |
| `H26-CA02` | O sistema deve exibir apenas alunos com pagamentos em atraso. |
| `H26-CA03` | O sistema deve apresentar informações suficientes para identificação do aluno. |
| `H26-CA04` | O sistema deve permitir que o PT acesse rapidamente os alunos pendentes sem consultar cada perfil individualmente. |
| `H26-CA05` | O sistema deve atualizar a lista conforme a situação financeira dos alunos. |
| `H26-CA06` | O sistema deve informar quando não houver alunos com mensalidade pendente. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H26-RN01` | Considera-se pendente a mensalidade que ultrapassou a data de vencimento sem registro de pagamento. |
| `H26-RN02` | Apenas alunos com mensalidade pendente devem aparecer na lista. |
| `H26-RN03` | Alunos com mensalidade em dia não devem ser exibidos. |
| `H26-RN04` | A lista deve ser atualizada automaticamente após confirmação de pagamento. |
| `H26-RN05` | O sistema deve exibir nome e informação da pendência do aluno. |
| `H26-RN06` | Caso não existam pendências, o sistema deve exibir mensagem informativa ao PT. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H26-CE01` | `1` | Situação da mensalidade | ✅ Válida | Mensalidade vencida e sem pagamento registrado | Aceitar / permitir o fluxo. |
| `H26-CE02` | `2` | Situação da mensalidade | ❌ Inválida | Mensalidade em dia | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE03` | `3` | Situação da mensalidade | ❌ Inválida | Mensalidade quitada após vencimento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE04` | `4` | Exibição na lista | ✅ Válida | Aluno pendente exibido na lista | Aceitar / permitir o fluxo. |
| `H26-CE05` | `5` | Exibição na lista | ❌ Inválida | Aluno pendente não exibido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE06` | `6` | Exibição na lista | ❌ Inválida | Aluno sem pendência exibido na lista | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE07` | `7` | Informações do aluno | ✅ Válida | Nome e dados da pendência exibidos corretamente | Aceitar / permitir o fluxo. |
| `H26-CE08` | `8` | Informações do aluno | ❌ Inválida | Nome não exibido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE09` | `9` | Informações do aluno | ❌ Inválida | Dados da pendência não exibidos | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE10` | `10` | Atualização da lista | ✅ Válida | Lista atualizada após pagamento | Aceitar / permitir o fluxo. |
| `H26-CE11` | `11` | Atualização da lista | ❌ Inválida | Lista não atualizada após pagamento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE12` | `12` | Atualização da lista | ❌ Inválida | Aluno permanece listado após quitar débito | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE13` | `13` | Consulta pelo PT | ✅ Válida | PT visualiza todos os alunos pendentes sem acessar perfis individuais | Aceitar / permitir o fluxo. |
| `H26-CE14` | `14` | Consulta pelo PT | ❌ Inválida | Necessidade de acessar perfil para identificar pendência | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE15` | `15` | Consulta pelo PT | ❌ Inválida | Lista indisponível para consulta | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE16` | `16` | Ausência de pendências | ✅ Válida | Sistema exibe mensagem informativa quando não há pendências | Aceitar / permitir o fluxo. |
| `H26-CE17` | `17` | Ausência de pendências | ❌ Inválida | Mensagem não exibida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H26-CE18` | `18` | Ausência de pendências | ❌ Inválida | Sistema exibe lista vazia sem explicação | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H26-CT01` | Caso 1 | `H26-CE01`, `H26-CE04`, `H26-CE07`, `H26-CE13` | Existem alunos com mensalidade pendente | Sistema exibe corretamente a lista de alunos pendentes |
| `H26-CT02` | Caso 2 | `H26-CE02`, `H26-CE03`, `H26-CE06` | Alunos com mensalidade em dia ou quitada | Alunos não são exibidos na lista de pendências |
| `H26-CT03` | Caso 3 | `H26-CE05`, `H26-CE08`, `H26-CE09` | Falha na exibição das informações do aluno | Sistema apresenta inconsistência na listagem |
| `H26-CT04` | Caso 4 | `H26-CE10` | Pagamento registrado para aluno pendente | Aluno é removido automaticamente da lista de pendências |
| `H26-CT05` | Caso 5 | `H26-CE11`, `H26-CE12` | Pagamento registrado, mas lista não atualizada | Sistema mantém informação incorreta |
| `H26-CT06` | Caso 6 | `H26-CE14`, `H26-CE15` | PT precisa acessar perfis individuais ou lista indisponível | Requisito de consulta rápida não é atendido |
| `H26-CT07` | Caso 7 | `H26-CE16` | Não existem mensalidades pendentes | Sistema exibe mensagem informativa ao PT |
| `H26-CT08` | Caso 8 | `H26-CE17`, `H26-CE18` | Não existem pendências cadastradas | Sistema não informa adequadamente a ausência de pendências |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h27-marcacao-de-mensalidade-como-recebida"></a>
## H27 — Marcação de mensalidade como recebida

> **Perfil principal:** `PT`  
> **Rastreabilidade:** `H27` → critérios → regras → `H27-CE01` a `H27-CE18` → `H27-CT01` a `H27-CT09`

### 📖 História de Usuário

> H27 - Enquanto personal, quero marcar uma mensalidade como recebida, para manter o controle de cobranças atualizado.

> [!IMPORTANT]
> A condição “Contém apenas letras ou dígitos” aparecia no material original, mas era incompatível com H27. Foi padronizada como “Confirmação do recebimento”, preservando as classes 4, 5 e 6.
> O Caso 2 da H27 trazia “1abc / Senha inválida” no material original. O caso foi ajustado para a condição financeira correspondente, sem criar nova funcionalidade.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H27-CA01` | O sistema deve permitir que o PT marque uma mensalidade como recebida. |
| `H27-CA02` | O sistema deve atualizar o status da mensalidade após a confirmação do recebimento. |
| `H27-CA03` | O sistema deve registrar a data em que o pagamento foi marcado como recebido. |
| `H27-CA04` | O sistema deve remover o aluno da lista de mensalidades pendentes após o pagamento ser registrado. |
| `H27-CA05` | O sistema deve impedir que uma mensalidade já recebida seja marcada novamente sem necessidade. |
| `H27-CA06` | O sistema deve exibir uma mensagem de confirmação após a atualização. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H27-RN01` | Uma mensalidade pendente pode ser marcada como recebida pelo PT. |
| `H27-RN02` | Ao marcar como recebida, o status da mensalidade deve mudar para paga. |
| `H27-RN03` | A data de recebimento deve ser registrada automaticamente pelo sistema. |
| `H27-RN04` | Após a confirmação do pagamento, o aluno não deve mais aparecer na lista de pendências. |
| `H27-RN05` | Mensalidades já pagas não devem permanecer como pendentes. |
| `H27-RN06` | O sistema deve manter o histórico do pagamento registrado.4. Tabela de Classes de Equivalência |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H27-CE01` | `1` | Situação da mensalidade | ✅ Válida | Mensalidade pendente selecionada | Aceitar / permitir o fluxo. |
| `H27-CE02` | `2` | Situação da mensalidade | ❌ Inválida | Mensalidade já recebida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE03` | `3` | Situação da mensalidade | ❌ Inválida | Mensalidade inexistente ou não selecionada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE04` | `4` | Confirmação do recebimento | ✅ Válida | PT confirma recebimento da mensalidade | Aceitar / permitir o fluxo. |
| `H27-CE05` | `5` | Confirmação do recebimento | ❌ Inválida | PT cancela a ação de recebimento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE06` | `6` | Confirmação do recebimento | ❌ Inválida | Sistema não permite confirmar recebimento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE07` | `7` | Atualização do status | ✅ Válida | Status atualizado para paga/recebida | Aceitar / permitir o fluxo. |
| `H27-CE08` | `8` | Atualização do status | ❌ Inválida | Status permanece como pendente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE09` | `9` | Atualização do status | ❌ Inválida | Status atualizado incorretamente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE10` | `10` | Registro da data | ✅ Válida | Data de recebimento registrada automaticamente | Aceitar / permitir o fluxo. |
| `H27-CE11` | `11` | Registro da data | ❌ Inválida | Data de recebimento não registrada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE12` | `12` | Registro da data | ❌ Inválida | Data registrada incorretamente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE13` | `13` | Lista de pendências | ✅ Válida | Aluno removido da lista de pendências após pagamento | Aceitar / permitir o fluxo. |
| `H27-CE14` | `14` | Lista de pendências | ❌ Inválida | Aluno permanece na lista após pagamento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE15` | `15` | Lista de pendências | ❌ Inválida | Lista não é atualizada após recebimento | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE16` | `16` | Confirmação e histórico | ✅ Válida | Mensagem de confirmação exibida e histórico mantido | Aceitar / permitir o fluxo. |
| `H27-CE17` | `17` | Confirmação e histórico | ❌ Inválida | Mensagem de confirmação não exibida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H27-CE18` | `18` | Confirmação e histórico | ❌ Inválida | Histórico de pagamento não é registrado | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H27-CT01` | Caso 1 | `H27-CE01`, `H27-CE04`, `H27-CE07`, `H27-CE10`, `H27-CE13`, `H27-CE16` | PT marca mensalidade pendente como recebida | Mensalidade atualizada para recebida, data registrada, aluno removido das pendências e confirmação exibida |
| `H27-CT02` | Caso 2 | `H27-CE02`, `H27-CE04` | Mensalidade já recebida; personal confirma recebimento | Sistema impede a ação duplicada ou informa que a mensalidade já foi recebida |
| `H27-CT03` | Caso 3 | `H27-CE03` | Mensalidade inexistente ou não selecionada | Sistema impede a ação e solicita a seleção de uma mensalidade válida |
| `H27-CT04` | Caso 4 | `H27-CE05` | PT cancela a ação de recebimento | Sistema mantém a mensalidade como pendente |
| `H27-CT05` | Caso 5 | `H27-CE06` | Sistema não permite confirmar recebimento | Requisito de marcação de mensalidade como recebida não é atendido |
| `H27-CT06` | Caso 6 | `H27-CE08`, `H27-CE09` | Falha na atualização do status | Sistema apresenta inconsistência no status da mensalidade |
| `H27-CT07` | Caso 7 | `H27-CE11`, `H27-CE12` | Falha no registro da data de recebimento | Sistema não registra corretamente a data do pagamento |
| `H27-CT08` | Caso 8 | `H27-CE14`, `H27-CE15` | Falha na atualização da lista de pendências | Aluno continua aparecendo indevidamente como pendente |
| `H27-CT09` | Caso 9 | `H27-CE17`, `H27-CE18` | Falha na confirmação ou histórico | Sistema não confirma adequadamente ou não mantém registro do pagamento |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h28-login-com-e-mail-e-senha"></a>
## H28 — Login com e-mail e senha

> **Perfil principal:** `PT · A · AA`  
> **Rastreabilidade:** `H28` → critérios → regras → `H28-CE01` a `H28-CE18` → `H28-CT01` a `H28-CT09`

### 📖 História de Usuário

> H28 - Como usuário, quero fazer login com e-mail e senha, para acessar o sistema com segurança.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H28-CA01` | O sistema deve permitir login utilizando e-mail e senha. |
| `H28-CA02` | O sistema deve validar se o e-mail informado está em formato válido. |
| `H28-CA03` | O sistema deve exigir o preenchimento dos campos e-mail e senha. |
| `H28-CA04` | O sistema deve permitir acesso apenas quando as credenciais forem válidas. |
| `H28-CA05` | O sistema deve impedir o acesso quando e-mail ou senha estiverem incorretos. |
| `H28-CA06` | O sistema deve exibir mensagem de erro quando o login não for realizado. |
| `H28-CA07` | Após login bem-sucedido, o usuário deve ser direcionado para a tela principal do sistema. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H28-RN01` | O e-mail é obrigatório. |
| `H28-RN02` | A senha é obrigatória. |
| `H28-RN03` | O e-mail deve estar cadastrado no sistema. |
| `H28-RN04` | A senha informada deve corresponder ao e-mail cadastrado. |
| `H28-RN05` | Usuários com credenciais inválidas não podem acessar o sistema. |
| `H28-RN06` | Após autenticação válida, o sistema deve iniciar uma sessão de usuário. |
| `H28-RN07` | O sistema não deve informar especificamente se o erro foi no e-mail ou na senha, por segurança. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H28-CE01` | `1` | E-mail informado | ✅ Válida | E-mail preenchido em formato válido | Aceitar / permitir o fluxo. |
| `H28-CE02` | `2` | E-mail informado | ❌ Inválida | E-mail vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE03` | `3` | E-mail informado | ❌ Inválida | E-mail em formato inválido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE04` | `4` | Senha informada | ✅ Válida | Senha preenchida corretamente | Aceitar / permitir o fluxo. |
| `H28-CE05` | `5` | Senha informada | ❌ Inválida | Senha vazia | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE06` | `6` | Senha informada | ❌ Inválida | Senha incorreta | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE07` | `7` | Cadastro do usuário | ✅ Válida | E-mail cadastrado no sistema | Aceitar / permitir o fluxo. |
| `H28-CE08` | `8` | Cadastro do usuário | ❌ Inválida | E-mail não cadastrado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE09` | `9` | Cadastro do usuário | ❌ Inválida | Usuário inexistente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE10` | `10` | Autenticação | ✅ Válida | E-mail e senha correspondem ao usuário cadastrado | Aceitar / permitir o fluxo. |
| `H28-CE11` | `11` | Autenticação | ❌ Inválida | E-mail e senha não correspondem | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE12` | `12` | Autenticação | ❌ Inválida | Credenciais inválidas | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE13` | `13` | Acesso ao sistema | ✅ Válida | Login realizado e sessão iniciada | Aceitar / permitir o fluxo. |
| `H28-CE14` | `14` | Acesso ao sistema | ❌ Inválida | Acesso negado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE15` | `15` | Acesso ao sistema | ❌ Inválida | Sessão não iniciada após login válido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE16` | `16` | Mensagens e redirecionamento | ✅ Válida | Mensagem adequada e redirecionamento correto após login | Aceitar / permitir o fluxo. |
| `H28-CE17` | `17` | Mensagens e redirecionamento | ❌ Inválida | Mensagem de erro não exibida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H28-CE18` | `18` | Mensagens e redirecionamento | ❌ Inválida | Usuário não redirecionado após login válido | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H28-CT01` | Caso 1 | `H28-CE01`, `H28-CE04`, `H28-CE07`, `H28-CE10`, `H28-CE13`, `H28-CE16` | E-mail cadastrado e senha correta | Login realizado com sucesso, sessão iniciada e usuário redirecionado para a tela principal |
| `H28-CT02` | Caso 2 | `H28-CE02` | E-mail vazio | Sistema impede login e informa que o e-mail é obrigatório |
| `H28-CT03` | Caso 3 | `H28-CE03` | E-mail em formato inválido | Sistema impede login e informa erro de formato de e-mail |
| `H28-CT04` | Caso 4 | `H28-CE05` | Senha vazia | Sistema impede login e informa que a senha é obrigatória |
| `H28-CT05` | Caso 5 | `H28-CE06`, `H28-CE11`, `H28-CE12`, `H28-CE14` | Senha incorreta | Sistema nega acesso e exibe mensagem genérica de credenciais inválidas |
| `H28-CT06` | Caso 6 | `H28-CE08`, `H28-CE09`, `H28-CE12`, `H28-CE14` | E-mail não cadastrado | Sistema nega acesso e exibe mensagem genérica de credenciais inválidas |
| `H28-CT07` | Caso 7 | `H28-CE15` | Login válido sem iniciar sessão | Sistema apresenta falha ao autenticar corretamente o usuário |
| `H28-CT08` | Caso 8 | `H28-CE17` | Login inválido sem mensagem de erro | Sistema não informa adequadamente a falha no login |
| `H28-CT09` | Caso 9 | `H28-CE18` | Login válido sem redirecionamento | Sistema autentica, mas não direciona o usuário para a tela principal |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---

<a id="h29-recuperacao-de-senha-por-e-mail"></a>
## H29 — Recuperação de senha por e-mail

> **Perfil principal:** `PT · A · AA`  
> **Rastreabilidade:** `H29` → critérios → regras → `H29-CE01` a `H29-CE18` → `H29-CT01` a `H29-CT09`

### 📖 História de Usuário

> H29 - Como usuário, quero recuperar minha senha por e-mail, para não perder acesso à conta caso eu a esqueça.

### ✅ Critérios de Aceitação

| ID | Critério |
|---|---|
| `H29-CA01` | O sistema deve permitir que o usuário solicite a recuperação de senha informando seu e-mail. |
| `H29-CA02` | O sistema deve validar se o e-mail informado possui formato válido. |
| `H29-CA03` | O sistema deve verificar se o e-mail está cadastrado no sistema. |
| `H29-CA04` | O sistema deve enviar instruções de recuperação para o e-mail cadastrado. |
| `H29-CA05` | O sistema deve permitir a redefinição da senha por meio do link enviado. |
| `H29-CA06` | O sistema deve exibir mensagens adequadas de sucesso ou erro durante o processo. |
| `H29-CA07` | Após redefinir a senha, o usuário deve conseguir realizar login com a nova senha. |

### ⚙️ Regras de Negócio

| ID | Regra |
|---|---|
| `H29-RN01` | O e-mail é obrigatório para solicitar recuperação de senha. |
| `H29-RN02` | Apenas usuários cadastrados podem recuperar a senha. |
| `H29-RN03` | O sistema deve gerar um link ou token único para redefinição da senha. |
| `H29-RN04` | O link de recuperação deve possuir prazo de validade. |
| `H29-RN05` | Após a redefinição da senha, o token utilizado deve ser invalidado. |
| `H29-RN06` | A nova senha substitui a senha anterior. |
| `H29-RN07` | O sistema deve registrar a data da solicitação de recuperação. |

### 🧩 Classes de Equivalência

| ID | Ref. original | Campo/Condição | Tipo | Classe | Tratamento |
|---|:---:|---|:---:|---|---|
| `H29-CE01` | `1` | E-mail informado | ✅ Válida | E-mail preenchido em formato válido | Aceitar / permitir o fluxo. |
| `H29-CE02` | `2` | E-mail informado | ❌ Inválida | E-mail vazio | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE03` | `3` | E-mail informado | ❌ Inválida | E-mail em formato inválido | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE04` | `4` | Cadastro do usuário | ✅ Válida | E-mail cadastrado no sistema | Aceitar / permitir o fluxo. |
| `H29-CE05` | `5` | Cadastro do usuário | ❌ Inválida | E-mail não cadastrado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE06` | `6` | Cadastro do usuário | ❌ Inválida | Usuário inexistente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE07` | `7` | Solicitação de recuperação | ✅ Válida | Solicitação realizada com sucesso | Aceitar / permitir o fluxo. |
| `H29-CE08` | `8` | Solicitação de recuperação | ❌ Inválida | Solicitação não processada | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE09` | `9` | Solicitação de recuperação | ❌ Inválida | Falha no envio da solicitação | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE10` | `10` | Envio de recuperação | ✅ Válida | Link/token enviado para o e-mail | Aceitar / permitir o fluxo. |
| `H29-CE11` | `11` | Envio de recuperação | ❌ Inválida | Link/token não enviado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE12` | `12` | Envio de recuperação | ❌ Inválida | Link/token enviado incorretamente | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE13` | `13` | Utilização do token | ✅ Válida | Token válido utilizado para redefinir senha | Aceitar / permitir o fluxo. |
| `H29-CE14` | `14` | Utilização do token | ❌ Inválida | Token expirado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE15` | `15` | Utilização do token | ❌ Inválida | Token inválido ou já utilizado | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE16` | `16` | Redefinição da senha | ✅ Válida | Senha redefinida com sucesso e token invalidado | Aceitar / permitir o fluxo. |
| `H29-CE17` | `17` | Redefinição da senha | ❌ Inválida | Senha não redefinida | Rejeitar, bloquear ou tratar conforme regra da história. |
| `H29-CE18` | `18` | Redefinição da senha | ❌ Inválida | Login não funciona com a nova senha | Rejeitar, bloquear ou tratar conforme regra da história. |

### 🧪 Casos de Teste

| ID | Caso original | Classes Relacionadas | Entradas | Resultado Esperado |
|---|---|---|---|---|
| `H29-CT01` | Caso 1 | `H29-CE01`, `H29-CE04`, `H29-CE07`, `H29-CE10` | Usuário informa e-mail válido e cadastrado | Sistema envia link/token de recuperação para o e-mail |
| `H29-CT02` | Caso 2 | `H29-CE02` | E-mail vazio | Sistema impede a solicitação e informa que o e-mail é obrigatório |
| `H29-CT03` | Caso 3 | `H29-CE03` | E-mail em formato inválido | Sistema impede a solicitação e informa erro no formato do e-mail |
| `H29-CT04` | Caso 4 | `H29-CE05`, `H29-CE06` | E-mail não cadastrado | Sistema informa que não foi possível processar a recuperação |
| `H29-CT05` | Caso 5 | `H29-CE08`, `H29-CE09`, `H29-CE11`, `H29-CE12` | Falha no processamento ou envio do link | Sistema não conclui corretamente a recuperação |
| `H29-CT06` | Caso 6 | `H29-CE13`, `H29-CE16` | Usuário utiliza token válido e redefine a senha | Senha é alterada com sucesso e token é invalidado |
| `H29-CT07` | Caso 7 | `H29-CE14` | Usuário utiliza token expirado | Sistema impede a redefinição e solicita nova recuperação |
| `H29-CT08` | Caso 8 | `H29-CE15` | Usuário utiliza token inválido ou já utilizado | Sistema impede a redefinição da senha |
| `H29-CT09` | Caso 9 | `H29-CE17`, `H29-CE18` | Redefinição realizada incorretamente | Sistema não altera a senha ou não permite login com a nova senha |

<p align="right"><a href="#sumario">⬆️ Voltar ao sumário</a></p>

---
