import { Router } from 'express';
import {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
} from '../controllers/alunoController.ts';
import { criarAlunoValidator, atualizarAlunoValidator } from '../validators/alunoValidator.ts';
import { validationMiddleware } from '../middlewares/validationMiddleware.ts';
import { authMiddleware, isAluno } from '../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', listarAlunos);
router.get('/:id', buscarAluno);
router.post('/', authMiddleware, isAluno, criarAlunoValidator, validationMiddleware, criarAluno);
router.put('/:id', authMiddleware, isAluno, atualizarAlunoValidator, validationMiddleware, atualizarAluno);
router.delete('/:id', authMiddleware, isAluno, deletarAluno);

export default router;