import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/main.routes'; // Importa as rotas principais

const app = express();

// Middleware para CORS e JSON
app.use(cors());
app.use(express.json());

// Use o roteador principal para gerenciar rotas
app.use('/api', mainRoutes); // Rota raiz para APIs

export default app;
