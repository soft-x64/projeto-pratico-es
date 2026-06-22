# 🧾 Revisão das Issues de Inspeção — TrainerX64

---

## Sumário

| # | Seção | Conteúdo |
|---|---|---|
| 1 | [Contexto da Inspeção](#1-contexto-da-inspeção) | Origem das issues e objetivo do documento |
| 2 | [Critérios de Avaliação](#2-critérios-de-avaliação) | Como as issues foram avaliadas |
| 3 | [Resumo Geral](#3-resumo-geral) | Quantitativo por avaliação, tipo e história |
| 4 | [Registro de Alterações Aplicadas no Backlog](#4-registro-de-alterações-aplicadas-no-backlog) | Síntese das alterações aplicadas por história |
| 5 | [Matriz de Rastreabilidade](#5-matriz-de-rastreabilidade) | Visão geral das issues e avaliações |
| 6 | [Exemplos Relevantes de Tratamento](#6-exemplos-relevantes-de-tratamento) | Amostra das issues mais representativas e seus tratamentos |

---

## 1. Contexto da Inspeção

Este documento registra o tratamento das issues abertas durante a etapa de inspeção do backlog do sistema **TrainerX64**.

A organização foi feita para permitir rastreabilidade entre:

```text
Issue identificada
        ↓
Descrição do problema
        ↓
Trecho do requisito inspecionado
        ↓
Registro de alteração aplicada
        ↓
Avaliação da issue
```

### Caminhos de rastreabilidade

| Item | Caminho |
|---|---|
| Backlog do produto | [GitHub Projects — soft-x64/projects/4](https://github.com/orgs/soft-x64/projects/4) |
| Repositório das issues | [soft-x64/projeto-pratico-es](https://github.com/soft-x64/projeto-pratico-es) |

> Este documento organiza as issues de inspeção e o tratamento registrado pela equipe, mantendo a rastreabilidade entre problema apontado, avaliação definida e alteração aplicada no backlog.

---

## 2. Critérios de Avaliação

As issues foram avaliadas apenas em três categorias finais, mantendo a análise simples, objetiva e padronizada.

| Avaliação da Issue | Significado |
|---|---|
| ✅ **Corrigida** | A issue foi aceita e gerou ajuste no backlog, nos critérios de aceitação, nas regras de negócio ou no escopo da história |
| ⚪ **Não corrigida** | A equipe decidiu não aplicar alteração no backlog nesta etapa, por escopo, prioridade ou por a história não fazer parte do conjunto especificado |
| 🔎 **Reavaliada** | A observação foi analisada como refinamento válido, mas não tratada como defeito bloqueante da história |

---

## 3. Resumo Geral

### 3.1 Issues por avaliação

| Avaliação da Issue | Quantidade |
|---|---:|
| ✅ Corrigida | 32 |
| ⚪ Não corrigida | 14 |
| 🔎 Reavaliada | 5 |

### 3.2 Issues por tipo de problema

| Tipo de problema | Quantidade |
|---|---:|
| 🔴 Omissão / Incompletude | 25 |
| 🟠 Ambiguidade | 13 |
| ⚫ Defeito de especificação | 6 |
| 🟣 Contradição | 6 |

### 3.3 Issues por história

| História | Quantidade de issues |
|---|---:|
| H01 | 6 |
| H01/H10 | 1 |
| H02 | 6 |
| H03 | 4 |
| H04 | 1 |
| H05 | 1 |
| H06 | 1 |
| H07 | 4 |
| H08 | 1 |
| H09 | 2 |
| H10 | 2 |
| H11 | 3 |
| H12 | 2 |
| H13 | 1 |
| H14 | 2 |
| H15 | 2 |
| H16 | 3 |
| H17 | 3 |
| H18 | 3 |
| H20 | 2 |
| Geral | 1 |

---

## 4. Registro de Alterações Aplicadas no Backlog

Esta seção consolida, por história, o que foi ajustado ou mantido após a avaliação das issues. O objetivo é deixar claro o impacto da inspeção sobre o backlog do produto, sem duplicar integralmente as histórias de usuário.

| História | Registro de alteração aplicada no backlog | Avaliação predominante |
|---|---|---|
| **H01** | Foram detalhados o conceito de treino padrão, a categoria do template, a obrigatoriedade de pelo menos um exercício, o bloqueio do botão salvar sem exercício válido, a mensagem para nome duplicado, a independência entre template original e treino importado para o aluno e a avaliação do impacto de edição do template em treinos ativos. | ✅ Corrigida |
| **H02** | Foram definidos os filtros Online, Presenciais e Híbridos; a regra de classificação do aluno híbrido; as métricas de gráfico; a distinção entre histórico de quatro semanas e atualização dinâmica; os estados de atividade; e o limite mensurável para atualização do dashboard. | ✅ Corrigida |
| **H03** | Foram adicionadas opções de período para relatórios, forma de compartilhamento com o aluno via aplicativo, estratégia de recálculo sob demanda e métricas objetivas para substituir termos subjetivos de desempenho. | ✅ Corrigida |
| **H04** | A história foi reformulada para indicar que o aplicativo terá português como idioma base e padrão. | ✅ Corrigida |
| **H05** | A issue foi avaliada como fora do escopo de correção desta etapa, mantendo a história sem alteração aplicada no backlog. | ⚪ Não corrigida |
| **H06** | Foram adicionados critérios de aceitação e regras de negócio, incluindo os status Ativo e Inativo, suas cores, seus ícones, a regra automática de cálculo e o registro de data em alterações manuais. | ✅ Corrigida |
| **H07** | Foi detalhado o fluxo de primeiros passos, incluindo telas/funções principais do tutorial e comportamento esperado do onboarding. Parte das observações relacionadas ao detalhamento adicional do fluxo foi mantida fora do escopo desta etapa. | ✅ Corrigida / ⚪ Não corrigida |
| **H08** | A issue foi avaliada como não corrigida nesta etapa, sem alteração aplicada no backlog. | ⚪ Não corrigida |
| **H09** | Foi definido critério objetivo para disparo de alerta de ausência, reduzindo a subjetividade do termo “muitos treinos”. A definição do canal de alerta permaneceu fora do escopo desta etapa. | ✅ Corrigida / ⚪ Não corrigida |
| **H10** | A regra de mídia foi ajustada para alinhar o valor da história: vídeo explicativo como formato principal e imagem como fallback visual. A publicação do treino passou a exigir mídia válida, enquanto o cadastro estrutural do template permanece separado dessa validação. | ✅ Corrigida / 🔎 Reavaliada |
| **H11** | O botão de confirmação foi dividido em estados distintos: “Concluir Série” e “Próximo Exercício”, com contador de progresso da série. Também foi ajustada a especificação relacionada à carga sugerida pelo personal e à referência da última sessão. O fluxo de exceção para exercício não realizado permaneceu fora da correção nesta etapa. | ✅ Corrigida / ⚪ Não corrigida |
| **H12** | Foram definidas a origem da configuração dos dias de lembrete, a configuração individual pela aluna, o horário por dia selecionado e o conteúdo textual padrão da notificação. | ✅ Corrigida |
| **H13** | Foram especificadas as métricas de evolução física consideradas pelo sistema: peso corporal, percentual de gordura corporal e medidas corporais. | 🔎 Reavaliada |
| **H14** | Foi reavaliada a ambiguidade sobre sincronização com smartwatch, esclarecendo o fluxo unidirecional de dados. A definição de marcas e sistemas suportados não recebeu alteração nesta etapa. | 🔎 Reavaliada / ⚪ Não corrigida |
| **H15** | As issues foram avaliadas como fora do escopo da etapa, pois a história permaneceu no backlog sem detalhamento de critérios e regras de negócio. | ⚪ Não corrigida |
| **H16** | Foi corrigida a duplicidade de identificador, com uma das histórias renumerada para H19. As issues sobre descrições em áudio foram avaliadas como não aplicáveis à H16 em especificação, que trata de leitores de tela nativos. | ✅ Corrigida / ⚪ Não corrigida |
| **H17** | Foram definidos o comportamento de quebra de linha para textos ampliados, a proibição de ellipsis e rolagem horizontal, a cor fixa do alto contraste e a remoção de informação estranha com nome próprio. | ✅ Corrigida / 🔎 Reavaliada |
| **H18** | Foram adicionados o comando “Retomar cronômetro”, o fallback visual após falhas de reconhecimento, o feedback sonoro de erro e a definição de reconhecimento de voz nativo via Speech-to-Text, sem depender de assistentes externos. | ✅ Corrigida |
| **H20** | Foram detalhados o padrão do feedback vibratório, a possibilidade de ativar/desativar nas configurações de acessibilidade e o comportamento diante de limitações de hardware. | ✅ Corrigida |
| **Geral** | A issue geral sobre histórias sem detalhamento foi avaliada como não corrigida nesta etapa, pois nem todas as histórias do backlog foram movidas para especificação. | ⚪ Não corrigida |

> ✅ **Rastreabilidade:** a matriz seguinte relaciona cada issue individual à história afetada e à avaliação atribuída pela equipe.

---

## 5. Matriz de Rastreabilidade

| Issue | História | Tipo | Título | Avaliação da Issue | Link |
|---|---|---|---|---|---|
| #9 | H01 | 🔴 Omissão / Incompletude | H01 - Treinos Padronizados Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/9) |
| #23 | H01 | 🔴 Omissão / Incompletude | H01 - Impacto da Edição do Template em Treinos Ativos (CA04) | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/23) |
| #4 | H01 | 🔴 Omissão / Incompletude | H01 - Treinos Padronizados Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/4) |
| #13 | H01 | 🔴 Omissão / Incompletude | H01 - Inconsistência na Especificação de Erro: Validação de Nomes de Treino (RN02) | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/13) |
| #10 | H01 | 🔴 Omissão / Incompletude | H01 - Falta de Especificação Técnica: Cadastro e Replicação de Treinos | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/10) |
| #11 | H01 | ⚫ Defeito de especificação | H01 - Validação de template sem exercícios | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/11) |
| #36 | H02 | 🟠 Ambiguidade | H02 - Dashboard Centralizado Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/36) |
| #12 | H02 | 🔴 Omissão / Incompletude | H02 - Incompletude nos Critérios de Classificação e Filtro de Alunos | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/12) |
| #5 | H02 | 🟣 Contradição | H02 - Contradição entre dados em tempo real e histórico de 4 semanas | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/5) |
| #6 | H01/H10 | 🟣 Contradição | Conflito entre requisitos de cadastro (H01) e publicação de treino (H10) | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/6) |
| #7 | H02 | 🔴 Omissão / Incompletude | H02 - Dashboard Centralizado Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/7) |
| #8 | H02 | 🟣 Contradição | H02 - Dashboard Centralizado Defeito 2 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/8) |
| #16 | H02 | ⚫ Defeito de especificação | H02 Definição de “tempo real” no processamento de dados | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/16) |
| #50 | H03 | 🟠 Ambiguidade | H03 - Indefinição da Estratégia de Gatilho para Atualização de Dados | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/50) |
| #14 | H03 | 🟠 Ambiguidade | H03 - Relatórios Automáticos de Evolução Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/14) |
| #25 | H07 | 🟠 Ambiguidade | H07 - Fluxo de "Primeiros Passos" Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/25) |
| #26 | H07 | 🔴 Omissão / Incompletude | H07 - Fluxo de "Primeiros Passos" Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/26) |
| #27 | H07 | 🟠 Ambiguidade | H07 - Fluxo de "Primeiros Passos" Defeito 3 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/27) |
| #19 | H08 | ⚫ Defeito de especificação | H08 - Atalhos de Teclado e Gestos Desktop | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/19) |
| #28 | H09 | 🔴 Omissão / Incompletude | H09 - Alertas de Evasão Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/28) |
| #17 | H09 | 🟠 Ambiguidade | H09 – Critério indefinido para disparo de alertas de ausência | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/17) |
| #29 | H10 | 🟣 Contradição | H10 - Vídeos Explicativos de Exercícios Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/29) |
| #30 | H10 | 🟠 Ambiguidade | H10 – Definição de qualidade mínima de vídeo | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/30) |
| #31 | H11 | 🔴 Omissão / Incompletude | H11 - Registro de Cargas e Repetições Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/31) |
| #32 | H11 | 🟣 Contradição | H11 - Registro de Cargas e Repetições Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/32) |
| #33 | H11 | 🟠 Ambiguidade | H11 - Registro de Cargas e Repetições Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/33) |
| #34 | H12 | 🔴 Omissão / Incompletude | H12 - Notificações de Lembrete Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/34) |
| #35 | H12 | 🔴 Omissão / Incompletude | H12 - Notificações de Lembrete Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/35) |
| #49 | H13 | 🔴 Omissão / Incompletude | H13 - Gráficos de Evolução Física Defeito 1 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/49) |
| #51 | H14 | 🔴 Omissão / Incompletude | H14 - Sincronização com Smartwatch Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/51) |
| #48 | H14 | 🟠 Ambiguidade | H14 - Sincronização com Smartwatch Defeito 2 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/48) |
| #46 | H15 | 🟠 Ambiguidade | H15 - Compartilhamento em Redes Sociais Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/46) |
| #47 | H15 | 🔴 Omissão / Incompletude | H15 - Compartilhamento em Redes Sociais Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/47) |
| #44 | H16 | ⚫ Defeito de especificação | H16 - Acessibilidade Visual - Backlog Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/44) |
| #3 | H16 | 🟣 Contradição | H16 - Identificador duplicado e ausência do item H19 no backlog | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/3) |
| #45 | H16 | 🔴 Omissão / Incompletude | H16 - Acessibilidade Visual - Backlog Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/45) |
| #41 | H17 | 🔴 Omissão / Incompletude | H17 - Acessibilidade Visual Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/41) |
| #42 | H17 | 🟠 Ambiguidade | H17 - Acessibilidade Visual Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/42) |
| #43 | H17 | 🔵 Informação estranha | H17 - Acessibilidade Visual Defeito 1 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/43) |
| #37 | H18 | 🔴 Omissão / Incompletude | H18 - Comandos de Voz para Cronômetro Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/37) |
| #38 | H18 | 🔴 Omissão / Incompletude | H18 - Comandos de Voz para Cronômetro Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/38) |
| #39 | H18 | 🔴 Omissão / Incompletude | H18 - Comandos de Voz para Cronômetro Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/39) |
| #21 | H20 | 🟠 Ambiguidade | H20 - Feedback Vibratório Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/21) |
| #20 | H20 | 🔴 Omissão / Incompletude | H20 - Feedback Vibratório Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/20) |
| #2 | Geral | ⚫ Defeito de especificação | Histórias de usuário sem descrição, critérios de aceitação ou regras de negócio | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/2) |

> **Leitura recomendada:** use a matriz acima para verificar todas as issues e consulte os exemplos abaixo para entender os tratamentos mais relevantes sem repetir descrições extensas.

---

## 6. Exemplos Relevantes de Tratamento

Para evitar repetição excessiva, esta seção **não detalha todas as issues individualmente**. A matriz de rastreabilidade já registra todas as issues identificadas, suas histórias relacionadas, seus tipos e suas avaliações.

Os itens abaixo foram selecionados como exemplos representativos por apresentarem impacto direto na clareza dos requisitos, na testabilidade, na rastreabilidade do backlog ou na definição de comportamento do sistema.

| Exemplo | História | Issue | Motivo da seleção | Avaliação da Issue |
|---|---|---|---|---|
| 1 | H01 | #11 | Define bloqueio objetivo para cadastro de template inválido | ✅ Corrigida |
| 2 | H02 | #36 | Resolve lacuna importante sobre alunos híbridos | ✅ Corrigida |
| 3 | H03 | #12 | Define período temporal dos relatórios | ✅ Corrigida |
| 4 | H06 | #40 | Transforma história sem critérios em requisito testável | ✅ Corrigida |
| 5 | H11 | #33 | Remove ambiguidade no fluxo de conclusão de séries | ✅ Corrigida |
| 6 | H13 | #49 | Reavalia e refina métricas de evolução física | 🔎 Reavaliada |
| 7 | H15 | #47 | Registra decisão de manter fora do escopo nesta etapa | ⚪ Não corrigida |
| 8 | H17 | #42 | Substitui termo subjetivo por valores visuais exatos | ✅ Corrigida |
| 9 | H18 | #38 | Define tratamento de falha em ambiente ruidoso | ✅ Corrigida |
| 10 | H20 | #21 | Especifica padrão de feedback vibratório | ✅ Corrigida |

---

### Exemplo 1 — H01: Validação de template sem exercícios

| Campo | Informação |
|---|---|
| Issue | `#11` |
| História relacionada | `H01` |
| Tipo identificado | Defeito de especificação |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/11) |

**Descrição resumida da issue**

A issue apontou que não estava definido o comportamento do sistema quando o personal tentasse salvar um template sem exercícios válidos.

**Registro de alteração aplicada**

Foi especificado que o botão de salvar não deve ficar disponível enquanto o treino padrão não possuir pelo menos um exercício cadastrado com suas informações obrigatórias.

**Impacto no backlog**

A história H01 passou a ter uma regra mais objetiva para impedir cadastro incompleto de treinos padronizados.

---

### Exemplo 2 — H02: Classificação de alunos híbridos

| Campo | Informação |
|---|---|
| Issue | `#36` |
| História relacionada | `H02` |
| Tipo identificado | Omissão / Incompletude |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/36) |

**Descrição resumida da issue**

A issue indicou que o backlog diferenciava alunos online e presenciais, mas não definia o comportamento para alunos que realizam sessões nas duas modalidades.

**Registro de alteração aplicada**

Foi adicionada a categoria **Híbrido** como terceira opção de classificação e filtro. Também foi definido que um aluno híbrido deve possuir pelo menos uma sessão presencial e uma sessão online no histórico.

**Impacto no backlog**

A H02 passou a contemplar corretamente os três perfis de atendimento: online, presencial e híbrido, evitando duplicidade ou classificação incorreta na listagem.

---

### Exemplo 3 — H03: Definição de período temporal dos relatórios

| Campo | Informação |
|---|---|
| Issue | `#12` |
| História relacionada | `H03` |
| Tipo identificado | Omissão / Incompletude |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/12) |

**Descrição resumida da issue**

A issue apontou que o relatório de evolução não definia qual recorte temporal seria utilizado para processar os dados do aluno.

**Registro de alteração aplicada**

Foram adicionadas opções de período para geração do relatório, permitindo que o personal escolha o intervalo de análise antes de gerar o documento.

**Impacto no backlog**

A H03 tornou-se mais testável, pois o relatório passou a possuir parâmetros temporais claros para sua geração.

---

### Exemplo 4 — H06: Interface visual com ícones e cores

| Campo | Informação |
|---|---|
| Issue | `#40` |
| História relacionada | `H06` |
| Tipo identificado | Defeito de especificação |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/40) |

**Descrição resumida da issue**

A issue apontou que a história não possuía critérios de aceitação nem regras de negócio suficientes para definir status, cores, ícones e comportamento de alteração.

**Registro de alteração aplicada**

Foram definidos os status **Ativo** e **Inativo**, com representação visual por cor e ícone. Também foi adicionada regra para cálculo automático do status e registro de data quando houver alteração manual.

**Impacto no backlog**

A H06 deixou de ser uma história genérica e passou a ter comportamento visual e funcional verificável por testes.

---

### Exemplo 5 — H11: Fluxo de conclusão de séries

| Campo | Informação |
|---|---|
| Issue | `#33` |
| História relacionada | `H11` |
| Tipo identificado | Ambiguidade |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/33) |

**Descrição resumida da issue**

A issue apontou ambiguidade no botão de confirmação, pois não estava claro se ele levava para a próxima série ou para o próximo exercício.

**Registro de alteração aplicada**

O comportamento foi separado em dois estados: **Concluir Série**, enquanto ainda existem séries restantes, e **Próximo Exercício**, quando a última série planejada já foi confirmada.

**Impacto no backlog**

A H11 passou a diferenciar claramente o fim de uma série e o fim de um exercício, reduzindo erro de interpretação no fluxo de treino.

---

### Exemplo 6 — H13: Métricas de evolução física

| Campo | Informação |
|---|---|
| Issue | `#49` |
| História relacionada | `H13` |
| Tipo identificado | Omissão / Incompletude |
| Avaliação da Issue | 🔎 **Reavaliada** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/49) |

**Descrição resumida da issue**

A issue indicou que a história mencionava gráficos de evolução física, mas não especificava quais métricas comporiam essa evolução.

**Registro de alteração aplicada**

Foram especificadas métricas como peso corporal, percentual de gordura corporal e medidas corporais. A observação foi tratada como refinamento de clareza do requisito.

**Impacto no backlog**

A H13 ganhou maior precisão para desenvolvimento e testes, sem que a equipe classificasse o apontamento como defeito bloqueante.

---

### Exemplo 7 — H15: Compartilhamento em redes sociais

| Campo | Informação |
|---|---|
| Issue | `#47` |
| História relacionada | `H15` |
| Tipo identificado | Omissão / Incompletude |
| Avaliação da Issue | ⚪ **Não corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/47) |

**Descrição resumida da issue**

A issue apontou que a história não especificava quais redes sociais seriam integradas para compartilhamento.

**Registro de alteração aplicada**

A equipe avaliou que a funcionalidade não fazia parte do escopo especificado nesta etapa, pois a história permaneceu no backlog e não foi movida para detalhamento completo.

**Impacto no backlog**

A história foi mantida sem alteração nesta etapa, podendo ser refinada futuramente caso seja priorizada.

---

### Exemplo 8 — H17: Cores do modo de alto contraste

| Campo | Informação |
|---|---|
| Issue | `#42` |
| História relacionada | `H17` |
| Tipo identificado | Ambiguidade |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/42) |

