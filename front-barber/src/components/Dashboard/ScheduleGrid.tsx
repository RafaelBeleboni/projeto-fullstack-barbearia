import React, { useState, useEffect } from 'react';
import apiBase from "@/api/apiBase";

interface ScheduleGridProps {
  dayOfWeek: number | null;
  fetchData: any[];
  onSelectSchedule: (schedule: any) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ dayOfWeek, fetchData, onSelectSchedule }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onSelectSchedule(time);
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
  return (
    <div>
      <div className="flex flex-wrap gap-2 text-center">
        {scheduleTimes.map((time, index) => {
          const isClickable = avaibleSchedules.some(schedule => schedule.horarios.includes(time));
          const isDisabled = !isClickable;
          return (
            <button
            key={index}
            className={`w-24 p-8 border-2 border-black rounded-lg text-center ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"}`}
            onClick={isClickable ? () => handleTimeClick(time) : undefined}
            disabled={isDisabled}
          >
            {time}
          </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleGrid;
