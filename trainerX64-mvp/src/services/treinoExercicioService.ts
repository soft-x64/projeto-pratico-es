import axios from "axios";
import { api } from "./api";
import type { Exercicio } from "./exercicioService";

export interface TreinoExercicio {
  id: string;
  treinoId: string;
  exercicioId: string;
  ordem: number;
  series: number;
  repeticoes: number;
  carga?: number | null;
  exercicio: Exercicio;
}

export interface AdicionarExercicioTreinoDTO {
  exercicioId: string;
  ordem: number;
  series: number;
  repeticoes: number;
  carga?: number;
}

export type AtualizarExercicioTreinoDTO = Partial<Omit<AdicionarExercicioTreinoDTO, "exercicioId">>;

function obterMensagemErro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const mensagem = error.response?.data?.mensagem;
    if (typeof mensagem === "string") return mensagem;
    if (!error.response) return "Não foi possível conectar ao servidor.";
  }
  return "Ocorreu um erro inesperado.";
}

export const treinoExercicioService = {
  async listarExerciciosDoTreino(treinoId: string): Promise<TreinoExercicio[]> {
    try {
      const response = await api.get<TreinoExercicio[]>(`/treinos/${treinoId}/exercicios`);
      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async adicionarExercicioAoTreino(treinoId: string, data: AdicionarExercicioTreinoDTO): Promise<TreinoExercicio> {
    try {
      const response = await api.post<TreinoExercicio>(`/treinos/${treinoId}/exercicios`, data);
      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async atualizarExercicioDoTreino(treinoId: string, vinculoId: string, data: AtualizarExercicioTreinoDTO): Promise<TreinoExercicio> {
    try {
      const response = await api.put<TreinoExercicio>(`/treinos/${treinoId}/exercicios/${vinculoId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async removerExercicioDoTreino(treinoId: string, vinculoId: string): Promise<void> {
    try {
      await api.delete(`/treinos/${treinoId}/exercicios/${vinculoId}`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};