**Descrição resumida da issue**

A issue apontou ambiguidade no termo “amarelo ou branco vibrante”, pois não havia definição exata da cor nem de quem escolheria essa variação.

**Registro de alteração aplicada**

Foi definida uma combinação fixa para o alto contraste: fundo preto `#000000` e texto amarelo `#FFD600`.

**Impacto no backlog**

A H17 passou a ter especificação visual objetiva, removendo subjetividade e facilitando implementação e validação.

---

### Exemplo 9 — H18: Falha de reconhecimento de voz

| Campo | Informação |
|---|---|
| Issue | `#38` |
| História relacionada | `H18` |
| Tipo identificado | Omissão / Incompletude |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/38) |

**Descrição resumida da issue**

A issue apontou que a funcionalidade de comando de voz não considerava o ambiente ruidoso de academia, onde o reconhecimento pode falhar.

**Registro de alteração aplicada**

Foi adicionado comportamento após duas tentativas de reconhecimento malsucedidas, com feedback sonoro e botão visual de fallback para controle manual do cronômetro.

**Impacto no backlog**

A H18 passou a prever um fluxo de exceção realista, evitando que o usuário fique sem alternativa quando a voz não for reconhecida.

---

### Exemplo 10 — H20: Padrão de feedback vibratório

| Campo | Informação |
|---|---|
| Issue | `#21` |
| História relacionada | `H20` |
| Tipo identificado | Ambiguidade |
| Avaliação da Issue | ✅ **Corrigida** |
| Link | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/21) |

**Descrição resumida da issue**

A issue apontou que o termo “feedback vibratório” era genérico e não definia intensidade, duração ou padrão da vibração.

**Registro de alteração aplicada**

Foi especificado o padrão esperado de vibração, diferenciando o feedback de conclusão de série de notificações comuns do sistema.

**Impacto no backlog**

A H20 passou a ter comportamento sensorial mais claro, especialmente importante para o usuário com baixa visão.

[⬆ Voltar à Matriz de Rastreabilidade](#5-matriz-de-rastreabilidade)

---


