# 🧾 Tratamento das Issues de Inspeção — TrainerX64

---

## Sumário

| # | Seção | Conteúdo |
|---|---|---|
| 1 | [Contexto da Inspeção](#1-contexto-da-inspeção) | Origem das issues e objetivo do documento |
| 2 | [Critérios de Tratamento](#2-critérios-de-tratamento) | Como as issues foram classificadas |
| 3 | [Resumo Geral](#3-resumo-geral) | Quantitativo por decisão, tipo e história |
| 4 | [Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade) | Visão geral das issues e decisões |
| 5 | [Detalhamento das Issues](#5-detalhamento-das-issues) | Descrição da issue seguida do comentário de tratamento |
| 6 | [Comentários sem Associação Direta](#6-comentários-sem-associação-direta) | Comentários presentes no material sem issue numerada correspondente |
| 7 | [Conclusão](#7-conclusão) | Síntese da etapa de inspeção |

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
Comentário da equipe
        ↓
Decisão / status final
```

### Fontes utilizadas

| Fonte | Descrição | Link / Referência |
|---|---|---|
| GitHub Project | Projeto/backlog utilizado pela equipe | [soft-x64/projects/4](https://github.com/orgs/soft-x64/projects/4) |
| Documento enviado | Documento contendo descrições das issues e comentários de tratamento | `H01.docx` |
| Repositório das issues | Repositório público identificado no material | [soft-x64/projeto-pratico-es](https://github.com/soft-x64/projeto-pratico-es) |

> **Observação:** o material enviado contém **48 registros de issues identificáveis** neste documento. Em conversas anteriores foi mencionada a existência de 51 issues; esta versão preserva e organiza as issues efetivamente presentes no arquivo analisado.

---

## 2. Critérios de Tratamento

As issues foram classificadas conforme a decisão registrada nos comentários da equipe.

| Classificação | Significado |
|---|---|
| ✅ **Corrigida** | A issue foi aceita e resultou em alteração no backlog, critérios, regras ou escopo da história |
| 🟡 **Corrigida com mudança de escopo** | A issue foi tratada por alteração explícita de escopo, simplificação ou remoção de comportamento problemático |
| 🔎 **Reavaliada** | A observação foi considerada válida como refinamento, mas não necessariamente como defeito bloqueante |
| ⚪ **Não corrigida** | A equipe justificou que a issue não seria tratada nesta etapa ou não fazia parte do escopo especificado |
| ⏳ **Pendente** | A issue depende de alinhamento futuro, decisão de UX, arquitetura ou validação externa |
| ➖ **Sem comentário** | O material não apresentou comentário de tratamento suficiente ou claramente associado |

---

## 3. Resumo Geral

### 3.1 Issues por decisão

| Decisão | Quantidade |
|---|---:|
| ✅ Corrigida | 29 |
| ⚪ Não corrigida | 10 |
| 🔎 Reavaliada | 4 |
| ➖ Sem comentário específico | 2 |
| 🟡 Corrigida com mudança de escopo | 1 |
| ⏳ Pendente | 1 |
| ➖ Sem comentário | 1 |

### 3.2 Issues por tipo de problema

| Tipo de problema | Quantidade |
|---|---:|
| 🔴 Omissão / Incompletude | 22 |
| 🟠 Ambiguidade | 13 |
| ⚫ Defeito de especificação | 6 |
| 🟣 Contradição | 6 |
| 🔵 Informação estranha | 1 |

### 3.3 Issues por história

| História | Quantidade de issues |
|---|---:|
| H01 | 3 |
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

## 4. Matriz de Rastreabilidade

| Issue | História | Tipo | Título | Decisão | Link |
|---|---|---|---|---|---|
| Sem nº | H01 | 🔴 Omissão / Incompletude | H01 - Inconsistência na Especificação de Erro: Validação de Nomes de Treino (RN02) | ✅ Corrigida | — |
| #9 | H01 | 🔴 Omissão / Incompletude | H01 - Falta de Especificação Técnica: Cadastro e Replicação de Treinos | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/9) |
| #10 | H01 | ⚫ Defeito de especificação | H01 - Validação de template sem exercícios | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/10) |
| #6 | H01/H10 | 🟣 Contradição | Conflito entre requisitos de cadastro (H01) e publicação de treino (H10) | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/6) |
| #11 | H02 | 🟠 Ambiguidade | H02 - Dashboard Centralizado Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/11) |
| #36 | H02 | 🔴 Omissão / Incompletude | H02 - Incompletude nos Critérios de Classificação e Filtro de Alunos | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/36) |
| #5 | H02 | 🟣 Contradição | H02 - Contradição entre dados em tempo real e histórico de 4 semanas | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/5) |
| #7 | H02 | 🔴 Omissão / Incompletude | H02 - Dashboard Centralizado Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/7) |
| #8 | H02 | 🟣 Contradição | H02 - Dashboard Centralizado Defeito 2 | 🟡 Corrigida com mudança de escopo | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/8) |
| #16 | H02 | ⚫ Defeito de especificação | H02 Definição de “tempo real” no processamento de dados | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/16) |
| #12 | H03 | 🔴 Omissão / Incompletude | H03 - Relatórios Automáticos de Evolução Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/12) |
| #15 | H03 | 🔴 Omissão / Incompletude | H03 - Relatórios Automáticos de Evolução Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/15) |
| #50 | H03 | 🟠 Ambiguidade | H03 - Indefinição da Estratégia de Gatilho para Atualização de Dados | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/50) |
| #14 | H03 | 🟠 Ambiguidade | H03 - Relatórios Automáticos de Evolução Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/14) |
| #22 | H04 | 🟠 Ambiguidade | H04 - App em Português Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/22) |
| #24 | H05 | 🔴 Omissão / Incompletude | H05 - Chat Direto Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/24) |
| #40 | H06 | ⚫ Defeito de especificação | H06 - Interface Visual Baseada em Ícones e Cores | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/40) |
| #18 | H07 | 🔴 Omissão / Incompletude | H07 - Falta de Definição das Funções Críticas para o Roteiro do Tutorial | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/18) |
| #25 | H07 | 🟠 Ambiguidade | H07 - Fluxo de "Primeiros Passos" Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/25) |
| #26 | H07 | 🔴 Omissão / Incompletude | H07 - Fluxo de "Primeiros Passos" Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/26) |
| #27 | H07 | 🟠 Ambiguidade | H07 - Fluxo de "Primeiros Passos" Defeito 3 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/27) |
| #19 | H08 | ⚫ Defeito de especificação | H08 - Atalhos de Teclado e Gestos Desktop | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/19) |
| #28 | H09 | 🔴 Omissão / Incompletude | H09 - Alertas de Evasão Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/28) |
| #17 | H09 | 🟠 Ambiguidade | H09 – Critério indefinido para disparo de alertas de ausência | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/17) |
| #29 | H10 | 🟣 Contradição | H10 - Vídeos Explicativos de Exercícios Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/29) |
| #30 | H10 | 🟠 Ambiguidade | H10 – Definição de qualidade mínima de vídeo | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/30) |
| #31 | H11 | 🔴 Omissão / Incompletude | H11 - Registro de Cargas e Repetições Defeito 1 | ⏳ Pendente | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/31) |
| #32 | H11 | 🟣 Contradição | H11 - Registro de Cargas e Repetições Defeito 2 | ➖ Sem comentário específico | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/32) |
| #33 | H11 | 🟠 Ambiguidade | H11 - Registro de Cargas e Repetições Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/33) |
| #34 | H12 | 🔴 Omissão / Incompletude | H12 - Notificações de Lembrete Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/34) |
| #35 | H12 | 🔴 Omissão / Incompletude | H12 - Notificações de Lembrete Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/35) |
| #49 | H13 | 🔴 Omissão / Incompletude | H13 - Gráficos de Evolução Física Defeito 1 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/49) |
| #51 | H14 | 🔴 Omissão / Incompletude | H14 - Sincronização com Smartwatch Defeito 1 | ➖ Sem comentário específico | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/51) |
| #48 | H14 | 🟠 Ambiguidade | H14 - Sincronização com Smartwatch Defeito 2 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/48) |
| #46 | H15 | 🟠 Ambiguidade | H15 - Compartilhamento em Redes Sociais Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/46) |
| #47 | H15 | 🔴 Omissão / Incompletude | H15 - Compartilhamento em Redes Sociais Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/47) |
| #44 | H16 | ⚫ Defeito de especificação | H16 - Acessibilidade Visual - Backlog Defeito 2 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/44) |
| #3 | H16 | 🟣 Contradição | H16 - Identificador duplicado e ausência do item H19 no backlog | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/3) |
| #45 | H16 | 🔴 Omissão / Incompletude | H16 - Acessibilidade Visual - Backlog Defeito 1 | ⚪ Não corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/45) |
| #41 | H17 | 🔴 Omissão / Incompletude | H17 - Acessibilidade Visual Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/41) |
| #42 | H17 | 🟠 Ambiguidade | H17 - Acessibilidade Visual Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/42) |
| #43 | H17 | 🔵 Informação estranha | H17 - Acessibilidade Visual Defeito 1 | 🔎 Reavaliada | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/43) |
| #37 | H18 | 🔴 Omissão / Incompletude | 18 - Comandos de Voz para Cronômetro Defeito 3 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/37) |
| #38 | H18 | 🔴 Omissão / Incompletude | H18 - Comandos de Voz para Cronômetro Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/38) |
| #39 | H18 | 🔴 Omissão / Incompletude | H18 - Comandos de Voz para Cronômetro Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/39) |
| #21 | H20 | 🟠 Ambiguidade | H20 - Feedback Vibratório Defeito 1 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/21) |
| #20 | H20 | 🔴 Omissão / Incompletude | H20 - Feedback Vibratório Defeito 2 | ✅ Corrigida | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/20) |
| #2 | Geral | ⚫ Defeito de especificação | Histórias de usuário sem descrição, critérios de aceitação ou regras de negócio | ➖ Sem comentário | [Abrir issue](https://github.com/soft-x64/projeto-pratico-es/issues/2) |

> **Leitura recomendada:** use a matriz acima para uma visão rápida e consulte o detalhamento abaixo para verificar a descrição original da issue e o comentário de tratamento da equipe.

---

## 5. Detalhamento das Issues

Cada item abaixo segue o mesmo padrão:

```text
Identificação da issue
Descrição do problema
Trecho do requisito
Comentário da equipe
Decisão final
```

### H01

#### Sem número no documento — H01 - Inconsistência na Especificação de Erro: Validação de Nomes de Treino (RN02)

| Campo | Informação |
|---|---|
| História relacionada | `H01` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | — |

**Descrição da issue**

> A regra de negócio estabelece que o nome do template deve ser único por personal, mas não define o que ocorre quando um personal tenta salvar um template com nome duplicado: o sistema deve bloquear com mensagem de erro, sugerir um nome alternativo, ou outro comportamento?

**Trecho do requisito inspecionado**

> "O sistema não deve permitir o cadastro de dois treinos padronizados com o mesmo nome para o mesmo Personal"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H01.

Foi especificado o comportamento esperado quando houver nome duplicado de treino:
- foi detalhado que o sistema deve exibir mensagem de erro caso exista um treino com o mesmo nome para o mesmo personal.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #9 — H01 - Falta de Especificação Técnica: Cadastro e Replicação de Treinos

| Campo | Informação |
|---|---|
| História relacionada | `H01` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/9) |

**Descrição da issue**

> A história não define o que são "treinos padronizados", quais campos os compõem, nem o que significa "objetivos similares", não há critério para agrupamento de alunos.

**Trecho do requisito inspecionado**

> “Enquanto personal, desejo cadastrar treinos padronizados para replicá-los rapidamente entre alunos com objetivos similares.”

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H01.

Foi especificado o que são treinos padronizados e objetivos similares:
- treino padrão foi definido como um treino com a mesma base de exercícios;
- objetivos similares foram definidos como treinos de mesma categoria.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #10 — H01 - Validação de template sem exercícios

| Campo | Informação |
|---|---|
| História relacionada | `H01` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/10) |

**Descrição da issue**

> Não está definido o que acontece caso o personal tente salvar um template sem exercícios válidos (ex: mensagem de erro, bloqueio, feedback).

**Trecho do requisito inspecionado**

> H01 - Enquanto personal, desejo cadastrar treinos padronizados para replicá-los rapidamente entre alunos com objetivos similares.
> RN - “Um template só pode ser salvo se possuir... pelo menos 1 exercício...”

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H01.

Foi descrita a forma de bloqueio quando não houver nenhum exercício cadastrado:
- o botão de salvar não ficará disponível enquanto as condições mínimas não forem atendidas.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H01/H10

#### #6 — Conflito entre requisitos de cadastro (H01) e publicação de treino (H10)

| Campo | Informação |
|---|---|
| História relacionada | `H01/H10` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/6) |

**Descrição da issue**

> Em H10, a regra de negócio afirma que o personal não pode publicar um treino se o exercício não tiver vídeo ou imagem alternativa. Porém, H01 descreve o cadastro de treinos padronizados sem nenhuma menção à obrigatoriedade de vídeo/imagem. Há contradição entre as duas histórias: um treino pode ser salvo sem mídia em H01, mas não pode ser publicado sem mídia segundo H10.

**Trecho do requisito inspecionado**

> H10 RN: "O sistema não deve permitir que um Personal Trainer publique um treino para o aluno se o exercício selecionado não possuir um vídeo correspondente ou uma imagem técnica alternativa."
> H01 RN: "Um template só pode ser salvo se possuir, no mínimo, um Nome de Identificação e pelo menos 1 exercício cadastrado com suas respectivas séries e repetições."

**Comentário / tratamento registrado pela equipe**

Resolução da contradição de mídia.

Foi definido que o cadastro de um template de treino estrutural, relacionado à H01, aceita exercícios sem anexo de mídia, contendo apenas texto de séries e repetições.

Entretanto, a publicação direta para a linha do tempo do aluno, relacionada à H10, passa a exigir obrigatoriamente imagem técnica ou vídeo explicativo.

O sistema contará com validação em nível de serviço para barrar a publicação e alertar o personal caso o exercício anexado esteja incompleto.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H02

#### #11 — H02 - Dashboard Centralizado Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/11) |

**Descrição da issue**

> O critério de aceitação utiliza o termo "gráfico de desempenho", que é extremamente genérico e passível de múltiplas interpretações. Embora a regra de negócio mencione "cargas e repetições", não fica claro qual métrica exata o gráfico vai plotar ao longo das 4 semanas (Frequência de treinos? Volume total de peso levantado? Progressão de carga de um exercício específico?). Isso gera incerteza sobre o que a tela de fato vai mostrar.

**Trecho do requisito inspecionado**

> "Ao clicar em um aluno, o sistema deve abrir uma visão detalhada com o gráfico de desempenho das últimas 4 semanas."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H02.

Foi especificado como funciona o gráfico de desempenho:
- foi definido que o personal poderá escolher qual categoria o gráfico deve apresentar.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #36 — H02 - Incompletude nos Critérios de Classificação e Filtro de Alunos

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/36) |

**Descrição da issue**

> O CA menciona um filtro entre alunos "Online" e "Presenciais", e a RN fala em visualização segregada entre os dois grupos, mas nenhum dos dois documentos define o que acontece com alunos que sejam híbridos, isto é, que realizam tanto sessões presenciais quanto online com o mesmo personal.

**Trecho do requisito inspecionado**

> RN01: "visualização segregada entre alunos de atendimento presencial e alunos de consultoria online" CA02: "filtro funcional para selecionar apenas alunos 'Online' ou apenas 'Presenciais'"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H02.

A lacuna sobre alunos híbridos, isto é, alunos com sessões presenciais e online com o mesmo personal, foi resolvida:
- adicionada a categoria **Híbrido** como terceira opção de classificação e filtro, ao lado de **Online** e **Presencial**;
- definida a regra de classificação: aluno é híbrido quando possui pelo menos uma sessão de cada modalidade no histórico;
- esclarecido que um aluno híbrido não aparece duplicado nos filtros individuais, aparecendo somente no filtro **Híbridos**;
- adicionado que a visão detalhada do aluno híbrido deve indicar a modalidade de cada sessão no gráfico de desempenho.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #5 — H02 - Contradição entre dados em tempo real e histórico de 4 semanas

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/5) |

**Descrição da issue**

> Em H02, o critério de aceitação diz que ao clicar em um aluno o sistema abre "gráfico de desempenho das últimas 4 semanas", mas a regra de negócio diz que os dados devem ser processados "em tempo real". Há contradição: dados históricos de 4 semanas não são equivalentes a dados em tempo real.

**Trecho do requisito inspecionado**

> RN: "O sistema deve processar os dados de execução para gerar indicadores de evolução em tempo real."
> CA: "o sistema deve abrir uma visão detalhada com o gráfico de desempenho das últimas 4 semanas."

**Comentário / tratamento registrado pela equipe**

A regra de negócio foi ajustada para especificar que o motor do sistema processa os dados de execução de forma imediata, em tempo real, à medida que os treinos são concluídos.

O critério de aceitação foi redefinido para esclarecer que a interface exibe o acumulado histórico de quatro semanas atualizado dinamicamente até o momento da última sincronização do aluno.

Com isso, o conflito conceitual entre dado imediato e gráfico histórico foi eliminado.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #7 — H02 - Dashboard Centralizado Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/7) |

**Descrição da issue**

> O critério de aceitação exige a exibição do "último status de atividade", mas o requisito omite completamente quais são os possíveis status que o sistema deve suportar (ex: "Treino em andamento", "Inativo há X dias", "Treino concluído hoje"). Sem a definição de quais são esses status e as regras para o aluno transitar entre eles, o desenvolvedor não saberá o que programar para essa coluna.

**Trecho do requisito inspecionado**

> "O personal deve visualizar na tela inicial uma lista com o nome de todos os alunos cadastrados e seu último status de atividade."

**Comentário / tratamento registrado pela equipe**

Inclusão da máquina de estados do aluno.

Foi suprida a omissão dos estados possíveis do aluno. Foi incluída uma enumeração explícita de controle no documento de requisitos:
- Treino em Andamento;
- Treino Concluído Hoje;
- Ativo / Frequente;
- Inativo / Sem registro há mais de 14 dias;
- Pendente / Inadimplente.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #8 — H02 - Dashboard Centralizado Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | 🟡 Corrigida com mudança de escopo |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/8) |

**Descrição da issue**

> Existe uma contradição direta entre as regras de negócio e os critérios de aceitação. A regra de negócio diz que o sistema deve "respeitar a privacidade" do aluno, mas o critério de aceitação afirma que a lista vai mostrar "todos os alunos cadastrados" e que o personal poderá abrir uma "visão detalhada" ao clicar. Se o aluno configurar seu perfil como privado, o que acontece? Ele some da lista? O gráfico fica bloqueado? O requisito é inconsistente ao não tratar essa exceção.

**Trecho do requisito inspecionado**

> "O acesso aos dados de cada aluno deve respeitar a privacidade configurada no perfil do usuário." versus "O personal deve visualizar na tela inicial uma lista com o nome de todos os alunos cadastrados... Ao clicar em um aluno, o sistema deve abrir uma visão detalhada..."

**Comentário / tratamento registrado pela equipe**

Mudança de escopo por complexidade.

Após análise da equipe, determinou-se que o conceito de perfil privado traria complexidade desnecessária para esta fase do MVP.

A regra foi alterada: todos os alunos vinculados a um personal trainer compartilham obrigatoriamente seus dados de evolução com ele.

A flag de privacidade foi removida do backlog da sprint.

Marcando esta issue como **Corrigida com ajuste de escopo**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #16 — H02 Definição de “tempo real” no processamento de dados

| Campo | Informação |
|---|---|
| História relacionada | `H02` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/16) |

**Descrição da issue**

> A regra de negócio afirma que o sistema deve processar dados "em tempo real", mas nenhum critério de aceitação específica o que isso significa em termos mensuráveis (ex: atualização a cada X segundos). O termo é vago e pode ser interpretado de formas diferentes.

**Trecho do requisito inspecionado**

> H02-Enquanto personal, desejo visualizar um dashboard centralizado para acompanhar o progresso de todos os meus alunos (presenciais e online).
> RN - "O sistema deve processar os dados de execução (cargas e repetições) para gerar indicadores de evolução em tempo real."

**Comentário / tratamento registrado pela equipe**

Métrica de tempo real especificada.

O termo ambíguo "tempo real" foi quantificado para fins de testes de aceitação de software.

Ficou estabelecido via requisito não funcional que o processamento e a sincronização do dashboard devem atualizar os indicadores na tela do personal trainer em até 15 segundos após a conclusão das atividades.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H03

#### #12 — H03 - Relatórios Automáticos de Evolução Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H03` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/12) |

**Descrição da issue**

> O requisito determina a geração de relatórios, mas omite completamente a definição do recorte temporal (período de tempo). O personal vai gerar um relatório do mês atual? Dos últimos 3 meses? De todo o período desde que o aluno se matriculou? Sem a definição de um filtro de datas ou de um período padrão, o sistema não saberá qual intervalo de dados processar na hora de montar o documento.

**Trecho do requisito inspecionado**

> "Deve gerar relatórios com dados de evolução (cargas, frequência e desempenho)" e "Deve permitir selecionar o aluno para geração do relatório"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H03.

Foi acrescentada a função de período temporal:
- foram adicionadas quatro opções de período para geração dos relatórios.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #15 — H03 - Relatórios Automáticos de Evolução Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H03` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/15) |

**Descrição da issue**

> A regra de negócio afirma que o acesso ao relatório abrange o personal e o "aluno relacionado", mas os critérios de aceitação omitem completamente como o aluno visualiza isso. Já que apenas o personal pode "gerar" o relatório, como ele chega até o aluno? O sistema envia uma notificação? Há um botão de "compartilhar" após gerar o PDF? A funcionalidade que conecta o documento gerado ao aplicativo do aluno está faltando.

**Trecho do requisito inspecionado**

> "Apenas personal trainers podem gerar relatórios" versus "O acesso aos relatórios deve ser restrito ao personal e ao aluno relacionado"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H03.

Foi especificada a forma de o aluno ter acesso aos relatórios:
- a história passou a informar que o personal pode enviar o relatório ao aluno via aplicativo.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #50 — H03 - Indefinição da Estratégia de Gatilho para Atualização de Dados

| Campo | Informação |
|---|---|
| História relacionada | `H03` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/50) |

**Descrição da issue**

> O CA afirma que os dados devem ser atualizados "automaticamente conforme novos treinos são registrados", mas não define se o relatório é recalculado em tempo real a cada novo registro ou apenas na próxima vez que for aberto. Essa distinção impacta diretamente a arquitetura e o desempenho do sistema.

**Trecho do requisito inspecionado**

> CA05: "Deve atualizar automaticamente os dados conforme novos treinos são registrados"

**Comentário / tratamento registrado pela equipe**

Definição de gatilho de atualização.

Foi sanada a indefinição de desempenho e arquitetura. O sistema adotará a estratégia de **Lazy Evaluation / On-Demand Re-calculation**.

Os dados não serão processados a cada inserção no banco para evitar sobrecarga. Em vez disso, o gatilho de recálculo do relatório será disparado quando o personal trainer abrir ou atualizar a tela de relatórios do respectivo aluno.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #14 — H03 - Relatórios Automáticos de Evolução Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H03` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/14) |

**Descrição da issue**

> O uso do termo "desempenho" como um dos dados que compõem o relatório é subjetivo e passível de múltiplas interpretações. Diferentes profissionais podem interpretar desempenho de formas distintas (ex: tempo total de descanso, percepção subjetiva de esforço, ou aumento de repetições máximas). É necessário especificar quais métricas exatas o sistema usará para quantificar esse "desempenho".

**Trecho do requisito inspecionado**

> "Deve gerar relatórios com dados de evolução (cargas, frequência e desempenho)"

**Comentário / tratamento registrado pela equipe**

Eliminação de subjetividade comercial.

O termo subjetivo "desempenho" foi removido dos requisitos abstratos e substituído por métricas exatas e testáveis em código:
- volume total de carga acumulada;
- tempo de descanso médio entre séries;
- frequência semanal de presença.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H04

#### #22 — H04 - App em Português Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H04` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/22) |

**Descrição da issue**

> A narrativa afirma o desejo de "configurar o app totalmente em português". Isso gera múltiplas interpretações sobre o funcionamento do sistema. O usuário terá um menu de configurações para selecionar o idioma português (o que implica que o sistema será construído para ser multilíngue) ou o aplicativo já será entregue nativamente e exclusivamente em português?

**Trecho do requisito inspecionado**

> "Enquanto personal, desejo configurar o app totalmente em português para evitar as barreiras linguísticas..."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H04.

A história foi reformulada para especificar melhor que a língua base e padrão do aplicativo é o português.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H05

#### #24 — H05 - Chat Direto Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H05` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/24) |

**Descrição da issue**

> A história menciona a necessidade de "integrar um chat direto no app", mas omite a informação crucial de com quem será essa comunicação. É um chat com a equipe de suporte técnico do aplicativo? É um chat entre diferentes personais? Ou é um chat exclusivo entre o personal e seus respectivos alunos? A ausência dessa informação impede que o desenvolvedor saiba quais tabelas de relacionamento criar no banco de dados.

**Trecho do requisito inspecionado**

> "Enquanto personal, desejo integrar um chat direto no app para centralizar a comunicação..."

**Comentário / tratamento registrado pela equipe**

A ausência da regra de negócio ou critério de aceitação apontado nesta issue decorre do fato de que tais definições não foram solicitadas nem incluídas no escopo original desta história de usuário durante a fase de especificação.

Como a história não foi para a especificação com esses parâmetros, a implementação seguiu estritamente o que estava documentado, não cabendo ajuste no código nesta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H06

#### #40 — H06 - Interface Visual Baseada em Ícones e Cores

| Campo | Informação |
|---|---|
| História relacionada | `H06` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/40) |

**Descrição da issue**

> A história não possui critérios de aceitação nem regras de negócio. Não há definição de quais status existem, quais cores ou ícones representam cada um, nem como o sistema deve se comportar ao mudar o status de um aluno.

**Trecho do requisito inspecionado**

> H06 - Enquanto personal, desejo uma interface/visual baseada em ícones e cores para identificar rapidamente o status de cada aluno.

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H06.

A história foi atualizada com os critérios de aceitação e regras de negócio que estavam faltando:
- definidos os dois status possíveis: **Ativo** e **Inativo**;
- definido o mapeamento de cor e ícone para cada status:
  - Ativo → verde / ícone de check;
  - Inativo → vermelho / ícone de X;
- definida a regra de cálculo automático do status, baseada em mensalidade e frequência dos últimos 30 dias;
- definido o comportamento ao alterar o status manualmente, registrando a data da alteração.

A história H06 foi movida de Backlog para Especificação.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H07

#### #18 — H07 - Falta de Definição das Funções Críticas para o Roteiro do Tutorial

| Campo | Informação |
|---|---|
| História relacionada | `H07` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/18) |

**Descrição da issue**

> O CA afirma que o tutorial deve "guiar o usuário pelas principais funcionalidades", mas não especifica quais funcionalidades são consideradas principais nem a ordem em que devem ser apresentadas. Sem essa definição, o escopo do tutorial fica indeterminado e sujeito a interpretações distintas durante o desenvolvimento.

**Trecho do requisito inspecionado**

> "Deve guiar o usuário pelas principais funcionalidades"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H07.

Foram definidos exemplos de guia do tutorial:
- foi especificado quais funcionalidades principais compõem o tutorial.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #25 — H07 - Fluxo de "Primeiros Passos" Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H07` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/25) |

**Descrição da issue**

> O critério de aceitação exige que o tutorial guie o usuário pelas "principais funcionalidades". O uso da palavra "principais" gera ambiguidade, pois é subjetiva e passível de múltiplas interpretações. O desenvolvedor não tem como adivinhar quais são essas funcionalidades essenciais (ex: é o cadastro de alunos? a criação de treinos? a visualização do dashboard?). A lista exata de telas do tutorial foi omitida.

**Trecho do requisito inspecionado**

> "Deve guiar o usuário pelas principais funcionalidades"

**Comentário / tratamento registrado pela equipe**

A ausência da regra de negócio ou critério de aceitação apontado nesta issue decorre do fato de que tais definições não foram solicitadas nem incluídas no escopo original desta história de usuário durante a fase de especificação.

Como a história não foi para a especificação com esses parâmetros, a implementação seguiu estritamente o que estava documentado, não cabendo ajuste nesta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #26 — H07 - Fluxo de "Primeiros Passos" Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H07` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/26) |

**Descrição da issue**

> O critério estabelece que o sistema deve "permitir pular o tutorial", mas omite completamente as regras de negócio para essa ação. O usuário pode pular a qualquer momento (em qualquer passo) ou apenas na tela de boas-vindas? Se ele pular no meio do fluxo, o que acontece com as etapas que ele já configurou? Essa falta de detalhamento deixará o comportamento do botão "pular" à mercê da adivinhação do programador.

**Trecho do requisito inspecionado**

> "Deve permitir pular o tutorial"

**Comentário / tratamento registrado pela equipe**

A ausência da regra de negócio ou critério de aceitação apontado nesta issue decorre do fato de que tais definições não foram solicitadas nem incluídas no escopo original desta história de usuário durante a fase de especificação.

Como a história não foi para a especificação com esses parâmetros, a implementação seguiu estritamente o que estava documentado, não cabendo ajuste nesta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #27 — H07 - Fluxo de "Primeiros Passos" Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H07` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/27) |

**Descrição da issue**

> A narrativa da história utiliza os termos "forma rápida e intuitiva". Assim como o exemplo de "sistema rápido" visto em aula, essas palavras são adjetivos subjetivos que representam requisitos não funcionais difíceis de testar. O que é rápido para um usuário pode não ser para outro. Isso gera múltiplas interpretações sobre qual deve ser o tamanho ou o limite de tempo desse fluxo.

**Trecho do requisito inspecionado**

> "Enquanto personal, desejo um fluxo de "primeiros passos" para aprender a configurar o sistema de forma rápida e intuitiva."

**Comentário / tratamento registrado pela equipe**

A ausência da regra de negócio ou critério de aceitação apontado nesta issue decorre do fato de que tais definições não foram solicitadas nem incluídas no escopo original desta história de usuário durante a fase de especificação.

Como a história não foi para a especificação com esses parâmetros, a implementação seguiu estritamente o que estava documentado, não cabendo ajuste nesta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H08

#### #19 — H08 - Atalhos de Teclado e Gestos Desktop

| Campo | Informação |
|---|---|
| História relacionada | `H08` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/19) |

**Descrição da issue**

> A história não possui critérios de aceitação nem regras de negócio. Não há definição de quais atalhos de teclado ou gestos serão suportados, para quais ações específicas se aplicam, nem em quais sistemas operacionais funcionarão.

**Trecho do requisito inspecionado**

> H08 - Enquanto personal, desejo utilizar atalhos de teclado e gestos na versão desktop para agilizar a montagem de cronogramas semanais.

**Comentário / tratamento registrado pela equipe**

Para esta etapa do trabalho, não foi necessário especificar esta história.

A história permaneceu fora do escopo de especificação detalhada desta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H09

#### #28 — H09 - Alertas de Evasão Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H09` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/28) |

**Descrição da issue**

> A narrativa expressa o desejo de "receber alertas", mas ocorre uma omissão grave sobre o canal de comunicação, faltando uma informação necessária não incluída. O sistema enviará uma notificação push no celular? Um e-mail automatizado? Um pop-up dentro do próprio painel do sistema? Sem definir o meio, a equipe técnica não saberá qual serviço de mensageria implementar.

**Trecho do requisito inspecionado**

> "Enquanto personal, desejo receber alertas quando um aluno faltar..."

**Comentário / tratamento registrado pela equipe**

O critério de aceitação apontado nesta issue decorre de definições que não foram solicitadas nem incluídas no escopo original desta história de usuário durante a fase de especificação.

Como a história não foi para a especificação com esses parâmetros, a implementação seguiu estritamente o que estava documentado, não cabendo ajuste nesta etapa.

Issue fechada como **não corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #17 — H09 – Critério indefinido para disparo de alertas de ausência

| Campo | Informação |
|---|---|
| História relacionada | `H09` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/17) |

