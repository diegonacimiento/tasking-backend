import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import usersService from "../../../services/usuarios.service.js";

const service = new usersService();

const localStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await service.searchEmail(email);

    if(!user) done(boom.unauthorized(), false);

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) done(boom.unauthorized(), false);

    done(null, user);

  } catch (error) {

    done(error, false);

  }
});

export default localStrategy;
