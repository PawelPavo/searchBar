import {Router} from 'express';
import donationRouter from './donation';
import contactRouter from './contact';
import blogsRouter from './blogs';


const router = Router()

router.use('/donate', donationRouter);
router.use('/contact', contactRouter);
router.use('/blogs', blogsRouter);


export default router;