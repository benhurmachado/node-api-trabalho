// src/app.ts
import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.ts';
import routes from './routes/index.ts';
import { requestIdMiddleware } from './middlewares/requestIdMiddleware.ts';
import { loggingMiddleware } from './middlewares/loggingMiddleware.ts';
import { errorMiddleware } from './middlewares/errorMiddleware.ts';
import './models/index.ts';

const app: Application = express();

// Middlewares globais
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);
app.use(loggingMiddleware);

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.json({
    mensagem: 'API Plataforma de Exercícios Físicos',
    versao: '1.0.0',
    documentacao: '/api-docs',
    status: 'online',
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Plataforma de Exercícios - Documentação',
}));

// Rotas da API
app.use('/api', routes);

// Rota 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    path: req.path,
    requestId: req.requestId,
  });
});

// Middleware de erro (deve ser o último)
app.use(errorMiddleware);

export default app;