**Descrição da issue**

> "Faltar muitos treinos" é subjetivo e não define um limiar numérico (ex.: 3 faltas consecutivas ou 50% de ausência no mês), tornando impossível implementar a regra de disparo do alerta.

**Trecho do requisito inspecionado**

> "Enquanto personal, desejo receber alertas quando um aluno faltar muitos treinos para realizar uma intervenção proativa e evitar a evasão."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H09.

A história foi atualizada:
- foi definido um critério percentual para o personal ser alertado sobre as faltas.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H10

#### #29 — H10 - Vídeos Explicativos de Exercícios Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H10` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/29) |

**Descrição da issue**

> Existe uma contradição direta entre o objetivo central da história e uma das regras de negócio. A narrativa promete explicitamente que a aluna vai "acessar vídeos curtos" para ter autonomia. Porém, a regra de negócio permite que o personal publique o treino usando apenas uma "imagem técnica alternativa". Se o personal cadastrar apenas imagens, o sistema falha em entregar o valor principal proposto pela narrativa da história (que é assistir ao vídeo). Trata-se de uma informação conflitante.

**Trecho do requisito inspecionado**

> "Enquanto aluna, desejo acessar vídeos curtos explicativos..." versus "...se o exercício selecionado não possuir um vídeo correspondente ou uma imagem técnica alternativa..."

