import { Router } from 'express';
import { registro, login, perfil } from '../controllers/authController.ts';
import { registroValidator, loginValidator } from '../validators/authValidator.ts';
import { validationMiddleware } from '../middlewares/validationMiddleware.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - tipo
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [instrutor, aluno]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/registro', registroValidator, validationMiddleware, registro);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Fazer login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/login', loginValidator, validationMiddleware, login);

/**
 * @swagger
 * /api/auth/perfil:
 *   get:
 *     tags:
 *       - Autenticação
 *     summary: Buscar perfil do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 */
router.get('/perfil', authMiddleware, perfil);

export default router;