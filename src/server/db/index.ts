import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql);

export const Query = <T=any> (query?: string, values?:any) => {
    const sql = mysql.format(query, values);
    console.log(sql);

    return new Promise<T> ((resolve, reject) => {
        pool.query(sql, (error, results) => {
            if(error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

import blogs from './queries/blogs'

export default {
    blogs
};