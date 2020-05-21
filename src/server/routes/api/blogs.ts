import db from '../../db';
import { Router } from 'express';
import { ReqUser } from '../../utils/interfaces';
import { blogBody } from '../../middleware/blogs';

const router = Router();

router.get('/', async (req: ReqUser, res, next) => {
    try {
        const blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        console.log(error)
        next(error)
    };
});

router.get('/:id',async (req: ReqUser, res, next) => {
    const id = req.params.id;
    try {
        const [blog] = await db.blogs.one(id)
        res.json(blog);
        console.log(blog, id)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', blogBody, async (req: ReqUser, res, next) => {
    const blog = req.body;
    try {
        const newBlog = await db.blogs.insert(blog.title, blog.content, blog.authorid, blog.image_url)
        res.status(201).json({msg:'Blog Inserted'})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default router;