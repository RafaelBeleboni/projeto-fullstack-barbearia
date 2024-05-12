const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarHorariosDisponiveis() {
    const startDate = new Date();
    const endDate = new Date(new Date().setFullYear(startDate.getFullYear() + 2));
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 1) {  // Ignora domingos (0) e segundas (1)
            const startHour = currentDate.getDay() === 6 ? 8 : 9;  // Sábados começam às 08:00
            const endHour = currentDate.getDay() === 6 ? 18 : 19;  // Sábados terminam às 18:00

            for (let hour = startHour; hour < endHour; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                    await prisma.horarioDisponivel.create({
                        data: {
                            data: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute, 0),
                            horarios: [timeString],
                        }
                    });
                }
            }
        }
        currentDate.setDate(currentDate.getDate() + 1);  // Avança para o próximo dia
    }
}

criarHorariosDisponiveis()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
