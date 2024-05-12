/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "duracao" DOUBLE PRECISION NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
