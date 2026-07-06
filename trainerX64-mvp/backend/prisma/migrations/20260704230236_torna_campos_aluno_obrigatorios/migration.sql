/*
  Warnings:

  - Made the column `email` on table `Aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
