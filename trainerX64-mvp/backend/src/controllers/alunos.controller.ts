import { Request, Response } from "express";
import { alunos } from "../data/mockData";

export function listarAlunos(req: Request, res: Response) {
  return res.status(200).json(alunos);
}

export function buscarAlunoPorId(req: Request, res: Response) {
  const { id } = req.params;

  const aluno = alunos.find((item) => item.id === id);

  if (!aluno) {
    return res.status(404).json({
      message: "Aluno não encontrado.",
    });
  }

  return res.status(200).json(aluno);
}