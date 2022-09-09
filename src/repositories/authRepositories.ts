import { users } from '@prisma/client';
import { resourceLimits } from 'worker_threads';
import { prisma } from '../database/database';
import { IAuthData } from '../types/authTypes';

export async function findByEmail(email: string) {
    const result = await prisma.users.findUnique({ where: { email } }); 
    return result;
}

export async function insert(signUpData: IAuthData) {
   await prisma.users.create({ data: signUpData });
} 