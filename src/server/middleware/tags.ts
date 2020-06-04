import {RequestHandler} from 'express';

export const tagsBody: RequestHandler = (req, res, next) => {
    const tagKeys = Object.keys(req.body);
    if (tagKeys.includes('name') ) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request for Blog Insert'});
    };
};