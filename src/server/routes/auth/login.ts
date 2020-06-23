import * as express from 'express';
import * as passport from 'passport';
import { createToken } from '../../utils/tokens';
import type { ReqUser } from '../../utils/interfaces';


const router = express.Router()

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {

    const userDTO = req.user

    try {
        const token = await createToken({userid: userDTO.id, role: userDTO.role });
        res.json({
            token,
            role: userDTO.role,
            user: userDTO.id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in local strategy.')
    }
})

export default router