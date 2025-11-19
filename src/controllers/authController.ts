import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario, Instrutor, Aluno } from '../models/index.ts';
import { AppError } from '../utils/errors.ts';

export const registro = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const usuarioExiste = await Usuario.findOne({ where: { email } });
    if (usuarioExiste) {
      throw new AppError('Email já cadastrado', 400);
    }

    const usuario = await Usuario.create({ nome, email, senha, tipo });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      token,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao criar usuário', 500);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      throw new AppError('Credenciais inválidas', 401);
    }

    if (!usuario.ativo) {
      throw new AppError('Usuário inativo', 401);
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      token,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao fazer login', 500);
  }
};

export const perfil = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await Usuario.findByPk(req.usuario!.id, {
      attributes: ['id', 'nome', 'email', 'tipo', 'ativo'],
      include: [
        {
          model: Instrutor,
          as: 'instrutor',
          required: false,
        },
        {
          model: Aluno,
          as: 'aluno',
          required: false,
        },
      ],
    });

    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    res.json({ usuario });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Erro ao buscar perfil', 500);
  }
};