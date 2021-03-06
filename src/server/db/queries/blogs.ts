import { Query } from '../index';
import type { BlogsT } from '../models';

const all = () => Query<BlogsT[]>('SELECT blogs.*, users.username as name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN users ON users.id = blogs.userid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid ORDER BY blogs.created_at DESC')

const one = (id: string) => Query<BlogsT[]>('SELECT blogs.*, users.username as name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN users ON users.id = blogs.userid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE blogs.id = ? ORDER BY blogs.created_at DESC', [id])

const allFromUser = (id: string) => Query<BlogsT[]>('SELECT blogs.*, users.username as name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN users ON users.id = blogs.userid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE userid = ? ORDER BY blogs.created_at DESC', [id])

const insert = (userid: number, title:string, content:string, image:string) => Query('INSERT INTO blogs (userid, title, content, image_url) VALUES(?)',[[userid, title, content, image]] )

const update = (title:string, content:string, image:string, id:number) => Query('UPDATE blogs SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, image, id])

const destroy = (id:number) => Query('DELETE FROM blogs WHERE id = ?', [id])

const tagSearch = (tagid: number) => Query<BlogsT[]>('SELECT blogs.*, users.username as name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN users ON users.id = blogs.userid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE tagid = ?', [tagid])

// const find = (content:any) => Query<BlogsT[]>(`SELECT blogs.*, authors.name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE content LIKE '%the%';`[content])

const find = (content:any) => Query<BlogsT[]>(`SELECT blogs.*, users.username as name, tags.name as tag_name, blogTags.tagid FROM blogs JOIN users ON users.id = blogs.userid LEFT JOIN blogTags ON blogTags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogTags.tagid WHERE content LIKE ?`,[`%${content}%`])

// const find = (content:any) => Query<BlogsT[]> (`SELECT * FROM blogs WHERE content LIKE ? `, [`%${content}%`])

export default {
    all,
    one,
    insert,
    update,
    destroy,
    find,
    tagSearch,
    allFromUser
}