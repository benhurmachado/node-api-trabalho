import Usuario from './Usuario.js';
import Instrutor from './Instrutor.js';
import Aluno from './Aluno.js';
import Exercicio from './Exercicio.js';
import Treino from './Treino.js';
import TreinoExercicio from './TreinoExercicio.js';
import HistoricoTreino from './HistoricoTreino.js';

// Relacionamentos Usuario
Usuario.hasOne(Instrutor, {
  foreignKey: 'usuarioId',
  as: 'instrutor',
});
Instrutor.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario',
});

Usuario.hasOne(Aluno, {
  foreignKey: 'usuarioId',
  as: 'aluno',
});
Aluno.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario',
});

// Relacionamentos Instrutor e Treino
Instrutor.hasMany(Treino, {
  foreignKey: 'instrutorId',
  as: 'treinos',
});
Treino.belongsTo(Instrutor, {
  foreignKey: 'instrutorId',
  as: 'instrutor',
});

// Relacionamentos Treino e Exercicio (N:M através de TreinoExercicio)
Treino.belongsToMany(Exercicio, {
  through: TreinoExercicio,
  foreignKey: 'treinoId',
  otherKey: 'exercicioId',
  as: 'exercicios',
});
Exercicio.belongsToMany(Treino, {
  through: TreinoExercicio,
  foreignKey: 'exercicioId',
  otherKey: 'treinoId',
  as: 'treinos',
});

// Relacionamentos diretos com TreinoExercicio
Treino.hasMany(TreinoExercicio, {
  foreignKey: 'treinoId',
  as: 'treinoExercicios',
});
TreinoExercicio.belongsTo(Treino, {
  foreignKey: 'treinoId',
});

Exercicio.hasMany(TreinoExercicio, {
  foreignKey: 'exercicioId',
  as: 'treinoExercicios',
});
TreinoExercicio.belongsTo(Exercicio, {
  foreignKey: 'exercicioId',
  as: 'exercicio',
});

// Relacionamentos Aluno e Treino (N:M através de HistoricoTreino)
Aluno.belongsToMany(Treino, {
  through: HistoricoTreino,
  foreignKey: 'alunoId',
  otherKey: 'treinoId',
  as: 'treinosRealizados',
});
Treino.belongsToMany(Aluno, {
  through: HistoricoTreino,
  foreignKey: 'treinoId',
  otherKey: 'alunoId',
  as: 'alunos',
});

// Relacionamentos diretos com HistoricoTreino
Aluno.hasMany(HistoricoTreino, {
  foreignKey: 'alunoId',
  as: 'historico',
});
HistoricoTreino.belongsTo(Aluno, {
  foreignKey: 'alunoId',
  as: 'aluno',
});

Treino.hasMany(HistoricoTreino, {
  foreignKey: 'treinoId',
  as: 'historicos',
});
HistoricoTreino.belongsTo(Treino, {
  foreignKey: 'treinoId',
  as: 'treino',
});

export {
  Usuario,
  Instrutor,
  Aluno,
  Exercicio,
  Treino,
  TreinoExercicio,
  HistoricoTreino,
};