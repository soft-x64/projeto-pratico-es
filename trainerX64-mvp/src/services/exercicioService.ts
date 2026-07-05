import axios from "axios";

import { api } from "./api";

export type CategoriaExercicio =
  | "Peito"
  | "Costas"
  | "Pernas"
  | "Braços"
  | "Ombros"
  | "Abdômen"
  | "Glúteos"
  | "Panturrilha"
  | "Outro";

export interface Exercicio {
  id: string;
  nome: string;
  categoria: CategoriaExercicio;
  descricao?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CriarExercicioDTO {
  nome: string;
  categoria: CategoriaExercicio;
  descricao?: string;
}

export type AtualizarExercicioDTO =
  Partial<CriarExercicioDTO>;

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

export const exercicioService = {
  async listarExercicios(): Promise<Exercicio[]> {
    try {
      const response =
        await api.get<Exercicio[]>("/exercicios");

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async buscarExercicioPorId(
    id: string,
  ): Promise<Exercicio> {
    try {
      const response =
        await api.get<Exercicio>(
          `/exercicios/${id}`,
        );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async criarExercicio(
    data: CriarExercicioDTO,
  ): Promise<Exercicio> {
    try {
      const response =
        await api.post<Exercicio>(
          "/exercicios",
          data,
        );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async atualizarExercicio(
    id: string,
    data: AtualizarExercicioDTO,
  ): Promise<Exercicio> {
    try {
      const response =
        await api.put<Exercicio>(
          `/exercicios/${id}`,
          data,
        );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async excluirExercicio(
    id: string,
  ): Promise<void> {
    try {
      await api.delete(`/exercicios/${id}`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};