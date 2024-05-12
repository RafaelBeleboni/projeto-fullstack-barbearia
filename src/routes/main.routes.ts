import { Request, Response, Router } from 'express';
import clientRoutes from './client.routes';
import authRoutes from './auth.routes';
import horariosRoutes from './horarios.routes'; // Importe as novas rotas para horários
import { controladorTeste } from '../controllers/schedules.controller';


const router = Router();


router.use("/teste", controladorTeste)
// Incluir rotas específicas
router.use('/clientes', clientRoutes);
router.use('/auth', authRoutes);
router.use('/horarios', horariosRoutes); // Adicionar a rota para horários

export default router;
