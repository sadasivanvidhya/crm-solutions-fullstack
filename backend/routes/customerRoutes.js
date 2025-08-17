import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { customerCreateValidation, customerUpdateValidation } from '../validators/customerValidators.js';
import { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';

const router = Router();

router.use(authRequired);
router.get('/', listCustomers);
router.get('/:id', getCustomer);
router.post('/', customerCreateValidation, createCustomer);
router.put('/:id', customerUpdateValidation, updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;