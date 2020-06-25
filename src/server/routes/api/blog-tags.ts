import { Router, json } from 'express';
import db from '../../db';
import {blogTagBody} from '../../middleware/blog-tags'

const router = Router();

//GET api/blogTags
router.get('/', async(req,res, next) => {
    try {
        const blogTags = await db.blogTags.all();
        res.json(blogTags);
    } catch (error) {
        next(error);
    };
});

//POST api/blogs
router.post('/', blogTagBody, async(req, res, next) => {
    const blogTags = req.body;
    const tagid = blogTags.tagid
    try {
        const {insertId} = await db.blogTags.insert(blogTags.blogid, tagid);
        res.status(201).json({insertId, msg: 'Blog Inserted'});
    } catch (error) {
        next(error);
    };
});

export default router;