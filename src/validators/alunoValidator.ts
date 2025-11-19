import { body, param } from 'express-validator';

export const criarAlunoValidator = [
  body('dataNascimento')
    .optional()
    .isISO8601()
    .withMessage('Data de nascimento inválida'),
  body('peso')
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage('Peso deve estar entre 20 e 300 kg'),
  body('altura')
    .optional()
    .isFloat({ min: 0.5, max: 2.5 })
    .withMessage('Altura deve estar entre 0.5 e 2.5 metros'),
  body('objetivo')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Objetivo deve ter no máximo 500 caracteres'),
  body('nivelExperiencia')
    .notEmpty()
    .withMessage('Nível de experiência é obrigatório')
    .isIn(['iniciante', 'intermediario', 'avancado'])
    .withMessage('Nível de experiência inválido'),
];

export const atualizarAlunoValidator = [
  param('id').isInt().withMessage('ID inválido'),
  body('dataNascimento')
    .optional()
    .isISO8601()
    .withMessage('Data de nascimento inválida'),
  body('peso')
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage('Peso deve estar entre 20 e 300 kg'),
  body('altura')
    .optional()
    .isFloat({ min: 0.5, max: 2.5 })
    .withMessage('Altura deve estar entre 0.5 e 2.5 metros'),
  body('objetivo')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Objetivo deve ter no máximo 500 caracteres'),
  body('nivelExperiencia')
    .optional()
    .isIn(['iniciante', 'intermediario', 'avancado'])
    .withMessage('Nível de experiência inválido'),
];
