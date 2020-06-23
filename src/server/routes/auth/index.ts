import * as express from 'express';
import registerRouter from './register';
import loginRouter from './login';
import profileRouter from './profile';



const router = express.Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/profile', profileRouter);

export default router;