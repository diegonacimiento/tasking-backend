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
  taskId: {
    field: "task_id",
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: DataTypes.DATE,
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
      paranoid: true,
    };
  };
};

export {USER_TABLE, UserSchema, User};
