import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import sequelize from '../../config/database.js';
import { Usuario } from '../../models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Integração - Autenticação', () => {
  describe('POST /api/auth/registro', () => {
    test('Deve registrar um novo usuário com sucesso', async () => {
      const response = await request(app)
        .post('/api/auth/registro')
        .send({
          nome: 'João Silva',
          email: 'joao@exemplo.com',
          senha: 'senha123',
          tipo: 'aluno',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.usuario).toHaveProperty('id');
      expect(response.body.usuario.email).toBe('joao@exemplo.com');
      expect(response.body.usuario.tipo).toBe('aluno');
    });

    test('Não deve registrar com email duplicado', async () => {
      await request(app)
        .post('/api/auth/registro')
        .send({
          nome: 'Maria Santos',
          email: 'maria@exemplo.com',
          senha: 'senha123',
          tipo: 'instrutor',
        });

      const response = await request(app)
        .post('/api/auth/registro')
        .send({
          nome: 'Maria Outra',
          email: 'maria@exemplo.com',
          senha: 'senha456',
          tipo: 'aluno',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
    });

    test('Deve validar campos obrigatórios', async () => {
      const response = await request(app)
        .post('/api/auth/registro')
        .send({
          nome: 'Teste',
          // Faltando email, senha e tipo
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
      expect(response.body).toHaveProperty('detalhes');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      await Usuario.create({
        nome: 'Login Teste',
        email: 'login@exemplo.com',
        senha: 'senha123',
        tipo: 'aluno',
      });
    });

    test('Deve fazer login com credenciais corretas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@exemplo.com',
          senha: 'senha123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.usuario.email).toBe('login@exemplo.com');
    });

    test('Não deve fazer login com senha incorreta', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@exemplo.com',
          senha: 'senhaerrada',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('erro');
    });

    test('Não deve fazer login com email inexistente', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'naoexiste@exemplo.com',
          senha: 'senha123',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('GET /api/auth/perfil', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/registro')
        .send({
          nome: 'Perfil Teste',
          email: 'perfil@exemplo.com',
          senha: 'senha123',
          tipo: 'aluno',
        });

      token = response.body.token;
    });

    test('Deve retornar perfil com token válido', async () => {
      const response = await request(app)
        .get('/api/auth/perfil')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.usuario).toHaveProperty('id');
      expect(response.body.usuario.email).toBe('perfil@exemplo.com');
    });

    test('Não deve retornar perfil sem token', async () => {
      const response = await request(app).get('/api/auth/perfil');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('erro');
    });

    test('Não deve retornar perfil com token inválido', async () => {
      const response = await request(app)
        .get('/api/auth/perfil')
        .set('Authorization', 'Bearer tokeninvalido');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('erro');
    });
  });
});