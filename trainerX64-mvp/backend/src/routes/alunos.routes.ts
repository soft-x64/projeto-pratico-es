import { Router } from "express";

import {
  atualizarAluno,
  buscarAlunoPorId,
  criarAluno,
  excluirAluno,
  listarAlunos,
} from "../controllers/alunos.controller";

const alunosRoutes = Router();

alunosRoutes.get("/", listarAlunos);

alunosRoutes.get("/:id", buscarAlunoPorId);

alunosRoutes.post("/", criarAluno);

alunosRoutes.put("/:id", atualizarAluno);

alunosRoutes.delete("/:id", excluirAluno);

export { alunosRoutes };