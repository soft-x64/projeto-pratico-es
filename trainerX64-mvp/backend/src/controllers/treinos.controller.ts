import { Request, Response } from "express";
import { treinos } from "../data/mockData";

export function listarTreinos(req: Request, res: Response) {
  return res.status(200).json(treinos);
}

export function buscarTreinoPorId(req: Request, res: Response) {
  const { id } = req.params;

  const treino = treinos.find((item) => item.id === id);

  if (!treino) {
    return res.status(404).json({
      message: "Treino não encontrado.",
    });
  }

  return res.status(200).json(treino);
}