import { Router, json } from 'express';
import db from '../../db';

const router = Router();

//GET api/tags
router.get('/', async(req,res, next) => {
    try {
        const tags = await db.tags.all();
        res.json(tags);
    } catch (error) {
        next(error);
    };
});


export default router;