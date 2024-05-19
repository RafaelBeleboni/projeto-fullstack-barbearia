import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/main.routes'; // Importa as rotas principais

const app = express();

const corsOptions = {
    origin: 'https://projeto-fullstack-barbearia.vercel.app', // Substitua esta URL pela URL do seu front-end
    optionsSuccessStatus: 200 // Alguns navegadores legados necessitam deste status
};

app.use(cors(corsOptions));

app.use(express.json());

// Use o roteador principal para gerenciar rotas
app.use('/api', mainRoutes); // Rota raiz para APIs

export default app;
