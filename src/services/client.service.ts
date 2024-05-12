import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar um cliente
export const createClientService = async (nome: string, telefone: string) => {
  return await prisma.cliente.create({
    data: { nome, telefone },
  });
};

// Obter todos os clientes
export const getAllClientsService = async () => {
  return await prisma.cliente.findMany();
};
