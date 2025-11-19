import { body, param } from 'express-validator';

export const criarExercicioValidator = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  body('grupoMuscular')
    .notEmpty()
    .withMessage('Grupo muscular é obrigatório'),
  body('equipamento')
    .optional(),
  body('dificuldade')
    .notEmpty()
    .withMessage('Dificuldade é obrigatória')
    .isIn(['facil', 'medio', 'dificil'])
    .withMessage('Dificuldade inválida'),
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('URL do vídeo inválida'),
];

export const atualizarExercicioValidator = [
  param('id').isInt().withMessage('ID inválido'),
  body('nome')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  body('dificuldade')
    .optional()
    .isIn(['facil', 'medio', 'dificil'])
    .withMessage('Dificuldade inválida'),
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('URL do vídeo inválida'),
];
