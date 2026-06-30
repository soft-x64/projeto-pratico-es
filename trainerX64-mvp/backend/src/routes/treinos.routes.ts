import { Router } from "express";
import {
  buscarTreinoPorId,
  listarTreinos,
} from "../controllers/treinos.controller";

const router = Router();

router.get("/", listarTreinos);
router.get("/:id", buscarTreinoPorId);

export default router;