import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.ts';

interface TreinoExercicioAttributes {
  id: number;
  treinoId: number;
  exercicioId: number;
  series: number;
  repeticoes: string;
  descansoSegundos: number;
  observacoes?: string;
  ordem: number;
}

class TreinoExercicio extends Model<TreinoExercicioAttributes> implements TreinoExercicioAttributes {
  declare id: number;
  declare treinoId: number;
  declare exercicioId: number;
  declare series: number;
  declare repeticoes: string;
  declare descansoSegundos: number;
  declare observacoes?: string;
  declare ordem: number;
}

TreinoExercicio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    treinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'treinos',
        key: 'id',
      },
    },
    exercicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exercicios',
        key: 'id',
      },
    },
    series: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repeticoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descansoSegundos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.TEXT,
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'treino_exercicios',
  }
);

export default TreinoExercicio;