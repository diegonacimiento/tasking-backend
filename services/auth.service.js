import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import usersService from "./usuarios.service.js";
import { config } from "../config/config.js";

const service = new usersService();

class authService {

  async getUser(email, password) {
    const user = await service.searchEmail(email);
    if(!user) throw boom.notFound();
    if(user.dataValues.deletedAt != null) throw boom.notFound("El usuario no existe");
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw boom.unauthorized("Contraseña incorrecta");
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return user;
  };

  async signToken(user) {
    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token,
    };
  };

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.ggMail,
        pass: config.ggKey,
      },
    });

    await transporter.sendMail(infoMail);
    return {message: "Mail enviado"};
  };

  async sendRecovery(email) {
    const user = await service.searchEmail(email);
    if(!user) throw boom.unauthorized();

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: "15 min" });

    const link = `www.diegonacimiento.com/recoverypassword?token=${token}`;

    await service.update(user.id, {recoveryToken: token});

    const mail = {
      from: "diegonacimientoJWT@gmail.com",
      to: `${user.email}`,
      subject: "Recuperación de contraseña",
      html: `<b>Hola, para recuperar su contraseña entre en el siguiente link: ${link}</b>`
    };

    const response = await this.sendMail(mail);

    return response;
  };

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);

      const user = await service.searchId(payload.sub);

      if(user.recoveryToken !== token) throw boom.unauthorized();

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, {recoveryToken: null, password: hash});

      return {message: "La contraseña ha sido actualizada"};

    } catch (error) {

      throw boom.unauthorized();

    }
  };

  async recoveryUser(email, password) {
    const user = await service.searchEmail(email);
    console.log(user)
    if(user.dataValues.deletedAt == null) throw boom.badRequest();
    if(!user) throw boom.notFound();
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch) {
      await user.restore();
      delete user.dataValues.password;
      delete user.dataValues.recoveryToken;
      return user;
    } else throw boom.unauthorized();
  };

};

export default authService;
