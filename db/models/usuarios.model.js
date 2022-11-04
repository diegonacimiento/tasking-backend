import { Model, DataTypes, Sequelize } from "sequelize";

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  mode: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "light",
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create-at",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      as: "tasks",
      foreignKey: "userId",
    })

  };

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  };
};

export {USER_TABLE, UserSchema, User};
