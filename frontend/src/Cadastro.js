import React, { useState } from 'react';
import axios from 'axios'; // Importa o axios para fazer requisições HTTP
import './Cadastro.css'; // Estilos para a página de cadastro
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Cadastro = () => {
  const [name, setName] = useState('');
  const [celular, setCelular] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faça uma requisição POST ao backend para cadastrar o cliente
      const response = await axios.post('http://localhost:3001/api/clientes', {
        nome: name,
        telefone: celular,
      });

      console.log('Cliente cadastrado:', response.data);
      // Você pode adicionar mais lógica aqui, como redirecionar ou exibir uma mensagem de sucesso
      alert("Cadastro realizado com sucesso")
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert("Telefone já cadastrado")
      // Adicione lógica para lidar com erros, como exibir uma mensagem de erro
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastrar</h2>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="celular">Celular</label>
          <input
            type="text"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
