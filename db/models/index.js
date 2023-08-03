import { User, UserSchema } from "./users.model.js";
import { Task, TaskSchema } from './tasks.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Task.associate(sequelize.models);
};

export default setupModels;
