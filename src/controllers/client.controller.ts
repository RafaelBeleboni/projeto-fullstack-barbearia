import { Request, Response } from 'express';
import { checkClientExistent, createClientService, getAllClientsService } from '../services/client.service';

// Criar um cliente
export const createClient = async (req: Request, res: Response) => {
  const { nome, telefone } = req.body;
  const existentClient = await checkClientExistent(telefone);

  if(existentClient) {
    return res.status(400).json({ error: 'Cliente já cadastrado' });
  }
  
  try {
    const newClient = await createClientService(nome, telefone);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar cliente' });
  }
};

// Obter todos os clientes
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClientsService();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao obter clientes' });
  }
};
