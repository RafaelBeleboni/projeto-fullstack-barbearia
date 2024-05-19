import useChoiceStore from "@/store/typeChoiceStore";
import React from "react";

const TypeChoiceModal: React.FC = () => {
    const { setSelectedChoice } = useChoiceStore();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        setSelectedChoice(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur duration-300 animate-scale-in backdrop-brightness-50">
            <div className="flex justify-center flex-col items-center w-[80%] max-w-[500px] px-4">
                <h3 className="text-2xl font-bold text-white">Selecione o tipo de serviço</h3>
                <div className="py-4 flex flex-col gap-4 w-full">
                    <button
                        onClick={handleOnClick}
                        value="Cabelo"
                        className="w-full h-[2.5rem] rounded-xl bg-white hover:bg-gray-200"
                    >
                        Cabelo
                    </button>
                    <button
                        onClick={handleOnClick}
                        value="Barba"
                        className="w-full h-[2.5rem] rounded-xl bg-white hover:bg-gray-200"
                    >
                        Barba
                    </button>
                    <button
                        onClick={handleOnClick}
                        value="Cabelo : Barba"
                        className="w-full h-[2.5rem] rounded-xl bg-white hover:bg-gray-200"
                    >
                        Cabelo e Barba
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypeChoiceModal;
