import { body } from 'express-validator';

export const registroValidator = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Nome deve ter no mínimo 3 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('tipo')
    .notEmpty()
    .withMessage('Tipo é obrigatório')
    .isIn(['instrutor', 'aluno'])
    .withMessage('Tipo deve ser "instrutor" ou "aluno"'),
];

export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
];
