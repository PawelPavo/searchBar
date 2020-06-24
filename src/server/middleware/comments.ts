import {RequestHandler} from 'express';

export const commentBody: RequestHandler = (req, res, next) => {
    const commentKeys = Object.keys(req.body);
    if (commentKeys.includes('blogid') && commentKeys.includes('user_comment')) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request in middleware!'});
    };
};