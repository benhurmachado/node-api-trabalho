import { type Request, type Response } from 'express';
import { HistoricoTreino, Aluno, Treino } from '../models/index.js';
import { AppError, NotFoundError } from '../utils/errors.js';

export const listarHistorico = async (req: Request, res: Response): Promise<void> => {
  try {
    const aluno = await Aluno.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado');
    }

    const historico = await HistoricoTreino.findAll({
      where: { alunoId: aluno.id },
      include: [
        {
          model: Treino,
          as: 'treino',
        },
      ],
      order: [['dataRealizacao', 'DESC']],
    });

    res.json({
      total: historico.length,
      historico,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao listar histórico', 500);
  }
};

export const registrarTreino = async (req: Request, res: Response): Promise<void> => {
  try {
    const aluno = await Aluno.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado');
    }

    const historico = await HistoricoTreino.create({
      ...req.body,
      alunoId: aluno.id,
    });

    res.status(201).json({
      mensagem: 'Treino registrado com sucesso',
      historico,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao registrar treino', 500);
  }
};

export const atualizarHistorico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado');
    }

    const historico = await HistoricoTreino.findOne({
      where: { id, alunoId: aluno.id },
    });

    if (!historico) {
      throw new NotFoundError('Histórico não encontrado');
    }

    await historico.update(req.body);

    res.json({
      mensagem: 'Histórico atualizado com sucesso',
      historico,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao atualizar histórico', 500);
  }
};