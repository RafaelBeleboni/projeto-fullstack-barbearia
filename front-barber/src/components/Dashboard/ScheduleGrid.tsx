import React, { useState, useEffect } from 'react';
import apiBase from "@/api/apiBase";
import useChoiceStore from '@/store/typeChoiceStore';

interface ScheduleGridProps {
  dayOfWeek: number | null;
  fetchData: any[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ dayOfWeek, fetchData }) => {

  const { selectedChoice, setSelectedTimeId,setFineshedSchedule,setSelectedTime } = useChoiceStore();

  const isHairAndBeard = selectedChoice === "Cabelo : Barba"
  
  const handleTimeClick = (time: string) => {
    let timeId: any[] = []

    fetchData.forEach((schedule) => {
      schedule.horarios[0] === time ? timeId.push(schedule.id) : null;
    });

    isHairAndBeard ? timeId.push(timeId[0] + 1) : null;

    setSelectedTimeId(timeId);
    setSelectedTime(time);
    setFineshedSchedule(true)
  };
  const scheduleTimes =
    dayOfWeek === 6 // Sábado
      ? [
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
        ]
      : [
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
        ];

  
        const avaibleSchedules = fetchData.filter(schedule => schedule.Agendamento === null);

        const hairAndBeardAvaibleSchedules: any = []
        const avaibleSchedulesHours = []

        for (const schedule of avaibleSchedules) {
          avaibleSchedulesHours.push(schedule.horarios[0])
        }

        for (let i = 0; i < fetchData.length - 1; i++) {
          const currentIndex = fetchData[i]
          const nextIndex = fetchData[i + 1]
          
          if(avaibleSchedulesHours.includes(currentIndex.horarios[0])){
            if(nextIndex.Agendamento === null){
              hairAndBeardAvaibleSchedules.push(`${currentIndex.horarios[0]}`)
            }
          }
        }

  


  return (
    <>
      <div className="flex flex-wrap gap-2 text-center justify-center">
        {scheduleTimes.map((time, index) => {
          
          const isClickable = isHairAndBeard ? hairAndBeardAvaibleSchedules.includes(time) : avaibleSchedules.some(schedule => schedule.horarios.includes(time));
          const isDisabled = !isClickable;

          return (
            <button
            key={index}
            className={`w-24 p-8 border-2 border-black rounded-lg text-center flex justify-center items-center ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"}`}
            onClick={isClickable ? () => handleTimeClick(time) : undefined}
            disabled={isDisabled}
          >
            {time}
          </button>
          );
        })}
      </div>
    </>
  );
};

export default ScheduleGrid;
