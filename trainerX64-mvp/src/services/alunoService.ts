import { api } from "./api";
import type { Student } from "../types/app";
import { STUDENTS } from "../data/mockData";

type AlunoApi = {
  id: string;
  nome: string;
  status: "em-dia" | "pendente" | "mensalidade" | "sem-atividade";
  treino: string;
  objetivo: string;
  nivel: string;
  peso: number;
  altura: number;
  idade: number;
  createdAt?: string;
};

export type CriarAlunoDTO = {
  nome: string;
  status: "em-dia" | "pendente" | "mensalidade" | "sem-atividade";
  treino: string;
  objetivo: string;
  nivel: string;
  peso: number;
  altura: number;
  idade: number;
};

function mapAlunoApiToStudent(aluno: AlunoApi): Student {
  return {
    id: aluno.id,
    name: aluno.nome,
    status: aluno.status,
    workout: aluno.treino,
    lastSeen: "Hoje",
    weight: aluno.peso,
    height: aluno.altura,
    age: aluno.idade,
    goal: aluno.objetivo,
    level: aluno.nivel,
  };
}

export const alunoService = {
  async listarAlunos(): Promise<Student[]> {
    try {
      const response = await api.get<AlunoApi[]>("/alunos");
      return response.data.map(mapAlunoApiToStudent);
    } catch (error) {
      console.error("Erro ao buscar alunos no backend:", error);
      return STUDENTS;
    }
  },

  async criarAluno(data: CriarAlunoDTO): Promise<Student> {
    const response = await api.post<AlunoApi>("/alunos", data);
    return mapAlunoApiToStudent(response.data);
  },
};