import { Router } from "express";

import {
  atualizarAvaliacao,
  buscarAvaliacaoPorId,
  criarAvaliacao,
  excluirAvaliacao,
  listarAvaliacoesDoAluno,
} from "../controllers/avaliacoes.controller";

const avaliacoesRoutes = Router();

avaliacoesRoutes.get(
  "/alunos/:alunoId/avaliacoes",
  listarAvaliacoesDoAluno,
);

avaliacoesRoutes.post(
  "/alunos/:alunoId/avaliacoes",
  criarAvaliacao,
);

avaliacoesRoutes.get(
  "/avaliacoes/:id",
  buscarAvaliacaoPorId,
);

avaliacoesRoutes.put(
  "/avaliacoes/:id",
  atualizarAvaliacao,
);

avaliacoesRoutes.delete(
  "/avaliacoes/:id",
  excluirAvaliacao,
);

export { avaliacoesRoutes };