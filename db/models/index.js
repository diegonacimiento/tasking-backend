import { User, UserSchema } from "./usuarios.model.js";
import { Task, TaskSchema } from './tasks.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
};

export default setupModels;
