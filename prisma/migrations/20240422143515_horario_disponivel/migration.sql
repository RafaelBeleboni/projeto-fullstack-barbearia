/*
  Warnings:

  - You are about to drop the column `data` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to alter the column `duracao` on the `Agendamento` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[horarioDisponivelId]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataHora` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioDisponivelId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoCorte` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "data",
ADD COLUMN     "dataHora" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioDisponivelId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tipoCorte" TEXT NOT NULL,
ALTER COLUMN "duracao" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "HorarioDisponivel" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,

    CONSTRAINT "HorarioDisponivel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_horarioDisponivelId_key" ON "Agendamento"("horarioDisponivelId");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_horarioDisponivelId_fkey" FOREIGN KEY ("horarioDisponivelId") REFERENCES "HorarioDisponivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
