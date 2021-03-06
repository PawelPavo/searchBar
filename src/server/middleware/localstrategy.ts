import * as passport from 'passport';
import * as localStrategy from 'passport-local'
import db from '../db';
import { comparePassword } from '../utils/passwords';

passport.use(new localStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => { 
    try {
        
        const [user] = await db.users.find('email', email)
        if (user?.password && comparePassword(password, user.password)) {
            delete user.password;
            done(null, user)
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error)
    }
}));