import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export async function listarAlunos(req: Request, res: Response) {
  try {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(alunos);
  } catch {
    return res.status(500).json({
      message: "Erro ao listar alunos.",
    });
  }
}

export async function buscarAlunoPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!aluno) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    return res.status(200).json(aluno);
  } catch {
    return res.status(500).json({
      message: "Erro ao buscar aluno.",
    });
  }
}

export async function criarAluno(req: Request, res: Response) {
  try {
    const {
      nome,
      status,
      treino,
      objetivo,
      nivel,
      peso,
      altura,
      idade,
    } = req.body;

    if (!nome || !status || !treino || !objetivo || !nivel) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        status,
        treino,
        objetivo,
        nivel,
        peso: Number(peso),
        altura: Number(altura),
        idade: Number(idade),
      },
    });

    return res.status(201).json(aluno);
  } catch {
    return res.status(500).json({
      message: "Erro ao cadastrar aluno.",
    });
  }
}