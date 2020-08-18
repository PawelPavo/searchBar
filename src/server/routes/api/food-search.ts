//@ts-nocheck

import * as fetch from 'node-fetch'
import { Router } from 'express';
import config from '../../config'

const router = Router();
const apiKey = config.keys.spoonacular

router.get('/:searchFood', async (req, res, next) => {
  const {searchFood} = req.params
  console.log(searchFood)
  const foodRes = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchFood}&number=5&apiKey=${apiKey}`)
  const data = await foodRes.json()
  res.json(data)
});

export default router;