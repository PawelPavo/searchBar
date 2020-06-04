import {Query} from '../index';
import type {BlogTagsT} from '../models'

const all = () => Query<BlogTagsT[]>('SELECT * FROM blogTags');

const insert = (blogid:number, tagid:number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?)',[[ blogid, tagid ]])


export default {
    all,
    insert,
}