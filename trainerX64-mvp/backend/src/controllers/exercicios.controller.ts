import type { Request, Response } from "express";

import { prisma } from "../database/prisma";

const CATEGORIAS_VALIDAS = [
  "Peito",
  "Costas",
  "Pernas",
  "Braços",
  "Ombros",
  "Abdômen",
  "Glúteos",
  "Panturrilha",
  "Outro",
];

function categoriaValida(
  categoria: string,
): boolean {
  return CATEGORIAS_VALIDAS.includes(categoria);
}

export async function listarExercicios(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const exercicios =
      await prisma.exercicio.findMany({
        orderBy: {
          nome: "asc",
        },
      });

    return response
      .status(200)
      .json(exercicios);
  } catch (error) {
    console.error(
      "Erro ao listar exercícios:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao listar exercícios.",
    });
  }
}

export async function buscarExercicioPorId(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const exercicio =
      await prisma.exercicio.findUnique({
        where: {
          id,
        },
      });

    if (!exercicio) {
      return response.status(404).json({
        mensagem: "Exercício não encontrado.",
      });
    }

    return response
      .status(200)
      .json(exercicio);
  } catch (error) {
    console.error(
      "Erro ao buscar exercício:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao buscar exercício.",
    });
  }
}

export async function criarExercicio(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const {
      nome,
      categoria,
      descricao,
    } = request.body;

    if (!nome || !categoria) {
      return response.status(400).json({
        mensagem:
          "Nome e categoria são campos obrigatórios.",
      });
    }

    if (!categoriaValida(categoria)) {
      return response.status(400).json({
        mensagem: "Categoria de exercício inválida.",
      });
    }

    const exercicio =
      await prisma.exercicio.create({
        data: {
          nome: String(nome).trim(),
          categoria,
          descricao: descricao
            ? String(descricao).trim()
            : null,
        },
      });

    return response
      .status(201)
      .json(exercicio);
  } catch (error) {
    console.error(
      "Erro ao cadastrar exercício:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao cadastrar exercício.",
    });
  }
}

export async function atualizarExercicio(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const {
      nome,
      categoria,
      descricao,
    } = request.body;

    const exercicioExistente =
      await prisma.exercicio.findUnique({
        where: {
          id,
        },
      });

    if (!exercicioExistente) {
      return response.status(404).json({
        mensagem: "Exercício não encontrado.",
      });
    }

    if (
      nome !== undefined &&
      !String(nome).trim()
    ) {
      return response.status(400).json({
        mensagem:
          "O nome do exercício não pode ser vazio.",
      });
    }

    if (
      categoria !== undefined &&
      !categoriaValida(categoria)
    ) {
      return response.status(400).json({
        mensagem: "Categoria de exercício inválida.",
      });
    }

    const exercicioAtualizado =
      await prisma.exercicio.update({
        where: {
          id,
        },
        data: {
          nome:
            nome !== undefined
              ? String(nome).trim()
              : undefined,
          categoria,
          descricao:
            descricao !== undefined
              ? descricao
                ? String(descricao).trim()
                : null
              : undefined,
        },
      });

    return response
      .status(200)
      .json(exercicioAtualizado);
  } catch (error) {
    console.error(
      "Erro ao atualizar exercício:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao atualizar exercício.",
    });
  }
}

export async function excluirExercicio(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const exercicio =
      await prisma.exercicio.findUnique({
        where: {
          id,
        },
      });

    if (!exercicio) {
      return response.status(404).json({
        mensagem: "Exercício não encontrado.",
      });
    }

    await prisma.exercicio.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      mensagem:
        "Exercício excluído com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao excluir exercício:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao excluir exercício.",
    });
  }
}