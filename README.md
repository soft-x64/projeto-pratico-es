
# Projeto pratico de Engenharia de Software 1.
# 🏋️‍♂️ TrainerX64

Sistema de gestão de treinos voltado para **personal trainers e alunos**, com foco em organização, acompanhamento de evolução e acessibilidade.

---

## 📌 Sobre o Projeto

O **TrainerX64** foi desenvolvido como parte da disciplina de Engenharia de Software, utilizando conceitos de **Design Thinking** e **metodologias ágeis**.

O objetivo é resolver problemas reais enfrentados por personal trainers, como:
- Organização de treinos  
- Acompanhamento de alunos  
- Comunicação centralizada  
- Inclusão de acessibilidade  

---

## 🧠 Metodologia Utilizada

O projeto foi estruturado com base em:

- Design Thinking  
- Scrum (Backlog + Sprint)  
- GitHub Projects para gerenciamento  

---

## 📂 Estrutura do Projeto

### 🔹 Design Thinking
- 📄 [Enquadramento do Problema](./especificação/1_design-thinking/enquadramento_problema.md)
- 📄 [Exploração de Mercado](./especificação/1_design-thinking/exploracao_mercado.md)
- 📄 [Ideação (Brainstorming)](./especificação/1_design-thinking/ideacao.md)
- 📄 [Personas](./especificação/1_design-thinking/personas.md)

---

### 🔹 Planejamento
- 📄 [Plano de Trabalho](./especificação/2_plano-de-trabalho.md)

---

### 🔹 Backlogs
- 📄 [Backlog do Produto](./especificação/3_backlog-do-produto.md)
- 📄 [Backlog do Sprint](./especificação/4_backlog-do-sprint.md)

---

### 🔹 Execução
- 📄 [Daily Scrum](./especificação/5_daily-scrum.md)

---
## Como executar o projeto e os testes automatizados

Esta seção apresenta o passo a passo para clonar o repositório, abrir o projeto no VS Code e executar os testes automatizados implementados.

Antes de iniciar, é necessário ter instalado o Git, o Node.js, o npm e o Visual Studio Code. Para verificar se o Node.js e o npm estão instalados corretamente, execute os comandos abaixo no terminal:

```bash
node -v
npm -v
```

Para obter o projeto, clone o repositório do GitHub utilizando o seguinte comando:

```bash
git clone https://github.com/soft-x64/projeto-pratico-es
```

Após a clonagem, acesse a pasta do projeto:

```bash
cd projeto-pratico-es
```

Em seguida, abra o projeto no Visual Studio Code:

```bash
code .
```

Com o projeto aberto no VS Code, acesse o menu superior e selecione a opção `Terminal > New Terminal`. O terminal integrado será aberto na parte inferior da IDE, permitindo a execução dos comandos necessários.

Antes de rodar os testes, instale as dependências do projeto com o comando:

```bash
npm install
```

Esse comando instala os pacotes definidos no arquivo `package.json`, incluindo as dependências necessárias para a execução dos testes automatizados.

Caso esteja utilizando o Windows PowerShell, execute o comando abaixo antes de rodar os testes:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Esse comando libera temporariamente a execução de scripts apenas na janela atual do terminal. Após pressionar `Enter`, nenhuma mensagem de confirmação será exibida, pois a configuração é aplicada em segundo plano. Essa etapa é útil porque o PowerShell possui uma política de segurança chamada `Execution Policy`, que pode bloquear scripts utilizados pelo Node.js e pelo npm.

Após instalar as dependências e liberar a execução temporária de scripts, execute os testes automatizados com o comando:

```bash
npm test
```

O comando `npm test` inicia o framework de testes configurado no projeto, responsável por localizar e executar os arquivos de teste automatizado. Os testes validam as regras implementadas nos arquivos da pasta `src/` e estão organizados na pasta `tests/`.

A estrutura principal dos arquivos de código e teste é:

```text
src/
├── validadorAluno.js
├── validadorCarga.js
└── validadorLogin.js

tests/
├── validadorAluno.test.js
├── validadorCarga.test.js
└── validadorLogin.test.js
```

A pasta `src/` contém os arquivos responsáveis pelas validações funcionais do sistema, enquanto a pasta `tests/` contém os testes automatizados responsáveis por verificar essas validações.

Após a execução do comando `npm test`, o terminal exibirá o resultado detalhado dos testes, informando quais testes passaram ou falharam. Um exemplo de saída esperada é:

```text
Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
```

Esses testes demonstram a relação entre os requisitos especificados, as classes de equivalência, os casos de teste planejados e a automação implementada no projeto.

---

## 📊 Gerenciamento

O gerenciamento do projeto foi realizado utilizando **GitHub Projects**, onde foram organizados:

- Histórias de usuário  
- Tarefas do sprint  
- Fluxo de desenvolvimento  

---

## 👥 Equipe

- Júlio Augusto
- Luiz Gustavo Barros
- Adriano Rolim
- Eduardo Tundis

---

## 🎯 Objetivo do Sistema

Desenvolver uma solução que permita:

- Gestão eficiente de treinos  
- Acompanhamento da evolução dos alunos  
- Comunicação direta entre personal e aluno  
- Inclusão de recursos de acessibilidade  

---

## 💡 Diferenciais

- Interface simples e intuitiva  
- Foco em personal trainers  
- Acessibilidade integrada  
- Centralização das informações  

---

## 🚀 Considerações Finais

O projeto busca aplicar conceitos teóricos na prática, simulando o desenvolvimento de um produto real, desde a ideação até o planejamento e organização das tarefas.

---
