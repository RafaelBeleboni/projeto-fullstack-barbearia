// Primeiro, certifica-se de que o componente é um Client Component
'use client';

import { useRouter } from 'next/navigation'; // Use 'next/navigation' em vez de 'next/router'
import Link from 'next/link';
import React from 'react';

const Cadastro: React.FC = () => {
  const router = useRouter(); // Agora, isto funcionará porque o componente é cliente

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nomeInput = event.currentTarget.elements.namedItem('nome') as HTMLInputElement;
    const telefoneInput = event.currentTarget.elements.namedItem('telefone') as HTMLInputElement;

    const nome = nomeInput.value;
    const telefone = telefoneInput.value;

    try {
      const response = await fetch('http://localhost:3001/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone }),
      });

      if (response.ok) {
        console.log('Cliente cadastrado com sucesso');
        alert("Cadastro realizado com sucesso!")
        router.push('/'); // Redirecionar para a página de login ou outra página
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar cliente:', error);
        alert("Número já cadastrado");
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
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
            />
          </div>

          {/* Campo Celular */}
          <div className="mb-4">
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Celular:
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              className="mt-1 block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Digite seu número de celular"
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
