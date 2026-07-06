-- CreateTable
CREATE TABLE "AvaliacaoFisica" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "percentualGordura" DOUBLE PRECISION,
    "massaMuscular" DOUBLE PRECISION,
    "braco" DOUBLE PRECISION,
    "peitoral" DOUBLE PRECISION,
    "cintura" DOUBLE PRECISION,
    "quadril" DOUBLE PRECISION,
    "coxa" DOUBLE PRECISION,
    "panturrilha" DOUBLE PRECISION,
    "observacoes" TEXT,
    "dataAvaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvaliacaoFisica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AvaliacaoFisica_alunoId_idx" ON "AvaliacaoFisica"("alunoId");

-- AddForeignKey
ALTER TABLE "AvaliacaoFisica" ADD CONSTRAINT "AvaliacaoFisica_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
