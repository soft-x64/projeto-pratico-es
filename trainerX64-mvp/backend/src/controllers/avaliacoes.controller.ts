import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { prisma } from "../database/prisma";

function numeroPositivo(valor: unknown): boolean {
  return (
    valor !== undefined &&
    valor !== null &&
    Number.isFinite(Number(valor)) &&
    Number(valor) > 0
  );
}

function numeroOpcionalValido(valor: unknown): boolean {
  if (
    valor === undefined ||
    valor === null ||
    valor === ""
  ) {
    return true;
  }

  return (
    Number.isFinite(Number(valor)) &&
    Number(valor) > 0
  );
}

export async function listarAvaliacoesDoAluno(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { alunoId } = request.params;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    const avaliacoes = await prisma.avaliacaoFisica.findMany({
      where: {
        alunoId,
      },
      orderBy: {
        dataAvaliacao: "desc",
      },
    });

    return response.status(200).json(avaliacoes);
  } catch (error) {
    console.error(
      "Erro ao listar avaliações físicas:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao listar avaliações físicas.",
    });
  }
}

export async function buscarAvaliacaoPorId(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const avaliacao =
      await prisma.avaliacaoFisica.findUnique({
        where: {
          id,
        },
        include: {
          aluno: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });

    if (!avaliacao) {
      return response.status(404).json({
        mensagem: "Avaliação física não encontrada.",
      });
    }

    return response.status(200).json(avaliacao);
  } catch (error) {
    console.error(
      "Erro ao buscar avaliação física:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao buscar avaliação física.",
    });
  }
}

export async function criarAvaliacao(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { alunoId } = request.params;

    const {
      peso,
      altura,
      percentualGordura,
      massaMuscular,
      braco,
      peitoral,
      cintura,
      quadril,
      coxa,
      panturrilha,
      observacoes,
      dataAvaliacao,
    } = request.body;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    if (
      !numeroPositivo(peso) ||
      !numeroPositivo(altura)
    ) {
      return response.status(400).json({
        mensagem:
          "Peso e altura devem ser maiores que zero.",
      });
    }

    const medidasOpcionais = [
      percentualGordura,
      massaMuscular,
      braco,
      peitoral,
      cintura,
      quadril,
      coxa,
      panturrilha,
    ];

    const possuiMedidaInvalida =
      medidasOpcionais.some(
        (valor) => !numeroOpcionalValido(valor),
      );

    if (possuiMedidaInvalida) {
      return response.status(400).json({
        mensagem:
          "As medidas informadas devem ser maiores que zero.",
      });
    }

    const avaliacao =
      await prisma.avaliacaoFisica.create({
        data: {
          alunoId,
          peso: Number(peso),
          altura: Number(altura),
          percentualGordura:
            percentualGordura !== undefined &&
            percentualGordura !== null &&
            percentualGordura !== ""
              ? Number(percentualGordura)
              : null,
          massaMuscular:
            massaMuscular !== undefined &&
            massaMuscular !== null &&
            massaMuscular !== ""
              ? Number(massaMuscular)
              : null,
          braco:
            braco !== undefined &&
            braco !== null &&
            braco !== ""
              ? Number(braco)
              : null,
          peitoral:
            peitoral !== undefined &&
            peitoral !== null &&
            peitoral !== ""
              ? Number(peitoral)
              : null,
          cintura:
            cintura !== undefined &&
            cintura !== null &&
            cintura !== ""
              ? Number(cintura)
              : null,
          quadril:
            quadril !== undefined &&
            quadril !== null &&
            quadril !== ""
              ? Number(quadril)
              : null,
          coxa:
            coxa !== undefined &&
            coxa !== null &&
            coxa !== ""
              ? Number(coxa)
              : null,
          panturrilha:
            panturrilha !== undefined &&
            panturrilha !== null &&
            panturrilha !== ""
              ? Number(panturrilha)
              : null,
          observacoes:
            observacoes
              ? String(observacoes).trim()
              : null,
          dataAvaliacao: dataAvaliacao
            ? new Date(dataAvaliacao)
            : new Date(),
        },
      });

    return response.status(201).json(avaliacao);
  } catch (error) {
    console.error(
      "Erro ao cadastrar avaliação física:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao cadastrar avaliação física.",
    });
  }
}

