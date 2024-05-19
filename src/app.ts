import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mainRoutes from './routes/main.routes'; // Importa as rotas principais

const app = express();

// Middleware para configurar CORS para permitir todas as origens
app.use((req: Request, res: Response, next: NextFunction) => {
    // Permite requisições de qualquer origem
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    // Define métodos HTTP permitidos para CORS
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS, CONNECT, TRACE"
    );
    
    // Define headers permitidos em requisições CORS
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
  
    // Permite o envio de cookies e credenciais em requisições cross-origin
    // Nota: Quando o `Access-Control-Allow-Origin` é configurado para '*', o `Access-Control-Allow-Credentials` deve ser 'false'.
    res.setHeader("Access-Control-Allow-Credentials", "false");
    
    // Permite requisições de redes privadas
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    
    // Define o tempo máximo em segundos que a resposta ao preflight request pode ser cacheada
    res.setHeader("Access-Control-Max-Age", "7200");
  
    next();
  });
  

app.use(express.json());

// Use o roteador principal para gerenciar rotas
app.use('/api', mainRoutes); // Rota raiz para APIs

export default app;
