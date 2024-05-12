import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Dashboard from './Dashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Rota para o login */}
      <Route path="/cadastro" element={<Cadastro />} /> {/* Rota para cadastro */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Corrigida rota do dashboard */}
    </Routes>
  </Router>
);

export default App;
