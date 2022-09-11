// REF: çreate an userpayload interface: https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data 

import { NextFunction, Request, Response } from 'express';
import pkg, { JwtPayload } from 'jsonwebtoken';
const { verify } = pkg;
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { ITokenInterface } from '../types//authTypes';

dotenv.config();


export function tokenValidation(req: Request, res: Response, next: NextFunction) {

    const auth = req.headers['authorization'];
    if(!auth) {
      throw { type: 'unauthorized', message: 'Missing token!' };
    } 

    const token: string = auth.split(' ')[1];
    const SECRET: string = process.env.JWT_KEY ?? '';

  console.log('entrei no tokenValidator');
  console.log(token);
  console.log(SECRET);

  
      const tokenVerify = jwt.verify(token, SECRET, (err, decoded: any) => {
        if(err){
           console.log(err);
          
          // throw {type: 'unauthorized', message: 'invalid token'};
       }

      //  res.locals = {
      //      userId: decoded.userId
      //  };
  }); console.log(tokenVerify);

    next();
    
}