import { registerType } from '@prisma/client';
import { Request, Response } from 'express';
import * as registersServices from '../services/registerServices';


export async function getAllRegisters(req: Request, res: Response) {
    const userId : number = 1 // = res.locals

    const registers = await registersServices.getAll(userId);
    
    return res.status(200).send(registers); 
}

export async function getCategoryRegisters(req: Request, res: Response) {
    const userId : number = 1 // = res.locals
    const { category } : any = req.params;

    const registers = await registersServices.getAllFromCategory(userId, category);
    
    return res.status(200).send(registers); 
}

export async function getOneRegister(req: Request, res: Response) {
    const { category, id } : any = req.params;

    const registers = await registersServices.getOneRegister(category, id);
    
    return res.status(200).send(registers); 
}

export async function postCategoryRegister(req: Request, res: Response) {
    const userId : number = 1 //res.locals
    const { category } : any = req.params;
    const { data } : any = req.body; //pode ser de um dos 4 formatos >> vou definir no service

    await registersServices.newRegister(userId, category, data);

}