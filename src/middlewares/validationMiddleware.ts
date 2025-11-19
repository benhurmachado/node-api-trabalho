import { type Request, type Response, type NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      erro: 'Erro de validação',
      detalhes: errors.array().map(err => ({
        campo: err.type === 'field' ? err.path : 'unknown',
        mensagem: err.msg,
      })),
      requestId: req.requestId,
    });
    return;
  }
  
  next();
};