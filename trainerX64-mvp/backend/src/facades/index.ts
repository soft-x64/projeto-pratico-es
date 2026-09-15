import { prisma } from "../database/prisma";

import {
  FichaDeTreinoFacade,
  type BancoDaFichaDeTreino,
} from "./fichaDeTreino.facade";

/**
 * Ligação da facade ao banco real.
 *
 * A classe FichaDeTreinoFacade não importa o Prisma: ela recebe o banco pelo
 * construtor. É aqui — e somente aqui — que a instância de produção é
 * montada. Nos testes, a mesma classe é instanciada com um duplo de teste.
 */
export const fichaDeTreino = new FichaDeTreinoFacade(
  prisma as unknown as BancoDaFichaDeTreino,
);

export { FichaDeTreinoFacade } from "./fichaDeTreino.facade";
export type {
  BancoDaFichaDeTreino,
  DadosNovoVinculo,
  DadosAtualizacaoVinculo,
  ResultadoFicha,
} from "./fichaDeTreino.facade";
