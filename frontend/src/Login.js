import React, { useState } from 'react';
import axios from 'axios'; // Para requisições HTTP
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(''); // Para exibir mensagens de erro

  const navigate = useNavigate(); // Para redirecionar em caso de sucesso

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || phone.trim() === '') {
      setError('Nome e telefone são obrigatórios.');
      return;
    }

    try {
      // Enviar dados ao backend para validação de login
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        nome: name,
        telefone: phone,
      });

      if (response.status === 200) {
        // Login bem-sucedido, redirecionar para outra página (exemplo)
        navigate('/dashboard');
      }
    } catch (error) {
      // Se houver erro, exibir mensagem apropriada
      setError('Nome ou telefone incorreto.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/cadastro'); // Redirecionar para a página de cadastro
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        {error && <p className="error">{error}</p>} {/* Exibir erro, se houver */}
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
          <label htmlFor="phone">Celular</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Entrar</button>
        <button type="button" onClick={handleRegisterClick}>Cadastrar</button>
      </form>
    </div>
  );
};

export default Login;
