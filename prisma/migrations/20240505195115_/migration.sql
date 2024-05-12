/*
  Warnings:

  - You are about to drop the `_AgendamentoToHorarioDisponivel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[horarioDisponivelId]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `horarioDisponivelId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AgendamentoToHorarioDisponivel" DROP CONSTRAINT "_AgendamentoToHorarioDisponivel_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendamentoToHorarioDisponivel" DROP CONSTRAINT "_AgendamentoToHorarioDisponivel_B_fkey";

-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "horarioDisponivelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AgendamentoToHorarioDisponivel";

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_horarioDisponivelId_key" ON "Agendamento"("horarioDisponivelId");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_horarioDisponivelId_fkey" FOREIGN KEY ("horarioDisponivelId") REFERENCES "HorarioDisponivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
