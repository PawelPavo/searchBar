import { TUsers } from "../db/models";
import { Request } from 'express'

export interface ReqUser extends Request {
    user: TUsers;
}