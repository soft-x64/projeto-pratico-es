import { Router } from "express";
import {
  buscarAlunoPorId,
  listarAlunos,
} from "../controllers/alunos.controller";

const router = Router();

router.get("/", listarAlunos);
router.get("/:id", buscarAlunoPorId);

export default router;