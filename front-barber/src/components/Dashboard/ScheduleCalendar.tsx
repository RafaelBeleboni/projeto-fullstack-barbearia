import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import apiBase from "@/api/apiBase";
import Calendar from "./Calendar";
import ScheduleGrid from "./ScheduleGrid";

const ScheduleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const [trouxeHorarios, setTrouxeHorarios] = useState(false);

  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedDayBody = {
          date: selectedDay,
        };
        const response = await apiBase.post(
          "/horarios/horarios-dia",
          selectedDayBody
        );
        setFetchData(response.data);
        setTrouxeHorarios(true);
      } catch (e) {
        console.log(e);
      }
    };

    if (selectedDay !== null) {
      fetchData();
    }
  }, [selectedDay]);

  const handlePreviousMonth = () => {
    const firstDayOfCurrentMonth = startOfMonth(currentMonth);
    const firstDayOfTodayMonth = startOfMonth(new Date());
    if (firstDayOfCurrentMonth.getTime() > firstDayOfTodayMonth.getTime()) {
      setCurrentMonth(addMonths(currentMonth, -1));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day: Date) => {
     setDayOfWeek(getDay(day));
    if (dayOfWeek !== 0 && dayOfWeek !== 1) {
      setSelectedDay(day);
    }
  };

const handleCreateSchedule = (schedule: any) => {
const client = localStorage.getItem("@Cliente")
const parsedClient = client ? JSON.parse(client) : {}
    const bodyData = {
      client: parsedClient.id,
      
    }


  console.log(schedule)

  /*
  {
    "clienteId": 1,
    "horarioDisponivelId": 180,
    "tipoCorte": "Cabelo",
    "status": "Confirmado"
}
  */
}

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const paddingDays = (firstDayOfMonth + 6) % 7; // Alinhar para "D S T Q Q S S"

  const isCurrentMonth =
    startOfMonth(currentMonth).getTime() === startOfMonth(new Date()).getTime();

  return (
    <div className="flex justify-center items-center h-screen px-4 flex-col">
      <h1 className="text-2xl mb-4">{!trouxeHorarios ? "Clique no dia que você deseja agendar" : "Agora, selecione o horário"}</h1>
      <div className="p-5 bg-white rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        {!trouxeHorarios ? (
          <>
            <Calendar
              handlePreviousMonth={handlePreviousMonth}
              isCurrentMonth={isCurrentMonth}
              currentMonth={currentMonth}
              handleNextMonth={handleNextMonth}
              paddingDays={paddingDays}
              daysInMonth={daysInMonth}
              handleDayClick={handleDayClick}
            />
          </>
        ) : (
          <>
          <ScheduleGrid dayOfWeek={dayOfWeek} fetchData={fetchData} onSelectSchedule={handleCreateSchedule} />
          <button className="w-46 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" onClick={() => setTrouxeHorarios(!trouxeHorarios)}>Voltar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
