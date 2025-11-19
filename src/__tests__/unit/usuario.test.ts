import { describe, expect, test, beforeAll } from '@jest/globals';
import Usuario from '../../models/Usuario.js';
import sequelize from '../../config/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Testes Unitários - Usuario Model', () => {
  test('Deve criar um usuário com senha criptografada', async () => {
    const usuario = await Usuario.create({
      nome: 'Teste Usuario',
      email: 'teste@exemplo.com',
      senha: 'senha123',
      tipo: 'aluno',
    });

    expect(usuario.id).toBeDefined();
    expect(usuario.nome).toBe('Teste Usuario');
    expect(usuario.email).toBe('teste@exemplo.com');
    expect(usuario.senha).not.toBe('senha123'); // Senha deve estar hasheada
    expect(usuario.tipo).toBe('aluno');
  });

  test('Deve comparar senha corretamente', async () => {
    const usuario = await Usuario.create({
      nome: 'Teste Senha',
      email: 'senha@exemplo.com',
      senha: 'minhasenha',
      tipo: 'instrutor',
    });

    const senhaCorreta = await usuario.compararSenha('minhasenha');
    const senhaIncorreta = await usuario.compararSenha('senhaerrada');

    expect(senhaCorreta).toBe(true);
    expect(senhaIncorreta).toBe(false);
  });

  test('Não deve permitir email duplicado', async () => {
    await Usuario.create({
      nome: 'Usuario 1',
      email: 'duplicado@exemplo.com',
      senha: 'senha123',
      tipo: 'aluno',
    });

    await expect(
      Usuario.create({
        nome: 'Usuario 2',
        email: 'duplicado@exemplo.com',
        senha: 'senha456',
        tipo: 'instrutor',
      })
    ).rejects.toThrow();
  });
});