import { Router } from "express";

import {
  atualizarExercicio,
  buscarExercicioPorId,
  criarExercicio,
  excluirExercicio,
  listarExercicios,
} from "../controllers/exercicios.controller";

const exerciciosRoutes = Router();

exerciciosRoutes.get("/", listarExercicios);
exerciciosRoutes.get("/:id", buscarExercicioPorId);
exerciciosRoutes.post("/", criarExercicio);
exerciciosRoutes.put("/:id", atualizarExercicio);
exerciciosRoutes.delete("/:id", excluirExercicio);

export { exerciciosRoutes };