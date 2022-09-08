import { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

export function hasToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      throw { type: 'unauthorized', message: 'invalid api key' };
    }
  
    next();
  }

export function tokenValidation(req: Request, res: Response, next: NextFunction) {
    hasToken(req, res, next);

    const auth = req.headers['authorization'];
    const token = auth.split(" ")[1];
        
    verify(token, process.env.JWT_KEY); //ler documentacao

        //if verificacao falhar (verifica email valido e data de expircao), throw...

    next();
    
}