**Comentário / tratamento registrado pela equipe**

Alinhamento de valor da narrativa.

Foi corrigido o conflito entre o objetivo de "assistir a vídeos" e a regra que permitia apenas imagens.

A regra foi reescrita:
- o vídeo explicativo passa a ser o formato padrão e obrigatório para o núcleo do aplicativo;
- a imagem estática funcionará apenas como fallback visual.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #30 — H10 – Definição de qualidade mínima de vídeo

| Campo | Informação |
|---|---|
| História relacionada | `H10` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | 🔎 Reavaliada |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/30) |

**Descrição da issue**

> A regra de negócio menciona que em conexão móvel a resolução do vídeo deve ser ajustada para o “patamar mínimo aceitável”, sem definir qual é esse patamar (ex: 360p, 480p). O critério fica subjetivo e não é testável.

**Trecho do requisito inspecionado**

> H10 - Enquanto aluna, desejo acessar vídeos curtos explicativos de cada exercício para garantir a execução correta sem depender do personal.
> RN - “...a resolução do vídeo deve ser ajustada automaticamente para o patamar mínimo aceitável para garantir a fluidez sem travar a execução do treino.”

**Comentário / tratamento registrado pela equipe**

Tratamento delegado à infraestrutura.

A equipe reavaliou o caso e concluiu que o aplicativo não fará a gestão da resolução de vídeo via código nativo.

