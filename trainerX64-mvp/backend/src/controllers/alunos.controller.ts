import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { prisma } from "../database/prisma";

const STATUS_VALIDOS = [
  "em-dia",
  "pendente",
  "mensalidade",
  "sem-atividade",
];

function statusValido(status: string): boolean {
  return STATUS_VALIDOS.includes(status);
}

export async function listarAlunos(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao listar alunos:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao listar alunos.",
    });
  }
}

export async function buscarAlunoPorId(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    return response.status(200).json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);

    return response.status(500).json({
      mensagem: "Erro interno ao buscar aluno.",
    });
  }
}

export async function criarAluno(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const {
      nome,
      email,
      telefone,
      status = "em-dia",
      treino,
      objetivo,
      nivel,
      peso,
      altura,
      idade,
    } = request.body;

    if (
      !nome ||
      !email ||
      !objetivo ||
      !nivel ||
      peso === undefined ||
      altura === undefined ||
      idade === undefined
    ) {
      return response.status(400).json({
        mensagem: "Preencha todos os campos obrigatórios.",
      });
    }

    if (!statusValido(status)) {
      return response.status(400).json({
        mensagem: "Status do aluno inválido.",
      });
    }

    if (Number(peso) <= 0) {
      return response.status(400).json({
        mensagem: "O peso deve ser maior que zero.",
      });
    }

    if (Number(altura) <= 0) {
      return response.status(400).json({
        mensagem: "A altura deve ser maior que zero.",
      });
    }

    if (Number(idade) <= 0) {
      return response.status(400).json({
        mensagem: "A idade deve ser maior que zero.",
      });
    }

    const emailNormalizado = String(email).trim().toLowerCase();

    const alunoExistente = await prisma.aluno.findUnique({
      where: {
        email: emailNormalizado,
      },
    });

    if (alunoExistente) {
      return response.status(409).json({
        mensagem: "Já existe um aluno cadastrado com este e-mail.",
      });
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome: String(nome).trim(),
        email: emailNormalizado,
        telefone: telefone ? String(telefone).trim() : null,
        status,
        treino: treino ? String(treino).trim() : null,
        objetivo: String(objetivo).trim(),
        nivel: String(nivel).trim(),
        peso: Number(peso),
        altura: Number(altura),
        idade: Number(idade),
      },
    });

    return response.status(201).json(aluno);
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return response.status(409).json({
        mensagem: "Já existe um aluno com este e-mail.",
      });
    }

    return response.status(500).json({
      mensagem: "Erro interno ao cadastrar aluno.",
    });
  }
}

export async function atualizarAluno(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const {
      nome,
      email,
      telefone,
      status,
      treino,
      objetivo,
      nivel,
      peso,
      altura,
      idade,
    } = request.body;

    const alunoExistente = await prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExistente) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    if (status !== undefined && !statusValido(status)) {
      return response.status(400).json({
        mensagem: "Status do aluno inválido.",
      });
    }

    if (peso !== undefined && Number(peso) <= 0) {
      return response.status(400).json({
        mensagem: "O peso deve ser maior que zero.",
      });
    }

    if (altura !== undefined && Number(altura) <= 0) {
      return response.status(400).json({
        mensagem: "A altura deve ser maior que zero.",
      });
    }

    if (idade !== undefined && Number(idade) <= 0) {
      return response.status(400).json({
        mensagem: "A idade deve ser maior que zero.",
      });
    }

    const emailNormalizado =
      email !== undefined
        ? String(email).trim().toLowerCase()
        : undefined;

    if (
      emailNormalizado &&
      emailNormalizado !== alunoExistente.email
    ) {
      const alunoComEmail = await prisma.aluno.findUnique({
        where: {
          email: emailNormalizado,
        },
      });

      if (alunoComEmail) {
        return response.status(409).json({
          mensagem: "Já existe um aluno cadastrado com este e-mail.",
        });
      }
    }

    const alunoAtualizado = await prisma.aluno.update({
      where: {
        id,
      },
      data: {
        nome:
          nome !== undefined
            ? String(nome).trim()
            : undefined,

        email: emailNormalizado,

        telefone:
          telefone !== undefined
            ? telefone
              ? String(telefone).trim()
              : null
            : undefined,

        status,

        treino:
          treino !== undefined
            ? treino
              ? String(treino).trim()
              : null
            : undefined,

        objetivo:
          objetivo !== undefined
            ? String(objetivo).trim()
            : undefined,

        nivel:
          nivel !== undefined
            ? String(nivel).trim()
            : undefined,

        peso:
          peso !== undefined
            ? Number(peso)
            : undefined,

        altura:
          altura !== undefined
            ? Number(altura)
            : undefined,

        idade:
          idade !== undefined
            ? Number(idade)
            : undefined,
      },
    });

    return response.status(200).json(alunoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return response.status(409).json({
        mensagem: "Já existe um aluno com este e-mail.",
      });
    }

    return response.status(500).json({
      mensagem: "Erro interno ao atualizar aluno.",
    });
  }
}

export async function excluirAluno(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const { id } = request.params;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    await prisma.aluno.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      mensagem: "Aluno excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return response.status(409).json({
        mensagem:
          "O aluno não pode ser excluído porque possui registros vinculados.",
      });
    }

    return response.status(500).json({
      mensagem: "Erro interno ao excluir aluno.",
    });
  }
}