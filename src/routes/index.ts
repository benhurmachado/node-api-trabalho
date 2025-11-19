import { Router } from 'express';
import authRoutes from './authRoutes.js';
import exercicioRoutes from './exercicioRoutes.js';
import treinoRoutes from './treinoRoutes.js';
import instrutorRoutes from './instrutorRoutes.js'
import alunoRoutes from './alunoRoutes.js'
import historicoRoutes from './historicoRoutes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/exercicios', exercicioRoutes);
router.use('/treinos', treinoRoutes);

router.use('/instrutor', instrutorRoutes);
router.use('/aluno', alunoRoutes);
router.use('/historico', historicoRoutes);

export default router;
