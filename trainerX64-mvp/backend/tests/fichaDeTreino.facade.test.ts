import {
  FichaDeTreinoFacade,
  type BancoDaFichaDeTreino,
} from "../src/facades/fichaDeTreino.facade";

/**
 * Testes da FichaDeTreinoFacade — refatoração do módulo de Treinos.
 *
 * A facade recebe o banco pelo construtor, então aqui ela é instanciada com
 * um duplo de teste. Nenhum banco de dados real é necessário: o que está
 * sendo verificado é a orquestração entre Treino, Exercicio e
 * TreinoExercicio, e não o Prisma.
 */

const TREINO = { id: "treino-1", nome: "Treino A" };
const EXERCICIO = { id: "exercicio-1", nome: "Supino" };
const VINCULO = {
  id: "vinculo-1",
  treinoId: TREINO.id,
  exercicioId: EXERCICIO.id,
  ordem: 1,
  series: 3,
  repeticoes: 12,
  carga: 40,
};

interface EstadoDoBanco {
  treino?: unknown;
  exercicio?: unknown;
  vinculoExistente?: unknown;
}

/**
 * Cria um banco falso com o estado desejado e registra as chamadas
 * recebidas, para que os testes possam verificar o que a facade fez.
 */
function criarBancoFalso(estado: EstadoDoBanco = {}) {
  const chamadas = {
    create: [] as any[],
    update: [] as any[],
    delete: [] as any[],
    findMany: [] as any[],
  };

  const banco: BancoDaFichaDeTreino = {
    treino: {
      findUnique: async () =>
        estado.treino === undefined ? TREINO : estado.treino,
    },
    exercicio: {
      findUnique: async () =>
        estado.exercicio === undefined ? EXERCICIO : estado.exercicio,
    },
    treinoExercicio: {
      findMany: async (args: any) => {
        chamadas.findMany.push(args);
        return [VINCULO];
      },
      findUnique: async () =>
        estado.vinculoExistente === undefined
          ? null
          : estado.vinculoExistente,
      create: async (args: any) => {
        chamadas.create.push(args);
        return { ...VINCULO, ...args.data };
      },
      update: async (args: any) => {
        chamadas.update.push(args);
        return { ...VINCULO, ...args.data };
      },
      delete: async (args: any) => {
        chamadas.delete.push(args);
        return VINCULO;
      },
    },
  };

  return { banco, chamadas };
}

const dadosValidos = {
  exercicioId: EXERCICIO.id,
  ordem: 1,
  series: 3,
  repeticoes: 12,
  carga: 40,
};

// ---------------------------------------------------------------------------

describe("FichaDeTreinoFacade — adicionar exercício ao treino", () => {
  test("adiciona o exercício quando todos os dados são válidos", async () => {
    const { banco, chamadas } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(
      TREINO.id,
      dadosValidos,
    );

    expect(resultado.sucesso).toBe(true);
    expect(chamadas.create).toHaveLength(1);
    expect(chamadas.create[0].data).toMatchObject({
      treinoId: TREINO.id,
      exercicioId: EXERCICIO.id,
      ordem: 1,
      series: 3,
      repeticoes: 12,
      carga: 40,
    });
  });

  test("rejeita quando faltam campos obrigatórios", async () => {
    const { banco, chamadas } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(TREINO.id, {
      exercicioId: EXERCICIO.id,
      ordem: 1,
    });

    expect(resultado).toEqual({
      sucesso: false,
      status: 400,
      mensagem:
        "Campos obrigatórios ausentes (exercicioId, ordem, series, repeticoes).",
    });
    expect(chamadas.create).toHaveLength(0);
  });

  test("rejeita ordem menor que 1", async () => {
    const { banco } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(TREINO.id, {
      ...dadosValidos,
      ordem: 0,
    });

    expect(resultado).toEqual({
      sucesso: false,
      status: 400,
      mensagem: "Ordem inválida. Deve ser maior que zero.",
    });
  });

  test("rejeita séries menores que 1 devolvendo a chave 'mensagem'", async () => {
    const { banco } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(TREINO.id, {
      ...dadosValidos,
      series: 0,
    });

    // Antes da refatoração esta resposta saía com a chave "extinction",
    // por causa da duplicação da regra entre adicionar e atualizar.
    expect(resultado).toEqual({
      sucesso: false,
      status: 400,
      mensagem: "Séries inválidas. Deve ser maior que zero.",
    });
  });

  test("rejeita repetições menores que 1", async () => {
    const { banco } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(TREINO.id, {
      ...dadosValidos,
      repeticoes: 0,
    });

    expect(resultado).toMatchObject({
      sucesso: false,
      status: 400,
      mensagem: "Repetições inválidas. Deve ser maior que zero.",
    });
  });

  test("rejeita carga negativa", async () => {
    const { banco } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(TREINO.id, {
      ...dadosValidos,
      carga: -1,
    });

    expect(resultado).toMatchObject({
      sucesso: false,
      status: 400,
      mensagem: "Carga negativa não é permitida.",
    });
  });

  test("aceita carga igual a zero e carga ausente", async () => {
    const semCarga = criarBancoFalso();
    const facadeSemCarga = new FichaDeTreinoFacade(semCarga.banco);

    const { carga, ...dadosSemCarga } = dadosValidos;
    const resultadoSemCarga = await facadeSemCarga.adicionarExercicio(
      TREINO.id,
      dadosSemCarga,
    );

    expect(resultadoSemCarga.sucesso).toBe(true);
    expect(semCarga.chamadas.create[0].data.carga).toBeNull();

    const cargaZero = criarBancoFalso();
    const facadeCargaZero = new FichaDeTreinoFacade(cargaZero.banco);

    const resultadoCargaZero = await facadeCargaZero.adicionarExercicio(
      TREINO.id,
      { ...dadosValidos, carga: 0 },
    );

    expect(resultadoCargaZero.sucesso).toBe(true);
    expect(cargaZero.chamadas.create[0].data.carga).toBe(0);
  });

  test("devolve 404 quando o treino não existe", async () => {
    const { banco, chamadas } = criarBancoFalso({ treino: null });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(
      "treino-inexistente",
      dadosValidos,
    );

    expect(resultado).toEqual({
      sucesso: false,
      status: 404,
      mensagem: "Treino inexistente.",
    });
    expect(chamadas.create).toHaveLength(0);
  });

  test("devolve 404 quando o exercício não existe", async () => {
    const { banco, chamadas } = criarBancoFalso({ exercicio: null });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(
      TREINO.id,
      dadosValidos,
    );

    expect(resultado).toEqual({
      sucesso: false,
      status: 404,
      mensagem: "Exercício inexistente.",
    });
    expect(chamadas.create).toHaveLength(0);
  });

  test("impede o mesmo exercício duas vezes na mesma ficha", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: VINCULO,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.adicionarExercicio(
      TREINO.id,
      dadosValidos,
    );

    expect(resultado).toEqual({
      sucesso: false,
      status: 400,
      mensagem: "Impedir exercício duplicado.",
    });
    expect(chamadas.create).toHaveLength(0);
  });

  test("valida os campos antes de consultar o banco", async () => {
    let consultouTreino = false;

    const { banco } = criarBancoFalso();
    banco.treino.findUnique = async () => {
      consultouTreino = true;
      return TREINO;
    };

    const facade = new FichaDeTreinoFacade(banco);

    await facade.adicionarExercicio(TREINO.id, {
      ...dadosValidos,
      ordem: -5,
    });

    expect(consultouTreino).toBe(false);
  });
});

