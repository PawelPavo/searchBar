import * as express from 'express';
import sendEmail from '../../utils/mailgun';
import config from '../../config'
import cron from '../../utils/cron'

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await sendEmail(config.keys.admin, req.body.email, req.body.subject, req.body.message);
        res.send('Email sent.')
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

export default router;