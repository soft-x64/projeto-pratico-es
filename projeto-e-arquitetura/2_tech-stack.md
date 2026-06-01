#  Introdução

A seção de **Tecnologias e Ferramentas Utilizadas (Tech Stack Map)** consiste no mapeamento estruturado de todo o ecossistema de software, frameworks, bibliotecas e serviços de infraestrutura que serão empregados na construção prática do sistema. Organizado de forma visual e analítica por meio de camadas funcionais — como frontend, backend, banco de dados e serviços auxiliares —, esse mapeamento tem como objetivo central justificar tecnicamente a escolha de cada componente com base nos requisitos do projeto, demonstrando de forma clara e explícita como essas ferramentas se conectam e interagem para viabilizar as regras de negócio e os diferenciais da solução proposta.

# Mapa visual (Tech Stack Map):
<img width="1346" height="1816" alt="Diagrama sem nome drawio (3)" src="https://github.com/user-attachments/assets/1482c7c9-8882-4d6e-9c31-49824ee3c82b" />

### (Caso tenha dificuldade em ler a imagem no repositório, clique nela uma vez, que você será redirecionado para uma página e poderá aplicar zoom na imagem)
---

# Explicação textual do mapa:

O ecossistema do **TrainerX64** foi projetado seguindo um fluxo de integração contínua e assíncrona entre o cliente e o servidor, garantindo baixa latência e alta disponibilidade mesmo em cenários de oscilação de rede.

A jornada dos dados inicia-se nas interfaces de usuário desenvolvidas em **React.js** (painel administrativo do Personal Trainer) e **React Native** (aplicativo mobile do aluno), que consomem e interagem diretamente com o ecossistema nativo do dispositivo para prover acessibilidade completa. Quando o aluno realiza um treino em um ambiente sem conectividade à internet, o aplicativo mobile intercepta as requisições e realiza a persistência e o cache das fichas de exercícios diretamente no **WatermelonDB**. Assim que a conexão é restabelecida, uma rotina de sincronização atualiza o estado da aplicação com a infraestrutura em nuvem.

As requisições HTTP comuns enviadas pelas interfaces são processadas pelo backend em **Python (FastAPI)**, que atua como o motor lógico central do sistema. O FastAPI valida e processa as regras de negócio — como o algoritmo assíncrono de cálculo de progressão de carga — e persiste os dados de maneira estruturada e segura no banco de dados relacional **PostgreSQL**, o qual mantém a integridade referencial rigorosa entre os "Templates Mãe" de treinos e as fichas customizadas de cada aluno. 

Para operações que exigem comunicação instantânea e bidirecional, o fluxo desvia-se das rotas REST tradicionais: o chat interno e o canal de suporte consultivo direto operam por meio de túneis abertos via **WebSockets (Socket.io)**, conectando o personal e o aluno instantaneamente. Paralelamente, o controle de acesso e a segurança das rotas são descentralizados através do **Firebase Authentication**, que valida a identidade dos usuários de forma isolada. 

Por fim, serviços especializados em nuvem cuidam da mídia e do engajamento de forma periférica: enquanto a entrega assíncrona de arquivos pesados (como os vídeos explicativos do catálogo de exercícios) é delegada para a CDN do **Cloudinary** para aliviar o backend, os eventos disparados no servidor (como lembretes de metas de treino pendentes) acionam o **Firebase Cloud Messaging (FCM)** para empurrar notificações do tipo *Push* em tempo real para os dispositivos móveis dos usuários.



## Tabela detalhada: 
| Camada | Nome da Tecnologia | Justificativa de Uso |
| :--- | :--- | :--- |
| **Frontend Web** | **React.js** | Constrói o painel do Personal Trainer. Fornece suporte ideal para renderizar os painéis complexos de métricas de frequência, metas concluídas e rendimento geral através da biblioteca **Recharts**. |
| **Frontend Mobile** | **React Native** | Essencial para desenvolvimento multiplataforma focado na experiência de treino do aluno na academia. Possui APIs nativas excelentes para manipulação do *Cronômetro/Temporizador* de descanso em background. |
| **Banco Local (Offline)** | **WatermelonDB / Redux Persist** | Garante que o aluno consiga acessar suas fichas de treinos salvas no dispositivo mesmo em locais sem conectividade com a internet (*Modo Offline*). |
| **Comunicação Real-time** | **WebSockets (Socket.io)** | Provê o canal de comunicação de baixa latência necessário para o funcionamento do *Chat interno* e das ferramentas de consultoria online em tempo real. |
| **Backend** | **Python (FastAPI)** | Escolhido devido à alta velocidade de processamento e facilidade de implementação matemática para os algoritmos de *cálculo automático de carga progressiva* com base nos testes de força inseridos pelo aluno. |
| **Banco de Dados Relacional** | **PostgreSQL** | Garante consistência de dados para o relacionamento complexo de *Templates de Treino ("Treinos Mãe")* que são associados a múltiplos perfis de alunos com variáveis de ajuste individuais. |
| **Acessibilidade Nativa** | **React Native Accessibility API & i18next** | Permite o mapeamento de rótulos para *leitores de tela (TalkBack/VoiceOver)*, suporte a fontes dinâmicas, alto contraste e cuida do motor de *internacionalização (tradução de idiomas, moedas e unidades de medida)*. |
| **Mídia e Streaming** | **Cloudinary (CDN)** | Hospeda e entrega de forma otimizada os *vídeos explicativos do catálogo de exercícios*, adaptando a qualidade do streaming conforme a velocidade da conexão do usuário. |
| **Autenticação** | **Firebase Authentication** | Resolve a segurança de dados, login simplificado e fornece os mecanismos necessários para o *Controle de visibilidade de perfil e gerenciamento de permissões* de compartilhamento. |
| **Notificações Push** | **Firebase Cloud Messaging (FCM)** | Dispara os *Alertas de treinos, avaliações físicas pendentes e lembretes de metas diárias* diretamente no smartphone do usuário. |
| **Controle de Versão** | **Git + GitHub** | Versionamento e controle rígido do repositório da equipe sob a gerência técnica do projeto. |
| **Gerenciamento de Tarefas** | **GitHub Projects** | Utilizado para rastrear o fluxo de desenvolvimento das histórias de usuário geradas a partir destas ideações. |
