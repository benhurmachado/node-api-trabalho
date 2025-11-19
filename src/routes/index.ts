import { Router } from 'express';
import authRoutes from './authRoutes.ts';
import exercicioRoutes from './exercicioRoutes.ts';
import treinoRoutes from './treinoRoutes.ts';
import instrutorRoutes from './instrutorRoutes.ts'
import alunoRoutes from './alunoRoutes.ts'
import historicoRoutes from './historicoRoutes.ts'

const router = Router();

router.use('/auth', authRoutes);
router.use('/exercicios', exercicioRoutes);
router.use('/treinos', treinoRoutes);

router.use('/instrutor', instrutorRoutes);
router.use('/aluno', alunoRoutes);
router.use('/historico', historicoRoutes);

export default router;
