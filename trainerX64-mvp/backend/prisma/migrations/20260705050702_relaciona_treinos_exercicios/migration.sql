-- CreateTable
CREATE TABLE "TreinoExercicio" (
    "id" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    "exercicioId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "carga" DOUBLE PRECISION,

    CONSTRAINT "TreinoExercicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TreinoExercicio_treinoId_idx" ON "TreinoExercicio"("treinoId");

-- CreateIndex
CREATE INDEX "TreinoExercicio_exercicioId_idx" ON "TreinoExercicio"("exercicioId");

-- CreateIndex
CREATE UNIQUE INDEX "TreinoExercicio_treinoId_exercicioId_key" ON "TreinoExercicio"("treinoId", "exercicioId");

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
