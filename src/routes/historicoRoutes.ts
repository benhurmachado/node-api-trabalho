import { Router } from 'express';
import { listarHistorico, registrarTreino, atualizarHistorico } from '../controllers/historicoController.js';
import { authMiddleware, isAluno } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, isAluno, listarHistorico);
router.post('/', authMiddleware, isAluno, registrarTreino);
router.put('/:id', authMiddleware, isAluno, atualizarHistorico);

export default router;