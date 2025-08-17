import { body } from 'express-validator';

export const customerCreateValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('company').optional().isString(),
  body('notes').optional().isString()
];

export const customerUpdateValidation = [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('phone').optional().trim().notEmpty(),
  body('company').optional().isString(),
  body('notes').optional().isString()
];