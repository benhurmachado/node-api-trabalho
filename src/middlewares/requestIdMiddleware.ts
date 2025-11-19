import { type Request, type Response, type NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.requestId = randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
};