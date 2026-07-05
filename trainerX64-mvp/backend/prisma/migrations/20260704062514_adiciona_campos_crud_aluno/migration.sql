/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "email" TEXT,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'em-dia',
ALTER COLUMN "treino" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
