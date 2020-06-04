import { Query } from '../index';
import type { BlogsT } from '../models';

const all = () => Query<BlogsT[]>('SELECT blogs.*, authors.name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid ORDER BY blogs.created_at DESC')

const one = (id: string) => Query<BlogsT[]>('SELECT blogs.*, authors.name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE blogs.id = ? ORDER BY blogs.created_at DESC', [id])

const insert = (title:string, content:string, authorid:number, image:string) => Query('INSERT INTO blogs (title, content, authorid, image_url) VALUES(?)',[[title, content, authorid, image]] )

const update = (title:string, content:string, image:string, id:number) => Query('UPDATE blogs SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, image, id])

const destroy = (id:number) => Query('DELETE FROM blogs WHERE id = ?', [id])

const tagSearch = (tagid: number) => Query<BlogsT[]>('SELECT blogs.*, authors.name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE tagid = ?', [tagid])

// const tagSearch = (tagid: number) => Query<BlogsT[]>('SELECT blogs.*, authors.name, tags.name as tag_name FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE tagid = ?', [tagid])


export default {
    all,
    one,
    insert,
    update,
    destroy,
    tagSearch
}