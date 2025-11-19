import { body, param } from 'express-validator';

export const criarTreinoValidator = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  body('duracaoMinutos')
    .notEmpty()
    .withMessage('Duração é obrigatória')
    .isInt({ min: 5, max: 300 })
    .withMessage('Duração deve estar entre 5 e 300 minutos'),
  body('nivel')
    .notEmpty()
    .withMessage('Nível é obrigatório')
    .isIn(['iniciante', 'intermediario', 'avancado'])
    .withMessage('Nível inválido'),
  body('objetivo')
    .notEmpty()
    .withMessage('Objetivo é obrigatório'),
  body('exercicios')
    .optional()
    .isArray()
    .withMessage('Exercícios deve ser um array'),
  body('exercicios.*.exercicioId')
    .isInt()
    .withMessage('ID do exercício deve ser um número'),
  body('exercicios.*.series')
    .isInt({ min: 1, max: 10 })
    .withMessage('Séries deve estar entre 1 e 10'),
  body('exercicios.*.repeticoes')
    .notEmpty()
    .withMessage('Repetições é obrigatório'),
  body('exercicios.*.descansoSegundos')
    .isInt({ min: 0, max: 300 })
    .withMessage('Descanso deve estar entre 0 e 300 segundos'),
];

export const atualizarTreinoValidator = [
  param('id').isInt().withMessage('ID inválido'),
  body('nome')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  body('duracaoMinutos')
    .optional()
    .isInt({ min: 5, max: 300 })
    .withMessage('Duração deve estar entre 5 e 300 minutos'),
  body('nivel')
    .optional()
    .isIn(['iniciante', 'intermediario', 'avancado'])
    .withMessage('Nível inválido'),
  body('ativo')
    .optional()
    .isBoolean()
    .withMessage('Ativo deve ser um booleano'),
];
