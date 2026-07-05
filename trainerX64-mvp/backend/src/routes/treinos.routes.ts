import { Router } from "express";

import {
  buscarTreinoPorId,
  listarTreinos,
} from "../controllers/treinos.controller";

const treinosRoutes = Router();

treinosRoutes.get("/", listarTreinos);

treinosRoutes.get("/:id", buscarTreinoPorId);

export default treinosRoutes;