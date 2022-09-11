import { users } from "@prisma/client";


export type IAuthData = Omit<users, 'id' | 'timestamp'>

export interface ITokenInterface {
    user: {
       userId: number;
    };
  }