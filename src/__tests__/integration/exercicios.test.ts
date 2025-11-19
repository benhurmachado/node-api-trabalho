import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import sequelize from '../../config/database.js';
import { Usuario, Instrutor } from '../../models/index.js';

let tokenInstrutor: string;
let tokenAluno: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Criar instrutor
  const resInstrutor = await request(app)
    .post('/api/auth/registro')
    .send({
      nome: 'Instrutor Teste',
      email: 'instrutor@exemplo.com',
      senha: 'senha123',
      tipo: 'instrutor',
    });
  
  tokenInstrutor = resInstrutor.body.token;

  // Criar perfil de instrutor
  const usuario = await Usuario.findOne({ where: { email: 'instrutor@exemplo.com' } });
  await Instrutor.create({
    usuarioId: usuario!.id,
    especialidade: 'Musculação',
    cref: '123456-SP',
  });

  // Criar aluno
  const resAluno = await request(app)
    .post('/api/auth/registro')
    .send({
      nome: 'Aluno Teste',
      email: 'aluno@exemplo.com',
      senha: 'senha123',
      tipo: 'aluno',
    });
  
  tokenAluno = resAluno.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Integração - Exercícios', () => {
  let exercicioId: number;

  describe('POST /api/exercicios', () => {
    test('Instrutor deve criar exercício', async () => {
      const response = await request(app)
        .post('/api/exercicios')
        .set('Authorization', `Bearer ${tokenInstrutor}`)
        .send({
          nome: 'Supino Reto',
          descricao: 'Exercício para peitoral',
          grupoMuscular: 'Peito',
          equipamento: 'Barra',
          dificuldade: 'medio',
        });

      expect(response.status).toBe(201);
      expect(response.body.exercicio).toHaveProperty('id');
      expect(response.body.exercicio.nome).toBe('Supino Reto');
      
      exercicioId = response.body.exercicio.id;
    });

    test('Aluno não deve criar exercício', async () => {
      const response = await request(app)
        .post('/api/exercicios')
        .set('Authorization', `Bearer ${tokenAluno}`)
        .send({
          nome: 'Agachamento',
          grupoMuscular: 'Pernas',
          dificuldade: 'facil',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/exercicios', () => {
    test('Deve listar todos os exercícios', async () => {
      const response = await request(app).get('/api/exercicios');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('exercicios');
      expect(Array.isArray(response.body.exercicios)).toBe(true);
    });

    test('Deve filtrar por grupo muscular', async () => {
      const response = await request(app)
        .get('/api/exercicios')
        .query({ grupoMuscular: 'Peito' });

      expect(response.status).toBe(200);
      expect(response.body.exercicios.every((ex: any) => ex.grupoMuscular === 'Peito')).toBe(true);
    });
  });

  describe('GET /api/exercicios/:id', () => {
    test('Deve buscar exercício por ID', async () => {
      const response = await request(app).get(`/api/exercicios/${exercicioId}`);

      expect(response.status).toBe(200);
      expect(response.body.exercicio).toHaveProperty('id', exercicioId);
    });

    test('Deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/api/exercicios/99999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/exercicios/:id', () => {
    test('Instrutor deve atualizar exercício', async () => {
      const response = await request(app)
        .put(`/api/exercicios/${exercicioId}`)
        .set('Authorization', `Bearer ${tokenInstrutor}`)
        .send({
          descricao: 'Descrição atualizada',
        });

      expect(response.status).toBe(200);
      expect(response.body.exercicio.descricao).toBe('Descrição atualizada');
    });
  });

  describe('DELETE /api/exercicios/:id', () => {
    test('Instrutor deve deletar exercício', async () => {
      const response = await request(app)
        .delete(`/api/exercicios/${exercicioId}`)
        .set('Authorization', `Bearer ${tokenInstrutor}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensagem');
    });
  });
});