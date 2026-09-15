/**
 * Facade da ficha de treino.
 *
 * Reúne atrás de uma única interface as operações que envolvem três
 * subsistemas diferentes do domínio de treinos:
 *
 *   Treino · Exercicio · TreinoExercicio
 *
 * Antes desta refatoração o controller precisava conhecer os três modelos,
 * a ordem das verificações entre eles e as regras de validação dos campos
 * do vínculo. Agora ele conhece apenas a facade.
 */

// ---------------------------------------------------------------------------
// Contratos
// ---------------------------------------------------------------------------

export interface DadosNovoVinculo {
  exercicioId?: unknown;
  ordem?: unknown;
  series?: unknown;
  repeticoes?: unknown;
  carga?: unknown;
}

export type DadosAtualizacaoVinculo = Omit<
  DadosNovoVinculo,
  "exercicioId"
>;

/**
 * Resultado de uma operação da facade.
 *
 * A facade não conhece Express: ela devolve sucesso ou falha com o código
 * apropriado, e o controller traduz isso em resposta HTTP.
 */
export type ResultadoFicha<T> =
  | { sucesso: true; dados: T }
  | { sucesso: false; status: number; mensagem: string };

/**
 * Subconjunto do PrismaClient realmente utilizado pela facade.
 *
 * Declarar apenas o que é usado permite injetar um duplo de teste sem
 * precisar de um banco de dados real.
 */
export interface BancoDaFichaDeTreino {
  treino: {
    findUnique(args: any): Promise<any>;
  };
  exercicio: {
    findUnique(args: any): Promise<any>;
  };
  treinoExercicio: {
    findMany(args: any): Promise<any[]>;
    findUnique(args: any): Promise<any>;
    create(args: any): Promise<any>;
    update(args: any): Promise<any>;
    delete(args: any): Promise<any>;
  };
}

// ---------------------------------------------------------------------------
// Facade
// ---------------------------------------------------------------------------

export class FichaDeTreinoFacade {
  constructor(
    private readonly banco: BancoDaFichaDeTreino,
  ) {}

  /**
   * Lista os exercícios de um treino, na ordem definida na ficha.
   */
  public async listarExercicios(
    treinoId: string,
  ): Promise<ResultadoFicha<any[]>> {
    const vinculos =
      await this.banco.treinoExercicio.findMany({
        where: { treinoId },
        orderBy: { ordem: "asc" },
        include: { exercicio: true },
      });

    return { sucesso: true, dados: vinculos };
  }

  /**
   * Adiciona um exercício à ficha de um treino.
   *
   * Orquestra, nesta ordem:
   *   1. validação dos campos obrigatórios;
   *   2. validação dos valores numéricos;
   *   3. existência do treino;
   *   4. existência do exercício;
   *   5. ausência de vínculo duplicado;
   *   6. criação do vínculo.
   */
  public async adicionarExercicio(
    treinoId: string,
    dados: DadosNovoVinculo,
  ): Promise<ResultadoFicha<any>> {
    const { exercicioId, ordem, series, repeticoes, carga } =
      dados;

    const faltamCampos =
      !exercicioId ||
      ordem === undefined ||
      series === undefined ||
      repeticoes === undefined;

    if (faltamCampos) {
      return this.falha(
        400,
        "Campos obrigatórios ausentes (exercicioId, ordem, series, repeticoes).",
      );
    }

    const erroDeValor = this.validarValores({
      ordem,
      series,
      repeticoes,
      carga,
    });

    if (erroDeValor) {
      return erroDeValor;
    }

    const treino = await this.banco.treino.findUnique({
      where: { id: treinoId },
    });

    if (!treino) {
      return this.falha(404, "Treino inexistente.");
    }

    const exercicio =
      await this.banco.exercicio.findUnique({
        where: { id: exercicioId as string },
      });

    if (!exercicio) {
      return this.falha(404, "Exercício inexistente.");
    }

    const duplicado =
      await this.banco.treinoExercicio.findUnique({
        where: {
          treinoId_exercicioId: {
            treinoId,
            exercicioId: exercicioId as string,
          },
        },
      });

    if (duplicado) {
      return this.falha(
        400,
        "Impedir exercício duplicado.",
      );
    }

    const vinculo =
      await this.banco.treinoExercicio.create({
        data: {
          treinoId,
          exercicioId: exercicioId as string,
          ordem: Number(ordem),
          series: Number(series),
          repeticoes: Number(repeticoes),
          carga: this.normalizarCarga(carga),
        },
        include: { exercicio: true },
      });

    return { sucesso: true, dados: vinculo };
  }

