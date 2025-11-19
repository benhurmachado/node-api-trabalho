import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayloadCustom {
  id: number;
  email: string;
  tipo: 'instrutor' | 'aluno';
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        erro: 'Token não fornecido',
        requestId: req.requestId,
      });
      return;
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      res.status(401).json({
        erro: 'Token mal formatado',
        requestId: req.requestId,
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadCustom;
    
    req.usuario = {
      id: decoded.id,
      email: decoded.email,
      tipo: decoded.tipo,
    };

    next();
  } catch (error) {
    res.status(401).json({
      erro: 'Token inválido ou expirado',
      requestId: req.requestId,
    });
  }
};

export const isInstrutor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.usuario?.tipo !== 'instrutor') {
    res.status(403).json({
      erro: 'Acesso negado. Apenas instrutores podem realizar esta ação.',
      requestId: req.requestId,
    });
    return;
  }
  next();
};

export const isAluno = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.usuario?.tipo !== 'aluno') {
    res.status(403).json({
      erro: 'Acesso negado. Apenas alunos podem realizar esta ação.',
      requestId: req.requestId,
    });
    return;
  }
  next();
};