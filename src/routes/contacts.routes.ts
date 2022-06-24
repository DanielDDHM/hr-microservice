import { Router } from 'express';
import contactsController from '../controllers/contacts.controller';

const router = Router();

router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.destroy);

export default router;