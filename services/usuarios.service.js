import sequelize from '../libs/sequelize.js';
import boom from '@hapi/boom';
import bcrypt from "bcrypt";
const { models } = sequelize;

class usersService {
  constructor() {};

  async searchId(id) {
    const user = await models.User.findByPk(id);
    if(!user) throw boom.notFound("El usuario no existe");
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  };

  async searchEmail(email) {
    const user = await models.User.findOne({
      where: {email,},
      paranoid: false,
    });
    return user;
  };

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);
    const newUser = await models.User.create({
      ...body,
      password: hash,
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
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
