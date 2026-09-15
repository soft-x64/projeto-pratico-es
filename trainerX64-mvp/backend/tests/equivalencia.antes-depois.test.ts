/**
 * Teste de equivalência ANTES x DEPOIS — Etapa 7 da atividade.
 *
 * Refatoração não pode mudar o comportamento observável do sistema. Para
 * provar isso, este arquivo mantém uma cópia literal da lógica do controller
 * ORIGINAL e a executa lado a lado com a facade, sobre a mesma matriz de
 * entradas (4 estados de banco x 14 corpos na criação, 2 x 12 na atualização
 * — 80 combinações no total).
 *
 * Critério de aceite:
 *   · o status HTTP tem de ser idêntico em 100% dos casos;
 *   · o corpo da resposta tem de ser idêntico, com exceção das mensagens
 *     padronizadas de forma intencional, listadas em DIVERGENCIAS_ACEITAS.
 */
import {
  FichaDeTreinoFacade,
  type BancoDaFichaDeTreino,
} from "../src/facades/fichaDeTreino.facade";

const TREINO = { id: "t1" };
const EXERCICIO = { id: "e1" };
const VINCULO = { id: "v1" };

function banco(estado: any = {}): BancoDaFichaDeTreino {
  return {
    treino: { findUnique: async () => (estado.treino === undefined ? TREINO : estado.treino) },
    exercicio: { findUnique: async () => (estado.exercicio === undefined ? EXERCICIO : estado.exercicio) },
    treinoExercicio: {
      findMany: async () => [],
      findUnique: async () => (estado.vinculo === undefined ? null : estado.vinculo),
      create: async (a: any) => ({ criado: a.data }),
      update: async (a: any) => ({ atualizado: a.data }),
      delete: async () => ({}),
    },
  };
}

/** Resposta falsa do Express, para rodar o controller ORIGINAL. */
function respostaFalsa() {
  const r: any = { _status: 0, _body: null };
  r.status = (s: number) => { r._status = s; return r; };
  r.json = (b: any) => { r._body = b; return r; };
  return r;
}

// ---- CÓDIGO ORIGINAL, copiado literalmente do controller antes da refatoração ----
async function adicionarOriginal(prisma: any, request: any, response: any) {
  const { treinoId } = request.params;
  const { exercicioId, ordem, series, repeticoes, carga } = request.body;
  if (!exercicioId || ordem === undefined || series === undefined || repeticoes === undefined) {
    return response.status(400).json({ mensagem: "Campos obrigatórios ausentes (exercicioId, ordem, series, repeticoes)." });
  }
  if (Number(ordem) < 1) return response.status(400).json({ mensagem: "Ordem inválida. Deve ser maior que zero." });
  if (Number(series) < 1) return response.status(400).json({ extinction: "Séries inválidas. Deve ser maior que zero." });
  if (Number(repeticoes) < 1) return response.status(400).json({ mensagem: "Repetições inválidas. Deve ser maior que zero." });
  if (carga !== undefined && carga !== null && Number(carga) < 0) return response.status(400).json({ mensagem: "Carga negativa não é permitida." });
  const treinoExiste = await prisma.treino.findUnique({ where: { id: treinoId } });
  if (!treinoExiste) return response.status(404).json({ mensagem: "Treino inexistente." });
  const exercicioExiste = await prisma.exercicio.findUnique({ where: { id: exercicioId } });
  if (!exercicioExiste) return response.status(404).json({ mensagem: "Exercício inexistente." });
  const duplicado = await prisma.treinoExercicio.findUnique({ where: { treinoId_exercicioId: { treinoId, exercicioId } } });
  if (duplicado) return response.status(400).json({ mensagem: "Impedir exercício duplicado." });
  const novoVinculo = await prisma.treinoExercicio.create({
    data: { treinoId, exercicioId, ordem: Number(ordem), series: Number(series), repeticoes: Number(repeticoes), carga: carga !== undefined && carga !== null ? Number(carga) : null },
    include: { exercicio: true },
  });
  return response.status(201).json(novoVinculo);
}

async function atualizarOriginal(prisma: any, request: any, response: any) {
  const { vinculoId } = request.params;
  const { ordem, series, repeticoes, carga } = request.body;
  const vinculoExiste = await prisma.treinoExercicio.findUnique({ where: { id: vinculoId } });
  if (!vinculoExiste) return response.status(404).json({ mensagem: "Vínculo inexistente." });
  if (ordem !== undefined && Number(ordem) < 1) return response.status(400).json({ mensagem: "Ordem inválida." });
  if (series !== undefined && Number(series) < 1) return response.status(400).json({ mensagem: "Séries inválidas." });
  if (repeticoes !== undefined && Number(repeticoes) < 1) return response.status(400).json({ mensagem: "Repetições inválidas." });
  if (carga !== undefined && carga !== null && Number(carga) < 0) return response.status(400).json({ mensagem: "Carga negativa." });
  const vinculoAtualizado = await prisma.treinoExercicio.update({
    where: { id: vinculoId },
    data: { ordem: ordem !== undefined ? Number(ordem) : undefined, series: series !== undefined ? Number(series) : undefined, repeticoes: repeticoes !== undefined ? Number(repeticoes) : undefined, carga: carga !== undefined ? (carga === null ? null : Number(carga)) : undefined },
    include: { exercicio: true },
  });
  return response.status(200).json(vinculoAtualizado);
}
// ---------------------------------------------------------------------------

const ESTADOS = [
  { nome: "tudo ok", estado: {} },
  { nome: "sem treino", estado: { treino: null } },
  { nome: "sem exercicio", estado: { exercicio: null } },
  { nome: "duplicado", estado: { vinculo: VINCULO } },
];

