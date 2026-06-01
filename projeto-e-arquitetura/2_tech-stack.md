#  Introdução

A seção de **Tecnologias e Ferramentas Utilizadas (Tech Stack Map)** consiste no mapeamento estruturado de todo o ecossistema de software, frameworks, bibliotecas e serviços de infraestrutura que serão empregados na construção prática do sistema. Organizado de forma visual e analítica por meio de camadas funcionais — como frontend, backend, banco de dados e serviços auxiliares —, esse mapeamento tem como objetivo central justificar tecnicamente a escolha de cada componente com base nos requisitos do projeto, demonstrando de forma clara e explícita como essas ferramentas se conectam e interagem para viabilizar as regras de negócio e os diferenciais da solução proposta.

# Mapa visual (Tech Stack Map):
<img width="1366" height="2075" alt="Diagrama sem nome drawio (5)" src="https://github.com/user-attachments/assets/5a08eed9-961d-4ff4-aa9b-54729d1ad82d" />



### (Caso tenha dificuldade em ler a imagem no repositório, clique nela uma vez, que você será redirecionado para uma página e poderá aplicar zoom na imagem)
---

# Explicação textual do mapa:

O ecossistema do **TrainerX64** foi projetado seguindo um fluxo de integração contínua e assíncrona entre o cliente e o servidor, garantindo baixa latência e alta disponibilidade mesmo em cenários de oscilação de rede na academia.

A jornada dos dados inicia-se na interface de usuário desenvolvida inteiramente em **React Native** (aplicativo mobile unificado para Alunos e Personal Trainers), que consome e interage diretamente com o ecossistema nativo do smartphone para prover acessibilidade completa. Quando o aluno realiza um treino em um ambiente sem conectividade à internet, o aplicativo mobile intercepta as requisições e realiza a persistência e o cache das fichas de exercícios diretamente no **WatermelonDB**. Assim que a conexão é restabelecida, uma rotina de sincronização atualiza o estado da aplicação com a infraestrutura em nuvem.

As requisições HTTP comuns enviadas pelo aplicativo são processadas pelo backend em **Python (FastAPI)**, que atua como o motor lógico central do sistema. O FastAPI valida e processa as regras de negócio — como o algoritmo assíncrono de cálculo de progressão de carga — e persiste os dados de maneira estruturada e segura no banco de dados relacional **PostgreSQL**, o qual mantém a integridade referencial rigorosa entre os "Templates Mãe" de treinos e as fichas customizadas de cada aluno. 

Para operações que exigem comunicação instantânea e bidirecional, o fluxo desvia-se das rotas REST tradicionais: o chat interno e o canal de suporte consultivo direto operam por meio de túneis abertos via **WebSockets (Socket.io)**, conectando o personal e o aluno instantaneamente no ambiente mobile. Paralelamente, o controle de acesso e a segurança das rotas são descentralizados através do **Firebase Authentication**, que valida a identidade dos usuários de forma isolada. 

Nesse viés, serviços especializados em nuvem cuidam da mídia e do engajamento de forma periférica: enquanto a entrega assíncrona de arquivos pesados (como os vídeos explicativos do catálogo de exercícios) é delegada para a CDN do **Cloudinary** para aliviar o backend, os eventos disparados no servidor (como lembretes de metas de treino pendentes) acionam o **Firebase Cloud Messaging (FCM)** para empurrar notificações do tipo *Push* em tempo real para os dispositivos móveis dos usuários. Por fim, todo o ciclo de vida do desenvolvimento, controle de versão do código-fonte e colaboração do grupo são centralizados no **GitHub** utilizando o ecossistema **Git**. A plataforma serve como base para o versionamento das branches e a organização das entregas do projeto, garantindo o alinhamento da equipe de engenharia durante a evolução do TrainerX64.



## Tabela detalhada: 

| Camada do Sistema | Nome da Tecnologia | Justificativa de uso |
| :--- | :--- | :--- |
| **Front-end** | React Native | Permite construir o aplicativo móvel unificado (para Alunos e Personal Trainers) com alto desempenho e suporte nativo a componentes de acessibilidade (leitores de tela, fontes dinâmicas e alto contraste). |
| **Back-end** | Python (FastAPI) | Framework web moderno, assíncrono e de altíssimo desempenho, ideal para rodar com agilidade os algoritmos de cálculo automático e progressão de carga de treino. |
| **Banco de Dados** | PostgreSQL | Banco relacional robusto que garante total integridade e consistência relacional na modelagem e vínculo dos "Treinos Mãe" com as fichas específicas dos alunos. |
| **Banco Local** | WatermelonDB | Banco de dados reativo embutido e otimizado para persistência local e cache de dados, permitindo que o aluno acesse suas fichas de treino completamente offline na academia. |
| **Comunicação** | WebSockets (Socket.io) | Protocolo de comunicação bidirecional de baixa latência, viabilizando o funcionamento fluido do chat interno integrado e o suporte consultivo em tempo real. |
| **Autenticação** | Firebase Auth | Serviço especializado no gerenciamento seguro de identidades e perfis de usuários, simplificando o controle de permissões e privacidade. |
| **Notificações** | Cloudinary & FCM | O Cloudinary serve os vídeos explicativos de exercícios via CDN sem sobrecarregar o backend, enquanto o FCM entrega os alertas de treinos via notificações Push. |
| **DevOps / Versionamento** | GitHub & Git | Centraliza o código-fonte do grupo, gerencia as ramificações de desenvolvimento (branches) e serve como base para automações de testes e deploy. |
