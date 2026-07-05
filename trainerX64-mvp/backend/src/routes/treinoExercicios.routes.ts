import { Router } from "express";
import {
  adicionarExercicioAoTreino,
  atualizarExercicioDoTreino,
  listarExerciciosDoTreino,
  removerExercicioDoTreino,
} from "../controllers/treinoExercicios.controller";

const treinoExerciciosRoutes = Router();

treinoExerciciosRoutes.get("/treinos/:treinoId/exercicios", listarExerciciosDoTreino);
treinoExerciciosRoutes.post("/treinos/:treinoId/exercicios", adicionarExercicioAoTreino);
treinoExerciciosRoutes.put("/treinos/:treinoId/exercicios/:vinculoId", atualizarExercicioDoTreino);
treinoExerciciosRoutes.delete("/treinos/:treinoId/exercicios/:vinculoId", removerExercicioDoTreino);

export { treinoExerciciosRoutes };