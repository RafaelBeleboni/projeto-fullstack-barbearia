'use client'; // Para garantir que o componente é um Client Component

import React, { useState } from 'react'; // Importa useState para gerenciar estados
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiBase from '@/api/apiBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPhoneNumberInput } from '@/utils/utils';

export default function LoginPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nome.length < 3) {
      toast.warn('O nome deve ter pelo menos 3 letras!', {
        position: "top-right",
        autoClose: 1900,
      });
      return;
    }
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      toast.error('O telefone deve estar no formato (99) 99999-9999.', { autoClose: 1900 });
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    const formData = {
      nome,
      telefoneLimpo
    };

    try {
      const response = await apiBase.post("/auth/login", formData);
      if(response.status === 200) {
        localStorage.setItem("@Cliente", JSON.stringify(response.data.cliente));
        localStorage.setItem("@Token", response.data.token);
        router.push('/dashboard'); // Redirecionar para a página de dashboard
      }else{
        toast.error("Ops..Algo deu errado.", {autoClose:1900})
      }

    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor');
    }
  };

  const handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleOnPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    let { value } = event.target;

   setTelefone(formatPhoneNumberInput(value))
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
        <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {errorMessage && ( // Exibe a mensagem de erro se ela existir
            <div className="text-red-600 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Campo Nome */}
            <div className="mb-4">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome:
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="mt-1 block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Digite seu nome"
                onChange={handleOnNameChange}
              />
            </div>

            {/* Campo Celular */}
            <div className="mb-4">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Celular:
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                className="mt-1 block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Digite seu número de celular"
                value={telefone}
                onChange={handleOnPhoneChange}
                maxLength={15} // Define o comprimento máximo para (99) 99999-9999
              />
            </div>

            {/* Botão para Login */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              >
                Entrar
              </button>
            </div>

            {/* Botão para Cadastro */}
            <div className="mt-6 text-center">
              <Link href="/cadastro">
                <button className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                  Cadastrar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
