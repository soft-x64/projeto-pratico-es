import { Router } from "express";

import {
  atualizarTreino,
  buscarTreinoPorId,
  criarTreino,
  excluirTreino,
  listarTreinos,
} from "../controllers/treinos.controller";

const treinosRoutes = Router();

treinosRoutes.get("/", listarTreinos);

treinosRoutes.get("/:id", buscarTreinoPorId);

treinosRoutes.post("/", criarTreino);

treinosRoutes.put("/:id", atualizarTreino);

treinosRoutes.delete("/:id", excluirTreino);

export default treinosRoutes;