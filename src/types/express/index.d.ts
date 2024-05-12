import { User } from '../user'; // Importa o tipo User

declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Agora 'user' é uma propriedade opcional em Request
  }
}
