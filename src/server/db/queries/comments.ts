import { Query } from '../index';
import { CommentsT } from '../models'

const allComments = () => Query<CommentsT[]>('SELECT comments.*, users.email as name FROM comments JOIN users ON users.id = comments.userid ORDER BY comments.created_at DESC');

const allForBlog = (blogid:string) => Query<CommentsT[]>('SELECT comments.*, users.email as name FROM comments JOIN users ON users.id = comments.userid WHERE blogid  = ? ORDER BY comments.created_at DESC', [blogid]);

const insert = (blogid:any, userid: number, user_comment:string) => Query('INSERT INTO comments (blogid, userid, user_comment) VALUES(?)',[[blogid, userid, user_comment]] )

const destroy = (id:number) => Query('DELETE FROM comments WHERE id = ?', [id])

const count = (blogid:any) => Query('SELECT COUNT(user_comment) as count FROM comments WHERE blogid = ?', [blogid])

export default {
    allComments,
    allForBlog,
    insert,
    count,
    destroy
}