import { Router } from 'express';
import {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
} from '../controllers/alunoController.js';
import { criarAlunoValidator, atualizarAlunoValidator } from '../validators/alunoValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { authMiddleware, isAluno } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listarAlunos);
router.get('/:id', buscarAluno);
router.post('/', authMiddleware, isAluno, criarAlunoValidator, validationMiddleware, criarAluno);
router.put('/:id', authMiddleware, isAluno, atualizarAlunoValidator, validationMiddleware, atualizarAluno);
router.delete('/:id', authMiddleware, isAluno, deletarAluno);

export default router;