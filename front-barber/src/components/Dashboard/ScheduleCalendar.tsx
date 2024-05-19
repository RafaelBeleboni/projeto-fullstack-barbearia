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
import TypeChoiceModal from "./TypeChoiceModal";
import useChoiceStore from "@/store/typeChoiceStore";
import ConfirmBoxModal from "./ConfirmBoxModal";
import RedirectFinaly from "./RedirectFinaly";

const ScheduleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [trouxeHorarios, setTrouxeHorarios] = useState(false);

  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);

  const [fetchData, setFetchData] = useState([]);

  const {selectedChoice, setSelectedChoice, selectedTimeId, fineshedSchedule, setConfirmBox, confirmBox, isConfirmed, selectedDay,setSelectedDay} = useChoiceStore()
  const [redirectClient, setRedirectClient]= useState(false)

  const isSelected = selectedChoice? true : false;
  
useEffect(() => {
  if(fineshedSchedule){
    setConfirmBox(true)  
  }
},[fineshedSchedule])

 useEffect(() => {
  const handleCreateSchedule = async () => {
    const client = localStorage.getItem("@Cliente");
    const parsedClient = client ? JSON.parse(client) : {};
    
    try {
      if (selectedTimeId?.length === 1) {
        const bodyData = {
          clienteId: parsedClient.id,
          horarioDisponivelId: selectedTimeId[0],
          tipoCorte: selectedChoice,
          status: "Confirmado"
        };
        const response = await apiBase.post("/horarios/criar-agendamento", bodyData);
        console.log("Agendamento criado com sucesso", response.data);
        setRedirectClient(true)
        setConfirmBox(!confirmBox)
      } else if (selectedTimeId?.length === 2) {
        const requests = selectedTimeId.map((id, index) => {
          const bodyData = {
            clienteId: parsedClient.id,
            horarioDisponivelId: id,
            tipoCorte: index === 0 ? selectedChoice?.split(":")[0].trim() : selectedChoice?.split(":")[1].trim(),
            status: "Confirmado"
          };
          return apiBase.post("/horarios/criar-agendamento", bodyData);
        });
  
        const responses = await Promise.all(requests);
        responses.forEach(response => {
          console.log("Agendamento criado com sucesso", response.data);
        });
        setRedirectClient(true)
        setConfirmBox(!confirmBox)

      }
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
    }
  };
  handleCreateSchedule();
 },[isConfirmed])
  
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

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const paddingDays = (firstDayOfMonth + 6) % 7; // Alinhar para "D S T Q Q S S"

  const isCurrentMonth =
    startOfMonth(currentMonth).getTime() === startOfMonth(new Date()).getTime();
console.log(redirectClient)
  return (
    <>
    {redirectClient && <RedirectFinaly/>}
    {confirmBox && <ConfirmBoxModal/>}
    { !isSelected && <TypeChoiceModal/> }
    <div className={`flex justify-center items-center ${!trouxeHorarios ? "h-screen" : "h-full"} p-4 flex-col`}>
      <h1 className="text-2xl mb-4  mt-4 text-center">{!trouxeHorarios ? "Clique no dia que você deseja agendar" : "Agora, selecione o horário"}</h1>
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
          <div className="flex flex-col items-center justify-center">
          <ScheduleGrid dayOfWeek={dayOfWeek} fetchData={fetchData} />
          <button className="mt-4 w-full md:w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" onClick={() => {
            setTrouxeHorarios(!trouxeHorarios)
            setSelectedChoice(null)
            }}>Voltar</button>
          </div>
        )}
      </div>
    </div>
        </>
  );
};

export default ScheduleCalendar;
