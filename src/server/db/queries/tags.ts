import {Query} from '../index';
import type {TagsT} from '../models'

const all = () => Query<TagsT[]>('SELECT * FROM tags');

export default {
    all,
}