Essa responsabilidade foi delegada ao player da CDN/plataforma de streaming contratada, como Vimeo ou YouTube API, que já possui algoritmos nativos de ajuste automático de bitrate com base na rede do usuário.

Marcando esta issue como **Reavaliada**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H11

#### #31 — H11 - Registro de Cargas e Repetições Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H11` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⏳ Pendente |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/31) |

**Descrição da issue**

> A regra de negócio determina que o registro é "obrigatório para a conclusão" do exercício. No entanto, ocorre uma omissão de informação necessária para o fluxo de exceção: o que o sistema deve fazer se a aluna não puder realizar aquele exercício específico (ex: o aparelho da academia está quebrado, ou ela sentiu uma dor articular)? Se o preenchimento é estritamente obrigatório, ela ficaria travada e não conseguiria concluir o treino do dia. Faltou especificar a possibilidade de "pular", "ignorar" ou "justificar" a não realização.

**Trecho do requisito inspecionado**

> "O registro deve ser obrigatório para a conclusão de cada exercício do treino do dia."

**Comentário / tratamento registrado pela equipe**

Pendente de alinhamento de UX.

A modelagem do fluxo de exceção, como dor articular ou aparelho quebrado, foi considerada complexa para a interface atual.

O time de design solicitou mais tempo para desenhar a tela de justificativas, impossibilitando a correção do requisito a tempo.

