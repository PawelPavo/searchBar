import * as path from 'path'
import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import apiRouter from './routes';

import './middleware/passportjwt';
import './middleware/localstrategy';


const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize())
app.use(apiRouter);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
