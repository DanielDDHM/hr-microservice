import { Router } from 'express';

import addressController from '../controllers/address.controller';

const router = Router();

router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.delete('/:id', addressController.destroy);

export default router;