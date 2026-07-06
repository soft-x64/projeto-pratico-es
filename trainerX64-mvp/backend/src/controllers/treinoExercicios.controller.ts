import type { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Endpoints da tabela intermediária TreinoExercicio

export async function listarExerciciosDoTreino(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { treinoId } = request.params;

    const vinculos = await prisma.treinoExercicio.findMany({
      where: { treinoId },
      orderBy: { ordem: "asc" },
      include: { exercicio: true },
    });

    return response.status(200).json(vinculos);
  } catch (error) {
    console.error("Erro ao listar exercícios do treino:", error);
    return response.status(500).json({
      mensagem: "Erro interno ao listar exercícios do treino.",
    });
  }
}

export async function adicionarExercicioAoTreino(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { treinoId } = request.params;
    const { exercicioId, ordem, series, repeticoes, carga } = request.body;

    // Validações básicas obrigatórias
    if (!exercicioId || ordem === undefined || series === undefined || repeticoes === undefined) {
      return response.status(400).json({
        mensagem: "Campos obrigatórios ausentes (exercicioId, ordem, series, repeticoes).",
      });
    }

    // Regras de negócio do Item 38
    if (Number(ordem) < 1) {
      return response.status(400).json({ mensagem: "Ordem inválida. Deve ser maior que zero." });
    }
    if (Number(series) < 1) {
      return response.status(400).json({ extinction: "Séries inválidas. Deve ser maior que zero." });
    }
    if (Number(repeticoes) < 1) {
      return response.status(400).json({ mensagem: "Repetições inválidas. Deve ser maior que zero." });
    }
    if (carga !== undefined && carga !== null && Number(carga) < 0) {
      return response.status(400).json({ mensagem: "Carga negativa não é permitida." });
    }

    // Verificar existência do Treino
    const treinoExiste = await prisma.treino.findUnique({ where: { id: treinoId } });
    if (!treinoExiste) {
      return response.status(404).json({ mensagem: "Treino inexistente." });
    }

    // Verificar existência do Exercício
    const exercicioExiste = await prisma.exercicio.findUnique({ where: { id: exercicioId } });
    if (!exercicioExiste) {
      return response.status(404).json({ mensagem: "Exercício inexistente." });
    }

    // Impedir exercício duplicado na mesma ficha de treino
    const duplicado = await prisma.treinoExercicio.findUnique({
      where: {
        treinoId_exercicioId: { treinoId, exercicioId },
      },
    });
    if (duplicado) {
      return response.status(400).json({ mensagem: "Impedir exercício duplicado." });
    }

    const novoVinculo = await prisma.treinoExercicio.create({
      data: {
        treinoId,
        exercicioId,
        ordem: Number(ordem),
        series: Number(series),
        repeticoes: Number(repeticoes),
        carga: carga !== undefined && carga !== null ? Number(carga) : null,
      },
      include: { exercicio: true },
    });

    return response.status(201).json(novoVinculo);
  } catch (error) {
    console.error("Erro ao adicionar exercício ao treino:", error);
    return response.status(500).json({
      mensagem: "Erro interno ao adicionar exercício ao treino.",
    });
  }
}

export async function atualizarExercicioDoTreino(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { vinculoId } = request.params;
    const { ordem, series, repeticoes, carga } = request.body;

    const vinculoExiste = await prisma.treinoExercicio.findUnique({ where: { id: vinculoId } });
    if (!vinculoExiste) {
      return response.status(404).json({ mensagem: "Vínculo inexistente." });
    }

    // Validações de atualização parcial
    if (ordem !== undefined && Number(ordem) < 1) {
      return response.status(400).json({ mensagem: "Ordem inválida." });
    }
    if (series !== undefined && Number(series) < 1) {
      return response.status(400).json({ mensagem: "Séries inválidas." });
    }
    if (repeticoes !== undefined && Number(repeticoes) < 1) {
      return response.status(400).json({ mensagem: "Repetições inválidas." });
    }
    if (carga !== undefined && carga !== null && Number(carga) < 0) {
      return response.status(400).json({ mensagem: "Carga negativa." });
    }

    const vinculoAtualizado = await prisma.treinoExercicio.update({
      where: { id: vinculoId },
      data: {
        ordem: ordem !== undefined ? Number(ordem) : undefined,
        series: series !== undefined ? Number(series) : undefined,
        repeticoes: repeticoes !== undefined ? Number(repeticoes) : undefined,
        carga: carga !== undefined ? (carga === null ? null : Number(carga)) : undefined,
      },
      include: { exercicio: true },
    });

    return response.status(200).json(vinculoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar exercício do treino:", error);
    return response.status(500).json({
      mensagem: "Erro interno ao atualizar exercício do treino.",
    });
  }
}

export async function removerExercicioDoTreino(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { vinculoId } = request.params;

    const vinculoExiste = await prisma.treinoExercicio.findUnique({ where: { id: vinculoId } });
    if (!vinculoExiste) {
      return response.status(404).json({ mensagem: "Vínculo inexistente." });
    }

    await prisma.treinoExercicio.delete({ where: { id: vinculoId } });

    return response.status(200).json({
      mensagem: "Exercício removido do treino com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao remover exercício do treino:", error);
    return response.status(500).json({
      mensagem: "Erro interno ao remover exercício do treino.",
    });
  }
}