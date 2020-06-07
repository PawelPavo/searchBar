import db from "../../db";
import { Router } from "express";
import { ReqUser } from "../../utils/interfaces";
import { commentBody } from "../../middleware/comments";


const router = Router();

router.get('/', async (req: ReqUser, res, next) => {
    const blogid = Number(req.params.blogid);
    console.log(req)
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
    console.log(req.params.id)
    try {
        const comments = await db.comments.allForBlog(id)
        res.json(comments);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', commentBody, async (req: ReqUser, res, next) => {
    const comment = req.body;
    try {
        const { insertId } = await db.comments.insert(comment.blogid, comment.username, comment.user_comment)
        res.status(201).json({ insertId, msg: 'Comment CREATED' })
    } catch (error) {
        console.log(error)
        next(commentBody)
    }
})


export default router;