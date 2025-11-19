import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface TreinoAttributes {
  id: number;
  instrutorId: number;
  nome: string;
  descricao?: string;
  duracaoMinutos: number;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  objetivo: string;
  ativo: boolean;
}

interface TreinoCreationAttributes extends Optional<TreinoAttributes, 'id' | 'descricao' | 'ativo'> {}

class Treino extends Model<TreinoAttributes, TreinoCreationAttributes> implements TreinoAttributes {
  declare id: number;
  declare instrutorId: number;
  declare nome: string;
  declare descricao?: string;
  declare duracaoMinutos: number;
  declare nivel: 'iniciante' | 'intermediario' | 'avancado';
  declare objetivo: string;
  declare ativo: boolean;
}

Treino.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    instrutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'instrutores',
        key: 'id',
      },
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    duracaoMinutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.ENUM('iniciante', 'intermediario', 'avancado'),
      allowNull: false,
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'treinos',
  }
);

export default Treino;