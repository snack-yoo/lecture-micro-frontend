import {compare as c, hash} from 'bcrypt';

export const encrypt = async (plainText: string): Promise<string> => {
    return await hash(plainText, 1);
}

export const compare = async (plainText: string, encrypted: string): Promise<boolean> => {
    return await c(plainText, encrypted);
}