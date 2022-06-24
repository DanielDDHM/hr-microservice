import { Router } from 'express';
import schedulesController from '../controllers/schedules.controller';

const router = Router();

router.post('/', schedulesController.create);
router.put('/:id', schedulesController.update);
router.delete('/:id', schedulesController.destroy);

export default router;