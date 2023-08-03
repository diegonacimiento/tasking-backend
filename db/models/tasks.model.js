import { Model, DataTypes, Sequelize } from 'sequelize';
import { USER_TABLE } from './users.model.js';

const TASK_TABLE = "tasks";

const TaskSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isComplete: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: "user"});
  };

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: "Task",
      timestamps: false,
    };
  };
};

export { TASK_TABLE, TaskSchema, Task };
