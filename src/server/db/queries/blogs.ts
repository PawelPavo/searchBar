import { Query } from '../index';
import type { BlogsT } from '../models';

const all = () => Query<BlogsT[]>('SELECT blogs.*, authors.name FROM blogs JOIN authors ON authors.id = blogs.authorid ORDER BY blogs.created_at DESC')

export default {
    all
}