import axios from "axios";
import { api } from "./api";

export interface Mensalidade {
  id: string;
  alunoId: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string | null;
  status: "pendente" | "pago";
}

function obterMensagemErro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const mensagem = error.response?.data?.mensagem;
    if (typeof mensagem === "string") return mensagem;
  }
  return "Erro na operação financeira.";
}

export const mensalidadeService = {
  async cadastrar(data: { alunoId: string; valor: number; dataVencimento: string }): Promise<Mensalidade> {
    try {
      const response = await api.post<Mensalidade>("/mensalidades", data);
      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async listarPendentes(): Promise<any[]> {
    try {
      const response = await api.get("/mensalidades/pendentes");
      return response.data;
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },

  async darBaixa(id: string): Promise<void> {
    try {
      await api.patch(`/mensalidades/${id}/pago`);
    } catch (error) {
      throw new Error(obterMensagemErro(error));
    }
  },
};