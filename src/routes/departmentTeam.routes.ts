import { Router } from 'express';

import departmentTeamsController from '../controllers/departmentTeams.controller';

const router = Router();

router.post('/', departmentTeamsController.create);
router.put('/:id', departmentTeamsController.update);
router.get('/:id', departmentTeamsController.getById);
router.delete('/:id', departmentTeamsController.destroy);
router.get('/', departmentTeamsController.getAll)

export default router;