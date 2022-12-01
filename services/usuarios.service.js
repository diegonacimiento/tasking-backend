import sequelize from '../libs/sequelize.js';
import boom from '@hapi/boom';
import bcrypt, { hash } from "bcrypt";
const { models } = sequelize;

class usersService {
  constructor() {};

  async searchAll() {
    const user = await models.User.findAll();
    if(!user) throw boom.notFound("El usuario no existe");
    return user;
  };

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

  async updatePassword(id, body) {
    const user = await models.User.findByPk(id);
    const isMatch = await bcrypt.compare(body.password, user.password);
    if(!isMatch) throw boom.unauthorized("Contraseña incorrecta");

    const confirmPassword = (body.newPassword === body.confirmNewPassword);
    if(!confirmPassword) throw boom.badRequest("Las contraseñas no coinciden");

    const hash = await bcrypt.hash(body.newPassword, 10);

    const updateUser = await user.update({
      ...user,
      password: hash,
    });

    delete updateUser.dataValues.password;
    delete updateUser.dataValues.recoveryToken;

    return {message: "Contraseña actualizada"};
  };

  async delete(id) {
    const user = await this.searchId(id);
    await user.destroy();
    return id;
  };

};

export default usersService;
