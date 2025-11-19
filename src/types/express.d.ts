import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      usuario?: {
        id: number;
        email: string;
        tipo: 'instrutor' | 'aluno';
      };
    }
  }
}