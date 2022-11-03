'use strict';

const modelUser = import("../models/usuarios.model.js");
const modelTask = import("../models/tasks.model.js");

module.exports = {
  up: async (queryInterface) => {
    const { USER_TABLE, UserSchema } = await modelUser;
    const { TASK_TABLE, TaskSchema } = await modelTask;
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  down: async (queryInterface) => {
    const { USER_TABLE } = await modelUser;
    const { TASK_TABLE } = await modelTask;
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
  }
};
