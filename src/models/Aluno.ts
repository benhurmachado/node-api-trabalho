import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface AlunoAttributes {
  id: number;
  usuarioId: number;
  dataNascimento?: Date;
  peso?: number;
  altura?: number;
  objetivo?: string;
  nivelExperiencia: 'iniciante' | 'intermediario' | 'avancado';
}

interface AlunoCreationAttributes extends Optional<AlunoAttributes, 'id' | 'dataNascimento' | 'peso' | 'altura' | 'objetivo'> {}

class Aluno extends Model<AlunoAttributes, AlunoCreationAttributes> implements AlunoAttributes {
  declare id: number;
  declare usuarioId: number;
  declare dataNascimento?: Date;
  declare peso?: number;
  declare altura?: number;
  declare objetivo?: string;
  declare nivelExperiencia: 'iniciante' | 'intermediario' | 'avancado';
}

Aluno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    dataNascimento: {
      type: DataTypes.DATE,
    },
    peso: {
      type: DataTypes.DECIMAL(5, 2),
    },
    altura: {
      type: DataTypes.DECIMAL(4, 2),
    },
    objetivo: {
      type: DataTypes.STRING,
    },
    nivelExperiencia: {
      type: DataTypes.ENUM('iniciante', 'intermediario', 'avancado'),
      allowNull: false,
      defaultValue: 'iniciante',
    },
  },
  {
    sequelize,
    tableName: 'alunos',
  }
);

export default Aluno;