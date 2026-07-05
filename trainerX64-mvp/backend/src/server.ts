import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { alunosRoutes } from "./routes/alunos.routes";
import treinosRoutes from "./routes/treinos.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  return response.status(200).json({
    mensagem: "API TrainerX64 funcionando.",
  });
});

app.use("/alunos", alunosRoutes);

app.use("/treinos", treinosRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});