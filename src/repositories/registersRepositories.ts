import { registerType } from '@prisma/client';
import { type } from 'os';
import { prisma } from '../database/database';
import { ICards, ICredentials, IRegister, ISafeNotes, IWifi } from '../types/registerTypes';

export async function findById(userId: number) {
    const result = await prisma.registers.findMany({
        where: {
            userId: { equals: userId }
          },
            include: {
              cards: true,
              credentials: true,
              safeNotes: true,
              wifi: true
            }
    }); 
    return result;
}

export async function findByCategory(userId: number, category: registerType) {
    const result = await prisma.registers.findMany({
        where: {
          userId: { equals: userId },
          type: { equals: category }
        },
          include: {
            cards: true,
            credentials: true,
            safeNotes: true,
            wifi: true
          }
      },
         
    ); 
    
    return result;
}

export async function findLastRegister(userId: number) {
    const result = await prisma.registers.findMany({
        where: {userId},
        orderBy: {
            id: 'desc',
        },
        take: 1
    });

    return result;
}

export async function findCardById( id: number) {
    const result = await prisma.cards.findUnique({
        where: {
            id
          },
    })
    
    return result;
}

export async function findCredentialById( id: number) {
    const result = await prisma.credentials.findUnique({
        where: {
            id
          },
    })
    
    return result;
}

export async function findSafeNoteById( id: number) {
    const result = await prisma.safeNotes.findUnique({
        where: {
            id
          },
    })
    
    return result;
}

export async function findWifiById( id: number) {
    const result = await prisma.wifi.findUnique({
        where: {
            id
          },
    })
    
    return result;
}

export async function createRegister(registerData: IRegister) {
    await prisma.registers.create({ data: registerData });
}

export async function createCard(data: ICards) {
    await prisma.cards.create({ data: data});
}

export async function createCredential(data: ICredentials) {
    await prisma.credentials.create({ data: data});
}

export async function createSafeNote(data: ISafeNotes) {
    await prisma.safeNotes.create({ data: data});
}

export async function createWifi(data: IWifi) {
    await prisma.wifi.create({ data: data});
}
 