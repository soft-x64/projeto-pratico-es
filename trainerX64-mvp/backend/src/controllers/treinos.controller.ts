import type { Request, Response } from "express";

import { prisma } from "../database/prisma";

const STATUS_VALIDOS = [
  "disponivel",
  "andamento",
  "concluido",
];

function statusValido(status: string): boolean {
  return STATUS_VALIDOS.includes(status);
}

function duracaoValida(duracao: unknown): boolean {
  if (
    duracao === undefined ||
    duracao === null ||
    duracao === ""
  ) {
    return true;
  }

  return (
    Number.isInteger(Number(duracao)) &&
    Number(duracao) > 0
  );
}

export async function listarTreinos(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const treinos = await prisma.treino.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            exercicios: true,
          },
        },
      },
    });

    return response.status(200).json(treinos);
  } catch (error) {
    console.error("Erro ao listar treinos:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao listar treinos.",
    });
  }
}

export async function buscarTreinoPorId(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const treino = await prisma.treino.findUnique({
      where: {
        id,
      },
      include: {
        exercicios: {
          orderBy: {
            ordem: "asc",
          },
          include: {
            exercicio: true,
          },
        },
      },
    });

    if (!treino) {
      return response.status(404).json({
        mensagem: "Treino não encontrado.",
      });
    }

    return response.status(200).json(treino);
  } catch (error) {
    console.error("Erro ao buscar treino:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao buscar treino.",
    });
  }
}

export async function criarTreino(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const {
      nome,
      objetivo,
      descricao,
      duracao,
      status = "disponivel",
    } = request.body;

    if (!nome || !objetivo) {
      return response.status(400).json({
        mensagem:
          "Nome e objetivo são campos obrigatórios.",
      });
    }

    if (!statusValido(status)) {
      return response.status(400).json({
        mensagem: "Status do treino inválido.",
      });
    }

    if (!duracaoValida(duracao)) {
      return response.status(400).json({
        mensagem:
          "A duração deve ser um número inteiro maior que zero.",
      });
    }

    const treino = await prisma.treino.create({
      data: {
        nome: String(nome).trim(),
        objetivo: String(objetivo).trim(),
        descricao: descricao
          ? String(descricao).trim()
          : null,
        duracao:
          duracao !== undefined &&
          duracao !== null &&
          duracao !== ""
            ? Number(duracao)
            : null,
        status,
      },
    });

    return response.status(201).json(treino);
  } catch (error) {
    console.error("Erro ao cadastrar treino:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao cadastrar treino.",
    });
  }
}

export async function atualizarTreino(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const {
      nome,
      objetivo,
      descricao,
      duracao,
      status,
    } = request.body;

    const treinoExistente =
      await prisma.treino.findUnique({
        where: {
          id,
        },
      });

    if (!treinoExistente) {
      return response.status(404).json({
        mensagem: "Treino não encontrado.",
      });
    }

    if (
      nome !== undefined &&
      !String(nome).trim()
    ) {
      return response.status(400).json({
        mensagem: "O nome do treino não pode ser vazio.",
      });
    }

    if (
      objetivo !== undefined &&
      !String(objetivo).trim()
    ) {
      return response.status(400).json({
        mensagem:
          "O objetivo do treino não pode ser vazio.",
      });
    }

    if (
      status !== undefined &&
      !statusValido(status)
    ) {
      return response.status(400).json({
        mensagem: "Status do treino inválido.",
      });
    }

    if (!duracaoValida(duracao)) {
      return response.status(400).json({
        mensagem:
          "A duração deve ser um número inteiro maior que zero.",
      });
    }

    const treinoAtualizado =
      await prisma.treino.update({
        where: {
          id,
        },
        data: {
          nome:
            nome !== undefined
              ? String(nome).trim()
              : undefined,
          objetivo:
            objetivo !== undefined
              ? String(objetivo).trim()
              : undefined,
          descricao:
            descricao !== undefined
              ? descricao
                ? String(descricao).trim()
                : null
              : undefined,
          duracao:
            duracao !== undefined
              ? duracao === null ||
                duracao === ""
                ? null
                : Number(duracao)
              : undefined,
          status,
        },
      });

    return response
      .status(200)
      .json(treinoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar treino:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao atualizar treino.",
    });
  }
}

export async function excluirTreino(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const treino = await prisma.treino.findUnique({
      where: {
        id,
      },
    });

    if (!treino) {
      return response.status(404).json({
        mensagem: "Treino não encontrado.",
      });
    }

    await prisma.treino.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      mensagem: "Treino excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir treino:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao excluir treino.",
    });
  }
}