import { Router } from 'express';
import {
  listarTreinos,
  buscarTreino,
  criarTreino,
  atualizarTreino,
  deletarTreino,
} from '../controllers/treinoController.ts';
import { criarTreinoValidator, atualizarTreinoValidator } from '../validators/treinoValidator.ts';
import { validationMiddleware } from '../middlewares/validationMiddleware.ts';
import { authMiddleware, isInstrutor } from '../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', listarTreinos);
router.get('/:id', buscarTreino);
router.post('/', authMiddleware, isInstrutor, criarTreinoValidator, validationMiddleware, criarTreino);
router.put('/:id', authMiddleware, isInstrutor, atualizarTreinoValidator, validationMiddleware, atualizarTreino);
router.delete('/:id', authMiddleware, isInstrutor, deletarTreino);

export default router;