export async function atualizarAvaliacao(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const {
      peso,
      altura,
      percentualGordura,
      massaMuscular,
      braco,
      peitoral,
      cintura,
      quadril,
      coxa,
      panturrilha,
      observacoes,
      dataAvaliacao,
    } = request.body;

    const avaliacaoExistente =
      await prisma.avaliacaoFisica.findUnique({
        where: {
          id,
        },
      });

    if (!avaliacaoExistente) {
      return response.status(404).json({
        mensagem: "Avaliação física não encontrada.",
      });
    }

    if (
      peso !== undefined &&
      !numeroPositivo(peso)
    ) {
      return response.status(400).json({
        mensagem: "O peso deve ser maior que zero.",
      });
    }

    if (
      altura !== undefined &&
      !numeroPositivo(altura)
    ) {
      return response.status(400).json({
        mensagem: "A altura deve ser maior que zero.",
      });
    }

    const medidasOpcionais = [
      percentualGordura,
      massaMuscular,
      braco,
      peitoral,
      cintura,
      quadril,
      coxa,
      panturrilha,
    ];

    const possuiMedidaInvalida =
      medidasOpcionais.some(
        (valor) => !numeroOpcionalValido(valor),
      );

    if (possuiMedidaInvalida) {
      return response.status(400).json({
        mensagem:
          "As medidas informadas devem ser maiores que zero.",
      });
    }

    const avaliacaoAtualizada =
      await prisma.avaliacaoFisica.update({
        where: {
          id,
        },
        data: {
          peso:
            peso !== undefined
              ? Number(peso)
              : undefined,
          altura:
            altura !== undefined
              ? Number(altura)
              : undefined,
          percentualGordura:
            percentualGordura !== undefined
              ? percentualGordura === null ||
                percentualGordura === ""
                ? null
                : Number(percentualGordura)
              : undefined,
          massaMuscular:
            massaMuscular !== undefined
              ? massaMuscular === null ||
                massaMuscular === ""
                ? null
                : Number(massaMuscular)
              : undefined,
          braco:
            braco !== undefined
              ? braco === null || braco === ""
                ? null
                : Number(braco)
              : undefined,
          peitoral:
            peitoral !== undefined
              ? peitoral === null ||
                peitoral === ""
                ? null
                : Number(peitoral)
              : undefined,
          cintura:
            cintura !== undefined
              ? cintura === null ||
                cintura === ""
                ? null
                : Number(cintura)
              : undefined,
          quadril:
            quadril !== undefined
              ? quadril === null ||
                quadril === ""
                ? null
                : Number(quadril)
              : undefined,
          coxa:
            coxa !== undefined
              ? coxa === null || coxa === ""
                ? null
                : Number(coxa)
              : undefined,
          panturrilha:
            panturrilha !== undefined
              ? panturrilha === null ||
                panturrilha === ""
                ? null
                : Number(panturrilha)
              : undefined,
          observacoes:
            observacoes !== undefined
              ? observacoes
                ? String(observacoes).trim()
                : null
              : undefined,
          dataAvaliacao:
            dataAvaliacao !== undefined
              ? new Date(dataAvaliacao)
              : undefined,
        },
      });

    return response
      .status(200)
      .json(avaliacaoAtualizada);
  } catch (error) {
    console.error(
      "Erro ao atualizar avaliação física:",
      error,
    );

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {
      console.error("Código Prisma:", error.code);
    }

    return response.status(500).json({
      mensagem:
        "Erro interno ao atualizar avaliação física.",
    });
  }
}

export async function excluirAvaliacao(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const avaliacao =
      await prisma.avaliacaoFisica.findUnique({
        where: {
          id,
        },
      });

    if (!avaliacao) {
      return response.status(404).json({
        mensagem: "Avaliação física não encontrada.",
      });
    }

    await prisma.avaliacaoFisica.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      mensagem:
        "Avaliação física excluída com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao excluir avaliação física:",
      error,
    );

    return response.status(500).json({
      mensagem:
        "Erro interno ao excluir avaliação física.",
    });
  }
}