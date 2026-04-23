# [cite_start]PLANO DE TRABALHO [cite: 1]

| Informações do Projeto | Detalhes |
| :--- | :--- |
| **Nome do Projeto** | [cite_start]TrainerX64 (TX64) [cite: 2] |
| **Versão** | [cite_start]1.0 [cite: 2, 4] |
| **Status** | [cite_start]Em desenvolvimento [cite: 2] |
| **Número de Controle SRBR-M** | [cite_start]SRBR-M-TX64-2026-01 [cite: 2] |
| **Executor Principal** | Soft-X64: Gustavo Barros; Adriano Rolim; Eduardo Tundis; [cite_start]Júlio Augusto [cite: 2] |
| **Coordenador do Projeto** | [cite_start]Andrey Rodrigues / Engenharia de Software 1 [cite: 2] |

---

## [cite_start]HISTÓRICO DE VERSÕES [cite: 3]

| Versão | Descrição | Autor | Data |
| :--- | :--- | :--- | :--- |
| 1.0 | [cite_start]Elaboração do Plano de Trabalho [cite: 4] | [cite_start]Equipe Soft-X64 [cite: 4] | [cite_start]30/03/2026 [cite: 4] |

---

## [cite_start]1. INTRODUÇÃO [cite: 11]

[cite_start]O projeto **TrainerX64** consiste no desenvolvimento de um sistema digital voltado à gestão e acompanhamento de treinos físicos, com o objetivo de facilitar a interação entre *personal trainers* e alunos[cite: 12]. [cite_start]A proposta busca centralizar funcionalidades essenciais como criação e acompanhamento de treinos, monitoramento de desempenho, comunicação e organização de atividades em uma única plataforma[cite: 13].

[cite_start]A justificativa do projeto está relacionada à necessidade de soluções mais eficientes no contexto fitness, visto que muitos profissionais ainda utilizam métodos informais[cite: 14]. [cite_start]O sistema propõe uma abordagem organizada, promovendo maior controle, personalização e acompanhamento contínuo da evolução dos usuários[cite: 15].

[cite_start]Como característica diferencial, o TrainerX64 incorpora princípios de acessibilidade desde sua concepção, contemplando usuários com baixa visão por meio de recursos como leitura por voz, alto contraste, navegação simplificada e textos ampliados[cite: 16, 24, 30].

### [cite_start]1.1 Objeto [cite: 20]
[cite_start]O TrainerX64 é um sistema desenvolvido para o gerenciamento de treinos com foco na interação entre personal trainers e alunos[cite: 21]. [cite_start]Sua função principal é permitir a criação, organização e execução de treinos personalizados, além do registro de desempenho[cite: 22]. [cite_start]Oferece suporte ao gerenciamento de alunos, evolução física, comunicação e acesso a vídeos instrutivos[cite: 23].

### [cite_start]1.3 Caracterização do Projeto [cite: 33]

#### [cite_start]1.3.1 Classe [cite: 34]
| Classe | Detalhamento |
| :--- | :--- |
| **Sistema de Gestão** | [cite_start]Voltado ao gerenciamento de treinos, alunos e desempenho[cite: 35]. |
| **Sistema Interativo** | [cite_start]Permite a interação entre personal trainer e aluno[cite: 35]. |
| **Sistema de Apoio à Decisão** | [cite_start]Auxilia o personal trainer no acompanhamento da evolução[cite: 35]. |
| **Sistema com Acessibilidade** | [cite_start]Possui recursos adaptados para usuários com baixa visão[cite: 35]. |

#### [cite_start]1.3.2 Enquadrabilidade [cite: 36]
| Enquadrabilidade | Detalhamento |
| :--- | :--- |
| **Software Educacional** | [cite_start]Desenvolvido no contexto acadêmico para aplicação de conceitos de IHC[cite: 37]. |
| **Software de Pesquisa** | [cite_start]Envolve estudo de usabilidade, acessibilidade e modelagem[cite: 37]. |
| **Open Source** | [cite_start]Disponível em repositório público para acesso e estudo[cite: 37]. |

---

## [cite_start]2. INFORMAÇÕES GERAIS [cite: 38]

### [cite_start]2.1 Escopo Geral [cite: 39]
[cite_start]O objetivo é desenvolver um sistema para gerenciamento de treinos físicos, promovendo interação e suporte à acessibilidade para pessoas com baixa visão[cite: 40, 41].

#### [cite_start]2.1.1 Escopo Específico [cite: 42]
* [cite_start]Cadastro e gerenciamento de alunos[cite: 43].
* [cite_start]Criação, edição e organização de treinos personalizados[cite: 44].
* [cite_start]Acompanhamento da evolução e desempenho[cite: 45].
* [cite_start]Registro de execução (cargas, repetições, conclusão)[cite: 46].
* [cite_start]Acesso a vídeos e instruções dos exercícios[cite: 47].
* [cite_start]Comunicação entre personal trainer e aluno[cite: 48].
* [cite_start]Sistema de notificações e lembretes[cite: 49].
* [cite_start]Recursos de acessibilidade (leitura por voz, alto contraste)[cite: 50].

