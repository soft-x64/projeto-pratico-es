import express from "express";
import cors from "cors";
import alunosRoutes from "./routes/alunos.routes";
import treinosRoutes from "./routes/treinos.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "API TrainerX64 rodando com sucesso.",
  });
});

app.use("/alunos", alunosRoutes);
app.use("/treinos", treinosRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`API TrainerX64 rodando em http://localhost:${PORT}`);
});