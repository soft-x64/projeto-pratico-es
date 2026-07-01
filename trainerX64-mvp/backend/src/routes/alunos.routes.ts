import { Router } from "express";
import {
  buscarAlunoPorId,
  criarAluno,
  listarAlunos,
} from "../controllers/alunos.controller";

const router = Router();

router.get("/", listarAlunos);
router.get("/:id", buscarAlunoPorId);
router.post("/", criarAluno);

export default router;