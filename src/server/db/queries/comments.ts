import { Query } from '../index';
import { CommentsT } from '../models'

const allComments = () => Query<CommentsT[]>('SELECT * FROM comments ORDER BY comments.created_at DESC');

const allForBlog = (blogid:string) => Query<CommentsT[]>('SELECT * FROM comments WHERE blogid  = ? ORDER BY comments.created_at DESC', [blogid]);

const insert = (blogid:any, username:string, user_comment:string) => Query('INSERT INTO comments (blogid, username, user_comment) VALUES(?)',[[blogid, username, user_comment]] )

export default {
    allComments,
    allForBlog,
    insert
}