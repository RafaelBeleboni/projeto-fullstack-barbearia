import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState('');

  // Carregar horários disponíveis ao montar o componente
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/horarios/disponiveis');
        setHorarios(response.data);
      } catch (error) {
        setError('Erro ao carregar horários disponíveis.');
      }
    };

    fetchHorarios();
  }, []);

  // Função para agendar um horário
  const handleAgendar = async (horarioId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/agendamentos', {
        horarioDisponivelId: horarioId,
        clienteId: 1, // ID do cliente, que deve ser dinâmico
        tipoCorte: 'Corte de Cabelo', 
        status: 'Agendado',
      });

      if (response.status === 201) {
        alert('Agendamento realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao agendar horário:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Agendamentos</h1>
      {error && <p className="error">{error}</p>}
      <div className="horarios-list">
        {horarios.map((horario) => (
          <div key={horario.id} className="horario-item">
            <p>
              Data: {new Date(horario.data).toLocaleDateString()} <br />
              Horário: {horario.horario}
            </p>
            <button onClick={() => handleAgendar(horario.id)}>Agendar</button> {/* Botão para agendar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
