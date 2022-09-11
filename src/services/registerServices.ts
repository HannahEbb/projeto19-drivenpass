import { registerType } from '@prisma/client';
import * as registersRepositories from '../repositories/registersRepositories';
import { ICards, ICredentials, IRegister, ISafeNotes, IWifi } from '../types/registerTypes';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();

const cryptr = new Cryptr(String(process.env.CRYPTR_SECRET_KEY));

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
    const register = await registersRepositories.findCardById(id);
        if(!register) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return register;
}

if(category === 'credentials') {
    const register = await registersRepositories.findCredentialById(id);
        if(!register) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return register;
}

if(category === 'safenotes') {
    const register = await registersRepositories.findSafeNoteById(id);
        if(!register) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return register;
}

if(category === 'wifi') {
    const register = await registersRepositories.findWifiById(id);
        if(!register) {
            throw { type: 'not_found', message: 'No register from this catagory and id!' };
        }
        return register;
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
    const newData = {registerId, ...data}; 

    if(category === 'cards') {
        newCard(newData);
    }

    if(category === 'credentials') {
        newCredential(newData);
    }

    if(category === 'safenotes') {
        newSafeNote(newData);
    }

    if(category === 'wifi') {
        newWifi(newData);
    }
}

export async function newCard(newData: ICards) {
    const { registerId, title, cardNumber, cardholderName, securityCode, expirationDate, password, isVirtual, type} = newData;

    const [first, ...rest] = cardholderName.split(" ");
    const last = rest.pop();
    const userCardName: string = [first, ...rest.map(n => n[0] + "."), last].join(" ");
    
    const data = {
        registerId,
        title,
        cardNumber,
        cardholderName: userCardName,
        securityCode: cryptr.encrypt(securityCode),
        expirationDate,
        password: cryptr.encrypt(password),
        isVirtual,
        type
    }

    await registersRepositories.createCard(data);
}

export async function newCredential(newData: ICredentials) {
    const { registerId, title, url, user, password} = newData;
    const data = {
        registerId,
        title,
        url,
        user,
        password: cryptr.encrypt(password)
    }

    await registersRepositories.createCredential(data);
}

export async function newSafeNote(newData: ISafeNotes) {
    await registersRepositories.createSafeNote(newData);
}

export async function newWifi(newData: IWifi) {
    const { registerId, title, networkName, password } = newData;   
    const data = {
        registerId,
        title,
        networkName,
        password: cryptr.encrypt(password)
    }
    await registersRepositories.createWifi(data);
}

export async function deleteOneRegister(category: registerType, id: number) {
    
    if(category === 'cards') {
        const register = await registersRepositories.findCardById(id);
            if(!register) {
                throw { type: 'not_found', message: 'No card register with informed id!' };
            }
            const registerId = register.registerId;
            await registersRepositories.deleteCardById(id);
            await registersRepositories.deleteRegisterById(registerId);
    }
    
    if(category === 'credentials') {
        const register = await registersRepositories.findCredentialById(id);
            if(!register) {
                throw { type: 'not_found', message: 'No credential register with informed id!' };
            }
            const registerId = register.registerId;
            await registersRepositories.deleteCredentialsById(id);
            await registersRepositories.deleteRegisterById(registerId);
    }
    
    if(category === 'safenotes') {
        const register = await registersRepositories.findSafeNoteById(id);
            if(!register) {
                throw { type: 'not_found', message: 'No safeNote register with informed id!' };
            }
            const registerId = register.registerId;
            await registersRepositories.deleteSafeNotesById(id);
            await registersRepositories.deleteRegisterById(registerId);
    }
    
    if(category === 'wifi') {
        const register = await registersRepositories.findWifiById(id);
            if(!register) {
                throw { type: 'not_found', message: 'No wifi register with informed id!' };
            }
            const registerId = register.registerId;
            await registersRepositories.deleteWifiById(id);
            await registersRepositories.deleteRegisterById(registerId);
    }
    
    }