Marcando esta issue como **Pendente**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #32 — H11 - Registro de Cargas e Repetições Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H11` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | ➖ Sem comentário específico |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/32) |

**Descrição da issue**

> Existe uma inconsistência (informações conflitantes) entre o que a Regra de Negócio pede e o que os Critérios de Aceitação exigem na tela. A regra diz que a aluna pode "alterar a carga sugerida pelo personal". Contudo, o critério de aceitação não exige que a interface exiba essa carga sugerida; ele pede apenas para exibir a "carga utilizada na última sessão". O desenvolvedor não colocará a meta do personal na tela, tornando impossível para a aluna saber se está "alterando a carga sugerida" ou não.

**Trecho do requisito inspecionado**

> "O sistema deve permitir que o usuário altere a carga sugerida pelo personal..." versus "O sistema deve exibir a carga utilizada na última sessão daquele mesmo exercício como referência para a aluna."

**Comentário / tratamento registrado pela equipe**

> Observação: não foi localizado, no material enviado, um comentário de tratamento claramente associado a esta issue.

O documento contém um comentário repetido sobre gatilho de atualização de relatórios nesse ponto da sequência, porém esse comentário se relaciona semanticamente à H03, não à H11.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #33 — H11 - Registro de Cargas e Repetições Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H11` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/33) |

**Descrição da issue**

> O critério de aceitação afirma que o botão limpará os campos "para a próxima série ou exercício". Essa instrução gera ambiguidade, pois é passível de ter múltiplas interpretações sobre como o sistema navega. O clique nesse botão significa que a aluna vai fazer mais uma série do mesmo exercício, ou que ela acabou e deve ir para a próxima máquina? Não há clareza de como o aplicativo diferencia o fim de uma única série do fim de todas as séries planejadas para aquele movimento.

**Trecho do requisito inspecionado**

> "Deve haver um botão 'Confirmar Série' que, ao ser clicado, salva os dados e limpa os campos para a próxima série ou exercício."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H11.

O critério de aceitação sobre o botão "Confirmar Série" foi reescrito para eliminar a ambiguidade apontada na inspeção:
- o botão foi dividido em dois estados visuais distintos:
  - **Concluir Série** → enquanto houver séries restantes do mesmo exercício, limpa os campos para a próxima série do mesmo movimento;
  - **Próximo Exercício** → aparece automaticamente na última série planejada, indicando avanço para o exercício seguinte;
- foi adicionado contador de progresso, como "Série 2 de 4", para a aluna acompanhar visualmente em que ponto da sequência está.

Isso resolve a ambiguidade entre fim de uma série e fim de todas as séries do exercício.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H12

#### #34 — H12 - Notificações de Lembrete Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H12` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/34) |

**Descrição da issue**

> O critério de aceitação menciona que o sistema deve enviar lembretes nos "dias definidos", mas há uma clara omissão de informação necessária sobre a origem dessa definição. É a própria aluna quem escolhe os dias manualmente na tela de configurações (ex: selecionando Segunda, Quarta e Sexta), ou o sistema puxa automaticamente as datas em que o personal cadastrou treinos na agenda dela? O desenvolvedor não saberá qual lógica de negócio programar para disparar o gatilho.

