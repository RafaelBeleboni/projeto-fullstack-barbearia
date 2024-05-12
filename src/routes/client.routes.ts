import { Router } from 'express';
import { createClient, getAllClients } from '../controllers/client.controller';

const router = Router();

// Rota para criar um cliente
router.post('/', createClient);

// Rota para obter todos os clientes
router.get('/', getAllClients);

export default router;
