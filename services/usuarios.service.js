import sequelize from '../libs/sequelize.js';
import boom from '@hapi/boom';
const { models } = sequelize;

class usersService {
  constructor() {};

  async searchId(id) {
    const user = await models.User.findByPk(id);
    if(!user) throw boom.notFound("El usuario no existe");
    return user;
  };

  async create(body) {
    const newUser = await models.User.create(body);
    return newUser;
  };

  async update(id, body) {
    const user = await this.searchId(id);
    const updateUser = await user.update({
      ...user,
      ...body,
    });
    return updateUser;
  };

  async delete(id) {
    const user = await this.searchId(id);
    await user.destroy();
    return id;
  };

};

export default usersService;
