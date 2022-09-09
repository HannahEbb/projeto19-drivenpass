import { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from "dotenv";

dotenv.config();


export function tokenValidation(req: Request, res: Response, next: NextFunction) {

    const auth = req.headers['authorization'];
    if(!auth) {
      throw { type: 'unauthorized', message: 'invalid token!' };
    } 

    const token: string = auth.split(" ")[1];
    const key: string = JSON.stringify(verify(token, `${process.env.JWT_KEY}`));
    //ler documentacao
    //if verificacao falhar (verifica email valido e data de expircao), throw...

    next();
    
}