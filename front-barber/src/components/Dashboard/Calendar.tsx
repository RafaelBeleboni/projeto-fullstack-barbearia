import React from 'react'
import {
    format,
    getDay
  } from "date-fns";
  import { ptBR } from "date-fns/locale";

interface CalendarProps {
    handlePreviousMonth: () => void;
    isCurrentMonth: boolean;
    currentMonth: Date;
    handleNextMonth: () => void;
    paddingDays: number;
    daysInMonth: Date[];
    handleDayClick: (day: Date) => void;
}


const Calendar: React.FC<CalendarProps> = ({ handlePreviousMonth, isCurrentMonth, currentMonth, handleNextMonth, paddingDays, daysInMonth, handleDayClick }) => {
  return (
<>
  <div className="flex justify-between mb-4">
    <button
      onClick={handlePreviousMonth}
      className={`text-blue-500 hover:text-blue-700 font-semibold ${
        isCurrentMonth ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isCurrentMonth}
    >
      Anterior
    </button>
    <span className="font-semibold text-lg">
      {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
    </span>
    <button
      onClick={handleNextMonth}
      className="text-blue-500 hover:text-blue-700 font-semibold"
    >
      Próximo
    </button>
  </div>
  <div className="grid grid-cols-7 text-center font-semibold mb-2">
    {["S", "T", "Q", "Q", "S", "S","D"].map((dayLabel, index) => (
      <div key={dayLabel + index} className="px-2">
        {dayLabel}
      </div>
    ))}
  </div>
  <div className="grid grid-cols-7 gap-2 text-center">
    {[...Array(paddingDays)].map((_, index) => (
      <div key={`padding-${index}`} className="p-2 text-gray-200">

      </div>
    ))}
    {daysInMonth.map((day) => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const isNonClickable =
        getDay(day) === 0 ||
        getDay(day) === 1 || // Domingo ou Segunda
        (day < currentDate && currentHour >= 18); // Passado das 18h
      return (
        <button
          key={day.toString()}
          className={`p-2 border rounded-lg text-center flex justify-center items-center ${
            isNonClickable
              ? "bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed"
              : "hover:bg-blue-50"
          }`}
          onClick={isNonClickable ? undefined : () => handleDayClick(day)}
          disabled={isNonClickable}
        >
          {format(day, "d", { locale: ptBR })}
        </button>
      );
    })}
  </div>
  </>
  )
}

export default Calendar
