
import React, { useEffect } from 'react'

const RedirectFinaly: React.FC = () => {
    
    useEffect(() => {
      const timer = setTimeout(() => {
        localStorage.clear();
        window.location.href="/"
      }, 5000);
  
      return () => clearTimeout(timer); // Limpar o timer se o componente for desmontado antes de 5 segundos
    }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur bg-white duration-300 animate-scale-in">
    <div className="flex justify-center flex-col items-center w-[80%] max-w-[500px] px-4">
        <h3 className="text-2xl font-bold text-blue-500 text-center">Obrigado.<span className='text-center block'>Seu horário foi agendado!</span></h3>
    </div>
</div>
  )
}

export default RedirectFinaly
