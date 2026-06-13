# 🛠️ Tecnologias e Ferramentas — TrainerX64
---

## 📋 Sumário

| # | Camada | Tecnologia |
|---|--------|------------|
| 1 | [Front-end](#1-front-end--react-native) | React Native |
| 2 | [Back-end](#2-back-end--nodejs--express) | Node.js + Express |
| 3 | [Banco de Dados Principal](#3-banco-de-dados-principal--postgresql) | PostgreSQL + Prisma ORM |
| 4 | [Banco de Dados Local](#4-banco-de-dados-local--watermelondb) | WatermelonDB |
| 5 | [Comunicação em Tempo Real](#5-comunicação-em-tempo-real--socketio) | Socket.io |
| 6 | [Autenticação](#6-autenticação--firebase-auth) | Firebase Authentication |
| 7 | [Notificações Push](#7-notificações-push--firebase-cloud-messaging) | Firebase Cloud Messaging |
| 8 | [Entrega de Mídia](#8-entrega-de-mídia--cloudinary) | Cloudinary |
| 9 | [Versionamento](#9-versionamento--github--git) | GitHub + Git |

---

## 🧭 Introdução

A seção de **Tecnologias e Ferramentas Utilizadas (Tech Stack Map)** consiste no mapeamento estruturado de todo o ecossistema de software, frameworks, bibliotecas e serviços de infraestrutura empregados na construção prática do sistema. Organizado por camadas funcionais — frontend, backend, banco de dados e serviços auxiliares —, esse mapeamento tem como objetivo central justificar tecnicamente a escolha de cada componente com base nos requisitos do projeto, demonstrando de forma clara como essas ferramentas se conectam e interagem para viabilizar as regras de negócio e os diferenciais da solução.

O ecossistema do **TrainerX64** foi projetado seguindo um fluxo de integração contínua e assíncrona entre o cliente e o servidor, garantindo baixa latência e alta disponibilidade mesmo em cenários de oscilação de rede na academia.

---

## 1. Front-end — React Native

### 1.1 O que é

React Native é um framework open-source desenvolvido pelo Meta que permite construir aplicativos móveis nativos para iOS e Android a partir de um **único codebase em JavaScript/TypeScript**. Diferente de soluções híbridas baseadas em WebView, o React Native compila componentes para elementos nativos da plataforma, entregando desempenho e experiência equivalentes a um app nativo.

### 1.2 Por que usamos

- **Codebase unificado:** um único projeto atende iOS e Android, reduzindo o esforço de desenvolvimento e manutenção para uma equipe pequena
- **Coerência de linguagem com o backend:** tanto o frontend quanto o backend (Node.js + Express) utilizam TypeScript, eliminando a necessidade de alternar entre linguagens durante o desenvolvimento
- **Acessibilidade nativa:** o React Native expõe diretamente as APIs de acessibilidade do iOS (`VoiceOver`) e Android (`TalkBack`) via `accessibilityLabel`, `AccessibilityInfo` e `accessible` — atendendo todos os requisitos do perfil AA sem bibliotecas externas
- **Estado reativo integrado:** o modelo de componentes reativos do React Native é a implementação natural do padrão MVVM definido na arquitetura — quando o ViewModel atualiza o estado, a View se recreconstrói automaticamente

### 1.3 Conexão com a arquitetura

O React Native é a camada de **View e ViewModel** do padrão MVVM. Cada tela do aplicativo corresponde a um ViewModel definido na arquitetura (`TreinoViewModel`, `EvolucaoViewModel`, `AcessibilidadeViewModel` etc.) e consome a API REST exposta pelo backend via HTTP e WebSocket.

---

## 2. Back-end — Node.js + Express

### 2.1 O que é

Node.js é um ambiente de execução JavaScript no servidor, baseado no motor V8 do Chrome. Express é o framework web minimalista mais utilizado com Node.js, oferecendo roteamento, middlewares e estrutura para construção de APIs REST.

### 2.2 Por que usamos

- **Consistência de linguagem:** com TypeScript no frontend (React Native) e no backend (Node.js), toda a equipe opera no mesmo ecossistema — sem troca de contexto entre linguagens
- **Alinhamento com a arquitetura:** o Monolito Modular foi inteiramente projetado sobre Node.js. A estrutura de módulos (`modulo-alunos`, `modulo-treinos`, `modulo-financeiro` etc.), o Prisma ORM e o Repository Pattern pressupõem esse ambiente
- **Desempenho assíncrono:** o modelo non-blocking I/O do Node.js é adequado para operações concorrentes como cálculo de progressão de carga, geração de relatórios e disparo de eventos Pub/Sub
- **Ecossistema npm:** acesso ao maior repositório de pacotes do mundo, incluindo bibliotecas para validação, autenticação, WebSocket e ORM

### 2.3 Conexão com a arquitetura

O backend em Node.js + Express é o núcleo do **Monolito Modular**. Cada módulo interno (`modulo-autenticacao`, `modulo-treinos`, `modulo-evolucao` etc.) é uma pasta independente dentro do projeto, expondo apenas sua interface de serviço. O Prisma ORM implementa o **Repository Pattern**, atuando como camada de abstração entre os Services e o PostgreSQL.

---

## 3. Banco de Dados Principal — PostgreSQL

### 3.1 O que é

PostgreSQL é um sistema de gerenciamento de banco de dados relacional (SGBD) open-source, reconhecido por sua robustez, conformidade com o padrão SQL e suporte avançado a integridade referencial e transações ACID.

### 3.2 Por que usamos

- **Integridade relacional:** a modelagem do TrainerX64 exige vínculos rigorosos entre entidades — um "Treino Mãe" pode gerar múltiplas fichas personalizadas para alunos distintos; o PostgreSQL garante essa consistência via chaves estrangeiras e constraints
- **Suporte ao Prisma ORM:** o Prisma tem suporte de primeira classe ao PostgreSQL, gerando migrações automáticas e tipagem TypeScript dos modelos diretamente do schema do banco
- **Confiabilidade comprovada:** adequado para o volume de dados do sistema (alunos, treinos, evoluções, cobranças, mensagens) sem exigir infraestrutura complexa

### 3.3 Conexão com a arquitetura

O PostgreSQL é o destino final de todas as operações de escrita e leitura dos repositórios. O **Prisma ORM** atua como a implementação concreta de cada `Repository Interface` definida no Repository Pattern — os Services nunca acessam o banco diretamente.

---

## 4. Banco de Dados Local — WatermelonDB

### 4.1 O que é

WatermelonDB é um banco de dados reativo embutido, otimizado para aplicações React Native de alta performance. Armazena dados localmente no dispositivo e oferece sincronização assíncrona com o servidor quando a conexão é restabelecida.

### 4.2 Por que usamos

O TrainerX64 tem um requisito explícito de **funcionamento offline**: o aluno precisa acessar sua ficha de treino mesmo sem conexão com a internet — cenário comum em academias com Wi-Fi instável. O WatermelonDB intercepta as requisições quando não há rede, persiste as fichas de exercícios localmente e sincroniza com o PostgreSQL assim que a conectividade é restaurada.

### 4.3 Conexão com a arquitetura

O WatermelonDB atua exclusivamente no dispositivo móvel, como camada de cache do `modulo-treinos` e `modulo-evolucao`. Não substitui o PostgreSQL — é complementar a ele, cobrindo apenas o cenário offline do perfil Aluno (A e AA).

---

## 5. Comunicação em Tempo Real — Socket.io

### 5.1 O que é

Socket.io é uma biblioteca que implementa comunicação bidirecional em tempo real entre cliente e servidor via **WebSockets**, com fallback automático para HTTP long-polling quando WebSocket não está disponível.

### 5.2 Por que usamos

O chat interno do TrainerX64 — canal direto entre o Personal Trainer e o Aluno — exige comunicação instantânea e bidirecional. As rotas REST tradicionais são inadequadas para esse caso porque o cliente precisaria fazer polling contínuo para verificar novas mensagens. Com Socket.io, o servidor empurra a mensagem ao cliente assim que ela é enviada, sem custo de polling.

### 5.3 Conexão com a arquitetura

O Socket.io é a implementação de transporte do `modulo-comunicacao`. Enquanto o Pub/Sub via FCM lida com notificações assíncronas (eventos de treino, cobranças pendentes), o Socket.io lida com a **troca de mensagens síncrona** — os dois padrões coexistem sem conflito.

---

## 6. Autenticação — Firebase Auth

### 6.1 O que é

Firebase Authentication é um serviço gerenciado do Google especializado no gerenciamento seguro de identidades de usuários, com suporte a e-mail/senha, provedores OAuth (Google, Apple) e integração nativa com aplicativos mobile.

### 6.2 Por que usamos

- **Isolamento de responsabilidade:** autenticação é um domínio de segurança sensível; delegá-la a um serviço especializado reduz o risco de vulnerabilidades implementadas manualmente
- **Controle de perfis:** suporta claims customizados nos tokens JWT, permitindo que o backend identifique e aplique permissões por perfil (PT, A, AA) em cada requisição
- **Integração com React Native:** possui SDK oficial para React Native com suporte a biometria e login persistente

### 6.3 Conexão com a arquitetura

O Firebase Auth é consumido pelo `modulo-autenticacao`. O token JWT gerado pelo Firebase é validado pelo backend Node.js a cada requisição, garantindo que apenas usuários autenticados e com o perfil correto acessem cada módulo.

---

## 7. Notificações Push — Firebase Cloud Messaging

### 7.1 O que é

Firebase Cloud Messaging (FCM) é o serviço de entrega de notificações push do Google, capaz de enviar mensagens para dispositivos iOS e Android de forma confiável e escalável.

### 7.2 Por que usamos

O FCM implementa nativamente o padrão **Pub/Sub** definido na arquitetura: o backend publica um evento (ex: `treino.publicado`, `cobranca.pendente`) e o FCM distribui a notificação para todos os dispositivos inscritos, sem que o backend precise conhecer ou gerenciar os destinatários individualmente.

### 7.3 Conexão com a arquitetura

O FCM é o **broker** do padrão Pub/Sub. O `modulo-notificacoes` do backend atua como Publisher, disparando eventos para o FCM, que os entrega aos Subscribers (dispositivos dos usuários). Para o perfil AA, os payloads das notificações incluem descrições textuais alternativas compatíveis com leitores de tela.

---

## 8. Entrega de Mídia — Cloudinary

### 8.1 O que é

Cloudinary é uma plataforma de gerenciamento e entrega de mídia em nuvem, com CDN (Content Delivery Network) global especializada em otimização e distribuição de imagens e vídeos.

### 8.2 Por que usamos

O catálogo de exercícios do TrainerX64 inclui **vídeos demonstrativos** para cada movimento — arquivos pesados que, se servidos diretamente pelo backend, consumiriam largura de banda e sobrecarregariam o servidor Node.js. O Cloudinary assume essa responsabilidade: os vídeos são hospedados na CDN e entregues aos dispositivos com otimização automática de qualidade e resolução conforme a conexão do usuário.

### 8.3 Conexão com a arquitetura

O Cloudinary é consumido exclusivamente pelo `modulo-treinos`. O backend armazena apenas a **URL da mídia** no PostgreSQL — nunca o arquivo em si. O React Native acessa o vídeo diretamente pela URL da CDN, sem intermediar o tráfego pelo backend.

---

## 9. Versionamento — GitHub + Git

### 9.1 O que é

Git é o sistema de controle de versão distribuído padrão da indústria. GitHub é a plataforma de hospedagem de repositórios Git mais utilizada, com funcionalidades de colaboração, revisão de código e automações de CI/CD.

### 9.2 Por que usamos

- **Controle de histórico:** toda alteração no código é rastreável, revertível e atribuível a um membro da equipe
- **Trabalho paralelo:** branches permitem que cada membro desenvolva seu módulo de forma isolada, integrando ao tronco principal via Pull Requests revisados
- **Base para automações:** o GitHub Actions pode ser configurado para executar testes automatizados e deploys a cada push, garantindo a qualidade contínua do sistema

---

## 📊 Tabela Resumo — Tech Stack

| Camada | Tecnologia | Função no sistema |
|:---|:---|:---|
| **Front-end** | React Native | App mobile unificado (iOS + Android) para PT, A e AA |
| **Back-end** | Node.js + Express | Motor lógico central — Monolito Modular com 9 módulos |
| **ORM** | Prisma | Implementação concreta do Repository Pattern |
| **Banco Principal** | PostgreSQL | Persistência relacional com integridade referencial |
| **Banco Local** | WatermelonDB | Cache offline de treinos no dispositivo do Aluno |
| **Tempo Real** | Socket.io | Chat bidirecional PT ↔ Aluno |
| **Autenticação** | Firebase Auth | Gerenciamento de identidades e controle de perfis |
| **Notificações** | Firebase Cloud Messaging | Broker Pub/Sub para eventos e notificações push |
| **Mídia** | Cloudinary | CDN para vídeos demonstrativos dos exercícios |
| **Versionamento** | GitHub + Git | Controle de versão, branches e colaboração da equipe |

---

## 🗺️ Mapa Visual — Tech Stack

<img width="2821" height="2111" alt="Diagrama sem nome drawio (7)" src="https://github.com/user-attachments/assets/67b10180-2588-49f6-980c-5661ea0dab46" />



```
