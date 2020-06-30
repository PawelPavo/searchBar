import {Router} from 'express';
import donationRouter from './donation';
import contactRouter from './contact';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogTagsRouter from './blog-tags';
import commentsRouter from './comments';
import searchFoodRouter from './food-search';

const router = Router()

router.use('/donate', donationRouter);
router.use('/contact', contactRouter);
router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter)
router.use('/blogTags', blogTagsRouter)
router.use('/comments', commentsRouter)
router.use('/searchFood', searchFoodRouter)

export default router;