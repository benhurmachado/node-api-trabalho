// src/models/Usuario.js
import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

interface UsuarioAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: 'instrutor' | 'aluno';
  ativo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'ativo'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  declare id: number;
  declare nome: string;
  declare email: string;
  declare senha: string;
  declare tipo: 'instrutor' | 'aluno';
  declare ativo: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async compararSenha(senhaFornecida: string): Promise<boolean> {
    return bcrypt.compare(senhaFornecida, this.senha);
  }
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('instrutor', 'aluno'),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario: Usuario) => {
        if (usuario.senha) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      },
      beforeUpdate: async (usuario: Usuario) => {
        if (usuario.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      },
    },
  }
);

export default Usuario;