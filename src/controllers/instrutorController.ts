import { type Request, type Response } from 'express';
import { Instrutor, Usuario, Treino } from '../models/index.ts';
import { AppError, NotFoundError } from '../utils/errors.ts';

export const listarInstrutores = async (req: Request, res: Response): Promise<void> => {
  try {
    const instrutores = await Instrutor.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email'],
          where: { ativo: true },
        },
      ],
    });

    res.json({
      total: instrutores.length,
      instrutores,
    });
  } catch (error) {
    throw new AppError('Erro ao listar instrutores', 500);
  }
};

export const buscarInstrutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const instrutor = await Instrutor.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email'],
        },
        {
          model: Treino,
          as: 'treinos',
          where: { ativo: true },
          required: false,
        },
      ],
    });

    if (!instrutor) {
      throw new NotFoundError('Instrutor não encontrado');
    }

    res.json({ instrutor });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao buscar instrutor', 500);
  }
};

export const criarInstrutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuario!.id;

    const instrutorExiste = await Instrutor.findOne({ where: { usuarioId } });
    if (instrutorExiste) {
      throw new AppError('Já existe um perfil de instrutor para este usuário', 400);
    }

    const instrutor = await Instrutor.create({
      ...req.body,
      usuarioId,
    });

    res.status(201).json({
      mensagem: 'Perfil de instrutor criado com sucesso',
      instrutor,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao criar perfil de instrutor', 500);
  }
};

export const atualizarInstrutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario!.id;

    const instrutor = await Instrutor.findOne({
      where: { id, usuarioId },
    });

    if (!instrutor) {
      throw new NotFoundError('Instrutor não encontrado ou você não tem permissão');
    }

    await instrutor.update(req.body);

    res.json({
      mensagem: 'Perfil de instrutor atualizado com sucesso',
      instrutor,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao atualizar perfil de instrutor', 500);
  }
};

export const deletarInstrutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario!.id;

    const instrutor = await Instrutor.findOne({
      where: { id, usuarioId },
    });

    if (!instrutor) {
      throw new NotFoundError('Instrutor não encontrado ou você não tem permissão');
    }

    await instrutor.destroy();

    res.json({
      mensagem: 'Perfil de instrutor deletado com sucesso',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao deletar perfil de instrutor', 500);
  }
};