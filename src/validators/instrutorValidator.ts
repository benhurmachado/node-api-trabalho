import { body, param } from 'express-validator';

export const criarInstrutorValidator = [
  body('especialidade')
    .notEmpty()
    .withMessage('Especialidade é obrigatória'),
  body('cref')
    .notEmpty()
    .withMessage('CREF é obrigatório')
    .matches(/^\d{6}-[A-Z]{1,2}$/)
    .withMessage('CREF deve estar no formato 000000-XX'),
  body('biografia')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Biografia deve ter no máximo 1000 caracteres'),
];

export const atualizarInstrutorValidator = [
  param('id').isInt().withMessage('ID inválido'),
  body('especialidade')
    .optional()
    .notEmpty()
    .withMessage('Especialidade não pode ser vazia'),
  body('cref')
    .optional()
    .matches(/^\d{6}-[A-Z]{1,2}$/)
    .withMessage('CREF deve estar no formato 000000-XX'),
  body('biografia')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Biografia deve ter no máximo 1000 caracteres'),
];
