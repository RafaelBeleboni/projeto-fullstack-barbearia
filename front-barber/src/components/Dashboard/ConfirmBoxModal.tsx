import useChoiceStore from "@/store/typeChoiceStore";
import React from "react";

const ConfirmBoxModal: React.FC = () => {
    const { setConfirmed, selectedTime, selectedDay } = useChoiceStore();
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
    
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };
    
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(e.currentTarget.value === "false") {
            window.location.reload();
            return;
        }
        let value = e.currentTarget.value;
        setConfirmed(value === "true");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur duration-300 animate-scale-in backdrop-brightness-50">
            <div className="flex justify-center flex-col items-center w-[80%] max-w-[500px] px-4">
                <h3 className="text-2xl font-bold text-white">Confirme seu agendamento</h3>
                <div className="py-4 flex flex-col gap-4 w-full">
                    <p className="text-white text-center">{formatDate(selectedDay)} às {selectedTime}</p>
                    <div className="flex justify-center items-center gap-4">
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg" value="true" onClick={handleOnClick}>Sim</button>
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg" value="false" onClick={handleOnClick}>Não</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBoxModal;
