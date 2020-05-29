import db from '../../db';
import { Router } from 'express';
import { ReqUser } from '../../utils/interfaces';
import { blogBody } from '../../middleware/blogs';
import * as passport from 'passport'

const router = Router();

router.get('/',passport.authenticate('jwt'), async (req: ReqUser, res, next) => {
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
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/' ,passport.authenticate('jwt'), blogBody, async (req: ReqUser, res, next) => {
    const blog = req.body;
    try {
        const newBlog = await db.blogs.insert(blog.title, blog.content, blog.authorid, blog.image_url)
        res.status(201).json({msg:'Blog CREATED'})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.put('/:id',passport.authenticate('jwt'), async(req:ReqUser, res, next) => {
    const id = Number(req.params.id);
    const blogTitle = req.body.title;
    const blogContent = req.body.content;
    const blogImage = req.body.image_url
    try {
        const results = await db.blogs.update(blogTitle, blogContent,blogImage, id)
        res.status(200).json({msg: 'Blog UPDATED', results})
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',passport.authenticate('jwt'), async(req:ReqUser, res, next) => {
    const id = Number(req.params.id);
    try {
        const result = await db.blogs.destroy(id)
        res.status(200).json({msg: 'Blog DELETED', result} )
    } catch (error) {
        console.log(error)
        next(error)
    }
})


export default router;