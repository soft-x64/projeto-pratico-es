
import express from "express";
import cors from "cors";
import alunosRoutes from "./routes/alunos.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "API TrainerX64 rodando com PostgreSQL e Prisma.",
  });
});

app.use("/alunos", alunosRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});