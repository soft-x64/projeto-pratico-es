import type { Request, Response } from "express";

import { fichaDeTreino } from "../facades";

// Endpoints da tabela intermediária TreinoExercicio.
//
// O controller não conhece mais os modelos Treino, Exercicio e
// TreinoExercicio: ele recebe a requisição, delega para a facade da ficha de
// treino e traduz o resultado em resposta HTTP.

export async function listarExerciciosDoTreino(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const treinoId = String(request.params.treinoId);

    const resultado = await fichaDeTreino.listarExercicios(treinoId);

    if (!resultado.sucesso) {
      return response.status(resultado.status).json({ mensagem: resultado.mensagem });
    }

    return response.status(200).json(resultado.dados);
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
    const treinoId = String(request.params.treinoId);

    const resultado = await fichaDeTreino.adicionarExercicio(treinoId, request.body);

    if (!resultado.sucesso) {
      return response.status(resultado.status).json({ mensagem: resultado.mensagem });
    }

    return response.status(201).json(resultado.dados);
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
    const vinculoId = String(request.params.vinculoId);

    const resultado = await fichaDeTreino.atualizarExercicio(vinculoId, request.body);

    if (!resultado.sucesso) {
      return response.status(resultado.status).json({ mensagem: resultado.mensagem });
    }

    return response.status(200).json(resultado.dados);
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
    const vinculoId = String(request.params.vinculoId);

    const resultado = await fichaDeTreino.removerExercicio(vinculoId);

    if (!resultado.sucesso) {
      return response.status(resultado.status).json({ mensagem: resultado.mensagem });
    }

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
