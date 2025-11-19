import { type Request, type Response } from 'express';
import { Exercicio } from '../models/index.ts';
import { AppError, NotFoundError } from '../utils/errors.ts';

export const listarExercicios = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grupoMuscular, dificuldade } = req.query;
    
    const where: any = {};
    if (grupoMuscular) where.grupoMuscular = grupoMuscular;
    if (dificuldade) where.dificuldade = dificuldade;

    const exercicios = await Exercicio.findAll({ where });

    res.json({
      total: exercicios.length,
      exercicios,
    });
  } catch (error) {
    throw new AppError('Erro ao listar exercícios', 500);
  }
};

export const buscarExercicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      throw new NotFoundError('Exercício não encontrado');
    }

    res.json({ exercicio });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao buscar exercício', 500);
  }
};

export const criarExercicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercicio = await Exercicio.create(req.body);

    res.status(201).json({
      mensagem: 'Exercício criado com sucesso',
      exercicio,
    });
  } catch (error) {
    throw new AppError('Erro ao criar exercício', 500);
  }
};

export const atualizarExercicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      throw new NotFoundError('Exercício não encontrado');
    }

    await exercicio.update(req.body);

    res.json({
      mensagem: 'Exercício atualizado com sucesso',
      exercicio,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao atualizar exercício', 500);
  }
};

export const deletarExercicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      throw new NotFoundError('Exercício não encontrado');
    }

    await exercicio.destroy();

    res.json({
      mensagem: 'Exercício deletado com sucesso',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao deletar exercício', 500);
  }
};
