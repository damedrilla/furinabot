import { Router } from 'express';
const router = Router();
import { getMultiple } from '../services/inventory';


router.get('/', async function(req, res, next) {
  try {
    res.json(await getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error geting inventory `, err.message);
    next(err);
  }
});

export default router;