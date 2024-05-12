import { Router } from 'express';
import { validateLogin, validateToken } from '../controllers/auth.controller'; // Adicione um controlador para validação de login

const router = Router();

// Rota para validar login
router.post('/login', validateLogin);
router.post("/verificar-token", validateToken)

export default router;