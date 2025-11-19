import { Router } from 'express';
import {
  listarExercicios,
  buscarExercicio,
  criarExercicio,
  atualizarExercicio,
  deletarExercicio,
} from '../controllers/exercicioController.ts';
import { criarExercicioValidator, atualizarExercicioValidator } from '../validators/exercicioValidator.ts';
import { validationMiddleware } from '../middlewares/validationMiddleware.ts';
import { authMiddleware, isInstrutor } from '../middlewares/authMiddleware.ts';

const router = Router();

/**
 * @swagger
 * /api/exercicios:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Listar todos os exercícios
 *     parameters:
 *       - in: query
 *         name: grupoMuscular
 *         schema:
 *           type: string
 *       - in: query
 *         name: dificuldade
 *         schema:
 *           type: string
 *           enum: [facil, medio, dificil]
 *     responses:
 *       200:
 *         description: Lista de exercícios
 */
router.get('/', listarExercicios);

/**
 * @swagger
 * /api/exercicios/{id}:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Buscar exercício por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercício encontrado
 */
router.get('/:id', buscarExercicio);

/**
 * @swagger
 * /api/exercicios:
 *   post:
 *     tags:
 *       - Exercícios
 *     summary: Criar novo exercício (apenas instrutores)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - grupoMuscular
 *               - dificuldade
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               grupoMuscular:
 *                 type: string
 *               equipamento:
 *                 type: string
 *               dificuldade:
 *                 type: string
 *                 enum: [facil, medio, dificil]
 *               videoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exercício criado com sucesso
 */
router.post('/', authMiddleware, isInstrutor, criarExercicioValidator, validationMiddleware, criarExercicio);

router.put('/:id', authMiddleware, isInstrutor, atualizarExercicioValidator, validationMiddleware, atualizarExercicio);
router.delete('/:id', authMiddleware, isInstrutor, deletarExercicio);

export default router;