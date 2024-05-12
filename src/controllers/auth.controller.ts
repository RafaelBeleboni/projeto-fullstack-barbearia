import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

const jwt_secret = process.env.SECRET || "sdh78y384w254$"

const prisma = new PrismaClient();

export const validateLogin = async (req: Request, res: Response) => {
  const { nome, telefone } = req.body; // Certifique-se de que é 'telefone'

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { nome, telefone }, // Use 'telefone' para buscar
    });
    if(!cliente) {
      return res.send("Cliente não encontrado")
    }
  // Gera o token JWT
  const token = jwt.sign({ userId: cliente.id, clientName: cliente.nome }, jwt_secret, {
  expiresIn: "8760000h",
  });
    return res.json({cliente, token})
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao validar login.' });
  }
};
export const validateToken = (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token não fornecido" });
  }
  try {
    const decoded = jwt.verify(
      token,
      jwt_secret
    );
    return res.status(200).json({ valid: true, token: decoded});
  } catch (error) {
    console.error("Erro ao validar token:", error);
    res.status(401).json({ valid: false });
  }
};