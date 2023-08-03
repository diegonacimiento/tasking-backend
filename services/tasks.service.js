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

  async searchTitle(userId, title) {
    const tasksAll = await this.search(userId);
    const tasks = tasksAll.filter(task =>{
      return task.title.includes(title);
    });
    if(tasks.length == 0) throw boom.notFound("La tarea no existe");
    return tasks;
  };

  async searchId(id) {
    const task = await models.Task.findByPk(id);
    if(!task) throw boom.notFound("La tarea no existe");
    return task;
  };

  async create(userId, body) {
    const task = await models.Task.create({
      ...body,
      userId,
    });
    return task;
  };

  async update(id, body, userId) {
    const task = await this.searchId(id);
    if(task.userId !== userId) throw boom.unauthorized();
    const updateTask = await task.update({
      ...task,
      ...body,
    });
    return updateTask;
  };

  async delete(id, userId) {
    const task = await this.searchId(id);
    if(task.userId !== userId) throw boom.unauthorized();
    await task.destroy();
    return id;
  };

};

export default tasksService;
