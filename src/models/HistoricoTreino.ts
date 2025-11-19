import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.ts';

interface HistoricoTreinoAttributes {
  id: number;
  alunoId: number;
  treinoId: number;
  dataRealizacao: Date;
  duracaoRealMinutos?: number;
  calorias?: number;
  observacoes?: string;
  avaliacaoTreino?: number;
  concluido: boolean;
}

class HistoricoTreino extends Model<HistoricoTreinoAttributes> implements HistoricoTreinoAttributes {
  declare id: number;
  declare alunoId: number;
  declare treinoId: number;
  declare dataRealizacao: Date;
  declare duracaoRealMinutos?: number;
  declare calorias?: number;
  declare observacoes?: string;
  declare avaliacaoTreino?: number;
  declare concluido: boolean;
}

HistoricoTreino.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id',
      },
    },
    treinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'treinos',
        key: 'id',
      },
    },
    dataRealizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    duracaoRealMinutos: {
      type: DataTypes.INTEGER,
    },
    calorias: {
      type: DataTypes.INTEGER,
    },
    observacoes: {
      type: DataTypes.TEXT,
    },
    avaliacaoTreino: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    concluido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'historico_treinos',
  }
);

export default HistoricoTreino;