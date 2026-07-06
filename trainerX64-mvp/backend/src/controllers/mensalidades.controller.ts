import type { Request, Response } from "express";
import { prisma } from "../database/prisma";

// 1. Cadastrar Mensalidade para um Aluno
export async function cadastrarMensalidade(request: Request, response: Response): Promise<Response> {
  try {
    const { alunoId, valor, dataVencimento } = request.body;

    if (!alunoId || !valor || !dataVencimento) {
      return response.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
    }

    if (Number(valor) <= 0) {
      return response.status(400).json({ mensagem: "O valor da mensalidade deve ser maior que zero." });
    }

    const alunoExiste = await prisma.aluno.findUnique({ where: { id: alunoId } });
    if (!alunoExiste) {
      return response.status(404).json({ mensagem: "Aluno não encontrado." });
    }

    const novaMensalidade = await prisma.mensalidade.create({
      data: {
        alunoId,
        valor: Number(valor),
        dataVencimento: new Date(dataVencimento),
        status: "pendente",
      },
    });

    // Se a mensalidade cadastrada já estiver vencida na data atual, atualiza o status do aluno
    if (new Date(dataVencimento) < new Date()) {
      await prisma.aluno.update({
        where: { id: alunoId },
        data: { status: "mensalidade" },
      });
    }

    return response.status(201).json(novaMensalidade);
  } catch (error) {
    console.error("Erro ao cadastrar mensalidade:", error);
    return response.status(500).json({ mensagem: "Erro interno ao cadastrar mensalidade." });
  }
}

// 2. Listar Alunos com Mensalidade Pendente (Inadimplentes)
export async function listarAlunosInadimplentes(request: Request, response: Response): Promise<Response> {
  try {
    // Busca os alunos que possuem QUALQUER mensalidade com status "pendente"
    const alunos = await prisma.aluno.findMany({
      where: {
        mensalidades: {
          some: { status: "pendente" },
        },
      },
      include: {
        mensalidades: {
          where: { status: "pendente" },
          orderBy: { dataVencimento: "asc" },
        },
      },
    });

    return response.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao listar alunos inadimplentes:", error);
    return response.status(500).json({ mensagem: "Erro interno ao listar pendências." });
  }
}

// 3. Marcar Mensalidade como Recebida e Atualizar Status do Aluno
export async function marcarComoRecebida(request: Request, response: Response): Promise<Response> {
  try {
    const { id } = request.params;

    const mensalidade = await prisma.mensalidade.findUnique({ where: { id } });
    if (!mensalidade) {
      return response.status(404).json({ mensagem: "Mensalidade não encontrada." });
    }

    // Atualiza a mensalidade para Paga
    const mensalidadePaga = await prisma.mensalidade.update({
      where: { id },
      data: {
        status: "pago",
        dataPagamento: new Date(),
      },
    });

    // Verifica se o aluno ainda possui OUTRA mensalidade pendente
    const restamPendencias = await prisma.mensalidade.findFirst({
      where: {
        alunoId: mensalidade.alunoId,
        status: "pendente",
      },
    });

    // Se não restarem mensalidades pendentes, o aluno volta a ficar "em-dia"
    if (!restamPendencias) {
      await prisma.aluno.update({
        where: { id: mensalidade.alunoId },
        data: { status: "em-dia" },
      });
    }

    return response.status(200).json({
      mensagem: "Pagamento recebido com sucesso.",
      mensalidade: mensalidadePaga,
    });
  } catch (error) {
    console.error("Erro ao dar baixa em pagamento:", error);
    return response.status(500).json({ mensagem: "Erro interno ao processar recebimento." });
  }
}