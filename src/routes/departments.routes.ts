import { Router } from 'express';

import departmentsController from '../controllers/departments.controller';

const router = Router();

router.post('/', departmentsController.create);
router.get('/:id', departmentsController.getById);
router.get('/', departmentsController.getAll);
router.put('/:id', departmentsController.update);
router.delete('/:id', departmentsController.destroy);

export default router;