import useChoiceStore from "@/store/typeChoiceStore";
import React from "react";

const ConfirmBoxModal: React.FC = () => {
    const { setConfirmed } = useChoiceStore();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        let value = e.currentTarget.value;
        setConfirmed(value === "true");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur duration-300 animate-scale-in backdrop-brightness-50">
            <div className="flex justify-center flex-col items-center w-[80%] max-w-[500px] px-4">
                <h3 className="text-2xl font-bold text-white">Confirme seu agendamento</h3>
                <div className="py-4 flex flex-col gap-4 w-full">
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
