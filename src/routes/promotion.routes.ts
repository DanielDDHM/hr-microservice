import { Router } from 'express';

import promotionController from '../controllers/promotion.controller';

const router = Router();

router.post('/', promotionController.create);
router.delete('/:id', promotionController.destroy);

export default router;  