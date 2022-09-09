import { users } from "@prisma/client";


export type IAuthData = Omit<users, 'id' | 'timestamp'>