import db from "../../db";
import { Router } from "express";
import { ReqUser } from "../../utils/interfaces";
import { commentBody } from "../../middleware/comments";
import * as passport from "passport";


const router = Router();

router.get('/', async (req: ReqUser, res, next) => {
    const blogid = Number(req.params.blogid);
    try {
        const comments = await db.comments.allComments()
        res.json(comments);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/:id', async (req: ReqUser, res, next) => {
    const id = (req.params.id);
    try {
        const comments = await db.comments.allForBlog(id)
        res.json(comments);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/',passport.authenticate('jwt'), commentBody, async (req: ReqUser, res, next) => {
    const comment = req.body;
    const userid = req.user.id
    try {
        const { insertId } = await db.comments.insert(comment.blogid, userid, comment.username, comment.user_comment)
        res.status(201).json({ insertId, msg: 'Comment CREATED' })
        console.log(req.params)
    } catch (error) {
        console.log({error, msg:'Something wrong in insert route'})
        next(error)
    }
})

router.get('/count/:id', async (req: ReqUser, res, next) => {
    const id = (req.params.id);
    try {
        const comments = await db.comments.count(id)
        res.json(comments);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/:id', async(req:ReqUser, res, next) => {
    const id = Number(req.params.id);
    try {
        const result = await db.comments.destroy(id)
        res.status(200).json({msg: 'Comment DELETED', result} )
    } catch (error) {
        console.log(error)
        next(error)
    }
})


export default router;