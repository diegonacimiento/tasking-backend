import sequelize from "../libs/sequelize.js";
import boom from "@hapi/boom";
const { models } = sequelize;

class tasksService {
  constructor() {};

  async search(userId) {
    const tasks = await models.Task.findAll({
      where: {userId,}
    });
    return tasks;
  };

  async searchId(userId, title) {
    const tasksAll = await this.search(userId);
    const tasks = tasksAll.filter(task =>{
      return task.title.includes(title);
    });
    if(tasks.length == 0) throw boom.notFound("La tarea no existe");
    return tasks;
  };

  async create(userId, body) {
    const task = await models.Task.create({
      ...body,
      userId,
    });
    return task;
  };

  async update(id, body) {
    const task = await this.searchId(id);
    const updateTask = await task.update({
      ...task,
      ...body,
    });
    return updateTask;
  };

  async delete(id) {
    const task = await this.searchId(id);
    await task.destroy();
    return id;
  };

};

export default tasksService;
