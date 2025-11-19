import { Router } from 'express';
import { listarHistorico, registrarTreino, atualizarHistorico } from '../controllers/historicoController.ts';
import { authMiddleware, isAluno } from '../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', authMiddleware, isAluno, listarHistorico);
router.post('/', authMiddleware, isAluno, registrarTreino);
router.put('/:id', authMiddleware, isAluno, atualizarHistorico);

export default router;