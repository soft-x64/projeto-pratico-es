##  Introdução

A seção de **Tecnologias e Ferramentas Utilizadas (Tech Stack Map)** consiste no mapeamento estruturado de todo o ecossistema de software, frameworks, bibliotecas e serviços de infraestrutura que serão empregados na construção prática do sistema. Organizado de forma visual e analítica por meio de camadas funcionais — como frontend, backend, banco de dados e serviços auxiliares —, esse mapeamento tem como objetivo central justificar tecnicamente a escolha de cada componente com base nos requisitos do projeto, demonstrando de forma clara e explícita como essas ferramentas se conectam e interagem para viabilizar as regras de negócio e os diferenciais da solução proposta.

## Mapa visual (Tech Stack Map):



### Explicação textual do mapa:



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
