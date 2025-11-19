import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface InstrutorAttributes {
  id: number;
  usuarioId: number;
  especialidade: string;
  cref: string;
  biografia?: string;
  avaliacaoMedia?: number;
}

interface InstrutorCreationAttributes extends Optional<InstrutorAttributes, 'id' | 'biografia' | 'avaliacaoMedia'> {}

class Instrutor extends Model<InstrutorAttributes, InstrutorCreationAttributes> implements InstrutorAttributes {
  declare id: number;
  declare usuarioId: number;
  declare especialidade: string;
  declare cref: string;
  declare biografia?: string;
  declare avaliacaoMedia?: number;
}

Instrutor.init(
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
    especialidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cref: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    biografia: {
      type: DataTypes.TEXT,
    },
    avaliacaoMedia: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'instrutores',
  }
);

export default Instrutor;