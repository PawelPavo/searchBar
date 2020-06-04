import {RequestHandler} from 'express';

export const blogTagBody: RequestHandler = (req, res, next) => {
    const blogTagBody = Object.keys(req.body);
    if (blogTagBody.includes('blogid') && blogTagBody.includes('tagid')) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request for Blog Insert'});
    };
};