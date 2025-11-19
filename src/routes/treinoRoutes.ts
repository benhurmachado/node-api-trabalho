import { Router } from 'express';
import {
  listarTreinos,
  buscarTreino,
  criarTreino,
  atualizarTreino,
  deletarTreino,
} from '../controllers/treinoController.js';
import { criarTreinoValidator, atualizarTreinoValidator } from '../validators/treinoValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { authMiddleware, isInstrutor } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listarTreinos);
router.get('/:id', buscarTreino);
router.post('/', authMiddleware, isInstrutor, criarTreinoValidator, validationMiddleware, criarTreino);
router.put('/:id', authMiddleware, isInstrutor, atualizarTreinoValidator, validationMiddleware, atualizarTreino);
router.delete('/:id', authMiddleware, isInstrutor, deletarTreino);

export default router;
