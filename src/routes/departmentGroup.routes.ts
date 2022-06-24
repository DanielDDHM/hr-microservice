import { Router } from 'express';

import departmentGroupController from '../controllers/departmentGroup.controller';

const router = Router();

router.post('/', departmentGroupController.create);
router.get('/:id', departmentGroupController.getById);
router.put('/:id', departmentGroupController.update);
router.delete('/:id', departmentGroupController.destroy)
router.get('/', departmentGroupController.getAll);

export default router;