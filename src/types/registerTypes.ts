import { registers, safeNotes, credentials, wifi, cards } from "@prisma/client";

export type IRegister = Omit<registers, 'id' | 'timestamp'>

export type ICards = Omit<cards, 'id' | 'timestamp'>

export type ICredentials = Omit<credentials, 'id' | 'timestamp'>

export type ISafeNotes = Omit<safeNotes, 'id' | 'timestamp'>

export type IWifi = Omit<wifi, 'id' | 'timestamp'>
