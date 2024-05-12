import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwt_secret = process.env.SECRET || "sdh78y384w254$"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); 
    if (!token) { 
      return res.status(401).json({ error: "Token não fornecido." });
    }
    jwt.verify(token, jwt_secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido." });
      }
      res.locals.userId = decoded.userId; // Adiciona o ID do usuário decodificado ao objeto de requisição
      return next();
    });
  };
  