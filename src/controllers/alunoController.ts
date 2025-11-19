import { type Request, type Response } from 'express';
import { Aluno, Usuario, HistoricoTreino } from '../models/index.ts';
import { AppError, NotFoundError } from '../utils/errors.ts';

export const listarAlunos = async (req: Request, res: Response): Promise<void> => {
  try {
    const alunos = await Aluno.findAll({
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
      total: alunos.length,
      alunos,
    });
  } catch (error) {
    throw new AppError('Erro ao listar alunos', 500);
  }
};

export const buscarAluno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email'],
        },
      ],
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado');
    }

    res.json({ aluno });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao buscar aluno', 500);
  }
};

export const criarAluno = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuario!.id;

    const alunoExiste = await Aluno.findOne({ where: { usuarioId } });
    if (alunoExiste) {
      throw new AppError('Já existe um perfil de aluno para este usuário', 400);
    }

    const aluno = await Aluno.create({
      ...req.body,
      usuarioId,
    });

    res.status(201).json({
      mensagem: 'Perfil de aluno criado com sucesso',
      aluno,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao criar perfil de aluno', 500);
  }
};

export const atualizarAluno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario!.id;

    const aluno = await Aluno.findOne({
      where: { id, usuarioId },
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado ou você não tem permissão');
    }

    await aluno.update(req.body);

    res.json({
      mensagem: 'Perfil de aluno atualizado com sucesso',
      aluno,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao atualizar perfil de aluno', 500);
  }
};

export const deletarAluno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario!.id;

    const aluno = await Aluno.findOne({
      where: { id, usuarioId },
    });

    if (!aluno) {
      throw new NotFoundError('Aluno não encontrado ou você não tem permissão');
    }

    await aluno.destroy();

    res.json({
      mensagem: 'Perfil de aluno deletado com sucesso',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao deletar perfil de aluno', 500);
  }
};