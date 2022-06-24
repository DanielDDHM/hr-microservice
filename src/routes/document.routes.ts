import { Router } from 'express';

import documentController from '../controllers/document.controller';

const router = Router();

router.post('/', documentController.create);
router.put('/:id', documentController.update);
router.delete('/:id', documentController.destroy);

export default router; 