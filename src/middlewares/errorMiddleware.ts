import { type Request, type Response, type NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro:', error);

  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : 'Erro interno do servidor';

  res.status(statusCode).json({
    erro: message,
    requestId: req.requestId,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
    }),
  });
};