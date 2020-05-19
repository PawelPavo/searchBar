import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        console.log(error)
        next(error)
    };
});

export default router;