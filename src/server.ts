import dotenv from 'dotenv';
import app from '../src/app.ts';
import { connectDatabase } from './config/database.ts';

dotenv.config();

const PORT = process.env.PORT || 3000;

const iniciarServidor = async (): Promise<void> => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} `);
    });
  } catch (error) {
    console.error(' Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
