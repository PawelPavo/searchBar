import { TUsers } from "../db/models";
import { Request } from 'express'

export interface ReqUser extends Request {
    user: TUsers;
}

export type IPayload = {
    userid?: number;
    uniq?: string;
    tokenid?: number;
    role?: string;
}