import { Router } from 'express';
import {
  listarInstrutores,
  buscarInstrutor,
  criarInstrutor,
  atualizarInstrutor,
  deletarInstrutor,
} from '../controllers/instrutorController.ts';
import { criarInstrutorValidator, atualizarInstrutorValidator } from '../validators/instrutorValidator.ts';
import { validationMiddleware } from '../middlewares/validationMiddleware.ts';
import { authMiddleware, isInstrutor } from '../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', listarInstrutores);
router.get('/:id', buscarInstrutor);
/**
 * @swagger
 * /api/instrutor:
 *   post:
 *     tags:
 *       - Exercícios
 *     summary: Criar novo instrutor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - especialidade
 *               - cref
 *             properties:
 *               especialidade:
 *                 type: string
 *               cref:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Instrutor criado com sucesso
 */
router.post('/', authMiddleware, isInstrutor, criarInstrutorValidator, validationMiddleware, criarInstrutor);
router.put('/:id', authMiddleware, isInstrutor, atualizarInstrutorValidator, validationMiddleware, atualizarInstrutor);
router.delete('/:id', authMiddleware, isInstrutor, deletarInstrutor);

export default router;
