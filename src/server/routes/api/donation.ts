import * as express from 'express';
import { Router } from 'express';
import config from '../../config'

const router = Router()

const stripe = require('stripe')(config.keys.stripe)

const charge = (id: string, amount: number) => {
    return stripe.charges.create({
        amount: amount*100,
        currency: 'usd',
        source:id,
        description: 'Statement Description'
    });
};

router.post('/', async (req, res, next) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount)
        res.send('Charged!')
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

export default router;