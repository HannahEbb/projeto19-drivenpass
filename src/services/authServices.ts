import * as authRepositories from '../repositories/authRepositories';
import { hashSync, compareSync } from 'bcrypt';
import bcrypt from 'bcrypt'; 
import { IAuthData } from '../types/authTypes';
import { users } from '@prisma/client';
import { string } from 'joi';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';



export async function create(email: string, password: string) {
    const emailIsRegistered = await authRepositories.findByEmail(email); //verifica se o email já é cadastrado no banco
    if(emailIsRegistered) {
        throw { type: 'conflict', message: 'This email already exists!' };
    }

    const hashPassword = hashSync(password, Number(process.env.HASH_SECRET));

    const signUpData = {email, password: hashPassword}

    await authRepositories.insert(signUpData);

}

export async function login(signInData: IAuthData) {
    const { email, password } = signInData;
    const emailIsRegistered = await authRepositories.findByEmail(email) //verifica se o email já é cadastrado no banco
    if(!emailIsRegistered) {
        throw { type: 'unauthorized', message: 'Incorrect email or password!' };
    }
 
    const passwordCrypt = compareSync(password, emailIsRegistered.password); 
    if(!passwordCrypt) {
        throw { type: 'unauthorized', message: 'Incorrect email or password!!' };
    }

    const userSessionData = {
        userId: emailIsRegistered.id,
        name: emailIsRegistered.password,
        expiresIn: dayjs().add(40, 'minutes').format('LLLL')   
    }

    const token = JSON.stringify(jwt.sign(userSessionData, `${process.env.JWT_SECRET}`)); 
    
    return token;
}