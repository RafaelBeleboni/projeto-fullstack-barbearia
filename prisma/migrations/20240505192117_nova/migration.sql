/*
  Warnings:

  - You are about to drop the column `dataHora` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `duracao` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `horarioDisponivelId` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `disponivel` on the `HorarioDisponivel` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `HorarioDisponivel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_horarioDisponivelId_fkey";

-- DropIndex
DROP INDEX "Agendamento_horarioDisponivelId_key";

-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "dataHora",
DROP COLUMN "duracao",
DROP COLUMN "horarioDisponivelId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "HorarioDisponivel" DROP COLUMN "disponivel",
DROP COLUMN "horario",
ADD COLUMN     "horarios" TEXT[];

-- CreateTable
CREATE TABLE "_AgendamentoToHorarioDisponivel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgendamentoToHorarioDisponivel_AB_unique" ON "_AgendamentoToHorarioDisponivel"("A", "B");

-- CreateIndex
CREATE INDEX "_AgendamentoToHorarioDisponivel_B_index" ON "_AgendamentoToHorarioDisponivel"("B");

-- AddForeignKey
ALTER TABLE "_AgendamentoToHorarioDisponivel" ADD CONSTRAINT "_AgendamentoToHorarioDisponivel_A_fkey" FOREIGN KEY ("A") REFERENCES "Agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendamentoToHorarioDisponivel" ADD CONSTRAINT "_AgendamentoToHorarioDisponivel_B_fkey" FOREIGN KEY ("B") REFERENCES "HorarioDisponivel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
