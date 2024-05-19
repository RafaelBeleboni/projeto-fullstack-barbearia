'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiBase from '@/api/apiBase';
import { formatPhoneNumberInput } from '@/utils/utils';

const Cadastro: React.FC = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nome.length < 3) {
      toast.error('O nome deve conter no mínimo 3 caracteres.', { autoClose: 1900 });
      return;
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      toast.error('O telefone deve estar no formato (99) 99999-9999.', { autoClose: 1900 });
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    try {
      const response = await apiBase.post('/clientes', {nome, telefone: telefoneLimpo})
      if (response.status === 201) {
        toast.success('Cadastro realizado com sucesso!', { autoClose: 1900 });
        setTimeout(() => router.push('/'), 3000);
      }
    } catch (error:any) {
      toast.error(error.response.data.error, { autoClose: 1900 });
    }
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    let { value } = event.target;

   setTelefone(formatPhoneNumberInput(value))
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastro de Cliente</h2>

        <form onSubmit={handleSubmit}>
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              onChange={handleTelefoneChange}
            />
          </div>

          {/* Botão para Cadastrar */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Cadastrar
            </button>
          </div>

          {/* Link para Login */}
          <div className="mt-4 text-center">
            <Link href="/">
              <span className="text-indigo-600 hover:underline">Já tem uma conta? Faça login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