**Trecho do requisito inspecionado**

> "Deve enviar lembretes nos dias definidos"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H12.

O critério de aceitação "deve enviar lembretes nos dias definidos" foi reescrito para esclarecer a origem da definição:
- os dias de lembrete são configurados manualmente pela própria aluna na tela de configurações;
- os dias não são puxados automaticamente da agenda do personal;
- foi adicionado critério de configuração de horário por dia selecionado;
- foi adicionada regra de negócio explicitando que a configuração é individual e independente de compromissos cadastrados por terceiros;
- foi adicionada regra de comportamento padrão caso nenhum dia seja configurado.

Isso resolve a ambiguidade entre configuração manual e vínculo automático com a agenda do personal.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #35 — H12 - Notificações de Lembrete Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H12` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/35) |

**Descrição da issue**

> A história descreve o envio das notificações, mas há a omissão do conteúdo textual (o "copy") que será exibido no celular da aluna. O texto é um padrão do sistema ("Hora de treinar!")? O personal pode personalizar essa mensagem para motivar o aluno? Ou a aluna mesma escreve o lembrete? Faltou especificar qual será a mensagem da notificação, o que forçaria o desenvolvedor a inventar (colocar em hardcode) um texto qualquer na hora de programar.

**Trecho do requisito inspecionado**

> "...desejo receber notificações de lembrete para treinar..." e "Deve enviar lembretes nos dias definidos"

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H12.

O conteúdo textual da notificação, ausente na história original, foi definido:
- adicionada mensagem padrão fixa do sistema: "Hora de treinar! Seu treino de hoje está esperando por você";
- definido que a mensagem pode incluir o nome do treino do dia quando disponível;
- esclarecido que não há personalização de texto pela aluna ou pelo personal nesta versão;
- o conteúdo é gerado por template fixo;
- definido comportamento de fallback quando não há treino cadastrado para o dia.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H13

#### #49 — H13 - Gráficos de Evolução Física Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H13` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | 🔎 Reavaliada |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/49) |

**Descrição da issue**

> O requisito fala sobre "visualizar gráficos de evolução física", mas omite completamente quais métricas compõem essa evolução. É o peso corporal (kg)? É o percentual de gordura (BF)? São as medidas antropométricas (tamanho do braço, cintura, etc.)? Sem a definição exata de quais dados serão plotados, falta uma informação necessária para o desenvolvedor criar as tabelas do banco de dados e os eixos do gráfico.

**Trecho do requisito inspecionado**

> "...desejo visualizar gráficos de evolução física para me manter motivada..."

**Comentário / tratamento registrado pela equipe**

A issue foi analisada e a observação foi considerada válida como refinamento da especificação.

O requisito define a funcionalidade de exibição da evolução física, porém não explicita quais métricas compõem essa evolução.

Para aumentar a clareza do requisito, foram especificadas as métricas consideradas pelo sistema:
- peso corporal;
- percentual de gordura;
- medidas corporais.

Também foram adicionados critérios de aceitação relacionados à visualização desses dados.

Apesar da melhoria de detalhamento, a ausência dessas métricas não impedia a compreensão do objetivo principal da funcionalidade nem inviabilizava sua implementação.

Marcando esta issue como **Reavaliada**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H14

#### #51 — H14 - Sincronização com Smartwatch Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H14` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ➖ Sem comentário específico |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/51) |

**Descrição da issue**

> O requisito menciona o desejo de sincronizar dados com o "Smartwatch", mas ocorre uma omissão grave, faltando uma informação necessária para o desenvolvimento. O texto não especifica quais sistemas operacionais ou marcas de relógios inteligentes serão suportados (ex: Apple Watch com watchOS, dispositivos com WearOS do Google, Garmin, etc.). Sem isso, a equipe técnica não saberá quais SDKs ou APIs integrar.

**Trecho do requisito inspecionado**

> "...desejo sincronizar meus dados de treino com o Smartwatch para monitorar..."

**Comentário / tratamento registrado pela equipe**

> Observação: o material enviado registra apenas: **"H14 — nenhum comentário"**.

Não foi localizado comentário detalhado de tratamento para esta issue.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #48 — H14 - Sincronização com Smartwatch Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H14` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | 🔎 Reavaliada |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/48) |

**Descrição da issue**

> A expressão "sincronizar meus dados" gera ambiguidade, pois é passível de ter múltiplas interpretações quanto ao fluxo da informação. Essa sincronização será unidirecional (o relógio apenas lê os batimentos e joga para o app) ou bidirecional (o aplicativo do celular também envia o treino do dia para a tela do relógio)? A falta dessa clareza compromete o entendimento do escopo da funcionalidade.

**Trecho do requisito inspecionado**

> "Enquanto aluna, desejo sincronizar meus dados de treino..."

**Comentário / tratamento registrado pela equipe**

A issue foi analisada e a observação foi considerada pertinente como refinamento da especificação.

O termo "sincronizar meus dados" pode gerar diferentes interpretações quanto ao fluxo de informações entre aplicativo e smartwatch.

Para reduzir ambiguidades, foi explicitado que a sincronização desta funcionalidade é unidirecional, com envio de dados coletados pelo smartwatch para o aplicativo, compatível com o objetivo de monitoramento de batimentos cardíacos e calorias descrito na história.

A observação não caracteriza um defeito que impeça a implementação da funcionalidade, mas representa uma melhoria na clareza do requisito.

Marcando esta issue como **Reavaliada**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H15

#### #46 — H15 - Compartilhamento em Redes Sociais Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H15` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/46) |

**Descrição da issue**

> O termo "minhas conquistas" é altamente abstrato e passível de múltiplas interpretações, caracterizando uma ambiguidade. O sistema não define o que é uma conquista: é um selo/medalha virtual (gamificação)? É a quebra de um recorde pessoal de peso? É atingir uma sequência de 5 dias de treino? O programador não terá parâmetros lógicos para gerar a imagem ou o texto dessa "conquista" para o compartilhamento.

**Trecho do requisito inspecionado**

> "Enquanto aluna, desejo compartilhar minhas conquistas..."

**Comentário / tratamento registrado pela equipe**

Issue não procede nesta etapa.

A história H15 está na coluna Backlog e não faz parte do grupo de histórias movidas para Especificação nesta etapa do trabalho. Histórias no Backlog não possuem critérios de aceitação e regras de negócio detalhados intencionalmente, portanto a ausência apontada não configura um defeito.

Além disso, a funcionalidade de compartilhamento em redes sociais foi identificada como fora do escopo da arquitetura atual do sistema:
- não há módulo, integração ou serviço externo definido para compartilhamento de conteúdo em redes sociais de terceiros, como Instagram, Strava, WhatsApp ou X.

A ambiguidade do termo "conquistas" é válida caso a história seja priorizada futuramente, mas não gera correção neste momento.

Marcando esta issue como **Não Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #47 — H15 - Compartilhamento em Redes Sociais Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H15` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/47) |

**Descrição da issue**

> A história expressa o desejo de compartilhar nas "redes sociais", porém omite completamente a lista de quais redes devem ser integradas. Trata-se de uma informação necessária não incluída. A implementação técnica varia drasticamente se o compartilhamento for para o Instagram (Stories), Strava, X (antigo Twitter) ou WhatsApp. O desenvolvedor precisa do alvo exato para usar as bibliotecas corretas.

**Trecho do requisito inspecionado**

> "...desejo compartilhar minhas conquistas e treinos concluídos nas redes sociais..."

**Comentário / tratamento registrado pela equipe**

Issue não procede nesta etapa.

A história H15 está na coluna Backlog e não faz parte do grupo de histórias movidas para Especificação nesta etapa do trabalho. Histórias no Backlog não possuem critérios de aceitação e regras de negócio detalhados intencionalmente, portanto a ausência apontada não configura um defeito.

Além disso, a funcionalidade de compartilhamento em redes sociais foi identificada como fora do escopo da arquitetura atual do sistema:
- não há módulo, integração ou serviço externo definido para compartilhamento de conteúdo em redes sociais de terceiros, como Instagram, Strava, WhatsApp ou X.

