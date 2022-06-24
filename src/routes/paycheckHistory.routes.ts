import { Router } from 'express';

import paycheckHistoryController from '../controllers/paycheckHistory.controller';

const router = Router();

router.post('/', paycheckHistoryController.create);

export default router;