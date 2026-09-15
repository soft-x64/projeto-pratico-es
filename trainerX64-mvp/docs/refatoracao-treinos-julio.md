# Refatoração do módulo de Treinos — Facade

**Integrante:** Júlio Augusto (Integrante 2)
**Módulo:** Treinos · Exercícios · associação entre eles
**Padrão aplicado:** Facade
**Branch:** `refactor/treinos`
**Disciplina:** Engenharia de Software II — Profª PhD. Anacília Vieira

---

## Sumário

| Etapa | Conteúdo |
|---|---|
| 1 | [Análise do código](#etapa-1--análise-do-código) |
| 2 | [Problema identificado](#etapa-2--problema-identificado) |
| 3 | [Responsabilidades encontradas](#etapa-3--responsabilidades-encontradas) |
| 4 | [Pesquisa de padrões](#etapa-4--pesquisa-de-padrões) |
| 5 | [Escolha do padrão](#etapa-5--escolha-do-padrão) |
| 6 | [Refatoração: antes × depois](#etapa-6--refatoração-antes--depois) |
| — | [Comparação de arquitetura](#comparação-antes--depois-de-arquitetura) |
| 7 | [Testes](#etapa-7--testes) |
| — | [Evidências](#evidências) · [Roteiro de apresentação](#roteiro-de-apresentação) · [Git](#organização-no-git) |

---

## Etapa 1 — Análise do código

### Arquivos que compõem o módulo

```
backend/src/routes/treinos.routes.ts
backend/src/routes/treinoExercicios.routes.ts
backend/src/controllers/treinos.controller.ts
backend/src/controllers/treinoExercicios.controller.ts
backend/src/controllers/exercicios.controller.ts
backend/src/database/prisma.ts
```

No banco, o módulo envolve **três modelos** (`prisma/schema.prisma`):

```
Treino  1 ────< TreinoExercicio >──── 1  Exercicio
                 (ordem, series,
                  repeticoes, carga)
```

### Quem chama quem

```
treinoExercicios.routes.ts
  └── encaminha GET / POST / PUT / DELETE
        └── treinoExercicios.controller.ts
              ├── prisma.treino            ← subsistema 1
              ├── prisma.exercicio         ← subsistema 2
              └── prisma.treinoExercicio   ← subsistema 3
```

As rotas apenas encaminham. Toda a lógica está no controller.

### O que encontrei

| Observação | Onde |
|---|---|
| O controller conversa diretamente com **três** modelos do Prisma | `treinoExercicios.controller.ts` |
| `adicionarExercicioAoTreino()` executa **8 responsabilidades** em sequência | linhas 28–98 do arquivo original |
| As regras numéricas (`ordem`, `series`, `repeticoes`, `carga`) estão **duplicadas** em `adicionarExercicioAoTreino()` e `atualizarExercicioDoTreino()` | linhas 44–55 e 114–125 |
| A duplicação **já divergiu**: as mensagens são diferentes nas duas funções | idem |
| A duplicação **já gerou um bug**: uma das respostas sai com a chave `extinction` em vez de `mensagem` | linha 48 |
| `try/catch` com `console.error` repetido nas 4 funções | arquivo todo |

### Pergunta principal da atividade

> "Existe alguma parte desse código que está fazendo mais do que deveria?"

Sim: `adicionarExercicioAoTreino()`. É a função que monta a ficha de treino e, para isso, precisa conhecer os três modelos, a ordem correta das verificações entre eles e todas as regras de validação dos campos do vínculo.

---

## Etapa 2 — Problema identificado

### Arquivo

`backend/src/controllers/treinoExercicios.controller.ts`

### Trecho/função

`adicionarExercicioAoTreino()`

### Problema

A função responsável por adicionar um exercício a um treino concentra, em um único bloco, a extração dos dados da requisição, a validação dos campos obrigatórios, a validação das regras de negócio numéricas, **três consultas a três modelos diferentes do banco** (existência do treino, existência do exercício e checagem de vínculo duplicado), a criação do registro e a montagem da resposta HTTP.

Em consequência, o controller passa a depender de todo o subsistema de treinos: ele importa o Prisma e acessa `prisma.treino`, `prisma.exercicio` e `prisma.treinoExercicio`. Além disso, as regras numéricas do vínculo estão copiadas em `atualizarExercicioDoTreino()`.

### Por que isso é um problema?

1. **Dependências excessivas.** Qualquer mudança em como o sistema verifica a existência de um treino ou de um exercício obriga a alterar o controller, que deveria apenas tratar HTTP.

2. **A duplicação das regras já causou defeitos reais.** As mesmas quatro checagens existem em dois lugares e já divergiram:

   | Regra | `adicionarExercicioAoTreino()` | `atualizarExercicioDoTreino()` |
   |---|---|---|
   | ordem < 1 | `{ mensagem: "Ordem inválida. Deve ser maior que zero." }` | `{ mensagem: "Ordem inválida." }` |
   | series < 1 | `{ extinction: "Séries inválidas. Deve ser maior que zero." }` ← **bug** | `{ mensagem: "Séries inválidas." }` |
   | repeticoes < 1 | `{ mensagem: "Repetições inválidas. Deve ser maior que zero." }` | `{ mensagem: "Repetições inválidas." }` |
   | carga < 0 | `{ mensagem: "Carga negativa não é permitida." }` | `{ mensagem: "Carga negativa." }` |

   O campo `extinction` faz com que o frontend (`treinoExercicioService.ts`, que lê `error.response.data.mensagem`) **não encontre a mensagem** e mostre "Ocorreu um erro inesperado." ao personal trainer, em vez de dizer que o número de séries é inválido. É um defeito de usabilidade que só existe porque a regra foi copiada em vez de compartilhada.

3. **Impossível testar sem banco.** Como a lógica de orquestração está grudada no Prisma e no objeto `response` do Express, testar a regra "não pode repetir o mesmo exercício na mesma ficha" exigiria subir um PostgreSQL.

---

## Etapa 3 — Responsabilidades encontradas

```
adicionarExercicioAoTreino()
 ├── 1. Receber a requisição HTTP
 ├── 2. Validar campos obrigatórios
 ├── 3. Validar regras numéricas do vínculo
 ├── 4. Consultar o subsistema Treino
 ├── 5. Consultar o subsistema Exercicio
 ├── 6. Consultar o subsistema TreinoExercicio (duplicidade)
 ├── 7. Gravar o vínculo
 └── 8. Montar a resposta HTTP
```

### Responsabilidade que está causando o problema

**As de número 4, 5 e 6: orquestrar os três subsistemas.**

Validar campos e responder HTTP são coisas que um controller pode razoavelmente fazer. O que não deveria estar ali é o **conhecimento de como os três modelos se relacionam** e em que ordem precisam ser consultados para que uma ficha de treino seja montada com segurança.

Essa é a responsabilidade que faz o controller crescer: hoje são três consultas; quando entrar a regra "só pode adicionar exercício em treino com status `disponivel`", será uma quarta, dentro da mesma função.

> As responsabilidades 2 e 3 também estão misturadas, e as trato de carona ao mover a orquestração — mas o alvo da refatoração é a orquestração.

---

## Etapa 4 — Pesquisa de padrões

```
Problema: um componente precisa conhecer e coordenar três subsistemas
                              ↓
        Quais padrões poderiam ajudar?
                              ↓
     Facade          Factory Method          Decorator
                              ↓
                       Comparação
                              ↓
                    Escolha: Facade
```

| Padrão | O que resolve | Serve aqui? |
|---|---|---|
| **Facade** | Fornece uma interface unificada e simplificada para um conjunto de interfaces de um subsistema. | **Sim.** O problema registrado na Etapa 2 é exatamente "o cliente precisa conhecer três subsistemas e a ordem de uso entre eles". |
| **Factory Method** | Define uma interface para criar objetos, deixando a subclasse decidir qual classe instanciar. | Não. Resolveria variação de *tipo* de treino (força, hipertrofia, cardio). Essa variação não existe no código: só há um tipo de vínculo. Aplicá-lo seria forçar o padrão. |
| **Decorator** | Agrega responsabilidades a um objeto dinamicamente, envolvendo-o. | Não. Serve para empilhar comportamento sobre um objeto já existente. Aqui não há um objeto a envolver — há três subsistemas a coordenar. |

Também considerei **State**, que resolveria um problema real e diferente do módulo (o `status` do treino é uma string conferida contra um array, e nada impede a transição `concluido → disponivel`). Foi descartado por dois motivos: não é o problema que registrei na Etapa 2, e o grupo já tem uma proposta de State para o status do aluno.

---

## Etapa 5 — Escolha do padrão

### Padrão escolhido

**Nome:** Facade (padrão estrutural, GoF)

**Problema que ele resolve:** o controller de `TreinoExercicio` precisa conhecer três subsistemas do domínio de treinos (`Treino`, `Exercicio`, `TreinoExercicio`) e a ordem correta de interação entre eles para montar uma ficha de treino.

**Por que esse padrão foi escolhido?**

A definição do Facade é "fornecer uma interface unificada para um conjunto de interfaces de um subsistema, definindo uma interface de nível mais alto que torna o subsistema mais fácil de usar". É literalmente a descrição do problema encontrado: quem quer adicionar um exercício a um treino não deveria precisar saber que isso envolve três tabelas, duas verificações de existência e uma verificação de unicidade.

Com a facade, o controller passa de **três dependências** para **uma**, e a sequência correta de operações passa a ser garantida por um único componente, em vez de depender de o programador lembrar a ordem certa.

**Por que não utilizar outra solução?**

Comparado ao **Factory Method**, que foi a segunda opção avaliada: ele resolve "qual objeto criar", e aqui não há decisão de tipo a tomar — o vínculo é sempre o mesmo tipo de registro. O problema é *quantos subsistemas o cliente precisa conhecer*, não *qual classe instanciar*.

Comparado a simplesmente **extrair funções** (sem padrão): resolveria a duplicação das validações, mas o controller continuaria importando o Prisma e chamando os três modelos. A dependência excessiva, que é o problema central, permaneceria.

---

## Etapa 6 — Refatoração: antes × depois

### Arquivos criados

```
backend/src/facades/fichaDeTreino.facade.ts   ← a facade (classe + contratos)
backend/src/facades/index.ts                  ← liga a facade ao banco real
backend/tests/fichaDeTreino.facade.test.ts    ← testes da facade
backend/tests/equivalencia.antes-depois.test.ts ← prova de equivalência
backend/jest.config.js · backend/tsconfig.json
```

### Arquivo alterado

```
backend/src/controllers/treinoExercicios.controller.ts
```

---

### ANTES

```ts
// treinoExercicios.controller.ts
import { prisma } from "../database/prisma";

export async function adicionarExercicioAoTreino(request, response) {
  try {
    const { treinoId } = request.params;
    const { exercicioId, ordem, series, repeticoes, carga } = request.body;

    if (!exercicioId || ordem === undefined || series === undefined || repeticoes === undefined) {
      return response.status(400).json({ mensagem: "Campos obrigatórios ausentes (...)" });
    }
    if (Number(ordem) < 1)      return response.status(400).json({ mensagem: "Ordem inválida. ..." });
    if (Number(series) < 1)     return response.status(400).json({ extinction: "Séries inválidas. ..." });
    if (Number(repeticoes) < 1) return response.status(400).json({ mensagem: "Repetições inválidas. ..." });
    if (carga !== undefined && carga !== null && Number(carga) < 0) {
      return response.status(400).json({ mensagem: "Carga negativa não é permitida." });
    }

    const treinoExiste = await prisma.treino.findUnique({ where: { id: treinoId } });
    if (!treinoExiste) return response.status(404).json({ mensagem: "Treino inexistente." });

    const exercicioExiste = await prisma.exercicio.findUnique({ where: { id: exercicioId } });
    if (!exercicioExiste) return response.status(404).json({ mensagem: "Exercício inexistente." });

    const duplicado = await prisma.treinoExercicio.findUnique({
      where: { treinoId_exercicioId: { treinoId, exercicioId } },
    });
    if (duplicado) return response.status(400).json({ mensagem: "Impedir exercício duplicado." });

    const novoVinculo = await prisma.treinoExercicio.create({ data: { ... }, include: { exercicio: true } });
    return response.status(201).json(novoVinculo);
  } catch (error) { ... }
}
```

**O que ele fazia:** tudo — validação, orquestração dos três modelos e resposta HTTP.
**Responsabilidades:** as 8 listadas na Etapa 3.
**Problema:** dependência dos três subsistemas + regras duplicadas na função de atualizar.

---

### DEPOIS

**A facade** (`src/facades/fichaDeTreino.facade.ts`) — interface única sobre os três subsistemas:

```ts
export class FichaDeTreinoFacade {
  constructor(private readonly banco: BancoDaFichaDeTreino) {}

  public async adicionarExercicio(treinoId: string, dados: DadosNovoVinculo) {
    const { exercicioId, ordem, series, repeticoes, carga } = dados;

    if (!exercicioId || ordem === undefined || series === undefined || repeticoes === undefined) {
      return this.falha(400, "Campos obrigatórios ausentes (...)");
    }

    const erroDeValor = this.validarValores({ ordem, series, repeticoes, carga });
    if (erroDeValor) return erroDeValor;

    const treino = await this.banco.treino.findUnique({ where: { id: treinoId } });
    if (!treino) return this.falha(404, "Treino inexistente.");

    const exercicio = await this.banco.exercicio.findUnique({ where: { id: exercicioId } });
    if (!exercicio) return this.falha(404, "Exercício inexistente.");

    const duplicado = await this.banco.treinoExercicio.findUnique({
      where: { treinoId_exercicioId: { treinoId, exercicioId } },
    });
    if (duplicado) return this.falha(400, "Impedir exercício duplicado.");

    const vinculo = await this.banco.treinoExercicio.create({ data: { ... }, include: { exercicio: true } });
    return { sucesso: true, dados: vinculo };
  }

  /** Regras numéricas em UM lugar só — usadas na criação e na atualização. */
  private validarValores({ ordem, series, repeticoes, carga }) {
    if (ordem !== undefined && Number(ordem) < 1)
      return this.falha(400, "Ordem inválida. Deve ser maior que zero.");
    if (series !== undefined && Number(series) < 1)
      return this.falha(400, "Séries inválidas. Deve ser maior que zero.");
    if (repeticoes !== undefined && Number(repeticoes) < 1)
      return this.falha(400, "Repetições inválidas. Deve ser maior que zero.");
    if (carga !== undefined && carga !== null && Number(carga) < 0)
      return this.falha(400, "Carga negativa não é permitida.");
    return null;
  }
}
```

**O controller** (`src/controllers/treinoExercicios.controller.ts`) — só HTTP:

```ts
import { fichaDeTreino } from "../facades";

export async function adicionarExercicioAoTreino(request, response) {
  try {
    const treinoId = String(request.params.treinoId);

    const resultado = await fichaDeTreino.adicionarExercicio(treinoId, request.body);

    if (!resultado.sucesso) {
      return response.status(resultado.status).json({ mensagem: resultado.mensagem });
    }

    return response.status(201).json(resultado.dados);
  } catch (error) {
    console.error("Erro ao adicionar exercício ao treino:", error);
    return response.status(500).json({ mensagem: "Erro interno ao adicionar exercício ao treino." });
  }
}
```

**O que foi alterado:**

- A orquestração dos três subsistemas saiu do controller e virou a `FichaDeTreinoFacade`.
- As quatro regras numéricas, antes duplicadas, viraram o método privado `validarValores()`, usado tanto na criação quanto na atualização.
- O bug da chave `extinction` desapareceu como consequência: existe apenas uma implementação da regra.
- A facade não conhece o Express (devolve `{ sucesso, dados }` ou `{ sucesso, status, mensagem }`) e não conhece o Prisma diretamente (recebe o banco pelo construtor, em `src/facades/index.ts`).

**Como o padrão foi aplicado:**

| Elemento do padrão | No TrainerX64 |
|---|---|
| Cliente | `treinoExercicios.controller.ts` |
| Facade | `FichaDeTreinoFacade` |
| Subsistemas | `Treino`, `Exercicio`, `TreinoExercicio` (via Prisma) |

**O que melhorou:**

- **Menor acoplamento:** o controller saiu de 3 dependências de modelo para 1 dependência de facade, e deixou de importar o Prisma.
- **Separação de responsabilidades:** o controller ficou com HTTP; a facade ficou com a coordenação do domínio.
- **Eliminação de código repetido:** 8 blocos de validação viraram 4.
- **Facilidade para testar:** a facade recebe o banco pelo construtor, então dá para testá-la com um duplo de teste, sem PostgreSQL. Antes isso era impossível.
- **Correção de um defeito real:** a chave `extinction` foi eliminada.

---

## Comparação antes × depois de arquitetura

### Antes

```
treinoExercicios.controller.ts
 ├── Receber requisição
 ├── Validar campos obrigatórios
 ├── Validar regras numéricas        ← duplicado em atualizar()
 ├── Consultar Treino
 ├── Consultar Exercicio
 ├── Consultar TreinoExercicio
 ├── Gravar o vínculo
 └── Responder HTTP
```

### Depois

```
treinoExercicios.controller.ts
 ├── Receber requisição
 └── Responder HTTP

FichaDeTreinoFacade
 ├── Validar campos obrigatórios
 ├── Validar regras numéricas        ← UM lugar só
 ├── Consultar Treino
 ├── Consultar Exercicio
 ├── Consultar TreinoExercicio
 └── Gravar o vínculo

facades/index.ts
 └── Ligar a facade ao banco real
```

### Em números

| Métrica | Antes | Depois |
|---|---|---|
| Modelos do Prisma acessados pelo controller | 3 | 0 |
| Imports do Prisma no controller | 1 | 0 |
| Linhas da função `adicionarExercicioAoTreino()` | 71 | 21 |
| Linhas do `treinoExercicios.controller.ts` | 170 | 99 |
| Blocos de validação numérica no módulo | 8 (duplicados) | 4 |
| Respostas com a chave errada (`extinction`) | 1 | 0 |
| Testes automatizados possíveis sem banco | 0 | 20 |

> O total de linhas do módulo **aumentou**, porque a facade é um arquivo novo. Isso é esperado e não é o ganho da refatoração: o ganho é que a lógica saiu de um lugar onde não deveria estar, ficou em um lugar só e passou a ser testável. Refatoração não é medida por linhas a menos.

---

## Etapa 7 — Testes

### Como executar

```bash
cd trainerX64-mvp/backend
npm install
npm test
```

### Verificações

| Teste | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|
| Listar exercícios de um treino | Lista na ordem da ficha (`ordem asc`) | Lista na ordem da ficha | ✅ |
| Adicionar exercício com dados válidos | Vínculo criado (201) | Vínculo criado | ✅ |
| Adicionar sem campos obrigatórios | 400 "Campos obrigatórios ausentes" | 400, mesma mensagem | ✅ |
| Adicionar com `ordem` = 0 | 400 "Ordem inválida" | 400, mesma mensagem | ✅ |
| Adicionar com `series` = 0 | 400 com a chave **`mensagem`** | 400 com `mensagem` | ✅ |
| Adicionar com `repeticoes` = 0 | 400 "Repetições inválidas" | 400, mesma mensagem | ✅ |
| Adicionar com `carga` negativa | 400 "Carga negativa não é permitida" | 400, mesma mensagem | ✅ |
| Adicionar com `carga` ausente ou zero | Aceito; grava `null` / `0` | Aceito; grava `null` / `0` | ✅ |
| Adicionar em treino inexistente | 404 "Treino inexistente" | 404, mesma mensagem | ✅ |
| Adicionar exercício inexistente | 404 "Exercício inexistente" | 404, mesma mensagem | ✅ |
| Adicionar o mesmo exercício duas vezes | 400 "Impedir exercício duplicado" | 400, mesma mensagem | ✅ |
| Validar antes de consultar o banco | Nenhuma consulta é feita | Nenhuma consulta é feita | ✅ |
| Atualizar só um campo | Só o campo enviado muda | Só o campo enviado muda | ✅ |
| Atualizar vínculo inexistente | 404 "Vínculo inexistente" | 404, mesma mensagem | ✅ |
| Atualizar com `repeticoes` = 0 | 400, mesma regra da criação | 400, mesma regra | ✅ |
| Atualizar `carga` para `null` | Carga limpa | Carga limpa | ✅ |
| Remover vínculo existente | Vínculo removido (200) | Vínculo removido | ✅ |
| Remover vínculo inexistente | 404 "Vínculo inexistente" | 404, mesma mensagem | ✅ |

### Prova de que o comportamento foi preservado

Refatoração não pode mudar o comportamento observável do sistema. Para provar isso — e não apenas afirmar —, o arquivo `tests/equivalencia.antes-depois.test.ts` mantém uma **cópia literal da lógica do controller original** e a executa lado a lado com a facade, sobre a mesma matriz de entradas:

- **56 combinações** na criação (4 estados de banco × 14 corpos de requisição);
- **24 combinações** na atualização (2 estados × 12 corpos).

Resultado sobre as 80 combinações:

- **status HTTP idêntico em 100% dos casos**;
- corpo da resposta idêntico, **exceto** pelas cinco mensagens padronizadas de propósito, listadas no próprio teste em `DIVERGENCIAS_ACEITAS`:

| Antes | Depois | Motivo |
|---|---|---|
| `{ extinction: "Séries inválidas. Deve ser maior que zero." }` | `{ mensagem: ... }` | **correção de bug** |
| `{ mensagem: "Ordem inválida." }` | `{ mensagem: "Ordem inválida. Deve ser maior que zero." }` | padronização |
| `{ mensagem: "Séries inválidas." }` | `{ mensagem: "Séries inválidas. Deve ser maior que zero." }` | padronização |
| `{ mensagem: "Repetições inválidas." }` | `{ mensagem: "Repetições inválidas. Deve ser maior que zero." }` | padronização |
| `{ mensagem: "Carga negativa." }` | `{ mensagem: "Carga negativa não é permitida." }` | padronização |

As mensagens de atualização foram alinhadas às de criação, que são as mais informativas. O frontend (`treinoExercicioService.ts`) só lê o campo `mensagem` e o exibe, sem depender do texto exato — então a padronização não quebra nenhuma tela.

### Saída da suíte

```
Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
```

Saída completa em `docs/evidencia-testes-treinos.txt`.

---

## Evidências

- [ ] Print do `treinoExercicios.controller.ts` **antes** (VS Code)
- [ ] Print do `treinoExercicios.controller.ts` **depois**
- [ ] Print do `fichaDeTreino.facade.ts`
- [ ] Print da estrutura de pastas mostrando `backend/src/facades/`
- [x] Saída dos testes — `docs/evidencia-testes-treinos.txt`
- [ ] Print do `npm test` no terminal
- [ ] Print da resposta da API no Insomnia/Postman (`POST /treinos/:treinoId/exercicios`)
- [ ] Diff do commit na branch `refactor/treinos`

> Sugestão de print forte para a apresentação: fazer `POST` com `"series": 0` no Insomnia **antes** e **depois**. Antes aparece `"extinction"`; depois aparece `"mensagem"`. É a prova visual do bug corrigido.

---

## Roteiro de apresentação

**1. Contextualização**
> "Fiquei responsável pelo módulo de Treinos — treinos, exercícios e a associação entre eles."

**2. Problema encontrado**
> "Durante a análise identifiquei que a função `adicionarExercicioAoTreino` faz oito coisas em sequência e, para isso, precisa conhecer três modelos diferentes do banco: Treino, Exercicio e TreinoExercicio. E as validações dela estão copiadas na função de atualizar — copiadas e já divergentes. Tanto que uma delas tem um bug: retorna a chave `extinction` em vez de `mensagem`, o que faz o frontend mostrar 'erro inesperado' em vez de dizer que as séries estão inválidas."

**3. Responsabilidades**
> "Esse componente estava assumindo receber requisição, validar campos, validar regras de negócio, consultar três subsistemas, gravar e responder. A que causa o problema é a orquestração dos três subsistemas — é ela que faz a função crescer a cada regra nova."

**4. Padrão escolhido**
> "Comparei Facade, Factory Method e Decorator. Escolhi Facade porque a definição dele é literalmente o meu problema: fornecer uma interface unificada para um conjunto de interfaces de um subsistema. Factory Method resolveria qual tipo de objeto criar, e aqui não existe variação de tipo. Decorator serve para envolver um objeto, e aqui não há objeto a envolver — há três subsistemas a coordenar."

**5. Refatoração**
> "A principal mudança foi extrair a `FichaDeTreinoFacade`. O controller saiu de três dependências para uma e não importa mais o Prisma. E as quatro validações duplicadas viraram um método só, usado pelas duas operações."

**6. Benefícios**
> "Menor acoplamento, separação de responsabilidades, fim do código repetido, um bug real corrigido — e a facade ficou testável sem banco, porque recebe o banco pelo construtor."

**7. Testes**
> "Escrevi 20 testes. Além dos testes da facade, fiz um teste de equivalência: mantive uma cópia do código original e rodei os dois lado a lado em 80 combinações de entrada. O status HTTP é idêntico em 100% dos casos e o corpo também, tirando as cinco mensagens que padronizei de propósito."

**8. Conclusão**
> "Com essa refatoração, conseguimos tirar do controller o conhecimento de três subsistemas e eliminar a duplicação das regras do vínculo, sem alterar o comportamento esperado do sistema."

---

## Organização no Git

```bash
# a partir da branch principal atualizada
git checkout main
git pull

# branch própria, conforme combinado no grupo
git checkout -b refactor/treinos

# arquivos da refatoração
git add trainerX64-mvp/backend/src/facades/
git add trainerX64-mvp/backend/src/controllers/treinoExercicios.controller.ts
git add trainerX64-mvp/backend/tests/
git add trainerX64-mvp/backend/jest.config.js
git add trainerX64-mvp/backend/tsconfig.json
git add trainerX64-mvp/backend/package.json
git add trainerX64-mvp/docs/refatoracao-treinos-julio.md
git add trainerX64-mvp/docs/evidencia-testes-treinos.txt

git commit -m "refactor(treinos): aplica Facade na montagem da ficha de treino

Extrai FichaDeTreinoFacade para unificar o acesso aos subsistemas Treino,
Exercicio e TreinoExercicio. O controller passa a tratar apenas HTTP.

- unifica as regras numericas do vinculo, antes duplicadas entre
  adicionarExercicioAoTreino e atualizarExercicioDoTreino
- corrige a resposta que saia com a chave 'extinction' no lugar de 'mensagem'
- adiciona 20 testes, incluindo prova de equivalencia antes x depois
  sobre 80 combinacoes de entrada"

git push -u origin refactor/treinos
```

Depois, abrir o Pull Request `refactor/treinos → main` e apresentar para o grupo.
