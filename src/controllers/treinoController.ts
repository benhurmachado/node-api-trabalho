import { type Request, type Response } from 'express';
import { Treino, TreinoExercicio, Exercicio, Instrutor } from '../models/index.ts';
import { AppError, NotFoundError } from '../utils/errors.ts';

export const listarTreinos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nivel, objetivo } = req.query;
    
    const where: any = { ativo: true };
    if (nivel) where.nivel = nivel;
    if (objetivo) where.objetivo = objetivo;

    const treinos = await Treino.findAll({
      where,
      include: [
        {
          model: Instrutor,
          as: 'instrutor',
          attributes: ['id', 'especialidade'],
        },
      ],
    });

    res.json({
      total: treinos.length,
      treinos,
    });
  } catch (error) {
    throw new AppError('Erro ao listar treinos', 500);
  }
};

export const buscarTreino = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const treino = await Treino.findByPk(id, {
      include: [
        {
          model: Instrutor,
          as: 'instrutor',
          attributes: ['id', 'especialidade'],
        },
        {
          model: TreinoExercicio,
          as: 'treinoExercicios',
          include: [
            {
              model: Exercicio,
              as: 'exercicio',
            },
          ],
        },
      ],
    });

    if (!treino) {
      throw new NotFoundError('Treino não encontrado');
    }

    res.json({ treino });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao buscar treino', 500);
  }
};

export const criarTreino = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar o instrutor associado ao usuário
    const instrutor = await Instrutor.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!instrutor) {
      throw new AppError('Instrutor não encontrado', 404);
    }

    const { exercicios, ...treinoData } = req.body;
    
    const treino = await Treino.create({
      ...treinoData,
      instrutorId: instrutor.id,
    });

    if (exercicios && exercicios.length > 0) {
      const treinoExercicios = exercicios.map((ex: any, index: number) => ({
        treinoId: treino.id,
        exercicioId: ex.exercicioId,
        series: ex.series,
        repeticoes: ex.repeticoes,
        descansoSegundos: ex.descansoSegundos,
        observacoes: ex.observacoes,
        ordem: index + 1,
      }));

      await TreinoExercicio.bulkCreate(treinoExercicios);
    }

    const treinoCriado = await Treino.findByPk(treino.id, {
      include: [
        {
          model: TreinoExercicio,
          as: 'treinoExercicios',
          include: [
            {
              model: Exercicio,
              as: 'exercicio',
            },
          ],
        },
      ],
    });

    res.status(201).json({
      mensagem: 'Treino criado com sucesso',
      treino: treinoCriado,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao criar treino', 500);
  }
};

export const atualizarTreino = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const instrutor = await Instrutor.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!instrutor) {
      throw new AppError('Instrutor não encontrado', 404);
    }

    const treino = await Treino.findOne({
      where: { id, instrutorId: instrutor.id },
    });

    if (!treino) {
      throw new NotFoundError('Treino não encontrado ou você não tem permissão');
    }

    await treino.update(req.body);

    res.json({
      mensagem: 'Treino atualizado com sucesso',
      treino,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao atualizar treino', 500);
  }
};

export const deletarTreino = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const instrutor = await Instrutor.findOne({
      where: { usuarioId: req.usuario!.id },
    });

    if (!instrutor) {
      throw new AppError('Instrutor não encontrado', 404);
    }

    const treino = await Treino.findOne({
      where: { id, instrutorId: instrutor.id },
    });

    if (!treino) {
      throw new NotFoundError('Treino não encontrado ou você não tem permissão');
    }

    await treino.destroy();

    res.json({
      mensagem: 'Treino deletado com sucesso',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao deletar treino', 500);
  }
};