import db from '../../db';
import { Router } from 'express';
import { ReqUser } from '../../utils/interfaces';
import { blogBody } from '../../middleware/blogs';
import * as passport from 'passport'

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

router.get('/search',async (req:ReqUser, res, next)=>{
    const {content} = req.body
    try {
        const blog = await db.blogs.find(content)
        res.json(blog)
    } catch (error) {
        console.log({error, msg:'Search is not working'})
        next(error)
    }
})

router.get('/search/:content',async (req:ReqUser, res, next)=>{
    const content = req.params.content
    try {
        const blog = await db.blogs.find(content)
        res.json(blog)
    } catch (error) {
        console.log({error, msg:'Search is not working'})
        next(error)
    }
})

router.get('/tags/:id',async (req: ReqUser, res, next) => {
    const id = Number(req.params.id)
    try {
        const blogs = await db.blogs.tagSearch(id)
        res.json(blogs);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

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
    const userid = req.user.id
    try {
        const {insertId} = await db.blogs.insert(userid, blog.title, blog.content, blog.authorid, blog.image_url)
        await db.blogTags.insert(insertId, blog.tagid)
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