A omissão da lista de redes sociais é válida caso a história seja priorizada futuramente, mas não gera correção neste momento.

Marcando esta issue como **Não Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H16

#### #44 — H16 - Acessibilidade Visual - Backlog Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H16` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/44) |

**Descrição da issue**

> A narrativa exige "descrições em áudio para as fotos", o que representa um fato incorreto em relação ao desenvolvimento mobile para acessibilidade. Usuários com baixa visão utilizam ferramentas nativas do sistema operacional, chamadas de Leitores de Tela (TalkBack no Android e VoiceOver no iOS). Essas ferramentas leem um atributo de acessibilidade focado em texto (o "Texto Alternativo" ou Alt Text), e não arquivos de áudio avulsos inseridos para cada foto. A abordagem descrita foge dos padrões estabelecidos.

**Trecho do requisito inspecionado**

> "Enquanto usuário com baixa visão, desejo descrições em áudio para as fotos..."

**Comentário / tratamento registrado pela equipe**

Issue não procede para esta história.

O trecho citado, "descrições em áudio para as fotos e vídeos dos exercícios", pertence à história H16 do Backlog, do módulo de treinos, que trata de acessibilidade no catálogo de exercícios.

A história H16 em Especificação, alvo desta inspeção, trata de outro escopo: suporte a leitores de tela nativos, como TalkBack e VoiceOver, para navegação nos menus de treino.

Os critérios de aceitação e regras de negócio já estão alinhados com esse padrão, sem mencionar áudio avulso para fotos.

Marcando esta issue como **Não Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #3 — H16 - Identificador duplicado e ausência do item H19 no backlog

| Campo | Informação |
|---|---|
| História relacionada | `H16` |
| Tipo identificado | 🟣 Contradição |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/3) |

**Descrição da issue**

> H16 aparece duas vezes no backlog com títulos diferentes: uma sobre "descrições em áudio para fotos e vídeos" e outra sobre "suporte total a leitores de tela". Ambas usam o mesmo identificador H16, gerando conflito de numeração. H19 não existe no backlog, sugerindo que um item foi pulado ou removido sem registro.

**Trecho do requisito inspecionado**

> "H16 - Enquanto usuário com baixa visão, desejo descrições em áudio..."
> "H16 - Enquanto usuário com baixa visão, desejo suporte total a leitores de tela..."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H16.

Correção de numeração:
- uma das histórias identificadas com H16 foi alterada para H19.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #45 — H16 - Acessibilidade Visual - Backlog Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H16` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ⚪ Não corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/45) |

**Descrição da issue**

> O requisito pede "descrições em áudio", mas omite a regra de negócio sobre a origem dessa mídia. A informação necessária não foi incluída: o personal trainer terá que gravar um arquivo de voz (MP3) no momento de cadastrar o exercício, ou o sistema lerá automaticamente uma descrição em texto usando um motor de Text-to-Speech (TTS)? A forma de alimentar essa funcionalidade está totalmente ausente.

**Trecho do requisito inspecionado**

> "...desejo descrições em áudio para as fotos e vídeos dos exercícios..."

**Comentário / tratamento registrado pela equipe**

Issue não procede para esta história.

O trecho citado, "descrições em áudio para as fotos e vídeos dos exercícios", pertence à história H16 do Backlog, do módulo de treinos, que trata de acessibilidade no catálogo de exercícios.

A história H16 em Especificação, alvo desta inspeção, trata de outro escopo: suporte a leitores de tela nativos, como TalkBack e VoiceOver, para navegação nos menus de treino.

Os critérios de aceitação e regras de negócio já estão alinhados com esse padrão, sem mencionar áudio avulso para fotos.

Marcando esta issue como **Não Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H17

#### #41 — H17 - Acessibilidade Visual Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H17` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/41) |

**Descrição da issue**

> A regra de negócio determina que as fontes cresçam até 200% "sem sobrepor elementos visuais". No entanto, ocorre uma Omissão crítica sobre como o sistema deve reagir para evitar essa sobreposição. Faltou a informação necessária do comportamento de UI (Interface do Usuário): se o texto crescer e não couber na tela, ele deve quebrar para a linha de baixo (wrap), criar uma barra de rolagem horizontal (scroll) ou abreviar com três pontinhos (ellipsis)? A ausência dessa regra quebrará o layout.

**Trecho do requisito inspecionado**

> "O redimensionamento de fontes deve ser aplicado a todos os textos instrucionais e nomes de exercícios sem sobrepor elementos visuais."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H17.

A ausência de definição do comportamento de interface quando o texto redimensionado não cabe na tela foi corrigida:
- definido que o sistema deve aplicar quebra de linha, isto é, wrap, nos textos instrucionais;
- definido explicitamente que não haverá corte de texto com ellipsis;
- definido que não haverá rolagem horizontal.

Isso evita a quebra de layout mencionada na inspeção e fornece ao desenvolvedor a regra exata de comportamento.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #42 — H17 - Acessibilidade Visual Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H17` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/42) |

**Descrição da issue**

> O critério de aceitação instrui a mudança para "textos em amarelo ou branco vibrante". Isso gera uma Ambiguidade por dois motivos: primeiro, o termo "vibrante" é um adjetivo altamente subjetivo (o que é vibrante para um designer pode não ser para o programador). Segundo, o uso do "ou" deixa passível de ter múltiplas interpretações sobre quem toma essa decisão. É o usuário que escolhe entre amarelo e branco em um menu, ou é o desenvolvedor que escolhe qual das duas cores vai implementar?

**Trecho do requisito inspecionado**

> "...a interface deve mudar instantaneamente para fundo preto com textos em amarelo ou branco vibrante."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H17.

A ambiguidade do termo "amarelo ou branco vibrante" foi corrigida:
- definida uma cor fixa de texto para o modo de alto contraste: amarelo `#FFD600` sobre fundo preto `#000000`;
- removida a opção "ou", eliminando a dúvida sobre quem decide entre as duas cores;
- a cor é fixa, definida pelo time, sem seletor de cor para o usuário nesta versão.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #43 — H17 - Acessibilidade Visual Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H17` |
| Tipo identificado | 🔵 Informação estranha |
| Decisão registrada | 🔎 Reavaliada |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/43) |

**Descrição da issue**

> A regra de negócio cita que o modo deve facilitar a leitura para quem possui sensibilidade, e acrescenta "como o Gabriel". Essa menção a um nome específico ("Gabriel") caracteriza uma Informação Estranha, ou seja, uma informação que não é relevante ou necessária para o contexto do requisito funcional. O desenvolvedor não precisa (e nem deve) saber quem é Gabriel para programar o sistema de alto contraste.

**Trecho do requisito inspecionado**

> "...facilitem a leitura para quem possui sensibilidade reduzida, como o Gabriel."

**Comentário / tratamento registrado pela equipe**

A observação procede: a menção a "Gabriel" é uma informação estranha ao requisito funcional e foi removida do texto da regra de negócio.

No entanto, esse trecho não impedia a implementação da funcionalidade. O desenvolvedor seguiria a regra de contraste normalmente, ignorando a referência ao nome.

Trata-se de uma melhoria de qualidade de redação do requisito, não de uma lacuna funcional que bloqueava o desenvolvimento.

Marcando esta issue como **Reavaliada**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H18

#### #37 — 18 - Comandos de Voz para Cronômetro Defeito 3

| Campo | Informação |
|---|---|
| História relacionada | `H18` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/37) |

**Descrição da issue**

> A regra de negócio determina a integração com recursos nativos do sistema operacional e cita apenas o "Google Assistant". Isso gera uma Omissão crítica sobre o ecossistema iOS da Apple, faltando a informação se o aplicativo também deverá se integrar com a "Siri". O desenvolvedor não saberá se a funcionalidade é exclusiva para Android ou se deve prever a integração com as bibliotecas nativas de voz de outras plataformas.

**Trecho do requisito inspecionado**

> "O sistema de reconhecimento de voz deve funcionar de forma integrada aos recursos nativos do sistema operacional (como Google Assistant)."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H18.

