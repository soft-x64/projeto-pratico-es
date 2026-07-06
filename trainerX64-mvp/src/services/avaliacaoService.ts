import axios from "axios";

import { api } from "./api";

export interface AvaliacaoFisica {
  id: string;
  alunoId: string;
  peso: number;
  altura: number;
  percentualGordura?: number | null;
  massaMuscular?: number | null;
  braco?: number | null;
  peitoral?: number | null;
  cintura?: number | null;
  quadril?: number | null;
  coxa?: number | null;
  panturrilha?: number | null;
  observacoes?: string | null;
  dataAvaliacao: string;
  createdAt: string;
  updatedAt: string;
  aluno?: {
    id: string;
    nome: string;
  };
}

export interface CriarAvaliacaoDTO {
  peso: number;
  altura: number;
  percentualGordura?: number;
  massaMuscular?: number;
  braco?: number;
  peitoral?: number;
  cintura?: number;
  quadril?: number;
  coxa?: number;
  panturrilha?: number;
  observacoes?: string;
  dataAvaliacao?: string;
}

export type AtualizarAvaliacaoDTO =
  Partial<CriarAvaliacaoDTO>;

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

export const avaliacaoService = {
  async listarAvaliacoesDoAluno(
    alunoId: string,
  ): Promise<AvaliacaoFisica[]> {
    try {
      const response = await api.get<AvaliacaoFisica[]>(
        `/alunos/${alunoId}/avaliacoes`,
      );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async buscarAvaliacaoPorId(
    id: string,
  ): Promise<AvaliacaoFisica> {
    try {
      const response = await api.get<AvaliacaoFisica>(
        `/avaliacoes/${id}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async criarAvaliacao(
    alunoId: string,
    data: CriarAvaliacaoDTO,
  ): Promise<AvaliacaoFisica> {
    try {
      const response = await api.post<AvaliacaoFisica>(
        `/alunos/${alunoId}/avaliacoes`,
        data,
      );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async atualizarAvaliacao(
    id: string,
    data: AtualizarAvaliacaoDTO,
  ): Promise<AvaliacaoFisica> {
    try {
      const response = await api.put<AvaliacaoFisica>(
        `/avaliacoes/${id}`,
        data,
      );

      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async excluirAvaliacao(
    id: string,
  ): Promise<void> {
    try {
      await api.delete(`/avaliacoes/${id}`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};