#### [cite_start]2.1.2 Escopo Negativo [cite: 51]
* [cite_start]Não haverá integração com dispositivos externos (ex: smartwatches)[cite: 52].
* [cite_start]O sistema não contará com funcionalidades avançadas de inteligência artificial[cite: 53].
* [cite_start]Não haverá integração com sistemas de pagamento reais[cite: 54].
* [cite_start]O sistema não será publicado em ambiente de produção (uso acadêmico)[cite: 55].

### [cite_start]2.2 Ambiente de Desenvolvimento [cite: 57]
| Componente | Tecnologia/Ferramenta |
| :--- | :--- |
| Metodologia | [cite_start]Scrum com sprints [cite: 58] |
| Gerenciamento de Backlog | [cite_start]GitHub [cite: 58] |
| Repositório de Código | [cite_start]GitHub [cite: 58] |
| Modelagem de Software | [cite_start]Draw.io [cite: 58] |
| Desenvolvimento do MVP | [cite_start]Linguagem a definir [cite: 58] |

---

## [cite_start]3. METODOLOGIA DE PROJETO [cite: 70]

### [cite_start]3.1 Estrutura do Projeto [cite: 71]
[cite_start]O desenvolvimento seguirá a abordagem ágil Scrum em cinco fases[cite: 72]:
1. [cite_start]Ideação[cite: 74].
2. [cite_start]Levantamento de Requisitos[cite: 75].
3. [cite_start]Projeto e Arquitetura[cite: 76].
4. [cite_start]Projeto dos Casos de Teste[cite: 77].
5. [cite_start]Desenvolvimento do MVP[cite: 78].

### [cite_start]3.2 Equipe de Projeto [cite: 79]
[cite_start]A equipe é composta pelos integrantes: Adriano Rolim, Eduardo Tundis, Júlio Augusto e Luiz Gustavo[cite: 81].

---

## [cite_start]4. DESPESAS [cite: 82]

### [cite_start]4.1 Dispêndios [cite: 83]
| Item | Descrição | Qtd. | Valor Total (R$) |
| :--- | :--- | :--- | :--- |
| 1 | Licenças de Softwares (Figma/Adobe) | 2 | [cite_start]900,00 [cite: 88] |
| 2 | Materiais de escritório | 1 | [cite_start]300,00 [cite: 88] |
| 3 | Dispositivos para Teste (Smartphones/Tablets) | 2 | [cite_start]3.600,00 [cite: 88] |
| 4 | Taxa de Publicação (Apple Developer Program) | 1 | [cite_start]550,00 [cite: 88] |
| 5 | Taxa de Publicação (Google Play Console) | 1 | [cite_start]150,00 [cite: 88] |
| 6 | Certificados SSL para Segurança | 1 | [cite_start]350,00 [cite: 88] |
| 7 | Créditos de API (Google Maps/Nutrição) | 1 | [cite_start]800,00 [cite: 88] |
| **Total** | | | [cite_start]**6.650,00** [cite: 88] |

> [cite_start]**Treinamento:** R$ 2.500,00 destinados a cursos técnicos (React Native/Flutter) e segurança da informação (LGPD)[cite: 90, 91].

### [cite_start]4.1.4 Serviço Técnico de Terceiros [cite: 92]
| Item | Especificação | Custo (R$) |
| :--- | :--- | :--- |
| 1 | Desenvolvimento de Software (Back-end/Cloud) | [cite_start]12.000,00 [cite: 94] |
| 2 | Servidores e Hospedagem (AWS/Azure) | [cite_start]2.500,00 [cite: 94] |
| 3 | Consultoria Jurídica (LGPD) | [cite_start]1.500,00 [cite: 94] |
| 4 | Design de Interface (UI) e UX | [cite_start]8.000,00 [cite: 94] |
| 5 | Marketing de Lançamento | [cite_start]10.000,00 [cite: 94] |
| 6 | Produção de Conteúdo (Vídeos/Nutrição) | [cite_start]4.000,00 [cite: 94] |
| 7 | Serviço de QA (Testes) | [cite_start]3.500,00 [cite: 94] |
| 8 | Gestão de Tráfego Pago | [cite_start]4.500,00 [cite: 94] |
| 9 | Suporte Técnico ao Cliente | [cite_start]2.000,00 [cite: 94] |
| 10 | SEO e Copywriting | [cite_start]2.500,00 [cite: 94] |
| **Total** | | [cite_start]**50.500,00** [cite: 94] |

---

## [cite_start]RESUMO FINANCEIRO DO PROJETO [cite: 97]

| ITEM | VALOR TOTAL (R$) | % |
| :--- | :--- | :--- |
| Dispêndios (Equip/Consumo) | 6.650,00 | [cite_start]6,65% [cite: 98] |
| Treinamento | 2.500,00 | [cite_start]2,50% [cite: 98] |
| Serviço Técnico de Terceiros | 50.500,00 | [cite_start]50,50% [cite: 98] |
| Recursos Humanos Indiretos (Adm/Gestão) | 10.500,00 | [cite_start]10,50% [cite: 98] |
| Provisão de Manutenção de Servidores | 3.500,00 | [cite_start]3,50% [cite: 98] |
| Margem de Contingência (10%) | 7.365,00 | [cite_start]7,37% [cite: 98] |
| Impostos e Taxas (Aprox. 19%) | 18.985,00 | [cite_start]18,98% [cite: 98] |
| **TOTAL DO PROJETO** | **R$ 100.000,00** | [cite_start]**100%** [cite: 98] |