A regra de negócio mencionava apenas integração com "Google Assistant", omitindo o ecossistema iOS.

Em vez de apenas adicionar a Siri à lista, a regra foi reescrita para eliminar a causa raiz da ambiguidade:
- o reconhecimento de voz será implementado nativamente no aplicativo;
- serão utilizadas bibliotecas de Speech-to-Text do React Native;
- o funcionamento deverá ser equivalente em iOS e Android;
- não haverá dependência de assistentes virtuais de terceiros.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #38 — H18 - Comandos de Voz para Cronômetro Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H18` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/38) |

**Descrição da issue**

> O requisito exige a operação por comandos de voz, porém ocorre uma Omissão grave ao não considerar o contexto de uso: academias são ambientes ruidosos (música alta, anilhas batendo, pessoas conversando). Faltou incluir a informação necessária sobre o fluxo de exceção ou tratamento de erro caso o aplicativo não consiga "escutar" ou reconhecer a fala do usuário devido ao ruído de fundo (ex: um botão de fallback ou um feedback de "não compreendi").

**Trecho do requisito inspecionado**

> "Na tela de descanso, o sistema deve reconhecer o comando de voz 'Iniciar descanso' e começar a contagem regressiva automaticamente."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H18.

A ausência de tratamento para falha de reconhecimento de voz em ambiente ruidoso foi corrigida:
- adicionada regra de negócio definindo o comportamento após duas tentativas de reconhecimento falhas;
- definido feedback sonoro: "Não entendi, repita o comando";
- adicionado critério de aceitação prevendo botão de fallback visual para controle manual do cronômetro.

Isso garante que o usuário com baixa visão não fique sem alternativa em um ambiente ruidoso, como uma academia.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #39 — H18 - Comandos de Voz para Cronômetro Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H18` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/39) |

**Descrição da issue**

> Os critérios de aceitação definem comandos para "Iniciar" e "Pausar" o cronômetro, mas ocorre uma clara Omissão sobre como continuar a contagem. Falta a informação necessária sobre qual é o comando de voz ou a regra de negócio para "Retomar" o cronômetro após ele ter sido pausado. Sem essa especificação, o usuário ficará travado no estado de pausa e o desenvolvedor não programará o gatilho de retorno.

**Trecho do requisito inspecionado**

> "O usuário deve conseguir pausar a contagem dizendo 'Pausar cronômetro'."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H18.

A ausência do comando de voz para retomar o cronômetro após a pausa foi corrigida:
- adicionado o comando de voz **"Retomar cronômetro"** aos critérios de aceitação;
- definido que o usuário pode continuar a contagem regressiva exatamente do ponto em que pausou.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### H20

#### #21 — H20 - Feedback Vibratório Defeito 1

| Campo | Informação |
|---|---|
| História relacionada | `H20` |
| Tipo identificado | 🟠 Ambiguidade |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/21) |

**Descrição da issue**

> O termo "feedback vibratório" gera Ambiguidade, pois é uma informação passível de ter múltiplas interpretações. O desenvolvedor não tem como saber qual deve ser a intensidade, a duração ou o padrão dessa vibração (ex: um pulso longo de 1 segundo? Dois pulsos curtos e rápidos?). Sem a definição de um padrão rítmico específico, o usuário com baixa visão pode facilmente confundir o aviso de "série concluída" com a chegada de uma notificação comum (como uma mensagem do WhatsApp).

**Trecho do requisito inspecionado**

> "...desejo receber feedback vibratório ao completar uma série..."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H20.

Atualização nas regras de negócio:
- foi especificado como deve ser o feedback vibratório.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

#### #20 — H20 - Feedback Vibratório Defeito 2

| Campo | Informação |
|---|---|
| História relacionada | `H20` |
| Tipo identificado | 🔴 Omissão / Incompletude |
| Decisão registrada | ✅ Corrigida |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/20) |

**Descrição da issue**

> A narrativa baseia toda a acessibilidade no motor de vibração, mas ocorre uma Omissão crítica em relação às restrições de hardware e sistema operacional. Falta a informação necessária sobre o que o sistema deve fazer se a vibração estiver desativada a nível de SO (ex: usuário em "Modo de Economia de Bateria" ou com o motor de vibração quebrado). O requisito não especifica um comportamento de fallback (plano B), como emitir um aviso sonoro complementar caso a vibração falhe, deixando o usuário sem saber se concluiu a tarefa.

**Trecho do requisito inspecionado**

> "...desejo receber feedback vibratório ao completar uma série para saber que concluí a tarefa..."

**Comentário / tratamento registrado pela equipe**

Correção aplicada na história H20.

Detalhamento sobre limitações:
- os detalhes sobre a história foram atualizados na criação dos critérios de aceitação e regras de negócio.

Marcando esta issue como **Corrigida**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

### Geral

#### #2 — Histórias de usuário sem descrição, critérios de aceitação ou regras de negócio

| Campo | Informação |
|---|---|
| História relacionada | `Geral` |
| Tipo identificado | ⚫ Defeito de especificação |
| Decisão registrada | ➖ Sem comentário |
| Link da issue | [Abrir no GitHub](https://github.com/soft-x64/projeto-pratico-es/issues/2) |

**Descrição da issue**

> H04, H05, H06, H08, H09, H13, H14, H15, H16 (primeira ocorrência) e H20 não possuem nenhuma descrição, critério de aceitação ou regra de negócio. As histórias estão completamente vazias, sem informação suficiente para desenvolvimento ou teste.

**Trecho do requisito inspecionado**

> "No description provided" — presente em H04, H05, H06, H08, H09, H13, H14, H15, H16 e H20

**Comentário / tratamento registrado pela equipe**

> Observação: o material enviado registra esta issue como a última e informa que ela foi **fechada sem comentário**.

[⬆ Voltar à Matriz de Rastreabilidade](#4-matriz-de-rastreabilidade)

---

## 6. Comentários sem Associação Direta

O material também contém comentários de tratamento que não aparecem vinculados de forma clara a uma issue numerada na parte de descrição. Para preservar a rastreabilidade e não perder informação, eles foram mantidos nesta seção.

### Comentário adicional 1

Correção aplicada na história H01.

Foi especificada a forma de determinar categoria do treino e requisitos para cadastro de treino atualizados:
- definida a possibilidade de selecionar categorias padrão ou permitir que o personal nomeie a categoria;
- adicionado como requisito que o cadastro de treino precisa possuir uma categoria.

Marcando esta issue como **Corrigida**.

---

### Comentário adicional 2

Dependência arquitetural / bloqueado.

Esta issue não foi corrigida nesta sprint porque a estratégia de propagação de eventos e sincronização em cascata de tabelas no banco de dados ainda precisa ser validada com o professor.

O item foi movido para o débito técnico da próxima sprint.

---

### Comentário adicional 3

Correção aplicada na história H01.

O critério de aceitação foi atualizado para melhor entendimento:
- foi definido que alterações feitas no template original não afetam o treino do aluno.

Marcando esta issue como **Corrigida**.

---

## 7. Conclusão

A etapa de inspeção permitiu identificar problemas de ambiguidade, omissão, inconsistência, contradição e falta de detalhamento em diferentes histórias do backlog.

Com base nos comentários registrados, as issues foram organizadas em uma matriz rastreável e cada uma foi relacionada à decisão tomada pela equipe, seja de correção, reavaliação, não correção, pendência ou ausência de comentário específico.

A documentação resultante facilita a revisão acadêmica porque permite acompanhar, em um único arquivo, o caminho completo entre o problema identificado na inspeção e o tratamento realizado pela equipe.

---

## Histórico de Organização do Documento

| Item | Descrição |
|---|---|
| Documento gerado | `inspecao/tratamento-das-issues.md` |
| Base de conteúdo | Descrições e comentários do arquivo `H01.docx` |
| Organização | Por issue, história relacionada, tipo de problema e decisão final |
| Objetivo | Registrar o tratamento das issues de inspeção com rastreabilidade para o GitHub |
