import { Request, Response } from 'express';
import { IAuthData } from '../types/authTypes';
import * as authServices from '../services/authServices';


export async function signUp(req: Request, res: Response) {
    const {email, password} = req.body;
    await authServices.create(email, password);

    res.sendStatus(201); 
}

export async function signIn(req: Request, res: Response) {
    const signInData : IAuthData = req.body;
    const token = await authServices.login(signInData);
    
    return res.status(201).send(token); 
}