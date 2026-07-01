import { api } from "./api";
import type { Student } from "../types/app";
import { STUDENTS } from "../data/mockData";

// 1. Define o formato exato como os dados vêm do teu PostgreSQL (Campos em Português)
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
};

// 2. Função mapeadora que traduz os dados de Português para Inglês
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

// 3. Serviço que consome a tua API Node.js
export const alunoService = {
  async listarAlunos(): Promise<Student[]> {
    try {
      // Faz a requisição GET para o teu backend (http://localhost:3333/alunos)
      const response = await api.get<AlunoApi[]>("/alunos");
      
      // Converte a lista recebida usando a função mapeadora
      return response.data.map(mapAlunoApiToStudent);
    } catch {
      // Se o backend der erro ou estiver desligado, o app usa os dados mockados antigos
      return STUDENTS;
    }
  },
};