const CORPOS_ADICIONAR: any[] = [
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 12, carga: 40 },
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 12 },
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 12, carga: 0 },
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 12, carga: null },
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 12, carga: -1 },
  { exercicioId: "e1", ordem: 0, series: 3, repeticoes: 12 },
  { exercicioId: "e1", ordem: 1, series: 0, repeticoes: 12 },
  { exercicioId: "e1", ordem: 1, series: 3, repeticoes: 0 },
  { exercicioId: "e1", ordem: 1, series: 3 },
  { exercicioId: "e1", ordem: 1, repeticoes: 12 },
  { exercicioId: "e1", series: 3, repeticoes: 12 },
  { ordem: 1, series: 3, repeticoes: 12 },
  {},
  { exercicioId: "e1", ordem: "2", series: "4", repeticoes: "10", carga: "22.5" },
];

const CORPOS_ATUALIZAR: any[] = [
  {}, { ordem: 2 }, { series: 4 }, { repeticoes: 10 }, { carga: 50 },
  { carga: null }, { carga: 0 }, { carga: -3 },
  { ordem: 0 }, { series: 0 }, { repeticoes: 0 },
  { ordem: 2, series: 4, repeticoes: 10, carga: 12 },
];

/**
 * Mudanças de mensagem feitas de propósito na refatoração, ao unificar as
 * regras que estavam duplicadas. Nenhuma delas altera o status HTTP.
 */
const DIVERGENCIAS_ACEITAS: Array<{ antes: string; depois: string }> = [
  // Correção do bug: a resposta saía com a chave "extinction".
  {
    antes: '{"extinction":"Séries inválidas. Deve ser maior que zero."}',
    depois: '{"mensagem":"Séries inválidas. Deve ser maior que zero."}',
  },
  // Padronização: a atualização usava mensagens mais curtas que a criação.
  { antes: '{"mensagem":"Ordem inválida."}', depois: '{"mensagem":"Ordem inválida. Deve ser maior que zero."}' },
  { antes: '{"mensagem":"Séries inválidas."}', depois: '{"mensagem":"Séries inválidas. Deve ser maior que zero."}' },
  { antes: '{"mensagem":"Repetições inválidas."}', depois: '{"mensagem":"Repetições inválidas. Deve ser maior que zero."}' },
  { antes: '{"mensagem":"Carga negativa."}', depois: '{"mensagem":"Carga negativa não é permitida."}' },
];

function ehDivergenciaAceita(antes: string, depois: string): boolean {
  return DIVERGENCIAS_ACEITAS.some(
    (d) => d.antes === antes && d.depois === depois,
  );
}

describe("equivalência de comportamento antes x depois", () => {
  test("adicionar exercício: 56 combinações com o mesmo comportamento", async () => {
    const statusDivergentes: string[] = [];
    const corposDivergentes: string[] = [];
    let casos = 0;

    for (const { nome, estado } of ESTADOS) {
      for (const body of CORPOS_ADICIONAR) {
        casos += 1;

        const res = respostaFalsa();
        await adicionarOriginal(banco(estado), { params: { treinoId: "t1" }, body }, res);
        const novo = await new FichaDeTreinoFacade(banco(estado)).adicionarExercicio("t1", body);

        const statusNovo = novo.sucesso ? 201 : novo.status;
        const corpoNovo = JSON.stringify(novo.sucesso ? novo.dados : { mensagem: novo.mensagem });
        const corpoAntigo = JSON.stringify(res._body);

        if (res._status !== statusNovo) {
          statusDivergentes.push(`[${nome}] ${JSON.stringify(body)}: ${res._status} -> ${statusNovo}`);
          continue;
        }

        if (corpoAntigo !== corpoNovo && !ehDivergenciaAceita(corpoAntigo, corpoNovo)) {
          corposDivergentes.push(`[${nome}] ${JSON.stringify(body)}: ${corpoAntigo} -> ${corpoNovo}`);
        }
      }
    }

    expect(casos).toBe(56);
    expect(statusDivergentes).toEqual([]);
    expect(corposDivergentes).toEqual([]);
  });

  test("atualizar exercício: 24 combinações com o mesmo comportamento", async () => {
    const statusDivergentes: string[] = [];
    const corposDivergentes: string[] = [];
    let casos = 0;

    for (const estado of [{ vinculo: VINCULO }, { vinculo: null }]) {
      for (const body of CORPOS_ATUALIZAR) {
        casos += 1;

        const res = respostaFalsa();
        await atualizarOriginal(banco(estado), { params: { vinculoId: "v1" }, body }, res);
        const novo = await new FichaDeTreinoFacade(banco(estado)).atualizarExercicio("v1", body);

        const statusNovo = novo.sucesso ? 200 : novo.status;
        const corpoNovo = JSON.stringify(novo.sucesso ? novo.dados : { mensagem: novo.mensagem });
        const corpoAntigo = JSON.stringify(res._body);

        if (res._status !== statusNovo) {
          statusDivergentes.push(`${JSON.stringify(body)}: ${res._status} -> ${statusNovo}`);
          continue;
        }

        if (corpoAntigo !== corpoNovo && !ehDivergenciaAceita(corpoAntigo, corpoNovo)) {
          corposDivergentes.push(`${JSON.stringify(body)}: ${corpoAntigo} -> ${corpoNovo}`);
        }
      }
    }

    expect(casos).toBe(24);
    expect(statusDivergentes).toEqual([]);
    expect(corposDivergentes).toEqual([]);
  });
});
