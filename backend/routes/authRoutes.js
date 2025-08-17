import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { loginValidation, registerValidation } from '../validators/authValidators.js';

const router = Router();
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
export default router;