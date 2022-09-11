import { Request, Response } from 'express';
import * as registersServices from '../services/registerServices';


export async function getAllRegisters(req: Request, res: Response) {
    const userId : number = 1 // = res.locals

    const registers = await registersServices.getAll(userId);
    
    return res.status(200).send(registers); 
}

export async function getCategoryRegisters(req: Request, res: Response) {
    const userId : number = 2 // = res.locals
    const { category } : any = req.params;

    const registers = await registersServices.getAllFromCategory(userId, category);
    
    return res.status(200).send(registers); 
}

export async function getOneRegister(req: Request, res: Response) {
    const { category, id } : any = req.params;

    const registers = await registersServices.getOneRegister(category, Number(id));
    
    res.status(200).send(registers); 
}

export async function postCategoryRegister(req: Request, res: Response) {
    const userId : number = 2 //res.locals
    const { category } : any = req.params;
    const data : any = req.body; 

    await registersServices.newRegister(userId, category, data);

    res.status(200).send({message: 'Successful register.'});

}

export async function deleteOneRegister(req: Request, res: Response) {
    const { category, id } : any = req.params;

    await registersServices.deleteOneRegister(category, Number(id));
    
    res.status(200).send({message: 'Register deleted successfully by the user.'});
}