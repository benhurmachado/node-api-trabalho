import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface ExercicioAttributes {
  id: number;
  nome: string;
  descricao?: string;
  grupoMuscular: string;
  equipamento?: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  videoUrl?: string;
}

interface ExercicioCreationAttributes extends Optional<ExercicioAttributes, 'id' | 'descricao' | 'equipamento' | 'videoUrl'> {}

class Exercicio extends Model<ExercicioAttributes, ExercicioCreationAttributes> implements ExercicioAttributes {
  declare id: number;
  declare nome: string;
  declare descricao?: string;
  declare grupoMuscular: string;
  declare equipamento?: string;
  declare dificuldade: 'facil' | 'medio' | 'dificil';
  declare videoUrl?: string;
}

Exercicio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    grupoMuscular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipamento: {
      type: DataTypes.STRING,
    },
    dificuldade: {
      type: DataTypes.ENUM('facil', 'medio', 'dificil'),
      allowNull: false,
      defaultValue: 'medio',
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'exercicios',
  }
);

export default Exercicio;