  /**
   * Atualiza os dados de um exercício já presente na ficha.
   *
   * Aceita atualização parcial: os campos ausentes permanecem como estão.
   */
  public async atualizarExercicio(
    vinculoId: string,
    dados: DadosAtualizacaoVinculo,
  ): Promise<ResultadoFicha<any>> {
    const { ordem, series, repeticoes, carga } = dados;

    const vinculo =
      await this.banco.treinoExercicio.findUnique({
        where: { id: vinculoId },
      });

    if (!vinculo) {
      return this.falha(404, "Vínculo inexistente.");
    }

    const erroDeValor = this.validarValores({
      ordem,
      series,
      repeticoes,
      carga,
    });

    if (erroDeValor) {
      return erroDeValor;
    }

    const vinculoAtualizado =
      await this.banco.treinoExercicio.update({
        where: { id: vinculoId },
        data: {
          ordem:
            ordem !== undefined
              ? Number(ordem)
              : undefined,
          series:
            series !== undefined
              ? Number(series)
              : undefined,
          repeticoes:
            repeticoes !== undefined
              ? Number(repeticoes)
              : undefined,
          carga:
            carga !== undefined
              ? this.normalizarCarga(carga)
              : undefined,
        },
        include: { exercicio: true },
      });

    return { sucesso: true, dados: vinculoAtualizado };
  }

  /**
   * Remove um exercício da ficha de treino.
   */
  public async removerExercicio(
    vinculoId: string,
  ): Promise<ResultadoFicha<null>> {
    const vinculo =
      await this.banco.treinoExercicio.findUnique({
        where: { id: vinculoId },
      });

    if (!vinculo) {
      return this.falha(404, "Vínculo inexistente.");
    }

    await this.banco.treinoExercicio.delete({
      where: { id: vinculoId },
    });

    return { sucesso: true, dados: null };
  }

  // -------------------------------------------------------------------------
  // Regras internas
  // -------------------------------------------------------------------------

  /**
   * Regras numéricas do vínculo, em um único lugar.
   *
   * Antes da refatoração estas mesmas quatro checagens existiam duplicadas
   * em adicionarExercicioAoTreino e atualizarExercicioDoTreino, e já haviam
   * divergido entre si.
   *
   * Campos com valor undefined são ignorados, o que permite reutilizar a
   * mesma regra na criação (onde os obrigatórios já foram verificados) e na
   * atualização parcial.
   */
  private validarValores(valores: {
    ordem?: unknown;
    series?: unknown;
    repeticoes?: unknown;
    carga?: unknown;
  }): { sucesso: false; status: number; mensagem: string } | null {
    const { ordem, series, repeticoes, carga } = valores;

    if (ordem !== undefined && Number(ordem) < 1) {
      return this.falha(
        400,
        "Ordem inválida. Deve ser maior que zero.",
      );
    }

    if (series !== undefined && Number(series) < 1) {
      return this.falha(
        400,
        "Séries inválidas. Deve ser maior que zero.",
      );
    }

    if (
      repeticoes !== undefined &&
      Number(repeticoes) < 1
    ) {
      return this.falha(
        400,
        "Repetições inválidas. Deve ser maior que zero.",
      );
    }

    if (
      carga !== undefined &&
      carga !== null &&
      Number(carga) < 0
    ) {
      return this.falha(
        400,
        "Carga negativa não é permitida.",
      );
    }

    return null;
  }

  private normalizarCarga(
    carga: unknown,
  ): number | null {
    if (carga === undefined || carga === null) {
      return null;
    }

    return Number(carga);
  }

  private falha(
    status: number,
    mensagem: string,
  ): { sucesso: false; status: number; mensagem: string } {
    return { sucesso: false, status, mensagem };
  }
}
