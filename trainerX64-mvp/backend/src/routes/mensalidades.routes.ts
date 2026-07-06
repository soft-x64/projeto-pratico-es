import { Router } from "express";
import {
  cadastrarMensalidade,
  listarAlunosInadimplentes,
  marcarComoRecebida,
} from "../controllers/mensalidades.controller";

const mensalidadesRoutes = Router();

mensalidadesRoutes.post("/mensalidades", cadastrarMensalidade);
mensalidadesRoutes.get("/mensalidades/pendentes", listarAlunosInadimplentes);
mensalidadesRoutes.patch("/mensalidades/:id/pago", marcarComoRecebida);

export { mensalidadesRoutes };