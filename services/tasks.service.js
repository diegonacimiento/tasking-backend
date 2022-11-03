import sequelize from "../libs/sequelize.js";
import boom from "@hapi/boom";
const { models } = sequelize;

class tasksService {
  constructor() {};

  async search() {
    const tasks = await models.Task.findAll();
    return tasks;
  };

  async searchId(id) {
    const task = await models.Task.findByPk(id);
    if(!task) throw boom.notFound("La tarea no existe");
    return task;
  };

  async create(body) {
    const task = await models.Task.create(body);
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
