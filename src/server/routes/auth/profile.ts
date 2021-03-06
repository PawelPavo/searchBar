import * as express from 'express';
import * as passport from 'passport';
import type { ReqUser } from '../../utils/interfaces';

const router = express.Router();

router.get('/', passport.authenticate('jwt'), (req: ReqUser, res) => {
    res.json(req.user)
})

export default router;