// ---------------------------------------------------------------------------

describe("FichaDeTreinoFacade — atualizar exercício da ficha", () => {
  test("atualiza apenas os campos enviados", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: VINCULO,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.atualizarExercicio(VINCULO.id, {
      series: 4,
    });

    expect(resultado.sucesso).toBe(true);
    expect(chamadas.update[0].data).toEqual({
      ordem: undefined,
      series: 4,
      repeticoes: undefined,
      carga: undefined,
    });
  });

  test("devolve 404 quando o vínculo não existe", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: null,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.atualizarExercicio("nao-existe", {
      series: 4,
    });

    expect(resultado).toEqual({
      sucesso: false,
      status: 404,
      mensagem: "Vínculo inexistente.",
    });
    expect(chamadas.update).toHaveLength(0);
  });

  test("aplica as mesmas regras numéricas da criação", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: VINCULO,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.atualizarExercicio(VINCULO.id, {
      repeticoes: 0,
    });

    expect(resultado).toEqual({
      sucesso: false,
      status: 400,
      mensagem: "Repetições inválidas. Deve ser maior que zero.",
    });
    expect(chamadas.update).toHaveLength(0);
  });

  test("permite limpar a carga enviando null", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: VINCULO,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.atualizarExercicio(VINCULO.id, {
      carga: null,
    });

    expect(resultado.sucesso).toBe(true);
    expect(chamadas.update[0].data.carga).toBeNull();
  });
});

// ---------------------------------------------------------------------------

describe("FichaDeTreinoFacade — remover e listar", () => {
  test("remove o vínculo existente", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: VINCULO,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.removerExercicio(VINCULO.id);

    expect(resultado.sucesso).toBe(true);
    expect(chamadas.delete[0]).toEqual({
      where: { id: VINCULO.id },
    });
  });

  test("devolve 404 ao remover vínculo inexistente", async () => {
    const { banco, chamadas } = criarBancoFalso({
      vinculoExistente: null,
    });
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.removerExercicio("nao-existe");

    expect(resultado).toEqual({
      sucesso: false,
      status: 404,
      mensagem: "Vínculo inexistente.",
    });
    expect(chamadas.delete).toHaveLength(0);
  });

  test("lista os exercícios do treino na ordem da ficha", async () => {
    const { banco, chamadas } = criarBancoFalso();
    const facade = new FichaDeTreinoFacade(banco);

    const resultado = await facade.listarExercicios(TREINO.id);

    expect(resultado.sucesso).toBe(true);
    expect(chamadas.findMany[0]).toEqual({
      where: { treinoId: TREINO.id },
      orderBy: { ordem: "asc" },
      include: { exercicio: true },
    });
  });
});
