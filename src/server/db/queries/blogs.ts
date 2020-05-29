import { Query } from '../index';
import type { BlogsT } from '../models';

const all = () => Query<BlogsT[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid ORDER BY blogs.created_at DESC')

const one = (id: string) => Query<BlogsT[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid WHERE blogs.id = ?', [id])

const insert = (title:string, content:string, authorid:number, image:string) => Query('INSERT INTO blogs (title, content, authorid, image_url) VALUES(?)',[[title, content, authorid, image]] )

const update = (title:string, content:string, image:string, id:number) => Query('UPDATE blogs SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, image, id])

const destroy = (id:number) => Query('DELETE FROM blogs WHERE id = ?', [id])


export default {
    all,
    one,
    insert,
    update,
    destroy
}