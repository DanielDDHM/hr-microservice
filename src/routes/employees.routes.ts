import { Router } from 'express';

import employeesController from '../controllers/employees.controller';

const router = Router();

router.get('/:id', employeesController.getById);
router.get('/', employeesController.getAll);
router.post('/', employeesController.create);
router.put('/:id', employeesController.update);
router.delete('/:id', employeesController.destroy);

export default router;