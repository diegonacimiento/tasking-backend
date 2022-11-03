import { Model, DataTypes, Sequelize } from 'sequelize';

const TASK_TABLE = "tasks";

const TaskSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Task extends Model {
  static associate() {};

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
