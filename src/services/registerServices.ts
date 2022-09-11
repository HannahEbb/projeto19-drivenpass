import { registerType } from '@prisma/client';
import * as registersRepositories from '../repositories/registersRepositories';
import { ICards, ICredentials, IRegister, ISafeNotes, IWifi } from '../types/registerTypes';

export async function getAll(userId: number) {

    const allRegisters = await registersRepositories.findById(userId);
        if(!allRegisters) {
            throw { type: 'not_found', message: 'No registers yet!' };
        }

return allRegisters;

}

export async function getAllFromCategory(userId: number, category: registerType) {

    const allCategoryRegisters = await registersRepositories.findByCategory(userId, category);
        if(!allCategoryRegisters) {
            throw { type: 'not_found', message: 'No registers yet!' };
        }

return allCategoryRegisters;

}

export async function getOneRegister(category: registerType, id: number) {
    
if(category === 'cards') {
    const regiter = await registersRepositories.findCardById(id);
        if(!regiter) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return regiter;
}

if(category === 'credentials') {
    const regiter = await registersRepositories.findCredentialById(id);
        if(!regiter) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return regiter;
}

if(category === 'safeNotes') {
    const regiter = await registersRepositories.findSafeNoteById(id);
        if(!regiter) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return regiter;
}

if(category === 'wifi') {
    const regiter = await registersRepositories.findWifiById(id);
        if(!regiter) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return regiter;
}

}

export async function newRegister(userId: number, category: registerType, data: any) {
    const registerData: IRegister = {
        userId: userId,
        type: category
    }
    
    await registersRepositories.createRegister(registerData);

    newRegisterByCategory(userId, category, data);
    
}

export async function newRegisterByCategory(userId: number, category: registerType, data: any) {

    const register = await registersRepositories.findLastRegister(userId);
    if(!register) {
        throw { type: 'not_found', message: 'Register not found!' };
    }

    const registerId: number = register[0].id;
    const newData = {registerId, ...data}; //inserir id em data!!

    if(category === 'cards') {
        newCard(newData);
    }

    if(category === 'credentials') {
        newCredential(newData);
    }

    if(category === 'safeNotes') {
        newSafeNote(newData);
    }

    if(category === 'wifi') {
        newWifi(newData);
    }
}

export async function newCard(newData: ICards) {
    await registersRepositories.createCard(newData);
}

export async function newCredential(newData: ICredentials) {
    await registersRepositories.createCredential(newData);
}

export async function newSafeNote(newData: ISafeNotes) {
    await registersRepositories.createSafeNote(newData);
}

export async function newWifi(newData: IWifi) {
    await registersRepositories.createWifi(newData);
}


