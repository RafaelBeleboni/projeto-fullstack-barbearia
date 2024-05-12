import { addMinutes } from 'date-fns';
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
const prisma = new PrismaClient();

export const availableSchedules = async (req: Request, res: Response) => {
    try {
        const horarios = await prisma.horarioDisponivel.findMany({
            include:{
                Agendamento:true
            }
        });
        res.status(200).json(horarios); // Retorna a lista de horários disponíveis
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter horários disponíveis.' });
      }
}


export const availableSchedulesWithDate = async (req: Request, res: Response) => {
    try {
        // Extrai a data do corpo da requisição
        const { date } = req.body;

        // Converte a data para o formato Date do JavaScript
        const selectedDate = new Date(date);

        // Verifica se a data é válida
        if (isNaN(selectedDate.getTime())) {
            return res.status(400).json({ error: 'Formato de data inválido.' });
        }

        // Ajusta a data para começar no início do dia e terminar no final do dia
        const startDate = startOfDay(selectedDate);
        const endDate = endOfDay(selectedDate);

        // Obtém os horários disponíveis para a data especificada
        const horarios = await prisma.horarioDisponivel.findMany({
            where: {
                data: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                Agendamento: true
            }
        });

        res.status(200).json(horarios); // Retorna a lista de horários disponíveis
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter horários disponíveis.' });
    }
}

export const controladorTeste = async (req:Request, res:Response) =>{
    return res.json({
     message: "Teste",
     count: 1
    })
 }
// Controlador para criar um novo agendamento
export const createSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
    
  const { clienteId, horarioDisponivelId, tipoCorte, status } = req.body;

  try {
    // Verificar se o cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: clienteId },
    });

    if (!cliente) {
    return  res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Verificar se o horário disponível existe e se não tem agendamento
    const horarioDisponivel = await prisma.horarioDisponivel.findUnique({
      where: { id: horarioDisponivelId },
      include: { Agendamento: true },
    });

    if (!horarioDisponivel) {
      res.status(404).json({ message: 'Horário disponível não encontrado' });
      return;
    }

    if (horarioDisponivel.Agendamento) {
     return res.status(409).json({ message: 'Horário já agendado' });
    }

    // Criar o agendamento e relacionar ao horário disponível
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        clienteId,
        horarioDisponivelId,
        tipoCorte,
        status: status || 'agendado', // Default para "agendado"
      },
    });

    res.status(201).json(novoAgendamento); // Retorna o novo agendamento criado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o agendamento' });
  }
};

