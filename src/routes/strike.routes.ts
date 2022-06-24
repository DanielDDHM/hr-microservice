import { Router } from 'express';

import strikeController from '../controllers/strike.controller';

const router = Router();

router.post('/', strikeController.create);
router.delete('/:id', strikeController.destroy);

export default router;