import { Router } from 'express';

import { availableSchedules, createSchedule, availableSchedulesWithDate } from '../controllers/schedules.controller';
import { verifyToken } from '../middlewares/verifyAuth.middleware';


const router = Router();

// Endpoint para obter horários disponíveis
router.get('/disponiveis', availableSchedules);
router.post('/criar-agendamento', verifyToken, createSchedule)
router.post('/horarios-dia', availableSchedulesWithDate)


export default router;
