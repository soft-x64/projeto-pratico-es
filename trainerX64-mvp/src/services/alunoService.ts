import axios from "axios";

import { api } from "./api";
import type { Student } from "../types/app";
import {
  alunoService,
  type AtualizarAlunoDTO,
  type CriarAlunoDTO,
  type StatusAluno,
} from "../services/alunoService";

export type StatusAluno =
  | "em-dia"
  | "pendente"
  | "mensalidade"
  | "sem-atividade";

interface AlunoApi {
  id: string;
  nome: string;
  email: string;
  telefone?: string | null;
  status: StatusAluno;
  treino?: string | null;
  objetivo: string;
  nivel: string;
  peso: number;
  altura: number;
  idade: number;
  createdAt: string;
  updatedAt: string;
}

export interface CriarAlunoDTO {
  nome: string;
  email: string;
  telefone?: string;
  status: StatusAluno;
  treino?: string;
  objetivo: string;
  nivel: string;
  peso: number;
  altura: number;
  idade: number;
}

export type AtualizarAlunoDTO = Partial<CriarAlunoDTO>;

function mapAlunoApiToStudent(aluno: AlunoApi): Student {
  return {
    id: aluno.id,
    name: aluno.nome,
    email: aluno.email,
    phone: aluno.telefone ?? undefined,
    status: aluno.status,
    workout: aluno.treino ?? undefined,
    lastSeen: "Hoje",
    weight: aluno.peso,
    height: aluno.altura,
    age: aluno.idade,
    goal: aluno.objetivo,
    level: aluno.nivel,
  };
}

function obterMensagemErro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const mensagem = error.response?.data?.mensagem;

    if (typeof mensagem === "string") {
      return mensagem;
    }

    if (!error.response) {
      return "Não foi possível conectar ao servidor.";
    }
  }

  return "Ocorreu um erro inesperado.";
}

export const alunoService = {
  async listarAlunos(): Promise<Student[]> {
    try {
      const response = await api.get<AlunoApi[]>("/alunos");

      return response.data.map(mapAlunoApiToStudent);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async buscarAlunoPorId(id: string): Promise<Student> {
    try {
      const response = await api.get<AlunoApi>(`/alunos/${id}`);

      return mapAlunoApiToStudent(response.data);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async criarAluno(data: CriarAlunoDTO): Promise<Student> {
    try {
      const response = await api.post<AlunoApi>("/alunos", data);

      return mapAlunoApiToStudent(response.data);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async atualizarAluno(
    id: string,
    data: AtualizarAlunoDTO,
  ): Promise<Student> {
    try {
      const response = await api.put<AlunoApi>(
        `/alunos/${id}`,
        data,
      );

      return mapAlunoApiToStudent(response.data);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async excluirAluno(id: string): Promise<void> {
    try {
      await api.delete(`/alunos/${id}`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};