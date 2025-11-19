import { type Request, type Response, type NextFunction } from 'express';

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inicio = Date.now();
  
  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    console.log(
      `[${new Date().toISOString()}] ${req.requestId} ${req.method} ${req.path} ${res.statusCode} - ${duracao}ms`
    );
  });
  
  next();
};