import axios from "axios";

import { api } from "./api";

export type StatusTreino =
  | "disponivel"
  | "andamento"
  | "concluido";

export interface Treino {
  id: string;
  nome: string;
  objetivo: string;
  descricao?: string | null;
  duracao?: number | null;
  status: StatusTreino;
  createdAt: string;
  updatedAt: string;
}

export interface CriarTreinoDTO {
  nome: string;
  objetivo: string;
  descricao?: string;
  duracao?: number;
  status: StatusTreino;
}

export type AtualizarTreinoDTO =
  Partial<CriarTreinoDTO>;

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

export const treinoService = {
  async listarTreinos(): Promise<Treino[]> {
    try {
      const response =
        await api.get<Treino[]>("/treinos");

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async buscarTreinoPorId(
    id: string,
  ): Promise<Treino> {
    try {
      const response =
        await api.get<Treino>(`/treinos/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async criarTreino(
    data: CriarTreinoDTO,
  ): Promise<Treino> {
    try {
      const response =
        await api.post<Treino>("/treinos", data);

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async atualizarTreino(
    id: string,
    data: AtualizarTreinoDTO,
  ): Promise<Treino> {
    try {
      const response = await api.put<Treino>(
        `/treinos/${id}`,
        data,
      );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async excluirTreino(
    id: string,
  ): Promise<void> {
    try {
      await api.delete(`/treinos/${id}`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};