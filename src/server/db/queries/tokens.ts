import {Query} from '../index';
import type {TTokens, DBResp} from '../models';
import { IPayload } from '../../utils/interfaces';

const insert = (token:IPayload) => {
    delete token.role;
    return Query<DBResp> ('INSERT INTO tokens SET ?', token)
}

const update = (jwt:string, id:number) => Query<DBResp>('UPDATE tokens SET jwt = ? WHERE id = ?' ,[jwt, id])

export default {
    insert,
    update
};